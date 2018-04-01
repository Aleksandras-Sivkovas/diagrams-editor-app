import {action} from "mobx";

import Node from "../../model/Node.js";
import Movehandler from "./Movehandler.js";

export default class EdgePointMoveHandler extends Movehandler{

  getCurrentPosition(){
    if(this.targetNode){
      return {
        y : this.targetNode.positionInRoot.y +
  					this.targetNode.startPosition.y + this.point.y,
  			x : this.targetNode.positionInRoot.x +
  					this.targetNode.startPosition.x + this.point.x
      };
    }
    return {
      x : this.point.x,
      y : this.point.y
    };
  }

  setCurrentPosition(x,y){
    if(this.targetNode){
      const relativeX = x - this.targetNode.startPosition.x - this.targetNode.positionInRoot.x;
      const relativeY = y - this.targetNode.startPosition.y - this.targetNode.positionInRoot.y;

      const edgePointPosition = this.targetNode.getEdgePointPosition({x:relativeX,y:relativeY});

    	this.point.x = edgePointPosition.x;
      this.point.y = edgePointPosition.y;

      return;
    }
    this.point.x = x;
    this.point.y = y;
  }

}
