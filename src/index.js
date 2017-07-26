import Renderer from './renderer';
import Positioner from './positioner';

import './styles/main.scss';

const defaults = {
  showOn: 'click',
  hideOn: 'documentClick',
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
    this.setUpPositioner();
    this.setUpRenderer();
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
    this.Positioner = new Positioner(this.positionerOptions);

    this.Positioner.enable();
  }

  get positionerOptions() {
    return Object.assign({}, {
      attachmentElement: this.attachmentElement,
      constraintElement: this.constraintElement,
      popoverElement: this.popoverElement,
      triggerElement: this.triggerElement,
    }, this.options);
  }
}

window.Popoverjs = Popoverjs;

export default Popoverjs;
