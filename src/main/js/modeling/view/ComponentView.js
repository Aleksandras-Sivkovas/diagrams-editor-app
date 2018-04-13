import React from 'react';
import {observer} from "mobx-react";
import ViewFactory from "./ViewFactory.js";
import SelectionRectangleView from "./SelectionRectangleView.js";
@observer
export default class ComponentView extends React.Component{

	viewFactory;
	component;

	getStyleClass() {
		let styleClass = "modeling-component";
		const className = this.props.className;
		if(className){
			styleClass += " " + className;
		}
    if(this.component.selected){
      styleClass += " selected";
    }
    return styleClass;
	}

	getHandledEvents() {
		return null;
	}

	getCss() {
		return {

			};
	}

	getChildrenViews(){
		const children = this.component.getChildren();
		const views = [];
		for(let child of children){
			this.viewFactory.addViews(child,views);
		}
		if(this.component.model.root != this.component){
			return views;
		}
		const edges = this.component.model.edges;
		for(let edge of edges){
			this.viewFactory.addViews(edge,views);
		}
		const selected = this.component.model.selected;
		if(selected){
			views.push(this._getSelectionView(selected));
		}
		return views;
	}

	_getSelectionView(selected){
		return <SelectionRectangleView component={selected} key="selection-view"/>;
		// const selected = this.component.model.selected;
		// const position = selected.positionInRoot.y
		// const selectionStyle = {
		// 	position:"absolute",
		// 	top: selected.positionInRoot.y-3,
		// 	left: selected.positionInRoot.x-3,
		// 	height: selected.height+6,
		// 	width:selected.width+6,
		// 	border:'solid black 3px',
		// 	zIndex:100
		// };
		// return [
		// 	<div style={{
		// 		position:"absolute",
		// 		top: selected.positionInRoot.y-3,
		// 		left: selected.positionInRoot.x-3,
		// 		height: 0,
		// 		width:selected.width + 3,
		// 		borderTop:'solid black 3px',
		// 		zIndex:100
		// 	}} class="selection_top" key="selection_top"/>,
		// 	<div style={{
		// 		position:"absolute",
		// 		top: selected.positionInRoot.y-3,
		// 		left: selected.positionInRoot.x+selected.width,
		// 		height: selected.height + 3,
		// 		width:0,
		// 		borderRight:'solid black 3px',
		// 		zIndex:100
		// 	}} class="selection_right" key="selection_right"/>,
		// 	<div style={{
		// 		position:"absolute",
		// 		top: selected.positionInRoot.y+selected.height,
		// 		left: selected.positionInRoot.x-3,
		// 		height: 0,
		// 		width:selected.width + 6,
		// 		borderBottom:'solid black 3px',
		// 		zIndex:100
		// 	}} class="selection_bottom" key="selection_bottom"/>,
		// 	<div style={{
		// 		position:"absolute",
		// 		top: selected.positionInRoot.y-3,
		// 		left: selected.positionInRoot.x-3,
		// 		height: selected.height + 3,
		// 		width:0,
		// 		borderLeft:'solid black 3px',
		// 		zIndex:100
		// 	}} class="selection_left" key="selection_left"/>
		//
		// ];
	}
	getContent() {
		return this.getChildrenViews();
	}

	getdefaultViewFactory(){
		return new ViewFactory();
	}
	initialize(props){
		this.viewFactory = props.viewFactory;
		if(!this.viewFactory){
			this.viewFactory = this.getdefaultViewFactory();
		}
		this.component = props.component;
	}

	render() {
		this.initialize(this.props);
		const style = Object.assign(
				{},
				this.getCss(),
				this.props.style
		);
		return (
			<div
				class={this.getStyleClass()}
				{...this.getHandledEvents()}
				style={style}
			>
				{this.getContent()}
			</div>
		);
	}
};
