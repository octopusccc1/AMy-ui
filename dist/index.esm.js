import loadable from 'react-loadable';
import React from 'react';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var ctx = require['context']('./components', true, /\.tsx$/);

var collection = ctx.keys().map(function (item) {
  var _item$match;

  return (_item$match = item.match(/.\/(.*?)\/index.tsx/)) === null || _item$match === void 0 ? void 0 : _item$match[1];
}).reduce(function (pre, cur) {
  return Object.assign(pre, _defineProperty({}, cur, loadable({
    loader: function loader() {
      return import("./components/".concat(cur));
    },
    loading: function loading() {
      return /*#__PURE__*/React.createElement("div", null);
    }
  })));
}, {});

export default collection;
