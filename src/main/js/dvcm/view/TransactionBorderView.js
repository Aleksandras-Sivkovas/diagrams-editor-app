import React from 'react';
import {observer} from "mobx-react";
import {ComponentView,select} from "modeling";

@select
@observer
export default class TransactionBorderView extends ComponentView {
	initialize(props){
    super.initialize(props);
    this.sourcePoint = props.sourcePoint;
		this.targetPoint = props.targetPoint;
  }

	getStyleClass(){
    return super.getStyleClass() + " transaction-border";
  }
  getContent(){
		return null;
		// return (<div
    //   class="selection-helper"
    //   key="selection-div"
    // />);
  }

	_getSourcePosition(){
		return this.sourcePoint;
	}

	_getTargetPosition(){
		return this.targetPoint;
	}

	getCss() {
    const p1 = this._getSourcePosition();
    const p2 = this._getTargetPosition();
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
