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
	handleNewClicked(e){
		this.model.newDiagram();
		// e.preventDefault();
    // e.stopPropagation();
	}

	handleImport(e){
		// console.log("import");
		this.model.import();
	}
	handleExport(e){
		this.model.export();
	}
	render() {
    this.model = this.props.model;
		return [
      <div class="button" onClick={this.handleNewClicked.bind(this)} key="new">
      	{this.locale.new}
      </div>,
      <div class="button"
					onClick={this.handleImport.bind(this)}
					key="import">
      	{this.locale.import}
      </div>,
      <div class="button" key="export"
					onClick={this.handleExport.bind(this)}>
      	{this.locale.export}
      </div>
		];
	}
};