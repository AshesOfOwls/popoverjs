## Description

If desired you can create a popover within a trigger element. Create a trigger element that has the `position: relative|absolute` set on it, then insert a popover with only the content inside of it. The popover will work as normal as if the trigger was the first element, however this has some benefit of not messing the DOM up as much. This might be the preferred way to accomplish popovers in the future.

## Example

```javascript
import { PopoverjsReact } from 'popover.js';
...
<div className="demo-trigger">
  Click me
  <PopoverjsReact>
    <div className="demo-content">I am the content</div>
  </PopoverjsReact>
</div>
```
