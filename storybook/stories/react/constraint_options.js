import React from 'react';
import { withReadme } from 'storybook-readme';
import { storiesOf } from '@storybook/react';
import { PopoverjsReact } from '../../../dist';
import README from './README/constraint_options.md';

const popoverOptions = {
  showOn: ['trigger.click'],
  hideOn: ['trigger.click'],
  constraintElement: 'scroll',
  constraints: [
    { popover: 'right', attachment: 'left' },
    { popover: 'top', attachment: 'bottom' },
    { popover: 'bottom', attachment: 'top' },
    { popover: 'left', attachment: 'bottom' },
  ],
};

storiesOf('React Adapter', module)
  .addDecorator(withReadme(README))
  .add('Constraint Options', () => (
    <div className="constraint-element">
      <div className="constraint-element-inner">
        <PopoverjsReact popoverOptions={popoverOptions}>
          <div className="demo-trigger">I am the trigger</div>
          <div className="demo-content">I am the content</div>
        </PopoverjsReact>
      </div>
    </div>
  ));
