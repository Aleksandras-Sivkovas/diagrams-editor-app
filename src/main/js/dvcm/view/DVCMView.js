
import React from 'react';
import {NodeView, select} from 'modeling';
import Transaction from "../model/Transaction.js";

@select
export default class DVCMView extends NodeView {

	getStyleClass(){
    return super.getStyleClass() + " dvcm";
  }

	getCss() {
		const css = super.getCss();
		css.borderWidth = '1px';
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
