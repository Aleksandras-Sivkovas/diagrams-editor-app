import {observable, computed} from "mobx";
import {Point} from "modeling";

export default class TransactionLabelPoint extends Point {

  @observable
  transactionLabel;

  constructor(transactionLabel){
    super();
    this.transactionLabel = transactionLabel;
  }

  @computed
	get x(){
		return this._startPosition.x +
        this.transactionLabel.transaction.labelPosition.x;
	}

	set x(x){
    if(!this.transactionLabel){
      return;
    }
    this.transactionLabel.transaction.labelPosition.x =
        x - this._startPosition.x;
	}

	@computed
	get y(){
		return this._startPosition.y +
        this.transactionLabel.transaction.labelPosition.y;
	}

	set y(y){
    if(!this.transactionLabel){
      return;
    }
    this.transactionLabel.transaction.labelPosition.y =
        y - this._startPosition.y;
	}

  @computed
  get _startPosition(){
    const functionsRectangle =
        this.transactionLabel.transaction.functionsPoints;
    let x = 0;
    let y = 0;
    if(functionsRectangle.length == 4){
      const p1 = functionsRectangle[1];
      const p2 = functionsRectangle[2];
      x = p1.x;
      const width = p2.y - p1.y;
      y = Math.floor(width/2) + p1.y;
    }
    return {x:x,y:y};
  }
}
