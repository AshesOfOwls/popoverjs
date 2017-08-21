import { oneEvent, toggleClassesOnElement, whichTransitionEvent } from './utils';

import './styles/main.scss';

const defaults = {
  showOn: ['trigger.click'],
  hideOn: ['document.click', 'popover.mouseleave'],
  onHideEvent: () => {},
};

class Renderer {
  constructor(options) {
    this.options = Object.assign({}, defaults, options);

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

    if (typeof showOn === 'string') {
      this.showOnObjects = [this.parseEventObject(showOn)];
    } else if (showOn && showOn.length > 0) {
      this.showOnObjects = showOn.map(this.parseEventObject.bind(this));
    }
  }

  parseHideEvents() {
    const hideOn = this.options.hideOn;
    if (!hideOn || hideOn.length === 0) { return; }

    if (typeof hideOn === 'string') {
      this.hideOnObjects = [this.parseEventObject(hideOn)];
    } else if (hideOn && hideOn.length > 0) {
      this.hideOnObjects = hideOn.map(this.parseEventObject.bind(this));
    }
  }

  parseEventObject(eventString) {
    const object = eventString.split('.');

    if (!object[1]) {
      return {
        element: this.triggerElement,
        event: eventString,
      };
    }

    if (['body', 'document'].includes(object[0])) {
      return {
        element: document.body,
        event: object[1],
      };
    }

    return {
      element: this[`${object[0]}Element`],
      event: object[1],
    };
  }

  listenForRender() {
    this.toggleRenderListeners(true);
  }

  toggleRenderListeners(isToggled) {
    if (this.showOnObjects.length > 0) {
      const method = isToggled ? 'addEventListener' : 'removeEventListener';
      this.showOnObjects.forEach((showOn) => {
        showOn.element[method](
          showOn.event,
          this.onTriggerClick.bind(this, showOn.element, showOn.event),
        );
      });
    }
  }

  onTriggerClick(element, event, e) {
    e.stopImmediatePropagation();

    this.toggleRenderListeners(false);
    this.shouldShow();
  }

  destroyListeners() {
    this.clearTransitionListener();
    this.toggleHideListeners(false);
    this.toggleRenderListeners(false);
  }

  listenForHide() {
    this.toggleHideListeners(true);
  }

  toggleHideListeners(isToggled) {
    if (this.hideOnObjects.length > 0) {
      const method = isToggled ? 'addEventListener' : 'removeEventListener';
      this.hideOnObjects.forEach((hideOn) => {
        hideOn.element[method](
          hideOn.event,
          this.isTryingToHide.bind(this, hideOn.element, hideOn.event),
        );
      });
    }
  }

  isTryingToHide(element, event, e) {
    this.toggleHideListeners(false);

    if (element === document.body) {
      return this.onDocumentClick(e);
    }

    return this.onTriggerLeave(e);
  }

  onTriggerLeave() {
    this.onHideEvent('triggerLeave');
  }

  onDocumentClick(e) {
    if (this.popoverElement.contains(e.target)) { return; }

    this.onHideEvent('documentClick');
  }

  onHideEvent(hideEvent) {
    this.options.onHideEvent(hideEvent);

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
  }

  toggleVisibility(isVisible = false) {
    if (this.isVisible === isVisible) { return; }

    this.isVisible = isVisible;

    this.listenForToggleEnd();

    const classes = ['popoverjs--is-visible'];

    if (isVisible) {
      this.toggleRendererClasses(['popoverjs--is-open'], false);
    }

    this.toggleRendererClasses(classes, isVisible);
  }

  onToggleEnd() {
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

  toggleRendererClasses(clasess, isToggled) {
    toggleClassesOnElement(this.popoverElement, clasess, isToggled);
    toggleClassesOnElement(this.attachmentElement, clasess, isToggled);
  }
}

export default Renderer;
