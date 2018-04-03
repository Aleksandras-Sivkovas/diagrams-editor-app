import React from 'react';

import ColumnView from "./ColumnView.js";
import RowView from "./RowView.js";
import EdgePointView from "./EdgePointView.js";
import EdgeView from "./EdgeView.js";
import NodeView from "./NodeView.js";
import ComponentView from "./ComponentView.js";

import Row from "../model/Row.js";
import Column from "../model/Column.js";
import Node from "../model/Node.js";
import Edge from "../model/Edge.js";

export default class ViewFactory {
	// Source
	_addEdgePoints(edge,viewsList){
		viewsList.push(<EdgePointView
				component={edge}
				point={edge.sourcePoint}
				targetNode={edge.source}
				key={edge.id + "_sourcePoint"}
				viewFactory={this}/>
		);

		// Target
		viewsList.push(<EdgePointView
				component={edge}
				targetNode={edge.target}
				point={edge.targetPoint}
				key={edge.id + "_targetPoint"}
				viewFactory={this}/>
		);

		// Bendpoints
		for(let point of edge.bendPoints){
			viewsList.push(<EdgePointView
					component={edge}
					point={point}
					key={edge.id + "_bendpoint_" + point.x+", "+point.y}
					viewFactory={this}/>
			);
		}
	}

	getEdgeViewClass(edge){
		return EdgeView;
	}
	_addEdgeViews(edge,viewsList){
		const EdgeView = this.getEdgeViewClass(edge);
		const pointPairs = [];
		let pointPair = {
			source : edge.sourcePoint
		};
		for(let point of edge.bendPoints){
			pointPair.target = point;
			pointPairs.push(pointPair);
			pointPair = {
				source : point
			};
		}
		pointPair.target = edge.targetPoint;
		pointPairs.push(pointPair);
		const last = pointPairs.length - 1;

		const targetNode = (last == 0) ? edge.target : null;
		viewsList.push(<EdgeView
				sourcePoint = {pointPairs[0].source}
				sourceTargetNode = {edge.source}
				targetPoint = {pointPairs[0].target}
				targetNode = {targetNode}
				component={edge}
				key={edge.id + "_edge"}
				viewFactory={this}/>
		);

		if(last > 0){
			viewsList.push(<EdgeView
					sourcePoint = {pointPairs[last].source}
					targetPoint = {pointPairs[last].target}
			    targetNode = {edge.target}
					component={edge}
					key={edge.id + "_edge_end"}
					viewFactory={this}/>
			);
		}
		for(let i = 1;i < last;i++){
			viewsList.push(<EdgeView
					sourcePoint = {pointPairs[i].source}
					targetPoint = {pointPairs[i].target}
					component={edge}
					key={edge.id + "_edge_" + i}
					viewFactory={this}/>
			);
		}
	}

	_addEdgeComponents(edge,viewsList){
		this._addEdgePoints(edge,viewsList);
		this._addEdgeViews(edge,viewsList);
	}

	getNodeViewClass(node){
    if(node instanceof Column){
      return ColumnView;
    }
    if(node instanceof Row){
      return RowView;
    }
    return NodeView;
  }
	addViews(model,viewsList) {
		if(model instanceof Edge){
			this._addEdgeComponents(model,viewsList)
			return;
		}
		if(model instanceof Node){
			const NodeView = this.getNodeViewClass(model);
			viewsList.push(<NodeView component={model} key={model.id} viewFactory={this}/>);
			return;
		}
		console.warn("Unknown component (id='" +model.id+"')");
	}
};
