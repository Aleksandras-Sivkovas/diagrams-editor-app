import React from 'react';
import {observer} from "mobx-react";
import {localizable} from "localizable";

@localizable({
	cancel : "Cancel",
})
@observer
export default class CancelButton extends React.Component{

  handleClicked(){
    this.model.executeCancel();
	}

	render() {
    this.model = this.props.model;
		return (
      <div
          class="button"
          onClick={this.handleClicked.bind(this)}
          key="json"
      >
				<div class="text">
        	{this.locale.cancel}
				</div>
      </div>
		);
	}
};
