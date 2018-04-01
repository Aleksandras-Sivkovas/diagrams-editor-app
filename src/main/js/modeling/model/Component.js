import {observable,computed} from "mobx";

export default class Component {

	@observable
	id = null;


	@observable
	model = null;

	remove() {
		this.model.removeComponent(this);
	}

	@computed
	get selected(){
		return (this.model.selected == this)
	}
	set selected(selected){
		if(selected){
			this.model.selected = this;
			return;
		}
		this.model.selected = null;
	}

	select(){
		this.selected = true;
	}
};
