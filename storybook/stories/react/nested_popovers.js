import React from 'react';
import { storiesOf } from '@storybook/react';
import { PopoverjsReact } from '../../../dist';
import { withReadme } from 'storybook-readme';
import README from './README/nested_popovers.md';

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
  .addDecorator(withReadme(README))
  .add('Nested Popovers', () => (
    <PopoverjsReact popoverOptions={outerPopoverOptions}>
      <div className="demo-trigger">I am the trigger</div>
      <PopoverjsReact popoverOptions={innerPopoverOptions}>
        <div className="demo-trigger">I am the trigger</div>
        <div className="demo-content">I am the content</div>
      </PopoverjsReact>
    </PopoverjsReact>
  ));
