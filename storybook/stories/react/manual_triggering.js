import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { PopoverjsReact } from '../../../dist';
import README from './README/manual_triggering.md';
import { withReadme }  from 'storybook-readme';

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
        this.setState({ open: true });
      },
      onHideEvent: () => {
        this.setState({ open: false });
      },
    };
  }

  render() {
    return (
      <PopoverjsReact open={this.state.open} popoverOptions={this.popoverOptions}>
        <div className="demo-trigger">I am the trigger</div>
        <div className="demo-content">I am the content</div>
      </PopoverjsReact>
    );
  }
}

storiesOf('React Adapter', module)
  .addDecorator(withReadme(README))
  .add('Manual Triggering', () => (<TestHarness />));
