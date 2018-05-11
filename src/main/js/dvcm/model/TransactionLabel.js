import {observable, computed} from "mobx";
import {Label} from "modeling";
import TransactionLabelPoint from "./TransactionLabelPoint.js";

export default class TransactionLabel extends Label {

  transaction;

  constructor(transaction){
    super(...arguments);
    this.transaction = transaction;
    this.position = new TransactionLabelPoint(this);
  }

  // _getStartPosition(){
  //   const functionsRectangle = this.transaction.functionsPoints;
  //   let x = 0;
  //   let y = 0;
  //   if(functionsRectangle.length == 4){
  //     const p1 = functionsRectangle[1];
  //     const p2 = functionsRectangle[2];
  //     x = p1.x;
  //     const width = p2.y - p1.y;
  //     y = Math.floor(width/2) + p1.y;
  //   }
  //   return {x:x,y:y};
  // }

  @computed
	get name(){
		return this.transaction.name;
	}
	set name(name){
		this.transaction.name = name;
	}


};
