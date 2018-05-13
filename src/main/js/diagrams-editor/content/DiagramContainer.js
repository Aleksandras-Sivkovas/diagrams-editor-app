import React from 'react';
import Tab from "./Tab.js";
import {observer} from "mobx-react";

@observer
export default class DiagramContainer extends React.Component{

  componentDidMount(){
    this.props.model.executeDiagramMounted();
  }
  _getTabs(){
    const tabs = [];
    // for(let i = 0;i<this.props.model.diagrams.length;i++){
    for(let i of this.props.model.diagrams.keys()){
      tabs.push(
        <Tab model={this.props.model} tabId={i} key={i}>
        </Tab>
      );
    }
    return tabs;
  }
  render(){
    return [
      <div class="tabs" key="tabs">
        {this._getTabs()}
      </div>,
      <div class="diagram" id="diagram-container" key="diagram-container">
        {this.props.children}
      </div>
    ]
  }
};
