class Positioner {
  constructor(options) {
    this.options = options;
    this.origins = {};

    this.initialize();
  }

  initialize() {
    this.setUpElements();
    this.parseConstraints();
    this.applyDefaultConstraint();
  }

  setUpElements() {
    this.popoverElement = this.options.popoverElement;
    this.triggerElement = this.options.triggerElement;
    this.popoverContent = this.getPopoverContentElement();
    this.popoverArrow = this.getPopoverArrowElement();
    this.constraintParent = this.getConstraintParent();

    this.setArrowSize();
  }

  getPopoverArrowElement() {
    return this.popoverElement.querySelector('.popoverjs-arrow');
  }

  getPopoverContentElement() {
    return this.popoverElement.querySelector('.popoverjs-content');
  }

  getConstraintParent() {
    const constrainedBy = this.options.constrainedBy;

    if (!constrainedBy) {
      return window;
    }

    return constrainedBy;
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
    this.checkConstraints();
  }

  checkConstraints() {
    this.refreshAllElementData();

    this.constraints.every((constraint = {}) => {
      if (this.canFitInto(constraint)) {
        this.applyConstraint(constraint);
        return false;
      }
      return true;
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

  setHalfPointsOnOrigin(origin) {
    const halfHeight = origin.height / 2;
    const halfWidth = origin.width / 2;

    return Object.assign(origin, {
      halfHeight,
      halfWidth,
      vertical_center: origin.top + halfHeight,
      horizontal_center: origin.left + halfWidth,
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
    this.applyConstraintClasses(constraintObject);
  }

  applyConstraintClasses(constraintObject) {
    if (this.activeConstraintIs(constraintObject)) { return; }

    this.clearActiveConstraint();

    this.activeConstraint = constraintObject;
    this.activeConstraintString = JSON.stringify(constraintObject);

    this.getActiveConstraintClasses().forEach(this.addPopoverClass.bind(this));
  }

  addPopoverClass(className) {
    this.options.popoverElement.classList.add(className);
  }

  removePopoverClass(className) {
    this.options.popoverElement.classList.remove(className);
  }

  activeConstraintIs(constraintObject) {
    return this.activeConstraintString === JSON.stringify(constraintObject);
  }

  clearActiveConstraint() {
    if (!this.activeConstraint) { return; }

    this.getActiveConstraintClasses().forEach(this.removePopoverClass.bind(this));

    this.activeConstraint = null;
    this.activeConstraintString = null;
  }

  getActiveConstraintClasses() {
    const popoverAnchors = this.activeConstraint.popover;
    const triggerAnchors = this.activeConstraint.trigger;

    return [
      `popoverjs--anchor-primary-${popoverAnchors.primary}`,
      `popoverjs--anchor-secondary-${popoverAnchors.secondary}`,
      `popoverjs--trigger-primary-${triggerAnchors.primary}`,
      `popoverjs--trigger-secondary-${triggerAnchors.secondary}`,
    ];
  }

  setArrowSize() {
    this.addPopoverClass('popoverjs--anchor-primary-top');
    this.arrowSize = this.popoverArrow.clientHeight;
    this.removePopoverClass('popoverjs--anchor-primary-top');
  }

  parseConstraints() {
    this.constraint_growths = [];

    this.constraints = this.options.constraints.map((constraint) => {
      const triggerConstraint = constraint.trigger.split(' ');
      const popoverConstraint = constraint.popover.split(' ');

      this.constraint_growths.push(constraint.growth);

      const obj = Object.assign({}, constraint, {
        margin: 0,
      }, {
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

      return obj;
    });
  }
}

export default Positioner;
