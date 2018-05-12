import React from 'react';

export default class DiagramContainer extends React.Component{

  componentDidMount(){
    this.props.model.executeDiagramMounted();
  }
  _getTabs(){
    const tabs = [];
    tabs.push(
      <div class="tab" key={0}>
        {this.props.model.diagram.name}
      </div>
    );
    tabs.push(
      <div class="tab" key={1}>
        {this.props.model.diagram.name}
      </div>
    );
    tabs.push(
      <div class="tab" key={2}>
        {this.props.model.diagram.name}
      </div>
    );
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
