import Positioner from '../src/positioner/';

let positionerInstance = null;
let popoverElement = null;
let triggerElement = null;

describe('Positioner', () => {
  beforeEach(() => {
    const fixture = `<div class='trigger'></div>
                    <div class='popoverjs'>
                      <div class='popoverjs-arrow'></div>
                      <div class='popoverjs-content'></div>
                    </div>`;

    document.body.insertAdjacentHTML('afterbegin', fixture);

    if (positionerInstance) { positionerInstance.destroy(); }

    const popoverElement = document.getElementsByClassName('popoverjs')[0];
    const triggerElement = document.getElementsByClassName('trigger')[0];

    positionerInstance = new Positioner({
      popoverElement,
      triggerElement
    });
  });

  describe('when setting up', () => {
    beforeEach(() => {
      const fixture = `<div class='trigger'></div>
                      <div class='popoverjs'>
                        <div class='popoverjs-arrow'></div>
                        <div class='popoverjs-content'></div>
                      </div>`;

      document.body.insertAdjacentHTML('afterbegin', fixture);

      if (positionerInstance) { positionerInstance.destroy(); }

      popoverElement = document.getElementsByClassName('popoverjs')[0];
      triggerElement = document.getElementsByClassName('trigger')[0];
    });

    it('should parse constraints', () => {
      positionerInstance = new Positioner({
        popoverElement,
        triggerElement,
        constraints: [{
          popover: 'top center',
          trigger: 'bottom center',
        }, {
          popover: 'left top',
          trigger: 'right bottom',
        }, {
          popover: 'bottom center',
          trigger: 'top center',
        }]
      });

      expect(positionerInstance.constraints).toEqual([{
        popover: {
          primary: 'top',
          secondary: 'center',
          string: 'top center',
        },
        trigger: {
          primary: 'bottom',
          secondary: 'center',
          string: 'bottom center',
        },
      }, {
        popover: {
          primary: 'left',
          secondary: 'top',
          string: 'left top',
        },
        trigger: {
          primary: 'right',
          secondary: 'bottom',
          string: 'right bottom',
        },
      }, {
        popover: {
          primary: 'bottom',
          secondary: 'center',
          string: 'bottom center',
        },
        trigger: {
          primary: 'top',
          secondary: 'center',
          string: 'top center',
        },
      }]);
    });
  });
});
