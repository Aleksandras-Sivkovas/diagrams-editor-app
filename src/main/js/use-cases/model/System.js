import {observable, computed} from "mobx";
import {Node} from 'modeling';

export default class System extends Node {

	@observable
	name = "System"

	constructor(name){
		super();
		this.name = name;
		this.width = 400;
		this.height = 400;
	}
};
