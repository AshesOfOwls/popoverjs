## Description

There are four callbacks which can be used in the event cycle for Popover.js, `onBeforeShow`, `onAfterShow`, `onBeforeHide`, and `onAfterHide`. Check the console for example logs.

## Example

```javascript
import { PopoverjsReact } from 'popover.js';
const popoverOptions = {
  onBeforeShow: () => {
    ...
  },
  onAfterShow: () => {
    ...
  },
  onBeforeHide: () => {
    ...
  },
  onAfterHide: () => {
    ...
  },
};
...
<PopoverjsReact popoverOptions={popoverOptions}>
  <div className="demo-trigger">I am the trigger</div>
  <div className="demo-content">I am the content</div>
</PopoverjsReact>
```
