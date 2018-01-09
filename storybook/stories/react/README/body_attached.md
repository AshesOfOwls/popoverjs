## Description

##### Default: false

When set to true the container will be attached to the bottom of the DOM body.

## Example

```javascript
import { PopoverjsReact } from 'popover.js';
const popoverOptions = {
  bodyAttached: true,
};
...
<PopoverjsReact popoverOptions={popoverOptions}>
  <div className="demo-trigger">I am the trigger</div>
  <div className="demo-content">I am the content</div>
</PopoverjsReact>
```
