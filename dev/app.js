import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from '../src/index';
import '../src/_index.scss';

var appElement = document.getElementById('example');
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isShow: false };
  }
  noAction() {
    // this.setState({ isShow:true });
    // this.replaceState()
    this.state ={isShow:true,title:"我是标题啊",buttons:false};
    this.setState({});
  }
  defaultDialog(){
    this.state ={isShow:true,title:"我是标题啊"};
    this.setState({});
  }
  noheadfoottimer(){
    this.state = {isShow:true,timer:2000,buttons:false};
    this.setState({});
  }
  setWH(){
    this.state = {isShow:true,title:'固定宽高的浮层',height:400,width:300};
    this.setState({});
  }
  showCallback(){
    this.state ={isShow:true,title:"这是一个显示的回调例子",afterShow:()=>alert('我显示出来了')};
    this.setState({});
  }
  hideCallback(){
    this.state ={isShow:true,title:"这是一个隐藏的回调例子",afterHide:()=>alert('我又隐藏了')};
    this.setState({});
  }
  showButtons(){
    this.state ={isShow:true,title:"这是一个自定义按钮的例子",buttons: <div><button className="d-ok" onClick={this.hide.bind(this)}>我知道了</button><button className="d-cancel" onClick={this.hide.bind(this)}>关闭</button></div>};
    this.setState({});
  }
  hide(){
    this.setState({isShow:false});
  }
  render() {
    return (
      <div>
        <button onClick={this.defaultDialog.bind(this)}>默认弹窗</button>
        <button onClick={this.noAction.bind(this)}>不带按钮</button>
        <button onClick={this.noheadfoottimer.bind(this)}>没有头尾定时关闭</button>
        <button onClick={this.setWH.bind(this)}>固定宽高的弹窗</button>
        <button onClick={this.showCallback.bind(this)}>显示的回调方式</button>
        <button onClick={this.hideCallback.bind(this)}>隐藏的回调方式</button>
        <button onClick={this.showButtons.bind(this)}>自定义按钮</button>
        <Dialog 
        {...this.state}
        >
          <div>You're looking at an example modal in the dashboard theme.</div>
          <div>You're looking at an example modal in the dashboard theme.</div>
          <div>You're looking at an example modal in the dashboard theme.</div>
          <div>You're looking at an example modal in the dashboard theme.</div>
          <div>You're looking at an example modal in the dashboard theme.</div>
          <div>You're looking at an example modal in the dashboard theme.</div>
          <div>You're looking at an example modal in the dashboard theme.</div>
          <div>You're looking at an example modal in the dashboard theme.</div>
          <div>You're looking at an example modal in the dashboard theme.</div>
        </Dialog>
      </div>
    )
  }
}
ReactDOM.render(<App />, appElement);