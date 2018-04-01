
import React from 'react';
import {observer} from "mobx-react";
import NodeView from './NodeView.js';

@observer
export default class ColumnView extends NodeView {
	getStyleClass(){
    return super.getStyleClass() + " column";
  }
};
