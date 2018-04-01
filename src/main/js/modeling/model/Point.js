import {observable} from "mobx";

export default class Point {

	@observable
	x = 0;

	@observable
	y = 0;

	constructor(x,y){
		if(x) this.x = x;
		if(y) this.y = y;
	}
};
