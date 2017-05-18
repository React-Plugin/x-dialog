/*
 * Created with Visual Studio Code.
 * github: https://github.com/React-Plugin/x-dialog
 * User: 田想兵
 * Date: 2017-05-16
 * Time: 20:00:00
 * Contact: 55342775@qq.com
 */
import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

export default class Dialog extends Component {
  static propTypes = {
    isShow: PropTypes.bool.isRequired,
    mask: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    zIndex: PropTypes.number,
    height: PropTypes.number,
    buttons: PropTypes.node,
    closeIcon:PropTypes.node
  };
  static defaultProps = {
    isShow: false,
    mask: true,
    className: "",
    zIndex: 9,
    closeIcon:<i className="dialog-close">x</i>
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
    this.setState({ isShow: true }, () => {
      setTimeout(
        () => this.refs.dialog.className += " opacity-animate",
        0
      );
      let height = Number(this.refs.dialogContent.offsetHeight);
      let maxHeight = Number(document.documentElement.clientHeight);
      if(height>maxHeight){
        this.refs.dialogContent.style.height = maxHeight + "px";
      }
    });
    this.timerHide();
  }
  hide() {
    console.log("hide");
    let cls = this.refs.dialog.className;
    this.refs.dialog.className = cls.replace('opacity-animate','opacity-animate-hide');
    this.refs.dialog.addEventListener('transitionend',()=>{
        this.setState({ isShow: false });
    })
  }
  render() {
    return this.state.isShow
      ? <div
          className="dialog"
          ref="dialog"
          style={{ zIndex: this.props.zIndex }}
        >
          <div
            className={"dialog-content " + this.props.className}
            ref="dialogContent"
          >
            {this.props.title
              ? <div className="dialog-title">{this.props.title}<div onClick={this.hide.bind(this)}>{this.props.closeIcon}</div></div>
              : undefined}
            <div className="dialog-body">{this.props.children}</div>
            <div className="dialog-action">{this.props.buttons}</div>
          </div>
          {this.props.mask ? <div className="mask" /> : undefined}
        </div>
      : <div />;
  }
}
