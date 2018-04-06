
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
	getContent(model){
    const children = super.getContent();
		children.push(
			<div
				class="title"
				key="title"
			>
				{"<<" + this.locale.extend + ">>"}
			</div>
		);
		return children;
  }
};
