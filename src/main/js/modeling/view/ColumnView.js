
import React from 'react';
import {observer} from "mobx-react";
import NodeView from './NodeView.js';

@observer
export default class ColumnView extends NodeView {
	getStyleClass(){
    let styleClass = super.getStyleClass() + " column";
		if(!this.component.resizable){
			styleClass += " no-resize";
		}
		return styleClass;
  }
};
