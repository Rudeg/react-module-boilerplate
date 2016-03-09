var component = (function (React) {
  'use strict';

  React = 'default' in React ? React['default'] : React;

  var babelHelpers = {};

  babelHelpers.classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  babelHelpers.createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  babelHelpers.inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  babelHelpers.possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  babelHelpers;

  var pow = (function (a, b) {
    return Math.pow(a, b);
  })

  var Component = function (_React$Component) {
    babelHelpers.inherits(Component, _React$Component);

    function Component() {
      babelHelpers.classCallCheck(this, Component);
      return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Component).apply(this, arguments));
    }

    babelHelpers.createClass(Component, [{
      key: 'render',
      value: function render() {
        var powResult = pow(2, 3);
        return React.createElement(
          'div',
          null,
          powResult
        );
      }
    }]);
    return Component;
  }(React.Component);

  return Component;

}(React));