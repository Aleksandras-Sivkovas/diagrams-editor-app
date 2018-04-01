import React from 'react';
import {observer} from "mobx-react";
import ComponentView from "./ComponentView.js";

import move from "./decorators/move.js";
import select from "./decorators/select.js";

@select
@move
@observer
export default class EdgePointView extends ComponentView {

	borderWidth = 8;

	initialize(props){
    super.initialize(props);
    this.point = props.point;
    this.targetNode = props.targetNode;
  }

	getStyleClass(){
    return super.getStyleClass() + " join-point";
  }

	getContent(model){
  }

	setposition(css){
		if(this.targetNode){
			const edgePointPosition = this.targetNode.getEdgePointPosition({x:this.point.x,y:this.point.y});
			css.top = this.targetNode.positionInRoot.y +
					this.targetNode.startPosition.y + edgePointPosition.y- this.borderWidth +
					 "px";
			css.left = this.targetNode.positionInRoot.x +
					this.targetNode.startPosition.x + edgePointPosition.x - this.borderWidth +
					"px";
			return;
		}
		css.top = this.point.y - this.borderWidth +"px";
		css.left = this.point.x - this.borderWidth +"px";
	}

	getCss() {
		const css = super.getCss();
		this.setposition(css);
		return css;
	}
};
