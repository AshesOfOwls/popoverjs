# PopoverJs

CSS focused popover system. Create static popovers without the need for javascript, or utilize our plugin for dynamically changing popover locations around another element.

## How it Works

Popovers have been a bane of existance for a lot of developers. Without any native solutions in HTML for implementing them, developers have resorted to using Javascript for the placement of popovers on a page. This can be fragile as the logic becomes more complex and difficult to maintain.

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

`npm install popoverjs`

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

### API

* popoverElement
The element which the popover
* attachmentElement
* triggerElement
* showOn
* hideOn
*
* Constraints
Constraints are an array of objects which determine the positioning of the popover element. For example,

```javascript
  [{

  }]
```
