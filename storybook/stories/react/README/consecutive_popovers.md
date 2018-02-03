## Description

Consecutive popovers easy to make when using state. Just place as many popovers inside the content as you want and use their open state to control the visibility. These popovers do NOT need a trigger element, instead they can just take the content element for the popover as the first child node. When the popover element is placed inside a `relative` positioned parent, it will automatically adjust itself to the correct sizing and positioning.

## Example

```javascript
import { PopoverjsReact } from 'popover.js';
...
class TestHarness extends Component {
  constructor(props) {
    super(props);

    this.state = {
      popoverOneOpen: true,
      popoverTwo: false,
    };
  }

  togglePopovers() {
    this.setState({
      popoverOneOpen: !this.state.popoverOneOpen,
      popoverTwoOpen: !this.state.popoverTwoOpen,
    })
  }

  get popoverOptions() {
    return {
      manualTriggering: true,
      showOn: ['trigger.click'],
      hideOn: ['trigger.click', 'document.click'],
    };
  }

  render() {
    return (
      <div>
        <div className="demo-trigger" onClick={this.togglePopovers.bind(this)}>
          I am the trigger
          <PopoverjsReact open={this.state.popoverOneOpen} popoverOptions={this.popoverOptions}>
            <div className="demo-content">Popover 1</div>
          </PopoverjsReact>
          <PopoverjsReact open={this.state.popoverTwoOpen} popoverOptions={this.popoverOptions}>
            <div className="demo-content">Popover 2</div>
          </PopoverjsReact>
        </div>
      </div>
    );
  }
}
...
```
