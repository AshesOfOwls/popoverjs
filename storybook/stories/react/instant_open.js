import React from 'react';
import { storiesOf } from '@storybook/react';
import { PopoverjsReact } from '../../../dist';

storiesOf('React Adapter', module)
  .add('Instantly Open', () => (
    <PopoverjsReact open>
      <div>I am the trigger</div>
      <div>I am the content</div>
    </PopoverjsReact>
  ));
