import Renderer from './renderer';
import Positioner from './positioner';

import { error } from './utils';

import './styles/main.scss';

const defaults = {
  showOn: 'click',
  hideOn: 'documentClick',
  showDelay: 0,
  hideDelay: 200,
  unecessaryPositioning: false,
  resizePositioning: true,
  onBeforeHide: () => {},
  onBeforeShow: () => {},
  onAfterHide: () => {},
  onAfterShow: () => {},
};

const requiredOptions = [
  'attachmentElement',
  'popoverElement',
];

class Popoverjs {
  constructor(options) {
    this.options = Object.assign(defaults, options);

    this.checkForRequiredOptions();
    this.initialize();
  }

  checkForRequiredOptions() {
    const optionKeys = Object.keys(this.options);

    requiredOptions.forEach((option) => {
      if (!optionKeys.includes(option)) {
        error(`Must supply ${option} option to Popoverjs`);
      }
    });
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
