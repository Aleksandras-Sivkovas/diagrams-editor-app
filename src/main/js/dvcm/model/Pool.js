import {observable, computed} from "mobx";
import {Column} from 'modeling';

export default class Pool extends Column {

	@observable
	name = "Pool";

	@computed
	get fitInParent(){
		if(this.parent.rootPoolsHeight){
			return false;
		}
		return true;
	}

	@computed
	get startPosition(){
		return {
			x:this.borderWidth,
			y:61 + this.borderWidth
		}
	}

	constructor(name){
		super();
		this.name = name;
		this.width = 300;
	}

	@computed
	get height(){
		if(this.parent.rootPoolsHeight){
			return this.parent.rootPoolsHeight;
		}
		return this.parent.contentHeight;
	}

	set height(height){
		if(!this.parent){
			return;
		}
		if(this.parent.rootPoolsHeight){
			this.parent.rootPoolsHeight = height;
		}
	}

};
