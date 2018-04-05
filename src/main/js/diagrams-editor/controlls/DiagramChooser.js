import React from 'react';
import {observer} from "mobx-react";
import {localizable} from "localizable";
import {DVCM} from "dvcm";
import {UseCases} from "use-cases";
import controllTypes from "./controllTypes.js";

@localizable({
	bpmn : "BPMN",
	useCases : "Use cases"
})
@observer
export default class DiagramChooser extends React.Component{
	setControllsToMain(){
		this.model.controlls = controllTypes.MAIN;
	}

  // @action
  handleBPMNClicked(){
    const dvcm = new DVCM();
    this.model.diagram = dvcm.model;
    this.setControllsToMain();
	}

  // @action
  handleUseCasesClicked(){
    const useCases = new UseCases();
    this.model.diagram = useCases.model;
    this.setControllsToMain();
	}
	render() {
    this.model = this.props.model;
		return [
      <div
          class="button"
          onClick={this.handleBPMNClicked.bind(this)}
          key="bpmn"
      >
        {this.locale.bpmn}
      </div>,
      <div
          class="button"
          onClick={this.handleUseCasesClicked.bind(this)}
          key="use-cases"
      >
        {this.locale.useCases}
      </div>
		];
	}
};
