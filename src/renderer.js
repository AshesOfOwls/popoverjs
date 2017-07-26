import { oneEvent, addClass, removeClass, whichTransitionEvent } from './utils';

import './styles/main.scss';

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
    oneEvent(this.triggerElement, this.options.showOn, this.render);
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
    oneEvent(this.popoverElement,
      whichTransitionEvent(this.popoverElement),
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
      addClass(this.popoverElement, 'is-visible');
    } else {
      removeClass(this.popoverElement, 'is-visible');
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

export default Renderer;
