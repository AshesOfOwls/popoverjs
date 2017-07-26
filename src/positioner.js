import { addClass, removeClass, getElementOrigin, getWindowOrigin } from './utils';

const defaults = {
  attachmentElement: null,
  constraintElement: null,
  constraints: [{
    popover: 'top left',
    trigger: 'bottom right',
  }, {
    popover: 'left top',
    trigger: 'right top',
  }],
};

class Positioner {
  constructor(options) {
    this.options = Object.assign({}, defaults);
    this.options = Object.assign(this.options, options);

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
    this.attachmentElement = this.options.attachmentElement;
    this.popoverElement = this.options.popoverElement;
    this.triggerElement = this.options.triggerElement;
    this.popoverContent = this.popoverElement.querySelector('.popoverjs-content');
    this.popoverArrow = this.popoverElement.querySelector('.popoverjs-arrow');
    this.constraintElement = this.getConstraintParent();

    this.cacheCssOffsets();
  }

  setUpContainer() {
    if (!this.options.bodyAttached) { return; }

    this.createDetachedContainer();
  }

  destroyContainer() {
    if (!this.options.bodyAttached || !this.hasAttachedContainer) { return; }

    this.hasAttachedContainer = false;
    this.originalContainer.appendChild(this.popoverElement);
    document.body.removeChild(this.containerElement);
  }

  createDetachedContainer() {
    if (this.hasAttachedContainer) { return; }

    this.hasAttachedContainer = true;
    this.originalContainer = this.popoverElement.parentElement;
    this.containerElement = document.createElement('div');
    this.containerElement.classList.add('popoverjs--detatched-container');
    this.containerElement.appendChild(this.popoverElement);
    document.body.appendChild(this.containerElement);
  }

  maintainDetachedContainerPosition() {
    if (!this.options.bodyAttached) { return; }

    const attachmentOrigin = this.origins.attachment;

    const origin = {
      height: `${attachmentOrigin.height}px`,
      width: `${attachmentOrigin.width}px`,
      left: `${attachmentOrigin.left}px`,
      top: `${attachmentOrigin.top}px`,
    };

    Object.assign(this.containerElement.style, origin);
  }

  cacheCssOffsets() {
    const sizerClasses = [
      'popoverjs--popover-primary-top',
      'popoverjs--popover-secondary-left',
      'popoverjs--trigger-primary-left',
      'popoverjs--trigger-secondary-top',
    ];

    this.togglePopoverClasses(sizerClasses, true);

    this.cssCache = {
      arrowSize: this.getArrowSize(),
      attachmentOffset: Math.abs(this.popoverElement.offsetTop),
      triggerOffset: Math.abs(this.popoverElement.offsetLeft),
      contentOffset: Math.abs(this.popoverContent.offsetLeft),
    };

    this.togglePopoverClasses(sizerClasses, false);
  }

  getArrowSize() {
    if (!this.popoverArrow) { return 0; }
    return Math.abs(this.popoverArrow.clientHeight);
  }

  getConstraintParent() {
    const constraintElement = this.options.constraintElement;

    if (!constraintElement) {
      return window;
    }

    return constraintElement;
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
    this.refreshAllElementData();
    this.setUpContainer();
    this.position();
  }

  listenForResize() {
    if (!this.options.resizePositioning) { return; }
    window.addEventListener('resize', this.onResize.bind(this));
  }

  destroyListeners() {
    window.removeEventListener('resize', this.onResize.bind(this));
  }

  destroy() {
    this.destroyListeners();
    this.destroyContainer();
  }

  onResize() {
    this.position();
  }

  disable() {
    this.destroy();
  }

  position() {
    this.refreshAllElementData();
    this.maintainDetachedContainerPosition();
    this.checkConstraints();
  }

  checkConstraints() {
    this.applyConstraint(this.getActiveConstraint());
  }

  getActiveConstraint() {
    if (!this.options.unnecessaryRepositioning && this.canFitInto(this.activeConstraint)) {
      return this.activeConstraint;
    }

    const activeConstraint = this.constraints.find((constraint) => {
      if (this.canFitInto(constraint)) { return constraint; }
      return false;
    });

    if (!activeConstraint) { return this.activeConstraint; }

    return activeConstraint;
  }

  refreshAllElementData() {
    this.refreshParentOrigin();
    this.refreshElementOrigins();
  }

  refreshParentOrigin() {
    if (this.constraintElement === window) {
      this.origins.parent = getWindowOrigin();
      return;
    }

    this.origins.parent = getElementOrigin(this.constraintElement);
  }

  refreshElementOrigins() {
    this.origins.popover = getElementOrigin(this.popoverContent);
    this.origins.attachment = getElementOrigin(this.attachmentElement);
  }

  canFitInto(constraint) {
    if (!constraint) { return false; }

    let isOutsideConstraint = this.isConstrainedByPrimary(constraint.trigger.primary);

    if (!isOutsideConstraint) {
      switch (constraint.trigger.primary) {
      case 'top':
      case 'bottom':
        isOutsideConstraint = this.isConstrainedBySecondary(constraint, 'left') ||
          this.isConstrainedBySecondary(constraint, 'right');
        break;
      default:
        isOutsideConstraint = this.isConstrainedBySecondary(constraint, 'bottom') ||
          this.isConstrainedBySecondary(constraint, 'top');
      }
    }

    return !isOutsideConstraint;
  }

  isConstrainedByPrimary(side) {
    const originCoordinate = this.origins.attachment[side];
    const popoverSize = this.getPopoverSizeFromSideCheck(side);

    if (side === 'left' || side === 'top') {
      return originCoordinate - popoverSize <= this.origins.parent[side];
    }

    return originCoordinate + popoverSize >= this.origins.parent[side];
  }

  isConstrainedBySecondary(constraint, sideToCheck) {
    const parentCoord = this.origins.parent[sideToCheck];
    const originCoordinate = this.getOriginPointForConstraint(constraint);
    const popoverSize = this.getPopoverSizeOnConstraintSide(constraint, sideToCheck);

    switch (sideToCheck) {
    case 'top':
    case 'left':
      return originCoordinate - popoverSize <= parentCoord;
    default:
      return originCoordinate + popoverSize >= parentCoord;
    }
  }

  getAttachementOffsetForConstraint(constraint) {
    switch (constraint.popover.secondary) {
    case 'center':
      return 0;
    default:
      return this.cssCache.attachmentOffset;
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
        return this.cssCache.contentOffset;
      }
      return this.origins.popover.width - this.cssCache.contentOffset;
    default:
      if (sideToCheck === constraint.popover.secondary) {
        return this.cssCache.contentOffset;
      }
      return this.origins.popover.height - this.cssCache.contentOffset;
    }
  }

  getOriginPointForConstraint(constraint) {
    if (constraint.trigger.secondary === 'center') {
      switch (constraint.trigger.primary) {
      case 'top':
      case 'bottom':
        return this.origins.attachment.left + this.origins.attachment.halfWidth;
      default:
        return this.origins.attachment.top + this.origins.attachment.halfHeight;
      }
    }

    const attachmentOffset = this.getAttachementOffsetForConstraint(constraint);

    switch (constraint.trigger.secondary) {
    default:
    case 'left':
      return this.origins.attachment.left + this.cssCache.triggerOffset + attachmentOffset;
    case 'right':
      return this.origins.attachment.right - this.cssCache.triggerOffset - attachmentOffset;
    case 'top':
      return this.origins.attachment.top + this.cssCache.triggerOffset + attachmentOffset;
    case 'bottom':
      return this.origins.attachment.bottom - this.cssCache.triggerOffset - attachmentOffset;
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
