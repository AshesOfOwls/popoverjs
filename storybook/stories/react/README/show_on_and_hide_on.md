## Description

Popover.js will always create and destroy the necessary listeners for you. In order to customize which listeners get set up for each event, you can use the `hideOn` and `showOn` options. Each takes either a string or an array of strings in the following format:

`'element.event'`

* Available elements: `trigger`, `popover`, `document`
* Available events: All native javascript events

## Example

```javascript
import { PopoverjsReact } from 'popover.js';
const popoverOptions = {
  hideOn: ['popover.mouseleave', 'document.click'],
  showOn: ['trigger.mouseenter'],
};
...
<PopoverjsReact popoverOptions={popoverOptions}>
  <div className="demo-trigger">I am the trigger</div>
  <div className="demo-content">I am the content</div>
</PopoverjsReact>
```
