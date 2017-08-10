import { oneEvent, addClass, removeClass, whichTransitionEvent } from './utils';

import './styles/main.scss';

const defaults = {
  showOn: 'click',
  hideOn: 'documentClick',
};

class Renderer {
  constructor(options) {
    this.options = Object.assign({}, defaults, options);

    this.render = this.render.bind(this);
    this.onDocumentClick = this.onDocumentClick.bind(this);
    this.onPopoverEnter = this.onPopoverEnter.bind(this);
    this.onPopoverLeave = this.onPopoverLeave.bind(this);
    this.onToggleEnd = this.onToggleEnd.bind(this);
    this.onTriggerLeave = this.onTriggerLeave.bind(this);

    this.initialize();
  }

  initialize() {
    this.setUpGlobals();
    this.listenForRender();
    this.listenForPopoverHover();
  }

  destroy() {
    this.destroyListeners();
  }

  setUpGlobals() {
    this.wasVisible = false;
    this.isVisible = false;
    this.triggerElement = this.options.triggerElement;
    this.popoverElement = this.options.popoverElement;
  }

  listenForPopoverHover() {
    if (['mouseleave', 'documentClick'].includes(this.options.hideOn)) { return; }

    this.popoverElement.addEventListener('mouseenter', this.onPopoverEnter);
    this.popoverElement.addEventListener('mouseleave', this.onPopoverLeave);
  }

  listenForRender() {
    oneEvent(this.triggerElement, this.options.showOn, this.render);
  }

  render(e) {
    e.stopImmediatePropagation();

    this.options.onRender();
    this.shouldShow();
    this.listenForHide();
  }

  destroyListeners() {
    this.clearToggleEvent();

    this.triggerElement.removeEventListener(this.options.showOn, this.render);
    this.popoverElement.removeEventListener('mouseenter', this.onPopoverEnter);
    this.triggerElement.removeEventListener(this.options.hideOn, this.onTriggerLeave);

    if (this.options.hideOn === 'documentClick') {
      document.body.removeEventListener('click', this.onPopoverEnter);
    }
  }

  listenForHide() {
    switch (this.options.hideOn) {
    case 'documentClick':
      document.body.addEventListener('click', this.onDocumentClick);
      break;
    default:
      this.triggerElement.addEventListener(this.options.hideOn, this.onTriggerLeave);
    }
  }

  onTriggerLeave() {
    this.triggerElement.removeEventListener(this.options.hideOn, this.onTriggerLeave);
    this.shouldHide();
  }

  onDocumentClick(e) {
    if (this.popoverElement.contains(e.target)) { return; }
    document.body.removeEventListener('click', this.onDocumentClick);
    this.shouldHide();
  }

  listenForToggleEnd() {
    if (this.isVisible === this.wasVisible) {
      this.onToggleEnd();
      return;
    }

    this.clearToggleEvent();

    this.toggleEventData = oneEvent(this.popoverElement,
      whichTransitionEvent(this.popoverElement),
      this.onToggleEnd,
      transitionEvent => (transitionEvent.propertyName === 'opacity'),
    );
  }

  clearToggleEvent() {
    if (!this.toggleEventData) { return; }
    this.popoverElement.removeEventListener(this.toggleEventData[0], this.toggleEventData[1]);
  }

  clearDelayTimeouts() {
    clearTimeout(this.hideTimeout);
    clearTimeout(this.showTimeout);
  }

  shouldShow() {
    if (this.isVisible || this.isForceClosing) { return; }

    this.clearDelayTimeouts();

    if (this.options.showDelay > 0) {
      this.showTimeout = setTimeout(() => {
        this.show();
      }, this.options.showDelay);
    } else {
      this.show();
    }
  }

  show() {
    this.options.onBeforeShow();
    this.toggleVisibility(true);
  }

  onPopoverEnter() {
    this.clearDelayTimeouts();
  }

  onPopoverLeave() {
    this.shouldHide();
  }

  shouldHide() {
    if (!this.isVisible) { return; }

    this.clearDelayTimeouts();

    if (this.options.hideDelay > 0) {
      this.hideTimeout = setTimeout(() => {
        this.hide();
      }, this.options.hideDelay);
    } else {
      this.hide();
    }
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
      addClass(this.popoverElement, 'is-visible');
    } else {
      removeClass(this.popoverElement, 'is-visible');
    }
  }

  onToggleEnd() {
    this.wasVisible = this.isVisible;

    if (!this.isVisible) {
      this.options.onAfterHide();
      this.options.onToggleEnd();
      this.listenForRender();
    } else {
      this.options.onAfterShow();
    }
  }
}

export default Renderer;
