"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _DialogPortal = require("./DialogPortal");

var _DialogPortal2 = _interopRequireDefault(_DialogPortal);

var _xI18n = require("x-i18n");

var _xI18n2 = _interopRequireDefault(_xI18n);

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

// let zIndex=9;

var Dialog = function (_Component) {
  _inherits(Dialog, _Component);

  _createClass(Dialog, [{
    key: "componentWillReceiveProps",

    // static getDerivedStateFromProps(props, state){
    //   if(state.isShow!==props.isShow){
    //     return {isShow:props.isShow};
    //   }
    // }
    value: function componentWillReceiveProps(newProps) {
      if (newProps.isShow != this.state.isShow) {
        this.setState({ isShow: newProps.isShow });
      }
    }
  }], [{
    key: "show",
    value: function show(config) {
      var myRef = _react2.default.createRef();
      var div = document.createDocumentFragment('div');
      var f;
      var currentConfig = _extends({
        children: config.content }, config, { isShow: true, ref: function ref(_ref) {
          myRef = _ref;
          //针对不同的版本进行兼容
          var t = setTimeout(function () {
            clearTimeout(t);
            f && f(myRef);
          });
          return myRef;
        }
      });
      function render(props) {
        _reactDom2.default.render(_react2.default.createElement(Dialog, props), div);
      }
      render(currentConfig);
      return function (t) {
        f = t;
      };
    }
  }, {
    key: "hide",
    value: function hide() {
      _DialogPortal2.default.hide();
    }
  }, {
    key: "hideAll",
    value: function hideAll() {
      _DialogPortal2.default.hideAll();
    }
  }]);

  function Dialog(props) {
    _classCallCheck(this, Dialog);

    var _this = _possibleConstructorReturn(this, (Dialog.__proto__ || Object.getPrototypeOf(Dialog)).call(this, props));

    _initialiseProps.call(_this);

    if (typeof props.zIndex !== 'undefined') {
      Dialog.zIndex = props.zIndex;
    }
    Dialog.zIndex++;
    _this.state = { isShow: props.isShow, zIndex: Dialog.zIndex };
    return _this;
  }

  _createClass(Dialog, [{
    key: "componentDidUpdate",

    //props有更新时调用事件,更新portal组件，相当于render。
    // componentWillReceiveProps(newProps) {
    //   this.renderPortal(newProps);
    // }
    value: function componentDidUpdate() {
      this.renderPortal();
    }
    //初始化时插入父级和渲染一次portal组件

  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      Dialog.topDialog = this;
      this.renderPortal();
    }
    //模拟render方法，调用portal组件时传入父级容器

  }, {
    key: "renderPortal",
    value: function renderPortal() {
      // console.log(this.props)
      var dd = _react2.default.createElement(
        _xI18n2.default,
        { componentName: "Dialog", defaultValue: this.props.local },
        this.renderContent
      );
      if (!this.state.isShow) {
        dd = null;
      } else if (!this.node) {
        this.node = document.createElement("div");
        if (typeof this.props.container === 'string') {
          document.querySelector(this.props.container).appendChild(this.node);
        } else {
          this.props.container.appendChild(this.node);
        }
        renderSubtreeIntoContainer(this, dd, this.node);
      } else {
        renderSubtreeIntoContainer(this, dd, this.node);
      }
    }
  }, {
    key: "componentWillUnmount",

    //组件销毁时触发,移除绑定
    value: function componentWillUnmount() {
      if (this.node) {
        _reactDom2.default.unmountComponentAtNode(this.node);
        this.node.parentNode.removeChild(this.node);
        this.node = null;
      }
    }
  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }]);

  return Dialog;
}(_react.Component);

Dialog.defaultZIndex = 1000;
Dialog.zIndex = Dialog.defaultZIndex;
Dialog.topDialog = null;
Dialog.propTypes = {
  isShow: _propTypes2.default.bool.isRequired,
  mask: _propTypes2.default.bool,
  children: _propTypes2.default.node
};
Dialog.defaultProps = {
  isShow: false,
  mask: true,
  container: document.body
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.hide = function () {
    _this2.setState({ isShow: false }, function () {
      if (_this2.node) {
        _reactDom2.default.unmountComponentAtNode(_this2.node);
        _this2.node.parentNode.removeChild(_this2.node);
        _this2.node = null;
      }
    });
  };

  this.renderContent = function (local) {
    // console.log(this.props)
    var props = _extends({}, _this2.props);
    props.updateList = function (DialogList) {
      if (DialogList.length === 0) {
        Dialog.zIndex = Dialog.defaultZIndex;
        _this2.setState({ zIndex: Dialog.zIndex });
      }
    };
    props.afterHide = function () {
      _this2.props.afterHide && _this2.props.afterHide();
      _this2.hide();
    };
    if (_this2.state.isShow) {
      if (_this2.props.draggable) {
        return _react2.default.createElement(_DialogPortal2.default, _extends({}, props, _this2.state, { local: local, onClick: _this2.onFocus }));
      } else {
        return _react2.default.createElement(_DialogPortal2.default, _extends({}, props, _this2.state, { local: local, onClick: _this2.onFocus }));
      }
    }
  };

  this.onFocus = function () {
    if (_this2 != Dialog.topDialog) {
      Dialog.topDialog = _this2;
      Dialog.zIndex++;
      _this2.setState({ zIndex: Dialog.zIndex });
    }
  };
};

exports.default = Dialog;