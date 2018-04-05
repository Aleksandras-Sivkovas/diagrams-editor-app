import {observable} from "mobx";
import {DVCM} from "dvcm";
import {UseCases} from "use-cases";
import controllTypes from "./controlls/controllTypes.js";
import DiagramsLocalStorage from "./DiagramsLocalStorage.js";

export default class DiagramsEditorModel{
	@observable
	diagram;

	@observable
	controlls;

	constructor(){
		this._createStorage();
	}
	_onStorageLoad(response){
		window.model = response.model;
		this.diagram = response.model;
		this.controlls = controllTypes.MAIN;
	}
	_onStorageSaved(){
		this.controlls = controllTypes.MAIN;
	}
	_createStorage(){
		this._storage = new DiagramsLocalStorage();
		this._storage.onLoad = this._onStorageLoad.bind(this);
		this._storage.onSave = this._onStorageSaved.bind(this);
	}
	newDiagram(){
		this.controlls = controllTypes.NEW;
	}

	import(){
		this._storage.load();
	}

	export(){
		this._storage.store(this.diagram);
	}

};
