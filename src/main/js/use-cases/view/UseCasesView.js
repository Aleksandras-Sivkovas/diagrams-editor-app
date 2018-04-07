
import React from 'react';
import {observer} from "mobx-react";
import {NodeView, select, resize} from 'modeling';
import UseCasesViewFactory from "./UseCasesViewFactory.js";

@resize({right:true,bottom:true,rightBottom:true})
@select
@observer
export default class UseCasesView extends NodeView {

	getdefaultViewFactory(){
		return new UseCasesViewFactory();
	}

	getContent() {
		return [<p key="name">{this.component.name}</p>,super.getContent()];

	}
	getStyleClass(){
    return super.getStyleClass() + " use-cases";
  }
};
