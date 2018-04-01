
import React from 'react';
import {EdgeView} from 'modeling';

export default class SequenceFlowView extends EdgeView {

	getStyleClass(){
    return super.getStyleClass() + " sequence-flow";
  }
};
