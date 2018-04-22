import React from 'react';
import {observer} from "mobx-react";
// import ComponentView from "./ComponentView.js";
import LineView from './LineView.js'
import select from "./decorators/select.js";

@select
@observer
export default class EdgeView extends LineView {

	initialize(props){

    this.sourcePoint = props.sourcePoint;
    this.sourceTargetNode = props.sourceTargetNode;

		this.targetPoint = props.targetPoint;
    this.targetNode = props.targetNode;
		super.initialize(props);
		this.component=props.component;

  }
	getStyleClass(){
    let styleClass = super.getStyleClass() + " edge";
		if(this.component.selected){
			styleClass += " selected";
		}
		return styleClass;
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
		const title = this.getTitle();
		if(title){
			children.push(this.getTitleComponent(title));
		}
		return children;
  }

	getTitleComponent(title){
		const source = this.p1;
    const target = this.p2;
		const titleClass = (source.x > target.x) ?
				'title reversed-title' :
				'title normal-title';

		return (
			<div
				class={titleClass}
				key="title"
			>
				{title}
			</div>
		);
  }

	getTitle(){
		return null;
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

	getP1(){
		return this._getEdgePointPosition(this.sourceTargetNode,this.sourcePoint);
	}

	getP2(){
		return this._getEdgePointPosition(this.targetNode,this.targetPoint);
	}
	
};
