
import React from 'react';
import {observer} from "mobx-react";
import {EdgeView} from 'modeling';
import {localizable} from "localizable";

@localizable({
	include : "Include"
})
@observer
export default class InclusionView extends EdgeView {
	getStyleClass(){
    return super.getStyleClass() + " inclusion ";
  }

	getTitle(){
		return "<<" + this.locale.include + ">>";
	}

};
