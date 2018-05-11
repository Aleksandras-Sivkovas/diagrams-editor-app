import {observable, computed} from "mobx";
import {Label} from "modeling";

export default class TransactionLabel extends Label {

  transaction;

  @computed
	get position(){
		return this.transaction.labelPosition;
	}

	set position(position){
		this.transaction.labelPosition = position;
	}

  @computed
	get name(){
		return this.transaction.name;
	}
	set name(name){
		this.transaction.name = name;
	}


};
