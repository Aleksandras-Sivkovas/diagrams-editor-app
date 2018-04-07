import {observable, computed} from "mobx";
import {Node} from 'modeling';

export default class Activity extends Node {

	@observable
	name = "Activity"

	constructor(name){
		super();
		this.name = name;
		this.width = 80;
		this.height = 80;
	}

	@computed
	get isFunction(){
		return this.parents.includes(this.model.root.functionsPool);
	}

	@computed
	get isProcess(){
		return this.parents.includes(this.model.root.processesPool);
	}
};
