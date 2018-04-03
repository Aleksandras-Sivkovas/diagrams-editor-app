import {observable, computed} from "mobx";
import Component from "./Component.js";
import Model from "./Model.js";
import Point from "./Point.js";

export default class Node extends Component {

	constructor(){
		super();
		this._position = new Point();
		this.createModel();
	}

	@observable
	_position = null;

	@observable
	_width = null;


	@observable
	_borderWidth = 1;

	@observable
	_height = null;

	@computed
	get position(){
		return this._position;
	}

	set position(position){
		this._position = position;
	}

	@computed
	get width(){
		return this.getWidth();
	}

	set width(width){
		this.setWidth(width);
	}

	@computed
	get height(){
		return this._height;
	}

	set height(height){
		this._height = height;
	}

	getWidth(){
		return this._width;
	}

	setWidth(width){
		this._width = width;
	}

	@computed
	get borderWidth(){
		return this.getBorderWidth();
	}
	set borderWidth(width){
		this.setBorderWidth(width)
	}

	getBorderWidth(){
		return this.selected ? this._borderWidth+3 : this._borderWidth;
	}
	setBorderWidth(width){
		this._borderWidth = width;
	}

	@computed
	get contentHeight(){
		return this.endPosition.y - this.startPosition.y;
	}

	@computed
	get startPosition(){
		return {
			x:this.borderWidth,
			y:this.borderWidth
		}
	}

	@computed
	get endPosition(){
		return {
			x:this.width + this.borderWidth,
			y:this.height + this.borderWidth
		}
	}

	@computed
	get positionInRoot(){
		const position = new Point();
		for(let parent of this.parents){
			position.x = position.x  + parent.position.x + parent.startPosition.x;
			position.y = position.y  + parent.position.y + parent.startPosition.y;
		}
		position.x +=  this.position.x;
		position.y +=  this.position.y;
		return position;
	}

	@computed
	get parent(){
    return this.model.getParent(this);
  }

  set parent(parent){
    console.warn("setting parent not implemented");
  }

	@computed
	get parents(){
    return this.model.getParents(this);
  }

  set parents(parent){
    console.warn("setting parents not implemented");
  }

	@computed
	get children(){
    return this.getChildren();
  }

	@computed
	get descendants(){
		this.model.getDescendants(this);
	}

	createModel(){
		const modelClass = this.getModelClass()
		this.model = new modelClass();
		this.model.addAsRoot(this);
	}

	getModelClass(){
		return Model;
	}

	append(node) {
		this.model.addNode(node,this);
	}

	getChildren(){
		return this.model.getChildren(this);
	}

	_getInRange(point,max,min){
		if(point < 0){
			return 0;
		}
		if(point > max){
			return max;
		}
		return point;
	}
	getEdgePointPosition(position){
		const point =  {};
		point.y = this._getInRange(position.y,this.height);
		point.x = this._getInRange(position.x,this.width);
		const distRight = this.width - point.x;
		const distBot = this.height - point.y;

		const minDist = Math.min(point.y,point.x,distRight,distBot);
		switch (minDist) {
		  case point.y:
				point.y = 0;
				break;
			case point.x:
				point.x = 0;
				break;
			case distRight:
				point.x = this.width;
				break;
			case distBot:
				point.y = this.height;
				break;
		}
		return point;
	}

};
