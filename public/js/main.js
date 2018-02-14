/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
})();
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
    return [];
};

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () {
    return '/';
};
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function () {
    return 0;
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(14)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Appbar = __webpack_require__(15);

var _Appbar2 = _interopRequireDefault(_Appbar);

var _NavigationDrawer = __webpack_require__(24);

var _NavigationDrawer2 = _interopRequireDefault(_NavigationDrawer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
    components: {
        'Appbar': _Appbar2.default,
        'NavigationDrawer': _NavigationDrawer2.default
    }
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  props: {
    title: {
      type: String,
      required: true,
      default: ''
    }
  }
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//

exports.default = {
    props: {
        name: {
            type: String,
            required: true,
            default: function _default(value) {
                return value.replace(' ', '_');
            }
        }
    }
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vue = __webpack_require__(8);

var _vue2 = _interopRequireDefault(_vue);

var _Index = __webpack_require__(11);

var _Index2 = _interopRequireDefault(_Index);

var _Icon = __webpack_require__(21);

var _Icon2 = _interopRequireDefault(_Icon);

var _store = __webpack_require__(26);

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**************************************
 * Import pages
 **************************************/
_vue2.default.component('Icon', _Icon2.default);

/**************************************
 * Import global components
 **************************************/


new _vue2.default({
  el: '#app',
  store: _store2.default,
  render: function render(h) {
    return h(_Index2.default);
  }
});

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, global, setImmediate) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * Vue.js v2.5.13
 * (c) 2014-2017 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
function isUndef(v) {
  return v === undefined || v === null;
}

function isDef(v) {
  return v !== undefined && v !== null;
}

function isTrue(v) {
  return v === true;
}

function isFalse(v) {
  return v === false;
}

/**
 * Check if value is primitive
 */
function isPrimitive(value) {
  return typeof value === 'string' || typeof value === 'number' ||
  // $flow-disable-line
  (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'symbol' || typeof value === 'boolean';
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject(obj) {
  return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
}

/**
 * Get the raw type string of a value e.g. [object Object]
 */
var _toString = Object.prototype.toString;

function toRawType(value) {
  return _toString.call(value).slice(8, -1);
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function isRegExp(v) {
  return _toString.call(v) === '[object RegExp]';
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex(val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val);
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString(val) {
  return val == null ? '' : (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' ? JSON.stringify(val, null, 2) : String(val);
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber(val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n;
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap(str, expectsLowerCase) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ? function (val) {
    return map[val.toLowerCase()];
  } : function (val) {
    return map[val];
  };
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if a attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array
 */
function remove(arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

/**
 * Create a cached version of a pure function.
 */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase();
});

/**
 * Simple bind, faster than native
 */
function bind(fn, ctx) {
  function boundFn(a) {
    var l = arguments.length;
    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
  }
  // record original fn length
  boundFn._length = fn.length;
  return boundFn;
}

/**
 * Convert an Array-like object to a real Array.
 */
function toArray(list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret;
}

/**
 * Mix properties into target object.
 */
function extend(to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to;
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject(arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res;
}

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
 */
function noop(a, b, c) {}

/**
 * Always return false.
 */
var no = function no(a, b, c) {
  return false;
};

/**
 * Return same value
 */
var identity = function identity(_) {
  return _;
};

/**
 * Generate a static keys string from compiler modules.
 */

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual(a, b) {
  if (a === b) {
    return true;
  }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i]);
        });
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key]);
        });
      } else {
        /* istanbul ignore next */
        return false;
      }
    } catch (e) {
      /* istanbul ignore next */
      return false;
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b);
  } else {
    return false;
  }
}

function looseIndexOf(arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) {
      return i;
    }
  }
  return -1;
}

/**
 * Ensure a function is called only once.
 */
function once(fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  };
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = ['component', 'directive', 'filter'];

var LIFECYCLE_HOOKS = ['beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'beforeDestroy', 'destroyed', 'activated', 'deactivated', 'errorCaptured'];

/*  */

var config = {
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: process.env.NODE_ENV !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: process.env.NODE_ENV !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
};

/*  */

/**
 * Check if a string starts with $ or _
 */
function isReserved(str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F;
}

/**
 * Define a property.
 */
function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath(path) {
  if (bailRE.test(path)) {
    return;
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) {
        return;
      }
      obj = obj[segments[i]];
    }
    return obj;
  };
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = UA && UA.indexOf('android') > 0 || weexPlatform === 'android';
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA) || weexPlatform === 'ios';
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = {}.watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', {
      get: function get() {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    }); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function isServerRendering() {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer;
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative(Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString());
}

var hasSymbol = typeof Symbol !== 'undefined' && isNative(Symbol) && typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = function () {
    function Set() {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has(key) {
      return this.set[key] === true;
    };
    Set.prototype.add = function add(key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear() {
      this.set = Object.create(null);
    };

    return Set;
  }();
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = noop; // work around flow check
var formatComponentName = noop;

if (process.env.NODE_ENV !== 'production') {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function classify(str) {
    return str.replace(classifyRE, function (c) {
      return c.toUpperCase();
    }).replace(/[-_]/g, '');
  };

  warn = function warn(msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && !config.silent) {
      console.error("[Vue warn]: " + msg + trace);
    }
  };

  tip = function tip(msg, vm) {
    if (hasConsole && !config.silent) {
      console.warn("[Vue tip]: " + msg + (vm ? generateComponentTrace(vm) : ''));
    }
  };

  formatComponentName = function formatComponentName(vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>';
    }
    var options = typeof vm === 'function' && vm.cid != null ? vm.options : vm._isVue ? vm.$options || vm.constructor.options : vm || {};
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (name ? "<" + classify(name) + ">" : "<Anonymous>") + (file && includeFile !== false ? " at " + file : '');
  };

  var repeat = function repeat(str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) {
        res += str;
      }
      if (n > 1) {
        str += str;
      }
      n >>= 1;
    }
    return res;
  };

  generateComponentTrace = function generateComponentTrace(vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue;
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree.map(function (vm, i) {
        return "" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm) ? formatComponentName(vm[0]) + "... (" + vm[1] + " recursive calls)" : formatComponentName(vm));
      }).join('\n');
    } else {
      return "\n\n(found in " + formatComponentName(vm) + ")";
    }
  };
}

/*  */

var uid$1 = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep() {
  this.id = uid$1++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub(sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub(sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend() {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify() {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget(_target) {
  if (Dep.target) {
    targetStack.push(Dep.target);
  }
  Dep.target = _target;
}

function popTarget() {
  Dep.target = targetStack.pop();
}

/*  */

var VNode = function VNode(tag, data, children, text, elm, context, componentOptions, asyncFactory) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance;
};

Object.defineProperties(VNode.prototype, prototypeAccessors);

var createEmptyVNode = function createEmptyVNode(text) {
  if (text === void 0) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node;
};

function createTextVNode(val) {
  return new VNode(undefined, undefined, undefined, String(val));
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode(vnode, deep) {
  var componentOptions = vnode.componentOptions;
  var cloned = new VNode(vnode.tag, vnode.data, vnode.children, vnode.text, vnode.elm, vnode.context, componentOptions, vnode.asyncFactory);
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.isCloned = true;
  if (deep) {
    if (vnode.children) {
      cloned.children = cloneVNodes(vnode.children, true);
    }
    if (componentOptions && componentOptions.children) {
      componentOptions.children = cloneVNodes(componentOptions.children, true);
    }
  }
  return cloned;
}

function cloneVNodes(vnodes, deep) {
  var len = vnodes.length;
  var res = new Array(len);
  for (var i = 0; i < len; i++) {
    res[i] = cloneVNode(vnodes[i], deep);
  }
  return res;
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator() {
    var args = [],
        len = arguments.length;
    while (len--) {
      args[len] = arguments[len];
    }var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break;
      case 'splice':
        inserted = args.slice(2);
        break;
    }
    if (inserted) {
      ob.observeArray(inserted);
    }
    // notify change
    ob.dep.notify();
    return result;
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * By default, when a reactive property is set, the new value is
 * also converted to become reactive. However when passing down props,
 * we don't want to force conversion because the value may be a nested value
 * under a frozen data structure. Converting it would defeat the optimization.
 */
var observerState = {
  shouldConvert: true
};

/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */
var Observer = function Observer(value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto ? protoAugment : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk(obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive(obj, keys[i], obj[keys[i]]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray(items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment(target, src, keys) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment(target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe(value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return;
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (observerState.shouldConvert && !isServerRendering() && (Array.isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value._isVue) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob;
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive(obj, key, val, customSetter, shallow) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return;
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value;
    },
    set: function reactiveSetter(newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || newVal !== newVal && value !== value) {
        return;
      }
      /* eslint-enable no-self-compare */
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set(target, key, val) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val;
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val;
  }
  var ob = target.__ob__;
  if (target._isVue || ob && ob.vmCount) {
    process.env.NODE_ENV !== 'production' && warn('Avoid adding reactive properties to a Vue instance or its root $data ' + 'at runtime - declare it upfront in the data option.');
    return val;
  }
  if (!ob) {
    target[key] = val;
    return val;
  }
  defineReactive(ob.value, key, val);
  ob.dep.notify();
  return val;
}

/**
 * Delete a property and trigger change if necessary.
 */
function del(target, key) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return;
  }
  var ob = target.__ob__;
  if (target._isVue || ob && ob.vmCount) {
    process.env.NODE_ENV !== 'production' && warn('Avoid deleting properties on a Vue instance or its root $data ' + '- just set it to null.');
    return;
  }
  if (!hasOwn(target, key)) {
    return;
  }
  delete target[key];
  if (!ob) {
    return;
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray(value) {
  for (var e = void 0, i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (process.env.NODE_ENV !== 'production') {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn("option \"" + key + "\" can only be used during instance " + 'creation with the `new` keyword.');
    }
    return defaultStrat(parent, child);
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData(to, from) {
  if (!from) {
    return to;
  }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to;
}

/**
 * Data
 */
function mergeDataOrFn(parentVal, childVal, vm) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal;
    }
    if (!parentVal) {
      return childVal;
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn() {
      return mergeData(typeof childVal === 'function' ? childVal.call(this, this) : childVal, typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal);
    };
  } else {
    return function mergedInstanceDataFn() {
      // instance merge
      var instanceData = typeof childVal === 'function' ? childVal.call(vm, vm) : childVal;
      var defaultData = typeof parentVal === 'function' ? parentVal.call(vm, vm) : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData);
      } else {
        return defaultData;
      }
    };
  }
}

strats.data = function (parentVal, childVal, vm) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      process.env.NODE_ENV !== 'production' && warn('The "data" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);

      return parentVal;
    }
    return mergeDataOrFn(parentVal, childVal);
  }

  return mergeDataOrFn(parentVal, childVal, vm);
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook(parentVal, childVal) {
  return childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal;
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets(parentVal, childVal, vm, key) {
  var res = Object.create(parentVal || null);
  if (childVal) {
    process.env.NODE_ENV !== 'production' && assertObjectType(key, childVal, vm);
    return extend(res, childVal);
  } else {
    return res;
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (parentVal, childVal, vm, key) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) {
    parentVal = undefined;
  }
  if (childVal === nativeWatch) {
    childVal = undefined;
  }
  /* istanbul ignore if */
  if (!childVal) {
    return Object.create(parentVal || null);
  }
  if (process.env.NODE_ENV !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) {
    return childVal;
  }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent ? parent.concat(child) : Array.isArray(child) ? child : [child];
  }
  return ret;
};

/**
 * Other object hashes.
 */
strats.props = strats.methods = strats.inject = strats.computed = function (parentVal, childVal, vm, key) {
  if (childVal && process.env.NODE_ENV !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) {
    return childVal;
  }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) {
    extend(ret, childVal);
  }
  return ret;
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function defaultStrat(parentVal, childVal) {
  return childVal === undefined ? parentVal : childVal;
};

/**
 * Validate component names
 */
function checkComponents(options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName(name) {
  if (!/^[a-zA-Z][\w-]*$/.test(name)) {
    warn('Invalid component name: "' + name + '". Component names ' + 'can only contain alphanumeric characters and the hyphen, ' + 'and must start with a letter.');
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + name);
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps(options, vm) {
  var props = options.props;
  if (!props) {
    return;
  }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (process.env.NODE_ENV !== 'production') {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val) ? val : { type: val };
    }
  } else if (process.env.NODE_ENV !== 'production') {
    warn("Invalid value for option \"props\": expected an Array or an Object, " + "but got " + toRawType(props) + ".", vm);
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject(options, vm) {
  var inject = options.inject;
  if (!inject) {
    return;
  }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val) ? extend({ from: key }, val) : { from: val };
    }
  } else if (process.env.NODE_ENV !== 'production') {
    warn("Invalid value for option \"inject\": expected an Array or an Object, " + "but got " + toRawType(inject) + ".", vm);
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives(options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

function assertObjectType(name, value, vm) {
  if (!isPlainObject(value)) {
    warn("Invalid value for option \"" + name + "\": expected an Object, " + "but got " + toRawType(value) + ".", vm);
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions(parent, child, vm) {
  if (process.env.NODE_ENV !== 'production') {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField(key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options;
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset(options, type, id, warnMissing) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return;
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) {
    return assets[id];
  }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) {
    return assets[camelizedId];
  }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) {
    return assets[PascalCaseId];
  }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
    warn('Failed to resolve ' + type.slice(0, -1) + ': ' + id, options);
  }
  return res;
}

/*  */

function validateProp(key, propOptions, propsData, vm) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // handle boolean props
  if (isType(Boolean, prop.type)) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
      value = true;
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldConvert = observerState.shouldConvert;
    observerState.shouldConvert = true;
    observe(value);
    observerState.shouldConvert = prevShouldConvert;
  }
  if (process.env.NODE_ENV !== 'production' &&
  // skip validation for weex recycle-list child component props
  !(false && isObject(value) && '@binding' in value)) {
    assertProp(prop, key, value, vm, absent);
  }
  return value;
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue(vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined;
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if (process.env.NODE_ENV !== 'production' && isObject(def)) {
    warn('Invalid default value for prop "' + key + '": ' + 'Props with type Object/Array must use a factory function ' + 'to return the default value.', vm);
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData && vm.$options.propsData[key] === undefined && vm._props[key] !== undefined) {
    return vm._props[key];
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function' ? def.call(vm) : def;
}

/**
 * Assert whether a prop is valid.
 */
function assertProp(prop, name, value, vm, absent) {
  if (prop.required && absent) {
    warn('Missing required prop: "' + name + '"', vm);
    return;
  }
  if (value == null && !prop.required) {
    return;
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }
  if (!valid) {
    warn("Invalid prop: type check failed for prop \"" + name + "\"." + " Expected " + expectedTypes.map(capitalize).join(', ') + ", got " + toRawType(value) + ".", vm);
    return;
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn('Invalid prop: custom validator check failed for prop "' + name + '".', vm);
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType(value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value === 'undefined' ? 'undefined' : _typeof(value);
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  };
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType(fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : '';
}

function isType(type, fn) {
  if (!Array.isArray(fn)) {
    return getType(fn) === getType(type);
  }
  for (var i = 0, len = fn.length; i < len; i++) {
    if (getType(fn[i]) === getType(type)) {
      return true;
    }
  }
  /* istanbul ignore next */
  return false;
}

/*  */

function handleError(err, vm, info) {
  if (vm) {
    var cur = vm;
    while (cur = cur.$parent) {
      var hooks = cur.$options.errorCaptured;
      if (hooks) {
        for (var i = 0; i < hooks.length; i++) {
          try {
            var capture = hooks[i].call(cur, err, vm, info) === false;
            if (capture) {
              return;
            }
          } catch (e) {
            globalHandleError(e, cur, 'errorCaptured hook');
          }
        }
      }
    }
  }
  globalHandleError(err, vm, info);
}

function globalHandleError(err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info);
    } catch (e) {
      logError(e, null, 'config.errorHandler');
    }
  }
  logError(err, vm, info);
}

function logError(err, vm, info) {
  if (process.env.NODE_ENV !== 'production') {
    warn("Error in " + info + ": \"" + err.toString() + "\"", vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err;
  }
}

/*  */
/* globals MessageChannel */

var callbacks = [];
var pending = false;

function flushCallbacks() {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using both micro and macro tasks.
// In < 2.4 we used micro tasks everywhere, but there are some scenarios where
// micro tasks have too high a priority and fires in between supposedly
// sequential events (e.g. #4521, #6690) or even between bubbling of the same
// event (#6566). However, using macro tasks everywhere also has subtle problems
// when state is changed right before repaint (e.g. #6813, out-in transitions).
// Here we use micro task by default, but expose a way to force macro task when
// needed (e.g. in event handlers attached by v-on).
var microTimerFunc;
var macroTimerFunc;
var useMacroTask = false;

// Determine (macro) Task defer implementation.
// Technically setImmediate should be the ideal choice, but it's only available
// in IE. The only polyfill that consistently queues the callback after all DOM
// events triggered in the same loop is by using MessageChannel.
/* istanbul ignore if */
if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  macroTimerFunc = function macroTimerFunc() {
    setImmediate(flushCallbacks);
  };
} else if (typeof MessageChannel !== 'undefined' && (isNative(MessageChannel) ||
// PhantomJS
MessageChannel.toString() === '[object MessageChannelConstructor]')) {
  var channel = new MessageChannel();
  var port = channel.port2;
  channel.port1.onmessage = flushCallbacks;
  macroTimerFunc = function macroTimerFunc() {
    port.postMessage(1);
  };
} else {
  /* istanbul ignore next */
  macroTimerFunc = function macroTimerFunc() {
    setTimeout(flushCallbacks, 0);
  };
}

// Determine MicroTask defer implementation.
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  microTimerFunc = function microTimerFunc() {
    p.then(flushCallbacks);
    // in problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) {
      setTimeout(noop);
    }
  };
} else {
  // fallback to macro
  microTimerFunc = macroTimerFunc;
}

/**
 * Wrap a function so that if any code inside triggers state change,
 * the changes are queued using a Task instead of a MicroTask.
 */
function withMacroTask(fn) {
  return fn._withTask || (fn._withTask = function () {
    useMacroTask = true;
    var res = fn.apply(null, arguments);
    useMacroTask = false;
    return res;
  });
}

function nextTick(cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    if (useMacroTask) {
      macroTimerFunc();
    } else {
      microTimerFunc();
    }
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    });
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (process.env.NODE_ENV !== 'production') {
  var allowedGlobals = makeMap('Infinity,undefined,NaN,isFinite,isNaN,' + 'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' + 'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' + 'require' // for Webpack/Browserify
  );

  var warnNonPresent = function warnNonPresent(target, key) {
    warn("Property or method \"" + key + "\" is not defined on the instance but " + 'referenced during render. Make sure that this property is reactive, ' + 'either in the data option, or for class-based components, by ' + 'initializing the property. ' + 'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.', target);
  };

  var hasProxy = typeof Proxy !== 'undefined' && Proxy.toString().match(/native code/);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set(target, key, value) {
        if (isBuiltInModifier(key)) {
          warn("Avoid overwriting built-in modifier in config.keyCodes: ." + key);
          return false;
        } else {
          target[key] = value;
          return true;
        }
      }
    });
  }

  var hasHandler = {
    has: function has(target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
      if (!has && !isAllowed) {
        warnNonPresent(target, key);
      }
      return has || !isAllowed;
    }
  };

  var getHandler = {
    get: function get(target, key) {
      if (typeof key === 'string' && !(key in target)) {
        warnNonPresent(target, key);
      }
      return target[key];
    }
  };

  initProxy = function initProxy(vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped ? getHandler : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse(val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse(val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if (!isA && !isObject(val) || Object.isFrozen(val)) {
    return;
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return;
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) {
      _traverse(val[i], seen);
    }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) {
      _traverse(val[keys[i]], seen);
    }
  }
}

var mark;
var measure;

if (process.env.NODE_ENV !== 'production') {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (perf && perf.mark && perf.measure && perf.clearMarks && perf.clearMeasures) {
    mark = function mark(tag) {
      return perf.mark(tag);
    };
    measure = function measure(name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      perf.clearMeasures(name);
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  };
});

function createFnInvoker(fns) {
  function invoker() {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        cloned[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments);
    }
  }
  invoker.fns = fns;
  return invoker;
}

function updateListeners(on, oldOn, add, remove$$1, vm) {
  var name, def, cur, old, event;
  for (name in on) {
    def = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    /* istanbul ignore if */
    if (isUndef(cur)) {
      process.env.NODE_ENV !== 'production' && warn("Invalid handler for event \"" + event.name + "\": got " + String(cur), vm);
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook(def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook() {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData(data, Ctor, tag) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return;
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (process.env.NODE_ENV !== 'production') {
        var keyInLowerCase = key.toLowerCase();
        if (key !== keyInLowerCase && attrs && hasOwn(attrs, keyInLowerCase)) {
          tip("Prop \"" + keyInLowerCase + "\" is passed to component " + formatComponentName(tag || Ctor) + ", but the declared prop name is" + " \"" + key + "\". " + "Note that HTML attributes are case-insensitive and camelCased " + "props need to use their kebab-case equivalents when using in-DOM " + "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\".");
        }
      }
      checkProp(res, props, key, altKey, true) || checkProp(res, attrs, key, altKey, false);
    }
  }
  return res;
}

function checkProp(res, hash, key, altKey, preserve) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true;
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true;
    }
  }
  return false;
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren(children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children);
    }
  }
  return children;
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren(children) {
  return isPrimitive(children) ? [createTextVNode(children)] : Array.isArray(children) ? normalizeArrayChildren(children) : undefined;
}

function isTextNode(node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment);
}

function normalizeArrayChildren(children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') {
      continue;
    }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, (nestedIndex || '') + "_" + i);
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + c[0].text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) && isDef(c.tag) && isUndef(c.key) && isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res;
}

/*  */

function ensureCtor(comp, base) {
  if (comp.__esModule || hasSymbol && comp[Symbol.toStringTag] === 'Module') {
    comp = comp.default;
  }
  return isObject(comp) ? base.extend(comp) : comp;
}

function createAsyncPlaceholder(factory, data, context, children, tag) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node;
}

function resolveAsyncComponent(factory, baseCtor, context) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp;
  }

  if (isDef(factory.resolved)) {
    return factory.resolved;
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp;
  }

  if (isDef(factory.contexts)) {
    // already pending
    factory.contexts.push(context);
  } else {
    var contexts = factory.contexts = [context];
    var sync = true;

    var forceRender = function forceRender() {
      for (var i = 0, l = contexts.length; i < l; i++) {
        contexts[i].$forceUpdate();
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender();
      }
    });

    var reject = once(function (reason) {
      process.env.NODE_ENV !== 'production' && warn("Failed to resolve async component: " + String(factory) + (reason ? "\nReason: " + reason : ''));
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender();
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (typeof res.then === 'function') {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isDef(res.component) && typeof res.component.then === 'function') {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            setTimeout(function () {
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender();
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          setTimeout(function () {
            if (isUndef(factory.resolved)) {
              reject(process.env.NODE_ENV !== 'production' ? "timeout (" + res.timeout + "ms)" : null);
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading ? factory.loadingComp : factory.resolved;
  }
}

/*  */

function isAsyncPlaceholder(node) {
  return node.isComment && node.asyncFactory;
}

/*  */

function getFirstComponentChild(children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c;
      }
    }
  }
}

/*  */

/*  */

function initEvents(vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add(event, fn, once) {
  if (once) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1(event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners(vm, listeners, oldListeners) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
  target = undefined;
}

function eventsMixin(Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm;
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on() {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm;
  };

  Vue.prototype.$off = function (event, fn) {
    var this$1 = this;

    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm;
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$off(event[i], fn);
      }
      return vm;
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm;
    }
    if (!fn) {
      vm._events[event] = null;
      return vm;
    }
    if (fn) {
      // specific handler
      var cb;
      var i$1 = cbs.length;
      while (i$1--) {
        cb = cbs[i$1];
        if (cb === fn || cb.fn === fn) {
          cbs.splice(i$1, 1);
          break;
        }
      }
    }
    return vm;
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (process.env.NODE_ENV !== 'production') {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip("Event \"" + lowerCaseEvent + "\" is emitted in component " + formatComponentName(vm) + " but the handler is registered for \"" + event + "\". " + "Note that HTML attributes are case-insensitive and you cannot use " + "v-on to listen to camelCase events when using in-DOM templates. " + "You should probably use \"" + hyphenate(event) + "\" instead of \"" + event + "\".");
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        try {
          cbs[i].apply(vm, args);
        } catch (e) {
          handleError(e, vm, "event handler for \"" + event + "\"");
        }
      }
    }
    return vm;
  };
}

/*  */

/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots(children, context) {
  var slots = {};
  if (!children) {
    return slots;
  }
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) && data && data.slot != null) {
      var name = data.slot;
      var slot = slots[name] || (slots[name] = []);
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots;
}

function isWhitespace(node) {
  return node.isComment && !node.asyncFactory || node.text === ' ';
}

function resolveScopedSlots(fns, // see flow/vnode
res) {
  res = res || {};
  for (var i = 0; i < fns.length; i++) {
    if (Array.isArray(fns[i])) {
      resolveScopedSlots(fns[i], res);
    } else {
      res[fns[i].key] = fns[i].fn;
    }
  }
  return res;
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function initLifecycle(vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */
      , vm.$options._parentElm, vm.$options._refElm);
      // no need for the ref nodes after initial patch
      // this prevents keeping a detached DOM tree in memory (#5851)
      vm.$options._parentElm = vm.$options._refElm = null;
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return;
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent(vm, el, hydrating) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    if (process.env.NODE_ENV !== 'production') {
      /* istanbul ignore if */
      if (vm.$options.template && vm.$options.template.charAt(0) !== '#' || vm.$options.el || el) {
        warn('You are using the runtime-only build of Vue where the template ' + 'compiler is not available. Either pre-compile the templates into ' + 'render functions, or use the compiler-included build.', vm);
      } else {
        warn('Failed to mount component: template or render function not defined.', vm);
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    updateComponent = function updateComponent() {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure("vue " + name + " render", startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure("vue " + name + " patch", startTag, endTag);
    };
  } else {
    updateComponent = function updateComponent() {
      vm._update(vm._render(), hydrating);
    };
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, null, true /* isRenderWatcher */);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm;
}

function updateChildComponent(vm, propsData, listeners, parentVnode, renderChildren) {
  if (process.env.NODE_ENV !== 'production') {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren
  var hasChildren = !!(renderChildren || // has new static slots
  vm.$options._renderChildren || // has old static slots
  parentVnode.data.scopedSlots || // has new scoped slots
  vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) {
    // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data && parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    observerState.shouldConvert = false;
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      props[key] = validateProp(key, vm.$options.props, propsData, vm);
    }
    observerState.shouldConvert = true;
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  if (listeners) {
    var oldListeners = vm.$options._parentListeners;
    vm.$options._parentListeners = listeners;
    updateComponentListeners(vm, listeners, oldListeners);
  }
  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (process.env.NODE_ENV !== 'production') {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree(vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) {
      return true;
    }
  }
  return false;
}

function activateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return;
    }
  } else if (vm._directInactive) {
    return;
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return;
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook(vm, hook) {
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, hook + " hook");
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState() {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (process.env.NODE_ENV !== 'production') {
    circular = {};
  }
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue() {
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) {
    return a.id - b.id;
  });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn('You may have an infinite update loop ' + (watcher.user ? "in watcher with expression \"" + watcher.expression + "\"" : "in a component render function."), watcher.vm);
        break;
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks(queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent(vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks(queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher(watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher(vm, expOrFn, cb, options, isRenderWatcher) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = process.env.NODE_ENV !== 'production' ? expOrFn.toString() : '';
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      process.env.NODE_ENV !== 'production' && warn("Failed watching path: \"" + expOrFn + "\" " + 'Watcher only accepts simple dot-delimited paths. ' + 'For full control, use a function instead.', vm);
    }
  }
  this.value = this.lazy ? undefined : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get() {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, "getter for watcher \"" + this.expression + "\"");
    } else {
      throw e;
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value;
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep(dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps() {
  var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update() {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run() {
  if (this.active) {
    var value = this.get();
    if (value !== this.value ||
    // Deep watchers and watchers on Object/Arrays should fire even
    // when the value is the same, because the value may
    // have mutated.
    isObject(value) || this.deep) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, "callback for watcher \"" + this.expression + "\"");
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate() {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend() {
  var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown() {
  var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy(target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter() {
    return this[sourceKey][key];
  };
  sharedPropertyDefinition.set = function proxySetter(val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState(vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) {
    initProps(vm, opts.props);
  }
  if (opts.methods) {
    initMethods(vm, opts.methods);
  }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) {
    initComputed(vm, opts.computed);
  }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps(vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  observerState.shouldConvert = isRoot;
  var loop = function loop(key) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) || config.isReservedAttr(hyphenatedKey)) {
        warn("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop.", vm);
      }
      defineReactive(props, key, value, function () {
        if (vm.$parent && !isUpdatingChildComponent) {
          warn("Avoid mutating a prop directly since the value will be " + "overwritten whenever the parent component re-renders. " + "Instead, use a data or computed property based on the prop's " + "value. Prop being mutated: \"" + key + "\"", vm);
        }
      });
    } else {
      defineReactive(props, key, value);
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) {
    loop(key);
  }observerState.shouldConvert = true;
}

function initData(vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function' ? getData(data, vm) : data || {};
  if (!isPlainObject(data)) {
    data = {};
    process.env.NODE_ENV !== 'production' && warn('data functions should return an object:\n' + 'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function', vm);
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (process.env.NODE_ENV !== 'production') {
      if (methods && hasOwn(methods, key)) {
        warn("Method \"" + key + "\" has already been defined as a data property.", vm);
      }
    }
    if (props && hasOwn(props, key)) {
      process.env.NODE_ENV !== 'production' && warn("The data property \"" + key + "\" is already declared as a prop. " + "Use prop default value instead.", vm);
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData(data, vm) {
  try {
    return data.call(vm, vm);
  } catch (e) {
    handleError(e, vm, "data()");
    return {};
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed(vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if (process.env.NODE_ENV !== 'production' && getter == null) {
      warn("Getter is missing for computed property \"" + key + "\".", vm);
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(vm, getter || noop, noop, computedWatcherOptions);
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (process.env.NODE_ENV !== 'production') {
      if (key in vm.$data) {
        warn("The computed property \"" + key + "\" is already defined in data.", vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn("The computed property \"" + key + "\" is already defined as a prop.", vm);
      }
    }
  }
}

function defineComputed(target, key, userDef) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache ? createComputedGetter(key) : userDef;
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get ? shouldCache && userDef.cache !== false ? createComputedGetter(key) : userDef.get : noop;
    sharedPropertyDefinition.set = userDef.set ? userDef.set : noop;
  }
  if (process.env.NODE_ENV !== 'production' && sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn("Computed property \"" + key + "\" was assigned to but it has no setter.", this);
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter(key) {
  return function computedGetter() {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value;
    }
  };
}

function initMethods(vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (process.env.NODE_ENV !== 'production') {
      if (methods[key] == null) {
        warn("Method \"" + key + "\" has an undefined value in the component definition. " + "Did you reference the function correctly?", vm);
      }
      if (props && hasOwn(props, key)) {
        warn("Method \"" + key + "\" has already been defined as a prop.", vm);
      }
      if (key in vm && isReserved(key)) {
        warn("Method \"" + key + "\" conflicts with an existing Vue instance method. " + "Avoid defining component methods that start with _ or $.");
      }
    }
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
  }
}

function initWatch(vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher(vm, keyOrFn, handler, options) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(keyOrFn, handler, options);
}

function stateMixin(Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () {
    return this._data;
  };
  var propsDef = {};
  propsDef.get = function () {
    return this._props;
  };
  if (process.env.NODE_ENV !== 'production') {
    dataDef.set = function (newData) {
      warn('Avoid replacing instance root $data. ' + 'Use nested data properties instead.', this);
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (expOrFn, cb, options) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options);
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn() {
      watcher.teardown();
    };
  };
}

/*  */

function initProvide(vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function' ? provide.call(vm) : provide;
  }
}

function initInjections(vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    observerState.shouldConvert = false;
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        defineReactive(vm, key, result[key], function () {
          warn("Avoid mutating an injected value directly since the changes will be " + "overwritten whenever the provided component re-renders. " + "injection being mutated: \"" + key + "\"", vm);
        });
      } else {
        defineReactive(vm, key, result[key]);
      }
    });
    observerState.shouldConvert = true;
  }
}

function resolveInject(inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol ? Reflect.ownKeys(inject).filter(function (key) {
      /* istanbul ignore next */
      return Object.getOwnPropertyDescriptor(inject, key).enumerable;
    }) : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && provideKey in source._provided) {
          result[key] = source._provided[provideKey];
          break;
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function' ? provideDefault.call(vm) : provideDefault;
        } else if (process.env.NODE_ENV !== 'production') {
          warn("Injection \"" + key + "\" not found", vm);
        }
      }
    }
    return result;
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList(val, render) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  if (isDef(ret)) {
    ret._isVList = true;
  }
  return ret;
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot(name, fallback, props, bindObject) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) {
    // scoped slot
    props = props || {};
    if (bindObject) {
      if (process.env.NODE_ENV !== 'production' && !isObject(bindObject)) {
        warn('slot v-bind without argument expects an Object', this);
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes) {
      if (process.env.NODE_ENV !== 'production' && slotNodes._rendered) {
        warn("Duplicate presence of slot \"" + name + "\" found in the same render tree " + "- this will likely cause render errors.", this);
      }
      slotNodes._rendered = true;
    }
    nodes = slotNodes || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes);
  } else {
    return nodes;
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter(id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity;
}

/*  */

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes(eventKeyCode, key, builtInAlias, eventKeyName) {
  var keyCodes = config.keyCodes[key] || builtInAlias;
  if (keyCodes) {
    if (Array.isArray(keyCodes)) {
      return keyCodes.indexOf(eventKeyCode) === -1;
    } else {
      return keyCodes !== eventKeyCode;
    }
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key;
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps(data, tag, value, asProp, isSync) {
  if (value) {
    if (!isObject(value)) {
      process.env.NODE_ENV !== 'production' && warn('v-bind without argument expects an Object or Array value', this);
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function loop(key) {
        if (key === 'class' || key === 'style' || isReservedAttribute(key)) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key) ? data.domProps || (data.domProps = {}) : data.attrs || (data.attrs = {});
        }
        if (!(key in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on["update:" + key] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) {
        loop(key);
      }
    }
  }
  return data;
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic(index, isInFor) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree by doing a shallow clone.
  if (tree && !isInFor) {
    return Array.isArray(tree) ? cloneVNodes(tree) : cloneVNode(tree);
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(this._renderProxy, null, this // for render fns generated for functional component templates
  );
  markStatic(tree, "__static__" + index, false);
  return tree;
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce(tree, index, key) {
  markStatic(tree, "__once__" + index + (key ? "_" + key : ""), true);
  return tree;
}

function markStatic(tree, key, isOnce) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], key + "_" + i, isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode(node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners(data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      process.env.NODE_ENV !== 'production' && warn('v-on without argument expects an Object value', this);
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data;
}

/*  */

function installRenderHelpers(target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
}

/*  */

function FunctionalRenderContext(data, props, children, parent, Ctor) {
  var options = Ctor.options;
  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    return resolveSlots(children, parent);
  };

  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm = Object.create(parent);
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = data.scopedSlots || emptyObject;
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode;
    };
  } else {
    this._c = function (a, b, c, d) {
      return createElement(contextVm, a, b, c, d, needNormalization);
    };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent(Ctor, propsData, data, contextVm, children) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) {
      mergeProps(props, data.attrs);
    }
    if (isDef(data.props)) {
      mergeProps(props, data.props);
    }
  }

  var renderContext = new FunctionalRenderContext(data, props, children, contextVm, Ctor);

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    vnode.fnContext = contextVm;
    vnode.fnOptions = options;
    if (data.slot) {
      (vnode.data || (vnode.data = {})).slot = data.slot;
    }
  }

  return vnode;
}

function mergeProps(to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

// Register the component hook to weex native render engine.
// The hook will be triggered by native, not javascript.


// Updates the state of the component to weex native render engine.

/*  */

// https://github.com/Hanks10100/weex-native-directive/tree/master/component

// listening on native callback

/*  */

/*  */

// hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init(vnode, hydrating, parentElm, refElm) {
    if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
      var child = vnode.componentInstance = createComponentInstanceForVnode(vnode, activeInstance, parentElm, refElm);
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    } else if (vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    }
  },

  prepatch: function prepatch(oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(child, options.propsData, // updated props
    options.listeners, // updated listeners
    vnode, // new parent vnode
    options.children // new children
    );
  },

  insert: function insert(vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy(vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent(Ctor, data, context, children, tag) {
  if (isUndef(Ctor)) {
    return;
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (process.env.NODE_ENV !== 'production') {
      warn("Invalid Component definition: " + String(Ctor), context);
    }
    return;
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(asyncFactory, data, context, children, tag);
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children);
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // merge component management hooks onto the placeholder node
  mergeHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode("vue-component-" + Ctor.cid + (name ? "-" + name : ''), data, undefined, undefined, undefined, context, { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children }, asyncFactory);

  // Weex specific: invoke recycle-list optimized @render function for
  // extracting cell-slot template.
  // https://github.com/Hanks10100/weex-native-directive/tree/master/component
  /* istanbul ignore if */
  return vnode;
}

function createComponentInstanceForVnode(vnode, // we know it's MountedComponentVNode but flow doesn't
parent, // activeInstance in lifecycle state
parentElm, refElm) {
  var options = {
    _isComponent: true,
    parent: parent,
    _parentVnode: vnode,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options);
}

function mergeHooks(data) {
  if (!data.hook) {
    data.hook = {};
  }
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var fromParent = data.hook[key];
    var ours = componentVNodeHooks[key];
    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
  }
}

function mergeHook$1(one, two) {
  return function (a, b, c, d) {
    one(a, b, c, d);
    two(a, b, c, d);
  };
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel(options, data) {
  var prop = options.model && options.model.prop || 'value';
  var event = options.model && options.model.event || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (isDef(on[event])) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement(context, tag, data, children, normalizationType, alwaysNormalize) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType);
}

function _createElement(context, tag, data, children, normalizationType) {
  if (isDef(data) && isDef(data.__ob__)) {
    process.env.NODE_ENV !== 'production' && warn("Avoid using observed data object as vnode data: " + JSON.stringify(data) + "\n" + 'Always create fresh vnode data objects in each render!', context);
    return createEmptyVNode();
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode();
  }
  // warn against non-primitive key
  if (process.env.NODE_ENV !== 'production' && isDef(data) && isDef(data.key) && !isPrimitive(data.key)) {
    {
      warn('Avoid using non-primitive value as key, ' + 'use string/number value instead.', context);
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) && typeof children[0] === 'function') {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = context.$vnode && context.$vnode.ns || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(config.parsePlatformTagName(tag), data, children, undefined, undefined, context);
    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(tag, data, children, undefined, undefined, context);
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (isDef(vnode)) {
    if (ns) {
      applyNS(vnode, ns);
    }
    return vnode;
  } else {
    return createEmptyVNode();
  }
}

function applyNS(vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (isUndef(child.ns) || isTrue(force))) {
        applyNS(child, ns, force);
      }
    }
  }
}

/*  */

function initRender(vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) {
    return createElement(vm, a, b, c, d, false);
  };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) {
    return createElement(vm, a, b, c, d, true);
  };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (process.env.NODE_ENV !== 'production') {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, null, true);
  }
}

function renderMixin(Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this);
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (vm._isMounted) {
      // if the parent didn't update, the slot nodes will be the ones from
      // last render. They need to be cloned to ensure "freshness" for this render.
      for (var key in vm.$slots) {
        var slot = vm.$slots[key];
        // _rendered is a flag added by renderSlot, but may not be present
        // if the slot is passed from manually written render functions
        if (slot._rendered || slot[0] && slot[0].elm) {
          vm.$slots[key] = cloneVNodes(slot, true /* deep */);
        }
      }
    }

    vm.$scopedSlots = _parentVnode && _parentVnode.data.scopedSlots || emptyObject;

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        if (vm.$options.renderError) {
          try {
            vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
          } catch (e) {
            handleError(e, vm, "renderError");
            vnode = vm._vnode;
          }
        } else {
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if (process.env.NODE_ENV !== 'production' && Array.isArray(vnode)) {
        warn('Multiple root nodes returned from render function. Render function ' + 'should return a single root node.', vm);
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode;
  };
}

/*  */

var uid = 0;

function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid++;

    var startTag, endTag;
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = "vue-perf-start:" + vm._uid;
      endTag = "vue-perf-end:" + vm._uid;
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(resolveConstructorOptions(vm.constructor), options || {}, vm);
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure("vue " + vm._name + " init", startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent(vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions(Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options;
}

function resolveModifiedOptions(Ctor) {
  var modified;
  var latest = Ctor.options;
  var extended = Ctor.extendOptions;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) {
        modified = {};
      }
      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
    }
  }
  return modified;
}

function dedupe(latest, extended, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    extended = Array.isArray(extended) ? extended : [extended];
    for (var i = 0; i < latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res;
  } else {
    return latest;
  }
}

function Vue$3(options) {
  if (process.env.NODE_ENV !== 'production' && !(this instanceof Vue$3)) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue$3);
stateMixin(Vue$3);
eventsMixin(Vue$3);
lifecycleMixin(Vue$3);
renderMixin(Vue$3);

/*  */

function initUse(Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = this._installedPlugins || (this._installedPlugins = []);
    if (installedPlugins.indexOf(plugin) > -1) {
      return this;
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this;
  };
}

/*  */

function initMixin$1(Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this;
  };
}

/*  */

function initExtend(Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId];
    }

    var name = extendOptions.name || Super.options.name;
    if (process.env.NODE_ENV !== 'production' && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent(options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(Super.options, extendOptions);
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub;
  };
}

function initProps$1(Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1(Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters(Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (id, definition) {
      if (!definition) {
        return this.options[type + 's'][id];
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production' && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition;
      }
    };
  });
}

/*  */

function getComponentName(opts) {
  return opts && (opts.Ctor.options.name || opts.tag);
}

function matches(pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1;
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1;
  } else if (isRegExp(pattern)) {
    return pattern.test(name);
  }
  /* istanbul ignore next */
  return false;
}

function pruneCache(keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry(cache, key, keys, current) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created() {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed() {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache, key, this$1.keys);
    }
  },

  watch: {
    include: function include(val) {
      pruneCache(this, function (name) {
        return matches(val, name);
      });
    },
    exclude: function exclude(val) {
      pruneCache(this, function (name) {
        return !matches(val, name);
      });
    }
  },

  render: function render() {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
      // not included
      include && (!name || !matches(include, name)) ||
      // excluded
      exclude && name && matches(exclude, name)) {
        return vnode;
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
      // same constructor may get registered as different local components
      // so cid alone is not enough (#3269)
      ? componentOptions.Ctor.cid + (componentOptions.tag ? "::" + componentOptions.tag : '') : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || slot && slot[0];
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI(Vue) {
  // config
  var configDef = {};
  configDef.get = function () {
    return config;
  };
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = function () {
      warn('Do not replace the Vue.config object, set individual fields instead.');
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue$3);

Object.defineProperty(Vue$3.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue$3.prototype, '$ssrContext', {
  get: function get() {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext;
  }
});

Vue$3.version = '2.5.13';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select,progress');
var mustUseProp = function mustUseProp(tag, type, attr) {
  return attr === 'value' && acceptValue(tag) && type !== 'button' || attr === 'selected' && tag === 'option' || attr === 'checked' && tag === 'input' || attr === 'muted' && tag === 'video';
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap('allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' + 'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' + 'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' + 'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' + 'required,reversed,scoped,seamless,selected,sortable,translate,' + 'truespeed,typemustmatch,visible');

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function isXlink(name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink';
};

var getXlinkProp = function getXlinkProp(name) {
  return isXlink(name) ? name.slice(6, name.length) : '';
};

var isFalsyAttrValue = function isFalsyAttrValue(val) {
  return val == null || val === false;
};

/*  */

function genClassForVnode(vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return renderClass(data.staticClass, data.class);
}

function mergeClassData(child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class) ? [child.class, parent.class] : parent.class
  };
}

function renderClass(staticClass, dynamicClass) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass));
  }
  /* istanbul ignore next */
  return '';
}

function concat(a, b) {
  return a ? b ? a + ' ' + b : a : b || '';
}

function stringifyClass(value) {
  if (Array.isArray(value)) {
    return stringifyArray(value);
  }
  if (isObject(value)) {
    return stringifyObject(value);
  }
  if (typeof value === 'string') {
    return value;
  }
  /* istanbul ignore next */
  return '';
}

function stringifyArray(value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) {
        res += ' ';
      }
      res += stringified;
    }
  }
  return res;
}

function stringifyObject(value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) {
        res += ' ';
      }
      res += key;
    }
  }
  return res;
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap('html,body,base,head,link,meta,style,title,' + 'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' + 'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' + 'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' + 's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' + 'embed,object,param,source,canvas,script,noscript,del,ins,' + 'caption,col,colgroup,table,thead,tbody,td,th,tr,' + 'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' + 'output,progress,select,textarea,' + 'details,dialog,menu,menuitem,summary,' + 'content,element,shadow,template,blockquote,iframe,tfoot');

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap('svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' + 'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' + 'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view', true);

var isReservedTag = function isReservedTag(tag) {
  return isHTMLTag(tag) || isSVG(tag);
};

function getTagNamespace(tag) {
  if (isSVG(tag)) {
    return 'svg';
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math';
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement(tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true;
  }
  if (isReservedTag(tag)) {
    return false;
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag];
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return unknownElementCache[tag] = el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement;
  } else {
    return unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString());
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query(el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      process.env.NODE_ENV !== 'production' && warn('Cannot find element: ' + el);
      return document.createElement('div');
    }
    return selected;
  } else {
    return el;
  }
}

/*  */

function createElement$1(tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm;
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm;
}

function createElementNS(namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName);
}

function createTextNode(text) {
  return document.createTextNode(text);
}

function createComment(text) {
  return document.createComment(text);
}

function insertBefore(parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild(node, child) {
  node.removeChild(child);
}

function appendChild(node, child) {
  node.appendChild(child);
}

function parentNode(node) {
  return node.parentNode;
}

function nextSibling(node) {
  return node.nextSibling;
}

function tagName(node) {
  return node.tagName;
}

function setTextContent(node, text) {
  node.textContent = text;
}

function setAttribute(node, key, val) {
  node.setAttribute(key, val);
}

var nodeOps = Object.freeze({
  createElement: createElement$1,
  createElementNS: createElementNS,
  createTextNode: createTextNode,
  createComment: createComment,
  insertBefore: insertBefore,
  removeChild: removeChild,
  appendChild: appendChild,
  parentNode: parentNode,
  nextSibling: nextSibling,
  tagName: tagName,
  setTextContent: setTextContent,
  setAttribute: setAttribute
});

/*  */

var ref = {
  create: function create(_, vnode) {
    registerRef(vnode);
  },
  update: function update(oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy(vnode) {
    registerRef(vnode, true);
  }
};

function registerRef(vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!key) {
    return;
  }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode(a, b) {
  return a.key === b.key && (a.tag === b.tag && a.isComment === b.isComment && isDef(a.data) === isDef(b.data) && sameInputType(a, b) || isTrue(a.isAsyncPlaceholder) && a.asyncFactory === b.asyncFactory && isUndef(b.asyncFactory.error));
}

function sameInputType(a, b) {
  if (a.tag !== 'input') {
    return true;
  }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB);
}

function createKeyToOldIdx(children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) {
      map[key] = i;
    }
  }
  return map;
}

function createPatchFunction(backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt(elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm);
  }

  function createRmCb(childElm, listeners) {
    function remove() {
      if (--remove.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove.listeners = listeners;
    return remove;
  }

  function removeNode(el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement$$1(vnode, inVPre) {
    return !inVPre && !vnode.ns && !(config.ignoredElements.length && config.ignoredElements.some(function (ignore) {
      return isRegExp(ignore) ? ignore.test(vnode.tag) : ignore === vnode.tag;
    })) && config.isUnknownElement(vnode.tag);
  }

  var creatingElmInVPre = 0;
  function createElm(vnode, insertedVnodeQueue, parentElm, refElm, nested) {
    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return;
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      if (process.env.NODE_ENV !== 'production') {
        if (data && data.pre) {
          creatingElmInVPre++;
        }
        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
          warn('Unknown custom element: <' + tag + '> - did you ' + 'register the component correctly? For recursive components, ' + 'make sure to provide the "name" option.', vnode.context);
        }
      }
      vnode.elm = vnode.ns ? nodeOps.createElementNS(vnode.ns, tag) : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if (process.env.NODE_ENV !== 'production' && data && data.pre) {
        creatingElmInVPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true;
      }
    }
  }

  function initComponent(vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break;
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert(parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (ref$$1.parentNode === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren(vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      if (process.env.NODE_ENV !== 'production') {
        checkDuplicateKeys(children);
      }
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
    }
  }

  function isPatchable(vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag);
  }

  function invokeCreateHooks(vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) {
        i.create(emptyNode, vnode);
      }
      if (isDef(i.insert)) {
        insertedVnodeQueue.push(vnode);
      }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope(vnode) {
    var i;
    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setAttribute(vnode.elm, i, '');
    } else {
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setAttribute(vnode.elm, i, '');
        }
        ancestor = ancestor.parent;
      }
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) && i !== vnode.context && i !== vnode.fnContext && isDef(i = i.$options._scopeId)) {
      nodeOps.setAttribute(vnode.elm, i, '');
    }
  }

  function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
    }
  }

  function invokeDestroyHook(vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) {
        i(vnode);
      }
      for (i = 0; i < cbs.destroy.length; ++i) {
        cbs.destroy[i](vnode);
      }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else {
          // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook(vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    if (process.env.NODE_ENV !== 'production') {
      checkDuplicateKeys(newCh);
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) {
        // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) {
        // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) {
          oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
        }
        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) {
          // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
        } else {
          vnodeToMove = oldCh[idxInOld];
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function checkDuplicateKeys(children) {
    var seenKeys = {};
    for (var i = 0; i < children.length; i++) {
      var vnode = children[i];
      var key = vnode.key;
      if (isDef(key)) {
        if (seenKeys[key]) {
          warn("Duplicate keys detected: '" + key + "'. This may cause an update error.", vnode.context);
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }

  function findIdxInOld(node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];
      if (isDef(c) && sameVnode(node, c)) {
        return i;
      }
    }
  }

  function patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return;
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return;
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) && isTrue(oldVnode.isStatic) && vnode.key === oldVnode.key && (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))) {
      vnode.componentInstance = oldVnode.componentInstance;
      return;
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) {
        cbs.update[i](oldVnode, vnode);
      }
      if (isDef(i = data.hook) && isDef(i = i.update)) {
        i(oldVnode, vnode);
      }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) {
          updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly);
        }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) {
          nodeOps.setTextContent(elm, '');
        }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) {
        i(oldVnode, vnode);
      }
    }
  }

  function invokeInsertHook(vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var hydrationBailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).
  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate(elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || data && data.pre;
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true;
    }
    // assert node match
    if (process.env.NODE_ENV !== 'production') {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false;
      }
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) {
        i(vnode, true /* hydrating */);
      }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true;
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined' && !hydrationBailed) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }
              return false;
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break;
              }
              childNode = childNode.nextSibling;
            }
            // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.
            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined' && !hydrationBailed) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }
              return false;
            }
          }
        }
      }
      if (isDef(data)) {
        var fullInvoke = false;
        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break;
          }
        }
        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true;
  }

  function assertNodeMatch(node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || !isUnknownElement$$1(vnode, inVPre) && vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase());
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3);
    }
  }

  return function patch(oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) {
        invokeDestroyHook(oldVnode);
      }
      return;
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode;
            } else if (process.env.NODE_ENV !== 'production') {
              warn('The client-side rendered virtual DOM tree is not matching ' + 'server-rendered content. This is likely caused by incorrect ' + 'HTML markup, for example nesting block-level elements inside ' + '<p>, or missing <tbody>. Bailing hydration and performing ' + 'full client-side render.');
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }

        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);

        // create new node
        createElm(vnode, insertedVnodeQueue,
        // extremely rare edge case: do not insert if old element is in a
        // leaving transition. Only happens when combining transition +
        // keep-alive + HOCs. (#4590)
        oldElm._leaveCb ? null : parentElm$1, nodeOps.nextSibling(oldElm));

        // update parent placeholder node element, recursively
        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              }
              // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.
              var insert = ancestor.data.hook.insert;
              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }

        // destroy old node
        if (isDef(parentElm$1)) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm;
  };
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives(vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives(oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update(oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function callInsert() {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1(dirs, vm) {
  var res = Object.create(null);
  if (!dirs) {
    // $flow-disable-line
    return res;
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  // $flow-disable-line
  return res;
}

function getRawDirName(dir) {
  return dir.rawName || dir.name + "." + Object.keys(dir.modifiers || {}).join('.');
}

function callHook$1(dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, "directive " + dir.name + " " + hook + " hook");
    }
  }
}

var baseModules = [ref, directives];

/*  */

function updateAttrs(oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return;
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return;
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max
  /* istanbul ignore if */
  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr(el, key, value) {
  if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED' ? 'true' : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // #7138: IE10 & 11 fires input event when setting placeholder on
      // <textarea>... block the first input event and remove the blocker
      // immediately.
      /* istanbul ignore if */
      if (isIE && !isIE9 && el.tagName === 'TEXTAREA' && key === 'placeholder' && !el.__ieph) {
        var blocker = function blocker(e) {
          e.stopImmediatePropagation();
          el.removeEventListener('input', blocker);
        };
        el.addEventListener('input', blocker);
        // $flow-disable-line
        el.__ieph = true; /* IE placeholder patched */
      }
      el.setAttribute(key, value);
    }
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass(oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (isUndef(data.staticClass) && isUndef(data.class) && (isUndef(oldData) || isUndef(oldData.staticClass) && isUndef(oldData.class))) {
    return;
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

/*  */

// add a raw attr (use this in preTransforms)


// note: this only removes the attr from the Array (attrsList) so that it
// doesn't get processed by processAttrs.
// By default it does NOT remove it from the map (attrsMap) because the map is
// needed during codegen.

/*  */

/**
 * Cross-platform code generation for component v-model
 */

/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */

/*  */

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents(on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4
  /* istanbul ignore if */
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler(handler, event, capture) {
  var _target = target$1; // save current target element in closure
  return function onceHandler() {
    var res = handler.apply(null, arguments);
    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  };
}

function add$1(event, handler, once$$1, capture, passive) {
  handler = withMacroTask(handler);
  if (once$$1) {
    handler = createOnceHandler(handler, event, capture);
  }
  target$1.addEventListener(event, handler, supportsPassive ? { capture: capture, passive: passive } : capture);
}

function remove$2(event, handler, capture, _target) {
  (_target || target$1).removeEventListener(event, handler._withTask || handler, capture);
}

function updateDOMListeners(oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return;
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

function updateDOMProps(oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return;
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (isUndef(props[key])) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) {
        vnode.children.length = 0;
      }
      if (cur === oldProps[key]) {
        continue;
      }
      // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue(elm, checkVal) {
  return !elm.composing && (elm.tagName === 'OPTION' || isNotInFocusAndDirty(elm, checkVal) || isDirtyWithModifiers(elm, checkVal));
}

function isNotInFocusAndDirty(elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true;
  // #6157
  // work around IE bug when accessing document.activeElement in an iframe
  try {
    notInFocus = document.activeElement !== elm;
  } catch (e) {}
  return notInFocus && elm.value !== checkVal;
}

function isDirtyWithModifiers(elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers)) {
    if (modifiers.lazy) {
      // inputs with lazy should only be updated when not in focus
      return false;
    }
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal);
    }
    if (modifiers.trim) {
      return value.trim() !== newVal.trim();
    }
  }
  return value !== newVal;
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res;
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData(data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle ? extend(data.staticStyle, style) : style;
}

// normalize possible array / string values into Object
function normalizeStyleBinding(bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle);
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle);
  }
  return bindingStyle;
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle(vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (childNode && childNode.data && (styleData = normalizeStyleData(childNode.data))) {
        extend(res, styleData);
      }
    }
  }

  if (styleData = normalizeStyleData(vnode.data)) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while (parentNode = parentNode.parent) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res;
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function setProp(el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];

var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);
  if (prop !== 'filter' && prop in emptyStyle) {
    return prop;
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;
    if (name in emptyStyle) {
      return name;
    }
  }
});

function updateStyle(oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) && isUndef(oldData.staticStyle) && isUndef(oldData.style)) {
    return;
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__) ? extend({}, style) : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass(el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return;
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) {
        return el.classList.add(c);
      });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass(el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return;
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) {
        return el.classList.remove(c);
      });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}

/*  */

function resolveTransition(def) {
  if (!def) {
    return;
  }
  /* istanbul ignore else */
  if ((typeof def === 'undefined' ? 'undefined' : _typeof(def)) === 'object') {
    var res = {};
    if (def.css !== false) {
      extend(res, autoCssTransition(def.name || 'v'));
    }
    extend(res, def);
    return res;
  } else if (typeof def === 'string') {
    return autoCssTransition(def);
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: name + "-enter",
    enterToClass: name + "-enter-to",
    enterActiveClass: name + "-enter-active",
    leaveClass: name + "-leave",
    leaveToClass: name + "-leave-to",
    leaveActiveClass: name + "-leave-active"
  };
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined && window.onwebkittransitionend !== undefined) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined && window.onwebkitanimationend !== undefined) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser ? window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : setTimeout : /* istanbul ignore next */function (fn) {
  return fn();
};

function nextFrame(fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass(el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass(el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds(el, expectedType, cb) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) {
    return cb();
  }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function end() {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function onEnd(e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo(el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
    propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
  }
  var hasTransform = type === TRANSITION && transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  };
}

function getTimeout(delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i]);
  }));
}

function toMs(s) {
  return Number(s.slice(0, -1)) * 1000;
}

/*  */

function enter(vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return;
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return;
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return;
  }

  var startClass = isAppear && appearClass ? appearClass : enterClass;
  var activeClass = isAppear && appearActiveClass ? appearActiveClass : enterActiveClass;
  var toClass = isAppear && appearToClass ? appearToClass : enterToClass;

  var beforeEnterHook = isAppear ? beforeAppear || beforeEnter : beforeEnter;
  var enterHook = isAppear ? typeof appear === 'function' ? appear : enter : enter;
  var afterEnterHook = isAppear ? afterAppear || afterEnter : afterEnter;
  var enterCancelledHook = isAppear ? appearCancelled || enterCancelled : enterCancelled;

  var explicitEnterDuration = toNumber(isObject(duration) ? duration.enter : duration);

  if (process.env.NODE_ENV !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode && pendingNode.tag === vnode.tag && pendingNode.elm._leaveCb) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      addTransitionClass(el, toClass);
      removeTransitionClass(el, startClass);
      if (!cb.cancelled && !userWantsControl) {
        if (isValidDuration(explicitEnterDuration)) {
          setTimeout(cb, explicitEnterDuration);
        } else {
          whenTransitionEnds(el, type, cb);
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave(vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data) || el.nodeType !== 1) {
    return rm();
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb)) {
    return;
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(isObject(duration) ? duration.leave : duration);

  if (process.env.NODE_ENV !== 'production' && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave() {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return;
    }
    // record leaving element
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        addTransitionClass(el, leaveToClass);
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled && !userWantsControl) {
          if (isValidDuration(explicitLeaveDuration)) {
            setTimeout(cb, explicitLeaveDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration(val, name, vnode) {
  if (typeof val !== 'number') {
    warn("<transition> explicit " + name + " duration is not a valid number - " + "got " + JSON.stringify(val) + ".", vnode.context);
  } else if (isNaN(val)) {
    warn("<transition> explicit " + name + " duration is NaN - " + 'the duration expression might be incorrect.', vnode.context);
  }
}

function isValidDuration(val) {
  return typeof val === 'number' && !isNaN(val);
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength(fn) {
  if (isUndef(fn)) {
    return false;
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(Array.isArray(invokerFns) ? invokerFns[0] : invokerFns);
  } else {
    return (fn._length || fn.length) > 1;
  }
}

function _enter(_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1(vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [attrs, klass, events, domProps, style, transition];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted(el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        if (!isAndroid) {
          el.addEventListener('compositionstart', onCompositionStart);
          el.addEventListener('compositionend', onCompositionEnd);
        }
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },

  componentUpdated: function componentUpdated(el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions.some(function (o, i) {
        return !looseEqual(o, prevOptions[i]);
      })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple ? binding.value.some(function (v) {
          return hasNoMatchingOption(v, curOptions);
        }) : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected(el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */
  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected(el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    process.env.NODE_ENV !== 'production' && warn("<select multiple v-model=\"" + binding.expression + "\"> " + "expects an Array value for its binding, but got " + Object.prototype.toString.call(value).slice(8, -1), vm);
    return;
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return;
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption(value, options) {
  return options.every(function (o) {
    return !looseEqual(o, value);
  });
}

function getValue(option) {
  return '_value' in option ? option._value : option.value;
}

function onCompositionStart(e) {
  e.target.composing = true;
}

function onCompositionEnd(e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) {
    return;
  }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger(el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode(vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition) ? locateNode(vnode.componentInstance._vnode) : vnode;
}

var show = {
  bind: function bind(el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay = el.style.display === 'none' ? '' : el.style.display;
    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update(el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (value === oldValue) {
      return;
    }
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind(el, binding, vnode, oldVnode, isDestroy) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: directive,
  show: show
};

/*  */

// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild(vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children));
  } else {
    return vnode;
  }
}

function extractTransitionData(comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data;
}

function placeholder(h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    });
  }
}

function hasParentTransition(vnode) {
  while (vnode = vnode.parent) {
    if (vnode.data.transition) {
      return true;
    }
  }
}

function isSameChild(child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag;
}

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render(h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return;
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) {
      return c.tag || isAsyncPlaceholder(c);
    });
    /* istanbul ignore if */
    if (!children.length) {
      return;
    }

    // warn multiple elements
    if (process.env.NODE_ENV !== 'production' && children.length > 1) {
      warn('<transition> can only be used on a single element. Use ' + '<transition-group> for lists.', this.$parent);
    }

    var mode = this.mode;

    // warn invalid mode
    if (process.env.NODE_ENV !== 'production' && mode && mode !== 'in-out' && mode !== 'out-in') {
      warn('invalid <transition> mode: ' + mode, this.$parent);
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild;
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild;
    }

    if (this._leaving) {
      return placeholder(h, rawChild);
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + this._uid + "-";
    child.key = child.key == null ? child.isComment ? id + 'comment' : id + child.tag : isPrimitive(child.key) ? String(child.key).indexOf(id) === 0 ? child.key : id + child.key : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(function (d) {
      return d.name === 'show';
    })) {
      child.data.show = true;
    }

    if (oldChild && oldChild.data && !isSameChild(child, oldChild) && !isAsyncPlaceholder(oldChild) &&
    // #6687 component root is a comment node
    !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data);
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild);
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild;
        }
        var delayedLeave;
        var performLeave = function performLeave() {
          delayedLeave();
        };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) {
          delayedLeave = leave;
        });
      }
    }

    return rawChild;
  }
};

/*  */

// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final desired state. This way in the second pass removed
// nodes will remain where they should be.

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  render: function render(h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c;(c.data || (c.data = {})).transition = transitionData;
        } else if (process.env.NODE_ENV !== 'production') {
          var opts = c.componentOptions;
          var name = opts ? opts.Ctor.options.name || opts.tag || '' : c.tag;
          warn("<transition-group> children must be keyed: <" + name + ">");
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children);
  },

  beforeUpdate: function beforeUpdate() {
    // force removing pass
    this.__patch__(this._vnode, this.kept, false, // hydrating
    true // removeOnly (!important avoids unnecessary moves)
    );
    this._vnode = this.kept;
  },

  updated: function updated() {
    var children = this.prevChildren;
    var moveClass = this.moveClass || (this.name || 'v') + '-move';
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return;
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line
    this._reflow = document.body.offsetHeight;

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb(e) {
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove(el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false;
      }
      /* istanbul ignore if */
      if (this._hasMove) {
        return this._hasMove;
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) {
          removeClass(clone, cls);
        });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return this._hasMove = info.hasTransform;
    }
  }
};

function callPendingCbs(c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition(c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation(c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue$3.config.mustUseProp = mustUseProp;
Vue$3.config.isReservedTag = isReservedTag;
Vue$3.config.isReservedAttr = isReservedAttr;
Vue$3.config.getTagNamespace = getTagNamespace;
Vue$3.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue$3.options.directives, platformDirectives);
extend(Vue$3.options.components, platformComponents);

// install platform patch function
Vue$3.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue$3.prototype.$mount = function (el, hydrating) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating);
};

// devtools global hook
/* istanbul ignore next */
Vue$3.nextTick(function () {
  if (config.devtools) {
    if (devtools) {
      devtools.emit('init', Vue$3);
    } else if (process.env.NODE_ENV !== 'production' && isChrome) {
      console[console.info ? 'info' : 'log']('Download the Vue Devtools extension for a better development experience:\n' + 'https://github.com/vuejs/vue-devtools');
    }
  }
  if (process.env.NODE_ENV !== 'production' && config.productionTip !== false && inBrowser && typeof console !== 'undefined') {
    console[console.info ? 'info' : 'log']("You are running Vue in development mode.\n" + "Make sure to turn on production mode when deploying for production.\n" + "See more tips at https://vuejs.org/guide/deployment.html");
  }
}, 0);

/*  */

exports.default = Vue$3;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(0), __webpack_require__(9).setImmediate))

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function () {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function () {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout = exports.clearInterval = function (timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function () {};
Timeout.prototype.close = function () {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function (item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function (item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function (item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout) item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(10);
// On some exotic environments, it's not clear which object `setimmeidate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = typeof self !== "undefined" && self.setImmediate || typeof global !== "undefined" && global.setImmediate || undefined && undefined.setImmediate;
exports.clearImmediate = typeof self !== "undefined" && self.clearImmediate || typeof global !== "undefined" && global.clearImmediate || undefined && undefined.clearImmediate;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, process) {

(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
        // Callback can either be a function or a string
        if (typeof callback !== "function") {
            callback = new Function("" + callback);
        }
        // Copy function arguments
        var args = new Array(arguments.length - 1);
        for (var i = 0; i < args.length; i++) {
            args[i] = arguments[i + 1];
        }
        // Store and register the task
        var task = { callback: callback, args: args };
        tasksByHandle[nextHandle] = task;
        registerImmediate(nextHandle);
        return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
            case 0:
                callback();
                break;
            case 1:
                callback(args[0]);
                break;
            case 2:
                callback(args[0], args[1]);
                break;
            case 3:
                callback(args[0], args[1], args[2]);
                break;
            default:
                callback.apply(undefined, args);
                break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function registerImmediate(handle) {
            process.nextTick(function () {
                runIfPresent(handle);
            });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function () {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function onGlobalMessage(event) {
            if (event.source === global && typeof event.data === "string" && event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function registerImmediate(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function (event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function registerImmediate(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function registerImmediate(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function registerImmediate(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();
    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();
    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();
    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();
    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
})(typeof self === "undefined" ? typeof global === "undefined" ? undefined : global : self);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(2)))

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Index_vue__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Index_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Index_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Index_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_b8ba542a_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Index_vue__ = __webpack_require__(20);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(12)
}
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_b8ba542a_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Index_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\pages\\Index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b8ba542a", Component.options)
  } else {
    hotAPI.reload("data-v-b8ba542a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(13);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("02e89b68", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-b8ba542a\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-b8ba542a\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(18)(false);
// imports


// module
exports.push([module.i, "/**************************************\n * All stylesheets\n *\n * Some may be turned off by commenting them\n * NOTE that some classes are extended and could there for cause problems when turned off\n **************************************/\n/**************************************\n * Imports\n **************************************/\n/**************************************\n * Colors\n **************************************/\n/*\n * Add / remove colors you would like to use in CSS\n * NOTE In SCSS all color variables stay accessible\n *\n * Accent means all colors with leading a\n  Text means classes that define text color\n */\n/**************************************\n * Colors\n *\n * http://www.google.com/design/spec/style/color.html#color-color-palette\n ***************************************/\n/**************************************\n * Global\n **************************************/\n/**************************************\n * Typography settings\n * Default font size under imports\n **************************************/\n/**************************************\n * Grid settings\n **************************************/\n/**************************************\n * Icons\n **************************************/\n/**************************************\n * Lists\n **************************************/\n/**************************************\n * AppBar\n **************************************/\n/**************************************\n * Badges\n **************************************/\n/**************************************\n * Bottom navigation\n **************************************/\n/**************************************\n * Bottom sheet\n **************************************/\n/**************************************\n * Buttons\n **************************************/\n/**************************************\n * Cards\n **************************************/\n/**************************************\n * Chips\n **************************************/\n/**************************************\n * Data tables\n **************************************/\n/**************************************\n * Dialogs\n **************************************/\n/**************************************\n * Dividers\n **************************************/\n/**************************************\n * Expansion panels\n **************************************/\n/**************************************\n * Grid lists\n **************************************/\n/**************************************\n * Menu\n **************************************/\n/**************************************\n * Navigation drawer\n **************************************/\n/**************************************\n* Notifications\n***************************************/\n/**************************************\n * Pickers\n **************************************/\n/**************************************\n * Progress & activity\n **************************************/\n/**************************************\n * Selection controls\n **************************************/\n/**************************************\n * Shadow & elevation\n **************************************/\n/**************************************\n * Sliders\n **************************************/\n/**************************************\n * Snackbars and toasts\n **************************************/\n/**************************************\n * Steppers\n **************************************/\n/**************************************\n * Tabs\n **************************************/\n/**************************************\n * Text fields\n **************************************/\n/**************************************\n * Tooltips\n **************************************/\n/**************************************\n * Small screen (Not mobile screen. Used when you don't want 100% screen width)\n **************************************/\n/**************************************\n * Components\n **************************************/\n/**************************************\n * Grid\n *\n * http://www.google.com/design/spec/layout/responsive-ui.html\n **************************************/\n/**************************************\n * Define all CSS variables\n **************************************/\n:root {\n  --main-color: #3F51B5;\n  --secondary-color: #2196F3;\n  --background: #FFFFFF;\n  --border-size: 0.14286rem;\n  --gutter: 1.14286rem;\n  --font-color-1: var(--font-color-1, rgba(0, 0, 0, 0.54));\n  --font-color-2: var(--font-color-2, rgba(0, 0, 0, 0.87));\n}\n@media only screen and (min-width: 961px) {\n:root {\n      --gutter: 1.71429rem;\n}\n}\n.row {\n  display: -webkit-flex;\n  display: -moz-flex;\n  display: flex;\n  -webkit-flex-flow: row wrap;\n  flex-flow: row wrap;\n  -webkit-justify-content: flex-start;\n  justify-content: flex-start;\n  -webkit-align-items: flex-start;\n  align-items: flex-start;\n  -webkit-align-content: flex-start;\n  align-content: flex-start;\n  width: 100%;\n}\n.col {\n  flex-grow: 1;\n  padding: 0.57143rem;\n  margin: 0;\n}\n@media only screen and (min-width: 961px) {\n.col {\n      padding: 0.85714rem;\n      margin: 0;\n}\n}\n.xs {\n  flex-grow: 1;\n  flex-basis: 0;\n  max-width: 100%;\n}\n.xs1 {\n  flex-basis: 25%;\n  max-width: 25%;\n}\n.offset-xs1 {\n  margin-left: 25%;\n}\n.xs2 {\n  flex-basis: 50%;\n  max-width: 50%;\n}\n.offset-xs2 {\n  margin-left: 50%;\n}\n.xs3 {\n  flex-basis: 75%;\n  max-width: 75%;\n}\n.offset-xs3 {\n  margin-left: 75%;\n}\n.xs4 {\n  flex-basis: 100%;\n  max-width: 100%;\n}\n.offset-xs4 {\n  margin-left: 100%;\n}\n@media only screen and (min-width: 601px) {\n.s {\n    flex-grow: 1;\n    flex-basis: 0;\n    max-width: 100%;\n}\n.s1 {\n    flex-basis: 12.5%;\n    max-width: 12.5%;\n}\n.offset-s1 {\n    margin-left: 12.5%;\n}\n.s2 {\n    flex-basis: 25%;\n    max-width: 25%;\n}\n.offset-s2 {\n    margin-left: 25%;\n}\n.s3 {\n    flex-basis: 37.5%;\n    max-width: 37.5%;\n}\n.offset-s3 {\n    margin-left: 37.5%;\n}\n.s4 {\n    flex-basis: 50%;\n    max-width: 50%;\n}\n.offset-s4 {\n    margin-left: 50%;\n}\n.s5 {\n    flex-basis: 62.5%;\n    max-width: 62.5%;\n}\n.offset-s5 {\n    margin-left: 62.5%;\n}\n.s6 {\n    flex-basis: 75%;\n    max-width: 75%;\n}\n.offset-s6 {\n    margin-left: 75%;\n}\n.s7 {\n    flex-basis: 87.5%;\n    max-width: 87.5%;\n}\n.offset-s7 {\n    margin-left: 87.5%;\n}\n.s8 {\n    flex-basis: 100%;\n    max-width: 100%;\n}\n.offset-s8 {\n    margin-left: 100%;\n}\n}\n@media only screen and (min-width: 841px) {\n.s {\n    flex-grow: 1;\n    flex-basis: 0;\n    max-width: 100%;\n}\n.s1 {\n    flex-basis: 8.33333%;\n    max-width: 8.33333%;\n}\n.offset-s1 {\n    margin-left: 8.33333%;\n}\n.s2 {\n    flex-basis: 16.66667%;\n    max-width: 16.66667%;\n}\n.offset-s2 {\n    margin-left: 16.66667%;\n}\n.s3 {\n    flex-basis: 25%;\n    max-width: 25%;\n}\n.offset-s3 {\n    margin-left: 25%;\n}\n.s4 {\n    flex-basis: 33.33333%;\n    max-width: 33.33333%;\n}\n.offset-s4 {\n    margin-left: 33.33333%;\n}\n.s5 {\n    flex-basis: 41.66667%;\n    max-width: 41.66667%;\n}\n.offset-s5 {\n    margin-left: 41.66667%;\n}\n.s6 {\n    flex-basis: 50%;\n    max-width: 50%;\n}\n.offset-s6 {\n    margin-left: 50%;\n}\n.s7 {\n    flex-basis: 58.33333%;\n    max-width: 58.33333%;\n}\n.offset-s7 {\n    margin-left: 58.33333%;\n}\n.s8 {\n    flex-basis: 66.66667%;\n    max-width: 66.66667%;\n}\n.offset-s8 {\n    margin-left: 66.66667%;\n}\n.s9 {\n    flex-basis: 75%;\n    max-width: 75%;\n}\n.offset-s9 {\n    margin-left: 75%;\n}\n.s10 {\n    flex-basis: 83.33333%;\n    max-width: 83.33333%;\n}\n.offset-s10 {\n    margin-left: 83.33333%;\n}\n.s11 {\n    flex-basis: 91.66667%;\n    max-width: 91.66667%;\n}\n.offset-s11 {\n    margin-left: 91.66667%;\n}\n.s12 {\n    flex-basis: 100%;\n    max-width: 100%;\n}\n.offset-s12 {\n    margin-left: 100%;\n}\n}\n@media only screen and (min-width: 961px) {\n.m {\n    flex-grow: 1;\n    flex-basis: 0;\n    max-width: 100%;\n}\n.m1 {\n    flex-basis: 8.33333%;\n    max-width: 8.33333%;\n}\n.offset-m1 {\n    margin-left: 8.33333%;\n}\n.m2 {\n    flex-basis: 16.66667%;\n    max-width: 16.66667%;\n}\n.offset-m2 {\n    margin-left: 16.66667%;\n}\n.m3 {\n    flex-basis: 25%;\n    max-width: 25%;\n}\n.offset-m3 {\n    margin-left: 25%;\n}\n.m4 {\n    flex-basis: 33.33333%;\n    max-width: 33.33333%;\n}\n.offset-m4 {\n    margin-left: 33.33333%;\n}\n.m5 {\n    flex-basis: 41.66667%;\n    max-width: 41.66667%;\n}\n.offset-m5 {\n    margin-left: 41.66667%;\n}\n.m6 {\n    flex-basis: 50%;\n    max-width: 50%;\n}\n.offset-m6 {\n    margin-left: 50%;\n}\n.m7 {\n    flex-basis: 58.33333%;\n    max-width: 58.33333%;\n}\n.offset-m7 {\n    margin-left: 58.33333%;\n}\n.m8 {\n    flex-basis: 66.66667%;\n    max-width: 66.66667%;\n}\n.offset-m8 {\n    margin-left: 66.66667%;\n}\n.m9 {\n    flex-basis: 75%;\n    max-width: 75%;\n}\n.offset-m9 {\n    margin-left: 75%;\n}\n.m10 {\n    flex-basis: 83.33333%;\n    max-width: 83.33333%;\n}\n.offset-m10 {\n    margin-left: 83.33333%;\n}\n.m11 {\n    flex-basis: 91.66667%;\n    max-width: 91.66667%;\n}\n.offset-m11 {\n    margin-left: 91.66667%;\n}\n.m12 {\n    flex-basis: 100%;\n    max-width: 100%;\n}\n.offset-m12 {\n    margin-left: 100%;\n}\n}\n@media only screen and (min-width: 1281px) {\n.l {\n    flex-grow: 1;\n    flex-basis: 0;\n    max-width: 100%;\n}\n.l1 {\n    flex-basis: 8.33333%;\n    max-width: 8.33333%;\n}\n.offset-l1 {\n    margin-left: 8.33333%;\n}\n.l2 {\n    flex-basis: 16.66667%;\n    max-width: 16.66667%;\n}\n.offset-l2 {\n    margin-left: 16.66667%;\n}\n.l3 {\n    flex-basis: 25%;\n    max-width: 25%;\n}\n.offset-l3 {\n    margin-left: 25%;\n}\n.l4 {\n    flex-basis: 33.33333%;\n    max-width: 33.33333%;\n}\n.offset-l4 {\n    margin-left: 33.33333%;\n}\n.l5 {\n    flex-basis: 41.66667%;\n    max-width: 41.66667%;\n}\n.offset-l5 {\n    margin-left: 41.66667%;\n}\n.l6 {\n    flex-basis: 50%;\n    max-width: 50%;\n}\n.offset-l6 {\n    margin-left: 50%;\n}\n.l7 {\n    flex-basis: 58.33333%;\n    max-width: 58.33333%;\n}\n.offset-l7 {\n    margin-left: 58.33333%;\n}\n.l8 {\n    flex-basis: 66.66667%;\n    max-width: 66.66667%;\n}\n.offset-l8 {\n    margin-left: 66.66667%;\n}\n.l9 {\n    flex-basis: 75%;\n    max-width: 75%;\n}\n.offset-l9 {\n    margin-left: 75%;\n}\n.l10 {\n    flex-basis: 83.33333%;\n    max-width: 83.33333%;\n}\n.offset-l10 {\n    margin-left: 83.33333%;\n}\n.l11 {\n    flex-basis: 91.66667%;\n    max-width: 91.66667%;\n}\n.offset-l11 {\n    margin-left: 91.66667%;\n}\n.l12 {\n    flex-basis: 100%;\n    max-width: 100%;\n}\n.offset-l12 {\n    margin-left: 100%;\n}\n}\n@media only screen and (min-width: 1601px) {\n.xl {\n    flex-grow: 1;\n    flex-basis: 0;\n    max-width: 100%;\n}\n.xl1 {\n    flex-basis: 8.33333%;\n    max-width: 8.33333%;\n}\n.offset-xl1 {\n    margin-left: 8.33333%;\n}\n.xl2 {\n    flex-basis: 16.66667%;\n    max-width: 16.66667%;\n}\n.offset-xl2 {\n    margin-left: 16.66667%;\n}\n.xl3 {\n    flex-basis: 25%;\n    max-width: 25%;\n}\n.offset-xl3 {\n    margin-left: 25%;\n}\n.xl4 {\n    flex-basis: 33.33333%;\n    max-width: 33.33333%;\n}\n.offset-xl4 {\n    margin-left: 33.33333%;\n}\n.xl5 {\n    flex-basis: 41.66667%;\n    max-width: 41.66667%;\n}\n.offset-xl5 {\n    margin-left: 41.66667%;\n}\n.xl6 {\n    flex-basis: 50%;\n    max-width: 50%;\n}\n.offset-xl6 {\n    margin-left: 50%;\n}\n.xl7 {\n    flex-basis: 58.33333%;\n    max-width: 58.33333%;\n}\n.offset-xl7 {\n    margin-left: 58.33333%;\n}\n.xl8 {\n    flex-basis: 66.66667%;\n    max-width: 66.66667%;\n}\n.offset-xl8 {\n    margin-left: 66.66667%;\n}\n.xl9 {\n    flex-basis: 75%;\n    max-width: 75%;\n}\n.offset-xl9 {\n    margin-left: 75%;\n}\n.xl10 {\n    flex-basis: 83.33333%;\n    max-width: 83.33333%;\n}\n.offset-xl10 {\n    margin-left: 83.33333%;\n}\n.xl11 {\n    flex-basis: 91.66667%;\n    max-width: 91.66667%;\n}\n.offset-xl11 {\n    margin-left: 91.66667%;\n}\n.xl12 {\n    flex-basis: 100%;\n    max-width: 100%;\n}\n.offset-xl12 {\n    margin-left: 100%;\n}\n}\n@media only screen and (max-width: 600px) {\n.xs-hidden-down {\n    display: none;\n}\n}\n@media only screen and (max-width: 600px) {\n.xs-hidden {\n    display: none;\n}\n}\n@media only screen and (min-width: 601px) {\n.xs-hidden-up {\n    display: none;\n}\n}\n@media only screen and (max-width: 960px) {\n.s-hidden-down {\n    display: none;\n}\n}\n@media only screen and (min-width: 601px) and (max-width: 960px) {\n.s-hidden {\n    display: none;\n}\n}\n@media only screen and (min-width: 961px) {\n.s-hidden-up {\n    display: none;\n}\n}\n@media only screen and (max-width: 1280px) {\n.m-hidden-down {\n    display: none;\n}\n}\n@media only screen and (min-width: 961px) and (max-width: 1280px) {\n.m-hidden {\n    display: none;\n}\n}\n@media only screen and (min-width: 1281px) {\n.m-hidden-up {\n    display: none;\n}\n}\n@media only screen and (max-width: 1600px) {\n.l-hidden-down {\n    display: none;\n}\n}\n@media only screen and (min-width: 1281px) and (max-width: 1600px) {\n.l-hidden {\n    display: none;\n}\n}\n@media only screen and (min-width: 1601px) {\n.l-hidden-up {\n    display: none;\n}\n}\n@media only screen and (max-width: 1920px) {\n.xl-hidden-down {\n    display: none;\n}\n}\n@media only screen and (min-width: 1601px) and (max-width: 1920px) {\n.xl-hidden {\n    display: none;\n}\n}\n@media only screen and (min-width: 1921px) {\n.xl-hidden-up {\n    display: none;\n}\n}\n\n/**************************************\n * Remove browser default styles\n *\n * https://material.google.com/motion/duration-easing.html\n **************************************/\nhtml, body {\n  background: var(--background, #FFFFFF);\n  margin: 0;\n  padding: 0;\n}\nhtml {\n  font-size: 14px;\n  -webkit-print-color-adjust: exact;\n}\nlabel {\n  cursor: pointer;\n}\nfigure {\n  margin: 0;\n}\nfigure img {\n    max-width: 100%;\n}\nimg {\n  height: auto;\n  max-width: 100%;\n  display: block;\n}\nh1, h2, h3, h4, h5, h6 {\n  word-wrap: break-word;\n}\n::-webkit-scrollbar, ::-webkit-scrollbar-track {\n  background: transparent;\n}\n::-webkit-scrollbar-button, ::-webkit-scrollbar-corner, ::-webkit-resizer {\n  display: none;\n}\n::-webkit-scrollbar {\n  width: 0.21429rem;\n  height: 0.21429rem;\n}\n@media only screen and (min-width: 961px) {\n::-webkit-scrollbar {\n      width: 0.71429rem;\n      height: 0.71429rem;\n}\n}\n::-webkit-scrollbar-thumb {\n  background: rgba(0, 0, 0, 0.2);\n}\n::-moz-selection {\n  background: #18FFFF;\n}\n::selection {\n  background: #18FFFF;\n}\n* {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  -ms-box-sizing: border-box;\n  -o-box-sizing: border-box;\n  box-sizing: border-box;\n}\na {\n  color: var(--main-color, #3F51B5);\n  outline: none;\n  text-decoration: none;\n  -webkit-transition: color 300ms cubic-bezier(0.4, 0, 0.2, 1);\n  -moz-transition: color 300ms cubic-bezier(0.4, 0, 0.2, 1);\n  -o-transition: color 300ms cubic-bezier(0.4, 0, 0.2, 1);\n  transition: color 300ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n@media only screen and (min-width: 1281px) {\na {\n      -webkit-transition: color 390ms cubic-bezier(0.4, 0, 0.2, 1);\n      -moz-transition: color 390ms cubic-bezier(0.4, 0, 0.2, 1);\n      -o-transition: color 390ms cubic-bezier(0.4, 0, 0.2, 1);\n      transition: color 390ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n@media only screen and (min-width: 1601px) {\na {\n      -webkit-transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1);\n      -moz-transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1);\n      -o-transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1);\n      transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\na:hover {\n    color: var(--secondary-color, #2196F3);\n}\na:hover .material-icons {\n      color: var(--secondary-color, #2196F3);\n}\na img {\n    outline: none;\n}\nmain, .main-content {\n  bottom: 0;\n  left: 0;\n  overflow: auto;\n  padding: 0.57143rem;\n  position: fixed;\n  right: 0;\n  top: 4rem;\n}\n@media only screen and (orientation: landscape) and (max-width: 960px) {\nmain, .main-content {\n      top: 3.42857rem;\n      padding: 0.57143rem;\n}\n}\n@media only screen and (orientation: portrait) and (max-width: 600px) {\nmain, .main-content {\n      top: 4rem;\n      padding: 0.57143rem;\n}\n}\n@media only screen and (min-width: 961px) {\nmain, .main-content {\n      top: 4.57143rem;\n      left: 20rem;\n      padding: 0.85714rem;\n}\n}\n.trigger {\n  cursor: pointer;\n}\n.circle {\n  -webkit-border-radius: 50%;\n  -moz-border-radius: 50%;\n  -ms-border-radius: 50%;\n  -o-border-radius: 50%;\n  border-radius: 50%;\n}\n.left {\n  float: left;\n}\n.right {\n  float: right;\n}\n.center {\n  text-align: center;\n  vertical-align: middle;\n}\nhr {\n  background: rgba(0, 0, 0, 0.12);\n  border: 0.03571rem solid rgba(0, 0, 0, 0.12);\n  height: 0.07143rem;\n}\n\n/**************************************\n * Elevation and shadows\n *\n * http://www.google.com/design/spec/what-is-material/elevation-shadows.html\n * http://material-components-web.appspot.com/elevation.html\n * https://material.io/guidelines/resources/shadows.html#shadows-sketch\n **************************************/\n.z1 {\n  -moz-box-shadow: 0rem 0rem 0.14286rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.14286rem 0.14286rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.21429rem 0rem rgba(0, 0, 0, 0.2);\n  -webkit-box-shadow: 0rem 0rem 0.14286rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.14286rem 0.14286rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.21429rem 0rem rgba(0, 0, 0, 0.2);\n  -ms-box-shadow: 0rem 0rem 0.14286rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.14286rem 0.14286rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.21429rem 0rem rgba(0, 0, 0, 0.2);\n  -o-box-shadow: 0rem 0rem 0.14286rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.14286rem 0.14286rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.21429rem 0rem rgba(0, 0, 0, 0.2);\n  box-shadow: 0rem 0rem 0.14286rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.14286rem 0.14286rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.21429rem 0rem rgba(0, 0, 0, 0.2);\n}\n.z2 {\n  -moz-box-shadow: 0rem 0rem 0.14286rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 0.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n  -webkit-box-shadow: 0rem 0rem 0.14286rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 0.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n  -ms-box-shadow: 0rem 0rem 0.14286rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 0.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n  -o-box-shadow: 0rem 0rem 0.14286rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 0.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n  box-shadow: 0rem 0rem 0.14286rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 0.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n}\n.z3 {\n  -moz-box-shadow: 0rem 0.21429rem 0.21429rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 0.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.57143rem 0rem rgba(0, 0, 0, 0.2);\n  -webkit-box-shadow: 0rem 0.21429rem 0.21429rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 0.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.57143rem 0rem rgba(0, 0, 0, 0.2);\n  -ms-box-shadow: 0rem 0.21429rem 0.21429rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 0.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.57143rem 0rem rgba(0, 0, 0, 0.2);\n  -o-box-shadow: 0rem 0.21429rem 0.21429rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 0.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.57143rem 0rem rgba(0, 0, 0, 0.2);\n  box-shadow: 0rem 0.21429rem 0.21429rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 0.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.57143rem 0rem rgba(0, 0, 0, 0.2);\n}\n@media only screen and (min-width: 1281px) {\n.z3 {\n      -moz-box-shadow: 0rem 0rem 0.14286rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.14286rem 0.14286rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.21429rem 0rem rgba(0, 0, 0, 0.2);\n      -webkit-box-shadow: 0rem 0rem 0.14286rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.14286rem 0.14286rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.21429rem 0rem rgba(0, 0, 0, 0.2);\n      -ms-box-shadow: 0rem 0rem 0.14286rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.14286rem 0.14286rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.21429rem 0rem rgba(0, 0, 0, 0.2);\n      -o-box-shadow: 0rem 0rem 0.14286rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.14286rem 0.14286rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.21429rem 0rem rgba(0, 0, 0, 0.2);\n      box-shadow: 0rem 0rem 0.14286rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.14286rem 0.14286rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.21429rem 0rem rgba(0, 0, 0, 0.2);\n}\n}\n.z4 {\n  -moz-box-shadow: 0rem 0.14286rem 0.28571rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.28571rem 0.35714rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.71429rem 0rem rgba(0, 0, 0, 0.2);\n  -webkit-box-shadow: 0rem 0.14286rem 0.28571rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.28571rem 0.35714rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.71429rem 0rem rgba(0, 0, 0, 0.2);\n  -ms-box-shadow: 0rem 0.14286rem 0.28571rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.28571rem 0.35714rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.71429rem 0rem rgba(0, 0, 0, 0.2);\n  -o-box-shadow: 0rem 0.14286rem 0.28571rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.28571rem 0.35714rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.71429rem 0rem rgba(0, 0, 0, 0.2);\n  box-shadow: 0rem 0.14286rem 0.28571rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.28571rem 0.35714rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.71429rem 0rem rgba(0, 0, 0, 0.2);\n}\n@media only screen and (min-width: 1281px) {\n.z4 {\n      -moz-box-shadow: 0rem 0rem 0.14286rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 0.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n      -webkit-box-shadow: 0rem 0rem 0.14286rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 0.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n      -ms-box-shadow: 0rem 0rem 0.14286rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 0.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n      -o-box-shadow: 0rem 0rem 0.14286rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 0.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n      box-shadow: 0rem 0rem 0.14286rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 0.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n}\n}\n.z6 {\n  -moz-box-shadow: 0rem 0.42857rem 0.71429rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.07143rem 1.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.21429rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n  -webkit-box-shadow: 0rem 0.42857rem 0.71429rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.07143rem 1.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.21429rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n  -ms-box-shadow: 0rem 0.42857rem 0.71429rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.07143rem 1.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.21429rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n  -o-box-shadow: 0rem 0.42857rem 0.71429rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.07143rem 1.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.21429rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n  box-shadow: 0rem 0.42857rem 0.71429rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.07143rem 1.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.21429rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n}\n@media only screen and (min-width: 1281px) {\n.z6 {\n      -moz-box-shadow: 0rem 0.14286rem 0.28571rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.28571rem 0.35714rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.71429rem 0rem rgba(0, 0, 0, 0.2);\n      -webkit-box-shadow: 0rem 0.14286rem 0.28571rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.28571rem 0.35714rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.71429rem 0rem rgba(0, 0, 0, 0.2);\n      -ms-box-shadow: 0rem 0.14286rem 0.28571rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.28571rem 0.35714rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.71429rem 0rem rgba(0, 0, 0, 0.2);\n      -o-box-shadow: 0rem 0.14286rem 0.28571rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.28571rem 0.35714rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.71429rem 0rem rgba(0, 0, 0, 0.2);\n      box-shadow: 0rem 0.14286rem 0.28571rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.28571rem 0.35714rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.71429rem 0rem rgba(0, 0, 0, 0.2);\n}\n}\n.z8 {\n  -moz-box-shadow: 0rem 0.57143rem 0.71429rem 0.07143rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 1rem 0.21429rem rgba(0, 0, 0, 0.12) , 0rem 0.28571rem 1.07143rem 0rem rgba(0, 0, 0, 0.2);\n  -webkit-box-shadow: 0rem 0.57143rem 0.71429rem 0.07143rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 1rem 0.21429rem rgba(0, 0, 0, 0.12) , 0rem 0.28571rem 1.07143rem 0rem rgba(0, 0, 0, 0.2);\n  -ms-box-shadow: 0rem 0.57143rem 0.71429rem 0.07143rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 1rem 0.21429rem rgba(0, 0, 0, 0.12) , 0rem 0.28571rem 1.07143rem 0rem rgba(0, 0, 0, 0.2);\n  -o-box-shadow: 0rem 0.57143rem 0.71429rem 0.07143rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 1rem 0.21429rem rgba(0, 0, 0, 0.12) , 0rem 0.28571rem 1.07143rem 0rem rgba(0, 0, 0, 0.2);\n  box-shadow: 0rem 0.57143rem 0.71429rem 0.07143rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 1rem 0.21429rem rgba(0, 0, 0, 0.12) , 0rem 0.28571rem 1.07143rem 0rem rgba(0, 0, 0, 0.2);\n}\n@media only screen and (min-width: 1281px) {\n.z8 {\n      -moz-box-shadow: 0rem 0.42857rem 0.71429rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.07143rem 1.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.21429rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n      -webkit-box-shadow: 0rem 0.42857rem 0.71429rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.07143rem 1.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.21429rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n      -ms-box-shadow: 0rem 0.42857rem 0.71429rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.07143rem 1.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.21429rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n      -o-box-shadow: 0rem 0.42857rem 0.71429rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.07143rem 1.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.21429rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n      box-shadow: 0rem 0.42857rem 0.71429rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.07143rem 1.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.21429rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n}\n}\n.z9 {\n  -moz-box-shadow: 0rem 0.64286rem 0.85714rem 0.07143rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 1.14286rem 0.14286rem rgba(0, 0, 0, 0.12) , 0rem 0.35714rem 0.42857rem 0rem rgba(0, 0, 0, 0.2);\n  -webkit-box-shadow: 0rem 0.64286rem 0.85714rem 0.07143rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 1.14286rem 0.14286rem rgba(0, 0, 0, 0.12) , 0rem 0.35714rem 0.42857rem 0rem rgba(0, 0, 0, 0.2);\n  -ms-box-shadow: 0rem 0.64286rem 0.85714rem 0.07143rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 1.14286rem 0.14286rem rgba(0, 0, 0, 0.12) , 0rem 0.35714rem 0.42857rem 0rem rgba(0, 0, 0, 0.2);\n  -o-box-shadow: 0rem 0.64286rem 0.85714rem 0.07143rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 1.14286rem 0.14286rem rgba(0, 0, 0, 0.12) , 0rem 0.35714rem 0.42857rem 0rem rgba(0, 0, 0, 0.2);\n  box-shadow: 0rem 0.64286rem 0.85714rem 0.07143rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 1.14286rem 0.14286rem rgba(0, 0, 0, 0.12) , 0rem 0.35714rem 0.42857rem 0rem rgba(0, 0, 0, 0.2);\n}\n.z12 {\n  -moz-box-shadow: 0rem 0.85714rem 1.21429rem 0.14286rem rgba(0, 0, 0, 0.14) , 0rem 0.35714rem 1.57143rem 0.28571rem rgba(0, 0, 0, 0.12) , 0rem 0.5rem 0.57143rem 0rem rgba(0, 0, 0, 0.2);\n  -webkit-box-shadow: 0rem 0.85714rem 1.21429rem 0.14286rem rgba(0, 0, 0, 0.14) , 0rem 0.35714rem 1.57143rem 0.28571rem rgba(0, 0, 0, 0.12) , 0rem 0.5rem 0.57143rem 0rem rgba(0, 0, 0, 0.2);\n  -ms-box-shadow: 0rem 0.85714rem 1.21429rem 0.14286rem rgba(0, 0, 0, 0.14) , 0rem 0.35714rem 1.57143rem 0.28571rem rgba(0, 0, 0, 0.12) , 0rem 0.5rem 0.57143rem 0rem rgba(0, 0, 0, 0.2);\n  -o-box-shadow: 0rem 0.85714rem 1.21429rem 0.14286rem rgba(0, 0, 0, 0.14) , 0rem 0.35714rem 1.57143rem 0.28571rem rgba(0, 0, 0, 0.12) , 0rem 0.5rem 0.57143rem 0rem rgba(0, 0, 0, 0.2);\n  box-shadow: 0rem 0.85714rem 1.21429rem 0.14286rem rgba(0, 0, 0, 0.14) , 0rem 0.35714rem 1.57143rem 0.28571rem rgba(0, 0, 0, 0.12) , 0rem 0.5rem 0.57143rem 0rem rgba(0, 0, 0, 0.2);\n}\n.z16 {\n  -moz-box-shadow: 0rem 1.14286rem 1.71429rem 0.14286rem rgba(0, 0, 0, 0.14) , 0rem 0.42857rem 2.14286rem 0.35714rem rgba(0, 0, 0, 0.12) , 0rem 0.57143rem 0.71429rem 0rem rgba(0, 0, 0, 0.2);\n  -webkit-box-shadow: 0rem 1.14286rem 1.71429rem 0.14286rem rgba(0, 0, 0, 0.14) , 0rem 0.42857rem 2.14286rem 0.35714rem rgba(0, 0, 0, 0.12) , 0rem 0.57143rem 0.71429rem 0rem rgba(0, 0, 0, 0.2);\n  -ms-box-shadow: 0rem 1.14286rem 1.71429rem 0.14286rem rgba(0, 0, 0, 0.14) , 0rem 0.42857rem 2.14286rem 0.35714rem rgba(0, 0, 0, 0.12) , 0rem 0.57143rem 0.71429rem 0rem rgba(0, 0, 0, 0.2);\n  -o-box-shadow: 0rem 1.14286rem 1.71429rem 0.14286rem rgba(0, 0, 0, 0.14) , 0rem 0.42857rem 2.14286rem 0.35714rem rgba(0, 0, 0, 0.12) , 0rem 0.57143rem 0.71429rem 0rem rgba(0, 0, 0, 0.2);\n  box-shadow: 0rem 1.14286rem 1.71429rem 0.14286rem rgba(0, 0, 0, 0.14) , 0rem 0.42857rem 2.14286rem 0.35714rem rgba(0, 0, 0, 0.12) , 0rem 0.57143rem 0.71429rem 0rem rgba(0, 0, 0, 0.2);\n}\n.z24 {\n  -moz-box-shadow: 0rem 1.71429rem 2.71429rem 0.21429rem rgba(0, 0, 0, 0.14) , 0rem 0.64286rem 3.28571rem 0.57143rem rgba(0, 0, 0, 0.12) , 0rem 0.78571rem 1.07143rem 0rem rgba(0, 0, 0, 0.2);\n  -webkit-box-shadow: 0rem 1.71429rem 2.71429rem 0.21429rem rgba(0, 0, 0, 0.14) , 0rem 0.64286rem 3.28571rem 0.57143rem rgba(0, 0, 0, 0.12) , 0rem 0.78571rem 1.07143rem 0rem rgba(0, 0, 0, 0.2);\n  -ms-box-shadow: 0rem 1.71429rem 2.71429rem 0.21429rem rgba(0, 0, 0, 0.14) , 0rem 0.64286rem 3.28571rem 0.57143rem rgba(0, 0, 0, 0.12) , 0rem 0.78571rem 1.07143rem 0rem rgba(0, 0, 0, 0.2);\n  -o-box-shadow: 0rem 1.71429rem 2.71429rem 0.21429rem rgba(0, 0, 0, 0.14) , 0rem 0.64286rem 3.28571rem 0.57143rem rgba(0, 0, 0, 0.12) , 0rem 0.78571rem 1.07143rem 0rem rgba(0, 0, 0, 0.2);\n  box-shadow: 0rem 1.71429rem 2.71429rem 0.21429rem rgba(0, 0, 0, 0.14) , 0rem 0.64286rem 3.28571rem 0.57143rem rgba(0, 0, 0, 0.12) , 0rem 0.78571rem 1.07143rem 0rem rgba(0, 0, 0, 0.2);\n}\n\n/**************************************\n * Typography\n *\n * http://www.google.com/design/spec/style/typography.html\n * http://codepen.io/zavoloklom/pen/IkaFL/\n * https://www.google.com/fonts\n **************************************/\n/**************************************\n * Load fonts\n *\n * This includes both Roboto and Noto\n * Check https://www.google.com/get/noto/ to see which font to uncomment\n * Roboto is default\n **************************************/\n@font-face {\n  font-family: \"Roboto\";\n  src: url(\"/stylesheets/fonts/Roboto/Roboto-Thin.ttf\");\n  font-weight: 100;\n  font-style: normal;\n}\n@font-face {\n  font-family: \"Roboto\";\n  src: url(\"/stylesheets/fonts/Roboto/Roboto-ThinItalic.ttf\");\n  font-weight: 100;\n  font-style: italic;\n}\n@font-face {\n  font-family: \"Roboto\";\n  src: url(\"/stylesheets/fonts/Roboto/Roboto-Light.ttf\");\n  font-weight: 300;\n  font-style: normal;\n}\n@font-face {\n  font-family: \"Roboto\";\n  src: url(\"/stylesheets/fonts/Roboto/Roboto-LightItalic.ttf\");\n  font-weight: 300;\n  font-style: italic;\n}\n@font-face {\n  font-family: \"Roboto\";\n  src: url(\"/stylesheets/fonts/Roboto/Roboto-Regular.ttf\");\n  font-weight: 400;\n  font-style: normal;\n}\n@font-face {\n  font-family: \"Roboto\";\n  src: url(\"/stylesheets/fonts/Roboto/Roboto-Italic.ttf\");\n  font-weight: 400;\n  font-style: italic;\n}\n@font-face {\n  font-family: \"Roboto\";\n  src: url(\"/stylesheets/fonts/Roboto/Roboto-Medium.ttf\");\n  font-weight: 500;\n  font-style: normal;\n}\n@font-face {\n  font-family: \"Roboto\";\n  src: url(\"/stylesheets/fonts/Roboto/Roboto-MediumItalic.ttf\");\n  font-weight: 500;\n  font-style: italic;\n}\n@font-face {\n  font-family: \"Roboto\";\n  src: url(\"/stylesheets/fonts/Roboto/Roboto-Bold.ttf\");\n  font-weight: 700;\n  font-style: normal;\n}\n@font-face {\n  font-family: \"Roboto\";\n  src: url(\"/stylesheets/fonts/Roboto/Roboto-BoldItalic.ttf\");\n  font-weight: 700;\n  font-style: italic;\n}\n@font-face {\n  font-family: \"Roboto\";\n  src: url(\"/stylesheets/fonts/Roboto/Roboto-Black.ttf\");\n  font-weight: 900;\n  font-style: normal;\n}\n@font-face {\n  font-family: \"Roboto\";\n  src: url(\"/stylesheets/fonts/Roboto/Roboto-BlackItalic.ttf\");\n  font-weight: 900;\n  font-style: italic;\n}\n\n/*\n@if( $amp == false ) {\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoKufiArabic-Bold.ttf');\n\tfont-weight: 700;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoKufiArabic-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoMono-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoNaskhArabic-Bold.ttf');\n\tfont-weight: 700;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoNaskhArabic-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoNastaliqUrdu-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSans-Bold.ttf');\n\tfont-weight: 700;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSans-BoldItalic.ttf');\n\tfont-weight: 700;\n\tfont-style: italic;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSans-Italic.ttf');\n\tfont-weight: 400;\n\tfont-style: italic;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSans-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansArmenian-Bold.ttf');\n\tfont-weight: 700;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansArmenian-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansAvestan-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansBalinese-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansBamum-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansBatak-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansBengali-Bold.ttf');\n\tfont-weight: 700;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansBengali-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansBrahmi-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansBuginese-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansBuhid-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansCJKjp-Black.otf');\n\tfont-weight: 900;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansCJKjp-Bold.otf');\n\tfont-weight: 700;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansCJKjp-DemiLight.otf');\n\tfont-weight: 300;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansCJKjp-Light.otf');\n\tfont-weight: 300;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansCJKjp-Medium.otf');\n\tfont-weight: 500;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansCJKjp-Regular.otf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansCJKjp-Thin.otf');\n\tfont-weight: 100;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansCJKkr-Black.otf');\n\tfont-weight: 900;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansCJKkr-Bold.otf');\n\tfont-weight: 700;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansCJKkr-DemiLight.otf');\n\tfont-weight: 300;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansCJKkr-Light.otf');\n\tfont-weight: 300;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansCJKkr-Medium.otf');\n\tfont-weight: 500;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansCJKkr-Regular.otf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansCJKkr-Thin.otf');\n\tfont-weight: 100;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansCJKBlack.otf');\n\tfont-weight: 900;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansCJKBold.otf');\n\tfont-weight: 700;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansCJKDemiLight.otf');\n\tfont-weight: 300;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansCJKLight.otf');\n\tfont-weight: 300;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansCJKMedium.otf');\n\tfont-weight: 500;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansCJKRegular.otf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansCJKThin.otf');\n\tfont-weight: 100;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansCJKtc-Black.otf');\n\tfont-weight: 900;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansCJKtc-Bold.otf');\n\tfont-weight: 700;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansCJKtc-DemiLight.otf');\n\tfont-weight: 300;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansCJKtc-Light.otf');\n\tfont-weight: 300;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansCJKtc-Medium.otf');\n\tfont-weight: 500;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansCJKtc-Regular.otf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansCJKtc-Thin.otf');\n\tfont-weight: 100;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansCanadianAboriginal-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansCarian-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansCham-Bold.ttf');\n\tfont-weight: 700;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansCham-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansCherokee-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansCoptic-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansCuneiform-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansCypriot-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansDeseret-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansDevanagari-Bold.ttf');\n\tfont-weight: 700;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansDevanagari-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansEgyptianHieroglyphs-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansEthiopic-Bold.ttf');\n\tfont-weight: 700;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansEthiopic-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansGeorgian-Bold.ttf');\n\tfont-weight: 700;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansGeorgian-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansGlagolitic-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansGothic-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansGujarati-Bold.ttf');\n\tfont-weight: 700;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansGujarati-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansGurmukhi-Bold.ttf');\n\tfont-weight: 700;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansGurmukhi-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansHanunoo-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansHebrew-Bold.ttf');\n\tfont-weight: 700;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansHebrew-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansImperialAramaic-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansInscriptionalPahlavi-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansInscriptionalParthian-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansJavanese-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansKaithi-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansKannada-Bold.ttf');\n\tfont-weight: 700;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansKannada-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansKayahLi-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansKharoshthi-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansKhmer-Bold.ttf');\n\tfont-weight: 700;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansKhmer-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansLao-Bold.ttf');\n\tfont-weight: 700;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansLao-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansLepcha-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansLimbu-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansLinearB-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansLisu-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansLycian-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansLydian-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansMalayalam-Bold.ttf');\n\tfont-weight: 700;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansMalayalam-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansMandaic-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansMeeteiMayek-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansMongolian-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansMonoCJKjp-Bold.otf');\n\tfont-weight: 700;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansMonoCJKjp-Regular.otf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansMonoCJKkr-Bold.otf');\n\tfont-weight: 700;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansMonoCJKkr-Regular.otf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansMonoCJKBold.otf');\n\tfont-weight: 700;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansMonoCJKRegular.otf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansMonoCJKtc-Bold.otf');\n\tfont-weight: 700;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansMonoCJKtc-Regular.otf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansMyanmar-Bold.ttf');\n\tfont-weight: 700;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansMyanmar-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansNKo-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansNewTaiLue-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansOgham-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansOlChiki-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansOldItalic-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: italic;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansOldPersian-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansOldSouthArabian-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansOldTurkic-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansOriya-Bold.ttf');\n\tfont-weight: 700;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansOriya-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansOsmanya-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansPhagsPa-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansPhoenician-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansRejang-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansRunic-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansSamaritan-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansSaurashtra-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansShavian-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansSinhala-Bold.ttf');\n\tfont-weight: 700;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansSinhala-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansSundanese-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansSylotiNagri-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansSymbols-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansSyriacEastern-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansSyriacEstrangela-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansSyriacWestern-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansTagalog-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansTagbanwa-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansTaiLe-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansTaiTham-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansTaiViet-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansTamil-Bold.ttf');\n\tfont-weight: 700;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansTamil-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansTelugu-Bold.ttf');\n\tfont-weight: 700;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansTelugu-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansThaana-Bold.ttf');\n\tfont-weight: 700;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansThaana-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansThai-Bold.ttf');\n\tfont-weight: 700;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansThai-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansTibetan-Bold.ttf');\n\tfont-weight: 700;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansTibetan-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansTifinagh-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansUgaritic-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansVai-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSansYi-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSerif-Bold.ttf');\n\tfont-weight: 700;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSerif-BoldItalic.ttf');\n\tfont-weight: 700;\n\tfont-style: italic;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSerif-Italic.ttf');\n\tfont-weight: 400;\n\tfont-style: italic;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSerif-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSerifArmenian-Bold.ttf');\n\tfont-weight: 700;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSerifArmenian-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSerifBengali-Bold.ttf');\n\tfont-weight: 700;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSerifBengali-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSerifDevanagari-Bold.ttf');\n\tfont-weight: 700;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSerifDevanagari-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSerifGeorgian-Bold.ttf');\n\tfont-weight: 700;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSerifGeorgian-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSerifGujarati-Bold.ttf');\n\tfont-weight: 700;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSerifGujarati-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSerifKannada-Bold.ttf');\n\tfont-weight: 700;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSerifKannada-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSerifKhmer-Bold.ttf');\n\tfont-weight: 700;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSerifKhmer-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSerifLao-Bold.ttf');\n\tfont-weight: 700;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSerifLao-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSerifMalayalam-Bold.ttf');\n\tfont-weight: 700;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSerifMalayalam-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSerifTamil-Bold.ttf');\n\tfont-weight: 700;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSerifTamil-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSerifTelugu-Bold.ttf');\n\tfont-weight: 700;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSerifTelugu-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSerifThai-Bold.ttf');\n\tfont-weight: 700;\n\tfont-style: normal;\n}\n\n@font-face {\n\tfont-family: \"Noto\";\n\tsrc: url('/stylesheets/fonts/Noto/NotoSerifThai-Regular.ttf');\n\tfont-weight: 400;\n\tfont-style: normal;\n}\n}\n*/\n.display-4, h1 {\n  font-size: 8rem;\n  line-height: 9.14286rem;\n  letter-spacing: -0.00714rem;\n  font-weight: 300;\n  color: var(--font-color-1, rgba(0, 0, 0, 0.54));\n  text-transform: inherit;\n}\n.display-4 .material-icons, h1 .material-icons {\n    font-size: 8rem;\n    width: 8rem;\n    height: 8rem;\n}\n.display-3, h2 {\n  font-size: 4rem;\n  line-height: 6rem;\n  letter-spacing: -0.00357rem;\n  font-weight: 400;\n  color: var(--font-color-1, rgba(0, 0, 0, 0.54));\n  text-transform: inherit;\n}\n.display-3 .material-icons, h2 .material-icons {\n    font-size: 4rem;\n    width: 4rem;\n    height: 4rem;\n}\n.display-2, h3 {\n  font-size: 3.21429rem;\n  line-height: 4.57143rem;\n  letter-spacing: 0rem;\n  font-weight: 400;\n  color: var(--font-color-1, rgba(0, 0, 0, 0.54));\n  text-transform: inherit;\n}\n.display-2 .material-icons, h3 .material-icons {\n    font-size: 3.21429rem;\n    width: 3.21429rem;\n    height: 3.21429rem;\n}\n.display-1, h4 {\n  font-size: 2.42857rem;\n  line-height: 2.85714rem;\n  letter-spacing: 0rem;\n  font-weight: 400;\n  color: var(--font-color-1, rgba(0, 0, 0, 0.54));\n  text-transform: inherit;\n}\n.display-1 .material-icons, h4 .material-icons {\n    font-size: 2.42857rem;\n    width: 2.42857rem;\n    height: 2.42857rem;\n}\n.headline, h5 {\n  font-size: 1.71429rem;\n  line-height: 2.28571rem;\n  letter-spacing: 0rem;\n  font-weight: 400;\n  color: var(--font-color-2, rgba(0, 0, 0, 0.87));\n  text-transform: inherit;\n}\n.headline .material-icons, h5 .material-icons {\n    font-size: 1.71429rem;\n    width: 1.71429rem;\n    height: 1.71429rem;\n}\n.title, h6, .appbar-title h1, .appbar-title h2, .appbar-title h3, .appbar-title h4, .appbar-title h5, .appbar-title h6 {\n  font-size: 1.42857rem;\n  line-height: 2rem;\n  letter-spacing: 0.00357rem;\n  font-weight: 500;\n  color: var(--font-color-2, rgba(0, 0, 0, 0.87));\n  text-transform: inherit;\n}\n.title .material-icons, h6 .material-icons, .appbar-title h1 .material-icons, .appbar-title h2 .material-icons, .appbar-title h3 .material-icons, .appbar-title h4 .material-icons, .appbar-title h5 .material-icons, .appbar-title h6 .material-icons {\n    font-size: 1.42857rem;\n    width: 1.42857rem;\n    height: 1.42857rem;\n}\n.subhead-2 {\n  font-size: 1.07143rem;\n  line-height: 2rem;\n  letter-spacing: 0.00714rem;\n  font-weight: 400;\n  color: var(--font-color-2, rgba(0, 0, 0, 0.87));\n  text-transform: inherit;\n}\n@media only screen and (max-width: 1280px) {\n.subhead-2 {\n      font-size: 1.14286rem;\n}\n}\n.subhead-2 .material-icons {\n    font-size: 1.07143rem;\n    width: 1.07143rem;\n    height: 1.07143rem;\n}\n.subhead-1 {\n  font-size: 1.07143rem;\n  line-height: 1.71429rem;\n  letter-spacing: 0.00714rem;\n  font-weight: 300;\n  color: var(--font-color-2, rgba(0, 0, 0, 0.87));\n  text-transform: inherit;\n}\n@media only screen and (max-width: 1280px) {\n.subhead-1 {\n      font-size: 1.14286rem;\n}\n}\n.subhead-1 .material-icons {\n    font-size: 1.07143rem;\n    width: 1.07143rem;\n    height: 1.07143rem;\n}\n.body-2 {\n  font-size: 0.92857rem;\n  line-height: 1.71429rem;\n  letter-spacing: 0.00714rem;\n  font-weight: 500;\n  color: var(--font-color-2, rgba(0, 0, 0, 0.87));\n  text-transform: inherit;\n}\n@media only screen and (max-width: 1280px) {\n.body-2 {\n      font-size: 1rem;\n}\n}\n.body-2 .material-icons {\n    font-size: 0.92857rem;\n    width: 0.92857rem;\n    height: 0.92857rem;\n}\n.body-1 {\n  font-size: 0.92857rem;\n  line-height: 1.42857rem;\n  letter-spacing: 0.00714rem;\n  font-weight: 400;\n  color: var(--font-color-2, rgba(0, 0, 0, 0.87));\n  text-transform: inherit;\n}\n@media only screen and (max-width: 1280px) {\n.body-1 {\n      font-size: 1rem;\n}\n}\n.body-1 .material-icons {\n    font-size: 0.92857rem;\n    width: 0.92857rem;\n    height: 0.92857rem;\n}\n.caption {\n  font-size: 0.85714rem;\n  line-height: 1.42857rem;\n  letter-spacing: 0.01429rem;\n  font-weight: 400;\n  color: var(--font-color-1, rgba(0, 0, 0, 0.54));\n  text-transform: inherit;\n}\n.caption .material-icons {\n    font-size: 0.85714rem;\n    width: 0.85714rem;\n    height: 0.85714rem;\n}\n.label, label {\n  font-size: 0.85714rem;\n  line-height: 1.42857rem;\n  letter-spacing: 0.00714rem;\n  font-weight: 300;\n  color: var(--font-color-1, rgba(0, 0, 0, 0.54));\n  text-transform: inherit;\n}\n.label .material-icons, label .material-icons {\n    font-size: 0.85714rem;\n    width: 0.85714rem;\n    height: 0.85714rem;\n}\n.menu {\n  font-size: 0.92857rem;\n  line-height: 1.42857rem;\n  letter-spacing: 0.00714rem;\n  font-weight: 400;\n  color: var(--font-color-2, rgba(0, 0, 0, 0.87));\n  text-transform: inherit;\n}\n.menu .material-icons {\n    font-size: 0.92857rem;\n    width: 0.92857rem;\n    height: 0.92857rem;\n}\n.button, .raised-button, .flat-button {\n  font-size: 1rem;\n  line-height: 1.42857rem;\n  letter-spacing: 0.00714rem;\n  font-weight: 500;\n  color: var(--font-color-2, rgba(0, 0, 0, 0.87));\n  text-transform: uppercase;\n}\nbody {\n  font-size: 0.92857rem;\n  line-height: 1.42857rem;\n  letter-spacing: 0.00714rem;\n  font-weight: 400;\n  color: var(--font-color-2, rgba(0, 0, 0, 0.87));\n  text-transform: inherit;\n  direction: ltr;\n  font-family: 'Roboto', sans-serif, 'Helvetica Neue', Helvetica, Arial;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n@media only screen and (max-width: 1280px) {\nbody {\n      font-size: 1rem;\n}\n}\nh1, h2, h3, h4, h5, h6 {\n  margin: 0;\n}\n.body-1-light {\n  color: rgba(255, 255, 255, 0.87);\n}\n.body-1-dark {\n  color: rgba(0, 0, 0, 0.87);\n}\n\n/**************************************\n * Icons\n *\n * http://www.google.com/design/spec/style/icons.html\n * https://design.google.com/icons/\n **************************************/\n.material-icons {\n  font-size: 1.71429rem;\n  width: 1.71429rem;\n  height: 1.71429rem;\n  color: rgba(0, 0, 0, 0.38);\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  vertical-align: middle;\n  -webkit-font-smoothing: antialiased;\n  text-rendering: optimizeLegibility;\n  -moz-osx-font-smoothing: grayscale;\n  font-feature-settings: 'liga';\n}\n.material-icons:active, .material-icons.active {\n    color: rgba(0, 0, 0, 0.87);\n}\n.material-icons.size-18 {\n    font-size: 1.28571rem;\n    width: 1.28571rem;\n    height: 1.28571rem;\n}\n.material-icons.size-24 {\n    font-size: 1.71429rem;\n    width: 1.71429rem;\n    height: 1.71429rem;\n}\n.material-icons.size-36 {\n    font-size: 2.57143rem;\n    width: 2.57143rem;\n    height: 2.57143rem;\n}\n.material-icons.size-48 {\n    font-size: 3.42857rem;\n    width: 3.42857rem;\n    height: 3.42857rem;\n}\n\n/**************************************\n * AppBar\n *\n * http://www.google.com/design/spec/layout/structure.html#structure-app-bar\n * http://www.google.com/design/spec/layout/structure.html#structure-toolbars\n **************************************/\n.appbar {\n  -moz-box-shadow: 0rem 0.14286rem 0.28571rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.28571rem 0.35714rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.71429rem 0rem rgba(0, 0, 0, 0.2);\n  -webkit-box-shadow: 0rem 0.14286rem 0.28571rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.28571rem 0.35714rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.71429rem 0rem rgba(0, 0, 0, 0.2);\n  -ms-box-shadow: 0rem 0.14286rem 0.28571rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.28571rem 0.35714rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.71429rem 0rem rgba(0, 0, 0, 0.2);\n  -o-box-shadow: 0rem 0.14286rem 0.28571rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.28571rem 0.35714rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.71429rem 0rem rgba(0, 0, 0, 0.2);\n  box-shadow: 0rem 0.14286rem 0.28571rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.28571rem 0.35714rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.71429rem 0rem rgba(0, 0, 0, 0.2);\n  background: var(--main-color, #3F51B5);\n  color: #FFFFFF;\n  line-height: normal;\n  min-height: 4rem;\n  position: fixed;\n  width: 100%;\n  z-index: 2;\n  display: -webkit-flex;\n  display: -moz-flex;\n  display: flex;\n  -webkit-justify-content: flex-start;\n  justify-content: flex-start;\n  -webkit-align-items: stretch;\n  align-items: stretch;\n  -webkit-align-content: stretch;\n  align-content: stretch;\n  justify-content: flex-start;\n  padding: 0.57143rem;\n}\n@media only screen and (min-width: 1281px) {\n.appbar {\n      -moz-box-shadow: 0rem 0rem 0.14286rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 0.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n      -webkit-box-shadow: 0rem 0rem 0.14286rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 0.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n      -ms-box-shadow: 0rem 0rem 0.14286rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 0.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n      -o-box-shadow: 0rem 0rem 0.14286rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 0.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n      box-shadow: 0rem 0rem 0.14286rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 0.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n}\n}\n@media only screen and (orientation: landscape) and (max-width: 960px) {\n.appbar {\n      min-height: 3.42857rem;\n}\n}\n@media only screen and (orientation: portrait) and (max-width: 600px) {\n.appbar {\n      min-height: 4rem;\n}\n}\n@media only screen and (min-width: 961px) {\n.appbar {\n      min-height: 4.57143rem;\n      padding: 1.42857rem;\n}\n}\n.appbar a, .appbar h1, .appbar h2, .appbar h3, .appbar h4, .appbar h5, .appbar h6, .appbar .material-icons, .appbar .title {\n    color: #FFFFFF;\n}\n.appbar a {\n    display: block;\n    position: relative;\n    font-weight: 500;\n    margin: 0 0.57143rem;\n}\n@media only screen and (orientation: landscape) and (max-width: 960px) {\n.appbar a {\n        margin: 0 0.57143rem;\n}\n}\n@media only screen and (orientation: portrait) and (max-width: 600px) {\n.appbar a {\n        margin: 0 0.57143rem;\n}\n}\n@media only screen and (min-width: 961px) {\n.appbar a {\n        margin: 0 0.85714rem;\n}\n}\n.appbar .material-icons {\n    margin: 0 0.57143rem;\n    font-size: 1.71429rem;\n    position: relative;\n    width: 1.71429rem;\n    height: 1.71429rem;\n}\n@media only screen and (orientation: landscape) and (max-width: 960px) {\n.appbar .material-icons {\n        font-size: 1.14286rem;\n        width: 1.14286rem;\n        height: 1.14286rem;\n        margin: 0 0.57143rem;\n}\n}\n@media only screen and (orientation: portrait) and (max-width: 600px) {\n.appbar .material-icons {\n        font-size: 1.71429rem;\n        width: 1.71429rem;\n        height: 1.71429rem;\n        margin: 0 0.57143rem;\n}\n}\n@media only screen and (min-width: 961px) {\n.appbar .material-icons {\n        font-size: 1.71429rem;\n        width: 1.71429rem;\n        height: 1.71429rem;\n        margin: 0 0.85714rem;\n}\n}\n.appbar-spacer {\n    -webkit-flex-grow: 1;\n    flex-grow: 1;\n}\n.appbar-title {\n    margin: 0 0 -0.85714rem 2.28571rem;\n}\n@media only screen and (orientation: landscape) and (max-width: 960px) {\n.appbar-title {\n        margin: 0 0 -0.85714rem 2.85714rem;\n}\n}\n@media only screen and (orientation: portrait) and (max-width: 600px) {\n.appbar-title {\n        margin: 0 0 -0.85714rem 2.28571rem;\n}\n}\n@media only screen and (min-width: 961px) {\n.appbar-title {\n        margin: 0 0 -0.57143rem 16.57143rem;\n}\n}\n.appbar .search-input {\n    display: none;\n}\n.appbar .badge {\n    -webkit-border-radius: 50%;\n    -moz-border-radius: 50%;\n    -ms-border-radius: 50%;\n    -o-border-radius: 50%;\n    border-radius: 50%;\n    background: #F44336;\n    -moz-box-shadow: 0rem 0rem 0.14286rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 0.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n    -webkit-box-shadow: 0rem 0rem 0.14286rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 0.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n    -ms-box-shadow: 0rem 0rem 0.14286rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 0.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n    -o-box-shadow: 0rem 0rem 0.14286rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 0.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n    box-shadow: 0rem 0rem 0.14286rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 0.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n    font-size: 0.71429rem;\n    padding: 0.35714rem;\n    position: absolute;\n    right: -0.71429rem;\n    top: -0.85714rem;\n    text-align: center;\n    width: 1.42857rem;\n    height: 1.42857rem;\n}\n.appbar-menu {\n    top: 0.28571rem;\n    right: 0.28571rem;\n    left: auto;\n}\n.appbar-menu a {\n      margin: 0;\n}\n\n/**************************************\n * Bottom navigation\n *\n * http://www.google.com/design/spec/components/bottom-navigation.html\n **************************************/\n.bottom-nav, .bottom-shifting {\n  background: var(--main-color, #3F51B5);\n  bottom: 0;\n  left: 0;\n  position: fixed;\n  -moz-box-shadow: 0rem 0.57143rem 0.71429rem 0.07143rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 1rem 0.21429rem rgba(0, 0, 0, 0.12) , 0rem 0.28571rem 1.07143rem 0rem rgba(0, 0, 0, 0.2);\n  -webkit-box-shadow: 0rem 0.57143rem 0.71429rem 0.07143rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 1rem 0.21429rem rgba(0, 0, 0, 0.12) , 0rem 0.28571rem 1.07143rem 0rem rgba(0, 0, 0, 0.2);\n  -ms-box-shadow: 0rem 0.57143rem 0.71429rem 0.07143rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 1rem 0.21429rem rgba(0, 0, 0, 0.12) , 0rem 0.28571rem 1.07143rem 0rem rgba(0, 0, 0, 0.2);\n  -o-box-shadow: 0rem 0.57143rem 0.71429rem 0.07143rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 1rem 0.21429rem rgba(0, 0, 0, 0.12) , 0rem 0.28571rem 1.07143rem 0rem rgba(0, 0, 0, 0.2);\n  box-shadow: 0rem 0.57143rem 0.71429rem 0.07143rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 1rem 0.21429rem rgba(0, 0, 0, 0.12) , 0rem 0.28571rem 1.07143rem 0rem rgba(0, 0, 0, 0.2);\n  width: 100%;\n  margin: 0 0 -102% 0;\n  display: -webkit-flex;\n  display: -moz-flex;\n  display: flex;\n  -webkit-justify-content: space-between;\n  justify-content: space-between;\n  -webkit-align-items: stretch;\n  align-items: stretch;\n  -webkit-align-content: stretch;\n  align-content: stretch;\n  -webkit-transition: margin 300ms cubic-bezier(0.4, 0, 0.2, 1);\n  -moz-transition: margin 300ms cubic-bezier(0.4, 0, 0.2, 1);\n  -o-transition: margin 300ms cubic-bezier(0.4, 0, 0.2, 1);\n  transition: margin 300ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n@media only screen and (min-width: 1281px) {\n.bottom-nav, .bottom-shifting {\n      -moz-box-shadow: 0rem 0.42857rem 0.71429rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.07143rem 1.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.21429rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n      -webkit-box-shadow: 0rem 0.42857rem 0.71429rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.07143rem 1.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.21429rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n      -ms-box-shadow: 0rem 0.42857rem 0.71429rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.07143rem 1.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.21429rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n      -o-box-shadow: 0rem 0.42857rem 0.71429rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.07143rem 1.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.21429rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n      box-shadow: 0rem 0.42857rem 0.71429rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.07143rem 1.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.21429rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n}\n}\n@media only screen and (min-width: 961px) {\n.bottom-nav, .bottom-shifting {\n      left: 20rem;\n      width: calc(100% - 20rem);\n}\n}\n@media only screen and (min-width: 961px) and (max-width: 1280px) {\n.bottom-nav, .bottom-shifting {\n      -webkit-transition: margin 390ms cubic-bezier(0.4, 0, 0.2, 1);\n      -moz-transition: margin 390ms cubic-bezier(0.4, 0, 0.2, 1);\n      -o-transition: margin 390ms cubic-bezier(0.4, 0, 0.2, 1);\n      transition: margin 390ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n@media only screen and (min-width: 1281px) {\n.bottom-nav, .bottom-shifting {\n      -webkit-transition: margin 200ms cubic-bezier(0.4, 0, 0.2, 1);\n      -moz-transition: margin 200ms cubic-bezier(0.4, 0, 0.2, 1);\n      -o-transition: margin 200ms cubic-bezier(0.4, 0, 0.2, 1);\n      transition: margin 200ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n.bottom-nav .material-icons, .bottom-shifting .material-icons {\n    -webkit-transition: color 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    -moz-transition: color 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    -o-transition: color 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    transition: color 300ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n@media only screen and (min-width: 961px) and (max-width: 1280px) {\n.bottom-nav .material-icons, .bottom-shifting .material-icons {\n        -webkit-transition: color 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        -moz-transition: color 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        -o-transition: color 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        transition: color 390ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n@media only screen and (min-width: 1281px) {\n.bottom-nav .material-icons, .bottom-shifting .material-icons {\n        -webkit-transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        -moz-transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        -o-transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n.bottom-nav.expanded, .bottom-shifting.expanded {\n    margin: 0;\n}\n.bottom-nav a, .bottom-shifting a {\n    color: rgba(255, 255, 255, 0.7);\n    display: block;\n    line-height: normal;\n    text-align: center;\n}\n.bottom-nav a:hover, .bottom-nav a:hover .material-icons, .bottom-shifting a:hover, .bottom-shifting a:hover .material-icons {\n      color: #FFFFFF;\n}\n.bottom-nav a.active, .bottom-shifting a.active {\n      color: #FFFFFF;\n}\n.bottom-nav a.active .material-icons, .bottom-shifting a.active .material-icons {\n        color: #FFFFFF;\n}\n.bottom-nav a {\n  font-size: 0.85714rem;\n  height: 4rem;\n  max-width: 12rem;\n  min-width: 5.71429rem;\n  padding: 0.57143rem 0.85714rem 0.71429rem 0.85714rem;\n}\n@media only screen and (min-width: 1281px) {\n.bottom-nav a {\n      min-width: 8.57143rem;\n}\n}\n.bottom-nav a .material-icons {\n    font-size: 1.71429rem;\n    width: 1.71429rem;\n    height: 1.71429rem;\n}\n.bottom-nav a.active {\n    font-size: 1rem;\n    padding: 0.42857rem 0.85714rem 0.71429rem 0.85714rem;\n}\n.bottom-shifting a {\n  height: 4rem;\n  max-width: 6.85714rem;\n  min-width: 4rem;\n  padding: 1.14286rem 0;\n}\n.bottom-shifting a .material-icons {\n    font-size: 1.71429rem;\n    width: 1.71429rem;\n    height: 1.71429rem;\n}\n.bottom-shifting a .content {\n    display: none;\n}\n.bottom-shifting a.active {\n    font-size: 1rem;\n    max-width: 12rem;\n    min-width: 6.85714rem;\n    padding: 0.42857rem 0 0.71429rem 0;\n}\n.bottom-shifting a.active .content {\n      display: block;\n      margin: 0.42857rem 0 0 0;\n}\n\n/**************************************\n * Bottom sheet / modal\n *\n * http://www.google.com/design/spec/components/bottom-sheets.html\n **************************************/\n.bottom-sheet, .bottom-sheet-grid {\n  -webkit-transition: margin 300ms cubic-bezier(0.4, 0, 0.2, 1);\n  -moz-transition: margin 300ms cubic-bezier(0.4, 0, 0.2, 1);\n  -o-transition: margin 300ms cubic-bezier(0.4, 0, 0.2, 1);\n  transition: margin 300ms cubic-bezier(0.4, 0, 0.2, 1);\n  -moz-box-shadow: 0rem 1.14286rem 1.71429rem 0.14286rem rgba(0, 0, 0, 0.14) , 0rem 0.42857rem 2.14286rem 0.35714rem rgba(0, 0, 0, 0.12) , 0rem 0.57143rem 0.71429rem 0rem rgba(0, 0, 0, 0.2);\n  -webkit-box-shadow: 0rem 1.14286rem 1.71429rem 0.14286rem rgba(0, 0, 0, 0.14) , 0rem 0.42857rem 2.14286rem 0.35714rem rgba(0, 0, 0, 0.12) , 0rem 0.57143rem 0.71429rem 0rem rgba(0, 0, 0, 0.2);\n  -ms-box-shadow: 0rem 1.14286rem 1.71429rem 0.14286rem rgba(0, 0, 0, 0.14) , 0rem 0.42857rem 2.14286rem 0.35714rem rgba(0, 0, 0, 0.12) , 0rem 0.57143rem 0.71429rem 0rem rgba(0, 0, 0, 0.2);\n  -o-box-shadow: 0rem 1.14286rem 1.71429rem 0.14286rem rgba(0, 0, 0, 0.14) , 0rem 0.42857rem 2.14286rem 0.35714rem rgba(0, 0, 0, 0.12) , 0rem 0.57143rem 0.71429rem 0rem rgba(0, 0, 0, 0.2);\n  box-shadow: 0rem 1.14286rem 1.71429rem 0.14286rem rgba(0, 0, 0, 0.14) , 0rem 0.42857rem 2.14286rem 0.35714rem rgba(0, 0, 0, 0.12) , 0rem 0.57143rem 0.71429rem 0rem rgba(0, 0, 0, 0.2);\n  background: #FFFFFF;\n  bottom: 0;\n  display: block;\n  margin: 0 auto -102% auto;\n  height: auto;\n  left: 0;\n  overflow: inherit;\n  position: fixed;\n  right: 0;\n  width: 100%;\n  z-index: 5;\n}\n@media only screen and (min-width: 961px) and (max-width: 1280px) {\n.bottom-sheet, .bottom-sheet-grid {\n      -webkit-transition: margin 390ms cubic-bezier(0.4, 0, 0.2, 1);\n      -moz-transition: margin 390ms cubic-bezier(0.4, 0, 0.2, 1);\n      -o-transition: margin 390ms cubic-bezier(0.4, 0, 0.2, 1);\n      transition: margin 390ms cubic-bezier(0.4, 0, 0.2, 1);\n      max-width: 60%;\n}\n}\n@media only screen and (min-width: 1281px) {\n.bottom-sheet, .bottom-sheet-grid {\n      -webkit-transition: margin 200ms cubic-bezier(0.4, 0, 0.2, 1);\n      -moz-transition: margin 200ms cubic-bezier(0.4, 0, 0.2, 1);\n      -o-transition: margin 200ms cubic-bezier(0.4, 0, 0.2, 1);\n      transition: margin 200ms cubic-bezier(0.4, 0, 0.2, 1);\n      max-width: 40%;\n      -webkit-border-top-left-radius: var(--border-size, 0.14286rem);\n      -moz-border-radius-topleft: var(--border-size, 0.14286rem);\n      border-top-left-radius: var(--border-size, 0.14286rem);\n      -webkit-border-top-right-radius: var(--border-size, 0.14286rem);\n      -moz-border-radius-topright: var(--border-size, 0.14286rem);\n      border-top-right-radius: var(--border-size, 0.14286rem);\n}\n}\n.bottom-sheet .bottom-sheet-background, .bottom-sheet-grid .bottom-sheet-background {\n    background: rgba(0, 0, 0, 0.2);\n    width: 100%;\n    height: 100%;\n    top: 0;\n    left: 0;\n    position: fixed;\n    z-index: 4;\n    visibility: hidden;\n    -webkit-transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    -moz-transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    -o-transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n@media only screen and (min-width: 961px) and (max-width: 1280px) {\n.bottom-sheet .bottom-sheet-background, .bottom-sheet-grid .bottom-sheet-background {\n        -webkit-transition: all 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        -moz-transition: all 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        -o-transition: all 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        transition: all 390ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n@media only screen and (min-width: 1281px) {\n.bottom-sheet .bottom-sheet-background, .bottom-sheet-grid .bottom-sheet-background {\n        -webkit-transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        -moz-transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        -o-transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n.bottom-sheet.expanded, .bottom-sheet-grid.expanded {\n    margin: 0 auto;\n}\n.bottom-sheet.expanded ~ .bottom-sheet-background, .bottom-sheet-grid.expanded ~ .bottom-sheet-background {\n      visibility: visible;\n}\n.bottom-sheet {\n  padding: 0.57143rem 1.14286rem;\n}\n.bottom-sheet a {\n    color: var(--font-color-2, rgba(0, 0, 0, 0.87));\n    font-size: 1.14286rem;\n    font-weight: 400;\n    -webkit-transition: color 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    -moz-transition: color 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    -o-transition: color 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    transition: color 300ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n@media only screen and (min-width: 961px) and (max-width: 1280px) {\n.bottom-sheet a {\n        -webkit-transition: color 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        -moz-transition: color 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        -o-transition: color 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        transition: color 390ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n@media only screen and (min-width: 1281px) {\n.bottom-sheet a {\n        -webkit-transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        -moz-transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        -o-transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n.bottom-sheet a:hover, .bottom-sheet a:hover .material-icons {\n      color: inherit;\n}\n.bottom-sheet .material-icons {\n    font-size: 1.71429rem;\n    width: 1.71429rem;\n    height: 1.71429rem;\n    margin: 0 2.28571rem 0 0;\n    -webkit-transition: color 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    -moz-transition: color 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    -o-transition: color 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    transition: color 300ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n@media only screen and (min-width: 961px) and (max-width: 1280px) {\n.bottom-sheet .material-icons {\n        -webkit-transition: color 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        -moz-transition: color 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        -o-transition: color 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        transition: color 390ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n@media only screen and (min-width: 1281px) {\n.bottom-sheet .material-icons {\n        -webkit-transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        -moz-transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        -o-transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n.bottom-sheet ul li {\n    padding: 0;\n    height: 3.42857rem;\n}\n.bottom-sheet ul li.bottom-sheet-header {\n      height: 4rem;\n      line-height: 4rem;\n      margin-top: -1.14286rem;\n      font-size: 1.14286rem;\n      font-weight: 400;\n      color: var(--font-color-1, rgba(0, 0, 0, 0.54));\n}\n.bottom-sheet ul li.divider {\n      height: 0.07143rem;\n      background: rgba(0, 0, 0, 0.12);\n      margin: 1.67857rem -1.14286rem 1.67857rem -1.14286rem;\n}\n.bottom-sheet-grid {\n  padding: 1.71429rem;\n}\n.bottom-sheet-grid .row {\n    -webkit-justify-content: space-between;\n    justify-content: space-between;\n    margin: 0 0 1.71429rem 0;\n}\n.bottom-sheet-grid .row:last-of-type {\n      margin: 0;\n}\n.bottom-sheet-grid .grid-item {\n    text-align: center;\n    color: var(--font-color-2, rgba(0, 0, 0, 0.87));\n    font-size: 1.14286rem;\n    font-weight: 400;\n    display: block;\n}\n.bottom-sheet-grid .material-icons {\n    font-size: 3.42857rem;\n    height: 3.42857rem;\n    width: 100%;\n    margin: 0 0 0.57143rem 0;\n}\n.bottom-sheet-grid a {\n    color: var(--font-color-2, rgba(0, 0, 0, 0.87));\n    -webkit-transition: color 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    -moz-transition: color 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    -o-transition: color 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    transition: color 300ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n@media only screen and (min-width: 961px) and (max-width: 1280px) {\n.bottom-sheet-grid a {\n        -webkit-transition: color 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        -moz-transition: color 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        -o-transition: color 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        transition: color 390ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n@media only screen and (min-width: 1281px) {\n.bottom-sheet-grid a {\n        -webkit-transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        -moz-transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        -o-transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n.bottom-sheet-grid a:hover .material-icons {\n    color: inherit;\n}\n.bottom-sheet-grid-header {\n    height: 4rem;\n    line-height: 4rem;\n    margin-top: -1.71429rem;\n    font-size: 1.14286rem;\n    font-weight: 400;\n    color: var(--font-color-1, rgba(0, 0, 0, 0.54));\n}\n.bottom-sheet-grid .divider {\n    height: 0.07143rem;\n    background: rgba(0, 0, 0, 0.12);\n    margin: 1.67857rem -1.71429rem 1.67857rem -1.71429rem;\n}\n\n/**************************************\n * Buttons\n *\n * http://www.google.com/design/spec/components/buttons.html\n * http://www.google.com/design/spec/components/buttons-floating-action-button.html\n **************************************/\n.raised-button {\n  cursor: pointer;\n  -webkit-border-radius: var(--border-size, 0.14286rem);\n  -moz-border-radius: var(--border-size, 0.14286rem);\n  -ms-border-radius: var(--border-size, 0.14286rem);\n  -o-border-radius: var(--border-size, 0.14286rem);\n  border-radius: var(--border-size, 0.14286rem);\n  text-decoration: none;\n  border: none;\n  outline: none;\n  display: inline-block;\n  text-align: center;\n  position: relative;\n  vertical-align: middle;\n  -moz-box-shadow: 0rem 0rem 0.14286rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 0.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n  -webkit-box-shadow: 0rem 0rem 0.14286rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 0.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n  -ms-box-shadow: 0rem 0rem 0.14286rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 0.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n  -o-box-shadow: 0rem 0rem 0.14286rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 0.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n  box-shadow: 0rem 0rem 0.14286rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 0.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n  background: var(--main-color, #3F51B5);\n  color: #FFFFFF;\n  height: 2.57143rem;\n  line-height: 2.57143rem;\n  min-width: 6.28571rem;\n  padding: 0 1.14286rem;\n  -webkit-transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) , background 300ms cubic-bezier(0.4, 0, 0.2, 1);\n  -moz-transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) , background 300ms cubic-bezier(0.4, 0, 0.2, 1);\n  -o-transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) , background 300ms cubic-bezier(0.4, 0, 0.2, 1);\n  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) , background 300ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n.raised-button .material-icons {\n    width: 1rem;\n    height: 2.57143rem;\n    line-height: 2.57143rem;\n    vertical-align: middle;\n}\n.raised-button .material-icons.left {\n      margin-right: 1.14286rem;\n}\n.raised-button .material-icons.right {\n      margin-left: 1.14286rem;\n}\n@media only screen and (min-width: 961px) and (max-width: 1280px) {\n.raised-button {\n      -webkit-transition: box-shadow 390ms cubic-bezier(0.4, 0, 0.2, 1) , background 390ms cubic-bezier(0.4, 0, 0.2, 1);\n      -moz-transition: box-shadow 390ms cubic-bezier(0.4, 0, 0.2, 1) , background 390ms cubic-bezier(0.4, 0, 0.2, 1);\n      -o-transition: box-shadow 390ms cubic-bezier(0.4, 0, 0.2, 1) , background 390ms cubic-bezier(0.4, 0, 0.2, 1);\n      transition: box-shadow 390ms cubic-bezier(0.4, 0, 0.2, 1) , background 390ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n@media only screen and (min-width: 1281px) {\n.raised-button {\n      -webkit-transition: box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1) , background 200ms cubic-bezier(0.4, 0, 0.2, 1);\n      -moz-transition: box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1) , background 200ms cubic-bezier(0.4, 0, 0.2, 1);\n      -o-transition: box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1) , background 200ms cubic-bezier(0.4, 0, 0.2, 1);\n      transition: box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1) , background 200ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n.raised-button:active {\n    -moz-box-shadow: 0rem 0.57143rem 0.71429rem 0.07143rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 1rem 0.21429rem rgba(0, 0, 0, 0.12) , 0rem 0.28571rem 1.07143rem 0rem rgba(0, 0, 0, 0.2);\n    -webkit-box-shadow: 0rem 0.57143rem 0.71429rem 0.07143rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 1rem 0.21429rem rgba(0, 0, 0, 0.12) , 0rem 0.28571rem 1.07143rem 0rem rgba(0, 0, 0, 0.2);\n    -ms-box-shadow: 0rem 0.57143rem 0.71429rem 0.07143rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 1rem 0.21429rem rgba(0, 0, 0, 0.12) , 0rem 0.28571rem 1.07143rem 0rem rgba(0, 0, 0, 0.2);\n    -o-box-shadow: 0rem 0.57143rem 0.71429rem 0.07143rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 1rem 0.21429rem rgba(0, 0, 0, 0.12) , 0rem 0.28571rem 1.07143rem 0rem rgba(0, 0, 0, 0.2);\n    box-shadow: 0rem 0.57143rem 0.71429rem 0.07143rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 1rem 0.21429rem rgba(0, 0, 0, 0.12) , 0rem 0.28571rem 1.07143rem 0rem rgba(0, 0, 0, 0.2);\n}\n@media only screen and (min-width: 1281px) {\n.raised-button:active {\n        -moz-box-shadow: 0rem 0.42857rem 0.71429rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.07143rem 1.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.21429rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n        -webkit-box-shadow: 0rem 0.42857rem 0.71429rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.07143rem 1.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.21429rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n        -ms-box-shadow: 0rem 0.42857rem 0.71429rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.07143rem 1.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.21429rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n        -o-box-shadow: 0rem 0.42857rem 0.71429rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.07143rem 1.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.21429rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n        box-shadow: 0rem 0.42857rem 0.71429rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.07143rem 1.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.21429rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n}\n}\n.raised-button:hover, .raised-button:hover .material-icons {\n    color: #FFFFFF;\n}\n.raised-button .material-icons {\n    color: #FFFFFF;\n}\n.raised-button-dense {\n    font-size: 0.92857rem;\n    height: 2.28571rem;\n    line-height: 2.28571rem;\n}\n.raised-button-dense .material-icons {\n      width: 2.28571rem;\n      height: 2.28571rem;\n      line-height: 2.28571rem;\n}\n.raised-button.disabled, .raised-button:disabled {\n    background: rgba(0, 0, 0, 0.12);\n    color: rgba(0, 0, 0, 0.26);\n}\n.raised-button.disabled:hover, .raised-button:disabled:hover {\n      background: rgba(0, 0, 0, 0.12);\n      color: rgba(0, 0, 0, 0.26);\n}\n.flat-button {\n  cursor: pointer;\n  -webkit-border-radius: var(--border-size, 0.14286rem);\n  -moz-border-radius: var(--border-size, 0.14286rem);\n  -ms-border-radius: var(--border-size, 0.14286rem);\n  -o-border-radius: var(--border-size, 0.14286rem);\n  border-radius: var(--border-size, 0.14286rem);\n  text-decoration: none;\n  border: none;\n  outline: none;\n  display: inline-block;\n  text-align: center;\n  position: relative;\n  vertical-align: middle;\n  background: none;\n  color: var(--main-color, #3F51B5);\n  height: 2.57143rem;\n  line-height: 2.57143rem;\n  min-width: 4.57143rem;\n  padding: 0 1.14286rem;\n}\n.flat-button .material-icons {\n    width: 1rem;\n    height: 2.57143rem;\n    line-height: 2.57143rem;\n    vertical-align: middle;\n}\n.flat-button .material-icons.left {\n      margin-right: 1.14286rem;\n}\n.flat-button .material-icons.right {\n      margin-left: 1.14286rem;\n}\n.flat-button:hover, .flat-button:hover .material-icons {\n    color: var(--main-color, #3F51B5);\n}\n.flat-button:active {\n    background: rgba(153, 153, 153, 0.4);\n}\n.flat-button .material-icons {\n    color: var(--main-color, #3F51B5);\n}\n.flat-button.disabled, .flat-button:disabled {\n    background: none;\n    color: rgba(0, 0, 0, 0.26);\n}\n.flat-button.disabled:hover, .flat-button:disabled:hover {\n      color: rgba(0, 0, 0, 0.26);\n}\n.flat-button.disabled .material-icons, .flat-button:disabled .material-icons {\n      color: rgba(0, 0, 0, 0.26);\n}\n.floating-button {\n  cursor: pointer;\n  -webkit-border-radius: 50%;\n  -moz-border-radius: 50%;\n  -ms-border-radius: 50%;\n  -o-border-radius: 50%;\n  border-radius: 50%;\n  text-decoration: none;\n  border: none;\n  outline: none;\n  display: inline-block;\n  text-align: center;\n  position: relative;\n  vertical-align: middle;\n  -webkit-transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1);\n  -moz-transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1);\n  -o-transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1);\n  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1);\n  -moz-box-shadow: 0rem 0.42857rem 0.71429rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.07143rem 1.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.21429rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n  -webkit-box-shadow: 0rem 0.42857rem 0.71429rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.07143rem 1.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.21429rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n  -ms-box-shadow: 0rem 0.42857rem 0.71429rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.07143rem 1.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.21429rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n  -o-box-shadow: 0rem 0.42857rem 0.71429rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.07143rem 1.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.21429rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n  box-shadow: 0rem 0.42857rem 0.71429rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.07143rem 1.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.21429rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n  width: 4rem;\n  height: 4rem;\n  background: var(--secondary-color, #2196F3);\n  line-height: 4rem;\n  position: relative;\n}\n.floating-button .material-icons {\n    width: 1rem;\n    height: 2.57143rem;\n    line-height: 2.57143rem;\n    vertical-align: middle;\n}\n.floating-button .material-icons.left {\n      margin-right: 1.14286rem;\n}\n.floating-button .material-icons.right {\n      margin-left: 1.14286rem;\n}\n@media only screen and (min-width: 1281px) {\n.floating-button {\n      -moz-box-shadow: 0rem 0.14286rem 0.28571rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.28571rem 0.35714rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.71429rem 0rem rgba(0, 0, 0, 0.2);\n      -webkit-box-shadow: 0rem 0.14286rem 0.28571rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.28571rem 0.35714rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.71429rem 0rem rgba(0, 0, 0, 0.2);\n      -ms-box-shadow: 0rem 0.14286rem 0.28571rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.28571rem 0.35714rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.71429rem 0rem rgba(0, 0, 0, 0.2);\n      -o-box-shadow: 0rem 0.14286rem 0.28571rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.28571rem 0.35714rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.71429rem 0rem rgba(0, 0, 0, 0.2);\n      box-shadow: 0rem 0.14286rem 0.28571rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.28571rem 0.35714rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.71429rem 0rem rgba(0, 0, 0, 0.2);\n}\n}\n.floating-button:hover {\n    -moz-box-shadow: 0rem 0.85714rem 1.21429rem 0.14286rem rgba(0, 0, 0, 0.14) , 0rem 0.35714rem 1.57143rem 0.28571rem rgba(0, 0, 0, 0.12) , 0rem 0.5rem 0.57143rem 0rem rgba(0, 0, 0, 0.2);\n    -webkit-box-shadow: 0rem 0.85714rem 1.21429rem 0.14286rem rgba(0, 0, 0, 0.14) , 0rem 0.35714rem 1.57143rem 0.28571rem rgba(0, 0, 0, 0.12) , 0rem 0.5rem 0.57143rem 0rem rgba(0, 0, 0, 0.2);\n    -ms-box-shadow: 0rem 0.85714rem 1.21429rem 0.14286rem rgba(0, 0, 0, 0.14) , 0rem 0.35714rem 1.57143rem 0.28571rem rgba(0, 0, 0, 0.12) , 0rem 0.5rem 0.57143rem 0rem rgba(0, 0, 0, 0.2);\n    -o-box-shadow: 0rem 0.85714rem 1.21429rem 0.14286rem rgba(0, 0, 0, 0.14) , 0rem 0.35714rem 1.57143rem 0.28571rem rgba(0, 0, 0, 0.12) , 0rem 0.5rem 0.57143rem 0rem rgba(0, 0, 0, 0.2);\n    box-shadow: 0rem 0.85714rem 1.21429rem 0.14286rem rgba(0, 0, 0, 0.14) , 0rem 0.35714rem 1.57143rem 0.28571rem rgba(0, 0, 0, 0.12) , 0rem 0.5rem 0.57143rem 0rem rgba(0, 0, 0, 0.2);\n}\n.floating-button:hover .material-icons {\n      color: #FFFFFF;\n}\n.floating-button .material-icons {\n    width: 1.71429rem;\n    height: 1.71429rem;\n    color: #FFFFFF;\n    vertical-align: middle;\n}\n.floating-button-mini {\n    width: 2.85714rem;\n    height: 2.85714rem;\n    line-height: 2.85714rem;\n}\n.floating-button ul {\n    left: 0.6rem;\n    position: absolute;\n    visibility: hidden;\n    -webkit-opacity: 0;\n    opacity: 0;\n    -webkit-transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    -moz-transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    -o-transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n.floating-button ul.expanded {\n      visibility: visible;\n      -webkit-opacity: 1;\n      opacity: 1;\n}\n.floating-button ul.expanded li {\n        margin-top: 1.4rem;\n}\n.floating-button li {\n    margin-top: -2.8rem;\n    -webkit-border-radius: 50%;\n    -moz-border-radius: 50%;\n    -ms-border-radius: 50%;\n    -o-border-radius: 50%;\n    border-radius: 50%;\n    width: 2.8rem;\n    height: 2.8rem;\n}\n.floating-button a {\n    display: block;\n    position: absolute;\n    line-height: 2.8rem;\n    width: 2.8rem;\n    height: 2.8rem;\n    margin-left: -1.16667rem;\n}\n.floating-button img {\n    width: 2.8rem;\n    height: 2.8rem;\n    -webkit-border-radius: 50%;\n    -moz-border-radius: 50%;\n    -ms-border-radius: 50%;\n    -o-border-radius: 50%;\n    border-radius: 50%;\n}\n\n/**************************************\n * Cards\n *\n * http://www.google.com/design/spec/components/cards.html#cards-usage\n **************************************/\n.card {\n  -moz-box-shadow: 0rem 0rem 0.14286rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 0.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n  -webkit-box-shadow: 0rem 0rem 0.14286rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 0.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n  -ms-box-shadow: 0rem 0rem 0.14286rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 0.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n  -o-box-shadow: 0rem 0rem 0.14286rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 0.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n  box-shadow: 0rem 0rem 0.14286rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 0.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n  -webkit-border-radius: var(--border-size, 0.14286rem);\n  -moz-border-radius: var(--border-size, 0.14286rem);\n  -ms-border-radius: var(--border-size, 0.14286rem);\n  -o-border-radius: var(--border-size, 0.14286rem);\n  border-radius: var(--border-size, 0.14286rem);\n  width: 100%;\n  padding: 0;\n  position: relative;\n  -webkit-transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1);\n  -moz-transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1);\n  -o-transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1);\n  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1);\n  background: #FFFFFF;\n}\n.card:hover {\n    -moz-box-shadow: 0rem 0.57143rem 0.71429rem 0.07143rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 1rem 0.21429rem rgba(0, 0, 0, 0.12) , 0rem 0.28571rem 1.07143rem 0rem rgba(0, 0, 0, 0.2);\n    -webkit-box-shadow: 0rem 0.57143rem 0.71429rem 0.07143rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 1rem 0.21429rem rgba(0, 0, 0, 0.12) , 0rem 0.28571rem 1.07143rem 0rem rgba(0, 0, 0, 0.2);\n    -ms-box-shadow: 0rem 0.57143rem 0.71429rem 0.07143rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 1rem 0.21429rem rgba(0, 0, 0, 0.12) , 0rem 0.28571rem 1.07143rem 0rem rgba(0, 0, 0, 0.2);\n    -o-box-shadow: 0rem 0.57143rem 0.71429rem 0.07143rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 1rem 0.21429rem rgba(0, 0, 0, 0.12) , 0rem 0.28571rem 1.07143rem 0rem rgba(0, 0, 0, 0.2);\n    box-shadow: 0rem 0.57143rem 0.71429rem 0.07143rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 1rem 0.21429rem rgba(0, 0, 0, 0.12) , 0rem 0.28571rem 1.07143rem 0rem rgba(0, 0, 0, 0.2);\n}\n@media only screen and (min-width: 1281px) {\n.card:hover {\n        -moz-box-shadow: 0rem 0.42857rem 0.71429rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.07143rem 1.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.21429rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n        -webkit-box-shadow: 0rem 0.42857rem 0.71429rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.07143rem 1.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.21429rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n        -ms-box-shadow: 0rem 0.42857rem 0.71429rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.07143rem 1.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.21429rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n        -o-box-shadow: 0rem 0.42857rem 0.71429rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.07143rem 1.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.21429rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n        box-shadow: 0rem 0.42857rem 0.71429rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.07143rem 1.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.21429rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n}\n}\n@media only screen and (min-width: 961px) and (max-width: 1280px) {\n.card {\n      -webkit-transition: box-shadow 390ms cubic-bezier(0.4, 0, 0.2, 1);\n      -moz-transition: box-shadow 390ms cubic-bezier(0.4, 0, 0.2, 1);\n      -o-transition: box-shadow 390ms cubic-bezier(0.4, 0, 0.2, 1);\n      transition: box-shadow 390ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n@media only screen and (min-width: 1281px) {\n.card {\n      -webkit-transition: box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1);\n      -moz-transition: box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1);\n      -o-transition: box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1);\n      transition: box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n.card-actions {\n    padding: 0.57143rem;\n}\n.card-actions > * {\n      margin: 0 0.57143rem 0.28571rem 0;\n}\n.card-actions > *:last-of-type {\n        margin: 0 0 0.28571rem 0;\n}\n.card-primary {\n    padding-left: 1.14286rem;\n    padding-right: 1.14286rem;\n    padding-top: 1.71429rem;\n    padding-bottom: 1.71429rem;\n    font-size: 1.71429rem;\n}\n.card-primary-small {\n      font-size: 1rem;\n      padding-top: 1.14286rem;\n}\n.card-primary-additional {\n      padding-bottom: 1.14286rem;\n}\n.card-primary only screen and {\n      padding: 1.14286rem 1.71429rem;\n}\n.card-primary .subhead-1 {\n      font-size: 1rem;\n      color: rgba(0, 0, 0, 0.38);\n      font-weight: 400;\n}\n.card-supporting {\n    font-size: 1rem;\n    padding-top: 1.14286rem;\n    padding-left: 1.14286rem;\n    padding-right: 1.14286rem;\n    padding-bottom: 1.71429rem;\n}\n.card-supporting-additional {\n      padding-bottom: 1.14286rem;\n}\n@media only screen and (min-width: 1281px) {\n.card-supporting {\n        padding-left: 1.71429rem;\n        padding-right: 1.71429rem;\n}\n}\n.card img {\n    width: 100%;\n}\n.card img.card-top {\n      -webkit-border-top-left-radius: var(--border-size, 0.14286rem);\n      -moz-border-radius-topleft: var(--border-size, 0.14286rem);\n      border-top-left-radius: var(--border-size, 0.14286rem);\n      -webkit-border-top-right-radius: var(--border-size, 0.14286rem);\n      -moz-border-radius-topright: var(--border-size, 0.14286rem);\n      border-top-right-radius: var(--border-size, 0.14286rem);\n}\n.card img.card-background {\n      -webkit-border-radius: var(--border-size, 0.14286rem);\n      -moz-border-radius: var(--border-size, 0.14286rem);\n      -ms-border-radius: var(--border-size, 0.14286rem);\n      -o-border-radius: var(--border-size, 0.14286rem);\n      border-radius: var(--border-size, 0.14286rem);\n      height: 100%;\n}\n.card img.card-avatar {\n      float: left;\n      -webkit-border-radius: 50%;\n      -moz-border-radius: 50%;\n      -ms-border-radius: 50%;\n      -o-border-radius: 50%;\n      border-radius: 50%;\n      margin: 1.14286rem;\n      width: 2.85714rem;\n      height: 2.85714rem;\n}\n.card .card-content {\n    -webkit-border-bottom-left-radius: var(--border-size, 0.14286rem);\n    -moz-border-radius-bottomleft: var(--border-size, 0.14286rem);\n    border-bottom-left-radius: var(--border-size, 0.14286rem);\n    -webkit-border-bottom-right-radius: var(--border-size, 0.14286rem);\n    -moz-border-radius-bottomright: var(--border-size, 0.14286rem);\n    border-bottom-right-radius: var(--border-size, 0.14286rem);\n    background: rgba(0, 0, 0, 0.54);\n    position: absolute;\n    bottom: 0;\n    width: 100%;\n}\n.card .card-content div {\n      color: #FFFFFF;\n}\n\n/**************************************\n * Chips\n *\n * http://www.google.com/design/spec/components/chips.html\n **************************************/\n.chip {\n  -webkit-border-radius: 2.28571rem;\n  -moz-border-radius: 2.28571rem;\n  -ms-border-radius: 2.28571rem;\n  -o-border-radius: 2.28571rem;\n  border-radius: 2.28571rem;\n  background: #EEEEEE;\n  color: var(--font-color-2, rgba(0, 0, 0, 0.87));\n  display: inline-block;\n  font-size: 0.92857rem;\n  font-weight: 400;\n  height: 2.28571rem;\n  line-height: 2.28571rem;\n  padding: 0 0.85714rem;\n}\n.chip-deletable .chip-delete {\n    -webkit-border-radius: 50%;\n    -moz-border-radius: 50%;\n    -ms-border-radius: 50%;\n    -o-border-radius: 50%;\n    border-radius: 50%;\n    -webkit-transition: color 300ms cubic-bezier(0.4, 0, 0.2, 1) , background 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    -moz-transition: color 300ms cubic-bezier(0.4, 0, 0.2, 1) , background 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    -o-transition: color 300ms cubic-bezier(0.4, 0, 0.2, 1) , background 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    transition: color 300ms cubic-bezier(0.4, 0, 0.2, 1) , background 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    background: rgba(0, 0, 0, 0.54);\n    color: #EEEEEE;\n    display: inline-block;\n    height: 1.07143rem;\n    margin: 0 -0.57143rem 0 0.28571rem;\n    line-height: 1.07143rem;\n    text-align: center;\n    vertical-align: middle;\n    width: 1.07143rem;\n    font-size: 0.92857rem;\n    cursor: pointer;\n}\n@media only screen and (min-width: 961px) and (max-width: 1280px) {\n.chip-deletable .chip-delete {\n        -webkit-transition: color 390ms cubic-bezier(0.4, 0, 0.2, 1) , background 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        -moz-transition: color 390ms cubic-bezier(0.4, 0, 0.2, 1) , background 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        -o-transition: color 390ms cubic-bezier(0.4, 0, 0.2, 1) , background 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        transition: color 390ms cubic-bezier(0.4, 0, 0.2, 1) , background 390ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n@media only screen and (min-width: 1281px) {\n.chip-deletable .chip-delete {\n        -webkit-transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1) , background 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        -moz-transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1) , background 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        -o-transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1) , background 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1) , background 200ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n.chip-deletable:hover {\n    background: #757575;\n    color: #FFFFFF;\n}\n.chip-deletable:hover .chip-delete {\n      background: #FFFFFF;\n      color: #757575;\n}\n.chip-contact {\n    font-size: 1rem;\n    -webkit-transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    -moz-transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    -o-transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n@media only screen and (min-width: 961px) and (max-width: 1280px) {\n.chip-contact {\n        -webkit-transition: box-shadow 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        -moz-transition: box-shadow 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        -o-transition: box-shadow 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        transition: box-shadow 390ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n@media only screen and (min-width: 1281px) {\n.chip-contact {\n        -webkit-transition: box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        -moz-transition: box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        -o-transition: box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        transition: box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n.chip-contact img {\n      -webkit-border-radius: 50%;\n      -moz-border-radius: 50%;\n      -ms-border-radius: 50%;\n      -o-border-radius: 50%;\n      border-radius: 50%;\n      width: 2.28571rem;\n      height: 2.28571rem;\n      margin: 0 0.57143rem 0 -0.85714rem;\n}\n.chip-contact:hover {\n      -moz-box-shadow: 0rem 0rem 0.14286rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 0.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n      -webkit-box-shadow: 0rem 0rem 0.14286rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 0.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n      -ms-box-shadow: 0rem 0rem 0.14286rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 0.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n      -o-box-shadow: 0rem 0rem 0.14286rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 0.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n      box-shadow: 0rem 0rem 0.14286rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 0.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n}\n\n/**************************************\n * Tables\n *\n * http://www.google.com/design/spec/components/data-tables.html\n **************************************/\ntable {\n  border-collapse: collapse;\n  white-space: nowrap;\n  display: table;\n  width: 100%;\n}\ntable .numeric-col {\n    text-align: right;\n    padding-left: 4rem;\n    padding-right: 0;\n}\ntable .checkbox-col {\n    padding: 0 1.71429rem;\n}\ntable .checkbox-col .checkbox + label {\n      padding: 0;\n}\ntable.table-hover tbody tr {\n    -webkit-transition: background 0.2s ease-in-out;\n    -moz-transition: background 0.2s ease-in-out;\n    -o-transition: background 0.2s ease-in-out;\n    transition: background 0.2s ease-in-out;\n}\ntable.table-hover tbody tr:hover {\n      background: #EEEEEE;\n}\nthead th {\n  color: var(--font-color-1, rgba(0, 0, 0, 0.54));\n  font-size: 0.85714rem;\n  font-weight: 500;\n  height: 4rem;\n  line-height: 4rem;\n}\nthead th:hover {\n    background: none;\n}\nthead th a, thead th .sorted {\n    color: var(--font-color-1, rgba(0, 0, 0, 0.54));\n}\nthead th a .material-icons, thead th .sorted .material-icons {\n      color: var(--font-color-1, rgba(0, 0, 0, 0.54));\n}\nthead th a:hover, thead th .sorted:hover {\n      color: #000000;\n}\nthead th a:hover .material-icons, thead th .sorted:hover .material-icons {\n        color: #000000;\n}\ntd {\n  color: var(--font-color-2, rgba(0, 0, 0, 0.87));\n  font-size: 0.92857rem;\n  font-weight: 400;\n  height: 3.42857rem;\n  line-height: 3.42857rem;\n}\ntd, th {\n  text-align: left;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  -ms-box-sizing: border-box;\n  -o-box-sizing: border-box;\n  box-sizing: border-box;\n  padding-right: 4rem;\n}\ntd:first-of-type, th:first-of-type {\n    padding-left: 1.71429rem;\n}\ntd:last-of-type, th:last-of-type {\n    padding-right: 1.71429rem;\n}\n.table-responsive {\n  overflow-x: scroll;\n}\n\n/**************************************\n * Dialogs\n *\n * http://www.google.com/design/spec/components/dialogs.html\n **************************************/\n.dialog {\n  -moz-box-shadow: 0rem 1.71429rem 2.71429rem 0.21429rem rgba(0, 0, 0, 0.14) , 0rem 0.64286rem 3.28571rem 0.57143rem rgba(0, 0, 0, 0.12) , 0rem 0.78571rem 1.07143rem 0rem rgba(0, 0, 0, 0.2);\n  -webkit-box-shadow: 0rem 1.71429rem 2.71429rem 0.21429rem rgba(0, 0, 0, 0.14) , 0rem 0.64286rem 3.28571rem 0.57143rem rgba(0, 0, 0, 0.12) , 0rem 0.78571rem 1.07143rem 0rem rgba(0, 0, 0, 0.2);\n  -ms-box-shadow: 0rem 1.71429rem 2.71429rem 0.21429rem rgba(0, 0, 0, 0.14) , 0rem 0.64286rem 3.28571rem 0.57143rem rgba(0, 0, 0, 0.12) , 0rem 0.78571rem 1.07143rem 0rem rgba(0, 0, 0, 0.2);\n  -o-box-shadow: 0rem 1.71429rem 2.71429rem 0.21429rem rgba(0, 0, 0, 0.14) , 0rem 0.64286rem 3.28571rem 0.57143rem rgba(0, 0, 0, 0.12) , 0rem 0.78571rem 1.07143rem 0rem rgba(0, 0, 0, 0.2);\n  box-shadow: 0rem 1.71429rem 2.71429rem 0.21429rem rgba(0, 0, 0, 0.14) , 0rem 0.64286rem 3.28571rem 0.57143rem rgba(0, 0, 0, 0.12) , 0rem 0.78571rem 1.07143rem 0rem rgba(0, 0, 0, 0.2);\n  background: var(--background, #FFFFFF);\n  visibility: hidden;\n  -webkit-opacity: 0;\n  opacity: 0;\n  position: fixed;\n  width: 100%;\n  -webkit-border-radius: var(--border-size, 0.14286rem);\n  -moz-border-radius: var(--border-size, 0.14286rem);\n  -ms-border-radius: var(--border-size, 0.14286rem);\n  -o-border-radius: var(--border-size, 0.14286rem);\n  border-radius: var(--border-size, 0.14286rem);\n  z-index: 5;\n  top: 50%;\n  left: 50%;\n  max-width: calc(100% - ( 2 * 1.14286rem));\n  -webkit-transform: translateX(-50%) translateY(-50%);\n  -moz-transform: translateX(-50%) translateY(-50%);\n  -ms-transform: translateX(-50%) translateY(-50%);\n  -o-transform: translateX(-50%) translateY(-50%);\n  transform: translateX(-50%) translateY(-50%);\n  -webkit-transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);\n  -moz-transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);\n  -o-transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);\n  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n@media only screen and (min-width: 961px) and (max-width: 1280px) {\n.dialog {\n      -webkit-transition: all 390ms cubic-bezier(0.4, 0, 0.2, 1);\n      -moz-transition: all 390ms cubic-bezier(0.4, 0, 0.2, 1);\n      -o-transition: all 390ms cubic-bezier(0.4, 0, 0.2, 1);\n      transition: all 390ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n@media only screen and (min-width: 1281px) {\n.dialog {\n      width: auto;\n      -webkit-transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);\n      -moz-transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);\n      -o-transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);\n      transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);\n      max-width: calc(100% - (2 * 1.71429rem));\n}\n}\n.dialog-background {\n    width: 100%;\n    height: 100%;\n    background: rgba(0, 0, 0, 0.87);\n    top: 0;\n    left: 0;\n    position: fixed;\n    z-index: 4;\n    visibility: hidden;\n    -webkit-transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    -moz-transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    -o-transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n@media only screen and (min-width: 961px) and (max-width: 1280px) {\n.dialog-background {\n        -webkit-transition: all 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        -moz-transition: all 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        -o-transition: all 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        transition: all 390ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n@media only screen and (min-width: 1281px) {\n.dialog-background {\n        -webkit-transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        -moz-transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        -o-transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n.dialog.expanded {\n    visibility: visible;\n    -webkit-opacity: 1;\n    opacity: 1;\n}\n.dialog.expanded ~ .dialog-background {\n      visibility: visible;\n      -webkit-opacity: 0.3;\n      opacity: 0.3;\n}\n.dialog-content {\n    padding: 0 1.71429rem 1.71429rem 1.71429rem;\n    max-height: 50vh;\n    overflow: auto;\n}\n.dialog-title {\n    width: 100%;\n    font-size: 1.42857rem;\n    line-height: 2rem;\n    letter-spacing: 0.00357rem;\n    font-weight: 500;\n    color: var(--font-color-2, rgba(0, 0, 0, 0.87));\n    text-transform: inherit;\n    padding: 1.71429rem 1.71429rem 1.42857rem 1.71429rem;\n}\n.dialog-actions {\n    width: 100%;\n    text-align: right;\n    min-height: 3.71429rem;\n    padding: 0.57143rem;\n}\n.dialog-actions * {\n      margin: 0 0 0 0.57143rem;\n      min-width: 4.57143rem;\n}\n\n/**************************************\n * Expansion panel\n *\n * https://material.google.com/components/expansion-panels.html\n **************************************/\n.expansion-panel {\n  list-style-type: none;\n  padding: 0;\n  margin: 0;\n}\n.expansion-panel-header {\n    height: 3.42857rem;\n}\n.expansion-panel-content {\n    max-height: 0;\n    visibility: hidden;\n    -webkit-opacity: 0;\n    opacity: 0;\n    -webkit-transition: max-height 300ms cubic-bezier(0.4, 0, 0.2, 1) , visibility 300ms cubic-bezier(0.4, 0, 0.2, 1) , opacity 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    -moz-transition: max-height 300ms cubic-bezier(0.4, 0, 0.2, 1) , visibility 300ms cubic-bezier(0.4, 0, 0.2, 1) , opacity 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    -o-transition: max-height 300ms cubic-bezier(0.4, 0, 0.2, 1) , visibility 300ms cubic-bezier(0.4, 0, 0.2, 1) , opacity 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    transition: max-height 300ms cubic-bezier(0.4, 0, 0.2, 1) , visibility 300ms cubic-bezier(0.4, 0, 0.2, 1) , opacity 300ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n@media only screen and (min-width: 961px) and (max-width: 1280px) {\n.expansion-panel-content {\n        -webkit-transition: max-height 390ms cubic-bezier(0.4, 0, 0.2, 1) , visibility 390ms cubic-bezier(0.4, 0, 0.2, 1) , opacity 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        -moz-transition: max-height 390ms cubic-bezier(0.4, 0, 0.2, 1) , visibility 390ms cubic-bezier(0.4, 0, 0.2, 1) , opacity 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        -o-transition: max-height 390ms cubic-bezier(0.4, 0, 0.2, 1) , visibility 390ms cubic-bezier(0.4, 0, 0.2, 1) , opacity 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        transition: max-height 390ms cubic-bezier(0.4, 0, 0.2, 1) , visibility 390ms cubic-bezier(0.4, 0, 0.2, 1) , opacity 390ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n@media only screen and (min-width: 1281px) {\n.expansion-panel-content {\n        -webkit-transition: max-height 200ms cubic-bezier(0.4, 0, 0.2, 1) , visibility 200ms cubic-bezier(0.4, 0, 0.2, 1) , opacity 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        -moz-transition: max-height 200ms cubic-bezier(0.4, 0, 0.2, 1) , visibility 200ms cubic-bezier(0.4, 0, 0.2, 1) , opacity 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        -o-transition: max-height 200ms cubic-bezier(0.4, 0, 0.2, 1) , visibility 200ms cubic-bezier(0.4, 0, 0.2, 1) , opacity 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        transition: max-height 200ms cubic-bezier(0.4, 0, 0.2, 1) , visibility 200ms cubic-bezier(0.4, 0, 0.2, 1) , opacity 200ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n.expansion-panel label {\n    font-weight: 400;\n    font-size: 1.07143rem;\n    color: var(--font-color-2, rgba(0, 0, 0, 0.87));\n    margin: 0 1.14286rem 0 0;\n}\n.expansion-panel .expand-icon {\n    color: rgba(0, 0, 0, 0.38);\n    position: absolute;\n    right: 1.71429rem;\n    line-height: 3.42857rem;\n    cursor: pointer;\n    margin: 0 0 0 1.14286rem;\n    vertical-align: middle;\n}\n.expansion-panel .expand-icon .material-icons {\n      font-size: 1.71429rem;\n      width: 1.71429rem;\n      height: 1.71429rem;\n      cursor: pointer;\n      -webkit-transform: rotate(0deg);\n      -moz-transform: rotate(0deg);\n      -ms-transform: rotate(0deg);\n      -o-transform: rotate(0deg);\n      transform: rotate(0deg);\n      -webkit-transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);\n      -moz-transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);\n      -o-transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);\n      transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n@media only screen and (min-width: 961px) and (max-width: 1280px) {\n.expansion-panel .expand-icon .material-icons {\n          -webkit-transition: transform 390ms cubic-bezier(0.4, 0, 0.2, 1);\n          -moz-transition: transform 390ms cubic-bezier(0.4, 0, 0.2, 1);\n          -o-transition: transform 390ms cubic-bezier(0.4, 0, 0.2, 1);\n          transition: transform 390ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n@media only screen and (min-width: 1281px) {\n.expansion-panel .expand-icon .material-icons {\n          -webkit-transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1);\n          -moz-transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1);\n          -o-transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1);\n          transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n.expansion-panel li {\n    padding: 0 1.71429rem;\n    font-weight: 400;\n    color: rgba(0, 0, 0, 0.54);\n    font-size: 0.85714rem;\n    border-bottom: 0.07143rem solid rgba(0, 0, 0, 0.12);\n    position: relative;\n    background: var(--background, #FFFFFF);\n}\n.expansion-panel li.expanded {\n      margin: 1.14286rem 0;\n}\n.expansion-panel li.expanded .expand-icon .material-icons {\n        -webkit-transform: rotate(180deg);\n        -moz-transform: rotate(180deg);\n        -ms-transform: rotate(180deg);\n        -o-transform: rotate(180deg);\n        transform: rotate(180deg);\n}\n.expansion-panel li.expanded .expansion-panel-content {\n        max-height: 100%;\n        padding: 0 0 1.14286rem 0;\n        -webkit-opacity: 1;\n        opacity: 1;\n        visibility: visible;\n}\n.expansion-panel li:focus {\n      background: #EEEEEE;\n}\n.expansion-panel li:focus .expand-icon {\n        color: rgba(0, 0, 0, 0.54);\n}\n\n/**************************************\n * Grid lists\n *\n * https://material.google.com/components/grid-lists.html\n **************************************/\n.grid {\n  position: relative;\n}\n.grid img {\n    position: relative;\n}\n.grid-header, .grid-footer {\n    position: absolute;\n    left: 0;\n    width: 100%;\n    color: #FFFFFF;\n    padding: 1.14286rem;\n    background: rgba(0, 0, 0, 0.3);\n}\n.grid-header .material-icons, .grid-footer .material-icons {\n      color: #FFFFFF;\n}\n.grid-header {\n    top: 0;\n}\n.grid-footer {\n    bottom: 0;\n}\n.grid-single {\n    height: 3.42857rem;\n    font-size: 1.14286rem;\n}\n.grid-two {\n    height: 4.85714rem;\n}\n.grid-two .first {\n      max-width: 75%;\n}\n.grid-two .first-small {\n        font-size: 0.85714rem;\n}\n.grid-two .first-large {\n        font-size: 1.14286rem;\n}\n.grid-two .second {\n      max-width: 75%;\n      font-size: 1rem;\n}\n.grid .action {\n    max-width: 25%;\n}\n.grid .action .material-icons {\n      padding: 1.14286rem;\n      font-size: 1.14286rem;\n      cursor: pointer;\n}\n.grid .action .material-icons.left {\n        float: left;\n}\n.grid .action .material-icons.right {\n        float: right;\n}\n\n/**************************************\n * Menus\n *\n * https://material.io/guidelines/components/menus.html\n **************************************/\n.menu {\n  background: var(--background, #FFFFFF);\n  visibility: hidden;\n  font-size: 0.92857rem;\n  line-height: 1.42857rem;\n  letter-spacing: 0.00714rem;\n  font-weight: 400;\n  color: var(--font-color-2, rgba(0, 0, 0, 0.87));\n  text-transform: inherit;\n  -webkit-opacity: 0;\n  opacity: 0;\n  position: absolute;\n  -moz-box-shadow: 0rem 0.57143rem 0.71429rem 0.07143rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 1rem 0.21429rem rgba(0, 0, 0, 0.12) , 0rem 0.28571rem 1.07143rem 0rem rgba(0, 0, 0, 0.2);\n  -webkit-box-shadow: 0rem 0.57143rem 0.71429rem 0.07143rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 1rem 0.21429rem rgba(0, 0, 0, 0.12) , 0rem 0.28571rem 1.07143rem 0rem rgba(0, 0, 0, 0.2);\n  -ms-box-shadow: 0rem 0.57143rem 0.71429rem 0.07143rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 1rem 0.21429rem rgba(0, 0, 0, 0.12) , 0rem 0.28571rem 1.07143rem 0rem rgba(0, 0, 0, 0.2);\n  -o-box-shadow: 0rem 0.57143rem 0.71429rem 0.07143rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 1rem 0.21429rem rgba(0, 0, 0, 0.12) , 0rem 0.28571rem 1.07143rem 0rem rgba(0, 0, 0, 0.2);\n  box-shadow: 0rem 0.57143rem 0.71429rem 0.07143rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 1rem 0.21429rem rgba(0, 0, 0, 0.12) , 0rem 0.28571rem 1.07143rem 0rem rgba(0, 0, 0, 0.2);\n  display: -webkit-flex;\n  display: -moz-flex;\n  display: flex;\n  -webkit-flex-flow: column;\n  flex-flow: column;\n  -webkit-justify-content: flex-start;\n  justify-content: flex-start;\n  -webkit-align-items: stretch;\n  align-items: stretch;\n  -webkit-align-content: stretch;\n  align-content: stretch;\n  -webkit-border-radius: var(--border-size, 0.14286rem);\n  -moz-border-radius: var(--border-size, 0.14286rem);\n  -ms-border-radius: var(--border-size, 0.14286rem);\n  -o-border-radius: var(--border-size, 0.14286rem);\n  border-radius: var(--border-size, 0.14286rem);\n  padding: 0.57143rem 0;\n  white-space: nowrap;\n  text-align: left;\n  max-height: 50vh;\n  overflow: auto;\n  z-index: 4;\n  -webkit-transition: max-width 300ms cubic-bezier(0.4, 0, 0.2, 1) , max-height 300ms cubic-bezier(0.4, 0, 0.2, 1);\n  -moz-transition: max-width 300ms cubic-bezier(0.4, 0, 0.2, 1) , max-height 300ms cubic-bezier(0.4, 0, 0.2, 1);\n  -o-transition: max-width 300ms cubic-bezier(0.4, 0, 0.2, 1) , max-height 300ms cubic-bezier(0.4, 0, 0.2, 1);\n  transition: max-width 300ms cubic-bezier(0.4, 0, 0.2, 1) , max-height 300ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n@media only screen and (min-width: 1281px) {\n.menu {\n      -moz-box-shadow: 0rem 0.42857rem 0.71429rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.07143rem 1.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.21429rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n      -webkit-box-shadow: 0rem 0.42857rem 0.71429rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.07143rem 1.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.21429rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n      -ms-box-shadow: 0rem 0.42857rem 0.71429rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.07143rem 1.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.21429rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n      -o-box-shadow: 0rem 0.42857rem 0.71429rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.07143rem 1.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.21429rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n      box-shadow: 0rem 0.42857rem 0.71429rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.07143rem 1.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.21429rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n}\n}\n@media only screen and (min-width: 961px) and (max-width: 1280px) {\n.menu {\n      -webkit-transition: max-width 390ms cubic-bezier(0.4, 0, 0.2, 1) , max-height 390ms cubic-bezier(0.4, 0, 0.2, 1);\n      -moz-transition: max-width 390ms cubic-bezier(0.4, 0, 0.2, 1) , max-height 390ms cubic-bezier(0.4, 0, 0.2, 1);\n      -o-transition: max-width 390ms cubic-bezier(0.4, 0, 0.2, 1) , max-height 390ms cubic-bezier(0.4, 0, 0.2, 1);\n      transition: max-width 390ms cubic-bezier(0.4, 0, 0.2, 1) , max-height 390ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n@media only screen and (min-width: 1281px) {\n.menu {\n      -webkit-transition: max-width 200ms cubic-bezier(0.4, 0, 0.2, 1) , max-height 200ms cubic-bezier(0.4, 0, 0.2, 1);\n      -moz-transition: max-width 200ms cubic-bezier(0.4, 0, 0.2, 1) , max-height 200ms cubic-bezier(0.4, 0, 0.2, 1);\n      -o-transition: max-width 200ms cubic-bezier(0.4, 0, 0.2, 1) , max-height 200ms cubic-bezier(0.4, 0, 0.2, 1);\n      transition: max-width 200ms cubic-bezier(0.4, 0, 0.2, 1) , max-height 200ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n.menu a {\n    display: block;\n    height: 3.42857rem;\n    font-size: 0.92857rem;\n    line-height: 1.42857rem;\n    letter-spacing: 0.00714rem;\n    font-weight: 400;\n    color: var(--font-color-2, rgba(0, 0, 0, 0.87));\n    text-transform: inherit;\n    color: initial;\n    padding: 1.07143rem 1.14286rem 1.42857rem 1.14286rem;\n    -webkit-transition: background 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    -moz-transition: background 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    -o-transition: background 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    transition: background 300ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n@media only screen and (min-width: 961px) and (max-width: 1280px) {\n.menu a {\n        -webkit-transition: background 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        -moz-transition: background 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        -o-transition: background 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        transition: background 390ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n@media only screen and (min-width: 1281px) {\n.menu a {\n        -webkit-transition: background 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        -moz-transition: background 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        -o-transition: background 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        transition: background 200ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n.menu a:hover {\n      background: #EEEEEE;\n      color: initial;\n}\n.menu a:hover .material-icons {\n        color: initial;\n}\n.menu.expanded {\n    visibility: visible;\n    -webkit-opacity: 1;\n    opacity: 1;\n}\n.menu-cascading {\n    padding: 1.14286rem 0;\n}\n.menu-cascading a {\n      font-size: 1.07143rem;\n      line-height: 1.42857rem;\n      letter-spacing: 0.00714rem;\n      font-weight: 400;\n      color: var(--font-color-2, rgba(0, 0, 0, 0.87));\n      text-transform: inherit;\n      height: 2.28571rem;\n      line-height: 2.28571rem;\n      padding: 0 1.71429rem 1.42857rem 1.71429rem;\n}\n.menu-sub {\n    -moz-box-shadow: 0rem 0.64286rem 0.85714rem 0.07143rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 1.14286rem 0.14286rem rgba(0, 0, 0, 0.12) , 0rem 0.35714rem 0.42857rem 0rem rgba(0, 0, 0, 0.2);\n    -webkit-box-shadow: 0rem 0.64286rem 0.85714rem 0.07143rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 1.14286rem 0.14286rem rgba(0, 0, 0, 0.12) , 0rem 0.35714rem 0.42857rem 0rem rgba(0, 0, 0, 0.2);\n    -ms-box-shadow: 0rem 0.64286rem 0.85714rem 0.07143rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 1.14286rem 0.14286rem rgba(0, 0, 0, 0.12) , 0rem 0.35714rem 0.42857rem 0rem rgba(0, 0, 0, 0.2);\n    -o-box-shadow: 0rem 0.64286rem 0.85714rem 0.07143rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 1.14286rem 0.14286rem rgba(0, 0, 0, 0.12) , 0rem 0.35714rem 0.42857rem 0rem rgba(0, 0, 0, 0.2);\n    box-shadow: 0rem 0.64286rem 0.85714rem 0.07143rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 1.14286rem 0.14286rem rgba(0, 0, 0, 0.12) , 0rem 0.35714rem 0.42857rem 0rem rgba(0, 0, 0, 0.2);\n}\nselect.select {\n  display: none;\n}\ndiv.select {\n  padding: 1.14286rem 0 0.57143rem 0;\n  border-bottom: var(--border-size, 0.14286rem) solid rgba(0, 0, 0, 0.38);\n  position: relative;\n  margin: 0 0 0.57143rem 0;\n}\ndiv.select .menu {\n    top: 0;\n    width: 100%;\n}\ndiv.select .active {\n    color: var(--main-color, #3F51B5);\n}\n\n/**************************************\n * Navigation drawer\n *\n * https://material.google.com/patterns/navigation-drawer.html\n **************************************/\n.drawer {\n  position: fixed;\n  left: 0;\n  top: 0;\n  width: 20rem;\n  height: 100%;\n  background: #FFFFFF;\n  bottom: 0;\n  overflow-x: hidden;\n  max-width: calc(100% - 4rem);\n  /*&-persistent-mini {\n\t\ttop: $appbar-small-height;\n\n\t\t// Add extra width for scrollbar TODO somehow fix it\n\t\twidth: calc( (1.14286rem * 2) + 1.71429rem + 0.21429rem);\n\n\t\t@media only screen and (min-width: 960px + 1px) {\n\t\t\twidth: calc( (1.14286rem * 2) + 1.71429rem + 0.71429rem);\n\t\t}\n\n\t\t@media only screen and (min-width: 960px + 1px) and (max-width: 1280px) {\n\t\t\ttop: $appbar-medium-height;\n\t\t}\n\n\t\t@media only screen and (min-width: 1280px + 1px) {\n\t\t\ttop: $appbar-large-height;\n\t\t}\n\n\t\tli:first-of-type {\n\t\t\tmargin: rem-calc(8px) 0 0 0;\n\t\t}\n\n\t\t.divider, .arrow, .drawer-profile-name, .drawer-profile-dropdown, .text {\n\t\t\tdisplay: none;\n\t\t}\n\n\t\t.drawer-header {\n\t\t\theight: rem-calc(48px);\n\t\t\tline-height: rem-calc(48px);\n\n\t\t\t.drawer-profile-img {\n\t\t\t\t@include square($drawer-icon-size);\n\t\t\t\tmargin: 0 calc(5.14286rem - 1.71429rem - 1.14286rem) 0 0;\n\t\t\t\t@include border-radius(50%);\n\t\t\t\tborder: $drawer-border;\n\t\t\t\ttop: 50%;\n\t\t\t\tposition: inherit;\n\t\t\t\t@include transform(translate(0, -50%));\n\t\t\t}\n\t\t}\n\n\t\t&.expanded {\n\t\t\twidth: 100%;\n\t\t\ttop: 0;\n\t\t\tborder-right: $drawer-border;\n\t\t\tz-index: 3;\n\n\t\t\t.drawer-header {\n\t\t\t\tposition: relative;\n\t\t\t\theight: $appbar-small-height;\n\t\t\t\tline-height: $appbar-small-height;\n\t\t\t\tmargin: 0 0 rem-calc(8px) 0;\n\t\t\t\tborder-bottom: $drawer-border;\n\n\t\t\t\t@media only screen and (min-width: 960px + 1px) and (max-width: 1280px) {\n\t\t\t\t\theight: $appbar-medium-height;\n\t\t\t\t\tline-height: $appbar-medium-height;\n\t\t\t\t}\n\n\t\t\t\t@media only screen and (min-width: 1280px + 1px) {\n\t\t\t\t\theight: $appbar-large-height;\n\t\t\t\t\tline-height: $appbar-large-height;\n\t\t\t\t}\n\n\t\t\t\t&:hover {\n\t\t\t\t\tbackground: none;\n\t\t\t\t}\n\n\t\t\t\t> * {\n\t\t\t\t\tfloat: left;\n\t\t\t\t}\n\t\t   }\n\t   }\n\t}*/\n}\n.drawer-permanent-full-height, .drawer-permanent-clipped, .drawer-permanent-floating, .drawer-persistent, .drawer-temporary {\n    margin: 0 0 0 -102%;\n    -webkit-transition: margin 300ms cubic-bezier(0, 0, 0.2, 1);\n    -moz-transition: margin 300ms cubic-bezier(0, 0, 0.2, 1);\n    -o-transition: margin 300ms cubic-bezier(0, 0, 0.2, 1);\n    transition: margin 300ms cubic-bezier(0, 0, 0.2, 1);\n}\n@media only screen and (min-width: 961px) {\n.drawer-permanent-full-height, .drawer-permanent-clipped, .drawer-permanent-floating, .drawer-persistent, .drawer-temporary {\n        margin: 0;\n}\n}\n@media only screen and (min-width: 961px) and (max-width: 1280px) {\n.drawer-permanent-full-height, .drawer-permanent-clipped, .drawer-permanent-floating, .drawer-persistent, .drawer-temporary {\n        -webkit-transition: margin 390ms cubic-bezier(0, 0, 0.2, 1);\n        -moz-transition: margin 390ms cubic-bezier(0, 0, 0.2, 1);\n        -o-transition: margin 390ms cubic-bezier(0, 0, 0.2, 1);\n        transition: margin 390ms cubic-bezier(0, 0, 0.2, 1);\n}\n}\n@media only screen and (min-width: 1281px) {\n.drawer-permanent-full-height, .drawer-permanent-clipped, .drawer-permanent-floating, .drawer-persistent, .drawer-temporary {\n        -webkit-transition: margin 200ms cubic-bezier(0, 0, 0.2, 1);\n        -moz-transition: margin 200ms cubic-bezier(0, 0, 0.2, 1);\n        -o-transition: margin 200ms cubic-bezier(0, 0, 0.2, 1);\n        transition: margin 200ms cubic-bezier(0, 0, 0.2, 1);\n}\n}\n.drawer.expanded {\n    margin: 0;\n    -webkit-transition: margin 300ms cubic-bezier(0.4, 0, 0.6, 1);\n    -moz-transition: margin 300ms cubic-bezier(0.4, 0, 0.6, 1);\n    -o-transition: margin 300ms cubic-bezier(0.4, 0, 0.6, 1);\n    transition: margin 300ms cubic-bezier(0.4, 0, 0.6, 1);\n}\n@media only screen and (min-width: 961px) and (max-width: 1280px) {\n.drawer.expanded {\n        -webkit-transition: margin 390ms cubic-bezier(0.4, 0, 0.6, 1);\n        -moz-transition: margin 390ms cubic-bezier(0.4, 0, 0.6, 1);\n        -o-transition: margin 390ms cubic-bezier(0.4, 0, 0.6, 1);\n        transition: margin 390ms cubic-bezier(0.4, 0, 0.6, 1);\n}\n}\n@media only screen and (min-width: 1281px) {\n.drawer.expanded {\n        -webkit-transition: margin 200ms cubic-bezier(0.4, 0, 0.6, 1);\n        -moz-transition: margin 200ms cubic-bezier(0.4, 0, 0.6, 1);\n        -o-transition: margin 200ms cubic-bezier(0.4, 0, 0.6, 1);\n        transition: margin 200ms cubic-bezier(0.4, 0, 0.6, 1);\n}\n}\n@media only screen and (max-width: 960px) {\n.drawer.expanded ~ .drawer-background {\n        visibility: visible;\n}\n}\n.drawer-background {\n    background: rgba(0, 0, 0, 0.2);\n    width: 100%;\n    height: 100%;\n    top: 0;\n    left: 0;\n    position: fixed;\n    z-index: 2;\n    visibility: hidden;\n    -webkit-transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    -moz-transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    -o-transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n@media only screen and (min-width: 961px) and (max-width: 1280px) {\n.drawer-background {\n        -webkit-transition: all 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        -moz-transition: all 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        -o-transition: all 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        transition: all 390ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n@media only screen and (min-width: 1281px) {\n.drawer-background {\n        -webkit-transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        -moz-transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        -o-transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n.drawer .drawer-header {\n    position: relative;\n}\n.drawer .drawer-header:hover {\n      background: none;\n}\n.drawer-permanent-full-height {\n    top: 0;\n    border-right: 0.07143rem solid rgba(0, 0, 0, 0.12);\n    z-index: 3;\n}\n.drawer-permanent-full-height .drawer-header {\n      padding: 1.14286rem 1.14286rem 0.57143rem 1.14286rem;\n      border-bottom: 0.07143rem solid rgba(0, 0, 0, 0.12);\n      height: 4rem;\n}\n@media only screen and (orientation: landscape) and (max-width: 960px) {\n.drawer-permanent-full-height .drawer-header {\n          height: 3.42857rem;\n}\n}\n@media only screen and (orientation: portrait) and (max-width: 600px) {\n.drawer-permanent-full-height .drawer-header {\n          height: 4rem;\n}\n}\n@media only screen and (min-width: 961px) {\n.drawer-permanent-full-height .drawer-header {\n          height: 4.57143rem;\n}\n}\n.drawer-permanent-clipped {\n    top: 4rem;\n    z-index: 1;\n    border-right: 0.07143rem solid rgba(0, 0, 0, 0.12);\n}\n@media only screen and (orientation: landscape) and (max-width: 960px) {\n.drawer-permanent-clipped {\n        top: 3.42857rem;\n}\n}\n@media only screen and (orientation: portrait) and (max-width: 600px) {\n.drawer-permanent-clipped {\n        top: 4rem;\n}\n}\n@media only screen and (min-width: 961px) {\n.drawer-permanent-clipped {\n        top: 4.57143rem;\n}\n}\n.drawer-permanent-clipped li:first-of-type {\n      margin: 0.57143rem 0 0 0;\n}\n.drawer-permanent-floating {\n    top: 4rem;\n    z-index: 1;\n}\n@media only screen and (orientation: landscape) and (max-width: 960px) {\n.drawer-permanent-floating {\n        top: 3.42857rem;\n}\n}\n@media only screen and (orientation: portrait) and (max-width: 600px) {\n.drawer-permanent-floating {\n        top: 4rem;\n}\n}\n@media only screen and (min-width: 961px) {\n.drawer-permanent-floating {\n        top: 4.57143rem;\n}\n}\n.drawer-permanent-floating li:first-of-type {\n      margin: 0.57143rem 0 0 0;\n}\n.drawer-persistent {\n    top: 0;\n    border-right: 0.07143rem solid rgba(0, 0, 0, 0.12);\n    z-index: 3;\n}\n.drawer-persistent .menu {\n      top: 1.14286rem;\n}\n.drawer-persistent .drawer-header {\n      height: 4rem;\n      line-height: 4rem;\n      margin: 0 0 0.57143rem 0;\n      border-bottom: 0.07143rem solid rgba(0, 0, 0, 0.12);\n}\n@media only screen and (orientation: landscape) and (max-width: 960px) {\n.drawer-persistent .drawer-header {\n          height: 3.42857rem;\n          line-height: 3.42857rem;\n}\n}\n@media only screen and (orientation: portrait) and (max-width: 600px) {\n.drawer-persistent .drawer-header {\n          height: 4rem;\n          line-height: 4rem;\n}\n}\n@media only screen and (min-width: 961px) {\n.drawer-persistent .drawer-header {\n          height: 4.57143rem;\n          line-height: 4.57143rem;\n}\n}\n.drawer-persistent .drawer-header > * {\n        float: left;\n}\n.drawer-persistent .drawer-profile-img {\n      width: 1.71429rem;\n      height: 1.71429rem;\n      margin: 0 2.28571rem 0 1.14286rem;\n      -webkit-border-radius: 50%;\n      -moz-border-radius: 50%;\n      -ms-border-radius: 50%;\n      -o-border-radius: 50%;\n      border-radius: 50%;\n      border: 0.07143rem solid rgba(0, 0, 0, 0.12);\n      top: 50%;\n      position: inherit;\n      -webkit-transform: translate(0, -50%);\n      -moz-transform: translate(0, -50%);\n      -ms-transform: translate(0, -50%);\n      -o-transform: translate(0, -50%);\n      transform: translate(0, -50%);\n}\n.drawer-persistent .drawer-profile-name {\n      color: inherit;\n}\n.drawer-temporary {\n    top: 0;\n    z-index: 3;\n    -moz-box-shadow: 0rem 1.14286rem 1.71429rem 0.14286rem rgba(0, 0, 0, 0.14) , 0rem 0.42857rem 2.14286rem 0.35714rem rgba(0, 0, 0, 0.12) , 0rem 0.57143rem 0.71429rem 0rem rgba(0, 0, 0, 0.2);\n    -webkit-box-shadow: 0rem 1.14286rem 1.71429rem 0.14286rem rgba(0, 0, 0, 0.14) , 0rem 0.42857rem 2.14286rem 0.35714rem rgba(0, 0, 0, 0.12) , 0rem 0.57143rem 0.71429rem 0rem rgba(0, 0, 0, 0.2);\n    -ms-box-shadow: 0rem 1.14286rem 1.71429rem 0.14286rem rgba(0, 0, 0, 0.14) , 0rem 0.42857rem 2.14286rem 0.35714rem rgba(0, 0, 0, 0.12) , 0rem 0.57143rem 0.71429rem 0rem rgba(0, 0, 0, 0.2);\n    -o-box-shadow: 0rem 1.14286rem 1.71429rem 0.14286rem rgba(0, 0, 0, 0.14) , 0rem 0.42857rem 2.14286rem 0.35714rem rgba(0, 0, 0, 0.12) , 0rem 0.57143rem 0.71429rem 0rem rgba(0, 0, 0, 0.2);\n    box-shadow: 0rem 1.14286rem 1.71429rem 0.14286rem rgba(0, 0, 0, 0.14) , 0rem 0.42857rem 2.14286rem 0.35714rem rgba(0, 0, 0, 0.12) , 0rem 0.57143rem 0.71429rem 0rem rgba(0, 0, 0, 0.2);\n}\n.drawer-temporary .menu {\n      top: 6rem;\n}\n.drawer-temporary .drawer-header {\n      padding: 0 0 0.57143rem 0;\n      margin: 0 0 0.57143rem 0;\n      height: 8.57143rem;\n}\n.drawer-temporary .drawer-profile-background {\n      top: 0;\n      left: 0;\n      width: 100%;\n      height: 8.57143rem;\n}\n.drawer-temporary .scrim {\n      background: -webkit-linear-gradient(to top, rgba(33, 33, 33, 0.4) 15%, rgba(255, 255, 255, 0) 33%);\n      background: -moz-linear-gradient(to top, rgba(33, 33, 33, 0.4) 15%, rgba(255, 255, 255, 0) 33%);\n      background: -o-linear-gradient(to top, rgba(33, 33, 33, 0.4) 15%, rgba(255, 255, 255, 0) 33%);\n      background: linear-gradient(to top, rgba(33, 33, 33, 0.4) 15%, rgba(255, 255, 255, 0) 33%);\n      bottom: 0.57143rem;\n      content: '';\n      left: 0;\n      position: absolute;\n      right: 0;\n      top: 0;\n      margin: 0 0 -0.57143rem 0;\n}\n.drawer-temporary .drawer-profile-background, .drawer-temporary .drawer-profile-img, .drawer-temporary .drawer-profile-name, .drawer-temporary .drawer-profile-email, .drawer-temporary .drawer-profile-more {\n      position: absolute;\n}\n.drawer-temporary .drawer-profile-img {\n      top: 1.14286rem;\n      left: 1.14286rem;\n      width: 2.85714rem;\n      height: 2.85714rem;\n      -webkit-border-radius: 50%;\n      -moz-border-radius: 50%;\n      -ms-border-radius: 50%;\n      -o-border-radius: 50%;\n      border-radius: 50%;\n}\n.drawer-temporary .drawer-profile-name, .drawer-temporary .drawer-profile-email {\n      line-height: 2rem;\n      left: 1.14286rem;\n      height: 2rem;\n      color: #FFFFFF;\n}\n.drawer-temporary .drawer-profile-name {\n      top: 4rem;\n      font-size: 1rem;\n      font-weight: 500;\n      right: 0;\n}\n.drawer-temporary .drawer-profile-email {\n      top: 6rem;\n      font-size: 1rem;\n      font-weight: 400;\n      right: 5.14286rem;\n}\n.drawer-temporary .drawer-profile-more {\n      height: 2rem;\n      line-height: 4rem;\n      right: 1.14286rem;\n      top: 6rem;\n      text-align: right;\n      position: relative;\n}\n.drawer-temporary .drawer-profile-more .material-icons {\n        margin: -1rem -1.14286rem 0 0;\n        color: #FFFFFF;\n}\n.drawer-temporary.expanded {\n      margin: 0;\n}\n.drawer a {\n    cursor: pointer;\n    color: var(--font-color-2, rgba(0, 0, 0, 0.87));\n    font-weight: 500;\n    width: 100%;\n    display: block;\n    height: 3.42857rem;\n    font-size: 1rem;\n    line-height: 3.42857rem;\n    position: relative;\n    padding: 0 1.14286rem;\n    -webkit-transition: color 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    -moz-transition: color 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    -o-transition: color 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    transition: color 300ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n@media only screen and (min-width: 961px) and (max-width: 1280px) {\n.drawer a {\n        -webkit-transition: color 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        -moz-transition: color 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        -o-transition: color 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        transition: color 390ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n@media only screen and (min-width: 1281px) {\n.drawer a {\n        -webkit-transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        -moz-transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        -o-transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n.drawer a:hover, .drawer a.active {\n      color: #3F51B5;\n}\n.drawer a:hover .material-icons, .drawer a.active .material-icons {\n        color: #3F51B5;\n}\n.drawer a:hover .arrow, .drawer a.active .arrow {\n        color: initial;\n}\n.drawer a.no-background {\n      background: transparent;\n}\n.drawer a.no-background:hover {\n        background: transparent;\n}\n.drawer .subheader {\n    color: rgba(0, 0, 0, 0.54);\n    font-size: 1rem;\n    font-weight: 500;\n    margin: 0 1.14286rem;\n    height: 3.42857rem;\n    line-height: 3.42857rem;\n}\n.drawer .dropdown {\n    visibility: hidden;\n    -webkit-opacity: 0;\n    opacity: 0;\n    -webkit-transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    -moz-transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    -o-transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n@media only screen and (min-width: 961px) and (max-width: 1280px) {\n.drawer .dropdown {\n        -webkit-transition: all 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        -moz-transition: all 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        -o-transition: all 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        transition: all 390ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n@media only screen and (min-width: 1281px) {\n.drawer .dropdown {\n        -webkit-transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        -moz-transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        -o-transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n.drawer .dropdown a {\n      font-weight: 400;\n      padding: 0 0 0 2.28571rem;\n}\n.drawer .dropdown.expanded {\n      visibility: visible;\n      -webkit-opacity: 1;\n      opacity: 1;\n}\n.drawer .material-icons {\n    width: 1.71429rem;\n    height: 1.71429rem;\n    font-size: 1.71429rem;\n    vertical-align: middle;\n    color: rgba(0, 0, 0, 0.54);\n    margin: 0 2.28571rem 0 0;\n    -webkit-transition: color 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    -moz-transition: color 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    -o-transition: color 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    transition: color 300ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n@media only screen and (min-width: 961px) and (max-width: 1280px) {\n.drawer .material-icons {\n        -webkit-transition: color 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        -moz-transition: color 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        -o-transition: color 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        transition: color 390ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n@media only screen and (min-width: 1281px) {\n.drawer .material-icons {\n        -webkit-transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        -moz-transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        -o-transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n.drawer .drawer-dropdown.expanded .arrow {\n    -webkit-transform: rotate(180deg);\n    -moz-transform: rotate(180deg);\n    -ms-transform: rotate(180deg);\n    -o-transform: rotate(180deg);\n    transform: rotate(180deg);\n}\n.drawer .arrow {\n    position: absolute;\n    right: 1.14286rem;\n    top: 1.14286rem;\n    margin: 0;\n    -webkit-transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    -moz-transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    -o-transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n@media only screen and (orientation: landscape) and (max-width: 960px) {\n.drawer .arrow {\n        top: 0.85714rem;\n}\n}\n@media only screen and (orientation: portrait) and (max-width: 600px) {\n.drawer .arrow {\n        top: 1.14286rem;\n}\n}\n@media only screen and (min-width: 961px) {\n.drawer .arrow {\n        top: 1.42857rem;\n}\n}\n@media only screen and (min-width: 961px) and (max-width: 1280px) {\n.drawer .arrow {\n        -webkit-transition: all 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        -moz-transition: all 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        -o-transition: all 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        transition: all 390ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n@media only screen and (min-width: 1281px) {\n.drawer .arrow {\n        -webkit-transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        -moz-transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        -o-transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n.drawer .divider {\n    margin: 0.57143rem 0;\n    height: 0.07143rem;\n    background: rgba(0, 0, 0, 0.12);\n}\n.drawer .menu {\n    position: fixed;\n    z-index: 4;\n    left: 0.28571rem;\n}\n\n/**************************************\n * Lists\n *\n * https://material.google.com/components/lists.html#\n **************************************/\nol, ul {\n  list-style-type: none;\n  margin: 0;\n  padding: 0;\n}\nol li, ol a, ul li, ul a {\n    color: var(--font-color-2, rgba(0, 0, 0, 0.87));\n    font-size: 1rem;\n    font-weight: 400;\n    height: auto;\n    line-height: 3.42857rem;\n    padding: 0 1.14286rem;\n}\nol a, ul a {\n    height: 3.42857rem;\n}\n\n/**************************************\n * Notifications\n *\n *  https://material.google.com/patterns/notifications.html\n **************************************/\n.notification {\n  -moz-box-shadow: 0rem 0.21429rem 0.21429rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 0.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.57143rem 0rem rgba(0, 0, 0, 0.2);\n  -webkit-box-shadow: 0rem 0.21429rem 0.21429rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 0.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.57143rem 0rem rgba(0, 0, 0, 0.2);\n  -ms-box-shadow: 0rem 0.21429rem 0.21429rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 0.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.57143rem 0rem rgba(0, 0, 0, 0.2);\n  -o-box-shadow: 0rem 0.21429rem 0.21429rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 0.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.57143rem 0rem rgba(0, 0, 0, 0.2);\n  box-shadow: 0rem 0.21429rem 0.21429rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 0.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.57143rem 0rem rgba(0, 0, 0, 0.2);\n  -webkit-border-radius: 0.14286rem;\n  -moz-border-radius: 0.14286rem;\n  -ms-border-radius: 0.14286rem;\n  -o-border-radius: 0.14286rem;\n  border-radius: 0.14286rem;\n  background: var(--background, #FFFFFF);\n  float: left;\n  max-width: 100%;\n  position: relative;\n  width: auto;\n}\n@media only screen and (min-width: 1281px) {\n.notification {\n      -moz-box-shadow: 0rem 0rem 0.14286rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.14286rem 0.14286rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.21429rem 0rem rgba(0, 0, 0, 0.2);\n      -webkit-box-shadow: 0rem 0rem 0.14286rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.14286rem 0.14286rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.21429rem 0rem rgba(0, 0, 0, 0.2);\n      -ms-box-shadow: 0rem 0rem 0.14286rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.14286rem 0.14286rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.21429rem 0rem rgba(0, 0, 0, 0.2);\n      -o-box-shadow: 0rem 0rem 0.14286rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.14286rem 0.14286rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.21429rem 0rem rgba(0, 0, 0, 0.2);\n      box-shadow: 0rem 0rem 0.14286rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.14286rem 0.14286rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.21429rem 0rem rgba(0, 0, 0, 0.2);\n}\n}\n.notification-header {\n    padding: 0.57143rem 0.57143rem 0 0.57143rem;\n    width: 100%;\n}\n.notification-header > div {\n      display: inline-block;\n}\n.notification-header .separator:after {\n      color: rgba(0, 0, 0, 0.54);\n      content: '\\25CF';\n      padding: 0.35714rem;\n}\n.notification-header-app-icon .material-icons {\n      font-size: 1rem;\n      height: auto;\n      width: 1.28571rem;\n}\n.notification-header-text, .notification-header-timestamp {\n      color: rgba(0, 0, 0, 0.54);\n}\n.notification-header-expand .material-icons {\n      font-size: 1rem;\n      width: 1rem;\n      height: 1rem;\n      cursor: pointer;\n      -webkit-transform: rotate(0deg);\n      -moz-transform: rotate(0deg);\n      -ms-transform: rotate(0deg);\n      -o-transform: rotate(0deg);\n      transform: rotate(0deg);\n      -webkit-transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);\n      -moz-transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);\n      -o-transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);\n      transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n@media only screen and (min-width: 961px) and (max-width: 1280px) {\n.notification-header-expand .material-icons {\n          -webkit-transition: transform 390ms cubic-bezier(0.4, 0, 0.2, 1);\n          -moz-transition: transform 390ms cubic-bezier(0.4, 0, 0.2, 1);\n          -o-transition: transform 390ms cubic-bezier(0.4, 0, 0.2, 1);\n          transition: transform 390ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n@media only screen and (min-width: 1281px) {\n.notification-header-expand .material-icons {\n          -webkit-transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1);\n          -moz-transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1);\n          -o-transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1);\n          transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n.notification-content {\n    padding: 0.35714rem 0.57143rem 0.71429rem 0.57143rem;\n    position: relative;\n}\n.notification-content-title, .notification-content .subject {\n      color: rgba(0, 0, 0, 0.87);\n      font-weight: 500;\n}\n.notification-content-text {\n      color: rgba(0, 0, 0, 0.54);\n}\n.notification-actions {\n    background: transparent;\n    -webkit-transition: visibility 300ms cubic-bezier(0.4, 0, 0.2, 1) , opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) , max-height 300ms cubic-bezier(0.4, 0, 0.2, 1) , background 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    -moz-transition: visibility 300ms cubic-bezier(0.4, 0, 0.2, 1) , opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) , max-height 300ms cubic-bezier(0.4, 0, 0.2, 1) , background 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    -o-transition: visibility 300ms cubic-bezier(0.4, 0, 0.2, 1) , opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) , max-height 300ms cubic-bezier(0.4, 0, 0.2, 1) , background 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    transition: visibility 300ms cubic-bezier(0.4, 0, 0.2, 1) , opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) , max-height 300ms cubic-bezier(0.4, 0, 0.2, 1) , background 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    max-height: 0;\n    -webkit-opacity: 0;\n    opacity: 0;\n    visibility: hidden;\n}\n@media only screen and (min-width: 961px) and (max-width: 1280px) {\n.notification-actions {\n        -webkit-transition: visibility 390ms cubic-bezier(0.4, 0, 0.2, 1) , opacity 390ms cubic-bezier(0.4, 0, 0.2, 1) , max-height 390ms cubic-bezier(0.4, 0, 0.2, 1) , background 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        -moz-transition: visibility 390ms cubic-bezier(0.4, 0, 0.2, 1) , opacity 390ms cubic-bezier(0.4, 0, 0.2, 1) , max-height 390ms cubic-bezier(0.4, 0, 0.2, 1) , background 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        -o-transition: visibility 390ms cubic-bezier(0.4, 0, 0.2, 1) , opacity 390ms cubic-bezier(0.4, 0, 0.2, 1) , max-height 390ms cubic-bezier(0.4, 0, 0.2, 1) , background 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        transition: visibility 390ms cubic-bezier(0.4, 0, 0.2, 1) , opacity 390ms cubic-bezier(0.4, 0, 0.2, 1) , max-height 390ms cubic-bezier(0.4, 0, 0.2, 1) , background 390ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n@media only screen and (min-width: 1281px) {\n.notification-actions {\n        -webkit-transition: visibility 200ms cubic-bezier(0.4, 0, 0.2, 1) , opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) , max-height 200ms cubic-bezier(0.4, 0, 0.2, 1) , background 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        -moz-transition: visibility 200ms cubic-bezier(0.4, 0, 0.2, 1) , opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) , max-height 200ms cubic-bezier(0.4, 0, 0.2, 1) , background 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        -o-transition: visibility 200ms cubic-bezier(0.4, 0, 0.2, 1) , opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) , max-height 200ms cubic-bezier(0.4, 0, 0.2, 1) , background 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        transition: visibility 200ms cubic-bezier(0.4, 0, 0.2, 1) , opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) , max-height 200ms cubic-bezier(0.4, 0, 0.2, 1) , background 200ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n.notification-actions > * {\n      display: inline-block;\n      margin: 0 !important;\n      visibility: hidden;\n      -webkit-opacity: 0;\n      opacity: 0;\n      -webkit-transition: visibility 300ms cubic-bezier(0.4, 0, 0.2, 1) , opacity 300ms cubic-bezier(0.4, 0, 0.2, 1);\n      -moz-transition: visibility 300ms cubic-bezier(0.4, 0, 0.2, 1) , opacity 300ms cubic-bezier(0.4, 0, 0.2, 1);\n      -o-transition: visibility 300ms cubic-bezier(0.4, 0, 0.2, 1) , opacity 300ms cubic-bezier(0.4, 0, 0.2, 1);\n      transition: visibility 300ms cubic-bezier(0.4, 0, 0.2, 1) , opacity 300ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n@media only screen and (min-width: 961px) and (max-width: 1280px) {\n.notification-actions > * {\n          -webkit-transition: visibility 390ms cubic-bezier(0.4, 0, 0.2, 1) , opacity 390ms cubic-bezier(0.4, 0, 0.2, 1);\n          -moz-transition: visibility 390ms cubic-bezier(0.4, 0, 0.2, 1) , opacity 390ms cubic-bezier(0.4, 0, 0.2, 1);\n          -o-transition: visibility 390ms cubic-bezier(0.4, 0, 0.2, 1) , opacity 390ms cubic-bezier(0.4, 0, 0.2, 1);\n          transition: visibility 390ms cubic-bezier(0.4, 0, 0.2, 1) , opacity 390ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n@media only screen and (min-width: 1281px) {\n.notification-actions > * {\n          -webkit-transition: visibility 200ms cubic-bezier(0.4, 0, 0.2, 1) , opacity 200ms cubic-bezier(0.4, 0, 0.2, 1);\n          -moz-transition: visibility 200ms cubic-bezier(0.4, 0, 0.2, 1) , opacity 200ms cubic-bezier(0.4, 0, 0.2, 1);\n          -o-transition: visibility 200ms cubic-bezier(0.4, 0, 0.2, 1) , opacity 200ms cubic-bezier(0.4, 0, 0.2, 1);\n          transition: visibility 200ms cubic-bezier(0.4, 0, 0.2, 1) , opacity 200ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n.notification.standard .notification-content > div {\n    width: 75%;\n}\n.notification.standard img {\n    width: 2.85714rem;\n    height: 2.85714rem;\n    max-width: 25%;\n    position: absolute;\n    right: 0.57143rem;\n    -webkit-border-radius: 50%;\n    -moz-border-radius: 50%;\n    -ms-border-radius: 50%;\n    -o-border-radius: 50%;\n    border-radius: 50%;\n    top: 0.35714rem;\n}\n.notification.big-text .notification-content-text {\n    max-height: 0;\n    -webkit-opacity: 0;\n    opacity: 0;\n    visibility: hidden;\n}\n.notification.big-text img {\n    width: 2.85714rem;\n    height: 2.85714rem;\n    position: absolute;\n    right: 0.57143rem;\n    -webkit-border-radius: 50%;\n    -moz-border-radius: 50%;\n    -ms-border-radius: 50%;\n    -o-border-radius: 50%;\n    border-radius: 50%;\n    top: 0.35714rem;\n}\n.notification.big-picture .notification-content {\n    position: relative;\n}\n.notification.big-picture .notification-content-text img {\n      max-width: 100%;\n      visibility: hidden;\n      -webkit-opacity: 0;\n      opacity: 0;\n      width: 0;\n      -webkit-transition: opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) 300ms , visibility 300ms cubic-bezier(0.4, 0, 0.2, 1) 300ms;\n      -moz-transition: opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) 300ms , visibility 300ms cubic-bezier(0.4, 0, 0.2, 1) 300ms;\n      -o-transition: opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) 300ms , visibility 300ms cubic-bezier(0.4, 0, 0.2, 1) 300ms;\n      transition: opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) 300ms , visibility 300ms cubic-bezier(0.4, 0, 0.2, 1) 300ms;\n}\n@media only screen and (min-width: 961px) and (max-width: 1280px) {\n.notification.big-picture .notification-content-text img {\n          -webkit-transition: opacity 390ms cubic-bezier(0.4, 0, 0.2, 1) 390ms , visibility 390ms cubic-bezier(0.4, 0, 0.2, 1) 390ms;\n          -moz-transition: opacity 390ms cubic-bezier(0.4, 0, 0.2, 1) 390ms , visibility 390ms cubic-bezier(0.4, 0, 0.2, 1) 390ms;\n          -o-transition: opacity 390ms cubic-bezier(0.4, 0, 0.2, 1) 390ms , visibility 390ms cubic-bezier(0.4, 0, 0.2, 1) 390ms;\n          transition: opacity 390ms cubic-bezier(0.4, 0, 0.2, 1) 390ms , visibility 390ms cubic-bezier(0.4, 0, 0.2, 1) 390ms;\n}\n}\n@media only screen and (min-width: 1281px) {\n.notification.big-picture .notification-content-text img {\n          -webkit-transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 200ms , visibility 200ms cubic-bezier(0.4, 0, 0.2, 1) 200ms;\n          -moz-transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 200ms , visibility 200ms cubic-bezier(0.4, 0, 0.2, 1) 200ms;\n          -o-transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 200ms , visibility 200ms cubic-bezier(0.4, 0, 0.2, 1) 200ms;\n          transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 200ms , visibility 200ms cubic-bezier(0.4, 0, 0.2, 1) 200ms;\n}\n}\n.notification.big-picture .notification-content > img {\n      width: 2.85714rem;\n      height: 2.85714rem;\n      position: absolute;\n      right: 0.57143rem;\n      top: 0.35714rem;\n      -webkit-opacity: 1;\n      opacity: 1;\n      -webkit-transition: opacity 300ms cubic-bezier(0.4, 0, 0.2, 1);\n      -moz-transition: opacity 300ms cubic-bezier(0.4, 0, 0.2, 1);\n      -o-transition: opacity 300ms cubic-bezier(0.4, 0, 0.2, 1);\n      transition: opacity 300ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n@media only screen and (min-width: 961px) and (max-width: 1280px) {\n.notification.big-picture .notification-content > img {\n          -webkit-transition: opacity 390ms cubic-bezier(0.4, 0, 0.2, 1);\n          -moz-transition: opacity 390ms cubic-bezier(0.4, 0, 0.2, 1);\n          -o-transition: opacity 390ms cubic-bezier(0.4, 0, 0.2, 1);\n          transition: opacity 390ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n@media only screen and (min-width: 1281px) {\n.notification.big-picture .notification-content > img {\n          -webkit-transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1);\n          -moz-transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1);\n          -o-transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1);\n          transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n.notification.progress .notification-content-title, .notification.progress .notification-content-text {\n    display: inline-block;\n    width: 50%;\n}\n.notification.progress .notification-content-text {\n    float: right;\n    text-align: right;\n}\n.notification.media {\n    width: 28.57143rem;\n}\n.notification.media .notification-content {\n      -webkit-transition: height 300ms cubic-bezier(0.4, 0, 0.2, 1);\n      -moz-transition: height 300ms cubic-bezier(0.4, 0, 0.2, 1);\n      -o-transition: height 300ms cubic-bezier(0.4, 0, 0.2, 1);\n      transition: height 300ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n@media only screen and (min-width: 961px) and (max-width: 1280px) {\n.notification.media .notification-content {\n          -webkit-transition: height 390ms cubic-bezier(0.4, 0, 0.2, 1);\n          -moz-transition: height 390ms cubic-bezier(0.4, 0, 0.2, 1);\n          -o-transition: height 390ms cubic-bezier(0.4, 0, 0.2, 1);\n          transition: height 390ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n@media only screen and (min-width: 1281px) {\n.notification.media .notification-content {\n          -webkit-transition: height 200ms cubic-bezier(0.4, 0, 0.2, 1);\n          -moz-transition: height 200ms cubic-bezier(0.4, 0, 0.2, 1);\n          -o-transition: height 200ms cubic-bezier(0.4, 0, 0.2, 1);\n          transition: height 200ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n.notification.media .actions {\n      left: auto;\n      position: absolute;\n      right: 3.42857rem;\n      text-align: right;\n      top: 0.35714rem;\n      width: calc(2.5rem * 4);\n      -webkit-transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);\n      -moz-transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);\n      -o-transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);\n      transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n@media only screen and (min-width: 961px) and (max-width: 1280px) {\n.notification.media .actions {\n          -webkit-transition: all 390ms cubic-bezier(0.4, 0, 0.2, 1);\n          -moz-transition: all 390ms cubic-bezier(0.4, 0, 0.2, 1);\n          -o-transition: all 390ms cubic-bezier(0.4, 0, 0.2, 1);\n          transition: all 390ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n@media only screen and (min-width: 1281px) {\n.notification.media .actions {\n          -webkit-transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);\n          -moz-transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);\n          -o-transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);\n          transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n.notification.media .actions .material-icons {\n        width: 2.5rem;\n        height: 2.5rem;\n        color: rgba(0, 0, 0, 0.54);\n        font-size: 2.5rem;\n        line-height: calc((1.42857rem * 2));\n}\n.notification.media .actions .material-icons:first-of-type, .notification.media .actions .material-icons:last-of-type {\n          visibility: hidden;\n          -webkit-opacity: 0;\n          opacity: 0;\n          width: 0;\n          -webkit-transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);\n          -moz-transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);\n          -o-transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);\n          transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n@media only screen and (min-width: 961px) and (max-width: 1280px) {\n.notification.media .actions .material-icons:first-of-type, .notification.media .actions .material-icons:last-of-type {\n              -webkit-transition: all 390ms cubic-bezier(0.4, 0, 0.2, 1);\n              -moz-transition: all 390ms cubic-bezier(0.4, 0, 0.2, 1);\n              -o-transition: all 390ms cubic-bezier(0.4, 0, 0.2, 1);\n              transition: all 390ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n@media only screen and (min-width: 1281px) {\n.notification.media .actions .material-icons:first-of-type, .notification.media .actions .material-icons:last-of-type {\n              -webkit-transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);\n              -moz-transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);\n              -o-transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);\n              transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n.notification.media img {\n      width: 2.85714rem;\n      height: 2.85714rem;\n      position: absolute;\n      right: 0.57143rem;\n      top: 0.35714rem;\n      -webkit-transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);\n      -moz-transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);\n      -o-transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);\n      transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n@media only screen and (min-width: 961px) and (max-width: 1280px) {\n.notification.media img {\n          -webkit-transition: all 390ms cubic-bezier(0.4, 0, 0.2, 1);\n          -moz-transition: all 390ms cubic-bezier(0.4, 0, 0.2, 1);\n          -o-transition: all 390ms cubic-bezier(0.4, 0, 0.2, 1);\n          transition: all 390ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n@media only screen and (min-width: 1281px) {\n.notification.media img {\n          -webkit-transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);\n          -moz-transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);\n          -o-transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);\n          transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n.notification.expanded .notification-actions {\n    background: #EEEEEE;\n    -webkit-opacity: 1;\n    opacity: 1;\n    max-height: 142.85714rem;\n    visibility: visible;\n}\n.notification.expanded .notification-actions > * {\n      visibility: visible;\n      -webkit-opacity: 1;\n      opacity: 1;\n}\n.notification.expanded .notification-header-expand .material-icons {\n    -webkit-transform: rotate(180deg);\n    -moz-transform: rotate(180deg);\n    -ms-transform: rotate(180deg);\n    -o-transform: rotate(180deg);\n    transform: rotate(180deg);\n}\n.notification.expanded.big-text .notification-content-text {\n    max-height: 142.85714rem;\n    -webkit-opacity: 1;\n    opacity: 1;\n    visibility: visible;\n}\n.notification.expanded.big-picture .notification-content-text img {\n    visibility: visible;\n    -webkit-opacity: 1;\n    opacity: 1;\n    width: 100%;\n}\n.notification.expanded.big-picture .notification-content > img {\n    -webkit-opacity: 0;\n    opacity: 0;\n}\n.notification.expanded.media .notification-content {\n    height: calc((1.42857rem * 2) + 2.5rem + 0.35714rem + 0.71429rem);\n}\n.notification.expanded.media .notification-content .actions {\n      left: 0.57143rem;\n      text-align: left;\n      right: auto;\n      top: calc(1.42857rem * 2);\n      width: calc(2.5rem * 6);\n}\n.notification.expanded.media .notification-content .actions .material-icons:first-of-type, .notification.expanded.media .notification-content .actions :last-of-type {\n        visibility: visible;\n        width: 2.5rem;\n        height: 2.5rem;\n        -webkit-opacity: 1;\n        opacity: 1;\n}\n.notification.expanded.media .notification-content img {\n      width: calc((1.42857rem * 2) + 2.5rem);\n      height: calc((1.42857rem * 2) + 2.5rem);\n}\n\n/**************************************\n * Pickers\n *\n * https://material.google.com/components/pickers.html\n***************************************/\n.picker {\n  -moz-box-shadow: 0rem 1.71429rem 2.71429rem 0.21429rem rgba(0, 0, 0, 0.14) , 0rem 0.64286rem 3.28571rem 0.57143rem rgba(0, 0, 0, 0.12) , 0rem 0.78571rem 1.07143rem 0rem rgba(0, 0, 0, 0.2);\n  -webkit-box-shadow: 0rem 1.71429rem 2.71429rem 0.21429rem rgba(0, 0, 0, 0.14) , 0rem 0.64286rem 3.28571rem 0.57143rem rgba(0, 0, 0, 0.12) , 0rem 0.78571rem 1.07143rem 0rem rgba(0, 0, 0, 0.2);\n  -ms-box-shadow: 0rem 1.71429rem 2.71429rem 0.21429rem rgba(0, 0, 0, 0.14) , 0rem 0.64286rem 3.28571rem 0.57143rem rgba(0, 0, 0, 0.12) , 0rem 0.78571rem 1.07143rem 0rem rgba(0, 0, 0, 0.2);\n  -o-box-shadow: 0rem 1.71429rem 2.71429rem 0.21429rem rgba(0, 0, 0, 0.14) , 0rem 0.64286rem 3.28571rem 0.57143rem rgba(0, 0, 0, 0.12) , 0rem 0.78571rem 1.07143rem 0rem rgba(0, 0, 0, 0.2);\n  box-shadow: 0rem 1.71429rem 2.71429rem 0.21429rem rgba(0, 0, 0, 0.14) , 0rem 0.64286rem 3.28571rem 0.57143rem rgba(0, 0, 0, 0.12) , 0rem 0.78571rem 1.07143rem 0rem rgba(0, 0, 0, 0.2);\n  -webkit-border-radius: var(--border-size, 0.14286rem);\n  -moz-border-radius: var(--border-size, 0.14286rem);\n  -ms-border-radius: var(--border-size, 0.14286rem);\n  -o-border-radius: var(--border-size, 0.14286rem);\n  border-radius: var(--border-size, 0.14286rem);\n  background: var(--background, #FFFFFF);\n  width: 100%;\n}\n.picker-titlebar {\n    -webkit-border-top-left-radius: var(--border-size, 0.14286rem);\n    -moz-border-radius-topleft: var(--border-size, 0.14286rem);\n    border-top-left-radius: var(--border-size, 0.14286rem);\n    -webkit-border-top-right-radius: var(--border-size, 0.14286rem);\n    -moz-border-radius-topright: var(--border-size, 0.14286rem);\n    border-top-right-radius: var(--border-size, 0.14286rem);\n    background: var(--main-color, #3F51B5);\n    color: rgba(255, 255, 255, 0.54);\n    padding: 1.71429rem;\n}\n.picker-titlebar-year {\n      font-size: 1.14286rem;\n      line-height: 1.42857rem;\n}\n.picker-titlebar-date {\n      font-size: 1.71429rem;\n      line-height: 2.14286rem;\n}\n.picker .active {\n    color: #FFFFFF;\n}\n\n/**************************************\n * Progress & activity\n *\n * http://www.google.com/design/spec/components/progress-activity.html\n **************************************/\n.determinate, .indeterminate, .buffer {\n  width: 100%;\n  height: 0.35714rem;\n  position: relative;\n}\n.determinate {\n  background: rgba(63, 81, 181, 0.4);\n}\n.progressbar {\n  background: var(--main-color, #3F51B5);\n  -webkit-transition: width 300ms cubic-bezier(0.4, 0, 0.2, 1);\n  -moz-transition: width 300ms cubic-bezier(0.4, 0, 0.2, 1);\n  -o-transition: width 300ms cubic-bezier(0.4, 0, 0.2, 1);\n  transition: width 300ms cubic-bezier(0.4, 0, 0.2, 1);\n  bottom: 0;\n  position: absolute;\n  top: 0;\n  width: 0%;\n}\n.indeterminate {\n  background: rgba(63, 81, 181, 0.4);\n  overflow: hidden;\n}\n.indeterminate .progressbar {\n    width: 60%;\n    -webkit-animation: indeterminate 1.5s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;\n    -moz-animation: indeterminate 1.5s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;\n    -ms-animation: indeterminate 1.5s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;\n    -o-animation: indeterminate 1.5s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;\n    animation: indeterminate 1.5s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;\n}\n@-webkit-keyframes indeterminate {\n0% {\n    left: 0;\n    width: 0%;\n}\n25% {\n    width: 60%;\n}\n50% {\n    width: 60%;\n}\n75% {\n    left: 75%;\n    width: 60%;\n}\n100% {\n    left: 100%;\n    width: 0%;\n}\n}\n@-moz-keyframes indeterminate {\n0% {\n    left: 0;\n    width: 0%;\n}\n25% {\n    width: 60%;\n}\n50% {\n    width: 60%;\n}\n75% {\n    left: 75%;\n    width: 60%;\n}\n100% {\n    left: 100%;\n    width: 0%;\n}\n}\n@-o-keyframes indeterminate {\n0% {\n    left: 0;\n    width: 0%;\n}\n25% {\n    width: 60%;\n}\n50% {\n    width: 60%;\n}\n75% {\n    left: 75%;\n    width: 60%;\n}\n100% {\n    left: 100%;\n    width: 0%;\n}\n}\n@keyframes indeterminate {\n0% {\n    left: 0;\n    width: 0%;\n}\n25% {\n    width: 60%;\n}\n50% {\n    width: 60%;\n}\n75% {\n    left: 75%;\n    width: 60%;\n}\n100% {\n    left: 100%;\n    width: 0%;\n}\n}\n.buffer {\n  overflow: hidden;\n}\n.buffer > div {\n    display: inline-block;\n}\n.buffer .buffer-progress {\n    background: rgba(63, 81, 181, 0.4);\n    bottom: 0;\n    position: absolute;\n    top: 0;\n}\n.buffer .buffering {\n    background-image: linear-gradient(to right, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), linear-gradient(to right, #3F51B5, #3F51B5);\n    bottom: 0;\n    position: absolute;\n    -webkit-mask: url(\"data:image/svg+xml;base64, PD94bWwgdmVyc2lvbj0iMS4wIj8+PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTBweCIgdmlld1BvcnQ9IjAgMCAxMiA0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGVsbGlwc2UgY3g9IjIiIGN5PSIyIiByeD0iMiIgcnk9IjIiPjwvZWxsaXBzZT48ZWxsaXBzZSBjeD0iMTQiIGN5PSIyIiByeD0iMiIgcnk9IjIiIGNsYXNzPSJsb2FkZXIiPjwvZWxsaXBzZT48L3N2Zz4=\");\n    mask: url(\"data:image/svg+xml;base64, PD94bWwgdmVyc2lvbj0iMS4wIj8+PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTBweCIgdmlld1BvcnQ9IjAgMCAxMiA0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGVsbGlwc2UgY3g9IjIiIGN5PSIyIiByeD0iMiIgcnk9IjIiPjwvZWxsaXBzZT48ZWxsaXBzZSBjeD0iMTQiIGN5PSIyIiByeD0iMiIgcnk9IjIiIGNsYXNzPSJsb2FkZXIiPjwvZWxsaXBzZT48L3N2Zz4=\");\n    top: 0;\n    -webkit-animation: buffer 1.5s linear infinite;\n    -moz-animation: buffer 1.5s linear infinite;\n    -ms-animation: buffer 1.5s linear infinite;\n    -o-animation: buffer 1.5s linear infinite;\n    animation: buffer 1.5s linear infinite;\n}\n@-webkit-keyframes buffer {\n0% {\n    width: 200%;\n    left: 100%;\n}\n100% {\n    left: auto;\n}\n}\n@-moz-keyframes buffer {\n0% {\n    width: 200%;\n    left: 100%;\n}\n100% {\n    left: auto;\n}\n}\n@-o-keyframes buffer {\n0% {\n    width: 200%;\n    left: 100%;\n}\n100% {\n    left: auto;\n}\n}\n@keyframes buffer {\n0% {\n    width: 200%;\n    left: 100%;\n}\n100% {\n    left: auto;\n}\n}\n.circular {\n  position: relative;\n  margin: 0 auto;\n  width: 3.57143rem;\n}\n.circular:before {\n    content: '';\n    display: block;\n    padding-top: 100%;\n}\n.circular svg {\n    -webkit-animation: rotate 2s linear infinite;\n    -moz-animation: rotate 2s linear infinite;\n    -ms-animation: rotate 2s linear infinite;\n    -o-animation: rotate 2s linear infinite;\n    animation: rotate 2s linear infinite;\n    -webkit-transform-origin: center center;\n    -moz-transform-origin: center center;\n    -ms-transform-origin: center center;\n    -o-transform-origin: center center;\n    height: 100%;\n    width: 100%;\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    margin: auto;\n}\n.circular circle {\n    -webkit-animation: dash 1.5s ease-in-out infinite , color 6s ease-in-out infinite;\n    -moz-animation: dash 1.5s ease-in-out infinite , color 6s ease-in-out infinite;\n    -ms-animation: dash 1.5s ease-in-out infinite , color 6s ease-in-out infinite;\n    -o-animation: dash 1.5s ease-in-out infinite , color 6s ease-in-out infinite;\n    animation: dash 1.5s ease-in-out infinite , color 6s ease-in-out infinite;\n    stroke-dasharray: 1, 200;\n    stroke-dashoffset: 0;\n    stroke-width: 0.35714rem;\n    r: 20;\n}\n@-webkit-keyframes rotate {\n100% {\n    transform: rotate(360deg);\n}\n}\n@-moz-keyframes rotate {\n100% {\n    transform: rotate(360deg);\n}\n}\n@-o-keyframes rotate {\n100% {\n    transform: rotate(360deg);\n}\n}\n@keyframes rotate {\n100% {\n    transform: rotate(360deg);\n}\n}\n@-webkit-keyframes dash {\n0% {\n    stroke-dasharray: 1, 200;\n    stroke-dashoffset: 0;\n}\n50% {\n    stroke-dasharray: 89, 200;\n    stroke-dashoffset: -2.5rem;\n}\n100% {\n    stroke-dasharray: 89, 200;\n    stroke-dashoffset: -8.85714rem;\n}\n}\n@-moz-keyframes dash {\n0% {\n    stroke-dasharray: 1, 200;\n    stroke-dashoffset: 0;\n}\n50% {\n    stroke-dasharray: 89, 200;\n    stroke-dashoffset: -2.5rem;\n}\n100% {\n    stroke-dasharray: 89, 200;\n    stroke-dashoffset: -8.85714rem;\n}\n}\n@-o-keyframes dash {\n0% {\n    stroke-dasharray: 1, 200;\n    stroke-dashoffset: 0;\n}\n50% {\n    stroke-dasharray: 89, 200;\n    stroke-dashoffset: -2.5rem;\n}\n100% {\n    stroke-dasharray: 89, 200;\n    stroke-dashoffset: -8.85714rem;\n}\n}\n@keyframes dash {\n0% {\n    stroke-dasharray: 1, 200;\n    stroke-dashoffset: 0;\n}\n50% {\n    stroke-dasharray: 89, 200;\n    stroke-dashoffset: -2.5rem;\n}\n100% {\n    stroke-dasharray: 89, 200;\n    stroke-dashoffset: -8.85714rem;\n}\n}\n@-webkit-keyframes color {\n100%,\n  0% {\n    stroke: #F44336;\n}\n40% {\n    stroke: #4CAF50;\n}\n66% {\n    stroke: #3F51B5;\n}\n80%,\n  90% {\n    stroke: #FF9800;\n}\n}\n@-moz-keyframes color {\n100%,\n  0% {\n    stroke: #F44336;\n}\n40% {\n    stroke: #4CAF50;\n}\n66% {\n    stroke: #3F51B5;\n}\n80%,\n  90% {\n    stroke: #FF9800;\n}\n}\n@-o-keyframes color {\n100%,\n  0% {\n    stroke: #F44336;\n}\n40% {\n    stroke: #4CAF50;\n}\n66% {\n    stroke: #3F51B5;\n}\n80%,\n  90% {\n    stroke: #FF9800;\n}\n}\n@keyframes color {\n100%,\n  0% {\n    stroke: #F44336;\n}\n40% {\n    stroke: #4CAF50;\n}\n66% {\n    stroke: #3F51B5;\n}\n80%,\n  90% {\n    stroke: #FF9800;\n}\n}\n\n/**************************************\n * Selection controls\n *\n * http://www.google.com/design/spec/components/selection-controls.html\n **************************************/\n.checkbox, .radio {\n  -webkit-opacity: 0;\n  opacity: 0;\n  left: -102%;\n  position: absolute;\n}\n.checkbox + label, .radio + label {\n    padding: 0 0.35714rem 0 0.71429rem;\n}\n.checkbox + label:before, .radio + label:before {\n      content: '';\n      display: inline-block;\n      background: transparent;\n      border: 0.14286rem solid rgba(0, 0, 0, 0.54);\n      width: 0.92857rem;\n      height: 0.92857rem;\n      font-family: 'Material Icons';\n      position: relative;\n      vertical-align: middle;\n      left: 0;\n      line-height: 0.92857rem;\n}\n.checkbox {\n  /*@media only screen and (max-width: 1280px) {\n\t\t\t&:active + label:after {\n\t\t\t\tdisplay: inline-block;\n\t\t\t\tcontent: '';\n\t\t\t\t@include square(calc(0.92857rem * 2));\n\t\t\t\t@include border-radius(50%);\n\t\t\t\tposition: relative;\n\t\t\t\ttop: $selection-size;\n\t\t\t\tleft: calc(0.92857rem * -2);\n\t\t\t\tbackground: rgba($black, .2);\n\t\t\t}\n\n\t\t\t&:checked:active + label:after {\n\t\t\t\tbackground: rgba($main-color, .2);\n\t\t\t}\n\t\t}*/\n}\n.checkbox + label:before {\n    -webkit-border-radius: 0.14286rem;\n    -moz-border-radius: 0.14286rem;\n    -ms-border-radius: 0.14286rem;\n    -o-border-radius: 0.14286rem;\n    border-radius: 0.14286rem;\n    -webkit-transition: background 300ms cubic-bezier(0.4, 0, 0.2, 1) , content 300ms cubic-bezier(0.4, 0, 0.2, 1) , border 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    -moz-transition: background 300ms cubic-bezier(0.4, 0, 0.2, 1) , content 300ms cubic-bezier(0.4, 0, 0.2, 1) , border 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    -o-transition: background 300ms cubic-bezier(0.4, 0, 0.2, 1) , content 300ms cubic-bezier(0.4, 0, 0.2, 1) , border 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    transition: background 300ms cubic-bezier(0.4, 0, 0.2, 1) , content 300ms cubic-bezier(0.4, 0, 0.2, 1) , border 300ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n@media only screen and (min-width: 961px) and (max-width: 1280px) {\n.checkbox + label:before {\n        -webkit-transition: background 390ms cubic-bezier(0.4, 0, 0.2, 1) , content 390ms cubic-bezier(0.4, 0, 0.2, 1) , border 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        -moz-transition: background 390ms cubic-bezier(0.4, 0, 0.2, 1) , content 390ms cubic-bezier(0.4, 0, 0.2, 1) , border 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        -o-transition: background 390ms cubic-bezier(0.4, 0, 0.2, 1) , content 390ms cubic-bezier(0.4, 0, 0.2, 1) , border 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        transition: background 390ms cubic-bezier(0.4, 0, 0.2, 1) , content 390ms cubic-bezier(0.4, 0, 0.2, 1) , border 390ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n@media only screen and (min-width: 1281px) {\n.checkbox + label:before {\n        -webkit-transition: background 200ms cubic-bezier(0.4, 0, 0.2, 1) , content 200ms cubic-bezier(0.4, 0, 0.2, 1) , border 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        -moz-transition: background 200ms cubic-bezier(0.4, 0, 0.2, 1) , content 200ms cubic-bezier(0.4, 0, 0.2, 1) , border 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        -o-transition: background 200ms cubic-bezier(0.4, 0, 0.2, 1) , content 200ms cubic-bezier(0.4, 0, 0.2, 1) , border 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        transition: background 200ms cubic-bezier(0.4, 0, 0.2, 1) , content 200ms cubic-bezier(0.4, 0, 0.2, 1) , border 200ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n.checkbox:checked + label:before {\n    background: #3f51b5;\n    border: 0.14286rem solid #3f51b5;\n    content: '\\E5CA';\n    color: var(--background, #FFFFFF);\n}\n.checkbox:disabled + label:before {\n    border: 0.14286rem solid rgba(0, 0, 0, 0.26);\n}\n.checkbox:disabled:checked + label:before {\n    background: rgba(0, 0, 0, 0.26);\n    border: none;\n    width: 1.21429rem;\n    height: 1.21429rem;\n    line-height: 1.21429rem;\n    text-align: center;\n}\n.radio + label:before {\n  -webkit-border-radius: 50%;\n  -moz-border-radius: 50%;\n  -ms-border-radius: 50%;\n  -o-border-radius: 50%;\n  border-radius: 50%;\n  -webkit-transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);\n  -moz-transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);\n  -o-transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);\n  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n@media only screen and (min-width: 961px) and (max-width: 1280px) {\n.radio + label:before {\n      -webkit-transition: all 390ms cubic-bezier(0.4, 0, 0.2, 1);\n      -moz-transition: all 390ms cubic-bezier(0.4, 0, 0.2, 1);\n      -o-transition: all 390ms cubic-bezier(0.4, 0, 0.2, 1);\n      transition: all 390ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n@media only screen and (min-width: 1281px) {\n.radio + label:before {\n      -webkit-transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);\n      -moz-transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);\n      -o-transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);\n      transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n.radio + label:after {\n  display: inline-block;\n  position: relative;\n  top: -0.30952rem;\n  left: -0.61905rem;\n  width: 0;\n  height: 0;\n  content: '';\n  -webkit-border-radius: 50%;\n  -moz-border-radius: 50%;\n  -ms-border-radius: 50%;\n  -o-border-radius: 50%;\n  border-radius: 50%;\n  -webkit-transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);\n  -moz-transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);\n  -o-transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);\n  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n@media only screen and (min-width: 961px) and (max-width: 1280px) {\n.radio + label:after {\n      -webkit-transition: all 390ms cubic-bezier(0.4, 0, 0.2, 1);\n      -moz-transition: all 390ms cubic-bezier(0.4, 0, 0.2, 1);\n      -o-transition: all 390ms cubic-bezier(0.4, 0, 0.2, 1);\n      transition: all 390ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n@media only screen and (min-width: 1281px) {\n.radio + label:after {\n      -webkit-transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);\n      -moz-transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);\n      -o-transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);\n      transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n.radio:checked + label:before {\n  border: 0.14286rem solid #3f51b5;\n}\n.radio:checked + label:after {\n  background: #3f51b5;\n  top: 0.07143rem;\n  left: -0.92857rem;\n  width: 0.61905rem;\n  height: 0.61905rem;\n  margin: 0 -0.61905rem 0 0;\n}\n.radio:disabled + label:before {\n  border: 0.14286rem solid rgba(0, 0, 0, 0.26);\n}\n.radio:disabled:checked + label:after {\n  background: rgba(0, 0, 0, 0.26);\n}\n.switch .lever {\n  background: rgba(0, 0, 0, 0.38);\n  display: inline-block;\n  height: 0.85714rem;\n  margin: 1rem;\n  -webkit-border-radius: 0.85714rem;\n  -moz-border-radius: 0.85714rem;\n  -ms-border-radius: 0.85714rem;\n  -o-border-radius: 0.85714rem;\n  border-radius: 0.85714rem;\n  position: relative;\n  vertical-align: middle;\n  width: 1.71429rem;\n  -webkit-transition: background 300ms cubic-bezier(0.4, 0, 0.2, 1);\n  -moz-transition: background 300ms cubic-bezier(0.4, 0, 0.2, 1);\n  -o-transition: background 300ms cubic-bezier(0.4, 0, 0.2, 1);\n  transition: background 300ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n@media only screen and (min-width: 961px) and (max-width: 1280px) {\n.switch .lever {\n      -webkit-transition: background 390ms cubic-bezier(0.4, 0, 0.2, 1);\n      -moz-transition: background 390ms cubic-bezier(0.4, 0, 0.2, 1);\n      -o-transition: background 390ms cubic-bezier(0.4, 0, 0.2, 1);\n      transition: background 390ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n@media only screen and (min-width: 1281px) {\n.switch .lever {\n      -webkit-transition: background 200ms cubic-bezier(0.4, 0, 0.2, 1);\n      -moz-transition: background 200ms cubic-bezier(0.4, 0, 0.2, 1);\n      -o-transition: background 200ms cubic-bezier(0.4, 0, 0.2, 1);\n      transition: background 200ms cubic-bezier(0.4, 0, 0.2, 1);\n      margin: 0;\n}\n}\n.switch .lever:after {\n    -moz-box-shadow: 0rem 0rem 0.14286rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.14286rem 0.14286rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.21429rem 0rem rgba(0, 0, 0, 0.2);\n    -webkit-box-shadow: 0rem 0rem 0.14286rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.14286rem 0.14286rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.21429rem 0rem rgba(0, 0, 0, 0.2);\n    -ms-box-shadow: 0rem 0rem 0.14286rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.14286rem 0.14286rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.21429rem 0rem rgba(0, 0, 0, 0.2);\n    -o-box-shadow: 0rem 0rem 0.14286rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.14286rem 0.14286rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.21429rem 0rem rgba(0, 0, 0, 0.2);\n    box-shadow: 0rem 0rem 0.14286rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.14286rem 0.14286rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.21429rem 0rem rgba(0, 0, 0, 0.2);\n    background: #fafafa;\n    content: '';\n    -webkit-border-radius: 50%;\n    -moz-border-radius: 50%;\n    -ms-border-radius: 50%;\n    -o-border-radius: 50%;\n    border-radius: 50%;\n    height: 1rem;\n    left: 0;\n    position: absolute;\n    top: -0.07143rem;\n    width: 1rem;\n    -webkit-transition: background 300ms cubic-bezier(0.4, 0, 0.2, 1) , left 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    -moz-transition: background 300ms cubic-bezier(0.4, 0, 0.2, 1) , left 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    -o-transition: background 300ms cubic-bezier(0.4, 0, 0.2, 1) , left 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    transition: background 300ms cubic-bezier(0.4, 0, 0.2, 1) , left 300ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n@media only screen and (min-width: 961px) and (max-width: 1280px) {\n.switch .lever:after {\n        -webkit-transition: background 390ms cubic-bezier(0.4, 0, 0.2, 1) , left 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        -moz-transition: background 390ms cubic-bezier(0.4, 0, 0.2, 1) , left 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        -o-transition: background 390ms cubic-bezier(0.4, 0, 0.2, 1) , left 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        transition: background 390ms cubic-bezier(0.4, 0, 0.2, 1) , left 390ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n@media only screen and (min-width: 1281px) {\n.switch .lever:after {\n        -webkit-transition: background 200ms cubic-bezier(0.4, 0, 0.2, 1) , left 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        -moz-transition: background 200ms cubic-bezier(0.4, 0, 0.2, 1) , left 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        -o-transition: background 200ms cubic-bezier(0.4, 0, 0.2, 1) , left 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        transition: background 200ms cubic-bezier(0.4, 0, 0.2, 1) , left 200ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n@media only screen and (max-width: 1280px) {\n.switch .lever:before {\n      content: '';\n      width: 1rem;\n      height: 1rem;\n      -webkit-border-radius: 50%;\n      -moz-border-radius: 50%;\n      -ms-border-radius: 50%;\n      -o-border-radius: 50%;\n      border-radius: 50%;\n      left: 0.71429rem;\n      position: absolute;\n      top: -0.07143rem;\n      -webkit-transition: background 300ms cubic-bezier(0.4, 0, 0.2, 1) , left 300ms cubic-bezier(0.4, 0, 0.2, 1) , width 300ms cubic-bezier(0.4, 0, 0.2, 1) , height 300ms cubic-bezier(0.4, 0, 0.2, 1) , top 300ms cubic-bezier(0.4, 0, 0.2, 1);\n      -moz-transition: background 300ms cubic-bezier(0.4, 0, 0.2, 1) , left 300ms cubic-bezier(0.4, 0, 0.2, 1) , width 300ms cubic-bezier(0.4, 0, 0.2, 1) , height 300ms cubic-bezier(0.4, 0, 0.2, 1) , top 300ms cubic-bezier(0.4, 0, 0.2, 1);\n      -o-transition: background 300ms cubic-bezier(0.4, 0, 0.2, 1) , left 300ms cubic-bezier(0.4, 0, 0.2, 1) , width 300ms cubic-bezier(0.4, 0, 0.2, 1) , height 300ms cubic-bezier(0.4, 0, 0.2, 1) , top 300ms cubic-bezier(0.4, 0, 0.2, 1);\n      transition: background 300ms cubic-bezier(0.4, 0, 0.2, 1) , left 300ms cubic-bezier(0.4, 0, 0.2, 1) , width 300ms cubic-bezier(0.4, 0, 0.2, 1) , height 300ms cubic-bezier(0.4, 0, 0.2, 1) , top 300ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n@media only screen and (max-width: 1280px) and (min-width: 961px) and (max-width: 1280px) {\n.switch .lever:before {\n      -webkit-transition: background 390ms cubic-bezier(0.4, 0, 0.2, 1) , left 390ms cubic-bezier(0.4, 0, 0.2, 1) , width 390ms cubic-bezier(0.4, 0, 0.2, 1) , height 390ms cubic-bezier(0.4, 0, 0.2, 1) , top 390ms cubic-bezier(0.4, 0, 0.2, 1);\n      -moz-transition: background 390ms cubic-bezier(0.4, 0, 0.2, 1) , left 390ms cubic-bezier(0.4, 0, 0.2, 1) , width 390ms cubic-bezier(0.4, 0, 0.2, 1) , height 390ms cubic-bezier(0.4, 0, 0.2, 1) , top 390ms cubic-bezier(0.4, 0, 0.2, 1);\n      -o-transition: background 390ms cubic-bezier(0.4, 0, 0.2, 1) , left 390ms cubic-bezier(0.4, 0, 0.2, 1) , width 390ms cubic-bezier(0.4, 0, 0.2, 1) , height 390ms cubic-bezier(0.4, 0, 0.2, 1) , top 390ms cubic-bezier(0.4, 0, 0.2, 1);\n      transition: background 390ms cubic-bezier(0.4, 0, 0.2, 1) , left 390ms cubic-bezier(0.4, 0, 0.2, 1) , width 390ms cubic-bezier(0.4, 0, 0.2, 1) , height 390ms cubic-bezier(0.4, 0, 0.2, 1) , top 390ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n@media only screen and (max-width: 1280px) {\n.switch .lever:active:before, .switch .lever:focus:before {\n      background: rgba(189, 189, 189, 0.2);\n      width: 2rem;\n      height: 2rem;\n      left: -0.5rem;\n      top: -0.57143rem;\n}\n}\n.switch input[type=\"checkbox\"] {\n  display: none;\n}\n.switch input[type=\"checkbox\"]:checked + .lever {\n    background: rgba(63, 81, 181, 0.5);\n}\n.switch input[type=\"checkbox\"]:checked + .lever:after {\n      background: #3f51b5;\n      left: 0.71429rem;\n}\n@media only screen and (max-width: 1280px) {\n.switch input[type=\"checkbox\"]:checked + .lever:active:before, .switch input[type=\"checkbox\"]:checked + .lever:focus:before {\n        left: 0.21429rem;\n        background: rgba(63, 81, 181, 0.2);\n}\n}\n.switch input[type=\"checkbox\"]:disabled + .lever {\n    background: rgba(0, 0, 0, 0.12);\n}\n.switch input[type=\"checkbox\"]:disabled + .lever:after {\n      background: #bdbdbd;\n}\n@media only screen and (max-width: 1280px) {\n.switch input[type=\"checkbox\"]:disabled + .lever:active:before, .switch input[type=\"checkbox\"]:disabled + .lever:focus:before {\n        background: rgba(189, 189, 189, 0.2);\n}\n}\n\n/**************************************\n * Sliders\n *\n * http://www.google.com/design/spec/components/sliders.html\n **************************************/\ninput[type=\"range\"] {\n  background: #bdbdbd;\n  height: 0.14286rem;\n  margin: 0;\n  outline: none;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none;\n}\ninput[type=\"range\"]:hover {\n    cursor: pointer;\n}\ninput[type=\"range\"]::-webkit-slider-runnable-track {\n    -webkit-appearance: none;\n    -moz-appearance: none;\n    appearance: none;\n    height: 0.14286rem;\n    -webkit-transition: background 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    -moz-transition: background 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    -o-transition: background 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    transition: background 300ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n@media only screen and (min-width: 1281px) {\ninput[type=\"range\"]::-webkit-slider-runnable-track {\n        -webkit-transition: background 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        -moz-transition: background 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        -o-transition: background 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        transition: background 390ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n@media only screen and (min-width: 1601px) {\ninput[type=\"range\"]::-webkit-slider-runnable-track {\n        -webkit-transition: background 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        -moz-transition: background 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        -o-transition: background 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        transition: background 200ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\ninput[type=\"range\"]::-webkit-slider-runnable-track:focus, input[type=\"range\"]::-webkit-slider-runnable-track:active {\n      background: var(--main-color, #3F51B5);\n}\ninput[type=\"range\"]::-moz-range-track {\n    -webkit-appearance: none;\n    -moz-appearance: none;\n    appearance: none;\n    height: 0.14286rem;\n    -webkit-transition: background 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    -moz-transition: background 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    -o-transition: background 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    transition: background 300ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n@media only screen and (min-width: 1281px) {\ninput[type=\"range\"]::-moz-range-track {\n        -webkit-transition: background 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        -moz-transition: background 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        -o-transition: background 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        transition: background 390ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n@media only screen and (min-width: 1601px) {\ninput[type=\"range\"]::-moz-range-track {\n        -webkit-transition: background 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        -moz-transition: background 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        -o-transition: background 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        transition: background 200ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\ninput[type=\"range\"]::-moz-range-track:focus, input[type=\"range\"]::-moz-range-track:active {\n      background: var(--main-color, #3F51B5);\n}\ninput[type=\"range\"]::-ms-track {\n    -webkit-appearance: none;\n    -moz-appearance: none;\n    appearance: none;\n    height: 0.14286rem;\n    -webkit-transition: background 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    -moz-transition: background 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    -o-transition: background 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    transition: background 300ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n@media only screen and (min-width: 1281px) {\ninput[type=\"range\"]::-ms-track {\n        -webkit-transition: background 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        -moz-transition: background 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        -o-transition: background 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        transition: background 390ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n@media only screen and (min-width: 1601px) {\ninput[type=\"range\"]::-ms-track {\n        -webkit-transition: background 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        -moz-transition: background 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        -o-transition: background 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        transition: background 200ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\ninput[type=\"range\"]::-ms-track:focus, input[type=\"range\"]::-ms-track:active {\n      background: var(--main-color, #3F51B5);\n}\ninput[type=\"range\"]::-moz-range-track {\n    -webkit-opacity: 0;\n    opacity: 0;\n}\ninput[type=\"range\"]::-ms-tooltip {\n    display: none;\n}\ninput[type=\"range\"]::-webkit-slider-thumb {\n    width: 1rem;\n    height: 1rem;\n    background: #FFFFFF;\n    border: 0.14286rem solid #bdbdbd;\n    -webkit-border-radius: 50%;\n    -moz-border-radius: 50%;\n    -ms-border-radius: 50%;\n    -o-border-radius: 50%;\n    border-radius: 50%;\n    margin: -0.35714rem 0 0 0;\n    -webkit-appearance: none;\n    -moz-appearance: none;\n    appearance: none;\n    -webkit-transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    -moz-transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    -o-transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n@media only screen and (min-width: 961px) and (max-width: 1280px) {\ninput[type=\"range\"]::-webkit-slider-thumb {\n        -webkit-transition: all 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        -moz-transition: all 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        -o-transition: all 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        transition: all 390ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n@media only screen and (min-width: 1281px) {\ninput[type=\"range\"]::-webkit-slider-thumb {\n        -webkit-transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        -moz-transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        -o-transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\ninput[type=\"range\"]::-webkit-slider-thumb:focus, input[type=\"range\"]::-webkit-slider-thumb:active {\n      width: 1.14286rem;\n      height: 1.14286rem;\n      background: var(--main-color, #3F51B5);\n      border: 0.14286rem solid var(--main-color, #3F51B5);\n      margin: -0.42857rem 0 0 0;\n}\ninput[type=\"range\"]::-moz-range-thumb {\n    width: 1rem;\n    height: 1rem;\n    background: #FFFFFF;\n    border: 0.14286rem solid #bdbdbd;\n    -webkit-border-radius: 50%;\n    -moz-border-radius: 50%;\n    -ms-border-radius: 50%;\n    -o-border-radius: 50%;\n    border-radius: 50%;\n    margin: -0.35714rem 0 0 0;\n    -webkit-appearance: none;\n    -moz-appearance: none;\n    appearance: none;\n    -webkit-transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    -moz-transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    -o-transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n@media only screen and (min-width: 961px) and (max-width: 1280px) {\ninput[type=\"range\"]::-moz-range-thumb {\n        -webkit-transition: all 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        -moz-transition: all 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        -o-transition: all 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        transition: all 390ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n@media only screen and (min-width: 1281px) {\ninput[type=\"range\"]::-moz-range-thumb {\n        -webkit-transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        -moz-transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        -o-transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\ninput[type=\"range\"]::-moz-range-thumb:focus, input[type=\"range\"]::-moz-range-thumb:active {\n      width: 1.14286rem;\n      height: 1.14286rem;\n      background: var(--main-color, #3F51B5);\n      border: 0.14286rem solid var(--main-color, #3F51B5);\n      margin: -0.42857rem 0 0 0;\n}\ninput[type=\"range\"]::-ms-thumb {\n    width: 1rem;\n    height: 1rem;\n    background: #FFFFFF;\n    border: 0.14286rem solid #bdbdbd;\n    -webkit-border-radius: 50%;\n    -moz-border-radius: 50%;\n    -ms-border-radius: 50%;\n    -o-border-radius: 50%;\n    border-radius: 50%;\n    margin: -0.35714rem 0 0 0;\n    -webkit-appearance: none;\n    -moz-appearance: none;\n    appearance: none;\n    -webkit-transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    -moz-transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    -o-transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n@media only screen and (min-width: 961px) and (max-width: 1280px) {\ninput[type=\"range\"]::-ms-thumb {\n        -webkit-transition: all 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        -moz-transition: all 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        -o-transition: all 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        transition: all 390ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n@media only screen and (min-width: 1281px) {\ninput[type=\"range\"]::-ms-thumb {\n        -webkit-transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        -moz-transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        -o-transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\ninput[type=\"range\"]::-ms-thumb:focus, input[type=\"range\"]::-ms-thumb:active {\n      width: 1.14286rem;\n      height: 1.14286rem;\n      background: var(--main-color, #3F51B5);\n      border: 0.14286rem solid var(--main-color, #3F51B5);\n      margin: -0.42857rem 0 0 0;\n}\ninput[type=\"range\"]:disabled::-webkit-slider-thumb {\n    width: 1rem;\n    height: 1rem;\n    margin: -0.35714rem 0 0 0;\n    background: #bdbdbd;\n    border: 0.14286rem solid var(--background, #FFFFFF);\n}\ninput[type=\"range\"]:disabled::-moz-range-thumb {\n    width: 1rem;\n    height: 1rem;\n    margin: -0.35714rem 0 0 0;\n    background: #bdbdbd;\n    border: 0.14286rem solid var(--background, #FFFFFF);\n}\ninput[type=\"range\"]:disabled::-ms-thumb {\n    width: 1rem;\n    height: 1rem;\n    margin: -0.35714rem 0 0 0;\n    background: #bdbdbd;\n    border: 0.14286rem solid var(--background, #FFFFFF);\n}\ninput[type=\"range\"]:disabled:active::-webkit-slider-runnable-track, input[type=\"range\"]:disabled:focus::-webkit-slider-runnable-track {\n    background: none;\n}\ninput[type=\"range\"]:disabled:active::-moz-range-track, input[type=\"range\"]:disabled:focus::-moz-range-track {\n    background: none;\n}\ninput[type=\"range\"]:disabled:active::-ms-track, input[type=\"range\"]:disabled:focus::-ms-track {\n    background: none;\n}\n.range {\n  display: inline-block;\n  position: relative;\n}\n.range input[type=\"range\"] {\n    background: transparent;\n    position: relative;\n    z-index: 3;\n    -webkit-appearance: none;\n    -moz-appearance: none;\n    appearance: none;\n}\n.range input[type=\"range\"]::-webkit-slider-runnable-track:focus, .range input[type=\"range\"]::-webkit-slider-runnable-track:active {\n      background: transparent;\n}\n.range input[type=\"range\"]::-moz-range-track:focus, .range input[type=\"range\"]::-moz-range-track:active {\n      background: transparent;\n}\n.range input[type=\"range\"]::-ms-track:focus, .range input[type=\"range\"]::-ms-track:active {\n      background: transparent;\n}\n.range input[type=\"range\"].slider-discrete::-webkit-slider-thumb, .range input[type=\"range\"].slider-discrete.not-null::-webkit-slider-thumb {\n      background: transparent;\n      border: 0.14286rem solid transparent;\n}\n.range input[type=\"range\"].slider-discrete::-moz-range-thumb, .range input[type=\"range\"].slider-discrete.not-null::-moz-range-thumb {\n      background: transparent;\n      border: 0.14286rem solid transparent;\n}\n.range input[type=\"range\"].slider-discrete::-ms-thumb, .range input[type=\"range\"].slider-discrete.not-null::-ms-thumb {\n      background: transparent;\n      border: 0.14286rem solid transparent;\n}\n.range input[type=\"range\"].not-null::-webkit-slider-thumb {\n      -webkit-border-radius: 50%;\n      -moz-border-radius: 50%;\n      -ms-border-radius: 50%;\n      -o-border-radius: 50%;\n      border-radius: 50%;\n      width: 1rem;\n      height: 1rem;\n      background: var(--main-color, #3F51B5);\n      border: 0.14286rem solid var(--main-color, #3F51B5);\n      margin: -0.35714rem 0 0 0;\n}\n.range input[type=\"range\"].not-null::-webkit-slider-thumb:active, .range input[type=\"range\"].not-null::-webkit-slider-thumb:focus {\n        width: 1.14286rem;\n        height: 1.14286rem;\n        margin: -0.42857rem 0 0 0;\n}\n.range input[type=\"range\"].not-null::-moz-range-thumb {\n      -webkit-border-radius: 50%;\n      -moz-border-radius: 50%;\n      -ms-border-radius: 50%;\n      -o-border-radius: 50%;\n      border-radius: 50%;\n      width: 1rem;\n      height: 1rem;\n      background: var(--main-color, #3F51B5);\n      border: 0.14286rem solid var(--main-color, #3F51B5);\n      margin: -0.35714rem 0 0 0;\n}\n.range input[type=\"range\"].not-null::-moz-range-thumb:active, .range input[type=\"range\"].not-null::-moz-range-thumb:focus {\n        width: 1.14286rem;\n        height: 1.14286rem;\n        margin: -0.42857rem 0 0 0;\n}\n.range input[type=\"range\"].not-null::-ms-thumb {\n      -webkit-border-radius: 50%;\n      -moz-border-radius: 50%;\n      -ms-border-radius: 50%;\n      -o-border-radius: 50%;\n      border-radius: 50%;\n      width: 1rem;\n      height: 1rem;\n      background: var(--main-color, #3F51B5);\n      border: 0.14286rem solid var(--main-color, #3F51B5);\n      margin: -0.35714rem 0 0 0;\n}\n.range input[type=\"range\"].not-null::-ms-thumb:active, .range input[type=\"range\"].not-null::-ms-thumb:focus {\n        width: 1.14286rem;\n        height: 1.14286rem;\n        margin: -0.42857rem 0 0 0;\n}\n.range .range-track {\n    height: 0.14286rem;\n    margin: -1.14286rem 0 0 0;\n    position: relative;\n    width: 100%;\n    z-index: 1;\n}\n.range .range-track > div {\n      display: inline-block;\n      height: 100%;\n}\n.range .range-track .range-track-before {\n      background: var(--main-color, #3F51B5);\n}\n.range .range-track .range-track-after {\n      background: #bdbdbd;\n}\n.range:active .slider-bubble, .range:focus .slider-bubble {\n    width: 1.78571rem;\n    height: 1.78571rem;\n    background: #bdbdbd;\n    border: none;\n    bottom: 0.14286rem;\n    color: #FFFFFF;\n    font-size: 0.71429rem;\n    margin: 0 0 0 -0.89286rem;\n    text-align: center;\n}\n.range:active .slider-bubble:before, .range:focus .slider-bubble:before {\n      border-left: 0.71429rem solid transparent;\n      border-right: 0.71429rem solid transparent;\n      border-top: 0.71429rem solid #bdbdbd;\n      right: 0.25rem;\n      top: 1.5rem;\n}\n.range:active .slider-bubble.not-null, .range:focus .slider-bubble.not-null {\n      background: var(--main-color, #3F51B5);\n      border: none;\n      font-size: 0.71429rem;\n}\n.range:active .slider-bubble.not-null:before, .range:focus .slider-bubble.not-null:before {\n        border-left: 0.71429rem solid transparent;\n        border-right: 0.71429rem solid transparent;\n        border-top: 0.71429rem solid var(--main-color, #3F51B5);\n}\n.range .slider-bubble {\n    -webkit-border-radius: 50%;\n    -moz-border-radius: 50%;\n    -ms-border-radius: 50%;\n    -o-border-radius: 50%;\n    border-radius: 50%;\n    width: 1rem;\n    height: 1rem;\n    background: #000000;\n    border: 0.14286rem solid #000000;\n    color: #FFFFFF;\n    font-size: 0;\n    margin: 0.64286rem 0 0 -0.5rem;\n    position: absolute;\n    z-index: 2;\n    -webkit-transition: background 300ms cubic-bezier(0.4, 0, 0.2, 1) , width 300ms cubic-bezier(0.4, 0, 0.2, 1) , height 300ms cubic-bezier(0.4, 0, 0.2, 1) , border 300ms cubic-bezier(0.4, 0, 0.2, 1) , bottom 300ms cubic-bezier(0.4, 0, 0.2, 1) , margin 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    -moz-transition: background 300ms cubic-bezier(0.4, 0, 0.2, 1) , width 300ms cubic-bezier(0.4, 0, 0.2, 1) , height 300ms cubic-bezier(0.4, 0, 0.2, 1) , border 300ms cubic-bezier(0.4, 0, 0.2, 1) , bottom 300ms cubic-bezier(0.4, 0, 0.2, 1) , margin 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    -o-transition: background 300ms cubic-bezier(0.4, 0, 0.2, 1) , width 300ms cubic-bezier(0.4, 0, 0.2, 1) , height 300ms cubic-bezier(0.4, 0, 0.2, 1) , border 300ms cubic-bezier(0.4, 0, 0.2, 1) , bottom 300ms cubic-bezier(0.4, 0, 0.2, 1) , margin 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    transition: background 300ms cubic-bezier(0.4, 0, 0.2, 1) , width 300ms cubic-bezier(0.4, 0, 0.2, 1) , height 300ms cubic-bezier(0.4, 0, 0.2, 1) , border 300ms cubic-bezier(0.4, 0, 0.2, 1) , bottom 300ms cubic-bezier(0.4, 0, 0.2, 1) , margin 300ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n@media only screen and (min-width: 961px) and (max-width: 1280px) {\n.range .slider-bubble {\n        -webkit-transition: background 390ms cubic-bezier(0.4, 0, 0.2, 1) , width 390ms cubic-bezier(0.4, 0, 0.2, 1) , height 390ms cubic-bezier(0.4, 0, 0.2, 1) , border 390ms cubic-bezier(0.4, 0, 0.2, 1) , bottom 390ms cubic-bezier(0.4, 0, 0.2, 1) , margin 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        -moz-transition: background 390ms cubic-bezier(0.4, 0, 0.2, 1) , width 390ms cubic-bezier(0.4, 0, 0.2, 1) , height 390ms cubic-bezier(0.4, 0, 0.2, 1) , border 390ms cubic-bezier(0.4, 0, 0.2, 1) , bottom 390ms cubic-bezier(0.4, 0, 0.2, 1) , margin 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        -o-transition: background 390ms cubic-bezier(0.4, 0, 0.2, 1) , width 390ms cubic-bezier(0.4, 0, 0.2, 1) , height 390ms cubic-bezier(0.4, 0, 0.2, 1) , border 390ms cubic-bezier(0.4, 0, 0.2, 1) , bottom 390ms cubic-bezier(0.4, 0, 0.2, 1) , margin 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        transition: background 390ms cubic-bezier(0.4, 0, 0.2, 1) , width 390ms cubic-bezier(0.4, 0, 0.2, 1) , height 390ms cubic-bezier(0.4, 0, 0.2, 1) , border 390ms cubic-bezier(0.4, 0, 0.2, 1) , bottom 390ms cubic-bezier(0.4, 0, 0.2, 1) , margin 390ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n@media only screen and (min-width: 1281px) {\n.range .slider-bubble {\n        -webkit-transition: background 200ms cubic-bezier(0.4, 0, 0.2, 1) , width 200ms cubic-bezier(0.4, 0, 0.2, 1) , height 200ms cubic-bezier(0.4, 0, 0.2, 1) , border 200ms cubic-bezier(0.4, 0, 0.2, 1) , bottom 200ms cubic-bezier(0.4, 0, 0.2, 1) , margin 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        -moz-transition: background 200ms cubic-bezier(0.4, 0, 0.2, 1) , width 200ms cubic-bezier(0.4, 0, 0.2, 1) , height 200ms cubic-bezier(0.4, 0, 0.2, 1) , border 200ms cubic-bezier(0.4, 0, 0.2, 1) , bottom 200ms cubic-bezier(0.4, 0, 0.2, 1) , margin 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        -o-transition: background 200ms cubic-bezier(0.4, 0, 0.2, 1) , width 200ms cubic-bezier(0.4, 0, 0.2, 1) , height 200ms cubic-bezier(0.4, 0, 0.2, 1) , border 200ms cubic-bezier(0.4, 0, 0.2, 1) , bottom 200ms cubic-bezier(0.4, 0, 0.2, 1) , margin 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        transition: background 200ms cubic-bezier(0.4, 0, 0.2, 1) , width 200ms cubic-bezier(0.4, 0, 0.2, 1) , height 200ms cubic-bezier(0.4, 0, 0.2, 1) , border 200ms cubic-bezier(0.4, 0, 0.2, 1) , bottom 200ms cubic-bezier(0.4, 0, 0.2, 1) , margin 200ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n.range .slider-bubble:before {\n      width: 0;\n      height: 0;\n      border-left: none;\n      border-right: none;\n      border-top: none;\n      content: '';\n      position: absolute;\n      right: 0;\n      top: 0;\n      -webkit-transition: border-left 300ms cubic-bezier(0.4, 0, 0.2, 1) , border-right 300ms cubic-bezier(0.4, 0, 0.2, 1) , border-top 300ms cubic-bezier(0.4, 0, 0.2, 1) , top 300ms cubic-bezier(0.4, 0, 0.2, 1);\n      -moz-transition: border-left 300ms cubic-bezier(0.4, 0, 0.2, 1) , border-right 300ms cubic-bezier(0.4, 0, 0.2, 1) , border-top 300ms cubic-bezier(0.4, 0, 0.2, 1) , top 300ms cubic-bezier(0.4, 0, 0.2, 1);\n      -o-transition: border-left 300ms cubic-bezier(0.4, 0, 0.2, 1) , border-right 300ms cubic-bezier(0.4, 0, 0.2, 1) , border-top 300ms cubic-bezier(0.4, 0, 0.2, 1) , top 300ms cubic-bezier(0.4, 0, 0.2, 1);\n      transition: border-left 300ms cubic-bezier(0.4, 0, 0.2, 1) , border-right 300ms cubic-bezier(0.4, 0, 0.2, 1) , border-top 300ms cubic-bezier(0.4, 0, 0.2, 1) , top 300ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n@media only screen and (min-width: 961px) and (max-width: 1280px) {\n.range .slider-bubble:before {\n          -webkit-transition: border-left 390ms cubic-bezier(0.4, 0, 0.2, 1) , border-right 390ms cubic-bezier(0.4, 0, 0.2, 1) , border-top 390ms cubic-bezier(0.4, 0, 0.2, 1) , top 390ms cubic-bezier(0.4, 0, 0.2, 1);\n          -moz-transition: border-left 390ms cubic-bezier(0.4, 0, 0.2, 1) , border-right 390ms cubic-bezier(0.4, 0, 0.2, 1) , border-top 390ms cubic-bezier(0.4, 0, 0.2, 1) , top 390ms cubic-bezier(0.4, 0, 0.2, 1);\n          -o-transition: border-left 390ms cubic-bezier(0.4, 0, 0.2, 1) , border-right 390ms cubic-bezier(0.4, 0, 0.2, 1) , border-top 390ms cubic-bezier(0.4, 0, 0.2, 1) , top 390ms cubic-bezier(0.4, 0, 0.2, 1);\n          transition: border-left 390ms cubic-bezier(0.4, 0, 0.2, 1) , border-right 390ms cubic-bezier(0.4, 0, 0.2, 1) , border-top 390ms cubic-bezier(0.4, 0, 0.2, 1) , top 390ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n@media only screen and (min-width: 1281px) {\n.range .slider-bubble:before {\n          -webkit-transition: border-left 200ms cubic-bezier(0.4, 0, 0.2, 1) , border-right 200ms cubic-bezier(0.4, 0, 0.2, 1) , border-top 200ms cubic-bezier(0.4, 0, 0.2, 1) , top 200ms cubic-bezier(0.4, 0, 0.2, 1);\n          -moz-transition: border-left 200ms cubic-bezier(0.4, 0, 0.2, 1) , border-right 200ms cubic-bezier(0.4, 0, 0.2, 1) , border-top 200ms cubic-bezier(0.4, 0, 0.2, 1) , top 200ms cubic-bezier(0.4, 0, 0.2, 1);\n          -o-transition: border-left 200ms cubic-bezier(0.4, 0, 0.2, 1) , border-right 200ms cubic-bezier(0.4, 0, 0.2, 1) , border-top 200ms cubic-bezier(0.4, 0, 0.2, 1) , top 200ms cubic-bezier(0.4, 0, 0.2, 1);\n          transition: border-left 200ms cubic-bezier(0.4, 0, 0.2, 1) , border-right 200ms cubic-bezier(0.4, 0, 0.2, 1) , border-top 200ms cubic-bezier(0.4, 0, 0.2, 1) , top 200ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n.range .slider-bubble.not-null {\n      background: var(--main-color, #3F51B5);\n      border: 0.14286rem solid var(--main-color, #3F51B5);\n      color: #FFFFFF;\n      font-size: 0;\n}\n.range:disabled input[type=\"range\"]::-webkit-slider-thumb, .range.disabled input[type=\"range\"]::-webkit-slider-thumb {\n    background: #FFFFFF;\n    border: 0.14286rem solid #bdbdbd;\n}\n.range:disabled input[type=\"range\"]::-moz-range-thumb, .range.disabled input[type=\"range\"]::-moz-range-thumb {\n    background: #FFFFFF;\n    border: 0.14286rem solid #bdbdbd;\n}\n.range:disabled input[type=\"range\"]::-ms-thumb, .range.disabled input[type=\"range\"]::-ms-thumb {\n    background: #FFFFFF;\n    border: 0.14286rem solid #bdbdbd;\n}\n.range:disabled input[type=\"range\"].not-null::-webkit-slider-thumb, .range.disabled input[type=\"range\"].not-null::-webkit-slider-thumb {\n    background: #bdbdbd;\n    border: 0.14286rem solid var(--background, #FFFFFF);\n}\n.range:disabled input[type=\"range\"].not-null::-moz-range-thumb, .range.disabled input[type=\"range\"].not-null::-moz-range-thumb {\n    background: #bdbdbd;\n    border: 0.14286rem solid var(--background, #FFFFFF);\n}\n.range:disabled input[type=\"range\"].not-null::-ms-thumb, .range.disabled input[type=\"range\"].not-null::-ms-thumb {\n    background: #bdbdbd;\n    border: 0.14286rem solid var(--background, #FFFFFF);\n}\n.range:disabled input[type=\"range\"].slider-discrete::-webkit-slider-thumb, .range.disabled input[type=\"range\"].slider-discrete::-webkit-slider-thumb {\n    background: transparent;\n    border: 0.14286rem solid transparent;\n}\n.range:disabled input[type=\"range\"].slider-discrete::-moz-range-thumb, .range.disabled input[type=\"range\"].slider-discrete::-moz-range-thumb {\n    background: transparent;\n    border: 0.14286rem solid transparent;\n}\n.range:disabled input[type=\"range\"].slider-discrete::-ms-thumb, .range.disabled input[type=\"range\"].slider-discrete::-ms-thumb {\n    background: transparent;\n    border: 0.14286rem solid transparent;\n}\n.range:disabled .range-track-before, .range.disabled .range-track-before {\n    background: #bdbdbd;\n}\n.range:disabled .slider-bubble, .range.disabled .slider-bubble {\n    background: #bdbdbd;\n    border: 0.14286rem solid var(--background, #FFFFFF);\n}\n.range:disabled:active .slider-bubble, .range:disabled:focus .slider-bubble, .range.disabled:active .slider-bubble, .range.disabled:focus .slider-bubble {\n    background: #bdbdbd;\n    border: none;\n}\n.range:disabled:active .slider-bubble:before, .range:disabled:focus .slider-bubble:before, .range.disabled:active .slider-bubble:before, .range.disabled:focus .slider-bubble:before {\n      border-left: 0.71429rem solid transparent;\n      border-right: 0.71429rem solid transparent;\n      border-top: 0.71429rem solid #bdbdbd;\n}\n\n/**************************************\n * Snackbars & toasts\n *\n * http://www.google.com/design/spec/components/snackbars-toasts.html\n **************************************/\n.snackbar {\n  background: #323232;\n  bottom: 0;\n  color: #FFFFFF;\n  font-size: 1rem;\n  min-height: 3.42857rem;\n  max-height: 5.71429rem;\n  left: 0;\n  overflow: hidden;\n  padding: 1rem 1.71429rem;\n  position: fixed;\n  right: 0;\n}\n@media only screen and (min-width: 1281px) {\n.snackbar {\n      left: auto;\n      right: auto;\n      min-width: 20.57143rem;\n      max-width: 40.57143rem;\n      -webkit-border-radius: var(--border-size, 0.14286rem);\n      -moz-border-radius: var(--border-size, 0.14286rem);\n      -ms-border-radius: var(--border-size, 0.14286rem);\n      -o-border-radius: var(--border-size, 0.14286rem);\n      border-radius: var(--border-size, 0.14286rem);\n}\n}\n.snackbar-action {\n    float: right;\n    font-weight: 500;\n    margin: 0 0 0 1.71429rem;\n    text-transform: uppercase;\n}\n@media only screen and (min-width: 1601px) {\n.snackbar-action {\n        margin: 0 0 0 3.42857rem;\n}\n}\n\n/**************************************\n * Steppers\n *\n * https://material.google.com/components/steppers.html\n **************************************/\n.stepper-horizontal li {\n  height: 5.14286rem;\n  float: left;\n  padding: 1.71429rem 0 1.71429rem 1.71429rem;\n}\n.stepper-horizontal .step-circle {\n  margin: 0 0.85714rem 0 0;\n}\n.stepper-vertical li {\n  padding: 0 0 0 1.71429rem;\n}\n.stepper-vertical .step-circle {\n  margin: 0 0.57143rem 0 0;\n}\n.step {\n  padding: 0;\n  color: rgba(0, 0, 0, 0.38);\n  font-weight: 400;\n  font-size: 1rem;\n}\n.step.active {\n    color: rgba(0, 0, 0, 0.87);\n    font-weight: 500;\n}\n.step-circle {\n    width: 1.71429rem;\n    height: 1.71429rem;\n    -webkit-border-radius: 50%;\n    -moz-border-radius: 50%;\n    -ms-border-radius: 50%;\n    -o-border-radius: 50%;\n    border-radius: 50%;\n    color: #FFFFFF;\n    background: rgba(0, 0, 0, 0.38);\n    font-size: 0.85714rem;\n    font-weight: 400;\n    text-align: center;\n    line-height: 1.71429rem;\n    display: inline-block;\n}\n.step-circle.active {\n      background: var(--main-color, #3F51B5);\n}\n\n/**************************************\n * Tabs\n *\n * https://material.google.com/components/tabs.html\n **************************************/\n.tabs {\n  -moz-box-shadow: 0rem 0.14286rem 0.28571rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.28571rem 0.35714rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.71429rem 0rem rgba(0, 0, 0, 0.2);\n  -webkit-box-shadow: 0rem 0.14286rem 0.28571rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.28571rem 0.35714rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.71429rem 0rem rgba(0, 0, 0, 0.2);\n  -ms-box-shadow: 0rem 0.14286rem 0.28571rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.28571rem 0.35714rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.71429rem 0rem rgba(0, 0, 0, 0.2);\n  -o-box-shadow: 0rem 0.14286rem 0.28571rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.28571rem 0.35714rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.71429rem 0rem rgba(0, 0, 0, 0.2);\n  box-shadow: 0rem 0.14286rem 0.28571rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.28571rem 0.35714rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.71429rem 0rem rgba(0, 0, 0, 0.2);\n  background: var(--main-color, #3F51B5);\n  overflow: auto;\n  overflow-y: hidden;\n  position: relative;\n  top: 4rem;\n  width: 100%;\n  z-index: 2;\n  left: 0;\n  right: 0;\n  display: -webkit-flex;\n  display: -moz-flex;\n  display: flex;\n  -webkit-justify-content: space-between;\n  justify-content: space-between;\n  -webkit-align-items: stretch;\n  align-items: stretch;\n  -webkit-align-content: stretch;\n  align-content: stretch;\n}\n@media only screen and (min-width: 1281px) {\n.tabs {\n      -moz-box-shadow: 0rem 0rem 0.14286rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 0.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n      -webkit-box-shadow: 0rem 0rem 0.14286rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 0.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n      -ms-box-shadow: 0rem 0rem 0.14286rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 0.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n      -o-box-shadow: 0rem 0rem 0.14286rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 0.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n      box-shadow: 0rem 0rem 0.14286rem 0rem rgba(0, 0, 0, 0.14) , 0rem 0.21429rem 0.28571rem 0rem rgba(0, 0, 0, 0.12) , 0rem 0.07143rem 0.35714rem 0rem rgba(0, 0, 0, 0.2);\n}\n}\n@media only screen and (orientation: landscape) and (max-width: 960px) {\n.tabs {\n      top: 3.42857rem;\n}\n}\n@media only screen and (orientation: portrait) and (max-width: 600px) {\n.tabs {\n      top: 4rem;\n}\n}\n@media only screen and (min-width: 961px) {\n.tabs {\n      width: calc(100% - 20rem + 0.07143rem);\n      left: 19.92857rem;\n      top: 4.57143rem;\n}\n}\n.tabs .tab, .tabs .tab-icon, .tabs .tab-icon-text {\n    -webkit-flex: 1 0 auto;\n    flex: 1 0 auto;\n    -webkit-align-self: auto;\n    align-self: auto;\n    border-bottom: 0.14286rem solid var(--main-color, #3F51B5);\n    color: rgba(255, 255, 255, 0.7);\n    font-size: 1rem;\n    font-weight: 500;\n    max-width: 18.85714rem;\n    min-width: 5.14286rem;\n    text-align: center;\n    text-overflow: ellipsis;\n    text-transform: uppercase;\n    white-space: nowrap;\n    -webkit-transition: border 300ms cubic-bezier(0.4, 0, 0.2, 1) , color 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    -moz-transition: border 300ms cubic-bezier(0.4, 0, 0.2, 1) , color 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    -o-transition: border 300ms cubic-bezier(0.4, 0, 0.2, 1) , color 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    transition: border 300ms cubic-bezier(0.4, 0, 0.2, 1) , color 300ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n@media only screen and (min-width: 961px) {\n.tabs .tab, .tabs .tab-icon, .tabs .tab-icon-text {\n        min-width: 11.42857rem;\n}\n}\n@media only screen and (min-width: 961px) and (max-width: 1280px) {\n.tabs .tab, .tabs .tab-icon, .tabs .tab-icon-text {\n        -webkit-transition: border 390ms cubic-bezier(0.4, 0, 0.2, 1) , color 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        -moz-transition: border 390ms cubic-bezier(0.4, 0, 0.2, 1) , color 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        -o-transition: border 390ms cubic-bezier(0.4, 0, 0.2, 1) , color 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        transition: border 390ms cubic-bezier(0.4, 0, 0.2, 1) , color 390ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n@media only screen and (min-width: 1281px) {\n.tabs .tab, .tabs .tab-icon, .tabs .tab-icon-text {\n        -webkit-transition: border 200ms cubic-bezier(0.4, 0, 0.2, 1) , color 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        -moz-transition: border 200ms cubic-bezier(0.4, 0, 0.2, 1) , color 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        -o-transition: border 200ms cubic-bezier(0.4, 0, 0.2, 1) , color 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        transition: border 200ms cubic-bezier(0.4, 0, 0.2, 1) , color 200ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n.tabs .tab:hover, .tabs .tab.active, .tabs .tab-icon:hover, .tabs .tab-icon.active, .tabs .tab-icon-text:hover, .tabs .tab-icon-text.active {\n      border-bottom: 0.14286rem solid #FFFFFF;\n      color: #FFFFFF;\n}\n.tabs .tab:hover .material-icons, .tabs .tab.active .material-icons, .tabs .tab-icon:hover .material-icons, .tabs .tab-icon.active .material-icons, .tabs .tab-icon-text:hover .material-icons, .tabs .tab-icon-text.active .material-icons {\n        color: #FFFFFF;\n}\n.tabs .tab .material-icons, .tabs .tab-icon .material-icons, .tabs .tab-icon-text .material-icons {\n      width: 1.71429rem;\n      height: 1.71429rem;\n      font-size: 1.71429rem;\n      color: rgba(255, 255, 255, 0.7);\n      -webkit-transition: color 300ms cubic-bezier(0.4, 0, 0.2, 1);\n      -moz-transition: color 300ms cubic-bezier(0.4, 0, 0.2, 1);\n      -o-transition: color 300ms cubic-bezier(0.4, 0, 0.2, 1);\n      transition: color 300ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n@media only screen and (min-width: 961px) and (max-width: 1280px) {\n.tabs .tab .material-icons, .tabs .tab-icon .material-icons, .tabs .tab-icon-text .material-icons {\n          -webkit-transition: color 390ms cubic-bezier(0.4, 0, 0.2, 1);\n          -moz-transition: color 390ms cubic-bezier(0.4, 0, 0.2, 1);\n          -o-transition: color 390ms cubic-bezier(0.4, 0, 0.2, 1);\n          transition: color 390ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n@media only screen and (min-width: 1281px) {\n.tabs .tab .material-icons, .tabs .tab-icon .material-icons, .tabs .tab-icon-text .material-icons {\n          -webkit-transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1);\n          -moz-transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1);\n          -o-transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1);\n          transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n.tabs .tab {\n    height: 3.42857rem;\n    line-height: 3.42857rem;\n    padding: 0 0.85714rem 1.42857rem 0.85714rem;\n}\n.tabs .tab-icon {\n    height: 3.42857rem;\n    line-height: 3.42857rem;\n    padding: 0 0.14286rem 0.85714rem 0.14286rem;\n}\n.tabs .tab-icon-text {\n    height: 5.14286rem;\n    padding: 0.71429rem 0.85714rem 1.14286rem 0.85714rem;\n}\n.tabs .tab-icon-text span {\n      display: block;\n      margin: 0.71429rem 0 0 0;\n      width: 100%;\n}\n\n/**************************************\n * Text fields\n *\n * http://www.google.com/design/spec/components/text-fields.html\n **************************************/\n.input {\n  position: relative;\n  height: 5.85714rem;\n}\n.input input {\n    outline: none;\n    width: 100%;\n    border: none;\n    background: none;\n    border-bottom: 0.07143rem solid rgba(0, 0, 0, 0.42);\n    font-size: 1.14286rem;\n    padding-bottom: 0.57143rem;\n    position: absolute;\n    bottom: 1.42857rem;\n    -webkit-transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    -moz-transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    -o-transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);\n    transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n@media only screen and (min-width: 961px) and (max-width: 1280px) {\n.input input {\n        -webkit-transition: all 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        -moz-transition: all 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        -o-transition: all 390ms cubic-bezier(0.4, 0, 0.2, 1);\n        transition: all 390ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n@media only screen and (min-width: 1281px) {\n.input input {\n        -webkit-transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        -moz-transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        -o-transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);\n        transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n.input input:disabled, .input input:disabled:hover {\n      border-bottom: 0.07143rem dotted;\n      color: rgba(0, 0, 0, 0.42);\n}\n.input input:disabled ~ label, .input input:disabled:hover ~ label {\n        color: rgba(0, 0, 0, 0.42);\n}\n.input input:disabled ~ .expander, .input input:disabled:hover ~ .expander {\n        display: none;\n}\n.input input:hover + label {\n      color: rgba(0, 0, 0, 0.54);\n}\n.input input:hover, .input input:active, .input input:focus, .input input:active:hover, .input input:focus:hover {\n      border-bottom: 0.14286rem solid rgba(0, 0, 0, 0.87);\n      padding-bottom: 0.5rem;\n}\n.input input:active, .input input:focus {\n      caret-color: #304FFE;\n}\n.input input:active ~ label, .input input:focus ~ label {\n        color: #304FFE;\n        font-size: 0.85714rem;\n        bottom: 3.85714rem;\n}\n.input input:active ~ .material-icons, .input input:focus ~ .material-icons {\n        color: #304FFE;\n}\n.input input:active:required ~ label:after, .input input:focus:required ~ label:after {\n        color: #FF1744;\n}\n.input input:active::-webkit-input-placeholder, .input input:focus::-webkit-input-placeholder {\n        -webkit-opacity: 1;\n        opacity: 1;\n}\n.input input:active::-moz-placeholder, .input input:focus::-moz-placeholder {\n        -webkit-opacity: 1;\n        opacity: 1;\n}\n.input input:active:-ms-input-placeholder, .input input:focus:-ms-input-placeholder {\n        -webkit-opacity: 1;\n        opacity: 1;\n}\n.input input:active::placeholder, .input input:focus::placeholder {\n        -webkit-opacity: 1;\n        opacity: 1;\n}\n.input input:active ~ .expander, .input input:focus ~ .expander {\n        width: 100%;\n        left: 0;\n        height: 0.14286rem;\n}\n.input input::-webkit-input-placeholder {\n      -webkit-opacity: 0;\n      opacity: 0;\n      font-size: 1.14286rem;\n      color: rgba(0, 0, 0, 0.42);\n}\n.input input::-moz-placeholder {\n      -webkit-opacity: 0;\n      opacity: 0;\n      font-size: 1.14286rem;\n      color: rgba(0, 0, 0, 0.42);\n}\n.input input:-ms-input-placeholder {\n      -webkit-opacity: 0;\n      opacity: 0;\n      font-size: 1.14286rem;\n      color: rgba(0, 0, 0, 0.42);\n}\n.input input::placeholder {\n      -webkit-opacity: 0;\n      opacity: 0;\n      font-size: 1.14286rem;\n      color: rgba(0, 0, 0, 0.42);\n}\n.input input:required ~ label:after {\n      content: ' \\E838';\n      font-family: 'Material Icons';\n      font-size: 0.5rem;\n      vertical-align: super;\n}\n.input label {\n    color: rgba(0, 0, 0, 0.54);\n    font-size: 1.14286rem;\n    position: absolute;\n    pointer-events: none;\n    left: 0;\n    bottom: 2.07143rem;\n    font-weight: 400;\n    -webkit-transition: all cubic-bezier(0.4, 0, 0.2, 1) 300ms;\n    -moz-transition: all cubic-bezier(0.4, 0, 0.2, 1) 300ms;\n    -o-transition: all cubic-bezier(0.4, 0, 0.2, 1) 300ms;\n    transition: all cubic-bezier(0.4, 0, 0.2, 1) 300ms;\n}\n@media only screen and (min-width: 961px) and (max-width: 1280px) {\n.input label {\n        -webkit-transition: all cubic-bezier(0.4, 0, 0.2, 1) 390ms;\n        -moz-transition: all cubic-bezier(0.4, 0, 0.2, 1) 390ms;\n        -o-transition: all cubic-bezier(0.4, 0, 0.2, 1) 390ms;\n        transition: all cubic-bezier(0.4, 0, 0.2, 1) 390ms;\n}\n}\n@media only screen and (min-width: 1281px) {\n.input label {\n        -webkit-transition: all cubic-bezier(0.4, 0, 0.2, 1) 200ms;\n        -moz-transition: all cubic-bezier(0.4, 0, 0.2, 1) 200ms;\n        -o-transition: all cubic-bezier(0.4, 0, 0.2, 1) 200ms;\n        transition: all cubic-bezier(0.4, 0, 0.2, 1) 200ms;\n}\n}\n.input label.active {\n      font-size: 0.85714rem;\n      bottom: 3.85714rem;\n}\n.input .helper-text {\n    font-size: 0.85714rem;\n    color: rgba(0, 0, 0, 0.54);\n    position: absolute;\n    bottom: 0;\n    line-height: normal;\n}\n.input .helper-text .material-icons {\n      font-size: 0.85714rem;\n      width: 0.85714rem;\n      height: 0.85714rem;\n}\n.input .expander {\n    width: 0;\n    background: #304FFE;\n    position: absolute;\n    height: 0.07143rem;\n    left: 50%;\n    bottom: 1.42857rem;\n    -webkit-transition: left cubic-bezier(0.4, 0, 0.2, 1) 300ms , width cubic-bezier(0.4, 0, 0.2, 1) 300ms;\n    -moz-transition: left cubic-bezier(0.4, 0, 0.2, 1) 300ms , width cubic-bezier(0.4, 0, 0.2, 1) 300ms;\n    -o-transition: left cubic-bezier(0.4, 0, 0.2, 1) 300ms , width cubic-bezier(0.4, 0, 0.2, 1) 300ms;\n    transition: left cubic-bezier(0.4, 0, 0.2, 1) 300ms , width cubic-bezier(0.4, 0, 0.2, 1) 300ms;\n}\n@media only screen and (min-width: 961px) and (max-width: 1280px) {\n.input .expander {\n        -webkit-transition: left cubic-bezier(0.4, 0, 0.2, 1) 390ms , width cubic-bezier(0.4, 0, 0.2, 1) 390ms;\n        -moz-transition: left cubic-bezier(0.4, 0, 0.2, 1) 390ms , width cubic-bezier(0.4, 0, 0.2, 1) 390ms;\n        -o-transition: left cubic-bezier(0.4, 0, 0.2, 1) 390ms , width cubic-bezier(0.4, 0, 0.2, 1) 390ms;\n        transition: left cubic-bezier(0.4, 0, 0.2, 1) 390ms , width cubic-bezier(0.4, 0, 0.2, 1) 390ms;\n}\n}\n@media only screen and (min-width: 1281px) {\n.input .expander {\n        -webkit-transition: left cubic-bezier(0.4, 0, 0.2, 1) 200ms , width cubic-bezier(0.4, 0, 0.2, 1) 200ms;\n        -moz-transition: left cubic-bezier(0.4, 0, 0.2, 1) 200ms , width cubic-bezier(0.4, 0, 0.2, 1) 200ms;\n        -o-transition: left cubic-bezier(0.4, 0, 0.2, 1) 200ms , width cubic-bezier(0.4, 0, 0.2, 1) 200ms;\n        transition: left cubic-bezier(0.4, 0, 0.2, 1) 200ms , width cubic-bezier(0.4, 0, 0.2, 1) 200ms;\n}\n}\n.input.invalid label, .input.invalid input:active + label, .input.invalid input:focus + label, .input.invalid .helper-text, .input.invalid .material-icons, .input.invalid input:active ~ .material-icons, .input.invalid input:focus ~ .material-icons {\n    color: #FF1744;\n}\n.input.invalid .expander {\n    background: #FF1744;\n}\n.input.icon > .material-icons {\n    font-size: 1.71429rem;\n    width: 1.71429rem;\n    height: 1.71429rem;\n    bottom: 2rem;\n    position: absolute;\n}\n.input.icon input, .input.icon label {\n    left: 2.85714rem;\n}\n.input.icon input:active ~ .expander, .input.icon input:focus ~ .expander {\n    left: 2.85714rem;\n}\n.input.icon input, .input.icon input:active ~ .expander, .input.icon input:focus ~ .expander {\n    width: calc(100% - (1.14286rem + 1.71429rem));\n}\n.textarea {\n  border: 0.07143rem solid #000000;\n  -webkit-border-radius: 0.14286rem;\n  -moz-border-radius: 0.14286rem;\n  -ms-border-radius: 0.14286rem;\n  -o-border-radius: 0.14286rem;\n  border-radius: 0.14286rem;\n  padding: 0.57143rem 1.14286rem 0.57143rem 1.14286rem;\n  margin-bottom: 1.42857rem;\n  position: relative;\n  min-height: 9.71429rem;\n  -webkit-transition: border cubic-bezier(0.4, 0, 0.2, 1) 300ms , width cubic-bezier(0.4, 0, 0.2, 1) 300ms;\n  -moz-transition: border cubic-bezier(0.4, 0, 0.2, 1) 300ms , width cubic-bezier(0.4, 0, 0.2, 1) 300ms;\n  -o-transition: border cubic-bezier(0.4, 0, 0.2, 1) 300ms , width cubic-bezier(0.4, 0, 0.2, 1) 300ms;\n  transition: border cubic-bezier(0.4, 0, 0.2, 1) 300ms , width cubic-bezier(0.4, 0, 0.2, 1) 300ms;\n}\n@media only screen and (min-width: 961px) and (max-width: 1280px) {\n.textarea {\n      -webkit-transition: border cubic-bezier(0.4, 0, 0.2, 1) 390ms , width cubic-bezier(0.4, 0, 0.2, 1) 390ms;\n      -moz-transition: border cubic-bezier(0.4, 0, 0.2, 1) 390ms , width cubic-bezier(0.4, 0, 0.2, 1) 390ms;\n      -o-transition: border cubic-bezier(0.4, 0, 0.2, 1) 390ms , width cubic-bezier(0.4, 0, 0.2, 1) 390ms;\n      transition: border cubic-bezier(0.4, 0, 0.2, 1) 390ms , width cubic-bezier(0.4, 0, 0.2, 1) 390ms;\n}\n}\n@media only screen and (min-width: 1281px) {\n.textarea {\n      -webkit-transition: border cubic-bezier(0.4, 0, 0.2, 1) 200ms , width cubic-bezier(0.4, 0, 0.2, 1) 200ms;\n      -moz-transition: border cubic-bezier(0.4, 0, 0.2, 1) 200ms , width cubic-bezier(0.4, 0, 0.2, 1) 200ms;\n      -o-transition: border cubic-bezier(0.4, 0, 0.2, 1) 200ms , width cubic-bezier(0.4, 0, 0.2, 1) 200ms;\n      transition: border cubic-bezier(0.4, 0, 0.2, 1) 200ms , width cubic-bezier(0.4, 0, 0.2, 1) 200ms;\n}\n}\n.textarea textarea {\n    position: absolute;\n    font-family: inherit;\n    outline: none;\n    border: none;\n    width: 100%;\n    background: transparent;\n    bottom: 0.57143rem;\n    right: 1.14286rem;\n    left: 1.14286rem;\n    top: 2rem;\n    min-height: 7.14286rem;\n    -webkit-transition: all cubic-bezier(0.4, 0, 0.2, 1) 300ms , width cubic-bezier(0.4, 0, 0.2, 1) 300ms;\n    -moz-transition: all cubic-bezier(0.4, 0, 0.2, 1) 300ms , width cubic-bezier(0.4, 0, 0.2, 1) 300ms;\n    -o-transition: all cubic-bezier(0.4, 0, 0.2, 1) 300ms , width cubic-bezier(0.4, 0, 0.2, 1) 300ms;\n    transition: all cubic-bezier(0.4, 0, 0.2, 1) 300ms , width cubic-bezier(0.4, 0, 0.2, 1) 300ms;\n}\n@media only screen and (min-width: 961px) and (max-width: 1280px) {\n.textarea textarea {\n        -webkit-transition: all cubic-bezier(0.4, 0, 0.2, 1) 390ms , width cubic-bezier(0.4, 0, 0.2, 1) 390ms;\n        -moz-transition: all cubic-bezier(0.4, 0, 0.2, 1) 390ms , width cubic-bezier(0.4, 0, 0.2, 1) 390ms;\n        -o-transition: all cubic-bezier(0.4, 0, 0.2, 1) 390ms , width cubic-bezier(0.4, 0, 0.2, 1) 390ms;\n        transition: all cubic-bezier(0.4, 0, 0.2, 1) 390ms , width cubic-bezier(0.4, 0, 0.2, 1) 390ms;\n}\n}\n@media only screen and (min-width: 1281px) {\n.textarea textarea {\n        -webkit-transition: all cubic-bezier(0.4, 0, 0.2, 1) 200ms , width cubic-bezier(0.4, 0, 0.2, 1) 200ms;\n        -moz-transition: all cubic-bezier(0.4, 0, 0.2, 1) 200ms , width cubic-bezier(0.4, 0, 0.2, 1) 200ms;\n        -o-transition: all cubic-bezier(0.4, 0, 0.2, 1) 200ms , width cubic-bezier(0.4, 0, 0.2, 1) 200ms;\n        transition: all cubic-bezier(0.4, 0, 0.2, 1) 200ms , width cubic-bezier(0.4, 0, 0.2, 1) 200ms;\n}\n}\n.textarea textarea:active, .textarea textarea:focus {\n      caret-color: #304FFE;\n}\n.textarea textarea:active ~ label, .textarea textarea:focus ~ label {\n        top: 0.57143rem;\n        font-size: 0.85714rem;\n        color: #304FFE;\n}\n.textarea textarea:required ~ label:after {\n      content: ' \\E838';\n      font-family: 'Material Icons';\n      font-size: 0.5rem;\n      vertical-align: super;\n}\n.textarea label {\n    pointer-events: none;\n    position: absolute;\n    top: 1.14286rem;\n    font-weight: 400;\n    font-size: 1.14286rem;\n    -webkit-transition: all cubic-bezier(0.4, 0, 0.2, 1) 300ms , width cubic-bezier(0.4, 0, 0.2, 1) 300ms;\n    -moz-transition: all cubic-bezier(0.4, 0, 0.2, 1) 300ms , width cubic-bezier(0.4, 0, 0.2, 1) 300ms;\n    -o-transition: all cubic-bezier(0.4, 0, 0.2, 1) 300ms , width cubic-bezier(0.4, 0, 0.2, 1) 300ms;\n    transition: all cubic-bezier(0.4, 0, 0.2, 1) 300ms , width cubic-bezier(0.4, 0, 0.2, 1) 300ms;\n}\n@media only screen and (min-width: 961px) and (max-width: 1280px) {\n.textarea label {\n        -webkit-transition: all cubic-bezier(0.4, 0, 0.2, 1) 390ms , width cubic-bezier(0.4, 0, 0.2, 1) 390ms;\n        -moz-transition: all cubic-bezier(0.4, 0, 0.2, 1) 390ms , width cubic-bezier(0.4, 0, 0.2, 1) 390ms;\n        -o-transition: all cubic-bezier(0.4, 0, 0.2, 1) 390ms , width cubic-bezier(0.4, 0, 0.2, 1) 390ms;\n        transition: all cubic-bezier(0.4, 0, 0.2, 1) 390ms , width cubic-bezier(0.4, 0, 0.2, 1) 390ms;\n}\n}\n@media only screen and (min-width: 1281px) {\n.textarea label {\n        -webkit-transition: all cubic-bezier(0.4, 0, 0.2, 1) 200ms , width cubic-bezier(0.4, 0, 0.2, 1) 200ms;\n        -moz-transition: all cubic-bezier(0.4, 0, 0.2, 1) 200ms , width cubic-bezier(0.4, 0, 0.2, 1) 200ms;\n        -o-transition: all cubic-bezier(0.4, 0, 0.2, 1) 200ms , width cubic-bezier(0.4, 0, 0.2, 1) 200ms;\n        transition: all cubic-bezier(0.4, 0, 0.2, 1) 200ms , width cubic-bezier(0.4, 0, 0.2, 1) 200ms;\n}\n}\n.textarea.hover {\n    border: 0.14286rem solid rgba(0, 0, 0, 0.42);\n}\n.textarea.hover label {\n      top: 1.07143rem;\n}\n.textarea.hover, .textarea.active {\n    padding: 0.5rem 1.07143rem 0.5rem 1.07143rem;\n}\n.textarea.hover textarea, .textarea.active textarea {\n      bottom: 0.5rem;\n      right: 1.07143rem;\n      left: 1.07143rem;\n      top: 1.92857rem;\n}\n.textarea.hover textarea:required ~ label:after, .textarea.active textarea:required ~ label:after {\n        color: #FF1744;\n}\n.textarea.active {\n    border: 0.14286rem solid #304FFE;\n}\n.textarea.invalid {\n    border: 0.14286rem solid #FF1744;\n}\n.textarea.invalid label, .textarea.invalid textarea:active + label, .textarea.invalid textarea:focus + label, .textarea.invalid .helper-text, .textarea.invalid .helper-text .material-icons {\n      color: #FF1744;\n}\n.textarea .helper-text {\n    font-size: 0.85714rem;\n    line-height: normal;\n    position: absolute;\n    bottom: -1.42857rem;\n    left: 0;\n}\n.textarea .helper-text .material-icons {\n      font-size: 0.85714rem;\n      width: 0.85714rem;\n      height: 0.85714rem;\n}\n.textarea.disabled {\n    background: #E0E0E0;\n    border: 0.07143rem solid rgba(0, 0, 0, 0.42);\n}\n\n/**************************************\n * Tooltips\n *\n * http://www.google.com/design/spec/components/tooltips.html\n **************************************/\n.tooltip {\n  display: inline;\n  background: rgba(97, 97, 97, 0.9);\n  color: #FFFFFF;\n  font-size: 1rem;\n  font-weight: 500;\n  height: 2.28571rem;\n  left: 0;\n  line-height: 2.28571rem;\n  margin: 0;\n  padding: 0 1.14286rem;\n  position: absolute;\n  top: 0;\n  white-space: nowrap;\n  width: auto;\n  z-index: 10;\n  -webkit-opacity: 0;\n  opacity: 0;\n  visibility: hidden;\n  -webkit-transition: top 300ms cubic-bezier(0.4, 0, 0.2, 1) , margin 300ms cubic-bezier(0.4, 0, 0.2, 1);\n  -moz-transition: top 300ms cubic-bezier(0.4, 0, 0.2, 1) , margin 300ms cubic-bezier(0.4, 0, 0.2, 1);\n  -o-transition: top 300ms cubic-bezier(0.4, 0, 0.2, 1) , margin 300ms cubic-bezier(0.4, 0, 0.2, 1);\n  transition: top 300ms cubic-bezier(0.4, 0, 0.2, 1) , margin 300ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n@media only screen and (min-width: 961px) and (max-width: 1280px) {\n.tooltip {\n      -webkit-transition: top 390ms cubic-bezier(0.4, 0, 0.2, 1) , margin 390ms cubic-bezier(0.4, 0, 0.2, 1);\n      -moz-transition: top 390ms cubic-bezier(0.4, 0, 0.2, 1) , margin 390ms cubic-bezier(0.4, 0, 0.2, 1);\n      -o-transition: top 390ms cubic-bezier(0.4, 0, 0.2, 1) , margin 390ms cubic-bezier(0.4, 0, 0.2, 1);\n      transition: top 390ms cubic-bezier(0.4, 0, 0.2, 1) , margin 390ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n@media only screen and (min-width: 1281px) {\n.tooltip {\n      font-size: 0.71429rem;\n      height: 1.57143rem;\n      line-height: 1.57143rem;\n      padding: 0 0.57143rem;\n      -webkit-transition: top 200ms cubic-bezier(0.4, 0, 0.2, 1) , margin 200ms cubic-bezier(0.4, 0, 0.2, 1);\n      -moz-transition: top 200ms cubic-bezier(0.4, 0, 0.2, 1) , margin 200ms cubic-bezier(0.4, 0, 0.2, 1);\n      -o-transition: top 200ms cubic-bezier(0.4, 0, 0.2, 1) , margin 200ms cubic-bezier(0.4, 0, 0.2, 1);\n      transition: top 200ms cubic-bezier(0.4, 0, 0.2, 1) , margin 200ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n}\n.activate-tooltip:hover .tooltip {\n  -webkit-opacity: 1;\n  opacity: 1;\n  visibility: visible;\n  top: 1.71429rem;\n  margin: 1.71429rem 0 0 0;\n}\n@media only screen and (min-width: 1281px) {\n.activate-tooltip:hover .tooltip {\n      top: 1rem;\n      margin: 1rem 0 0 0;\n}\n}\n.raised-button.activate-tooltip:hover, flat-button.activate-tooltip:hover {\n  -webkit-opacity: 1;\n  opacity: 1;\n  visibility: visible;\n  top: 2.57143rem;\n  margin: 1.71429rem 0 0 0;\n}\n@media only screen and (min-width: 1281px) {\n.raised-button.activate-tooltip:hover, flat-button.activate-tooltip:hover {\n      top: 2.57143rem;\n      margin: 1rem 0 0 0;\n}\n}\n.red, .red-500 {\n  background: #F44336;\n}\n.red-text, .red-500-text, .red-text .material-icons, .red-500-text .material-icons {\n  color: #F44336;\n}\n.red-50 {\n  background: #FFEBEE;\n}\n.red-50-text, .red-50-text .material-icons {\n  color: #FFEBEE;\n}\n.red-100 {\n  background: #FFCDD2;\n}\n.red-100-text, .red-100-text .material-icons {\n  color: #FFCDD2;\n}\n.red-200 {\n  background: #EF9A9A;\n}\n.red-200-text, .red-200-text .material-icons {\n  color: #EF9A9A;\n}\n.red-300 {\n  background: #E57373;\n}\n.red-300-text, .red-300-text .material-icons {\n  color: #E57373;\n}\n.red-400 {\n  background: #EF5350;\n}\n.red-400-text, .red-400-text .material-icons {\n  color: #EF5350;\n}\n.red-600 {\n  background: #E53935;\n}\n.red-600-text, .red-600-text .material-icons {\n  color: #E53935;\n}\n.red-700 {\n  background: #D32F2F;\n}\n.red-700-text, .red-700-text .material-icons {\n  color: #D32F2F;\n}\n.red-800 {\n  background: #C62828;\n}\n.red-800-text, .red-800-text .material-icons {\n  color: #C62828;\n}\n.red-900 {\n  background: #B71C1C;\n}\n.red-900-text, .red-900-text .material-icons {\n  color: #B71C1C;\n}\n.red-a100 {\n  background: #FF8A80;\n}\n.red-a100-text, .red-a100-text .material-icons {\n  color: #FF8A80;\n}\n.red-a200 {\n  background: #FF5252;\n}\n.red-a200-text, .red-a200-text .material-icons {\n  color: #FF5252;\n}\n.red-a400 {\n  background: #FF1744;\n}\n.red-a400-text, .red-a400-text .material-icons {\n  color: #FF1744;\n}\n.red-a700 {\n  background: #D50000;\n}\n.red-a700-text, .red-a700-text .material-icons {\n  color: #D50000;\n}\n.pink, .pink-500 {\n  background: #E91E63;\n}\n.pink-text, .pink-500-text, .pink-text .material-icons, .pink-500-text .material-icons {\n  color: #E91E63;\n}\n.pink-50 {\n  background: #FCE4EC;\n}\n.pink-50-text, .pink-50-text .material-icons {\n  color: #FCE4EC;\n}\n.pink-100 {\n  background: #F8BBD0;\n}\n.pink-100-text, .pink-100-text .material-icons {\n  color: #F8BBD0;\n}\n.pink-200 {\n  background: #F48FB1;\n}\n.pink-200-text, .pink-200-text .material-icons {\n  color: #F48FB1;\n}\n.pink-300 {\n  background: #F06292;\n}\n.pink-300-text, .pink-300-text .material-icons {\n  color: #F06292;\n}\n.pink-400 {\n  background: #EC407A;\n}\n.pink-400-text, .pink-400-text .material-icons {\n  color: #EC407A;\n}\n.pink-600 {\n  background: #D81B60;\n}\n.pink-600-text, .pink-600-text .material-icons {\n  color: #D81B60;\n}\n.pink-700 {\n  background: #C2185B;\n}\n.pink-700-text, .pink-700-text .material-icons {\n  color: #C2185B;\n}\n.pink-800 {\n  background: #AD1457;\n}\n.pink-800-text, .pink-800-text .material-icons {\n  color: #AD1457;\n}\n.pink-900 {\n  background: #880E4F;\n}\n.pink-900-text, .pink-900-text .material-icons {\n  color: #880E4F;\n}\n.pink-a100 {\n  background: #FF80AB;\n}\n.pink-a100-text, .pink-a100-text .material-icons {\n  color: #FF80AB;\n}\n.pink-a200 {\n  background: #FF4081;\n}\n.pink-a200-text, .pink-a200-text .material-icons {\n  color: #FF4081;\n}\n.pink-a400 {\n  background: #F50057;\n}\n.pink-a400-text, .pink-a400-text .material-icons {\n  color: #F50057;\n}\n.pink-a700 {\n  background: #C51162;\n}\n.pink-a700-text, .pink-a700-text .material-icons {\n  color: #C51162;\n}\n.purple, .purple-500 {\n  background: #9C27B0;\n}\n.purple-text, .purple-500-text, .purple-text .material-icons, .purple-500-text .material-icons {\n  color: #9C27B0;\n}\n.purple-50 {\n  background: #F3E5F5;\n}\n.purple-50-text, .purple-50-text .material-icons {\n  color: #F3E5F5;\n}\n.purple-100 {\n  background: #E1BEE7;\n}\n.purple-100-text, .purple-100-text .material-icons {\n  color: #E1BEE7;\n}\n.purple-200 {\n  background: #CE93D8;\n}\n.purple-200-text, .purple-200-text .material-icons {\n  color: #CE93D8;\n}\n.purple-300 {\n  background: #BA68C8;\n}\n.purple-300-text, .purple-300-text .material-icons {\n  color: #BA68C8;\n}\n.purple-400 {\n  background: #AB47BC;\n}\n.purple-400-text, .purple-400-text .material-icons {\n  color: #AB47BC;\n}\n.purple-600 {\n  background: #8E24AA;\n}\n.purple-600-text, .purple-600-text .material-icons {\n  color: #8E24AA;\n}\n.purple-700 {\n  background: #7B1FA2;\n}\n.purple-700-text, .purple-700-text .material-icons {\n  color: #7B1FA2;\n}\n.purple-800 {\n  background: #6A1B9A;\n}\n.purple-800-text, .purple-800-text .material-icons {\n  color: #6A1B9A;\n}\n.purple-900 {\n  background: #4A148C;\n}\n.purple-900-text, .purple-900-text .material-icons {\n  color: #4A148C;\n}\n.purple-a100 {\n  background: #EA80FC;\n}\n.purple-a100-text, .purple-a100-text .material-icons {\n  color: #EA80FC;\n}\n.purple-a200 {\n  background: #E040FB;\n}\n.purple-a200-text, .purple-a200-text .material-icons {\n  color: #E040FB;\n}\n.purple-a400 {\n  background: #D500F9;\n}\n.purple-a400-text, .purple-a400-text .material-icons {\n  color: #D500F9;\n}\n.purple-a700 {\n  background: #AA00FF;\n}\n.purple-a700-text, .purple-a700-text .material-icons {\n  color: #AA00FF;\n}\n.deep-purple, .deep-purple-500 {\n  background: #673AB7;\n}\n.deep-purple-text, .deep-purple-500-text, .deep-purple-text .material-icons, .deep-purple-500-text .material-icons {\n  color: #673AB7;\n}\n.deep-purple-50 {\n  background: #EDE7F6;\n}\n.deep-purple-50-text, .deep-purple-50-text .material-icons {\n  color: #EDE7F6;\n}\n.deep-purple-100 {\n  background: #D1C4E9;\n}\n.deep-purple-100-text, .deep-purple-100-text .material-icons {\n  color: #D1C4E9;\n}\n.deep-purple-200 {\n  background: #B39DDB;\n}\n.deep-purple-200-text, .deep-purple-200-text .material-icons {\n  color: #B39DDB;\n}\n.deep-purple-300 {\n  background: #9575CD;\n}\n.deep-purple-300-text, .deep-purple-300-text .material-icons {\n  color: #9575CD;\n}\n.deep-purple-400 {\n  background: #7E57C2;\n}\n.deep-purple-400-text, .deep-purple-400-text .material-icons {\n  color: #7E57C2;\n}\n.deep-purple-600 {\n  background: #5E35B1;\n}\n.deep-purple-600-text, .deep-purple-600-text .material-icons {\n  color: #5E35B1;\n}\n.deep-purple-700 {\n  background: #512DA8;\n}\n.deep-purple-700-text, .deep-purple-700-text .material-icons {\n  color: #512DA8;\n}\n.deep-purple-800 {\n  background: #4527A0;\n}\n.deep-purple-800-text, .deep-purple-800-text .material-icons {\n  color: #4527A0;\n}\n.deep-purple-900 {\n  background: #311B92;\n}\n.deep-purple-900-text, .deep-purple-900-text .material-icons {\n  color: #311B92;\n}\n.deep-purple-a100 {\n  background: #B388FF;\n}\n.deep-purple-a100-text, .deep-purple-a100-text .material-icons {\n  color: #B388FF;\n}\n.deep-purple-a200 {\n  background: #7C4DFF;\n}\n.deep-purple-a200-text, .deep-purple-a200-text .material-icons {\n  color: #7C4DFF;\n}\n.deep-purple-a400 {\n  background: #651FFF;\n}\n.deep-purple-a400-text, .deep-purple-a400-text .material-icons {\n  color: #651FFF;\n}\n.deep-purple-a700 {\n  background: #6200EA;\n}\n.deep-purple-a700-text, .deep-purple-a700-text .material-icons {\n  color: #6200EA;\n}\n.indigo, .indigo-500 {\n  background: #3F51B5;\n}\n.indigo-text, .indigo-500-text, .indigo-text .material-icons, .indigo-500-text .material-icons {\n  color: #3F51B5;\n}\n.indigo-50 {\n  background: #E8EAF6;\n}\n.indigo-50-text, .indigo-50-text .material-icons {\n  color: #E8EAF6;\n}\n.indigo-100 {\n  background: #C5CAE9;\n}\n.indigo-100-text, .indigo-100-text .material-icons {\n  color: #C5CAE9;\n}\n.indigo-200 {\n  background: #9FA8DA;\n}\n.indigo-200-text, .indigo-200-text .material-icons {\n  color: #9FA8DA;\n}\n.indigo-300 {\n  background: #7986CB;\n}\n.indigo-300-text, .indigo-300-text .material-icons {\n  color: #7986CB;\n}\n.indigo-400 {\n  background: #5C6BC0;\n}\n.indigo-400-text, .indigo-400-text .material-icons {\n  color: #5C6BC0;\n}\n.indigo-600 {\n  background: #3949AB;\n}\n.indigo-600-text, .indigo-600-text .material-icons {\n  color: #3949AB;\n}\n.indigo-700 {\n  background: #303F9F;\n}\n.indigo-700-text, .indigo-700-text .material-icons {\n  color: #303F9F;\n}\n.indigo-800 {\n  background: #283593;\n}\n.indigo-800-text, .indigo-800-text .material-icons {\n  color: #283593;\n}\n.indigo-900 {\n  background: #1A237E;\n}\n.indigo-900-text, .indigo-900-text .material-icons {\n  color: #1A237E;\n}\n.indigo-a100 {\n  background: #8C9EFF;\n}\n.indigo-a100-text, .indigo-a100-text .material-icons {\n  color: #8C9EFF;\n}\n.indigo-a200 {\n  background: #536DFE;\n}\n.indigo-a200-text, .indigo-a200-text .material-icons {\n  color: #536DFE;\n}\n.indigo-a400 {\n  background: #3D5AFE;\n}\n.indigo-a400-text, .indigo-a400-text .material-icons {\n  color: #3D5AFE;\n}\n.indigo-a700 {\n  background: #304FFE;\n}\n.indigo-a700-text, .indigo-a700-text .material-icons {\n  color: #304FFE;\n}\n.blue, .blue-500 {\n  background: #2196F3;\n}\n.blue-text, .blue-500-text, .blue-text .material-icons, .blue-500-text .material-icons {\n  color: #2196F3;\n}\n.blue-50 {\n  background: #E3F2FD;\n}\n.blue-50-text, .blue-50-text .material-icons {\n  color: #E3F2FD;\n}\n.blue-100 {\n  background: #BBDEFB;\n}\n.blue-100-text, .blue-100-text .material-icons {\n  color: #BBDEFB;\n}\n.blue-200 {\n  background: #90CAF9;\n}\n.blue-200-text, .blue-200-text .material-icons {\n  color: #90CAF9;\n}\n.blue-300 {\n  background: #64B5F6;\n}\n.blue-300-text, .blue-300-text .material-icons {\n  color: #64B5F6;\n}\n.blue-400 {\n  background: #42A5F5;\n}\n.blue-400-text, .blue-400-text .material-icons {\n  color: #42A5F5;\n}\n.blue-600 {\n  background: #1E88E5;\n}\n.blue-600-text, .blue-600-text .material-icons {\n  color: #1E88E5;\n}\n.blue-700 {\n  background: #1976D2;\n}\n.blue-700-text, .blue-700-text .material-icons {\n  color: #1976D2;\n}\n.blue-800 {\n  background: #1565C0;\n}\n.blue-800-text, .blue-800-text .material-icons {\n  color: #1565C0;\n}\n.blue-900 {\n  background: #0D47A1;\n}\n.blue-900-text, .blue-900-text .material-icons {\n  color: #0D47A1;\n}\n.blue-a100 {\n  background: #82B1FF;\n}\n.blue-a100-text, .blue-a100-text .material-icons {\n  color: #82B1FF;\n}\n.blue-a200 {\n  background: #448AFF;\n}\n.blue-a200-text, .blue-a200-text .material-icons {\n  color: #448AFF;\n}\n.blue-a400 {\n  background: #2979FF;\n}\n.blue-a400-text, .blue-a400-text .material-icons {\n  color: #2979FF;\n}\n.blue-a700 {\n  background: #2962FF;\n}\n.blue-a700-text, .blue-a700-text .material-icons {\n  color: #2962FF;\n}\n.light-blue, .light-blue-500 {\n  background: #03A9F4;\n}\n.light-blue-text, .light-blue-500-text, .light-blue-text .material-icons, .light-blue-500-text .material-icons {\n  color: #03A9F4;\n}\n.light-blue-50 {\n  background: #E1F5FE;\n}\n.light-blue-50-text, .light-blue-50-text .material-icons {\n  color: #E1F5FE;\n}\n.light-blue-100 {\n  background: #B3E5FC;\n}\n.light-blue-100-text, .light-blue-100-text .material-icons {\n  color: #B3E5FC;\n}\n.light-blue-200 {\n  background: #81D4FA;\n}\n.light-blue-200-text, .light-blue-200-text .material-icons {\n  color: #81D4FA;\n}\n.light-blue-300 {\n  background: #4FC3F7;\n}\n.light-blue-300-text, .light-blue-300-text .material-icons {\n  color: #4FC3F7;\n}\n.light-blue-400 {\n  background: #29B6F6;\n}\n.light-blue-400-text, .light-blue-400-text .material-icons {\n  color: #29B6F6;\n}\n.light-blue-600 {\n  background: #039BE5;\n}\n.light-blue-600-text, .light-blue-600-text .material-icons {\n  color: #039BE5;\n}\n.light-blue-700 {\n  background: #0288D1;\n}\n.light-blue-700-text, .light-blue-700-text .material-icons {\n  color: #0288D1;\n}\n.light-blue-800 {\n  background: #0277BD;\n}\n.light-blue-800-text, .light-blue-800-text .material-icons {\n  color: #0277BD;\n}\n.light-blue-900 {\n  background: #01579B;\n}\n.light-blue-900-text, .light-blue-900-text .material-icons {\n  color: #01579B;\n}\n.light-blue-a100 {\n  background: #80D8FF;\n}\n.light-blue-a100-text, .light-blue-a100-text .material-icons {\n  color: #80D8FF;\n}\n.light-blue-a200 {\n  background: #40C4FF;\n}\n.light-blue-a200-text, .light-blue-a200-text .material-icons {\n  color: #40C4FF;\n}\n.light-blue-a400 {\n  background: #00B0FF;\n}\n.light-blue-a400-text, .light-blue-a400-text .material-icons {\n  color: #00B0FF;\n}\n.light-blue-a700 {\n  background: #0091EA;\n}\n.light-blue-a700-text, .light-blue-a700-text .material-icons {\n  color: #0091EA;\n}\n.cyan, .cyan-500 {\n  background: #00BCD4;\n}\n.cyan-text, .cyan-500-text, .cyan-text .material-icons, .cyan-500-text .material-icons {\n  color: #00BCD4;\n}\n.cyan-50 {\n  background: #E0F7FA;\n}\n.cyan-50-text, .cyan-50-text .material-icons {\n  color: #E0F7FA;\n}\n.cyan-100 {\n  background: #B2EBF2;\n}\n.cyan-100-text, .cyan-100-text .material-icons {\n  color: #B2EBF2;\n}\n.cyan-200 {\n  background: #80DEEA;\n}\n.cyan-200-text, .cyan-200-text .material-icons {\n  color: #80DEEA;\n}\n.cyan-300 {\n  background: #4DD0E1;\n}\n.cyan-300-text, .cyan-300-text .material-icons {\n  color: #4DD0E1;\n}\n.cyan-400 {\n  background: #26C6DA;\n}\n.cyan-400-text, .cyan-400-text .material-icons {\n  color: #26C6DA;\n}\n.cyan-600 {\n  background: #00ACC1;\n}\n.cyan-600-text, .cyan-600-text .material-icons {\n  color: #00ACC1;\n}\n.cyan-700 {\n  background: #0097A7;\n}\n.cyan-700-text, .cyan-700-text .material-icons {\n  color: #0097A7;\n}\n.cyan-800 {\n  background: #00838F;\n}\n.cyan-800-text, .cyan-800-text .material-icons {\n  color: #00838F;\n}\n.cyan-900 {\n  background: #006064;\n}\n.cyan-900-text, .cyan-900-text .material-icons {\n  color: #006064;\n}\n.cyan-a100 {\n  background: #84FFFF;\n}\n.cyan-a100-text, .cyan-a100-text .material-icons {\n  color: #84FFFF;\n}\n.cyan-a200 {\n  background: #18FFFF;\n}\n.cyan-a200-text, .cyan-a200-text .material-icons {\n  color: #18FFFF;\n}\n.cyan-a400 {\n  background: #00E5FF;\n}\n.cyan-a400-text, .cyan-a400-text .material-icons {\n  color: #00E5FF;\n}\n.cyan-a700 {\n  background: #00B8D4;\n}\n.cyan-a700-text, .cyan-a700-text .material-icons {\n  color: #00B8D4;\n}\n.teal, .teal-500 {\n  background: #009688;\n}\n.teal-text, .teal-500-text, .teal-text .material-icons, .teal-500-text .material-icons {\n  color: #009688;\n}\n.teal-50 {\n  background: #E0F2F1;\n}\n.teal-50-text, .teal-50-text .material-icons {\n  color: #E0F2F1;\n}\n.teal-100 {\n  background: #B2DFDB;\n}\n.teal-100-text, .teal-100-text .material-icons {\n  color: #B2DFDB;\n}\n.teal-200 {\n  background: #80CBC4;\n}\n.teal-200-text, .teal-200-text .material-icons {\n  color: #80CBC4;\n}\n.teal-300 {\n  background: #4DB6AC;\n}\n.teal-300-text, .teal-300-text .material-icons {\n  color: #4DB6AC;\n}\n.teal-400 {\n  background: #26A69A;\n}\n.teal-400-text, .teal-400-text .material-icons {\n  color: #26A69A;\n}\n.teal-600 {\n  background: #00897B;\n}\n.teal-600-text, .teal-600-text .material-icons {\n  color: #00897B;\n}\n.teal-700 {\n  background: #00796B;\n}\n.teal-700-text, .teal-700-text .material-icons {\n  color: #00796B;\n}\n.teal-800 {\n  background: #00695C;\n}\n.teal-800-text, .teal-800-text .material-icons {\n  color: #00695C;\n}\n.teal-900 {\n  background: #004D40;\n}\n.teal-900-text, .teal-900-text .material-icons {\n  color: #004D40;\n}\n.teal-a100 {\n  background: #A7FFEB;\n}\n.teal-a100-text, .teal-a100-text .material-icons {\n  color: #A7FFEB;\n}\n.teal-a200 {\n  background: #64FFDA;\n}\n.teal-a200-text, .teal-a200-text .material-icons {\n  color: #64FFDA;\n}\n.teal-a400 {\n  background: #1DE9B6;\n}\n.teal-a400-text, .teal-a400-text .material-icons {\n  color: #1DE9B6;\n}\n.teal-a700 {\n  background: #00BFA5;\n}\n.teal-a700-text, .teal-a700-text .material-icons {\n  color: #00BFA5;\n}\n.green, .green-500 {\n  background: #4CAF50;\n}\n.green-text, .green-500-text, .green-text .material-icons, .green-500-text .material-icons {\n  color: #4CAF50;\n}\n.green-50 {\n  background: #E8F5E9;\n}\n.green-50-text, .green-50-text .material-icons {\n  color: #E8F5E9;\n}\n.green-100 {\n  background: #C8E6C9;\n}\n.green-100-text, .green-100-text .material-icons {\n  color: #C8E6C9;\n}\n.green-200 {\n  background: #A5D6A7;\n}\n.green-200-text, .green-200-text .material-icons {\n  color: #A5D6A7;\n}\n.green-300 {\n  background: #81C784;\n}\n.green-300-text, .green-300-text .material-icons {\n  color: #81C784;\n}\n.green-400 {\n  background: #66BB6A;\n}\n.green-400-text, .green-400-text .material-icons {\n  color: #66BB6A;\n}\n.green-600 {\n  background: #43A047;\n}\n.green-600-text, .green-600-text .material-icons {\n  color: #43A047;\n}\n.green-700 {\n  background: #388E3C;\n}\n.green-700-text, .green-700-text .material-icons {\n  color: #388E3C;\n}\n.green-800 {\n  background: #2E7D32;\n}\n.green-800-text, .green-800-text .material-icons {\n  color: #2E7D32;\n}\n.green-900 {\n  background: #1B5E20;\n}\n.green-900-text, .green-900-text .material-icons {\n  color: #1B5E20;\n}\n.green-a100 {\n  background: #B9F6CA;\n}\n.green-a100-text, .green-a100-text .material-icons {\n  color: #B9F6CA;\n}\n.green-a200 {\n  background: #69F0AE;\n}\n.green-a200-text, .green-a200-text .material-icons {\n  color: #69F0AE;\n}\n.green-a400 {\n  background: #00E676;\n}\n.green-a400-text, .green-a400-text .material-icons {\n  color: #00E676;\n}\n.green-a700 {\n  background: #00C853;\n}\n.green-a700-text, .green-a700-text .material-icons {\n  color: #00C853;\n}\n.light-green, .light-green-500 {\n  background: #8BC34A;\n}\n.light-green-text, .light-green-500-text, .light-green-text .material-icons, .light-green-500-text .material-icons {\n  color: #8BC34A;\n}\n.light-green-50 {\n  background: #F1F8E9;\n}\n.light-green-50-text, .light-green-50-text .material-icons {\n  color: #F1F8E9;\n}\n.light-green-100 {\n  background: #DCEDC8;\n}\n.light-green-100-text, .light-green-100-text .material-icons {\n  color: #DCEDC8;\n}\n.light-green-200 {\n  background: #C5E1A5;\n}\n.light-green-200-text, .light-green-200-text .material-icons {\n  color: #C5E1A5;\n}\n.light-green-300 {\n  background: #AED581;\n}\n.light-green-300-text, .light-green-300-text .material-icons {\n  color: #AED581;\n}\n.light-green-400 {\n  background: #9CCC65;\n}\n.light-green-400-text, .light-green-400-text .material-icons {\n  color: #9CCC65;\n}\n.light-green-600 {\n  background: #7CB342;\n}\n.light-green-600-text, .light-green-600-text .material-icons {\n  color: #7CB342;\n}\n.light-green-700 {\n  background: #689F38;\n}\n.light-green-700-text, .light-green-700-text .material-icons {\n  color: #689F38;\n}\n.light-green-800 {\n  background: #558B2F;\n}\n.light-green-800-text, .light-green-800-text .material-icons {\n  color: #558B2F;\n}\n.light-green-900 {\n  background: #33691E;\n}\n.light-green-900-text, .light-green-900-text .material-icons {\n  color: #33691E;\n}\n.light-green-a100 {\n  background: #CCFF90;\n}\n.light-green-a100-text, .light-green-a100-text .material-icons {\n  color: #CCFF90;\n}\n.light-green-a200 {\n  background: #B2FF59;\n}\n.light-green-a200-text, .light-green-a200-text .material-icons {\n  color: #B2FF59;\n}\n.light-green-a400 {\n  background: #76FF03;\n}\n.light-green-a400-text, .light-green-a400-text .material-icons {\n  color: #76FF03;\n}\n.light-green-a700 {\n  background: #64DD17;\n}\n.light-green-a700-text, .light-green-a700-text .material-icons {\n  color: #64DD17;\n}\n.lime, .lime-500 {\n  background: #CDDC39;\n}\n.lime-text, .lime-500-text, .lime-text .material-icons, .lime-500-text .material-icons {\n  color: #CDDC39;\n}\n.lime-50 {\n  background: #F9FBE7;\n}\n.lime-50-text, .lime-50-text .material-icons {\n  color: #F9FBE7;\n}\n.lime-100 {\n  background: #F0F4C3;\n}\n.lime-100-text, .lime-100-text .material-icons {\n  color: #F0F4C3;\n}\n.lime-200 {\n  background: #E6EE9C;\n}\n.lime-200-text, .lime-200-text .material-icons {\n  color: #E6EE9C;\n}\n.lime-300 {\n  background: #DCE775;\n}\n.lime-300-text, .lime-300-text .material-icons {\n  color: #DCE775;\n}\n.lime-400 {\n  background: #D4E157;\n}\n.lime-400-text, .lime-400-text .material-icons {\n  color: #D4E157;\n}\n.lime-600 {\n  background: #C0CA33;\n}\n.lime-600-text, .lime-600-text .material-icons {\n  color: #C0CA33;\n}\n.lime-700 {\n  background: #AFB42B;\n}\n.lime-700-text, .lime-700-text .material-icons {\n  color: #AFB42B;\n}\n.lime-800 {\n  background: #9E9D24;\n}\n.lime-800-text, .lime-800-text .material-icons {\n  color: #9E9D24;\n}\n.lime-900 {\n  background: #827717;\n}\n.lime-900-text, .lime-900-text .material-icons {\n  color: #827717;\n}\n.lime-a100 {\n  background: #F4FF81;\n}\n.lime-a100-text, .lime-a100-text .material-icons {\n  color: #F4FF81;\n}\n.lime-a200 {\n  background: #EEFF41;\n}\n.lime-a200-text, .lime-a200-text .material-icons {\n  color: #EEFF41;\n}\n.lime-a400 {\n  background: #C6FF00;\n}\n.lime-a400-text, .lime-a400-text .material-icons {\n  color: #C6FF00;\n}\n.lime-a700 {\n  background: #AEEA00;\n}\n.lime-a700-text, .lime-a700-text .material-icons {\n  color: #AEEA00;\n}\n.yellow, .yellow-500 {\n  background: #FFEB3B;\n}\n.yellow-text, .yellow-500-text, .yellow-text .material-icons, .yellow-500-text .material-icons {\n  color: #FFEB3B;\n}\n.yellow-50 {\n  background: #FFFDE7;\n}\n.yellow-50-text, .yellow-50-text .material-icons {\n  color: #FFFDE7;\n}\n.yellow-100 {\n  background: #FFF9C4;\n}\n.yellow-100-text, .yellow-100-text .material-icons {\n  color: #FFF9C4;\n}\n.yellow-200 {\n  background: #FFF59D;\n}\n.yellow-200-text, .yellow-200-text .material-icons {\n  color: #FFF59D;\n}\n.yellow-300 {\n  background: #FFF176;\n}\n.yellow-300-text, .yellow-300-text .material-icons {\n  color: #FFF176;\n}\n.yellow-400 {\n  background: #FFEE58;\n}\n.yellow-400-text, .yellow-400-text .material-icons {\n  color: #FFEE58;\n}\n.yellow-600 {\n  background: #FDD835;\n}\n.yellow-600-text, .yellow-600-text .material-icons {\n  color: #FDD835;\n}\n.yellow-700 {\n  background: #FBC02D;\n}\n.yellow-700-text, .yellow-700-text .material-icons {\n  color: #FBC02D;\n}\n.yellow-800 {\n  background: #F9A825;\n}\n.yellow-800-text, .yellow-800-text .material-icons {\n  color: #F9A825;\n}\n.yellow-900 {\n  background: #F57F17;\n}\n.yellow-900-text, .yellow-900-text .material-icons {\n  color: #F57F17;\n}\n.yellow-a100 {\n  background: #FFFF8D;\n}\n.yellow-a100-text, .yellow-a100-text .material-icons {\n  color: #FFFF8D;\n}\n.yellow-a200 {\n  background: #FFFF00;\n}\n.yellow-a200-text, .yellow-a200-text .material-icons {\n  color: #FFFF00;\n}\n.yellow-a400 {\n  background: #FFEA00;\n}\n.yellow-a400-text, .yellow-a400-text .material-icons {\n  color: #FFEA00;\n}\n.yellow-a700 {\n  background: #FFD600;\n}\n.yellow-a700-text, .yellow-a700-text .material-icons {\n  color: #FFD600;\n}\n.amber, .amber-500 {\n  background: #FFC107;\n}\n.amber-text, .amber-500-text, .amber-text .material-icons, .amber-500-text .material-icons {\n  color: #FFC107;\n}\n.amber-50 {\n  background: #FFF8E1;\n}\n.amber-50-text, .amber-50-text .material-icons {\n  color: #FFF8E1;\n}\n.amber-100 {\n  background: #FFECB3;\n}\n.amber-100-text, .amber-100-text .material-icons {\n  color: #FFECB3;\n}\n.amber-200 {\n  background: #FFE082;\n}\n.amber-200-text, .amber-200-text .material-icons {\n  color: #FFE082;\n}\n.amber-300 {\n  background: #FFD54F;\n}\n.amber-300-text, .amber-300-text .material-icons {\n  color: #FFD54F;\n}\n.amber-400 {\n  background: #FFCA28;\n}\n.amber-400-text, .amber-400-text .material-icons {\n  color: #FFCA28;\n}\n.amber-600 {\n  background: #FFB300;\n}\n.amber-600-text, .amber-600-text .material-icons {\n  color: #FFB300;\n}\n.amber-700 {\n  background: #FFA000;\n}\n.amber-700-text, .amber-700-text .material-icons {\n  color: #FFA000;\n}\n.amber-800 {\n  background: #FF8F00;\n}\n.amber-800-text, .amber-800-text .material-icons {\n  color: #FF8F00;\n}\n.amber-900 {\n  background: #FF6F00;\n}\n.amber-900-text, .amber-900-text .material-icons {\n  color: #FF6F00;\n}\n.amber-a100 {\n  background: #FFE57F;\n}\n.amber-a100-text, .amber-a100-text .material-icons {\n  color: #FFE57F;\n}\n.amber-a200 {\n  background: #FFD740;\n}\n.amber-a200-text, .amber-a200-text .material-icons {\n  color: #FFD740;\n}\n.amber-a400 {\n  background: #FFC400;\n}\n.amber-a400-text, .amber-a400-text .material-icons {\n  color: #FFC400;\n}\n.amber-a700 {\n  background: #FFAB00;\n}\n.amber-a700-text, .amber-a700-text .material-icons {\n  color: #FFAB00;\n}\n.orange, .orange-500 {\n  background: #FF9800;\n}\n.orange-text, .orange-500-text, .orange-text .material-icons, .orange-500-text .material-icons {\n  color: #FF9800;\n}\n.orange-50 {\n  background: #FFF3E0;\n}\n.orange-50-text, .orange-50-text .material-icons {\n  color: #FFF3E0;\n}\n.orange-100 {\n  background: #FFE0B2;\n}\n.orange-100-text, .orange-100-text .material-icons {\n  color: #FFE0B2;\n}\n.orange-200 {\n  background: #FFCC80;\n}\n.orange-200-text, .orange-200-text .material-icons {\n  color: #FFCC80;\n}\n.orange-300 {\n  background: #FFB74D;\n}\n.orange-300-text, .orange-300-text .material-icons {\n  color: #FFB74D;\n}\n.orange-400 {\n  background: #FFA726;\n}\n.orange-400-text, .orange-400-text .material-icons {\n  color: #FFA726;\n}\n.orange-600 {\n  background: #FB8C00;\n}\n.orange-600-text, .orange-600-text .material-icons {\n  color: #FB8C00;\n}\n.orange-700 {\n  background: #F57C00;\n}\n.orange-700-text, .orange-700-text .material-icons {\n  color: #F57C00;\n}\n.orange-800 {\n  background: #EF6C00;\n}\n.orange-800-text, .orange-800-text .material-icons {\n  color: #EF6C00;\n}\n.orange-900 {\n  background: #E65100;\n}\n.orange-900-text, .orange-900-text .material-icons {\n  color: #E65100;\n}\n.orange-a100 {\n  background: #FFD180;\n}\n.orange-a100-text, .orange-a100-text .material-icons {\n  color: #FFD180;\n}\n.orange-a200 {\n  background: #FFAB40;\n}\n.orange-a200-text, .orange-a200-text .material-icons {\n  color: #FFAB40;\n}\n.orange-a400 {\n  background: #FF9100;\n}\n.orange-a400-text, .orange-a400-text .material-icons {\n  color: #FF9100;\n}\n.orange-a700 {\n  background: #FF6D00;\n}\n.orange-a700-text, .orange-a700-text .material-icons {\n  color: #FF6D00;\n}\n.deep-orange, .deep-orange-500 {\n  background: #FF5722;\n}\n.deep-orange-text, .deep-orange-500-text, .deep-orange-text .material-icons, .deep-orange-500-text .material-icons {\n  color: #FF5722;\n}\n.deep-orange-50 {\n  background: #FBE9E7;\n}\n.deep-orange-50-text, .deep-orange-50-text .material-icons {\n  color: #FBE9E7;\n}\n.deep-orange-100 {\n  background: #FFCCBC;\n}\n.deep-orange-100-text, .deep-orange-100-text .material-icons {\n  color: #FFCCBC;\n}\n.deep-orange-200 {\n  background: #FFAB91;\n}\n.deep-orange-200-text, .deep-orange-200-text .material-icons {\n  color: #FFAB91;\n}\n.deep-orange-300 {\n  background: #FF8A65;\n}\n.deep-orange-300-text, .deep-orange-300-text .material-icons {\n  color: #FF8A65;\n}\n.deep-orange-400 {\n  background: #FF7043;\n}\n.deep-orange-400-text, .deep-orange-400-text .material-icons {\n  color: #FF7043;\n}\n.deep-orange-600 {\n  background: #F4511E;\n}\n.deep-orange-600-text, .deep-orange-600-text .material-icons {\n  color: #F4511E;\n}\n.deep-orange-700 {\n  background: #E64A19;\n}\n.deep-orange-700-text, .deep-orange-700-text .material-icons {\n  color: #E64A19;\n}\n.deep-orange-800 {\n  background: #D84315;\n}\n.deep-orange-800-text, .deep-orange-800-text .material-icons {\n  color: #D84315;\n}\n.deep-orange-900 {\n  background: #BF360C;\n}\n.deep-orange-900-text, .deep-orange-900-text .material-icons {\n  color: #BF360C;\n}\n.deep-orange-a100 {\n  background: #FF9E80;\n}\n.deep-orange-a100-text, .deep-orange-a100-text .material-icons {\n  color: #FF9E80;\n}\n.deep-orange-a200 {\n  background: #FF6E40;\n}\n.deep-orange-a200-text, .deep-orange-a200-text .material-icons {\n  color: #FF6E40;\n}\n.deep-orange-a400 {\n  background: #FF3D00;\n}\n.deep-orange-a400-text, .deep-orange-a400-text .material-icons {\n  color: #FF3D00;\n}\n.deep-orange-a700 {\n  background: #DD2C00;\n}\n.deep-orange-a700-text, .deep-orange-a700-text .material-icons {\n  color: #DD2C00;\n}\n.brown, .brown-500 {\n  background: #795548;\n}\n.brown-text, .brown-500-text, .brown-text .material-icons, .brown-500-text .material-icons {\n  color: #795548;\n}\n.brown-50 {\n  background: #EFEBE9;\n}\n.brown-50-text, .brown-50-text .material-icons {\n  color: #EFEBE9;\n}\n.brown-100 {\n  background: #D7CCC8;\n}\n.brown-100-text, .brown-100-text .material-icons {\n  color: #D7CCC8;\n}\n.brown-200 {\n  background: #BCAAA4;\n}\n.brown-200-text, .brown-200-text .material-icons {\n  color: #BCAAA4;\n}\n.brown-300 {\n  background: #A1887F;\n}\n.brown-300-text, .brown-300-text .material-icons {\n  color: #A1887F;\n}\n.brown-400 {\n  background: #8D6E63;\n}\n.brown-400-text, .brown-400-text .material-icons {\n  color: #8D6E63;\n}\n.brown-600 {\n  background: #6D4C41;\n}\n.brown-600-text, .brown-600-text .material-icons {\n  color: #6D4C41;\n}\n.brown-700 {\n  background: #5D4037;\n}\n.brown-700-text, .brown-700-text .material-icons {\n  color: #5D4037;\n}\n.brown-800 {\n  background: #4E342E;\n}\n.brown-800-text, .brown-800-text .material-icons {\n  color: #4E342E;\n}\n.brown-900 {\n  background: #3E2723;\n}\n.brown-900-text, .brown-900-text .material-icons {\n  color: #3E2723;\n}\n.grey, .grey-500 {\n  background: #9E9E9E;\n}\n.grey-text, .grey-500-text, .grey-text .material-icons, .grey-500-text .material-icons {\n  color: #9E9E9E;\n}\n.grey-50 {\n  background: #FAFAFA;\n}\n.grey-50-text, .grey-50-text .material-icons {\n  color: #FAFAFA;\n}\n.grey-100 {\n  background: #F5F5F5;\n}\n.grey-100-text, .grey-100-text .material-icons {\n  color: #F5F5F5;\n}\n.grey-200 {\n  background: #EEEEEE;\n}\n.grey-200-text, .grey-200-text .material-icons {\n  color: #EEEEEE;\n}\n.grey-300 {\n  background: #E0E0E0;\n}\n.grey-300-text, .grey-300-text .material-icons {\n  color: #E0E0E0;\n}\n.grey-400 {\n  background: #BDBDBD;\n}\n.grey-400-text, .grey-400-text .material-icons {\n  color: #BDBDBD;\n}\n.grey-600 {\n  background: #757575;\n}\n.grey-600-text, .grey-600-text .material-icons {\n  color: #757575;\n}\n.grey-700 {\n  background: #616161;\n}\n.grey-700-text, .grey-700-text .material-icons {\n  color: #616161;\n}\n.grey-800 {\n  background: #424242;\n}\n.grey-800-text, .grey-800-text .material-icons {\n  color: #424242;\n}\n.grey-900 {\n  background: #212121;\n}\n.grey-900-text, .grey-900-text .material-icons {\n  color: #212121;\n}\n.blue-grey, .blue-grey-500 {\n  background: #607D8B;\n}\n.blue-grey-text, .blue-grey-500-text, .blue-grey-text .material-icons, .blue-grey-500-text .material-icons {\n  color: #607D8B;\n}\n.blue-grey-50 {\n  background: #ECEFF1;\n}\n.blue-grey-50-text, .blue-grey-50-text .material-icons {\n  color: #ECEFF1;\n}\n.blue-grey-100 {\n  background: #CFD8DC;\n}\n.blue-grey-100-text, .blue-grey-100-text .material-icons {\n  color: #CFD8DC;\n}\n.blue-grey-200 {\n  background: #B0BEC5;\n}\n.blue-grey-200-text, .blue-grey-200-text .material-icons {\n  color: #B0BEC5;\n}\n.blue-grey-300 {\n  background: #90A4AE;\n}\n.blue-grey-300-text, .blue-grey-300-text .material-icons {\n  color: #90A4AE;\n}\n.blue-grey-400 {\n  background: #78909C;\n}\n.blue-grey-400-text, .blue-grey-400-text .material-icons {\n  color: #78909C;\n}\n.blue-grey-600 {\n  background: #546E7A;\n}\n.blue-grey-600-text, .blue-grey-600-text .material-icons {\n  color: #546E7A;\n}\n.blue-grey-700 {\n  background: #455A64;\n}\n.blue-grey-700-text, .blue-grey-700-text .material-icons {\n  color: #455A64;\n}\n.blue-grey-800 {\n  background: #37474F;\n}\n.blue-grey-800-text, .blue-grey-800-text .material-icons {\n  color: #37474F;\n}\n.blue-grey-900 {\n  background: #263238;\n}\n.blue-grey-900-text, .blue-grey-900-text .material-icons {\n  color: #263238;\n}\n.black {\n  background: #000000;\n}\n.black-text, .black-text .material-icons {\n  color: #000000;\n}\n.white {\n  background: #FFFFFF;\n}\n.white-text, .white-text .material-icons {\n  color: #FFFFFF;\n}\n@media only screen and (min-width: 961px) {\nbody.full-width .appbar .appbar-title {\n    margin-left: 0.85714rem;\n}\n}\n@media only screen and (min-width: 961px) {\nbody.full-width .bottom-nav, body.full-width .bottom-shifting {\n    left: 0;\n    width: 100%;\n}\n}\nbody.full-width .drawer {\n  margin: 0 0 0 -102%;\n}\n@media only screen and (min-width: 961px) {\nbody.full-width .drawer {\n      margin: 0 0 0 -102%;\n}\n}\nbody.full-width .drawer ~ main {\n    left: 0;\n    -webkit-transition: left 300ms cubic-bezier(0, 0, 0.2, 1);\n    -moz-transition: left 300ms cubic-bezier(0, 0, 0.2, 1);\n    -o-transition: left 300ms cubic-bezier(0, 0, 0.2, 1);\n    transition: left 300ms cubic-bezier(0, 0, 0.2, 1);\n}\n@media only screen and (min-width: 961px) and (max-width: 1280px) {\nbody.full-width .drawer ~ main {\n        -webkit-transition: left 390ms cubic-bezier(0, 0, 0.2, 1);\n        -moz-transition: left 390ms cubic-bezier(0, 0, 0.2, 1);\n        -o-transition: left 390ms cubic-bezier(0, 0, 0.2, 1);\n        transition: left 390ms cubic-bezier(0, 0, 0.2, 1);\n}\n}\n@media only screen and (min-width: 1281px) {\nbody.full-width .drawer ~ main {\n        -webkit-transition: left 200ms cubic-bezier(0, 0, 0.2, 1);\n        -moz-transition: left 200ms cubic-bezier(0, 0, 0.2, 1);\n        -o-transition: left 200ms cubic-bezier(0, 0, 0.2, 1);\n        transition: left 200ms cubic-bezier(0, 0, 0.2, 1);\n}\n}\nbody.full-width .drawer.expanded {\n    margin: 0;\n}\n@media only screen and (min-width: 961px) {\nbody.full-width .drawer.expanded ~ main {\n        left: 20rem;\n        -webkit-transition: left 300ms cubic-bezier(0.4, 0, 0.6, 1);\n        -moz-transition: left 300ms cubic-bezier(0.4, 0, 0.6, 1);\n        -o-transition: left 300ms cubic-bezier(0.4, 0, 0.6, 1);\n        transition: left 300ms cubic-bezier(0.4, 0, 0.6, 1);\n}\n}\n@media only screen and (min-width: 961px) and (min-width: 961px) and (max-width: 1280px) {\nbody.full-width .drawer.expanded ~ main {\n      -webkit-transition: left 390ms cubic-bezier(0.4, 0, 0.6, 1);\n      -moz-transition: left 390ms cubic-bezier(0.4, 0, 0.6, 1);\n      -o-transition: left 390ms cubic-bezier(0.4, 0, 0.6, 1);\n      transition: left 390ms cubic-bezier(0.4, 0, 0.6, 1);\n}\n}\n@media only screen and (min-width: 961px) and (min-width: 1281px) {\nbody.full-width .drawer.expanded ~ main {\n      -webkit-transition: left 200ms cubic-bezier(0.4, 0, 0.6, 1);\n      -moz-transition: left 200ms cubic-bezier(0.4, 0, 0.6, 1);\n      -o-transition: left 200ms cubic-bezier(0.4, 0, 0.6, 1);\n      transition: left 200ms cubic-bezier(0.4, 0, 0.6, 1);\n}\n}\n@media only screen and (min-width: 961px) {\nbody.full-width .tabs {\n    left: 0;\n    width: 100%;\n}\n}\n.container {\n  width: 90%;\n  margin: 0 auto;\n}\n@media only screen and (min-width: 1281px) {\n.container {\n      width: 80%;\n}\n}\n.container .appbar {\n    width: 90%;\n}\n@media only screen and (min-width: 1281px) {\n.container .appbar {\n        width: 80%;\n}\n}\n.container .drawer {\n    left: initial;\n}\n.container main, .container .main-content, .container .bottom-nav, .container .bottom-shifting {\n    left: 5%;\n    right: 5%;\n}\n@media only screen and (min-width: 1281px) {\n.container main, .container .main-content, .container .bottom-nav, .container .bottom-shifting {\n        left: calc(10% + 20rem);\n        right: 10%;\n}\n}\n.container .bottom-nav, .container .bottom-shifting {\n    width: calc( 100% - 20rem - ( 5% * 2 ));\n}\n@media only screen and (min-width: 1281px) {\n.container .bottom-nav, .container .bottom-shifting {\n        width: calc(100% - 20rem - (10% * 2));\n}\n}\n.container .tabs {\n    left: 5%;\n    right: 5%;\n}\n@media only screen and (min-width: 1281px) {\n.container .tabs {\n        width: calc( 80% - 20rem + 0.07143rem);\n        left: calc( 10% + ( 20rem - 0.07143rem ));\n        right: 10%;\n}\n}\n", ""]);

// exports


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles(parentId, list) {
  var styles = [];
  var newStyles = {};
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = item[0];
    var css = item[1];
    var media = item[2];
    var sourceMap = item[3];
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    };
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] });
    } else {
      newStyles[id].parts.push(part);
    }
  }
  return styles;
};

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Appbar_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Appbar_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Appbar_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Appbar_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Appbar_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7240db89_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Appbar_vue__ = __webpack_require__(19);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Appbar_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7240db89_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Appbar_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\Appbar.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7240db89", Component.options)
  } else {
    hotAPI.reload("data-v-7240db89", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 16 */,
/* 17 */,
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if (item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function (modules, mediaQuery) {
		if (typeof modules === "string") modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for (var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if (typeof id === "number") alreadyImportedModules[id] = true;
		}
		for (i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if (mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if (mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "header",
    { staticClass: "appbar" },
    [
      _c("Icon", { attrs: { name: "menu" } }),
      _vm._v(" "),
      _c("div", { staticClass: "appbar-title" }, [
        _c("h1", [_vm._v(_vm._s(_vm.title))])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "appbar-spacer" }),
      _vm._v(" "),
      _vm._t("default")
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-7240db89", esExports)
  }
}

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "Appbar",
        { attrs: { title: "Home" } },
        [
          _c("Icon", { attrs: { name: "search" } }),
          _vm._v(" "),
          _c("Icon", { attrs: { name: "person" } }),
          _vm._v(" "),
          _c("Icon", { attrs: { name: "more_vert" } })
        ],
        1
      ),
      _vm._v(" "),
      _c("NavigationDrawer", { staticClass: "drawer-permanent" }, [
        _c("div", { attrs: { slot: "content" }, slot: "content" })
      ]),
      _vm._v(" "),
      _c("main")
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-b8ba542a", esExports)
  }
}

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Icon_vue__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Icon_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Icon_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Icon_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Icon_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_a3f17420_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Icon_vue__ = __webpack_require__(22);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Icon_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_a3f17420_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Icon_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\Icon.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a3f17420", Component.options)
  } else {
    hotAPI.reload("data-v-a3f17420", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("i", { staticClass: "material-icons" }, [_vm._v(_vm._s(_vm.name))])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-a3f17420", esExports)
  }
}

/***/ }),
/* 23 */,
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_template_compiler_index_id_data_v_119c4d1c_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_NavigationDrawer_vue__ = __webpack_require__(25);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = null
/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_template_compiler_index_id_data_v_119c4d1c_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_NavigationDrawer_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\NavigationDrawer.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-119c4d1c", Component.options)
  } else {
    hotAPI.reload("data-v-119c4d1c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "nav",
    { staticClass: "drawer" },
    [
      _c("div", { staticClass: "drawer-header" }, [_vm._t("header")], 2),
      _vm._v(" "),
      _vm._t("content")
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-119c4d1c", esExports)
  }
}

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.store = undefined;

var _vue = __webpack_require__(8);

var _vue2 = _interopRequireDefault(_vue);

var _vuex = __webpack_require__(27);

var _vuex2 = _interopRequireDefault(_vuex);

var _getters = __webpack_require__(28);

var _getters2 = _interopRequireDefault(_getters);

var _actions = __webpack_require__(29);

var _actions2 = _interopRequireDefault(_actions);

var _mutations = __webpack_require__(30);

var _mutations2 = _interopRequireDefault(_mutations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vuex2.default);

var store = exports.store = new _vuex2.default.Store({
	state: {
		drawer: false
	},
	getters: _getters2.default,
	mutations: _mutations2.default,
	actions: _actions2.default
});

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * vuex v3.0.1
 * (c) 2017 Evan You
 * @license MIT
 */
var applyMixin = function applyMixin(Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if (options === void 0) options = {};

      options.init = options.init ? [vuexInit].concat(options.init) : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit() {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function' ? options.store() : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
};

var devtoolHook = typeof window !== 'undefined' && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin(store) {
  if (!devtoolHook) {
    return;
  }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */

/**
 * forEach for object
 */
function forEachValue(obj, fn) {
  Object.keys(obj).forEach(function (key) {
    return fn(obj[key], key);
  });
}

function isObject(obj) {
  return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
}

function isPromise(val) {
  return val && typeof val.then === 'function';
}

function assert(condition, msg) {
  if (!condition) {
    throw new Error("[vuex] " + msg);
  }
}

var Module = function Module(rawModule, runtime) {
  this.runtime = runtime;
  this._children = Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors$1 = { namespaced: { configurable: true } };

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced;
};

Module.prototype.addChild = function addChild(key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild(key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild(key) {
  return this._children[key];
};

Module.prototype.update = function update(rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild(fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter(fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction(fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation(fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties(Module.prototype, prototypeAccessors$1);

var ModuleCollection = function ModuleCollection(rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get(path) {
  return path.reduce(function (module, key) {
    return module.getChild(key);
  }, this.root);
};

ModuleCollection.prototype.getNamespace = function getNamespace(path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '');
  }, '');
};

ModuleCollection.prototype.update = function update$1(rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register(path, rawModule, runtime) {
  var this$1 = this;
  if (runtime === void 0) runtime = true;

  if (process.env.NODE_ENV !== 'production') {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister(path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) {
    return;
  }

  parent.removeChild(key);
};

function update(path, targetModule, newModule) {
  if (process.env.NODE_ENV !== 'production') {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn("[vuex] trying to add a new module '" + key + "' on hot reloading, " + 'manual reload is needed');
        }
        return;
      }
      update(path.concat(key), targetModule.getChild(key), newModule.modules[key]);
    }
  }
}

var functionAssert = {
  assert: function assert(value) {
    return typeof value === 'function';
  },
  expected: 'function'
};

var objectAssert = {
  assert: function assert(value) {
    return typeof value === 'function' || (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && typeof value.handler === 'function';
  },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule(path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) {
      return;
    }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(assertOptions.assert(value), makeAssertionMessage(path, key, type, value, assertOptions.expected));
    });
  });
}

function makeAssertionMessage(path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + path.join('.') + "\"";
  }
  buf += " is " + JSON.stringify(value) + ".";
  return buf;
}

var Vue; // bind on install

var Store = function Store(options) {
  var this$1 = this;
  if (options === void 0) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if (process.env.NODE_ENV !== 'production') {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "Store must be called with the new operator.");
  }

  var plugins = options.plugins;if (plugins === void 0) plugins = [];
  var strict = options.strict;if (strict === void 0) strict = false;

  var state = options.state;if (state === void 0) state = {};
  if (typeof state === 'function') {
    state = state() || {};
  }

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch(type, payload) {
    return dispatch.call(store, type, payload);
  };
  this.commit = function boundCommit(type, payload, options) {
    return commit.call(store, type, payload, options);
  };

  // strict mode
  this.strict = strict;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) {
    return plugin(this$1);
  });

  if (Vue.config.devtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors = { state: { configurable: true } };

prototypeAccessors.state.get = function () {
  return this._vm._data.$$state;
};

prototypeAccessors.state.set = function (v) {
  if (process.env.NODE_ENV !== 'production') {
    assert(false, "Use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit(_type, _payload, _options) {
  var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
  var type = ref.type;
  var payload = ref.payload;
  var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if (process.env.NODE_ENV !== 'production') {
      console.error("[vuex] unknown mutation type: " + type);
    }
    return;
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator(handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) {
    return sub(mutation, this$1.state);
  });

  if (process.env.NODE_ENV !== 'production' && options && options.silent) {
    console.warn("[vuex] mutation type: " + type + ". Silent option has been removed. " + 'Use the filter functionality in the vue-devtools');
  }
};

Store.prototype.dispatch = function dispatch(_type, _payload) {
  var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
  var type = ref.type;
  var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if (process.env.NODE_ENV !== 'production') {
      console.error("[vuex] unknown action type: " + type);
    }
    return;
  }

  this._actionSubscribers.forEach(function (sub) {
    return sub(action, this$1.state);
  });

  return entry.length > 1 ? Promise.all(entry.map(function (handler) {
    return handler(payload);
  })) : entry[0](payload);
};

Store.prototype.subscribe = function subscribe(fn) {
  return genericSubscribe(fn, this._subscribers);
};

Store.prototype.subscribeAction = function subscribeAction(fn) {
  return genericSubscribe(fn, this._actionSubscribers);
};

Store.prototype.watch = function watch(getter, cb, options) {
  var this$1 = this;

  if (process.env.NODE_ENV !== 'production') {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () {
    return getter(this$1.state, this$1.getters);
  }, cb, options);
};

Store.prototype.replaceState = function replaceState(state) {
  var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule(path, rawModule, options) {
  if (options === void 0) options = {};

  if (typeof path === 'string') {
    path = [path];
  }

  if (process.env.NODE_ENV !== 'production') {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule(path) {
  var this$1 = this;

  if (typeof path === 'string') {
    path = [path];
  }

  if (process.env.NODE_ENV !== 'production') {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate(newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit(fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties(Store.prototype, prototypeAccessors);

function genericSubscribe(fn, subs) {
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  };
}

function resetStore(store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM(store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () {
      return fn(store);
    };
    Object.defineProperty(store.getters, key, {
      get: function get() {
        return store._vm[key];
      },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () {
      return oldVm.$destroy();
    });
  }
}

function installModule(store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext(store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (process.env.NODE_ENV !== 'production' && !store._actions[type]) {
          console.error("[vuex] unknown local action type: " + args.type + ", global type: " + type);
          return;
        }
      }

      return store.dispatch(type, payload);
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (process.env.NODE_ENV !== 'production' && !store._mutations[type]) {
          console.error("[vuex] unknown local mutation type: " + args.type + ", global type: " + type);
          return;
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace ? function () {
        return store.getters;
      } : function () {
        return makeLocalGetters(store, namespace);
      }
    },
    state: {
      get: function get() {
        return getNestedState(store.state, path);
      }
    }
  });

  return local;
}

function makeLocalGetters(store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) {
      return;
    }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function get() {
        return store.getters[type];
      },
      enumerable: true
    });
  });

  return gettersProxy;
}

function registerMutation(store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler(payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction(store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler(payload, cb) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err;
      });
    } else {
      return res;
    }
  });
}

function registerGetter(store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (process.env.NODE_ENV !== 'production') {
      console.error("[vuex] duplicate getter key: " + type);
    }
    return;
  }
  store._wrappedGetters[type] = function wrappedGetter(store) {
    return rawGetter(local.state, // local state
    local.getters, // local getters
    store.state, // root state
    store.getters // root getters
    );
  };
}

function enableStrictMode(store) {
  store._vm.$watch(function () {
    return this._data.$$state;
  }, function () {
    if (process.env.NODE_ENV !== 'production') {
      assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState(state, path) {
  return path.length ? path.reduce(function (state, key) {
    return state[key];
  }, state) : state;
}

function unifyObjectStyle(type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if (process.env.NODE_ENV !== 'production') {
    assert(typeof type === 'string', "Expects string as the type, but found " + (typeof type === 'undefined' ? 'undefined' : _typeof(type)) + ".");
  }

  return { type: type, payload: payload, options: options };
}

function install(_Vue) {
  if (Vue && _Vue === Vue) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[vuex] already installed. Vue.use(Vuex) should be called only once.');
    }
    return;
  }
  Vue = _Vue;
  applyMixin(Vue);
}

var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState() {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return;
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function' ? val.call(this, state, getters) : state[val];
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res;
});

var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation() {
      var args = [],
          len = arguments.length;
      while (len--) {
        args[len] = arguments[len];
      }var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return;
        }
        commit = module.context.commit;
      }
      return typeof val === 'function' ? val.apply(this, [commit].concat(args)) : commit.apply(this.$store, [val].concat(args));
    };
  });
  return res;
});

var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedGetter() {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return;
      }
      if (process.env.NODE_ENV !== 'production' && !(val in this.$store.getters)) {
        console.error("[vuex] unknown getter: " + val);
        return;
      }
      return this.$store.getters[val];
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res;
});

var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction() {
      var args = [],
          len = arguments.length;
      while (len--) {
        args[len] = arguments[len];
      }var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return;
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function' ? val.apply(this, [dispatch].concat(args)) : dispatch.apply(this.$store, [val].concat(args));
    };
  });
  return res;
});

var createNamespacedHelpers = function createNamespacedHelpers(namespace) {
  return {
    mapState: mapState.bind(null, namespace),
    mapGetters: mapGetters.bind(null, namespace),
    mapMutations: mapMutations.bind(null, namespace),
    mapActions: mapActions.bind(null, namespace)
  };
};

function normalizeMap(map) {
  return Array.isArray(map) ? map.map(function (key) {
    return { key: key, val: key };
  }) : Object.keys(map).map(function (key) {
    return { key: key, val: map[key] };
  });
}

function normalizeNamespace(fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map);
  };
}

function getModuleByNamespace(store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (process.env.NODE_ENV !== 'production' && !module) {
    console.error("[vuex] module namespace not found in " + helper + "(): " + namespace);
  }
  return module;
}

var index_esm = {
  Store: Store,
  install: install,
  version: '3.0.1',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};

exports.Store = Store;
exports.install = install;
exports.mapState = mapState;
exports.mapMutations = mapMutations;
exports.mapGetters = mapGetters;
exports.mapActions = mapActions;
exports.createNamespacedHelpers = createNamespacedHelpers;
exports.default = index_esm;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	drawerStatus: function drawerStatus() {
		return state.drawer;
	}
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	setDrawer: function setDrawer() {
		if (state.drawer) {
			state.drawer = false;
		} else {
			state.drawer = true;
		}
	}
};

/***/ })
/******/ ]);