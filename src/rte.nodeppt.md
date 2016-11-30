title: 富文本编辑器分享
speaker: leroyxyli
url: https://github.com/Hakurouken
transition: slide
files: /css/theme.dark.css

[slide]
# 富文本编辑器

[slide]
# 目录
1. 定义
2. 现有编辑器对比
3. 基本原理和API
4. 坑
5. XSS/BBCODE

[slide]
# 定义
## RTE(Rich Text Editor)

## 内嵌于浏览器

## 所见即所得(WYSIWYG)

[slide]
# 现有编辑器对比

[slide]
# 编辑代码类
## codemirror/ace-editor

[slide]
### 编辑类（WYSIWYG）
编辑器 | 大小 | 优点 | 缺点 | 采用公司
:-- | :-- | :-- | :-- | :--
ckeditor(fckeditor) | 500k(不含插件) | 插件多,功能大而全，社区活跃 | 大 | IBM/Adobe/Oracle
quill | 120k | 体积小，有一定的移动端支持 | 比较新、社区不活跃 | -
tinymce | 357k(573k) | 插件多，功能全，社区活跃 | 普通模式是LGPL/高级功能是商业协议 | evernote/linkedin
ueditor | 350k | 可定制 | 坑比较多、丑 | 百度
umeditor | 137k | 插件开发方便，社区活跃 | 同上 | 百度、手游宝PC版
kindEditor | 160k | 体积较小 | 表格支持有一定缺陷 | paipai/有道/土豆
VEditor/QREditor | - | - | - | 内部组件

[slide]
# 不建议自己造轮子，坑比较多

[slide]
## 基本原理和API

[slide]
## 对某元素启用编辑模式
## 用 iframe 或 dom 元素作为container
### HTMLElement.contentEditable() / Document.designmode()
<br>
#### javascript
```javascript
element.contentEditable = true;
document.designmode = 'on';
```
<br>
#### html
<br>
```html
	<div id="editor-container" contentEditable="true"></div>
```

[slide]
## 基本指令
### Document.execCommand()
```javascript
/**
 * 操作编辑区域的内容
 * @param String aCommandName 命令名称
 * @param Boolean aShowDefaultUI 是否显示默认UI，gecko中不支持，IE支持，默认为false
 * @param String value 额外的参数值(如insertimage需要提供这个image的url),默认为null
 */
bool = document.execCommand(aCommandName, aShowDefaultUI, aValueArgument)
```

示例：

```javascript
document.execCommand('bold'); // 加粗
document.execCommand('italic'); // 倾斜
document.execCommand('underline'); // 下划线
document.execCommand('strikeThrough'); // 删除线
document.execCommand('createLink', true, 'http://qt.qq.com'); // 为所选文字加链接
```

[slide]
* 支持Command参数 [(详见MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand "execCommand")
	* backColor ( 背景颜色 )
	* bold ( 加粗 )
	* contentReadOnly ( 只读 )
	* copy ( 复制到剪切板 )
	* createLink ( 创建链接 )
	* cut ( 剪切 )
	* insert ( 插入 )
	* insertHTML ( 插入HTML )
	* insertImage ( 插入图片 )
	* indent ( 缩进 )
	* delete ( 删除 )
	* fontSize ( 字体大小 )
	* selectAll ( 全选 )
	* styleWithCss (采用CSS控制样式)
	* ...

[slide]
### Document.queryCommandState()
### 查询在当前选中区域中，命令是否被执行
```javascript
/**
 * 操作编辑区域的内容
 * @param String command 命令名称
 */
bool = document.queryCommandState(command)
```

示例:

```javascript
document.queryCommandState('bold'); // 加粗
document.queryCommandState('italic'); // 倾斜
```

[slide]
## Selection/Range
### 所选区域 / 文本区域

** IE 和 W3C 标准不一致，仅以W3C规范为例 **
```javascript
	var selection = window.getSelection(), // var section = document.getSelection();
		selectedRange = selection.getRangeAt(0),
		newRange = document.createRange();
```

[slide]
## Range对象 [(详见MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Range "Range")
* 属性
	* collasped ( Range起点和终点是否一致 )
	* startContainer ( Range开始的DOM元素 )
	* endContainer ( Range结束的DOM元素 )
	* commonAncestorContainer ( 包含该Range的最深层元素 )
	* startOffset ( Range起点在startContainer中的偏移量 )
	* endOffset ( Range起点在endContainer中的偏移量 )

* 方法
	* setStart() / setEnd()
	* setStartBefore() / setEndBefore() / setStartAfter() / setEndAfter()
	* collapse()
	* deleteContents() / extractContents()
	* cloneRange()
	* getBoundingClientRect()

[slide]
## 各种坑举例

[slide]
* 浏览器兼容性
	* IE 9-
	* IE 9
	* IE 10+
	* chrome
	* safari
	* firefox

[slide]
```javascript
document.execCommand("FormatBlock",false,'<pre>');
// 只支持块级元素 (不能使用<code>)
// IE中不能写成nodename ('pre')
```

[slide]
## pre 中，chrome/safari换行会生成新的pre
```html
<!--期望-->
<pre>
	there is a line
	<br/>
	another line
</pre>
<!--结果-->
<pre>there is a line</pre>
<pre>another line</pre>
```

解决方案:
监听enter，阻止事件，插入br
```
var doc = document;
dom.addEventListener('keydown', function(e){
	var selection,
		range,
		br;
    if(e.which === 13){ // enter 的键盘码
      e.preventDefault();

      selection = window.getSelection();
      range = selection.getRangeAt(0);
      br = doc.createElement('br');

      // 插入空行
      range.insertNode(br);
      // 光标移动到 br 后
      range.setStartAfter(br);
      range.setEndAfter(br);
      // 移动光标到下一行
      selection.removeAllRanges();
      selection.addRange(range);
    }
});
```
[slide]
## webkit下，初次换行需要按两次回车
** 原因: dom结构中的最后一个元素为br才能换新行 **

<br>
<p style="text-align:left;">解决方案</p>
<p style="text-align:left;">当Range末尾没有换行符号时，加入两个br，并替换多余的br</p>

[slide]
## indent 引用
**document.queryCommandState('indent')始终是false**

<br>
<p style="text-align:left;">解决方案：</p>
<p style="text-align:left;">判断是否在 blockquote 中</p>

<p style="text-align:left;"><small>注：老版本chrome/safari 会像pre标签一样，在换行时生成多个blockquote，需要特殊处理</small></p>
<p style="text-align:left;"><small>注2: 取消引用指令是 outdent</small></p>

[slide]
### 旧版本Ueditor中，输入中文文字的时候会突然消失
```javascript
    me.addListener( 'keydown', function( type, evt ) {
        var keyCode = evt.keyCode || evt.which;

        if ( !keys[keyCode] && !evt.ctrlKey && !evt.metaKey && !evt.shiftKey && !evt.altKey ) {

            if ( me.undoManger.list.length == 0 || ((keyCode == 8 ||keyCode == 46) && lastKeyCode != keyCode) ) {

                me.undoManger.save(); // 问题出在这里！
                lastKeyCode = keyCode;
                return

            }
            //trace:856
            //修正第一次输入后，回退，再输入要到keycont>maxInputCount才能在回退的问题
            if(me.undoManger.list.length == 2 && me.undoManger.index == 0 && keycont == 0){
                me.undoManger.list.splice(1,1);
                me.undoManger.update();
            }
            lastKeyCode = keyCode;
            keycont++;
            if ( keycont > maxInputCount ) {

                setTimeout( function() {
                    me.undoManger.save();
                }, 0 );

            }
        }
    });
```
[slide]
### 解决方案1：
```javascript
    //监听是否在输入法状态下
    var inputType = false;
    me.addListener('ready', function () {
        domUtils.on(this.body, 'compositionstart', function () {
            inputType = true;
        });
        domUtils.on(this.body, 'compositionend', function () {
            inputType = false;
        })
    });
```
### 解决方案2：修正undo.save方法
```javascript
// 此处的select方法内部会调用 Section.prototype.removeAllRanges 的方法
// 在 webkit 下会导致在输入状态下的输入法所输入的东西丢失
// getScene 只在 undo/save 中被调用
range.moveToBookmark( bookmark )/*.select(true)*/;
```

[slide]
## XSS && BBCODE


[slide]
* XSS注入
	* 存储型： 存储在数据库里
	* 反射型： 没有存储在数据库中

[slide]
* 成熟解决方案：
	* HTML Purifier (php)
	* OWASP AntiSamy (java/.net)
	* Java HTML Sanitizer (java)
	* JSXSS (node)

[slide]
* xss过滤注意事项
	* 采用白名单过滤标签/属性(不要采用黑名单)
	* 防止标签属性越界
	* 链接特殊处理
	* embed 等标签特殊处理
	* 文件上传

[slide]
## BBCode (Bulletin Board Code)

轻量级标记语言

可翻译成html

[slide]
bbcode | html
:--- | :---
```[b]bolded text[/b]``` | ```<strong>bolded text</strong>```
```[url]http://example.org[/url]``` | ```<a href="http://example.org">http://example.org</a>```
```url=http://example.com]Example[/url]``` | ```<a href="http://example.com">Example</a>```
```[quote="author"]quoted text[/quote]``` | ```<blockquote><p>quoted text</p></blockquote>```
```[style color=#FF0000]Red Text[/style]``` | ```<span style="color:red;">Red Text</span>```
```[list][*]Entry 1[*]Entry 2[/list]``` | ```<ul><li>Entry 1</li><li>Entry 2</li></ul>```

[slide]
## Thanks.
