import React from 'react';

export default class DiagramContainer extends React.Component{

  componentDidMount(){
    this.props.model.executeDiagramMounted();
  }
  render(){
    return (
      <div class="diagram" id="diagram-container">
        {this.props.children}
      </div>
    );
  }
};
