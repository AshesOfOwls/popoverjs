import React from 'react';
import { storiesOf } from '@storybook/react';
import { PopoverjsReact } from '../../../dist';
import { withReadme } from 'storybook-readme';
import README from './README/popover_inside_trigger.md';

storiesOf('React Adapter', module)
  .addDecorator(withReadme(README))
  .add('Popover Inside Trigger', () => (
    <div className="demo-trigger">
      Click me
      <PopoverjsReact>
        <div className="demo-content">I am the content</div>
      </PopoverjsReact>
    </div>
  ));
