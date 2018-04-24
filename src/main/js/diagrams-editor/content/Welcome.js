import React from 'react';
import {observer} from "mobx-react";
import {localizable} from "localizable";


@localizable({
	welcome : "Diagrams Editor 0.0.0",
	ui:"UI",
	"new" : "New",
	"import" : "Import",
	"export" : "Export",
	importExplanation: "Imports diagram file and displays it",
	exportExplanation: "Export current diagram to file and suggests to save it in file system",
	dvcm : "DVCM",
	useCases : "Use cases",
	newDVCMExplanation : "Creates new DVCM diagram and displays it",
	newDiagram : "New diagram",
	generateFromDVCM : "Generate from DVCM",
	newUseCasesExplanation: "Creates new UseCases diagram and displays it",
	generateUseCasesFromDvcmExplanation: "Generates and displays Use Cases diagram from DVCM file"
})
@observer
export default class Main extends React.Component{
	render() {
    this.model = this.props.model;
		return (
      <div class="welcome">
      	{this.locale.welcome}
				<div>
					{this.locale.ui}:
				</div>
				<div>
					{this.locale.import} - {this.locale.importExplanation}.
				</div>
				<div>
					{this.locale.export} - {this.locale.exportExplanation}.
				</div>
				<div>
					{this.locale.new}->{this.locale.dvcm} -
					{this.locale.newDVCMExplanation}.
				</div>
				<div>
					{this.locale.new}->{this.locale.useCases}->{this.locale.newDiagram} -
					{this.locale.newUseCasesExplanation}.
				</div>
				<div>
					{this.locale.new}->{this.locale.useCases}->{this.locale.generateFromDVCM} -
					{this.locale.generateUseCasesFromDvcmExplanation}.
				</div>
      </div>
		);
	}
};
