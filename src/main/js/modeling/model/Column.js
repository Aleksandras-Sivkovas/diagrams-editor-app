import {observable, computed} from "mobx";

import Node from "./Node.js";
import Point from "./Point.js";

export default class Column extends Node {

	@computed
	get fitInParent(){
		return false;
	}

	@computed
	get position(){
		const position = new Point();
		const parent = this.parent;
		if(!parent){
			return position;
		}
		const siblingsPools = parent.children
				.filter(sibling => (sibling instanceof Column));
		let previous  = null;
		for(let pool of siblingsPools){
			if(pool == this){
				break;
			}
			previous = pool;
		}
		if(!previous){
			return position;
		}
		const previousPosition = previous.position;
		position.x = previousPosition.x + 2*previous.borderWidth + previous.width;
		return position;
	}

	set position(position){
	}

	getWidth(){
		if(!this.fitInParent){
			return super.getWidth();
		}
		const parent = this.parent;
		if(!parent){
			return super.getWidth();
		}
		const columns = parent.children
				.filter(sibling => (sibling instanceof Column));

		if(columns.length < 2){
			return parent.width;
		}
		const last = columns[columns.length-1];
		if(last != this){
			return super.getWidth();
		}
		const previous = columns[columns.length-2];
		const previousPosition = previous.position;
		const width = parent.width - (previousPosition.x + 2*previous.borderWidth + previous.width);

		return width;
	}

	isResizable(){
		const parent = this.parent;
		if(!parent){
			return true;
		}
		const columns = parent.children
				.filter(sibling => (sibling instanceof Column));

		const last = columns[columns.length-1];
		if(last == this){
			return false;
		}
		return true;
	}

	@computed
	get resizable(){
		return this.isResizable();
	}

	@computed
	get height(){
		return this.parent.height;
	}

	set height(height){
		console.warn("Column height is not resizable");
	}

};
