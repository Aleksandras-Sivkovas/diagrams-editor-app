
import React from 'react';
import EventView from './EventView.js';

export default class StartEventView extends EventView {
	getStyleClass(){
    return super.getStyleClass() + " start-event";
  }
};
