import React from 'react';
import {observer} from "mobx-react";
import {localizable} from "localizable";

@localizable({
	bpmn : "BPMN",
	useCases : "Use cases"
})
@observer
export default class NewDiagram extends React.Component{

  handleBPMNClicked(){
    this.model.navigateToNewDvcm();
	}

  handleUseCasesClicked(){
    this.model.navigateToNewUeCases();
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
