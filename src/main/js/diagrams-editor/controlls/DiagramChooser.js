import React from 'react';
import {observer} from "mobx-react";
import {localizable} from "localizable";
import controllTypes from "./controllTypes.js";

@localizable({
	bpmn : "BPMN",
	useCases : "Use cases"
})
@observer
export default class DiagramChooser extends React.Component{

  handleBPMNClicked(){
    this.model.dvcmChosen();
	}

  handleUseCasesClicked(){
    this.model.useCasesChosen();
	}

	render() {
    this.model = this.props.model;
		return [
      <div
          class="button"
          onClick={this.handleBPMNClicked.bind(this)}
          key="bpmn"
      >
				<div class="text">
        	{this.locale.bpmn}
				</div>
      </div>,
      <div
          class="button"
          onClick={this.handleUseCasesClicked.bind(this)}
          key="use-cases"
      >
				<div class="text">
        	{this.locale.useCases}
				</div>
      </div>
		];
	}
};
