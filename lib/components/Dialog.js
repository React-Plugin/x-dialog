"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

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


var renderSubtreeIntoContainer = _reactDom2.default.unstable_renderSubtreeIntoContainer;

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
    key: "componentDidMount",
    value: function componentDidMount() {
      this.renderPortal(this.props);
    }
  }, {
    key: "renderPortal",
    value: function renderPortal(props) {
      var parent = document.createElement('div');
      document.body.appendChild(parent);
      renderSubtreeIntoContainer(this, this.state.isShow ? _react2.default.createElement(
        "div",
        { className: "dialog" },
        _react2.default.createElement(
          "div",
          { className: "dialog-content" },
          _react2.default.createElement(
            "div",
            { className: "dialog-title" },
            this.props.title
          ),
          _react2.default.createElement(
            "div",
            { className: "dialog-body" },
            this.props.children
          ),
          _react2.default.createElement("div", { className: "dialog-action" })
        ),
        this.props.mask ? _react2.default.createElement("div", { className: "mask" }) : undefined
      ) : _react2.default.createElement("div", null), parent);
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
      console.log("show");
      this.clearTimer();
      this.setState({ isShow: true });
      this.timerHide();
    }
  }, {
    key: "hide",
    value: function hide() {
      console.log("hide");
      this.setState({ isShow: false });
    }
  }, {
    key: "render",
    value: function render() {
      console.log(12345);
      return _react2.default.createElement("div", null);
    }
  }]);

  return Dialog;
}(_react.Component);

Dialog.propTypes = {
  isShow: _react.PropTypes.bool.isRequired,
  mask: _react.PropTypes.bool,
  children: _react.PropTypes.node
};
Dialog.defaultProps = {
  isShow: false,
  mask: true
};
exports.default = Dialog;