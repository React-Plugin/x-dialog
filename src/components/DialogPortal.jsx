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
    buttons: PropTypes.array,
    closeIcon: PropTypes.node
  };
  static defaultProps = {
    isShow: false,
    mask: true,
    className: "",
    zIndex: 9,
    closeIcon: <button className="dialog-close"><span>×</span></button>,
    buttons:[{text:'确定',className:'d-ok',handle:Dialog.hide.bind(this)}] //<div><button className="d-ok">确认</button><button className="d-cancel" onClick={this.hide.bind(this)}>返回</button></div>
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
      setTimeout(() => this.refs.dialog.className += " opacity-animate", 0);
      let height = Number(this.refs.dialogContent.offsetHeight);
      let maxHeight = Number(document.documentElement.clientHeight);
      if (height > maxHeight) {
        this.refs.dialogContent.style.height = maxHeight + "px";
        this.refs.dialogBody.style.height =
          maxHeight -
          this.refs.dialogHeader.offsetHeight -
          this.refs.dialogFooter.offsetHeight +
          "px";
        console.log(maxHeight,this.refs.dialogHeader.offsetHeight,this.refs.dialogFooter.offsetHeight,this.refs.dialogBody.style.height);
      }
    });
    this.timerHide();
  }
  hide() {
    console.log("hide");
    let cls = this.refs.dialog.className;
    this.refs.dialog.className = cls.replace(
      "opacity-animate",
      "opacity-animate-hide"
    );
    setTimeout(this._hide.bind(this), 300);
  }
  _hide() {
    this.setState({ isShow: false });
  }
  render() {
    return this.state.isShow
      ? <div className={ this.props.mask ? "x-dialog-continer x-dialog-mask" : "x-dialog-continer"}>
          <div
            className="x-dialog"
            ref="dialog"
            style={{ zIndex: this.props.zIndex }}
          >
            <div
              className={"dialog-content " + this.props.className}
              ref="dialogContent"
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
                {this.props.buttons
                  ? <div className="dialog-action">{this.props.buttons}</div>
                  : undefined}
              </div>
            </div>
          </div>
        </div>
      : <div />;
  }
}
