import React from 'react';
import {observer} from "mobx-react";
import {localizable} from "localizable";
import CancelButton from "./CancelButton.js";

@localizable({
	png : "PNG",
	json : "JSON"
})
@observer
export default class Export extends React.Component{

  handlePNGClicked(){
    this.model.exportAsImage();
	}

  handleJSONClicked(){
    this.model.exportAsJSON();
	}

	render() {
    this.model = this.props.model;
		return [
      <div
          class="button"
          onClick={this.handlePNGClicked.bind(this)}
          key="png"
      >
				<div class="text">
        	{this.locale.png}
				</div>
      </div>,
      <div
          class="button"
          onClick={this.handleJSONClicked.bind(this)}
          key="json"
      >
				<div class="text">
        	{this.locale.json}
				</div>
      </div>,
			<CancelButton model={this.model} key="cancel">
			</CancelButton>
		];
	}
};
