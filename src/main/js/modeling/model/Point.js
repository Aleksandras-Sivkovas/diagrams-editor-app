import {observable,computed} from "mobx";

export default class Point {

	@observable
	_x;

	@observable
	_y;

	@computed
	get x(){
		return this._x;
	}

	set x(x){
		this._x = x;
	}

	@computed
	get y(){
		return this._y;
	}

	set y(y){
		this._y = y;
	}

	constructor(x,y){
		this.x = x ? x : 0;
		this.y = y ? y : 0;
	}
};
