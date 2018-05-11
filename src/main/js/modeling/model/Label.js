import {observable, computed} from "mobx";

import Node from "./Node.js";

export default class Label extends Node {


	@computed
	get name(){
		return this._name;
	}
	set name(name){
		this._name = name;
	}

};
