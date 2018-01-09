## Description

##### Default: false

This property forces the popover to always stay open.

## Example

```javascript
import { PopoverjsReact } from 'popover.js';
const popoverOptions = {
  alwaysOpen: true,
};
...
<PopoverjsReact popoverOptions={popoverOptions}>
  <div className="demo-trigger">I am the trigger</div>
  <div className="demo-content">I am the content</div>
</PopoverjsReact>
```
