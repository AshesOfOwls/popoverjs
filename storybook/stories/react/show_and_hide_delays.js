import React from 'react';
import { storiesOf } from '@storybook/react';
import { PopoverjsReact } from '../../../dist';
import { withReadme } from 'storybook-readme';
import README from './README/show_and_hide_delays.md';

const popoverOptions = {
  showDelay: 500,
  hideDelay: 500,
};

storiesOf('React Adapter', module)
  .addDecorator(withReadme(README))
  .add('Show and Hide Delays', () => (
    <PopoverjsReact popoverOptions={popoverOptions}>
      <div className="demo-trigger">I am the trigger</div>
      <div className="demo-content">I am the content</div>
    </PopoverjsReact>
  ));
