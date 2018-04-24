import React from 'react';
import {observer} from "mobx-react";
import {localizable} from "localizable";


@localizable({
	"new" : "New",
	"import" : "Import",
	"export" : "Export"
})
@observer
export default class Main extends React.Component{
	handleNewClicked(){
		this.model.navigateToNewDiagram();
	}

	handleImport(){
		this.model.import();
	}
	handleExport(){
		this.model.export();
	}
	render() {
    this.model = this.props.model;
		const children = [
			<div class="button" onClick={this.handleNewClicked.bind(this)} key="new">
				<div class="text">
      		{this.locale.new}
				</div>
      </div>,
			<div class="button"
					onClick={this.handleImport.bind(this)}
					key="import">
				<div class="text">
					{this.locale.import}
				</div>
			</div>
		];
		if(this.model.isModelInContext){
			children.push(
				<div class="button"
						onClick={this.handleExport.bind(this)}
						key="export">
					<div class="text">
	      		{this.locale.export}
					</div>
	      </div>,
			);
		}
		return children;
	}
};
