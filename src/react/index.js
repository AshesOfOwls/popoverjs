import React, { Component } from 'react';
import classnames from 'classnames';

import {
  findDOMNode,
  unstable_renderSubtreeIntoContainer as renderSubtreeIntoContainer,
} from 'react-dom';

import { bool, node, object, string } from 'prop-types';

import Popoverjs from '../popover';

export default class Popover extends Component {
  static propTypes = {
    children: node,
    disabled: bool,
    open: bool,
    options: object,
    popoverOptions: object,
    themeClass: string,
  }

  static defaultProps = {
    children: null,
    disabled: false,
    open: false,
    options: {},
    popoverOptions: {},
    themeClass: 'dark',
  }

  constructor(props) {
    super(props);

    this.state = {
      popoverIsOpen: false,
    };

    this.update = this.update.bind(this);
  }

  componentDidMount() {
    this.mounted = true;
    this.open = false;
    this.targetNode = findDOMNode(this);
    this.createPopover();
  }

  componentDidUpdate() {
    this.update();
  }

  componentWillUnmount() {
    this.mounted = false;
    this.destroy();
  }

  onHideEvent() {
    this.setState({ popoverIsOpen: false });

    if (this.props.popoverOptions.onHideEvent) {
      this.props.popoverOptions.onHideEvent();
    }
  }

  onShowEvent() {
    this.setState({ popoverIsOpen: true });

    if (this.props.popoverOptions.onShowEvent) {
      this.props.popoverOptions.onShowEvent();
    }
  }

  get popoverOptions() {
    const options = {
      attachmentElement: this.attachmentElement,
      triggerElement: this.attachmentElement,
      popoverElement: this.popoverElement,
      ...this.props.popoverOptions,
      ...this.props.options,
      onHideEvent: this.onHideEvent.bind(this),
      onShowEvent: this.onShowEvent.bind(this),
    };

    if (this.props.themeClass) {
      const themeClass = this.props.themeClass;
      options.customClass += ` ${themeClass}`;
    }

    return options;
  }

  get popoverElement() {
    if (this.targetNode) {
      return this.popoverElementNode;
    }
    this.targetNode = findDOMNode(this);
    if (this.targetNode) {
      return this.popoverElementNode;
    }
    return undefined;
  }

  get attachmentElement() {
    if (this.isWithoutTrigger) {
      return this.targetNode.parentElement;
    }

    return this.targetNode.children[0];
  }

  get triggerContent() {
    return this.props.children[0];
  }

  get isWithoutTrigger() {
    return !this.props.children[1];
  }

  get popoverElementNode() {
    return this.targetNode.children[1] || this.targetNode.children[0];
  }

  get popoverChildNode() {
    return this.props.children[1] || this.props.children;
  }

  update() {
    if (this.mounted && this.popoverjs) {
      renderSubtreeIntoContainer(this, this.popoverChildNode, this.popoverContentElement, () => {
        this.updatePopover();
      });
    }
  }

  destroy() {
    if (!this.popoverjs) { return; }

    this.popoverjs.destroy();
  }

  updatePopover() {
    if (this.props.disabled) {
      if (this.popoverjs) this.popoverjs.destroy();
      return;
    } else if (!this.popoverjs) {
      this.createPopover();
    }

    if (this.props.open !== this.open) {
      this.togglePopover(this.props.open);
    } else if (this.props.open) {
      this.popoverjs.update();
    }
  }

  togglePopover(isOpen) {
    this.open = isOpen;
    this.popoverjs.toggle(isOpen);
  }

  createPopover() {
    const element = this.popoverElement;
    if (element) {
      this.popoverContentElement = element.children[1];
      if (this.props.disabled) { return; }
      this.popoverjs = new Popoverjs(this.popoverOptions);

      this.togglePopover(this.props.open);
      this.update();
    }
  }

  render() {
    return (
      <div className={classnames('popoverjs--wrapper', { 'popoverjs--expanded-wrapper': this.isWithoutTrigger })}>
        { this.triggerContent }

        <div className="popoverjs">
          <div className="popoverjs-arrow" />
          <div className="popoverjs-content" />
        </div>
      </div>
    );
  }
}
