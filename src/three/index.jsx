import React, { Component } from 'react';
import renderThree from './demo2';

export default class A extends Component {
  render() {
    return <div
      ref={(el) => {
        if(el) {
          renderThree(el);
        }
      }}
    ></div>;
  }
}