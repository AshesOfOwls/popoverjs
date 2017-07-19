import Helpers from './helpers';
import Positioner from './positioner/';

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
    this.triggerElement = document.getElementsByClassName('trigger')[0];
    this.popoverElement = document.getElementsByClassName('popoverjs')[0];
  }

  listenForRender() {
    Helpers.oneEvent(this.triggerElement, 'click', this.render);
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
      return this.popoverElement.classList.add('is-visible');
    }

    return this.popoverElement.classList.remove('is-visible');
  }

  setUpPositioner() {
    const popoverElement = this.popoverElement;
    const triggerElement = this.triggerElement;

    this.Positioner = new Positioner(Object.assign({}, {
      popoverElement,
      triggerElement,
    }, this.options));

    this.Positioner.enable();
  }
}

window.Popoverjs = Popoverjs;

export default Popoverjs;
