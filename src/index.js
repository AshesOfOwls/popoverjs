import Helpers from './helpers';
import Positioner from './positioner';

import './styles/main.scss';

const defaults = {
  constraintParent: 'body',
  constraints: [{
    popover: 'top center',
    trigger: 'bottom center',
  }, {
    popover: 'left center',
    trigger: 'right center',
  }, {
    popover: 'bottom center',
    trigger: 'top center',
  }],
};

class Popover {
  constructor(options) {
    this.options = options;

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

  render(e) {
    e.stopImmediatePropagation();
    this.toggleVisibility(true);
    this.listenForOutsideClick();
    this.setUpPositioner();
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

new Popover(defaults);
