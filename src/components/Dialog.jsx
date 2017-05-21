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
const renderSubtreeIntoContainer = ReactDOM.unstable_renderSubtreeIntoContainer;

export default class Dialog extends Component {
  static propTypes = {
    isShow: PropTypes.bool.isRequired,
    mask: PropTypes.bool,
    children: PropTypes.node
  };
  static defaultProps = {
    isShow: false,
    mask: true
  };
  constructor(props) {
    super(props);
    this.state = { isShow: props.isShow };
  }
	//props有更新时调用事件,更新portal组件，相当于render。
  componentWillReceiveProps(newProps) {
    this.renderPortal(newProps);
  }
	//初始化时插入父级和渲染一次portal组件
  componentDidMount() {
    this.node = document.createElement("div");
    document.body.appendChild(this.node);
    this.renderPortal(this.props);
  }
	//模拟render方法，调用portal组件时传入父级容器
  renderPortal(props) {
    console.log(props)
    renderSubtreeIntoContainer(
      this,
      <DialogPortal {...props}/>,
      this.node
    );
  }
	//组件销毁时触发,移除绑定
  componentWillUnmount() {
		ReactDOM.unmountComponentAtNode(this.node);
		this.node.parentNode.removeChild(this.node);
  }
  render() {
    return null;
  }
}
