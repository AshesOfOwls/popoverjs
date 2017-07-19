const oneEvent = (target, eventType, callback) => {
  const wrappedCallback = (eventObject) => {
    target.removeEventListener(eventType, callback);
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

export {
  oneEvent,
  addClass,
  removeClass,
};
