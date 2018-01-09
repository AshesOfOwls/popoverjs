import React from 'react';
import { storiesOf } from '@storybook/react';
import { PopoverjsReact } from '../../../dist';
import { withReadme } from 'storybook-readme';
import README from './README/show_on_and_hide_on.md';

const popoverOptions = {
  hideOn: ['popover.mouseleave', 'document.click'],
  showOn: ['trigger.mouseenter'],
};

storiesOf('React Adapter', module)
  .addDecorator(withReadme(README))
  .add('Show On And Hide On', () => (
    <PopoverjsReact popoverOptions={popoverOptions}>
      <div className="demo-trigger">I am the trigger</div>
      <div className="demo-content">I am the content</div>
    </PopoverjsReact>
  ));
