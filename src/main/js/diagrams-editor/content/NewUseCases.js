import React from 'react';
import {observer} from "mobx-react";
import {localizable} from "localizable";
import CancelButton from "./CancelButton.js";

@localizable({
	newDiagram : "New diagram",
	generateFromDVCM : "Generate from DVCM",
	generateByTransactionFromDVCM : "Generate by transaction from DVCM"
})
@observer
export default class NewUseCases extends React.Component{
  handleNewClicked(){
    this.model.navigateToNewUseCases();
	}

  handleGenerateClicked(){
    this.model.navigateToGenerateUseCases();
	}

	handleGenerateByTransactionClicked(){
    this.model.navigateToGenerateUseCasesByTransaction();
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
      </div>,
			<div
          class="button"
          onClick={this.handleGenerateByTransactionClicked.bind(this)}
          key="generate-by-transaction"
      >
				<div class="text">
        	{this.locale.generateByTransactionFromDVCM}
				</div>
      </div>,
			<CancelButton model={this.model} key="cancel"/>
		];
	}
};
