import Renderer from './renderer';

import './styles/main.scss';

const defaults = {
  showOn: 'click',
  hideOn: 'documentClick',
};

class Popoverjs {
  constructor(options) {
    this.options = Object.assign(defaults, options);

    this.initialize();
  }

  initialize() {
    this.enableRenderer();
  }

  enableRenderer() {
    this.renderer = new Renderer(this.options);
  }

  position() {
    if (!this.renderer.Positioner) { return; }

    this.renderer.Positioner.position();
  }
}

window.Popoverjs = Popoverjs;

export default Popoverjs;
