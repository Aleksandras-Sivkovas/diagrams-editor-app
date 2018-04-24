
import React from 'react';
import {observer} from "mobx-react";
import {EdgeView} from 'modeling';

@observer
export default class AssociationView extends EdgeView {
	getStyleClass(){
    return super.getStyleClass() + " association ";
  }
	getTitle(){
		return this.component.name;
	}
};
