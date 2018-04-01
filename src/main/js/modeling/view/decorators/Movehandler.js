import {action} from "mobx";

import Node from "../../model/Node.js";

export default class Movehandler {
  constructor(model,x,y){
    this.model = model;

    this.moveX = x ? true : false;
    this.moveY = y  ? true : false;

    this.mouseUpHandler = action(this.handleMouseUp.bind(this));
    this.mouseMoveHandler = action(this.handleMouseMove.bind(this));
  }

  previousMouseY = 0;
  previousMouseX = 0;
  grid = 10;

  handleMouseDown(e){
    if (e.button != 0) {
      return;
  	}
    this.previousMouseY = e.clientY;
    this.previousMouseX = e.clientX;
    document.addEventListener('mousemove', this.mouseMoveHandler);
    document.addEventListener('mouseup', this.mouseUpHandler);
    e.preventDefault();
    e.stopPropagation();
  }

  handleMouseUp(e) {
    document.removeEventListener('mousemove', this.mouseMoveHandler);
    document.removeEventListener('mouseup', this.mouseUpHandler);
    e.preventDefault();
    e.stopPropagation();
  }

  applyGrid(distance){
    return Math.round(distance / this.grid) * this.grid;
  }

  getCurrentPosition(){
    return {
      x : this.model.position.x,
      y : this.model.position.y
    };
  }

  setCurrentPosition(x,y){
  	this.model.position.x = x;
    this.model.position.y = y;
  }

  handleMouseMove(e){
    e.preventDefault();
    e.stopPropagation();

    let deltaLeft = e.clientX - this.previousMouseX;
    let deltaTop = e.clientY - this.previousMouseY;

    deltaLeft = this.applyGrid(deltaLeft);
    deltaTop = this.applyGrid(deltaTop);

    const currentPosition = this.getCurrentPosition();

    let top = this.moveY ? currentPosition.y + deltaTop : currentPosition.y;
    let left = this.moveX ? currentPosition.x + deltaLeft : currentPosition.x;

    this.setCurrentPosition(left,top);

    const newPosition = this.getCurrentPosition();
    if(currentPosition.y != newPosition.y){
      this.previousMouseY = this.previousMouseY + deltaTop;
    }
    if(currentPosition.x != newPosition.x){
      this.previousMouseX = this.previousMouseX + deltaLeft;
    }

  }
}
