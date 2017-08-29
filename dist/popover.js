(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["popoverjs"] = factory();
	else
		root["popoverjs"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var _arguments = arguments;
var oneEvent = function oneEvent(target, eventType, callback) {
  var wrappedCallback = function wrappedCallback(eventObject) {
    target.removeEventListener(eventType, wrappedCallback);
    return callback(eventObject);
  };

  target.addEventListener(eventType, wrappedCallback);

  return [eventType, wrappedCallback];
};

var addClass = function addClass(element, className) {
  element.classList.add(className);
};

var removeClass = function removeClass(element, className) {
  element.classList.remove(className);
};

var toggleClassesOnElement = function toggleClassesOnElement(element, classes, isToggled) {
  var method = isToggled ? addClass : removeClass;

  classes.forEach(function (className) {
    method(element, className);
  });
};

var setHalfPointsOnOrigin = function setHalfPointsOnOrigin(origin) {
  var halfHeight = origin.height / 2;
  var halfWidth = origin.width / 2;

  return Object.assign(origin, {
    halfHeight: halfHeight,
    halfWidth: halfWidth,
    verticalCenter: origin.top + halfHeight,
    horizontalCenter: origin.left + halfWidth
  });
};

var getWindowOrigin = function getWindowOrigin() {
  var height = window.innerHeight;
  var width = window.innerWidth;

  var origin = {
    bottom: height,
    height: height,
    left: 0,
    right: width,
    top: 0,
    width: width
  };

  return setHalfPointsOnOrigin(origin);
};

var getElementOrigin = function getElementOrigin(element) {
  var clientRect = element.getBoundingClientRect();

  var origin = {
    left: clientRect.left,
    right: clientRect.right,
    bottom: clientRect.bottom,
    top: clientRect.top,
    height: clientRect.height,
    width: clientRect.width
  };

  return setHalfPointsOnOrigin(origin);
};

var whichTransitionEvent = function whichTransitionEvent(element) {
  var transitions = {
    transition: 'transitionend',
    OTransition: 'oTransitionEnd',
    MozTransition: 'transitionend',
    WebkitTransition: 'webkitTransitionEnd'
  };

  var elementStyle = element.style;

  var rendererType = Object.keys(transitions).find(function (type) {
    return elementStyle[type] !== undefined;
  });

  return transitions[rendererType];
};

var throttle = function throttle(fn, threshhold, scope) {
  var time = threshhold;
  if (!time) {
    time = 250;
  }

  var last = null;
  var deferTimer = null;
  return function () {
    var context = scope || undefined;

    var now = +new Date();
    var args = _arguments;
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
};

var error = function error(message) {
  throw new Error(message);
};

exports.oneEvent = oneEvent;
exports.addClass = addClass;
exports.error = error;
exports.throttle = throttle;
exports.removeClass = removeClass;
exports.getElementOrigin = getElementOrigin;
exports.setHalfPointsOnOrigin = setHalfPointsOnOrigin;
exports.getWindowOrigin = getWindowOrigin;
exports.whichTransitionEvent = whichTransitionEvent;
exports.toggleClassesOnElement = toggleClassesOnElement;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(2);

var _renderer = __webpack_require__(3);

var _renderer2 = _interopRequireDefault(_renderer);

var _positioner = __webpack_require__(4);

var _positioner2 = _interopRequireDefault(_positioner);

var _utils = __webpack_require__(0);

__webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaults = {
  showDelay: 0,
  hideDelay: 0,
  themeClass: 'popoverjs--default',
  unnecessaryRepositioning: false,
  resizePositioning: true,
  onBeforeHide: function onBeforeHide() {},
  onBeforeShow: function onBeforeShow() {},
  onAfterHide: function onAfterHide() {},
  onAfterShow: function onAfterShow() {}
};

var requiredOptions = ['attachmentElement', 'popoverElement'];

var Popoverjs = function () {
  function Popoverjs(options) {
    _classCallCheck(this, Popoverjs);

    this.options = Object.assign({}, defaults, options);

    this.checkForRequiredOptions();
    this.initialize();
  }

  _createClass(Popoverjs, [{
    key: 'checkForRequiredOptions',
    value: function checkForRequiredOptions() {
      var optionKeys = Object.keys(this.options);

      requiredOptions.forEach(function (option) {
        if (!optionKeys.includes(option)) {
          (0, _utils.error)('Must supply ' + option + ' option to Popoverjs');
        }
      });
    }
  }, {
    key: 'initialize',
    value: function initialize() {
      this.setUpGlobals();
      this.setUpRenderer();
    }
  }, {
    key: 'setUpGlobals',
    value: function setUpGlobals() {
      if (!this.options.triggerElement) {
        this.options.triggerElement = this.options.attachmentElement;
      }
    }
  }, {
    key: 'toggle',
    value: function toggle(isToggled) {
      if (isToggled) {
        this.show();
      } else {
        this.hide();
      }
    }
  }, {
    key: 'update',
    value: function update() {
      if (!this.Positioner) {
        return;
      }

      this.Positioner.position();
    }
  }, {
    key: 'onToggleEnd',
    value: function onToggleEnd() {
      if (!this.Positioner) {
        return;
      }

      this.Positioner.disable();
    }
  }, {
    key: 'show',
    value: function show() {
      this.Renderer.show();
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.Renderer.hide();
    }
  }, {
    key: 'forceHide',
    value: function forceHide() {
      this.Renderer.forceHide();
    }
  }, {
    key: 'onBeforeShow',
    value: function onBeforeShow() {
      this.setUpPositioner();
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.destroyRenderer();
      this.destroyPositioner();
    }
  }, {
    key: 'setUpRenderer',
    value: function setUpRenderer() {
      this.Renderer = new _renderer2.default(this.rendererOptions);
    }
  }, {
    key: 'destroyRenderer',
    value: function destroyRenderer() {
      if (!this.Renderer) {
        return;
      }

      this.Renderer.destroy();
      this.Renderer = null;
      delete this.Renderer;
    }
  }, {
    key: 'setUpPositioner',
    value: function setUpPositioner() {
      this.Positioner = new _positioner2.default(this.positionerOptions);
      this.Positioner.enable();
    }
  }, {
    key: 'destroyPositioner',
    value: function destroyPositioner() {
      if (!this.Positioner) {
        return;
      }

      this.Positioner.destroy();
      this.Positioner = null;
      delete this.Positioner;
    }
  }, {
    key: 'rendererOptions',
    get: function get() {
      return Object.assign({}, this.options, {
        onToggleEnd: this.onToggleEnd.bind(this),
        onBeforeShow: this.onBeforeShow.bind(this)
      });
    }
  }, {
    key: 'positionerOptions',
    get: function get() {
      return Object.assign({}, this.options);
    }
  }]);

  return Popoverjs;
}();

window.Popoverjs = Popoverjs;

exports.default = Popoverjs;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (typeof Object.assign != 'function') {
	Object.assign = function (target, varArgs) {
		// .length of function is 2
		'use strict';

		if (target == null) {
			// TypeError if undefined or null
			throw new TypeError('Cannot convert undefined or null to object');
		}

		var to = Object(target);

		for (var index = 1; index < arguments.length; index++) {
			var nextSource = arguments[index];

			if (nextSource != null) {
				// Skip over if undefined or null
				for (var nextKey in nextSource) {
					// Avoid bugs when hasOwnProperty is shadowed
					if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
						to[nextKey] = nextSource[nextKey];
					}
				}
			}
		}
		return to;
	};
}

// https://tc39.github.io/ecma262/#sec-array.prototype.find
if (!Array.prototype.find) {
	Object.defineProperty(Array.prototype, 'find', {
		value: function value(predicate) {
			// 1. Let O be ? ToObject(this value).
			if (this == null) {
				throw new TypeError('"this" is null or not defined');
			}

			var o = Object(this);

			// 2. Let len be ? ToLength(? Get(O, "length")).
			var len = o.length >>> 0;

			// 3. If IsCallable(predicate) is false, throw a TypeError exception.
			if (typeof predicate !== 'function') {
				throw new TypeError('predicate must be a function');
			}

			// 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
			var thisArg = arguments[1];

			// 5. Let k be 0.
			var k = 0;

			// 6. Repeat, while k < len
			while (k < len) {
				// a. Let Pk be ! ToString(k).
				// b. Let kValue be ? Get(O, Pk).
				// c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
				// d. If testResult is true, return kValue.
				var kValue = o[k];
				if (predicate.call(thisArg, kValue, k, o)) {
					return kValue;
				}
				// e. Increase k by 1.
				k++;
			}

			// 7. Return undefined.
			return undefined;
		}
	});
}

// https://tc39.github.io/ecma262/#sec-array.prototype.includes
if (!Array.prototype.includes) {
	Object.defineProperty(Array.prototype, 'includes', {
		value: function value(searchElement, fromIndex) {

			// 1. Let O be ? ToObject(this value).
			if (this == null) {
				throw new TypeError('"this" is null or not defined');
			}

			var o = Object(this);

			// 2. Let len be ? ToLength(? Get(O, "length")).
			var len = o.length >>> 0;

			// 3. If len is 0, return false.
			if (len === 0) {
				return false;
			}

			// 4. Let n be ? ToInteger(fromIndex).
			//    (If fromIndex is undefined, this step produces the value 0.)
			var n = fromIndex | 0;

			// 5. If n ≥ 0, then
			//  a. Let k be n.
			// 6. Else n < 0,
			//  a. Let k be len + n.
			//  b. If k < 0, let k be 0.
			var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

			function sameValueZero(x, y) {
				return x === y || typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y);
			}

			// 7. Repeat, while k < len
			while (k < len) {
				// a. Let elementK be the result of ? Get(O, ! ToString(k)).
				// b. If SameValueZero(searchElement, elementK) is true, return true.
				// c. Increase k by 1.
				if (sameValueZero(o[k], searchElement)) {
					return true;
				}
				k++;
			}

			// 8. Return false
			return false;
		}
	});
}

/*
 * classList.js: Cross-browser full element.classList implementation.
 * 1.1.20170427
 *
 * By Eli Grey, http://eligrey.com
 * License: Dedicated to the public domain.
 *   See https://github.com/eligrey/classList.js/blob/master/LICENSE.md
 */

/*global self, document, DOMException */

/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js */

if ("document" in self) {

	// Full polyfill for browsers with no classList support
	// Including IE < Edge missing SVGElement.classList
	if (!("classList" in document.createElement("_")) || document.createElementNS && !("classList" in document.createElementNS("http://www.w3.org/2000/svg", "g"))) {

		(function (view) {

			"use strict";

			if (!('Element' in view)) return;

			var classListProp = "classList",
			    protoProp = "prototype",
			    elemCtrProto = view.Element[protoProp],
			    objCtr = Object,
			    strTrim = String[protoProp].trim || function () {
				return this.replace(/^\s+|\s+$/g, "");
			},
			    arrIndexOf = Array[protoProp].indexOf || function (item) {
				var i = 0,
				    len = this.length;
				for (; i < len; i++) {
					if (i in this && this[i] === item) {
						return i;
					}
				}
				return -1;
			}
			// Vendors: please allow content code to instantiate DOMExceptions
			,
			    DOMEx = function DOMEx(type, message) {
				this.name = type;
				this.code = DOMException[type];
				this.message = message;
			},
			    checkTokenAndGetIndex = function checkTokenAndGetIndex(classList, token) {
				if (token === "") {
					throw new DOMEx("SYNTAX_ERR", "An invalid or illegal string was specified");
				}
				if (/\s/.test(token)) {
					throw new DOMEx("INVALID_CHARACTER_ERR", "String contains an invalid character");
				}
				return arrIndexOf.call(classList, token);
			},
			    ClassList = function ClassList(elem) {
				var trimmedClasses = strTrim.call(elem.getAttribute("class") || ""),
				    classes = trimmedClasses ? trimmedClasses.split(/\s+/) : [],
				    i = 0,
				    len = classes.length;
				for (; i < len; i++) {
					this.push(classes[i]);
				}
				this._updateClassName = function () {
					elem.setAttribute("class", this.toString());
				};
			},
			    classListProto = ClassList[protoProp] = [],
			    classListGetter = function classListGetter() {
				return new ClassList(this);
			};
			// Most DOMException implementations don't allow calling DOMException's toString()
			// on non-DOMExceptions. Error's toString() is sufficient here.
			DOMEx[protoProp] = Error[protoProp];
			classListProto.item = function (i) {
				return this[i] || null;
			};
			classListProto.contains = function (token) {
				token += "";
				return checkTokenAndGetIndex(this, token) !== -1;
			};
			classListProto.add = function () {
				var tokens = arguments,
				    i = 0,
				    l = tokens.length,
				    token,
				    updated = false;
				do {
					token = tokens[i] + "";
					if (checkTokenAndGetIndex(this, token) === -1) {
						this.push(token);
						updated = true;
					}
				} while (++i < l);

				if (updated) {
					this._updateClassName();
				}
			};
			classListProto.remove = function () {
				var tokens = arguments,
				    i = 0,
				    l = tokens.length,
				    token,
				    updated = false,
				    index;
				do {
					token = tokens[i] + "";
					index = checkTokenAndGetIndex(this, token);
					while (index !== -1) {
						this.splice(index, 1);
						updated = true;
						index = checkTokenAndGetIndex(this, token);
					}
				} while (++i < l);

				if (updated) {
					this._updateClassName();
				}
			};
			classListProto.toggle = function (token, force) {
				token += "";

				var result = this.contains(token),
				    method = result ? force !== true && "remove" : force !== false && "add";

				if (method) {
					this[method](token);
				}

				if (force === true || force === false) {
					return force;
				} else {
					return !result;
				}
			};
			classListProto.toString = function () {
				return this.join(" ");
			};

			if (objCtr.defineProperty) {
				var classListPropDesc = {
					get: classListGetter,
					enumerable: true,
					configurable: true
				};
				try {
					objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
				} catch (ex) {
					// IE 8 doesn't support enumerable:true
					// adding undefined to fight this issue https://github.com/eligrey/classList.js/issues/36
					// modernie IE8-MSW7 machine has IE8 8.0.6001.18702 and is affected
					if (ex.number === undefined || ex.number === -0x7FF5EC54) {
						classListPropDesc.enumerable = false;
						objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
					}
				}
			} else if (objCtr[protoProp].__defineGetter__) {
				elemCtrProto.__defineGetter__(classListProp, classListGetter);
			}
		})(self);
	}

	// There is full or partial native classList support, so just check if we need
	// to normalize the add/remove and toggle APIs.

	(function () {
		"use strict";

		var testElement = document.createElement("_");

		testElement.classList.add("c1", "c2");

		// Polyfill for IE 10/11 and Firefox <26, where classList.add and
		// classList.remove exist but support only one argument at a time.
		if (!testElement.classList.contains("c2")) {
			var createMethod = function createMethod(method) {
				var original = DOMTokenList.prototype[method];

				DOMTokenList.prototype[method] = function (token) {
					var i,
					    len = arguments.length;

					for (i = 0; i < len; i++) {
						token = arguments[i];
						original.call(this, token);
					}
				};
			};
			createMethod('add');
			createMethod('remove');
		}

		testElement.classList.toggle("c3", false);

		// Polyfill for IE 10 and Firefox <24, where classList.toggle does not
		// support the second argument.
		if (testElement.classList.contains("c3")) {
			var _toggle = DOMTokenList.prototype.toggle;

			DOMTokenList.prototype.toggle = function (token, force) {
				if (1 in arguments && !this.contains(token) === !force) {
					return force;
				} else {
					return _toggle.call(this, token);
				}
			};
		}

		testElement = null;
	})();
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaults = {
  manualTriggering: false,
  showOn: ['trigger.click'],
  hideOn: ['document.click', 'popover.mouseleave'],
  onHideEvent: function onHideEvent() {},
  onShowEvent: function onShowEvent() {}
};

var Renderer = function () {
  function Renderer(options) {
    _classCallCheck(this, Renderer);

    this.options = Object.assign({}, defaults, options);

    this.onTriggerClick = this.onTriggerClick.bind(this);
    this.onDocumentClick = this.onDocumentClick.bind(this);
    this.onPopoverEnter = this.onPopoverEnter.bind(this);
    this.onPopoverLeave = this.onPopoverLeave.bind(this);
    this.onToggleEnd = this.onToggleEnd.bind(this);
    this.onTriggerLeave = this.onTriggerLeave.bind(this);

    this.initialize();
  }

  _createClass(Renderer, [{
    key: 'initialize',
    value: function initialize() {
      this.setUpGlobals();
      this.parseEvents();
      this.listenForRender();
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.destroyListeners();
    }
  }, {
    key: 'setUpGlobals',
    value: function setUpGlobals() {
      this.wasVisible = false;
      this.isVisible = false;
      this.triggerElement = this.options.triggerElement;
      this.popoverElement = this.options.popoverElement;
      this.attachmentElement = this.options.attachmentElement;
      this.showOnObjects = [];
      this.hideOnObjects = [];
    }
  }, {
    key: 'parseEvents',
    value: function parseEvents() {
      this.parseShowEvents();
      this.parseHideEvents();
    }
  }, {
    key: 'parseShowEvents',
    value: function parseShowEvents() {
      var showOn = this.options.showOn;
      if (!showOn || showOn.length === 0) {
        return;
      }

      var callback = this.onTriggerClick;

      if (typeof showOn === 'string') {
        this.showOnObjects = [this.parseEventObject(callback, showOn)];
      } else if (showOn && showOn.length > 0) {
        this.showOnObjects = showOn.map(this.parseEventObject.bind(this, callback));
      }
    }
  }, {
    key: 'parseHideEvents',
    value: function parseHideEvents() {
      var hideOn = this.options.hideOn;
      if (!hideOn || hideOn.length === 0) {
        return;
      }

      var callback = this.isTryingToHide;

      if (typeof hideOn === 'string') {
        this.hideOnObjects = [this.parseEventObject(callback, hideOn)];
      } else if (hideOn && hideOn.length > 0) {
        this.hideOnObjects = hideOn.map(this.parseEventObject.bind(this, callback));
      }
    }
  }, {
    key: 'parseEventObject',
    value: function parseEventObject(callback, eventString) {
      var object = eventString.split('.');
      var eventObject = {};

      if (!object[1]) {
        eventObject = {
          element: this.triggerElement,
          event: eventString
        };
      } else if (['body', 'document'].includes(object[0])) {
        eventObject = {
          element: document.body,
          event: object[1]
        };
      } else {
        eventObject = {
          element: this[object[0] + 'Element'],
          event: object[1]
        };
      }

      eventObject.callback = callback.bind(this, eventObject.element, eventObject.event);

      return eventObject;
    }
  }, {
    key: 'listenForRender',
    value: function listenForRender() {
      this.toggleRenderListeners(true);
    }
  }, {
    key: 'toggleRenderListeners',
    value: function toggleRenderListeners(isToggled) {
      if (this.showOnObjects.length > 0) {
        var method = isToggled ? 'addEventListener' : 'removeEventListener';
        this.showOnObjects.forEach(function (showOn) {
          showOn.element[method](showOn.event, showOn.callback);
        });
      }
    }
  }, {
    key: 'onTriggerClick',
    value: function onTriggerClick(element, event, e) {
      e.stopImmediatePropagation();

      this.toggleRenderListeners(false);
      this.onShowEvent(e);
    }
  }, {
    key: 'onShowEvent',
    value: function onShowEvent(event) {
      this.options.onShowEvent(event);

      if (this.options.manualTriggering) {
        return;
      }

      this.shouldShow();
    }
  }, {
    key: 'destroyListeners',
    value: function destroyListeners() {
      this.clearTransitionListener();
      this.toggleHideListeners(false);
      this.toggleRenderListeners(false);
    }
  }, {
    key: 'listenForHide',
    value: function listenForHide() {
      this.toggleHideListeners(true);
    }
  }, {
    key: 'toggleHideListeners',
    value: function toggleHideListeners(isToggled) {
      if (this.hideOnObjects.length > 0) {
        var method = isToggled ? 'addEventListener' : 'removeEventListener';
        this.hideOnObjects.forEach(function (hideOn) {
          hideOn.element[method](hideOn.event, hideOn.callback);
        });
      }
    }
  }, {
    key: 'isTryingToHide',
    value: function isTryingToHide(element, event, e) {
      if (element === document.body) {
        return this.onDocumentClick(e);
      }

      return this.onTriggerLeave(e);
    }
  }, {
    key: 'onTriggerLeave',
    value: function onTriggerLeave() {
      this.onHideEvent('triggerLeave');
    }
  }, {
    key: 'onDocumentClick',
    value: function onDocumentClick(e) {
      if (this.popoverElement.contains(e.target)) {
        return;
      }

      this.onHideEvent('documentClick');
    }
  }, {
    key: 'onHideEvent',
    value: function onHideEvent(hideEvent) {
      this.options.onHideEvent(hideEvent);

      if (this.options.manualTriggering) {
        return;
      }

      this.shouldHide();
    }
  }, {
    key: 'listenForToggleEnd',
    value: function listenForToggleEnd() {
      if (this.isVisible === this.wasVisible) {
        this.onToggleEnd();
        return;
      }

      this.clearTransitionListener();

      this.transitionEventData = (0, _utils.oneEvent)(this.popoverElement, (0, _utils.whichTransitionEvent)(this.popoverElement), this.onToggleEnd, function (transitionEvent) {
        return transitionEvent.propertyName === 'opacity';
      });
    }
  }, {
    key: 'clearTransitionListener',
    value: function clearTransitionListener() {
      if (!this.transitionEventData) {
        return;
      }
      this.popoverElement.removeEventListener(this.transitionEventData[0], this.transitionEventData[1]);
    }
  }, {
    key: 'clearDelayTimeouts',
    value: function clearDelayTimeouts() {
      clearTimeout(this.hideTimeout);
      clearTimeout(this.showTimeout);
    }
  }, {
    key: 'shouldShow',
    value: function shouldShow() {
      var _this = this;

      if (this.isVisible || this.isForceClosing) {
        this.toggleRenderListeners(true);
        return;
      }

      this.clearDelayTimeouts();

      if (this.options.showDelay > 0) {
        this.showTimeout = setTimeout(function () {
          _this._show();
        }, this.options.showDelay);
      } else {
        this._show();
      }
    }
  }, {
    key: '_show',
    value: function _show() {
      this.options.onBeforeShow();
      this.toggleVisibility(true);
      this.listenForHide();
    }
  }, {
    key: 'onPopoverEnter',
    value: function onPopoverEnter() {
      this.clearDelayTimeouts();
    }
  }, {
    key: 'onPopoverLeave',
    value: function onPopoverLeave() {
      this.shouldHide();
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.shouldHide();
    }
  }, {
    key: 'show',
    value: function show() {
      this.shouldShow();
    }
  }, {
    key: 'shouldHide',
    value: function shouldHide() {
      var _this2 = this;

      if (!this.isVisible) {
        return;
      }

      this.clearDelayTimeouts();

      if (this.options.hideDelay > 0) {
        this.hideTimeout = setTimeout(function () {
          _this2._hide();
        }, this.options.hideDelay);
      } else {
        this._hide();
      }
    }
  }, {
    key: 'forceHide',
    value: function forceHide() {
      this._hide();
    }
  }, {
    key: '_hide',
    value: function _hide() {
      this.options.onBeforeHide();
      this.toggleVisibility(false);
    }
  }, {
    key: 'toggleVisibility',
    value: function toggleVisibility() {
      var isVisible = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (this.isVisible === isVisible) {
        return;
      }

      this.isVisible = isVisible;

      this.listenForToggleEnd();

      var classes = ['popoverjs--is-visible'];

      if (isVisible) {
        this.toggleRendererClasses(['popoverjs--is-open'], false);
      }

      this.toggleRendererClasses(classes, isVisible);
    }
  }, {
    key: 'onToggleEnd',
    value: function onToggleEnd() {
      this.wasVisible = this.isVisible;

      if (!this.isVisible) {
        this.options.onAfterHide();
        this.options.onToggleEnd();
        this.listenForRender();

        this.toggleRendererClasses(['popoverjs--is-open'], false);
      } else {
        this.options.onAfterShow();
      }
    }
  }, {
    key: 'toggleRendererClasses',
    value: function toggleRendererClasses(clasess, isToggled) {
      (0, _utils.toggleClassesOnElement)(this.popoverElement, clasess, isToggled);
      (0, _utils.toggleClassesOnElement)(this.attachmentElement, clasess, isToggled);
    }
  }]);

  return Renderer;
}();

exports.default = Renderer;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaults = {
  dynamicWidth: false,
  maintainAttachmentWidth: false,
  attachmentElement: null,
  constraintElement: null,
  unnecessaryRepositioning: true,
  scrollPositioning: true,
  applyClassesToAttachment: false,
  constraints: [{
    popover: 'top right',
    attachment: 'bottom right'
  }, {
    popover: 'left top',
    attachment: 'right center'
  }]
};

var sizerClasses = ['popoverjs--popover-primary-bottom', 'popoverjs--popover-secondary-left', 'popoverjs--attachment-primary-top', 'popoverjs--attachment-secondary-left'];

var generateClassesForConstraint = function generateClassesForConstraint(constraint) {
  return ['popoverjs--popover-primary-' + constraint.popover.primary, 'popoverjs--popover-secondary-' + constraint.popover.secondary, 'popoverjs--attachment-primary-' + constraint.attachment.primary, 'popoverjs--attachment-secondary-' + constraint.attachment.secondary];
};

var Positioner = function () {
  function Positioner(options) {
    _classCallCheck(this, Positioner);

    this.options = Object.assign({}, defaults, options);

    this.initialize();
  }

  _createClass(Positioner, [{
    key: 'initialize',
    value: function initialize() {
      this.throttledUpdate = (0, _utils.throttle)(this.position, 2500, this);

      this.setUpGlobals();
      this.setUpElements();
      this.parseConstraints();
      this.applyDefaultConstraint();
    }
  }, {
    key: 'setUpGlobals',
    value: function setUpGlobals() {
      this.origins = {};
      this.cssCache = {};
    }
  }, {
    key: 'setUpElements',
    value: function setUpElements() {
      this.attachmentElement = this.options.attachmentElement;
      this.popoverElement = this.options.popoverElement;
      this.triggerElement = this.options.triggerElement;
      this.popoverContent = this.popoverElement.querySelector('.popoverjs-content');
      this.popoverArrow = this.popoverElement.querySelector('.popoverjs-arrow');
      this.constraintElement = this.getConstraintParent();

      this.resetClasses();
      this.cacheCssOffsets();
    }
  }, {
    key: 'setUpContainer',
    value: function setUpContainer() {
      if (!this.options.bodyAttached) {
        return;
      }

      this.createDetachedContainer();
    }
  }, {
    key: 'destroyContainer',
    value: function destroyContainer() {
      if (!this.options.bodyAttached || !this.hasAttachedContainer) {
        return;
      }

      this.hasAttachedContainer = false;
      this.originalContainer.appendChild(this.popoverElement);
      document.body.removeChild(this.containerElement);
    }
  }, {
    key: 'createDetachedContainer',
    value: function createDetachedContainer() {
      if (this.hasAttachedContainer) {
        return;
      }

      this.hasAttachedContainer = true;
      this.originalContainer = this.popoverElement.parentElement;
      this.containerElement = document.createElement('div');
      this.containerElement.classList.add('popoverjs--detached-container');
      this.containerElement.appendChild(this.popoverElement);
      document.body.appendChild(this.containerElement);
    }
  }, {
    key: 'maintainDetachedContainerPosition',
    value: function maintainDetachedContainerPosition() {
      if (!this.options.bodyAttached) {
        return;
      }

      var attachmentOrigin = this.origins.attachment;
      var bodyTopOffset = parseInt(window.getComputedStyle(document.body).marginTop, 10);
      var top = attachmentOrigin.top - bodyTopOffset;
      var origin = {
        height: attachmentOrigin.height + 'px',
        width: attachmentOrigin.width + 'px',
        left: attachmentOrigin.left + 'px',
        top: top + 'px'
      };

      Object.assign(this.containerElement.style, origin);
    }
  }, {
    key: 'cacheCssOffsets',
    value: function cacheCssOffsets() {
      this.togglePopoverClasses(sizerClasses, true);

      this.cssCache = {
        arrowSize: this.getArrowSize(),
        contentSize: this.getContentSize(),
        primaryOffset: Math.abs(this.popoverElement.offsetTop) - 1,
        secondaryOffset: Math.abs(this.popoverElement.offsetLeft),
        contentOffset: Math.abs(this.popoverContent.offsetLeft)
      };

      this.togglePopoverClasses(sizerClasses, false);
    }
  }, {
    key: 'getArrowSize',
    value: function getArrowSize() {
      if (!this.popoverArrow) {
        return 0;
      }
      return Math.abs(this.popoverArrow.clientHeight);
    }
  }, {
    key: 'getContentSize',
    value: function getContentSize() {
      this.popoverContent.style.position = 'fixed';
      var width = this.popoverContent.getBoundingClientRect().width;
      this.popoverContent.style.position = 'absolute';
      return width;
    }
  }, {
    key: 'updateContentWidth',
    value: function updateContentWidth() {
      if (this.options.dynamicWidth) {
        this.popoverContent.style.width = this.cssCache.contentSize + 'px';
      }

      if (this.options.maintainAttachmentWidth) {
        this.popoverContent.style.width = this.origins.attachment.width + 'px';
      }
    }
  }, {
    key: 'getConstraintParent',
    value: function getConstraintParent() {
      var constraintElement = this.options.constraintElement;

      if (!constraintElement) {
        return window;
      }

      return constraintElement;
    }
  }, {
    key: 'parseConstraints',
    value: function parseConstraints() {
      var id = 0;
      this.constraints = this.options.constraints.map(function (constraint) {
        var attachmentConstraint = constraint.attachment.split(' ');
        var popoverConstraint = constraint.popover.split(' ');

        id += 1;

        var parsedConstraint = {
          id: id,
          attachment: {
            primary: attachmentConstraint[0],
            secondary: attachmentConstraint[1],
            string: constraint.attachment
          },
          popover: {
            primary: popoverConstraint[0],
            secondary: popoverConstraint[1],
            string: constraint.popover
          }
        };

        parsedConstraint.classes = generateClassesForConstraint(parsedConstraint);

        return Object.assign({}, constraint, parsedConstraint);
      });
    }
  }, {
    key: 'enable',
    value: function enable() {
      this.listenForResize();
      this.listenForScroll();
      this.refreshAllElementData();
      this.setUpContainer();
      this.position();
    }
  }, {
    key: 'resetClasses',
    value: function resetClasses() {
      var className = 'popoverjs';

      if (this.options.customClass) {
        className += ' ' + this.options.customClass;
      }

      if (this.options.themeClass) {
        className += ' ' + this.options.themeClass;
      }

      this.popoverElement.className = className;
    }
  }, {
    key: 'listenForResize',
    value: function listenForResize() {
      if (!this.options.resizePositioning) {
        return;
      }
      window.addEventListener('resize', this.onResize.bind(this));
    }
  }, {
    key: 'listenForScroll',
    value: function listenForScroll() {
      if (!this.options.scrollPositioning) {
        return;
      }
      window.addEventListener('scroll', this.onScroll.bind(this));
    }
  }, {
    key: 'destroyListeners',
    value: function destroyListeners() {
      window.removeEventListener('resize', this.onResize.bind(this));
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.clearActiveConstraint();
      this.destroyListeners();
      this.destroyContainer();
    }
  }, {
    key: 'onResize',
    value: function onResize() {
      this.position();
    }
  }, {
    key: 'onScroll',
    value: function onScroll() {
      this.position();
    }
  }, {
    key: 'disable',
    value: function disable() {
      this.destroy();
    }
  }, {
    key: 'position',
    value: function position() {
      this.refreshAllElementData();
      this.maintainDetachedContainerPosition();
      this.checkConstraints();
    }
  }, {
    key: 'checkConstraints',
    value: function checkConstraints() {
      var activeConstraint = this.getActiveConstraint();

      (0, _utils.toggleClassesOnElement)(this.popoverElement, ['popoverjs--is-constrained'], !activeConstraint);

      if (activeConstraint) {
        this.applyConstraint(activeConstraint);
      }
    }
  }, {
    key: 'getActiveConstraint',
    value: function getActiveConstraint() {
      var _this = this;

      if (!this.options.unnecessaryRepositioning && this.canFitInto(this.activeConstraint)) {
        return this.activeConstraint;
      }

      return this.constraints.find(function (constraint) {
        if (_this.canFitInto(constraint)) {
          return constraint;
        }
        return false;
      });
    }
  }, {
    key: 'refreshAllElementData',
    value: function refreshAllElementData() {
      this.refreshParentOrigin();
      this.refreshElementOrigins();
      this.updateContentWidth();
    }
  }, {
    key: 'refreshParentOrigin',
    value: function refreshParentOrigin() {
      if (this.constraintElement === window) {
        this.origins.parent = (0, _utils.getWindowOrigin)();
        return;
      }

      this.origins.parent = (0, _utils.getElementOrigin)(this.constraintElement);
    }
  }, {
    key: 'refreshElementOrigins',
    value: function refreshElementOrigins() {
      this.origins.popover = (0, _utils.getElementOrigin)(this.popoverContent);
      this.origins.attachment = (0, _utils.getElementOrigin)(this.attachmentElement);
      this.origins.body = (0, _utils.getElementOrigin)(document.body);
    }
  }, {
    key: 'canFitInto',
    value: function canFitInto(constraint) {
      if (!constraint) {
        return false;
      }

      var isOutsideConstraint = this.isConstrainedByPrimary(constraint.attachment.primary);

      if (!isOutsideConstraint) {
        switch (constraint.attachment.primary) {
          case 'top':
          case 'bottom':
            isOutsideConstraint = this.isConstrainedBySecondary(constraint, 'left') || this.isConstrainedBySecondary(constraint, 'right');
            break;
          default:
            isOutsideConstraint = this.isConstrainedBySecondary(constraint, 'bottom') || this.isConstrainedBySecondary(constraint, 'top');
        }
      }

      return !isOutsideConstraint;
    }
  }, {
    key: 'isConstrainedByPrimary',
    value: function isConstrainedByPrimary(side) {
      var originCoordinate = this.origins.attachment[side] + this.cssCache.primaryOffset;
      var popoverSize = this.getPopoverSizeFromSideCheck(side);

      if (side === 'left' || side === 'top') {
        return originCoordinate - popoverSize <= this.origins.parent[side];
      }

      return originCoordinate + popoverSize >= this.origins.parent[side];
    }
  }, {
    key: 'isConstrainedBySecondary',
    value: function isConstrainedBySecondary(constraint, sideToCheck) {
      var parentCoord = this.origins.parent[sideToCheck];
      var originCoordinate = this.getOriginPointForConstraint(constraint);
      var popoverSize = this.getPopoverSizeOnConstraintSide(constraint, sideToCheck);

      switch (sideToCheck) {
        case 'top':
        case 'left':
          return originCoordinate - popoverSize <= parentCoord;
        default:
          return originCoordinate + popoverSize >= parentCoord;
      }
    }
  }, {
    key: 'getAttachementOffsetForConstraint',
    value: function getAttachementOffsetForConstraint(constraint) {
      switch (constraint.popover.secondary) {
        case 'middle':
        case 'center':
          return 0;
        default:
          return this.cssCache.primaryOffset;
      }
    }
  }, {
    key: 'getPopoverSizeOnConstraintSide',
    value: function getPopoverSizeOnConstraintSide(constraint, sideToCheck) {
      if (['center', 'middle'].includes(constraint.popover.secondary)) {
        switch (sideToCheck) {
          case 'right':
          case 'left':
            return this.origins.popover.halfWidth;
          default:
            return this.origins.popover.halfHeight;
        }
      }

      switch (constraint.popover.secondary) {
        case 'right':
        case 'left':
          if (sideToCheck === constraint.popover.secondary) {
            return this.cssCache.contentOffset;
          }
          return this.origins.popover.width - this.cssCache.contentOffset;
        default:
          if (sideToCheck === constraint.popover.secondary) {
            return this.cssCache.contentOffset;
          }
          return this.origins.popover.height - this.cssCache.contentOffset;
      }
    }
  }, {
    key: 'getOriginPointForConstraint',
    value: function getOriginPointForConstraint(constraint) {
      if (['center', 'middle'].includes(constraint.attachment.secondary)) {
        switch (constraint.attachment.primary) {
          case 'top':
          case 'bottom':
            return this.origins.attachment.left + this.origins.attachment.halfWidth;
          default:
            return this.origins.attachment.top + this.origins.attachment.halfHeight;
        }
      }

      switch (constraint.attachment.secondary) {
        default:
        case 'left':
          return this.origins.attachment.left + this.cssCache.secondaryOffset;
        case 'right':
          return this.origins.attachment.right - this.cssCache.secondaryOffset;
        case 'top':
          return this.origins.attachment.top + this.cssCache.secondaryOffset;
        case 'bottom':
          return this.origins.attachment.bottom - this.cssCache.secondaryOffset;
      }
    }
  }, {
    key: 'getPopoverSizeFromSideCheck',
    value: function getPopoverSizeFromSideCheck(side) {
      var size = this.cssCache.arrowSize;

      if (side === 'top' || side === 'bottom') {
        return this.origins.popover.height + size;
      }

      return this.origins.popover.width + size;
    }
  }, {
    key: 'applyDefaultConstraint',
    value: function applyDefaultConstraint() {
      var defaultConstraint = this.constraints[0];
      this.applyConstraint(defaultConstraint);
    }
  }, {
    key: 'applyConstraint',
    value: function applyConstraint(constraintObject) {
      if (this.activeConstraintIs(constraintObject)) {
        return;
      }

      this.clearActiveConstraint();
      this.activeConstraint = constraintObject;
      this.toggleActiveConstraints(true);
    }
  }, {
    key: 'toggleActiveConstraints',
    value: function toggleActiveConstraints(isToggled) {
      var constraintClasses = this.activeConstraint.classes;

      this.togglePopoverClasses(constraintClasses, isToggled);

      if (this.options.applyClassesToAttachment) {
        (0, _utils.toggleClassesOnElement)(this.attachmentElement, constraintClasses, isToggled);
      }
    }
  }, {
    key: 'activeConstraintIs',
    value: function activeConstraintIs(constraintObject) {
      if (!this.activeConstraint || !constraintObject) {
        return false;
      }
      return this.activeConstraint.id === constraintObject.id;
    }
  }, {
    key: 'clearActiveConstraint',
    value: function clearActiveConstraint() {
      if (!this.activeConstraint) {
        return;
      }

      this.toggleActiveConstraints(false);
      this.activeConstraint = null;
    }
  }, {
    key: 'togglePopoverClasses',
    value: function togglePopoverClasses(classes, isToggled) {
      (0, _utils.toggleClassesOnElement)(this.popoverElement, classes, isToggled);
    }
  }]);

  return Positioner;
}();

exports.default = Positioner;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(6);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(8)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./_main.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./_main.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)(undefined);
// imports


// module
exports.push([module.i, "/**\n  * Local Variables\n  *\n  * $arrow_hypotenuse_to_side_ratio:\n  * The $arrow_hypotenuse_to_side_ratio is important and should not be changed.\n  * In order to get an arrow, we are currently hacking it to be a square rotated\n  * at a 45 degree angle, and cut off via parent container overflow. Because we\n  * can only control the height/width of a box, setting the size of the arrow\n  * becomes difficult when it is rotated (Because the diagnol hypotenuse within\n  * a box is longer than its sides). To fix this, we can instead take the size\n  * which would be the hypotenuse and convert that to be the correct side\n  * length for the box. Since we are dealing with equal length sides, the .707\n  * will be consistent enough for that conversion.\n  */\n.popoverjs {\n  height: 1px;\n  pointer-events: all;\n  position: absolute;\n  visibility: hidden;\n  width: 1px; }\n  .popoverjs.popoverjs--is-visible {\n    visibility: visible; }\n  .popoverjs-arrow:after {\n    background-color: #ffffff; }\n  .popoverjs-content {\n    background-color: white;\n    box-sizing: border-box;\n    position: absolute; }\n  .popoverjs--detached-container {\n    position: absolute;\n    pointer-events: none; }\n  .popoverjs--wrapper {\n    display: inline-block;\n    position: relative; }\n\n.popoverjs--default > .popoverjs-arrow {\n  overflow: hidden;\n  position: absolute;\n  z-index: 5; }\n\n.popoverjs--default > .popoverjs-arrow:after {\n  content: \"\";\n  position: absolute;\n  width: 11.312px;\n  height: 11.312px;\n  transform: translateX(-50%) translateY(-50%) rotate(45deg);\n  top: 50%;\n  left: 50%; }\n\n.popoverjs--default.popoverjs--popover-primary-bottom > .popoverjs-arrow,\n.popoverjs--default.popoverjs--popover-primary-top > .popoverjs-arrow {\n  left: -8px;\n  height: 8px;\n  width: 16px; }\n\n.popoverjs--default.popoverjs--popover-primary-bottom > .popoverjs-arrow {\n  bottom: auto;\n  top: -8px; }\n  .popoverjs--default.popoverjs--popover-primary-bottom > .popoverjs-arrow:after {\n    margin-top: -4px; }\n\n.popoverjs--default.popoverjs--popover-primary-top > .popoverjs-arrow {\n  bottom: -8px;\n  top: auto; }\n  .popoverjs--default.popoverjs--popover-primary-top > .popoverjs-arrow:after {\n    margin-top: 4px; }\n\n.popoverjs--default.popoverjs--popover-primary-left > .popoverjs-arrow,\n.popoverjs--default.popoverjs--popover-primary-right > .popoverjs-arrow {\n  bottom: -8px;\n  height: 16px;\n  width: 8px; }\n\n.popoverjs--default.popoverjs--popover-primary-right > .popoverjs-arrow {\n  left: -8px;\n  right: auto; }\n  .popoverjs--default.popoverjs--popover-primary-right > .popoverjs-arrow:after {\n    margin-left: -4px; }\n\n.popoverjs--default.popoverjs--popover-primary-left > .popoverjs-arrow {\n  left: auto;\n  right: -8px; }\n  .popoverjs--default.popoverjs--popover-primary-left > .popoverjs-arrow:after {\n    margin-left: 4px; }\n\n.popoverjs--default.popoverjs--attachment-primary-bottom {\n  bottom: -1px; }\n\n.popoverjs--default.popoverjs--attachment-primary-top {\n  top: -1px; }\n\n.popoverjs--default.popoverjs--attachment-primary-right {\n  right: -1px; }\n\n.popoverjs--default.popoverjs--attachment-primary-left {\n  left: -1px; }\n\n.popoverjs--default.popoverjs--attachment-secondary-bottom {\n  bottom: 16px; }\n\n.popoverjs--default.popoverjs--attachment-secondary-top {\n  top: 16px; }\n\n.popoverjs--default.popoverjs--attachment-secondary-right {\n  right: 16px; }\n\n.popoverjs--default.popoverjs--attachment-secondary-left {\n  left: 16px; }\n\n.popoverjs--default.popoverjs--attachment-primary-top.popoverjs--attachment-secondary-middle, .popoverjs--default.popoverjs--attachment-primary-bottom.popoverjs--attachment-secondary-middle, .popoverjs--default.popoverjs--attachment-primary-top.popoverjs--attachment-secondary-center, .popoverjs--default.popoverjs--attachment-primary-bottom.popoverjs--attachment-secondary-center {\n  left: 50%; }\n\n.popoverjs--default.popoverjs--attachment-primary-left.popoverjs--attachment-secondary-middle, .popoverjs--default.popoverjs--attachment-primary-right.popoverjs--attachment-secondary-middle, .popoverjs--default.popoverjs--attachment-primary-left.popoverjs--attachment-secondary-center, .popoverjs--default.popoverjs--attachment-primary-right.popoverjs--attachment-secondary-center {\n  top: 50%; }\n\n.popoverjs--default.popoverjs--popover-primary-bottom > .popoverjs-content {\n  bottom: 9px; }\n\n.popoverjs--default.popoverjs--popover-primary-top > .popoverjs-content {\n  top: 9px; }\n\n.popoverjs--default.popoverjs--popover-primary-right > .popoverjs-content {\n  right: 9px; }\n\n.popoverjs--default.popoverjs--popover-primary-left > .popoverjs-content {\n  left: 9px; }\n\n.popoverjs--default.popoverjs--popover-secondary-bottom > .popoverjs-content {\n  margin-top: 18px;\n  transform: translateY(-100%); }\n\n.popoverjs--default.popoverjs--popover-secondary-top > .popoverjs-content {\n  margin-top: -18px;\n  transform: translateY(0%); }\n\n.popoverjs--default.popoverjs--popover-secondary-right > .popoverjs-content {\n  right: -18px; }\n\n.popoverjs--default.popoverjs--popover-secondary-left > .popoverjs-content {\n  left: -18px; }\n\n.popoverjs--default.popoverjs--popover-primary-bottom.popoverjs--popover-secondary-middle > .popoverjs-content,\n.popoverjs--default.popoverjs--popover-primary-top.popoverjs--popover-secondary-middle > .popoverjs-content,\n.popoverjs--default.popoverjs--popover-primary-bottom.popoverjs--popover-secondary-center > .popoverjs-content,\n.popoverjs--default.popoverjs--popover-primary-top.popoverjs--popover-secondary-center > .popoverjs-content {\n  left: 0;\n  transform: translateX(-50%); }\n\n.popoverjs--default.popoverjs--popover-primary-left.popoverjs--popover-secondary-middle > .popoverjs-content,\n.popoverjs--default.popoverjs--popover-primary-right.popoverjs--popover-secondary-middle > .popoverjs-content,\n.popoverjs--default.popoverjs--popover-primary-left.popoverjs--popover-secondary-center > .popoverjs-content,\n.popoverjs--default.popoverjs--popover-primary-right.popoverjs--popover-secondary-center > .popoverjs-content {\n  top: 0;\n  transform: translateY(-50%); }\n", ""]);

// exports


/***/ }),
/* 7 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
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
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(9);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 9 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
/******/ ]);
});