import React from 'react';
import {observer} from "mobx-react";
import ViewFactory from "./ViewFactory.js";
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
		return views;
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
