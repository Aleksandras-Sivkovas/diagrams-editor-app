import {observable, computed} from "mobx";
import {Node} from 'modeling';

export default class Actor extends Node {

	@observable
	name = "Actor"

	@computed
	get height(){
		return this.width * 2;
	}
	set height(height){
		this.width = Math.floor(height / 2);
	}
	constructor(name){
		super();
		this.name = name;
		this.width = 40;
	}
};
