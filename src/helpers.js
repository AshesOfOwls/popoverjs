const once = (target, event, callback) => {
  const callbackWrapper = () => {
    const args = [...arguments].splice(0);
    target.removeEventListener(event, callbackWrapper);
    return callback(args);
  };

  target.addEventListener(event, callbackWrapper);
};

export default once;
