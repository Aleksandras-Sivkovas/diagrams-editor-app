
import React from 'react';
import {observer} from "mobx-react";
import NodeView from './NodeView.js';
import move from './decorators/move.js';

@move
@observer
export default class LabelView extends NodeView {
	getStyleClass(){
		return super.getStyleClass() + " label";
  }
  getContent() {
		return [<p key="name">{this.component.name}</p>];
	}
};
