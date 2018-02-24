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
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
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
/* 2 */
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(3), __webpack_require__(11).setImmediate))

/***/ }),
/* 3 */
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _flightForm = __webpack_require__(23);

var _flightForm2 = _interopRequireDefault(_flightForm);

var _accommodationForm = __webpack_require__(25);

var _accommodationForm2 = _interopRequireDefault(_accommodationForm);

var _carForm = __webpack_require__(27);

var _carForm2 = _interopRequireDefault(_carForm);

var _destination = __webpack_require__(29);

var _destination2 = _interopRequireDefault(_destination);

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
//
//

exports.default = {
    data: function data() {
        return {
            continents: {},
            form: 'AccommodationForm',
            image: 'https://images.pexels.com/photos/573552/pexels-photo-573552.jpeg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb',
            topDestination: 1
        };
    },


    components: {
        FlightForm: _flightForm2.default,
        AccommodationForm: _accommodationForm2.default,
        CarForm: _carForm2.default,
        Destination: _destination2.default
    },

    methods: {
        getContinents: function getContinents() {
            var _this = this;

            fetch('/api/continents').then(function (response) {
                return response.json();
            }).then(function (response) {
                _this.continents = response;
            });
        },
        changeForm: function changeForm(type) {
            this.form = type;
            console.log(this.form);

            var img = '';
            switch (type) {
                case 'FlightForm':
                    img = 'https://images.pexels.com/photos/723240/pexels-photo-723240.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb';
                    break;
                case 'AccommodationForm':
                    img = 'https://images.pexels.com/photos/573552/pexels-photo-573552.jpeg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb';
                    break;
                case 'CarForm':
                    img = 'https://images.pexels.com/photos/708764/pexels-photo-708764.jpeg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb';
                    break;
            }

            this.image = img;
        },
        topDestinations: function topDestinations(id) {}
    },

    mounted: function mounted() {
        this.getContinents();
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
//
//
//

exports.default = {
  props: {
    destination: {
      type: Number,
      required: true
    }
  },
  data: function data() {
    return {
      data: {}
    };
  },


  methods: {
    getData: function getData() {
      var _this = this;

      fetch("/api/continent/" + this.destination + "/top-destinations").then(function (response) {
        return response.json();
      }).then(function (response) {
        _this.data = response;
      });
    }
  },

  mounted: function mounted() {
    this.getData();
  }
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Appbar = __webpack_require__(34);

var _Appbar2 = _interopRequireDefault(_Appbar);

var _NavigationDrawer = __webpack_require__(36);

var _NavigationDrawer2 = _interopRequireDefault(_NavigationDrawer);

var _Menu = __webpack_require__(38);

var _Menu2 = _interopRequireDefault(_Menu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    metaInfo: {
        title: 'Home'
    },

    components: {
        'Appbar': _Appbar2.default,
        'NavigationDrawer': _NavigationDrawer2.default,
        'Menu': _Menu2.default
    },

    data: function data() {
        return {
            drawer: false,
            items: [{
                title: 'Home',
                to: '/',
                icon: 'home'
            }, {
                title: 'Accomodaties',
                to: '/accomodations',
                icon: 'hotel'
            }, {
                title: 'Vluchten',
                to: '/flights',
                icon: 'flight'
            }, {
                title: 'Autoverhuur',
                to: '/car-rental',
                icon: 'directions_car'
            }, {
                title: 'Bestemmingen',
                icon: 'expand_more',
                children: [{ title: 'Europa', to: '/location/europe' }, { title: 'Azië', to: '/location/asia' }, { title: 'Amerika', to: '/location/america' }, { title: 'Afrika', to: '/location/africa' }, { title: 'Australië', to: '/location/australia' }]
            }]
        };
    }
}; //
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
//
//

/***/ }),
/* 7 */
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
        },
        drawerId: {
            type: String,
            required: true,
            default: ''
        }
    }
};

/***/ }),
/* 8 */
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

exports.default = {
  props: {
    trigger: {
      type: String,
      required: true,
      default: ''
    }
  }
};

/***/ }),
/* 9 */
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
        trigger: {
            type: String,
            required: true,
            default: ''
        }
    }
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vue = __webpack_require__(2);

var _vue2 = _interopRequireDefault(_vue);

var _vuetify = __webpack_require__(13);

var _vuetify2 = _interopRequireDefault(_vuetify);

var _store = __webpack_require__(15);

var _router = __webpack_require__(20);

var _router2 = _interopRequireDefault(_router);

var _vueMeta = __webpack_require__(32);

var _vueMeta2 = _interopRequireDefault(_vueMeta);

var _Web = __webpack_require__(33);

var _Web2 = _interopRequireDefault(_Web);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vueMeta2.default);
_vue2.default.use(_vuetify2.default);

new _vue2.default({
	el: '#app',
	router: _router2.default,
	store: _store.store,
	render: function render(h) {
		return h(_Web2.default);
	}
});

/***/ }),
/* 11 */
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
__webpack_require__(12);
// On some exotic environments, it's not clear which object `setimmeidate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = typeof self !== "undefined" && self.setImmediate || typeof global !== "undefined" && global.setImmediate || undefined && undefined.setImmediate;
exports.clearImmediate = typeof self !== "undefined" && self.clearImmediate || typeof global !== "undefined" && global.clearImmediate || undefined && undefined.clearImmediate;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 12 */
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3), __webpack_require__(1)))

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof2=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;};(function webpackUniversalModuleDefinition(root,factory){if(( false?'undefined':_typeof2(exports))==='object'&&( false?'undefined':_typeof2(module))==='object')module.exports=factory();else if(true)!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else if((typeof exports==='undefined'?'undefined':_typeof2(exports))==='object')exports["Vuetify"]=factory();else root["Vuetify"]=factory();})(typeof self!=='undefined'?self:undefined,function(){return(/******/function(modules){// webpackBootstrap
/******/// The module cache
/******/var installedModules={};/******//******/// The require function
/******/function __webpack_require__(moduleId){/******//******/// Check if module is in cache
/******/if(installedModules[moduleId]){/******/return installedModules[moduleId].exports;/******/}/******/// Create a new module (and put it into the cache)
/******/var module=installedModules[moduleId]={/******/i:moduleId,/******/l:false,/******/exports:{}/******/};/******//******/// Execute the module function
/******/modules[moduleId].call(module.exports,module,module.exports,__webpack_require__);/******//******/// Flag the module as loaded
/******/module.l=true;/******//******/// Return the exports of the module
/******/return module.exports;/******/}/******//******//******/// expose the modules object (__webpack_modules__)
/******/__webpack_require__.m=modules;/******//******/// expose the module cache
/******/__webpack_require__.c=installedModules;/******//******/// define getter function for harmony exports
/******/__webpack_require__.d=function(exports,name,getter){/******/if(!__webpack_require__.o(exports,name)){/******/Object.defineProperty(exports,name,{/******/configurable:false,/******/enumerable:true,/******/get:getter/******/});/******/}/******/};/******//******/// getDefaultExport function for compatibility with non-harmony modules
/******/__webpack_require__.n=function(module){/******/var getter=module&&module.__esModule?/******/function getDefault(){return module['default'];}:/******/function getModuleExports(){return module;};/******/__webpack_require__.d(getter,'a',getter);/******/return getter;/******/};/******//******/// Object.prototype.hasOwnProperty.call
/******/__webpack_require__.o=function(object,property){return Object.prototype.hasOwnProperty.call(object,property);};/******//******/// __webpack_public_path__
/******/__webpack_require__.p="/dist/";/******//******/// Load entry module and return exports
/******/return __webpack_require__(__webpack_require__.s=69);/******/}(/************************************************************************//******/[/* 0 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";var _slicedToArray=function(){function sliceIterator(arr,i){var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[Symbol.iterator](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break;}}catch(err){_d=true;_e=err;}finally{try{if(!_n&&_i["return"])_i["return"]();}finally{if(_d)throw _e;}}return _arr;}return function(arr,i){if(Array.isArray(arr)){return arr;}else if(Symbol.iterator in Object(arr)){return sliceIterator(arr,i);}else{throw new TypeError("Invalid attempt to destructure non-iterable instance");}};}();/* harmony default export */__webpack_exports__["a"]={name:'colorable',props:{color:String},data:function data(){return{defaultColor:null};},computed:{computedColor:function computedColor(){return this.color||this.defaultColor;}},methods:{addBackgroundColorClassChecks:function addBackgroundColorClassChecks(){var obj=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};var color=arguments.length>1&&arguments[1]!==undefined?arguments[1]:this.computedColor;var classes=Object.assign({},obj);if(color){classes[color]=true;}return classes;},addTextColorClassChecks:function addTextColorClassChecks(){var obj=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};var color=arguments.length>1&&arguments[1]!==undefined?arguments[1]:this.computedColor;var classes=Object.assign({},obj);if(color){var _color$trim$split=color.trim().split(' '),_color$trim$split2=_slicedToArray(_color$trim$split,2),colorName=_color$trim$split2[0],colorModifier=_color$trim$split2[1];classes[colorName+'--text']=true;colorModifier&&(classes['text--'+colorModifier]=true);}return classes;}}};/***/},/* 1 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony default export */__webpack_exports__["a"]={name:'themeable',props:{dark:Boolean,light:Boolean},computed:{themeClasses:function themeClasses(){return{'theme--light':this.light,'theme--dark':this.dark};}}};/***/},/* 2 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony export (immutable) */__webpack_exports__["d"]=createSimpleFunctional;/* harmony export (immutable) */__webpack_exports__["e"]=createSimpleTransition;/* harmony export (immutable) */__webpack_exports__["b"]=createJavaScriptTransition;/* unused harmony export directiveConfig *//* harmony export (immutable) */__webpack_exports__["a"]=addOnceEventListener;/* harmony export (immutable) */__webpack_exports__["h"]=getObjectValueByPath;/* harmony export (immutable) */__webpack_exports__["c"]=createRange;/* harmony export (immutable) */__webpack_exports__["i"]=getZIndex;/* harmony export (immutable) */__webpack_exports__["f"]=escapeHTML;/* harmony export (immutable) */__webpack_exports__["g"]=filterObjectOnKeys;/* unused harmony export filterChildren */var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}else{return Array.from(arr);}}function createSimpleFunctional(c){var el=arguments.length>1&&arguments[1]!==undefined?arguments[1]:'div';var name=arguments[2];name=name||c.replace(/__/g,'-');return{name:'v-'+name,functional:true,render:function render(h,_ref){var data=_ref.data,children=_ref.children;data.staticClass=(c+' '+(data.staticClass||'')).trim();return h(el,data,children);}};}function createSimpleTransition(name){var origin=arguments.length>1&&arguments[1]!==undefined?arguments[1]:'top center 0';var mode=arguments[2];return{name:name,functional:true,props:{origin:{type:String,default:origin}},render:function render(h,context){context.data=context.data||{};context.data.props={name:name};context.data.on=context.data.on||{};if(!Object.isExtensible(context.data.on)){context.data.on=_extends({},context.data.on);}if(mode)context.data.props.mode=mode;context.data.on.beforeEnter=function(el){el.style.transformOrigin=context.props.origin;el.style.webkitTransformOrigin=context.props.origin;};return h('transition',context.data,context.children);}};}function createJavaScriptTransition(name,functions){var css=arguments.length>2&&arguments[2]!==undefined?arguments[2]:true;var mode=arguments.length>3&&arguments[3]!==undefined?arguments[3]:'in-out';return{name:name,functional:true,props:{css:{type:Boolean,default:css},mode:{type:String,default:mode}},render:function render(h,context){var data={props:_extends({},context.props,{name:name}),on:functions};return h('transition',data,context.children);}};}function directiveConfig(binding){var defaults=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};return Object.assign({},defaults,binding.modifiers,{value:binding.arg},binding.value||{});}function addOnceEventListener(el,event,cb){var once=function once(){cb();el.removeEventListener(event,once,false);};el.addEventListener(event,once,false);}function getObjectValueByPath(obj,path){// credit: http://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-with-string-key#comment55278413_6491621
if(!path||path.constructor!==String)return;path=path.replace(/\[(\w+)\]/g,'.$1');// convert indexes to properties
path=path.replace(/^\./,'');// strip a leading dot
var a=path.split('.');for(var i=0,n=a.length;i<n;++i){var k=a[i];if(obj instanceof Object&&k in obj){obj=obj[k];}else{return;}}return obj;}function createRange(length){return[].concat(_toConsumableArray(Array.from({length:length},function(v,k){return k;})));}function getZIndex(el){if(!el||el.nodeType!==Node.ELEMENT_NODE)return 0;var zi=document.defaultView.getComputedStyle(el).getPropertyValue('z-index');if(isNaN(zi))return getZIndex(el.parentNode);return zi;}var tagsToReplace={'&':'&amp;','<':'&lt;','>':'&gt;'};function escapeHTML(str){return str.replace(/[&<>]/g,function(tag){return tagsToReplace[tag]||tag;});}function filterObjectOnKeys(obj,keys){var filtered={};for(var i=0;i<keys.length;i++){var key=keys[i];if(typeof obj[key]!=='undefined'){filtered[key]=obj[key];}}return filtered;}function filterChildren(){var array=arguments.length>0&&arguments[0]!==undefined?arguments[0]:[];var tag=arguments[1];return array.filter(function(child){return child.componentOptions&&child.componentOptions.Ctor.options.name===tag;});}/***/},/* 3 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__VIcon__=__webpack_require__(89);/* istanbul ignore next */__WEBPACK_IMPORTED_MODULE_0__VIcon__["a"/* default */].install=function install(Vue){Vue.component(__WEBPACK_IMPORTED_MODULE_0__VIcon__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_0__VIcon__["a"/* default */]);};/* harmony default export */__webpack_exports__["a"]=__WEBPACK_IMPORTED_MODULE_0__VIcon__["a"/* default */];/***/},/* 4 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony export (immutable) */__webpack_exports__["a"]=inject;/* harmony export (immutable) */__webpack_exports__["b"]=provide;/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__util_console__=__webpack_require__(6);function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}function generateWarning(child,parent){return function(){return Object(__WEBPACK_IMPORTED_MODULE_0__util_console__["b"/* consoleWarn */])('The '+child+' component must be used inside a '+parent);};}function inject(namespace,child,parent){var defaultImpl=child&&parent?{register:generateWarning(child,parent),unregister:generateWarning(child,parent)}:null;return{name:'registrable-inject',inject:_defineProperty({},namespace,{default:defaultImpl})};}function provide(namespace){return{name:'registrable-provide',methods:{register:null,unregister:null},provide:function provide(){return _defineProperty({},namespace,{register:this.register,unregister:this.unregister});}};}/***/},/* 5 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony export (immutable) */__webpack_exports__["b"]=factory;function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}function factory(){var _watch;var prop=arguments.length>0&&arguments[0]!==undefined?arguments[0]:'value';var event=arguments.length>1&&arguments[1]!==undefined?arguments[1]:'input';return{name:'toggleable',model:{prop:prop,event:event},props:_defineProperty({},prop,{required:false}),data:function data(){return{isActive:!!this[prop]};},watch:(_watch={},_defineProperty(_watch,prop,function(val){this.isActive=!!val;}),_defineProperty(_watch,'isActive',function isActive(val){!!val!==this[prop]&&this.$emit(event,val);}),_watch)};}var Toggleable=factory();/* harmony default export */__webpack_exports__["a"]=Toggleable;/***/},/* 6 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony export (immutable) */__webpack_exports__["b"]=consoleWarn;/* harmony export (immutable) */__webpack_exports__["a"]=consoleError;function createMessage(message,componentInstance){var componentInfo=componentInstance?' in "'+componentInstance.$options.name+'"':'';return'[Vuetify] '+message+componentInfo;}function consoleWarn(message){var componentInstance=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;console.warn(createMessage(message,componentInstance));}function consoleError(message){var componentInstance=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;console.error(createMessage(message,componentInstance));}/***/},/* 7 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* unused harmony export VBottomSheetTranstion *//* unused harmony export VCarouselTransition *//* unused harmony export VCarouselReverseTransition *//* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"f",function(){return VTabTransition;});/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"e",function(){return VTabReverseTransition;});/* unused harmony export VMenuTransition *//* unused harmony export VFabTransition *//* unused harmony export VDialogTransition *//* unused harmony export VDialogBottomTransition *//* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"b",function(){return VFadeTransition;});/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"c",function(){return VScaleTransition;});/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"d",function(){return VSlideXTransition;});/* unused harmony export VSlideXReverseTransition *//* unused harmony export VSlideYTransition *//* unused harmony export VSlideYReverseTransition *//* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"a",function(){return VExpandTransition;});/* unused harmony export VRowExpandTransition *//* harmony import */var __WEBPACK_IMPORTED_MODULE_0__util_helpers__=__webpack_require__(2);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__expand_transition__=__webpack_require__(39);// Component specific transitions
var VBottomSheetTranstion=Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["e"/* createSimpleTransition */])('bottom-sheet-transition');var VCarouselTransition=Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["e"/* createSimpleTransition */])('carousel-transition');var VCarouselReverseTransition=Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["e"/* createSimpleTransition */])('carousel-reverse-transition');var VTabTransition=Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["e"/* createSimpleTransition */])('tab-transition');var VTabReverseTransition=Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["e"/* createSimpleTransition */])('tab-reverse-transition');var VMenuTransition=Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["e"/* createSimpleTransition */])('menu-transition');var VFabTransition=Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["e"/* createSimpleTransition */])('fab-transition','center center','out-in');// Generic transitions
var VDialogTransition=Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["e"/* createSimpleTransition */])('dialog-transition');var VDialogBottomTransition=Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["e"/* createSimpleTransition */])('dialog-bottom-transition');var VFadeTransition=Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["e"/* createSimpleTransition */])('fade-transition');var VScaleTransition=Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["e"/* createSimpleTransition */])('scale-transition');var VSlideXTransition=Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["e"/* createSimpleTransition */])('slide-x-transition');var VSlideXReverseTransition=Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["e"/* createSimpleTransition */])('slide-x-reverse-transition');var VSlideYTransition=Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["e"/* createSimpleTransition */])('slide-y-transition');var VSlideYReverseTransition=Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["e"/* createSimpleTransition */])('slide-y-reverse-transition');// JavaScript transitions
var VExpandTransition=Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["b"/* createJavaScriptTransition */])('expand-transition',Object(__WEBPACK_IMPORTED_MODULE_1__expand_transition__["a"/* default */])());var VRowExpandTransition=Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["b"/* createJavaScriptTransition */])('row-expand-transition',Object(__WEBPACK_IMPORTED_MODULE_1__expand_transition__["a"/* default */])('datatable__expand-col--expanded'));/* harmony default export */__webpack_exports__["g"]=install;/* istanbul ignore next */function install(Vue){Vue.component('v-bottom-sheet-transition',VBottomSheetTranstion);Vue.component('v-carousel-transition',VCarouselTransition);Vue.component('v-carousel-reverse-transition',VCarouselReverseTransition);Vue.component('v-dialog-transition',VDialogTransition);Vue.component('v-dialog-bottom-transition',VDialogBottomTransition);Vue.component('v-fab-transition',VFabTransition);Vue.component('v-fade-transition',VFadeTransition);Vue.component('v-menu-transition',VMenuTransition);Vue.component('v-scale-transition',VScaleTransition);Vue.component('v-slide-x-transition',VSlideXTransition);Vue.component('v-slide-x-reverse-transition',VSlideXReverseTransition);Vue.component('v-slide-y-transition',VSlideYTransition);Vue.component('v-slide-y-reverse-transition',VSlideYReverseTransition);Vue.component('v-tab-reverse-transition',VTabReverseTransition);Vue.component('v-tab-transition',VTabTransition);Vue.component('v-expand-transition',VExpandTransition);Vue.component('v-row-expand-transition',VRowExpandTransition);}/***/},/* 8 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";function closeConditional(){return false;}function directive(e,el,binding){// Args may not always be supplied
binding.args=binding.args||{};// If no closeConditional was supplied assign a default
var isActive=binding.args.closeConditional||closeConditional;// The include element callbacks below can be expensive
// so we should avoid calling them when we're not active.
// Explicitly check for false to allow fallback compatibility
// with non-toggleable components
if(!e||isActive(e)===false)return;// If click was triggered programmaticaly (domEl.click()) then
// it shouldn't be treated as click-outside
// Chrome/Firefox support isTrusted property
// IE/Edge support pointerType property (empty if not triggered
// by pointing device)
if('isTrusted'in e&&!e.isTrusted||'pointerType'in e&&!e.pointerType)return;// Check if additional elements were passed to be included in check
// (click must be outside all included elements, if any)
var elements=(binding.args.include||function(){return[];})();// Add the root element for the component this directive was defined on
elements.push(el);// Check if it's a click outside our elements, and then if our callback returns true.
// Non-toggleable components should take action in their callback and return falsy.
// Toggleable can return true if it wants to deactivate.
// Note that, because we're in the capture phase, this callback will occure before
// the bubbling click event on any outside elements.
!clickedInEls(e,elements)&&setTimeout(function(){isActive(e)&&binding.value();},0);}function clickedInEls(e,elements){// Get position of click
var x=e.clientX,y=e.clientY;// Loop over all included elements to see if click was in any of them
var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{for(var _iterator=elements[Symbol.iterator](),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){var el=_step.value;if(clickedInEl(el,x,y))return true;}}catch(err){_didIteratorError=true;_iteratorError=err;}finally{try{if(!_iteratorNormalCompletion&&_iterator.return){_iterator.return();}}finally{if(_didIteratorError){throw _iteratorError;}}}return false;}function clickedInEl(el,x,y){// Get bounding rect for element
// (we're in capturing event and we want to check for multiple elements,
//  so can't use target.)
var b=el.getBoundingClientRect();// Check if the click was in the element's bounding rect
return x>=b.left&&x<=b.right&&y>=b.top&&y<=b.bottom;}/* harmony default export */__webpack_exports__["a"]={name:'click-outside',// [data-app] may not be found
// if using bind, inserted makes
// sure that the root element is
// available, iOS does not support
// clicks on body
inserted:function inserted(el,binding){var onClick=function onClick(e){return directive(e,el,binding);};// iOS does not recognize click events on document
// or body, this is the entire purpose of the v-app
// component and [data-app], stop removing this
var app=document.querySelector('[data-app]')||document.body;// This is only for unit tests
app.addEventListener('click',onClick,true);el._clickOutside=onClick;},unbind:function unbind(el){var app=document.querySelector('[data-app]')||document.body;// This is only for unit tests
app&&app.removeEventListener('click',el._clickOutside,true);delete el._clickOutside;}};/***/},/* 9 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}var _touchstart=function _touchstart(event,wrapper){var touch=event.changedTouches[0];wrapper.touchstartX=touch.clientX;wrapper.touchstartY=touch.clientY;wrapper.start&&wrapper.start(Object.assign(event,wrapper));};var _touchend=function _touchend(event,wrapper){var touch=event.changedTouches[0];wrapper.touchendX=touch.clientX;wrapper.touchendY=touch.clientY;wrapper.end&&wrapper.end(Object.assign(event,wrapper));handleGesture(wrapper);};var _touchmove=function _touchmove(event,wrapper){var touch=event.changedTouches[0];wrapper.touchmoveX=touch.clientX;wrapper.touchmoveY=touch.clientY;wrapper.move&&wrapper.move(Object.assign(event,wrapper));};var handleGesture=function handleGesture(wrapper){var touchstartX=wrapper.touchstartX,touchendX=wrapper.touchendX,touchstartY=wrapper.touchstartY,touchendY=wrapper.touchendY;var dirRatio=0.5;var minDistance=16;wrapper.offsetX=touchendX-touchstartX;wrapper.offsetY=touchendY-touchstartY;if(Math.abs(wrapper.offsetY)<dirRatio*Math.abs(wrapper.offsetX)){wrapper.left&&touchendX<touchstartX-minDistance&&wrapper.left(wrapper);wrapper.right&&touchendX>touchstartX+minDistance&&wrapper.right(wrapper);}if(Math.abs(wrapper.offsetX)<dirRatio*Math.abs(wrapper.offsetY)){wrapper.up&&touchendY<touchstartY-minDistance&&wrapper.up(wrapper);wrapper.down&&touchendY>touchstartY+minDistance&&wrapper.down(wrapper);}};function inserted(el,_ref,_ref2){var value=_ref.value;var context=_ref2.context;var wrapper={touchstartX:0,touchstartY:0,touchendX:0,touchendY:0,touchmoveX:0,touchmoveY:0,offsetX:0,offsetY:0,left:value.left,right:value.right,up:value.up,down:value.down,start:value.start,move:value.move,end:value.end};var target=value.parent?el.parentNode:el;var options=value.options||{passive:true// Needed to pass unit tests
};if(!target)return;var handlers={touchstart:function touchstart(e){return _touchstart(e,wrapper);},touchend:function touchend(e){return _touchend(e,wrapper);},touchmove:function touchmove(e){return _touchmove(e,wrapper);}};target._touchHandlers=Object.assign(Object(target._touchHandlers),_defineProperty({},context._uid,handlers));var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{for(var _iterator=Object.keys(handlers)[Symbol.iterator](),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){var eventName=_step.value;target.addEventListener(eventName,handlers[eventName],options);}}catch(err){_didIteratorError=true;_iteratorError=err;}finally{try{if(!_iteratorNormalCompletion&&_iterator.return){_iterator.return();}}finally{if(_didIteratorError){throw _iteratorError;}}}}function unbind(el,_ref3,_ref4){var value=_ref3.value;var context=_ref4.context;var target=value.parent?el.parentNode:el;if(!target)return;var handlers=target._touchHandlers[context._uid];var _iteratorNormalCompletion2=true;var _didIteratorError2=false;var _iteratorError2=undefined;try{for(var _iterator2=Object.keys(handlers)[Symbol.iterator](),_step2;!(_iteratorNormalCompletion2=(_step2=_iterator2.next()).done);_iteratorNormalCompletion2=true){var eventName=_step2.value;target.removeEventListener(eventName,handlers[eventName]);}}catch(err){_didIteratorError2=true;_iteratorError2=err;}finally{try{if(!_iteratorNormalCompletion2&&_iterator2.return){_iterator2.return();}}finally{if(_didIteratorError2){throw _iteratorError2;}}}delete target._touchHandlers[context._uid];}/* harmony default export */__webpack_exports__["a"]={name:'touch',inserted:inserted,unbind:unbind};/***/},/* 10 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__VBtn__=__webpack_require__(108);/* istanbul ignore next */__WEBPACK_IMPORTED_MODULE_0__VBtn__["a"/* default */].install=function install(Vue){Vue.component(__WEBPACK_IMPORTED_MODULE_0__VBtn__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_0__VBtn__["a"/* default */]);};/* harmony default export */__webpack_exports__["a"]=__WEBPACK_IMPORTED_MODULE_0__VBtn__["a"/* default */];/***/},/* 11 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";function inserted(el,binding){var callback=binding.value;var options=binding.options||{passive:true};window.addEventListener('resize',callback,options);el._onResize={callback:callback,options:options};if(!binding.modifiers||!binding.modifiers.quiet){callback();}}function unbind(el,binding){var _el$_onResize=el._onResize,callback=_el$_onResize.callback,options=_el$_onResize.options;window.removeEventListener('resize',callback,options);delete el._onResize;}/* harmony default export */__webpack_exports__["a"]={name:'resize',inserted:inserted,unbind:unbind};/***/},/* 12 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony export (immutable) */__webpack_exports__["b"]=factory;/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__util_helpers__=__webpack_require__(2);function factory(){var selected=arguments.length>0&&arguments[0]!==undefined?arguments[0]:[];var props={absolute:Boolean,bottom:Boolean,fixed:Boolean,left:Boolean,right:Boolean,top:Boolean};return{name:'positionable',props:selected.length?Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["g"/* filterObjectOnKeys */])(props,selected):props};}/* harmony default export */__webpack_exports__["a"]=factory();/***/},/* 13 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__directives_ripple__=__webpack_require__(17);var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}/* harmony default export */__webpack_exports__["a"]={name:'routable',directives:{Ripple:__WEBPACK_IMPORTED_MODULE_0__directives_ripple__["a"/* default */]},props:{activeClass:String,append:Boolean,disabled:Boolean,exact:{type:Boolean,default:undefined},exactActiveClass:String,href:[String,Object],to:[String,Object],nuxt:Boolean,replace:Boolean,ripple:[Boolean,Object],tag:String,target:String},methods:{click:function click(){},generateRouteLink:function generateRouteLink(){var exact=this.exact;var tag=void 0;var data=_defineProperty({attrs:{disabled:this.disabled},class:this.classes,props:{},directives:[{name:'ripple',value:this.ripple&&!this.disabled?this.ripple:false}]},this.to?'nativeOn':'on',_extends({},this.$listeners,{click:this.click}));if(typeof this.exact==='undefined'){exact=this.to==='/'||this.to===Object(this.to)&&this.to.path==='/';}if(this.to){// Add a special activeClass hook
// for component level styles
var activeClass=this.activeClass;var exactActiveClass=this.exactActiveClass||activeClass;if(this.proxyClass){activeClass+=' '+this.proxyClass;exactActiveClass+=' '+this.proxyClass;}tag=this.nuxt?'nuxt-link':'router-link';Object.assign(data.props,{to:this.to,exact:exact,activeClass:activeClass,exactActiveClass:exactActiveClass,append:this.append,replace:this.replace});}else{tag=this.href&&'a'||this.tag||'a';if(tag==='a'){if(this.href)data.attrs.href=this.href;if(this.target)data.attrs.target=this.target;}}return{tag:tag,data:data};}}};/***/},/* 14 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__createNativeLocaleFormatter__=__webpack_require__(169);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__monthChange__=__webpack_require__(170);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__pad__=__webpack_require__(23);/* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__,"a",function(){return __WEBPACK_IMPORTED_MODULE_0__createNativeLocaleFormatter__["a"];});/* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__,"b",function(){return __WEBPACK_IMPORTED_MODULE_1__monthChange__["a"];});/* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__,"c",function(){return __WEBPACK_IMPORTED_MODULE_2__pad__["a"];});/***/},/* 15 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony export (immutable) */__webpack_exports__["a"]=applicationable;/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__positionable__=__webpack_require__(12);function applicationable(value){var events=arguments.length>1&&arguments[1]!==undefined?arguments[1]:[];return{name:'applicationable',mixins:[Object(__WEBPACK_IMPORTED_MODULE_0__positionable__["b"/* factory */])(['absolute','fixed'])],props:{app:Boolean},computed:{applicationProperty:function applicationProperty(){return value;}},watch:{// If previous value was app
// reset the provided prop
app:function app(x,prev){prev?this.removeApplication():this.callUpdate();}},created:function created(){for(var i=0,length=events.length;i<length;i++){this.$watch(events[i],this.callUpdate);}this.callUpdate();},mounted:function mounted(){this.callUpdate();},destroyed:function destroyed(){this.app&&this.removeApplication();},methods:{callUpdate:function callUpdate(){if(!this.app)return;this.$vuetify.application[this.applicationProperty]=this.updateApplication();},removeApplication:function removeApplication(){this.$vuetify.application[this.applicationProperty]=0;},updateApplication:function updateApplication(){}}};}/***/},/* 16 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/**
 * Bootable
 * @mixin
 *
 * Used to add lazy content functionality to components
 * Looks for change in "isActive" to automatically boot
 * Otherwise can be set manually
 *//* harmony default export */__webpack_exports__["a"]={name:'bootable',data:function data(){return{isBooted:false};},props:{lazy:Boolean},watch:{isActive:function isActive(){this.isBooted=true;}},methods:{showLazyContent:function showLazyContent(content){return this.isBooted||!this.lazy||this.isActive?content:null;}}};/***/},/* 17 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";function style(el,value){el.style['transform']=value;el.style['webkitTransform']=value;}var ripple={/**
   * @param {Event} e
   * @param {Element} el
   * @param {{ class?: string, center?: boolean }} [value={}]
   */show:function show(e,el){var value=arguments.length>2&&arguments[2]!==undefined?arguments[2]:{};if(!el._ripple||!el._ripple.enabled){return;}var container=document.createElement('span');var animation=document.createElement('span');container.appendChild(animation);container.className='ripple__container';if(value.class){container.className+=' '+value.class;}var size=el.clientWidth>el.clientHeight?el.clientWidth:el.clientHeight;animation.className='ripple__animation';animation.style.width=size*(value.center?1:2)+'px';animation.style.height=animation.style.width;el.appendChild(container);var computed=window.getComputedStyle(el);if(computed.position!=='absolute'&&computed.position!=='fixed')el.style.position='relative';var offset=el.getBoundingClientRect();var x=value.center?'50%':e.clientX-offset.left+'px';var y=value.center?'50%':e.clientY-offset.top+'px';animation.classList.add('ripple__animation--enter');animation.classList.add('ripple__animation--visible');style(animation,'translate(-50%, -50%) translate('+x+', '+y+') scale3d(0.01,0.01,0.01)');animation.dataset.activated=Date.now();setTimeout(function(){animation.classList.remove('ripple__animation--enter');style(animation,'translate(-50%, -50%) translate('+x+', '+y+')  scale3d(0.99,0.99,0.99)');},0);},hide:function hide(el){if(!el._ripple||!el._ripple.enabled)return;var ripples=el.getElementsByClassName('ripple__animation');if(ripples.length===0)return;var animation=ripples[ripples.length-1];var diff=Date.now()-Number(animation.dataset.activated);var delay=400-diff;delay=delay<0?0:delay;setTimeout(function(){animation.classList.remove('ripple__animation--visible');setTimeout(function(){// Need to figure out a new way to do this
try{if(ripples.length<1)el.style.position=null;animation.parentNode&&el.removeChild(animation.parentNode);}catch(e){}},300);},delay);}};function isRippleEnabled(value){return typeof value==='undefined'||!!value;}function rippleShow(e){var value={};var element=e.currentTarget;value.center=element._ripple.centered;if(element._ripple.class){value.class=element._ripple.class;}ripple.show(e,element,value);}function rippleHide(e){ripple.hide(e.currentTarget);}function updateRipple(el,binding,wasEnabled){var enabled=isRippleEnabled(binding.value);if(!enabled){ripple.hide(el);}el._ripple=el._ripple||{};el._ripple.enabled=enabled;var value=binding.value||{};if(value.center){el._ripple.centered=true;}if(value.class){el._ripple.class=binding.value.class;}if(enabled&&!wasEnabled){if('ontouchstart'in window){el.addEventListener('touchend',rippleHide,false);el.addEventListener('touchcancel',rippleHide,false);}el.addEventListener('mousedown',rippleShow,false);el.addEventListener('mouseup',rippleHide,false);el.addEventListener('mouseleave',rippleHide,false);// Anchor tags can be dragged, causes other hides to fail - #1537
el.addEventListener('dragstart',rippleHide,false);}else if(!enabled&&wasEnabled){removeListeners(el);}}function removeListeners(el){el.removeEventListener('touchstart',rippleShow,false);el.removeEventListener('mousedown',rippleShow,false);el.removeEventListener('touchend',rippleHide,false);el.removeEventListener('touchcancel',rippleHide,false);el.removeEventListener('mouseup',rippleHide,false);el.removeEventListener('mouseleave',rippleHide,false);el.removeEventListener('dragstart',rippleHide,false);}function directive(el,binding){updateRipple(el,binding,false);}function unbind(el,binding){delete el._ripple;removeListeners(el);}function update(el,binding){if(binding.value===binding.oldValue){return;}var wasEnabled=isRippleEnabled(binding.oldValue);updateRipple(el,binding,wasEnabled);}/* harmony default export */__webpack_exports__["a"]={name:'ripple',bind:directive,unbind:unbind,update:update};/***/},/* 18 *//***/function(module,exports){// removed by extract-text-webpack-plugin
/***/},/* 19 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__loadable__=__webpack_require__(41);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__themeable__=__webpack_require__(1);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__validatable__=__webpack_require__(124);/* harmony import */var __WEBPACK_IMPORTED_MODULE_3__components_VIcon__=__webpack_require__(3);function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}/* harmony default export */__webpack_exports__["a"]={name:'input',components:{VIcon:__WEBPACK_IMPORTED_MODULE_3__components_VIcon__["a"/* default */]},mixins:[__WEBPACK_IMPORTED_MODULE_0__loadable__["a"/* default */],__WEBPACK_IMPORTED_MODULE_1__themeable__["a"/* default */],__WEBPACK_IMPORTED_MODULE_2__validatable__["a"/* default */]],data:function data(){return{isFocused:false,tabFocused:false,internalTabIndex:null,lazyValue:this.value};},props:{appendIcon:String,appendIconCb:Function,disabled:Boolean,hint:String,hideDetails:Boolean,label:String,persistentHint:Boolean,placeholder:String,prependIcon:String,prependIconCb:Function,readonly:Boolean,required:Boolean,tabindex:{default:0},toggleKeys:{type:Array,default:function _default(){return[13,32];}},value:{required:false}},computed:{inputGroupClasses:function inputGroupClasses(){return Object.assign({'input-group':true,'input-group--async-loading':this.loading!==false,'input-group--focused':this.isFocused,'input-group--dirty':this.isDirty,'input-group--tab-focused':this.tabFocused,'input-group--disabled':this.disabled,'input-group--error':this.hasError,'input-group--append-icon':this.appendIcon,'input-group--prepend-icon':this.prependIcon,'input-group--required':this.required,'input-group--hide-details':this.hideDetails,'input-group--placeholder':!!this.placeholder,'theme--dark':this.dark,'theme--light':this.light},this.classes);},isDirty:function isDirty(){return!!this.inputValue;}},methods:{groupFocus:function groupFocus(e){},groupBlur:function groupBlur(e){this.tabFocused=false;},genLabel:function genLabel(){return this.$createElement('label',{attrs:{for:this.$attrs.id}},this.$slots.label||this.label);},genMessages:function genMessages(){var messages=null;if(this.hint&&(this.isFocused||this.persistentHint)&&!this.validations.length){messages=[this.genHint()];}else if(this.validations.length){messages=[this.genError(this.validations[0])];}return this.$createElement('transition',{props:{name:'slide-y-transition'}},messages);},genHint:function genHint(){return this.$createElement('div',{'class':'input-group__messages input-group__hint',domProps:{innerHTML:this.hint}});},genError:function genError(error){return this.$createElement('div',{'class':'input-group__messages input-group__error'},error);},genIcon:function genIcon(type){var _class;var defaultCallback=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;var shouldClear=type==='append'&&this.clearable&&this.isDirty;var icon=shouldClear?'clear':this[type+'Icon'];var callback=shouldClear?this.clearableCallback:this[type+'IconCb']||defaultCallback;return this.$createElement('v-icon',{'class':(_class={},_defineProperty(_class,'input-group__'+type+'-icon',true),_defineProperty(_class,'input-group__icon-cb',!!callback),_defineProperty(_class,'input-group__icon-clearable',shouldClear),_class),props:{disabled:this.disabled},on:{click:function click(e){if(!callback)return;e.stopPropagation();callback();}}},icon);},genInputGroup:function genInputGroup(input){var _this=this;var data=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};var defaultAppendCallback=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;var children=[];var wrapperChildren=[];var detailsChildren=[];data=Object.assign({},{'class':this.inputGroupClasses,attrs:{tabindex:this.disabled?-1:this.internalTabIndex||this.tabindex},on:{focus:this.groupFocus,blur:this.groupBlur,click:function click(){return _this.tabFocused=false;},keyup:function keyup(e){if([9,16].includes(e.keyCode)){_this.tabFocused=true;}},keydown:function keydown(e){if(!_this.toggle)return;if(_this.toggleKeys.includes(e.keyCode)){e.preventDefault();_this.toggle();}}}},data);if(this.$slots.label||this.label){children.push(this.genLabel());}wrapperChildren.push(input);if(this.prependIcon){wrapperChildren.unshift(this.genIcon('prepend'));}if(this.appendIcon||this.clearable){wrapperChildren.push(this.genIcon('append',defaultAppendCallback));}var progress=this.genProgress();progress&&detailsChildren.push(progress);children.push(this.$createElement('div',{'class':'input-group__input'},wrapperChildren));!this.hideDetails&&detailsChildren.push(this.genMessages());if(this.counter){detailsChildren.push(this.genCounter());}children.push(this.$createElement('div',{'class':'input-group__details'},detailsChildren));return this.$createElement('div',data,children);}}};/***/},/* 20 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}else{return Array.from(arr);}}function searchChildren(children){var results=[];for(var index=0;index<children.length;index++){var child=children[index];if(child.isActive&&child.isDependent){results.push(child);}else{results.push.apply(results,_toConsumableArray(searchChildren(child.$children)));}}return results;}/* harmony default export */__webpack_exports__["a"]={name:'dependent',data:function data(){return{closeDependents:true,isDependent:true};},methods:{getOpenDependents:function getOpenDependents(){if(this.closeDependents)return searchChildren(this.$children);return[];},getOpenDependentElements:function getOpenDependentElements(){var result=[];var openDependents=this.getOpenDependents();for(var index=0;index<openDependents.length;index++){result.push.apply(result,_toConsumableArray(openDependents[index].getClickableDependentElements()));}return result;},getClickableDependentElements:function getClickableDependentElements(){var result=[this.$el];if(this.$refs.content)result.push(this.$refs.content);result.push.apply(result,_toConsumableArray(this.getOpenDependentElements()));return result;}},watch:{isActive:function isActive(val){if(val)return;var openDependents=this.getOpenDependents();for(var index=0;index<openDependents.length;index++){openDependents[index].isActive=false;}}}};/***/},/* 21 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* unused harmony export VCardActions *//* unused harmony export VCardText *//* harmony import */var __WEBPACK_IMPORTED_MODULE_0__util_helpers__=__webpack_require__(2);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__VCard__=__webpack_require__(113);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__VCardMedia__=__webpack_require__(115);/* harmony import */var __WEBPACK_IMPORTED_MODULE_3__VCardTitle__=__webpack_require__(116);/* unused harmony reexport VCard *//* unused harmony reexport VCardMedia *//* unused harmony reexport VCardTitle */var VCardActions=Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["d"/* createSimpleFunctional */])('card__actions');var VCardText=Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["d"/* createSimpleFunctional */])('card__text');/* istanbul ignore next */__WEBPACK_IMPORTED_MODULE_1__VCard__["a"/* default */].install=function install(Vue){Vue.component(__WEBPACK_IMPORTED_MODULE_1__VCard__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_1__VCard__["a"/* default */]);Vue.component(__WEBPACK_IMPORTED_MODULE_2__VCardMedia__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_2__VCardMedia__["a"/* default */]);Vue.component(__WEBPACK_IMPORTED_MODULE_3__VCardTitle__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_3__VCardTitle__["a"/* default */]);Vue.component(VCardActions.name,VCardActions);Vue.component(VCardText.name,VCardText);};/* harmony default export */__webpack_exports__["a"]=__WEBPACK_IMPORTED_MODULE_1__VCard__["a"/* default */];/***/},/* 22 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__directives_ripple__=__webpack_require__(17);/** @mixin *//* harmony default export */__webpack_exports__["a"]={name:'rippleable',directives:{Ripple:__WEBPACK_IMPORTED_MODULE_0__directives_ripple__["a"/* default */]},props:{ripple:{type:[Boolean,Object],default:true}},methods:{genRipple:function genRipple(){var data=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{directives:[]};data.class=this.rippleClasses||'input-group--selection-controls__ripple';data.directives.push({name:'ripple',value:this.ripple&&!this.disabled&&{center:true}});data.on=Object.assign({click:this.toggle},this.$listeners);return this.$createElement('div',data);}}};/***/},/* 23 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";var padStart=function padStart(string,targetLength,padString){targetLength=targetLength>>0;string=String(string);padString=String(padString);if(string.length>targetLength){return String(string);}targetLength=targetLength-string.length;if(targetLength>padString.length){padString+=padString.repeat(targetLength/padString.length);}return padString.slice(0,targetLength)+String(string);};/* harmony default export */__webpack_exports__["a"]=function(n){var length=arguments.length>1&&arguments[1]!==undefined?arguments[1]:2;return padStart(n,length,'0');};/***/},/* 24 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/**
 * SSRBootable
 *
 * @mixin
 *
 * Used in layout components (drawer, toolbar, content)
 * to avoid an entry animation when using SSR
 *//* harmony default export */__webpack_exports__["a"]={name:'ssr-bootable',data:function data(){return{isBooted:false};},mounted:function mounted(){var _this=this;// Use setAttribute instead of dataset
// because dataset does not work well
// with unit tests
window.requestAnimationFrame(function(){_this.$el.setAttribute('data-booted',true);_this.isBooted=true;});}};/***/},/* 25 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony default export */__webpack_exports__["a"]={name:'transitionable',props:{mode:String,origin:String,transition:String}};/***/},/* 26 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__bootable__=__webpack_require__(16);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__util_console__=__webpack_require__(6);var _typeof=typeof Symbol==="function"&&_typeof2(Symbol.iterator)==="symbol"?function(obj){return typeof obj==='undefined'?'undefined':_typeof2(obj);}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj==='undefined'?'undefined':_typeof2(obj);};function validateAttachTarget(val){var type=typeof val==='undefined'?'undefined':_typeof(val);if(type==='boolean'||type==='string')return true;return val.nodeType===Node.ELEMENT_NODE;}/* harmony default export */__webpack_exports__["a"]={name:'detachable',mixins:[__WEBPACK_IMPORTED_MODULE_0__bootable__["a"/* default */]],props:{attach:{type:null,default:false,validator:validateAttachTarget},contentClass:{default:''}},mounted:function mounted(){this.initDetach();},deactivated:function deactivated(){this.isActive=false;},beforeDestroy:function beforeDestroy(){if(!this.$refs.content)return;// IE11 Fix
try{this.$refs.content.parentNode.removeChild(this.$refs.content);}catch(e){}},methods:{initDetach:function initDetach(){if(this._isDestroyed||!this.$refs.content||// Leave menu in place if attached
// and dev has not changed target
this.attach===''||// If used as a boolean prop (<v-menu attach>)
this.attach===true||// If bound to a boolean (<v-menu :attach="true">)
this.attach==='attach'// If bound as boolean prop in pug (v-menu(attach))
)return;var target=void 0;if(this.attach===false){// Default, detach to app
target=document.querySelector('[data-app]');}else if(typeof this.attach==='string'){// CSS selector
target=document.querySelector(this.attach);}else{// DOM Element
target=this.attach;}if(!target){Object(__WEBPACK_IMPORTED_MODULE_1__util_console__["b"/* consoleWarn */])('Unable to locate target '+(this.attach||'[data-app]'),this);return;}target.insertBefore(this.$refs.content,target.firstChild);}}};/***/},/* 27 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony default export */__webpack_exports__["a"]={name:'returnable',data:function data(){return{originalValue:null};},props:{returnValue:null},watch:{isActive:function isActive(val){if(val){this.originalValue=this.returnValue;}else{this.$emit('update:returnValue',this.originalValue);}}},methods:{save:function save(value){this.originalValue=value;this.$emit('update:returnValue',value);this.isActive=false;}}};/***/},/* 28 *//***/function(module,exports){// removed by extract-text-webpack-plugin
/***/},/* 29 *//***/function(module,exports){// removed by extract-text-webpack-plugin
/***/},/* 30 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony export (immutable) */__webpack_exports__["a"]=Grid;function Grid(name){return{name:'v-'+name,functional:true,props:{id:String,tag:{type:String,default:'div'}},render:function render(h,_ref){var props=_ref.props,data=_ref.data,children=_ref.children;data.staticClass=(name+' '+(data.staticClass||'')).trim();if(data.attrs){var classes=Object.keys(data.attrs).filter(function(key){var value=data.attrs[key];return value||typeof value==='string';});if(classes.length)data.staticClass+=' '+classes.join(' ');delete data.attrs;}if(props.id){data.domProps=data.domProps||{};data.domProps.id=props.id;}return h(props.tag,data,children);}};}/***/},/* 31 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony export (immutable) */__webpack_exports__["a"]=colorToInt;/* harmony export (immutable) */__webpack_exports__["b"]=intToHex;/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__console__=__webpack_require__(6);/**
 * @param {string|number} color
 * @returns {number}
 */function colorToInt(color){var rgb=void 0;if(typeof color==='number'){rgb=color;}else if(typeof color==='string'){var c=color[0]==='#'?color.substring(1):color;if(c.length===3){c=c.split('').map(function(char){return char+char;}).join('');}if(c.length!==6){Object(__WEBPACK_IMPORTED_MODULE_0__console__["b"/* consoleWarn */])('\''+color+'\' is not a valid rgb color');}rgb=parseInt(c,16);}else{throw new TypeError('Colors can only be numbers or strings, recieved '+color.constructor.name+' instead');}if(rgb<0){Object(__WEBPACK_IMPORTED_MODULE_0__console__["b"/* consoleWarn */])('Colors cannot be negative: \''+color+'\'');rgb=0;}else if(rgb>0xffffff||isNaN(rgb)){Object(__WEBPACK_IMPORTED_MODULE_0__console__["b"/* consoleWarn */])('\''+color+'\' is not a valid rgb color');rgb=0xffffff;}return rgb;}/**
 * @param {number} color
 * @returns {string}
 */function intToHex(color){color=color.toString(16);if(color.length<6)color='0'.repeat(6-color.length)+color;return'#'+color;}/***/},/* 32 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__VAvatar__=__webpack_require__(91);/* istanbul ignore next */__WEBPACK_IMPORTED_MODULE_0__VAvatar__["a"/* default */].install=function install(Vue){Vue.component(__WEBPACK_IMPORTED_MODULE_0__VAvatar__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_0__VAvatar__["a"/* default */]);};/* harmony default export */__webpack_exports__["a"]=__WEBPACK_IMPORTED_MODULE_0__VAvatar__["a"/* default */];/***/},/* 33 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__registrable__=__webpack_require__(4);/* harmony default export */__webpack_exports__["a"]={name:'button-group',mixins:[Object(__WEBPACK_IMPORTED_MODULE_0__registrable__["b"/* provide */])('buttonGroup')],data:function data(){return{buttons:[],listeners:[]};},methods:{getValue:function getValue(i){if(this.buttons[i].value!=null){return this.buttons[i].value;}// Fix for testing, this should always be false in the browser
if(this.buttons[i].$el.value!=null&&this.buttons[i].$el.value!==''){return this.buttons[i].$el.value;}return i;},update:function update(){var selected=[];for(var i=0;i<this.buttons.length;i++){var elm=this.buttons[i].$el;var button=this.buttons[i];elm.removeAttribute('data-only-child');if(this.isSelected(i)){!button.to&&(button.isActive=true);selected.push(i);}else{!button.to&&(button.isActive=false);}}if(selected.length===1){this.buttons[selected[0]].$el.setAttribute('data-only-child',true);}},register:function register(button){var index=this.buttons.length;this.buttons.push(button);this.listeners.push(this.updateValue.bind(this,index));button.$on('click',this.listeners[index]);},unregister:function unregister(button){var _this=this;var index=this.buttons.indexOf(button);if(index===-1){return;}var wasSelected=this.isSelected(index);button.$off('click',this.listeners[index]);this.buttons.splice(index,1);this.listeners.splice(index,1);// Preserve the mandatory invariant
if(wasSelected&&this.mandatory&&this.buttons.every(function(_,i){return!_this.isSelected(i);})&&this.listeners.length>0){this.listeners[0]();}}},mounted:function mounted(){this.update();}};/***/},/* 34 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_dialogs_styl__=__webpack_require__(102);/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_dialogs_styl___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_dialogs_styl__);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__mixins_dependent__=__webpack_require__(20);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__mixins_detachable__=__webpack_require__(26);/* harmony import */var __WEBPACK_IMPORTED_MODULE_3__mixins_overlayable__=__webpack_require__(35);/* harmony import */var __WEBPACK_IMPORTED_MODULE_4__mixins_returnable__=__webpack_require__(27);/* harmony import */var __WEBPACK_IMPORTED_MODULE_5__mixins_stackable__=__webpack_require__(36);/* harmony import */var __WEBPACK_IMPORTED_MODULE_6__mixins_toggleable__=__webpack_require__(5);/* harmony import */var __WEBPACK_IMPORTED_MODULE_7__directives_click_outside__=__webpack_require__(8);/* harmony import */var __WEBPACK_IMPORTED_MODULE_8__util_helpers__=__webpack_require__(2);function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}// Mixins
// Directives
// Helpers
/* harmony default export */__webpack_exports__["a"]={name:'v-dialog',mixins:[__WEBPACK_IMPORTED_MODULE_1__mixins_dependent__["a"/* default */],__WEBPACK_IMPORTED_MODULE_2__mixins_detachable__["a"/* default */],__WEBPACK_IMPORTED_MODULE_3__mixins_overlayable__["a"/* default */],__WEBPACK_IMPORTED_MODULE_4__mixins_returnable__["a"/* default */],__WEBPACK_IMPORTED_MODULE_5__mixins_stackable__["a"/* default */],__WEBPACK_IMPORTED_MODULE_6__mixins_toggleable__["a"/* default */]],directives:{ClickOutside:__WEBPACK_IMPORTED_MODULE_7__directives_click_outside__["a"/* default */]},data:function data(){return{isDependent:false,stackClass:'dialog__content__active',stackMinZIndex:200};},props:{disabled:Boolean,persistent:Boolean,fullscreen:Boolean,fullWidth:Boolean,maxWidth:{type:[String,Number],default:'none'},origin:{type:String,default:'center center'},width:{type:[String,Number],default:'auto'},scrollable:Boolean,transition:{type:[String,Boolean],default:'dialog-transition'}},computed:{classes:function classes(){var _ref;return _ref={},_defineProperty(_ref,('dialog '+this.contentClass).trim(),true),_defineProperty(_ref,'dialog--active',this.isActive),_defineProperty(_ref,'dialog--persistent',this.persistent),_defineProperty(_ref,'dialog--fullscreen',this.fullscreen),_defineProperty(_ref,'dialog--scrollable',this.scrollable),_ref;},contentClasses:function contentClasses(){return{'dialog__content':true,'dialog__content__active':this.isActive};}},watch:{isActive:function isActive(val){if(val){this.show();}else{this.removeOverlay();this.unbind();}}},mounted:function mounted(){this.isBooted=this.isActive;this.isActive&&this.show();},beforeDestroy:function beforeDestroy(){if(typeof window!=='undefined')this.unbind();},methods:{closeConditional:function closeConditional(e){// close dialog if !persistent, clicked outside and we're the topmost dialog.
// Since this should only be called in a capture event (bottom up), we shouldn't need to stop propagation
return this.isActive&&!this.persistent&&Object(__WEBPACK_IMPORTED_MODULE_8__util_helpers__["i"/* getZIndex */])(this.$refs.content)>=this.getMaxZIndex()&&!this.$refs.content.contains(e.target);},show:function show(){!this.fullscreen&&!this.hideOverlay&&this.genOverlay();this.fullscreen&&this.hideScroll();this.$refs.content.focus();this.$listeners.keydown&&this.bind();},bind:function bind(){window.addEventListener('keydown',this.onKeydown);},unbind:function unbind(){window.removeEventListener('keydown',this.onKeydown);},onKeydown:function onKeydown(e){this.$emit('keydown',e);}},render:function render(h){var _this=this;var children=[];var data={'class':this.classes,ref:'dialog',directives:[{name:'click-outside',value:function value(){return _this.isActive=false;},args:{closeConditional:this.closeConditional,include:this.getOpenDependentElements}},{name:'show',value:this.isActive}],on:{click:function click(e){e.stopPropagation();}}};if(!this.fullscreen){data.style={maxWidth:this.maxWidth==='none'?undefined:isNaN(this.maxWidth)?this.maxWidth:this.maxWidth+'px',width:this.width==='auto'?undefined:isNaN(this.width)?this.width:this.width+'px'};}if(this.$slots.activator){children.push(h('div',{'class':'dialog__activator',on:{click:function click(e){e.stopPropagation();if(!_this.disabled)_this.isActive=!_this.isActive;}}},[this.$slots.activator]));}var dialog=h('transition',{props:{name:this.transition||'',// If false, show nothing
origin:this.origin}},[h('div',data,this.showLazyContent(this.$slots.default))]);children.push(h('div',{'class':this.contentClasses,domProps:{tabIndex:-1},style:{zIndex:this.activeZIndex},ref:'content'},[dialog]));return h('div',{staticClass:'dialog__container',style:{display:!this.$slots.activator||this.fullWidth?'block':'inline-block'}},children);}};/***/},/* 35 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_overlay_styl__=__webpack_require__(103);/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_overlay_styl___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_overlay_styl__);/* harmony default export */__webpack_exports__["a"]={name:'overlayable',data:function data(){return{overlay:null,overlayOffset:0,overlayTimeout:null,overlayTransitionDuration:500+150// transition + delay
};},props:{hideOverlay:Boolean},beforeDestroy:function beforeDestroy(){this.removeOverlay();},methods:{genOverlay:function genOverlay(){var _this=this;// If fn is called and timeout is active
// or overlay already exists
// cancel removal of overlay and re-add active
if(!this.isActive||this.hideOverlay||this.isActive&&this.overlayTimeout||this.overlay){clearTimeout(this.overlayTimeout);return this.overlay&&this.overlay.classList.add('overlay--active');}this.overlay=document.createElement('div');this.overlay.className='overlay';if(this.absolute)this.overlay.className+=' overlay--absolute';this.hideScroll();var parent=this.absolute?this.$el.parentNode:document.querySelector('[data-app]');parent&&parent.insertBefore(this.overlay,parent.firstChild);// eslint-disable-next-line no-unused-expressions
this.overlay.clientHeight;// Force repaint
requestAnimationFrame(function(){_this.overlay.className+=' overlay--active';if(_this.activeZIndex!==undefined){_this.overlay.style.zIndex=_this.activeZIndex-1;}});return true;},removeOverlay:function removeOverlay(){var _this2=this;if(!this.overlay){return this.showScroll();}this.overlay.classList.remove('overlay--active');this.overlayTimeout=setTimeout(function(){// IE11 Fix
try{_this2.overlay.parentNode.removeChild(_this2.overlay);_this2.overlay=null;_this2.showScroll();}catch(e){}clearTimeout(_this2.overlayTimeout);_this2.overlayTimeout=null;},this.overlayTransitionDuration);},/**
     * @param {Event} e
     * @returns void
     */scrollListener:function scrollListener(e){if(e.type==='keydown'){if(['INPUT','TEXTAREA','SELECT'].includes(e.target.tagName))return;var up=[38,33];var down=[40,34];if(up.includes(e.keyCode)){e.deltaY=-1;}else if(down.includes(e.keyCode)){e.deltaY=1;}else{return;}}if(e.target===this.overlay||e.type!=='keydown'&&e.target===document.body||this.checkPath(e))e.preventDefault();},hasScrollbar:function hasScrollbar(el){if(!el||el.nodeType!==Node.ELEMENT_NODE)return false;var style=window.getComputedStyle(el);return['auto','scroll'].includes(style['overflow-y'])&&el.scrollHeight>el.clientHeight;},shouldScroll:function shouldScroll(el,delta){if(el.scrollTop===0&&delta<0)return true;return el.scrollTop+el.clientHeight===el.scrollHeight&&delta>0;},isInside:function isInside(el,parent){if(el===parent){return true;}else if(el===null||el===document.body){return false;}else{return this.isInside(el.parentNode,parent);}},/**
     * @param {Event} e
     * @returns boolean
     */checkPath:function checkPath(e){var path=e.path||this.composedPath(e);var delta=e.deltaY||-e.wheelDelta;if(e.type==='keydown'&&path[0]===document.body){var dialog=this.$refs.dialog;var selected=window.getSelection().anchorNode;if(this.hasScrollbar(dialog)&&this.isInside(selected,dialog)){return this.shouldScroll(dialog,delta);}return true;}for(var index=0;index<path.length;index++){var el=path[index];if(el===document)return true;if(el===document.documentElement)return true;if(el===this.$refs.content)return true;if(this.hasScrollbar(el))return this.shouldScroll(el,delta);}return true;},/**
     * Polyfill for Event.prototype.composedPath
     * @param {Event} e
     * @returns Element[]
     */composedPath:function composedPath(e){if(e.composedPath)return e.composedPath();var path=[];var el=e.target;while(el){path.push(el);if(el.tagName==='HTML'){path.push(document);path.push(window);return path;}el=el.parentElement;}},hideScroll:function hideScroll(){if(this.$vuetify.breakpoint.smAndDown){document.documentElement.classList.add('overflow-y-hidden');}else{window.addEventListener('wheel',this.scrollListener);window.addEventListener('keydown',this.scrollListener);}},showScroll:function showScroll(){document.documentElement.classList.remove('overflow-y-hidden');window.removeEventListener('wheel',this.scrollListener);window.removeEventListener('keydown',this.scrollListener);}}};/***/},/* 36 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__util_helpers__=__webpack_require__(2);function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}else{return Array.from(arr);}}/* harmony default export */__webpack_exports__["a"]={name:'stackable',data:function data(){return{stackBase:null,stackClass:'unpecified',stackElement:null,stackExclude:null,stackMinZIndex:0};},computed:{/**
     * Currently active z-index
     *
     * @return {number}
     */activeZIndex:function activeZIndex(){if(typeof window==='undefined')return 0;var content=this.stackElement||this.$refs.content;// Return current zindex if not active
var index=!this.isActive?Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["i"/* getZIndex */])(content):this.getMaxZIndex(this.stackExclude||[content])+2;if(index==null)return index;// Return max current z-index (excluding self) + 2
// (2 to leave room for an overlay below, if needed)
return parseInt(index);}},methods:{getMaxZIndex:function getMaxZIndex(){var exclude=arguments.length>0&&arguments[0]!==undefined?arguments[0]:[];var base=this.stackBase||this.$el;// Start with lowest allowed z-index or z-index of
// base component's element, whichever is greater
var zis=[this.stackMinZIndex,Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["i"/* getZIndex */])(base)];// Convert the NodeList to an array to
// prevent an Edge bug with Symbol.iterator
// https://github.com/vuetifyjs/vuetify/issues/2146
var activeElements=[].concat(_toConsumableArray(document.getElementsByClassName(this.stackClass)));// Get z-index for all active dialogs
for(var index=0;index<activeElements.length;index++){if(!exclude.includes(activeElements[index])){zis.push(Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["i"/* getZIndex */])(activeElements[index]));}}return Math.max.apply(Math,zis);}}};/***/},/* 37 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__VJumbotron__=__webpack_require__(121);/* istanbul ignore next */__WEBPACK_IMPORTED_MODULE_0__VJumbotron__["a"/* default */].install=function install(Vue){Vue.component(__WEBPACK_IMPORTED_MODULE_0__VJumbotron__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_0__VJumbotron__["a"/* default */]);};/* harmony default export */__webpack_exports__["a"]=__WEBPACK_IMPORTED_MODULE_0__VJumbotron__["a"/* default */];/***/},/* 38 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__VCheckbox__=__webpack_require__(123);/* istanbul ignore next */__WEBPACK_IMPORTED_MODULE_0__VCheckbox__["a"/* default */].install=function install(Vue){Vue.component(__WEBPACK_IMPORTED_MODULE_0__VCheckbox__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_0__VCheckbox__["a"/* default */]);};/* harmony default export */__webpack_exports__["a"]=__WEBPACK_IMPORTED_MODULE_0__VCheckbox__["a"/* default */];/***/},/* 39 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__util_helpers__=__webpack_require__(2);/* harmony default export */__webpack_exports__["a"]=function(){var expandedParentClass=arguments.length>0&&arguments[0]!==undefined?arguments[0]:'';return{enter:function enter(el,done){el._parent=el.parentNode;Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["a"/* addOnceEventListener */])(el,'transitionend',done);// Get height that is to be scrolled
el.style.overflow='hidden';el.style.height=0;el.style.display='block';expandedParentClass&&el._parent.classList.add(expandedParentClass);setTimeout(function(){return el.style.height=el.scrollHeight+'px';},100);},afterEnter:function afterEnter(el){el.style.overflow=null;el.style.height=null;},leave:function leave(el,done){// Remove initial transition
Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["a"/* addOnceEventListener */])(el,'transitionend',done);// Set height before we transition to 0
el.style.overflow='hidden';el.style.height=el.offsetHeight+'px';setTimeout(function(){return el.style.height=0;},100);},afterLeave:function afterLeave(el){expandedParentClass&&el._parent.classList.remove(expandedParentClass);}};};/***/},/* 40 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__colorable__=__webpack_require__(0);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__input__=__webpack_require__(19);/* harmony default export */__webpack_exports__["a"]={name:'selectable',mixins:[__WEBPACK_IMPORTED_MODULE_1__input__["a"/* default */],__WEBPACK_IMPORTED_MODULE_0__colorable__["a"/* default */]],model:{prop:'inputValue',event:'change'},data:function data(){return{defaultColor:'accent'};},props:{id:String,inputValue:null,falseValue:null,trueValue:null},computed:{isActive:function isActive(){if(Array.isArray(this.inputValue)){return this.inputValue.indexOf(this.value)!==-1;}if(!this.trueValue||!this.falseValue){return this.value?this.value===this.inputValue:Boolean(this.inputValue);}return this.inputValue===this.trueValue;},isDirty:function isDirty(){return this.isActive;}},watch:{indeterminate:function indeterminate(val){this.inputIndeterminate=val;}},methods:{genLabel:function genLabel(){return this.$createElement('label',{on:{click:this.toggle},attrs:{for:this.id}},this.$slots.label||this.label);},toggle:function toggle(){if(this.disabled){return;}var input=this.inputValue;if(Array.isArray(input)){input=input.slice();var i=input.indexOf(this.value);if(i===-1){input.push(this.value);}else{input.splice(i,1);}}else if(this.trueValue||this.falseValue){input=input===this.trueValue?this.falseValue:this.trueValue;}else if(this.value){input=this.value===this.inputValue?null:this.value;}else{input=!input;}this.validate(true,input);this.$emit('change',input);}}};/***/},/* 41 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/**
 * Loadable
 *
 * @mixin
 *
 * Used to add linear progress bar to components
 * Can use a default bar with a specific color
 * or designate a custom progress linear bar
 *//* harmony default export */__webpack_exports__["a"]={name:'loadable',props:{loading:{type:[Boolean,String],default:false}},methods:{genProgress:function genProgress(){if(this.loading===false)return null;return this.$slots.progress||this.$createElement('v-progress-linear',{props:{color:this.loading===true||this.loading===''?this.color||'primary':this.loading,height:2,indeterminate:true}});}}};/***/},/* 42 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__VChip__=__webpack_require__(125);/* istanbul ignore next */__WEBPACK_IMPORTED_MODULE_0__VChip__["a"/* default */].install=function install(Vue){Vue.component(__WEBPACK_IMPORTED_MODULE_0__VChip__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_0__VChip__["a"/* default */]);};/* harmony default export */__webpack_exports__["a"]=__WEBPACK_IMPORTED_MODULE_0__VChip__["a"/* default */];/***/},/* 43 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__components_VBtn__=__webpack_require__(10);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__components_VIcon__=__webpack_require__(3);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__components_VSelect__=__webpack_require__(44);/* harmony import */var __WEBPACK_IMPORTED_MODULE_3__filterable__=__webpack_require__(50);/* harmony import */var __WEBPACK_IMPORTED_MODULE_4__themeable__=__webpack_require__(1);/* harmony import */var __WEBPACK_IMPORTED_MODULE_5__loadable__=__webpack_require__(41);/* harmony import */var __WEBPACK_IMPORTED_MODULE_6__util_helpers__=__webpack_require__(2);/* harmony import */var __WEBPACK_IMPORTED_MODULE_7__util_console__=__webpack_require__(6);var _slicedToArray=function(){function sliceIterator(arr,i){var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[Symbol.iterator](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break;}}catch(err){_d=true;_e=err;}finally{try{if(!_n&&_i["return"])_i["return"]();}finally{if(_d)throw _e;}}return _arr;}return function(arr,i){if(Array.isArray(arr)){return arr;}else if(Symbol.iterator in Object(arr)){return sliceIterator(arr,i);}else{throw new TypeError("Invalid attempt to destructure non-iterable instance");}};}();/**
 * DataIterable
 *
 * @mixin
 *
 * Base behavior for data table and data iterator
 * providing selection, pagination, sorting and filtering.
 *
 *//* harmony default export */__webpack_exports__["a"]={name:'data-iterable',components:{VBtn:__WEBPACK_IMPORTED_MODULE_0__components_VBtn__["a"/* default */],VIcon:__WEBPACK_IMPORTED_MODULE_1__components_VIcon__["a"/* default */],VSelect:__WEBPACK_IMPORTED_MODULE_2__components_VSelect__["a"/* default */]},data:function data(){return{searchLength:0,defaultPagination:{descending:false,page:1,rowsPerPage:5,sortBy:null,totalItems:0},expanded:{},actionsClasses:'data-iterator__actions',actionsRangeControlsClasses:'data-iterator__actions__range-controls',actionsSelectClasses:'data-iterator__actions__select',actionsPaginationClasses:'data-iterator__actions__pagination'};},mixins:[__WEBPACK_IMPORTED_MODULE_3__filterable__["a"/* default */],__WEBPACK_IMPORTED_MODULE_5__loadable__["a"/* default */],__WEBPACK_IMPORTED_MODULE_4__themeable__["a"/* default */]],props:{expand:Boolean,hideActions:Boolean,disableInitialSort:Boolean,mustSort:Boolean,noResultsText:{type:String,default:'No matching records found'},nextIcon:{type:String,default:'chevron_right'},prevIcon:{type:String,default:'chevron_left'},rowsPerPageItems:{type:Array,default:function _default(){return[5,10,25,{text:'All',value:-1}];}},rowsPerPageText:{type:String,default:'Items per page:'},selectAll:[Boolean,String],search:{required:false},filter:{type:Function,default:function _default(val,search){return val!=null&&typeof val!=='boolean'&&val.toString().toLowerCase().indexOf(search)!==-1;}},customFilter:{type:Function,default:function _default(items,search,filter){search=search.toString().toLowerCase();if(search.trim()==='')return items;return items.filter(function(i){return Object.keys(i).some(function(j){return filter(i[j],search);});});}},customSort:{type:Function,default:function _default(items,index,isDescending){if(index===null)return items;return items.sort(function(a,b){var sortA=Object(__WEBPACK_IMPORTED_MODULE_6__util_helpers__["h"/* getObjectValueByPath */])(a,index);var sortB=Object(__WEBPACK_IMPORTED_MODULE_6__util_helpers__["h"/* getObjectValueByPath */])(b,index);if(isDescending){var _ref=[sortB,sortA];sortA=_ref[0];sortB=_ref[1];}// Check if both are numbers
if(!isNaN(sortA)&&!isNaN(sortB)){return sortA-sortB;}// Check if both cannot be evaluated
if(sortA===null&&sortB===null){return 0;}var _map=[sortA,sortB].map(function(s){return(s||'').toString().toLocaleLowerCase();});var _map2=_slicedToArray(_map,2);sortA=_map2[0];sortB=_map2[1];if(sortA>sortB)return 1;if(sortA<sortB)return-1;return 0;});}},value:{type:Array,default:function _default(){return[];}},items:{type:Array,required:true,default:function _default(){return[];}},totalItems:{type:Number,default:null},itemKey:{type:String,default:'id'},pagination:{type:Object,default:function _default(){}}},computed:{computedPagination:function computedPagination(){return this.hasPagination?this.pagination:this.defaultPagination;},hasPagination:function hasPagination(){var pagination=this.pagination||{};return Object.keys(pagination).length>0;},hasSelectAll:function hasSelectAll(){return this.selectAll!==undefined&&this.selectAll!==false;},itemsLength:function itemsLength(){if(this.search)return this.searchLength;return this.totalItems||this.items.length;},indeterminate:function indeterminate(){return this.hasSelectAll&&this.someItems&&!this.everyItem;},everyItem:function everyItem(){var _this=this;return this.filteredItems.length&&this.filteredItems.every(function(i){return _this.isSelected(i);});},someItems:function someItems(){var _this2=this;return this.filteredItems.some(function(i){return _this2.isSelected(i);});},getPage:function getPage(){var rowsPerPage=this.computedPagination.rowsPerPage;return rowsPerPage===Object(rowsPerPage)?rowsPerPage.value:rowsPerPage;},pageStart:function pageStart(){return this.getPage===-1?0:(this.computedPagination.page-1)*this.getPage;},pageStop:function pageStop(){return this.getPage===-1?this.itemsLength:this.computedPagination.page*this.getPage;},filteredItems:function filteredItems(){return this.filteredItemsImpl();},selected:function selected(){var selected={};for(var index=0;index<this.value.length;index++){selected[this.value[index][this.itemKey]]=true;}return selected;}},watch:{search:function search(){this.updatePagination({page:1,totalItems:this.itemsLength});}},methods:{initPagination:function initPagination(){if(!this.rowsPerPageItems.length){Object(__WEBPACK_IMPORTED_MODULE_7__util_console__["b"/* consoleWarn */])('The prop \'rows-per-page-items\' can not be empty',this);}else{this.defaultPagination.rowsPerPage=this.rowsPerPageItems[0];}this.defaultPagination.totalItems=this.itemsLength;this.updatePagination(Object.assign({},this.defaultPagination,this.pagination));},updatePagination:function updatePagination(val){var pagination=this.hasPagination?this.pagination:this.defaultPagination;var updatedPagination=Object.assign({},pagination,val);this.$emit('update:pagination',updatedPagination);if(!this.hasPagination){this.defaultPagination=updatedPagination;}},isSelected:function isSelected(item){return this.selected[item[this.itemKey]];},isExpanded:function isExpanded(item){return this.expanded[item[this.itemKey]];},filteredItemsImpl:function filteredItemsImpl(){if(this.totalItems)return this.items;var items=this.items.slice();var hasSearch=typeof this.search!=='undefined'&&this.search!==null;if(hasSearch){for(var _len=arguments.length,additionalFilterArgs=Array(_len),_key=0;_key<_len;_key++){additionalFilterArgs[_key]=arguments[_key];}items=this.customFilter.apply(this,[items,this.search,this.filter].concat(additionalFilterArgs));this.searchLength=items.length;}items=this.customSort(items,this.computedPagination.sortBy,this.computedPagination.descending);return this.hideActions&&!this.hasPagination?items:items.slice(this.pageStart,this.pageStop);},sort:function sort(index){var _computedPagination=this.computedPagination,sortBy=_computedPagination.sortBy,descending=_computedPagination.descending;if(sortBy===null){this.updatePagination({sortBy:index,descending:false});}else if(sortBy===index&&!descending){this.updatePagination({descending:true});}else if(sortBy!==index){this.updatePagination({sortBy:index,descending:false});}else if(!this.mustSort){this.updatePagination({sortBy:null,descending:null});}else{this.updatePagination({sortBy:index,descending:false});}},toggle:function toggle(value){var _this3=this;var selected=Object.assign({},this.selected);for(var index=0;index<this.filteredItems.length;index++){selected[this.filteredItems[index][this.itemKey]]=value;}this.$emit('input',this.items.filter(function(i){return selected[i[_this3.itemKey]];}));},createProps:function createProps(item,index){var _this4=this;var props={item:item,index:index};var keyProp=this.itemKey;var itemKey=item[keyProp];Object.defineProperty(props,'selected',{get:function get(){return _this4.selected[item[_this4.itemKey]];},set:function set(value){if(itemKey==null){Object(__WEBPACK_IMPORTED_MODULE_7__util_console__["b"/* consoleWarn */])('"'+keyProp+'" attribute must be defined for item',_this4);}var selected=_this4.value.slice();if(value)selected.push(item);else selected=selected.filter(function(i){return i[keyProp]!==itemKey;});_this4.$emit('input',selected);}});Object.defineProperty(props,'expanded',{get:function get(){return _this4.expanded[item[_this4.itemKey]];},set:function set(value){if(itemKey==null){Object(__WEBPACK_IMPORTED_MODULE_7__util_console__["b"/* consoleWarn */])('"'+keyProp+'" attribute must be defined for item',_this4);}if(!_this4.expand){for(var key in _this4.expanded){_this4.expanded.hasOwnProperty(key)&&_this4.$set(_this4.expanded,key,false);}}_this4.$set(_this4.expanded,itemKey,value);}});return props;},genItems:function genItems(){if(!this.itemsLength&&!this.items.length){var noData=this.$slots['no-data']||this.noDataText;return[this.genEmptyItems(noData)];}if(!this.filteredItems.length){var noResults=this.$slots['no-results']||this.noResultsText;return[this.genEmptyItems(noResults)];}return this.genFilteredItems();},genPrevIcon:function genPrevIcon(){var _this5=this;return this.$createElement('v-btn',{props:{disabled:this.computedPagination.page===1,icon:true,flat:true,dark:this.dark,light:this.light},on:{click:function click(){var page=_this5.computedPagination.page;_this5.updatePagination({page:page-1});}},attrs:{'aria-label':'Previous page'// TODO: Localization
}},[this.$createElement('v-icon',this.prevIcon)]);},genNextIcon:function genNextIcon(){var _this6=this;var pagination=this.computedPagination;var disabled=pagination.rowsPerPage<0||pagination.page*pagination.rowsPerPage>=this.itemsLength||this.pageStop<0;return this.$createElement('v-btn',{props:{disabled:disabled,icon:true,flat:true,dark:this.dark,light:this.light},on:{click:function click(){var page=_this6.computedPagination.page;_this6.updatePagination({page:page+1});}},attrs:{'aria-label':'Next page'// TODO: Localization
}},[this.$createElement('v-icon',this.nextIcon)]);},genSelect:function genSelect(){var _this7=this;return this.$createElement('div',{'class':this.actionsSelectClasses},[this.rowsPerPageText,this.$createElement('v-select',{attrs:{'aria-label':this.rowsPerPageText},props:{items:this.rowsPerPageItems,value:this.computedPagination.rowsPerPage,hideDetails:true,auto:true,minWidth:'75px'},on:{input:function input(val){_this7.updatePagination({page:1,rowsPerPage:val});}}})]);},genPagination:function genPagination(){var pagination='–';if(this.itemsLength){var stop=this.itemsLength<this.pageStop||this.pageStop<0?this.itemsLength:this.pageStop;pagination=this.$scopedSlots.pageText?this.$scopedSlots.pageText({pageStart:this.pageStart+1,pageStop:stop,itemsLength:this.itemsLength}):this.pageStart+1+'-'+stop+' of '+this.itemsLength;}return this.$createElement('div',{'class':this.actionsPaginationClasses},[pagination]);},genActions:function genActions(){var rangeControls=this.$createElement('div',{'class':this.actionsRangeControlsClasses},[this.genPagination(),this.genPrevIcon(),this.genNextIcon()]);return[this.$createElement('div',{'class':this.actionsClasses},[this.rowsPerPageItems.length>1?this.genSelect():null,rangeControls])];}}};/***/},/* 44 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__VSelect__=__webpack_require__(130);/* istanbul ignore next */__WEBPACK_IMPORTED_MODULE_0__VSelect__["a"/* default */].install=function install(Vue){Vue.component(__WEBPACK_IMPORTED_MODULE_0__VSelect__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_0__VSelect__["a"/* default */]);};/* harmony default export */__webpack_exports__["a"]=__WEBPACK_IMPORTED_MODULE_0__VSelect__["a"/* default */];/***/},/* 45 *//***/function(module,exports){// removed by extract-text-webpack-plugin
/***/},/* 46 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* unused harmony export VListTileActionText *//* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"d",function(){return VListTileContent;});/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"e",function(){return VListTileTitle;});/* unused harmony export VListTileSubTitle *//* harmony import */var __WEBPACK_IMPORTED_MODULE_0__util_helpers__=__webpack_require__(2);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__VList__=__webpack_require__(132);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__VListGroup__=__webpack_require__(134);/* harmony import */var __WEBPACK_IMPORTED_MODULE_3__VListTile__=__webpack_require__(135);/* harmony import */var __WEBPACK_IMPORTED_MODULE_4__VListTileAction__=__webpack_require__(136);/* harmony import */var __WEBPACK_IMPORTED_MODULE_5__VListTileAvatar__=__webpack_require__(137);/* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__,"a",function(){return __WEBPACK_IMPORTED_MODULE_1__VList__["a"];});/* unused harmony reexport VListGroup *//* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__,"b",function(){return __WEBPACK_IMPORTED_MODULE_3__VListTile__["a"];});/* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__,"c",function(){return __WEBPACK_IMPORTED_MODULE_4__VListTileAction__["a"];});/* unused harmony reexport VListTileAvatar */var VListTileActionText=Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["d"/* createSimpleFunctional */])('list__tile__action-text','span');var VListTileContent=Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["d"/* createSimpleFunctional */])('list__tile__content','div');var VListTileTitle=Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["d"/* createSimpleFunctional */])('list__tile__title','div');var VListTileSubTitle=Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["d"/* createSimpleFunctional */])('list__tile__sub-title','div');/* istanbul ignore next */__WEBPACK_IMPORTED_MODULE_1__VList__["a"/* default */].install=function install(Vue){Vue.component(__WEBPACK_IMPORTED_MODULE_1__VList__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_1__VList__["a"/* default */]);Vue.component(__WEBPACK_IMPORTED_MODULE_2__VListGroup__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_2__VListGroup__["a"/* default */]);Vue.component(__WEBPACK_IMPORTED_MODULE_3__VListTile__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_3__VListTile__["a"/* default */]);Vue.component(__WEBPACK_IMPORTED_MODULE_4__VListTileAction__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_4__VListTileAction__["a"/* default */]);Vue.component(VListTileActionText.name,VListTileActionText);Vue.component(__WEBPACK_IMPORTED_MODULE_5__VListTileAvatar__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_5__VListTileAvatar__["a"/* default */]);Vue.component(VListTileContent.name,VListTileContent);Vue.component(VListTileSubTitle.name,VListTileSubTitle);Vue.component(VListTileTitle.name,VListTileTitle);};/* harmony default export */__webpack_exports__["f"]=__WEBPACK_IMPORTED_MODULE_1__VList__["a"/* default */];/***/},/* 47 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__VMenu__=__webpack_require__(138);/* istanbul ignore next */__WEBPACK_IMPORTED_MODULE_0__VMenu__["a"/* default */].install=function install(Vue){Vue.component(__WEBPACK_IMPORTED_MODULE_0__VMenu__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_0__VMenu__["a"/* default */]);};/* harmony default export */__webpack_exports__["a"]=__WEBPACK_IMPORTED_MODULE_0__VMenu__["a"/* default */];/***/},/* 48 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/**
 * Delayable
 *
 * @mixin
 *
 * Changes the open or close
 * delay time for elements
 *//* harmony default export */__webpack_exports__["a"]={name:'delayable',data:function data(){return{openTimeout:null,closeTimeout:null};},props:{openDelay:{type:[Number,String],default:0},closeDelay:{type:[Number,String],default:200}},methods:{/**
     * Clear any pending delay
     * timers from executing
     *
     * @return {void}
     */clearDelay:function clearDelay(){clearTimeout(this.openTimeout);clearTimeout(this.closeTimeout);},/**
     * Runs callback after
     * a specified delay
     *
     * @param  {String}   type
     * @param  {Function} cb
     *
     * @return {void}
     */runDelay:function runDelay(type,cb){this.clearDelay();var delay=parseInt(this[type+'Delay'],10);this[type+'Timeout']=setTimeout(cb,delay);}}};/***/},/* 49 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__positionable__=__webpack_require__(12);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__stackable__=__webpack_require__(36);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__themeable__=__webpack_require__(1);var _typeof=typeof Symbol==="function"&&_typeof2(Symbol.iterator)==="symbol"?function(obj){return typeof obj==='undefined'?'undefined':_typeof2(obj);}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj==='undefined'?'undefined':_typeof2(obj);};/* eslint-disable object-property-newline */var dimensions={activator:{top:0,left:0,bottom:0,right:0,width:0,height:0,offsetTop:0,scrollHeight:0},content:{top:0,left:0,bottom:0,right:0,width:0,height:0,offsetTop:0,scrollHeight:0},hasWindow:false/* eslint-enable object-property-newline *//**
   * Menuable
   *
   * @mixin
   *
   * Used for fixed or absolutely positioning
   * elements within the DOM
   * Can calculate X and Y axis overflows
   * As well as be manually positioned
   */};/* harmony default export */__webpack_exports__["a"]={name:'menuable',mixins:[__WEBPACK_IMPORTED_MODULE_0__positionable__["a"/* default */],__WEBPACK_IMPORTED_MODULE_1__stackable__["a"/* default */],__WEBPACK_IMPORTED_MODULE_2__themeable__["a"/* default */]],data:function data(){return{absoluteX:0,absoluteY:0,dimensions:Object.assign({},dimensions),isContentActive:false,pageYOffset:0,stackClass:'menuable__content__active',stackMinZIndex:6};},props:{activator:{default:null,validator:function validator(val){return['string','object'].includes(typeof val==='undefined'?'undefined':_typeof(val));}},allowOverflow:Boolean,maxWidth:{type:[Number,String],default:'auto'},minWidth:[Number,String],nudgeBottom:{type:Number,default:0},nudgeLeft:{type:[Number,String],default:0},nudgeRight:{type:[Number,String],default:0},nudgeTop:{type:[Number,String],default:0},nudgeWidth:{type:[Number,String],default:0},offsetOverflow:Boolean,positionX:{type:Number,default:null},positionY:{type:Number,default:null},zIndex:{type:[Number,String],default:null}},computed:{computedLeft:function computedLeft(){var a=this.dimensions.activator;var c=this.dimensions.content;var minWidth=a.width<c.width?c.width:a.width;var left=0;left+=this.left?a.left-(minWidth-a.width):a.left;if(this.offsetX)left+=this.left?-a.width:a.width;if(this.nudgeLeft)left-=parseInt(this.nudgeLeft);if(this.nudgeRight)left+=parseInt(this.nudgeRight);return left;},computedTop:function computedTop(){var a=this.dimensions.activator;var c=this.dimensions.content;var top=this.top?a.bottom-c.height:a.top;if(!this.isAttached)top+=this.pageYOffset;if(this.offsetY)top+=this.top?-a.height:a.height;if(this.nudgeTop)top-=this.nudgeTop;if(this.nudgeBottom)top+=this.nudgeBottom;return top;},hasActivator:function hasActivator(){return!!this.$slots.activator||this.activator;},isAttached:function isAttached(){return this.attach!==false;}},watch:{disabled:function disabled(val){val&&this.callDeactivate();},isActive:function isActive(val){if(this.disabled)return;val?this.callActivate():this.callDeactivate();}},beforeMount:function beforeMount(){this.checkForWindow();},methods:{absolutePosition:function absolutePosition(){return{offsetTop:0,scrollHeight:0,top:this.positionY||this.absoluteY,bottom:this.positionY||this.absoluteY,left:this.positionX||this.absoluteX,right:this.positionX||this.absoluteX,height:0,width:0};},activate:function activate(){},calcLeft:function calcLeft(){return(this.isAttached?this.computedLeft:this.calcXOverflow(this.computedLeft))+'px';},calcTop:function calcTop(){return(this.isAttached?this.computedTop:this.calcYOverflow(this.computedTop))+'px';},calcXOverflow:function calcXOverflow(left){var parsedMaxWidth=isNaN(parseInt(this.maxWidth))?0:parseInt(this.maxWidth);var innerWidth=this.getInnerWidth();var maxWidth=Math.max(this.dimensions.content.width,parsedMaxWidth);var totalWidth=left+maxWidth;var availableWidth=totalWidth-innerWidth;if((!this.left||this.right)&&availableWidth>0){left=innerWidth-maxWidth-(innerWidth>600?30:12)// Account for scrollbar
;}if(left<0)left=12;return left;},calcYOverflow:function calcYOverflow(top){var documentHeight=this.getInnerHeight();var toTop=this.pageYOffset+documentHeight;var activator=this.dimensions.activator;var contentHeight=this.dimensions.content.height;var totalHeight=top+contentHeight;var isOverflowing=toTop<totalHeight;// If overflowing bottom and offset
// TODO: set 'bottom' position instead of 'top'
if(isOverflowing&&this.offsetOverflow){top=this.pageYOffset+(activator.top-contentHeight);// If overflowing bottom
}else if(isOverflowing&&!this.allowOverflow){top=toTop-contentHeight-12;// If overflowing top
}else if(top<this.pageYOffset&&!this.allowOverflow){top=this.pageYOffset+12;}return top<12?12:top;},callActivate:function callActivate(){if(!this.hasWindow)return;this.activate();},callDeactivate:function callDeactivate(){this.isContentActive=false;this.deactivate();},checkForWindow:function checkForWindow(){if(!this.hasWindow){this.hasWindow=typeof window!=='undefined';}if(this.hasWindow){this.pageYOffset=this.getOffsetTop();}},deactivate:function deactivate(){},getActivator:function getActivator(){if(this.activator){return typeof this.activator==='string'?document.querySelector(this.activator):this.activator;}return this.$refs.activator.children.length>0?this.$refs.activator.children[0]:this.$refs.activator;},getInnerHeight:function getInnerHeight(){if(!this.hasWindow)return 0;return window.innerHeight||document.documentElement.clientHeight;},getInnerWidth:function getInnerWidth(){if(!this.hasWindow)return 0;return window.innerWidth;},getOffsetTop:function getOffsetTop(){if(!this.hasWindow)return 0;return window.pageYOffset||document.documentElement.scrollTop;},getRoundedBoundedClientRect:function getRoundedBoundedClientRect(el){var rect=el.getBoundingClientRect();return{top:Math.round(rect.top),left:Math.round(rect.left),bottom:Math.round(rect.bottom),right:Math.round(rect.right),width:Math.round(rect.width),height:Math.round(rect.height)};},measure:function measure(el,selector){el=selector?el.querySelector(selector):el;if(!el||!this.hasWindow)return null;var rect=this.getRoundedBoundedClientRect(el);// Account for activator margin
if(this.isAttached){var style=window.getComputedStyle(el);rect.left=parseInt(style.marginLeft);rect.top=parseInt(style.marginTop);}return rect;},sneakPeek:function sneakPeek(cb){var _this=this;requestAnimationFrame(function(){var el=_this.$refs.content;if(!el||_this.isShown(el))return cb();el.style.display='inline-block';cb();el.style.display='none';});},startTransition:function startTransition(){var _this2=this;requestAnimationFrame(function(){return _this2.isContentActive=true;});},isShown:function isShown(el){return el.style.display!=='none';},updateDimensions:function updateDimensions(){var _this3=this;this.checkForWindow();var dimensions={};// Activator should already be shown
dimensions.activator=!this.hasActivator||this.absolute?this.absolutePosition():this.measure(this.getActivator());// Display and hide to get dimensions
this.sneakPeek(function(){dimensions.content=_this3.measure(_this3.$refs.content);_this3.dimensions=dimensions;});}}};/***/},/* 50 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony default export */__webpack_exports__["a"]={name:'filterable',props:{noDataText:{type:String,default:'No data available'}}};/***/},/* 51 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__util_mask__=__webpack_require__(144);/**
 * Maskable
 *
 * @mixin
 *
 * Creates an input mask that is
 * generated from a masked str
 *
 * Example: mask="#### #### #### ####"
 *//* harmony default export */__webpack_exports__["a"]={name:'maskable',data:function data(){return{selection:0,lazySelection:0,preDefined:{'credit-card':'#### - #### - #### - ####','date':'##/##/####','date-with-time':'##/##/#### ##:##','phone':'(###) ### - ####','social':'###-##-####','time':'##:##','time-with-seconds':'##:##:##'}};},props:{dontFillMaskBlanks:Boolean,mask:{type:[Object,String],default:null},returnMaskedValue:Boolean},computed:{masked:function masked(){var preDefined=this.preDefined[this.mask];var mask=preDefined||this.mask||'';return mask.split('');}},watch:{/**
     * Make sure the cursor is in the correct
     * location when the mask changes
     */mask:function mask(){var _this=this;if(!this.$refs.input)return;var oldValue=this.$refs.input.value;var newValue=this.maskText(Object(__WEBPACK_IMPORTED_MODULE_0__util_mask__["c"/* unmaskText */])(this.lazyValue));var position=0;var selection=this.selection;for(var index=0;index<selection;index++){Object(__WEBPACK_IMPORTED_MODULE_0__util_mask__["a"/* isMaskDelimiter */])(oldValue[index])||position++;}selection=0;if(newValue){for(var _index=0;_index<newValue.length;_index++){Object(__WEBPACK_IMPORTED_MODULE_0__util_mask__["a"/* isMaskDelimiter */])(newValue[_index])||position--;selection++;if(position<=0)break;}}this.$nextTick(function(){_this.$refs.input.value=newValue;_this.setCaretPosition(selection);});}},beforeMount:function beforeMount(){if(!this.mask||this.value==null||!this.returnMaskedValue)return;var value=this.maskText(this.value);// See if masked value does not
// match the user given value
if(value===this.value)return;this.$emit('input',value);},methods:{setCaretPosition:function setCaretPosition(selection){var _this2=this;this.selection=selection;window.setTimeout(function(){_this2.$refs.input&&_this2.$refs.input.setSelectionRange(_this2.selection,_this2.selection);},0);},updateRange:function updateRange(){if(!this.$refs.input)return;var newValue=this.maskText(this.lazyValue);var selection=0;this.$refs.input.value=newValue;if(newValue){for(var index=0;index<newValue.length;index++){if(this.lazySelection<=0)break;Object(__WEBPACK_IMPORTED_MODULE_0__util_mask__["a"/* isMaskDelimiter */])(newValue[index])||this.lazySelection--;selection++;}}this.setCaretPosition(selection);// this.$emit() must occur only when all internal values are correct
this.$emit('input',this.returnMaskedValue?this.$refs.input.value:this.lazyValue);},maskText:function maskText(text){return this.mask?Object(__WEBPACK_IMPORTED_MODULE_0__util_mask__["b"/* maskText */])(text,this.masked,this.dontFillMaskBlanks):text;},unmaskText:function unmaskText(text){return this.mask&&!this.returnMaskedValue?Object(__WEBPACK_IMPORTED_MODULE_0__util_mask__["c"/* unmaskText */])(text):text;},// When the input changes and is
// re-created, ensure that the
// caret location is correct
setSelectionRange:function setSelectionRange(){this.$nextTick(this.updateRange);},resetSelections:function resetSelections(input){if(!input.selectionEnd)return;this.selection=input.selectionEnd;this.lazySelection=0;for(var index=0;index<this.selection;index++){Object(__WEBPACK_IMPORTED_MODULE_0__util_mask__["a"/* isMaskDelimiter */])(input.value[index])||this.lazySelection++;}}}};/***/},/* 52 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony default export */__webpack_exports__["a"]={name:'soloable',props:{flat:Boolean,soloInverted:Boolean,solo:Boolean},computed:{isSolo:function isSolo(){return this.solo||this.soloInverted;}},methods:{genSoloClasses:function genSoloClasses(){return{'input-group--solo':this.isSolo,'input-group--solo-inverted':this.soloInverted,'elevation-0':this.flat};}}};/***/},/* 53 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__VProgressLinear__=__webpack_require__(157);/* istanbul ignore next */__WEBPACK_IMPORTED_MODULE_0__VProgressLinear__["a"/* default */].install=function install(Vue){Vue.component(__WEBPACK_IMPORTED_MODULE_0__VProgressLinear__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_0__VProgressLinear__["a"/* default */]);};/* harmony default export */__webpack_exports__["a"]=__WEBPACK_IMPORTED_MODULE_0__VProgressLinear__["a"/* default */];/***/},/* 54 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_date_picker_title_styl__=__webpack_require__(167);/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_date_picker_title_styl___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_date_picker_title_styl__);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__VIcon__=__webpack_require__(3);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__mixins_picker_button__=__webpack_require__(55);// Components
// Mixins
/* harmony default export */__webpack_exports__["a"]={name:'v-date-picker-title',components:{VIcon:__WEBPACK_IMPORTED_MODULE_1__VIcon__["a"/* default */]},mixins:[__WEBPACK_IMPORTED_MODULE_2__mixins_picker_button__["a"/* default */]],data:function data(){return{isReversing:false};},props:{date:{type:String,default:''},selectingYear:Boolean,year:{type:[Number,String],default:''},yearIcon:{type:String},value:{type:String}},computed:{computedTransition:function computedTransition(){return this.isReversing?'picker-reverse-transition':'picker-transition';}},watch:{value:function value(val,prev){this.isReversing=val<prev;}},methods:{genYearIcon:function genYearIcon(){return this.$createElement('v-icon',{props:{dark:true}},this.yearIcon);},getYearBtn:function getYearBtn(){return this.genPickerButton('selectingYear',true,[this.year,this.yearIcon?this.genYearIcon():null],'date-picker-title__year');},genTitleText:function genTitleText(){return this.$createElement('transition',{props:{name:this.computedTransition}},[this.$createElement('div',{domProps:{innerHTML:this.date||'&nbsp;'},key:this.value})]);},genTitleDate:function genTitleDate(title){return this.genPickerButton('selectingYear',false,this.genTitleText(title),'date-picker-title__date');}},render:function render(h){return h('div',{staticClass:'date-picker-title'},[this.getYearBtn(),this.genTitleDate()]);}};/***/},/* 55 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony default export */__webpack_exports__["a"]={methods:{genPickerButton:function genPickerButton(prop,value,content){var _this=this;var staticClass=arguments.length>3&&arguments[3]!==undefined?arguments[3]:'';var active=this[prop]===value;var click=function click(event){event.stopPropagation();_this.$emit('update:'+prop,value);};return this.$createElement('div',{staticClass:('picker__title__btn '+staticClass).trim(),'class':{active:active},on:active?undefined:{click:click}},Array.isArray(content)?content:[content]);}}};/***/},/* 56 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_date_picker_header_styl__=__webpack_require__(168);/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_date_picker_header_styl___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_date_picker_header_styl__);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__VBtn__=__webpack_require__(10);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__VIcon__=__webpack_require__(3);/* harmony import */var __WEBPACK_IMPORTED_MODULE_3__mixins_colorable__=__webpack_require__(0);/* harmony import */var __WEBPACK_IMPORTED_MODULE_4__util__=__webpack_require__(14);var _slicedToArray=function(){function sliceIterator(arr,i){var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[Symbol.iterator](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break;}}catch(err){_d=true;_e=err;}finally{try{if(!_n&&_i["return"])_i["return"]();}finally{if(_d)throw _e;}}return _arr;}return function(arr,i){if(Array.isArray(arr)){return arr;}else if(Symbol.iterator in Object(arr)){return sliceIterator(arr,i);}else{throw new TypeError("Invalid attempt to destructure non-iterable instance");}};}();// Components
// Mixins
// Utils
/* harmony default export */__webpack_exports__["a"]={name:'v-date-picker-header',components:{VBtn:__WEBPACK_IMPORTED_MODULE_1__VBtn__["a"/* default */],VIcon:__WEBPACK_IMPORTED_MODULE_2__VIcon__["a"/* default */]},mixins:[__WEBPACK_IMPORTED_MODULE_3__mixins_colorable__["a"/* default */]],data:function data(){return{isReversing:false,defaultColor:'accent'};},props:{disabled:Boolean,format:{type:Function,default:null},locale:{type:String,default:'en-us'},min:String,max:String,nextIcon:{type:String,default:'chevron_right'},prevIcon:{type:String,default:'chevron_left'},value:{type:[Number,String],required:true}},computed:{formatter:function formatter(){if(this.format){return this.format;}else if(String(this.value).split('-')[1]){return Object(__WEBPACK_IMPORTED_MODULE_4__util__["a"/* createNativeLocaleFormatter */])(this.locale,{month:'long',year:'numeric',timeZone:'UTC'},{length:7});}else{return Object(__WEBPACK_IMPORTED_MODULE_4__util__["a"/* createNativeLocaleFormatter */])(this.locale,{year:'numeric',timeZone:'UTC'},{length:4});}}},watch:{value:function value(newVal,oldVal){this.isReversing=newVal<oldVal;}},methods:{genBtn:function genBtn(change){var _this=this;var disabled=this.disabled||change<0&&this.min&&this.calculateChange(change)<this.min||change>0&&this.max&&this.calculateChange(change)>this.max;return this.$createElement('v-btn',{props:{dark:this.dark,disabled:disabled,icon:true},nativeOn:{click:function click(e){e.stopPropagation();_this.$emit('input',_this.calculateChange(change));}}},[this.$createElement('v-icon',change<0?this.prevIcon:this.nextIcon)]);},calculateChange:function calculateChange(sign){var _String$split$map=String(this.value).split('-').map(function(v){return 1*v;}),_String$split$map2=_slicedToArray(_String$split$map,2),year=_String$split$map2[0],month=_String$split$map2[1];if(month==null){return''+(year+sign);}else{return Object(__WEBPACK_IMPORTED_MODULE_4__util__["b"/* monthChange */])(String(this.value),sign);}},genHeader:function genHeader(){var _this2=this;var header=this.$createElement('strong',{'class':this.disabled?undefined:this.addTextColorClassChecks(),key:String(this.value),on:{click:function click(){return _this2.$emit('toggle');}}},[this.$slots.default||this.formatter(String(this.value))]);var transition=this.$createElement('transition',{props:{name:this.isReversing?'tab-reverse-transition':'tab-transition'}},[header]);return this.$createElement('div',{staticClass:'date-picker-header__value',class:{'date-picker-header__value--disabled':this.disabled}},[transition]);}},render:function render(h){return this.$createElement('div',{staticClass:'date-picker-header'},[this.genBtn(-1),this.genHeader(),this.genBtn(+1)]);}};/***/},/* 57 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__mixins_colorable__=__webpack_require__(0);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__mixins_date_picker_table__=__webpack_require__(58);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__util__=__webpack_require__(14);/* harmony import */var __WEBPACK_IMPORTED_MODULE_3__util_helpers__=__webpack_require__(2);// Mixins
// Utils
/* harmony default export */__webpack_exports__["a"]={name:'v-date-picker-date-table',mixins:[__WEBPACK_IMPORTED_MODULE_0__mixins_colorable__["a"/* default */],__WEBPACK_IMPORTED_MODULE_1__mixins_date_picker_table__["a"/* default */]],props:{events:{type:[Array,Object,Function],default:function _default(){return null;}},eventColor:{type:[String,Function,Object],default:'warning'},firstDayOfWeek:{type:[String,Number],default:0},weekdayFormat:{type:Function,default:null}},computed:{formatter:function formatter(){return this.format||Object(__WEBPACK_IMPORTED_MODULE_2__util__["a"/* createNativeLocaleFormatter */])(this.locale,{day:'numeric',timeZone:'UTC'},{start:8,length:2});},weekdayFormatter:function weekdayFormatter(){return this.weekdayFormat||Object(__WEBPACK_IMPORTED_MODULE_2__util__["a"/* createNativeLocaleFormatter */])(this.locale,{weekday:'narrow',timeZone:'UTC'});},weekDays:function weekDays(){var _this=this;var first=parseInt(this.firstDayOfWeek,10);return this.weekdayFormatter?Object(__WEBPACK_IMPORTED_MODULE_3__util_helpers__["c"/* createRange */])(7).map(function(i){return _this.weekdayFormatter('2017-01-'+(first+i+15));})// 2017-01-15 is Sunday
:Object(__WEBPACK_IMPORTED_MODULE_3__util_helpers__["c"/* createRange */])(7).map(function(i){return['S','M','T','W','T','F','S'][(i+first)%7];});}},methods:{calculateTableDate:function calculateTableDate(delta){return Object(__WEBPACK_IMPORTED_MODULE_2__util__["b"/* monthChange */])(this.tableDate,Math.sign(delta||1));},genTHead:function genTHead(){var _this2=this;var days=this.weekDays.map(function(day){return _this2.$createElement('th',day);});return this.$createElement('thead',this.genTR(days));},genEvent:function genEvent(date){var eventColor=void 0;if(typeof this.eventColor==='string'){eventColor=this.eventColor;}else if(typeof this.eventColor==='function'){eventColor=this.eventColor(date);}else{eventColor=this.eventColor[date];}return this.$createElement('div',{staticClass:'date-picker-table__event',class:this.addBackgroundColorClassChecks({},eventColor||this.color)});},// Returns number of the days from the firstDayOfWeek to the first day of the current month
weekDaysBeforeFirstDayOfTheMonth:function weekDaysBeforeFirstDayOfTheMonth(){var firstDayOfTheMonth=new Date(this.displayedYear+'-'+Object(__WEBPACK_IMPORTED_MODULE_2__util__["c"/* pad */])(this.displayedMonth+1)+'-01T00:00:00+00:00');var weekDay=firstDayOfTheMonth.getUTCDay();return(weekDay-parseInt(this.firstDayOfWeek)+7)%7;},isEvent:function isEvent(date){if(Array.isArray(this.events)){return this.events.indexOf(date)>-1;}else if(this.events instanceof Function){return this.events(date);}else{return false;}},genTBody:function genTBody(){var children=[];var daysInMonth=new Date(this.displayedYear,this.displayedMonth+1,0).getDate();var rows=[];var day=this.weekDaysBeforeFirstDayOfTheMonth();while(day--){rows.push(this.$createElement('td'));}for(day=1;day<=daysInMonth;day++){var date=this.displayedYear+'-'+Object(__WEBPACK_IMPORTED_MODULE_2__util__["c"/* pad */])(this.displayedMonth+1)+'-'+Object(__WEBPACK_IMPORTED_MODULE_2__util__["c"/* pad */])(day);rows.push(this.$createElement('td',[this.genButton(date,true),this.isEvent(date)?this.genEvent(date):null]));if(rows.length%7===0){children.push(this.genTR(rows));rows=[];}}if(rows.length){children.push(this.genTR(rows));}return this.$createElement('tbody',children);},genTR:function genTR(children){return[this.$createElement('tr',children)];}},render:function render(h){return this.genTable('date-picker-table date-picker-table--date',[this.genTHead(),this.genTBody()]);}};/***/},/* 58 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_date_picker_table_styl__=__webpack_require__(171);/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_date_picker_table_styl___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_date_picker_table_styl__);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__directives_touch__=__webpack_require__(9);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__util_isDateAllowed__=__webpack_require__(59);// Directives
// Utils
/* harmony default export */__webpack_exports__["a"]={directives:{Touch:__WEBPACK_IMPORTED_MODULE_1__directives_touch__["a"/* default */]},data:function data(){return{defaultColor:'accent',isReversing:false};},props:{allowedDates:Function,current:String,disabled:Boolean,format:{type:Function,default:null},locale:{type:String,default:'en-us'},min:String,max:String,scrollable:Boolean,tableDate:{type:String,required:true},value:{type:String,required:false}},computed:{computedTransition:function computedTransition(){return this.isReversing?'tab-reverse-transition':'tab-transition';},displayedMonth:function displayedMonth(){return this.tableDate.split('-')[1]-1;},displayedYear:function displayedYear(){return this.tableDate.split('-')[0]*1;}},watch:{tableDate:function tableDate(newVal,oldVal){this.isReversing=newVal<oldVal;}},methods:{genButtonClasses:function genButtonClasses(value,isDisabled,isFloating){var isSelected=value===this.value;var isCurrent=value===this.current;var classes={'btn--active':isSelected,'btn--flat':!isSelected,'btn--icon':isSelected&&!isDisabled&&isFloating,'btn--floating':isFloating,'btn--depressed':!isFloating&&isSelected,'btn--disabled':isDisabled||this.disabled&&isSelected,'btn--outline':isCurrent&&!isSelected};if(isSelected)return this.addBackgroundColorClassChecks(classes);if(isCurrent)return this.addTextColorClassChecks(classes);return classes;},genButton:function genButton(value,isFloating){var _this=this;var isDisabled=!Object(__WEBPACK_IMPORTED_MODULE_2__util_isDateAllowed__["a"/* default */])(value,this.min,this.max,this.allowedDates);return this.$createElement('button',{staticClass:'btn','class':this.genButtonClasses(value,isDisabled,isFloating),attrs:{type:'button'},domProps:{disabled:isDisabled,innerHTML:'<div class="btn__content">'+this.formatter(value)+'</div>'},on:isDisabled?{}:{click:function click(){return _this.$emit('input',value);}}});},wheel:function wheel(e){e.preventDefault();this.$emit('tableDate',this.calculateTableDate(e.deltaY));},touch:function touch(value){this.$emit('tableDate',this.calculateTableDate(value));},genTable:function genTable(staticClass,children){var _this2=this;var transition=this.$createElement('transition',{props:{name:this.computedTransition}},[this.$createElement('table',{key:this.tableDate},children)]);var touchDirective={name:'touch',value:{left:function left(e){return e.offsetX<-15&&_this2.touch(1);},right:function right(e){return e.offsetX>15&&_this2.touch(-1);}}};return this.$createElement('div',{staticClass:staticClass,on:this.scrollable?{wheel:this.wheel}:undefined,directives:[touchDirective]},[transition]);}}};/***/},/* 59 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony export (immutable) */__webpack_exports__["a"]=isDateAllowed;function isDateAllowed(date,min,max,allowedFn){return(!allowedFn||allowedFn(date))&&(!min||date>=min)&&(!max||date<=max);}/***/},/* 60 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__mixins_colorable__=__webpack_require__(0);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__mixins_date_picker_table__=__webpack_require__(58);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__util__=__webpack_require__(14);// Mixins
// Utils
/* harmony default export */__webpack_exports__["a"]={name:'v-date-picker-month-table',mixins:[__WEBPACK_IMPORTED_MODULE_0__mixins_colorable__["a"/* default */],__WEBPACK_IMPORTED_MODULE_1__mixins_date_picker_table__["a"/* default */]],computed:{formatter:function formatter(){return this.format||Object(__WEBPACK_IMPORTED_MODULE_2__util__["a"/* createNativeLocaleFormatter */])(this.locale,{month:'short',timeZone:'UTC'},{start:5,length:2});}},methods:{calculateTableDate:function calculateTableDate(delta){return''+(parseInt(this.tableDate,10)+Math.sign(delta||1));},genTBody:function genTBody(){var _this=this;var children=[];var cols=Array(3).fill(null);var rows=12/cols.length;var _loop=function _loop(row){var tds=cols.map(function(_,col){var month=row*cols.length+col;return _this.$createElement('td',{key:month},[_this.genButton(_this.displayedYear+'-'+Object(__WEBPACK_IMPORTED_MODULE_2__util__["c"/* pad */])(month+1),false)]);});children.push(_this.$createElement('tr',{key:row},tds));};for(var row=0;row<rows;row++){_loop(row);}return this.$createElement('tbody',children);}},render:function render(h){return this.genTable('date-picker-table date-picker-table--month',[this.genTBody()]);}};/***/},/* 61 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_date_picker_years_styl__=__webpack_require__(172);/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_date_picker_years_styl___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_date_picker_years_styl__);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__mixins_colorable__=__webpack_require__(0);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__util__=__webpack_require__(14);// Mixins
// Utils
/* harmony default export */__webpack_exports__["a"]={name:'v-date-picker-years',mixins:[__WEBPACK_IMPORTED_MODULE_1__mixins_colorable__["a"/* default */]],data:function data(){return{defaultColor:'primary'};},props:{format:{type:Function,default:null},locale:{type:String,default:'en-us'},min:[Number,String],max:[Number,String],value:[Number,String]},computed:{formatter:function formatter(){return this.format||Object(__WEBPACK_IMPORTED_MODULE_2__util__["a"/* createNativeLocaleFormatter */])(this.locale,{year:'numeric',timeZone:'UTC'},{length:4});}},mounted:function mounted(){this.$el.scrollTop=this.$el.scrollHeight/2-this.$el.offsetHeight/2;},methods:{genYearItem:function genYearItem(year){var _this=this;var formatted=this.formatter(''+year);return this.$createElement('li',{key:year,'class':parseInt(this.value,10)===year?this.addTextColorClassChecks({active:true}):{},on:{click:function click(){return _this.$emit('input',year);}}},formatted);},genYearItems:function genYearItems(){var children=[];var selectedYear=this.value?parseInt(this.value,10):new Date().getFullYear();var maxYear=this.max?parseInt(this.max,10):selectedYear+100;var minYear=Math.min(maxYear,this.min?parseInt(this.min,10):selectedYear-100);for(var year=maxYear;year>=minYear;year--){children.push(this.genYearItem(year));}return children;}},render:function render(h){return this.$createElement('ul',{staticClass:'date-picker-years',ref:'years'},this.genYearItems());}};/***/},/* 62 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__components_VPicker__=__webpack_require__(63);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__colorable__=__webpack_require__(0);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__themeable__=__webpack_require__(1);// Components
// Mixins
/* harmony default export */__webpack_exports__["a"]={name:'picker',components:{VPicker:__WEBPACK_IMPORTED_MODULE_0__components_VPicker__["a"/* default */]},mixins:[__WEBPACK_IMPORTED_MODULE_1__colorable__["a"/* default */],__WEBPACK_IMPORTED_MODULE_2__themeable__["a"/* default */]],props:{fullWidth:Boolean,headerColor:String,landscape:Boolean,noTitle:Boolean,width:{type:[Number,String],default:290,validator:function validator(value){return parseInt(value,10)>0;}}},methods:{genPickerTitle:function genPickerTitle(){},genPickerBody:function genPickerBody(){},genPickerActionsSlot:function genPickerActionsSlot(){return this.$scopedSlots.default?this.$scopedSlots.default({save:this.save,cancel:this.cancel}):this.$slots.default;},genPicker:function genPicker(staticClass){return this.$createElement('v-picker',{staticClass:staticClass,class:this.fullWidth?['picker--full-width']:[],props:{color:this.headerColor||this.color,dark:this.dark,fullWidth:this.fullWidth,landscape:this.landscape,light:this.light,width:this.width}},[this.noTitle?null:this.genPickerTitle(),this.genPickerBody(),this.$createElement('template',{slot:'actions'},[this.genPickerActionsSlot()])]);}}};/***/},/* 63 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__VPicker__=__webpack_require__(173);/* istanbul ignore next */__WEBPACK_IMPORTED_MODULE_0__VPicker__["a"/* default */].install=function install(Vue){Vue.component(__WEBPACK_IMPORTED_MODULE_0__VPicker__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_0__VPicker__["a"/* default */]);};/* harmony default export */__webpack_exports__["a"]=__WEBPACK_IMPORTED_MODULE_0__VPicker__["a"/* default */];/***/},/* 64 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__mixins_registrable__=__webpack_require__(4);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__directives_touch__=__webpack_require__(9);// Mixins
// Directives
/* harmony default export */__webpack_exports__["a"]={name:'v-tabs-items',mixins:[Object(__WEBPACK_IMPORTED_MODULE_0__mixins_registrable__["b"/* provide */])('tabs')],directives:{Touch:__WEBPACK_IMPORTED_MODULE_1__directives_touch__["a"/* default */]},inject:{registerItems:{default:null},tabProxy:{default:null},unregisterItems:{default:null}},data:function data(){return{items:[],lazyValue:this.value,reverse:false};},props:{cycle:Boolean,touchless:Boolean,value:[Number,String]},computed:{activeIndex:function activeIndex(){var _this=this;return this.items.findIndex(function(item,index){return(item.id||index.toString())===_this.lazyValue;});},activeItem:function activeItem(){if(!this.items.length)return undefined;return this.items[this.activeIndex];},inputValue:{get:function get(){return this.lazyValue;},set:function set(val){val=val.toString();this.lazyValue=val;if(this.tabProxy)this.tabProxy(val);else this.$emit('input',val);}}},watch:{activeIndex:function activeIndex(current,previous){this.reverse=current<previous;this.updateItems();},value:function value(val){this.lazyValue=val;}},mounted:function mounted(){this.registerItems&&this.registerItems(this.changeModel);},beforeDestroy:function beforeDestroy(){this.unregisterItems&&this.unregisterItems();},methods:{changeModel:function changeModel(val){this.inputValue=val;},next:function next(cycle){var nextIndex=this.activeIndex+1;if(!this.items[nextIndex]){if(!cycle)return;nextIndex=0;}this.inputValue=this.items[nextIndex].id||nextIndex;},prev:function prev(cycle){var prevIndex=this.activeIndex-1;if(!this.items[prevIndex]){if(!cycle)return;prevIndex=this.items.length-1;}this.inputValue=this.items[prevIndex].id||prevIndex;},onSwipe:function onSwipe(action){this[action](this.cycle);},register:function register(item){this.items.push(item);},unregister:function unregister(item){this.items=this.items.filter(function(i){return i!==item;});},updateItems:function updateItems(){for(var index=this.items.length;--index>=0;){this.items[index].toggle(this.lazyValue,this.reverse,this.isBooted,index);}this.isBooted=true;}},render:function render(h){var _this2=this;var data={staticClass:'tabs__items',directives:[]};!this.touchless&&data.directives.push({name:'touch',value:{left:function left(){return _this2.onSwipe('next');},right:function right(){return _this2.onSwipe('prev');}}});return h('div',data,this.$slots.default);}};/***/},/* 65 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__mixins_colorable__=__webpack_require__(0);/* harmony default export */__webpack_exports__["a"]={name:'v-tabs-slider',mixins:[__WEBPACK_IMPORTED_MODULE_0__mixins_colorable__["a"/* default */]],data:function data(){return{defaultColor:'accent'};},render:function render(h){return h('div',{staticClass:'tabs__slider',class:this.addBackgroundColorClassChecks()});}};/***/},/* 66 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_time_picker_title_styl__=__webpack_require__(249);/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_time_picker_title_styl___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_time_picker_title_styl__);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__mixins_picker_button__=__webpack_require__(55);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__VDatePicker_util__=__webpack_require__(14);// Mixins
// Utils
/* harmony default export */__webpack_exports__["a"]={name:'v-time-picker-title',mixins:[__WEBPACK_IMPORTED_MODULE_1__mixins_picker_button__["a"/* default */]],props:{ampm:Boolean,hour:Number,minute:Number,period:{type:String,validator:function validator(period){return period==='am'||period==='pm';}},selectingHour:Boolean},methods:{genTime:function genTime(){var hour=this.hour;if(this.ampm){hour=hour?(hour-1)%12+1:12;}var displayedHour=this.hour==null?'--':this.ampm?hour:Object(__WEBPACK_IMPORTED_MODULE_2__VDatePicker_util__["c"/* pad */])(hour);var displayedMinute=this.minute==null?'--':Object(__WEBPACK_IMPORTED_MODULE_2__VDatePicker_util__["c"/* pad */])(this.minute);return this.$createElement('div',{'class':'time-picker-title__time'},[this.genPickerButton('selectingHour',true,displayedHour),this.$createElement('span',':'),this.genPickerButton('selectingHour',false,displayedMinute)]);},genAmPm:function genAmPm(){return this.$createElement('div',{staticClass:'time-picker-title__ampm'},[this.genPickerButton('period','am','am'),this.genPickerButton('period','pm','pm')]);}},render:function render(h){return h('div',{staticClass:'time-picker-title'},[this.genTime(),this.ampm?this.genAmPm():null]);}};/***/},/* 67 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_time_picker_clock_styl__=__webpack_require__(250);/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_time_picker_clock_styl___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_time_picker_clock_styl__);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__mixins_colorable__=__webpack_require__(0);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__mixins_themeable__=__webpack_require__(1);// Mixins
/* harmony default export */__webpack_exports__["a"]={name:'v-time-picker-clock',mixins:[__WEBPACK_IMPORTED_MODULE_1__mixins_colorable__["a"/* default */],__WEBPACK_IMPORTED_MODULE_2__mixins_themeable__["a"/* default */]],data:function data(){return{defaultColor:'accent',inputValue:this.value,isDragging:false};},props:{allowedValues:Function,double:Boolean,format:{type:Function,default:function _default(val){return val;}},max:{type:Number,required:true},min:{type:Number,required:true},scrollable:Boolean,rotate:{type:Number,default:0},size:{type:[Number,String],default:270},step:{type:Number,default:1},value:Number},computed:{count:function count(){return this.max-this.min+1;},innerRadius:function innerRadius(){return this.radius-Math.max(this.radius*0.4,48);},outerRadius:function outerRadius(){return this.radius-4;},roundCount:function roundCount(){return this.double?this.count/2:this.count;},degreesPerUnit:function degreesPerUnit(){return 360/this.roundCount;},degrees:function degrees(){return this.degreesPerUnit*Math.PI/180;},radius:function radius(){return this.size/2;},displayedValue:function displayedValue(){return this.value==null?this.min:this.value;}},watch:{value:function value(_value){this.inputValue=_value;}},methods:{wheel:function wheel(e){e.preventDefault();var value=this.displayedValue+Math.sign(e.wheelDelta||1);this.update((value-this.min+this.count)%this.count+this.min);},handScale:function handScale(value){return this.double&&value-this.min>=this.roundCount?this.innerRadius/this.radius:this.outerRadius/this.radius;},isAllowed:function isAllowed(value){return!this.allowedValues||this.allowedValues(value);},genValues:function genValues(){var children=[];for(var value=this.min;value<=this.max;value=value+this.step){var classes={active:value===this.displayedValue,disabled:!this.isAllowed(value)};children.push(this.$createElement('span',{'class':this.addBackgroundColorClassChecks(classes,value===this.value?this.computedColor:null),style:this.getTransform(value),domProps:{innerHTML:'<span>'+this.format(value)+'</span>'}}));}return children;},genHand:function genHand(){var scale='scaleY('+this.handScale(this.displayedValue)+')';var angle=this.rotate+this.degreesPerUnit*(this.displayedValue-this.min);return this.$createElement('div',{staticClass:'time-picker-clock__hand','class':this.value==null?{}:this.addBackgroundColorClassChecks(),style:{transform:'rotate('+angle+'deg) '+scale}});},getTransform:function getTransform(i){var _getPosition=this.getPosition(i),x=_getPosition.x,y=_getPosition.y;return{transform:'translate('+x+'px, '+y+'px)'};},getPosition:function getPosition(value){var radius=(this.radius-24)*this.handScale(value);var rotateRadians=this.rotate*Math.PI/180;return{x:Math.round(Math.sin((value-this.min)*this.degrees+rotateRadians)*radius),y:Math.round(-Math.cos((value-this.min)*this.degrees+rotateRadians)*radius)};},onMouseDown:function onMouseDown(e){e.preventDefault();this.isDragging=true;this.onDragMove(e);},onMouseUp:function onMouseUp(){this.isDragging=false;this.isAllowed(this.inputValue)&&this.$emit('change',this.inputValue);},onDragMove:function onDragMove(e){e.preventDefault();if(!this.isDragging&&e.type!=='click')return;var _$refs$clock$getBound=this.$refs.clock.getBoundingClientRect(),width=_$refs$clock$getBound.width,top=_$refs$clock$getBound.top,left=_$refs$clock$getBound.left;var _ref='touches'in e?e.touches[0]:e,clientX=_ref.clientX,clientY=_ref.clientY;var center={x:width/2,y:-width/2};var coords={x:clientX-left,y:top-clientY};var handAngle=Math.round(this.angle(center,coords)-this.rotate+360)%360;var insideClick=this.double&&this.euclidean(center,coords)<(this.outerRadius+this.innerRadius)/2-16;var value=Math.round(handAngle/this.degreesPerUnit)+this.min+(insideClick?this.roundCount:0);// Necessary to fix edge case when selecting left part of max value
if(handAngle>=360-this.degreesPerUnit/2){this.update(insideClick?this.max:this.min);}else{this.update(value);}},update:function update(value){if(this.inputValue!==value&&this.isAllowed(value)){this.inputValue=value;this.$emit('input',value);}},euclidean:function euclidean(p0,p1){var dx=p1.x-p0.x;var dy=p1.y-p0.y;return Math.sqrt(dx*dx+dy*dy);},angle:function angle(center,p1){var value=2*Math.atan2(p1.y-center.y-this.euclidean(center,p1),p1.x-center.x);return Math.abs(value*180/Math.PI);}},render:function render(h){var _this=this;var data={staticClass:'time-picker-clock',class:{'time-picker-clock--indeterminate':this.value==null},on:{mousedown:this.onMouseDown,mouseup:this.onMouseUp,mouseleave:function mouseleave(){return _this.isDragging&&_this.onMouseUp();},touchstart:this.onMouseDown,touchend:this.onMouseUp,mousemove:this.onDragMove,touchmove:this.onDragMove},style:{height:this.size+'px',width:this.size+'px'},ref:'clock'};this.scrollable&&(data.on.wheel=this.wheel);return this.$createElement('div',data,[this.genHand(),this.genValues()]);}};/***/},/* 68 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";function inserted(el,binding){var callback=binding.value;var options=binding.options||{passive:true};var target=binding.arg||window;if(target==='undefined')return;if(target!==window){target=document.querySelector(target);}target.addEventListener('scroll',callback,options);el._onScroll={callback:callback,options:options,target:target};}function unbind(el,binding){if(!el._onScroll)return;var _el$_onScroll=el._onScroll,callback=_el$_onScroll.callback,options=_el$_onScroll.options,target=_el$_onScroll.target;target.removeEventListener('scroll',callback,options);delete el._onScroll;}/* harmony default export */__webpack_exports__["a"]={name:'scroll',inserted:inserted,unbind:unbind};/***/},/* 69 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";Object.defineProperty(__webpack_exports__,"__esModule",{value:true});/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_app_styl__=__webpack_require__(70);/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_app_styl___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_app_styl__);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__components__=__webpack_require__(71);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__directives__=__webpack_require__(258);var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};function Vuetify(Vue,args){var Vuetify=__WEBPACK_IMPORTED_MODULE_1__components__["Vuetify"];Vue.use(Vuetify,_extends({components:__WEBPACK_IMPORTED_MODULE_1__components__,directives:__WEBPACK_IMPORTED_MODULE_2__directives__},args));}Vuetify.version='1.0.3';if(typeof window!=='undefined'&&window.Vue){window.Vue.use(Vuetify);}/* harmony default export */__webpack_exports__["default"]=Vuetify;/***/},/* 70 *//***/function(module,exports){// removed by extract-text-webpack-plugin
/***/},/* 71 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";Object.defineProperty(__webpack_exports__,"__esModule",{value:true});/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__Vuetify__=__webpack_require__(72);/* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__,"Vuetify",function(){return __WEBPACK_IMPORTED_MODULE_0__Vuetify__["a"];});/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__VApp__=__webpack_require__(78);/* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__,"VApp",function(){return __WEBPACK_IMPORTED_MODULE_1__VApp__["a"];});/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__VAlert__=__webpack_require__(86);/* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__,"VAlert",function(){return __WEBPACK_IMPORTED_MODULE_2__VAlert__["a"];});/* harmony import */var __WEBPACK_IMPORTED_MODULE_3__VAvatar__=__webpack_require__(32);/* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__,"VAvatar",function(){return __WEBPACK_IMPORTED_MODULE_3__VAvatar__["a"];});/* harmony import */var __WEBPACK_IMPORTED_MODULE_4__VBadge__=__webpack_require__(93);/* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__,"VBadge",function(){return __WEBPACK_IMPORTED_MODULE_4__VBadge__["a"];});/* harmony import */var __WEBPACK_IMPORTED_MODULE_5__VBottomNav__=__webpack_require__(96);/* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__,"VBottomNav",function(){return __WEBPACK_IMPORTED_MODULE_5__VBottomNav__["a"];});/* harmony import */var __WEBPACK_IMPORTED_MODULE_6__VBottomSheet__=__webpack_require__(99);/* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__,"VBottomSheet",function(){return __WEBPACK_IMPORTED_MODULE_6__VBottomSheet__["a"];});/* harmony import */var __WEBPACK_IMPORTED_MODULE_7__VBreadcrumbs__=__webpack_require__(104);/* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__,"VBreadcrumbs",function(){return __WEBPACK_IMPORTED_MODULE_7__VBreadcrumbs__["a"];});/* harmony import */var __WEBPACK_IMPORTED_MODULE_8__VBtn__=__webpack_require__(10);/* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__,"VBtn",function(){return __WEBPACK_IMPORTED_MODULE_8__VBtn__["a"];});/* harmony import */var __WEBPACK_IMPORTED_MODULE_9__VBtnToggle__=__webpack_require__(110);/* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__,"VBtnToggle",function(){return __WEBPACK_IMPORTED_MODULE_9__VBtnToggle__["a"];});/* harmony import */var __WEBPACK_IMPORTED_MODULE_10__VCard__=__webpack_require__(21);/* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__,"VCard",function(){return __WEBPACK_IMPORTED_MODULE_10__VCard__["a"];});/* harmony import */var __WEBPACK_IMPORTED_MODULE_11__VCarousel__=__webpack_require__(117);/* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__,"VCarousel",function(){return __WEBPACK_IMPORTED_MODULE_11__VCarousel__["a"];});/* harmony import */var __WEBPACK_IMPORTED_MODULE_12__VCheckbox__=__webpack_require__(38);/* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__,"VCheckbox",function(){return __WEBPACK_IMPORTED_MODULE_12__VCheckbox__["a"];});/* harmony import */var __WEBPACK_IMPORTED_MODULE_13__VChip__=__webpack_require__(42);/* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__,"VChip",function(){return __WEBPACK_IMPORTED_MODULE_13__VChip__["a"];});/* harmony import */var __WEBPACK_IMPORTED_MODULE_14__VDataIterator__=__webpack_require__(127);/* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__,"VDataIterator",function(){return __WEBPACK_IMPORTED_MODULE_14__VDataIterator__["a"];});/* harmony import */var __WEBPACK_IMPORTED_MODULE_15__VDataTable__=__webpack_require__(153);/* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__,"VDataTable",function(){return __WEBPACK_IMPORTED_MODULE_15__VDataTable__["a"];});/* harmony import */var __WEBPACK_IMPORTED_MODULE_16__VDatePicker__=__webpack_require__(165);/* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__,"VDatePicker",function(){return __WEBPACK_IMPORTED_MODULE_16__VDatePicker__["a"];});/* harmony import */var __WEBPACK_IMPORTED_MODULE_17__VDialog__=__webpack_require__(175);/* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__,"VDialog",function(){return __WEBPACK_IMPORTED_MODULE_17__VDialog__["a"];});/* harmony import */var __WEBPACK_IMPORTED_MODULE_18__VDivider__=__webpack_require__(176);/* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__,"VDivider",function(){return __WEBPACK_IMPORTED_MODULE_18__VDivider__["a"];});/* harmony import */var __WEBPACK_IMPORTED_MODULE_19__VExpansionPanel__=__webpack_require__(179);/* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__,"VExpansionPanel",function(){return __WEBPACK_IMPORTED_MODULE_19__VExpansionPanel__["a"];});/* harmony import */var __WEBPACK_IMPORTED_MODULE_20__VFooter__=__webpack_require__(183);/* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__,"VFooter",function(){return __WEBPACK_IMPORTED_MODULE_20__VFooter__["a"];});/* harmony import */var __WEBPACK_IMPORTED_MODULE_21__VForm__=__webpack_require__(186);/* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__,"VForm",function(){return __WEBPACK_IMPORTED_MODULE_21__VForm__["a"];});/* harmony import */var __WEBPACK_IMPORTED_MODULE_22__VGrid__=__webpack_require__(188);/* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__,"VGrid",function(){return __WEBPACK_IMPORTED_MODULE_22__VGrid__["a"];});/* harmony import */var __WEBPACK_IMPORTED_MODULE_23__VIcon__=__webpack_require__(3);/* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__,"VIcon",function(){return __WEBPACK_IMPORTED_MODULE_23__VIcon__["a"];});/* harmony import */var __WEBPACK_IMPORTED_MODULE_24__VJumbotron__=__webpack_require__(37);/* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__,"VJumbotron",function(){return __WEBPACK_IMPORTED_MODULE_24__VJumbotron__["a"];});/* harmony import */var __WEBPACK_IMPORTED_MODULE_25__VList__=__webpack_require__(46);/* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__,"VList",function(){return __WEBPACK_IMPORTED_MODULE_25__VList__["f"];});/* harmony import */var __WEBPACK_IMPORTED_MODULE_26__VMenu__=__webpack_require__(47);/* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__,"VMenu",function(){return __WEBPACK_IMPORTED_MODULE_26__VMenu__["a"];});/* harmony import */var __WEBPACK_IMPORTED_MODULE_27__VNavigationDrawer__=__webpack_require__(194);/* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__,"VNavigationDrawer",function(){return __WEBPACK_IMPORTED_MODULE_27__VNavigationDrawer__["a"];});/* harmony import */var __WEBPACK_IMPORTED_MODULE_28__VPagination__=__webpack_require__(197);/* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__,"VPagination",function(){return __WEBPACK_IMPORTED_MODULE_28__VPagination__["a"];});/* harmony import */var __WEBPACK_IMPORTED_MODULE_29__VParallax__=__webpack_require__(200);/* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__,"VParallax",function(){return __WEBPACK_IMPORTED_MODULE_29__VParallax__["a"];});/* harmony import */var __WEBPACK_IMPORTED_MODULE_30__VPicker__=__webpack_require__(63);/* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__,"VPicker",function(){return __WEBPACK_IMPORTED_MODULE_30__VPicker__["a"];});/* harmony import */var __WEBPACK_IMPORTED_MODULE_31__VProgressCircular__=__webpack_require__(204);/* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__,"VProgressCircular",function(){return __WEBPACK_IMPORTED_MODULE_31__VProgressCircular__["a"];});/* harmony import */var __WEBPACK_IMPORTED_MODULE_32__VProgressLinear__=__webpack_require__(53);/* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__,"VProgressLinear",function(){return __WEBPACK_IMPORTED_MODULE_32__VProgressLinear__["a"];});/* harmony import */var __WEBPACK_IMPORTED_MODULE_33__VRadioGroup__=__webpack_require__(207);/* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__,"VRadioGroup",function(){return __WEBPACK_IMPORTED_MODULE_33__VRadioGroup__["a"];});/* harmony import */var __WEBPACK_IMPORTED_MODULE_34__VSelect__=__webpack_require__(44);/* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__,"VSelect",function(){return __WEBPACK_IMPORTED_MODULE_34__VSelect__["a"];});/* harmony import */var __WEBPACK_IMPORTED_MODULE_35__VSlider__=__webpack_require__(212);/* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__,"VSlider",function(){return __WEBPACK_IMPORTED_MODULE_35__VSlider__["a"];});/* harmony import */var __WEBPACK_IMPORTED_MODULE_36__VSnackbar__=__webpack_require__(215);/* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__,"VSnackbar",function(){return __WEBPACK_IMPORTED_MODULE_36__VSnackbar__["a"];});/* harmony import */var __WEBPACK_IMPORTED_MODULE_37__VSpeedDial__=__webpack_require__(218);/* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__,"VSpeedDial",function(){return __WEBPACK_IMPORTED_MODULE_37__VSpeedDial__["a"];});/* harmony import */var __WEBPACK_IMPORTED_MODULE_38__VStepper__=__webpack_require__(221);/* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__,"VStepper",function(){return __WEBPACK_IMPORTED_MODULE_38__VStepper__["a"];});/* harmony import */var __WEBPACK_IMPORTED_MODULE_39__VSubheader__=__webpack_require__(226);/* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__,"VSubheader",function(){return __WEBPACK_IMPORTED_MODULE_39__VSubheader__["a"];});/* harmony import */var __WEBPACK_IMPORTED_MODULE_40__VSwitch__=__webpack_require__(229);/* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__,"VSwitch",function(){return __WEBPACK_IMPORTED_MODULE_40__VSwitch__["a"];});/* harmony import */var __WEBPACK_IMPORTED_MODULE_41__VSystemBar__=__webpack_require__(232);/* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__,"VSystemBar",function(){return __WEBPACK_IMPORTED_MODULE_41__VSystemBar__["a"];});/* harmony import */var __WEBPACK_IMPORTED_MODULE_42__VTabs__=__webpack_require__(235);/* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__,"VTabs",function(){return __WEBPACK_IMPORTED_MODULE_42__VTabs__["a"];});/* harmony import */var __WEBPACK_IMPORTED_MODULE_43__VTextField__=__webpack_require__(245);/* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__,"VTextField",function(){return __WEBPACK_IMPORTED_MODULE_43__VTextField__["a"];});/* harmony import */var __WEBPACK_IMPORTED_MODULE_44__VTimePicker__=__webpack_require__(247);/* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__,"VTimePicker",function(){return __WEBPACK_IMPORTED_MODULE_44__VTimePicker__["a"];});/* harmony import */var __WEBPACK_IMPORTED_MODULE_45__VToolbar__=__webpack_require__(251);/* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__,"VToolbar",function(){return __WEBPACK_IMPORTED_MODULE_45__VToolbar__["a"];});/* harmony import */var __WEBPACK_IMPORTED_MODULE_46__VTooltip__=__webpack_require__(255);/* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__,"VTooltip",function(){return __WEBPACK_IMPORTED_MODULE_46__VTooltip__["a"];});/* harmony import */var __WEBPACK_IMPORTED_MODULE_47__transitions__=__webpack_require__(7);/* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__,"Transitions",function(){return __WEBPACK_IMPORTED_MODULE_47__transitions__["g"];});/***/},/* 72 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__mixins_application__=__webpack_require__(73);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__mixins_theme__=__webpack_require__(74);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__mixins_options__=__webpack_require__(75);/* harmony import */var __WEBPACK_IMPORTED_MODULE_3__util_console__=__webpack_require__(6);/* harmony import */var __WEBPACK_IMPORTED_MODULE_4__util_goTo__=__webpack_require__(76);var Vuetify={install:function install(Vue){var opts=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};if(this.installed)return;this.installed=true;checkVueVersion(Vue);Vue.prototype.$vuetify=new Vue({data:{application:__WEBPACK_IMPORTED_MODULE_0__mixins_application__["a"/* default */],breakpoint:{},dark:false,options:Object(__WEBPACK_IMPORTED_MODULE_2__mixins_options__["a"/* default */])(opts.options),theme:Object(__WEBPACK_IMPORTED_MODULE_1__mixins_theme__["a"/* default */])(opts.theme)},methods:{goTo:__WEBPACK_IMPORTED_MODULE_4__util_goTo__["a"/* default */]}});if(opts.transitions){Object.values(opts.transitions).forEach(function(transition){if(transition.name!==undefined&&transition.name.startsWith('v-')){Vue.component(transition.name,transition);}});}if(opts.directives){Object.values(opts.directives).forEach(function(directive){Vue.directive(directive.name,directive);});}if(opts.components){Object.values(opts.components).forEach(function(component){Vue.use(component);});}}};/* istanbul ignore next */function checkVueVersion(Vue){var vueDep='^2.5.0';var required=vueDep.split('.').map(function(v){return v.replace(/\D/g,'');});var actual=Vue.version.split('.');// Simple semver caret range comparison
var passes=actual[0]===required[0]&&(// major matches
actual[1]>required[1]||// minor is greater
actual[1]===required[1]&&actual[2]>=required[2]// or minor is eq and patch is >=
);if(!passes){Object(__WEBPACK_IMPORTED_MODULE_3__util_console__["b"/* consoleWarn */])('Vuetify requires Vue version '+vueDep);}}/* harmony default export */__webpack_exports__["a"]=Vuetify;/***/},/* 73 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony default export */__webpack_exports__["a"]={bar:0,bottom:0,footer:0,left:0,right:0,top:0};/***/},/* 74 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony export (immutable) */__webpack_exports__["a"]=theme;/* eslint-disable no-multi-spaces */var THEME_DEFAULTS={primary:'#1976D2',// blue.darken2
secondary:'#424242',// grey.darken3
accent:'#82B1FF',// blue.accent1
error:'#FF5252',// red.accent2
info:'#2196F3',// blue.base
success:'#4CAF50',// green.base
warning:'#FFC107'// amber.base
};function theme(){var theme=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};return Object.assign({},THEME_DEFAULTS,theme);}/***/},/* 75 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony export (immutable) */__webpack_exports__["a"]=options;var OPTIONS_DEFAULTS={themeVariations:['primary','secondary','accent'],minifyTheme:null,themeCache:null};function options(){var options=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};return Object.assign({},OPTIONS_DEFAULTS,options);}/***/},/* 76 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony export (immutable) */__webpack_exports__["a"]=goTo;/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__util_console__=__webpack_require__(6);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__util_easing_patterns__=__webpack_require__(77);var defaults={duration:500,offset:0,easing:'easeInOutCubic'};function getDocumentHeight(){return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight);}function getTargetLocation(target,settings){var documentHeight=getDocumentHeight();var windowHeight=window.innerHeight||(document.documentElement||document.body).clientHeight;var location=void 0;if(target instanceof Element)location=target.offsetTop;else if(target&&target.constructor&&target.constructor.name==='VueComponent')location=target.$el.offsetTop;else if(typeof target==='string')location=document.querySelector(target).offsetTop;else if(typeof target==='number')location=target;else location=undefined;location+=settings.offset;return Math.round(documentHeight-location<windowHeight?documentHeight-windowHeight:location);}function goTo(target,options){if(typeof window==='undefined')return;var settings=Object.assign({},defaults,options);var startTime=performance.now();var startLocation=window.pageYOffset;var targetLocation=getTargetLocation(target,settings);var distanceToScroll=targetLocation-startLocation;var easingFunction=typeof settings.easing==='function'?settings.easing:__WEBPACK_IMPORTED_MODULE_1__util_easing_patterns__[settings.easing];if(isNaN(targetLocation)){var type=target&&target.constructor?target.constructor.name:target;return Object(__WEBPACK_IMPORTED_MODULE_0__util_console__["a"/* consoleError */])('Target must be a Selector/Number/DOMElement/VueComponent, received '+type+' instead.');}if(!easingFunction)return Object(__WEBPACK_IMPORTED_MODULE_0__util_console__["a"/* consoleError */])('Easing function \''+settings.easing+'\' not found.');function step(currentTime){var progressPercentage=Math.min(1,(currentTime-startTime)/settings.duration);var targetPosition=Math.floor(startLocation+distanceToScroll*easingFunction(progressPercentage));window.scrollTo(0,targetPosition);if(Math.round(window.pageYOffset)===targetLocation)return;window.requestAnimationFrame(step);}window.requestAnimationFrame(step);}/***/},/* 77 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";Object.defineProperty(__webpack_exports__,"__esModule",{value:true});/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"linear",function(){return linear;});/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"easeInQuad",function(){return easeInQuad;});/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"easeOutQuad",function(){return easeOutQuad;});/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"easeInOutQuad",function(){return easeInOutQuad;});/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"easeInCubic",function(){return easeInCubic;});/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"easeOutCubic",function(){return easeOutCubic;});/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"easeInOutCubic",function(){return easeInOutCubic;});/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"easeInQuart",function(){return easeInQuart;});/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"easeOutQuart",function(){return easeOutQuart;});/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"easeInOutQuart",function(){return easeInOutQuart;});/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"easeInQuint",function(){return easeInQuint;});/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"easeOutQuint",function(){return easeOutQuint;});/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"easeInOutQuint",function(){return easeInOutQuint;});// linear
var linear=function linear(t){return t;};// accelerating from zero velocity
var easeInQuad=function easeInQuad(t){return t*t;};// decelerating to zero velocity
var easeOutQuad=function easeOutQuad(t){return t*(2-t);};// acceleration until halfway, then deceleration
var easeInOutQuad=function easeInOutQuad(t){return t<0.5?2*t*t:-1+(4-2*t)*t;};// accelerating from zero velocity
var easeInCubic=function easeInCubic(t){return t*t*t;};// decelerating to zero velocity
var easeOutCubic=function easeOutCubic(t){return--t*t*t+1;};// acceleration until halfway, then deceleration
var easeInOutCubic=function easeInOutCubic(t){return t<0.5?4*t*t*t:(t-1)*(2*t-2)*(2*t-2)+1;};// accelerating from zero velocity
var easeInQuart=function easeInQuart(t){return t*t*t*t;};// decelerating to zero velocity
var easeOutQuart=function easeOutQuart(t){return 1- --t*t*t*t;};// acceleration until halfway, then deceleration
var easeInOutQuart=function easeInOutQuart(t){return t<0.5?8*t*t*t*t:1-8*--t*t*t*t;};// accelerating from zero velocity
var easeInQuint=function easeInQuint(t){return t*t*t*t*t;};// decelerating to zero velocity
var easeOutQuint=function easeOutQuint(t){return 1+--t*t*t*t*t;};// acceleration until halfway, then deceleration
var easeInOutQuint=function easeInOutQuint(t){return t<0.5?16*t*t*t*t*t:1+16*--t*t*t*t*t;};/***/},/* 78 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__VApp__=__webpack_require__(79);/* istanbul ignore next */__WEBPACK_IMPORTED_MODULE_0__VApp__["a"/* default */].install=function install(Vue){Vue.component(__WEBPACK_IMPORTED_MODULE_0__VApp__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_0__VApp__["a"/* default */]);};/* harmony default export */__webpack_exports__["a"]=__WEBPACK_IMPORTED_MODULE_0__VApp__["a"/* default */];/***/},/* 79 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_app_styl__=__webpack_require__(80);/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_app_styl___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_app_styl__);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__mixins_app_theme__=__webpack_require__(81);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__mixins_app_breakpoint__=__webpack_require__(85);/* harmony import */var __WEBPACK_IMPORTED_MODULE_3__directives_resize__=__webpack_require__(11);function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}// Component level mixins
// Directives
/* harmony default export */__webpack_exports__["a"]={name:'v-app',mixins:[__WEBPACK_IMPORTED_MODULE_2__mixins_app_breakpoint__["a"/* default */],__WEBPACK_IMPORTED_MODULE_1__mixins_app_theme__["a"/* default */]],directives:{Resize:__WEBPACK_IMPORTED_MODULE_3__directives_resize__["a"/* default */]},props:{id:{type:String,default:'app'},dark:Boolean},computed:{classes:function classes(){return _defineProperty({},'theme--'+(this.dark?'dark':'light'),true);}},mounted:function mounted(){this.$vuetify.dark=this.dark;},watch:{dark:function dark(){this.$vuetify.dark=this.dark;}},render:function render(h){var data={staticClass:'application','class':this.classes,attrs:{'data-app':true},domProps:{id:this.id},directives:[{name:'resize',value:this.onResize}]};var wrapper=h('div',{staticClass:'application--wrap'},this.$slots.default);return h('div',data,[wrapper]);}};/***/},/* 80 *//***/function(module,exports){// removed by extract-text-webpack-plugin
/***/},/* 81 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__util_colorUtils__=__webpack_require__(31);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__util_theme__=__webpack_require__(82);/* harmony default export */__webpack_exports__["a"]={data:function data(){return{style:null};},computed:{parsedTheme:function parsedTheme(){return __WEBPACK_IMPORTED_MODULE_1__util_theme__["c"/* parse */](this.$vuetify.theme);},/** @return string */generatedStyles:function generatedStyles(){var theme=this.parsedTheme;var css=void 0;if(this.$vuetify.options.themeCache!=null){css=this.$vuetify.options.themeCache.get(theme);if(css!=null)return css;}var colors=Object.keys(theme);css='a { color: '+Object(__WEBPACK_IMPORTED_MODULE_0__util_colorUtils__["b"/* intToHex */])(theme.primary)+'; }';for(var i=0;i<colors.length;++i){var name=colors[i];var value=theme[name];if(this.$vuetify.options.themeVariations.includes(name)){css+=__WEBPACK_IMPORTED_MODULE_1__util_theme__["b"/* genVariations */](name,value).join('');}else{css+=__WEBPACK_IMPORTED_MODULE_1__util_theme__["a"/* genBaseColor */](name,value);}}if(this.$vuetify.options.minifyTheme!=null){css=this.$vuetify.options.minifyTheme(css);}if(this.$vuetify.options.themeCache!=null){this.$vuetify.options.themeCache.set(theme,css);}return css;}},watch:{generatedStyles:function generatedStyles(){this.applyTheme();}},beforeCreate:function beforeCreate(){var _this=this;if(this.$meta){// Vue-meta
var keyName=this.$nuxt?'head':'metaInfo';this.$options[keyName]=function(){return{style:[{cssText:_this.generatedStyles,type:'text/css',id:'vuetify-theme-stylesheet'}]};};}},created:function created(){if(this.$meta){// Vue-meta
// Handled by beforeCreate hook
}else if(typeof document==='undefined'&&this.$ssrContext){// SSR
this.$ssrContext.head=this.$ssrContext.head||'';this.$ssrContext.head+='<style type="text/css" id="vuetify-theme-stylesheet">'+this.generatedStyles+'</style>';}else if(typeof document!=='undefined'){// Client-side
this.genStyle();this.applyTheme();}},methods:{applyTheme:function applyTheme(){this.style.innerHTML=this.generatedStyles;},genStyle:function genStyle(){var style=document.getElementById('vuetify-theme-stylesheet');if(!style){style=document.createElement('style');style.type='text/css';style.id='vuetify-theme-stylesheet';document.head.appendChild(style);}this.style=style;}}};/***/},/* 82 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony export (immutable) */__webpack_exports__["c"]=parse;/* harmony export (immutable) */__webpack_exports__["b"]=genVariations;/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"a",function(){return genBaseColor;});/* unused harmony export genVariantColor *//* harmony import */var __WEBPACK_IMPORTED_MODULE_0__colorUtils__=__webpack_require__(31);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__color_transformSRGB__=__webpack_require__(83);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__color_transformCIELAB__=__webpack_require__(84);/**
 * @param {object} theme
 * @returns {object}
 */function parse(theme){var colors=Object.keys(theme);var parsedTheme={};for(var i=0;i<colors.length;++i){var name=colors[i];var value=theme[name];parsedTheme[name]=Object(__WEBPACK_IMPORTED_MODULE_0__colorUtils__["a"/* colorToInt */])(value);}return parsedTheme;}function genVariations(name,value){var values=Array(10);values[0]=genBaseColor(name,value);for(var i=1,n=5;i<=5;++i,--n){values[i]=genVariantColor(name,lighten(value,n),'lighten',n);}for(var _i=1;_i<=4;++_i){values[_i+5]=genVariantColor(name,darken(value,_i),'darken',_i);}return values;}function lighten(value,amount){var lab=__WEBPACK_IMPORTED_MODULE_2__color_transformCIELAB__["a"/* fromXYZ */](__WEBPACK_IMPORTED_MODULE_1__color_transformSRGB__["b"/* toXYZ */](value));lab[0]=lab[0]+amount*10;return __WEBPACK_IMPORTED_MODULE_1__color_transformSRGB__["a"/* fromXYZ */](__WEBPACK_IMPORTED_MODULE_2__color_transformCIELAB__["b"/* toXYZ */](lab));}function darken(value,amount){var lab=__WEBPACK_IMPORTED_MODULE_2__color_transformCIELAB__["a"/* fromXYZ */](__WEBPACK_IMPORTED_MODULE_1__color_transformSRGB__["b"/* toXYZ */](value));lab[0]=lab[0]-amount*10;return __WEBPACK_IMPORTED_MODULE_1__color_transformSRGB__["a"/* fromXYZ */](__WEBPACK_IMPORTED_MODULE_2__color_transformCIELAB__["b"/* toXYZ */](lab));}/**
 * Generate the CSS for a base color (.primary)
 *
 * @param {string} name - The color name
 * @param {string|number} value - The color value
 * @returns {string}
 */var genBaseColor=function genBaseColor(name,value){value=Object(__WEBPACK_IMPORTED_MODULE_0__colorUtils__["b"/* intToHex */])(value);return'\n.'+name+' {\n  background-color: '+value+' !important;\n  border-color: '+value+' !important;\n}\n.'+name+'--text {\n  color: '+value+' !important;\n}\n.'+name+'--text input,\n.'+name+'--text textarea {\n  caret-color: '+value+' !important;\n}\n.'+name+'--after::after {\n  background: '+value+' !important;\n}';};/**
 * Generate the CSS for a variant color (.primary.darken-2)
 *
 * @param {string} name - The color name
 * @param {string|number} value - The color value
 * @param {string} type - The variant type (darken/lighten)
 * @param {number} n - The darken/lighten step number
 * @returns {string}
 */var genVariantColor=function genVariantColor(name,value,type,n){value=Object(__WEBPACK_IMPORTED_MODULE_0__colorUtils__["b"/* intToHex */])(value);return'\n.'+name+'.'+type+'-'+n+' {\n  background-color: '+value+' !important;\n  border-color: '+value+' !important;\n}\n.'+name+'--text.text--'+type+'-'+n+' {\n  color: '+value+' !important;\n}\n.'+name+'--text.text--'+type+'-'+n+' input,\n.'+name+'--text.text--'+type+'-'+n+' textarea {\n  caret-color: '+value+' !important;\n}\n.'+name+'.'+type+'-'+n+'--after::after {\n  background: '+value+' !important;\n}';};/***/},/* 83 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony export (immutable) */__webpack_exports__["a"]=fromXYZ;/* harmony export (immutable) */__webpack_exports__["b"]=toXYZ;// For converting XYZ to sRGB
var srgbForwardMatrix=[[3.2406,-1.5372,-0.4986],[-0.9689,1.8758,0.0415],[0.0557,-0.2040,1.0570]];// Forward gamma adjust
var srgbForwardTransform=function srgbForwardTransform(C){return C<=0.0031308?C*12.92:1.055*Math.pow(C,1/2.4)-0.055;};// For converting sRGB to XYZ
var srgbReverseMatrix=[[0.4124,0.3576,0.1805],[0.2126,0.7152,0.0722],[0.0193,0.1192,0.9505]];// Reverse gamma adjust
var srgbReverseTransform=function srgbReverseTransform(C){return C<=0.04045?C/12.92:Math.pow((C+0.055)/1.055,2.4);};function clamp(value){return Math.max(0,Math.min(1,value));}function fromXYZ(xyz){var rgb=Array(3);var transform=srgbForwardTransform;var matrix=srgbForwardMatrix;// Matrix transform, then gamma adjustment
for(var i=0;i<3;++i){rgb[i]=Math.round(clamp(transform(matrix[i][0]*xyz[0]+matrix[i][1]*xyz[1]+matrix[i][2]*xyz[2]))*255);}// Rescale back to [0, 255]
return(rgb[0]<<16)+(rgb[1]<<8)+(rgb[2]<<0);}function toXYZ(rgb){var xyz=Array(3);var transform=srgbReverseTransform;var matrix=srgbReverseMatrix;// Rescale from [0, 255] to [0, 1] then adjust sRGB gamma to linear RGB
var r=transform((rgb>>16&0xff)/255);var g=transform((rgb>>8&0xff)/255);var b=transform((rgb>>0&0xff)/255);// Matrix color space transform
for(var i=0;i<3;++i){xyz[i]=matrix[i][0]*r+matrix[i][1]*g+matrix[i][2]*b;}return xyz;}/***/},/* 84 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony export (immutable) */__webpack_exports__["a"]=fromXYZ;/* harmony export (immutable) */__webpack_exports__["b"]=toXYZ;var delta=0.20689655172413793;// 6÷29
var cielabForwardTransform=function cielabForwardTransform(t){return t>Math.pow(delta,3)?Math.cbrt(t):t/(3*Math.pow(delta,2))+4/29;};var cielabReverseTransform=function cielabReverseTransform(t){return t>delta?Math.pow(t,3):3*Math.pow(delta,2)*(t-4/29);};function fromXYZ(xyz){var transform=cielabForwardTransform;var transformedY=transform(xyz[1]);return[116*transformedY-16,500*(transform(xyz[0]/0.95047)-transformedY),200*(transformedY-transform(xyz[2]/1.08883))];}function toXYZ(lab){var transform=cielabReverseTransform;var Ln=(lab[0]+16)/116;return[transform(Ln+lab[1]/500)*0.95047,transform(Ln),transform(Ln-lab[2]/200)*1.08883];}/***/},/* 85 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/**
 * A modified version of https://gist.github.com/cb109/b074a65f7595cffc21cea59ce8d15f9b
 *//**
 * A Vue mixin to get the current width/height and the associated breakpoint.
 *
 * Useful to e.g. adapt the user interface from inside a Vue component
 * as opposed to using CSS classes. The breakpoint pixel values and
 * range names are taken from Vuetify (https://github.com/vuetifyjs).
 *
 * Use within a component:
 *
 *   import breakpoint from './breakpoint.js'
 *
 *   export default {
 *     name: 'my-component',
 *     mixins: [breakpoint],
 *     ...
 *
 * Then inside a template:
 *
 *   <div v-if="$breakpoint.smAndDown">...</div>
 */var breakpoint={data:function data(){return{clientWidth:clientDimensions.getWidth(),clientHeight:clientDimensions.getHeight(),resizeTimeout:null};},computed:{breakpoint:function breakpoint(){var xs=this.clientWidth<600;var sm=this.clientWidth<960&&!xs;var md=this.clientWidth<1280-16&&!(sm||xs);var lg=this.clientWidth<1920-16&&!(md||sm||xs);var xl=this.clientWidth>=1920-16&&!(lg||md||sm||xs);var xsOnly=xs;var smOnly=sm;var smAndDown=(xs||sm)&&!(md||lg||xl);var smAndUp=!xs&&(sm||md||lg||xl);var mdOnly=md;var mdAndDown=(xs||sm||md)&&!(lg||xl);var mdAndUp=!(xs||sm)&&(md||lg||xl);var lgOnly=lg;var lgAndDown=(xs||sm||md||lg)&&!xl;var lgAndUp=!(xs||sm||md)&&(lg||xl);var xlOnly=xl;var name=void 0;switch(true){case xs:name='xs';break;case sm:name='sm';break;case md:name='md';break;case lg:name='lg';break;default:name='xl';break;}var result={// Definite breakpoint.
xs:xs,sm:sm,md:md,lg:lg,xl:xl,// Useful e.g. to construct CSS class names dynamically.
name:name,// Breakpoint ranges.
xsOnly:xsOnly,smOnly:smOnly,smAndDown:smAndDown,smAndUp:smAndUp,mdOnly:mdOnly,mdAndDown:mdAndDown,mdAndUp:mdAndUp,lgOnly:lgOnly,lgAndDown:lgAndDown,lgAndUp:lgAndUp,xlOnly:xlOnly,// For custom breakpoint logic.
width:this.clientWidth,height:this.clientHeight};return result;}},watch:{breakpoint:function breakpoint(val){this.$vuetify.breakpoint=val;}},created:function created(){this.$vuetify.breakpoint=this.breakpoint;},methods:{onResize:function onResize(){var _this=this;clearTimeout(this.resizeTimeout);// Added debounce to match what
// v-resize used to do but was
// removed due to a memory leak
// https://github.com/vuetifyjs/vuetify/pull/2997
this.resizeTimeout=setTimeout(function(){_this.clientWidth=clientDimensions.getWidth();_this.clientHeight=clientDimensions.getHeight();},200);}// Cross-browser support as described in:
// https://stackoverflow.com/questions/1248081
}};var clientDimensions={getWidth:function getWidth(){if(typeof document==='undefined')return 0;// SSR
return Math.max(document.documentElement.clientWidth,window.innerWidth||0);},getHeight:function getHeight(){if(typeof document==='undefined')return 0;// SSR
return Math.max(document.documentElement.clientHeight,window.innerHeight||0);}};/* harmony default export */__webpack_exports__["a"]=breakpoint;/***/},/* 86 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__VAlert__=__webpack_require__(87);/* istanbul ignore next */__WEBPACK_IMPORTED_MODULE_0__VAlert__["a"/* default */].install=function install(Vue){Vue.component(__WEBPACK_IMPORTED_MODULE_0__VAlert__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_0__VAlert__["a"/* default */]);};/* harmony default export */__webpack_exports__["a"]=__WEBPACK_IMPORTED_MODULE_0__VAlert__["a"/* default */];/***/},/* 87 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_alerts_styl__=__webpack_require__(88);/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_alerts_styl___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_alerts_styl__);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__VIcon__=__webpack_require__(3);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__mixins_colorable__=__webpack_require__(0);/* harmony import */var __WEBPACK_IMPORTED_MODULE_3__mixins_toggleable__=__webpack_require__(5);/* harmony import */var __WEBPACK_IMPORTED_MODULE_4__mixins_transitionable__=__webpack_require__(25);/* harmony default export */__webpack_exports__["a"]={name:'v-alert',components:{VIcon:__WEBPACK_IMPORTED_MODULE_1__VIcon__["a"/* default */]},mixins:[__WEBPACK_IMPORTED_MODULE_2__mixins_colorable__["a"/* default */],__WEBPACK_IMPORTED_MODULE_3__mixins_toggleable__["a"/* default */],__WEBPACK_IMPORTED_MODULE_4__mixins_transitionable__["a"/* default */]],props:{dismissible:Boolean,icon:String,outline:Boolean,type:{type:String,validator:function validator(val){return['info','error','success','warning'].includes(val);}}},data:function data(){return{defaultColor:'error'};},computed:{classes:function classes(){var color=this.type&&!this.color?this.type:this.computedColor;var classes={'alert--dismissible':this.dismissible,'alert--outline':this.outline};return this.outline?this.addTextColorClassChecks(classes,color):this.addBackgroundColorClassChecks(classes,color);},computedIcon:function computedIcon(){if(this.icon||!this.type)return this.icon;switch(this.type){case'info':return'info';case'error':return'warning';case'success':return'check_circle';case'warning':return'priority_high';}}},render:function render(h){var _this=this;var children=[h('div',this.$slots.default)];if(this.computedIcon){children.unshift(h('v-icon',{'class':'alert__icon'},this.computedIcon));}if(this.dismissible){var close=h('a',{'class':'alert__dismissible',on:{click:function click(){return _this.$emit('input',false);}}},[h(__WEBPACK_IMPORTED_MODULE_1__VIcon__["a"/* default */],{props:{right:true}},'cancel')]);children.push(close);}var alert=h('div',{staticClass:'alert','class':this.classes,directives:[{name:'show',value:this.isActive}],on:this.$listeners},children);if(!this.transition)return alert;return h('transition',{props:{name:this.transition,origin:this.origin,mode:this.mode}},[alert]);}};/***/},/* 88 *//***/function(module,exports){// removed by extract-text-webpack-plugin
/***/},/* 89 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_icons_styl__=__webpack_require__(90);/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_icons_styl___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_icons_styl__);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__mixins_themeable__=__webpack_require__(1);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__mixins_colorable__=__webpack_require__(0);var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var SIZE_MAP={small:'16px',default:'24px',medium:'28px',large:'36px',xLarge:'40px'};function isFontAwesome5(iconType){return['fas','far','fal','fab'].some(function(val){return iconType.includes(val);});}/* harmony default export */__webpack_exports__["a"]={name:'v-icon',functional:true,mixins:[__WEBPACK_IMPORTED_MODULE_2__mixins_colorable__["a"/* default */],__WEBPACK_IMPORTED_MODULE_1__mixins_themeable__["a"/* default */]],props:{disabled:Boolean,large:Boolean,left:Boolean,medium:Boolean,right:Boolean,size:{type:[Number,String]},small:Boolean,xLarge:Boolean},render:function render(h,_ref){var props=_ref.props,data=_ref.data,_ref$children=_ref.children,children=_ref$children===undefined?[]:_ref$children;var small=props.small,medium=props.medium,large=props.large,xLarge=props.xLarge;var sizes={small:small,medium:medium,large:large,xLarge:xLarge};var explicitSize=Object.keys(sizes).find(function(key){return sizes[key]&&key;});var fontSize=explicitSize&&SIZE_MAP[explicitSize]||props.size;if(fontSize)data.style=_extends({fontSize:fontSize},data.style);var iconName='';if(children.length)iconName=children.pop().text;// Support usage of v-text and v-html
else if(data.domProps){iconName=data.domProps.textContent||data.domProps.innerHTML||iconName;// Remove nodes so it doesn't
// overwrite our changes
delete data.domProps.textContent;delete data.domProps.innerHTML;}var iconType='material-icons';// Material Icon delimiter is _
// https://material.io/icons/
var delimiterIndex=iconName.indexOf('-');var isCustomIcon=delimiterIndex>-1;if(isCustomIcon){iconType=iconName.slice(0,delimiterIndex);if(isFontAwesome5(iconType))iconType='';// Assume if not a custom icon
// is Material Icon font
}else children.push(iconName);data.attrs=data.attrs||{};if(!('aria-hidden'in data.attrs)){data.attrs['aria-hidden']=true;}var classes=Object.assign({'icon--disabled':props.disabled,'icon--left':props.left,'icon--right':props.right,'theme--dark':props.dark,'theme--light':props.light},props.color?__WEBPACK_IMPORTED_MODULE_2__mixins_colorable__["a"/* default */].methods.addTextColorClassChecks.call(props,{},props.color):{});// Order classes
// * Component class
// * Vuetify classes
// * Icon Classes
data.staticClass=['icon',data.staticClass,Object.keys(classes).filter(function(k){return classes[k];}).join(' '),iconType,isCustomIcon?iconName:null].reduce(function(prev,curr){return curr?prev+' '+curr:prev;}).trim();return h('i',data,children);}};/***/},/* 90 *//***/function(module,exports){// removed by extract-text-webpack-plugin
/***/},/* 91 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_avatars_styl__=__webpack_require__(92);/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_avatars_styl___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_avatars_styl__);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__mixins_colorable__=__webpack_require__(0);// Mixins
/* harmony default export */__webpack_exports__["a"]={name:'v-avatar',functional:true,mixins:[__WEBPACK_IMPORTED_MODULE_1__mixins_colorable__["a"/* default */]],props:{size:{type:[Number,String],default:48},tile:Boolean},render:function render(h,_ref){var data=_ref.data,props=_ref.props,children=_ref.children;data.staticClass=('avatar '+(data.staticClass||'')).trim();data.style=data.style||{};if(props.tile)data.staticClass+=' avatar--tile';var size=parseInt(props.size)+'px';data.style.height=size;data.style.width=size;data.class=[data.class,__WEBPACK_IMPORTED_MODULE_1__mixins_colorable__["a"/* default */].methods.addBackgroundColorClassChecks.call(props,{},props.color)];return h('div',data,children);}};/***/},/* 92 *//***/function(module,exports){// removed by extract-text-webpack-plugin
/***/},/* 93 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__VBadge__=__webpack_require__(94);/* istanbul ignore next */__WEBPACK_IMPORTED_MODULE_0__VBadge__["a"/* default */].install=function install(Vue){Vue.component(__WEBPACK_IMPORTED_MODULE_0__VBadge__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_0__VBadge__["a"/* default */]);};/* harmony default export */__webpack_exports__["a"]=__WEBPACK_IMPORTED_MODULE_0__VBadge__["a"/* default */];/***/},/* 94 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_badges_styl__=__webpack_require__(95);/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_badges_styl___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_badges_styl__);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__mixins_colorable__=__webpack_require__(0);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__mixins_toggleable__=__webpack_require__(5);/* harmony import */var __WEBPACK_IMPORTED_MODULE_3__mixins_positionable__=__webpack_require__(12);/* harmony import */var __WEBPACK_IMPORTED_MODULE_4__mixins_transitionable__=__webpack_require__(25);// Mixins
/* harmony default export */__webpack_exports__["a"]={name:'v-badge',mixins:[__WEBPACK_IMPORTED_MODULE_1__mixins_colorable__["a"/* default */],__WEBPACK_IMPORTED_MODULE_2__mixins_toggleable__["a"/* default */],Object(__WEBPACK_IMPORTED_MODULE_3__mixins_positionable__["b"/* factory */])(['left','bottom']),__WEBPACK_IMPORTED_MODULE_4__mixins_transitionable__["a"/* default */]],props:{color:{type:String,default:'primary'},overlap:Boolean,transition:{type:String,default:'fab-transition'},value:{default:true}},computed:{classes:function classes(){return{'badge--bottom':this.bottom,'badge--left':this.left,'badge--overlap':this.overlap};}},render:function render(h){var badge=this.$slots.badge?[h('span',{staticClass:'badge__badge','class':this.addBackgroundColorClassChecks(),attrs:this.attrs,directives:[{name:'show',value:this.isActive}]},this.$slots.badge)]:null;return h('span',{staticClass:'badge','class':this.classes},[this.$slots.default,h('transition',{props:{name:this.transition,origin:this.origin,mode:this.mode}},badge)]);}};/***/},/* 95 *//***/function(module,exports){// removed by extract-text-webpack-plugin
/***/},/* 96 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__VBottomNav__=__webpack_require__(97);/* istanbul ignore next */__WEBPACK_IMPORTED_MODULE_0__VBottomNav__["a"/* default */].install=function install(Vue){Vue.component(__WEBPACK_IMPORTED_MODULE_0__VBottomNav__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_0__VBottomNav__["a"/* default */]);};/* harmony default export */__webpack_exports__["a"]=__WEBPACK_IMPORTED_MODULE_0__VBottomNav__["a"/* default */];/***/},/* 97 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_bottom_navs_styl__=__webpack_require__(98);/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_bottom_navs_styl___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_bottom_navs_styl__);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__mixins_applicationable__=__webpack_require__(15);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__mixins_button_group__=__webpack_require__(33);/* harmony import */var __WEBPACK_IMPORTED_MODULE_3__mixins_colorable__=__webpack_require__(0);// Styles
// Mixins
/* harmony default export */__webpack_exports__["a"]={name:'v-bottom-nav',mixins:[Object(__WEBPACK_IMPORTED_MODULE_1__mixins_applicationable__["a"/* default */])('bottom',['height','value']),__WEBPACK_IMPORTED_MODULE_2__mixins_button_group__["a"/* default */],__WEBPACK_IMPORTED_MODULE_3__mixins_colorable__["a"/* default */]],props:{active:[Number,String],height:{default:56,type:[Number,String],validator:function validator(v){return!isNaN(parseInt(v));}},shift:Boolean,value:{required:false}},watch:{active:function active(){this.update();}},computed:{classes:function classes(){return{'bottom-nav--absolute':this.absolute,'bottom-nav--fixed':!this.absolute&&(this.app||this.fixed),'bottom-nav--shift':this.shift,'bottom-nav--active':this.value};},computedHeight:function computedHeight(){return parseInt(this.height);}},methods:{isSelected:function isSelected(i){var item=this.getValue(i);return this.active===item;},/**
     * Update the application layout
     *
     * @return {number}
     */updateApplication:function updateApplication(){return!this.value?0:this.computedHeight;},updateValue:function updateValue(i){var item=this.getValue(i);this.$emit('update:active',item);}},render:function render(h){return h('div',{staticClass:'bottom-nav',class:this.addBackgroundColorClassChecks(this.classes),style:{height:parseInt(this.computedHeight)+'px'},ref:'content'},this.$slots.default);}};/***/},/* 98 *//***/function(module,exports){// removed by extract-text-webpack-plugin
/***/},/* 99 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__VBottomSheet__=__webpack_require__(100);/* istanbul ignore next */__WEBPACK_IMPORTED_MODULE_0__VBottomSheet__["a"/* default */].install=function install(Vue){Vue.component(__WEBPACK_IMPORTED_MODULE_0__VBottomSheet__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_0__VBottomSheet__["a"/* default */]);};/* harmony default export */__webpack_exports__["a"]=__WEBPACK_IMPORTED_MODULE_0__VBottomSheet__["a"/* default */];/***/},/* 100 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_bottom_sheets_styl__=__webpack_require__(101);/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_bottom_sheets_styl___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_bottom_sheets_styl__);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__VDialog_VDialog__=__webpack_require__(34);var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};/* harmony default export */__webpack_exports__["a"]={name:'v-bottom-sheet',props:{disabled:Boolean,fullWidth:Boolean,hideOverlay:Boolean,inset:Boolean,lazy:Boolean,maxWidth:{type:[String,Number],default:'auto'},persistent:Boolean,value:null},render:function render(h){var activator=h('template',{slot:'activator'},this.$slots.activator);var contentClass=['bottom-sheet',this.inset?'bottom-sheet--inset':''].join(' ');return h(__WEBPACK_IMPORTED_MODULE_1__VDialog_VDialog__["a"/* default */],{attrs:_extends({},this.$props),on:_extends({},this.$listeners),props:{contentClass:contentClass,transition:'bottom-sheet-transition',value:this.value}},[activator,this.$slots.default]);}};/***/},/* 101 *//***/function(module,exports){// removed by extract-text-webpack-plugin
/***/},/* 102 *//***/function(module,exports){// removed by extract-text-webpack-plugin
/***/},/* 103 *//***/function(module,exports){// removed by extract-text-webpack-plugin
/***/},/* 104 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__VBreadcrumbs__=__webpack_require__(105);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__VBreadcrumbsItem__=__webpack_require__(107);/* unused harmony reexport VBreadcrumbs *//* unused harmony reexport VBreadcrumbsItem *//* istanbul ignore next */__WEBPACK_IMPORTED_MODULE_0__VBreadcrumbs__["a"/* default */].install=function install(Vue){Vue.component(__WEBPACK_IMPORTED_MODULE_0__VBreadcrumbs__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_0__VBreadcrumbs__["a"/* default */]);Vue.component(__WEBPACK_IMPORTED_MODULE_1__VBreadcrumbsItem__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_1__VBreadcrumbsItem__["a"/* default */]);};/* harmony default export */__webpack_exports__["a"]=__WEBPACK_IMPORTED_MODULE_0__VBreadcrumbs__["a"/* default */];/***/},/* 105 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_breadcrumbs_styl__=__webpack_require__(106);/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_breadcrumbs_styl___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_breadcrumbs_styl__);/* harmony default export */__webpack_exports__["a"]={name:'v-breadcrumbs',props:{divider:{type:String,default:'/'},large:Boolean,justifyCenter:Boolean,justifyEnd:Boolean},computed:{classes:function classes(){return{'breadcrumbs--large':this.large};},computedDivider:function computedDivider(){return this.$slots.divider?this.$slots.divider:this.divider;},styles:function styles(){var justify=this.justifyCenter?'center':this.justifyEnd?'flex-end':'flex-start';return{'justify-content':justify};}},methods:{/**
     * Add dividers between
     * v-breadcrumbs-item
     *
     * @return {array}
     */genChildren:function genChildren(){if(!this.$slots.default)return null;var children=[];var dividerData={staticClass:'breadcrumbs__divider'};var length=this.$slots.default.length;for(var i=0;i<length;i++){var elm=this.$slots.default[i];children.push(elm);if(!elm.componentOptions||elm.componentOptions.tag!=='v-breadcrumbs-item'||i===length-1)continue;children.push(this.$createElement('li',dividerData,this.computedDivider));}return children;}},render:function render(h){return h('ul',{staticClass:'breadcrumbs','class':this.classes,style:this.styles},this.genChildren());}};/***/},/* 106 *//***/function(module,exports){// removed by extract-text-webpack-plugin
/***/},/* 107 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__mixins_routable__=__webpack_require__(13);function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}/* harmony default export */__webpack_exports__["a"]={name:'v-breadcrumbs-item',mixins:[__WEBPACK_IMPORTED_MODULE_0__mixins_routable__["a"/* default */]],props:{// In a breadcrumb, the currently
// active item should be dimmed
activeClass:{type:String,default:'breadcrumbs__item--disabled'}},computed:{classes:function classes(){return _defineProperty({'breadcrumbs__item':true},this.activeClass,this.disabled);}},render:function render(h){var _generateRouteLink=this.generateRouteLink(),tag=_generateRouteLink.tag,data=_generateRouteLink.data;return h('li',[h(tag,data,this.$slots.default)]);}};/***/},/* 108 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_buttons_styl__=__webpack_require__(109);/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_buttons_styl___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_buttons_styl__);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__mixins_colorable__=__webpack_require__(0);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__mixins_positionable__=__webpack_require__(12);/* harmony import */var __WEBPACK_IMPORTED_MODULE_3__mixins_routable__=__webpack_require__(13);/* harmony import */var __WEBPACK_IMPORTED_MODULE_4__mixins_themeable__=__webpack_require__(1);/* harmony import */var __WEBPACK_IMPORTED_MODULE_5__mixins_toggleable__=__webpack_require__(5);/* harmony import */var __WEBPACK_IMPORTED_MODULE_6__mixins_registrable__=__webpack_require__(4);var _typeof=typeof Symbol==="function"&&_typeof2(Symbol.iterator)==="symbol"?function(obj){return typeof obj==='undefined'?'undefined':_typeof2(obj);}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj==='undefined'?'undefined':_typeof2(obj);};var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}/* harmony default export */__webpack_exports__["a"]={name:'v-btn',mixins:[__WEBPACK_IMPORTED_MODULE_1__mixins_colorable__["a"/* default */],__WEBPACK_IMPORTED_MODULE_3__mixins_routable__["a"/* default */],__WEBPACK_IMPORTED_MODULE_2__mixins_positionable__["a"/* default */],__WEBPACK_IMPORTED_MODULE_4__mixins_themeable__["a"/* default */],Object(__WEBPACK_IMPORTED_MODULE_5__mixins_toggleable__["b"/* factory */])('inputValue'),Object(__WEBPACK_IMPORTED_MODULE_6__mixins_registrable__["a"/* inject */])('buttonGroup')],props:{activeClass:{type:String,default:'btn--active'},block:Boolean,depressed:Boolean,fab:Boolean,flat:Boolean,icon:Boolean,large:Boolean,loading:Boolean,outline:Boolean,ripple:{type:[Boolean,Object],default:true},round:Boolean,small:Boolean,tag:{type:String,default:'button'},type:{type:String,default:'button'},value:null},computed:{classes:function classes(){var _extends2;var classes=_extends((_extends2={'btn':true},_defineProperty(_extends2,this.activeClass,this.isActive),_defineProperty(_extends2,'btn--absolute',this.absolute),_defineProperty(_extends2,'btn--block',this.block),_defineProperty(_extends2,'btn--bottom',this.bottom),_defineProperty(_extends2,'btn--disabled',this.disabled),_defineProperty(_extends2,'btn--flat',this.flat),_defineProperty(_extends2,'btn--floating',this.fab),_defineProperty(_extends2,'btn--fixed',this.fixed),_defineProperty(_extends2,'btn--hover',this.hover),_defineProperty(_extends2,'btn--icon',this.icon),_defineProperty(_extends2,'btn--large',this.large),_defineProperty(_extends2,'btn--left',this.left),_defineProperty(_extends2,'btn--loader',this.loading),_defineProperty(_extends2,'btn--outline',this.outline),_defineProperty(_extends2,'btn--depressed',this.depressed&&!this.flat||this.outline),_defineProperty(_extends2,'btn--right',this.right),_defineProperty(_extends2,'btn--round',this.round),_defineProperty(_extends2,'btn--router',this.to),_defineProperty(_extends2,'btn--small',this.small),_defineProperty(_extends2,'btn--top',this.top),_extends2),this.themeClasses);return!this.outline&&!this.flat?this.addBackgroundColorClassChecks(classes):this.addTextColorClassChecks(classes);}},methods:{// Prevent focus to match md spec
click:function click(e){!this.fab&&e.detail&&this.$el.blur();this.$emit('click',e);},genContent:function genContent(){return this.$createElement('div',{'class':'btn__content'},[this.$slots.default]);},genLoader:function genLoader(){var children=[];if(!this.$slots.loader){children.push(this.$createElement('v-progress-circular',{props:{indeterminate:true,size:26}}));}else{children.push(this.$slots.loader);}return this.$createElement('span',{'class':'btn__loading'},children);}},mounted:function mounted(){if(this.buttonGroup){this.buttonGroup.register(this);}},beforeDestroy:function beforeDestroy(){if(this.buttonGroup){this.buttonGroup.unregister(this);}},render:function render(h){var _generateRouteLink=this.generateRouteLink(),tag=_generateRouteLink.tag,data=_generateRouteLink.data;var children=[this.genContent()];tag==='button'&&(data.attrs.type=this.type);this.loading&&children.push(this.genLoader());data.attrs.value=['string','number'].includes(_typeof(this.value))?this.value:JSON.stringify(this.value);return h(tag,data,children);}};/***/},/* 109 *//***/function(module,exports){// removed by extract-text-webpack-plugin
/***/},/* 110 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__VBtnToggle__=__webpack_require__(111);/* istanbul ignore next */__WEBPACK_IMPORTED_MODULE_0__VBtnToggle__["a"/* default */].install=function install(Vue){Vue.component(__WEBPACK_IMPORTED_MODULE_0__VBtnToggle__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_0__VBtnToggle__["a"/* default */]);};/* harmony default export */__webpack_exports__["a"]=__WEBPACK_IMPORTED_MODULE_0__VBtnToggle__["a"/* default */];/***/},/* 111 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_button_toggle_styl__=__webpack_require__(112);/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_button_toggle_styl___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_button_toggle_styl__);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__mixins_button_group__=__webpack_require__(33);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__mixins_themeable__=__webpack_require__(1);/* harmony default export */__webpack_exports__["a"]={name:'v-btn-toggle',model:{prop:'inputValue',event:'change'},mixins:[__WEBPACK_IMPORTED_MODULE_1__mixins_button_group__["a"/* default */],__WEBPACK_IMPORTED_MODULE_2__mixins_themeable__["a"/* default */]],props:{inputValue:{required:false},mandatory:Boolean,multiple:Boolean},computed:{classes:function classes(){return{'btn-toggle':true,'btn-toggle--selected':this.hasValue,'theme--light':this.light,'theme--dark':this.dark};},hasValue:function hasValue(){return this.multiple&&this.inputValue.length||!this.multiple&&this.inputValue!==null&&typeof this.inputValue!=='undefined';}},watch:{inputValue:{handler:function handler(){this.update();},deep:true}},methods:{isSelected:function isSelected(i){var item=this.getValue(i);if(!this.multiple){return this.inputValue===item;}return this.inputValue.includes(item);},updateValue:function updateValue(i){var item=this.getValue(i);if(!this.multiple){if(this.mandatory&&this.inputValue===item)return;return this.$emit('change',this.inputValue===item?null:item);}var items=this.inputValue.slice();var index=items.indexOf(item);if(index>-1){if(this.mandatory&&items.length===1)return;items.length>=1&&items.splice(index,1);}else{items.push(item);}this.$emit('change',items);}},render:function render(h){return h('div',{class:this.classes},this.$slots.default);}};/***/},/* 112 *//***/function(module,exports){// removed by extract-text-webpack-plugin
/***/},/* 113 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_cards_styl__=__webpack_require__(114);/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_cards_styl___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_cards_styl__);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__mixins_colorable__=__webpack_require__(0);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__mixins_routable__=__webpack_require__(13);/* harmony import */var __WEBPACK_IMPORTED_MODULE_3__mixins_themeable__=__webpack_require__(1);/* harmony default export */__webpack_exports__["a"]={name:'v-card',mixins:[__WEBPACK_IMPORTED_MODULE_1__mixins_colorable__["a"/* default */],__WEBPACK_IMPORTED_MODULE_2__mixins_routable__["a"/* default */],__WEBPACK_IMPORTED_MODULE_3__mixins_themeable__["a"/* default */]],props:{flat:Boolean,height:{type:String,default:'auto'},hover:Boolean,img:String,raised:Boolean,tag:{type:String,default:'div'},tile:Boolean,width:[String,Number]},computed:{classes:function classes(){return this.addBackgroundColorClassChecks({'card':true,'card--flat':this.flat,'card--horizontal':this.horizontal,'card--hover':this.hover,'card--raised':this.raised,'card--tile':this.tile,'theme--light':this.light,'theme--dark':this.dark});},styles:function styles(){var style={height:isNaN(this.height)?this.height:this.height+'px'};if(this.img){style.background='url("'+this.img+'") center center / cover no-repeat';}if(this.width){style.width=isNaN(this.width)?this.width:this.width+'px';}return style;}},render:function render(h){var _generateRouteLink=this.generateRouteLink(),tag=_generateRouteLink.tag,data=_generateRouteLink.data;data.style=this.styles;return h(tag,data,this.$slots.default);}};/***/},/* 114 *//***/function(module,exports){// removed by extract-text-webpack-plugin
/***/},/* 115 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony default export */__webpack_exports__["a"]={name:'v-card-media',props:{contain:Boolean,height:{type:[Number,String],default:'auto'},src:{type:String}},render:function render(h){var data={'class':'card__media',style:{height:!isNaN(this.height)?this.height+'px':this.height},on:this.$listeners};var children=[];if(this.src){children.push(h('div',{'class':'card__media__background',style:{background:'url('+this.src+') center center / '+(this.contain?'contain':'cover')+' no-repeat'}}));}children.push(h('div',{'class':'card__media__content'},this.$slots.default));return h('div',data,children);}};/***/},/* 116 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony default export */__webpack_exports__["a"]={name:'v-card-title',functional:true,props:{primaryTitle:Boolean},render:function render(h,_ref){var data=_ref.data,props=_ref.props,children=_ref.children;data.staticClass=('card__title '+(data.staticClass||'')).trim();if(props.primaryTitle)data.staticClass+=' card__title--primary';return h('div',data,children);}};/***/},/* 117 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__VCarousel__=__webpack_require__(118);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__VCarouselItem__=__webpack_require__(120);/* unused harmony reexport VCarousel *//* unused harmony reexport VCarouselItem *//* istanbul ignore next */__WEBPACK_IMPORTED_MODULE_0__VCarousel__["a"/* default */].install=function install(Vue){Vue.component(__WEBPACK_IMPORTED_MODULE_0__VCarousel__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_0__VCarousel__["a"/* default */]);Vue.component(__WEBPACK_IMPORTED_MODULE_1__VCarouselItem__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_1__VCarouselItem__["a"/* default */]);};/* harmony default export */__webpack_exports__["a"]=__WEBPACK_IMPORTED_MODULE_0__VCarousel__["a"/* default */];/***/},/* 118 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_carousel_styl__=__webpack_require__(119);/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_carousel_styl___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_carousel_styl__);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__VBtn__=__webpack_require__(10);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__VIcon__=__webpack_require__(3);/* harmony import */var __WEBPACK_IMPORTED_MODULE_3__mixins_bootable__=__webpack_require__(16);/* harmony import */var __WEBPACK_IMPORTED_MODULE_4__mixins_themeable__=__webpack_require__(1);/* harmony import */var __WEBPACK_IMPORTED_MODULE_5__mixins_registrable__=__webpack_require__(4);/* harmony import */var __WEBPACK_IMPORTED_MODULE_6__directives_touch__=__webpack_require__(9);/* harmony default export */__webpack_exports__["a"]={name:'v-carousel',mixins:[__WEBPACK_IMPORTED_MODULE_3__mixins_bootable__["a"/* default */],__WEBPACK_IMPORTED_MODULE_4__mixins_themeable__["a"/* default */],Object(__WEBPACK_IMPORTED_MODULE_5__mixins_registrable__["b"/* provide */])('carousel')],directives:{Touch:__WEBPACK_IMPORTED_MODULE_6__directives_touch__["a"/* default */]},data:function data(){return{inputValue:null,items:[],slideTimeout:null,reverse:false};},props:{cycle:{type:Boolean,default:true},delimiterIcon:{type:String,default:'fiber_manual_record'},hideControls:Boolean,hideDelimiters:Boolean,interval:{type:[Number,String],default:6000,validator:function validator(value){return value>0;}},nextIcon:{type:[Boolean,String],default:'chevron_right'},prevIcon:{type:[Boolean,String],default:'chevron_left'},value:Number},watch:{items:function items(){if(this.inputValue>=this.items.length){this.inputValue=this.items.length-1;}},inputValue:function inputValue(){// Evaluates items when inputValue changes to
// account for dynamic changing of children
var uid=(this.items[this.inputValue]||{}).uid;for(var index=this.items.length;--index>=0;){this.items[index].open(uid,this.reverse);}this.$emit('input',this.inputValue);this.restartTimeout();},value:function value(val){this.inputValue=val;},interval:function interval(){this.restartTimeout();},cycle:function cycle(val){if(val){this.restartTimeout();}else{clearTimeout(this.slideTimeout);this.slideTimeout=null;}}},mounted:function mounted(){this.init();},methods:{genDelimiters:function genDelimiters(){return this.$createElement('div',{staticClass:'carousel__controls'},this.genItems());},genIcon:function genIcon(direction,icon,fn){if(!icon)return null;return this.$createElement('div',{staticClass:'carousel__'+direction},[this.$createElement(__WEBPACK_IMPORTED_MODULE_1__VBtn__["a"/* default */],{props:{icon:true,dark:this.dark||!this.light,light:this.light},on:{click:fn}},[this.$createElement(__WEBPACK_IMPORTED_MODULE_2__VIcon__["a"/* default */],{props:{'size':'46px'}},icon)])]);},genItems:function genItems(){var _this=this;return this.items.map(function(item,index){return _this.$createElement(__WEBPACK_IMPORTED_MODULE_1__VBtn__["a"/* default */],{class:{'carousel__controls__item':true,'carousel__controls__item--active':index===_this.inputValue},props:{icon:true,small:true,dark:_this.dark||!_this.light,light:_this.light},key:index,on:{click:_this.select.bind(_this,index)}},[_this.$createElement(__WEBPACK_IMPORTED_MODULE_2__VIcon__["a"/* default */],{props:{size:'18px'}},_this.delimiterIcon)]);});},restartTimeout:function restartTimeout(){this.slideTimeout&&clearTimeout(this.slideTimeout);this.slideTimeout=null;var raf=requestAnimationFrame||setTimeout;raf(this.startTimeout);},init:function init(){this.inputValue=this.value||0;},next:function next(){this.reverse=false;this.inputValue=(this.inputValue+1)%this.items.length;},prev:function prev(){this.reverse=true;this.inputValue=(this.inputValue+this.items.length-1)%this.items.length;},select:function select(index){this.reverse=index<this.inputValue;this.inputValue=index;},startTimeout:function startTimeout(){var _this2=this;if(!this.cycle)return;this.slideTimeout=setTimeout(function(){return _this2.next();},this.interval>0?this.interval:6000);},register:function register(uid,open){this.items.push({uid:uid,open:open});},unregister:function unregister(uid){this.items=this.items.filter(function(i){return i.uid!==uid;});}},render:function render(h){return h('div',{staticClass:'carousel',directives:[{name:'touch',value:{left:this.next,right:this.prev}}]},[this.hideControls?null:this.genIcon('left',this.prevIcon,this.prev),this.hideControls?null:this.genIcon('right',this.nextIcon,this.next),this.hideDelimiters?null:this.genDelimiters(),this.$slots.default]);}};/***/},/* 119 *//***/function(module,exports){// removed by extract-text-webpack-plugin
/***/},/* 120 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__VJumbotron__=__webpack_require__(37);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__mixins_registrable__=__webpack_require__(4);var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};// Components
// Mixins
/* harmony default export */__webpack_exports__["a"]={name:'v-carousel-item',mixins:[Object(__WEBPACK_IMPORTED_MODULE_1__mixins_registrable__["a"/* inject */])('carousel','v-carousel-item','v-carousel')],inheritAttrs:false,data:function data(){return{active:false,reverse:false};},props:{transition:{type:String,default:'tab-transition'},reverseTransition:{type:String,default:'tab-reverse-transition'}},computed:{computedTransition:function computedTransition(){return this.reverse?this.reverseTransition:this.transition;}},methods:{open:function open(id,reverse){this.active=this._uid===id;this.reverse=reverse;}},mounted:function mounted(){this.carousel.register(this._uid,this.open);},beforeDestroy:function beforeDestroy(){this.carousel.unregister(this._uid,this.open);},render:function render(h){var item=h(__WEBPACK_IMPORTED_MODULE_0__VJumbotron__["a"/* default */],{props:_extends({},this.$attrs,{height:'100%'}),on:this.$listeners,directives:[{name:'show',value:this.active}]},this.$slots.default);return h('transition',{props:{name:this.computedTransition}},[item]);}};/***/},/* 121 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_jumbotrons_styl__=__webpack_require__(122);/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_jumbotrons_styl___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_jumbotrons_styl__);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__mixins_colorable__=__webpack_require__(0);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__mixins_routable__=__webpack_require__(13);/* harmony import */var __WEBPACK_IMPORTED_MODULE_3__mixins_themeable__=__webpack_require__(1);// Mixins
/* harmony default export */__webpack_exports__["a"]={name:'v-jumbotron',mixins:[__WEBPACK_IMPORTED_MODULE_1__mixins_colorable__["a"/* default */],__WEBPACK_IMPORTED_MODULE_2__mixins_routable__["a"/* default */],__WEBPACK_IMPORTED_MODULE_3__mixins_themeable__["a"/* default */]],props:{gradient:String,height:{type:[Number,String],default:'400px'},src:String,tag:{type:String,default:'div'}},computed:{backgroundStyles:function backgroundStyles(){var styles={};if(this.gradient){styles.background='linear-gradient('+this.gradient+')';}return styles;},classes:function classes(){return{'theme--dark':this.dark,'theme--light':this.light};},styles:function styles(){return{height:this.height};}},methods:{genBackground:function genBackground(){return this.$createElement('div',{staticClass:'jumbotron__background','class':this.addBackgroundColorClassChecks(),style:this.backgroundStyles});},genContent:function genContent(){return this.$createElement('div',{staticClass:'jumbotron__content'},this.$slots.default);},genImage:function genImage(){if(!this.src)return null;if(this.$slots.img)return this.$slots.img({src:this.src});return this.$createElement('img',{staticClass:'jumbotron__image',attrs:{src:this.src}});},genWrapper:function genWrapper(){return this.$createElement('div',{staticClass:'jumbotron__wrapper'},[this.genImage(),this.genBackground(),this.genContent()]);}},render:function render(h){var _generateRouteLink=this.generateRouteLink(),tag=_generateRouteLink.tag,data=_generateRouteLink.data;data.staticClass='jumbotron';data.style=this.styles;return h(tag,data,[this.genWrapper()]);}};/***/},/* 122 *//***/function(module,exports){// removed by extract-text-webpack-plugin
/***/},/* 123 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_input_groups_styl__=__webpack_require__(18);/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_input_groups_styl___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_input_groups_styl__);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__stylus_components_selection_controls_styl__=__webpack_require__(28);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__stylus_components_selection_controls_styl___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__stylus_components_selection_controls_styl__);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__VIcon__=__webpack_require__(3);/* harmony import */var __WEBPACK_IMPORTED_MODULE_3__transitions__=__webpack_require__(7);/* harmony import */var __WEBPACK_IMPORTED_MODULE_4__mixins_rippleable__=__webpack_require__(22);/* harmony import */var __WEBPACK_IMPORTED_MODULE_5__mixins_selectable__=__webpack_require__(40);/* harmony default export */__webpack_exports__["a"]={name:'v-checkbox',components:{VFadeTransition:__WEBPACK_IMPORTED_MODULE_3__transitions__["b"/* VFadeTransition */],VIcon:__WEBPACK_IMPORTED_MODULE_2__VIcon__["a"/* default */]},mixins:[__WEBPACK_IMPORTED_MODULE_4__mixins_rippleable__["a"/* default */],__WEBPACK_IMPORTED_MODULE_5__mixins_selectable__["a"/* default */]],data:function data(){return{inputIndeterminate:this.indeterminate};},props:{indeterminate:Boolean},computed:{classes:function classes(){var classes={'checkbox':true,'input-group--selection-controls':true,'input-group--active':this.isActive};if(this.hasError){classes['error--text']=true;}else{return this.addTextColorClassChecks(classes);}return classes;},icon:function icon(){if(this.inputIndeterminate){return'indeterminate_check_box';}else if(this.isActive){return'check_box';}else{return'check_box_outline_blank';}}},methods:{groupFocus:function groupFocus(e){this.isFocused=true;this.$emit('focus',e);},groupBlur:function groupBlur(e){this.isFocused=false;this.tabFocused=false;this.$emit('blur',this.inputValue);}},render:function render(h){var transition=h('v-fade-transition',[h('v-icon',{staticClass:'icon--selection-control','class':{'icon--checkbox':this.icon==='check_box'},key:this.icon,on:Object.assign({click:this.toggle},this.$listeners)},this.icon)]);var data={attrs:{tabindex:this.disabled?-1:this.internalTabIndex||this.tabindex,role:'checkbox','aria-checked':this.inputIndeterminate?'mixed':this.isActive?'true':'false','aria-label':this.label}};var ripple=this.ripple?this.genRipple():null;return this.genInputGroup([transition,ripple],data);}};/***/},/* 124 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__util_console__=__webpack_require__(6);var _typeof=typeof Symbol==="function"&&_typeof2(Symbol.iterator)==="symbol"?function(obj){return typeof obj==='undefined'?'undefined':_typeof2(obj);}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj==='undefined'?'undefined':_typeof2(obj);};/* harmony default export */__webpack_exports__["a"]={name:'validatable',data:function data(){return{errorBucket:[],hasFocused:false,hasInput:false,shouldValidate:false,valid:false};},props:{error:{type:Boolean},errorMessages:{type:[String,Array],default:function _default(){return[];}},rules:{type:Array,default:function _default(){return[];}},validateOnBlur:Boolean},computed:{validations:function validations(){if(!Array.isArray(this.errorMessages)){return[this.errorMessages];}else if(this.errorMessages.length>0){return this.errorMessages;}else if(this.shouldValidate){return this.errorBucket;}else{return[];}},hasError:function hasError(){return this.validations.length>0||this.errorMessages.length>0||this.error;}},watch:{rules:{handler:function handler(newVal,oldVal){// TODO: This handler seems to trigger when input changes, even though
// rules array stays the same? Solved it like this for now
if(newVal.length===oldVal.length)return;this.validate();},deep:true},inputValue:function inputValue(val){// If it's the first time we're setting input,
// mark it with hasInput
if(!!val&&!this.hasInput)this.hasInput=true;if(this.hasInput&&!this.validateOnBlur)this.shouldValidate=true;},isFocused:function isFocused(val){// If we're not focused, and it's the first time
// we're defocusing, set shouldValidate to true
if(!val&&!this.hasFocused){this.hasFocused=true;this.shouldValidate=true;this.$emit('update:error',this.errorBucket.length>0);}},hasError:function hasError(val){if(this.shouldValidate){this.$emit('update:error',val);}},error:function error(val){this.shouldValidate=!!val;}},mounted:function mounted(){this.shouldValidate=!!this.error;this.validate();},methods:{reset:function reset(){var _this=this;// TODO: Do this another way!
// This is so that we can reset all types of inputs
this.$emit('input',this.isMultiple?[]:null);this.$emit('change',null);this.$nextTick(function(){_this.shouldValidate=false;_this.hasFocused=false;_this.validate();});},validate:function validate(){var force=arguments.length>0&&arguments[0]!==undefined?arguments[0]:false;var value=arguments.length>1&&arguments[1]!==undefined?arguments[1]:this.inputValue;if(force)this.shouldValidate=true;this.errorBucket=[];for(var index=0;index<this.rules.length;index++){var rule=this.rules[index];var valid=typeof rule==='function'?rule(value):rule;if(valid===false||typeof valid==='string'){this.errorBucket.push(valid);}else if(valid!==true){Object(__WEBPACK_IMPORTED_MODULE_0__util_console__["a"/* consoleError */])('Rules should return a string or boolean, received \''+(typeof valid==='undefined'?'undefined':_typeof(valid))+'\' instead',this);}}this.valid=this.errorBucket.length===0;return this.valid;}}};/***/},/* 125 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_chips_styl__=__webpack_require__(126);/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_chips_styl___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_chips_styl__);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__VIcon__=__webpack_require__(3);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__mixins_colorable__=__webpack_require__(0);/* harmony import */var __WEBPACK_IMPORTED_MODULE_3__mixins_themeable__=__webpack_require__(1);/* harmony import */var __WEBPACK_IMPORTED_MODULE_4__mixins_toggleable__=__webpack_require__(5);/* harmony default export */__webpack_exports__["a"]={name:'v-chip',components:{VIcon:__WEBPACK_IMPORTED_MODULE_1__VIcon__["a"/* default */]},mixins:[__WEBPACK_IMPORTED_MODULE_2__mixins_colorable__["a"/* default */],__WEBPACK_IMPORTED_MODULE_3__mixins_themeable__["a"/* default */],__WEBPACK_IMPORTED_MODULE_4__mixins_toggleable__["a"/* default */]],props:{close:Boolean,disabled:Boolean,label:Boolean,outline:Boolean,// Used for selects/tagging
selected:Boolean,small:Boolean,textColor:String,value:{type:Boolean,default:true}},computed:{classes:function classes(){var classes=this.addBackgroundColorClassChecks({'chip--disabled':this.disabled,'chip--selected':this.selected,'chip--label':this.label,'chip--outline':this.outline,'chip--small':this.small,'chip--removable':this.close,'theme--light':this.light,'theme--dark':this.dark});return this.textColor||this.outline?this.addTextColorClassChecks(classes,this.textColor||this.color):classes;}},methods:{genClose:function genClose(h){var _this=this;var data={staticClass:'chip__close',on:{click:function click(e){e.stopPropagation();_this.$emit('input',false);}}};return h('div',data,[h(__WEBPACK_IMPORTED_MODULE_1__VIcon__["a"/* default */],'cancel')]);},genContent:function genContent(h){var children=[this.$slots.default];this.close&&children.push(this.genClose(h));return h('span',{staticClass:'chip__content'},children);}},render:function render(h){var data={staticClass:'chip','class':this.classes,attrs:{tabindex:this.disabled?-1:0},directives:[{name:'show',value:this.isActive}],on:this.$listeners};return h('span',data,[this.genContent(h)]);}};/***/},/* 126 *//***/function(module,exports){// removed by extract-text-webpack-plugin
/***/},/* 127 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__VDataIterator__=__webpack_require__(128);__WEBPACK_IMPORTED_MODULE_0__VDataIterator__["a"/* default */].install=function install(Vue){Vue.component(__WEBPACK_IMPORTED_MODULE_0__VDataIterator__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_0__VDataIterator__["a"/* default */]);};/* harmony default export */__webpack_exports__["a"]=__WEBPACK_IMPORTED_MODULE_0__VDataIterator__["a"/* default */];/***/},/* 128 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_data_iterator_styl__=__webpack_require__(129);/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_data_iterator_styl___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_data_iterator_styl__);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__mixins_data_iterable__=__webpack_require__(43);/* harmony default export */__webpack_exports__["a"]={name:'v-data-iterator',mixins:[__WEBPACK_IMPORTED_MODULE_1__mixins_data_iterable__["a"/* default */]],inheritAttrs:false,props:{contentTag:{type:String,default:'div'},contentProps:{type:Object,required:false},contentClass:{type:String,required:false}},computed:{classes:function classes(){return{'data-iterator':true,'data-iterator--select-all':this.selectAll!==false,'theme--dark':this.dark,'theme--light':this.light};}},methods:{genContent:function genContent(){var children=this.genItems();var data={'class':this.contentClass,attrs:this.$attrs,on:this.$listeners,props:this.contentProps};return this.$createElement(this.contentTag,data,children);},genEmptyItems:function genEmptyItems(content){return[this.$createElement('div',{'class':'text-xs-center',style:'width: 100%'},content)];},genFilteredItems:function genFilteredItems(){if(!this.$scopedSlots.item){return null;}var items=[];for(var index=0,len=this.filteredItems.length;index<len;++index){var item=this.filteredItems[index];var props=this.createProps(item,index);items.push(this.$scopedSlots.item(props));}return items;},genFooter:function genFooter(){var children=[];if(this.$slots.footer){children.push(this.$slots.footer);}if(!this.hideActions){children.push(this.genActions());}if(!children.length)return null;return this.$createElement('div',children);}},created:function created(){this.initPagination();},render:function render(h){return h('div',{'class':this.classes},[this.genContent(),this.genFooter()]);}};/***/},/* 129 *//***/function(module,exports){// removed by extract-text-webpack-plugin
/***/},/* 130 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_text_fields_styl__=__webpack_require__(45);/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_text_fields_styl___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_text_fields_styl__);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__stylus_components_input_groups_styl__=__webpack_require__(18);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__stylus_components_input_groups_styl___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__stylus_components_input_groups_styl__);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__stylus_components_select_styl__=__webpack_require__(131);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__stylus_components_select_styl___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__stylus_components_select_styl__);/* harmony import */var __WEBPACK_IMPORTED_MODULE_3__VBtn__=__webpack_require__(10);/* harmony import */var __WEBPACK_IMPORTED_MODULE_4__VCard__=__webpack_require__(21);/* harmony import */var __WEBPACK_IMPORTED_MODULE_5__VCheckbox__=__webpack_require__(38);/* harmony import */var __WEBPACK_IMPORTED_MODULE_6__VChip__=__webpack_require__(42);/* harmony import */var __WEBPACK_IMPORTED_MODULE_7__VList__=__webpack_require__(46);/* harmony import */var __WEBPACK_IMPORTED_MODULE_8__VMenu__=__webpack_require__(47);/* harmony import */var __WEBPACK_IMPORTED_MODULE_9__mixins_colorable__=__webpack_require__(0);/* harmony import */var __WEBPACK_IMPORTED_MODULE_10__mixins_dependent__=__webpack_require__(20);/* harmony import */var __WEBPACK_IMPORTED_MODULE_11__mixins_filterable__=__webpack_require__(50);/* harmony import */var __WEBPACK_IMPORTED_MODULE_12__mixins_input__=__webpack_require__(19);/* harmony import */var __WEBPACK_IMPORTED_MODULE_13__mixins_maskable__=__webpack_require__(51);/* harmony import */var __WEBPACK_IMPORTED_MODULE_14__mixins_soloable__=__webpack_require__(52);/* harmony import */var __WEBPACK_IMPORTED_MODULE_15__mixins_select_autocomplete__=__webpack_require__(145);/* harmony import */var __WEBPACK_IMPORTED_MODULE_16__mixins_select_computed__=__webpack_require__(146);/* harmony import */var __WEBPACK_IMPORTED_MODULE_17__mixins_select_events__=__webpack_require__(147);/* harmony import */var __WEBPACK_IMPORTED_MODULE_18__mixins_select_generators__=__webpack_require__(148);/* harmony import */var __WEBPACK_IMPORTED_MODULE_19__mixins_select_helpers__=__webpack_require__(149);/* harmony import */var __WEBPACK_IMPORTED_MODULE_20__mixins_select_menu__=__webpack_require__(150);/* harmony import */var __WEBPACK_IMPORTED_MODULE_21__mixins_select_props__=__webpack_require__(151);/* harmony import */var __WEBPACK_IMPORTED_MODULE_22__mixins_select_watchers__=__webpack_require__(152);/* harmony import */var __WEBPACK_IMPORTED_MODULE_23__directives_click_outside__=__webpack_require__(8);var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};// Styles
// Components
// Mixins
// Component level mixins
// Directives
/* harmony default export */__webpack_exports__["a"]={name:'v-select',inheritAttrs:false,components:{VCard:__WEBPACK_IMPORTED_MODULE_4__VCard__["a"/* default */],VCheckbox:__WEBPACK_IMPORTED_MODULE_5__VCheckbox__["a"/* default */],VChip:__WEBPACK_IMPORTED_MODULE_6__VChip__["a"/* default */],VList:__WEBPACK_IMPORTED_MODULE_7__VList__["a"/* VList */],VListTile:__WEBPACK_IMPORTED_MODULE_7__VList__["b"/* VListTile */],VListTileAction:__WEBPACK_IMPORTED_MODULE_7__VList__["c"/* VListTileAction */],VListTileContent:__WEBPACK_IMPORTED_MODULE_7__VList__["d"/* VListTileContent */],VListTileTitle:__WEBPACK_IMPORTED_MODULE_7__VList__["e"/* VListTileTitle */],VMenu:__WEBPACK_IMPORTED_MODULE_8__VMenu__["a"/* default */],VBtn:__WEBPACK_IMPORTED_MODULE_3__VBtn__["a"/* default */]},directives:{ClickOutside:__WEBPACK_IMPORTED_MODULE_23__directives_click_outside__["a"/* default */]},mixins:[__WEBPACK_IMPORTED_MODULE_15__mixins_select_autocomplete__["a"/* default */],__WEBPACK_IMPORTED_MODULE_9__mixins_colorable__["a"/* default */],__WEBPACK_IMPORTED_MODULE_10__mixins_dependent__["a"/* default */],__WEBPACK_IMPORTED_MODULE_17__mixins_select_events__["a"/* default */],__WEBPACK_IMPORTED_MODULE_11__mixins_filterable__["a"/* default */],__WEBPACK_IMPORTED_MODULE_18__mixins_select_generators__["a"/* default */],__WEBPACK_IMPORTED_MODULE_19__mixins_select_helpers__["a"/* default */],__WEBPACK_IMPORTED_MODULE_12__mixins_input__["a"/* default */],__WEBPACK_IMPORTED_MODULE_13__mixins_maskable__["a"/* default */],__WEBPACK_IMPORTED_MODULE_20__mixins_select_menu__["a"/* default */],__WEBPACK_IMPORTED_MODULE_21__mixins_select_props__["a"/* default */],__WEBPACK_IMPORTED_MODULE_14__mixins_soloable__["a"/* default */],__WEBPACK_IMPORTED_MODULE_22__mixins_select_watchers__["a"/* default */],// Input and Computed both
// contain isDirty props
// last gets merged in
__WEBPACK_IMPORTED_MODULE_16__mixins_select_computed__["a"/* default */]],data:function data(){return{cachedItems:this.cacheItems?this.items:[],content:{},defaultColor:'primary',inputValue:(this.multiple||this.tags)&&!this.value?[]:this.value,isBooted:false,lastItem:20,lazySearch:null,isActive:false,menuIsActive:false,selectedIndex:-1,selectedItems:[],shouldBreak:false};},mounted:function mounted(){// If instance is being destroyed
// do not run mounted functions
if(this._isDestroyed)return;// Evaluate the selected items immediately
// to avoid a unnecessary label transition
this.genSelectedItems();this.content=this.$refs.menu.$refs.content;},beforeDestroy:function beforeDestroy(){if(this.isBooted){if(this.content){this.content.removeEventListener('scroll',this.onScroll,false);}}},methods:{needsTile:function needsTile(tile){return tile.componentOptions==null||tile.componentOptions.tag!=='v-list-tile';},changeSelectedIndex:function changeSelectedIndex(keyCode){// backspace, left, right, delete
if(![8,37,39,46].includes(keyCode))return;var indexes=this.selectedItems.length-1;if(keyCode===37){// Left arrow
this.selectedIndex=this.selectedIndex===-1?indexes:this.selectedIndex-1;}else if(keyCode===39){// Right arrow
this.selectedIndex=this.selectedIndex>=indexes?-1:this.selectedIndex+1;}else if(this.selectedIndex===-1){this.selectedIndex=indexes;return;}// backspace/delete
if([8,46].includes(keyCode)){var newIndex=this.selectedIndex===indexes?this.selectedIndex-1:this.selectedItems[this.selectedIndex+1]?this.selectedIndex:-1;this.combobox?this.inputValue=null:this.selectItem(this.selectedItems[this.selectedIndex]);this.selectedIndex=newIndex;}},closeConditional:function closeConditional(e){return this.isActive&&!!this.content&&!this.content.contains(e.target)&&!!this.$el&&!this.$el.contains(e.target);},filterDuplicates:function filterDuplicates(arr){var uniqueValues=new Map();for(var index=0;index<arr.length;++index){var item=arr[index];var val=this.getValue(item);!uniqueValues.has(val)&&uniqueValues.set(val,item);}return Array.from(uniqueValues.values());},genDirectives:function genDirectives(){var _this=this;return[{name:'click-outside',value:function value(){return _this.isActive=false;},args:{closeConditional:this.closeConditional}}];},genSelectedItems:function genSelectedItems(){var _this2=this;var val=arguments.length>0&&arguments[0]!==undefined?arguments[0]:this.inputValue;// If we are using tags, don't filter results
if(this.tags)return this.selectedItems=val;// Combobox is the single version
// of a taggable select element
if(this.combobox)return this.selectedItems=val!=null?[val]:[];var selectedItems=this.computedItems.filter(function(i){if(!_this2.isMultiple){return _this2.getValue(i)===_this2.getValue(val);}else{// Always return Boolean
return _this2.findExistingIndex(i)>-1;}});if(!selectedItems.length&&val!=null&&this.tags){selectedItems=Array.isArray(val)?val:[val];}this.selectedItems=selectedItems;},clearableCallback:function clearableCallback(){var _this3=this;var inputValue=this.isMultiple?[]:null;this.inputValue=inputValue;this.$emit('change',inputValue);this.genSelectedItems();// When input is cleared
// reset search value and
// re-focus the input
setTimeout(function(){_this3.searchValue=null;_this3.focusInput();},0);if(this.openOnClear){setTimeout(this.showMenu,50);}},onScroll:function onScroll(){var _this4=this;if(!this.isActive){requestAnimationFrame(function(){return _this4.content.scrollTop=0;});}else{if(this.lastItem>=this.computedItems.length)return;var showMoreItems=this.content.scrollHeight-(this.content.scrollTop+this.content.clientHeight)<200;if(showMoreItems){this.lastItem+=20;}}},findExistingItem:function findExistingItem(val){var _this5=this;var itemValue=this.getValue(val);return this.items.find(function(i){return _this5.valueComparator(_this5.getValue(i),itemValue);});},findExistingIndex:function findExistingIndex(item){var _this6=this;var itemValue=this.getValue(item);return this.inputValue.findIndex(function(i){return _this6.valueComparator(_this6.getValue(i),itemValue);});},selectItem:function selectItem(item){var _this7=this;if(!this.isMultiple){this.inputValue=this.returnObject?item:this.getValue(item);this.selectedItems=[item];}else{var selectedItems=[];var inputValue=this.inputValue.slice();var i=this.findExistingIndex(item);i!==-1?inputValue.splice(i,1):inputValue.push(item);this.inputValue=inputValue.map(function(i){selectedItems.push(i);return _this7.returnObject?i:_this7.getValue(i);});this.selectedItems=selectedItems;this.selectedIndex=-1;}this.searchValue=!this.isMultiple&&!this.chips&&!this.$scopedSlots.selection?this.getText(this.selectedItem):null;this.$emit('change',this.inputValue);// List tile will re-render, reset index to
// maintain highlighting
var savedIndex=this.getMenuIndex();this.resetMenuIndex();// After selecting an item
// refocus the input and
// reset the caret pos
this.$nextTick(function(){_this7.focusInput();_this7.setCaretPosition(_this7.currentRange);requestAnimationFrame(function(){if(savedIndex>-1){_this7.setMenuIndex(savedIndex);}});});}},render:function render(h){var _this8=this;var data={attrs:_extends({tabindex:this.isAutocomplete||this.disabled?-1:this.tabindex,'data-uid':this._uid},this.isAutocomplete?null:this.$attrs,{role:this.isAutocomplete?null:'combobox'})};if(!this.isAutocomplete){data.on=this.genListeners();data.directives=this.genDirectives();}else{data.on={click:function click(){if(_this8.disabled||_this8.readonly||_this8.isFocused)return;// If the input is dirty,
// the input is not targetable
// so we must manually focus
if(_this8.isDirty){_this8.focus();_this8.$nextTick(_this8.focusInput);}}};}return this.genInputGroup([this.genSelectionsAndSearch(),this.genMenu()],data,this.toggleMenu);}};/***/},/* 131 *//***/function(module,exports){// removed by extract-text-webpack-plugin
/***/},/* 132 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_lists_styl__=__webpack_require__(133);/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_lists_styl___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_lists_styl__);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__mixins_themeable__=__webpack_require__(1);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__mixins_registrable__=__webpack_require__(4);// Styles
// Mixins
/* harmony default export */__webpack_exports__["a"]={name:'v-list',mixins:[Object(__WEBPACK_IMPORTED_MODULE_2__mixins_registrable__["b"/* provide */])('list'),__WEBPACK_IMPORTED_MODULE_1__mixins_themeable__["a"/* default */]],provide:function provide(){return{'listClick':this.listClick};},data:function data(){return{groups:[]};},props:{dense:Boolean,expand:Boolean,subheader:Boolean,threeLine:Boolean,twoLine:Boolean},computed:{classes:function classes(){return{'list--dense':this.dense,'list--subheader':this.subheader,'list--two-line':this.twoLine,'list--three-line':this.threeLine,'theme--dark':this.dark,'theme--light':this.light};}},methods:{register:function register(uid,cb){this.groups.push({uid:uid,cb:cb});},unregister:function unregister(uid){var index=this.groups.findIndex(function(g){return g.uid===uid;});if(index>-1){this.groups.splice(index,1);}},listClick:function listClick(uid,isBooted){if(this.expand)return;for(var i=this.groups.length;i--;){this.groups[i].cb(uid);}}},render:function render(h){var data={staticClass:'list','class':this.classes};return h('ul',data,[this.$slots.default]);}};/***/},/* 133 *//***/function(module,exports){// removed by extract-text-webpack-plugin
/***/},/* 134 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__components_VIcon__=__webpack_require__(3);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__mixins_bootable__=__webpack_require__(16);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__mixins_toggleable__=__webpack_require__(5);/* harmony import */var __WEBPACK_IMPORTED_MODULE_3__mixins_registrable__=__webpack_require__(4);/* harmony import */var __WEBPACK_IMPORTED_MODULE_4__transitions__=__webpack_require__(7);function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}// Components
// Mixins
// Transitions
/**
 * List group
 *
 * @component
 *//* harmony default export */__webpack_exports__["a"]={name:'v-list-group',mixins:[__WEBPACK_IMPORTED_MODULE_1__mixins_bootable__["a"/* default */],Object(__WEBPACK_IMPORTED_MODULE_3__mixins_registrable__["a"/* inject */])('list','v-list-group','v-list'),__WEBPACK_IMPORTED_MODULE_2__mixins_toggleable__["a"/* default */]],inject:['listClick'],data:function data(){return{groups:[]};},props:{activeClass:{type:String,default:'primary--text'},appendIcon:{type:String,default:'keyboard_arrow_down'},disabled:Boolean,group:String,noAction:Boolean,prependIcon:String,subGroup:Boolean},computed:{groupClasses:function groupClasses(){return{'list__group--active':this.isActive,'list__group--disabled':this.disabled};},headerClasses:function headerClasses(){return{'list__group__header--active':this.isActive,'list__group__header--sub-group':this.subGroup};},itemsClasses:function itemsClasses(){return{'list__group__items--no-action':this.noAction};}},watch:{isActive:function isActive(val){if(!this.subGroup&&val){this.listClick(this._uid);}},$route:function $route(to){var isActive=this.matchRoute(to.path);if(this.group){if(isActive&&this.isActive!==isActive){this.listClick(this._uid);}this.isActive=isActive;}}},mounted:function mounted(){this.list.register(this._uid,this.toggle);if(this.group&&this.$route&&this.value==null){this.isActive=this.matchRoute(this.$route.path);}},beforeDestroy:function beforeDestroy(){this.list.unregister(this._uid);},methods:{click:function click(){if(this.disabled)return;this.isActive=!this.isActive;},genIcon:function genIcon(icon){return this.$createElement(__WEBPACK_IMPORTED_MODULE_0__components_VIcon__["a"/* default */],icon);},genAppendIcon:function genAppendIcon(){var icon=!this.subGroup?this.appendIcon:false;if(!icon&&!this.$slots.appendIcon)return null;return this.$createElement('li',{staticClass:'list__group__header__append-icon'},[this.$slots.appendIcon||this.genIcon(icon)]);},genGroup:function genGroup(){return this.$createElement('ul',{staticClass:'list__group__header','class':this.headerClasses,on:Object.assign({},{click:this.click},this.$listeners),ref:'item'},[this.genPrependIcon(),this.$slots.activator,this.genAppendIcon()]);},genItems:function genItems(){return this.$createElement('ul',{staticClass:'list__group__items','class':this.itemsClasses,directives:[{name:'show',value:this.isActive}],ref:'group'},this.showLazyContent(this.$slots.default));},genPrependIcon:function genPrependIcon(){var icon=this.prependIcon?this.prependIcon:this.subGroup?'arrow_drop_down':false;if(!icon&&!this.$slots.prependIcon)return null;return this.$createElement('li',{staticClass:'list__group__header__prepend-icon','class':_defineProperty({},this.activeClass,this.isActive)},[this.$slots.prependIcon||this.genIcon(icon)]);},toggle:function toggle(uid){this.isActive=this._uid===uid;},matchRoute:function matchRoute(to){if(!this.group)return false;return to.match(this.group)!==null;}},render:function render(h){return h('li',{staticClass:'list__group','class':this.groupClasses},[this.genGroup(),h(__WEBPACK_IMPORTED_MODULE_4__transitions__["a"/* VExpandTransition */],[this.genItems()])]);}};/***/},/* 135 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__mixins_colorable__=__webpack_require__(0);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__mixins_routable__=__webpack_require__(13);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__mixins_toggleable__=__webpack_require__(5);/* harmony import */var __WEBPACK_IMPORTED_MODULE_3__directives_ripple__=__webpack_require__(17);var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}// Mixins
// Directives
/* harmony default export */__webpack_exports__["a"]={name:'v-list-tile',mixins:[__WEBPACK_IMPORTED_MODULE_0__mixins_colorable__["a"/* default */],__WEBPACK_IMPORTED_MODULE_1__mixins_routable__["a"/* default */],__WEBPACK_IMPORTED_MODULE_2__mixins_toggleable__["a"/* default */]],directives:{Ripple:__WEBPACK_IMPORTED_MODULE_3__directives_ripple__["a"/* default */]},inheritAttrs:false,data:function data(){return{proxyClass:'list__tile--active'};},props:{activeClass:{type:String,default:'primary--text'},avatar:Boolean,inactive:Boolean,tag:String},computed:{listClasses:function listClasses(){return this.disabled?'text--disabled':this.color?this.addTextColorClassChecks():this.defaultColor;},classes:function classes(){return _defineProperty({'list__tile':true,'list__tile--link':this.isLink&&!this.inactive,'list__tile--avatar':this.avatar,'list__tile--disabled':this.disabled,'list__tile--active':!this.to&&this.isActive},this.activeClass,this.isActive);},isLink:function isLink(){return this.href||this.to||this.$listeners&&(this.$listeners.click||this.$listeners['!click']);}},render:function render(h){var isRouteLink=!this.inactive&&this.isLink;var _ref2=isRouteLink?this.generateRouteLink():{tag:this.tag||'div',data:{class:this.classes}},tag=_ref2.tag,data=_ref2.data;data.attrs=Object.assign({},data.attrs,this.$attrs);return h('li',{'class':this.listClasses,attrs:{disabled:this.disabled},on:_extends({},this.$listeners)},[h(tag,data,this.$slots.default)]);}};/***/},/* 136 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony default export */__webpack_exports__["a"]={functional:true,name:'v-list-tile-action',render:function render(h,_ref){var data=_ref.data,children=_ref.children;data.staticClass=data.staticClass?'list__tile__action '+data.staticClass:'list__tile__action';if((children||[]).length>1)data.staticClass+=' list__tile__action--stack';return h('div',data,children);}};/***/},/* 137 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__VAvatar__=__webpack_require__(32);// Components
/* harmony default export */__webpack_exports__["a"]={functional:true,name:'v-list-tile-avatar',props:{color:String,size:{type:[Number,String],default:40},tile:Boolean},render:function render(h,_ref){var data=_ref.data,children=_ref.children,props=_ref.props;data.staticClass=('list__tile__avatar '+(data.staticClass||'')).trim();var avatar=h(__WEBPACK_IMPORTED_MODULE_0__VAvatar__["a"/* default */],{props:{color:props.color,size:props.size,tile:props.tile}},[children]);return h('div',data,[avatar]);}};/***/},/* 138 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_menus_styl__=__webpack_require__(139);/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_menus_styl___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_menus_styl__);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__mixins_delayable__=__webpack_require__(48);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__mixins_dependent__=__webpack_require__(20);/* harmony import */var __WEBPACK_IMPORTED_MODULE_3__mixins_detachable__=__webpack_require__(26);/* harmony import */var __WEBPACK_IMPORTED_MODULE_4__mixins_menuable_js__=__webpack_require__(49);/* harmony import */var __WEBPACK_IMPORTED_MODULE_5__mixins_returnable__=__webpack_require__(27);/* harmony import */var __WEBPACK_IMPORTED_MODULE_6__mixins_toggleable__=__webpack_require__(5);/* harmony import */var __WEBPACK_IMPORTED_MODULE_7__mixins_menu_activator__=__webpack_require__(140);/* harmony import */var __WEBPACK_IMPORTED_MODULE_8__mixins_menu_generators__=__webpack_require__(141);/* harmony import */var __WEBPACK_IMPORTED_MODULE_9__mixins_menu_keyable__=__webpack_require__(142);/* harmony import */var __WEBPACK_IMPORTED_MODULE_10__mixins_menu_position__=__webpack_require__(143);/* harmony import */var __WEBPACK_IMPORTED_MODULE_11__directives_click_outside__=__webpack_require__(8);/* harmony import */var __WEBPACK_IMPORTED_MODULE_12__directives_resize__=__webpack_require__(11);// Mixins
// Component level mixins
// Directives
/* harmony default export */__webpack_exports__["a"]={name:'v-menu',mixins:[__WEBPACK_IMPORTED_MODULE_7__mixins_menu_activator__["a"/* default */],__WEBPACK_IMPORTED_MODULE_2__mixins_dependent__["a"/* default */],__WEBPACK_IMPORTED_MODULE_1__mixins_delayable__["a"/* default */],__WEBPACK_IMPORTED_MODULE_3__mixins_detachable__["a"/* default */],__WEBPACK_IMPORTED_MODULE_8__mixins_menu_generators__["a"/* default */],__WEBPACK_IMPORTED_MODULE_9__mixins_menu_keyable__["a"/* default */],__WEBPACK_IMPORTED_MODULE_4__mixins_menuable_js__["a"/* default */],__WEBPACK_IMPORTED_MODULE_10__mixins_menu_position__["a"/* default */],__WEBPACK_IMPORTED_MODULE_5__mixins_returnable__["a"/* default */],__WEBPACK_IMPORTED_MODULE_6__mixins_toggleable__["a"/* default */]],directives:{ClickOutside:__WEBPACK_IMPORTED_MODULE_11__directives_click_outside__["a"/* default */],Resize:__WEBPACK_IMPORTED_MODULE_12__directives_resize__["a"/* default */]},data:function data(){return{defaultOffset:8,maxHeightAutoDefault:'200px',startIndex:3,stopIndex:0,hasJustFocused:false,resizeTimeout:null};},props:{auto:Boolean,closeOnClick:{type:Boolean,default:true},closeOnContentClick:{type:Boolean,default:true},disabled:Boolean,fullWidth:Boolean,maxHeight:{default:'auto'},offsetX:Boolean,offsetY:Boolean,openOnClick:{type:Boolean,default:true},openOnHover:Boolean,origin:{type:String,default:'top left'},transition:{type:[Boolean,String],default:'menu-transition'}},computed:{calculatedLeft:function calculatedLeft(){if(!this.auto)return this.calcLeft();return this.calcXOverflow(this.calcLeftAuto())+'px';},calculatedMaxHeight:function calculatedMaxHeight(){return this.auto?'200px':isNaN(this.maxHeight)?this.maxHeight:this.maxHeight+'px';},calculatedMaxWidth:function calculatedMaxWidth(){return isNaN(this.maxWidth)?this.maxWidth:this.maxWidth+'px';},calculatedMinWidth:function calculatedMinWidth(){if(this.minWidth){return isNaN(this.minWidth)?this.minWidth:this.minWidth+'px';}var minWidth=this.dimensions.activator.width+this.nudgeWidth+(this.auto?16:0);var calculatedMaxWidth=isNaN(parseInt(this.calculatedMaxWidth))?minWidth:parseInt(this.calculatedMaxWidth);return Math.min(calculatedMaxWidth,minWidth)+'px';},calculatedTop:function calculatedTop(){if(!this.auto||this.isAttached)return this.calcTop();return this.calcYOverflow(this.calcTopAuto())+'px';},styles:function styles(){return{maxHeight:this.calculatedMaxHeight,minWidth:this.calculatedMinWidth,maxWidth:this.calculatedMaxWidth,top:this.calculatedTop,left:this.calculatedLeft,transformOrigin:this.origin,zIndex:this.zIndex||this.activeZIndex};}},watch:{activator:function activator(newActivator,oldActivator){this.removeActivatorEvents(oldActivator);this.addActivatorEvents(newActivator);},isContentActive:function isContentActive(val){this.hasJustFocused=val;}},methods:{activate:function activate(){// This exists primarily for v-select
// helps determine which tiles to activate
this.getTiles();// Update coordinates and dimensions of menu
// and its activator
this.updateDimensions();// Start the transition
requestAnimationFrame(this.startTransition);// Once transitioning, calculate scroll position
setTimeout(this.calculateScroll,50);},closeConditional:function closeConditional(){return this.isActive&&this.closeOnClick;},onResize:function onResize(){if(!this.isActive)return;// Account for screen resize
// and orientation change
// eslint-disable-next-line no-unused-expressions
this.$refs.content.offsetWidth;this.updateDimensions();// When resizing to a smaller width
// content width is evaluated before
// the new activator width has been
// set, causing it to not size properly
// hacky but will revisit in the future
clearTimeout(this.resizeTimeout);this.resizeTimeout=setTimeout(this.updateDimensions,100);}},render:function render(h){var data={staticClass:'menu',class:{'menu--disabled':this.disabled},style:{display:this.fullWidth?'block':'inline-block'},directives:[{arg:500,name:'resize',value:this.onResize}],on:{keydown:this.changeListIndex}};return h('div',data,[this.genActivator(),this.genTransition()]);}};/***/},/* 139 *//***/function(module,exports){// removed by extract-text-webpack-plugin
/***/},/* 140 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/**
 * Menu activator
 *
 * @mixin
 *
 * Handles the click and hover activation
 * Supports slotted and detached activators
 *//* harmony default export */__webpack_exports__["a"]={methods:{activatorClickHandler:function activatorClickHandler(e){if(this.disabled)return;if(this.openOnClick&&!this.isActive){this.getActivator().focus();this.isActive=true;this.absoluteX=e.clientX;this.absoluteY=e.clientY;}else if(this.closeOnClick&&this.isActive){this.getActivator().blur();this.isActive=false;}},mouseEnterHandler:function mouseEnterHandler(e){var _this=this;this.runDelay('open',function(){if(_this.hasJustFocused)return;_this.hasJustFocused=true;_this.isActive=true;});},mouseLeaveHandler:function mouseLeaveHandler(e){var _this2=this;// Prevent accidental re-activation
this.runDelay('close',function(){if(_this2.$refs.content.contains(e.relatedTarget))return;requestAnimationFrame(function(){_this2.isActive=false;_this2.callDeactivate();});});},addActivatorEvents:function addActivatorEvents(){var activator=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null;if(!activator)return;activator.addEventListener('click',this.activatorClickHandler);},removeActivatorEvents:function removeActivatorEvents(){var activator=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null;if(!activator)return;activator.removeEventListener('click',this.activatorClickHandler);}}};/***/},/* 141 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}else{return Array.from(arr);}}/**
 * Menu generators
 *
 * @mixin
 *
 * Used for creating the DOM elements for VMenu
 *//* harmony default export */__webpack_exports__["a"]={methods:{genActivator:function genActivator(){if(!this.$slots.activator)return null;var options={staticClass:'menu__activator','class':{'menu__activator--active':this.hasJustFocused||this.isActive},ref:'activator',on:{}};if(this.openOnHover){options.on['mouseenter']=this.mouseEnterHandler;options.on['mouseleave']=this.mouseLeaveHandler;}else if(this.openOnClick){options.on['click']=this.activatorClickHandler;}return this.$createElement('div',options,this.$slots.activator);},genTransition:function genTransition(){if(!this.transition)return this.genContent();return this.$createElement('transition',{props:{name:this.transition}},[this.genContent()]);},genDirectives:function genDirectives(){var _this=this;// Do not add click outside for hover menu
var directives=!this.openOnHover?[{name:'click-outside',value:function value(){return _this.isActive=false;},args:{closeConditional:this.closeConditional,include:function include(){return[_this.$el].concat(_toConsumableArray(_this.getOpenDependentElements()));}}}]:[];directives.push({name:'show',value:this.isContentActive});return directives;},genContent:function genContent(){var _class,_this2=this;var options={staticClass:'menu__content','class':(_class={},_defineProperty(_class,this.contentClass.trim(),true),_defineProperty(_class,'menuable__content__active',this.isActive),_defineProperty(_class,'theme--dark',this.dark),_defineProperty(_class,'theme--light',this.light),_class),style:this.styles,directives:this.genDirectives(),ref:'content',on:{click:function click(e){e.stopPropagation();if(e.target.getAttribute('disabled'))return;if(_this2.closeOnContentClick)_this2.isActive=false;}}};!this.disabled&&this.openOnHover&&(options.on.mouseenter=this.mouseEnterHandler);this.openOnHover&&(options.on.mouseleave=this.mouseLeaveHandler);return this.$createElement('div',options,this.showLazyContent(this.$slots.default));}}};/***/},/* 142 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/**
 * Menu keyable
 *
 * @mixin
 *
 * Primarily used to support VSelect
 * Handles opening and closing of VMenu from keystrokes
 * Will conditionally highlight VListTiles for VSelect
 *//* harmony default export */__webpack_exports__["a"]={data:function data(){return{listIndex:-1,tiles:[]};},watch:{isActive:function isActive(val){if(!val)this.listIndex=-1;},listIndex:function listIndex(next,prev){// For infinite scroll and autocomplete, re-evaluate children
this.getTiles();if(next in this.tiles){var tile=this.tiles[next];tile.classList.add('list__tile--highlighted');this.$refs.content.scrollTop=tile.offsetTop-tile.clientHeight;}prev in this.tiles&&this.tiles[prev].classList.remove('list__tile--highlighted');}},methods:{changeListIndex:function changeListIndex(e){// Up, Down, Enter, Space
if([40,38,13].includes(e.keyCode)||e.keyCode===32&&!this.isActive){e.preventDefault();}// Esc, Tab
if([27,9].includes(e.keyCode))return this.isActive=false;else if(!this.isActive&&// Enter, Space
[13,32].includes(e.keyCode)&&this.openOnClick){return this.isActive=true;}// Down
if(e.keyCode===40&&this.listIndex<this.tiles.length-1){this.listIndex++;// Up
}else if(e.keyCode===38&&this.listIndex>0){this.listIndex--;// Enter
}else if(e.keyCode===13&&this.listIndex!==-1){this.tiles[this.listIndex].click();}},getTiles:function getTiles(){this.tiles=this.$refs.content.querySelectorAll('.list__tile');}}};/***/},/* 143 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/**
 * Menu position
 *
 * @mixin
 *
 * Used for calculating an automatic position (used for VSelect)
 * Will position the VMenu content properly over the VSelect
 *//* harmony default export */__webpack_exports__["a"]={methods:{// Revisit this
calculateScroll:function calculateScroll(){if(this.selectedIndex===null)return;var scrollTop=0;if(this.selectedIndex>=this.stopIndex){scrollTop=this.$refs.content.scrollHeight;}else if(this.selectedIndex>this.startIndex){scrollTop=this.selectedIndex*(this.defaultOffset*6)-this.defaultOffset*7;}this.$refs.content.scrollTop=scrollTop;},calcLeftAuto:function calcLeftAuto(){if(this.isAttached)return 0;return parseInt(this.dimensions.activator.left-this.defaultOffset*2);},calcTopAuto:function calcTopAuto(){var selectedIndex=Array.from(this.tiles).findIndex(function(n){return n.classList.contains('list__tile--active');});if(selectedIndex===-1){this.selectedIndex=null;return this.computedTop;}this.selectedIndex=selectedIndex;var actingIndex=selectedIndex;var offsetPadding=-(this.defaultOffset*2);// #708 Stop index should vary by tile length
this.stopIndex=this.tiles.length>4?this.tiles.length-4:this.tiles.length;if(selectedIndex>this.startIndex&&selectedIndex<this.stopIndex){actingIndex=2;offsetPadding=this.defaultOffset*3;}else if(selectedIndex>=this.stopIndex){offsetPadding=-this.defaultOffset;actingIndex=selectedIndex-this.stopIndex;}// Is always off by 1 pixel, send help (┛ಠ_ಠ)┛彡┻━┻
offsetPadding--;return this.computedTop+offsetPadding-actingIndex*(this.defaultOffset*6);}}};/***/},/* 144 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* unused harmony export defaultDelimiters *//* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"a",function(){return isMaskDelimiter;});/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"b",function(){return maskText;});/* harmony export (binding) */__webpack_require__.d(__webpack_exports__,"c",function(){return unmaskText;});/**
 * Default delimiter RegExp
 *
 * @type {RegExp}
 */var defaultDelimiters=/[-!$%^&*()_+|~=`{}[\]:";'<>?,./\\ ]/;/**
 *
 * @param {String} char
 *
 * @return {Boolean}
 */var isMaskDelimiter=function isMaskDelimiter(char){return char&&defaultDelimiters.test(char);};/**
 * Mask keys
 *
 * @type {Object}
 */var allowedMasks={'#':{test:function test(char){return char.match(/[0-9]/);}},'A':{test:function test(char){return char.match(/[A-Z]/i);},convert:function convert(char){return char.toUpperCase();}},'a':{test:function test(char){return char.match(/[a-z]/i);},convert:function convert(char){return char.toLowerCase();}},'N':{test:function test(char){return char.match(/[0-9A-Z]/i);},convert:function convert(char){return char.toUpperCase();}},'n':{test:function test(char){return char.match(/[0-9a-z]/i);},convert:function convert(char){return char.toLowerCase();}},'X':{test:isMaskDelimiter/**
   * Is Character mask
   *
   * @param  {String} char
   *
   * @return {Boolean}
   */}};var isMask=function isMask(char){return allowedMasks.hasOwnProperty(char);};/**
 * Automatically convert char case
 *
 * @param  {String} mask
 * @param  {String} char
 *
 * @return {String}
 */var convert=function convert(mask,char){return allowedMasks[mask].convert?allowedMasks[mask].convert(char):char;};/**
 * Mask Validation
 *
 * @param  {String} mask
 * @param  {String} char
 *
 * @return {Boolean}
 */var maskValidates=function maskValidates(mask,char){if(char==null||!isMask(mask))return false;return allowedMasks[mask].test(char);};/**
 * Mask Text
 *
 * Takes a string or an array of characters
 * and returns a masked string
 *
 * @param {*} text
 * @param {Array|String} masked
 * @param {Boolean} [dontFillMaskBlanks]
 *
 * @return {String}
 */var maskText=function maskText(text,masked,dontFillMaskBlanks){if(text==null)return'';text=String(text);if(!masked.length||!text.length)return text;if(!Array.isArray(masked))masked=masked.split('');var textIndex=0;var maskIndex=0;var newText='';while(maskIndex<masked.length){var mask=masked[maskIndex];// Assign the next character
var char=text[textIndex];// Check if mask is delimiter
// and current char matches
if(!isMask(mask)&&char===mask){newText+=mask;textIndex++;// Check if not mask
}else if(!isMask(mask)&&!dontFillMaskBlanks){newText+=mask;// Check if is mask and validates
}else if(maskValidates(mask,char)){newText+=convert(mask,char);textIndex++;}else{return newText;}maskIndex++;}return newText;};/**
 * Unmask Text
 *
 * @param {String} text
 *
 * @return {String}
 */var unmaskText=function unmaskText(text){return text?String(text).replace(new RegExp(defaultDelimiters,'g'),''):text;};/***/},/* 145 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__util_helpers__=__webpack_require__(2);/**
 * Select autocomplete
 *
 * @mixin
 *
 * Handles logic when using the "autocomplete" prop
 *//* harmony default export */__webpack_exports__["a"]={props:{filter:{type:Function,default:function _default(item,queryText,itemText){var hasValue=function hasValue(val){return val!=null?val:'';};var text=hasValue(itemText);var query=hasValue(queryText);return text.toString().toLowerCase().indexOf(query.toString().toLowerCase())>-1;}}},methods:{filterSearch:function filterSearch(){var _this=this;if(!this.isAutocomplete)return this.computedItems;return this.computedItems.filter(function(i){return _this.filter(i,_this.searchValue,_this.getText(i));});},genFiltered:function genFiltered(text){text=(text||'').toString();if(!this.isAutocomplete||!this.searchValue||this.filteredItems.length<1)return Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["f"/* escapeHTML */])(text);var _getMaskedCharacters=this.getMaskedCharacters(text),start=_getMaskedCharacters.start,middle=_getMaskedCharacters.middle,end=_getMaskedCharacters.end;return''+Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["f"/* escapeHTML */])(start)+this.genHighlight(middle)+Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["f"/* escapeHTML */])(end);},genHighlight:function genHighlight(text){if(this.isNotFiltering)return Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["f"/* escapeHTML */])(text);return'<span class="list__tile__mask">'+Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["f"/* escapeHTML */])(text)+'</span>';},getMaskedCharacters:function getMaskedCharacters(text){var searchValue=(this.searchValue||'').toString().toLowerCase();var index=text.toLowerCase().indexOf(searchValue);if(index<0)return{start:'',middle:text,end:''};var start=text.slice(0,index);var middle=text.slice(index,index+searchValue.length);var end=text.slice(index+searchValue.length);return{start:start,middle:middle,end:end};},getCurrentTag:function getCurrentTag(){return this.isMenuItemSelected()?this.filteredItems[this.getMenuIndex()]:this.isAnyValueAllowed?this.searchValue:null;},tabOut:function tabOut(){this.blur();},onTabDown:function onTabDown(e){var _this2=this;// If tabbing through inputs and
// and there is no need for an
// update, blur the v-select
if(!this.isAutocomplete||!this.getCurrentTag()||this.combobox)return this.tabOut();var menuIndex=this.getMenuIndex();// When adding tags, if searching and
// there is not a filtered options,
// add the value to the tags list
if(this.tags&&this.searchValue&&menuIndex===-1){e.preventDefault();return this.updateTags(this.searchValue);}// An item that is selected by
// menu-index should toggled
if(this.menuIsActive){// Reset the list index if searching
this.searchValue&&this.$nextTick(function(){return setTimeout(_this2.resetMenuIndex,0);});e.preventDefault();this.selectListTile(menuIndex);}},onEnterDown:function onEnterDown(){this.updateTags(this.getCurrentTag());},onEscDown:function onEscDown(e){e.preventDefault();this.menuIsActive=false;},onKeyDown:function onKeyDown(e){var _this3=this;// If enter, space, up, or down is pressed, open menu
if(!this.menuIsActive&&[13,32,38,40].includes(e.keyCode)){e.preventDefault();return this.showMenu();}// If escape deactivate the menu
if(e.keyCode===27)return this.onEscDown(e);// If tab - select item or close menu
if(e.keyCode===9)return this.onTabDown(e);if(!this.isAutocomplete||![32].includes(e.keyCode)// space
)this.$refs.menu.changeListIndex(e);// Up or down
if([38,40].includes(e.keyCode))this.selectedIndex=-1;if(this.isAutocomplete&&!this.hideSelections&&!this.searchValue)this.changeSelectedIndex(e.keyCode);if(!this.isAnyValueAllowed||!this.searchValue)return;// Enter
if(e.keyCode===13)return this.onEnterDown();// Left arrow
if(e.keyCode===37&&this.$refs.input.selectionStart===0&&this.selectedItems.length){this.updateTags(this.searchValue);this.$nextTick(function(){_this3.selectedIndex=Math.max(_this3.selectedItems.length-2,0);});}// Right arrow
if(e.keyCode===39&&this.$refs.input.selectionEnd===this.searchValue.length){this.resetMenuIndex();}},selectListTile:function selectListTile(index){if(!this.$refs.menu.tiles[index])return;this.$refs.menu.tiles[index].click();},updateTags:function updateTags(content){var _this4=this;// Avoid direct mutation
// for vuex strict mode
var selectedItems=this.selectedItems.slice();// If a duplicate item
// exists, remove it
if(selectedItems.includes(content)){this.$delete(selectedItems,selectedItems.indexOf(content));}// When updating tags ensure
// that that the search text
// is populated if needed
var searchValue=null;if(this.combobox){selectedItems=[content];searchValue=this.chips?null:content;}else{selectedItems.push(content);}this.selectedItems=selectedItems;this.$nextTick(function(){_this4.searchValue=searchValue;_this4.$emit('input',_this4.combobox?content:_this4.selectedItems);});}}};/***/},/* 146 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};/**
 * Select computed properties
 *
 * @mixin
 *
 * Computed properties for
 * the v-select component
 *//* harmony default export */__webpack_exports__["a"]={computed:{classes:function classes(){var classes=_extends({},this.genSoloClasses(),{'input-group--text-field input-group--select':true,'input-group--auto':this.auto,'input-group--overflow':this.overflow,'input-group--segmented':this.segmented,'input-group--editable':this.editable,'input-group--autocomplete':this.isAutocomplete,'input-group--single-line':this.singleLine||this.isDropdown,'input-group--multi-line':this.multiLine,'input-group--chips':this.chips,'input-group--multiple':this.multiple,'input-group--open':this.menuIsVisible,'input-group--select--selecting-index':this.selectedIndex>-1});if(this.hasError){classes['error--text']=true;}else{return this.addTextColorClassChecks(classes);}return classes;},computedContentClass:function computedContentClass(){var children=['menu__content--select',this.auto?'menu__content--auto':'',this.isDropdown?'menu__content--dropdown':'',this.isAutocomplete?'menu__content--autocomplete':'',this.contentClass||''];return children.join(' ');},computedItems:function computedItems(){return this.filterDuplicates(this.cachedItems.concat(this.items));},/**
     * The range of the current input text
     *
     * @return {Number}
     */currentRange:function currentRange(){if(this.selectedItem==null)return 0;return this.getText(this.selectedItem).toString().length;},filteredItems:function filteredItems(){// If we are not actively filtering
// Show all available items
var items=this.isNotFiltering?this.computedItems:this.filterSearch();return!this.auto?items.slice(0,this.lastItem):items;},hideSelections:function hideSelections(){return this.isAutocomplete&&!this.isMultiple&&this.isFocused&&!this.chips&&!this.$scopedSlots.selection;},isNotFiltering:function isNotFiltering(){return this.isAutocomplete&&this.isDirty&&this.searchValue===this.getText(this.selectedItem);},isHidingSelected:function isHidingSelected(){return this.hideSelected&&this.isAutocomplete&&this.isMultiple;},isAutocomplete:function isAutocomplete(){return this.autocomplete||this.editable||this.tags||this.combobox;},isDirty:function isDirty(){return this.selectedItems.length>0||this.isAutocomplete&&this.searchValue;},isDropdown:function isDropdown(){return this.segmented||this.overflow||this.editable||this.isSolo;},isMultiple:function isMultiple(){return this.multiple||this.tags;},isAnyValueAllowed:function isAnyValueAllowed(){return this.tags||this.combobox;},menuIsVisible:function menuIsVisible(){return this.menuIsActive&&this.computedItems.length>0&&(!this.isAnyValueAllowed||this.filteredItems.length>0);},menuItems:function menuItems(){var _this=this;return this.isHidingSelected?this.filteredItems.filter(function(o){return(_this.selectedItems||[]).indexOf(o)===-1;}):this.filteredItems;},nudgeTop:function nudgeTop(){var nudgeTop=-18;if(this.isSolo)nudgeTop=0;else if(this.shouldOffset){nudgeTop+=44;nudgeTop+=this.hideDetails?-24:0;nudgeTop+=this.isAutocomplete&&!this.isDropdown?-2:0;}return nudgeTop;},searchValue:{get:function get(){return this.lazySearch;},set:function set(val){if(!this.isAutocomplete||!this.multiple&&this.selectedIndex>-1)return;this.lazySearch=val;this.$emit('update:searchInput',val);}},selectedItem:function selectedItem(){var _this2=this;if(this.isMultiple)return null;return this.selectedItems.find(function(i){return _this2.getValue(i)===_this2.getValue(_this2.inputValue);});},shouldOffset:function shouldOffset(){return this.isAutocomplete||this.isDropdown;}}};/***/},/* 147 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};/**
 * Select events
 *
 * @mixin
 *
 * Event based methods for
 * the v-select component
 *//* harmony default export */__webpack_exports__["a"]={methods:{blur:function blur(){this.deactivateInput();this.menuIsActive=false;this.$emit('blur');},focus:function focus(){this.showMenu();this.$emit('focus');},focusInput:function focusInput(){var _this=this;if(this.$refs.input&&this.isAutocomplete){this.$refs.input.focus();this.$nextTick(function(){_this.$refs.input.select();_this.shouldBreak&&(_this.$refs.input.scrollLeft=_this.$refs.input.scrollWidth);});}else{!this.isFocused&&this.$el.focus();}},genListeners:function genListeners(){var _this2=this;var listeners=Object.assign({},this.$listeners);delete listeners.input;return _extends({},listeners,{click:function click(){if(_this2.disabled||_this2.readonly)return;if(_this2.isFocused&&!_this2.menuIsVisible){return _this2.showMenuItems();}_this2.selectedIndex>-1?_this2.selectedIndex=-1:_this2.focus();},focus:function focus(e){if(_this2.disabled||_this2.readonly||_this2.isFocused){return;}_this2.activateInput();_this2.$nextTick(_this2.focusInput);},keydown:this.onKeyDown// Located in mixins/select-autocomplete.js
});}}};/***/},/* 148 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__util_helpers__=__webpack_require__(2);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__util_console__=__webpack_require__(6);var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}else{return Array.from(arr);}}/**
 * Select generators
 *
 * @mixin
 *
 * Used for creating the DOM elements for VSelect
 *//* harmony default export */__webpack_exports__["a"]={methods:{genMenu:function genMenu(){var _this=this;var data={ref:'menu',props:{activator:this.$el,auto:this.auto,attach:this.attach&&'[data-uid="'+this._uid+'"]',closeOnClick:false,closeOnContentClick:!this.isMultiple,contentClass:this.computedContentClass,dark:this.dark,disabled:this.disabled,light:this.light,maxHeight:this.maxHeight,nudgeTop:this.nudgeTop,offsetY:this.shouldOffset,offsetOverflow:this.isAutocomplete,openOnClick:false,value:this.menuIsVisible,zIndex:this.menuZIndex},on:{input:function input(val){if(!val){_this.menuIsActive=false;}}}};if(this.isAutocomplete)data.props.transition='';this.minWidth&&(data.props.minWidth=this.minWidth);return this.$createElement('v-menu',data,[this.genList()]);},getMenuIndex:function getMenuIndex(){return this.$refs.menu?this.$refs.menu.listIndex:-1;},setMenuIndex:function setMenuIndex(index){this.$refs.menu&&(this.$refs.menu.listIndex=index);},resetMenuIndex:function resetMenuIndex(){this.setMenuIndex(-1);},isMenuItemSelected:function isMenuItemSelected(){return this.menuIsActive&&this.menuItems.length&&this.getMenuIndex()>-1;},genSelectionsAndSearch:function genSelectionsAndSearch(){return this.$createElement('div',{'class':'input-group__selections',style:{'overflow':'hidden'},ref:'activator'},[].concat(_toConsumableArray(this.genSelections()),[this.genSearch()]));},genSelections:function genSelections(){if(this.hideSelections)return[];var length=this.selectedItems.length;var children=new Array(length);var genSelection=void 0;if(this.$scopedSlots.selection){genSelection=this.genSlotSelection;}else if(this.chips){genSelection=this.genChipSelection;}else if(this.segmented){genSelection=this.genSegmentedBtn;}else{genSelection=this.genCommaSelection;}while(length--){children[length]=genSelection(this.selectedItems[length],length,length===children.length-1);}return children;},genSearch:function genSearch(){var _this2=this;var data={staticClass:'input-group--select__autocomplete','class':{'input-group--select__autocomplete--index':this.selectedIndex>-1},style:{flex:this.shouldBreak?'1 0 100%':null},attrs:_extends({},this.$attrs,{disabled:this.disabled||!this.isAutocomplete,readonly:this.readonly,tabindex:this.disabled||!this.isAutocomplete?-1:this.tabindex}),domProps:{value:this.maskText(this.lazySearch||'')},directives:[{name:'show',value:this.isAutocomplete||this.placeholder&&!this.selectedItems.length}],ref:'input',key:'input'};if(this.isAutocomplete){data.attrs.role='combobox';data.domProps.autocomplete=this.browserAutocomplete;data.on=_extends({},this.genListeners(),{input:function input(e){if(_this2.selectedIndex>-1)return;_this2.searchValue=_this2.unmaskText(e.target.value);}});data.directives=data.directives.concat(this.genDirectives());}if(this.placeholder)data.domProps.placeholder=this.placeholder;return this.$createElement('input',data);},genSegmentedBtn:function genSegmentedBtn(item){if(!item.text||!item.callback){Object(__WEBPACK_IMPORTED_MODULE_1__util_console__["b"/* consoleWarn */])('When using \'segmented\' prop without a selection slot, items must contain both a text and callback property',this);return null;}return this.$createElement('v-btn',{props:{flat:true},on:{click:function click(e){e.stopPropagation();item.callback(e);}}},[item.text]);},genSlotSelection:function genSlotSelection(item,index){return this.$scopedSlots.selection({parent:this,item:item,index:index,selected:index===this.selectedIndex,disabled:this.disabled||this.readonly});},genChipSelection:function genChipSelection(item,index){var _this3=this;var isDisabled=this.disabled||this.readonly;var click=function click(e){if(isDisabled)return;e.stopPropagation();_this3.focusInput();_this3.selectedIndex=index;};return this.$createElement('v-chip',{staticClass:'chip--select-multi',attrs:{tabindex:'-1'},props:{close:this.deletableChips&&!isDisabled,dark:this.dark,disabled:isDisabled,selected:index===this.selectedIndex},on:{click:click,focus:click,input:function input(){if(_this3.isMultiple)_this3.selectItem(item);else _this3.inputValue=null;}},key:this.getValue(item)},this.getText(item));},genCommaSelection:function genCommaSelection(item,index,last){return this.$createElement('div',{staticClass:'input-group__selections__comma','class':{'input-group__selections__comma--active':index===this.selectedIndex},key:JSON.stringify(this.getValue(item))// Item may be an object
},''+this.getText(item)+(last?'':', '));},genList:function genList(){var _this4=this;var children=this.menuItems.map(function(o){if(o.header)return _this4.genHeader(o);if(o.divider)return _this4.genDivider(o);else return _this4.genTile(o);});if(!children.length){var noData=this.$slots['no-data'];if(noData){children.push(noData);}else{children.push(this.genTile(this.noDataText,true));}}return this.$createElement('v-card',[this.$createElement('v-list',{props:{dense:this.dense},ref:'list'},children)]);},genHeader:function genHeader(item){return this.$createElement('v-subheader',{props:item},item.header);},genDivider:function genDivider(item){return this.$createElement('v-divider',{props:item});},genLabel:function genLabel(){var singleLine=this.singleLine||this.isDropdown;if(singleLine&&(this.isDirty||this.isFocused&&this.searchValue))return null;var data={};if(this.id)data.attrs={for:this.id};return this.$createElement('label',data,this.$slots.label||this.label);},genTile:function genTile(item,disabled){var _this5=this;var active=this.selectedItems.indexOf(item)!==-1;if(typeof disabled==='undefined'){disabled=Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["h"/* getObjectValueByPath */])(item,this.itemDisabled);}var data={on:{click:function click(e){if(disabled)return;_this5.selectItem(item);}},props:{avatar:item===Object(item)&&this.itemAvatar in item,ripple:true,value:active}};if(disabled){data.props.disabled=disabled;}data.props.activeClass=Object.keys(this.addTextColorClassChecks()).join(' ');if(this.$scopedSlots.item){var tile=this.$scopedSlots.item({parent:this,item:item,tile:data});return this.needsTile(tile)?this.$createElement('v-list-tile',data,[tile]):tile;}return this.$createElement('v-list-tile',data,[this.genAction(item,active),this.genContent(item)]);},genAction:function genAction(item,active){var _this6=this;if(!this.isMultiple||this.isHidingSelected)return null;var data={staticClass:'list__tile__action--select-multi',on:{click:function click(e){e.stopPropagation();_this6.selectItem(item);}}};return this.$createElement('v-list-tile-action',data,[this.$createElement('v-checkbox',{props:{color:this.computedColor,inputValue:active}})]);},genContent:function genContent(item){var text=this.getText(item);return this.$createElement('v-list-tile-content',[this.$createElement('v-list-tile-title',{domProps:{innerHTML:this.genFiltered(text)}})]);}}};/***/},/* 149 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__util_helpers__=__webpack_require__(2);// Helpers
/**
 * Select helpers
 *
 * @mixin
 *
 * Helper methods for the
 * v-select component
 *//* harmony default export */__webpack_exports__["a"]={methods:{getText:function getText(item){return this.getPropertyFromItem(item,this.itemText);},getValue:function getValue(item){return this.getPropertyFromItem(item,this.itemValue);},getPropertyFromItem:function getPropertyFromItem(item,field){if(item!==Object(item))return item;var value=Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["h"/* getObjectValueByPath */])(item,field);return typeof value==='undefined'?item:value;}}};/***/},/* 150 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/**
 * Select menu methods
 *
 * @mixin
 *
 * Menu based methods for
 * the v-select component
 *//* harmony default export */__webpack_exports__["a"]={methods:{activateInput:function activateInput(){this.isActive=true;this.isFocused=true;},deactivateInput:function deactivateInput(){this.isFocused=false;this.isActive=false;this.selectedIndex=-1;},hideMenu:function hideMenu(){this.menuIsActive=false;},showMenu:function showMenu(){this.activateInput();this.showMenuItems();this.isMultiple&&this.resetMenuIndex();},showMenuItems:function showMenuItems(){this.menuIsActive=true;},toggleMenu:function toggleMenu(){if(this.disabled||this.readonly||this.menuIsVisible)return this.hideMenu();this.showMenu();this.focusInput();}}};/***/},/* 151 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony default export */__webpack_exports__["a"]={props:{appendIcon:{type:String,default:'arrow_drop_down'},appendIconCb:Function,attach:Boolean,auto:Boolean,autocomplete:Boolean,browserAutocomplete:{type:String,default:'on'},cacheItems:Boolean,chips:Boolean,clearable:Boolean,combobox:Boolean,contentClass:String,deletableChips:Boolean,dense:Boolean,editable:Boolean,hideSelected:Boolean,items:{type:Array,default:function _default(){return[];}},itemAvatar:{type:String,default:'avatar'},itemDisabled:{type:String,default:'disabled'},itemText:{type:String,default:'text'},itemValue:{type:String,default:'value'},maxHeight:{type:[Number,String],default:300},minWidth:{type:[Boolean,Number,String],default:false},multiple:Boolean,multiLine:Boolean,openOnClear:Boolean,overflow:Boolean,returnObject:Boolean,searchInput:{default:null},segmented:Boolean,singleLine:Boolean,tags:Boolean,valueComparator:{type:Function,default:function _default(a,b){if(a!==Object(a))return a===b;var aProps=Object.keys(a);var bProps=Object.keys(b);return aProps.length===bProps.length&&aProps.every(function(propName){return a[propName]===b[propName];});}}}};/***/},/* 152 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/**
 * Select watchers
 *
 * @mixin
 *
 * Watchers for the
 * v-select component
 *//* harmony default export */__webpack_exports__["a"]={watch:{filteredItems:function filteredItems(){this.$refs.menu&&this.$refs.menu.updateDimensions();},inputValue:function inputValue(val){// Search for an existing item when a
// value was selected from the menu
if(this.combobox&&this.isNotFiltering){val=this.findExistingItem(val);}// Populate selected items
this.genSelectedItems(val);// Only fire an update
// if values do not
// match
val!==this.value&&this.$emit('input',val);// When inputValue is changed
// and combobox is true set
// menu property to false
if(this.combobox)this.menuIsActive=false;},isActive:function isActive(val){if(val){if(!this.chips&&!this.$scopedSlots.selection){this.searchValue=this.getText(this.selectedItem);}return;}this.blur();if(this.tags&&this.searchValue){this.updateTags(this.searchValue);}if(this.combobox&&this.lazySearch&&!this.isNotFiltering){this.inputValue=this.lazySearch;}// Only set search value if
// there is a value to set
this.searchValue&&(this.searchValue=null);},isBooted:function isBooted(){var _this=this;this.$nextTick(function(){if(_this.content&&_this.content.addEventListener){_this.content.addEventListener('scroll',_this.onScroll,false);}});},items:function items(val){var _this2=this;if(this.cacheItems){this.cachedItems=this.filterDuplicates(this.cachedItems.concat(val));}this.resetMenuIndex();// Tags and combobox should not
// pre-select the first entry
if(this.searchValue&&!this.isAnyValueAllowed){this.$nextTick(function(){return _this2.setMenuIndex(0);});}this.genSelectedItems();},menuIsActive:function menuIsActive(val){if(!val)return;this.isBooted=true;},isMultiple:function isMultiple(val){this.inputValue=val?[]:null;},searchInput:function searchInput(val){this.searchValue=val;},searchValue:function searchValue(val,prev){var _this3=this;// Wrap input to next line if overflowing
if(this.$refs.input.scrollWidth>this.$refs.input.clientWidth){this.shouldBreak=true;this.$nextTick(this.$refs.menu.updateDimensions);}else if(val===null){this.shouldBreak=false;}// Activate menu if inactive and searching
if(this.isActive&&!this.menuIsActive&&val!==this.getText(this.selectedItem)){this.menuIsActive=true;}// Only reset list index
// if typing in search
!val&&prev&&this.resetMenuIndex();this.$nextTick(function(){if(val&&!_this3.isAnyValueAllowed){_this3.setMenuIndex(0);}if(val!==null&&_this3.selectedIndex>-1){_this3.selectedIndex=-1;}});},selectedItems:function selectedItems(){if(this.isAutocomplete){this.$nextTick(this.$refs.menu.updateDimensions);}},value:function value(val){this.inputValue=val;this.validate();}}};/***/},/* 153 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* unused harmony export VTableOverflow *//* harmony import */var __WEBPACK_IMPORTED_MODULE_0__util_helpers__=__webpack_require__(2);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__VDataTable__=__webpack_require__(154);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__VEditDialog__=__webpack_require__(163);/* unused harmony reexport VDataTable *//* unused harmony reexport VEditDialog */var VTableOverflow=Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["d"/* createSimpleFunctional */])('table__overflow');/* istanbul ignore next */__WEBPACK_IMPORTED_MODULE_1__VDataTable__["a"/* default */].install=function install(Vue){Vue.component(__WEBPACK_IMPORTED_MODULE_1__VDataTable__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_1__VDataTable__["a"/* default */]);Vue.component(__WEBPACK_IMPORTED_MODULE_2__VEditDialog__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_2__VEditDialog__["a"/* default */]);Vue.component(VTableOverflow.name,VTableOverflow);};/* harmony default export */__webpack_exports__["a"]=__WEBPACK_IMPORTED_MODULE_1__VDataTable__["a"/* default */];/***/},/* 154 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_tables_styl__=__webpack_require__(155);/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_tables_styl___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_tables_styl__);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__stylus_components_data_table_styl__=__webpack_require__(156);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__stylus_components_data_table_styl___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__stylus_components_data_table_styl__);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__mixins_data_iterable__=__webpack_require__(43);/* harmony import */var __WEBPACK_IMPORTED_MODULE_3__VProgressLinear__=__webpack_require__(53);/* harmony import */var __WEBPACK_IMPORTED_MODULE_4__mixins_head__=__webpack_require__(159);/* harmony import */var __WEBPACK_IMPORTED_MODULE_5__mixins_body__=__webpack_require__(160);/* harmony import */var __WEBPACK_IMPORTED_MODULE_6__mixins_foot__=__webpack_require__(161);/* harmony import */var __WEBPACK_IMPORTED_MODULE_7__mixins_progress__=__webpack_require__(162);/* harmony import */var __WEBPACK_IMPORTED_MODULE_8__util_helpers__=__webpack_require__(2);/* harmony default export */__webpack_exports__["a"]={name:'v-data-table',components:{VProgressLinear:__WEBPACK_IMPORTED_MODULE_3__VProgressLinear__["a"/* default */],// Importing does not work properly
'v-table-overflow':Object(__WEBPACK_IMPORTED_MODULE_8__util_helpers__["d"/* createSimpleFunctional */])('table__overflow')},data:function data(){return{actionsClasses:'datatable__actions',actionsRangeControlsClasses:'datatable__actions__range-controls',actionsSelectClasses:'datatable__actions__select',actionsPaginationClasses:'datatable__actions__pagination'};},mixins:[__WEBPACK_IMPORTED_MODULE_2__mixins_data_iterable__["a"/* default */],__WEBPACK_IMPORTED_MODULE_4__mixins_head__["a"/* default */],__WEBPACK_IMPORTED_MODULE_5__mixins_body__["a"/* default */],__WEBPACK_IMPORTED_MODULE_6__mixins_foot__["a"/* default */],__WEBPACK_IMPORTED_MODULE_7__mixins_progress__["a"/* default */]],props:{headers:{type:Array,default:function _default(){return[];}},headerText:{type:String,default:'text'},hideHeaders:Boolean,rowsPerPageText:{type:String,default:'Rows per page:'},customFilter:{type:Function,default:function _default(items,search,filter,headers){search=search.toString().toLowerCase();if(search.trim()==='')return items;var props=headers.map(function(h){return h.value;});return items.filter(function(item){return props.some(function(prop){return filter(Object(__WEBPACK_IMPORTED_MODULE_8__util_helpers__["h"/* getObjectValueByPath */])(item,prop),search);});});}}},computed:{classes:function classes(){return{'datatable table':true,'datatable--select-all':this.selectAll!==false,'theme--dark':this.dark,'theme--light':this.light};},filteredItems:function filteredItems(){return this.filteredItemsImpl(this.headers);},headerColumns:function headerColumns(){return this.headers.length+(this.selectAll!==false);}},methods:{hasTag:function hasTag(elements,tag){return Array.isArray(elements)&&elements.find(function(e){return e.tag===tag;});},genTR:function genTR(children){var data=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};return this.$createElement('tr',data,children);}},created:function created(){var firstSortable=this.headers.find(function(h){return!('sortable'in h)||h.sortable;});this.defaultPagination.sortBy=!this.disableInitialSort&&firstSortable?firstSortable.value:null;this.initPagination();},render:function render(h){var tableOverflow=h('v-table-overflow',{},[h('table',{'class':this.classes},[this.genTHead(),this.genTBody(),this.genTFoot()])]);return h('div',[tableOverflow,this.genActionsFooter()]);}};/***/},/* 155 *//***/function(module,exports){// removed by extract-text-webpack-plugin
/***/},/* 156 *//***/function(module,exports){// removed by extract-text-webpack-plugin
/***/},/* 157 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_progress_linear_styl__=__webpack_require__(158);/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_progress_linear_styl___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_progress_linear_styl__);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__mixins_colorable__=__webpack_require__(0);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__transitions__=__webpack_require__(7);function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}/* harmony default export */__webpack_exports__["a"]={name:'v-progress-linear',components:{VFadeTransition:__WEBPACK_IMPORTED_MODULE_2__transitions__["b"/* VFadeTransition */],VSlideXTransition:__WEBPACK_IMPORTED_MODULE_2__transitions__["d"/* VSlideXTransition */]},mixins:[__WEBPACK_IMPORTED_MODULE_1__mixins_colorable__["a"/* default */]],props:{active:{type:Boolean,default:true},backgroundColor:{type:String,default:null},backgroundOpacity:{type:[Number,String],default:null},bufferValue:{type:[Number,String],default:100},color:{type:String,default:'primary'},height:{type:[Number,String],default:7},indeterminate:Boolean,query:Boolean,value:{type:[Number,String],default:0}},computed:{styles:function styles(){var styles={};if(!this.active){styles.height=0;}if(!this.indeterminate&&parseInt(this.bufferValue,10)!==100){styles.width=this.bufferValue+'%';}return styles;},effectiveWidth:function effectiveWidth(){if(!this.bufferValue){return 0;}return this.value*100/this.bufferValue;},backgroundStyle:function backgroundStyle(){var backgroundOpacity=this.backgroundOpacity==null?this.backgroundColor?1:0.3:parseFloat(this.backgroundOpacity);return{height:this.active?this.height+'px':0,opacity:backgroundOpacity,width:this.bufferValue+'%'};}},methods:{genDeterminate:function genDeterminate(h){return h('div',{ref:'front',staticClass:'progress-linear__bar__determinate',class:this.addBackgroundColorClassChecks(),style:{width:this.effectiveWidth+'%'}});},genBar:function genBar(h,name){return h('div',{staticClass:'progress-linear__bar__indeterminate',class:this.addBackgroundColorClassChecks(_defineProperty({},name,true))});},genIndeterminate:function genIndeterminate(h){return h('div',{ref:'front',staticClass:'progress-linear__bar__indeterminate',class:{'progress-linear__bar__indeterminate--active':this.active}},[this.genBar(h,'long'),this.genBar(h,'short')]);}},render:function render(h){var fade=h('v-fade-transition',[this.indeterminate&&this.genIndeterminate(h)]);var slide=h('v-slide-x-transition',[!this.indeterminate&&this.genDeterminate(h)]);var bar=h('div',{staticClass:'progress-linear__bar',style:this.styles},[fade,slide]);var background=h('div',{staticClass:'progress-linear__background',class:[this.backgroundColor||this.color],style:this.backgroundStyle});return h('div',{staticClass:'progress-linear',class:{'progress-linear--query':this.query},style:{height:this.height+'px'},on:this.$listeners},[background,bar]);}};/***/},/* 158 *//***/function(module,exports){// removed by extract-text-webpack-plugin
/***/},/* 159 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__util_console__=__webpack_require__(6);function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}else{return Array.from(arr);}}/* harmony default export */__webpack_exports__["a"]={props:{sortIcon:{type:String,default:'arrow_upward'}},methods:{genTHead:function genTHead(){var _this=this;if(this.hideHeaders)return;// Exit Early since no headers are needed.
var children=[];if(this.$scopedSlots.headers){var row=this.$scopedSlots.headers({headers:this.headers,indeterminate:this.indeterminate,all:this.everyItem});children=[this.hasTag(row,'th')?this.genTR(row):row,this.genTProgress()];}else{var _row=this.headers.map(function(o){return _this.genHeader(o);});var checkbox=this.$createElement('v-checkbox',{props:{dark:this.dark,light:this.light,color:this.selectAll===true?'':this.selectAll,hideDetails:true,inputValue:this.everyItem,indeterminate:this.indeterminate},on:{change:this.toggle}});this.hasSelectAll&&_row.unshift(this.$createElement('th',[checkbox]));children=[this.genTR(_row),this.genTProgress()];}return this.$createElement('thead',[children]);},genHeader:function genHeader(header){var array=[this.$scopedSlots.headerCell?this.$scopedSlots.headerCell({header:header}):header[this.headerText]];return this.$createElement.apply(this,['th'].concat(_toConsumableArray(this.genHeaderData(header,array))));},genHeaderData:function genHeaderData(header,children){var classes=['column'];var data={key:header[this.headerText],attrs:{role:'columnheader',scope:'col',width:header.width||null,'aria-label':header[this.headerText]||'','aria-sort':'none'}};if(header.sortable==null||header.sortable){this.genHeaderSortingData(header,children,data,classes);}else{data.attrs['aria-label']+=': Not sorted.';// TODO: Localization
}classes.push('text-xs-'+(header.align||'left'));if(Array.isArray(header.class)){classes.push.apply(classes,_toConsumableArray(header.class));}else if(header.class){classes.push(header.class);}data.class=classes;return[data,children];},genHeaderSortingData:function genHeaderSortingData(header,children,data,classes){var _this2=this;if(!('value'in header)){Object(__WEBPACK_IMPORTED_MODULE_0__util_console__["b"/* consoleWarn */])('Headers must have a value property that corresponds to a value in the v-model array',this);}data.attrs.tabIndex=0;data.on={click:function click(){_this2.expanded={};_this2.sort(header.value);},keydown:function keydown(e){// check for space
if(e.keyCode===32){e.preventDefault();_this2.sort(header.value);}}};classes.push('sortable');var icon=this.$createElement('v-icon',{props:{small:true}},this.sortIcon);if(!header.align||header.align==='left'){children.push(icon);}else{children.unshift(icon);}var pagination=this.computedPagination;var beingSorted=pagination.sortBy===header.value;if(beingSorted){classes.push('active');if(pagination.descending){classes.push('desc');data.attrs['aria-sort']='descending';data.attrs['aria-label']+=': Sorted descending. Activate to remove sorting.';// TODO: Localization
}else{classes.push('asc');data.attrs['aria-sort']='ascending';data.attrs['aria-label']+=': Sorted ascending. Activate to sort descending.';// TODO: Localization
}}else{data.attrs['aria-label']+=': Not sorted. Activate to sort ascending.';// TODO: Localization
}}}};/***/},/* 160 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__transitions_expand_transition__=__webpack_require__(39);/* harmony default export */__webpack_exports__["a"]={methods:{genTBody:function genTBody(){var children=this.genItems();return this.$createElement('tbody',children);},genExpandedRow:function genExpandedRow(props){var children=[];if(this.isExpanded(props.item)){var expand=this.$createElement('div',{class:'datatable__expand-content',key:props.item[this.itemKey]},this.$scopedSlots.expand(props));children.push(expand);}var transition=this.$createElement('transition-group',{class:'datatable__expand-col',attrs:{colspan:this.headerColumns},props:{tag:'td'},on:Object(__WEBPACK_IMPORTED_MODULE_0__transitions_expand_transition__["a"/* default */])('datatable__expand-col--expanded')},children);return this.genTR([transition],{class:'datatable__expand-row'});},genFilteredItems:function genFilteredItems(){if(!this.$scopedSlots.items){return null;}var rows=[];for(var index=0,len=this.filteredItems.length;index<len;++index){var item=this.filteredItems[index];var props=this.createProps(item,index);var row=this.$scopedSlots.items(props);rows.push(this.hasTag(row,'td')?this.genTR(row,{key:index,attrs:{active:this.isSelected(item)}}):row);if(this.$scopedSlots.expand){var expandRow=this.genExpandedRow(props);rows.push(expandRow);}}return rows;},genEmptyItems:function genEmptyItems(content){if(this.hasTag(content,'tr')){return content;}else if(this.hasTag(content,'td')){return this.genTR(content);}else{return this.genTR([this.$createElement('td',{class:{'text-xs-center':typeof content==='string'},attrs:{colspan:this.headerColumns}},content)]);}}}};/***/},/* 161 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony default export */__webpack_exports__["a"]={methods:{genTFoot:function genTFoot(){if(!this.$slots.footer){return null;}var footer=this.$slots.footer;var row=this.hasTag(footer,'td')?this.genTR(footer):footer;return this.$createElement('tfoot',[row]);},genActionsFooter:function genActionsFooter(){if(this.hideActions){return null;}return this.$createElement('div',{'class':this.classes},this.genActions());}}};/***/},/* 162 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony default export */__webpack_exports__["a"]={methods:{genTProgress:function genTProgress(){var col=this.$createElement('th',{staticClass:'column',attrs:{colspan:this.headerColumns}},[this.genProgress()]);return this.genTR([col],{staticClass:'datatable__progress'});}}};/***/},/* 163 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_small_dialog_styl__=__webpack_require__(164);/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_small_dialog_styl___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_small_dialog_styl__);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__mixins_returnable__=__webpack_require__(27);// Mixins
/* harmony default export */__webpack_exports__["a"]={name:'v-edit-dialog',mixins:[__WEBPACK_IMPORTED_MODULE_1__mixins_returnable__["a"/* default */]],data:function data(){return{isActive:false,isSaving:false};},props:{cancelText:{default:'Cancel'},large:Boolean,lazy:Boolean,persistent:Boolean,saveText:{default:'Save'},transition:{type:String,default:'slide-x-reverse-transition'}},watch:{isActive:function isActive(val){val&&setTimeout(this.focus,50);// Give DOM time to paint
}},methods:{cancel:function cancel(){this.isActive=false;},focus:function focus(){var input=this.$refs.content.querySelector('input');input&&input.focus();},genButton:function genButton(fn,text){return this.$createElement('v-btn',{props:{flat:true,color:'primary',light:true},on:{click:fn}},text);},genActions:function genActions(){var _this=this;return this.$createElement('div',{'class':'small-dialog__actions'},[this.genButton(this.cancel,this.cancelText),this.genButton(function(){return _this.save(_this.returnValue);},this.saveText)]);},genContent:function genContent(){var _this2=this;return this.$createElement('div',{on:{keydown:function keydown(e){var input=_this2.$refs.content.querySelector('input');e.keyCode===27&&_this2.cancel();e.keyCode===13&&input&&_this2.save(input.value);}},ref:'content'},[this.$slots.input]);}},render:function render(h){var _this3=this;return h('v-menu',{'class':'small-dialog',props:{contentClass:'small-dialog__content',transition:this.transition,origin:'top right',right:true,value:this.isActive,closeOnClick:!this.persistent,closeOnContentClick:false,lazy:this.lazy},on:{input:function input(val){return _this3.isActive=val;}}},[h('a',{slot:'activator'},this.$slots.default),this.genContent(),this.large?this.genActions():null]);}};/***/},/* 164 *//***/function(module,exports){// removed by extract-text-webpack-plugin
/***/},/* 165 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__VDatePicker__=__webpack_require__(166);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__VDatePickerTitle__=__webpack_require__(54);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__VDatePickerHeader__=__webpack_require__(56);/* harmony import */var __WEBPACK_IMPORTED_MODULE_3__VDatePickerDateTable__=__webpack_require__(57);/* harmony import */var __WEBPACK_IMPORTED_MODULE_4__VDatePickerMonthTable__=__webpack_require__(60);/* harmony import */var __WEBPACK_IMPORTED_MODULE_5__VDatePickerYears__=__webpack_require__(61);/* unused harmony reexport VDatePicker *//* unused harmony reexport VDatePickerTitle *//* unused harmony reexport VDatePickerHeader *//* unused harmony reexport VDatePickerDateTable *//* unused harmony reexport VDatePickerMonthTable *//* unused harmony reexport VDatePickerYears *//* istanbul ignore next */__WEBPACK_IMPORTED_MODULE_0__VDatePicker__["a"/* default */].install=function install(Vue){Vue.component(__WEBPACK_IMPORTED_MODULE_0__VDatePicker__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_0__VDatePicker__["a"/* default */]);Vue.component(__WEBPACK_IMPORTED_MODULE_1__VDatePickerTitle__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_1__VDatePickerTitle__["a"/* default */]);Vue.component(__WEBPACK_IMPORTED_MODULE_2__VDatePickerHeader__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_2__VDatePickerHeader__["a"/* default */]);Vue.component(__WEBPACK_IMPORTED_MODULE_3__VDatePickerDateTable__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_3__VDatePickerDateTable__["a"/* default */]);Vue.component(__WEBPACK_IMPORTED_MODULE_4__VDatePickerMonthTable__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_4__VDatePickerMonthTable__["a"/* default */]);Vue.component(__WEBPACK_IMPORTED_MODULE_5__VDatePickerYears__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_5__VDatePickerYears__["a"/* default */]);};/* harmony default export */__webpack_exports__["a"]=__WEBPACK_IMPORTED_MODULE_0__VDatePicker__["a"/* default */];/***/},/* 166 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__VBtn__=__webpack_require__(10);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__VCard__=__webpack_require__(21);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__VIcon__=__webpack_require__(3);/* harmony import */var __WEBPACK_IMPORTED_MODULE_3__VDatePickerTitle__=__webpack_require__(54);/* harmony import */var __WEBPACK_IMPORTED_MODULE_4__VDatePickerHeader__=__webpack_require__(56);/* harmony import */var __WEBPACK_IMPORTED_MODULE_5__VDatePickerDateTable__=__webpack_require__(57);/* harmony import */var __WEBPACK_IMPORTED_MODULE_6__VDatePickerMonthTable__=__webpack_require__(60);/* harmony import */var __WEBPACK_IMPORTED_MODULE_7__VDatePickerYears__=__webpack_require__(61);/* harmony import */var __WEBPACK_IMPORTED_MODULE_8__mixins_picker__=__webpack_require__(62);/* harmony import */var __WEBPACK_IMPORTED_MODULE_9__util__=__webpack_require__(14);/* harmony import */var __WEBPACK_IMPORTED_MODULE_10__util_isDateAllowed__=__webpack_require__(59);var _slicedToArray=function(){function sliceIterator(arr,i){var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[Symbol.iterator](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break;}}catch(err){_d=true;_e=err;}finally{try{if(!_n&&_i["return"])_i["return"]();}finally{if(_d)throw _e;}}return _arr;}return function(arr,i){if(Array.isArray(arr)){return arr;}else if(Symbol.iterator in Object(arr)){return sliceIterator(arr,i);}else{throw new TypeError("Invalid attempt to destructure non-iterable instance");}};}();// Components
// Mixins
// Utils
/* harmony default export */__webpack_exports__["a"]={name:'v-date-picker',components:{VBtn:__WEBPACK_IMPORTED_MODULE_0__VBtn__["a"/* default */],VCard:__WEBPACK_IMPORTED_MODULE_1__VCard__["a"/* default */],VIcon:__WEBPACK_IMPORTED_MODULE_2__VIcon__["a"/* default */],VDatePickerTitle:__WEBPACK_IMPORTED_MODULE_3__VDatePickerTitle__["a"/* default */],VDatePickerHeader:__WEBPACK_IMPORTED_MODULE_4__VDatePickerHeader__["a"/* default */],VDatePickerDateTable:__WEBPACK_IMPORTED_MODULE_5__VDatePickerDateTable__["a"/* default */],VDatePickerMonthTable:__WEBPACK_IMPORTED_MODULE_6__VDatePickerMonthTable__["a"/* default */],VDatePickerYears:__WEBPACK_IMPORTED_MODULE_7__VDatePickerYears__["a"/* default */]},mixins:[__WEBPACK_IMPORTED_MODULE_8__mixins_picker__["a"/* default */]],data:function data(){var _this=this;var now=new Date();return{activePicker:this.type.toUpperCase(),defaultColor:'accent',inputDay:null,inputMonth:null,inputYear:null,isReversing:false,now:now,// tableDate is a string in 'YYYY' / 'YYYY-M' format (leading zero for month is not required)
tableDate:function(){if(_this.pickerDate){return _this.pickerDate;}var date=_this.value||now.getFullYear()+'-'+(now.getMonth()+1);var type=_this.type==='date'?'month':'year';return _this.sanitizeDateString(date,type);}()};},props:{allowedDates:Function,// Function formatting the day in date picker table
dayFormat:{type:Function,default:null},events:{type:[Array,Object,Function],default:function _default(){return null;}},eventColor:{type:[String,Function,Object],default:'warning'},firstDayOfWeek:{type:[String,Number],default:0},// Function formatting the tableDate in the day/month table header
headerDateFormat:{type:Function,default:null},locale:{type:String,default:'en-us'},max:String,min:String,// Function formatting month in the months table
monthFormat:{type:Function,default:null},nextIcon:{type:String,default:'chevron_right'},pickerDate:String,prevIcon:{type:String,default:'chevron_left'},reactive:Boolean,readonly:Boolean,scrollable:Boolean,showCurrent:{type:[Boolean,String],default:true},// Function formatting currently selected date in the picker title
titleDateFormat:{type:Function,default:null},type:{type:String,default:'date',validator:function validator(type){return['date','month'].includes(type);}// TODO: year
},value:String,// Function formatting the year in table header and pickup title
yearFormat:{type:Function,default:null},yearIcon:String},computed:{current:function current(){if(this.showCurrent===true){return this.sanitizeDateString(this.now.getFullYear()+'-'+(this.now.getMonth()+1)+'-'+this.now.getDate(),this.type);}return this.showCurrent||null;},inputDate:function inputDate(){return this.type==='date'?this.inputYear+'-'+Object(__WEBPACK_IMPORTED_MODULE_9__util__["c"/* pad */])(this.inputMonth+1)+'-'+Object(__WEBPACK_IMPORTED_MODULE_9__util__["c"/* pad */])(this.inputDay):this.inputYear+'-'+Object(__WEBPACK_IMPORTED_MODULE_9__util__["c"/* pad */])(this.inputMonth+1);},tableMonth:function tableMonth(){return(this.pickerDate||this.tableDate).split('-')[1]-1;},tableYear:function tableYear(){return(this.pickerDate||this.tableDate).split('-')[0]*1;},minMonth:function minMonth(){return this.min?this.sanitizeDateString(this.min,'month'):null;},maxMonth:function maxMonth(){return this.max?this.sanitizeDateString(this.max,'month'):null;},minYear:function minYear(){return this.min?this.sanitizeDateString(this.min,'year'):null;},maxYear:function maxYear(){return this.max?this.sanitizeDateString(this.max,'year'):null;},formatters:function formatters(){return{year:this.yearFormat||Object(__WEBPACK_IMPORTED_MODULE_9__util__["a"/* createNativeLocaleFormatter */])(this.locale,{year:'numeric',timeZone:'UTC'},{length:4}),titleDate:this.titleDateFormat||this.defaultTitleDateFormatter};},defaultTitleDateFormatter:function defaultTitleDateFormatter(){var titleFormats={year:{year:'numeric',timeZone:'UTC'},month:{month:'long',timeZone:'UTC'},date:{weekday:'short',month:'short',day:'numeric',timeZone:'UTC'}};var titleDateFormatter=Object(__WEBPACK_IMPORTED_MODULE_9__util__["a"/* createNativeLocaleFormatter */])(this.locale,titleFormats[this.type],{start:0,length:{date:10,month:7,year:4}[this.type]});var landscapeFormatter=function landscapeFormatter(date){return titleDateFormatter(date).replace(/([^\d\s])([\d])/g,function(match,nonDigit,digit){return nonDigit+' '+digit;}).replace(', ',',<br>');};return this.landscape?landscapeFormatter:titleDateFormatter;}},watch:{tableDate:function tableDate(val,prev){// Make a ISO 8601 strings from val and prev for comparision, otherwise it will incorrectly
// compare for example '2000-9' and '2000-10'
var sanitizeType=this.type==='month'?'year':'month';this.isReversing=this.sanitizeDateString(val,sanitizeType)<this.sanitizeDateString(prev,sanitizeType);this.$emit('update:pickerDate',val);},pickerDate:function pickerDate(val){if(val){this.tableDate=val;}else if(this.value&&this.type==='date'){this.tableDate=this.sanitizeDateString(this.value,'month');}else if(this.value&&this.type==='month'){this.tableDate=this.sanitizeDateString(this.value,'year');}},value:function value(){this.setInputDate();if(this.value&&!this.pickerDate){this.tableDate=this.sanitizeDateString(this.inputDate,this.type==='month'?'year':'month');}},type:function type(_type){this.activePicker=_type.toUpperCase();if(this.value){var date=this.sanitizeDateString(this.value,_type);this.$emit('input',this.isDateAllowed(date)?date:null);}}},methods:{isDateAllowed:function isDateAllowed(value){return Object(__WEBPACK_IMPORTED_MODULE_10__util_isDateAllowed__["a"/* default */])(value,this.min,this.max,this.allowedDates);},yearClick:function yearClick(value){this.inputYear=value;if(this.type==='month'){this.tableDate=''+value;}else{this.tableDate=value+'-'+Object(__WEBPACK_IMPORTED_MODULE_9__util__["c"/* pad */])(this.tableMonth+1);}this.activePicker='MONTH';this.reactive&&this.isDateAllowed(this.inputDate)&&this.$emit('input',this.inputDate);},monthClick:function monthClick(value){this.inputYear=parseInt(value.split('-')[0],10);this.inputMonth=parseInt(value.split('-')[1],10)-1;if(this.type==='date'){this.tableDate=value;this.activePicker='DATE';this.reactive&&this.isDateAllowed(this.inputDate)&&this.$emit('input',this.inputDate);}else{this.$emit('input',this.inputDate);this.$emit('change',this.inputDate);}},dateClick:function dateClick(value){this.inputYear=parseInt(value.split('-')[0],10);this.inputMonth=parseInt(value.split('-')[1],10)-1;this.inputDay=parseInt(value.split('-')[2],10);this.$emit('input',this.inputDate);this.$emit('change',this.inputDate);},genPickerTitle:function genPickerTitle(){var _this2=this;return this.$createElement('v-date-picker-title',{props:{date:this.value?this.formatters.titleDate(this.value):'',selectingYear:this.activePicker==='YEAR',year:this.formatters.year(''+this.inputYear),yearIcon:this.yearIcon,value:this.value},slot:'title',style:this.readonly?{'pointer-events':'none'}:undefined,on:{'update:selectingYear':function updateSelectingYear(value){return _this2.activePicker=value?'YEAR':_this2.type.toUpperCase();}}});},genTableHeader:function genTableHeader(){var _this3=this;return this.$createElement('v-date-picker-header',{props:{nextIcon:this.nextIcon,color:this.color,disabled:this.readonly,format:this.headerDateFormat,locale:this.locale,min:this.activePicker==='DATE'?this.minMonth:this.minYear,max:this.activePicker==='DATE'?this.maxMonth:this.maxYear,prevIcon:this.prevIcon,value:this.activePicker==='DATE'?this.tableYear+'-'+Object(__WEBPACK_IMPORTED_MODULE_9__util__["c"/* pad */])(this.tableMonth+1):''+this.tableYear},on:{toggle:function toggle(){return _this3.activePicker=_this3.activePicker==='DATE'?'MONTH':'YEAR';},input:function input(value){return _this3.tableDate=value;}}});},genDateTable:function genDateTable(){var _this4=this;return this.$createElement('v-date-picker-date-table',{props:{allowedDates:this.allowedDates,color:this.color,current:this.current,disabled:this.readonly,events:this.events,eventColor:this.eventColor,firstDayOfWeek:this.firstDayOfWeek,format:this.dayFormat,locale:this.locale,min:this.min,max:this.max,tableDate:this.tableYear+'-'+Object(__WEBPACK_IMPORTED_MODULE_9__util__["c"/* pad */])(this.tableMonth+1),scrollable:this.scrollable,value:this.value},ref:'table',on:{input:this.dateClick,tableDate:function tableDate(value){return _this4.tableDate=value;}}});},genMonthTable:function genMonthTable(){var _this5=this;return this.$createElement('v-date-picker-month-table',{props:{allowedDates:this.type==='month'?this.allowedDates:null,color:this.color,current:this.current?this.sanitizeDateString(this.current,'month'):null,disabled:this.readonly,format:this.monthFormat,locale:this.locale,min:this.minMonth,max:this.maxMonth,scrollable:this.scrollable,value:!this.value||this.type==='month'?this.value:this.value.substr(0,7),tableDate:''+this.tableYear},ref:'table',on:{input:this.monthClick,tableDate:function tableDate(value){return _this5.tableDate=value;}}});},genYears:function genYears(){return this.$createElement('v-date-picker-years',{props:{color:this.color,format:this.yearFormat,locale:this.locale,min:this.minYear,max:this.maxYear,value:''+this.tableYear},on:{input:this.yearClick}});},genPickerBody:function genPickerBody(){var children=this.activePicker==='YEAR'?[this.genYears()]:[this.genTableHeader(),this.activePicker==='DATE'?this.genDateTable():this.genMonthTable()];return this.$createElement('div',{key:this.activePicker,style:this.readonly?{'pointer-events':'none'}:undefined},children);},// Adds leading zero to month/day if necessary, returns 'YYYY' if type = 'year',
// 'YYYY-MM' if 'month' and 'YYYY-MM-DD' if 'date'
sanitizeDateString:function sanitizeDateString(dateString,type){var _dateString$split=dateString.split('-'),_dateString$split2=_slicedToArray(_dateString$split,3),year=_dateString$split2[0],_dateString$split2$=_dateString$split2[1],month=_dateString$split2$===undefined?1:_dateString$split2$,_dateString$split2$2=_dateString$split2[2],date=_dateString$split2$2===undefined?1:_dateString$split2$2;return(year+'-'+Object(__WEBPACK_IMPORTED_MODULE_9__util__["c"/* pad */])(month)+'-'+Object(__WEBPACK_IMPORTED_MODULE_9__util__["c"/* pad */])(date)).substr(0,{date:10,month:7,year:4}[type]);},setInputDate:function setInputDate(){if(this.value){var array=this.value.split('-');this.inputYear=parseInt(array[0],10);this.inputMonth=parseInt(array[1],10)-1;if(this.type==='date'){this.inputDay=parseInt(array[2],10);}}else{this.inputYear=this.inputYear||this.now.getFullYear();this.inputMonth=this.inputMonth==null?this.inputMonth:this.now.getMonth();this.inputDay=this.inputDay||this.now.getDate();}}},created:function created(){if(this.pickerDate!==this.tableDate){this.$emit('update:pickerDate',this.tableDate);}this.setInputDate();},render:function render(h){return this.genPicker('picker--date');}};/***/},/* 167 *//***/function(module,exports){// removed by extract-text-webpack-plugin
/***/},/* 168 *//***/function(module,exports){// removed by extract-text-webpack-plugin
/***/},/* 169 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__pad__=__webpack_require__(23);var _slicedToArray=function(){function sliceIterator(arr,i){var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[Symbol.iterator](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break;}}catch(err){_d=true;_e=err;}finally{try{if(!_n&&_i["return"])_i["return"]();}finally{if(_d)throw _e;}}return _arr;}return function(arr,i){if(Array.isArray(arr)){return arr;}else if(Symbol.iterator in Object(arr)){return sliceIterator(arr,i);}else{throw new TypeError("Invalid attempt to destructure non-iterable instance");}};}();/* harmony default export */__webpack_exports__["a"]=function(locale,options){var _ref=arguments.length>2&&arguments[2]!==undefined?arguments[2]:{start:0,length:0},start=_ref.start,length=_ref.length;var makeIsoString=function makeIsoString(dateString){var _dateString$trim$spli=dateString.trim().split(' ')[0].split('-'),_dateString$trim$spli2=_slicedToArray(_dateString$trim$spli,3),year=_dateString$trim$spli2[0],month=_dateString$trim$spli2[1],date=_dateString$trim$spli2[2];return[year,Object(__WEBPACK_IMPORTED_MODULE_0__pad__["a"/* default */])(month||1),Object(__WEBPACK_IMPORTED_MODULE_0__pad__["a"/* default */])(date||1)].join('-');};try{var intlFormatter=new Intl.DateTimeFormat(locale||undefined,options);return function(dateString){return intlFormatter.format(new Date(makeIsoString(dateString)+'T00:00:00+00:00'));};}catch(e){return start||length?function(dateString){return makeIsoString(dateString).substr(start,length);}:null;}};/***/},/* 170 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__pad__=__webpack_require__(23);var _slicedToArray=function(){function sliceIterator(arr,i){var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[Symbol.iterator](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break;}}catch(err){_d=true;_e=err;}finally{try{if(!_n&&_i["return"])_i["return"]();}finally{if(_d)throw _e;}}return _arr;}return function(arr,i){if(Array.isArray(arr)){return arr;}else if(Symbol.iterator in Object(arr)){return sliceIterator(arr,i);}else{throw new TypeError("Invalid attempt to destructure non-iterable instance");}};}();/**
 * @param {String} value YYYY-MM format
 * @param {Number} sign -1 or +1
 *//* harmony default export */__webpack_exports__["a"]=function(value,sign){var _value$split$map=value.split('-').map(function(v){return 1*v;}),_value$split$map2=_slicedToArray(_value$split$map,2),year=_value$split$map2[0],month=_value$split$map2[1];if(month+sign===0){return year-1+'-12';}else if(month+sign===13){return year+1+'-01';}else{return year+'-'+Object(__WEBPACK_IMPORTED_MODULE_0__pad__["a"/* default */])(month+sign);}};/***/},/* 171 *//***/function(module,exports){// removed by extract-text-webpack-plugin
/***/},/* 172 *//***/function(module,exports){// removed by extract-text-webpack-plugin
/***/},/* 173 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_pickers_styl__=__webpack_require__(174);/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_pickers_styl___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_pickers_styl__);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__VCard__=__webpack_require__(21);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__mixins_colorable__=__webpack_require__(0);/* harmony import */var __WEBPACK_IMPORTED_MODULE_3__mixins_themeable__=__webpack_require__(1);var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};// Components
// Mixins
/* harmony default export */__webpack_exports__["a"]={name:'v-picker',components:{VCard:__WEBPACK_IMPORTED_MODULE_1__VCard__["a"/* default */]},mixins:[__WEBPACK_IMPORTED_MODULE_2__mixins_colorable__["a"/* default */],__WEBPACK_IMPORTED_MODULE_3__mixins_themeable__["a"/* default */]],data:function data(){return{defaultColor:'primary'};},props:{fullWidth:Boolean,landscape:Boolean,transition:{type:String,default:'fade-transition'},width:{type:[Number,String],default:290,validator:function validator(value){return parseInt(value,10)>0;}}},computed:{computedTitleColor:function computedTitleColor(){var darkTheme=this.dark||!this.light&&this.$vuetify.dark;var defaultTitleColor=darkTheme?null:this.computedColor;return this.color||defaultTitleColor;}},methods:{genTitle:function genTitle(){return this.$createElement('div',{staticClass:'picker__title','class':this.addBackgroundColorClassChecks({'picker__title--landscape':this.landscape},this.computedTitleColor)},this.$slots.title);},genBodyTransition:function genBodyTransition(){return this.$createElement('transition',{props:{name:this.transition}},this.$slots.default);},genBody:function genBody(){return this.$createElement('div',{staticClass:'picker__body',style:this.fullWidth?undefined:{width:this.width+'px'}},[this.genBodyTransition()]);},genActions:function genActions(){return this.$createElement('div',{staticClass:'picker__actions card__actions'},this.$slots.actions);}},render:function render(h){return h('v-card',{staticClass:'picker','class':_extends({'picker--landscape':this.landscape},this.themeClasses)},[this.$slots.title?this.genTitle():null,this.genBody(),this.$slots.actions?this.genActions():null]);}};/***/},/* 174 *//***/function(module,exports){// removed by extract-text-webpack-plugin
/***/},/* 175 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__VDialog__=__webpack_require__(34);/* istanbul ignore next */__WEBPACK_IMPORTED_MODULE_0__VDialog__["a"/* default */].install=function install(Vue){Vue.component(__WEBPACK_IMPORTED_MODULE_0__VDialog__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_0__VDialog__["a"/* default */]);};/* harmony default export */__webpack_exports__["a"]=__WEBPACK_IMPORTED_MODULE_0__VDialog__["a"/* default */];/***/},/* 176 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__VDivider__=__webpack_require__(177);/* istanbul ignore next */__WEBPACK_IMPORTED_MODULE_0__VDivider__["a"/* default */].install=function install(Vue){Vue.component(__WEBPACK_IMPORTED_MODULE_0__VDivider__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_0__VDivider__["a"/* default */]);};/* harmony default export */__webpack_exports__["a"]=__WEBPACK_IMPORTED_MODULE_0__VDivider__["a"/* default */];/***/},/* 177 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_dividers_styl__=__webpack_require__(178);/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_dividers_styl___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_dividers_styl__);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__mixins_themeable__=__webpack_require__(1);/* harmony default export */__webpack_exports__["a"]={name:'v-divider',functional:true,mixins:[__WEBPACK_IMPORTED_MODULE_1__mixins_themeable__["a"/* default */]],props:{inset:Boolean},render:function render(h,_ref){var props=_ref.props,data=_ref.data,children=_ref.children;data.staticClass=('divider '+(data.staticClass||'')).trim();if(props.inset)data.staticClass+=' divider--inset';if(props.light)data.staticClass+=' theme--light';if(props.dark)data.staticClass+=' theme--dark';return h('hr',data);}};/***/},/* 178 *//***/function(module,exports){// removed by extract-text-webpack-plugin
/***/},/* 179 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__VExpansionPanel__=__webpack_require__(180);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__VExpansionPanelContent__=__webpack_require__(182);/* unused harmony reexport VExpansionPanel *//* unused harmony reexport VExpansionPanelContent *//* istanbul ignore next */__WEBPACK_IMPORTED_MODULE_0__VExpansionPanel__["a"/* default */].install=function install(Vue){Vue.component(__WEBPACK_IMPORTED_MODULE_0__VExpansionPanel__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_0__VExpansionPanel__["a"/* default */]);Vue.component(__WEBPACK_IMPORTED_MODULE_1__VExpansionPanelContent__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_1__VExpansionPanelContent__["a"/* default */]);};/* harmony default export */__webpack_exports__["a"]=__WEBPACK_IMPORTED_MODULE_0__VExpansionPanel__["a"/* default */];/***/},/* 180 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_expansion_panel_styl__=__webpack_require__(181);/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_expansion_panel_styl___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_expansion_panel_styl__);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__mixins_themeable__=__webpack_require__(1);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__mixins_registrable__=__webpack_require__(4);var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};/* harmony default export */__webpack_exports__["a"]={name:'v-expansion-panel',mixins:[__WEBPACK_IMPORTED_MODULE_1__mixins_themeable__["a"/* default */],Object(__WEBPACK_IMPORTED_MODULE_2__mixins_registrable__["b"/* provide */])('expansionPanel')],provide:function provide(){return{panelClick:this.panelClick,focusable:this.focusable};},data:function data(){return{items:[]};},props:{expand:Boolean,focusable:Boolean,inset:Boolean,popout:Boolean},methods:{panelClick:function panelClick(uid){if(!this.expand){for(var i=0;i<this.items.length;i++){this.items[i].toggle(uid);}return;}for(var _i=0;_i<this.items.length;_i++){if(this.items[_i].uid===uid){this.items[_i].toggle(uid);return;}}},register:function register(uid,toggle){this.items.push({uid:uid,toggle:toggle});},unregister:function unregister(uid){this.items=this.items.filter(function(i){return i.uid!==uid;});}},render:function render(h){return h('ul',{staticClass:'expansion-panel','class':_extends({'expansion-panel--focusable':this.focusable,'expansion-panel--popout':this.popout,'expansion-panel--inset':this.inset},this.themeClasses)},this.$slots.default);}};/***/},/* 181 *//***/function(module,exports){// removed by extract-text-webpack-plugin
/***/},/* 182 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__transitions__=__webpack_require__(7);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__mixins_bootable__=__webpack_require__(16);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__mixins_toggleable__=__webpack_require__(5);/* harmony import */var __WEBPACK_IMPORTED_MODULE_3__mixins_rippleable__=__webpack_require__(22);/* harmony import */var __WEBPACK_IMPORTED_MODULE_4__mixins_registrable__=__webpack_require__(4);/* harmony import */var __WEBPACK_IMPORTED_MODULE_5__VIcon__=__webpack_require__(3);/* harmony import */var __WEBPACK_IMPORTED_MODULE_6__directives_click_outside__=__webpack_require__(8);/* harmony default export */__webpack_exports__["a"]={name:'v-expansion-panel-content',mixins:[__WEBPACK_IMPORTED_MODULE_1__mixins_bootable__["a"/* default */],__WEBPACK_IMPORTED_MODULE_2__mixins_toggleable__["a"/* default */],__WEBPACK_IMPORTED_MODULE_3__mixins_rippleable__["a"/* default */],Object(__WEBPACK_IMPORTED_MODULE_4__mixins_registrable__["a"/* inject */])('expansionPanel','v-expansion-panel','v-expansion-panel-content')],components:{VIcon:__WEBPACK_IMPORTED_MODULE_5__VIcon__["a"/* default */]},directives:{ClickOutside:__WEBPACK_IMPORTED_MODULE_6__directives_click_outside__["a"/* default */]},inject:['focusable','panelClick'],data:function data(){return{height:'auto'};},props:{expandIcon:{type:String,default:'keyboard_arrow_down'},hideActions:Boolean,ripple:{type:[Boolean,Object],default:false}},methods:{genBody:function genBody(){return this.$createElement('div',{ref:'body',class:'expansion-panel__body',directives:[{name:'show',value:this.isActive}]},this.showLazyContent(this.$slots.default));},genHeader:function genHeader(){var _this=this;return this.$createElement('div',{staticClass:'expansion-panel__header',directives:[{name:'ripple',value:this.ripple}],on:{click:function click(){return _this.panelClick(_this._uid);}}},[this.$slots.header,this.genIcon()]);},genIcon:function genIcon(h){if(this.hideActions)return null;var icon=this.$slots.actions||this.$createElement('v-icon',this.expandIcon);return this.$createElement('div',{staticClass:'header__icon'},[icon]);},toggle:function toggle(uid){var _this2=this;var isActive=this._uid===uid&&!this.isActive;if(isActive)this.isBooted=true;// We treat bootable differently
// Needs time to calc height
this.$nextTick(function(){return _this2.isActive=isActive;});}},mounted:function mounted(){this.expansionPanel.register(this._uid,this.toggle);},beforeDestroy:function beforeDestroy(){this.expansionPanel.unregister(this._uid);},render:function render(h){var _this3=this;var children=[];this.$slots.header&&children.push(this.genHeader());children.push(h(__WEBPACK_IMPORTED_MODULE_0__transitions__["a"/* VExpandTransition */],[this.genBody()]));return h('li',{staticClass:'expansion-panel__container','class':{'expansion-panel__container--active':this.isActive},attrs:{tabindex:0},on:{keydown:function keydown(e){// Ensure element is focusable and the activeElement
if(_this3.focusable&&_this3.$el===document.activeElement&&e.keyCode===13)_this3.panelClick(_this3._uid);}}},children);}};/***/},/* 183 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__VFooter__=__webpack_require__(184);/* istanbul ignore next */__WEBPACK_IMPORTED_MODULE_0__VFooter__["a"/* default */].install=function install(Vue){Vue.component(__WEBPACK_IMPORTED_MODULE_0__VFooter__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_0__VFooter__["a"/* default */]);};/* harmony default export */__webpack_exports__["a"]=__WEBPACK_IMPORTED_MODULE_0__VFooter__["a"/* default */];/***/},/* 184 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_footer_styl__=__webpack_require__(185);/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_footer_styl___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_footer_styl__);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__mixins_applicationable__=__webpack_require__(15);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__mixins_colorable__=__webpack_require__(0);/* harmony import */var __WEBPACK_IMPORTED_MODULE_3__mixins_themeable__=__webpack_require__(1);// Styles
// Mixins
/* harmony default export */__webpack_exports__["a"]={name:'v-footer',mixins:[Object(__WEBPACK_IMPORTED_MODULE_1__mixins_applicationable__["a"/* default */])('footer',['height']),__WEBPACK_IMPORTED_MODULE_2__mixins_colorable__["a"/* default */],__WEBPACK_IMPORTED_MODULE_3__mixins_themeable__["a"/* default */]],props:{height:{default:32,type:[Number,String]},inset:Boolean},computed:{computedMarginBottom:function computedMarginBottom(){if(!this.app)return;return this.$vuetify.application.bottom;},computedPaddingLeft:function computedPaddingLeft(){return!this.app||!this.inset?0:this.$vuetify.application.left;},computedPaddingRight:function computedPaddingRight(){return!this.app?0:this.$vuetify.application.right;},styles:function styles(){var styles={height:isNaN(this.height)?this.height:this.height+'px'};if(this.computedPaddingLeft){styles.paddingLeft=this.computedPaddingLeft+'px';}if(this.computedPaddingRight){styles.paddingRight=this.computedPaddingRight+'px';}if(this.computedMarginBottom){styles.marginBottom=this.computedMarginBottom+'px';}return styles;}},methods:{/**
     * Update the application layout
     *
     * @return {number}
     */updateApplication:function updateApplication(){return isNaN(this.height)?this.$el?this.$el.clientHeight:0:this.height;}},render:function render(h){var data={staticClass:'footer','class':this.addBackgroundColorClassChecks({'footer--absolute':this.absolute,'footer--fixed':!this.absolute&&(this.app||this.fixed),'footer--inset':this.inset,'theme--dark':this.dark,'theme--light':this.light}),style:this.styles,ref:'content'};return h('footer',data,this.$slots.default);}};/***/},/* 185 *//***/function(module,exports){// removed by extract-text-webpack-plugin
/***/},/* 186 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__VForm__=__webpack_require__(187);/* istanbul ignore next */__WEBPACK_IMPORTED_MODULE_0__VForm__["a"/* default */].install=function install(Vue){Vue.component(__WEBPACK_IMPORTED_MODULE_0__VForm__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_0__VForm__["a"/* default */]);};/* harmony default export */__webpack_exports__["a"]=__WEBPACK_IMPORTED_MODULE_0__VForm__["a"/* default */];/***/},/* 187 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony default export */__webpack_exports__["a"]={name:'v-form',inheritAttrs:false,data:function data(){return{inputs:[],errorBag:{}};},props:{value:Boolean,lazyValidation:Boolean},watch:{errorBag:{handler:function handler(){var errors=Object.values(this.errorBag).includes(true);this.$emit('input',!errors);return!errors;},deep:true}},methods:{getInputs:function getInputs(){var results=[];var search=function search(children){var depth=arguments.length>1&&arguments[1]!==undefined?arguments[1]:0;for(var index=0;index<children.length;index++){var child=children[index];if(child.errorBucket!==undefined){results.push(child);}else{search(child.$children,depth+1);}}if(depth===0)return results;};return search(this.$children);},watchInputs:function watchInputs(){var inputs=arguments.length>0&&arguments[0]!==undefined?arguments[0]:this.getInputs();for(var index=0;index<inputs.length;index++){var child=inputs[index];if(this.inputs.includes(child)){continue;// We already know about this input
}this.inputs.push(child);this.watchChild(child);}},watchChild:function watchChild(child){var _this=this;var watcher=function watcher(child){child.$watch('valid',function(val){_this.$set(_this.errorBag,child._uid,!val);},{immediate:true});};if(!this.lazyValidation)return watcher(child);// Only start watching inputs if we need to
child.$watch('shouldValidate',function(val){if(!val)return;// Only watch if we're not already doing it
if(_this.errorBag.hasOwnProperty(child._uid))return;watcher(child);});},validate:function validate(){var errors=this.inputs.filter(function(input){return!input.validate(true);}).length;return!errors;},reset:function reset(){for(var i=this.inputs.length;i--;){this.inputs[i].reset();}if(this.lazyValidation)this.errorBag={};}},mounted:function mounted(){this.watchInputs();},updated:function updated(){var inputs=this.getInputs();if(inputs.length<this.inputs.length){// Something was removed, we don't want it in the errorBag any more
var removed=this.inputs.filter(function(i){return!inputs.includes(i);});for(var index=0;index<removed.length;index++){var input=removed[index];this.$delete(this.errorBag,input._uid);this.$delete(this.inputs,this.inputs.indexOf(input));}}this.watchInputs(inputs);},render:function render(h){var _this2=this;return h('form',{attrs:Object.assign({novalidate:true},this.$attrs),on:{submit:function submit(e){return _this2.$emit('submit',e);}}},this.$slots.default);}};/***/},/* 188 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* unused harmony export VSpacer *//* harmony import */var __WEBPACK_IMPORTED_MODULE_0__util_helpers__=__webpack_require__(2);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__VContent__=__webpack_require__(189);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__VContainer__=__webpack_require__(191);/* harmony import */var __WEBPACK_IMPORTED_MODULE_3__VFlex__=__webpack_require__(192);/* harmony import */var __WEBPACK_IMPORTED_MODULE_4__VLayout__=__webpack_require__(193);/* unused harmony reexport VContainer *//* unused harmony reexport VContent *//* unused harmony reexport VFlex *//* unused harmony reexport VLayout */var VSpacer=Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["d"/* createSimpleFunctional */])('spacer');var VGrid={};/* istanbul ignore next */VGrid.install=function install(Vue){Vue.component(__WEBPACK_IMPORTED_MODULE_1__VContent__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_1__VContent__["a"/* default */]);Vue.component(__WEBPACK_IMPORTED_MODULE_2__VContainer__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_2__VContainer__["a"/* default */]);Vue.component(__WEBPACK_IMPORTED_MODULE_3__VFlex__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_3__VFlex__["a"/* default */]);Vue.component(__WEBPACK_IMPORTED_MODULE_4__VLayout__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_4__VLayout__["a"/* default */]);Vue.component(VSpacer.name,VSpacer);};/* harmony default export */__webpack_exports__["a"]=VGrid;/***/},/* 189 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_content_styl__=__webpack_require__(190);/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_content_styl___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_content_styl__);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__mixins_ssr_bootable__=__webpack_require__(24);// Styles
// Mixins
/* harmony default export */__webpack_exports__["a"]={name:'v-content',mixins:[__WEBPACK_IMPORTED_MODULE_1__mixins_ssr_bootable__["a"/* default */]],props:{tag:{type:String,default:'main'}},computed:{styles:function styles(){var _$vuetify$application=this.$vuetify.application,bar=_$vuetify$application.bar,top=_$vuetify$application.top,right=_$vuetify$application.right,footer=_$vuetify$application.footer,bottom=_$vuetify$application.bottom,left=_$vuetify$application.left;return{paddingTop:top+bar+'px',paddingRight:right+'px',paddingBottom:footer+bottom+'px',paddingLeft:left+'px'};}},render:function render(h){var data={staticClass:'content','class':this.classes,style:this.styles,ref:'content'};return h(this.tag,data,[h('div',{staticClass:'content--wrap'},this.$slots.default)]);}};/***/},/* 190 *//***/function(module,exports){// removed by extract-text-webpack-plugin
/***/},/* 191 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_grid_styl__=__webpack_require__(29);/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_grid_styl___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_grid_styl__);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__grid__=__webpack_require__(30);/* harmony default export */__webpack_exports__["a"]=Object(__WEBPACK_IMPORTED_MODULE_1__grid__["a"/* default */])('container');/***/},/* 192 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_grid_styl__=__webpack_require__(29);/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_grid_styl___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_grid_styl__);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__grid__=__webpack_require__(30);/* harmony default export */__webpack_exports__["a"]=Object(__WEBPACK_IMPORTED_MODULE_1__grid__["a"/* default */])('flex');/***/},/* 193 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_grid_styl__=__webpack_require__(29);/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_grid_styl___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_grid_styl__);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__grid__=__webpack_require__(30);/* harmony default export */__webpack_exports__["a"]=Object(__WEBPACK_IMPORTED_MODULE_1__grid__["a"/* default */])('layout');/***/},/* 194 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__VNavigationDrawer__=__webpack_require__(195);/* istanbul ignore next */__WEBPACK_IMPORTED_MODULE_0__VNavigationDrawer__["a"/* default */].install=function install(Vue){Vue.component(__WEBPACK_IMPORTED_MODULE_0__VNavigationDrawer__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_0__VNavigationDrawer__["a"/* default */]);};/* harmony default export */__webpack_exports__["a"]=__WEBPACK_IMPORTED_MODULE_0__VNavigationDrawer__["a"/* default */];/***/},/* 195 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_navigation_drawer_styl__=__webpack_require__(196);/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_navigation_drawer_styl___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_navigation_drawer_styl__);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__mixins_applicationable__=__webpack_require__(15);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__mixins_overlayable__=__webpack_require__(35);/* harmony import */var __WEBPACK_IMPORTED_MODULE_3__mixins_ssr_bootable__=__webpack_require__(24);/* harmony import */var __WEBPACK_IMPORTED_MODULE_4__mixins_themeable__=__webpack_require__(1);/* harmony import */var __WEBPACK_IMPORTED_MODULE_5__directives_click_outside__=__webpack_require__(8);/* harmony import */var __WEBPACK_IMPORTED_MODULE_6__directives_resize__=__webpack_require__(11);/* harmony import */var __WEBPACK_IMPORTED_MODULE_7__directives_touch__=__webpack_require__(9);// Mixins
// Directives
/* harmony default export */__webpack_exports__["a"]={name:'v-navigation-drawer',mixins:[Object(__WEBPACK_IMPORTED_MODULE_1__mixins_applicationable__["a"/* default */])(null,['miniVariant','right','width']),__WEBPACK_IMPORTED_MODULE_2__mixins_overlayable__["a"/* default */],__WEBPACK_IMPORTED_MODULE_3__mixins_ssr_bootable__["a"/* default */],__WEBPACK_IMPORTED_MODULE_4__mixins_themeable__["a"/* default */]],directives:{ClickOutside:__WEBPACK_IMPORTED_MODULE_5__directives_click_outside__["a"/* default */],Resize:__WEBPACK_IMPORTED_MODULE_6__directives_resize__["a"/* default */],Touch:__WEBPACK_IMPORTED_MODULE_7__directives_touch__["a"/* default */]},data:function data(){return{isActive:false,touchArea:{left:0,right:0}};},props:{clipped:Boolean,disableRouteWatcher:Boolean,disableResizeWatcher:Boolean,height:{type:[Number,String],default:'100%'},floating:Boolean,miniVariant:Boolean,miniVariantWidth:{type:[Number,String],default:80},mobileBreakPoint:{type:[Number,String],default:1264},permanent:Boolean,right:Boolean,stateless:Boolean,temporary:Boolean,touchless:Boolean,width:{type:[Number,String],default:300},value:{required:false}},computed:{/**
     * Used for setting an app
     * value from a dynamic
     * property. Called from
     * applicationable.js
     *
     * @return {string}
     */applicationProperty:function applicationProperty(){return this.right?'right':'left';},calculatedHeight:function calculatedHeight(){return isNaN(this.height)?this.height:this.height+'px';},calculatedTransform:function calculatedTransform(){if(this.isActive)return 0;return this.right?this.calculatedWidth:-this.calculatedWidth;},calculatedWidth:function calculatedWidth(){return this.miniVariant?this.miniVariantWidth:this.width;},classes:function classes(){return{'navigation-drawer':true,'navigation-drawer--absolute':this.absolute,'navigation-drawer--clipped':this.clipped,'navigation-drawer--close':!this.isActive,'navigation-drawer--fixed':!this.absolute&&(this.app||this.fixed),'navigation-drawer--floating':this.floating,'navigation-drawer--is-mobile':this.isMobile,'navigation-drawer--mini-variant':this.miniVariant,'navigation-drawer--open':this.isActive,'navigation-drawer--right':this.right,'navigation-drawer--temporary':this.temporary,'theme--dark':this.dark,'theme--light':this.light};},isMobile:function isMobile(){return!this.permanent&&!this.temporary&&this.$vuetify.breakpoint.width<parseInt(this.mobileBreakPoint,10);},marginTop:function marginTop(){if(!this.app)return 0;var marginTop=this.$vuetify.application.bar;marginTop+=this.clipped?this.$vuetify.application.top:0;return marginTop;},maxHeight:function maxHeight(){if(!this.app)return'100%';return this.clipped?this.$vuetify.application.top+this.$vuetify.application.bottom:this.$vuetify.application.bottom;},reactsToClick:function reactsToClick(){return!this.stateless&&!this.permanent&&(this.isMobile||this.temporary);},reactsToMobile:function reactsToMobile(){return!this.disableResizeWatcher&&!this.stateless&&!this.permanent&&!this.temporary;},reactsToRoute:function reactsToRoute(){return!this.disableRouteWatcher&&!this.stateless&&(this.temporary||this.isMobile);},resizeIsDisabled:function resizeIsDisabled(){return this.disableResizeWatcher||this.stateless;},showOverlay:function showOverlay(){return this.isActive&&(this.isMobile||this.temporary);},styles:function styles(){var styles={height:this.calculatedHeight,marginTop:this.marginTop+'px',maxHeight:'calc(100% - '+this.maxHeight+'px)',transform:'translateX('+this.calculatedTransform+'px)',width:this.calculatedWidth+'px'};return styles;}},watch:{$route:function $route(){if(this.reactsToRoute&&this.closeConditional()){this.isActive=false;}},isActive:function isActive(val){this.$emit('input',val);this.callUpdate();},/**
     * When mobile changes, adjust
     * the active state only when
     * there has been a previous
     * value
     */isMobile:function isMobile(val,prev){!val&&this.isActive&&!this.temporary&&this.removeOverlay();if(prev==null||this.resizeIsDisabled||!this.reactsToMobile)return;this.isActive=!val;this.callUpdate();},permanent:function permanent(val){// If enabling prop
// enable the drawer
if(val){this.isActive=true;}this.callUpdate();},showOverlay:function showOverlay(val){if(val)this.genOverlay();else this.removeOverlay();},temporary:function temporary(){this.callUpdate();},value:function value(val){if(this.permanent)return;if(val==null)return this.init();if(val!==this.isActive)this.isActive=val;}},beforeMount:function beforeMount(){this.init();},methods:{calculateTouchArea:function calculateTouchArea(){if(!this.$el.parentNode)return;var parentRect=this.$el.parentNode.getBoundingClientRect();this.touchArea={left:parentRect.left+50,right:parentRect.right-50};},closeConditional:function closeConditional(){return this.isActive&&this.reactsToClick;},genDirectives:function genDirectives(){var _this=this;var directives=[{name:'click-outside',value:function value(){return _this.isActive=false;},args:{closeConditional:this.closeConditional}}];!this.touchless&&directives.push({name:'touch',value:{parent:true,left:this.swipeLeft,right:this.swipeRight}});return directives;},/**
     * Sets state before mount to avoid
     * entry transitions in SSR
     *
     * @return {void}
     */init:function init(){if(this.permanent){this.isActive=true;}else if(this.stateless||this.value!=null){this.isActive=this.value;}else if(!this.temporary){this.isActive=!this.isMobile;}},swipeRight:function swipeRight(e){if(this.isActive&&!this.right)return;this.calculateTouchArea();if(Math.abs(e.touchendX-e.touchstartX)<100)return;if(!this.right&&e.touchstartX<=this.touchArea.left)this.isActive=true;else if(this.right&&this.isActive)this.isActive=false;},swipeLeft:function swipeLeft(e){if(this.isActive&&this.right)return;this.calculateTouchArea();if(Math.abs(e.touchendX-e.touchstartX)<100)return;if(this.right&&e.touchstartX>=this.touchArea.right)this.isActive=true;else if(!this.right&&this.isActive)this.isActive=false;},/**
     * Update the application layout
     *
     * @return {number}
     */updateApplication:function updateApplication(){return!this.isActive||this.temporary||this.isMobile?0:this.calculatedWidth;}},render:function render(h){var _this2=this;var data={'class':this.classes,style:this.styles,directives:this.genDirectives(),on:{click:function click(){if(!_this2.miniVariant)return;_this2.$emit('update:miniVariant',false);}}};return h('aside',data,[this.$slots.default,h('div',{'class':'navigation-drawer__border'})]);}};/***/},/* 196 *//***/function(module,exports){// removed by extract-text-webpack-plugin
/***/},/* 197 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__VPagination__=__webpack_require__(198);/* istanbul ignore next */__WEBPACK_IMPORTED_MODULE_0__VPagination__["a"/* default */].install=function install(Vue){Vue.component(__WEBPACK_IMPORTED_MODULE_0__VPagination__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_0__VPagination__["a"/* default */]);};/* harmony default export */__webpack_exports__["a"]=__WEBPACK_IMPORTED_MODULE_0__VPagination__["a"/* default */];/***/},/* 198 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_pagination_styl__=__webpack_require__(199);/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_pagination_styl___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_pagination_styl__);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__VIcon__=__webpack_require__(3);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__directives_resize__=__webpack_require__(11);/* harmony import */var __WEBPACK_IMPORTED_MODULE_3__mixins_colorable__=__webpack_require__(0);function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}else{return Array.from(arr);}}/* harmony default export */__webpack_exports__["a"]={name:'v-pagination',mixins:[__WEBPACK_IMPORTED_MODULE_3__mixins_colorable__["a"/* default */]],directives:{Resize:__WEBPACK_IMPORTED_MODULE_2__directives_resize__["a"/* default */]},data:function data(){return{maxButtons:0,defaultColor:'primary'};},props:{circle:Boolean,disabled:Boolean,length:{type:Number,default:0,validator:function validator(val){return val%1===0;}},totalVisible:[Number,String],nextIcon:{type:String,default:'chevron_right'},prevIcon:{type:String,default:'chevron_left'},value:{type:Number,default:0}},computed:{classes:function classes(){return{'pagination':true,'pagination--circle':this.circle,'pagination--disabled':this.disabled};},items:function items(){var maxLength=this.totalVisible||this.maxButtons;if(this.length<=maxLength){return this.range(1,this.length);}var even=maxLength%2===0?1:0;var left=Math.floor(maxLength/2);var right=this.length-left+1+even;if(this.value>=left&&this.value<=right){var start=this.value-left+2;var end=this.value+left-2-even;return[1,'...'].concat(_toConsumableArray(this.range(start,end)),['...',this.length]);}else{return[].concat(_toConsumableArray(this.range(1,left)),['...'],_toConsumableArray(this.range(this.length-left+1+even,this.length)));}}},watch:{value:function value(){this.init();}},mounted:function mounted(){this.init();},methods:{init:function init(){var _this=this;this.selected=null;// TODO: Change this (f75dee3a, cbdf7caa)
setTimeout(function(){return _this.selected=_this.value;},100);},onResize:function onResize(){var width=this.$el&&this.$el.parentNode?this.$el.parentNode.clientWidth:window.innerWidth;this.maxButtons=Math.floor((width-96)/42);},next:function next(e){e.preventDefault();this.$emit('input',this.value+1);this.$emit('next');},previous:function previous(e){e.preventDefault();this.$emit('input',this.value-1);this.$emit('previous');},range:function range(from,to){var range=[];from=from>0?from:1;for(var i=from;i<=to;i++){range.push(i);}return range;},genIcon:function genIcon(h,icon,disabled,fn){return h('li',[h('button',{staticClass:'pagination__navigation',class:{'pagination__navigation--disabled':disabled},on:disabled?{}:{click:fn}},[h(__WEBPACK_IMPORTED_MODULE_1__VIcon__["a"/* default */],[icon])])]);},genItem:function genItem(h,i){var _this2=this;return h('button',{staticClass:'pagination__item',class:i===this.value?this.addBackgroundColorClassChecks({'pagination__item--active':true}):{},on:{click:function click(){return _this2.$emit('input',i);}}},[i]);},genItems:function genItems(h){var _this3=this;return this.items.map(function(i,index){return h('li',{key:index},[isNaN(i)?h('span',{class:'pagination__more'},[i]):_this3.genItem(h,i)]);});}},render:function render(h){var children=[this.genIcon(h,this.prevIcon,this.value<=1,this.previous),this.genItems(h),this.genIcon(h,this.nextIcon,this.value>=this.length,this.next)];return h('ul',{directives:[{name:'resize',value:this.onResize}],class:this.classes},children);}};/***/},/* 199 *//***/function(module,exports){// removed by extract-text-webpack-plugin
/***/},/* 200 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__VParallax__=__webpack_require__(201);/* istanbul ignore next */__WEBPACK_IMPORTED_MODULE_0__VParallax__["a"/* default */].install=function install(Vue){Vue.component(__WEBPACK_IMPORTED_MODULE_0__VParallax__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_0__VParallax__["a"/* default */]);};/* harmony default export */__webpack_exports__["a"]=__WEBPACK_IMPORTED_MODULE_0__VParallax__["a"/* default */];/***/},/* 201 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_parallax_styl__=__webpack_require__(202);/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_parallax_styl___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_parallax_styl__);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__mixins_translatable__=__webpack_require__(203);/* harmony default export */__webpack_exports__["a"]={name:'v-parallax',mixins:[__WEBPACK_IMPORTED_MODULE_1__mixins_translatable__["a"/* default */]],data:function data(){return{isBooted:false};},props:{alt:String,height:{type:[String,Number],default:500},src:String},computed:{styles:function styles(){return{display:'block',opacity:this.isBooted?1:0,transform:'translate(-50%, '+this.parallax+'px)'};}},watch:{parallax:function parallax(){this.isBooted=true;}},mounted:function mounted(){this.init();},methods:{init:function init(){var _this=this;if(!this.$refs.img)return;if(this.$refs.img.complete){this.translate();this.listeners();}else{this.$refs.img.addEventListener('load',function(){_this.translate();_this.listeners();},false);}},objHeight:function objHeight(){return this.$refs.img.naturalHeight;},elOffsetTop:function elOffsetTop(){return this.$el.offsetTop;}},render:function render(h){var imgData={staticClass:'parallax__image',style:this.styles,attrs:{src:this.src},ref:'img'};if(this.alt)imgData.attrs.alt=this.alt;var container=h('div',{staticClass:'parallax__image-container'},[h('img',imgData)]);var content=h('div',{staticClass:'parallax__content'},this.$slots.default);return h('div',{staticClass:'parallax',style:{height:this.normalizedHeight+'px'},on:this.$listeners},[container,content]);}};/***/},/* 202 *//***/function(module,exports){// removed by extract-text-webpack-plugin
/***/},/* 203 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony default export */__webpack_exports__["a"]={name:'translatable',data:function data(){return{parallax:null,parallaxDist:null,percentScrolled:null,scrollTop:null,windowHeight:null,windowBottom:null};},computed:{normalizedHeight:function normalizedHeight(){if(this.jumbotron){return isNaN(this.height)?this.height:this.height+'px';}return Number(this.height.toString().replace(/(^[0-9]*$)/,'$1'));},imgHeight:function imgHeight(){return this.objHeight();}},beforeDestroy:function beforeDestroy(){window.removeEventListener('scroll',this.translate,false);window.removeEventListener('resize',this.translate,false);},methods:{listeners:function listeners(){window.addEventListener('scroll',this.translate,false);window.addEventListener('resize',this.translate,false);},translate:function translate(){this.calcDimensions();this.percentScrolled=(this.windowBottom-this.elOffsetTop)/(this.normalizedHeight+this.windowHeight);this.parallax=Math.round(this.parallaxDist*this.percentScrolled);if(this.translated){this.translated();}},calcDimensions:function calcDimensions(){var offset=this.$el.getBoundingClientRect();this.scrollTop=window.pageYOffset;this.parallaxDist=this.imgHeight-this.normalizedHeight;this.elOffsetTop=offset.top+this.scrollTop;this.windowHeight=window.innerHeight;this.windowBottom=this.scrollTop+this.windowHeight;}}};/***/},/* 204 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__VProgressCircular__=__webpack_require__(205);/* istanbul ignore next */__WEBPACK_IMPORTED_MODULE_0__VProgressCircular__["a"/* default */].install=function install(Vue){Vue.component(__WEBPACK_IMPORTED_MODULE_0__VProgressCircular__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_0__VProgressCircular__["a"/* default */]);};/* harmony default export */__webpack_exports__["a"]=__WEBPACK_IMPORTED_MODULE_0__VProgressCircular__["a"/* default */];/***/},/* 205 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_progress_circular_styl__=__webpack_require__(206);/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_progress_circular_styl___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_progress_circular_styl__);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__mixins_colorable__=__webpack_require__(0);/* harmony default export */__webpack_exports__["a"]={name:'v-progress-circular',mixins:[__WEBPACK_IMPORTED_MODULE_1__mixins_colorable__["a"/* default */]],props:{button:Boolean,indeterminate:Boolean,rotate:{type:Number,default:0},size:{type:[Number,String],default:32},width:{type:Number,default:4},value:{type:Number,default:0}},computed:{calculatedSize:function calculatedSize(){var size=Number(this.size);if(this.button){size+=8;}return size;},circumference:function circumference(){return 2*Math.PI*this.radius;},classes:function classes(){return this.addTextColorClassChecks({'progress-circular':true,'progress-circular--indeterminate':this.indeterminate,'progress-circular--button':this.button});},cxy:function cxy(){return this.indeterminate&&!this.button?50:this.calculatedSize/2;},normalizedValue:function normalizedValue(){if(this.value<0){return 0;}if(this.value>100){return 100;}return this.value;},radius:function radius(){return this.indeterminate&&!this.button?20:(this.calculatedSize-this.width)/2;},strokeDashArray:function strokeDashArray(){return Math.round(this.circumference*1000)/1000;},strokeDashOffset:function strokeDashOffset(){return(100-this.normalizedValue)/100*this.circumference+'px';},styles:function styles(){return{height:this.calculatedSize+'px',width:this.calculatedSize+'px'};},svgSize:function svgSize(){return this.indeterminate?false:this.calculatedSize;},svgStyles:function svgStyles(){return{transform:'rotate('+this.rotate+'deg)'};},viewBox:function viewBox(){return this.indeterminate?'25 25 50 50':false;}},methods:{genCircle:function genCircle(h,name,offset){return h('circle',{class:'progress-circular__'+name,attrs:{fill:'transparent',cx:this.cxy,cy:this.cxy,r:this.radius,'stroke-width':this.width,'stroke-dasharray':this.strokeDashArray,'stroke-dashoffset':offset}});},genSvg:function genSvg(h){var children=[!this.indeterminate&&this.genCircle(h,'underlay',0),this.genCircle(h,'overlay',this.strokeDashOffset)];return h('svg',{style:this.svgStyles,attrs:{xmlns:'http://www.w3.org/2000/svg',height:this.svgSize,width:this.svgSize,viewBox:this.viewBox}},children);}},render:function render(h){var info=h('div',{class:'progress-circular__info'},[this.$slots.default]);var svg=this.genSvg(h);return h('div',{class:this.classes,style:this.styles,on:this.$listeners},[svg,info]);}};/***/},/* 206 *//***/function(module,exports){// removed by extract-text-webpack-plugin
/***/},/* 207 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__VRadioGroup__=__webpack_require__(208);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__VRadio__=__webpack_require__(210);/* unused harmony reexport VRadioGroup *//* unused harmony reexport VRadio *//* istanbul ignore next */__WEBPACK_IMPORTED_MODULE_0__VRadioGroup__["a"/* default */].install=function install(Vue){Vue.component(__WEBPACK_IMPORTED_MODULE_0__VRadioGroup__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_0__VRadioGroup__["a"/* default */]);Vue.component(__WEBPACK_IMPORTED_MODULE_1__VRadio__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_1__VRadio__["a"/* default */]);};/* harmony default export */__webpack_exports__["a"]=__WEBPACK_IMPORTED_MODULE_0__VRadioGroup__["a"/* default */];/***/},/* 208 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_input_groups_styl__=__webpack_require__(18);/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_input_groups_styl___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_input_groups_styl__);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__stylus_components_selection_controls_styl__=__webpack_require__(28);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__stylus_components_selection_controls_styl___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__stylus_components_selection_controls_styl__);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__stylus_components_radio_group_styl__=__webpack_require__(209);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__stylus_components_radio_group_styl___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__stylus_components_radio_group_styl__);/* harmony import */var __WEBPACK_IMPORTED_MODULE_3__mixins_input__=__webpack_require__(19);/* harmony import */var __WEBPACK_IMPORTED_MODULE_4__mixins_registrable__=__webpack_require__(4);// Styles
// Mixins
/* harmony default export */__webpack_exports__["a"]={name:'v-radio-group',mixins:[__WEBPACK_IMPORTED_MODULE_3__mixins_input__["a"/* default */],Object(__WEBPACK_IMPORTED_MODULE_4__mixins_registrable__["b"/* provide */])('radio')],model:{prop:'inputValue',event:'change'},provide:function provide(){var _this=this;return{isMandatory:function isMandatory(){return _this.mandatory;},name:function name(){return _this.name;}};},data:function data(){return{internalTabIndex:-1,radios:[]};},props:{column:{type:Boolean,default:true},inputValue:null,mandatory:{type:Boolean,default:true},name:String,row:Boolean},watch:{hasError:function hasError(val){for(var index=this.radios.length;--index>=0;){this.radios[index].parentError=val;}},inputValue:function inputValue(val){for(var index=this.radios.length;--index>=0;){var radio=this.radios[index];radio.isActive=val===radio.value;}}},computed:{classes:function classes(){return{'radio-group':true,'radio-group--column':this.column&&!this.row,'radio-group--row':this.row,'error--text':this.hasError};}},methods:{toggleRadio:function toggleRadio(value){var _this2=this;if(this.disabled){return;}this.shouldValidate=true;this.$emit('change',value);this.$nextTick(function(){return _this2.validate();});for(var index=this.radios.length;--index>=0;){var radio=this.radios[index];if(radio.value!==value)radio.isActive=false;}},radioBlur:function radioBlur(e){if(!e.relatedTarget||!e.relatedTarget.classList.contains('radio')){this.shouldValidate=true;this.$emit('blur',this.inputValue);}},register:function register(radio){radio.isActive=this.inputValue===radio.value;radio.$el.tabIndex=radio.$el.tabIndex>0?radio.$el.tabIndex:0;radio.$on('change',this.toggleRadio);radio.$on('blur',this.radioBlur);radio.$on('focus',this.radioFocus);this.radios.push(radio);},unregister:function unregister(radio){radio.$off('change',this.toggleRadio);radio.$off('blur',this.radioBlur);radio.$off('focus',this.radioFocus);var index=this.radios.findIndex(function(r){return r===radio;});if(index>-1)this.radios.splice(index,1);}},render:function render(h){var data={attrs:{role:'radiogroup'}};return this.genInputGroup(this.$slots.default,data);}};/***/},/* 209 *//***/function(module,exports){// removed by extract-text-webpack-plugin
/***/},/* 210 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__transitions__=__webpack_require__(7);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__VIcon__=__webpack_require__(3);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__mixins_colorable__=__webpack_require__(0);/* harmony import */var __WEBPACK_IMPORTED_MODULE_3__mixins_rippleable__=__webpack_require__(22);/* harmony import */var __WEBPACK_IMPORTED_MODULE_4__mixins_tab_focusable__=__webpack_require__(211);/* harmony import */var __WEBPACK_IMPORTED_MODULE_5__mixins_themeable__=__webpack_require__(1);/* harmony import */var __WEBPACK_IMPORTED_MODULE_6__mixins_registrable__=__webpack_require__(4);var _typeof=typeof Symbol==="function"&&_typeof2(Symbol.iterator)==="symbol"?function(obj){return typeof obj==='undefined'?'undefined':_typeof2(obj);}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj==='undefined'?'undefined':_typeof2(obj);};// Components
// Mixins
/* harmony default export */__webpack_exports__["a"]={name:'v-radio',inheritAttrs:false,inject:['isMandatory','name'],components:{VFadeTransition:__WEBPACK_IMPORTED_MODULE_0__transitions__["b"/* VFadeTransition */],VIcon:__WEBPACK_IMPORTED_MODULE_1__VIcon__["a"/* default */]},mixins:[__WEBPACK_IMPORTED_MODULE_2__mixins_colorable__["a"/* default */],__WEBPACK_IMPORTED_MODULE_3__mixins_rippleable__["a"/* default */],Object(__WEBPACK_IMPORTED_MODULE_6__mixins_registrable__["a"/* inject */])('radio','v-radio','v-radio-group'),__WEBPACK_IMPORTED_MODULE_4__mixins_tab_focusable__["a"/* default */],__WEBPACK_IMPORTED_MODULE_5__mixins_themeable__["a"/* default */]],data:function data(){return{defaultColor:'accent',isActive:false,parentError:false};},props:{disabled:Boolean,value:null,label:String},computed:{classes:function classes(){var classes={'input-group':true,'input-group--active':this.isActive,'input-group--disabled':this.disabled,'input-group--selection-controls':true,'input-group--tab-focused':this.tabFocused,'radio':true,'theme--dark':this.dark,'theme--light':this.light};if(!this.parentError){return this.addTextColorClassChecks(classes);}return classes;},icon:function icon(){return this.isActive?'radio_button_checked':'radio_button_unchecked';}},methods:{genInput:function genInput(radio){var value=['string','number'].includes(_typeof(this.value))?this.value:JSON.stringify(this.value);var input=this.$createElement('input',{ref:'input',style:{display:'none'},attrs:Object.assign({name:this.name&&this.name(),id:this.id,type:'radio',value:value},this.$attrs)},[value]);radio.push(input);return this.$createElement('div',{class:'input-group__input'},radio);},genWrapper:function genWrapper(radio){var _this=this;var children=[];children.push(this.genLabel());children.push(this.genInput(radio));return this.$createElement('div',{class:this.classes,attrs:{role:'radio','aria-checked':this.isActive?'true':'false','aria-label':this.label},on:{keydown:function keydown(e){if([13,32].includes(e.keyCode)){e.preventDefault();_this.toggle();}},blur:function blur(e){_this.$emit('blur',e);_this.tabFocused=false;}}},children);},genLabel:function genLabel(){return this.$createElement('label',{on:{click:this.toggle}},this.$slots.label||this.label);},toggle:function toggle(){var mandatory=!!this.isMandatory&&this.isMandatory();if(!this.disabled&&(!this.isActive||!mandatory)){this.$refs.input.checked=true;this.isActive=true;this.$emit('change',this.value);}}},mounted:function mounted(){this.radio.register(this);},beforeDestroy:function beforeDestroy(){this.radio.unregister(this);},render:function render(h){var transition=h('v-fade-transition',{},[h('v-icon',{staticClass:'icon--selection-control','class':{'icon--radio':this.isActive},key:this.icon,on:Object.assign({click:this.toggle},this.$listeners)},this.icon)]);var ripple=this.ripple?this.genRipple():null;return this.genWrapper([transition,ripple]);}};/***/},/* 211 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony default export */__webpack_exports__["a"]={name:'tab-focusable',data:function data(){return{tabFocused:false};}};/***/},/* 212 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__VSlider__=__webpack_require__(213);/* istanbul ignore next */__WEBPACK_IMPORTED_MODULE_0__VSlider__["a"/* default */].install=function install(Vue){Vue.component(__WEBPACK_IMPORTED_MODULE_0__VSlider__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_0__VSlider__["a"/* default */]);};/* harmony default export */__webpack_exports__["a"]=__WEBPACK_IMPORTED_MODULE_0__VSlider__["a"/* default */];/***/},/* 213 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_sliders_styl__=__webpack_require__(214);/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_sliders_styl___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_sliders_styl__);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__util_helpers__=__webpack_require__(2);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__mixins_colorable__=__webpack_require__(0);/* harmony import */var __WEBPACK_IMPORTED_MODULE_3__mixins_input__=__webpack_require__(19);/* harmony import */var __WEBPACK_IMPORTED_MODULE_4__directives_click_outside__=__webpack_require__(8);/* harmony import */var __WEBPACK_IMPORTED_MODULE_5__transitions__=__webpack_require__(7);/* harmony import */var __WEBPACK_IMPORTED_MODULE_6__util_console__=__webpack_require__(6);/* harmony default export */__webpack_exports__["a"]={name:'v-slider',mixins:[__WEBPACK_IMPORTED_MODULE_2__mixins_colorable__["a"/* default */],__WEBPACK_IMPORTED_MODULE_3__mixins_input__["a"/* default */]],directives:{ClickOutside:__WEBPACK_IMPORTED_MODULE_4__directives_click_outside__["a"/* default */]},components:{VScaleTransition:__WEBPACK_IMPORTED_MODULE_5__transitions__["c"/* VScaleTransition */]},data:function data(){return{app:{},defaultColor:'primary',isActive:false,keyPressed:0};},props:{min:{type:[Number,String],default:0},max:{type:[Number,String],default:100},step:{type:[Number,String],default:1},ticks:Boolean,thumbColor:{type:String,default:null},thumbLabel:Boolean,trackColor:{type:String,default:null},value:[Number,String]},computed:{classes:function classes(){return{'input-group--slider':true,'input-group--active':this.isActive,'input-group--dirty':this.inputWidth>0,'input-group--disabled':this.disabled,'input-group--ticks':!this.disabled&&this.stepNumeric&&this.ticks};},computedColor:function computedColor(){return this.disabled?null:this.color||this.defaultColor;},computedTrackColor:function computedTrackColor(){return this.disabled?null:this.trackColor||null;},computedThumbColor:function computedThumbColor(){return this.disabled||!this.inputWidth?null:this.thumbColor||this.color||this.defaultColor;},stepNumeric:function stepNumeric(){return this.step>0?parseFloat(this.step):0;},inputValue:{get:function get(){return this.value;},set:function set(val){var min=this.min,max=this.max;val=Math.min(Math.max(val,min),max);// Round value to ensure the
// entire slider range can
// be selected with step
var value=this.roundValue(val);this.lazyValue=value;if(value!==this.value){this.$emit('input',value);}}},interval:function interval(){return 100/(this.max-this.min)*this.stepNumeric;},thumbStyles:function thumbStyles(){return{transition:this.keyPressed>=2?'none':'',left:this.inputWidth+'%'};},tickContainerStyles:function tickContainerStyles(){return{transform:'translate(0, -50%)'};},trackPadding:function trackPadding(){if(this.thumbLabel&&this.isActive)return 0;return 6+(this.isActive&&!this.disabled?3:0);},trackStyles:function trackStyles(){return{transition:this.keyPressed>=2?'none':'',left:'calc('+this.inputWidth+'% + '+this.trackPadding+'px)',width:'calc('+(100-this.inputWidth)+'% - '+this.trackPadding+'px)'};},trackFillStyles:function trackFillStyles(){return{transition:this.keyPressed>=2?'none':'',width:'calc('+this.inputWidth+'% - '+this.trackPadding+'px)'};},numTicks:function numTicks(){return Math.ceil((this.max-this.min)/this.stepNumeric);},inputWidth:function inputWidth(){return(this.roundValue(this.inputValue)-this.min)/(this.max-this.min)*100;}},watch:{isActive:function isActive(val){this.isFocused=val;},min:function min(val){val>this.inputValue&&this.$emit('input',parseFloat(val));},max:function max(val){val<this.inputValue&&this.$emit('input',parseFloat(val));},value:function value(val){this.inputValue=parseFloat(val);}},mounted:function mounted(){this.inputValue=this.value;// Without a v-app, iOS does not work with body selectors
this.app=document.querySelector('[data-app]')||Object(__WEBPACK_IMPORTED_MODULE_6__util_console__["b"/* consoleWarn */])('Missing v-app or a non-body wrapping element with the [data-app] attribute',this);},methods:{onMouseDown:function onMouseDown(e){this.keyPressed=2;var options={passive:true};this.isActive=true;if('touches'in e){this.app.addEventListener('touchmove',this.onMouseMove,options);Object(__WEBPACK_IMPORTED_MODULE_1__util_helpers__["a"/* addOnceEventListener */])(this.app,'touchend',this.onMouseUp);}else{this.app.addEventListener('mousemove',this.onMouseMove,options);Object(__WEBPACK_IMPORTED_MODULE_1__util_helpers__["a"/* addOnceEventListener */])(this.app,'mouseup',this.onMouseUp);}},onMouseUp:function onMouseUp(){this.keyPressed=0;var options={passive:true};this.isActive=false;this.app.removeEventListener('touchmove',this.onMouseMove,options);this.app.removeEventListener('mousemove',this.onMouseMove,options);},onMouseMove:function onMouseMove(e){var _$refs$track$getBound=this.$refs.track.getBoundingClientRect(),offsetLeft=_$refs$track$getBound.left,trackWidth=_$refs$track$getBound.width;var clientX='touches'in e?e.touches[0].clientX:e.clientX;var left=Math.min(Math.max((clientX-offsetLeft)/trackWidth,0),1);if(clientX>=offsetLeft-8&&clientX<=offsetLeft+trackWidth+8){this.inputValue=parseFloat(this.min)+left*(this.max-this.min);}},onKeyDown:function onKeyDown(e){if(this.disabled||![33,34,35,36,37,39].includes(e.keyCode))return;e.preventDefault();var step=this.stepNumeric||1;var steps=(this.max-this.min)/step;if(e.keyCode===37||e.keyCode===39){// Left/right
this.keyPressed+=1;var direction=e.keyCode===37?-1:1;var multiplier=e.shiftKey?3:e.ctrlKey?2:1;this.inputValue=this.inputValue+direction*step*multiplier;}else if(e.keyCode===36){// Home
this.inputValue=parseFloat(this.min);}else if(e.keyCode===35){// End
this.inputValue=parseFloat(this.max);}else/* if (e.keyCode === 33 || e.keyCode === 34) */{// Page up/down
var _direction=e.keyCode===34?-1:1;this.inputValue=this.inputValue-_direction*step*(steps>100?steps/10:10);}},onKeyUp:function onKeyUp(e){this.keyPressed=0;},sliderMove:function sliderMove(e){if(!this.isActive){this.onMouseMove(e);}},genThumbLabel:function genThumbLabel(h){return h('v-scale-transition',{props:{origin:'bottom center'}},[h('div',{staticClass:'slider__thumb--label__container',directives:[{name:'show',value:this.isActive}]},[h('div',{staticClass:'slider__thumb--label','class':this.addBackgroundColorClassChecks({},this.computedThumbColor)},[h('span',{},this.inputValue)])])]);},roundValue:function roundValue(value){if(!this.stepNumeric){return value;}// Format input value using the same number
// of decimals places as in the step prop
var trimmedStep=this.step.toString().trim();var decimals=trimmedStep.indexOf('.')>-1?trimmedStep.length-trimmedStep.indexOf('.')-1:0;return 1*(Math.round(value/this.stepNumeric)*this.stepNumeric).toFixed(decimals);},genThumbContainer:function genThumbContainer(h){var children=[];children.push(h('div',{staticClass:'slider__thumb','class':this.addBackgroundColorClassChecks({},this.computedThumbColor)}));this.thumbLabel&&children.push(this.genThumbLabel(h));return h('div',{staticClass:'slider__thumb-container','class':{'slider__thumb-container--label':this.thumbLabel},style:this.thumbStyles,on:{touchstart:this.onMouseDown,mousedown:this.onMouseDown},ref:'thumb'},children);},genSteps:function genSteps(h){var _this=this;var ticks=Object(__WEBPACK_IMPORTED_MODULE_1__util_helpers__["c"/* createRange */])(this.numTicks+1).map(function(i){var span=h('span',{key:i,staticClass:'slider__tick',style:{left:i*(100/_this.numTicks)+'%'}});return span;});return h('div',{staticClass:'slider__ticks-container',style:this.tickContainerStyles},ticks);},genTrackContainer:function genTrackContainer(h){var children=[h('div',{staticClass:'slider__track','class':this.addBackgroundColorClassChecks({},this.computedTrackColor),style:this.trackStyles}),h('div',{staticClass:'slider__track-fill','class':this.addBackgroundColorClassChecks(),style:this.trackFillStyles})];return h('div',{staticClass:'slider__track__container',ref:'track'},children);}},render:function render(h){var _this2=this;var children=[];children.push(this.genTrackContainer(h));this.step&&this.ticks&&children.push(this.genSteps(h));children.push(this.genThumbContainer(h));var slider=h('div',{staticClass:'slider'},children);return this.genInputGroup([slider],{attrs:{role:'slider',tabindex:this.disabled?-1:this.tabindex},on:Object.assign({},{mouseup:this.sliderMove,keydown:this.onKeyDown,keyup:this.onKeyUp},this.$listeners),directives:[{name:'click-outside',value:function value(){return _this2.isActive=false;}}]});}};/***/},/* 214 *//***/function(module,exports){// removed by extract-text-webpack-plugin
/***/},/* 215 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__VSnackbar__=__webpack_require__(216);/* istanbul ignore next */__WEBPACK_IMPORTED_MODULE_0__VSnackbar__["a"/* default */].install=function install(Vue){Vue.component(__WEBPACK_IMPORTED_MODULE_0__VSnackbar__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_0__VSnackbar__["a"/* default */]);};/* harmony default export */__webpack_exports__["a"]=__WEBPACK_IMPORTED_MODULE_0__VSnackbar__["a"/* default */];/***/},/* 216 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_snackbars_styl__=__webpack_require__(217);/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_snackbars_styl___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_snackbars_styl__);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__mixins_colorable__=__webpack_require__(0);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__mixins_toggleable__=__webpack_require__(5);/* harmony import */var __WEBPACK_IMPORTED_MODULE_3__mixins_positionable__=__webpack_require__(12);/* harmony default export */__webpack_exports__["a"]={name:'v-snackbar',mixins:[__WEBPACK_IMPORTED_MODULE_1__mixins_colorable__["a"/* default */],__WEBPACK_IMPORTED_MODULE_2__mixins_toggleable__["a"/* default */],Object(__WEBPACK_IMPORTED_MODULE_3__mixins_positionable__["b"/* factory */])(['absolute','top','bottom','left','right'])],data:function data(){return{activeTimeout:{}};},props:{autoHeight:Boolean,multiLine:Boolean,// TODO: change this to closeDelay to match other API in delayable.js
timeout:{type:Number,default:6000},vertical:Boolean},computed:{classes:function classes(){return{'snack--active':this.isActive,'snack--absolute':this.absolute,'snack--auto-height':this.autoHeight,'snack--bottom':this.bottom||!this.top,'snack--left':this.left,'snack--multi-line':this.multiLine&&!this.vertical,'snack--right':this.right,'snack--top':this.top,'snack--vertical':this.vertical};}},watch:{isActive:function isActive(){this.setTimeout();}},methods:{setTimeout:function(_setTimeout){function setTimeout(){return _setTimeout.apply(this,arguments);}setTimeout.toString=function(){return _setTimeout.toString();};return setTimeout;}(function(){var _this=this;clearTimeout(this.activeTimeout);if(this.isActive&&this.timeout){this.activeTimeout=setTimeout(function(){_this.isActive=false;},this.timeout);}})},mounted:function mounted(){this.setTimeout();},render:function render(h){var children=[];if(this.isActive){children.push(h('div',{staticClass:'snack',class:this.classes,on:this.$listeners},[h('div',{staticClass:'snack__wrapper',class:this.addBackgroundColorClassChecks()},[h('div',{staticClass:'snack__content'},this.$slots.default)])]));}return h('transition',{attrs:{name:'snack-transition'}},children);}};/***/},/* 217 *//***/function(module,exports){// removed by extract-text-webpack-plugin
/***/},/* 218 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__VSpeedDial__=__webpack_require__(219);/* istanbul ignore next */__WEBPACK_IMPORTED_MODULE_0__VSpeedDial__["a"/* default */].install=function install(Vue){Vue.component(__WEBPACK_IMPORTED_MODULE_0__VSpeedDial__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_0__VSpeedDial__["a"/* default */]);};/* harmony default export */__webpack_exports__["a"]=__WEBPACK_IMPORTED_MODULE_0__VSpeedDial__["a"/* default */];/***/},/* 219 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_speed_dial_styl__=__webpack_require__(220);/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_speed_dial_styl___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_speed_dial_styl__);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__mixins_toggleable__=__webpack_require__(5);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__mixins_positionable__=__webpack_require__(12);/* harmony import */var __WEBPACK_IMPORTED_MODULE_3__mixins_transitionable__=__webpack_require__(25);/* harmony import */var __WEBPACK_IMPORTED_MODULE_4__directives_click_outside__=__webpack_require__(8);function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}/* harmony default export */__webpack_exports__["a"]={name:'v-speed-dial',mixins:[__WEBPACK_IMPORTED_MODULE_2__mixins_positionable__["a"/* default */],__WEBPACK_IMPORTED_MODULE_1__mixins_toggleable__["a"/* default */],__WEBPACK_IMPORTED_MODULE_3__mixins_transitionable__["a"/* default */]],directives:{ClickOutside:__WEBPACK_IMPORTED_MODULE_4__directives_click_outside__["a"/* default */]},props:{direction:{type:String,default:'top',validator:function validator(val){return['top','right','bottom','left'].includes(val);}},openOnHover:Boolean,transition:{type:String,default:'scale-transition'}},computed:{classes:function classes(){return _defineProperty({'speed-dial':true,'speed-dial--top':this.top,'speed-dial--right':this.right,'speed-dial--bottom':this.bottom,'speed-dial--left':this.left,'speed-dial--absolute':this.absolute,'speed-dial--fixed':this.fixed},'speed-dial--direction-'+this.direction,true);}},render:function render(h){var _this=this;var children=[];var data={'class':this.classes,directives:[{name:'click-outside',value:function value(){return _this.isActive=false;}}],on:{click:function click(){return _this.isActive=!_this.isActive;}}};if(this.openOnHover){data.on.mouseenter=function(){return _this.isActive=true;};data.on.mouseleave=function(){return _this.isActive=false;};}if(this.isActive){children=(this.$slots.default||[]).map(function(b,i){b.key=i;return b;});}var list=h('transition-group',{'class':'speed-dial__list',props:{name:this.transition,mode:this.mode,origin:this.origin,tag:'div'}},children);return h('div',data,[this.$slots.activator,list]);}};/***/},/* 220 *//***/function(module,exports){// removed by extract-text-webpack-plugin
/***/},/* 221 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* unused harmony export VStepperHeader *//* unused harmony export VStepperItems *//* harmony import */var __WEBPACK_IMPORTED_MODULE_0__util_helpers__=__webpack_require__(2);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__VStepper__=__webpack_require__(222);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__VStepperStep__=__webpack_require__(224);/* harmony import */var __WEBPACK_IMPORTED_MODULE_3__VStepperContent__=__webpack_require__(225);/* unused harmony reexport VStepper *//* unused harmony reexport VStepperContent *//* unused harmony reexport VStepperStep */var VStepperHeader=Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["d"/* createSimpleFunctional */])('stepper__header');var VStepperItems=Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["d"/* createSimpleFunctional */])('stepper__items');/* istanbul ignore next */__WEBPACK_IMPORTED_MODULE_1__VStepper__["a"/* default */].install=function install(Vue){Vue.component(__WEBPACK_IMPORTED_MODULE_1__VStepper__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_1__VStepper__["a"/* default */]);Vue.component(__WEBPACK_IMPORTED_MODULE_3__VStepperContent__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_3__VStepperContent__["a"/* default */]);Vue.component(__WEBPACK_IMPORTED_MODULE_2__VStepperStep__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_2__VStepperStep__["a"/* default */]);Vue.component(VStepperHeader.name,VStepperHeader);Vue.component(VStepperItems.name,VStepperItems);};/* harmony default export */__webpack_exports__["a"]=__WEBPACK_IMPORTED_MODULE_1__VStepper__["a"/* default */];/***/},/* 222 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_steppers_styl__=__webpack_require__(223);/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_steppers_styl___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_steppers_styl__);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__mixins_themeable__=__webpack_require__(1);/* harmony default export */__webpack_exports__["a"]={name:'v-stepper',mixins:[__WEBPACK_IMPORTED_MODULE_1__mixins_themeable__["a"/* default */]],provide:function provide(){return{stepClick:this.stepClick};},data:function data(){return{inputValue:null,isBooted:false,steps:[],content:[],isReverse:false};},props:{nonLinear:Boolean,altLabels:Boolean,vertical:Boolean,value:[Number,String]},computed:{classes:function classes(){return{'stepper':true,'stepper--is-booted':this.isBooted,'stepper--vertical':this.vertical,'stepper--alt-labels':this.altLabels,'stepper--non-linear':this.nonLinear,'theme--dark':this.dark,'theme--light':this.light};}},watch:{inputValue:function inputValue(val,prev){this.isReverse=Number(val)<Number(prev);for(var index=this.steps.length;--index>=0;){this.steps[index].toggle(this.inputValue);}for(var _index=this.content.length;--_index>=0;){this.content[_index].toggle(this.inputValue,this.isReverse);}this.$emit('input',this.inputValue);prev&&(this.isBooted=true);},value:function value(){var _this=this;this.getSteps();this.$nextTick(function(){return _this.inputValue=_this.value;});}},mounted:function mounted(){this.getSteps();this.inputValue=this.value||this.steps[0].step||1;},methods:{getSteps:function getSteps(){this.steps=[];this.content=[];for(var index=0;index<this.$children.length;index++){var child=this.$children[index];if(child.$options._componentTag==='v-stepper-step'){this.steps.push(child);}else if(child.$options._componentTag==='v-stepper-content'){child.isVertical=this.vertical;this.content.push(child);}}},stepClick:function stepClick(step){var _this2=this;this.getSteps();this.$nextTick(function(){return _this2.inputValue=step;});}},render:function render(h){return h('div',{'class':this.classes},this.$slots.default);}};/***/},/* 223 *//***/function(module,exports){// removed by extract-text-webpack-plugin
/***/},/* 224 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__VIcon__=__webpack_require__(3);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__directives_ripple__=__webpack_require__(17);/* harmony default export */__webpack_exports__["a"]={name:'v-stepper-step',components:{VIcon:__WEBPACK_IMPORTED_MODULE_0__VIcon__["a"/* default */]},directives:{Ripple:__WEBPACK_IMPORTED_MODULE_1__directives_ripple__["a"/* default */]},inject:['stepClick'],data:function data(){return{isActive:false,isInactive:true};},props:{complete:Boolean,completeIcon:{type:String,default:'check'},editIcon:{type:String,default:'edit'},errorIcon:{type:String,default:'warning'},editable:Boolean,rules:{type:Array,default:function _default(){return[];}},step:[Number,String]},computed:{classes:function classes(){return{'stepper__step':true,'stepper__step--active':this.isActive,'stepper__step--editable':this.editable,'stepper__step--inactive':this.isInactive,'stepper__step--error':this.hasError,'stepper__step--complete':this.complete,'error--text':this.hasError};},hasError:function hasError(){return this.rules.some(function(i){return i()!==true;});}},methods:{click:function click(e){e.stopPropagation();if(this.editable){this.stepClick(this.step);}},toggle:function toggle(step){this.isActive=step.toString()===this.step.toString();this.isInactive=Number(step)<Number(this.step);}},render:function render(h){var data={'class':this.classes,directives:[{name:'ripple',value:this.editable}],on:{click:this.click}};var stepContent=void 0;if(this.hasError){stepContent=[h('v-icon',{},this.errorIcon)];}else if(this.complete){if(this.editable){stepContent=[h('v-icon',{},this.editIcon)];}else{stepContent=[h('v-icon',{},this.completeIcon)];}}else{stepContent=this.step;}var step=h('span',{staticClass:'stepper__step__step','class':{'primary':!this.hasError&&(this.complete||this.isActive)}},stepContent);var label=h('div',{staticClass:'stepper__label'},this.$slots.default);return h('div',data,[step,label]);}};/***/},/* 225 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__transitions__=__webpack_require__(7);/* harmony default export */__webpack_exports__["a"]={name:'v-stepper-content',components:{VTabTransition:__WEBPACK_IMPORTED_MODULE_0__transitions__["f"/* VTabTransition */],VTabReverseTransition:__WEBPACK_IMPORTED_MODULE_0__transitions__["e"/* VTabReverseTransition */]},data:function data(){return{height:0,// Must be null to allow
// previous comparison
isActive:null,isReverse:false,isVertical:false};},props:{step:{type:[Number,String],required:true}},computed:{classes:function classes(){return{'stepper__content':true};},computedTransition:function computedTransition(){return this.isReverse?'v-tab-reverse-transition':'v-tab-transition';},styles:function styles(){if(!this.isVertical)return{};return{height:!isNaN(this.height)?this.height+'px':this.height};},wrapperClasses:function wrapperClasses(){return{'stepper__wrapper':true};}},watch:{isActive:function isActive(current,previous){// If active and the previous state
// was null, is just booting up
if(current&&previous==null){return this.height='auto';}if(!this.isVertical)return;if(this.isActive)this.enter();else this.leave();}},mounted:function mounted(){this.$refs.wrapper.addEventListener('transitionend',this.onTransition,false);},beforeDestroy:function beforeDestroy(){this.$refs.wrapper.removeEventListener('transitionend',this.onTransition,false);},methods:{onTransition:function onTransition(e){if(!this.isActive||e.propertyName!=='height')return;this.height='auto';},enter:function enter(){var _this=this;var scrollHeight=0;// Render bug with height
requestAnimationFrame(function(){scrollHeight=_this.$refs.wrapper.scrollHeight;});this.height=0;// Give the collapsing element time to collapse
setTimeout(function(){return _this.height=scrollHeight||'auto';},450);},leave:function leave(){var _this2=this;this.height=this.$refs.wrapper.clientHeight;setTimeout(function(){return _this2.height=0;},10);},toggle:function toggle(step,reverse){this.isActive=step.toString()===this.step.toString();this.isReverse=reverse;}},render:function render(h){var contentData={'class':this.classes};var wrapperData={'class':this.wrapperClasses,style:this.styles,ref:'wrapper'};if(!this.isVertical){contentData.directives=[{name:'show',value:this.isActive}];}var wrapper=h('div',wrapperData,[this.$slots.default]);var content=h('div',contentData,[wrapper]);return h(this.computedTransition,{on:this.$listeners},[content]);}};/***/},/* 226 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__VSubheader__=__webpack_require__(227);/* istanbul ignore next */__WEBPACK_IMPORTED_MODULE_0__VSubheader__["a"/* default */].install=function install(Vue){Vue.component(__WEBPACK_IMPORTED_MODULE_0__VSubheader__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_0__VSubheader__["a"/* default */]);};/* harmony default export */__webpack_exports__["a"]=__WEBPACK_IMPORTED_MODULE_0__VSubheader__["a"/* default */];/***/},/* 227 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_subheaders_styl__=__webpack_require__(228);/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_subheaders_styl___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_subheaders_styl__);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__mixins_themeable__=__webpack_require__(1);/* harmony default export */__webpack_exports__["a"]={name:'v-subheader',functional:true,mixins:[__WEBPACK_IMPORTED_MODULE_1__mixins_themeable__["a"/* default */]],props:{inset:Boolean},render:function render(h,_ref){var data=_ref.data,children=_ref.children,props=_ref.props;data.staticClass=('subheader '+(data.staticClass||'')).trim();if(props.inset)data.staticClass+=' subheader--inset';if(props.light)data.staticClass+=' theme--light';if(props.dark)data.staticClass+=' theme--dark';return h('li',data,children);}};/***/},/* 228 *//***/function(module,exports){// removed by extract-text-webpack-plugin
/***/},/* 229 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__VSwitch__=__webpack_require__(230);/* istanbul ignore next */__WEBPACK_IMPORTED_MODULE_0__VSwitch__["a"/* default */].install=function install(Vue){Vue.component(__WEBPACK_IMPORTED_MODULE_0__VSwitch__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_0__VSwitch__["a"/* default */]);};/* harmony default export */__webpack_exports__["a"]=__WEBPACK_IMPORTED_MODULE_0__VSwitch__["a"/* default */];/***/},/* 230 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_input_groups_styl__=__webpack_require__(18);/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_input_groups_styl___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_input_groups_styl__);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__stylus_components_selection_controls_styl__=__webpack_require__(28);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__stylus_components_selection_controls_styl___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__stylus_components_selection_controls_styl__);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__stylus_components_switch_styl__=__webpack_require__(231);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__stylus_components_switch_styl___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__stylus_components_switch_styl__);/* harmony import */var __WEBPACK_IMPORTED_MODULE_3__mixins_rippleable__=__webpack_require__(22);/* harmony import */var __WEBPACK_IMPORTED_MODULE_4__mixins_selectable__=__webpack_require__(40);/* harmony import */var __WEBPACK_IMPORTED_MODULE_5__directives_touch__=__webpack_require__(9);// Mixins
// Directives
/* harmony default export */__webpack_exports__["a"]={name:'v-switch',mixins:[__WEBPACK_IMPORTED_MODULE_3__mixins_rippleable__["a"/* default */],__WEBPACK_IMPORTED_MODULE_4__mixins_selectable__["a"/* default */]],directives:{Touch:__WEBPACK_IMPORTED_MODULE_5__directives_touch__["a"/* default */]},computed:{classes:function classes(){var classes={'input-group--selection-controls switch':true};if(this.hasError){classes['error--text']=true;}else{return this.addTextColorClassChecks(classes);}return classes;},rippleClasses:function rippleClasses(){return{'input-group--selection-controls__ripple':true,'input-group--selection-controls__ripple--active':this.isActive};},containerClasses:function containerClasses(){return{'input-group--selection-controls__container':true,'input-group--selection-controls__container--light':this.light,'input-group--selection-controls__container--disabled':this.disabled};},toggleClasses:function toggleClasses(){return{'input-group--selection-controls__toggle':true,'input-group--selection-controls__toggle--active':this.isActive};}},methods:{onSwipeLeft:function onSwipeLeft(){if(this.isActive)this.toggle();},onSwipeRight:function onSwipeRight(){if(!this.isActive)this.toggle();}},render:function render(h){var container=h('div',{'class':this.containerClasses},[h('div',{'class':this.toggleClasses}),this.genRipple({directives:[{name:'touch',value:{left:this.onSwipeLeft,right:this.onSwipeRight}}]})]);return this.genInputGroup([container]);}};/***/},/* 231 *//***/function(module,exports){// removed by extract-text-webpack-plugin
/***/},/* 232 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__VSystemBar__=__webpack_require__(233);/* istanbul ignore next */__WEBPACK_IMPORTED_MODULE_0__VSystemBar__["a"/* default */].install=function install(Vue){Vue.component(__WEBPACK_IMPORTED_MODULE_0__VSystemBar__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_0__VSystemBar__["a"/* default */]);};/* harmony default export */__webpack_exports__["a"]=__WEBPACK_IMPORTED_MODULE_0__VSystemBar__["a"/* default */];/***/},/* 233 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_system_bars_styl__=__webpack_require__(234);/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_system_bars_styl___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_system_bars_styl__);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__mixins_applicationable__=__webpack_require__(15);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__mixins_colorable__=__webpack_require__(0);/* harmony import */var __WEBPACK_IMPORTED_MODULE_3__mixins_themeable__=__webpack_require__(1);/* harmony default export */__webpack_exports__["a"]={name:'v-system-bar',mixins:[Object(__WEBPACK_IMPORTED_MODULE_1__mixins_applicationable__["a"/* default */])('bar',['height','window']),__WEBPACK_IMPORTED_MODULE_2__mixins_colorable__["a"/* default */],__WEBPACK_IMPORTED_MODULE_3__mixins_themeable__["a"/* default */]],props:{height:{type:[Number,String],validator:function validator(v){return!isNaN(parseInt(v));}},lightsOut:Boolean,status:Boolean,window:Boolean},computed:{classes:function classes(){return this.addBackgroundColorClassChecks(Object.assign({'system-bar--lights-out':this.lightsOut,'system-bar--absolute':this.absolute,'system-bar--fixed':!this.absolute&&(this.app||this.fixed),'system-bar--status':this.status,'system-bar--window':this.window},this.themeClasses));},computedHeight:function computedHeight(){if(this.height)return parseInt(this.height);return this.window?32:24;}},methods:{/**
     * Update the application layout
     *
     * @return {number}
     */updateApplication:function updateApplication(){return this.computedHeight;}},render:function render(h){var data={staticClass:'system-bar','class':this.classes,style:{height:this.computedHeight+'px'}};return h('div',data,this.$slots.default);}};/***/},/* 234 *//***/function(module,exports){// removed by extract-text-webpack-plugin
/***/},/* 235 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__VTabs__=__webpack_require__(236);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__VTab__=__webpack_require__(243);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__VTabsItems__=__webpack_require__(64);/* harmony import */var __WEBPACK_IMPORTED_MODULE_3__VTabItem__=__webpack_require__(244);/* harmony import */var __WEBPACK_IMPORTED_MODULE_4__VTabsSlider__=__webpack_require__(65);/* unused harmony reexport VTabs *//* unused harmony reexport VTabItem *//* unused harmony reexport VTab *//* unused harmony reexport VTabsItems *//* unused harmony reexport VTabsSlider *//* istanbul ignore next */__WEBPACK_IMPORTED_MODULE_0__VTabs__["a"/* default */].install=function install(Vue){Vue.component(__WEBPACK_IMPORTED_MODULE_0__VTabs__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_0__VTabs__["a"/* default */]);Vue.component(__WEBPACK_IMPORTED_MODULE_1__VTab__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_1__VTab__["a"/* default */]);Vue.component(__WEBPACK_IMPORTED_MODULE_2__VTabsItems__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_2__VTabsItems__["a"/* default */]);Vue.component(__WEBPACK_IMPORTED_MODULE_3__VTabItem__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_3__VTabItem__["a"/* default */]);Vue.component(__WEBPACK_IMPORTED_MODULE_4__VTabsSlider__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_4__VTabsSlider__["a"/* default */]);};/* harmony default export */__webpack_exports__["a"]=__WEBPACK_IMPORTED_MODULE_0__VTabs__["a"/* default */];/***/},/* 236 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_tabs_styl__=__webpack_require__(237);/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_tabs_styl___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_tabs_styl__);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__VIcon__=__webpack_require__(3);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__VTabsItems__=__webpack_require__(64);/* harmony import */var __WEBPACK_IMPORTED_MODULE_3__VTabsSlider__=__webpack_require__(65);/* harmony import */var __WEBPACK_IMPORTED_MODULE_4__mixins_tabs_computed__=__webpack_require__(238);/* harmony import */var __WEBPACK_IMPORTED_MODULE_5__mixins_tabs_generators__=__webpack_require__(239);/* harmony import */var __WEBPACK_IMPORTED_MODULE_6__mixins_tabs_props__=__webpack_require__(240);/* harmony import */var __WEBPACK_IMPORTED_MODULE_7__mixins_tabs_touch__=__webpack_require__(241);/* harmony import */var __WEBPACK_IMPORTED_MODULE_8__mixins_tabs_watchers__=__webpack_require__(242);/* harmony import */var __WEBPACK_IMPORTED_MODULE_9__mixins_colorable__=__webpack_require__(0);/* harmony import */var __WEBPACK_IMPORTED_MODULE_10__mixins_ssr_bootable__=__webpack_require__(24);/* harmony import */var __WEBPACK_IMPORTED_MODULE_11__mixins_themeable__=__webpack_require__(1);/* harmony import */var __WEBPACK_IMPORTED_MODULE_12__mixins_registrable__=__webpack_require__(4);/* harmony import */var __WEBPACK_IMPORTED_MODULE_13__directives_resize__=__webpack_require__(11);/* harmony import */var __WEBPACK_IMPORTED_MODULE_14__directives_touch__=__webpack_require__(9);// Styles
// Component imports
// Component level mixins
// Mixins
// Directives
/* harmony default export */__webpack_exports__["a"]={name:'v-tabs',components:{VIcon:__WEBPACK_IMPORTED_MODULE_1__VIcon__["a"/* default */],VTabsItems:__WEBPACK_IMPORTED_MODULE_2__VTabsItems__["a"/* default */],VTabsSlider:__WEBPACK_IMPORTED_MODULE_3__VTabsSlider__["a"/* default */]},mixins:[Object(__WEBPACK_IMPORTED_MODULE_12__mixins_registrable__["b"/* provide */])('tabs'),__WEBPACK_IMPORTED_MODULE_9__mixins_colorable__["a"/* default */],__WEBPACK_IMPORTED_MODULE_10__mixins_ssr_bootable__["a"/* default */],__WEBPACK_IMPORTED_MODULE_4__mixins_tabs_computed__["a"/* default */],__WEBPACK_IMPORTED_MODULE_6__mixins_tabs_props__["a"/* default */],__WEBPACK_IMPORTED_MODULE_5__mixins_tabs_generators__["a"/* default */],__WEBPACK_IMPORTED_MODULE_7__mixins_tabs_touch__["a"/* default */],__WEBPACK_IMPORTED_MODULE_8__mixins_tabs_watchers__["a"/* default */],__WEBPACK_IMPORTED_MODULE_11__mixins_themeable__["a"/* default */]],directives:{Resize:__WEBPACK_IMPORTED_MODULE_13__directives_resize__["a"/* default */],Touch:__WEBPACK_IMPORTED_MODULE_14__directives_touch__["a"/* default */]},provide:function provide(){return{tabClick:this.tabClick,tabProxy:this.tabProxy,registerItems:this.registerItems,unregisterItems:this.unregisterItems};},data:function data(){return{bar:[],content:[],isBooted:false,isOverflowing:false,lazyValue:this.value,nextIconVisible:false,prevIconVisible:false,resizeTimeout:null,reverse:false,scrollOffset:0,sliderWidth:null,sliderLeft:null,startX:0,tabsContainer:null,tabs:[],tabItems:null,transitionTime:300};},methods:{checkPrevIcon:function checkPrevIcon(){return this.scrollOffset>0;},checkNextIcon:function checkNextIcon(){// Check one scroll ahead to know the width of right-most item
var container=this.$refs.container;var wrapper=this.$refs.wrapper;return container.clientWidth>this.scrollOffset+wrapper.clientWidth;},callSlider:function callSlider(){this.setOverflow();if(this.hideSlider||!this.activeTab)return false;// Give screen time to paint
var action=this.activeTab.action;var activeTab=action===this.activeTab?this.activeTab:this.tabs.find(function(tab){return tab.action===action;});if(!activeTab)return;this.sliderWidth=activeTab.$el.scrollWidth;this.sliderLeft=activeTab.$el.offsetLeft;},/**
     * When v-navigation-drawer changes the
     * width of the container, call resize
     * after the transition is complete
     */onContainerResize:function onContainerResize(){clearTimeout(this.resizeTimeout);this.resizeTimeout=setTimeout(this.callSlider,this.transitionTime);},onResize:function onResize(){if(this._isDestroyed)return;this.callSlider();this.scrollIntoView();},overflowCheck:function overflowCheck(e,fn){this.isOverflowing&&fn(e);},scrollTo:function scrollTo(direction){this.scrollOffset=this.newOffset(direction);},setOverflow:function setOverflow(){this.isOverflowing=this.$refs.bar.clientWidth<this.$refs.container.clientWidth;},findActiveLink:function findActiveLink(){var _this=this;if(!this.tabs.length||this.lazyValue)return;var activeIndex=this.tabs.findIndex(function(tabItem,index){var id=tabItem.action===tabItem?index.toString():tabItem.action;return id===_this.lazyValue||tabItem.$el.firstChild.className.indexOf(_this.activeClass)>-1;});var index=activeIndex>-1?activeIndex:0;var tab=this.tabs[index];/* istanbul ignore next */// There is not a reliable way to test
this.inputValue=tab.action===tab?index:tab.action;},parseNodes:function parseNodes(){var item=[];var items=[];var slider=[];var tab=[];var length=(this.$slots.default||[]).length;for(var i=0;i<length;i++){var vnode=this.$slots.default[i];/* istanbul ignore else */if(vnode.componentOptions){switch(vnode.componentOptions.Ctor.options.name){case'v-tabs-slider':slider.push(vnode);break;case'v-tabs-items':items.push(vnode);break;case'v-tab-item':item.push(vnode);break;// case 'v-tab' - intentionally omitted
default:tab.push(vnode);}}}return{tab:tab,slider:slider,items:items,item:item};},register:function register(options){this.tabs.push(options);},scrollIntoView:function scrollIntoView(){if(!this.activeTab)return false;var _activeTab$$el=this.activeTab.$el,clientWidth=_activeTab$$el.clientWidth,offsetLeft=_activeTab$$el.offsetLeft;var wrapperWidth=this.$refs.wrapper.clientWidth;var totalWidth=wrapperWidth+this.scrollOffset;var itemOffset=clientWidth+offsetLeft;var additionalOffset=clientWidth*0.3;/* instanbul ignore else */if(offsetLeft<this.scrollOffset){this.scrollOffset=Math.max(offsetLeft-additionalOffset,0);}else if(totalWidth<itemOffset){this.scrollOffset-=totalWidth-itemOffset-additionalOffset;}},tabClick:function tabClick(tab){this.inputValue=tab.action===tab?this.tabs.indexOf(tab):tab.action;this.scrollIntoView();},tabProxy:function tabProxy(val){this.inputValue=val;},registerItems:function registerItems(fn){this.tabItems=fn;},unregisterItems:function unregisterItems(){this.tabItems=null;},unregister:function unregister(tab){this.tabs=this.tabs.filter(function(o){return o!==tab;});},updateTabs:function updateTabs(){for(var index=this.tabs.length;--index>=0;){this.tabs[index].toggle(this.target);}this.setOverflow();}},mounted:function mounted(){this.prevIconVisible=this.checkPrevIcon();this.nextIconVisible=this.checkNextIcon();},render:function render(h){var _parseNodes=this.parseNodes(),tab=_parseNodes.tab,slider=_parseNodes.slider,items=_parseNodes.items,item=_parseNodes.item;return h('div',{staticClass:'tabs',directives:[{name:'resize',arg:400,modifiers:{quiet:true},value:this.onResize}]},[this.genBar([this.hideSlider?null:this.genSlider(slider),tab]),this.genItems(items,item)]);}};/***/},/* 237 *//***/function(module,exports){// removed by extract-text-webpack-plugin
/***/},/* 238 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/**
 * Tabs computed
 *
 * @mixin
 *//* harmony default export */__webpack_exports__["a"]={computed:{activeIndex:function activeIndex(){var _this=this;return this.tabs.findIndex(function(tab,index){var id=tab.action===tab?index.toString():tab.action;return id===_this.lazyValue;});},activeTab:function activeTab(){if(!this.tabs.length)return undefined;return this.tabs[this.activeIndex];},containerStyles:function containerStyles(){return this.height?{height:parseInt(this.height,10)+'px'}:null;},hasArrows:function hasArrows(){return(this.showArrows||!this.isMobile)&&this.isOverflowing;},inputValue:{get:function get(){return this.lazyValue;},set:function set(val){// Always use strings
val=val.toString();this.lazyValue=val;this.$emit('input',val);}},isMobile:function isMobile(){return this.$vuetify.breakpoint.width<this.mobileBreakPoint;},sliderStyles:function sliderStyles(){return{left:this.sliderLeft+'px',transition:this.sliderLeft!=null?null:'none',width:this.sliderWidth+'px'};},target:function target(){return this.activeTab?this.activeTab.action:null;}}};/***/},/* 239 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/**
 * Tabs generators
 *
 * @mixin
 *//* harmony default export */__webpack_exports__["a"]={methods:{genBar:function genBar(items){return this.$createElement('div',{staticClass:'tabs__bar','class':this.addBackgroundColorClassChecks({'theme--dark':this.dark,'theme--light':this.light}),ref:'bar'},[this.genTransition('prev'),this.genWrapper(this.genContainer(items)),this.genTransition('next')]);},genContainer:function genContainer(items){return this.$createElement('div',{staticClass:'tabs__container',class:{'tabs__container--align-with-title':this.alignWithTitle,'tabs__container--centered':this.centered,'tabs__container--fixed-tabs':this.fixedTabs,'tabs__container--grow':this.grow,'tabs__container--icons-and-text':this.iconsAndText,'tabs__container--overflow':this.isOverflowing,'tabs__container--right':this.right},style:this.containerStyles,ref:'container'},items);},genIcon:function genIcon(direction){var _this=this;if(!this.hasArrows||!this[direction+'IconVisible'])return null;return this.$createElement('v-icon',{staticClass:'tabs__icon tabs__icon--'+direction,props:{disabled:!this[direction+'IconVisible']},on:{click:function click(){return _this.scrollTo(direction);}}},this[direction+'Icon']);},genItems:function genItems(items,item){if(items.length>0)return items;if(!item.length)return null;return this.$createElement('v-tabs-items',item);},genTransition:function genTransition(direction){return this.$createElement('transition',{props:{name:'fade-transition'}},[this.genIcon(direction)]);},genWrapper:function genWrapper(items){var _this2=this;return this.$createElement('div',{staticClass:'tabs__wrapper',class:{'tabs__wrapper--show-arrows':this.hasArrows},ref:'wrapper',directives:[{name:'touch',value:{start:function start(e){return _this2.overflowCheck(e,_this2.onTouchStart);},move:function move(e){return _this2.overflowCheck(e,_this2.onTouchMove);},end:function end(e){return _this2.overflowCheck(e,_this2.onTouchEnd);}}}]},[items]);},genSlider:function genSlider(items){if(!items.length){items=[this.$createElement('v-tabs-slider',{props:{color:this.sliderColor}})];}return this.$createElement('div',{staticClass:'tabs__slider-wrapper',style:this.sliderStyles},items);}}};/***/},/* 240 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/**
 * Tabs props
 *
 * @mixin
 *//* harmony default export */__webpack_exports__["a"]={props:{alignWithTitle:Boolean,centered:Boolean,fixedTabs:Boolean,grow:Boolean,height:{type:[Number,String],default:undefined,validator:function validator(v){return!isNaN(parseInt(v));}},hideSlider:Boolean,iconsAndText:Boolean,mobileBreakPoint:{type:[Number,String],default:1264,validator:function validator(v){return!isNaN(parseInt(v));}},nextIcon:{type:String,default:'chevron_right'},prevIcon:{type:String,default:'chevron_left'},right:Boolean,showArrows:Boolean,sliderColor:{type:String,default:'accent'},value:[Number,String]}};/***/},/* 241 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/**
 * Tabs touch
 *
 * @mixin
 *//* harmony default export */__webpack_exports__["a"]={methods:{newOffset:function newOffset(direction){var clientWidth=this.$refs.wrapper.clientWidth;if(direction==='prev'){return Math.max(this.scrollOffset-clientWidth,0);}else{return Math.min(this.scrollOffset+clientWidth,this.$refs.container.clientWidth-clientWidth);}},onTouchStart:function onTouchStart(e){this.startX=this.scrollOffset+e.touchstartX;this.$refs.container.style.transition='none';this.$refs.container.style.willChange='transform';},onTouchMove:function onTouchMove(e){this.scrollOffset=this.startX-e.touchmoveX;},onTouchEnd:function onTouchEnd(){var container=this.$refs.container;var wrapper=this.$refs.wrapper;var maxScrollOffset=container.clientWidth-wrapper.clientWidth;container.style.transition=null;container.style.willChange=null;/* istanbul ignore else */if(this.scrollOffset<0||!this.isOverflowing){this.scrollOffset=0;}else if(this.scrollOffset>=maxScrollOffset){this.scrollOffset=maxScrollOffset;}}}};/***/},/* 242 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/**
 * Tabs watchers
 *
 * @mixin
 *//* harmony default export */__webpack_exports__["a"]={watch:{activeTab:function activeTab(tab,prev){!prev&&tab&&this.updateTabs();setTimeout(this.callSlider,0);if(!tab)return;var action=tab.action;this.tabItems&&this.tabItems(action===tab?this.tabs.indexOf(tab).toString():action);},alignWithTitle:'callSlider',centered:'callSlider',fixedTabs:'callSlider',isBooted:'findActiveLink',lazyValue:'updateTabs',right:'callSlider',value:function value(val){var tab=this.tabs.find(function(tab){return tab.action===val;})||this.tabs[val];if(!tab)return;this.tabClick(tab);},'$vuetify.application.left':'onContainerResize','$vuetify.application.right':'onContainerResize',scrollOffset:function scrollOffset(val){this.$refs.container.style.transform='translateX('+-val+'px)';if(this.hasArrows){this.prevIconVisible=this.checkPrevIcon();this.nextIconVisible=this.checkNextIcon();}}}};/***/},/* 243 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__mixins_routable__=__webpack_require__(13);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__mixins_registrable__=__webpack_require__(4);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__util_helpers__=__webpack_require__(2);function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}// Mixins
// Utilities
/* harmony default export */__webpack_exports__["a"]={name:'v-tab',mixins:[Object(__WEBPACK_IMPORTED_MODULE_1__mixins_registrable__["a"/* inject */])('tabs','v-tab','v-tabs'),__WEBPACK_IMPORTED_MODULE_0__mixins_routable__["a"/* default */]],inject:['tabClick'],data:function data(){return{isActive:false};},props:{activeClass:{type:String,default:'tabs__item--active'},ripple:{type:[Boolean,Object],default:true}},computed:{classes:function classes(){return _defineProperty({'tabs__item':true,'tabs__item--disabled':this.disabled},this.activeClass,!this.to&&this.isActive);},action:function action(){var to=this.to||this.href;if(typeof to==='string')return to.replace('#','');if(to===Object(to)&&(to.hasOwnProperty('name')||to.hasOwnProperty('path')))return to.name||to.path;return this;}},watch:{$route:'onRouteChange'},mounted:function mounted(){this.tabs.register(this);this.onRouteChange();},beforeDestroy:function beforeDestroy(){this.tabs.unregister(this);},methods:{click:function click(e){// If user provides an
// actual link, do not
// prevent default
if(this.href&&this.href.indexOf('#')>-1)e.preventDefault();this.$emit('click',e);this.to||this.tabClick(this);},onRouteChange:function onRouteChange(){var _this=this;if(!this.to||!this.$refs.link)return;var path='_vnode.data.class.'+this.activeClass;this.$nextTick(function(){if(Object(__WEBPACK_IMPORTED_MODULE_2__util_helpers__["h"/* getObjectValueByPath */])(_this.$refs.link,path)){_this.tabClick(_this);}});},toggle:function toggle(action){this.isActive=action===this||action===this.action;}},render:function render(h){var link=this.generateRouteLink();var data=link.data;// If disabled, use div as anchor tags do not support
// being disabled
var tag=this.disabled?'div':link.tag;data.ref='link';return h('div',{staticClass:'tabs__div'},[h(tag,data,this.$slots.default)]);}};/***/},/* 244 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__mixins_bootable__=__webpack_require__(16);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__transitions__=__webpack_require__(7);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__mixins_registrable__=__webpack_require__(4);/* harmony import */var __WEBPACK_IMPORTED_MODULE_3__directives_touch__=__webpack_require__(9);/* harmony default export */__webpack_exports__["a"]={name:'v-tab-item',mixins:[__WEBPACK_IMPORTED_MODULE_0__mixins_bootable__["a"/* default */],Object(__WEBPACK_IMPORTED_MODULE_2__mixins_registrable__["a"/* inject */])('tabs','v-tab-item','v-tabs-items')],components:{VTabTransition:__WEBPACK_IMPORTED_MODULE_1__transitions__["f"/* VTabTransition */],VTabReverseTransition:__WEBPACK_IMPORTED_MODULE_1__transitions__["e"/* VTabReverseTransition */]},directives:{Touch:__WEBPACK_IMPORTED_MODULE_3__directives_touch__["a"/* default */]},data:function data(){return{isActive:false,reverse:false};},props:{id:String,transition:{type:[Boolean,String],default:'tab-transition'},reverseTransition:{type:[Boolean,String],default:'tab-reverse-transition'}},computed:{computedTransition:function computedTransition(){return this.reverse?this.reverseTransition:this.transition;}},methods:{toggle:function toggle(target,reverse,showTransition,index){this.$el.style.transition=!showTransition?'none':null;this.reverse=reverse;this.isActive=(this.id||index.toString())===target;}},mounted:function mounted(){this.tabs.register(this);},beforeDestroy:function beforeDestroy(){this.tabs.unregister(this);},render:function render(h){var data={staticClass:'tabs__content',directives:[{name:'show',value:this.isActive}],domProps:{id:this.id},on:this.$listeners};var div=h('div',data,this.showLazyContent(this.$slots.default));if(!this.computedTransition)return div;return h('transition',{props:{name:this.computedTransition}},[div]);}};/***/},/* 245 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__VTextField__=__webpack_require__(246);/* istanbul ignore next */__WEBPACK_IMPORTED_MODULE_0__VTextField__["a"/* default */].install=function install(Vue){Vue.component(__WEBPACK_IMPORTED_MODULE_0__VTextField__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_0__VTextField__["a"/* default */]);};/* harmony default export */__webpack_exports__["a"]=__WEBPACK_IMPORTED_MODULE_0__VTextField__["a"/* default */];/***/},/* 246 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_input_groups_styl__=__webpack_require__(18);/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_input_groups_styl___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_input_groups_styl__);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__stylus_components_text_fields_styl__=__webpack_require__(45);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__stylus_components_text_fields_styl___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__stylus_components_text_fields_styl__);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__mixins_colorable__=__webpack_require__(0);/* harmony import */var __WEBPACK_IMPORTED_MODULE_3__mixins_input__=__webpack_require__(19);/* harmony import */var __WEBPACK_IMPORTED_MODULE_4__mixins_maskable__=__webpack_require__(51);/* harmony import */var __WEBPACK_IMPORTED_MODULE_5__mixins_soloable__=__webpack_require__(52);var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};// Styles
// Mixins
/* harmony default export */__webpack_exports__["a"]={name:'v-text-field',mixins:[__WEBPACK_IMPORTED_MODULE_2__mixins_colorable__["a"/* default */],__WEBPACK_IMPORTED_MODULE_3__mixins_input__["a"/* default */],__WEBPACK_IMPORTED_MODULE_4__mixins_maskable__["a"/* default */],__WEBPACK_IMPORTED_MODULE_5__mixins_soloable__["a"/* default */]],inheritAttrs:false,data:function data(){return{initialValue:null,inputHeight:null,internalChange:false,badInput:false};},props:{autofocus:Boolean,autoGrow:Boolean,box:Boolean,clearable:Boolean,color:{type:String,default:'primary'},counter:[Boolean,Number,String],fullWidth:Boolean,multiLine:Boolean,noResize:Boolean,placeholder:String,prefix:String,rowHeight:{type:[Number,String],default:24,validator:function validator(v){return!isNaN(parseFloat(v));}},rows:{type:[Number,String],default:5,validator:function validator(v){return!isNaN(parseInt(v,10));}},singleLine:Boolean,suffix:String,textarea:Boolean,type:{type:String,default:'text'}},computed:{classes:function classes(){var classes=_extends({},this.genSoloClasses(),{'input-group--text-field':true,'input-group--text-field-box':this.box,'input-group--single-line':this.singleLine||this.isSolo,'input-group--multi-line':this.multiLine,'input-group--full-width':this.fullWidth,'input-group--no-resize':this.noResizeHandle,'input-group--prefix':this.prefix,'input-group--suffix':this.suffix,'input-group--textarea':this.textarea});if(this.hasError){classes['error--text']=true;}else{return this.addTextColorClassChecks(classes);}return classes;},count:function count(){var inputLength=void 0;if(this.inputValue)inputLength=this.inputValue.toString().length;else inputLength=0;return inputLength+' / '+this.counterLength;},counterLength:function counterLength(){var parsedLength=parseInt(this.counter,10);return isNaN(parsedLength)?25:parsedLength;},inputValue:{get:function get(){return this.lazyValue;},set:function set(val){if(this.mask){this.lazyValue=this.unmaskText(this.maskText(this.unmaskText(val)));this.setSelectionRange();}else{this.lazyValue=val;this.$emit('input',this.lazyValue);}}},isDirty:function isDirty(){return this.lazyValue!=null&&this.lazyValue.toString().length>0||this.badInput||['time','date','datetime-local','week','month'].includes(this.type);},isTextarea:function isTextarea(){return this.multiLine||this.textarea;},noResizeHandle:function noResizeHandle(){return this.isTextarea&&(this.noResize||this.shouldAutoGrow);},shouldAutoGrow:function shouldAutoGrow(){return this.isTextarea&&this.autoGrow;}},watch:{isFocused:function isFocused(val){if(val){this.initialValue=this.lazyValue;}else if(this.initialValue!==this.lazyValue){this.$emit('change',this.lazyValue);}},value:function value(val){var _this=this;if(this.mask&&!this.internalChange){var masked=this.maskText(this.unmaskText(val));this.lazyValue=this.unmaskText(masked);// Emit when the externally set value was modified internally
String(val)!==this.lazyValue&&this.$nextTick(function(){_this.$refs.input.value=masked;_this.$emit('input',_this.lazyValue);});}else this.lazyValue=val;if(this.internalChange)this.internalChange=false;!this.validateOnBlur&&this.validate();this.shouldAutoGrow&&this.calculateInputHeight();}},mounted:function mounted(){this.shouldAutoGrow&&this.calculateInputHeight();this.autofocus&&this.focus();},methods:{calculateInputHeight:function calculateInputHeight(){var _this2=this;this.inputHeight=null;this.$nextTick(function(){var height=_this2.$refs.input?_this2.$refs.input.scrollHeight:0;var minHeight=parseInt(_this2.rows,10)*parseFloat(_this2.rowHeight);_this2.inputHeight=Math.max(minHeight,height);});},onInput:function onInput(e){this.mask&&this.resetSelections(e.target);this.inputValue=e.target.value;this.badInput=e.target.validity&&e.target.validity.badInput;this.shouldAutoGrow&&this.calculateInputHeight();},blur:function blur(e){var _this3=this;this.isFocused=false;// Reset internalChange state
// to allow external change
// to persist
this.internalChange=false;this.$nextTick(function(){_this3.validate();});this.$emit('blur',e);},focus:function focus(e){if(!this.$refs.input)return;this.isFocused=true;if(document.activeElement!==this.$refs.input){this.$refs.input.focus();}this.$emit('focus',e);},keyDown:function keyDown(e){// Prevents closing of a
// dialog when pressing
// enter
if(this.isTextarea&&this.isFocused&&e.keyCode===13){e.stopPropagation();}this.internalChange=true;},genCounter:function genCounter(){return this.$createElement('div',{'class':{'input-group__counter':true,'input-group__counter--error':this.hasError}},this.count);},genInput:function genInput(){var tag=this.isTextarea?'textarea':'input';var listeners=Object.assign({},this.$listeners);delete listeners['change'];// Change should not be bound externally
var data={style:{},domProps:{value:this.maskText(this.lazyValue)},attrs:_extends({},this.$attrs,{autofocus:this.autofocus,disabled:this.disabled,required:this.required,readonly:this.readonly,tabindex:this.tabindex,'aria-label':(!this.$attrs||!this.$attrs.id)&&this.label// Label `for` will be set if we have an id
}),on:Object.assign(listeners,{blur:this.blur,input:this.onInput,focus:this.focus,keydown:this.keyDown}),ref:'input'};if(this.shouldAutoGrow){data.style.height=this.inputHeight&&this.inputHeight+'px';}if(this.placeholder)data.attrs.placeholder=this.placeholder;if(!this.isTextarea){data.attrs.type=this.type;}else{data.attrs.rows=this.rows;}if(this.mask){data.attrs.maxlength=this.masked.length;}var children=[this.$createElement(tag,data)];this.prefix&&children.unshift(this.genFix('prefix'));this.suffix&&children.push(this.genFix('suffix'));return children;},genFix:function genFix(type){return this.$createElement('span',{'class':'input-group--text-field__'+type},this[type]);},clearableCallback:function clearableCallback(){var _this4=this;this.inputValue=null;this.$nextTick(function(){return _this4.$refs.input.focus();});}},render:function render(){return this.genInputGroup(this.genInput(),{attrs:{tabindex:false}});}};/***/},/* 247 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__VTimePicker__=__webpack_require__(248);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__VTimePickerClock__=__webpack_require__(67);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__VTimePickerTitle__=__webpack_require__(66);/* unused harmony reexport VTimePicker *//* unused harmony reexport VTimePickerClock *//* unused harmony reexport VTimePickerTitle *//* istanbul ignore next */__WEBPACK_IMPORTED_MODULE_0__VTimePicker__["a"/* default */].install=function install(Vue){Vue.component(__WEBPACK_IMPORTED_MODULE_0__VTimePicker__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_0__VTimePicker__["a"/* default */]);Vue.component(__WEBPACK_IMPORTED_MODULE_1__VTimePickerClock__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_1__VTimePickerClock__["a"/* default */]);Vue.component(__WEBPACK_IMPORTED_MODULE_2__VTimePickerTitle__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_2__VTimePickerTitle__["a"/* default */]);};/* harmony default export */__webpack_exports__["a"]=__WEBPACK_IMPORTED_MODULE_0__VTimePicker__["a"/* default */];/***/},/* 248 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__VTimePickerTitle__=__webpack_require__(66);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__VTimePickerClock__=__webpack_require__(67);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__mixins_picker__=__webpack_require__(62);/* harmony import */var __WEBPACK_IMPORTED_MODULE_3__util_helpers__=__webpack_require__(2);/* harmony import */var __WEBPACK_IMPORTED_MODULE_4__VDatePicker_util_pad__=__webpack_require__(23);var _slicedToArray=function(){function sliceIterator(arr,i){var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[Symbol.iterator](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break;}}catch(err){_d=true;_e=err;}finally{try{if(!_n&&_i["return"])_i["return"]();}finally{if(_d)throw _e;}}return _arr;}return function(arr,i){if(Array.isArray(arr)){return arr;}else if(Symbol.iterator in Object(arr)){return sliceIterator(arr,i);}else{throw new TypeError("Invalid attempt to destructure non-iterable instance");}};}();// Components
// Mixins
// Utils
var rangeHours24=Object(__WEBPACK_IMPORTED_MODULE_3__util_helpers__["c"/* createRange */])(24);var rangeHours12am=Object(__WEBPACK_IMPORTED_MODULE_3__util_helpers__["c"/* createRange */])(12);var rangeHours12pm=rangeHours12am.map(function(v){return v+12;});var rangeMinutes=Object(__WEBPACK_IMPORTED_MODULE_3__util_helpers__["c"/* createRange */])(60);/* harmony default export */__webpack_exports__["a"]={name:'v-time-picker',components:{VTimePickerTitle:__WEBPACK_IMPORTED_MODULE_0__VTimePickerTitle__["a"/* default */],VTimePickerClock:__WEBPACK_IMPORTED_MODULE_1__VTimePickerClock__["a"/* default */]},mixins:[__WEBPACK_IMPORTED_MODULE_2__mixins_picker__["a"/* default */]],data:function data(){return{inputHour:null,inputMinute:null,period:'am',selectingHour:true};},props:{allowedHours:Function,allowedMinutes:Function,format:{type:String,default:'ampm',validator:function validator(val){return['ampm','24hr'].includes(val);}},min:String,max:String,scrollable:Boolean,value:null},computed:{isAllowedHourCb:function isAllowedHourCb(){var _this=this;if(!this.min&&!this.max)return this.allowedHours;var minHour=this.min?this.min.split(':')[0]:0;var maxHour=this.max?this.max.split(':')[0]:23;return function(val){return val>=minHour*1&&val<=maxHour*1&&(!_this.allowedHours||_this.allowedHours(val));};},isAllowedMinuteCb:function isAllowedMinuteCb(){var _this2=this;var isHourAllowed=!this.allowedHours||this.allowedHours(this.inputHour);if(!this.min&&!this.max){return isHourAllowed?this.allowedMinutes:function(){return false;};}var _ref=this.min?this.min.split(':'):[0,0],_ref2=_slicedToArray(_ref,2),minHour=_ref2[0],minMinute=_ref2[1];var _ref3=this.max?this.max.split(':'):[23,59],_ref4=_slicedToArray(_ref3,2),maxHour=_ref4[0],maxMinute=_ref4[1];var minTime=minHour*60+minMinute*1;var maxTime=maxHour*60+maxMinute*1;return function(val){var time=60*_this2.inputHour+val;return time>=minTime&&time<=maxTime&&isHourAllowed&&(!_this2.allowedMinutes||_this2.allowedMinutes(val));};},isAmPm:function isAmPm(){return this.format==='ampm';}},watch:{value:'setInputData'},methods:{emitValue:function emitValue(){if(this.inputHour!=null&&this.inputMinute!=null){this.$emit('input',Object(__WEBPACK_IMPORTED_MODULE_4__VDatePicker_util_pad__["a"/* default */])(this.inputHour)+':'+Object(__WEBPACK_IMPORTED_MODULE_4__VDatePicker_util_pad__["a"/* default */])(this.inputMinute));}},setPeriod:function setPeriod(period){this.period=period;if(this.inputHour!=null){var newHour=this.inputHour+(period==='am'?-12:12);this.inputHour=this.firstAllowed('hour',newHour);this.emitValue();}},setInputData:function setInputData(value){if(value==null){this.inputHour=null;this.inputMinute=null;return;}if(value instanceof Date){this.inputHour=value.getHours();this.inputMinute=value.getMinutes();}else{var _ref5=value.trim().toLowerCase().match(/^(\d+):(\d+)(:\d+)?([ap]m)?$/,'')||[],_ref6=_slicedToArray(_ref5,5),hour=_ref6[1],minute=_ref6[2],period=_ref6[4];this.inputHour=period?this.convert12to24(parseInt(hour,10),period):parseInt(hour,10);this.inputMinute=parseInt(minute,10);}this.period=this.inputHour<12?'am':'pm';},convert24to12:function convert24to12(hour){return hour?(hour-1)%12+1:12;},convert12to24:function convert12to24(hour,period){return hour%12+(period==='pm'?12:0);},onInput:function onInput(value){if(this.selectingHour){this.inputHour=this.isAmPm?this.convert12to24(value,this.period):value;}else{this.inputMinute=value;}this.emitValue();},onChange:function onChange(){if(!this.selectingHour){this.$emit('change',this.value);}this.selectingHour=!this.selectingHour;},firstAllowed:function firstAllowed(type,value){var allowedFn=type==='hour'?this.isAllowedHourCb:this.isAllowedMinuteCb;if(!allowedFn)return value;// TODO: clean up
var range=type==='minute'?rangeMinutes:this.isAmPm?value<12?rangeHours12am:rangeHours12pm:rangeHours24;var first=range.find(function(v){return allowedFn((v+value)%range.length+range[0]);});return((first||0)+value)%range.length+range[0];},genClock:function genClock(){return this.$createElement('v-time-picker-clock',{props:{allowedValues:this.selectingHour?this.isAllowedHourCb:this.isAllowedMinuteCb,color:this.color,dark:this.dark,double:this.selectingHour&&!this.isAmPm,format:this.selectingHour?this.isAmPm?this.convert24to12:function(val){return val;}:function(val){return Object(__WEBPACK_IMPORTED_MODULE_4__VDatePicker_util_pad__["a"/* default */])(val,2);},max:this.selectingHour?this.isAmPm&&this.period==='am'?11:23:59,min:this.selectingHour&&this.isAmPm&&this.period==='pm'?12:0,scrollable:this.scrollable,size:this.width-(!this.fullWidth&&this.landscape?80:20),step:this.selectingHour?1:5,value:this.selectingHour?this.inputHour:this.inputMinute},on:{input:this.onInput,change:this.onChange},ref:'clock'});},genPickerBody:function genPickerBody(){return this.$createElement('div',{staticClass:'time-picker-clock__container',style:{width:this.width+'px',height:this.width-(!this.fullWidth&&this.landscape?60:0)+'px'},key:this.selectingHour},[this.genClock()]);},genPickerTitle:function genPickerTitle(){var _this3=this;return this.$createElement('v-time-picker-title',{props:{ampm:this.isAmPm,hour:this.inputHour,minute:this.inputMinute,period:this.period,selectingHour:this.selectingHour},on:{'update:selectingHour':function updateSelectingHour(value){return _this3.selectingHour=value;},'update:period':this.setPeriod},ref:'title',slot:'title'});}},mounted:function mounted(){this.setInputData(this.value);},render:function render(h){return this.genPicker('picker--time');}};/***/},/* 249 *//***/function(module,exports){// removed by extract-text-webpack-plugin
/***/},/* 250 *//***/function(module,exports){// removed by extract-text-webpack-plugin
/***/},/* 251 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* unused harmony export VToolbarTitle *//* unused harmony export VToolbarItems *//* harmony import */var __WEBPACK_IMPORTED_MODULE_0__util_helpers__=__webpack_require__(2);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__VToolbar__=__webpack_require__(252);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__VToolbarSideIcon__=__webpack_require__(254);/* unused harmony reexport VToolbar *//* unused harmony reexport VToolbarSideIcon */var VToolbarTitle=Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["d"/* createSimpleFunctional */])('toolbar__title');var VToolbarItems=Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["d"/* createSimpleFunctional */])('toolbar__items');/* istanbul ignore next */__WEBPACK_IMPORTED_MODULE_1__VToolbar__["a"/* default */].install=function install(Vue){Vue.component(__WEBPACK_IMPORTED_MODULE_1__VToolbar__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_1__VToolbar__["a"/* default */]);Vue.component(VToolbarItems.name,VToolbarItems);Vue.component(VToolbarTitle.name,VToolbarTitle);Vue.component(__WEBPACK_IMPORTED_MODULE_2__VToolbarSideIcon__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_2__VToolbarSideIcon__["a"/* default */]);};/* harmony default export */__webpack_exports__["a"]=__WEBPACK_IMPORTED_MODULE_1__VToolbar__["a"/* default */];/***/},/* 252 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_toolbar_styl__=__webpack_require__(253);/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_toolbar_styl___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_toolbar_styl__);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__mixins_applicationable__=__webpack_require__(15);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__mixins_colorable__=__webpack_require__(0);/* harmony import */var __WEBPACK_IMPORTED_MODULE_3__mixins_themeable__=__webpack_require__(1);/* harmony import */var __WEBPACK_IMPORTED_MODULE_4__mixins_ssr_bootable__=__webpack_require__(24);/* harmony import */var __WEBPACK_IMPORTED_MODULE_5__directives_scroll__=__webpack_require__(68);// Styles
// Mixins
// Directives
/* harmony default export */__webpack_exports__["a"]={name:'v-toolbar',mixins:[Object(__WEBPACK_IMPORTED_MODULE_1__mixins_applicationable__["a"/* default */])('top',['clippedLeft','clippedRight','computedHeight','invertedScroll','manualScroll']),__WEBPACK_IMPORTED_MODULE_2__mixins_colorable__["a"/* default */],__WEBPACK_IMPORTED_MODULE_4__mixins_ssr_bootable__["a"/* default */],__WEBPACK_IMPORTED_MODULE_3__mixins_themeable__["a"/* default */]],directives:{Scroll:__WEBPACK_IMPORTED_MODULE_5__directives_scroll__["a"/* default */]},data:function data(){return{activeTimeout:null,currentScroll:0,heights:{mobileLandscape:48,mobile:56,desktop:64,dense:48},isActive:true,isExtended:false,isScrollingUp:false,previousScroll:null,previousScrollDirection:null,savedScroll:0,target:null};},props:{card:Boolean,clippedLeft:Boolean,clippedRight:Boolean,dense:Boolean,extended:Boolean,extensionHeight:{type:[Number,String],validator:function validator(v){return!isNaN(parseInt(v));}},flat:Boolean,floating:Boolean,height:{type:[Number,String],validator:function validator(v){return!isNaN(parseInt(v));}},invertedScroll:Boolean,manualScroll:Boolean,prominent:Boolean,scrollOffScreen:Boolean,scrollTarget:String,scrollThreshold:{type:Number,default:300},tabs:Boolean},computed:{computedContentHeight:function computedContentHeight(){if(this.height)return parseInt(this.height);if(this.dense)return this.heights.dense;if(this.prominent||this.$vuetify.breakpoint.mdAndUp)return this.heights.desktop;if(this.$vuetify.breakpoint.width>this.$vuetify.breakpoint.height)return this.heights.mobileLandscape;return this.heights.mobile;},computedExtensionHeight:function computedExtensionHeight(){if(this.tabs)return 48;if(this.extensionHeight)return parseInt(this.extensionHeight);return this.computedContentHeight;},computedHeight:function computedHeight(){if(!this.isExtended)return this.computedContentHeight;return this.computedContentHeight+this.computedExtensionHeight;},computedMarginTop:function computedMarginTop(){if(!this.app)return 0;return this.$vuetify.application.bar;},classes:function classes(){return this.addBackgroundColorClassChecks({'toolbar':true,'elevation-0':this.flat||!this.isActive&&!this.tabs,'toolbar--absolute':this.absolute,'toolbar--card':this.card,'toolbar--clipped':this.clippedLeft||this.clippedRight,'toolbar--dense':this.dense,'toolbar--extended':this.isExtended,'toolbar--fixed':!this.absolute&&(this.app||this.fixed),'toolbar--floating':this.floating,'toolbar--prominent':this.prominent,'theme--dark':this.dark,'theme--light':this.light});},computedPaddingLeft:function computedPaddingLeft(){if(!this.app||this.clippedLeft)return 0;return this.$vuetify.application.left;},computedPaddingRight:function computedPaddingRight(){if(!this.app||this.clippedRight)return 0;return this.$vuetify.application.right;},computedTransform:function computedTransform(){return!this.isActive?-this.computedHeight:0;},currentThreshold:function currentThreshold(){return Math.abs(this.currentScroll-this.savedScroll);},styles:function styles(){return{marginTop:this.computedMarginTop+'px',paddingRight:this.computedPaddingRight+'px',paddingLeft:this.computedPaddingLeft+'px',transform:'translateY('+this.computedTransform+'px)'};}},watch:{currentThreshold:function currentThreshold(val){if(this.invertedScroll){return this.isActive=this.currentScroll>this.scrollThreshold;}if(val<this.scrollThreshold||!this.isBooted)return;this.isActive=this.isScrollingUp;this.savedScroll=this.currentScroll;},isActive:function isActive(){this.savedScroll=0;},invertedScroll:function invertedScroll(val){this.isActive=!val;},manualScroll:function manualScroll(val){this.isActive=!val;},isScrollingUp:function isScrollingUp(val){this.savedScroll=this.savedScroll||this.currentScroll;}},created:function created(){if(this.invertedScroll||this.manualScroll)this.isActive=false;},mounted:function mounted(){if(this.scrollTarget){this.target=document.querySelector(this.scrollTarget);}},methods:{onScroll:function onScroll(){if(!this.scrollOffScreen||this.manualScroll||typeof window==='undefined')return;var target=this.target||window;this.currentScroll=this.scrollTarget?target.scrollTop:target.pageYOffset||document.documentElement.scrollTop;this.isScrollingUp=this.currentScroll<this.previousScroll;this.previousScroll=this.currentScroll;},/**
     * Update the application layout
     *
     * @return {number}
     */updateApplication:function updateApplication(){return this.invertedScroll||this.manualScroll?0:this.computedHeight;}},render:function render(h){this.isExtended=this.extended||!!this.$slots.extension;var children=[];var data={'class':this.classes,style:this.styles,on:this.$listeners};data.directives=[{arg:this.scrollTarget,name:'scroll',value:this.onScroll}];children.push(h('div',{staticClass:'toolbar__content',style:{height:this.computedContentHeight+'px'},ref:'content'},this.$slots.default));if(this.isExtended){children.push(h('div',{staticClass:'toolbar__extension',style:{height:this.computedExtensionHeight+'px'}},this.$slots.extension));}return h('nav',data,children);}};/***/},/* 253 *//***/function(module,exports){// removed by extract-text-webpack-plugin
/***/},/* 254 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__components_VBtn__=__webpack_require__(10);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__components_VIcon__=__webpack_require__(3);/* harmony default export */__webpack_exports__["a"]={name:'v-toolbar-side-icon',functional:true,render:function render(h,_ref){var slots=_ref.slots,listeners=_ref.listeners,props=_ref.props,data=_ref.data;var classes=data.staticClass?data.staticClass+' toolbar__side-icon':'toolbar__side-icon';var d=Object.assign(data,{staticClass:classes,props:Object.assign(props,{icon:true}),on:listeners});var defaultSlot=slots().default;return h(__WEBPACK_IMPORTED_MODULE_0__components_VBtn__["a"/* default */],d,defaultSlot||[h(__WEBPACK_IMPORTED_MODULE_1__components_VIcon__["a"/* default */],'menu')]);}};/***/},/* 255 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__VTooltip__=__webpack_require__(256);/* istanbul ignore next */__WEBPACK_IMPORTED_MODULE_0__VTooltip__["a"/* default */].install=function install(Vue){Vue.component(__WEBPACK_IMPORTED_MODULE_0__VTooltip__["a"/* default */].name,__WEBPACK_IMPORTED_MODULE_0__VTooltip__["a"/* default */]);};/* harmony default export */__webpack_exports__["a"]=__WEBPACK_IMPORTED_MODULE_0__VTooltip__["a"/* default */];/***/},/* 256 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_tooltips_styl__=__webpack_require__(257);/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__stylus_components_tooltips_styl___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylus_components_tooltips_styl__);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__mixins_colorable__=__webpack_require__(0);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__mixins_delayable__=__webpack_require__(48);/* harmony import */var __WEBPACK_IMPORTED_MODULE_3__mixins_dependent__=__webpack_require__(20);/* harmony import */var __WEBPACK_IMPORTED_MODULE_4__mixins_detachable__=__webpack_require__(26);/* harmony import */var __WEBPACK_IMPORTED_MODULE_5__mixins_menuable__=__webpack_require__(49);/* harmony import */var __WEBPACK_IMPORTED_MODULE_6__mixins_toggleable__=__webpack_require__(5);function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}// Mixins
/* harmony default export */__webpack_exports__["a"]={name:'v-tooltip',mixins:[__WEBPACK_IMPORTED_MODULE_1__mixins_colorable__["a"/* default */],__WEBPACK_IMPORTED_MODULE_2__mixins_delayable__["a"/* default */],__WEBPACK_IMPORTED_MODULE_3__mixins_dependent__["a"/* default */],__WEBPACK_IMPORTED_MODULE_4__mixins_detachable__["a"/* default */],__WEBPACK_IMPORTED_MODULE_5__mixins_menuable__["a"/* default */],__WEBPACK_IMPORTED_MODULE_6__mixins_toggleable__["a"/* default */]],data:function data(){return{calculatedMinWidth:0,closeDependents:false};},props:{debounce:{type:[Number,String],default:0},disabled:Boolean,fixed:{type:Boolean,default:true},openDelay:{type:[Number,String],default:200},tag:{type:String,default:'span'},transition:String,zIndex:{default:null}},computed:{calculatedLeft:function calculatedLeft(){var _dimensions=this.dimensions,activator=_dimensions.activator,content=_dimensions.content;var unknown=!this.bottom&&!this.left&&!this.top&&!this.right;var left=0;if(this.top||this.bottom||unknown){left=activator.left+activator.width/2-content.width/2;}else if(this.left||this.right){left=activator.left+(this.right?activator.width:-content.width)+(this.right?10:-10);}return this.calcXOverflow(left)+'px';},calculatedTop:function calculatedTop(){var _dimensions2=this.dimensions,activator=_dimensions2.activator,content=_dimensions2.content;var top=0;if(this.top||this.bottom){top=activator.top-(this.top?activator.height:-activator.height)-(this.top?0:-10);}else if(this.left||this.right){top=activator.top+activator.height/2-content.height/2;}return this.calcYOverflow(top+this.pageYOffset)+'px';},classes:function classes(){return{'tooltip--top':this.top,'tooltip--right':this.right,'tooltip--bottom':this.bottom,'tooltip--left':this.left};},computedTransition:function computedTransition(){if(this.transition)return this.transition;if(this.top)return'slide-y-reverse-transition';if(this.right)return'slide-x-transition';if(this.bottom)return'slide-y-transition';if(this.left)return'slide-x-reverse-transition';},offsetY:function offsetY(){return this.top||this.bottom;},offsetX:function offsetX(){return this.left||this.right;},styles:function styles(){return{left:this.calculatedLeft,maxWidth:isNaN(this.maxWidth)?this.maxWidth:this.maxWidth+'px',opacity:this.isActive?0.9:0,top:this.calculatedTop,zIndex:this.zIndex||this.activeZIndex};}},methods:{activate:function activate(){// Update coordinates and dimensions of menu
// and its activator
this.updateDimensions();// Start the transition
requestAnimationFrame(this.startTransition);}},mounted:function mounted(){this.value&&this.callActivate();},render:function render(h){var _addBackgroundColorCl,_this=this;var tooltip=h('div',{staticClass:'tooltip__content','class':this.addBackgroundColorClassChecks((_addBackgroundColorCl={},_defineProperty(_addBackgroundColorCl,this.contentClass,true),_defineProperty(_addBackgroundColorCl,'menuable__content__active',this.isActive),_addBackgroundColorCl)),style:this.styles,attrs:this.attrs,directives:[{name:'show',value:this.isContentActive}],ref:'content'},this.$slots.default);return h(this.tag,{staticClass:'tooltip','class':this.classes},[h('transition',{props:{name:this.computedTransition}},[tooltip]),h('span',{on:this.disabled?{}:{mouseenter:function mouseenter(){_this.runDelay('open',function(){return _this.isActive=true;});},mouseleave:function mouseleave(){_this.runDelay('close',function(){return _this.isActive=false;});}},ref:'activator'},this.$slots.activator)]);}};/***/},/* 257 *//***/function(module,exports){// removed by extract-text-webpack-plugin
/***/},/* 258 *//***/function(module,__webpack_exports__,__webpack_require__){"use strict";Object.defineProperty(__webpack_exports__,"__esModule",{value:true});/* harmony export (immutable) */__webpack_exports__["default"]=install;/* harmony import */var __WEBPACK_IMPORTED_MODULE_0__click_outside__=__webpack_require__(8);/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__resize__=__webpack_require__(11);/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__ripple__=__webpack_require__(17);/* harmony import */var __WEBPACK_IMPORTED_MODULE_3__scroll__=__webpack_require__(68);/* harmony import */var __WEBPACK_IMPORTED_MODULE_4__touch__=__webpack_require__(9);/* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__,"ClickOutside",function(){return __WEBPACK_IMPORTED_MODULE_0__click_outside__["a"];});/* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__,"Ripple",function(){return __WEBPACK_IMPORTED_MODULE_2__ripple__["a"];});/* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__,"Resize",function(){return __WEBPACK_IMPORTED_MODULE_1__resize__["a"];});/* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__,"Scroll",function(){return __WEBPACK_IMPORTED_MODULE_3__scroll__["a"];});/* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__,"Touch",function(){return __WEBPACK_IMPORTED_MODULE_4__touch__["a"];});function install(Vue){Vue.directive('click-outside',__WEBPACK_IMPORTED_MODULE_0__click_outside__["a"/* default */]);Vue.directive('ripple',__WEBPACK_IMPORTED_MODULE_2__ripple__["a"/* default */]);Vue.directive('resize',__WEBPACK_IMPORTED_MODULE_1__resize__["a"/* default */]);Vue.directive('scroll',__WEBPACK_IMPORTED_MODULE_3__scroll__["a"/* default */]);Vue.directive('touch',__WEBPACK_IMPORTED_MODULE_4__touch__["a"/* default */]);}/***/}]/******/)["default"]);});//# sourceMappingURL=vuetify.js.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14)(module)))

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function () {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function get() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function get() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.store = undefined;

var _vue = __webpack_require__(2);

var _vue2 = _interopRequireDefault(_vue);

var _vuex = __webpack_require__(16);

var _vuex2 = _interopRequireDefault(_vuex);

var _getters = __webpack_require__(17);

var _getters2 = _interopRequireDefault(_getters);

var _actions = __webpack_require__(18);

var _actions2 = _interopRequireDefault(_actions);

var _mutations = __webpack_require__(19);

var _mutations2 = _interopRequireDefault(_mutations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vuex2.default);

var store = exports.store = new _vuex2.default.Store({
	state: {},
	getters: _getters2.default,
	mutations: _mutations2.default,
	actions: _actions2.default
});

/***/ }),
/* 16 */
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	getRandomImage: function getRandomImage(context, q) {
		var key = '8061014-3041347b399a40caf453735b5';
		var url = 'https://pixabay.com/api/?key=' + key + '&q=' + q.replace(/ /g, '+') + '&image_type=photo&safesearch=true&orientation=horizontal&category=travel&per_page=200';
		fetch(url).then(function (response) {
			return response.json();
		}).then(function (result) {
			return result.hits[random(1, 200)].webformatURL;
		});

		function random(min, max) {
			Math.floor(Math.random() * min + max);
		}
	}
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _vue = __webpack_require__(2);

var _vue2 = _interopRequireDefault(_vue);

var _vueRouter = __webpack_require__(21);

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _Index = __webpack_require__(22);

var _Index2 = _interopRequireDefault(_Index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vueRouter2.default);

exports.default = new _vueRouter2.default({
	mode: 'history',
	routes: [{
		path: '/',
		name: 'Index',
		component: _Index2.default
	}]
});

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
  * vue-router v3.0.1
  * (c) 2017 Evan You
  * @license MIT
  */
/*  */

function assert(condition, message) {
  if (!condition) {
    throw new Error("[vue-router] " + message);
  }
}

function warn(condition, message) {
  if (process.env.NODE_ENV !== 'production' && !condition) {
    typeof console !== 'undefined' && console.warn("[vue-router] " + message);
  }
}

function isError(err) {
  return Object.prototype.toString.call(err).indexOf('Error') > -1;
}

var View = {
  name: 'router-view',
  functional: true,
  props: {
    name: {
      type: String,
      default: 'default'
    }
  },
  render: function render(_, ref) {
    var props = ref.props;
    var children = ref.children;
    var parent = ref.parent;
    var data = ref.data;

    data.routerView = true;

    // directly use parent context's createElement() function
    // so that components rendered by router-view can resolve named slots
    var h = parent.$createElement;
    var name = props.name;
    var route = parent.$route;
    var cache = parent._routerViewCache || (parent._routerViewCache = {});

    // determine current view depth, also check to see if the tree
    // has been toggled inactive but kept-alive.
    var depth = 0;
    var inactive = false;
    while (parent && parent._routerRoot !== parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++;
      }
      if (parent._inactive) {
        inactive = true;
      }
      parent = parent.$parent;
    }
    data.routerViewDepth = depth;

    // render previous view if the tree is inactive and kept-alive
    if (inactive) {
      return h(cache[name], data, children);
    }

    var matched = route.matched[depth];
    // render empty node if no matched route
    if (!matched) {
      cache[name] = null;
      return h();
    }

    var component = cache[name] = matched.components[name];

    // attach instance registration hook
    // this will be called in the instance's injected lifecycle hooks
    data.registerRouteInstance = function (vm, val) {
      // val could be undefined for unregistration
      var current = matched.instances[name];
      if (val && current !== vm || !val && current === vm) {
        matched.instances[name] = val;
      }
    }

    // also register instance in prepatch hook
    // in case the same component instance is reused across different routes
    ;(data.hook || (data.hook = {})).prepatch = function (_, vnode) {
      matched.instances[name] = vnode.componentInstance;
    };

    // resolve props
    var propsToPass = data.props = resolveProps(route, matched.props && matched.props[name]);
    if (propsToPass) {
      // clone to prevent mutation
      propsToPass = data.props = extend({}, propsToPass);
      // pass non-declared props as attrs
      var attrs = data.attrs = data.attrs || {};
      for (var key in propsToPass) {
        if (!component.props || !(key in component.props)) {
          attrs[key] = propsToPass[key];
          delete propsToPass[key];
        }
      }
    }

    return h(component, data, children);
  }
};

function resolveProps(route, config) {
  switch (typeof config === 'undefined' ? 'undefined' : _typeof(config)) {
    case 'undefined':
      return;
    case 'object':
      return config;
    case 'function':
      return config(route);
    case 'boolean':
      return config ? route.params : undefined;
    default:
      if (process.env.NODE_ENV !== 'production') {
        warn(false, "props in \"" + route.path + "\" is a " + (typeof config === 'undefined' ? 'undefined' : _typeof(config)) + ", " + "expecting an object, function or boolean.");
      }
  }
}

function extend(to, from) {
  for (var key in from) {
    to[key] = from[key];
  }
  return to;
}

/*  */

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {
  return '%' + c.charCodeAt(0).toString(16);
};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {
  return encodeURIComponent(str).replace(encodeReserveRE, encodeReserveReplacer).replace(commaRE, ',');
};

var decode = decodeURIComponent;

function resolveQuery(query, extraQuery, _parseQuery) {
  if (extraQuery === void 0) extraQuery = {};

  var parse = _parseQuery || parseQuery;
  var parsedQuery;
  try {
    parsedQuery = parse(query || '');
  } catch (e) {
    process.env.NODE_ENV !== 'production' && warn(false, e.message);
    parsedQuery = {};
  }
  for (var key in extraQuery) {
    parsedQuery[key] = extraQuery[key];
  }
  return parsedQuery;
}

function parseQuery(query) {
  var res = {};

  query = query.trim().replace(/^(\?|#|&)/, '');

  if (!query) {
    return res;
  }

  query.split('&').forEach(function (param) {
    var parts = param.replace(/\+/g, ' ').split('=');
    var key = decode(parts.shift());
    var val = parts.length > 0 ? decode(parts.join('=')) : null;

    if (res[key] === undefined) {
      res[key] = val;
    } else if (Array.isArray(res[key])) {
      res[key].push(val);
    } else {
      res[key] = [res[key], val];
    }
  });

  return res;
}

function stringifyQuery(obj) {
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encode(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encode(key));
        } else {
          result.push(encode(key) + '=' + encode(val2));
        }
      });
      return result.join('&');
    }

    return encode(key) + '=' + encode(val);
  }).filter(function (x) {
    return x.length > 0;
  }).join('&') : null;
  return res ? "?" + res : '';
}

/*  */

var trailingSlashRE = /\/?$/;

function createRoute(record, location, redirectedFrom, router) {
  var stringifyQuery$$1 = router && router.options.stringifyQuery;

  var query = location.query || {};
  try {
    query = clone(query);
  } catch (e) {}

  var route = {
    name: location.name || record && record.name,
    meta: record && record.meta || {},
    path: location.path || '/',
    hash: location.hash || '',
    query: query,
    params: location.params || {},
    fullPath: getFullPath(location, stringifyQuery$$1),
    matched: record ? formatMatch(record) : []
  };
  if (redirectedFrom) {
    route.redirectedFrom = getFullPath(redirectedFrom, stringifyQuery$$1);
  }
  return Object.freeze(route);
}

function clone(value) {
  if (Array.isArray(value)) {
    return value.map(clone);
  } else if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
    var res = {};
    for (var key in value) {
      res[key] = clone(value[key]);
    }
    return res;
  } else {
    return value;
  }
}

// the starting route that represents the initial state
var START = createRoute(null, {
  path: '/'
});

function formatMatch(record) {
  var res = [];
  while (record) {
    res.unshift(record);
    record = record.parent;
  }
  return res;
}

function getFullPath(ref, _stringifyQuery) {
  var path = ref.path;
  var query = ref.query;if (query === void 0) query = {};
  var hash = ref.hash;if (hash === void 0) hash = '';

  var stringify = _stringifyQuery || stringifyQuery;
  return (path || '/') + stringify(query) + hash;
}

function isSameRoute(a, b) {
  if (b === START) {
    return a === b;
  } else if (!b) {
    return false;
  } else if (a.path && b.path) {
    return a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') && a.hash === b.hash && isObjectEqual(a.query, b.query);
  } else if (a.name && b.name) {
    return a.name === b.name && a.hash === b.hash && isObjectEqual(a.query, b.query) && isObjectEqual(a.params, b.params);
  } else {
    return false;
  }
}

function isObjectEqual(a, b) {
  if (a === void 0) a = {};
  if (b === void 0) b = {};

  // handle null value #1566
  if (!a || !b) {
    return a === b;
  }
  var aKeys = Object.keys(a);
  var bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false;
  }
  return aKeys.every(function (key) {
    var aVal = a[key];
    var bVal = b[key];
    // check nested equality
    if ((typeof aVal === 'undefined' ? 'undefined' : _typeof(aVal)) === 'object' && (typeof bVal === 'undefined' ? 'undefined' : _typeof(bVal)) === 'object') {
      return isObjectEqual(aVal, bVal);
    }
    return String(aVal) === String(bVal);
  });
}

function isIncludedRoute(current, target) {
  return current.path.replace(trailingSlashRE, '/').indexOf(target.path.replace(trailingSlashRE, '/')) === 0 && (!target.hash || current.hash === target.hash) && queryIncludes(current.query, target.query);
}

function queryIncludes(current, target) {
  for (var key in target) {
    if (!(key in current)) {
      return false;
    }
  }
  return true;
}

/*  */

// work around weird flow bug
var toTypes = [String, Object];
var eventTypes = [String, Array];

var Link = {
  name: 'router-link',
  props: {
    to: {
      type: toTypes,
      required: true
    },
    tag: {
      type: String,
      default: 'a'
    },
    exact: Boolean,
    append: Boolean,
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    event: {
      type: eventTypes,
      default: 'click'
    }
  },
  render: function render(h) {
    var this$1 = this;

    var router = this.$router;
    var current = this.$route;
    var ref = router.resolve(this.to, current, this.append);
    var location = ref.location;
    var route = ref.route;
    var href = ref.href;

    var classes = {};
    var globalActiveClass = router.options.linkActiveClass;
    var globalExactActiveClass = router.options.linkExactActiveClass;
    // Support global empty active class
    var activeClassFallback = globalActiveClass == null ? 'router-link-active' : globalActiveClass;
    var exactActiveClassFallback = globalExactActiveClass == null ? 'router-link-exact-active' : globalExactActiveClass;
    var activeClass = this.activeClass == null ? activeClassFallback : this.activeClass;
    var exactActiveClass = this.exactActiveClass == null ? exactActiveClassFallback : this.exactActiveClass;
    var compareTarget = location.path ? createRoute(null, location, null, router) : route;

    classes[exactActiveClass] = isSameRoute(current, compareTarget);
    classes[activeClass] = this.exact ? classes[exactActiveClass] : isIncludedRoute(current, compareTarget);

    var handler = function handler(e) {
      if (guardEvent(e)) {
        if (this$1.replace) {
          router.replace(location);
        } else {
          router.push(location);
        }
      }
    };

    var on = { click: guardEvent };
    if (Array.isArray(this.event)) {
      this.event.forEach(function (e) {
        on[e] = handler;
      });
    } else {
      on[this.event] = handler;
    }

    var data = {
      class: classes
    };

    if (this.tag === 'a') {
      data.on = on;
      data.attrs = { href: href };
    } else {
      // find the first <a> child and apply listener and href
      var a = findAnchor(this.$slots.default);
      if (a) {
        // in case the <a> is a static node
        a.isStatic = false;
        var extend = _Vue.util.extend;
        var aData = a.data = extend({}, a.data);
        aData.on = on;
        var aAttrs = a.data.attrs = extend({}, a.data.attrs);
        aAttrs.href = href;
      } else {
        // doesn't have <a> child, apply listener to self
        data.on = on;
      }
    }

    return h(this.tag, data, this.$slots.default);
  }
};

function guardEvent(e) {
  // don't redirect with control keys
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) {
    return;
  }
  // don't redirect when preventDefault called
  if (e.defaultPrevented) {
    return;
  }
  // don't redirect on right click
  if (e.button !== undefined && e.button !== 0) {
    return;
  }
  // don't redirect if `target="_blank"`
  if (e.currentTarget && e.currentTarget.getAttribute) {
    var target = e.currentTarget.getAttribute('target');
    if (/\b_blank\b/i.test(target)) {
      return;
    }
  }
  // this may be a Weex event which doesn't have this method
  if (e.preventDefault) {
    e.preventDefault();
  }
  return true;
}

function findAnchor(children) {
  if (children) {
    var child;
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      if (child.tag === 'a') {
        return child;
      }
      if (child.children && (child = findAnchor(child.children))) {
        return child;
      }
    }
  }
}

var _Vue;

function install(Vue) {
  if (install.installed && _Vue === Vue) {
    return;
  }
  install.installed = true;

  _Vue = Vue;

  var isDef = function isDef(v) {
    return v !== undefined;
  };

  var registerInstance = function registerInstance(vm, callVal) {
    var i = vm.$options._parentVnode;
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal);
    }
  };

  Vue.mixin({
    beforeCreate: function beforeCreate() {
      if (isDef(this.$options.router)) {
        this._routerRoot = this;
        this._router = this.$options.router;
        this._router.init(this);
        Vue.util.defineReactive(this, '_route', this._router.history.current);
      } else {
        this._routerRoot = this.$parent && this.$parent._routerRoot || this;
      }
      registerInstance(this, this);
    },
    destroyed: function destroyed() {
      registerInstance(this);
    }
  });

  Object.defineProperty(Vue.prototype, '$router', {
    get: function get() {
      return this._routerRoot._router;
    }
  });

  Object.defineProperty(Vue.prototype, '$route', {
    get: function get() {
      return this._routerRoot._route;
    }
  });

  Vue.component('router-view', View);
  Vue.component('router-link', Link);

  var strats = Vue.config.optionMergeStrategies;
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created;
}

/*  */

var inBrowser = typeof window !== 'undefined';

/*  */

function resolvePath(relative, base, append) {
  var firstChar = relative.charAt(0);
  if (firstChar === '/') {
    return relative;
  }

  if (firstChar === '?' || firstChar === '#') {
    return base + relative;
  }

  var stack = base.split('/');

  // remove trailing segment if:
  // - not appending
  // - appending to trailing slash (last segment is empty)
  if (!append || !stack[stack.length - 1]) {
    stack.pop();
  }

  // resolve relative path
  var segments = relative.replace(/^\//, '').split('/');
  for (var i = 0; i < segments.length; i++) {
    var segment = segments[i];
    if (segment === '..') {
      stack.pop();
    } else if (segment !== '.') {
      stack.push(segment);
    }
  }

  // ensure leading slash
  if (stack[0] !== '') {
    stack.unshift('');
  }

  return stack.join('/');
}

function parsePath(path) {
  var hash = '';
  var query = '';

  var hashIndex = path.indexOf('#');
  if (hashIndex >= 0) {
    hash = path.slice(hashIndex);
    path = path.slice(0, hashIndex);
  }

  var queryIndex = path.indexOf('?');
  if (queryIndex >= 0) {
    query = path.slice(queryIndex + 1);
    path = path.slice(0, queryIndex);
  }

  return {
    path: path,
    query: query,
    hash: hash
  };
}

function cleanPath(path) {
  return path.replace(/\/\//g, '/');
}

var isarray = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

/**
 * Expose `pathToRegexp`.
 */
var pathToRegexp_1 = pathToRegexp;
var parse_1 = parse;
var compile_1 = compile;
var tokensToFunction_1 = tokensToFunction;
var tokensToRegExp_1 = tokensToRegExp;

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
// Match escaped characters that would otherwise appear in future matches.
// This allows the user to escape special characters that won't transform.
'(\\\\.)',
// Match Express-style parameters and un-named parameters with a prefix
// and optional suffixes. Matches appear as:
//
// "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
// "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
// "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
'([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'].join('|'), 'g');

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse(str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || '/';
  var res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length;

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1];
      continue;
    }

    var next = str[index];
    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var modifier = res[6];
    var asterisk = res[7];

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path);
      path = '';
    }

    var partial = prefix != null && next != null && next !== prefix;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = res[2] || defaultDelimiter;
    var pattern = capture || group;

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?'
    });
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index);
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path);
  }

  return tokens;
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile(str, options) {
  return tokensToFunction(parse(str, options));
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty(str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
  });
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk(str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
  });
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction(tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length);

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (_typeof(tokens[i]) === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
    }
  }

  return function (obj, opts) {
    var path = '';
    var data = obj || {};
    var options = opts || {};
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;

        continue;
      }

      var value = data[token.name];
      var segment;

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix;
          }

          continue;
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined');
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`');
        }

        if (value.length === 0) {
          if (token.optional) {
            continue;
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty');
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`');
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue;
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"');
      }

      path += token.prefix + segment;
    }

    return path;
  };
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1');
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup(group) {
  return group.replace(/([=!:$\/()])/g, '\\$1');
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys(re, keys) {
  re.keys = keys;
  return re;
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags(options) {
  return options.sensitive ? '' : 'i';
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp(path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      });
    }
  }

  return attachKeys(path, keys);
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp(path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

  return attachKeys(regexp, keys);
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp(path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options);
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp(tokens, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */keys || options;
    keys = [];
  }

  options = options || {};

  var strict = options.strict;
  var end = options.end !== false;
  var route = '';

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = '(?:' + token.pattern + ')';

      keys.push(token);

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*';
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?';
        } else {
          capture = prefix + '(' + capture + ')?';
        }
      } else {
        capture = prefix + '(' + capture + ')';
      }

      route += capture;
    }
  }

  var delimiter = escapeString(options.delimiter || '/');
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
  }

  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys);
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp(path, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */keys || options;
    keys = [];
  }

  options = options || {};

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */keys);
  }

  if (isarray(path)) {
    return arrayToRegexp( /** @type {!Array} */path, /** @type {!Array} */keys, options);
  }

  return stringToRegexp( /** @type {string} */path, /** @type {!Array} */keys, options);
}

pathToRegexp_1.parse = parse_1;
pathToRegexp_1.compile = compile_1;
pathToRegexp_1.tokensToFunction = tokensToFunction_1;
pathToRegexp_1.tokensToRegExp = tokensToRegExp_1;

/*  */

// $flow-disable-line
var regexpCompileCache = Object.create(null);

function fillParams(path, params, routeMsg) {
  try {
    var filler = regexpCompileCache[path] || (regexpCompileCache[path] = pathToRegexp_1.compile(path));
    return filler(params || {}, { pretty: true });
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      warn(false, "missing param for " + routeMsg + ": " + e.message);
    }
    return '';
  }
}

/*  */

function createRouteMap(routes, oldPathList, oldPathMap, oldNameMap) {
  // the path list is used to control path matching priority
  var pathList = oldPathList || [];
  // $flow-disable-line
  var pathMap = oldPathMap || Object.create(null);
  // $flow-disable-line
  var nameMap = oldNameMap || Object.create(null);

  routes.forEach(function (route) {
    addRouteRecord(pathList, pathMap, nameMap, route);
  });

  // ensure wildcard routes are always at the end
  for (var i = 0, l = pathList.length; i < l; i++) {
    if (pathList[i] === '*') {
      pathList.push(pathList.splice(i, 1)[0]);
      l--;
      i--;
    }
  }

  return {
    pathList: pathList,
    pathMap: pathMap,
    nameMap: nameMap
  };
}

function addRouteRecord(pathList, pathMap, nameMap, route, parent, matchAs) {
  var path = route.path;
  var name = route.name;
  if (process.env.NODE_ENV !== 'production') {
    assert(path != null, "\"path\" is required in a route configuration.");
    assert(typeof route.component !== 'string', "route config \"component\" for path: " + String(path || name) + " cannot be a " + "string id. Use an actual component instead.");
  }

  var pathToRegexpOptions = route.pathToRegexpOptions || {};
  var normalizedPath = normalizePath(path, parent, pathToRegexpOptions.strict);

  if (typeof route.caseSensitive === 'boolean') {
    pathToRegexpOptions.sensitive = route.caseSensitive;
  }

  var record = {
    path: normalizedPath,
    regex: compileRouteRegex(normalizedPath, pathToRegexpOptions),
    components: route.components || { default: route.component },
    instances: {},
    name: name,
    parent: parent,
    matchAs: matchAs,
    redirect: route.redirect,
    beforeEnter: route.beforeEnter,
    meta: route.meta || {},
    props: route.props == null ? {} : route.components ? route.props : { default: route.props }
  };

  if (route.children) {
    // Warn if route is named, does not redirect and has a default child route.
    // If users navigate to this route by name, the default child will
    // not be rendered (GH Issue #629)
    if (process.env.NODE_ENV !== 'production') {
      if (route.name && !route.redirect && route.children.some(function (child) {
        return (/^\/?$/.test(child.path)
        );
      })) {
        warn(false, "Named Route '" + route.name + "' has a default child route. " + "When navigating to this named route (:to=\"{name: '" + route.name + "'\"), " + "the default child route will not be rendered. Remove the name from " + "this route and use the name of the default child route for named " + "links instead.");
      }
    }
    route.children.forEach(function (child) {
      var childMatchAs = matchAs ? cleanPath(matchAs + "/" + child.path) : undefined;
      addRouteRecord(pathList, pathMap, nameMap, child, record, childMatchAs);
    });
  }

  if (route.alias !== undefined) {
    var aliases = Array.isArray(route.alias) ? route.alias : [route.alias];

    aliases.forEach(function (alias) {
      var aliasRoute = {
        path: alias,
        children: route.children
      };
      addRouteRecord(pathList, pathMap, nameMap, aliasRoute, parent, record.path || '/' // matchAs
      );
    });
  }

  if (!pathMap[record.path]) {
    pathList.push(record.path);
    pathMap[record.path] = record;
  }

  if (name) {
    if (!nameMap[name]) {
      nameMap[name] = record;
    } else if (process.env.NODE_ENV !== 'production' && !matchAs) {
      warn(false, "Duplicate named routes definition: " + "{ name: \"" + name + "\", path: \"" + record.path + "\" }");
    }
  }
}

function compileRouteRegex(path, pathToRegexpOptions) {
  var regex = pathToRegexp_1(path, [], pathToRegexpOptions);
  if (process.env.NODE_ENV !== 'production') {
    var keys = Object.create(null);
    regex.keys.forEach(function (key) {
      warn(!keys[key.name], "Duplicate param keys in route with path: \"" + path + "\"");
      keys[key.name] = true;
    });
  }
  return regex;
}

function normalizePath(path, parent, strict) {
  if (!strict) {
    path = path.replace(/\/$/, '');
  }
  if (path[0] === '/') {
    return path;
  }
  if (parent == null) {
    return path;
  }
  return cleanPath(parent.path + "/" + path);
}

/*  */

function normalizeLocation(raw, current, append, router) {
  var next = typeof raw === 'string' ? { path: raw } : raw;
  // named target
  if (next.name || next._normalized) {
    return next;
  }

  // relative params
  if (!next.path && next.params && current) {
    next = assign({}, next);
    next._normalized = true;
    var params = assign(assign({}, current.params), next.params);
    if (current.name) {
      next.name = current.name;
      next.params = params;
    } else if (current.matched.length) {
      var rawPath = current.matched[current.matched.length - 1].path;
      next.path = fillParams(rawPath, params, "path " + current.path);
    } else if (process.env.NODE_ENV !== 'production') {
      warn(false, "relative params navigation requires a current route.");
    }
    return next;
  }

  var parsedPath = parsePath(next.path || '');
  var basePath = current && current.path || '/';
  var path = parsedPath.path ? resolvePath(parsedPath.path, basePath, append || next.append) : basePath;

  var query = resolveQuery(parsedPath.query, next.query, router && router.options.parseQuery);

  var hash = next.hash || parsedPath.hash;
  if (hash && hash.charAt(0) !== '#') {
    hash = "#" + hash;
  }

  return {
    _normalized: true,
    path: path,
    query: query,
    hash: hash
  };
}

function assign(a, b) {
  for (var key in b) {
    a[key] = b[key];
  }
  return a;
}

/*  */

function createMatcher(routes, router) {
  var ref = createRouteMap(routes);
  var pathList = ref.pathList;
  var pathMap = ref.pathMap;
  var nameMap = ref.nameMap;

  function addRoutes(routes) {
    createRouteMap(routes, pathList, pathMap, nameMap);
  }

  function match(raw, currentRoute, redirectedFrom) {
    var location = normalizeLocation(raw, currentRoute, false, router);
    var name = location.name;

    if (name) {
      var record = nameMap[name];
      if (process.env.NODE_ENV !== 'production') {
        warn(record, "Route with name '" + name + "' does not exist");
      }
      if (!record) {
        return _createRoute(null, location);
      }
      var paramNames = record.regex.keys.filter(function (key) {
        return !key.optional;
      }).map(function (key) {
        return key.name;
      });

      if (_typeof(location.params) !== 'object') {
        location.params = {};
      }

      if (currentRoute && _typeof(currentRoute.params) === 'object') {
        for (var key in currentRoute.params) {
          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
            location.params[key] = currentRoute.params[key];
          }
        }
      }

      if (record) {
        location.path = fillParams(record.path, location.params, "named route \"" + name + "\"");
        return _createRoute(record, location, redirectedFrom);
      }
    } else if (location.path) {
      location.params = {};
      for (var i = 0; i < pathList.length; i++) {
        var path = pathList[i];
        var record$1 = pathMap[path];
        if (matchRoute(record$1.regex, location.path, location.params)) {
          return _createRoute(record$1, location, redirectedFrom);
        }
      }
    }
    // no match
    return _createRoute(null, location);
  }

  function redirect(record, location) {
    var originalRedirect = record.redirect;
    var redirect = typeof originalRedirect === 'function' ? originalRedirect(createRoute(record, location, null, router)) : originalRedirect;

    if (typeof redirect === 'string') {
      redirect = { path: redirect };
    }

    if (!redirect || (typeof redirect === 'undefined' ? 'undefined' : _typeof(redirect)) !== 'object') {
      if (process.env.NODE_ENV !== 'production') {
        warn(false, "invalid redirect option: " + JSON.stringify(redirect));
      }
      return _createRoute(null, location);
    }

    var re = redirect;
    var name = re.name;
    var path = re.path;
    var query = location.query;
    var hash = location.hash;
    var params = location.params;
    query = re.hasOwnProperty('query') ? re.query : query;
    hash = re.hasOwnProperty('hash') ? re.hash : hash;
    params = re.hasOwnProperty('params') ? re.params : params;

    if (name) {
      // resolved named direct
      var targetRecord = nameMap[name];
      if (process.env.NODE_ENV !== 'production') {
        assert(targetRecord, "redirect failed: named route \"" + name + "\" not found.");
      }
      return match({
        _normalized: true,
        name: name,
        query: query,
        hash: hash,
        params: params
      }, undefined, location);
    } else if (path) {
      // 1. resolve relative redirect
      var rawPath = resolveRecordPath(path, record);
      // 2. resolve params
      var resolvedPath = fillParams(rawPath, params, "redirect route with path \"" + rawPath + "\"");
      // 3. rematch with existing query and hash
      return match({
        _normalized: true,
        path: resolvedPath,
        query: query,
        hash: hash
      }, undefined, location);
    } else {
      if (process.env.NODE_ENV !== 'production') {
        warn(false, "invalid redirect option: " + JSON.stringify(redirect));
      }
      return _createRoute(null, location);
    }
  }

  function alias(record, location, matchAs) {
    var aliasedPath = fillParams(matchAs, location.params, "aliased route with path \"" + matchAs + "\"");
    var aliasedMatch = match({
      _normalized: true,
      path: aliasedPath
    });
    if (aliasedMatch) {
      var matched = aliasedMatch.matched;
      var aliasedRecord = matched[matched.length - 1];
      location.params = aliasedMatch.params;
      return _createRoute(aliasedRecord, location);
    }
    return _createRoute(null, location);
  }

  function _createRoute(record, location, redirectedFrom) {
    if (record && record.redirect) {
      return redirect(record, redirectedFrom || location);
    }
    if (record && record.matchAs) {
      return alias(record, location, record.matchAs);
    }
    return createRoute(record, location, redirectedFrom, router);
  }

  return {
    match: match,
    addRoutes: addRoutes
  };
}

function matchRoute(regex, path, params) {
  var m = path.match(regex);

  if (!m) {
    return false;
  } else if (!params) {
    return true;
  }

  for (var i = 1, len = m.length; i < len; ++i) {
    var key = regex.keys[i - 1];
    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i];
    if (key) {
      params[key.name] = val;
    }
  }

  return true;
}

function resolveRecordPath(path, record) {
  return resolvePath(path, record.parent ? record.parent.path : '/', true);
}

/*  */

var positionStore = Object.create(null);

function setupScroll() {
  // Fix for #1585 for Firefox
  window.history.replaceState({ key: getStateKey() }, '');
  window.addEventListener('popstate', function (e) {
    saveScrollPosition();
    if (e.state && e.state.key) {
      setStateKey(e.state.key);
    }
  });
}

function handleScroll(router, to, from, isPop) {
  if (!router.app) {
    return;
  }

  var behavior = router.options.scrollBehavior;
  if (!behavior) {
    return;
  }

  if (process.env.NODE_ENV !== 'production') {
    assert(typeof behavior === 'function', "scrollBehavior must be a function");
  }

  // wait until re-render finishes before scrolling
  router.app.$nextTick(function () {
    var position = getScrollPosition();
    var shouldScroll = behavior(to, from, isPop ? position : null);

    if (!shouldScroll) {
      return;
    }

    if (typeof shouldScroll.then === 'function') {
      shouldScroll.then(function (shouldScroll) {
        scrollToPosition(shouldScroll, position);
      }).catch(function (err) {
        if (process.env.NODE_ENV !== 'production') {
          assert(false, err.toString());
        }
      });
    } else {
      scrollToPosition(shouldScroll, position);
    }
  });
}

function saveScrollPosition() {
  var key = getStateKey();
  if (key) {
    positionStore[key] = {
      x: window.pageXOffset,
      y: window.pageYOffset
    };
  }
}

function getScrollPosition() {
  var key = getStateKey();
  if (key) {
    return positionStore[key];
  }
}

function getElementPosition(el, offset) {
  var docEl = document.documentElement;
  var docRect = docEl.getBoundingClientRect();
  var elRect = el.getBoundingClientRect();
  return {
    x: elRect.left - docRect.left - offset.x,
    y: elRect.top - docRect.top - offset.y
  };
}

function isValidPosition(obj) {
  return isNumber(obj.x) || isNumber(obj.y);
}

function normalizePosition(obj) {
  return {
    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
    y: isNumber(obj.y) ? obj.y : window.pageYOffset
  };
}

function normalizeOffset(obj) {
  return {
    x: isNumber(obj.x) ? obj.x : 0,
    y: isNumber(obj.y) ? obj.y : 0
  };
}

function isNumber(v) {
  return typeof v === 'number';
}

function scrollToPosition(shouldScroll, position) {
  var isObject = (typeof shouldScroll === 'undefined' ? 'undefined' : _typeof(shouldScroll)) === 'object';
  if (isObject && typeof shouldScroll.selector === 'string') {
    var el = document.querySelector(shouldScroll.selector);
    if (el) {
      var offset = shouldScroll.offset && _typeof(shouldScroll.offset) === 'object' ? shouldScroll.offset : {};
      offset = normalizeOffset(offset);
      position = getElementPosition(el, offset);
    } else if (isValidPosition(shouldScroll)) {
      position = normalizePosition(shouldScroll);
    }
  } else if (isObject && isValidPosition(shouldScroll)) {
    position = normalizePosition(shouldScroll);
  }

  if (position) {
    window.scrollTo(position.x, position.y);
  }
}

/*  */

var supportsPushState = inBrowser && function () {
  var ua = window.navigator.userAgent;

  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) {
    return false;
  }

  return window.history && 'pushState' in window.history;
}();

// use User Timing api (if present) for more accurate key precision
var Time = inBrowser && window.performance && window.performance.now ? window.performance : Date;

var _key = genKey();

function genKey() {
  return Time.now().toFixed(3);
}

function getStateKey() {
  return _key;
}

function setStateKey(key) {
  _key = key;
}

function pushState(url, replace) {
  saveScrollPosition();
  // try...catch the pushState call to get around Safari
  // DOM Exception 18 where it limits to 100 pushState calls
  var history = window.history;
  try {
    if (replace) {
      history.replaceState({ key: _key }, '', url);
    } else {
      _key = genKey();
      history.pushState({ key: _key }, '', url);
    }
  } catch (e) {
    window.location[replace ? 'replace' : 'assign'](url);
  }
}

function replaceState(url) {
  pushState(url, true);
}

/*  */

function runQueue(queue, fn, cb) {
  var step = function step(index) {
    if (index >= queue.length) {
      cb();
    } else {
      if (queue[index]) {
        fn(queue[index], function () {
          step(index + 1);
        });
      } else {
        step(index + 1);
      }
    }
  };
  step(0);
}

/*  */

function resolveAsyncComponents(matched) {
  return function (to, from, next) {
    var hasAsync = false;
    var pending = 0;
    var error = null;

    flatMapComponents(matched, function (def, _, match, key) {
      // if it's a function and doesn't have cid attached,
      // assume it's an async component resolve function.
      // we are not using Vue's default async resolving mechanism because
      // we want to halt the navigation until the incoming component has been
      // resolved.
      if (typeof def === 'function' && def.cid === undefined) {
        hasAsync = true;
        pending++;

        var resolve = once(function (resolvedDef) {
          if (isESModule(resolvedDef)) {
            resolvedDef = resolvedDef.default;
          }
          // save resolved on async factory in case it's used elsewhere
          def.resolved = typeof resolvedDef === 'function' ? resolvedDef : _Vue.extend(resolvedDef);
          match.components[key] = resolvedDef;
          pending--;
          if (pending <= 0) {
            next();
          }
        });

        var reject = once(function (reason) {
          var msg = "Failed to resolve async component " + key + ": " + reason;
          process.env.NODE_ENV !== 'production' && warn(false, msg);
          if (!error) {
            error = isError(reason) ? reason : new Error(msg);
            next(error);
          }
        });

        var res;
        try {
          res = def(resolve, reject);
        } catch (e) {
          reject(e);
        }
        if (res) {
          if (typeof res.then === 'function') {
            res.then(resolve, reject);
          } else {
            // new syntax in Vue 2.3
            var comp = res.component;
            if (comp && typeof comp.then === 'function') {
              comp.then(resolve, reject);
            }
          }
        }
      }
    });

    if (!hasAsync) {
      next();
    }
  };
}

function flatMapComponents(matched, fn) {
  return flatten(matched.map(function (m) {
    return Object.keys(m.components).map(function (key) {
      return fn(m.components[key], m.instances[key], m, key);
    });
  }));
}

function flatten(arr) {
  return Array.prototype.concat.apply([], arr);
}

var hasSymbol = typeof Symbol === 'function' && _typeof(Symbol.toStringTag) === 'symbol';

function isESModule(obj) {
  return obj.__esModule || hasSymbol && obj[Symbol.toStringTag] === 'Module';
}

// in Webpack 2, require.ensure now also returns a Promise
// so the resolve/reject functions may get called an extra time
// if the user uses an arrow function shorthand that happens to
// return that Promise.
function once(fn) {
  var called = false;
  return function () {
    var args = [],
        len = arguments.length;
    while (len--) {
      args[len] = arguments[len];
    }if (called) {
      return;
    }
    called = true;
    return fn.apply(this, args);
  };
}

/*  */

var History = function History(router, base) {
  this.router = router;
  this.base = normalizeBase(base);
  // start with a route object that stands for "nowhere"
  this.current = START;
  this.pending = null;
  this.ready = false;
  this.readyCbs = [];
  this.readyErrorCbs = [];
  this.errorCbs = [];
};

History.prototype.listen = function listen(cb) {
  this.cb = cb;
};

History.prototype.onReady = function onReady(cb, errorCb) {
  if (this.ready) {
    cb();
  } else {
    this.readyCbs.push(cb);
    if (errorCb) {
      this.readyErrorCbs.push(errorCb);
    }
  }
};

History.prototype.onError = function onError(errorCb) {
  this.errorCbs.push(errorCb);
};

History.prototype.transitionTo = function transitionTo(location, onComplete, onAbort) {
  var this$1 = this;

  var route = this.router.match(location, this.current);
  this.confirmTransition(route, function () {
    this$1.updateRoute(route);
    onComplete && onComplete(route);
    this$1.ensureURL();

    // fire ready cbs once
    if (!this$1.ready) {
      this$1.ready = true;
      this$1.readyCbs.forEach(function (cb) {
        cb(route);
      });
    }
  }, function (err) {
    if (onAbort) {
      onAbort(err);
    }
    if (err && !this$1.ready) {
      this$1.ready = true;
      this$1.readyErrorCbs.forEach(function (cb) {
        cb(err);
      });
    }
  });
};

History.prototype.confirmTransition = function confirmTransition(route, onComplete, onAbort) {
  var this$1 = this;

  var current = this.current;
  var abort = function abort(err) {
    if (isError(err)) {
      if (this$1.errorCbs.length) {
        this$1.errorCbs.forEach(function (cb) {
          cb(err);
        });
      } else {
        warn(false, 'uncaught error during route navigation:');
        console.error(err);
      }
    }
    onAbort && onAbort(err);
  };
  if (isSameRoute(route, current) &&
  // in the case the route map has been dynamically appended to
  route.matched.length === current.matched.length) {
    this.ensureURL();
    return abort();
  }

  var ref = resolveQueue(this.current.matched, route.matched);
  var updated = ref.updated;
  var deactivated = ref.deactivated;
  var activated = ref.activated;

  var queue = [].concat(
  // in-component leave guards
  extractLeaveGuards(deactivated),
  // global before hooks
  this.router.beforeHooks,
  // in-component update hooks
  extractUpdateHooks(updated),
  // in-config enter guards
  activated.map(function (m) {
    return m.beforeEnter;
  }),
  // async components
  resolveAsyncComponents(activated));

  this.pending = route;
  var iterator = function iterator(hook, next) {
    if (this$1.pending !== route) {
      return abort();
    }
    try {
      hook(route, current, function (to) {
        if (to === false || isError(to)) {
          // next(false) -> abort navigation, ensure current URL
          this$1.ensureURL(true);
          abort(to);
        } else if (typeof to === 'string' || (typeof to === 'undefined' ? 'undefined' : _typeof(to)) === 'object' && (typeof to.path === 'string' || typeof to.name === 'string')) {
          // next('/') or next({ path: '/' }) -> redirect
          abort();
          if ((typeof to === 'undefined' ? 'undefined' : _typeof(to)) === 'object' && to.replace) {
            this$1.replace(to);
          } else {
            this$1.push(to);
          }
        } else {
          // confirm transition and pass on the value
          next(to);
        }
      });
    } catch (e) {
      abort(e);
    }
  };

  runQueue(queue, iterator, function () {
    var postEnterCbs = [];
    var isValid = function isValid() {
      return this$1.current === route;
    };
    // wait until async components are resolved before
    // extracting in-component enter guards
    var enterGuards = extractEnterGuards(activated, postEnterCbs, isValid);
    var queue = enterGuards.concat(this$1.router.resolveHooks);
    runQueue(queue, iterator, function () {
      if (this$1.pending !== route) {
        return abort();
      }
      this$1.pending = null;
      onComplete(route);
      if (this$1.router.app) {
        this$1.router.app.$nextTick(function () {
          postEnterCbs.forEach(function (cb) {
            cb();
          });
        });
      }
    });
  });
};

History.prototype.updateRoute = function updateRoute(route) {
  var prev = this.current;
  this.current = route;
  this.cb && this.cb(route);
  this.router.afterHooks.forEach(function (hook) {
    hook && hook(route, prev);
  });
};

function normalizeBase(base) {
  if (!base) {
    if (inBrowser) {
      // respect <base> tag
      var baseEl = document.querySelector('base');
      base = baseEl && baseEl.getAttribute('href') || '/';
      // strip full URL origin
      base = base.replace(/^https?:\/\/[^\/]+/, '');
    } else {
      base = '/';
    }
  }
  // make sure there's the starting slash
  if (base.charAt(0) !== '/') {
    base = '/' + base;
  }
  // remove trailing slash
  return base.replace(/\/$/, '');
}

function resolveQueue(current, next) {
  var i;
  var max = Math.max(current.length, next.length);
  for (i = 0; i < max; i++) {
    if (current[i] !== next[i]) {
      break;
    }
  }
  return {
    updated: next.slice(0, i),
    activated: next.slice(i),
    deactivated: current.slice(i)
  };
}

function extractGuards(records, name, bind, reverse) {
  var guards = flatMapComponents(records, function (def, instance, match, key) {
    var guard = extractGuard(def, name);
    if (guard) {
      return Array.isArray(guard) ? guard.map(function (guard) {
        return bind(guard, instance, match, key);
      }) : bind(guard, instance, match, key);
    }
  });
  return flatten(reverse ? guards.reverse() : guards);
}

function extractGuard(def, key) {
  if (typeof def !== 'function') {
    // extend now so that global mixins are applied.
    def = _Vue.extend(def);
  }
  return def.options[key];
}

function extractLeaveGuards(deactivated) {
  return extractGuards(deactivated, 'beforeRouteLeave', bindGuard, true);
}

function extractUpdateHooks(updated) {
  return extractGuards(updated, 'beforeRouteUpdate', bindGuard);
}

function bindGuard(guard, instance) {
  if (instance) {
    return function boundRouteGuard() {
      return guard.apply(instance, arguments);
    };
  }
}

function extractEnterGuards(activated, cbs, isValid) {
  return extractGuards(activated, 'beforeRouteEnter', function (guard, _, match, key) {
    return bindEnterGuard(guard, match, key, cbs, isValid);
  });
}

function bindEnterGuard(guard, match, key, cbs, isValid) {
  return function routeEnterGuard(to, from, next) {
    return guard(to, from, function (cb) {
      next(cb);
      if (typeof cb === 'function') {
        cbs.push(function () {
          // #750
          // if a router-view is wrapped with an out-in transition,
          // the instance may not have been registered at this time.
          // we will need to poll for registration until current route
          // is no longer valid.
          poll(cb, match.instances, key, isValid);
        });
      }
    });
  };
}

function poll(cb, // somehow flow cannot infer this is a function
instances, key, isValid) {
  if (instances[key]) {
    cb(instances[key]);
  } else if (isValid()) {
    setTimeout(function () {
      poll(cb, instances, key, isValid);
    }, 16);
  }
}

/*  */

var HTML5History = function (History$$1) {
  function HTML5History(router, base) {
    var this$1 = this;

    History$$1.call(this, router, base);

    var expectScroll = router.options.scrollBehavior;

    if (expectScroll) {
      setupScroll();
    }

    var initLocation = getLocation(this.base);
    window.addEventListener('popstate', function (e) {
      var current = this$1.current;

      // Avoiding first `popstate` event dispatched in some browsers but first
      // history route not updated since async guard at the same time.
      var location = getLocation(this$1.base);
      if (this$1.current === START && location === initLocation) {
        return;
      }

      this$1.transitionTo(location, function (route) {
        if (expectScroll) {
          handleScroll(router, route, current, true);
        }
      });
    });
  }

  if (History$$1) HTML5History.__proto__ = History$$1;
  HTML5History.prototype = Object.create(History$$1 && History$$1.prototype);
  HTML5History.prototype.constructor = HTML5History;

  HTML5History.prototype.go = function go(n) {
    window.history.go(n);
  };

  HTML5History.prototype.push = function push(location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.replace = function replace(location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.ensureURL = function ensureURL(push) {
    if (getLocation(this.base) !== this.current.fullPath) {
      var current = cleanPath(this.base + this.current.fullPath);
      push ? pushState(current) : replaceState(current);
    }
  };

  HTML5History.prototype.getCurrentLocation = function getCurrentLocation() {
    return getLocation(this.base);
  };

  return HTML5History;
}(History);

function getLocation(base) {
  var path = window.location.pathname;
  if (base && path.indexOf(base) === 0) {
    path = path.slice(base.length);
  }
  return (path || '/') + window.location.search + window.location.hash;
}

/*  */

var HashHistory = function (History$$1) {
  function HashHistory(router, base, fallback) {
    History$$1.call(this, router, base);
    // check history fallback deeplinking
    if (fallback && checkFallback(this.base)) {
      return;
    }
    ensureSlash();
  }

  if (History$$1) HashHistory.__proto__ = History$$1;
  HashHistory.prototype = Object.create(History$$1 && History$$1.prototype);
  HashHistory.prototype.constructor = HashHistory;

  // this is delayed until the app mounts
  // to avoid the hashchange listener being fired too early
  HashHistory.prototype.setupListeners = function setupListeners() {
    var this$1 = this;

    var router = this.router;
    var expectScroll = router.options.scrollBehavior;
    var supportsScroll = supportsPushState && expectScroll;

    if (supportsScroll) {
      setupScroll();
    }

    window.addEventListener(supportsPushState ? 'popstate' : 'hashchange', function () {
      var current = this$1.current;
      if (!ensureSlash()) {
        return;
      }
      this$1.transitionTo(getHash(), function (route) {
        if (supportsScroll) {
          handleScroll(this$1.router, route, current, true);
        }
        if (!supportsPushState) {
          replaceHash(route.fullPath);
        }
      });
    });
  };

  HashHistory.prototype.push = function push(location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushHash(route.fullPath);
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.replace = function replace(location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceHash(route.fullPath);
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.go = function go(n) {
    window.history.go(n);
  };

  HashHistory.prototype.ensureURL = function ensureURL(push) {
    var current = this.current.fullPath;
    if (getHash() !== current) {
      push ? pushHash(current) : replaceHash(current);
    }
  };

  HashHistory.prototype.getCurrentLocation = function getCurrentLocation() {
    return getHash();
  };

  return HashHistory;
}(History);

function checkFallback(base) {
  var location = getLocation(base);
  if (!/^\/#/.test(location)) {
    window.location.replace(cleanPath(base + '/#' + location));
    return true;
  }
}

function ensureSlash() {
  var path = getHash();
  if (path.charAt(0) === '/') {
    return true;
  }
  replaceHash('/' + path);
  return false;
}

function getHash() {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var index = href.indexOf('#');
  return index === -1 ? '' : href.slice(index + 1);
}

function getUrl(path) {
  var href = window.location.href;
  var i = href.indexOf('#');
  var base = i >= 0 ? href.slice(0, i) : href;
  return base + "#" + path;
}

function pushHash(path) {
  if (supportsPushState) {
    pushState(getUrl(path));
  } else {
    window.location.hash = path;
  }
}

function replaceHash(path) {
  if (supportsPushState) {
    replaceState(getUrl(path));
  } else {
    window.location.replace(getUrl(path));
  }
}

/*  */

var AbstractHistory = function (History$$1) {
  function AbstractHistory(router, base) {
    History$$1.call(this, router, base);
    this.stack = [];
    this.index = -1;
  }

  if (History$$1) AbstractHistory.__proto__ = History$$1;
  AbstractHistory.prototype = Object.create(History$$1 && History$$1.prototype);
  AbstractHistory.prototype.constructor = AbstractHistory;

  AbstractHistory.prototype.push = function push(location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index + 1).concat(route);
      this$1.index++;
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.replace = function replace(location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index).concat(route);
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.go = function go(n) {
    var this$1 = this;

    var targetIndex = this.index + n;
    if (targetIndex < 0 || targetIndex >= this.stack.length) {
      return;
    }
    var route = this.stack[targetIndex];
    this.confirmTransition(route, function () {
      this$1.index = targetIndex;
      this$1.updateRoute(route);
    });
  };

  AbstractHistory.prototype.getCurrentLocation = function getCurrentLocation() {
    var current = this.stack[this.stack.length - 1];
    return current ? current.fullPath : '/';
  };

  AbstractHistory.prototype.ensureURL = function ensureURL() {
    // noop
  };

  return AbstractHistory;
}(History);

/*  */

var VueRouter = function VueRouter(options) {
  if (options === void 0) options = {};

  this.app = null;
  this.apps = [];
  this.options = options;
  this.beforeHooks = [];
  this.resolveHooks = [];
  this.afterHooks = [];
  this.matcher = createMatcher(options.routes || [], this);

  var mode = options.mode || 'hash';
  this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false;
  if (this.fallback) {
    mode = 'hash';
  }
  if (!inBrowser) {
    mode = 'abstract';
  }
  this.mode = mode;

  switch (mode) {
    case 'history':
      this.history = new HTML5History(this, options.base);
      break;
    case 'hash':
      this.history = new HashHistory(this, options.base, this.fallback);
      break;
    case 'abstract':
      this.history = new AbstractHistory(this, options.base);
      break;
    default:
      if (process.env.NODE_ENV !== 'production') {
        assert(false, "invalid mode: " + mode);
      }
  }
};

var prototypeAccessors = { currentRoute: { configurable: true } };

VueRouter.prototype.match = function match(raw, current, redirectedFrom) {
  return this.matcher.match(raw, current, redirectedFrom);
};

prototypeAccessors.currentRoute.get = function () {
  return this.history && this.history.current;
};

VueRouter.prototype.init = function init(app /* Vue component instance */) {
  var this$1 = this;

  process.env.NODE_ENV !== 'production' && assert(install.installed, "not installed. Make sure to call `Vue.use(VueRouter)` " + "before creating root instance.");

  this.apps.push(app);

  // main app already initialized.
  if (this.app) {
    return;
  }

  this.app = app;

  var history = this.history;

  if (history instanceof HTML5History) {
    history.transitionTo(history.getCurrentLocation());
  } else if (history instanceof HashHistory) {
    var setupHashListener = function setupHashListener() {
      history.setupListeners();
    };
    history.transitionTo(history.getCurrentLocation(), setupHashListener, setupHashListener);
  }

  history.listen(function (route) {
    this$1.apps.forEach(function (app) {
      app._route = route;
    });
  });
};

VueRouter.prototype.beforeEach = function beforeEach(fn) {
  return registerHook(this.beforeHooks, fn);
};

VueRouter.prototype.beforeResolve = function beforeResolve(fn) {
  return registerHook(this.resolveHooks, fn);
};

VueRouter.prototype.afterEach = function afterEach(fn) {
  return registerHook(this.afterHooks, fn);
};

VueRouter.prototype.onReady = function onReady(cb, errorCb) {
  this.history.onReady(cb, errorCb);
};

VueRouter.prototype.onError = function onError(errorCb) {
  this.history.onError(errorCb);
};

VueRouter.prototype.push = function push(location, onComplete, onAbort) {
  this.history.push(location, onComplete, onAbort);
};

VueRouter.prototype.replace = function replace(location, onComplete, onAbort) {
  this.history.replace(location, onComplete, onAbort);
};

VueRouter.prototype.go = function go(n) {
  this.history.go(n);
};

VueRouter.prototype.back = function back() {
  this.go(-1);
};

VueRouter.prototype.forward = function forward() {
  this.go(1);
};

VueRouter.prototype.getMatchedComponents = function getMatchedComponents(to) {
  var route = to ? to.matched ? to : this.resolve(to).route : this.currentRoute;
  if (!route) {
    return [];
  }
  return [].concat.apply([], route.matched.map(function (m) {
    return Object.keys(m.components).map(function (key) {
      return m.components[key];
    });
  }));
};

VueRouter.prototype.resolve = function resolve(to, current, append) {
  var location = normalizeLocation(to, current || this.history.current, append, this);
  var route = this.match(location, current);
  var fullPath = route.redirectedFrom || route.fullPath;
  var base = this.history.base;
  var href = createHref(base, fullPath, this.mode);
  return {
    location: location,
    route: route,
    href: href,
    // for backwards compat
    normalizedTo: location,
    resolved: route
  };
};

VueRouter.prototype.addRoutes = function addRoutes(routes) {
  this.matcher.addRoutes(routes);
  if (this.history.current !== START) {
    this.history.transitionTo(this.history.getCurrentLocation());
  }
};

Object.defineProperties(VueRouter.prototype, prototypeAccessors);

function registerHook(list, fn) {
  list.push(fn);
  return function () {
    var i = list.indexOf(fn);
    if (i > -1) {
      list.splice(i, 1);
    }
  };
}

function createHref(base, fullPath, mode) {
  var path = mode === 'hash' ? '#' + fullPath : fullPath;
  return base ? cleanPath(base + '/' + path) : path;
}

VueRouter.install = install;
VueRouter.version = '3.0.1';

if (inBrowser && window.Vue) {
  window.Vue.use(VueRouter);
}

exports.default = VueRouter;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Index_vue__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Index_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Index_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Index_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_e725123a_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Index_vue__ = __webpack_require__(31);
var disposed = false
var normalizeComponent = __webpack_require__(0)
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_e725123a_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Index_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\pages\\web\\Index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e725123a", Component.options)
  } else {
    hotAPI.reload("data-v-e725123a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7c55e230_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_flight_form_vue__ = __webpack_require__(24);
var disposed = false
var normalizeComponent = __webpack_require__(0)
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
  __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7c55e230_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_flight_form_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\index\\flight-form.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7c55e230", Component.options)
  } else {
    hotAPI.reload("data-v-7c55e230", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-container",
    { attrs: { "grid-list-md": "" } },
    [
      _c(
        "v-layout",
        { attrs: { row: "", wrap: "" } },
        [
          _c(
            "v-flex",
            { attrs: { xs3: "" } },
            [
              _c("v-text-field", {
                attrs: { label: "Vertrek punt", required: "" }
              }),
              _vm._v(" "),
              _c("v-text-field", {
                attrs: { label: "Vertrek datum", type: "date", required: "" }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-flex",
            { attrs: { xs3: "" } },
            [
              _c("v-text-field", {
                attrs: { label: "Bestemming", required: "" }
              }),
              _vm._v(" "),
              _c("v-text-field", {
                attrs: { label: "Retour datum", type: "date" }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-flex",
            { attrs: { xs3: "" } },
            [
              _c("v-text-field", {
                attrs: {
                  label: "Volwassenen",
                  type: "number",
                  min: "1",
                  required: ""
                }
              }),
              _vm._v(" "),
              _c("v-text-field", {
                attrs: { label: "Kinderen", type: "number", min: "0" }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-flex",
            { attrs: { xs3: "" } },
            [
              _c("v-select", {
                attrs: {
                  items: [
                    { text: "Economy", value: "economy" },
                    { text: "Economy plus", value: "premiumeconomy" },
                    { text: "Business", value: "business" },
                    { text: "First", value: "first" }
                  ],
                  label: "Klasse",
                  "single-line": "",
                  bottom: ""
                }
              })
            ],
            1
          )
        ],
        1
      )
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
    require("vue-hot-reload-api")      .rerender("data-v-7c55e230", esExports)
  }
}

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2e7cdc80_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_accommodation_form_vue__ = __webpack_require__(26);
var disposed = false
var normalizeComponent = __webpack_require__(0)
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
  __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2e7cdc80_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_accommodation_form_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\index\\accommodation-form.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2e7cdc80", Component.options)
  } else {
    hotAPI.reload("data-v-2e7cdc80", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-container",
    { attrs: { "grid-list-md": "" } },
    [
      _c(
        "v-layout",
        { attrs: { row: "", wrap: "" } },
        [
          _c(
            "v-flex",
            { attrs: { xs6: "" } },
            [
              _c("v-text-field", {
                attrs: { label: "Check in datum", type: "date", required: "" }
              }),
              _vm._v(" "),
              _c("v-text-field", {
                attrs: { label: "Check uit datum", type: "date", required: "" }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-flex",
            { attrs: { xs6: "" } },
            [
              _c("v-text-field", {
                attrs: {
                  label: "Aantal personen",
                  type: "number",
                  required: "",
                  min: "1"
                }
              }),
              _vm._v(" "),
              _c("v-text-field", {
                attrs: {
                  label: "Aantal kamers",
                  type: "number",
                  required: "",
                  min: "1"
                }
              })
            ],
            1
          )
        ],
        1
      )
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
    require("vue-hot-reload-api")      .rerender("data-v-2e7cdc80", esExports)
  }
}

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_template_compiler_index_id_data_v_b9e41304_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_car_form_vue__ = __webpack_require__(28);
var disposed = false
var normalizeComponent = __webpack_require__(0)
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
  __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_template_compiler_index_id_data_v_b9e41304_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_car_form_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\index\\car-form.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b9e41304", Component.options)
  } else {
    hotAPI.reload("data-v-b9e41304", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-container",
    { attrs: { "grid-list-md": "" } },
    [
      _c(
        "v-layout",
        { attrs: { row: "", wrap: "" } },
        [
          _c(
            "v-flex",
            { attrs: { xs6: "" } },
            [
              _c("v-text-field", {
                attrs: { label: "Ophaal locatie", required: "" }
              }),
              _vm._v(" "),
              _c("v-text-field", {
                attrs: {
                  label: "Ophaal datum en tijd",
                  type: "date-time",
                  required: ""
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-flex",
            { attrs: { xs6: "" } },
            [
              _c("v-text-field", {
                attrs: { label: "Aflever locatie", required: "", min: "1" }
              }),
              _vm._v(" "),
              _c("v-text-field", {
                attrs: {
                  label: "Aflever datum en tijd",
                  type: "date-time",
                  required: "",
                  min: "1"
                }
              })
            ],
            1
          )
        ],
        1
      )
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
    require("vue-hot-reload-api")      .rerender("data-v-b9e41304", esExports)
  }
}

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_destination_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_destination_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_destination_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_destination_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_destination_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_94c13086_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_destination_vue__ = __webpack_require__(30);
var disposed = false
var normalizeComponent = __webpack_require__(0)
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_destination_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_94c13086_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_destination_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\index\\destination.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-94c13086", Component.options)
  } else {
    hotAPI.reload("data-v-94c13086", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-container",
    { attrs: { "grid-list-md": "", fluid: "" } },
    [
      _c(
        "v-layout",
        { attrs: { row: "", wrap: "" } },
        [
          _c(
            "v-flex",
            { attrs: { xs12: "" } },
            [
              _c(
                "v-card",
                { attrs: { hover: "", to: "#" } },
                [
                  _c(
                    "v-card-media",
                    {
                      attrs: {
                        height: "500px",
                        src:
                          "https://images.pexels.com/photos/604444/pexels-photo-604444.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb"
                      }
                    },
                    [
                      _c(
                        "v-container",
                        {
                          attrs: {
                            "fill-height": "",
                            fluid: "",
                            "justify-end": ""
                          }
                        },
                        [
                          _c(
                            "v-layout",
                            { attrs: { row: "", bottom: "" } },
                            [
                              _c(
                                "v-flex",
                                {
                                  staticClass: "subheader white--text",
                                  staticStyle: { "text-align": "right" },
                                  attrs: { xs12: "", flexbox: "" }
                                },
                                [
                                  _vm._v(
                                    "\n                                France\n                            "
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "v-flex",
                                {
                                  staticClass: "headline white--text",
                                  staticStyle: { "text-align": "right" },
                                  attrs: {
                                    "justify-end": "",
                                    xs12: "",
                                    flexbox: ""
                                  }
                                },
                                [
                                  _vm._v(
                                    "\n                                Paris\n                            "
                                  )
                                ]
                              )
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-flex",
            { attrs: { xs3: "" } },
            [
              _c(
                "v-card",
                { attrs: { hover: "", to: "#" } },
                [
                  _c(
                    "v-card-media",
                    {
                      attrs: {
                        height: "300px",
                        src:
                          "https://images.pexels.com/photos/347254/pexels-photo-347254.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb"
                      }
                    },
                    [
                      _c(
                        "v-container",
                        { attrs: { "fill-height": "", fluid: "" } },
                        [
                          _c(
                            "v-layout",
                            { attrs: { row: "", bottom: "" } },
                            [
                              _c(
                                "v-flex",
                                {
                                  staticClass: "subheader white--text",
                                  staticStyle: { "text-align": "right" },
                                  attrs: { xs12: "", flexbox: "" }
                                },
                                [
                                  _vm._v(
                                    "\n                                Netherlands\n                            "
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "v-flex",
                                {
                                  staticClass: "headline white--text",
                                  staticStyle: { "text-align": "right" },
                                  attrs: { xs12: "", flexbox: "" }
                                },
                                [
                                  _vm._v(
                                    "\n                                Amsterdam\n                            "
                                  )
                                ]
                              )
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-flex",
            { attrs: { xs3: "" } },
            [
              _c(
                "v-card",
                { attrs: { hover: "", to: "#" } },
                [
                  _c(
                    "v-card-media",
                    {
                      attrs: {
                        height: "300px",
                        src:
                          "https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb"
                      }
                    },
                    [
                      _c(
                        "v-container",
                        { attrs: { "fill-height": "", fluid: "" } },
                        [
                          _c(
                            "v-layout",
                            { attrs: { row: "", bottom: "" } },
                            [
                              _c(
                                "v-flex",
                                {
                                  staticClass: "subheader white--text",
                                  staticStyle: { "text-align": "right" },
                                  attrs: { xs12: "", flexbox: "" }
                                },
                                [
                                  _vm._v(
                                    "\n                                England\n                            "
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "v-flex",
                                {
                                  staticClass: "headline white--text",
                                  staticStyle: { "text-align": "right" },
                                  attrs: { xs12: "", flexbox: "" }
                                },
                                [
                                  _vm._v(
                                    "\n                                London\n                            "
                                  )
                                ]
                              )
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-flex",
            { attrs: { xs3: "" } },
            [
              _c(
                "v-card",
                { attrs: { hover: "", to: "#" } },
                [
                  _c(
                    "v-card-media",
                    {
                      attrs: {
                        height: "300px",
                        src:
                          "https://images.pexels.com/photos/109630/pexels-photo-109630.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb"
                      }
                    },
                    [
                      _c(
                        "v-container",
                        { attrs: { "fill-height": "", fluid: "" } },
                        [
                          _c(
                            "v-layout",
                            { attrs: { row: "", bottom: "" } },
                            [
                              _c(
                                "v-flex",
                                {
                                  staticClass: "subheader white--text",
                                  staticStyle: { "text-align": "right" },
                                  attrs: { xs12: "", flexbox: "" }
                                },
                                [
                                  _vm._v(
                                    "\n                                Berlin\n                            "
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "v-flex",
                                {
                                  staticClass: "headline white--text",
                                  staticStyle: { "text-align": "right" },
                                  attrs: { xs12: "", flexbox: "" }
                                },
                                [
                                  _vm._v(
                                    "\n                                Germany\n                            "
                                  )
                                ]
                              )
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-flex",
            { attrs: { xs3: "" } },
            [
              _c(
                "v-card",
                { attrs: { hover: "", to: "#" } },
                [
                  _c(
                    "v-card-media",
                    {
                      attrs: {
                        height: "300px",
                        src:
                          "https://images.pexels.com/photos/788352/pexels-photo-788352.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb"
                      }
                    },
                    [
                      _c(
                        "v-container",
                        { attrs: { "fill-height": "", fluid: "" } },
                        [
                          _c(
                            "v-layout",
                            { attrs: { row: "", bottom: "" } },
                            [
                              _c(
                                "v-flex",
                                {
                                  staticClass: "subheader white--text",
                                  staticStyle: { "text-align": "right" },
                                  attrs: { xs12: "", flexbox: "" }
                                },
                                [
                                  _vm._v(
                                    "\n                                Warsaw\n                            "
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "v-flex",
                                {
                                  staticClass: "headline white--text",
                                  staticStyle: { "text-align": "right" },
                                  attrs: { xs12: "", flexbox: "" }
                                },
                                [
                                  _vm._v(
                                    "\n                                Poland\n                            "
                                  )
                                ]
                              )
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
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
    require("vue-hot-reload-api")      .rerender("data-v-94c13086", esExports)
  }
}

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-container",
    { attrs: { fluid: "" } },
    [
      _c(
        "v-parallax",
        { attrs: { src: _vm.image, height: "700" } },
        [
          _c(
            "v-layout",
            { attrs: { column: "", "align-center": "", "justify-center": "" } },
            [
              _c(
                "v-card",
                { attrs: { hover: "" } },
                [
                  _c(
                    "v-tabs",
                    {
                      attrs: {
                        "icons-and-text": "",
                        centered: "",
                        color: "primary",
                        "slider-color": "white",
                        dark: "",
                        card: ""
                      }
                    },
                    [
                      _c(
                        "v-tab",
                        {
                          on: {
                            click: function($event) {
                              _vm.changeForm("AccommodationForm")
                            }
                          }
                        },
                        [
                          _vm._v(
                            "\n                        Accomodatie\n                        "
                          ),
                          _c("v-icon", [_vm._v("hotel")])
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-tab",
                        {
                          on: {
                            click: function($event) {
                              _vm.changeForm("FlightForm")
                            }
                          }
                        },
                        [
                          _vm._v(
                            "\n                        Vliegtickets\n                        "
                          ),
                          _c("v-icon", [_vm._v("flight")])
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-tab",
                        {
                          on: {
                            click: function($event) {
                              _vm.changeForm("CarForm")
                            }
                          }
                        },
                        [
                          _vm._v(
                            "\n                        Huurauto\n                        "
                          ),
                          _c("v-icon", [_vm._v("directions_car")])
                        ],
                        1
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("v-card-text", [_c(_vm.form, { tag: "component" })], 1),
                  _vm._v(" "),
                  _c(
                    "v-card-actions",
                    [
                      _c(
                        "v-btn",
                        { attrs: { flat: "", color: "primary" } },
                        [_c("v-icon", [_vm._v("search")]), _vm._v("Search")],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-layout",
        {
          staticStyle: { "margin-top": "40px" },
          attrs: { row: "", wrap: "", tag: "section" }
        },
        [
          _c(
            "v-flex",
            { staticStyle: { "margin-bottom": "20px" }, attrs: { xs6: "" } },
            [
              _c(
                "h2",
                { staticClass: "display-3" },
                [
                  _c("v-icon", { attrs: { large: "" } }, [_vm._v("pin_drop")]),
                  _vm._v(
                    "\n                    Populaire bestemmingen\n                "
                  )
                ],
                1
              )
            ]
          ),
          _vm._v(" "),
          _c(
            "v-flex",
            { attrs: { xs6: "", "align-end": "" } },
            _vm._l(_vm.continents, function(continent) {
              return _c(
                "v-btn",
                {
                  key: continent.latitude,
                  attrs: { flat: "", color: "primary" },
                  on: {
                    click: function($event) {
                      _vm.topDestinations(continent.id)
                    }
                  }
                },
                [
                  _vm._v(
                    "\n                    " +
                      _vm._s(continent.name) +
                      "\n                "
                  )
                ]
              )
            })
          ),
          _vm._v(" "),
          _c(
            "v-flex",
            { attrs: { xs12: "" } },
            [_c("Destination", { attrs: { destination: _vm.topDestination } })],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-layout",
        { attrs: { row: "", wrap: "" } },
        [
          _c("v-flex", { attrs: { xs12: "", s6: "" } }, [
            _c("h2", { staticClass: "display-2" }, [_vm._v("Recente verhalen")])
          ]),
          _vm._v(" "),
          _c("v-flex", { attrs: { xs12: "", s6: "" } }, [
            _c("h2", { staticClass: "display-2" }, [_vm._v("Recente routes")])
          ])
        ],
        1
      )
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
    require("vue-hot-reload-api")      .rerender("data-v-e725123a", esExports)
  }
}

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * vue-meta v1.4.3
 * (c) 2018 Declan de Wet & Atinux
 * @license MIT
 */
(function (global, factory) {
  ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : global.VueMeta = factory();
})(undefined, function () {
  'use strict';

  /*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  */

  /* eslint-disable no-unused-vars */

  var getOwnPropertySymbols = Object.getOwnPropertySymbols;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var propIsEnumerable = Object.prototype.propertyIsEnumerable;

  function toObject(val) {
    if (val === null || val === undefined) {
      throw new TypeError('Object.assign cannot be called with null or undefined');
    }

    return Object(val);
  }

  function shouldUseNative() {
    try {
      if (!Object.assign) {
        return false;
      }

      // Detect buggy property enumeration order in older V8 versions.

      // https://bugs.chromium.org/p/v8/issues/detail?id=4118
      var test1 = new String('abc'); // eslint-disable-line no-new-wrappers
      test1[5] = 'de';
      if (Object.getOwnPropertyNames(test1)[0] === '5') {
        return false;
      }

      // https://bugs.chromium.org/p/v8/issues/detail?id=3056
      var test2 = {};
      for (var i = 0; i < 10; i++) {
        test2['_' + String.fromCharCode(i)] = i;
      }
      var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
        return test2[n];
      });
      if (order2.join('') !== '0123456789') {
        return false;
      }

      // https://bugs.chromium.org/p/v8/issues/detail?id=3056
      var test3 = {};
      'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
        test3[letter] = letter;
      });
      if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
        return false;
      }

      return true;
    } catch (err) {
      // We don't expect any of the above to throw, but better to be safe.
      return false;
    }
  }

  var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
    var arguments$1 = arguments;

    var from;
    var to = toObject(target);
    var symbols;

    for (var s = 1; s < arguments.length; s++) {
      from = Object(arguments$1[s]);

      for (var key in from) {
        if (hasOwnProperty.call(from, key)) {
          to[key] = from[key];
        }
      }

      if (getOwnPropertySymbols) {
        symbols = getOwnPropertySymbols(from);
        for (var i = 0; i < symbols.length; i++) {
          if (propIsEnumerable.call(from, symbols[i])) {
            to[symbols[i]] = from[symbols[i]];
          }
        }
      }
    }

    return to;
  };

  var isMergeableObject = function isMergeableObject(value) {
    return isNonNullObject(value) && !isSpecial(value);
  };

  function isNonNullObject(value) {
    return !!value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object';
  }

  function isSpecial(value) {
    var stringValue = Object.prototype.toString.call(value);

    return stringValue === '[object RegExp]' || stringValue === '[object Date]' || isReactElement(value);
  }

  // see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
  var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
  var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

  function isReactElement(value) {
    return value.$$typeof === REACT_ELEMENT_TYPE;
  }

  function emptyTarget(val) {
    return Array.isArray(val) ? [] : {};
  }

  function cloneUnlessOtherwiseSpecified(value, optionsArgument) {
    var clone = !optionsArgument || optionsArgument.clone !== false;

    return clone && isMergeableObject(value) ? deepmerge(emptyTarget(value), value, optionsArgument) : value;
  }

  function defaultArrayMerge(target, source, optionsArgument) {
    return target.concat(source).map(function (element) {
      return cloneUnlessOtherwiseSpecified(element, optionsArgument);
    });
  }

  function mergeObject(target, source, optionsArgument) {
    var destination = {};
    if (isMergeableObject(target)) {
      Object.keys(target).forEach(function (key) {
        destination[key] = cloneUnlessOtherwiseSpecified(target[key], optionsArgument);
      });
    }
    Object.keys(source).forEach(function (key) {
      if (!isMergeableObject(source[key]) || !target[key]) {
        destination[key] = cloneUnlessOtherwiseSpecified(source[key], optionsArgument);
      } else {
        destination[key] = deepmerge(target[key], source[key], optionsArgument);
      }
    });
    return destination;
  }

  function deepmerge(target, source, optionsArgument) {
    var sourceIsArray = Array.isArray(source);
    var targetIsArray = Array.isArray(target);
    var options = optionsArgument || { arrayMerge: defaultArrayMerge };
    var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

    if (!sourceAndTargetTypesMatch) {
      return cloneUnlessOtherwiseSpecified(source, optionsArgument);
    } else if (sourceIsArray) {
      var arrayMerge = options.arrayMerge || defaultArrayMerge;
      return arrayMerge(target, source, optionsArgument);
    } else {
      return mergeObject(target, source, optionsArgument);
    }
  }

  deepmerge.all = function deepmergeAll(array, optionsArgument) {
    if (!Array.isArray(array)) {
      throw new Error('first argument should be an array');
    }

    return array.reduce(function (prev, next) {
      return deepmerge(prev, next, optionsArgument);
    }, {});
  };

  var deepmerge_1 = deepmerge;

  /**
   * lodash (Custom Build) <https://lodash.com/>
   * Build: `lodash modularize exports="npm" -o ./`
   * Copyright jQuery Foundation and other contributors <https://jquery.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   */

  /** `Object#toString` result references. */
  var objectTag = '[object Object]';

  /**
   * Checks if `value` is a host object in IE < 9.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
   */
  function isHostObject(value) {
    // Many host objects are `Object` objects that can coerce to strings
    // despite having improperly defined `toString` methods.
    var result = false;
    if (value != null && typeof value.toString != 'function') {
      try {
        result = !!(value + '');
      } catch (e) {}
    }
    return result;
  }

  /**
   * Creates a unary function that invokes `func` with its argument transformed.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {Function} transform The argument transform.
   * @returns {Function} Returns the new function.
   */
  function overArg(func, transform) {
    return function (arg) {
      return func(transform(arg));
    };
  }

  /** Used for built-in method references. */
  var funcProto = Function.prototype;
  var objectProto = Object.prototype;

  /** Used to resolve the decompiled source of functions. */
  var funcToString = funcProto.toString;

  /** Used to check objects for own properties. */
  var hasOwnProperty$1 = objectProto.hasOwnProperty;

  /** Used to infer the `Object` constructor. */
  var objectCtorString = funcToString.call(Object);

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var objectToString = objectProto.toString;

  /** Built-in value references. */
  var getPrototype = overArg(Object.getPrototypeOf, Object);

  /**
   * Checks if `value` is object-like. A value is object-like if it's not `null`
   * and has a `typeof` result of "object".
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   * @example
   *
   * _.isObjectLike({});
   * // => true
   *
   * _.isObjectLike([1, 2, 3]);
   * // => true
   *
   * _.isObjectLike(_.noop);
   * // => false
   *
   * _.isObjectLike(null);
   * // => false
   */
  function isObjectLike(value) {
    return !!value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
  }

  /**
   * Checks if `value` is a plain object, that is, an object created by the
   * `Object` constructor or one with a `[[Prototype]]` of `null`.
   *
   * @static
   * @memberOf _
   * @since 0.8.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   * }
   *
   * _.isPlainObject(new Foo);
   * // => false
   *
   * _.isPlainObject([1, 2, 3]);
   * // => false
   *
   * _.isPlainObject({ 'x': 0, 'y': 0 });
   * // => true
   *
   * _.isPlainObject(Object.create(null));
   * // => true
   */
  function isPlainObject(value) {
    if (!isObjectLike(value) || objectToString.call(value) != objectTag || isHostObject(value)) {
      return false;
    }
    var proto = getPrototype(value);
    if (proto === null) {
      return true;
    }
    var Ctor = hasOwnProperty$1.call(proto, 'constructor') && proto.constructor;
    return typeof Ctor == 'function' && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
  }

  var lodash_isplainobject = isPlainObject;

  /**
   * checks if passed argument is an array
   * @param  {any}  arr - the object to check
   * @return {Boolean} - true if `arr` is an array
   */
  function isArray(arr) {
    return Array.isArray ? Array.isArray(arr) : Object.prototype.toString.call(arr) === '[object Array]';
  }

  /**
   * Returns the `opts.option` $option value of the given `opts.component`.
   * If methods are encountered, they will be bound to the component context.
   * If `opts.deep` is true, will recursively merge all child component
   * `opts.option` $option values into the returned result.
   *
   * @param  {Object} opts - options
   * @param  {Object} opts.component - Vue component to fetch option data from
   * @param  {String} opts.option - what option to look for
   * @param  {Boolean} opts.deep - look for data in child components as well?
   * @param  {Function} opts.arrayMerge - how should arrays be merged?
   * @param  {Object} [result={}] - result so far
   * @return {Object} result - final aggregated result
   */
  function getComponentOption(opts, result) {
    if (result === void 0) result = {};

    var component = opts.component;
    var option = opts.option;
    var deep = opts.deep;
    var arrayMerge = opts.arrayMerge;
    var $options = component.$options;

    if (component._inactive) {
      return result;
    }

    // only collect option data if it exists
    if (typeof $options[option] !== 'undefined' && $options[option] !== null) {
      var data = $options[option];

      // if option is a function, replace it with it's result
      if (typeof data === 'function') {
        data = data.call(component);
      }

      if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') {
        // merge with existing options
        result = deepmerge_1(result, data, { arrayMerge: arrayMerge });
      } else {
        result = data;
      }
    }

    // collect & aggregate child options if deep = true
    if (deep && component.$children.length) {
      component.$children.forEach(function (childComponent) {
        result = getComponentOption({
          component: childComponent,
          option: option,
          deep: deep,
          arrayMerge: arrayMerge
        }, result);
      });
    }

    return result;
  }

  var escapeHTML = function escapeHTML(str) {
    return typeof window === 'undefined'
    // server-side escape sequence
    ? String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;')
    // client-side escape sequence
    : String(str).replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>').replace(/"/g, '"').replace(/'/g, '\'');
  };

  function _getMetaInfo(options) {
    if (options === void 0) options = {};

    var keyName = options.keyName;
    var tagIDKeyName = options.tagIDKeyName;
    /**
     * Returns the correct meta info for the given component
     * (child components will overwrite parent meta info)
     *
     * @param  {Object} component - the Vue instance to get meta info from
     * @return {Object} - returned meta info
     */
    return function getMetaInfo(component) {
      // set some sane defaults
      var defaultInfo = {
        title: '',
        titleChunk: '',
        titleTemplate: '%s',
        htmlAttrs: {},
        bodyAttrs: {},
        headAttrs: {},
        meta: [],
        base: [],
        link: [],
        style: [],
        script: [],
        noscript: [],
        __dangerouslyDisableSanitizers: [],
        __dangerouslyDisableSanitizersByTagID: {}
      };

      // collect & aggregate all metaInfo $options
      var info = getComponentOption({
        component: component,
        option: keyName,
        deep: true,
        arrayMerge: function arrayMerge(target, source) {
          // we concat the arrays without merging objects contained in,
          // but we check for a `vmid` property on each object in the array
          // using an O(1) lookup associative array exploit
          // note the use of "for in" - we are looping through arrays here, not
          // plain objects
          var destination = [];
          for (var targetIndex in target) {
            var targetItem = target[targetIndex];
            var shared = false;
            for (var sourceIndex in source) {
              var sourceItem = source[sourceIndex];
              if (targetItem[tagIDKeyName] && targetItem[tagIDKeyName] === sourceItem[tagIDKeyName]) {
                shared = true;
                break;
              }
            }
            if (!shared) {
              destination.push(targetItem);
            }
          }

          return destination.concat(source);
        }
      });

      // backup the title chunk in case user wants access to it
      if (info.title) {
        info.titleChunk = info.title;
      }

      // replace title with populated template
      if (info.titleTemplate) {
        if (typeof info.titleTemplate === 'function') {
          info.title = info.titleTemplate.call(component, info.titleChunk);
        } else {
          info.title = info.titleTemplate.replace(/%s/g, info.titleChunk);
        }
      }

      // convert base tag to an array so it can be handled the same way
      // as the other tags
      if (info.base) {
        info.base = Object.keys(info.base).length ? [info.base] : [];
      }

      var ref = info.__dangerouslyDisableSanitizers;
      var refByTagID = info.__dangerouslyDisableSanitizersByTagID;

      // sanitizes potentially dangerous characters
      var escape = function escape(info) {
        return Object.keys(info).reduce(function (escaped, key) {
          var isDisabled = ref && ref.indexOf(key) > -1;
          var tagID = info[tagIDKeyName];
          if (!isDisabled && tagID) {
            isDisabled = refByTagID && refByTagID[tagID] && refByTagID[tagID].indexOf(key) > -1;
          }
          var val = info[key];
          escaped[key] = val;
          if (key === '__dangerouslyDisableSanitizers' || key === '__dangerouslyDisableSanitizersByTagID') {
            return escaped;
          }
          if (!isDisabled) {
            if (typeof val === 'string') {
              escaped[key] = escapeHTML(val);
            } else if (lodash_isplainobject(val)) {
              escaped[key] = escape(val);
            } else if (isArray(val)) {
              escaped[key] = val.map(escape);
            } else {
              escaped[key] = val;
            }
          } else {
            escaped[key] = val;
          }

          return escaped;
        }, {});
      };

      // merge with defaults
      info = deepmerge_1(defaultInfo, info);

      // begin sanitization
      info = escape(info);

      return info;
    };
  }

  function _titleGenerator(options) {
    if (options === void 0) options = {};

    var attribute = options.attribute;

    /**
     * Generates title output for the server
     *
     * @param  {'title'} type - the string "title"
     * @param  {String} data - the title text
     * @return {Object} - the title generator
     */
    return function titleGenerator(type, data) {
      return {
        text: function text() {
          return "<" + type + " " + attribute + "=\"true\">" + data + "</" + type + ">";
        }
      };
    };
  }

  function _attrsGenerator(options) {
    if (options === void 0) options = {};

    var attribute = options.attribute;

    /**
     * Generates tag attributes for use on the server.
     *
     * @param  {('bodyAttrs'|'htmlAttrs'|'headAttrs')} type - the type of attributes to generate
     * @param  {Object} data - the attributes to generate
     * @return {Object} - the attribute generator
     */
    return function attrsGenerator(type, data) {
      return {
        text: function text() {
          var attributeStr = '';
          var watchedAttrs = [];
          for (var attr in data) {
            if (data.hasOwnProperty(attr)) {
              watchedAttrs.push(attr);
              attributeStr += (typeof data[attr] !== 'undefined' ? attr + "=\"" + data[attr] + "\"" : attr) + " ";
            }
          }
          attributeStr += attribute + "=\"" + watchedAttrs.join(',') + "\"";
          return attributeStr.trim();
        }
      };
    };
  }

  function _tagGenerator(options) {
    if (options === void 0) options = {};

    var attribute = options.attribute;

    /**
     * Generates meta, base, link, style, script, noscript tags for use on the server
     *
     * @param  {('meta'|'base'|'link'|'style'|'script'|'noscript')} the name of the tag
     * @param  {(Array<Object>|Object)} tags - an array of tag objects or a single object in case of base
     * @return {Object} - the tag generator
     */
    return function tagGenerator(type, tags) {
      return {
        text: function text(ref) {
          if (ref === void 0) ref = {};
          var body = ref.body;if (body === void 0) body = false;

          // build a string containing all tags of this type
          return tags.reduce(function (tagsStr, tag) {
            if (!!tag.body !== body) {
              return tagsStr;
            }
            // build a string containing all attributes of this tag
            var attrs = Object.keys(tag).reduce(function (attrsStr, attr) {
              switch (attr) {
                // these attributes are treated as children on the tag
                case 'innerHTML':
                case 'cssText':
                case 'once':
                  return attrsStr;
                // these form the attribute list for this tag
                default:
                  if ([options.tagIDKeyName, 'body'].indexOf(attr) !== -1) {
                    return attrsStr + " data-" + attr + "=\"" + tag[attr] + "\"";
                  }
                  return typeof tag[attr] === 'undefined' ? attrsStr + " " + attr : attrsStr + " " + attr + "=\"" + tag[attr] + "\"";
              }
            }, '').trim();

            // grab child content from one of these attributes, if possible
            var content = tag.innerHTML || tag.cssText || '';

            // these tag types will have content inserted
            var closed = ['noscript', 'script', 'style'].indexOf(type) === -1;

            // generate tag exactly without any other redundance attribute
            var observeTag = tag.once ? '' : attribute + "=\"true\" ";

            // the final string for this specific tag
            return closed ? tagsStr + "<" + type + " " + observeTag + attrs + "/>" : tagsStr + "<" + type + " " + observeTag + attrs + ">" + content + "</" + type + ">";
          }, '');
        }
      };
    };
  }

  function _generateServerInjector(options) {
    if (options === void 0) options = {};

    /**
     * Converts a meta info property to one that can be stringified on the server
     *
     * @param  {String} type - the type of data to convert
     * @param  {(String|Object|Array<Object>)} data - the data value
     * @return {Object} - the new injector
     */
    return function generateServerInjector(type, data) {
      switch (type) {
        case 'title':
          return _titleGenerator(options)(type, data);
        case 'htmlAttrs':
        case 'bodyAttrs':
        case 'headAttrs':
          return _attrsGenerator(options)(type, data);
        default:
          return _tagGenerator(options)(type, data);
      }
    };
  }

  function _inject(options) {
    if (options === void 0) options = {};

    /**
     * Converts the state of the meta info object such that each item
     * can be compiled to a tag string on the server
     *
     * @this {Object} - Vue instance - ideally the root component
     * @return {Object} - server meta info with `toString` methods
     */
    return function inject() {
      // get meta info with sensible defaults
      var info = _getMetaInfo(options)(this.$root);

      // generate server injectors
      for (var key in info) {
        if (info.hasOwnProperty(key) && key !== 'titleTemplate' && key !== 'titleChunk') {
          info[key] = _generateServerInjector(options)(key, info[key]);
        }
      }

      return info;
    };
  }

  function _updateTitle() {
    /**
     * updates the document title
     *
     * @param  {String} title - the new title of the document
     */
    return function updateTitle(title) {
      if (title === void 0) title = document.title;

      document.title = title;
    };
  }

  function _updateTagAttributes(options) {
    if (options === void 0) options = {};

    var attribute = options.attribute;

    /**
     * updates the document's html tag attributes
     *
     * @param  {Object} attrs - the new document html attributes
     * @param  {HTMLElement} tag - the HTMLElment tag to update with new attrs
     */
    return function updateTagAttributes(attrs, tag) {
      var vueMetaAttrString = tag.getAttribute(attribute);
      var vueMetaAttrs = vueMetaAttrString ? vueMetaAttrString.split(',') : [];
      var toRemove = [].concat(vueMetaAttrs);
      for (var attr in attrs) {
        if (attrs.hasOwnProperty(attr)) {
          var val = attrs[attr] || '';
          tag.setAttribute(attr, val);
          if (vueMetaAttrs.indexOf(attr) === -1) {
            vueMetaAttrs.push(attr);
          }
          var saveIndex = toRemove.indexOf(attr);
          if (saveIndex !== -1) {
            toRemove.splice(saveIndex, 1);
          }
        }
      }
      var i = toRemove.length - 1;
      for (; i >= 0; i--) {
        tag.removeAttribute(toRemove[i]);
      }
      if (vueMetaAttrs.length === toRemove.length) {
        tag.removeAttribute(attribute);
      } else {
        tag.setAttribute(attribute, vueMetaAttrs.join(','));
      }
    };
  }

  // borrow the slice method
  var toArray = Function.prototype.call.bind(Array.prototype.slice);

  function _updateTags(options) {
    if (options === void 0) options = {};

    var attribute = options.attribute;

    /**
     * Updates meta tags inside <head> and <body> on the client. Borrowed from `react-helmet`:
     * https://github.com/nfl/react-helmet/blob/004d448f8de5f823d10f838b02317521180f34da/src/Helmet.js#L195-L245
     *
     * @param  {('meta'|'base'|'link'|'style'|'script'|'noscript')} type - the name of the tag
     * @param  {(Array<Object>|Object)} tags - an array of tag objects or a single object in case of base
     * @return {Object} - a representation of what tags changed
     */
    return function updateTags(type, tags, headTag, bodyTag) {
      var oldHeadTags = toArray(headTag.querySelectorAll(type + "[" + attribute + "]"));
      var oldBodyTags = toArray(bodyTag.querySelectorAll(type + "[" + attribute + "][data-body=\"true\"]"));
      var newTags = [];
      var indexToDelete;

      if (tags.length > 1) {
        // remove duplicates that could have been found by merging tags
        // which include a mixin with metaInfo and that mixin is used
        // by multiple components on the same page
        var found = [];
        tags = tags.map(function (x) {
          var k = JSON.stringify(x);
          if (found.indexOf(k) < 0) {
            found.push(k);
            return x;
          }
        }).filter(function (x) {
          return x;
        });
      }

      if (tags && tags.length) {
        tags.forEach(function (tag) {
          var newElement = document.createElement(type);
          var oldTags = tag.body !== true ? oldHeadTags : oldBodyTags;

          for (var attr in tag) {
            if (tag.hasOwnProperty(attr)) {
              if (attr === 'innerHTML') {
                newElement.innerHTML = tag.innerHTML;
              } else if (attr === 'cssText') {
                if (newElement.styleSheet) {
                  newElement.styleSheet.cssText = tag.cssText;
                } else {
                  newElement.appendChild(document.createTextNode(tag.cssText));
                }
              } else if ([options.tagIDKeyName, 'body'].indexOf(attr) !== -1) {
                var _attr = "data-" + attr;
                var value = typeof tag[attr] === 'undefined' ? '' : tag[attr];
                newElement.setAttribute(_attr, value);
              } else {
                var value$1 = typeof tag[attr] === 'undefined' ? '' : tag[attr];
                newElement.setAttribute(attr, value$1);
              }
            }
          }

          newElement.setAttribute(attribute, 'true');

          // Remove a duplicate tag from domTagstoRemove, so it isn't cleared.
          if (oldTags.some(function (existingTag, index) {
            indexToDelete = index;
            return newElement.isEqualNode(existingTag);
          })) {
            oldTags.splice(indexToDelete, 1);
          } else {
            newTags.push(newElement);
          }
        });
      }
      var oldTags = oldHeadTags.concat(oldBodyTags);
      oldTags.forEach(function (tag) {
        return tag.parentNode.removeChild(tag);
      });
      newTags.forEach(function (tag) {
        if (tag.getAttribute('data-body') === 'true') {
          bodyTag.appendChild(tag);
        } else {
          headTag.appendChild(tag);
        }
      });

      return { oldTags: oldTags, newTags: newTags };
    };
  }

  function _updateClientMetaInfo(options) {
    if (options === void 0) options = {};

    var ssrAttribute = options.ssrAttribute;

    /**
     * Performs client-side updates when new meta info is received
     *
     * @param  {Object} newInfo - the meta info to update to
     */
    return function updateClientMetaInfo(newInfo) {
      var htmlTag = document.getElementsByTagName('html')[0];
      // if this is not a server render, then update
      if (htmlTag.getAttribute(ssrAttribute) === null) {
        // initialize tracked changes
        var addedTags = {};
        var removedTags = {};

        Object.keys(newInfo).forEach(function (key) {
          switch (key) {
            // update the title
            case 'title':
              _updateTitle(options)(newInfo.title);
              break;
            // update attributes
            case 'htmlAttrs':
              _updateTagAttributes(options)(newInfo[key], htmlTag);
              break;
            case 'bodyAttrs':
              _updateTagAttributes(options)(newInfo[key], document.getElementsByTagName('body')[0]);
              break;
            case 'headAttrs':
              _updateTagAttributes(options)(newInfo[key], document.getElementsByTagName('head')[0]);
              break;
            // ignore these
            case 'titleChunk':
            case 'titleTemplate':
            case 'changed':
            case '__dangerouslyDisableSanitizers':
              break;
            // catch-all update tags
            default:
              var headTag = document.getElementsByTagName('head')[0];
              var bodyTag = document.getElementsByTagName('body')[0];
              var ref = _updateTags(options)(key, newInfo[key], headTag, bodyTag);
              var oldTags = ref.oldTags;
              var newTags = ref.newTags;
              if (newTags.length) {
                addedTags[key] = newTags;
                removedTags[key] = oldTags;
              }
          }
        });

        // emit "event" with new info
        if (typeof newInfo.changed === 'function') {
          newInfo.changed.call(this, newInfo, addedTags, removedTags);
        }
      } else {
        // remove the server render attribute so we can update on changes
        htmlTag.removeAttribute(ssrAttribute);
      }
    };
  }

  function _refresh(options) {
    if (options === void 0) options = {};

    /**
     * When called, will update the current meta info with new meta info.
     * Useful when updating meta info as the result of an asynchronous
     * action that resolves after the initial render takes place.
     *
     * Credit to [Sébastien Chopin](https://github.com/Atinux) for the suggestion
     * to implement this method.
     *
     * @return {Object} - new meta info
     */
    return function refresh() {
      var info = _getMetaInfo(options)(this.$root);
      _updateClientMetaInfo(options).call(this, info);
      return info;
    };
  }

  function _$meta(options) {
    if (options === void 0) options = {};

    /**
     * Returns an injector for server-side rendering.
     * @this {Object} - the Vue instance (a root component)
     * @return {Object} - injector
     */
    return function $meta() {
      return {
        inject: _inject(options).bind(this),
        refresh: _refresh(options).bind(this)
      };
    };
  }

  // fallback to timers if rAF not present
  var stopUpdate = (typeof window !== 'undefined' ? window.cancelAnimationFrame : null) || clearTimeout;
  var startUpdate = (typeof window !== 'undefined' ? window.requestAnimationFrame : null) || function (cb) {
    return setTimeout(cb, 0);
  };

  /**
   * Performs a batched update. Uses requestAnimationFrame to prevent
   * calling a function too many times in quick succession.
   * You need to pass it an ID (which can initially be `null`),
   * but be sure to overwrite that ID with the return value of batchUpdate.
   *
   * @param  {(null|Number)} id - the ID of this update
   * @param  {Function} callback - the update to perform
   * @return {Number} id - a new ID
   */
  function batchUpdate(id, callback) {
    stopUpdate(id);
    return startUpdate(function () {
      id = null;
      callback();
    });
  }

  /**
   * These are constant variables used throughout the application.
   */

  // This is the name of the component option that contains all the information that
  // gets converted to the various meta tags & attributes for the page.
  var VUE_META_KEY_NAME = 'metaInfo';

  // This is the attribute vue-meta augments on elements to know which it should
  // manage and which it should ignore.
  var VUE_META_ATTRIBUTE = 'data-vue-meta';

  // This is the attribute that goes on the `html` tag to inform `vue-meta`
  // that the server has already generated the meta tags for the initial render.
  var VUE_META_SERVER_RENDERED_ATTRIBUTE = 'data-vue-meta-server-rendered';

  // This is the property that tells vue-meta to overwrite (instead of append)
  // an item in a tag list. For example, if you have two `meta` tag list items
  // that both have `vmid` of "description", then vue-meta will overwrite the
  // shallowest one with the deepest one.
  var VUE_META_TAG_LIST_ID_KEY_NAME = 'vmid';

  // automatic install
  if (typeof window !== 'undefined' && typeof window.Vue !== 'undefined') {
    Vue.use(VueMeta);
  }

  /**
   * Plugin install function.
   * @param {Function} Vue - the Vue constructor.
   */
  function VueMeta(Vue, options) {
    if (options === void 0) options = {};

    // set some default options
    var defaultOptions = {
      keyName: VUE_META_KEY_NAME,
      attribute: VUE_META_ATTRIBUTE,
      ssrAttribute: VUE_META_SERVER_RENDERED_ATTRIBUTE,
      tagIDKeyName: VUE_META_TAG_LIST_ID_KEY_NAME
    };
    // combine options
    options = objectAssign(defaultOptions, options);

    // bind the $meta method to this component instance
    Vue.prototype.$meta = _$meta(options);

    // store an id to keep track of DOM updates
    var batchID = null;

    // watch for client side component updates
    Vue.mixin({
      beforeCreate: function beforeCreate() {
        // Add a marker to know if it uses metaInfo
        if (typeof this.$options[options.keyName] !== 'undefined') {
          this._hasMetaInfo = true;
        }
        // coerce function-style metaInfo to a computed prop so we can observe
        // it on creation
        if (typeof this.$options[options.keyName] === 'function') {
          if (typeof this.$options.computed === 'undefined') {
            this.$options.computed = {};
          }
          this.$options.computed.$metaInfo = this.$options[options.keyName];
        }
      },
      created: function created() {
        var this$1 = this;

        // if computed $metaInfo exists, watch it for updates & trigger a refresh
        // when it changes (i.e. automatically handle async actions that affect metaInfo)
        // credit for this suggestion goes to [Sébastien Chopin](https://github.com/Atinux)
        if (!this.$isServer && this.$metaInfo) {
          this.$watch('$metaInfo', function () {
            // batch potential DOM updates to prevent extraneous re-rendering
            batchID = batchUpdate(batchID, function () {
              return this$1.$meta().refresh();
            });
          });
        }
      },
      activated: function activated() {
        var this$1 = this;

        if (this._hasMetaInfo) {
          // batch potential DOM updates to prevent extraneous re-rendering
          batchID = batchUpdate(batchID, function () {
            return this$1.$meta().refresh();
          });
        }
      },
      deactivated: function deactivated() {
        var this$1 = this;

        if (this._hasMetaInfo) {
          // batch potential DOM updates to prevent extraneous re-rendering
          batchID = batchUpdate(batchID, function () {
            return this$1.$meta().refresh();
          });
        }
      },
      beforeMount: function beforeMount() {
        var this$1 = this;

        // batch potential DOM updates to prevent extraneous re-rendering
        if (this._hasMetaInfo) {
          batchID = batchUpdate(batchID, function () {
            return this$1.$meta().refresh();
          });
        }
      },
      destroyed: function destroyed() {
        var this$1 = this;

        // do not trigger refresh on the server side
        if (this.$isServer) {
          return;
        }
        // re-render meta data when returning from a child component to parent
        if (this._hasMetaInfo) {
          // Wait that element is hidden before refreshing meta tags (to support animations)
          var interval = setInterval(function () {
            if (this$1.$el.offsetParent !== null) {
              return;
            }
            clearInterval(interval);
            batchID = batchUpdate(batchID, function () {
              return this$1.$meta().refresh();
            });
          }, 50);
        }
      }
    });
  }

  var version = "1.4.3";

  VueMeta.version = version;

  return VueMeta;
});

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Web_vue__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Web_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Web_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Web_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Web_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_98f3c19c_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Web_vue__ = __webpack_require__(40);
var disposed = false
var normalizeComponent = __webpack_require__(0)
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Web_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_98f3c19c_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Web_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\layouts\\Web.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-98f3c19c", Component.options)
  } else {
    hotAPI.reload("data-v-98f3c19c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Appbar_vue__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Appbar_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Appbar_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Appbar_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Appbar_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7240db89_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Appbar_vue__ = __webpack_require__(35);
var disposed = false
var normalizeComponent = __webpack_require__(0)
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
/* 35 */
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
      _c("Icon", {
        staticClass: "trigger",
        attrs: { name: "menu", "data-trigger": _vm.drawerId }
      }),
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
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_NavigationDrawer_vue__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_NavigationDrawer_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_NavigationDrawer_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_NavigationDrawer_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_NavigationDrawer_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_119c4d1c_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_NavigationDrawer_vue__ = __webpack_require__(37);
var disposed = false
var normalizeComponent = __webpack_require__(0)
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_NavigationDrawer_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_119c4d1c_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_NavigationDrawer_vue__["a" /* default */],
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
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "nav",
    { staticClass: "drawer", attrs: { id: _vm.trigger } },
    [_vm._t("header"), _vm._v(" "), _vm._t("content")],
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
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Menu_vue__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Menu_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Menu_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Menu_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Menu_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_93f38854_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Menu_vue__ = __webpack_require__(39);
var disposed = false
var normalizeComponent = __webpack_require__(0)
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Menu_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_93f38854_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Menu_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\Menu.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-93f38854", Component.options)
  } else {
    hotAPI.reload("data-v-93f38854", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "nav",
    { staticClass: "menu", attrs: { id: _vm.trigger } },
    [_vm._t("default")],
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
    require("vue-hot-reload-api")      .rerender("data-v-93f38854", esExports)
  }
}

/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-app",
    [
      _c(
        "v-toolbar",
        { attrs: { fixed: "", color: "primary" } },
        [
          _c("v-toolbar-side-icon", {
            on: {
              click: function($event) {
                $event.stopPropagation()
                _vm.drawer = !_vm.drawer
              }
            }
          }),
          _vm._v(" "),
          _c("v-toolbar-title", [_vm._v("Home")]),
          _vm._v(" "),
          _c("v-spacer"),
          _vm._v(" "),
          _c(
            "v-btn",
            { attrs: { icon: "" } },
            [_c("v-icon", [_vm._v("search")])],
            1
          ),
          _vm._v(" "),
          _c(
            "v-btn",
            { attrs: { icon: "" } },
            [_c("v-icon", [_vm._v("more_vert")])],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-navigation-drawer",
        {
          attrs: { fixed: "", temporary: "" },
          model: {
            value: _vm.drawer,
            callback: function($$v) {
              _vm.drawer = $$v
            },
            expression: "drawer"
          }
        },
        [
          _c(
            "v-toolbar",
            { staticClass: "transparent", attrs: { flat: "" } },
            [
              _c(
                "v-list",
                [
                  _c(
                    "v-list-tile",
                    { attrs: { avatar: "" } },
                    [
                      _c("v-list-tile-avatar", [
                        _c("img", {
                          attrs: {
                            src:
                              "https://randomuser.me/api/portraits/men/85.jpg"
                          }
                        })
                      ]),
                      _vm._v(" "),
                      _c(
                        "v-list-tile-content",
                        [_c("v-list-tile-title", [_vm._v("John Leider")])],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-list",
            { staticClass: "pt-0", attrs: { dense: "" } },
            [
              _vm._l(_vm.items, function(item) {
                return [
                  item.heading
                    ? _c(
                        "v-layout",
                        {
                          key: item.heading,
                          attrs: { row: "", "align-center": "" }
                        },
                        [
                          _c(
                            "v-flex",
                            { attrs: { xs6: "" } },
                            [
                              item.heading
                                ? _c("v-subheader", [
                                    _vm._v(_vm._s(item.heading))
                                  ])
                                : _vm._e()
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "v-flex",
                            {
                              staticClass: "text-xs-center",
                              attrs: { xs6: "" }
                            },
                            [
                              _c(
                                "a",
                                {
                                  staticClass: "body-2 black--text",
                                  attrs: { href: "#!" }
                                },
                                [_vm._v("EDIT")]
                              )
                            ]
                          )
                        ],
                        1
                      )
                    : item.children
                      ? _c(
                          "v-list-group",
                          {
                            key: item.title,
                            attrs: {
                              "prepend-icon": item.model
                                ? item.icon
                                : item["icon-alt"],
                              "append-icon": ""
                            },
                            model: {
                              value: item.model,
                              callback: function($$v) {
                                _vm.$set(item, "model", $$v)
                              },
                              expression: "item.model"
                            }
                          },
                          [
                            _c(
                              "v-list-tile",
                              {
                                attrs: { slot: "activator" },
                                slot: "activator"
                              },
                              [
                                _c(
                                  "v-list-tile-content",
                                  [
                                    _c("v-list-tile-title", [
                                      _vm._v(
                                        "\n                                " +
                                          _vm._s(item.title) +
                                          "\n                            "
                                      )
                                    ])
                                  ],
                                  1
                                )
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _vm._l(item.children, function(child, i) {
                              return _c(
                                "v-list-tile",
                                { key: i, attrs: { to: child.to } },
                                [
                                  child.icon
                                    ? _c(
                                        "v-list-tile-action",
                                        [
                                          _c("v-icon", [
                                            _vm._v(_vm._s(child.icon))
                                          ])
                                        ],
                                        1
                                      )
                                    : _vm._e(),
                                  _vm._v(" "),
                                  _c(
                                    "v-list-tile-content",
                                    [
                                      _c("v-list-tile-title", [
                                        _vm._v(_vm._s(child.title))
                                      ])
                                    ],
                                    1
                                  )
                                ],
                                1
                              )
                            })
                          ],
                          2
                        )
                      : _c(
                          "v-list-tile",
                          { key: item.title, attrs: { to: item.to } },
                          [
                            _c(
                              "v-list-tile-action",
                              [_c("v-icon", [_vm._v(_vm._s(item.icon))])],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "v-list-tile-content",
                              [
                                _c("v-list-tile-title", [
                                  _vm._v(_vm._s(item.title))
                                ])
                              ],
                              1
                            )
                          ],
                          1
                        )
                ]
              })
            ],
            2
          )
        ],
        1
      ),
      _vm._v(" "),
      _c("router-view")
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
    require("vue-hot-reload-api")      .rerender("data-v-98f3c19c", esExports)
  }
}

/***/ })
/******/ ]);