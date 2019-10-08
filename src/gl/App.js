import React, { Component } from 'react';
import c from './c1'
export default class WebGl extends Component {
  render() {
    return <div>
      <WebGlCanvas initcanvas={c} />
    </div>
  }
}


class WebGlCanvas extends Component {
  constructor() {
    super();
    this.canvasEl = React.createRef();
  }
  componentDidMount() {
    const { initcanvas } = this.props;
    if (this.canvasEl.current) {
      initcanvas(this.canvasEl.current);
    }
  }
  render() {
    return <div>
      <canvas
        style={{
          border: '1px solid'
        }}
        ref={this.canvasEl}
        id="canvas-ex"
        width="400"
        height="400"
      >
        canvas
      </canvas>
    </div>
  }
}
