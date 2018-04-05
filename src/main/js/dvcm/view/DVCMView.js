
import React from 'react';
import {NodeView, select,resize} from 'modeling';
import Transaction from "../model/Transaction.js";
import DVCMViewFactory from "./DVCMViewFactory.js";

@resize({right:true,bottom:true,rightBottom:true})
@select
export default class DVCMView extends NodeView {

	getdefaultViewFactory(){
		return new DVCMViewFactory();
	}
	getStyleClass(){
    return super.getStyleClass() + " dvcm";
  }

	getCss() {
		const css = super.getCss();
		return css;
	}
	getChildrenViews(){
		const views = super.getChildrenViews();
		if(this.component.model.root != this.component){
			return views;
		}
		const transactions = this.component.model.components
			.filter(component =>(component instanceof Transaction))
		for(let transaction of transactions){
			this.viewFactory.addViews(transaction,views);
		}
		return views;
	}
};
