import React from 'react';
import { storiesOf } from '@storybook/react';
import { PopoverjsReact } from '../../dist';


storiesOf('ReactAdapter', module)
  .add('default', () => (
    <PopoverjsReact>
      <div>I am the trigger</div>
      <div>I am the content</div>
    </PopoverjsReact>
  ));
