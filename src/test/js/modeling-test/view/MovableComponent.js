import React from 'react';
import {observer} from "mobx-react";

import TestComponent from './TestComponent.js';

import {move, select,resize} from "modeling";

@select
@move
@resize({
  right:true,
  bottom:true,
  rightBottom:true
})
@observer
export default class MovableComponent extends TestComponent{
  getStyleClass(){
    return super.getStyleClass() + " movable-component";
  }
}
