import {observable, computed} from "mobx";
import {Node} from 'modeling';

export default class UseCase extends Node {

	@observable
	name = "UseCase"

	@computed
	get width(){
		return this.height * 2;
	}
	set width(width){
		this.height = Math.floor(width / 2);
	}
	constructor(name){
		super();
		this.name = name;
		this.height = 80;
	}
};
