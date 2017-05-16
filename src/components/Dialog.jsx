/*
 * Created with Visual Studio Code.
 * github: https://github.com/React-Plugin/x-dialog
 * User: 田想兵
 * Date: 2017-05-16
 * Time: 20:00:00
 * Contact: 55342775@qq.com
 */
import React, { Component, PropTypes } from "react";
import ReactDOM from "react-dom";

export default class Dialog extends Component {
  static propTypes = {
    isShow: PropTypes.bool.isRequired,
		mask:PropTypes.bool,
    children: PropTypes.node
  };
  static defaultProps = {
    isShow: false,
		mask:true
  };
  constructor(props) {
    super(props);
    this.state = { isShow: props.isShow };
  }
  componentWillReceiveProps(newProps) {
    console.log(newProps.isShow, this.state.isShow);
    if (newProps.isShow && !this.state.isShow) {
      this.show();
    } else if (!newProps.isShow && this.state.isShow) {
      this.hide();
    }
  }
  timerHide() {
    if (this.props.timer) {
      this.clearTimer();
      this.timer = setTimeout(() => {
        this.hide();
      }, this.props.timer);
    }
  }
  componentWillUnmount() {
    this.clearTimer();
  }
  clearTimer() {
    this.timer && clearTimeout(this.timer);
  }
  show() {
    console.log("show");
    this.clearTimer();
    this.setState({ isShow: true });
    this.timerHide();
  }
  hide() {
    console.log("hide");
    this.setState({ isShow: false });
  }
  render() {
    console.log(12345);
    return this.state.isShow
      ? (<div className="dialog">
          <div className="dialog-content">
						<div className="dialog-title">{this.props.title}</div>
						<div className="dialog-body">{this.props.children}</div>
						<div className="dialog-action"></div>
					</div>
					{this.props.mask?<div className="mask"/>:undefined}
        </div>)
      : <div />;
  }
}
