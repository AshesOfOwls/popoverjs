import { addClass, removeClass } from './utils';

const defaults = {
  constraintParent: null,
  constraints: [{
    popover: 'top right',
    trigger: 'bottom right',
  }, {
    popover: 'bottom center',
    trigger: 'top right',
  }, {
    popover: 'top left',
    trigger: 'bottom left',
  }],
};

class Positioner {
  constructor(options) {
    this.options = Object.assign(defaults, options);

    this.initialize();
  }

  initialize() {
    this.setUpGlobals();
    this.setUpElements();
    this.parseConstraints();
    this.applyDefaultConstraint();
  }

  setUpGlobals() {
    this.origins = {};
    this.cssCache = {};
  }

  setUpElements() {
    this.popoverElement = this.options.popoverElement;
    this.triggerElement = this.options.triggerElement;
    this.popoverContent = this.popoverElement.querySelector('.popoverjs-content');
    this.popoverArrow = this.popoverElement.querySelector('.popoverjs-arrow');
    this.constraintParent = this.getConstraintParent();

    this.cacheCssOffsets();
  }

  cacheCssOffsets() {
    const sizerClasses = [
      'popoverjs--popover-primary-top',
      'popoverjs--popover-secondary-left',
      'popoverjs--trigger-primary-left',
      'popoverjs--trigger-secondary-bottom',
    ];

    this.togglePopoverClasses(sizerClasses, true);

    this.cssCache = {
      arrowSize: Math.abs(this.popoverArrow.clientHeight),
      triggerOffset: Math.abs(this.popoverElement.offsetLeft),
      popoverOffset: Math.abs(this.popoverContent.offsetLeft),
    };

    this.togglePopoverClasses(sizerClasses, false);
  }

  getConstraintParent() {
    const constraintParent = this.options.constraintParent;

    if (!constraintParent) {
      return window;
    }

    return constraintParent;
  }

  parseConstraints() {
    let id = 0;
    this.constraints = this.options.constraints.map((constraint) => {
      const triggerConstraint = constraint.trigger.split(' ');
      const popoverConstraint = constraint.popover.split(' ');

      id += 1;

      return Object.assign({}, constraint, {
        id,
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
    const activeConstraint = this.constraints.find((constraint) => {
      if (this.canFitInto(constraint)) {
        return constraint;
      }

      return false;
    });

    if (!activeConstraint) { return this.getLastConstraint(); }

    return activeConstraint;
  }

  getLastConstraint() {
    return this.constraints[this.constraints.length - 1];
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

    let isOutsideConstraint = this.isConstrainedByPrimary(constraint.trigger.primary);

    if (!isOutsideConstraint) {
      isOutsideConstraint = this.isConstrainedBySecondary(constraint, 'left') ||
        this.isConstrainedBySecondary(constraint, 'right');
    }

    return !isOutsideConstraint;
  }

  isConstrainedByPrimary(side) {
    const originCoordinate = this.origins.trigger[side];
    const popoverSize = this.getPopoverSizeFromSideCheck(side);

    if (side === 'left' || side === 'top') {
      return originCoordinate - popoverSize < this.origins.parent[side];
    }

    return originCoordinate + popoverSize > this.origins.parent[side];
  }

  isConstrainedBySecondary(constraint, sideToCheck) {
    const parentCoord = this.origins.parent[sideToCheck];
    const originCoordinate = this.getOriginPointForConstraint(constraint);
    const popoverSize = this.getPopoverSizeOnConstraintSide(constraint, sideToCheck);

    switch (sideToCheck) {
    case 'top':
    case 'left':
      return originCoordinate - popoverSize < parentCoord;
    default:
      return originCoordinate + popoverSize > parentCoord;
    }
  }

  getPopoverSizeOnConstraintSide(constraint, sideToCheck) {
    if (constraint.popover.secondary === 'center') {
      switch (sideToCheck) {
      case 'right':
      case 'left':
        return this.origins.popover.halfWidth;
      default:
        return this.origins.popover.halfHeight;
      }
    }

    switch (constraint.popover.secondary) {
    case 'right':
    case 'left':
      if (sideToCheck === constraint.popover.secondary) {
        return this.cssCache.popoverOffset;
      }
      return this.origins.popover.width - this.cssCache.popoverOffset;
    default:
      if (sideToCheck === constraint.popover.secondary) {
        return this.cssCache.popoverOffset;
      }
      return this.origins.popover.height - this.cssCache.popoverOffset;
    }
  }

  getOriginPointForConstraint(constraint) {
    if (constraint.trigger.secondary === 'center') {
      switch (constraint.trigger.primary) {
      case 'top':
      case 'bottom':
        return this.origins.trigger.top + this.origins.trigger.halfHeight;
      default:
        return this.origins.trigger.left + this.origins.trigger.halfWidth;
      }
    }

    switch (constraint.trigger.secondary) {
    default:
    case 'left':
      return this.origins.trigger.left + this.cssCache.triggerOffset;
    case 'right':
      return this.origins.trigger.right - this.cssCache.triggerOffset;
    case 'top':
      return this.origins.trigger.top + this.cssCache.triggerOffset;
    case 'bottom':
      return this.origins.trigger.bottom - this.cssCache.triggerOffset;
    }
  }

  getPopoverSizeFromSideCheck(side) {
    const size = this.cssCache.arrowSize;

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
    this.toggleActiveConstraints(true);
  }

  toggleActiveConstraints(isToggled) {
    this.togglePopoverClasses(this.getActiveConstraintClasses(), isToggled);
  }

  activeConstraintIs(constraintObject) {
    if (!this.activeConstraint) { return false; }
    return this.activeConstraint.id === constraintObject.id;
  }

  clearActiveConstraint() {
    if (!this.activeConstraint) { return; }

    this.toggleActiveConstraints(false);
    this.activeConstraint = null;
  }

  togglePopoverClasses(classes, isToggled) {
    const popover = this.popoverElement;
    const method = isToggled ? addClass : removeClass;

    classes.forEach((className) => {
      method(popover, className);
    });
  }

  getActiveConstraintClasses() {
    if (!this.activeConstraint) { return []; }

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
