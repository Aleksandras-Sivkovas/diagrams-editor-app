import {observable, computed} from "mobx";
import {Component,Point} from 'modeling';
import InTransaction from "./InTransaction.js"

export default class Transaction extends Component {

  @computed
  get activities(){
    const activities = [];
    for(let rel of this.inTransactions){
      activities.push(rel.target);
    }
    return activities;
  }

  @computed
  get inTransactions(){
    return this.model.inTransactions.filter(rel =>
        (rel.source == this)
    );
  }

	@observable
	name = "Transaction"

	constructor(name){
		super(...arguments);
    this.name = name;
	}


  _getSurroundingPoints(activities){
    if(activities == 0){
      return [];
    }
    let minX = 99999999;
    let minY = 99999999;
    let maxX = 0;
    let maxY = 0;
    for(let activity of activities){
      const x1 = activity.positionInRoot.x;
      const y1 = activity.positionInRoot.y;
      const x2 = x1 + activity.borderWidth*2 + activity.width;
      const y2 = y1 + activity.borderWidth*2 + activity.height;
      if(x1 < minX){
        minX = x1;
      }
      if(y1 < minY){
        minY = y1;
      }
      if(x2 > maxX){
        maxX = x2;
      }
      if(y2 > maxY){
        maxY = y2;
      }
    }
    const padding = 10;
    minX -= padding*2;
    minY -= padding*2;
    maxX += padding;
    maxY += padding;
    return {
      topLeft:new Point(minX,minY),
      topRight:new Point(maxX,minY),
      botLeft:new Point(minX,maxY),
      botRight:  new Point(maxX,maxY)
    }
  }

  @computed
  get processes(){
    const filtered = [];
    for(let activity of this.activities){
      if(activity.parents.includes(this.model.root.processesPool)){
        filtered.push(activity);
      }
    }
    return filtered;
  }

  @computed
  get functions(){
    const filtered = [];
    for(let activity of this.activities){
      if(activity.parents.includes(this.model.root.functionsPool)){
        filtered.push(activity);
      }
    }
    return filtered;
  }
  @computed
  get processesPoints(){
    const processes = this.processes;
    const points = this._getSurroundingPoints(processes);
    if(!points.botRight){
      return [];
    }
    return [
      points.botRight,
      points.botLeft,
      points.topLeft,
      points.topRight
    ];
  }

  @computed
  get functionsPoints(){
    const functions = this.functions;
    const points = this._getSurroundingPoints(functions);
    if(!points.topLeft){
      return [];
    }
    return [
      points.topLeft,
      points.topRight,
      points.botRight,
      points.botLeft
    ];
  }

  @computed
  get transactionBounds(){
    const points = [];
    const functionsPoints = this.functionsPoints;
    const processesPoints = this.processesPoints;
    points.push(...functionsPoints);
    points.push(...processesPoints);
    return points;
  }
  addActivity(activity){
    const inTransaction = new InTransaction();
    inTransaction.source = this;
    inTransaction.target = activity;
    this.model.addRelation(inTransaction);
  }

  removeActivity(activity){
    for(let rel of this.inTransactions){
      if(rel.target == activity){
        this.model.removeComponent(rel);
      }
    }
  }

};
