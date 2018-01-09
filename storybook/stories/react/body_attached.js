import React from 'react';
import { storiesOf } from '@storybook/react';
import { PopoverjsReact } from '../../../dist';
import { withReadme } from 'storybook-readme';
import README from './README/body_attached.md';

const popoverOptions = {
  bodyAttached: true,
};

storiesOf('React Adapter', module)
  .addDecorator(withReadme(README))
  .add('Body Attached', () => (
    <PopoverjsReact popoverOptions={popoverOptions}>
      <div className="demo-trigger">I am the trigger</div>
      <div className="demo-content">I am the content</div>
    </PopoverjsReact>
  ));
