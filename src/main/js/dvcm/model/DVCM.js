import {observable,computed} from "mobx";
import {Node} from 'modeling';
import Activity from "./Activity";
import Pool from './Pool.js';
import DVCMModel from './DVCMModel.js';
import {localeSettings} from "localizable";

export default class DVCM extends Node {

	constructor(){
		super();
		this.width = 900;
		this.height = 900;
	}

	@computed
	get functionsPool(){
		return this.children[1];
	}

	@computed
	get processesPool(){
		return this.children[0];
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
		pool.name = localeSettings.localize("dvcm_functions","Functions");
		this.append(pool);
	}

	_addProcessPool(){
		const pool = new Pool();
		pool.name = localeSettings.localize("dvcm_processes","Processes");
		this.append(pool);
	}

};
