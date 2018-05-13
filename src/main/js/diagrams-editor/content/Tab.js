import React from 'react';

export default class Tab extends React.Component{

  handleClick(){
    this.props.model.currentDiagramindex = this.props.tabId;
  }
  render(){
    let className = "tab";
    if(this.props.model.currentDiagramindex == this.props.tabId){
      className += " selected";
    }
    return (
      <div class={className} onClick={this.handleClick.bind(this)}>
        <h2>{this.props.model.diagrams[this.props.tabId].name}</h2>
      </div>
    )
  }
};
