
import React from 'react';
import {NodeView, move, select} from 'modeling';

@move
@select
export default class EventView extends NodeView {

	getStyleClass(){
    return super.getStyleClass() + " event";
  }

	getContent() {
		return [
				<div key="outer" class="outer"/>
		];
	}
};
