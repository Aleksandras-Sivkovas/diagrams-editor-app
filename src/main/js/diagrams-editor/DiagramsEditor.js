import React from 'react';
import {observer} from "mobx-react";
import DiagramsEditorModel from "./DiagramsEditorModel.js";
import Main from "./controlls/Main.js";
import DiagramChooser from "./controlls/DiagramChooser.js";
import CreationChooser from "./controlls/CreationChooser.js";
import controllTypes from "./controlls/controllTypes.js";
import {DVCMView,DVCM} from "dvcm";
import {UseCasesView,UseCases} from "use-cases";
import {localizable} from "localizable";

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
  _getControlls(){
    switch(this._editorModel.controlls){
      case controllTypes.NEW :{
        return <DiagramChooser model={this._editorModel}/>
      }
      case controllTypes.NEW_USE_CASES :{
        return <CreationChooser model={this._editorModel}/>
      }
      break;
    }
    return <Main model={this._editorModel}/>;
  }
	render() {
    document.title = this.locale.diagramsEditor;
		return (
      <div class="diagrams-editor">
  			<div class="controlls">
          {this._getControlls()}
        </div>
        <div class="diagram">
          {this._getDiagram()}
        </div>
      </div>
		);
	}
};
