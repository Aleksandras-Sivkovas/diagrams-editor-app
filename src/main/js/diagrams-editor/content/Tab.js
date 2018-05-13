import React from 'react';
import {observer} from "mobx-react";

@observer
export default class Tab extends React.Component{

  handleTabClick(e){
    e.preventDefault();
    e.stopPropagation();
    this.props.model.currentDiagramindex = this.props.tabId;
  }
  handleCloseTabClick(e){
    e.preventDefault();
    e.stopPropagation();
    this.props.model.removeDiagram(this.props.tabId);
  }
  render(){
    let className = "tab";
    if(this.props.model.currentDiagramindex == this.props.tabId){
      className += " selected";
    }
    // <h2>{this.props.model.diagrams[this.props.tabId].name}</h2>
    return (
      <div class={className} onClick={this.handleTabClick.bind(this)}>
        <h2>{this.props.model.diagrams.get(this.props.tabId).name}</h2>
        <div class="close" onClick={this.handleCloseTabClick.bind(this)}>
          <div class="inner left"></div>
          <div class="inner right"></div>
        </div>
      </div>
    )
  }
};
