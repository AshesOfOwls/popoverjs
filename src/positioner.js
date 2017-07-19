import { addClass, removeClass } from './utils';

const defaults = {
  constraintParent: null,
  constraints: [{
    popover: 'top center',
    trigger: 'bottom center',
  }, {
    popover: 'bottom center',
    trigger: 'top center',
  }],
};

class Positioner {
  constructor(options) {
    this.options = Object.assign(defaults, options);
    this.origins = {};

    this.initialize();
  }

  initialize() {
    this.setUpElements();
    this.parseConstraints();
    this.applyDefaultConstraint();
  }

  // TESTED
  setUpElements() {
    this.popoverElement = this.options.popoverElement;
    this.triggerElement = this.options.triggerElement;
    this.popoverContent = this.popoverElement.querySelector('.popoverjs-content');
    this.popoverArrow = this.popoverElement.querySelector('.popoverjs-arrow');
    this.constraintParent = this.getConstraintParent();

    this.setArrowSize();
  }

  // TESTED
  setArrowSize() {
    addClass(this.popoverElement, 'popoverjs--popover-primary-top');
    this.arrowSize = this.popoverArrow.clientHeight;
    removeClass(this.popoverElement, 'popoverjs--popover-primary-top');
  }

  // TESTED
  getConstraintParent() {
    const constraintParent = this.options.constraintParent;

    if (!constraintParent) {
      return window;
    }

    return constraintParent;
  }

  // TESTED
  parseConstraints() {
    this.constraints = this.options.constraints.map((constraint) => {
      const triggerConstraint = constraint.trigger.split(' ');
      const popoverConstraint = constraint.popover.split(' ');

      return Object.assign({}, constraint, {
        trigger: {
          primary: triggerConstraint[0],
          secondary: triggerConstraint[1],
          string: constraint.trigger,
        },
        popover: {
          primary: popoverConstraint[0],
          secondary: popoverConstraint[1],
          string: constraint.popover,
        },
      });
    });
  }

  // TESTED
  enable() {
    this.listenForResize();
    this.position();
  }

  listenForResize() {
    window.addEventListener('resize', this.onResize.bind(this));
  }

  destroyListeners() {
    window.removeEventListener('resize', this.onResize.bind(this));
  }

  destroy() {
    this.destroyListeners();
  }

  onResize() {
    this.position();
  }

  disable() {
    this.destroyListeners();
  }

  position() {
    this.refreshAllElementData();
    this.checkConstraints();
  }

  checkConstraints() {
    this.applyConstraint(this.getActiveConstraint());
  }

  getActiveConstraint() {
    return this.constraints.find((constraint) => {
      if (this.canFitInto(constraint)) {
        return constraint;
      }

      return false;
    });
  }

  refreshAllElementData() {
    this.refreshParentOrigin();
    this.refreshElementOrigins();
  }

  refreshParentOrigin() {
    if (this.constraintParent === window) {
      this.origins.parent = this.getWindowOrigin();
      return;
    }

    this.origins.parent = this.getElementOrigin(this.constraintParent);
  }

  getWindowOrigin() {
    const height = window.innerHeight;
    const width = window.innerWidth;

    const origin = {
      bottom: height,
      height,
      left: 0,
      right: width,
      top: 0,
      width,
    };

    return this.setHalfPointsOnOrigin(origin);
  }

  refreshElementOrigins() {
    this.origins.popover = this.getElementOrigin(this.popoverContent);
    this.origins.trigger = this.getElementOrigin(this.triggerElement);
  }

  getElementOrigin(element) {
    const origin = element.getBoundingClientRect();

    return this.setHalfPointsOnOrigin(origin);
  }

  // TESTED
  setHalfPointsOnOrigin(origin) {
    const halfHeight = origin.height / 2;
    const halfWidth = origin.width / 2;

    return Object.assign(origin, {
      halfHeight,
      halfWidth,
      verticalCenter: origin.top + halfHeight,
      horizontalCenter: origin.left + halfWidth,
    });
  }

  canFitInto(constraint) {
    if (!constraint) { return false; }

    let isOutsideConstraint = this.isConstrainedBySide(constraint.trigger.primary);

    if (!isOutsideConstraint) {
      isOutsideConstraint = this.isConstrainedBySide(constraint.trigger.primary);
    }

    return !isOutsideConstraint;
  }

  isConstrainedBySide(side) {
    const originCoordinate = this.origins.trigger[side];
    const popoverSize = this.getPopoverSizeFromSide(side);

    if (side === 'left' || side === 'top') {
      return originCoordinate - popoverSize < this.origins.parent[side];
    }

    return originCoordinate + popoverSize > this.origins.parent[side];
  }

  getPopoverSizeFromSide(side) {
    const size = this.arrowSize;

    if (side === 'top' || side === 'bottom') {
      return this.origins.popover.height + size;
    }

    return this.origins.popover.width + size;
  }

  applyDefaultConstraint() {
    const defaultConstraint = this.constraints[0];
    this.applyConstraint(defaultConstraint);
  }

  applyConstraint(constraintObject) {
    if (this.activeConstraintIs(constraintObject)) { return; }

    this.clearActiveConstraint();

    this.activeConstraint = constraintObject;
    this.activeConstraintString = JSON.stringify(constraintObject);

    this.toggleActiveConstraintClasses(true);
  }

  activeConstraintIs(constraintObject) {
    return this.activeConstraintString === JSON.stringify(constraintObject);
  }

  clearActiveConstraint() {
    if (!this.activeConstraint) { return; }

    this.toggleActiveConstraintClasses(false);

    this.activeConstraint = null;
    this.activeConstraintString = null;
  }

  toggleActiveConstraintClasses(isToggled) {
    const popover = this.popoverElement;
    const method = isToggled ? addClass : removeClass;

    this.getActiveConstraintClasses().forEach((className) => {
      method(popover, className);
    });
  }

  getActiveConstraintClasses() {
    const popoverAnchors = this.activeConstraint.popover;
    const triggerAnchors = this.activeConstraint.trigger;

    return [
      `popoverjs--popover-primary-${popoverAnchors.primary}`,
      `popoverjs--popover-secondary-${popoverAnchors.secondary}`,
      `popoverjs--trigger-primary-${triggerAnchors.primary}`,
      `popoverjs--trigger-secondary-${triggerAnchors.secondary}`,
    ];
  }
}

export default Positioner;
