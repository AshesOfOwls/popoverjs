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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return oneEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return addClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return removeClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getElementOrigin; });
/* unused harmony export setHalfPointsOnOrigin */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getWindowOrigin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return whichTransitionEvent; });
const oneEvent = (target, eventType, callback) => {
  const wrappedCallback = (eventObject) => {
    target.removeEventListener(eventType, wrappedCallback);
    return callback(eventObject);
  };

  target.addEventListener(eventType, wrappedCallback);
};

const addClass = (element, className) => {
  element.classList.add(className);
};

const removeClass = (element, className) => {
  element.classList.remove(className);
};

const setHalfPointsOnOrigin = (origin) => {
  const halfHeight = origin.height / 2;
  const halfWidth = origin.width / 2;

  return Object.assign(origin, {
    halfHeight,
    halfWidth,
    verticalCenter: origin.top + halfHeight,
    horizontalCenter: origin.left + halfWidth,
  });
};

const getWindowOrigin = () => {
  const height = window.innerHeight;
  const width = window.innerWidth;

  const origin = {
    bottom: height,
    height,
    left: 0,
    right: width,
    top: 0,
    width,
  };

  return setHalfPointsOnOrigin(origin);
};

const getElementOrigin = (element) => {
  const clientRect = element.getBoundingClientRect();

  const origin = {
    left: clientRect.left,
    right: clientRect.right,
    bottom: clientRect.bottom,
    top: clientRect.top,
    height: clientRect.height,
    width: clientRect.width,
  };

  return setHalfPointsOnOrigin(origin);
};

const whichTransitionEvent = (element) => {
  const transitions = {
    transition: 'transitionend',
    OTransition: 'oTransitionEnd',
    MozTransition: 'transitionend',
    WebkitTransition: 'webkitTransitionEnd',
  };

  const elementStyle = element.style;

  const rendererType = Object.keys(transitions).find(type => elementStyle[type] !== undefined);

  return transitions[rendererType];
};




/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__renderer__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__positioner__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__styles_main_scss__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__styles_main_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__styles_main_scss__);





const defaults = {
  showOn: 'click',
  hideOn: 'documentClick',
  onBeforeHide: () => {},
  onBeforeShow: () => {},
  onAfterHide: () => {},
  onAfterShow: () => {},
};

class Popoverjs {
  constructor(options) {
    this.options = Object.assign(defaults, options);

    this.initialize();
  }

  initialize() {
    this.setUpPositioner();
    this.setUpRenderer();
  }

  position() {
    this.Positioner.position();
  }

  get rendererOptions() {
    return Object.assign({}, this.options, {
      onToggleEnd: this.onToggleEnd.bind(this),
    });
  }

  onToggleEnd() {
    this.Positioner.disable();
  }

  setUpRenderer() {
    this.renderer = new __WEBPACK_IMPORTED_MODULE_0__renderer__["a" /* default */](this.rendererOptions);
  }

  setUpPositioner() {
    this.Positioner = new __WEBPACK_IMPORTED_MODULE_1__positioner__["a" /* default */](this.positionerOptions);

    this.Positioner.enable();
  }

  get positionerOptions() {
    return Object.assign({}, {
      attachmentElement: this.attachmentElement,
      constraintElement: this.constraintElement,
      popoverElement: this.popoverElement,
      triggerElement: this.triggerElement,
    }, this.options);
  }
}

window.Popoverjs = Popoverjs;

/* harmony default export */ __webpack_exports__["default"] = (Popoverjs);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);


const defaults = {
  attachmentElement: null,
  constraintElement: null,
  constraints: [{
    popover: 'top left',
    trigger: 'bottom right',
  }, {
    popover: 'left top',
    trigger: 'right top',
  }],
};

class Positioner {
  constructor(options) {
    this.options = Object.assign(defaults, options);

    this.initialize();
  }

  initialize() {
    this.setUpGlobals();
    this.setUpElements();
    this.parseConstraints();
    this.applyDefaultConstraint();
  }

  setUpGlobals() {
    this.origins = {};
    this.cssCache = {};
  }

  setUpElements() {
    this.attachmentElement = this.options.attachmentElement;
    this.popoverElement = this.options.popoverElement;
    this.triggerElement = this.options.triggerElement;
    this.popoverContent = this.popoverElement.querySelector('.popoverjs-content');
    this.popoverArrow = this.popoverElement.querySelector('.popoverjs-arrow');
    this.constraintElement = this.getConstraintParent();

    this.cacheCssOffsets();
  }

  setUpContainer() {
    if (!this.options.bodyAttached) { return; }

    this.createDetachedContainer();
  }

  destroyContainer() {
    if (!this.options.bodyAttached || !this.hasAttachedContainer) { return; }

    this.hasAttachedContainer = false;
    this.originalContainer.appendChild(this.popoverElement);
    document.body.removeChild(this.containerElement);
  }

  createDetachedContainer() {
    if (this.hasAttachedContainer) { return; }

    this.hasAttachedContainer = true;
    this.originalContainer = this.popoverElement.parentElement;
    this.containerElement = document.createElement('div');
    this.containerElement.classList.add('popoverjs--detatched-container');
    this.containerElement.appendChild(this.popoverElement);
    document.body.appendChild(this.containerElement);
  }

  maintainDetachedContainerPosition() {
    if (!this.options.bodyAttached) { return; }

    const attachmentOrigin = this.origins.attachment;

    const origin = {
      height: `${attachmentOrigin.height}px`,
      width: `${attachmentOrigin.width}px`,
      left: `${attachmentOrigin.left}px`,
      top: `${attachmentOrigin.top}px`,
    };

    Object.assign(this.containerElement.style, origin);
  }

  cacheCssOffsets() {
    const sizerClasses = [
      'popoverjs--popover-primary-top',
      'popoverjs--popover-secondary-left',
      'popoverjs--trigger-primary-left',
      'popoverjs--trigger-secondary-top',
    ];

    this.togglePopoverClasses(sizerClasses, true);

    this.cssCache = {
      arrowSize: this.getArrowSize(),
      attachmentOffset: Math.abs(this.popoverElement.offsetTop),
      triggerOffset: Math.abs(this.popoverElement.offsetLeft),
      contentOffset: Math.abs(this.popoverContent.offsetLeft),
    };

    this.togglePopoverClasses(sizerClasses, false);
  }

  getArrowSize() {
    if (!this.popoverArrow) { return 0; }
    return Math.abs(this.popoverArrow.clientHeight);
  }

  getConstraintParent() {
    const constraintElement = this.options.constraintElement;

    if (!constraintElement) {
      return window;
    }

    return constraintElement;
  }

  parseConstraints() {
    let id = 0;
    this.constraints = this.options.constraints.map((constraint) => {
      const triggerConstraint = constraint.trigger.split(' ');
      const popoverConstraint = constraint.popover.split(' ');

      id += 1;

      return Object.assign({}, constraint, {
        id,
        trigger: {
          primary: triggerConstraint[0],
          secondary: triggerConstraint[1],
          string: constraint.trigger,
        },
        popover: {
          primary: popoverConstraint[0],
          secondary: popoverConstraint[1],
          string: constraint.popover,
        },
      });
    });
  }

  enable() {
    this.listenForResize();
    this.refreshAllElementData();
    this.setUpContainer();
    this.position();
  }

  listenForResize() {
    window.addEventListener('resize', this.onResize.bind(this));
  }

  destroyListeners() {
    window.removeEventListener('resize', this.onResize.bind(this));
  }

  destroy() {
    this.destroyListeners();
    this.destroyContainer();
  }

  onResize() {
    this.position();
  }

  disable() {
    this.destroy();
  }

  position() {
    this.refreshAllElementData();
    this.maintainDetachedContainerPosition();
    this.checkConstraints();
  }

  checkConstraints() {
    this.applyConstraint(this.getActiveConstraint());
  }

  getActiveConstraint() {
    const activeConstraint = this.constraints.find((constraint) => {
      if (this.canFitInto(constraint)) { return constraint; }
      return false;
    });

    if (!activeConstraint) { return this.activeConstraint; }

    return activeConstraint;
  }

  refreshAllElementData() {
    this.refreshParentOrigin();
    this.refreshElementOrigins();
  }

  refreshParentOrigin() {
    if (this.constraintElement === window) {
      this.origins.parent = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["c" /* getWindowOrigin */])();
      return;
    }

    this.origins.parent = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* getElementOrigin */])(this.constraintElement);
  }

  refreshElementOrigins() {
    this.origins.popover = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* getElementOrigin */])(this.popoverContent);
    this.origins.attachment = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* getElementOrigin */])(this.attachmentElement);
  }

  canFitInto(constraint) {
    if (!constraint) { return false; }

    let isOutsideConstraint = this.isConstrainedByPrimary(constraint.trigger.primary);

    if (!isOutsideConstraint) {
      switch (constraint.trigger.primary) {
      case 'top':
      case 'bottom':
        isOutsideConstraint = this.isConstrainedBySecondary(constraint, 'left') ||
          this.isConstrainedBySecondary(constraint, 'right');
        break;
      default:
        isOutsideConstraint = this.isConstrainedBySecondary(constraint, 'bottom') ||
          this.isConstrainedBySecondary(constraint, 'top');
      }
    }

    return !isOutsideConstraint;
  }

  isConstrainedByPrimary(side) {
    const originCoordinate = this.origins.attachment[side];
    const popoverSize = this.getPopoverSizeFromSideCheck(side);

    if (side === 'left' || side === 'top') {
      return originCoordinate - popoverSize <= this.origins.parent[side];
    }

    return originCoordinate + popoverSize >= this.origins.parent[side];
  }

  isConstrainedBySecondary(constraint, sideToCheck) {
    const parentCoord = this.origins.parent[sideToCheck];
    const originCoordinate = this.getOriginPointForConstraint(constraint);
    const popoverSize = this.getPopoverSizeOnConstraintSide(constraint, sideToCheck);

    switch (sideToCheck) {
    case 'top':
    case 'left':
      return originCoordinate - popoverSize <= parentCoord;
    default:
      return originCoordinate + popoverSize >= parentCoord;
    }
  }

  getAttachementOffsetForConstraint(constraint) {
    switch (constraint.popover.secondary) {
    case 'center':
      return 0;
    default:
      return this.cssCache.attachmentOffset;
    }
  }

  getPopoverSizeOnConstraintSide(constraint, sideToCheck) {
    if (constraint.popover.secondary === 'center') {
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

  getOriginPointForConstraint(constraint) {
    if (constraint.trigger.secondary === 'center') {
      switch (constraint.trigger.primary) {
      case 'top':
      case 'bottom':
        return this.origins.attachment.left + this.origins.attachment.halfWidth;
      default:
        return this.origins.attachment.top + this.origins.attachment.halfHeight;
      }
    }

    const attachmentOffset = this.getAttachementOffsetForConstraint(constraint);

    switch (constraint.trigger.secondary) {
    default:
    case 'left':
      return this.origins.attachment.left + this.cssCache.triggerOffset + attachmentOffset;
    case 'right':
      return this.origins.attachment.right - this.cssCache.triggerOffset - attachmentOffset;
    case 'top':
      return this.origins.attachment.top + this.cssCache.triggerOffset + attachmentOffset;
    case 'bottom':
      return this.origins.attachment.bottom - this.cssCache.triggerOffset - attachmentOffset;
    }
  }

  getPopoverSizeFromSideCheck(side) {
    const size = this.cssCache.arrowSize;

    if (side === 'top' || side === 'bottom') {
      return this.origins.popover.height + size;
    }

    return this.origins.popover.width + size;
  }

  applyDefaultConstraint() {
    const defaultConstraint = this.constraints[0];
    this.applyConstraint(defaultConstraint);
  }

  applyConstraint(constraintObject) {
    if (this.activeConstraintIs(constraintObject)) { return; }

    this.clearActiveConstraint();
    this.activeConstraint = constraintObject;
    this.toggleActiveConstraints(true);
  }

  toggleActiveConstraints(isToggled) {
    this.togglePopoverClasses(this.getActiveConstraintClasses(), isToggled);
  }

  activeConstraintIs(constraintObject) {
    if (!this.activeConstraint) { return false; }
    return this.activeConstraint.id === constraintObject.id;
  }

  clearActiveConstraint() {
    if (!this.activeConstraint) { return; }

    this.toggleActiveConstraints(false);
    this.activeConstraint = null;
  }

  togglePopoverClasses(classes, isToggled) {
    const popover = this.popoverElement;
    const method = isToggled ? __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* addClass */] : __WEBPACK_IMPORTED_MODULE_0__utils__["e" /* removeClass */];

    classes.forEach((className) => {
      method(popover, className);
    });
  }

  getActiveConstraintClasses() {
    if (!this.activeConstraint) { return []; }

    const popoverAnchors = this.activeConstraint.popover;
    const triggerAnchors = this.activeConstraint.trigger;

    return [
      `popoverjs--popover-primary-${popoverAnchors.primary}`,
      `popoverjs--popover-secondary-${popoverAnchors.secondary}`,
      `popoverjs--trigger-primary-${triggerAnchors.primary}`,
      `popoverjs--trigger-secondary-${triggerAnchors.secondary}`,
    ];
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Positioner);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(4);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(6)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./main.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./main.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)(undefined);
// imports


// module
exports.push([module.i, "/**\n  * Local Variables\n  *\n  * $arrow_hypotenuse_to_side_ratio:\n  * The $arrow_hypotenuse_to_side_ratio is important and should not be changed.\n  * In order to get an arrow, we are currently hacking it to be a square rotated\n  * at a 45 degree angle, and cut off via parent container overflow. Because we\n  * can only control the height/width of a box, setting the size of the arrow\n  * becomes difficult when it is rotated (Because the diagnol hypotenuse within\n  * a box is longer than its sides). To fix this, we can instead take the size\n  * which would be the hypotenuse and convert that to be the correct side\n  * length for the box. Since we are dealing with equal length sides, the .707\n  * will be consistent enough for that conversion.\n  */\n.popoverjs-arrow {\n  overflow: hidden;\n  position: absolute;\n  z-index: 5; }\n  .popoverjs-arrow:after {\n    content: \"\";\n    position: absolute;\n    width: 11.312px;\n    height: 11.312px;\n    background: white;\n    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.15);\n    transform: translateX(-50%) translateY(-50%) rotate(45deg);\n    top: 50%;\n    left: 50%; }\n\n.popoverjs--popover-primary-bottom > .popoverjs-arrow,\n.popoverjs--popover-primary-top > .popoverjs-arrow {\n  left: -8px;\n  height: 8px;\n  width: 16px; }\n\n.popoverjs--popover-primary-bottom > .popoverjs-arrow {\n  top: -8px; }\n  .popoverjs--popover-primary-bottom > .popoverjs-arrow:after {\n    margin-top: -4px; }\n\n.popoverjs--popover-primary-top > .popoverjs-arrow {\n  bottom: -8px; }\n  .popoverjs--popover-primary-top > .popoverjs-arrow:after {\n    margin-top: 4px; }\n\n.popoverjs--popover-primary-left > .popoverjs-arrow,\n.popoverjs--popover-primary-right > .popoverjs-arrow {\n  bottom: -8px;\n  height: 16px;\n  width: 8px; }\n\n.popoverjs--popover-primary-right > .popoverjs-arrow {\n  left: -8px; }\n  .popoverjs--popover-primary-right > .popoverjs-arrow:after {\n    margin-left: -4px; }\n\n.popoverjs--popover-primary-left > .popoverjs-arrow {\n  right: -8px; }\n  .popoverjs--popover-primary-left > .popoverjs-arrow:after {\n    margin-left: 4px; }\n\n.popoverjs--trigger-primary-bottom {\n  bottom: -1px; }\n\n.popoverjs--trigger-primary-top {\n  top: -1px; }\n\n.popoverjs--trigger-primary-right {\n  right: -1px; }\n\n.popoverjs--trigger-primary-left {\n  left: -1px; }\n\n.popoverjs--trigger-secondary-bottom {\n  bottom: 30px; }\n\n.popoverjs--trigger-secondary-top {\n  top: 30px; }\n\n.popoverjs--trigger-secondary-right {\n  right: 30px; }\n\n.popoverjs--trigger-secondary-left {\n  left: 30px; }\n\n.popoverjs--trigger-primary-top.popoverjs--trigger-secondary-center, .popoverjs--trigger-primary-bottom.popoverjs--trigger-secondary-center {\n  left: 50%; }\n\n.popoverjs--trigger-primary-left.popoverjs--trigger-secondary-center, .popoverjs--trigger-primary-right.popoverjs--trigger-secondary-center {\n  top: 50%; }\n\n.popoverjs--popover-primary-bottom > .popoverjs-content {\n  bottom: 9px; }\n\n.popoverjs--popover-primary-top > .popoverjs-content {\n  top: 9px; }\n\n.popoverjs--popover-primary-right > .popoverjs-content {\n  right: 9px; }\n\n.popoverjs--popover-primary-left > .popoverjs-content {\n  left: 9px; }\n\n.popoverjs--popover-secondary-bottom > .popoverjs-content {\n  margin-top: 25px;\n  transform: translateY(-100%); }\n\n.popoverjs--popover-secondary-top > .popoverjs-content {\n  margin-top: -25px;\n  transform: translateY(0%); }\n\n.popoverjs--popover-secondary-right > .popoverjs-content {\n  right: -25px; }\n\n.popoverjs--popover-secondary-left > .popoverjs-content {\n  left: -25px; }\n\n.popoverjs--popover-primary-bottom.popoverjs--popover-secondary-center > .popoverjs-content,\n.popoverjs--popover-primary-top.popoverjs--popover-secondary-center > .popoverjs-content {\n  left: 0;\n  transform: translateX(-50%); }\n\n.popoverjs--popover-primary-left.popoverjs--popover-secondary-center > .popoverjs-content,\n.popoverjs--popover-primary-right.popoverjs--popover-secondary-center > .popoverjs-content {\n  top: 0;\n  transform: translateY(-50%); }\n\n.popoverjs {\n  height: 1px;\n  opacity: 0;\n  pointer-events: all;\n  position: absolute;\n  transition: visibility 0.275s, opacity 0.275s linear;\n  visibility: hidden;\n  width: 1px;\n  z-index: 15; }\n  .popoverjs.is-visible {\n    opacity: 1;\n    visibility: visible; }\n  .popoverjs.is-transitionable {\n    transition: visibility 0.275s, height 0.2s, width 0.2s, opacity 0.275s; }\n  .popoverjs-content {\n    background: white;\n    border-radius: 3px;\n    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.15);\n    box-sizing: border-box;\n    position: absolute; }\n  .popoverjs--detatched-container {\n    position: absolute;\n    pointer-events: none; }\n", ""]);

// exports


/***/ }),
/* 5 */
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
/* 6 */
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

var	fixUrls = __webpack_require__(7);

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
/* 7 */
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


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__styles_main_scss__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__styles_main_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__styles_main_scss__);




const defaults = {
  showOn: 'click',
  hideOn: 'documentClick',
};

class Renderer {
  constructor(options) {
    this.options = Object.assign(defaults, options);

    this.render = this.render.bind(this);
    this.onDocumentClick = this.onDocumentClick.bind(this);

    this.initialize();
  }

  initialize() {
    this.setUpGlobals();
    this.listenForRender();
  }

  setUpGlobals() {
    this.isVisible = false;
    this.triggerElement = this.options.triggerElement;
    this.popoverElement = this.options.popoverElement;
  }

  listenForRender() {
    Object(__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* oneEvent */])(this.triggerElement, this.options.showOn, this.render);
  }

  render(e) {
    e.stopImmediatePropagation();

    this.show();
    this.listenForHide();
  }

  destroyListeners() {
    this.triggerElement.removeEventListener(this.options.showOn, this.render);

    if (this.options.hideOn === 'documentClick') {
      document.body.removeEventListener('click', this.onDocumentClick);
    }
  }

  listenForHide() {
    switch (this.options.hideOn) {
    case 'documentClick':
      document.body.addEventListener('click', this.onDocumentClick);
      break;
    default:
      this.triggerElement.addEventListener(this.options.hideOn, this.onDocumentClick);
    }
  }

  onDocumentClick(e) {
    if (this.popoverElement.contains(e.target)) { return; }
    document.body.removeEventListener('click', this.onDocumentClick);
    this.hide();
  }

  listenForToggleEnd() {
    Object(__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* oneEvent */])(this.popoverElement,
      Object(__WEBPACK_IMPORTED_MODULE_0__utils__["f" /* whichTransitionEvent */])(this.popoverElement),
      this.onToggleEnd.bind(this),
      transitionEvent => (transitionEvent.propertyName === 'opacity'),
    );
  }

  show() {
    this.options.onBeforeShow();
    this.toggleVisibility(true);
  }

  hide() {
    this.options.onBeforeHide();
    this.toggleVisibility(false);
  }

  toggleVisibility(isVisible = false) {
    if (this.isVisible === isVisible) { return; }

    this.isVisible = isVisible;

    this.listenForToggleEnd();

    if (isVisible) {
      Object(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* addClass */])(this.popoverElement, 'is-visible');
    } else {
      Object(__WEBPACK_IMPORTED_MODULE_0__utils__["e" /* removeClass */])(this.popoverElement, 'is-visible');
    }
  }

  onToggleEnd() {
    if (!this.isVisible) {
      this.options.onAfterHide();
      this.options.onToggleEnd();
      this.listenForRender();
    } else {
      this.options.onAfterShow();
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Renderer);


/***/ })
/******/ ]);
});