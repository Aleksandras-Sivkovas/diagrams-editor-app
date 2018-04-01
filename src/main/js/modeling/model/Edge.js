import {observable} from "mobx";
import Relation from "./Relation.js";
import Point from "./Point.js";

export default class Edge extends Relation {

	@observable
	bendPoints = [];

	@observable
	sourcePoint;

	@observable
	targetPoint;

	constructor(){
		super();
		this._initializeSourcePoints();
	}

	_initializeSourcePoints(){
		this.sourcePoint = new Point();
		this.targetPoint = new Point();
	}

	addBendPoint(x,y){
		this.bendPoints.push(new Point(x,y));
	}
};
