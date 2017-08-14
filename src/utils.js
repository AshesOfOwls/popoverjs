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

const error = (message) => {
  throw new Error(message);
};

export {
  oneEvent,
  addClass,
  error,
  removeClass,
  getElementOrigin,
  setHalfPointsOnOrigin,
  getWindowOrigin,
  whichTransitionEvent,
  toggleClassesOnElement,
};
