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

@localizable({
	diagramsEditor : "Diagrams editor"
})
@observer
export default class DiagramsEditor extends React.Component{
  constructor(){
    super();
    this._editorModel = new DiagramsEditorModel();
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
				<div class="diagram">
					{this._getDiagram()}
				</div>
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
