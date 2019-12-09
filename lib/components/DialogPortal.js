"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDraggable = require("react-draggable");

var _reactDraggable2 = _interopRequireDefault(_reactDraggable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created with Visual Studio Code.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * github: https://github.com/React-Plugin/x-dialog
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * User: 田想兵
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Date: 2017-05-16
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Time: 20:00:00
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Contact: 55342775@qq.com
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var lastDialog = null,
    dialogList = [];

var Dialog = function (_PureComponent) {
  _inherits(Dialog, _PureComponent);

  function Dialog(props) {
    _classCallCheck(this, Dialog);

    var _this2 = _possibleConstructorReturn(this, (Dialog.__proto__ || Object.getPrototypeOf(Dialog)).call(this, props));

    _this2.container = document.documentElement;
    _this2.bounds = 'html';

    _this2.keyBind = function (e) {
      // console.log(e);
      if (e.keyCode === 27) {
        // console.log(this.dialog)
        _this2.hide();
      }
    };

    _this2.setPosition = function (newProps) {
      var _this = _this2;
      _this.dialog.className ? _this.dialog.className += " opacity-animate" : undefined;
      // console.log(this.refs.dialogContent.offsetHeight)
      // console.log(-this.refs.dialogContent.offsetLeft,-this.refs.dialogContent.offsetTop)
      var ch = _this2.container.clientHeight;
      var dh = _this.refs.dialogContent.offsetHeight;
      var stop = _this2.container.scrollTop;
      var ot = parseInt(_this.refs.dialogContent.offsetTop);
      var sl = _this2.container.scrollLeft;
      var x = 0,
          y = 0;
      if (ot < 0) {
        y = 0;
      } else {
        y = Math.max(0, parseInt((ch - dh) / 2)) + stop;
      }

      // console.log(ot,y)
      _this.setState({
        defaultPosition: {
          x: sl + parseInt((_this2.container.clientWidth - _this.refs.dialogContent.offsetWidth) / 2),
          y: y //: parseInt((this.container.clientHeight - this.refs.dialogContent.offsetHeight) / 2)
        }
      }, function () {
        _this.props.afterShow();
      });
      var height = parseInt(_this.refs.dialogContent.offsetHeight);
      var maxHeight = newProps.height || parseInt(_this2.container.clientHeight);
      if (height >= maxHeight) {
        _this.refs.dialogContent.style.height = maxHeight + "px";
        var bodyHeight = maxHeight - (_this.refs.dialogHeader.offsetHeight || 0) - (_this.refs.dialogFooter.offsetHeight || 0) - 2;
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
    };

    _this2.maskHandle = function () {
      _this2.props.maskHide && _this2.hide();
    };

    _this2.onFocus = function () {
      lastDialog = _this2;
      _this2.props.onClick();
    };

    _this2.id = +new Date();
    _this2.dialog = null;
    _this2.state = { isShow: props.isShow, defaultPosition: {} };
    _this2.keyBind = _this2.keyBind.bind(_this2); //方便移除事件绑定.每次bind会生成新的对象
    //容器配置
    if (document.body != _this2.props.container) {
      _this2.container = _this2.props.container;
      console.log('position', _this2.container.style.position);
      if (_this2.container.style.position == 'static' || _this2.container.style.position == '') {
        _this2.container.style.position = 'relative';
        _this2.bounds = 'parent';
        // console.log({left: 0, top: 0, right: this.container.clientWidth, bottom: this.container.clientHeight})
        // this.bounds = {left: 0, top: 0, right: this.container.clientWidth, bottom: this.container.clientHeight};
      }
    } else {
      _this2.container = document.documentElement;
    }
    _this2.setDialogRef = function (element) {
      _this2.dialog = element;
    };
    return _this2;
  }

  _createClass(Dialog, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(newProps) {
      // console.log(newProps.isShow, this.state.isShow);
      if (newProps.isShow && !this.state.isShow) {
        this.show(newProps);
      } else if (!newProps.isShow && this.state.isShow) {
        this.hide(newProps);
      }
    }
  }, {
    key: "timerHide",
    value: function timerHide(newProps) {
      var _this3 = this;

      if (newProps.timer) {
        this.clearTimer();
        this.timer = setTimeout(function () {
          _this3.state.isShow && _this3.hide();
        }, newProps.timer);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this4 = this;

      this.clearTimer();
      // console.log("unmount");
      lastDialog = null;
      dialogList.forEach(function (item, i) {
        if (item.id === _this4.id) {
          dialogList.splice(i, 1);
        }
      });
      this.props.updateList(dialogList);
      document.removeEventListener("keydown", this.keyBind);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      // console.log(this.dialog)
      document.addEventListener("keydown", this.keyBind);
      if (this.props.isShow) {
        this.show(this.props);
      }
      lastDialog = this;
      dialogList.push({ instance: this, id: this.id });
    }
  }, {
    key: "clearTimer",
    value: function clearTimer() {
      this.timer && clearTimeout(this.timer);
    }
  }, {
    key: "show",
    value: function show(newProps) {
      var _this5 = this;

      // console.log("show");
      var _this = this;
      this.clearTimer();
      this.setState({ isShow: true }, function () {
        _this5.setPosition(newProps);
        // let st = setTimeout(() => {
        //   clearTimeout(st);
        //     this.setPosition(newProps);
        // }, 0);
      });
      this.timerHide(newProps);
    }
  }, {
    key: "hide",
    value: function hide() {
      // console.log("hide");
      // this._hide();
      if (this.dialog) {
        var cls = this.dialog.className;
        this.dialog.className = cls.replace("opacity-animate", "opacity-animate-hide");
      }
      // this._hide();
      this.dialog.addEventListener('transitionend', this._hide.bind(this));
      // setTimeout(this._hide.bind(this), 3000);
    }
  }, {
    key: "_hide",
    value: function _hide() {
      var _this6 = this;

      this.setState({ isShow: false }, function () {
        _this6.props.afterHide();
      });
    }
  }, {
    key: "renderHTML",
    value: function renderHTML() {
      var _props = this.props,
          local = _props.local,
          buttons = _props.buttons,
          okCallback = _props.okCallback;

      if (typeof buttons === "undefined") {
        this.buttons = _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement(
            "button",
            { className: "d-ok", onClick: okCallback.bind(this) },
            local.submit
          ),
          _react2.default.createElement(
            "button",
            { className: "d-cancel", onClick: this.hide.bind(this) },
            local.cancel
          )
        );
      } else if (buttons) {
        this.buttons = buttons;
      } else {
        this.buttons = undefined;
      }
      // console.log(this.buttons);
      // console.log(this.state.bounds)
      var maskStyle = {};
      if (this.container == document.body || this.container == document.documentElement) {
        maskStyle = {
          position: 'fixed'
        };
      } else {
        maskStyle = {
          height: this.container.scrollHeight + 'px'
        };
      }
      if (this.state.isShow) {
        var DD = this.props.draggable ? _react2.default.createElement(
          _reactDraggable2.default,
          { handle: this.props.dragHandle || ".dialog-title", bounds: this.bounds },
          this.renderDialog()
        ) : this.renderDialog();
        if (this.props.mask) {
          return _react2.default.createElement(
            "div",
            {
              className: "x-dialog-continer"
            },
            _react2.default.createElement(
              "div",
              { className: "x-dialog", ref: this.setDialogRef, style: { zIndex: this.props.zIndex } },
              DD,
              _react2.default.createElement("div", { style: maskStyle, className: "x-dialog-mask", onClick: this.maskHandle })
            )
          );
        } else {
          return _react2.default.createElement(
            "div",
            { className: "x-dialog", ref: this.setDialogRef, style: { zIndex: this.props.zIndex } },
            DD
          );
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
  }, {
    key: "renderDialog",
    value: function renderDialog() {
      var _props2 = this.props,
          local = _props2.local,
          buttons = _props2.buttons,
          okCallback = _props2.okCallback;

      return _react2.default.createElement(
        "div",
        {
          className: "dialog-content " + this.props.className,
          ref: "dialogContent",
          onClick: this.onFocus,
          style: {
            width: this.props.width || "auto",
            height: this.props.height || "auto",
            top: this.state.defaultPosition.y,
            left: this.state.defaultPosition.x,
            zIndex: this.props.zIndex
          }
        },
        this.props.title ? _react2.default.createElement(
          "div",
          { className: "dialog-title", ref: "dialogHeader" },
          _react2.default.createElement(
            "h4",
            null,
            this.props.title
          ),
          _react2.default.createElement(
            "div",
            {
              onClick: this.hide.bind(this),
              className: "dialog-close-con"
            },
            this.props.closeIcon
          )
        ) : undefined,
        _react2.default.createElement(
          "div",
          { className: "dialog-body", ref: "dialogBody" },
          this.props.children
        ),
        _react2.default.createElement(
          "div",
          { ref: "dialogFooter" },
          this.buttons ? _react2.default.createElement(
            "div",
            { className: "dialog-action" },
            this.buttons
          ) : undefined
        )
      );
    }
  }, {
    key: "render",
    value: function render() {
      return this.renderHTML();
    }
  }], [{
    key: "hide",
    value: function hide() {
      lastDialog && lastDialog.hide();
    }
  }, {
    key: "hideAll",
    value: function hideAll() {
      dialogList.forEach(function (item) {
        item.instance.hide();
      });
    }
  }]);

  return Dialog;
}(_react.PureComponent);

Dialog.propTypes = {
  isShow: _propTypes2.default.bool.isRequired,
  mask: _propTypes2.default.bool,
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  zIndex: _propTypes2.default.number,
  height: _propTypes2.default.number,
  buttons: _propTypes2.default.any,
  closeIcon: _propTypes2.default.node,
  afterHide: _propTypes2.default.func,
  afterShow: _propTypes2.default.func,
  okCallback: _propTypes2.default.func,
  dragHandle: _propTypes2.default.string,
  draggable: _propTypes2.default.bool,
  maskHide: _propTypes2.default.bool
};
Dialog.defaultProps = {
  isShow: false,
  mask: true,
  className: "",
  zIndex: 0,
  maskHide: true,
  closeIcon: _react2.default.createElement(
    "button",
    { className: "dialog-close" },
    _react2.default.createElement(
      "span",
      null,
      "\xD7"
    )
  ),
  dragHandle: '.dialog-title',
  draggable: false,
  afterHide: function afterHide() {},
  afterShow: function afterShow() {},
  okCallback: function okCallback() {},
  container: document.body
};
exports.default = Dialog;