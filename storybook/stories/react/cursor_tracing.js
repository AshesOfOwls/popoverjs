import React from 'react';
import { withReadme } from 'storybook-readme';
import { storiesOf } from '@storybook/react';
import { PopoverjsReact } from '../../../dist';
import README from './README/cursor_tracing.md';

const popoverOptions = {
  showOn: ['trigger.mouseenter'],
  hideOn: 'cursorTracing',
};

storiesOf('React Adapter', module)
  .addDecorator(withReadme(README))
  .add('Cursor Tracing Hiding', () => (
    <div className="constraint-element">
      <PopoverjsReact popoverOptions={popoverOptions}>
        <div className="demo-trigger">I am the trigger</div>
        <div className="demo-content">I am the content</div>
      </PopoverjsReact>
    </div>
  ));
