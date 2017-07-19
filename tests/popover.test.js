import Positioner from '../src/positioner/';

let positionerInstance = null;
let popoverElement = null;
let triggerElement = null;
let arrowElement = null;
let contentElement = null;
let constraintElement = null;

const cleanup = () => {
  if (positionerInstance) {
    positionerInstance.destroy();
    positionerInstance = null;
  }
};

describe('Positioner', () => {
  beforeEach(() => {
    cleanup();

    const fixture = `<div class='constraintParent'></div>
                    <div class='trigger'></div>
                    <div class='popoverjs'>
                      <div class='popoverjs-arrow' style='height: 8px; width: 20px;'></div>
                      <div class='popoverjs-content'></div>
                    </div>`;

    document.body.insertAdjacentHTML('afterbegin', fixture);

    popoverElement = document.getElementsByClassName('popoverjs')[0];
    triggerElement = document.getElementsByClassName('trigger')[0];
  });

  describe('when setting up', () => {
    beforeEach(() => {
      cleanup()

      arrowElement = document.getElementsByClassName('popoverjs-arrow')[0];
      contentElement = document.getElementsByClassName('popoverjs-content')[0];
      constraintElement = document.getElementsByClassName('constraintParent')[0];
    });

    it('should retrieve the correct elements', () => {
      positionerInstance = new Positioner({
        popoverElement,
        triggerElement,
        constraintParent: constraintElement,
      });

      expect(positionerInstance.triggerElement).toEqual(triggerElement);
      expect(positionerInstance.popoverElement).toEqual(popoverElement);
      expect(positionerInstance.popoverContent).toEqual(contentElement);
      expect(positionerInstance.popoverArrow).toEqual(arrowElement);
      expect(positionerInstance.constraintParent).toEqual(constraintElement);
    });

    it('should default to window constraint parent', () => {
      positionerInstance = new Positioner({
        popoverElement,
        triggerElement,
        constraintParent: null,
      });

      expect(positionerInstance.constraintParent).toEqual(window);
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
        }],
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

    it('should determine the arrow size correctly', () => {
      positionerInstance = new Positioner({
        popoverElement,
        triggerElement,
      });

      expect(positionerInstance.arrowSize).toEqual(8);
    });

    it('should determine the arrow size correctly', () => {
      positionerInstance = new Positioner({
        popoverElement,
        triggerElement,
      });

      positionerInstance.refreshParentOrigin();

      expect(positionerInstance.arrowSize).toEqual(8);
    });
  });
});
