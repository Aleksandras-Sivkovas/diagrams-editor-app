import React from 'react';

export default class Tab extends React.Component{

  handleClick(){
    this.props.model.openTab(this.props.tabId);
  }
  render(){
    return [
      <div class="tab" onclick={this.handleClick.bind(this)}>
        {this.props.model.diagram.name}
      </div>
    ]
  }
};
