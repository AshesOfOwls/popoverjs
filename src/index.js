import './polyfills';

import Renderer from './renderer';
import Positioner from './positioner';

import { error } from './utils';

import './styles/_main.scss';

const defaults = {
  classPrefix: 'popoverjs',
  showDelay: 0,
  hideDelay: 0,
  themeClass: 'default',
  unnecessaryRepositioning: false,
  resizePositioning: true,
  onBeforeHide: () => {},
  onBeforeShow: () => {},
  onAfterHide: () => {},
  onAfterShow: () => {},
};

const generateOptionClassnames = (options) => {
  const prefix = options.classPrefix;

  return Object.assign({}, options, {
    classes: {
      theme: `${prefix}--${options.themeClass}`,
      constrained: `${prefix}--is-constrained`,
      detachedContainer: `${prefix}--detached-container`,
      arrow: `${prefix}-content`,
      content: `${prefix}-arrow`,
      isVisible: `${prefix}--is-visible`,
      isOpen: `${prefix}--is-open`,
    },
  });
};

const requiredOptions = [
  'attachmentElement',
  'popoverElement',
];

class Popoverjs {
  constructor(options) {
    this.options = generateOptionClassnames(Object.assign({}, defaults, options));

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
    this.setUpRenderer();
  }

  setUpGlobals() {
    if (!this.options.triggerElement) {
      this.options.triggerElement = this.options.attachmentElement;
    }
  }

  toggle(isToggled) {
    if (isToggled) {
      this.show();
    } else {
      this.hide();
    }
  }

  update() {
    if (!this.Positioner) { return; }

    this.Positioner.position();
  }

  get rendererOptions() {
    return Object.assign({}, this.options, {
      onToggleEnd: this.onToggleEnd.bind(this),
      onBeforeShow: this.onBeforeShow.bind(this),
    });
  }

  onToggleEnd() {
    if (!this.Positioner) { return; }

    this.Positioner.disable();
  }

  show() {
    this.Renderer.show();
  }

  hide() {
    this.Renderer.hide();
  }

  forceHide() {
    this.Renderer.forceHide();
  }

  onBeforeShow() {
    this.setUpPositioner();
  }

  destroy() {
    this.destroyRenderer();
    this.destroyPositioner();
  }

  setUpRenderer() {
    this.Renderer = new Renderer(this.rendererOptions);
  }

  destroyRenderer() {
    if (!this.Renderer) { return; }

    this.Renderer.destroy();
    this.Renderer = null;
    delete this.Renderer;
  }

  get positionerOptions() {
    return Object.assign({}, this.options);
  }

  setUpPositioner() {
    this.Positioner = new Positioner(this.positionerOptions);
    this.Positioner.enable();
  }

  destroyPositioner() {
    if (!this.Positioner) { return; }

    this.Positioner.destroy();
    this.Positioner = null;
    delete this.Positioner;
  }
}

window.Popoverjs = Popoverjs;

export default Popoverjs;
