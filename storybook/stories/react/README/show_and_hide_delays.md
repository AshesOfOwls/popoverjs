## Description

##### Default: 0 (Milliseconds)

Use this property to delay the hide or show of the popover.

## Example

```javascript
import { PopoverjsReact } from 'popover.js';
const popoverOptions = {
  hideDelay: 500,
  showDelay: 500,
};
...
<PopoverjsReact popoverOptions={popoverOptions}>
  <div className="demo-trigger">I am the trigger</div>
  <div className="demo-content">I am the content</div>
</PopoverjsReact>
```
