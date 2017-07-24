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

/* From Modernizr */
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

export {
  oneEvent,
  addClass,
  removeClass,
  whichTransitionEvent,
};
