# Babel And Next-Generation Javascript
## Babel 与下一代 Javascript

---

## 目录
- ### babel 简介

- ### ECMA 标准

- ### babel 实战

- ### 一些 STAGE-2/3/4 新特性

- ### 未来(babili)

---

## babel 简介

- ### Use next generation JavaScript, today.

- ### ES7/ES6/JSX -> ES5

---

### 实例1

转换前：
```javascript
[1,2,3].map(n => n + 1);
```

转换后：
```javascript
[1,2,3].map(function(n) {
  return n + 1;
});
```

---

### 实例2

转换前:
```javascript
class Person {
    constructor(sex,age=0){
        this.sex = sex;
        this.age = age;
    }

    older(){
        return this.age++;
    }
}
```

---

### 实例2

转换后:
```javascript
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Person = function () {
    function Person(sex) {
        var age = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

        _classCallCheck(this, Person);

        this.sex = sex;
        this.age = age;
    }

    _createClass(Person, [{
        key: "older",
        value: function older() {
            return this.age++;
        }
    }]);

    return Person;
}();
```

---

## ECMAScript 标准

---

### ES进程
ES5 -> ES6(ES2015) -> ES7(ES2016) -> ES2017 -> ...

---

### ES进程
ES5 -> ES6(ES2015) -> ES7(ES2016) -> ES2017 -> ...

### 制定 ES6 标准存在的问题
- 版本太大，耗时太长（6年）
- 比新版率先完成的特性，必须等待新版的完成才能发布。
- 需要花长时间完成的特性，也顶着很大的压力被纳入这一版本。

---

### TC39
推动JavaScript发展的委员会

### TC39 设计过程
每个 ECMAScript 特性的建议将会从阶段 0 开始， 然后经过下列几个成熟阶段。其中从一个阶段到下一个阶段必须经过 TC39 的批准。

从 ES7 开始，将会每年发布一个版本。新版本将会包含每年截止时间之前完成的所有特性。

---

### TC39 流程

- STAGE-0 (Strawman 初稿)

    一个推进 ECMAScript 发展的自由形式的想法。

- STAGE-1 (Proposal 建议)

    一份新特性的正式建议文档 (有TC39带头人负责)。

- STAGE-2 (Draft 草案)

    规范第一个版本，需要正式说明 + 两个实验性的实现(其中一个可以在转义器实现)。

- STAGE-3 (Candidate 候选)

    完整规范文档 + 指定评审人签字 + 至少两个规范的实现

- STAGE-4 (Finished 完成)

    - Test 262 的验收测试（基本上都是 js 的单元测试）。
    - 两个通过测试的符合规范的实现。
    - 特性实现相关的重要实践经验。
    - ECMAScript 规范的编辑在规范文本上的签字。

---

注意:
1. ES7 标准只有 Array.prototype.includes 和乘方 ** 运算符

2. 事实标准先于 ECMA 成文标准

3. https://github.com/tc39/proposals

---

## babel 实战

---

### CLI (babel-cli)

- 输出到 stdout

    `babel es6.js`

- 输出到文件

    `babel es6.js -o output.js`

- 目录

    `babel src/ -d dist/`

- watch

    `babel src/ -d dist/ -w`

- ignore

    `babel src/ -d dist/ --ignore spec.js,spec2.js`

- copy-files

    `babel src/ -d dist/ --copy-files`

---

### plugin/presets

- plugin：用于解析/转换特定语法

    - [官方插件](https://babeljs.io/docs/plugins/#transform-plugins)

    - 第三方插件 (例如：babel-plugin-add-module-exports)

- presets： 一组 plugin 预设
    - latest

    - es2017

    - es2016

    - es2015

    - react

    - stage-X

---

### .babelrc

babel 的配置文件

---

#### .babelrc
```json
{
  "plugins": ["babel-plugin-add-module-exports"],
  "presets": ["es2015"],
  "ignore": [
    "ignore/**/*.js"
  ]
}
```

---

#### 通过 package.json 配置
```javascript
{
    "name": "my-package",
    "version": "1.0.0",
    "babel": {
        // 配置具体 babel 参数
    }
}
```

---

#### 在不同环境下配置不同的 babel 编译参数
```javascript
{
    "env": {
        "production": {
            // 生产环境 babel 配置
        },
        "development": {
            // 开发环境 babel 配置
        }
    },
}
```
`env` 会从 `process.env.BABEL_ENV` 获取，如果没有，取`process.env.NODE_ENV`, 如果还没取到，默认 `development`

---

### javascript (babel-core)

- #### `babel.transform(code, [options])`

- #### `babel.transformFile(file, [options], callback)`

- #### `babel.transformFileSync(file,[options])`

- #### `babel.transformFromAst(ast, [code], [options])`

---

### webpack-babel-loader (babel-loader)

例子：
```javascript
var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './src/scripts/index.js',
    output: {
        path: path.join(__dirname,'dist'),
        filename: 'index.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        },{
            test: /\.scss$/,
            loaders: ['style','css','sass']
        }]
    }
}
```

---

### babel-polyfill
babel 只负责**转换语法**，并不提供 polyfill (例如 String.prototype.startsWith / Array.from / WeakMap 等)

使用： `import babel-polyfill` 或 `require('babel-polyfill')`

---

注意:

1. `babel` 在 `npm2` 下编译很慢，建议升级到 `npm3` 重新 `npm install`

2. 默认的 `export default` 支持不太好，如果项目中 ES6 和 ES5 混用，建议采用 `babel-plugin-add-module-exports`

---

## 一些 STAGE-2/3/4 特性

### async await (stage-4)

### SIMD.JS (stage-3)

### Decorator (stage-2)

---

#### 使用回调处理异步任务
```javascript
var request = require('request');

function getGistList(type,callback) {
    request({
        headers: { 'User-Agent': 'request' },
        url: 'https://api.github.com/gists/' + type,
        json: true
    },function(err, result, data){
        if (err) throw err;
        callback && callback(data);
    });
}

function getGist(id,callback) {
    request({
        headers: { 'User-Agent': 'request' },
        url: 'https://api.github.com/gists/' + id,
        json: true
    },function(err, result, data){
        if (err) throw err;
        callback && callback(data);
    });
}

getGistList('public',function(gists){
    getGist(gists[0].id, function(detail){
        console.log(Object.keys(detail.files));
    });
});
```

---

#### 使用 Promise 处理异步任务
```javascript
var request = require('request-promise');

function getGistList(type) {
    return request({
        headers: { 'User-Agent': 'request' },
        url: 'https://api.github.com/gists/' + type,
        json: true
    });
}

function getGist(id) {
    return request({
        headers: { 'User-Agent': 'request' },
        url: 'https://api.github.com/gists/' + id,
        json: true
    });
}

getGistList('public').then(gist => gist[0].id)
    .then(getGist).then(detail => console.log(detail.files))
    .catch(err => console.error(err));
```

---

#### 使用生成器 (和 co 库) 处理异步任务
```javascript
const request = require('request-promise');
const co = require('co');

function getGistList(type){
    return request({
        headers: { 'User-Agent': 'request' },
        url: 'https://api.github.com/gists/' + type,
        json: true
    });
}

function getGist(id) {
    return request({
        headers: { 'User-Agent': 'request' },
        url: 'https://api.github.com/gists/' + id,
        json: true
    });
}

co(function* (){
    try {
        let gists = yield getGistList('public');
        let detail = yield getGist(gists[0].id);
        console.log(Object.keys(detail.files));
    } catch(e) { console.error(e); }
});
```

---

#### 使用 async/await 处理异步任务
```javascript
const request = require('request-promise');

function getGistList(type){
    return request({
        headers: { 'User-Agent': 'request' },
        url: 'https://api.github.com/gists/' + type,
        json: true
    });
}

function getGist(id,callback) {
    return request({
        headers: { 'User-Agent': 'request' },
        url: 'https://api.github.com/gists/' + id,
        json: true
    });
}

(async function(){
    try {
        let gists = await getGistList('public');
        let detail = await getGist(gists[0].id);
        console.log(Object.keys(detail.files));
    } catch(e) { console.error(e); }
})();
```

---

#### async 使用说明

#### 1. 依赖 Promise 返回
#### 2. 可采用第三方库包装现有库来简化操作，(如 Bluebird)
#### 3. Babel 编译结果为 Generator
#### 4. 可以用于类方法的定义(类方法声明)
#### 5. 使用声明式定义的 async 函数会定义在 babel-polyfill 引入之前，从而报错
#### 6. await 不能用在 nested-function 中
---

### SIMD.js

Single Instruction/Multiple Data (单指令多数据)

* #### 大规模提升计算性能 (图像、音视频处理、物理计算、加密等)

* #### 需要硬件支持

* #### 算法要针对 SIMD 设计

---

### SIMD.js

SIMD 与常用的 SISD (单指令单数据) 对比

![SISD](https://mdn.mozillademos.org/files/10509/SISD.png) ![SIMD](https://mdn.mozillademos.org/files/10507/SIMD.png)

---

### SIMD.js 示例

SISD:
```javascript
var a = [1, 2, 3, 4];
var b = [5, 6, 7, 8];
var c = [];

for (var i = 0; i < 4; i++) {
    c[i] = a[i] + b[i];
}
c; // Array[6, 8, 10, 12]
```

SIMD:
```javascript
var a = SIMD.Float32x4(1, 2, 3, 4);
var b = SIMD.Float32x4(5, 6, 7, 8);
var c = SIMD.Float32x4.add(a,b); // Float32x4[6, 8, 10, 12]
```

---

#### SIMD 中的条件分支

在 SISD 中，常用方式是通过状态 (if) 来分支，例如：
```javascript
var a = [1, 2, 3, 4];
var b = [5, 6, 7, 8];
var c = [];

for (var i = 0; i < 4; i++) {
  if (a[i] < 3) {
    c[i] = a[i] * b[i];
  } else {
    c[i] = b[i] + a[i];
  }
}

c; // [5, 12, 10, 12]
```

---

#### SIMD 中的条件分支

在 SIMD 中，往往采用蒙板 (mask) 的方式进行条件筛选：

![SIMD select](https://mdn.mozillademos.org/files/10715/selectionmask.png)

---

#### SIMD 中的条件分支

示例代码：
```javascript
var a = SIMD.Float32x4(1, 2, 3, 4);
var b = SIMD.Float32x4(5, 6, 7, 8);

var mask = SIMD.Float32x4.lessThan(a, SIMD.Float32x4.splat(3));
// Int32x4[-1, -1, 0, 0]

var result = SIMD.Float32x4.select(
    mask,   // 条件分支蒙板
    SIMD.Float32x4.mul(a, b), // 真值表
    SIMD.Float32x4.add(a, b) // 非真值表
);

result; // Float32x4[5, 12, 10, 12]
```

#### [查看更多](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SIMD)

---

### Decorator(装饰器)

在 `python` 中的装饰器：
```python
from functools import wraps

def warning(func):
    @wraps(func)
    def wrapper(*args,**kwargs):
        ret = func(*args,**kwargs)
        print '{} is danger, affects {}'.format(func.__name__,ret)
        return ret
    return wrapper

@warning
def delete_all_data(database='default_db'):
    return 'tables of {}'.format(database)

delete_all_data()
```

---

### Decorator(装饰器)

在 javascript 中的装饰器:
```javascript
function warning(target, key, descriptor) {
    const method = descriptor.value;
    descriptor.value = function(...args){
        let ret = method.apply(this, args);
        console.log(`${ret.name} has delete all data in ${args[0]}`);
        return this;
    }
    return descriptor;
}

class User {
    constructor(name){
        this.name = name;
    }

    @warning
    deleteFolder(folder=''){
        return this;
    }
}

let person = new User('someone');
person.deleteFolder('/bin');

```

---

在 javascript 中的装饰器(针对类)：
```javascript
function greet(target){
    target.prototype.greeting = function(){
        console.log(`Hello, my name is ${this.name}`);
    }
}

@greet
class User{
    constructor(name){
        this.name = name;
    }
}

let user = new User('babel');
user.greeting();
```

---
注意：

- #### 参数和 [Object.defineProperty](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty#Description) 保持一致
- #### 只能应用于类 / 类方法(无法直接应用于函数)
- #### `core-decorators`

---

## 未来 (Babili)

- #### 又名：Babel-minify

- #### 可以简单理解为 ES6-Uglify

---

### 示例
原始代码：
```javascript
class Mangler {
  constructor(program) {
    this.program = program;
  }
}
// need this since otherwise Mangler isn't used
new Mangler();
```

---

Uglify：
```javascript
// ES2016 代码 -> Babel 转 ES5 -> Uglify/Babili 压缩 -> 压缩的 ES5 代码
var a=function a(b){_classCallCheck(this,a),this.program=b};a();
```

Babili:
```javascript
// ES2015 代码 -> Babili 压缩 -> 压缩的 ES6 代码
class a{constructor(b){this.program=b}}new a;
```

---

### 优势

- #### ES6

- #### 基于 babel 工具链，本身也是 babel 插件

- #### 可高度定制（把压缩每一步分拆到不同的 plugin 处理）

---

### EOF

### Thank you.
