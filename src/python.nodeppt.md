title: Python
speaker: leroyxyli
url: https://hakurouken.github.io/presentation/python/publish/python.htm
files: /css/theme.moon.css
transition: zoomout

[slide]

# Pythonic

[slide]

# 目录

1. py-intro
2. py-spec
3. py-trap
4. py-trick
5. py-efficient
6. django

[slide]

# 入门

[slide]

## 语法
- 空格/tab 缩进表示代码块(不能混用)
- 可选分号(不建议加)

[slide]

[magic data-transition="move"]
## 常见数据类型
### 列表(list)

数组

```python
# list can be init by `[]`
career = ['web developer','product manager','designer']
# push a new element to list.
career.append('application developer')
print career
# output: ['web developer','product manager', 'designer', 'application developer']
career.count()
# output: 4
```

====

### 元组(tuple)

不可变

```python
# tuple
language = ('php','python','javascript',)
language.count()    # output: 3

# list
frameworks = ['CodeIgniter','Django','Express']
# list to tuple
frameworks_tuple = tuple(frameworks)
# tuple to list
frameworks_list = list(frameworks)
```

====

### 集合(set)

无重复元素集

```python
#  set() -> new empty set object
#  set(iterable) -> new set object
mobile_system = set(['Android','iOS','Symbian','Windows Mobile'])
# or
mobile_system = {'Android','iOS','Symbian','Windows Mobile'}
# Add an element to set. Do nothing if element is already exists.
mobile_system.add('Windows Mobile')
# Remove an element from set. Do nothing if element is not exists.
mobile_system.discard('Symbian')
# Compare two set, return difference.
mobile_system.difference(set(['Android','iOS']))
```

====

### 字典(dict)

键值对

```python
o = {'key':'value'}
o['key2'] = 'value2'
print o['key']  # output: value
print o.get('key') # output: value
# print o['another_key']  # will throw a KeyError
print o.get('another_key','Not Found')  # output: Not Found
print o.items()     # output: [('key2', 'value2'), ('key', 'value')]
```
[/magic]

[slide]

## 条件

if - elif - else

```python
x = 100
if x > 100:
    print '{} is bigger than 100'.format(x)
elif x > 50:
    print '{x} is between 50 and 100'.format(x=5)
else
    print '{} is smaller than 50'.format(x=5)
```

[slide]

## 循环

- while

```python
i = 0
while i < 10:
    if i % 2:
        print '{} is an odd'.format(i)
    else:
        print '{} is a even'.format(i)

    if i == 5:
        print 'I get bored, just break.'
        break
    i += 1
```

- for

```python
for i in range(0,5):
    print i
else:
    print 'Not break.'

languages = ['php','python','javascript']
for language in languages:
    print languages
```

[slide]

## 函数
```python
## 函数定义
def test_func(num1,num2=0,*args,**kwargs):
    '''
        Test how to pass arguments to a function.
    '''
    ret = num1 + num2
    print 'num1 + num2 equals {}'.format(ret)
    print 'received arguments: {}'.format(args)
    print 'received arguments with name: {}'.format(kwargs)
    return ret

# Test cases
test_func(1,2)
test_func(1)
test_func(1,2,3)
test_func(num1=0,num2=1)
test_func(1,2,another_value=3)
```

[slide]

## 类

```python
class Person(object):
    def __init__(self,name,age=0):
        self.name = name
        self.age = age

    def getOlder(self,num):
        self.age += num

    @staticmethod
    def search(persons,name):
        return filter(lambda person: person.name == name,persons)

# create a person instance
person_a = Person('name_a')
assert(isinstance(person_a,Person))
person_b = Person('name_b',18)
Person.search([person_a,person_b],'name_a')     # return a person list, include only person_a
```

[slide]

# 规范

[slide]

## [PEP8](https://www.python.org/dev/peps/pep-0008/)

- 4个空格缩进
- 不同功能间的代码块用空行隔开
- 文件统一用 utf-8 编码
- import 单行导入
- import 导入顺序
    - python 内部包
    - 第三方依赖
    - 项目内部依赖
- 不需要多余的空格

[slide]
[magic data-transition="move"]
## import this

<pre>
    The Zen of Python, by Tim Peters

    Beautiful is better than ugly.
    Explicit is better than implicit.
    Simple is better than complex.
    Complex is better than complicated.
    Flat is better than nested.
    Sparse is better than dense.
    Readability counts.
    Special cases aren't special enough to break the rules.
    Although practicality beats purity.
    Errors should never pass silently.
    Unless explicitly silenced.
    In the face of ambiguity, refuse the temptation to guess.
    There should be one-- and preferably only one --obvious way to do it.
    Although that way may not be obvious at first unless you're Dutch.
    Now is better than never.
    Although never is often better than *right* now.
    If the implementation is hard to explain, it's a bad idea.
    If the implementation is easy to explain, it may be a good idea.
    Namespaces are one honking great idea -- let's do more of those!
</pre>

====

<pre>
    Python 之禅 , by Tim Peters

    美丽比丑陋更好,直白比晦涩更好.
    简介为上,复杂次之,凌乱更次.
    扁平优于嵌套，间隔优于紧凑.
    可读性十分重要.
    即使借实用性之名，也没有什么特例可以打破这些规则.
    除非确定，否则不要静默处理错误.
    当你面临歧义的时候，不要尝试去猜测，而是去寻找一种 -- 最好是唯一一种 -- 明显的解决方案.
    但是这并不容易，因为你不是 Dutch (注:python 之父).
    做比不做好，但马上去做有时还不如不做。
    如果一个实现难以解释，它一定是一个坏的实现，反之，则有可能是一个好的实现.
    命名空间是一个优秀的理念，我们应该多加实践.
</pre>

[/magic]

[slide]

# python 使用注意点

[slide]

[magic data-transition="move"]
## python 2/3
- python3 不向下兼容 python2
- python3 对 python2 的一些内容做了规范化，填了一些坑
- 现在 2 升级 3 工具基本可以覆盖

====

## GIL(Global Interpreter Lock)
- CPython 中全局排它锁
- 多线程计算中，无法很好利用多核
- 在 Python3(CPython) 中，已经修改了 GIL 实现，但引入了 NewGIL 机制
- 并不是 Python 本身的机制，在 pypy 和 Jython 中不受限制

====

## 编码
- `#coding: utf-8`
- 影响文件运行的注释

====

## 字符串两种字符串(str,unicode)类型
- 建议全部字符串采用 utf-8
- encode/decode
- 判断是否为字符串 `isinstance(custom_str,basestring)`
[/magic]

[slide]

# trick

[slide]

## help / dir / docstring

[slide]

[magic data-transition="move"]

## 装饰器

语法糖，类似于 `func = decorator(func)`

====

用函数声明

```python
from functools import wraps

def hello(fn):
    @wraps(fn)
    def wrapper(*args,**kwargs):
        return 'hello ' + fn(*args,**kwargs)
    return wrapper

@hello
def get_name(firstname,lastname):
    return firstname + ' ' + lastname

name = get_name('John','Smith')
```

====

用类声明：

```python
class hello(object):

    def __init__(self, fn):
        self.fn = fn

    def __call__(self,*args,**kwargs):
        return 'hello ' + self.fn(*args,**kwargs)
```

====

## 装饰器

用装饰器做缓存

```python
from functools import wraps
def memo(fn):
    cache = {}
    miss = object()

    @wraps(fn)
    def wrapper(*args):
        result = cache.get(args, miss)
        if result is miss:
            result = fn(*args)
            cache[args] = result
        return result

    return wrapper

@memo
def fib(n):
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)
```

[/magic]

[slide]

## itertools, functools

- [itertools](https://docs.python.org/2/library/itertools.html)
- [functools](https://docs.python.org/2/library/functools.html)

[slide]
[magic data-transition="move"]
## 列表推导

```python
result = [num+1 for num in [1,2,3]]
# equals to
result = []
for num in [1,2,3]:
    result.append(num+1)
```

====

```python
result = [(x, y) for x in [1,2,3] for y in [1,2,3] if x != y]
# equals to
result = []
for x in [1,2,3]:
    for y in [1,2,3]:
        if x != y:
            result.append((x,y))
```

====

字典推导
```python
d = { x: x % 2 == 0 for x in range(1, 11) }
```

构造生成器
```python
result = (num*2 for num in [1,2,3,4,5])
```
[/magic]

[slide]

[magic data-transition="move"]
## [魔术方法(magic methods)](http://pyzh.readthedocs.io/en/latest/python-magic-methods-guide.html)
```python
class Closer:
    def __init__(self, obj):
        self.obj = obj

    def __enter__(self, obj):
        return self.obj

    def __exit__(self, exception_type, exception_value, traceback):
        try:
            self.obj.close()
        except AttributeError:
            print 'Not closable.'
            return True

from ftplib import FTP
with Closer(FTP('ftp.somesite.com')) as conn:
    conn.dir()
```

====

magic method 有很多，例如：
- \_\_init\_\_
- \_\_new\_\_
- \_\_del\_\_
- \_\_eq\_\_
- \_\_add\_\_
- \_\_import\_\_
- ...
[/magic]

[slide]

[magic data-transition="move"]
## 迭代器/生成器

- iter函数：返回一个定义了next()方法的迭代器对象
- next函数：获取下一个元素，在没有后续元素时，抛出一个StopIteration异常。

```python
alphabet = ['a','b','c']
i = iter(alphabet)
next(i) # 'a'
next(i) # 'b'
next(i) # 'c'
next(i) # StopIteration
```

====

```python
class Fib(object):
    def __init__(self, max):
        super(Fib, self).__init__()
        self.max = max

    def __iter__(self):
        self.a = 0
        self.b = 1
        return self

    def __next__(self):
        fib = self.a
        if fib > self.max:
            raise StopIteration
        self.a, self.b = self.b, self.a + self.b
        return fib
```

====

yield: 生成器

```python
def fibGenerator(end):
    first = 0
    second = 1
    for i in xrange(0,end):
        first,second = second, first + second
        yield first
```

[/magic]

[slide]
[magic data-transition="move"]
## metaclass

1. 类也是对象
2. 元类是动态生成类的类
3. type 与 \_\_metaclass\_\_
4. 黑魔法，尽量不使用

====

### type

type 的两种用法：
1. `type(object)` : 返回 object 对象对应的类
2. `type(className,father_tuple,prop_dict)` : 返回一个类名为 className, 父类为 father_tuple，包含 prop_dict 中的属性的类

```python
# Usually, we use type(object)
assert(type('abc') is str)
assert(type(1) is int)
# we can also use type to create a new class
Foo = type('Foo', (), {'bar':True})
# almost equals to
class Foo(object):
    bar = True
# the class can be extend
FooChild = type('FooChild', (Foo,),{})
# you can also add methods
def echo(self):
    print self.bar

FooChild = type('FooChild', (Foo,), {'echo': echo})
```

====
### \_\_metaclass\_\_
```python
class UpperAttrMetaclass(type):
    def __new__(cls, name, bases, dct):
        attrs = ((name, value) for name, value in dct.items() if not name.startswith('__'))
        uppercase_attr = dict((name.upper(), value) for name, value in attrs)
        return super(UpperAttrMetaclass, cls).__new__(cls, name, bases, uppercase_attr)

class Test(object):
    __metaclass__ = UpperAttrMetaclass

    test_prop = []
    __test_inner_prop = []
```

====
### 实例: 用元类创建一个简单的 ORM 模型
```python
class ModelMetaclass(type):
    def __new__(cls, name, bases, dct):
        if name=='Model':
            return type.__new__(cls, name, bases, dct)
        mappings = dict()
        for k, v in dct.iteritems():
            if isinstance(v, Field):
                mappings[k] = v
        for k in mappings.iterkeys():
            dct.pop(k)
        dct['__table__'] = name # assume the table name is the same as table name
        dct['__mappings__'] = mappings
        return type.__new__(cls, name, bases, dct)
```

====

```python        
class Model(dict):
    __metaclass__ = ModelMetaclass

    def __init__(self, **kw):
        super(Model, self).__init__(**kw)

    def __getattr__(self, key):
        try:
            return self[key]
        except KeyError as e:
            raise AttributeError(r"'Model' object has no attribute '%s'" % key)

    def __setattr__(self, key, value):
        self[key] = value

    def save(self):
        fields = []
        params = []
        args = []
        for k, v in self.__mappings__.iteritems():
            fields.append(v.name)
            params.append('?')
            args.append(getattr(self, k, None))
        sql = 'insert into %s (%s) values (%s)' % (self.__table__, ','.join(fields), ','.join(params))
        print('prepare statement: %s' % sql)
        print('arguments: %s' % str(args))
```

====

```python
class Field(object):
    def __init__(self, name, column_type):
        self.name = name
        self.column_type = column_type

class StringField(Field):
    def __init__(self, name):
        super(StringField, self).__init__(name, 'varchar(127)')

class IntegerField(Field):
    def __init__(self, name):
        super(IntegerField, self).__init__(name, 'bigint')
```

====

```python    
class User(Model):
    id_ = IntegerField('id')
    name = StringField('username')
    password = StringField('password')

# create an object：
u = User(id_=0, name='leroyxyli', password='password')
# call method
u.save()
```
[/magic]
[slide]

# effective

[slide]
[magic data-transition="move"]
## pip/virtualenv/virtualenvwrapper

- pip 包管理
- virtualenv 环境隔离
- virtualenvwrapper 方便的操作 virtualenv

====

### 环境管理

`mkvirtualenv`    创建新的虚拟环境

`mktmpenv`    创建新的临时虚拟环境（在deactive时会被销毁）

`lsvirtualenv`    列出所有的虚拟环境

`showvirtualenv`    显示单个虚拟环境的详细信息

`rmvirtualenv`    删除某个虚拟环境

`cpvirtualenv`    拷贝某个虚拟环境

`allvirtualenv`    在所有的虚拟环境下执行命令

====

### 操作当前环境

`workon`    改变当前环境或列出环境

`deactive`    退出当前虚拟环境

====

### 路径

`cdvirtualenv`    切换到指定的虚拟环境目录

`cdsitepackages`    切换当前虚拟环境到不同的 site-packages 路径

`lssitepackages`    列出当前虚拟环境的 site-packages 路径下的内容

详细参考官方文档：http://virtualenvwrapper.readthedocs.org/en/latest/command_ref.html

[/magic]

[slide]

## ipython

- A powerful interactive shell. {:&.fadeIn}
- A kernel for Jupyter.
- Support for interactive data visualization and use of GUI toolkits.
- Flexible, embeddable interpreters to load into your own projects.
- Easy to use, high performance tools for parallel computing.

[slide]
[magic data-transition="move"]
## pypy/jython/cython

- CPython: 默认，最广泛使用的 python

- pypy: 用 RPython 的 Python 实现 (有JIT)

- jython： Java 的 Python 实现 (有JIT)

- cython: 用 Python 语法写 C 插件

====

![How Fast is Pypy](http://i68.tinypic.com/2wn0kyd.jpg)
[speedtest of pypy](http://speed.pypy.org/)
[测试结果](http://speed.pypy.org/timeline/#/?exe=3,6,1,5&base=2+472&ben=grid&env=1&revs=10&equid=off)
[/magic]

[slide]

# django

[slide]

## HttpReqeust,HttpResponse,Model

- HttpRequest {:&.fadeIn}

- HttpResponse

    > When a page is requested, Django creates an HttpRequest object that contains metadata about the request. Then Django loads the appropriate view, passing the HttpRequest as the first argument to the view function. Each view is responsible for returning an HttpResponse object.

- Model

    django 操作数据库的模型

[slide]

## 中间件: 轻量级 plugin


[slide]

# Thanks.
