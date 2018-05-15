
import React from 'react';
import {observer} from "mobx-react";
import {EdgeView,dashedLine} from 'modeling';
import {localizable} from "localizable";

@localizable({
	extend : "Extend"
})
@observer
@dashedLine
export default class ExtensionView extends EdgeView {
	getStyleClass(){
    return super.getStyleClass() + " extension ";
  }

	getTitle(){
		return "<<" + this.locale.extend + ">>";
	}
};
