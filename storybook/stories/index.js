import React from 'react';
import { storiesOf } from '@storybook/react';
import Popover from '../../dist/react';


storiesOf('ReactAdapter', module)
  .add('default', () => (
    <Popover>
      <div>I am the trigger</div>
      <div>I am the content</div>
    </Popover>
  ));
