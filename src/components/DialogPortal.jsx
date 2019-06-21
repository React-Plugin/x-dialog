/*
 * Created with Visual Studio Code.
 * github: https://github.com/React-Plugin/x-dialog
 * User: 田想兵
 * Date: 2017-05-16
 * Time: 20:00:00
 * Contact: 55342775@qq.com
 */
import React, { PureComponent } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import Draggable from 'react-draggable';
let lastDialog = null,dialogList = [];
export default class Dialog extends PureComponent {
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
    okCallback: PropTypes.func,
    dragHandle: PropTypes.string,
    draggable: PropTypes.bool,
    maskHide: PropTypes.bool
  };
  static defaultProps = {
    isShow: false,
    mask: true,
    className: "",
    zIndex: 0,
    maskHide: true,
    closeIcon: <button className="dialog-close"><span>×</span></button>,
    dragHandle: '.dialog-title',
    draggable: false,
    afterHide: () => { },
    afterShow: () => { },
    okCallback: () => { }
  };
  constructor(props) {
    super(props);
    this.id =  +new Date();
    this.dialog = null;
    this.state = { isShow: props.isShow, defaultPosition: {}, bounds: {} };
    this.keyBind = this.keyBind.bind(this); //方便移除事件绑定.每次bind会生成新的对象
    this.setDialogRef = element => {
      this.dialog = element;
    };
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
    lastDialog =null;
    dialogList.forEach((item,i)=>{
      if(item.id ===this.id){
        dialogList.splice(i,1)
      }
    })
    document.removeEventListener("keydown", this.keyBind);
  }
  componentDidMount() {
    // console.log(this.dialog)
    document.addEventListener("keydown", this.keyBind);
    if (this.props.isShow) {
      this.show(this.props)
    }
    lastDialog = this;
    dialogList.push({instance:this,id:this.id});
  }
  keyBind = (e) => {
    // console.log(e);
    if (e.keyCode === 27) {
      // console.log(this.dialog)
      this.hide();
    }
  }
  clearTimer() {
    this.timer && clearTimeout(this.timer);
  }
  show(newProps) {
    // console.log("show");
    let _this = this;
    this.clearTimer();
    this.setState({ isShow: true }, () => {
      let st = setTimeout(() => {
        clearTimeout(st);
        _this.dialog.className ? _this.dialog.className += " opacity-animate" : undefined;
        // console.log(this.refs.dialogContent.offsetHeight)
        // console.log(-this.refs.dialogContent.offsetLeft,-this.refs.dialogContent.offsetTop)
        let ch = document.documentElement.clientHeight;
        let dh = _this.refs.dialogContent.offsetHeight
        let stop = document.documentElement.scrollTop;
        let ot = parseInt(_this.refs.dialogContent.offsetTop);
        let sl = document.documentElement.scrollLeft;
        let x = 0, y = 0;
        if (ot < 0) {
          y = 0;
        } else {
          y = Math.max(0, parseInt((ch - dh) / 2)) + stop;
        }

        // console.log(ot,y)
        _this.setState({
          defaultPosition: {
            x: sl + parseInt((document.documentElement.clientWidth - _this.refs.dialogContent.offsetWidth) / 2),
            y//: parseInt((document.documentElement.clientHeight - this.refs.dialogContent.offsetHeight) / 2)
          },
        }, () => {
          _this.props.afterShow();
          // console.log(this.state.bounds);
          // this.setState({
          //   bounds: {
          //     left: -this.refs.dialogContent.offsetLeft,
          //     top: -this.refs.dialogContent.offsetTop,
          //     right: Math.max(document.body.scrollWidth,document.documentElement.offsetWidth)-this.refs.dialogContent.offsetLeft -this.refs.dialogContent.offsetWidth, //this.refs.dialogContent.offsetLeft ,
          //     bottom: Math.max(document.body.scrollHeight,document.documentElement.offsetHeight,ch)-this.refs.dialogContent.offsetTop -this.refs.dialogContent.offsetHeight,
          //   }
          // });
        });
        // console.log(-this.refs.dialogContent.offsetLeft,-this.refs.dialogContent.offsetTop)
        // console.log(this.refs.dialogContent.clientHeight,this.refs.dialogContent.offsetHeight)
        let height = parseInt(_this.refs.dialogContent.offsetHeight);
        let maxHeight =
          newProps.height || parseInt(document.documentElement.clientHeight);
        if (height >= maxHeight) {
          _this.refs.dialogContent.style.height = maxHeight + "px";
          let bodyHeight =
            maxHeight -
            (_this.refs.dialogHeader.offsetHeight || 0) -
            (_this.refs.dialogFooter.offsetHeight || 0) - 2;
            _this.refs.dialogBody.style.height = Math.max(0, bodyHeight) + "px";
          // console.log(bodyHeight);
          // console.log(
          //   maxHeight,
          //   this.refs.dialogHeader.offsetHeight,
          //   this.refs.dialogFooter.offsetHeight,
          //   this.refs.dialogBody.style.height
          // );
        }
        // _this.refs.dialogContent.style.zIndex = _this.props.zIndex;
        // _this.dialog.style.height = _this.refs.dialogBody.clientHeight+'px';
        // _this.dialog.style.width = _this.refs.dialogBody.clientWidth+'px';
      }, 0);
    });
    this.timerHide(newProps);
  }
  hide() {
    // console.log("hide");
    // this._hide();
    if (this.dialog) {
      let cls = this.dialog.className;
      this.dialog.className = cls.replace(
        "opacity-animate",
        "opacity-animate-hide"
      );
    }
    this._hide();
    // this.dialog.current.addEventListener('transitionend', this._hide.bind(this));
    // setTimeout(this._hide.bind(this), 300);
  }
  _hide() {
    this.setState({ isShow: false }, () => {
      this.props.afterHide();
    });
  }
  maskHandle = () => {
    this.hide();
  }
  renderHTML() {
    let { local, buttons, okCallback } = this.props;
    if (typeof buttons === "undefined") {
      this.buttons = (
        <div>
          <button className="d-ok" onClick={okCallback.bind(this)}>
            {local.submit}
          </button>
          <button className="d-cancel" onClick={this.hide.bind(this)}>
            {local.cancel}
          </button>
        </div>
      );
    } else if (buttons) {
      this.buttons = buttons;
    } else {
      this.buttons = undefined;
    }
    // console.log(this.buttons);
    // console.log(this.state.bounds)
    if (this.state.isShow) {
      let DD = this.props.draggable ? <Draggable handle={this.props.dragHandle || ".dialog-title"} bounds='html'>{this.renderDialog()}</Draggable> : this.renderDialog();
      if (this.props.mask) {
        return <div
          className={"x-dialog-continer"
          }
        >
          <div className="x-dialog" ref={this.setDialogRef}>
            {DD}
            <div className="x-dialog-mask" onClick={this.maskHandle}></div>
          </div>
        </div>
      } else {
        return <div className="x-dialog" ref={this.setDialogRef}>
          {DD}
        </div>
      }
    } else {
      return null;
    }
    // return this.state.isShow
    //   ? <div
    //     className={
    //       this.props.mask
    //         ? "x-dialog-continer x-dialog-mask"
    //         : "x-dialog-continer"
    //     }
    //     style={{ zIndex: this.props.zIndex }}
    //   >
    //     <div className="x-dialog" ref="dialog">
    //       <Draggable bounds="parent">{this.renderDialog()}</Draggable>
    //     </div>
    //   </div>
    //   : <div />;
  }
  static  hide(){
    lastDialog && lastDialog.hide();
  }
  static hideAll(){
    dialogList.forEach(item=>{
      item.instance.hide()
    });
  }
  onFocus =()=>{
    lastDialog = this;
    this.props.onClick();
  }
  renderDialog() {
    let { local, buttons, okCallback } = this.props;
    return <div
      className={"dialog-content " + this.props.className}
      ref="dialogContent"
      onClick={this.onFocus}
      style={{
        width: this.props.width || "auto",
        height: this.props.height || "auto",
        top: this.state.defaultPosition.y,
        left: this.state.defaultPosition.x,
        zIndex:this.props.zIndex
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
  }
  render() {
    return this.renderHTML();
  }
}
