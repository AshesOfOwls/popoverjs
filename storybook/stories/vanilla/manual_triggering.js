import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { findDOMNode } from 'react-dom';
import Popoverjs from '../../../dist';

let ManuallyTriggeredPopover = null;

const onShowEvent = (event) => {
  console.log('Do something with this show event:', event);

  ManuallyTriggeredPopover.show();
};

const onHideEvent = (event) => {
  console.log('Do something with this hide event:', event);

  ManuallyTriggeredPopover.hide();
};

class TestHarness extends Component {
  componentDidMount() {
    const domNode = findDOMNode(this);

    ManuallyTriggeredPopover = new Popoverjs({
      manualTriggering: true,
      showOn: ['trigger.click'],
      hideOn: ['trigger.click', 'document.click', 'popover.mouseleave'],
      onShowEvent,
      onHideEvent,
      attachmentElement: domNode,
      popoverElement: domNode.querySelector('.popoverjs'),
      triggerElement: domNode.querySelector('.triggerElement'),
    });
  }

  render() {
    return (
      <div className="popoverjs--wrapper">
        <div className="demo-trigger">
          Manually triggered popover. Open console to see events getting triggered.
        </div>
        <div className="popoverjs">
          <div className="popoverjs-arrow" />
          <div className="popoverjs-content">
            <div className="demo-content">
              Hello, I am the content for the popover.
            </div>
          </div>
        </div>
      </div>
    );
  }
}

storiesOf('Vanilla Javascript', module)
  .add('Manual Triggering', () => (<TestHarness />));
