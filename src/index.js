import { oneEvent, addClass, removeClass } from './utils';
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

    this.toggleVisibility(true);
    this.listenForOutsideClick();
    this.setUpPositioner();
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

    this.toggleVisibility(false);
    this.listenForRender();
  }

  toggleVisibility(isVisible = false) {
    this.isVisible = isVisible;

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
