import React from 'react';
import { storiesOf } from '@storybook/react';
import { PopoverjsReact } from '../../../dist';

storiesOf('React Adapter', module)
  .add('default', () => (
    <PopoverjsReact popoverOptions={this.popoverOptions}>
      <div>I am the trigger</div>
      <div>I am the content</div>
    </PopoverjsReact>
  ));
