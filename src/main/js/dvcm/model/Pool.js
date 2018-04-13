import {observable, computed} from "mobx";
import {Column} from 'modeling';

export default class Pool extends Column {

	@observable
	name = "Pool";

	@computed
	get fitInParent(){
		if(this.parent == this.model.root){
			return false;
		}
		return true;
	}

	@computed
	get startPosition(){
		return {
			x:0,
			y:61
		}
	}

	constructor(name){
		super();
		this.name = name;
		this.width = 300;
	}

	@computed
	get height(){
		return this.parent.contentHeight;
	}

	set height(height){

	}

};
