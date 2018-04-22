
import React from 'react';
import {observer} from "mobx-react";
import {EdgeView} from 'modeling';
import {localizable} from "localizable";

@localizable({
	extend : "Extend"
})
@observer
export default class ExtensionView extends EdgeView {
	getStyleClass(){
    return super.getStyleClass() + " extension ";
  }

	getTitle(){
		return "<<" + this.locale.extend + ">>";
	}
};
