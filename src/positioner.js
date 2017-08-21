import { toggleClassesOnElement, getElementOrigin, getWindowOrigin, throttle } from './utils';

const defaults = {
  dynamicWidth: false,
  attachmentElement: null,
  constraintElement: null,
  unnecessaryRepositioning: true,
  scrollPositioning: true,
  applyClassesToAttachment: false,
  constraints: [{
    popover: 'top left',
    attachment: 'bottom right',
  }, {
    popover: 'left center',
    attachment: 'right center',
  }],
};

const sizerClasses = [
  'popoverjs--popover-primary-bottom',
  'popoverjs--popover-secondary-left',
  'popoverjs--attachment-primary-top',
  'popoverjs--attachment-secondary-left',
];

const generateClassesForConstraint = constraint => ([
  `popoverjs--popover-primary-${constraint.popover.primary}`,
  `popoverjs--popover-secondary-${constraint.popover.secondary}`,
  `popoverjs--attachment-primary-${constraint.attachment.primary}`,
  `popoverjs--attachment-secondary-${constraint.attachment.secondary}`,
]);

class Positioner {
  constructor(options) {
    this.options = Object.assign({}, defaults, options);

    this.initialize();
  }

  initialize() {
    this.throttledUpdate = throttle(this.position, 2500, this);

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

    this.resetClasses();
    this.cacheCssOffsets();
    this.updateContentWidth();
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
    this.containerElement.classList.add('popoverjs--detached-container');
    this.containerElement.appendChild(this.popoverElement);
    document.body.appendChild(this.containerElement);
  }

  maintainDetachedContainerPosition() {
    if (!this.options.bodyAttached) { return; }

    const attachmentOrigin = this.origins.attachment;
    const bodyTopOffset = parseInt(window.getComputedStyle(document.body).marginTop, 10);
    const top = attachmentOrigin.top - bodyTopOffset;
    const origin = {
      height: `${attachmentOrigin.height}px`,
      width: `${attachmentOrigin.width}px`,
      left: `${attachmentOrigin.left}px`,
      top: `${top}px`,
    };

    Object.assign(this.containerElement.style, origin);
  }

  cacheCssOffsets() {
    this.togglePopoverClasses(sizerClasses, true);

    this.cssCache = {
      arrowSize: this.getArrowSize(),
      contentSize: this.getContentSize(),
      attachmentOffset: Math.abs(this.popoverElement.offsetTop) - 1,
      triggerOffset: Math.abs(this.popoverElement.offsetLeft),
      contentOffset: Math.abs(this.popoverContent.offsetLeft),
    };

    this.togglePopoverClasses(sizerClasses, false);
  }

  getArrowSize() {
    if (!this.popoverArrow) { return 0; }
    return Math.abs(this.popoverArrow.clientHeight);
  }

  getContentSize() {
    this.popoverContent.style.position = 'fixed';
    const width = this.popoverContent.getBoundingClientRect().width;
    this.popoverContent.style.position = 'absolute';
    return width;
  }

  updateContentWidth() {
    if (!this.options.dynamicWidth) { return; }

    this.popoverContent.style.width = `${this.cssCache.contentSize}px`;
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
      const attachmentConstraint = constraint.attachment.split(' ');
      const popoverConstraint = constraint.popover.split(' ');

      id += 1;

      const parsedConstraint = {
        id,
        attachment: {
          primary: attachmentConstraint[0],
          secondary: attachmentConstraint[1],
          string: constraint.attachment,
        },
        popover: {
          primary: popoverConstraint[0],
          secondary: popoverConstraint[1],
          string: constraint.popover,
        },
      };

      parsedConstraint.classes = generateClassesForConstraint(parsedConstraint);

      return Object.assign({}, constraint, parsedConstraint);
    });
  }

  enable() {
    this.listenForResize();
    this.listenForScroll();
    this.refreshAllElementData();
    this.setUpContainer();
    this.position();
  }

  resetClasses() {
    let className = 'popoverjs';

    if (this.options.customClass) {
      className += ` ${this.options.customClass}`;
    }

    if (this.options.themeClass) {
      className += ` ${this.options.themeClass}`;
    }

    this.popoverElement.className = className;
  }

  listenForResize() {
    if (!this.options.resizePositioning) { return; }
    window.addEventListener('resize', this.onResize.bind(this));
  }

  listenForScroll() {
    if (!this.options.scrollPositioning) { return; }
    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  destroyListeners() {
    window.removeEventListener('resize', this.onResize.bind(this));
  }

  destroy() {
    this.clearActiveConstraint();
    this.destroyListeners();
    this.destroyContainer();
  }

  onResize() {
    this.position();
  }

  onScroll() {
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
    const activeConstraint = this.getActiveConstraint();

    toggleClassesOnElement(this.popoverElement, ['popoverjs--is-constrained'], !activeConstraint);

    if (activeConstraint) {
      this.applyConstraint(activeConstraint);
    }
  }

  getActiveConstraint() {
    if (!this.options.unnecessaryRepositioning && this.canFitInto(this.activeConstraint)) {
      return this.activeConstraint;
    }

    return this.constraints.find((constraint) => {
      if (this.canFitInto(constraint)) { return constraint; }
      return false;
    });
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
    this.origins.body = getElementOrigin(document.body);
  }

  canFitInto(constraint) {
    if (!constraint) { return false; }

    let isOutsideConstraint = this.isConstrainedByPrimary(constraint.attachment.primary);

    if (!isOutsideConstraint) {
      switch (constraint.attachment.primary) {
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
    const originCoordinate = this.origins.attachment[side] + this.cssCache.attachmentOffset;
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
    case 'middle':
    case 'center':
      return 0;
    default:
      return this.cssCache.attachmentOffset;
    }
  }

  getPopoverSizeOnConstraintSide(constraint, sideToCheck) {
    if (['center', 'middle'].includes(constraint.popover.secondary)) {
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
    if (['center', 'middle'].includes(constraint.attachment.secondary)) {
      switch (constraint.attachment.primary) {
      case 'top':
      case 'bottom':
        return this.origins.attachment.left + this.origins.attachment.halfWidth;
      default:
        return this.origins.attachment.top + this.origins.attachment.halfHeight;
      }
    }

    const attachmentOffset = this.getAttachementOffsetForConstraint(constraint);

    switch (constraint.attachment.secondary) {
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
    const constraintClasses = this.activeConstraint.classes;

    this.togglePopoverClasses(constraintClasses, isToggled);

    if (this.options.applyClassesToAttachment) {
      toggleClassesOnElement(this.attachmentElement, constraintClasses, isToggled);
    }
  }

  activeConstraintIs(constraintObject) {
    if (!this.activeConstraint || !constraintObject) { return false; }
    return this.activeConstraint.id === constraintObject.id;
  }

  clearActiveConstraint() {
    if (!this.activeConstraint) { return; }

    this.toggleActiveConstraints(false);
    this.activeConstraint = null;
  }

  togglePopoverClasses(classes, isToggled) {
    toggleClassesOnElement(this.popoverElement, classes, isToggled);
  }
}

export default Positioner;
