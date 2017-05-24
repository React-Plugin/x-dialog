# x-dialog

> reactjs的弹窗浮层组件 

我认为，每一个组件都应该有他自带的样式和属性事件回调配置。所以我会给x-dialog默认一套简单的样式，和各种默认的配置项。

演示地址： [x-dialog各种案例演示](https://react-plugin.github.io/x-dialog/)

源文件地址：[https://github.com/react-plugin/x-dialog](https://github.com/react-plugin/x-dialog)

## npm安装 

使用 [npm](https://www.npmjs.com/package/x-dialog) 安装, 运行

```bash
$ npm install x-dialog --save-dev
```
## 调用方式
```js
<Dialog 
      isShow: true
      title: "这是一个例子"
      className:"myClass"
      timer:2000
      width:300
      height:300
      buttons: <div><button className="d-ok" onClick={this.hide.bind(this)}>我知道了</button><button className="d-cancel" onClick={this.hide.bind(this)}>关闭</button></div>
      afterShow:()=>alert('我显示出来了')
      afterHide:()=>alert('我又隐藏了')
        >
    <div>这里是弹窗的内容区域</div>
</Dialog>
```

## 属性方法
### `isShow` :bool类型，控制弹窗的显示隐藏的.
### `title`:string类型，为空时，不显示标题.
### `className`:string类型，弹窗的样式类
### `timer`:number类型，定时关闭，可不传。
### `width`:number类型，弹窗宽度，不足时，内容区域出现上下滚动
### `height`:number类型，弹窗宽度，不足时，内容区域出现上下滚动
### `buttons`:node类型，自定义操作区域的按钮,为false类型时不显示操作区域，不传时默认显示 `确定、取消`
### `okCallback`:func类型，当默认按钮的情况下时，点击`确定`时的回调方法，点`取消`时直接隐藏，如果需要定制更多的方法，建议传递`buttons`属性。
### `afterShow`:func类型，显示的回调方法
### `afterHide`:func类型，关闭隐藏时的回调方法


### 关于作者
[https://github.com/tianxiangbing](https://github.com/tianxiangbing)