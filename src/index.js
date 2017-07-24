import { oneEvent, addClass, removeClass, whichTransitionEvent } from './utils';
import Positioner from './positioner';

import './styles/main.scss';

const defaults = {};

class Popoverjs {
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
    oneEvent(this.triggerElement, 'click', this.render);
  }

  render(e) {
    e.stopImmediatePropagation();

    this.setUpPositioner();
    this.show()
    this.listenForOutsideClick();
  }

  destroyListeners() {
    this.triggerElement.removeEventListener('click', this.render);
    document.body.removeEventListener('click', this.onDocumentClick);
  }

  listenForOutsideClick() {
    document.body.addEventListener('click', this.onDocumentClick);
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

  onToggleEnd() {
    if (!this.isVisible) {
      this.Positioner.disable();
      this.listenForRender();
    }
  }

  show() {
    this.toggleVisibility(true);
  }

  hide() {
    this.toggleVisibility(false);
  }

  toggleVisibility(isVisible = false) {
    this.isVisible = isVisible;

    this.listenForToggleEnd();

    if (isVisible) {
      return addClass(this.popoverElement, 'is-visible');
    }

    return removeClass(this.popoverElement, 'is-visible');
  }

  setUpPositioner() {
    const constraintElement = this.constraintElement;
    const popoverElement = this.popoverElement;
    const triggerElement = this.triggerElement;

    this.Positioner = new Positioner(Object.assign({}, {
      constraintElement,
      popoverElement,
      triggerElement,
    }, this.options));

    this.Positioner.enable();
  }
}

window.Popoverjs = Popoverjs;

export default Popoverjs;
