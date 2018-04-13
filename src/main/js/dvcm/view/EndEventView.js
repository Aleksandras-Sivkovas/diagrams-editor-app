
import React from 'react';
import EventView from './EventView.js';

export default class EndEventView extends EventView {
	getStyleClass(){
    return super.getStyleClass() + " end-event";
  }

	getContent() {
		return [
			<div class="outer" key="outer" >
				<div key="inner" class="inner"/>
			</div>
		];
	}
};
