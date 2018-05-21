import React from 'react';
import {observer} from "mobx-react";
import {LineView,select,dashedLine} from "modeling";

@select
@observer
@dashedLine
export default class TransactionBorderView extends LineView {

	initialize(){
		super.initialize();
    this.component = this.props.component;
  }

	getStyleClass(){
    let styleClass = super.getStyleClass() + " transaction-border";
		if(this.props.component.selected){
      styleClass += " selected";
    }
		return styleClass;
  }

};
