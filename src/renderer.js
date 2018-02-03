import { oneEvent, toggleClassesOnElement, whichTransitionEvent, generateOptionClassnames } from './utils';

const defaults = {
  manualTriggering: false,
  showOn: ['trigger.click'],
  hideOn: ['document.click', 'trigger.click'],
  onHideEvent: () => {},
  onShowEvent: () => {},
};

class Renderer {
  constructor(options) {
    this.options = generateOptionClassnames(Object.assign({}, defaults, options));

    this.onTriggerClick = this.onTriggerClick.bind(this);
    this.onDocumentClick = this.onDocumentClick.bind(this);
    this.onPopoverEnter = this.onPopoverEnter.bind(this);
    this.onPopoverLeave = this.onPopoverLeave.bind(this);
    this.onToggleEnd = this.onToggleEnd.bind(this);
    this.onTriggerLeave = this.onTriggerLeave.bind(this);

    this.initialize();
  }

  initialize() {
    this.setUpGlobals();
    this.parseEvents();
    this.listenForRender();
  }

  destroy() {
    this.destroyListeners();
  }

  setUpGlobals() {
    this.wasVisible = false;
    this.isVisible = false;
    this.triggerElement = this.options.triggerElement;
    this.popoverElement = this.options.popoverElement;
    this.attachmentElement = this.options.attachmentElement;
    this.showOnObjects = [];
    this.hideOnObjects = [];
  }

  parseEvents() {
    this.parseShowEvents();
    this.parseHideEvents();
  }

  parseShowEvents() {
    const showOn = this.options.showOn;
    if (!showOn || showOn.length === 0) { return; }

    const callback = this.onTriggerClick;

    if (typeof showOn === 'string') {
      this.showOnObjects = [this.parseEventObject(callback, showOn)];
    } else if (showOn && showOn.length > 0) {
      this.showOnObjects = showOn.map(this.parseEventObject.bind(this, callback));
    }
  }

  parseHideEvents() {
    const hideOn = this.options.hideOn;
    if (!hideOn || hideOn.length === 0) { return; }

    const callback = this.isTryingToHide;

    if (typeof hideOn === 'string') {
      this.hideOnObjects = [this.parseEventObject(callback, hideOn)];
    } else if (hideOn && hideOn.length > 0) {
      this.hideOnObjects = hideOn.map(this.parseEventObject.bind(this, callback));
    }
  }

  parseEventObject(callback, eventString) {
    const object = eventString.split('.');
    let eventObject = {};

    if (!object[1]) {
      eventObject = {
        element: this.triggerElement,
        event: eventString,
      };
    } else if (['body', 'document'].includes(object[0])) {
      eventObject = {
        element: document.body,
        event: object[1],
      };
    } else {
      eventObject = {
        element: this[`${object[0]}Element`],
        event: object[1],
      };
    }

    eventObject.callback = callback.bind(this, eventObject.element, eventObject.event);

    return eventObject;
  }

  listenForRender() {
    if (this.options.alwaysOpen) {
      this.shouldShow();
      return;
    }

    this.toggleRenderListeners(true);
  }

  toggleRenderListeners(isToggled) {
    if (this.showOnObjects.length > 0) {
      setTimeout(() => {
        const method = isToggled ? 'addEventListener' : 'removeEventListener';
        this.showOnObjects.forEach((showOn) => {
          showOn.element[method](
            showOn.event,
            showOn.callback,
          );
        });
      });
    }
  }

  onTriggerClick(element, event, e) {
    this.onShowEvent(e);
    this.toggleRenderListeners(false);
  }

  onShowEvent(event) {
    this.options.onShowEvent(event);

    if (this.options.manualTriggering) { return; }

    this.shouldShow();
  }

  destroyListeners() {
    this.clearTransitionListener();
    this.toggleHideListeners(false);
    this.toggleRenderListeners(false);
  }

  listenForHide() {
    if (this.options.alwaysOpen) {
      return;
    }

    this.toggleHideListeners(true);
  }

  toggleHideListeners(isToggled) {
    if (this.hideOnObjects.length > 0) {
      setTimeout(() => {
        const method = isToggled ? 'addEventListener' : 'removeEventListener';
        this.hideOnObjects.forEach((hideOn) => {
          hideOn.element[method](
            hideOn.event,
            hideOn.callback,
          );
        });
      });
    }
  }

  isTryingToHide(element, event, e) {
    if (element === document.body) {
      return this.onDocumentClick(e);
    }

    if (element === this.triggerElement) {
      if (this.elementInPopover(e.target)) { return; }
    }

    return this.onTriggerLeave(e);
  }

  onTriggerLeave() {
    this.onHideEvent('triggerLeave');
  }

  onDocumentClick(e) {
    if (this.elementInPopover(e.target)) { return; }

    this.onHideEvent('documentClick');
  }

  elementInPopover(element) {
    return this.popoverElement.contains(element);
  }

  onHideEvent(hideEvent) {
    this.options.onHideEvent(hideEvent);

    if (this.options.manualTriggering) { return; }

    this.shouldHide();
  }

  listenForToggleEnd() {
    if (this.isVisible === this.wasVisible) {
      this.onToggleEnd();
      return;
    }

    this.clearTransitionListener();

    this.transitionEventData = oneEvent(this.popoverElement,
      whichTransitionEvent(this.popoverElement),
      this.onToggleEnd,
      transitionEvent => (transitionEvent.propertyName === 'opacity'),
    );
  }

  clearTransitionListener() {
    if (!this.transitionEventData) { return; }
    this.popoverElement.removeEventListener(
      this.transitionEventData[0],
      this.transitionEventData[1],
    );
  }

  clearDelayTimeouts() {
    clearTimeout(this.hideTimeout);
    clearTimeout(this.showTimeout);
  }

  shouldShow() {
    if (this.isVisible || this.isForceClosing) {
      this.toggleRenderListeners(true);
      return;
    }

    this.clearDelayTimeouts();

    if (this.options.showDelay > 0) {
      this.showTimeout = setTimeout(() => {
        this._show();
      }, this.options.showDelay);
    } else {
      this._show();
    }
  }

  _show() {
    this.options.onBeforeShow();
    this.toggleVisibility(true);
    this.listenForHide();
  }

  onPopoverEnter() {
    this.clearDelayTimeouts();
  }

  onPopoverLeave() {
    this.shouldHide();
  }

  hide() {
    this.shouldHide();
  }

  show() {
    this.shouldShow();
  }

  shouldHide() {
    if (!this.isVisible) { return; }

    this.clearDelayTimeouts();

    if (this.options.hideDelay > 0) {
      this.hideTimeout = setTimeout(() => {
        this._hide();
      }, this.options.hideDelay);
    } else {
      this._hide();
    }
  }

  forceHide() {
    this._hide();
  }

  _hide() {
    this.options.onBeforeHide();
    this.toggleVisibility(false);
    this.toggleHideListeners(false);
  }

  toggleVisibility(isVisible = false) {
    if (this.isVisible === isVisible) { return; }

    this.isVisible = isVisible;

    this.listenForToggleEnd();

    const classes = [this.options.classes.isVisible];

    if (isVisible) {
      this.toggleRendererClasses([this.options.classes.isOpen], false);
    }

    this.toggleRendererClasses(classes, isVisible);
  }

  onToggleEnd() {
    this.wasVisible = this.isVisible;

    if (!this.isVisible) {
      this.options.onAfterHide();
      this.options.onToggleEnd();
      this.listenForRender();

      this.toggleRendererClasses([this.options.classes.isOpen], false);
    } else {
      this.options.onAfterShow();
    }
  }

  toggleRendererClasses(clasess, isToggled) {
    toggleClassesOnElement(this.popoverElement, clasess, isToggled);
    toggleClassesOnElement(this.attachmentElement, clasess, isToggled);
  }
}

export default Renderer;
