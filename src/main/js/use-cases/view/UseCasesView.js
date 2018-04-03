
import React from 'react';
import {observer} from "mobx-react";
import {NodeView, select} from 'modeling';

@select
@observer
export default class UseCasesView extends NodeView {

	getContent() {
		return [<p key="name">{this.component.name}</p>,super.getContent()];

	}
	getStyleClass(){
    return super.getStyleClass() + " use-cases";
  }
};
