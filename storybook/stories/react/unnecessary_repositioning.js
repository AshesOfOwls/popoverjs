import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { storiesOf } from '@storybook/react';
import { PopoverjsReact } from '../../../dist';
import README from './README/unnecessary_repositioning.md';
import { withReadme }  from 'storybook-readme';

const popoverOptions = {
  constraintElement: 'scroll',
  unnecessaryRepositioning: true,
};

storiesOf('React Adapter', module)
  .addDecorator(withReadme(README))
  .add('Unnecessary Repositioning', () => (
    <div className="constraint-element">
      <div className="constraint-element-inner">
        <PopoverjsReact open popoverOptions={popoverOptions}>
          <div className="demo-trigger">I am the trigger</div>
          <div className="demo-content">I am the content</div>
        </PopoverjsReact>
      </div>
    </div>
  ));
