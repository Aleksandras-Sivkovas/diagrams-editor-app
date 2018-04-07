import {observable,action} from "mobx";
import {DVCM} from "dvcm";
import {UseCases} from "use-cases";
import controllTypes from "./controlls/controllTypes.js";
import DiagramsLocalStorage from "./DiagramsLocalStorage.js";
import {UseCasesGenerator} from "use-cases-generator"

export default class DiagramsEditorModel{
	@observable
	diagram;

	@observable
	controlls;

	constructor(){
		this._createStorage();
	}

	@action
	_onStorageLoad(response){
		this.diagram = response.model;
		this._loadMain();
	}

	@action
	_onStorageSaved(){
		this._loadMain();
	}

	_loadMain(){
		this.controlls = controllTypes.MAIN;
	}

	_createStorage(){
		this._storage = new DiagramsLocalStorage();
	}

	@action
	newDiagram(){
		this.controlls = controllTypes.NEW;
	}

	@action
	import(){
		this._storage.onLoad = this._onStorageLoad.bind(this);
		this._storage.load();
	}

	@action
	export(){
		if(!this.diagram){
			return;
		}
		this._storage.onSave = this._onStorageSaved.bind(this);
		this._storage.store(this.diagram);
	}

	@action
	_generateUseCasesFromDvcmModel(response){
		const generator = new UseCasesGenerator();
		this.diagram = generator.generate(response.model);
		this._loadMain();
	}
	@action
	_generateUseCasesFromDvcmFile(){
		this._storage.onLoad = this._generateUseCasesFromDvcmModel.bind(this);
		this._storage.load();
	}

	@action
	dvcmChosen(){
		const dvcm = new DVCM();
    this.diagram = dvcm.model;
		this._loadMain();
	}

	@action
	useCasesChosen(){
		this.controlls = controllTypes.NEW_USE_CASES;
	}

	@action
	createNewChosen(){
		switch(this.controlls){
			case controllTypes.NEW_USE_CASES:{
				const useCases = new UseCases();
		    this.diagram = useCases.model;
			}
			break;
		}
		this._loadMain();
	}

	@action
	generateChosen(){
		switch(this.controlls){
			case controllTypes.NEW_USE_CASES:{
				this._generateUseCasesFromDvcmFile();
			}
			break;
		}
		this._loadMain();
	}

};
