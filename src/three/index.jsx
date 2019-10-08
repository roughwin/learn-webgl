import React, { Component } from 'react';
import renderThree from './demo2';

export default class A extends Component {
  constructor() {
    super();
    this.canvasEl = React.createRef();
  }
  componentDidMount() {
    if (this.canvasEl.current) {
      renderThree(this.canvasEl.current);
    }
  }
  render() {
    return <div
      ref={this.canvasEl}
    ></div>;
  }
}