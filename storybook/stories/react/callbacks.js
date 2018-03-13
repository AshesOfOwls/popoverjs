import React from 'react';
import { storiesOf } from '@storybook/react';
import { PopoverjsReact } from '../../../dist';
import { withReadme } from 'storybook-readme';
import README from './README/callbacks.md';

const popoverOptions = {
  onBeforeShow: () => {
    console.log('on before show');
  },
  onAfterShow: () => {
    console.log('on after show');
  },
  onBeforeHide: () => {
    console.log('on before hide');
  },
  onAfterHide: () => {
    console.log('on after hide');
  },
  onClick: (e) => {
    console.log('on click', e);
  },
};

storiesOf('React Adapter', module)
  .addDecorator(withReadme(README))
  .add('Callbacks', () => (
    <PopoverjsReact popoverOptions={popoverOptions}>
      <div className="demo-trigger">I am the trigger</div>
      <div className="demo-content">I am the content</div>
    </PopoverjsReact>
  ));
