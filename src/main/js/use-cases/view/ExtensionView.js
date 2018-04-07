
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

		const source = this._getSourcePosition();
    const target = this._getTargetPosition();
		const titleClass = (source.x > target.x) ? 
				'title reversed-title' :
				'title normal-title';

		children.push(
			<div
				class={titleClass}
				key="title"
			>
				{"<<" + this.locale.extend + ">>"}
			</div>
		);
		return children;
  }
};
