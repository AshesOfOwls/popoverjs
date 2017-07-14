class Positioner {
  constructor(options) {
    this.options = options;

    this.initialize();
  }

  initialize() {
    this.parseConstraints();
    this.applyDefaultConstraint();
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

    console.log("Constraint will be", constraintObject);

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
