import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { PopoverjsReact } from '../../../dist';

class TestHarness extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  get popoverOptions() {
    return {
      manualTriggering: true,
      showOn: ['trigger.click'],
      hideOn: ['trigger.click', 'document.click'],
      onShowEvent: () => {
        console.log(':((()))');
        this.setState({ open: true });
      },
      onHideEvent: () => {
        console.log('!!!');
        setTimeout(() => {
          this.setState({ open: false });
        })
      },
    };
  }

  render() {
    return (
      <PopoverjsReact open={this.state.open} popoverOptions={this.popoverOptions}>
        <div>I am the trigger</div>
        <div>I am the content</div>
      </PopoverjsReact>
    );
  }
}

storiesOf('Stateful', module)
  .add('manualTriggering: true', () => (<TestHarness />));
