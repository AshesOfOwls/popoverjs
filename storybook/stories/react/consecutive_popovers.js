import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { PopoverjsReact } from '../../../dist';
import README from './README/consecutive_popovers.md';

class TestHarness extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPopover: 0,
    };
  }

  get popoverOptions() {
    return {
      bodyAttached: true,
      manualTriggering: true,
      showOn: ['trigger.click'],
      hideOn: ['document.click'],
      onHideEvent: () => {
        this.togglePopovers();
      },
    };
  }

  onClick() {
    const { currentPopover } = this.state;

    if (currentPopover === 0) {
      this.togglePopovers();
    }
  }

  isPopoverOpen(popoverIndex) {
    return this.state.currentPopover === popoverIndex;
  }

  togglePopovers() {
    const { currentPopover } = this.state;

    if (currentPopover + 1 === 3) {
      this.setState({ currentPopover: 0 });
    } else {
      this.setState({ currentPopover: currentPopover + 1 });
    }
  }

  render() {
    return (
      <div>
        <div className="demo-trigger" onClick={this.onClick.bind(this)}>
          I am the trigger
          <PopoverjsReact open={this.isPopoverOpen(1)} popoverOptions={this.popoverOptions}>
            <div className="demo-content">Popover 1</div>
          </PopoverjsReact>
          <PopoverjsReact open={this.isPopoverOpen(2)} popoverOptions={this.popoverOptions}>
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
