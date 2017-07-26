import Renderer from './renderer';
import Positioner from './positioner';

import './styles/main.scss';

const defaults = {
  showOn: 'click',
  hideOn: 'documentClick',
  showDelay: 0,
  hideDelay: 200,
  onBeforeHide: () => {},
  onBeforeShow: () => {},
  onAfterHide: () => {},
  onAfterShow: () => {},
};

class Popoverjs {
  constructor(options) {
    this.options = Object.assign(defaults, options);

    this.initialize();
  }

  initialize() {
    this.setUpGlobals();
    this.setUpPositioner();
    this.setUpRenderer();
  }

  setUpGlobals() {
    if (!this.options.triggerElement) {
      this.options.triggerElement = this.options.attachmentElement;
    }
  }

  position() {
    this.Positioner.position();
  }

  get rendererOptions() {
    return Object.assign({}, this.options, {
      onToggleEnd: this.onToggleEnd.bind(this),
    });
  }

  onToggleEnd() {
    this.Positioner.disable();
  }

  setUpRenderer() {
    this.renderer = new Renderer(this.rendererOptions);
  }

  setUpPositioner() {
    this.Positioner = new Positioner(this.options);

    this.Positioner.enable();
  }
}

window.Popoverjs = Popoverjs;

export default Popoverjs;
