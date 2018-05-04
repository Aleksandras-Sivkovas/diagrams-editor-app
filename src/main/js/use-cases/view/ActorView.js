
import React from 'react';
import {observer} from "mobx-react";
import {NodeView, move, select,resize} from 'modeling';

@move
@select
@observer
@resize
export default class ActorView extends NodeView {

	getContent() {
		return [
			<div key="name" class="name">{this.component.name}</div>,
			<div key="head" class="head"></div>,
      <div key="body" class="body"></div>,
      <div key="arms" class="arms">
      </div>,
      <div key="legs" class="endings-wrapper legs">
        <div class="endings"></div>
      </div>
	];

	}
	getStyleClass(){
    return super.getStyleClass() + " actor";
  }
};
