import React from 'react';
import {observer} from "mobx-react";
import ViewFactory from "./ViewFactory.js";

@observer
export default class LineView extends React.Component{

  getStyleClass(){
    return "line";
  }
  initialize(){
    this.p1 = this.getP1();
    this.p2 = this.getP2();
  }
  getHandledEvents() {
    return null;
  }
  render() {
    this.initialize();
    return (
      <div
          class={this.getStyleClass()}
          style={this.getCss(this.p1,this.p2)}
          {...this.getHandledEvents()}
      />
    );
  }
  getP1(){
    return this.props.p1;
  }
  getP2(){
    return this.props.p2;
  }
  getCss(p1,p2) {
    const x1 = p1.x;
    const x2 = p2.x;
    const y1 = p1.y;
    const y2 = p2.y;

    // length of line
    const length = Math.ceil(Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2)));


    // mid point between points
    var xMid = (x1+x2)/2;
    var yMid =(y1+y2)/2;

    // salope of the line
    const salopeInRadian = Math.atan2(y2-y1, x2-x1);
    const salopeInDegrees = (salopeInRadian * 180)/Math.PI;

    return {
      top:yMid + 'px',
      left:( xMid - (length/2) ) + 'px',
      width:length+'px',
      transform:'rotate(' + salopeInDegrees + 'deg)'
    }
	}
};
