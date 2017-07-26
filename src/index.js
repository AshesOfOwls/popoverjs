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
    this.renderer = new Renderer(this.options);
  }

  position() {
    this.renderer.position();
  }
}

window.Popoverjs = Popoverjs;

export default Popoverjs;
