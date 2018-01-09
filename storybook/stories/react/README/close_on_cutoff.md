## Description

##### Default: false

Hides the popover whenever it cannot detect an available constraint.

## Example

```javascript
import { PopoverjsReact } from 'popover.js';
const popoverOptions = {
  closeOnCutoff: true,
};
...
<PopoverjsReact popoverOptions={popoverOptions}>
  <div className="demo-trigger">I am the trigger</div>
  <div className="demo-content">I am the content</div>
</PopoverjsReact>
```
