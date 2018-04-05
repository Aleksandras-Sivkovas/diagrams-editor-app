import {observable, computed} from "mobx";
import {Node} from 'modeling';

export default class UseCases extends Node {

	@observable
	name = "UseCases"

	constructor(name){
		super(...arguments);
		this.name = name;
		this.width = 900;
		this.height = 900;
	}


};
