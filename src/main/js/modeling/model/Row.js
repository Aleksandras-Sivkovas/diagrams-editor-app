import {observable, computed} from "mobx";

import Node from "./Node.js";
import Point from "./Point.js";

export default class Row extends Node {

	@computed
	get position(){
		const siblingsPools = this.parent.children
				.filter(sibling => (sibling instanceof Row));
		const position = new Point();
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
		position.y = previousPosition.y + 2*previous.borderWidth + previous.height;
		return position;
	}

	@computed
	get width(){
		return this.parent.width;
	}

	set width(width){
		console.warn("Row width is not resizable");
	}
};
