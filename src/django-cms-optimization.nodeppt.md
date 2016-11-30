title: django 针对新管理端的相关优化

speaker: leroyxyli

url: https://github.com/Hakurouken

transition: slide


[slide]
# django 针对新管理端的相关优化

[slide]
## 目录

- render_json / render_template 装饰器
- url 自动加载
- 中间件
- get_params 获取参数
- 脚手架

[slide]
## 1. render_json / render_template 装饰器

[slide]
### Before：
```python
def view_func(request):
    try:
        # do some logic stuff
        some_condition = ''
        data = {}
    except Exception as e:
        # 1. write some log...
        # logger.error(str(traceback.format_exc()),'some_filename')
        # 2. do some database rollback
        # ...
        return JsonResponse({
            'result': False,
            'msg': 'Error happend.'
        })

    if some_condition == 'success with data':
        # report
        return JsonResponse({
            'result': True,
            'data': data
        })
    elif some_condition == 'some known error':
        # do some monitor report staff
        # with lots of code
        return JsonResponse({
            'result': False,
            'msg': 'Some error happend...'
        })
    else:
        # write custom log...
        return JsonResponse({
            'result': False,
            'msg': 'I don\'t know what happend.'
        })
```

[slide]
### Now:
```python
@render_json
def view_func(request):
    # do some logic staff
    some_condition = ''
    data = {}

    if some_condition == 'success with data':
        return data
    elif some_condition == 'some known error':
        # report automatically
        raise Error(ERROR_CODE.CURRENT_ERROR_CODE,'Some error happend')
    else:
        # write custom log...
        raise Error(msg='I don\'t know what happend.')
```

[slide]
### 核心代码

[slide]
```python
def render_json(func):
    @wraps(func)
    def wrapper(request, *args, **kwargs):
        try:
            response = func(request, *args, **kwargs)
        except Error as e:
            # 业务抛出的自定义异常统一为 Error 类型
            response = {
                'result': False,
                'code': e.code,
                'msg': e.msg
            }
        except Exception as e:
            err_type,err_value,err_traceback = sys.exc_info()
            # 日志信息
            logger.error((err_type,err_value,err_traceback,))
            raise err_type,err_value,err_traceback.tb_next

        if isinstance(response,basestring):
            response = {
                'result': True,
                'msg': response
            }
        elif not isinstance(response,dict) or not response.has_key('result'):
            response = {
                'result': True,
                'data': response
            }

        return  JsonResponse(response)

    return wrapper
```

[slide]
### 用装饰器实现的好处：
- 节省代码
- view 复用时，可以不修改业务代码

[slide]
## 2. url 自动加载

[slide]
### Before:
```python
## 入口 urls.py

urlpatterns = [
    url(r'^/app/',include('app.urls')),
]

## 具体页面 urls.py
from . import views
urlpatterns = [
    url(r'^viewFunc/$',views.view_func)
]

## views
@render_json
def view_func(request):
    return {}
```

[slide]
### Now:
```python

## views.py
@render_json
def view_func(request):
    return {}
```

[slide]
### 核心逻辑
1. 遍历当前根文件夹，获取所有 python 包 (判断是否有 `__init__.py` )
2. 如果有 `urls.py` 文件, 直接 include, 结束
3. 如果没有 `urls.py` 遍历所有 `views.py` 结尾的文件，导出列表
4. 遍历所有 views , 根据特定规则 ( 被`render / render_json / render_template`装饰 )导入函数, 根据函数名自动构建路由( 使用 `inspect` 和 `__import__` )
5. import 过程中出错，则构建一个抛出错误的 view, 匹配所有上一级的路由, 加入路由队尾

[slide]
### 优点
- 利用固定规则，减少配置项
- import 出错时，只在指定的 urls 抛出错误，不影响已有 views

[slide]
### 缺点
- 需要引入一些潜规则 (views.py,urls.py)

[slide]
## 3. tof/monitor 中间件

[slide]
### 中间件代码
```python
class Middleware(object):
    def process_request(self,request):
        request.MONITOR = monitor.Monitor(request)
        return None

    def process_response(self, request, response):
        code = getattr(response,'CODE',response.status_code)
        # do something with code
        request.MONITOR.p_stop(code)
        return response
```

[slide]
### 优点
- 全局接入，无需修改业务代码
- 节省代码

[slide]
## 4. 用 get_params 获取请求参数

[slide]
```python
params = utils.get_params(request.GET,{
    'id': Params.IntField(u'id',null=True,default=0),
    'name': ['string',''],
    'uid': ['number']
})

tbUser.objects.create(**params)
```

[slide]

### 核心代码
```python
_cls = {
    'string': StrField,
    'number': IntField,
    'date': DateField,
    'datetime': DatetimeField,
    'url': UrlField
}

def get(data, params):
    ret = {}
    for key,value in params.items():
        if isinstance(value,(list,tuple)):
            type_name = value[0]
            default = value[1] if len(value) > 1 else None
            type_ = _cls.get(type_name,None)
            if not type_:
                raise TypeError('Unsupported validator type {}'.format(type_name))
            validator = type_(default=default)
        elif isinstance(value,Field):
            validator = value
        else:
            raise TypeError('Unsupported item type, must be a list/tuple or a Field instance')

        ret[key] = validator.parse(data.get(key))

    return ret
```

[slide]
## 5. 脚手架

[slide]
```
node create appName pageName
```

1. 根据模板自动创建文件，并根据 appName 和 pageName 完成基本变量替换

    - mako 模板文件
    - js
    - 后台 views 文件
    - url 路由和 app 相关载入交由框架自动加载

2. 如果整个 app 不存在，模拟 `python manage.py appName`
