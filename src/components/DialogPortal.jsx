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
    buttons: PropTypes.any,
    closeIcon: PropTypes.node,
    afterHide: PropTypes.func,
    afterShow: PropTypes.func,
    okCallback: PropTypes.func
  };
  static defaultProps = {
    isShow: false,
    mask: true,
    className: "",
    zIndex: 9,
    closeIcon: <button className="dialog-close"><span>×</span></button>,
    afterHide: () => { },
    afterShow: () => { },
    okCallback: () => { }
  };
  constructor(props) {
    super(props);
    this.state = { isShow: props.isShow };
    this.keyBind = this.keyBind.bind(this); //方便移除事件绑定.每次bind会生成新的对象
  }
  componentWillReceiveProps(newProps) {
    // console.log(newProps.isShow, this.state.isShow);
    if (newProps.isShow && !this.state.isShow) {
      this.show(newProps);
    } else if (!newProps.isShow && this.state.isShow) {
      this.hide(newProps);
    }
  }
  timerHide(newProps) {
    if (newProps.timer) {
      this.clearTimer();
      this.timer = setTimeout(() => {
        this.state.isShow && this.hide();
      }, newProps.timer);
    }
  }
  componentWillUnmount() {
    this.clearTimer();
    // console.log("unmount");
    document.removeEventListener("keydown", this.keyBind);
  }
  componentDidMount() {
    document.addEventListener("keydown", this.keyBind);
    if(this.props.isShow){
      this.show()
    }
  }
  keyBind(e) {
    console.log(e);
    if (e.keyCode === 27) {
      this.hide();
    }
  }
  clearTimer() {
    this.timer && clearTimeout(this.timer);
  }
  show(newProps) {
    // console.log("show");
    this.clearTimer();
    this.setState({ isShow: true }, () => {
      setTimeout(() => { this.refs.dialog.className ? this.refs.dialog.className += " opacity-animate":undefined; }, 0);
      let height = Number(this.refs.dialogContent.offsetHeight);
      let maxHeight =
        newProps.height || Number(document.documentElement.clientHeight);
      if (height >= maxHeight) {
        this.refs.dialogContent.style.height = maxHeight + "px";
        let bodyHeight =
          maxHeight -
          (this.refs.dialogHeader.offsetHeight || 0) -
          (this.refs.dialogFooter.offsetHeight || 0);
        this.refs.dialogBody.style.height = Math.max(0, bodyHeight) + "px";
        // console.log(bodyHeight);
        // console.log(
        //   maxHeight,
        //   this.refs.dialogHeader.offsetHeight,
        //   this.refs.dialogFooter.offsetHeight,
        //   this.refs.dialogBody.style.height
        // );
      }
      this.props.afterShow();
    });
    this.timerHide(newProps);
  }
  hide() {
    // console.log("hide");
    let cls = this.refs.dialog.className;
    this.refs.dialog.className = cls.replace(
      "opacity-animate",
      "opacity-animate-hide"
    );
    setTimeout(this._hide.bind(this), 300);
  }
  _hide() {
    this.setState({ isShow: false }, () => {
      this.props.afterHide();
    });
  }
  render() {
    if (typeof this.props.buttons === "undefined") {
      this.buttons = (
        <div>
          <button className="d-ok" onClick={this.props.okCallback.bind(this)}>
            确认
          </button>
          <button className="d-cancel" onClick={this.hide.bind(this)}>
            返回
          </button>
        </div>
      );
    } else if (this.props.buttons) {
      this.buttons = this.props.buttons;
    } else {
      this.buttons = undefined;
    }
    // console.log(this.buttons);
    return this.state.isShow
      ? <div
        className={
          this.props.mask
            ? "x-dialog-continer x-dialog-mask"
            : "x-dialog-continer"
        }
        style={{ zIndex: this.props.zIndex }}
      >
        <div className="x-dialog" ref="dialog">
          <div
            className={"dialog-content " + this.props.className}
            ref="dialogContent"
            style={{
              width: this.props.width || "auto",
              height: this.props.height || "auto"
            }}
          >
            {this.props.title
              ? <div className="dialog-title" ref="dialogHeader">
                <h4>{this.props.title}</h4>
                <div
                  onClick={this.hide.bind(this)}
                  className="dialog-close-con"
                >
                  {this.props.closeIcon}
                </div>
              </div>
              : undefined}
            <div className="dialog-body" ref="dialogBody">
              {this.props.children}
            </div>
            <div ref="dialogFooter">
              {this.buttons
                ? <div className="dialog-action">{this.buttons}</div>
                : undefined}
            </div>
          </div>
        </div>
      </div>
      : <div />;
  }
}
