import React from 'react';
import { storiesOf } from '@storybook/react';
import { PopoverjsReact } from '../../../dist';

import './styles.scss';

const popoverOptions = {
  themeClass: 'popoverjs--dropdown',
  constraints: [{
    popover: 'top left',
    attachment: 'bottom left',
  }, {
    popover: 'top right',
    attachment: 'bottom right',
  }],
};

storiesOf('Custom SCSS', module)
  .add('dropdown style', () => (
    <PopoverjsReact popoverOptions={popoverOptions}>
      <div>I am the trigger</div>
      <div>I am the content</div>
    </PopoverjsReact>
  ));
