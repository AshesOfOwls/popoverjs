import Positioner from '../src/positioner';

let instance = null;
let popoverElement = null;
let triggerElement = null;
let parentElement = null;
let attachmentElement = null;
let popoverArrow = null;
let popoverContent = null;
const arrowSize = 8;
const popoverHeight = 200;
const popoverWidth = 100;
const popoverHeightFull = popoverHeight + arrowSize;
const popoverWidthFull = popoverWidth + arrowSize;

const cleanup = () => {
  if (instance) {
    instance.destroy();
    instance = null;
  }
};

const getCleanRect = (element) => {
  const rect = element.getBoundingClientRect();

  return {
    top: rect.top,
    left: rect.left,
    height: rect.height,
    width: rect.width,
  };
};

describe('Positioner', () => {
  beforeEach(() => {
    cleanup();

    const fixture = `<div class='trigger'></div>
                    <div class="popoverjs--wrapper" style="position: relative;">
                      <div class='attachmentElement' style="height: 200px; width: 300px;"></div>
                      <div class='popoverjs'>
                        <div class='popoverjs-arrow' style='height: ${arrowSize}px; width: 20px;'></div>
                        <div class='popoverjs-content'></div>
                      </div>
                    </div>`;


    document.body.insertAdjacentHTML('afterbegin', fixture);
    document.body.style.position = 'relative';

    parentElement = document.getElementsByClassName('popoverjs--wrapper')[0];
    triggerElement = document.getElementsByClassName('trigger')[0];
    attachmentElement = parentElement.getElementsByClassName('attachmentElement')[0];
    popoverElement = parentElement.getElementsByClassName('popoverjs')[0];
    popoverArrow = popoverElement.getElementsByClassName('popoverjs-arrow')[0];
    popoverContent = popoverElement.getElementsByClassName('popoverjs-content')[0];
  });

  describe('when setting up', () => {
    beforeEach(() => {
      cleanup();
    });

    it('should correctly parse constraints array', () => {
      const constraints = [{
        popover: 'top left',
        attachment: 'left middle',
      }, {
        popover: 'bottom right',
        attachment: 'top center',
      }];

      instance = new Positioner({
        popoverElement,
        attachmentElement,
        constraints,
      });

      instance.constraints.forEach((parsedConstraint, index) => {
        const attachmentConstraints = constraints[index].attachment.split(' ');
        const popoverConstraints = constraints[index].popover.split(' ');

        expect(parsedConstraint).toEqual({
          id: index + 1,
          popover: {
            primary: popoverConstraints[0],
            secondary: popoverConstraints[1],
            string: constraints[index].popover,
          },
          attachment: {
            primary: attachmentConstraints[0],
            secondary: attachmentConstraints[1],
            string: constraints[index].attachment,
          },
          classes: [
            `popoverjs--popover-primary-${popoverConstraints[0]}`,
            `popoverjs--popover-secondary-${popoverConstraints[1]}`,
            `popoverjs--attachment-primary-${attachmentConstraints[0]}`,
            `popoverjs--attachment-secondary-${attachmentConstraints[1]}`,
          ],
        });
      });
    });

    it('should cache css offset values', () => {
      instance = new Positioner({
        popoverElement,
        attachmentElement,
      });

      expect(instance.cssCache).toEqual({
        arrowSize: 8,
        contentSize: 0,
        primaryOffset: 2,
        secondaryOffset: 16,
        contentOffset: 18,
        body: {
          top: 8,
          right: 8,
          left: 8,
          bottom: 8,
        },
      });
    });

    it('should retrieve the correct elements', () => {
      instance = new Positioner({
        popoverElement,
        attachmentElement,
      });

      expect(instance.attachmentElement.isSameNode(attachmentElement)).toEqual(true);
      expect(instance.popoverElement.isSameNode(popoverElement)).toEqual(true);
      expect(instance.popoverContent.isSameNode(popoverContent)).toEqual(true);
      expect(instance.popoverArrow.isSameNode(popoverArrow)).toEqual(true);
    });

    it('should apply the custom class option to the popover element', () => {
      instance = new Positioner({
        popoverElement,
        attachmentElement,
        customClass: 'aCustomClass',
      });

      expect(instance.popoverElement.classList.contains('aCustomClass')).toEqual(true);
    });

    it('should apply the theme class option to the popover element', () => {
      instance = new Positioner({
        popoverElement,
        attachmentElement,
        themeClass: 'aThemeClass',
      });

      expect(instance.popoverElement.classList.contains('popoverjs--aThemeClass')).toEqual(true);
    });

    it('should keep the popover in place if not body attached', () => {
      instance = new Positioner({
        popoverElement,
        attachmentElement,
        bodyAttached: false,
      });

      expect(instance.popoverElement.parentElement.isSameNode(parentElement)).toEqual(true);
    });

    describe('when body attached', () => {
      beforeEach(() => {
        instance = new Positioner({
          popoverElement,
          attachmentElement,
          bodyAttached: true,
        });

        instance.enable();
      });

      it('should move the popover to the body if body attached', () => {
        expect(instance.popoverElement.parentElement.classList.contains('popoverjs--detached-container')).toEqual(true);
        expect(instance.popoverElement.parentElement.isSameNode(parentElement)).toEqual(false);
        expect(instance.popoverElement.parentElement.parentElement.isSameNode(document.body)).toEqual(true);
      });

      it('should maintain the detached container position with the attachment element attributes', () => {
        instance.position();
        instance.maintainDetachedContainerPosition();
        const bodyTopOffset = parseInt(window.getComputedStyle(document.body).marginTop, 10);

        const attachmentRect = getCleanRect(instance.attachmentElement);
        const containerRect = getCleanRect(instance.containerElement);

        expect(attachmentRect).toEqual(containerRect);
      })

      it('should remove the popover from the body and place it back on destroy', () => {
        instance.disable();

        expect(instance.popoverElement.parentElement.isSameNode(parentElement)).toEqual(true);
      });
    });
  });
});
