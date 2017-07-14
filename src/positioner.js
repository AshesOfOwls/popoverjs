class Positioner {
  constructor(options) {
    this.options = options;

    this.initialize();
  }

  initialize() {
    this.parseConstraints();
  }

  parseConstraints() {
    this.constraint_growths = [];

    this.constraints = this.options.constraints.map((constraint) => {
      const triggerConstraint = constraint.trigger.split(' ');
      const popoverConstraint = constraint.popover.split(' ');

      this.constraint_growths.push(constraint.growth);

      return Object.assign({}, {
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
      }, constraint, {
        margin: 0,
      });
    });
  }
}

export default Positioner;
