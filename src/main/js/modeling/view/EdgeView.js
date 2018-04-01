import React from 'react';
import {observer} from "mobx-react";
import ComponentView from "./ComponentView.js";
import select from "./decorators/select.js";

@select
@observer
export default class EdgeView extends ComponentView {
	source;
	target;

	initialize(props){
    super.initialize(props);

    this.sourcePoint = props.sourcePoint;
    this.sourceTargetNode = props.sourceTargetNode;

		this.targetPoint = props.targetPoint;
    this.targetNode = props.targetNode;

  }
	getStyleClass(){
    return super.getStyleClass() + " edge";
  }
  getContent(model){
    const children = [
			<div
				class="selection-helper"
				key="selection-div"
			/>
		];
		if(this.targetNode){
			children.push(<div
				key="arrow"
				class="edge-end-right"
			/>);
		}
		return children;
  }

	_getEdgePointPosition(node,point){
		if(node){
			const edgePointPosition = node.getEdgePointPosition({x:point.x,y:point.y});
			return {
				x : node.positionInRoot.x + node.startPosition.x + edgePointPosition.x,
				y : node.positionInRoot.y + node.startPosition.y + edgePointPosition.y
			};
		}
		return {
			x : point.x,
			y : point.y
		};
	}

	_getSourcePosition(){
		return this._getEdgePointPosition(this.sourceTargetNode,this.sourcePoint);
	}

	_getTargetPosition(){
		return this._getEdgePointPosition(this.targetNode,this.targetPoint);
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
