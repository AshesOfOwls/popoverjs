## Description

The constraint option controls how the popover flows around its attachment. The value is a list of objects, each representing a different position that the popover can be in relative to the attachment element. The popover will go over this list and find the first constraint which allows the popover to fit on screen.

Each object is written like such: `{ popover: '$primary $secondary', attachment: '$primary $secondary' }`.

For the popover element, the `$primary` represents the side of the popover where the arrow will be present, and the `$secondary` represents where the arrow sits on the `$primary` side. For instance, the setting of `popover: 'top left'`, will have the arrow on the top left side of the popover.

For the attachment element, the `$primary` represents the side of the attachment element where the popover will sit on, and the `$secondary` represents where the arrow points to on the `$primary` attachment side. For instance, the setting of `attachment: 'right top'`, will put the popover on the right side of the attachment and with the arrow pointing to the top portion of the attachment element.

The valid values for `$primary` and `$secondary` are `[``top``right``bottom``left``center|middle``]`. You can also choose to omit the `$secondary` value, which will auto-fill with the three logical sides that the `$secondary` value can be in (this is done to reduce code length when designing complex constraints).

## Example

```javascript
import { PopoverjsReact } from 'popover.js';
const popoverOptions = {
  showOn: ['trigger.click'],
  hideOn: ['trigger.click'],
  constraintElement: 'scroll',
  constraints: [
    { popover: 'right', attachment: 'left' },
    { popover: 'top', attachment: 'bottom' },
    { popover: 'bottom', attachment: 'top' },
    { popover: 'left', attachment: 'bottom' },
  ],
};
...
<PopoverjsReact popoverOptions={popoverOptions}>
  <div className="demo-trigger">I am the trigger</div>
  <div className="demo-content">I am the content</div>
</PopoverjsReact>
...
```
