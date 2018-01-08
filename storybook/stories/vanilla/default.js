import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { findDOMNode } from 'react-dom';
import Popoverjs from '../../../dist';

class TestHarness extends Component {
  componentDidMount() {
    const domNode = findDOMNode(this);

    this.popoverjs = new Popoverjs({
      attachmentElement: domNode,
      popoverElement: domNode.querySelector('.popoverjs'),
      triggerElement: domNode.querySelector('.triggerElement'),
    });
  }

  render() {
    return (
      <div className="popoverjs--wrapper">
        <div className="demo-trigger">
          I am a trigger!
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
  .add('default', () => (<TestHarness />));
