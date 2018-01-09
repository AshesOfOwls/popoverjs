import React from 'react';
import { storiesOf } from '@storybook/react';
import { PopoverjsReact } from '../../../dist';
import { withReadme } from 'storybook-readme';
import README from './README/close_on_cutoff.md';

const popoverOptions = {
  closeOnCutoff: true,
  constraintElement: 'scroll',
};

storiesOf('React Adapter', module)
  .addDecorator(withReadme(README))
  .add('Close on Cutoff', () => (
    <div className="constraint-element">
      <div className="constraint-element-inner">
        <PopoverjsReact open popoverOptions={popoverOptions}>
          <div className="demo-trigger">I am the trigger</div>
          <div className="demo-content">I am the content</div>
        </PopoverjsReact>
      </div>
    </div>
  ));
