import React from 'react';
import {observer} from "mobx-react";
import LineView from "./LineView.js"

@observer
export default class SelectionRectangleView extends React.Component{

  getBoundingPoints(){
    const component = this.props.component;
    const position = component.positionInRoot;
    const width = component.width;
    const height = component.height;
    if(!position || !width || !height){
      return [];
    }
    const distance = 1;
    return [
      {
          x: position.x-distance,
          y: position.y-distance
      },
      {
        x:position.x + width + distance,
        y:position.y -  distance,
      },
      {
        x:position.x + width + distance,
        y:position.y + height +  distance,
      },
      {
        x:position.x - distance,
        y:position.y + height +  distance,
      }
    ];
  }
  render(){
    const boundingPoints = this.getBoundingPoints();
    if(boundingPoints.length < 2){
      return null;
    }
    const lines = [];
    let p1 = boundingPoints[boundingPoints.length-1];
    for(let i = 0;i<boundingPoints.length;i++){
      const p2 = boundingPoints[i];
      const key = "selection_" + i;
      lines.push(<LineView p1={p1} p2={p2} key={key}/>);
      p1 = p2;
    }
    return lines;
  }

};
