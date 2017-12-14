import React from 'react';
import { storiesOf } from '@storybook/react';
import { PopoverjsReact } from '../../../dist';

const outerPopoverOptions = {
  bodyAttached: true,
  showOn: 'trigger.click',
  hideOn: 'trigger.click',
};

const innerPopoverOptions = {
  bodyAttached: false,
  showOn: 'trigger.click',
  hideOn: 'trigger.click',
};

storiesOf('React Adapter', module)
  .add('Nested Popovers', () => (
    <PopoverjsReact popoverOptions={outerPopoverOptions}>
      <div>I am the trigger</div>
      <PopoverjsReact popoverOptions={innerPopoverOptions}>
        <div>I am the trigger</div>
        <div>I am the content</div>
      </PopoverjsReact>
    </PopoverjsReact>
  ));
