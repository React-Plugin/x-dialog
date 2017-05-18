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


var Dialog = function (_Component) {
  _inherits(Dialog, _Component);

  function Dialog(props) {
    _classCallCheck(this, Dialog);

    var _this = _possibleConstructorReturn(this, (Dialog.__proto__ || Object.getPrototypeOf(Dialog)).call(this, props));

    _this.state = { isShow: props.isShow };
    return _this;
  }

  _createClass(Dialog, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(newProps) {
      console.log(newProps.isShow, this.state.isShow);
      if (newProps.isShow && !this.state.isShow) {
        this.show();
      } else if (!newProps.isShow && this.state.isShow) {
        this.hide();
      }
    }
  }, {
    key: "timerHide",
    value: function timerHide() {
      var _this2 = this;

      if (this.props.timer) {
        this.clearTimer();
        this.timer = setTimeout(function () {
          _this2.hide();
        }, this.props.timer);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.clearTimer();
    }
  }, {
    key: "clearTimer",
    value: function clearTimer() {
      this.timer && clearTimeout(this.timer);
    }
  }, {
    key: "show",
    value: function show() {
      var _this3 = this;

      console.log("show");
      this.clearTimer();
      this.setState({ isShow: true }, function () {
        setTimeout(function () {
          return _this3.refs.dialog.className += " opacity-animate";
        }, 0);
        var height = Number(_this3.refs.dialogContent.offsetHeight);
        var maxHeight = Number(document.documentElement.clientHeight);
        if (height > maxHeight) {
          _this3.refs.dialogContent.style.height = maxHeight + "px";
        }
      });
      this.timerHide();
    }
  }, {
    key: "hide",
    value: function hide() {
      var _this4 = this;

      console.log("hide");
      var cls = this.refs.dialog.className;
      this.refs.dialog.className = cls.replace('opacity-animate', 'opacity-animate-hide');
      this.refs.dialog.addEventListener('transitionend', function () {
        _this4.setState({ isShow: false });
      });
    }
  }, {
    key: "render",
    value: function render() {
      return this.state.isShow ? _react2.default.createElement(
        "div",
        {
          className: "dialog",
          ref: "dialog",
          style: { zIndex: this.props.zIndex }
        },
        _react2.default.createElement(
          "div",
          {
            className: "dialog-content " + this.props.className,
            ref: "dialogContent"
          },
          this.props.title ? _react2.default.createElement(
            "div",
            { className: "dialog-title" },
            this.props.title,
            _react2.default.createElement(
              "div",
              { onClick: this.hide.bind(this) },
              this.props.closeIcon
            )
          ) : undefined,
          _react2.default.createElement(
            "div",
            { className: "dialog-body" },
            this.props.children
          ),
          _react2.default.createElement(
            "div",
            { className: "dialog-action" },
            this.props.buttons
          )
        ),
        this.props.mask ? _react2.default.createElement("div", { className: "mask" }) : undefined
      ) : _react2.default.createElement("div", null);
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
  buttons: _propTypes2.default.node,
  closeIcon: _propTypes2.default.node
};
Dialog.defaultProps = {
  isShow: false,
  mask: true,
  className: "",
  zIndex: 9,
  closeIcon: _react2.default.createElement(
    "i",
    { className: "dialog-close" },
    "x"
  )
};
exports.default = Dialog;