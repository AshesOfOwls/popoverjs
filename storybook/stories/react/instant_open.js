import React from 'react';
import { storiesOf } from '@storybook/react';
import { PopoverjsReact } from '../../../dist';
import README from './README/instant_open.md';
import { withReadme }  from 'storybook-readme';

storiesOf('React Adapter', module)
  .addDecorator(withReadme(README))
  .add('Instantly Open', () => (
    <PopoverjsReact open>
      <div className="demo-trigger">I am the trigger</div>
      <div className="demo-content">I am the content</div>
    </PopoverjsReact>
  ));
