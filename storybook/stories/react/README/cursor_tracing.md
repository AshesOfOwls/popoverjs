## Description

When setting `hideOn` to `'cursorTracing'`, it will only close the popover when the cursor is detected to be trailing outside of the popovers direction.

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
