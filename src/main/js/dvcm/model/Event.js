import {observable, computed} from "mobx";
import {Node} from 'modeling';

export default class Event extends Node {

  @computed
  get _distanceFromContent(){
    return this.borderWidth;
  }

  _getR(){
    return this.width/2 + this._distanceFromContent;
  }
  _getInRange(point){
    const min = -this._distanceFromContent;
    const max = this.width + this._distanceFromContent;

    let value;

    if(point < min){
			value = min;
		}else if(point > max){
			value = max;
		}else{
      value = point;
    }
		return value;
  }
  getEdgePointPosition(position){
    const point =  {};
    point.y = this._getInRange(position.y)  + this._distanceFromContent;
    point.x = this._getInRange(position.x)  + this._distanceFromContent;

    const r = this._getR();
    const x = point.x - r; // Move to (0;0)
    const r2 = r*r;
    const x2 = x*x;
    const y2 = r2 -x2;
    const y = Math.sqrt(y2);
    const chosenY = (point.y>r) ? y : -y;
    point.y = r+chosenY; // Move back to (-r;r)

    point.y -= this._distanceFromContent;
    point.x -= this._distanceFromContent;
    return point;
  }
  constructor(name){
		super();
		this.width = 50;
		this.height = 50;
	}

  getBorderWidth(){
		return super.getBorderWidth() + 2;
	}
};
