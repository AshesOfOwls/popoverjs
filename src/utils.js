const oneEvent = (target, eventType, callback) => {
  const wrappedCallback = (eventObject) => {
    target.removeEventListener(eventType, wrappedCallback);
    return callback(eventObject);
  };

  target.addEventListener(eventType, wrappedCallback);

  return [eventType, wrappedCallback];
};

const addClass = (element, className) => {
  element.classList.add(className);
};

const removeClass = (element, className) => {
  element.classList.remove(className);
};

const toggleClassesOnElement = (element, classes, isToggled) => {
  const method = isToggled ? addClass : removeClass;

  classes.forEach((className) => {
    method(element, className);
  });
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

const getWindow = () => {
  if (typeof window) {
    return window;
  }

  return {
    innerHeight: 0,
    innerWidth: 0,
    addEventListener: () => {},
    removeEventListener: () => {},
  };
};

const getWindowOrigin = () => {
  const height = getWindow().innerHeight;
  const width = getWindow().innerWidth;

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

const throttle = (fn, threshhold, scope) => {
  let time = threshhold;
  if (!time) { time = 250; }

  let last = null;
  let deferTimer = null;
  return () => {
    const context = scope || this;

    const now = +new Date();
    const args = arguments;
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(() => {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
};

const error = (message) => {
  throw new Error(message);
};

const generateOptionClassnames = (options) => {
  if (options.classes) {
    return Object.assign({}, options);
  }

  const prefix = options.classPrefix;

  return Object.assign({}, options, {
    classes: {
      constrained: `${prefix}--is-constrained`,
      detachedContainer: `${prefix}--detached-container`,
      content: `${prefix}-content`,
      arrow: `${prefix}-arrow`,
      isVisible: `${prefix}--is-visible`,
      isEnabled: `${prefix}--is-enabled`,
      isOpen: `${prefix}--is-open`,
    },
  });
};

const getScrollParent = (element, includeHidden) => {
  let style = getComputedStyle(element);
  const excludeStaticParent = style.position === 'absolute';
  const overflowRegex = includeHidden ? /(auto|scroll|hidden)/ : /(auto|scroll)/;

  if (style.position === 'fixed') return document.body;
  let parent = element;
  while (parent = parent.parentElement) {
    style = getComputedStyle(parent);
    if (excludeStaticParent && style.position === 'static') {

    } else if (overflowRegex.test(style.overflow + style.overflowY + style.overflowX)) {
      return parent;
    }
  }

  return document.body;
};

export {
  oneEvent,
  addClass,
  error,
  throttle,
  removeClass,
  getElementOrigin,
  setHalfPointsOnOrigin,
  getWindowOrigin,
  whichTransitionEvent,
  getScrollParent,
  toggleClassesOnElement,
  generateOptionClassnames,
  getWindow,
};
