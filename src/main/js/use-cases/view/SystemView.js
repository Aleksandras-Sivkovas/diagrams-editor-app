
import React from 'react';
import {observer} from "mobx-react";
import {NodeView, move, select,resize} from 'modeling';

@move
@select
@observer
@resize({right:true,bottom:true,rightBottom:true})
export default class SystemView extends NodeView {
	getContent() {
		return [<div class="name" key="name">{this.component.name}</div>,...this.getChildrenViews()]

	}
	getStyleClass(){
    return super.getStyleClass() + " system";
  }
};
