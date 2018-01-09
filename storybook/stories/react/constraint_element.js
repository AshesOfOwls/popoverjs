import React from 'react';
import { storiesOf } from '@storybook/react';
import { PopoverjsReact } from '../../../dist';
import README from './README/constraint_element.md';
import { withReadme }  from 'storybook-readme';

const popoverOptions = {
  constraintElement: 'scroll',
  bodyAttached: false,
};

storiesOf('React Adapter', module)
  .addDecorator(withReadme(README))
  .add('Constraint Element', () => (
    <div className="constraint-element">
      <div className="constraint-element-inner">
        <PopoverjsReact open popoverOptions={popoverOptions}>
          <div className="demo-trigger">I am the trigger</div>
          <div className="demo-content">I am the content</div>
        </PopoverjsReact>
      </div>
    </div>
  ));
