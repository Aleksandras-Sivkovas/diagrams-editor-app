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
        {this.locale.newDiagram}
      </div>,
      <div
          class="button"
          onClick={this.handleGenerateClicked.bind(this)}
          key="generate"
      >
        {this.locale.generateFromUseCases}
      </div>
		];
	}
};
