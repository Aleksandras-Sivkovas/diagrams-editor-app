
import React from 'react';
import {observer} from "mobx-react";
import {NodeView, move, select,resize} from 'modeling';

@move
@select
@observer
@resize
export default class UseCaseView extends NodeView {

	getContent() {
		return [<p key="name">{this.component.name}</p>];

	}
	getStyleClass(){
    return super.getStyleClass() + " use-case";
  }
};
