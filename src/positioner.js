import documentOffset from 'document-offset';
import { toggleClassesOnElement, getElementOrigin, getWindowOrigin, throttle } from './utils';

const defaults = {
  dynamicWidth: false,
  maintainAttachmentWidth: false,
  attachmentElement: null,
  constraintElement: null,
  unnecessaryRepositioning: true,
  scrollPositioning: true,
  applyClassesToAttachment: false,
  constraints: [{
    popover: 'top right',
    attachment: 'bottom right',
  }, {
    popover: 'left top',
    attachment: 'right center',
  }],
};

const generateSizerClasses = prefix => ([
  `${prefix}--popover-primary-bottom`,
  `${prefix}--popover-secondary-left`,
  `${prefix}--attachment-primary-top`,
  `${prefix}--attachment-secondary-left`,
]);

const generateClassesForConstraint = (prefix, constraint) => ([
  `${prefix}--popover-primary-${constraint.popover.primary}`,
  `${prefix}--popover-secondary-${constraint.popover.secondary}`,
  `${prefix}--attachment-primary-${constraint.attachment.primary}`,
  `${prefix}--attachment-secondary-${constraint.attachment.secondary}`,
]);

const getBodyOffsets = () => {
  const computedBodyStyles = getComputedStyle(document.body);

  return {
    left: parseInt(computedBodyStyles.marginLeft, 10),
    top: parseInt(computedBodyStyles.marginTop, 10),
    right: parseInt(computedBodyStyles.marginRight, 10),
    bottom: parseInt(computedBodyStyles.marginBottom, 10),
  };
};

class Positioner {
  constructor(options) {
    this.generateOptions(options);

    this.initialize();
  }

  generateOptions(options) {
    this.options = Object.assign({}, defaults, options);
    const classPrefix = options.classPrefix;

    Object.assign(this.options.classes, {
      sizer: generateSizerClasses(classPrefix),
    });
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
    this.popoverContent = this.popoverElement.querySelector(`.${this.options.classes.content}`);
    this.popoverArrow = this.popoverElement.querySelector(`.${this.options.classes.arrow}`);
    this.constraintElement = this.getConstraintParent();

    this.resetClasses();
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
    this.containerElement.classList.add(this.options.classes.detachedContainer);
    this.containerElement.appendChild(this.popoverElement);
    document.body.appendChild(this.containerElement);
  }

  maintainDetachedContainerPosition() {
    if (!this.options.bodyAttached) { return; }

    const attachmentOrigin = this.origins.attachment;

    const origin = {
      height: `${attachmentOrigin.height}px`,
      width: `${attachmentOrigin.width}px`,
      left: `${attachmentOrigin.left - this.cssCache.body.left}px`,
      top: `${attachmentOrigin.top - this.cssCache.body.top}px`,
    };

    Object.assign(this.containerElement.style, origin);
  }

  cacheCssOffsets() {
    const sizerClasses = this.options.classes.sizer;

    this.togglePopoverClasses(sizerClasses, true);

    this.cssCache = {
      arrowSize: this.getArrowSize(),
      contentSize: this.getContentSize(),
      primaryOffset: Math.abs(this.popoverElement.offsetTop) - 1,
      secondaryOffset: Math.abs(this.popoverElement.offsetLeft),
      contentOffset: Math.abs(this.popoverContent.offsetLeft),
      body: getBodyOffsets(),
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
    if (this.options.dynamicWidth) {
      this.popoverContent.style.width = `${this.cssCache.contentSize}px`;
    }

    if (this.options.maintainAttachmentWidth) {
      this.popoverContent.style.width = `${this.origins.attachment.width}px`;
    }
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
    const classPrefix = this.options.classPrefix;

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

      parsedConstraint.classes = generateClassesForConstraint(classPrefix, parsedConstraint);

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
    let className = this.options.classPrefix;

    if (this.options.customClass) {
      className += ` ${this.options.customClass}`;
    }

    if (this.options.themeClass) {
      className += ` ${this.options.classes.theme}`;
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

    toggleClassesOnElement(this.popoverElement,
      [this.options.classes.constrained],
      !activeConstraint);

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
    this.updateContentWidth();
  }

  refreshParentOrigin() {
    if (this.constraintElement === window) {
      this.origins.parent = getWindowOrigin();
      return;
    }

    this.origins.parent = getElementOrigin(this.constraintElement);
  }

  refreshElementOrigins() {
    this.origins.attachment = this.getAttachmentOrigin();
    this.origins.popover = getElementOrigin(this.popoverContent);
    this.origins.body = getElementOrigin(document.body);
  }

  getAttachmentOrigin() {
    return Object.assign({},
      getElementOrigin(this.attachmentElement),
      documentOffset(this.attachmentElement));
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
    const originCoordinate = this.origins.attachment[side] + this.cssCache.primaryOffset;
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
      return this.cssCache.primaryOffset;
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

    switch (constraint.attachment.secondary) {
    default:
    case 'left':
      return this.origins.attachment.left + this.cssCache.secondaryOffset;
    case 'right':
      return this.origins.attachment.right - this.cssCache.secondaryOffset;
    case 'top':
      return this.origins.attachment.top + this.cssCache.secondaryOffset;
    case 'bottom':
      return this.origins.attachment.bottom - this.cssCache.secondaryOffset;
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
    console.log("TOGGLE?");
    const constraintClasses = this.activeConstraint.classes;
    console.log("CONSTRAINT CLASSES", constraintClasses);

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
