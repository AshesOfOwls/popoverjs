# PopoverJs

CSS focused popover system. Create static popovers without the need for javascript, or utilize our plugin for dynamically changing popover locations around another element.

## NEW: Check out our storybook examples!

`git clone git@github.com:AshesOfOwls/popoverjs.git`
`cd popoverjs/storybook`
`npm run storybook`

Each story has a README tab at the bottom to explain functionality further.

## How it Works

Popovers have been a bane of existence for a lot of developers. Without any native solutions in HTML for implementing them, developers have resorted to using Javascript for the placement of popovers on a page. This can be fragile as the logic becomes more complex and difficult to maintain.

With the use of some clever CSS we can avoid most of these complications though, and enable us to use static popovers without the need for Javascript. To begin understanding we need to discuss what a popover is. In my definition, it is a element which exists above most other elements, which is positioned in a way which makes it look attached to another element.

Now that we have an idea of what a popover is, lets see how we can recreate that in just CSS. Lets start with a wrapper element that contains a 1x1 dot element.

```CSS
.wrapper {
  height: 100px;
  position: relative;
  width: 100px;
}

.dot {
  height: 1px;
  position absolute;
  width: 1px;
}
```

```HTML
<div class="wrapper">
  <div class="dot">
  </div>
</div>
```

Now imagine the dot element is the only thing in the popover that we have to worry about moving. Things become a little easier, as we can just add some rules and now we will have CSS classes that can move our dot around its wrapper element in four different positions...

```CSS
.dot--bottom { bottom: -1px; }
.dot--left { left: -1px; }
.dot--right { right: -1px; }
.dot--top { top: -1px; }
```

This is pretty simple CSS so far, the dot can now have these classes added and it will appear in either the top, left, bottom, or right side of it's wrapping element. (NOTE: Wrapped element is `position: relative` while the dot is `position: absolute`).

Now that we have an element floating around another div, we can keep the dot as a 1x1 pixel and just offset a child element which will contain the content of the popover. Every time the dot is in a new position, we will also assign it a class which controls the offset of that content. This is the entirety of the Popoverjs CSS system and it is what powers the positioning of all elements.

Static popovers do not solve all of our problems though, we still need a positioning system which can determine when an element is outside of constraints and to adjust its position accordingly. This positioning system is however much less complex than previous iterations of popover systems. Instead of having to manually position the popover everywhere, it just measures if the popover will exist outside of the constraints provided and adjust CSS classes if necessary.

### How to install

`npm install popover.js`

### Example

```html
<div class="triggerElement">
  I trigger the popover to open.
</div>
<div class="attachmentElement">
  The popover will flow around my border.
</div>
<div class="popoverjs">
  <div class="popoverjs-arrow"></div>
  <div class="popoverjs-content">
    I am the popover content.
  </div>
</div>
```

```javascript
import Popoverjs from 'popoverjs';

myPopover = new Popoverjs({
  popoverElement: document.querySelector('.popoverjs'),
  attachmentElement: document.querySelector('.attachmentElement'),
  triggerElement: document.querySelector('.triggerElement'),
  constraints: [{
    popover: 'top left',
    attachment: 'bottom center',
  }, {
    popover: 'left center',
    attachment: 'right top',
  }],
})
```

# API

## Required

#### popoverElement

The popoverjs element.

| Type | Default | Values |
| --- |:---|---|
| DOM node | null | DOM node |

#### attachmentElement

The element which the popover floats around.

| Type | Default | Values |
| --- |:---|---|
| DOM node | null | DOM node |

## Optional

#### triggerElement

The element which has listeners set up for rendering/showing the popover.

| Type | Default | Values |
| --- |:---|---|
| DOM node | attachmentElement | DOM node |

#### constraints

Constraints are an array of objects which tell the popover how to flow around its attachment. The positioning system will loop over the constraints array to find the first position where it can exist in and style the popover accordingly. Here is an example of a constraints array:

```
[{
  popover: "top left",
  attachment: "bottom center",
}, {
  popover: "top left",
  attachment: "bottom center",
}]
```

Each object must have a `popover` and `attachment` key. The values are a string which determine the popover / attachment positioning for that constraint. For instance, the first object will style the popover with an arrow in its `top left`, and have that arrow point to the `bottom center` of the attachment element. If the popover cannot exist in this position, then it will move on through the constraints array until it finds an acceptable spot.

| Type | Default | Values |
| --- |:---|---|
| Array of Objects | See positioner.js | Array of Constraint Objects |

#### unnecessaryRepositioning

This popover system utilizes the constraints array to determine the positioning of the popover. When looping over this list, the popover system will always choose the lowest index constraint object that allows for the popover to exist in. This can have unintended consequences where the popover will try to reposition itself to a constraint object, despite the current popover position being completely fine. This `unnecessaryRepositioning` option, when set to true, will always position to the popover to fit within the lowest index constraint. If set to false, it will always stay in the latest constraint that it fit within to until that spot no longer is viable.

| Type | Default | Values |
| --- |:---|---|
| Boolean | false | true \ false |

#### showOn

This is used by the renderer to determine when to show the popover. If set to null, it will not set up any listeners for showing the popover.

Here is an example:

`showOn: ['trigger.click']`

This array of strings determines which elements and what events are tied to rendering/showing the popover. Each string is represented by two parts, the `element` and the `event`, each separated by a `.` (dot). Every time the event is detected on the element provided, it will try to show the popover. This array can have as many element/event pairs as you would like.

**Available Elements:**
`trigger`, `attachment`, `popover`, `document`

**Events:**
Any native HTML event names. (e.g. `mouseleave`, `click`)

| Type | Default | Values |
| --- |:---|---|
| Array of Strings | `['trigger.click']` | Array of Strings |

#### hideOn

This is used by the renderer to determine when to show the popover. If set to null, it will not set up any listeners for hiding the popover.

Here is an example:

`hideOn: ['document.click']`

This array of strings determines which elements and what events are tied to hiding the popover. Each string is represented by two parts, the `element` and the `event`, each separated by a `.` (dot). Every time the event is detected on the element provided, it will try to hide the popover. This array can have as many element/event pairs as you would like.

**Available Elements:**
`trigger`, `attachment`, `popover`, `document`

**Events:**
Any native HTML event names. (e.g. `mouseleave`, `click`)

| Type | Default | Values |
| --- |:---|---|
| Array of Strings | `['document.click', 'popover.mouseleave']` | Array of Strings |

#### resizePositioning

If set to true, will try to reposition the popover every time the Document is resized.

| Type | Default | Values |
| --- |:---|---|
| Boolean | true | true \ false |

#### scrollPositioning

If set to true, will try to reposition the popover every time the scroll parent is scrolled.

| Type | Default | Values |
| --- |:---|---|
| Boolean | true | true \ false |

#### applyClassesToAttachment

Applies all of the constraint classes to the attachment element for more specific styling.

| Type | Default | Values |
| --- |:---|---|
| Boolean | false | true \ false |

#### dynamicWidth

If set to true, will set the width of the popover element to the width of contained content.

| Type | Default | Values |
| --- |:---|---|
| Boolean | false | true \ false |

#### showDelay

Delay a certain amount of milliseconds prior to showing the popover.

| Type | Default | Values |
| --- |:---|---|
| Integer | 0 | Integer |

#### hideDelay

Delay a certain amount of milliseconds prior to hiding the popover.

| Type | Default | Values |
| --- |:---|---|
| Integer | 0 | Integer |

#### themeClass

Applies this class to the popover element for theming purposes.

| Type | Default | Values |
| --- |:---|---|
| String | null | String |

## Callbacks

#### onBeforeShow

Gets called immediately prior to showing the popover.

#### onAfterShow

Gets called immediately after showing the popover.

#### onBeforeHide

Gets called immediately prior to hiding the popover.

#### onAfterHide

Gets called immediately after hiding the popover.
