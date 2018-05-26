import React from 'react';
import {observer} from "mobx-react";
import DiagramsEditorModel from "./DiagramsEditorModel.js";
import Main from "./controlls/Main.js";
import DiagramChooser from "./content/NewDiagram.js";
import NewUseCases from "./content/NewUseCases.js";
import {DVCMView,DVCM} from "dvcm";
import {UseCasesView,UseCases} from "use-cases";
import {localizable} from "localizable";
import Welcome from "./content/Welcome.js";
import Export from "./content/Export.js";
import DiagramContainer from "./content/DiagramContainer.js";

// TODO: remove after ui done
import * as dvcm from "dvcm";
import * as useCases from "use-cases";

@localizable({
	diagramsEditor : "Diagrams editor"
})
@observer
export default class DiagramsEditor extends React.Component{

  constructor(){
    super();
    this._editorModel = new DiagramsEditorModel();

		// TODO: remove after ui done
		window.editorModel = this._editorModel;
		window.dvcm = dvcm;
		window.useCases = useCases;
		this._editorModel.localeListener = this; // TODO: this is bad....
  }
  _getDiagram(){
    if(!this._editorModel.diagram){
      return null;
    }
    if(this._editorModel.diagram.root instanceof DVCM){
      return <DVCMView component={this._editorModel.diagram.root}/>;
    }
    if(this._editorModel.diagram.root instanceof UseCases){
      return <UseCasesView component={this._editorModel.diagram.root}/>;
    }
    return null;
  }
	_getContent(){
		if(this._editorModel.pageDiagram){
			return (
				<DiagramContainer model={this._editorModel}>
					{this._getDiagram()}
				</DiagramContainer>
			);
		}
		if(this._editorModel.pageNewDiagram){
			return (
				<div class="buttons">
					<DiagramChooser model={this._editorModel} />
				</div>
			);
		}
		if(this._editorModel.pageNewUseCases){
			return (
				<div class="buttons">
					<NewUseCases model={this._editorModel} />
				</div>
			);
		}
		if(this._editorModel.pageExport){
			return (
				<div class="buttons">
					<Export model={this._editorModel} />
				</div>
			);
		}
    return <Welcome/>;
	}
	render() {
		document.title = this.locale.diagramsEditor;
		return (
      <div class="diagrams-editor">
  			<div class="controlls">
          <Main model={this._editorModel}/>
        </div>
        <div class="content">
          {this._getContent()}
        </div>
      </div>
		);
	}
};
