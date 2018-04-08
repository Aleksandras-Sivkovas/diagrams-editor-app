import React from 'react';
import {observer} from "mobx-react";
import {localizable} from "localizable";
import controllTypes from "./controllTypes.js";

@localizable({
	newDiagram : "New diagram",
	generateFromUseCases : "Generate from use cases"
})
@observer
export default class CreationChooser extends React.Component{
  handleNewClicked(){
    this.model.createNewChosen();
	}

  handleGenerateClicked(){
    this.model.generateChosen();
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
        	{this.locale.generateFromUseCases}
				</div>
      </div>
		];
	}
};
