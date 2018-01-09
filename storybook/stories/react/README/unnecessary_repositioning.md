## Description

##### Default: False (off)

This property, when turned on, allows for constant repositioning of the popover following the list of constraints. This is turned off by default in order to prevent popovers from moving around constantly when the constraint element is resized.

## Example

```javascript
import { PopoverjsReact } from 'popover.js';
const popoverOptions = {
  constraintElement: 'scroll',
  unnecessaryRepositioning: true,
};
...
<PopoverjsReact open popoverOptions={popoverOptions}>
  <div className="demo-trigger">I am the trigger</div>
  <div className="demo-content">I am the content</div>
</PopoverjsReact>
```
