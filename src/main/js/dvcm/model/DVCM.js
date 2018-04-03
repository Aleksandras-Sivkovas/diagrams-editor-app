import {observable,computed} from "mobx";
import {Node} from 'modeling';
import Activity from "./Activity";
import Pool from './Pool.js';
import DVCMModel from './DVCMModel.js';

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

	@computed
	get functionsPool(){
		return this.children[1];
	}

	@computed
	get processesPool(){
		return this.children[0];
	}

	set rootPoolsHeight(height){
		this._rootPoolsHeight = height;
	}

	@computed
	get activities(){
		return this.functionsPool.descendants.filter(node => (node instanceof Activity));
	}

	@computed
	get processes(){
		return this.processesPool.descendants.filter(node => (node instanceof Activity));
	}

	createModel(){
		super.createModel();
		this._addProcessPool();
		this._addFunctionsPool();
	}

	getModelClass(){
		return DVCMModel;
	}

	_addFunctionsPool(){
		const pool = new Pool();
		pool.name = "Functions";
		this.append(pool);
	}

	_addProcessPool(){
		const pool = new Pool();
		pool.name = "Processes";
		this.append(pool);
	}

};
