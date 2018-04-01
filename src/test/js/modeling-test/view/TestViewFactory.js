import React from 'react';

import MovableComponent from './MovableComponent.js';
import TestComponent from './TestComponent.js';


import MovableNode from '../model/MovableNode.js';

import {ViewFactory} from "modeling";

export default class TestViewFactory extends ViewFactory {

	addViews(model,viewsList){
		if(model instanceof MovableNode){
			viewsList.push(<MovableComponent component={model} key={model.id} viewFactory={this}/>);
			return;
		}
		super.addViews(model,viewsList);
  }
};
