## Description

The constraint element is the border for the popover, any time the current constraint conflicts with the element, it will go on to the next constraint(s) to find one that will fit in the current space. By default the constraint parent is set to the window, but it can be overwritten by providing a HTML element to the `constraintElement` option. In a lot of cases this tends to be the closest "scroll parent" - the closest parent which has an `overflow: scroll` provided. In that case, you can just pass in the string `"scroll"` to the `constraintElement` option and Popover.js will automatically find and use the closest scroll parent to that popover.

## Example

```javascript
import { PopoverjsReact } from 'popover.js';
const popoverOptions = {
  constraintElement: document.querySelector('.scrollContainer') || "scroll",
};
...
<PopoverjsReact open=true popoverOptions={popoverOptions}>
  <div>I am the trigger</div>
  <PopoverjsReact open=true>
    <div>I am the trigger</div>
    <div>I am the content</div>
  </PopoverjsReact>
</PopoverjsReact>
...
```
