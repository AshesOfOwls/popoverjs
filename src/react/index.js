import React, { Component } from 'react';

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

    this.update = this.update.bind(this);
  }

  componentDidMount() {
    this.mounted = true;
    this.open = false;
    this.targetNode = findDOMNode(this);
    this.createPopover();
    this.update();
  }

  componentDidUpdate() {
    this.update();
  }

  componentWillUnmount() {
    this.mounted = false;
    this.destroy();
  }

  get popoverOptions() {
    const options = {
      attachmentElement: this.attachmentElement,
      triggerElement: this.attachmentElement,
      popoverElement: this.popoverElement,
      ...this.props.popoverOptions,
      ...this.props.options,
    };

    if (this.props.themeClass) {
      const themeClass = this.props.themeClass;
      options.customClass += ` ${themeClass}`;
    }

    return options;
  }

  get popoverElement() {
    if (this.targetNode) {
      return this.targetNode.children[1];
    }
    this.targetNode = findDOMNode(this);
    if (this.targetNode) {
      return this.targetNode.children[1];
    }
    return undefined;
  }

  get attachmentElement() {
    return this.targetNode.children[0];
  }

  get triggerContent() {
    return this.props.children[0];
  }

  get popoverContent() {
    return this.props.children[1];
  }

  update() {
    if (this.mounted && this.popoverjs) {
      renderSubtreeIntoContainer(this, this.popoverContent, this.popoverContentElement, () => {
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
      this.open = this.props.open;
      this.popoverjs.toggle(this.open);
    } else if (this.props.open) {
      this.popoverjs.update();
    }
  }

  createPopover() {
    const element = this.popoverElement;
    if (element) {
      this.popoverContentElement = element.children[1];
      if (this.props.disabled) { return; }
      this.popoverjs = new Popoverjs(this.popoverOptions);
    }
  }

  render() {
    return (
      <div className="popoverjs--wrapper">
        { this.triggerContent }

        <div className="popoverjs">
          <div className="popoverjs-arrow" />
          <div className="popoverjs-content" />
        </div>
      </div>
    );
  }
}
