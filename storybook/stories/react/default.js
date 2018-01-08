import React from 'react';
import { storiesOf } from '@storybook/react';
import { PopoverjsReact } from '../../../dist';

storiesOf('React Adapter', module)
  .add('default', () => (
    <PopoverjsReact popoverOptions={this.popoverOptions}>
      <div className="demo-trigger">I am the trigger</div>
      <div  className="demo-content">I am the content</div>
    </PopoverjsReact>
  ));
