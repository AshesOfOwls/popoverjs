## Description

Nested popovers are easy - just nest them as you would expect without any other options.

#### Body vs Relative attachment

Popovers can behave differently if they are attached on the body vs being attached relative to the trigger element. By default all popovers receive relative attachment - meaning they are sibling elements to the trigger wrapped in the same parent element. Relative attachment has two benefits. The first is that it will not have to modify the position of the popover at all which saves performance, Popover.js will just swap out classes to update the popover. The second is that any parents with `overflow: hidden` present will cause the popover to get cut off which can be very useful in some situations.

When dealing with nested popovers the choice of body vs relative attachment becomes more important. Nesting infinite relative popovers is no issue - the issue arises when you have the highest parent popover with body attachment. When this is the case, it is highly recommended to have all nested popovers within the body attached parent to use the default relative positioning. The reason this is important is that body positioned popovers will detect relative nested popovers as part of its content and will aid in positioning the elements. Also, as mentioned before, relative popovers just swap out classes to update their position. When a relative popover is nested in a body attached popover, it is technically already body attached and does not require that option.

## Example

```javascript
import { PopoverjsReact } from 'popover.js';
const popoverOptions = {
  bodyAttached: true,
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
