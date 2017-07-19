const Utils = {};

Utils.oneEvent = (target, eventType, callback) => {
  const wrappedCallback = (eventObject) => {
    target.removeEventListener(eventType, callback);
    return callback(eventObject);
  };

  target.addEventListener(eventType, wrappedCallback);
};

export default Utils;
