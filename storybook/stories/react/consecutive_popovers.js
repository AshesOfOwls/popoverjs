import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { PopoverjsReact } from '../../../dist';
import README from './README/consecutive_popovers.md';

class TestHarness extends Component {
  constructor(props) {
    super(props);

    this.state = {
      popoverOneOpen: true,
      popoverTwo: false,
    };
  }

  togglePopovers() {
    this.setState({
      popoverOneOpen: !this.state.popoverOneOpen,
      popoverTwoOpen: !this.state.popoverTwoOpen,
    })
  }

  get popoverOptions() {
    return {
      bodyAttached: true,
      manualTriggering: true,
      showOn: ['trigger.click'],
      hideOn: ['trigger.click', 'document.click'],
    };
  }

  render() {
    return (
      <div>
        <div className="demo-trigger" onClick={this.togglePopovers.bind(this)}>
          I am the trigger
          <PopoverjsReact open={this.state.popoverOneOpen} popoverOptions={this.popoverOptions}>
            <div className="demo-content">Popover 1</div>
          </PopoverjsReact>
          <PopoverjsReact open={this.state.popoverTwoOpen} popoverOptions={this.popoverOptions}>
            <div className="demo-content">Popover 2</div>
          </PopoverjsReact>
        </div>
      </div>
    );
  }
}

storiesOf('React Adapter', module)
  .addDecorator(withReadme(README))
  .add('Consecutive Popovers', () => (<TestHarness />));
