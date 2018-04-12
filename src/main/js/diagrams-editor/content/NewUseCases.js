import React from 'react';
import {observer} from "mobx-react";
import {localizable} from "localizable";

@localizable({
	newDiagram : "New diagram",
	generateFromDVCM : "Generate from DVCM"
})
@observer
export default class NewUseCases extends React.Component{
  handleNewClicked(){
    this.model.navigateToNewUseCases();
	}

  handleGenerateClicked(){
    this.model.navigateToGenerateUseCases();
	}
	render() {
    this.model = this.props.model;
		return [
      <div
          class="button"
          onClick={this.handleNewClicked.bind(this)}
          key="new"
      >
				<div class="text">
        	{this.locale.newDiagram}
				</div>
      </div>,
      <div
          class="button"
          onClick={this.handleGenerateClicked.bind(this)}
          key="generate"
      >
				<div class="text">
        	{this.locale.generateFromDVCM}
				</div>
      </div>
		];
	}
};
