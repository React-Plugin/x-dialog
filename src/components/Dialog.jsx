/*
 * Created with Visual Studio Code.
 * github: https://github.com/React-Plugin/x-dialog
 * User: 田想兵
 * Date: 2017-05-16
 * Time: 20:00:00
 * Contact: 55342775@qq.com
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import DialogPortal from './DialogPortal';
import I18n from 'x-i18n';

const renderSubtreeIntoContainer = ReactDOM.unstable_renderSubtreeIntoContainer;
let container = {};
// let zIndex=9;
export default class Dialog extends Component {
  static defaultZIndex = 1000;
  static zIndex = Dialog.defaultZIndex;
  static show(config) {
    let myRef = React.createRef();
    let div = document.createDocumentFragment('div')
    var f;
    let currentConfig = {
      children: config.content, ...config, isShow: true, ref: ref => {
        myRef = ref;
        //针对不同的版本进行兼容
        let t = setTimeout(() => {
          clearTimeout(t);
          f && f(myRef);
        })
        return myRef;
      },
      id: +new Date()
    };
    container[currentConfig.id] = div;
    function render(props) {
      ReactDOM.render(<Dialog {...props} />, div)
    }
    render(currentConfig);
    return (t) => {
      f = t;
    };
  }
  static topDialog = null;
  static hide() {
    DialogPortal.hide();
  }
  static hideAll() {
    DialogPortal.hideAll()
  }
  static propTypes = {
    isShow: PropTypes.bool.isRequired,
    mask: PropTypes.bool,
    children: PropTypes.node
  };
  static defaultProps = {
    isShow: false,
    mask: true,
    container: document.body
  };
  // static getDerivedStateFromProps(props, state){
  //   if(state.isShow!==props.isShow){
  //     return {isShow:props.isShow};
  //   }
  // }
  componentWillReceiveProps(newProps) {
    if (newProps.isShow != this.state.isShow) {
      if (newProps.isShow) {
        Dialog.zIndex++
      }
      this.setState({ isShow: newProps.isShow, zIndex: Dialog.zIndex });
    }
  }
  constructor(props) {
    super(props);
    if (typeof props.zIndex !== 'undefined') {
      Dialog.zIndex = props.zIndex;
    }
    Dialog.zIndex++
    this.state = { isShow: props.isShow, zIndex: Dialog.zIndex };
    this.dialog = React.createRef();
  }
  hide = (id) => {
    this.setState({ isShow: false }, () => {
      if (this.node) {
        if (id && container[id]) {
          ReactDOM.unmountComponentAtNode(container[id]);
          container[id] = null;
          delete container[id];
        }
        let result = ReactDOM.unmountComponentAtNode(this.node);
        // console.log(result)
        this.node.parentNode.removeChild(this.node)
        this.node = null;
      }
    });
  }
  //props有更新时调用事件,更新portal组件，相当于render。
  // componentWillReceiveProps(newProps) {
  //   this.renderPortal(newProps);
  // }
  componentDidUpdate() {
    this.renderPortal();
  }
  //初始化时插入父级和渲染一次portal组件
  componentDidMount() {
    Dialog.topDialog = this;
    this.renderPortal();
  }
  //模拟render方法，调用portal组件时传入父级容器
  renderPortal() {
    // console.log(this.props)
    let dd = (
      <I18n componentName="Dialog" defaultValue={this.props.local}>
        {this.renderContent}
      </I18n>);
    if (!this.state.isShow) {
      dd = null;
    } else if (!this.node) {
      this.node = document.createElement("div");
      if (typeof this.props.container === 'string') {
        document.querySelector(this.props.container).appendChild(this.node);
      } else {
        this.props.container.appendChild(this.node);
      }
      renderSubtreeIntoContainer(
        this,
        dd,
        this.node
      );
    } else {
      renderSubtreeIntoContainer(
        this,
        dd,
        this.node
      );
    }
  }
  maxreset = (status) => {
    // console.log('max',this.node)
    if (status === 'reset') {
      let maxContainer = document.body;
      if(typeof this.props.maxContainer === 'string'){
        maxContainer = document.querySelector(this.props.maxContainer)
      }else if (typeof this.props.maxContainer === 'object') {
        maxContainer = this.props.maxContainer;
      }
      maxContainer.appendChild(this.node);
    } else {
      if (typeof this.props.container === 'string') {
        document.querySelector(this.props.container).appendChild(this.node);
      } else {
        this.props.container.appendChild(this.node);
      }
    }
  }
  renderContent = (local) => {
    // console.log(this.props)
    let props = { ...this.props };
    props.updateList = (DialogList) => {
      if (DialogList.length === 0) {
        Dialog.zIndex = Dialog.defaultZIndex;
        // this.setState({zIndex:Dialog.zIndex})
      }
    }
    props.afterHide = (id) => {
      this.props.afterHide && this.props.afterHide();
      this.hide(id);
    }
    props.maxreset = this.maxreset;
    if (this.state.isShow) {
      if (this.props.draggable) {
        return (
          <DialogPortal ref={ref => this.dialog = ref} {...props} {...this.state} local={local} onClick={this.onFocus} />
        )
      } else {
        return <DialogPortal ref={ref => this.dialog = ref} {...props} {...this.state} local={local} onClick={this.onFocus} />
      }
    }
  }

  onFocus = (e) => {
    e.stopPropagation();
    if (this != Dialog.topDialog) {
      Dialog.topDialog = this;
      Dialog.zIndex++;
      this.setState({ zIndex: Dialog.zIndex });
    }
  }
  //组件销毁时触发,移除绑定
  componentWillUnmount() {
    if (this.node) {
      ReactDOM.unmountComponentAtNode(this.node);
      this.node.parentNode.removeChild(this.node);
      this.node = null;
      this.props.afterHide && this.props.afterHide()
    }
  }
  render() {
    return null;
  }
}
