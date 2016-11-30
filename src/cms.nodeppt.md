title: 用 angular + django 搭建 CMS

speaker: leroyxyli

url: https://github.com/Hakurouken

transition: slide


[slide]
# 用 angular + django 搭建 CMS

[slide]
# 目录

1. 为什么要做新管理端
2. 新管理端技术选型
3. angular 简介
4. django 简介
5. 新管理端项目搭建

[slide]

# 为什么要做新管理端
1. 原系统不稳定，而且无法掌控
2. 原系统 DB 操作不透明
3. 原系统开发测试步骤繁琐
4. 提供的各种库版本太老
5. 抛弃历史包袱

[slide]

# 新管理端技术选型

## CMS系统特征：

* 增删查改
* 大量表单和表格
* 数据驱动
* 功能相对单一

[slide]

## 前端为什么选用 angular

[slide]

## 为什么不采用 jQuery + kendo
## （原框架解决方案）
1. 表格交互、表单验证需要大量DOM操作，过于繁琐
2. kendo 配置复杂，而且小 bug 多
3. kendo 的定制较麻烦

[slide]
## 为什么不采用 django-admin
管理段定制化要求非常高（例如复杂交互、多表联合查询）
用 django-admin 中几乎所有模块都要重写

[slide]

## 为什么不采用 react
1. 组件化的思想和 CMS 管理系统理念不一致 （比起库更需要框架）
2. 组件可复用性不高

[slide]

## 为什么不采用 backbones
太轻量，只包含数据控制，模板等解决方案还需依赖其他库

[slide]
## 为什么不采用 vue.js
目前社区插件太少，大量的组件需要自己封装，人力不足以支持

[slide]
## 为什么不采用 extjs
1. 过于重量级 要完全按照自己的规则
2. 收费限制了社区发展

[slide]

## 为什么不用 angular2
1. 还是 beta 版，可能会有很多API变更
2. 没有第三方组件支持
3. 社区不活跃

[slide]

## angular 的优劣势

### 优势
1. 模板功能强大丰富，自带的 ng 指令很强大
2. 功能完善：模板、数据双向绑定、模块化、服务、路由
3. directive 可以灵活自定义 dom 节点

## 劣势
1. 对 IE 兼容不好
2. 相对轻量级组件和库，需要一定学习成本

[slide]

## 后端为什么选择 django

[slide]

## 为什么选用 django
1. 框架集成度高 orm views template ( 对比 flask/bottle 等轻量框架 )
2. 开发效率高，编码量小
3. 插件多
4. 我们的历史项目中有部分公共组件可以移植

[slide]

# angular 简介

[slide]

## 启动
- `angular.bootstrap`
- dom 上添加 `ng-app="appName"` 属性

## 数据绑定

[ 演示 ](https://jsbin.com/raxebin/edit?html,output)

- 有 `ng-bind` 和 `{{}}` 两种方式
- 数据双向绑定
- 模板和变量更新为 angular 自动完成，无须手动调用代码 (脏检查)


[slide]

## 模块

[ 演示 ](https://jsbin.com/zisire/edit?html,output)

- `angular.module`

- 初始化时需要传入 模块名 + 依赖模块 列表(或空数组)

- 再次调用时只需要模块名

[slide]

## 控制器 ( controller )

[ 演示 ](https://jsbin.com/yuziwo/edit?html,output)

- 划分作用域

- 作用域可嵌套，子作用域可以调用父作用域的变量


[slide]

## 过滤器 ( filter )

[ 演示 ](https://jsbin.com/guvaxul/edit?html,output)

- 格式化输出的函数

- 只影响 html 模板中的显示，不影响属性值本身

[slide]

## 服务 ( service )

[ 演示 ](https://jsbin.com/bamojo/1/edit?html,js,output)

- 单例、依赖注入的共享代码块

- `constant` `value` `factory` `service` `provider`

- angular 内置了很多服务 例如 `$http`,`$timeout`, `$location`

[slide]

## 指令 ( directive )

[ 演示 ](https://jsbin.com/kuwega/edit?html,js,output)

- DOM 元素上的标记 / 自定义 DOM 元素，改变 DOM 行为

[slide]

## 事件 ( event )

[ 演示 ](https://jsbin.com/jiwiri/2/edit?html,js,output)

- 广播 `$broadcast` 发送 `$emit` 接收 `$on`

[slide]

# django 简介
## 详见项目

[slide]

# 新管理端搭建

[slide]

## Thanks.
