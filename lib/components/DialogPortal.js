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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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


var Dialog = function (_Component) {
  _inherits(Dialog, _Component);

  function Dialog(props) {
    _classCallCheck(this, Dialog);

    var _this = _possibleConstructorReturn(this, (Dialog.__proto__ || Object.getPrototypeOf(Dialog)).call(this, props));

    _this.state = { isShow: props.isShow, defaultPosition: {}, bounds: {} };
    _this.keyBind = _this.keyBind.bind(_this); //方便移除事件绑定.每次bind会生成新的对象
    return _this;
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
      var _this2 = this;

      if (newProps.timer) {
        this.clearTimer();
        this.timer = setTimeout(function () {
          _this2.state.isShow && _this2.hide();
        }, newProps.timer);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.clearTimer();
      // console.log("unmount");
      document.removeEventListener("keydown", this.keyBind);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      document.addEventListener("keydown", this.keyBind);
      if (this.props.isShow) {
        this.show(this.props);
      }
    }
  }, {
    key: "keyBind",
    value: function keyBind(e) {
      // console.log(e);
      if (e.keyCode === 27) {
        this.hide();
      }
    }
  }, {
    key: "clearTimer",
    value: function clearTimer() {
      this.timer && clearTimeout(this.timer);
    }
  }, {
    key: "show",
    value: function show(newProps) {
      var _this3 = this;

      // console.log("show");
      this.clearTimer();
      this.setState({ isShow: true }, function () {
        var st = setTimeout(function () {
          clearTimeout(st);
          _this3.refs.dialog.className ? _this3.refs.dialog.className += " opacity-animate" : undefined;
          // console.log(this.refs.dialogContent.offsetHeight)
          // console.log(-this.refs.dialogContent.offsetLeft,-this.refs.dialogContent.offsetTop)
          _this3.setState({
            defaultPosition: {
              x: parseInt((document.documentElement.clientWidth - _this3.refs.dialogContent.offsetWidth) / 2),
              y: parseInt((document.documentElement.clientHeight - _this3.refs.dialogContent.offsetHeight) / 2)
            }
          }, function () {
            // console.log(this.state.bounds);
            _this3.setState({
              bounds: {
                left: -_this3.refs.dialogContent.offsetLeft,
                top: -_this3.refs.dialogContent.offsetTop,
                right: _this3.refs.dialogContent.offsetLeft,
                bottom: _this3.refs.dialogContent.offsetTop
              }
            });
          });
          // console.log(-this.refs.dialogContent.offsetLeft,-this.refs.dialogContent.offsetTop)
        }, 0);
        var height = parseInt(_this3.refs.dialogContent.offsetHeight);
        var maxHeight = newProps.height || parseInt(document.documentElement.clientHeight);
        if (height >= maxHeight) {
          _this3.refs.dialogContent.style.height = maxHeight + "px";
          var bodyHeight = maxHeight - (_this3.refs.dialogHeader.offsetHeight || 0) - (_this3.refs.dialogFooter.offsetHeight || 0);
          _this3.refs.dialogBody.style.height = Math.max(0, bodyHeight) + "px";
          // console.log(bodyHeight);
          // console.log(
          //   maxHeight,
          //   this.refs.dialogHeader.offsetHeight,
          //   this.refs.dialogFooter.offsetHeight,
          //   this.refs.dialogBody.style.height
          // );
        }
        _this3.props.afterShow();
      });
      this.timerHide(newProps);
    }
  }, {
    key: "hide",
    value: function hide() {
      // console.log("hide");
      var cls = this.refs.dialog.className;
      this.refs.dialog.className = cls.replace("opacity-animate", "opacity-animate-hide");
      this.refs.dialog.addEventListener('transitionend', this._hide.bind(this));
      // setTimeout(this._hide.bind(this), 300);
    }
  }, {
    key: "_hide",
    value: function _hide() {
      var _this4 = this;

      this.setState({ isShow: false }, function () {
        _this4.props.afterHide();
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
      if (this.state.isShow) {
        var DD = this.props.draggable ? _react2.default.createElement(
          _reactDraggable2.default,
          _defineProperty({ handle: this.props.dragHandle || ".dialog-title", bounds: "parent" }, "bounds", this.state.bounds),
          this.renderDialog()
        ) : this.renderDialog();
        if (this.props.mask) {
          return _react2.default.createElement(
            "div",
            {
              className: this.props.mask ? "x-dialog-continer x-dialog-mask" : "x-dialog-continer",
              style: { zIndex: this.props.zIndex }
            },
            _react2.default.createElement(
              "div",
              { className: "x-dialog", ref: "dialog" },
              DD
            )
          );
        } else {
          return _react2.default.createElement(
            "div",
            { className: "x-dialog", ref: "dialog" },
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
          style: {
            width: this.props.width || "auto",
            height: this.props.height || "auto",
            top: this.state.defaultPosition.y,
            left: this.state.defaultPosition.x
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
  }]);

  return Dialog;
}(_react.Component);

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
  draggable: _propTypes2.default.bool
};
Dialog.defaultProps = {
  isShow: false,
  mask: true,
  className: "",
  zIndex: 9,
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
  okCallback: function okCallback() {}
};
exports.default = Dialog;