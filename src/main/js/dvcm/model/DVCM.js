import {observable,computed} from "mobx";
import {Node} from 'modeling';
import Pool from './Pool.js';

export default class DVCM extends Node {

	@observable
  _rootPoolsHeight = null;

	@computed
	get rootPoolsHeight(){
		if(this._rootPoolsHeight){
			return this._rootPoolsHeight;
		}
		return 900;
	}
	set rootPoolsHeight(height){
		this._rootPoolsHeight = height;
	}

	createModel(){
		super.createModel();
		this._addProcessPool();
		this._addFunctionsPool();
	}

	_addFunctionsPool(){
		const pool = new Pool();
		pool.name = "Functions";
		this.append(pool);
		this.functions = pool;
	}

	_addProcessPool(){
		const pool = new Pool();
		pool.name = "Processes";
		this.append(pool);
		this.processes = pool;
	}

};
