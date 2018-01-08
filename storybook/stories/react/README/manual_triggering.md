## Description

Popover.js automatically sets up and destroys the necessary listeners for all events, and will open and close the popover when those events are triggered. It is sometimes necessary to be in more control of what happens when these events fire though, such as if you only want to close the popover under certain conditions (such as a specific button getting pressed).

Enabling `manualTriggering: true` on the popover options will move all logic for opening and closing the popover to the user via callback events. Those callbacks are `onShowEvent` and `onHideEvent` and should be passed in to the popover options hash. Whenever Popover.js has a listener event activated, it will call the corresponding callback. In that callback is where the user can change the state of the popover to hide and show it. See the following example.

## Example

```javascript
import { PopoverjsReact } from 'popover.js';
...
class TestHarness extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  get popoverOptions() {
    return {
      manualTriggering: true,
      showOn: ['trigger.click'],
      hideOn: ['trigger.click', 'document.click'],
      onShowEvent: () => {
        this.setState({ open: true });
      },
      onHideEvent: () => {
        this.setState({ open: false });
      },
    };
  }

  render() {
    return (
      <PopoverjsReact open={this.state.open} popoverOptions={this.popoverOptions}>
        <div>I am the trigger</div>
        <div>I am the content</div>
      </PopoverjsReact>
    );
  }
}
...
```
