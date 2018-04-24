import {observable,action,computed} from "mobx";
import {ImageExporter} from "export-as-image";
import {DVCM} from "dvcm";
import {UseCases} from "use-cases";
import DiagramsLocalStorage from "./DiagramsLocalStorage.js";
import {UseCasesGenerator} from "use-cases-generator"

const paths = {
		DIAGRAM: "/diagram",
		NEW_DIAGRAM: "/new",
		NEW_USE_CASES: "/new/use-cases",
		EXPORT: "/export"
};

export default class DiagramsEditorModel{

	@observable
	diagram;

	@observable
	_navigation

	constructor(){
		this._createStorage();
	}

	@computed
	get pageDiagram(){
		return (this._navigation == paths.DIAGRAM);
	}
	@computed
	get pageNewDiagram(){
		return (this._navigation == paths.NEW_DIAGRAM);
	}
	@computed
	get pageNewUseCases(){
		return (this._navigation == paths.NEW_USE_CASES);
	}

	@computed
	get pageExport(){
		return (this._navigation == paths.EXPORT);
	}

	@computed
	get isModelInContext(){
		return (this.pageDiagram && this.diagram);
	}

	@action
	_onStorageLoad(response){
		this.diagram = response.model;
		this._navigateToDiagram();
	}

	@action
	_onStorageSaved(){
		this._navigateToDiagram();
	}

	_navigateToDiagram(){
		this._navigation = paths.DIAGRAM;
	}

	_createStorage(){
		this._storage = new DiagramsLocalStorage();
	}


	@action
	import(){
		this._storage.onLoad = this._onStorageLoad.bind(this);
		this._storage.load();
	}

	@action
	exportAsJSON(){
		if(!this.diagram){
			return;
		}
		this._navigateToDiagram();
		this._storage.onSave = this._onStorageSaved.bind(this);
		this._storage.store(this.diagram);
	}

	@action
	exportAsImage(){
		if(!this.diagram){
			return;
		}
		// TODO: think of better option to do this
		this.diagram.selected = null;
		this._navigateToDiagram();
		this._waitDiagramRenderingAndExport();
	}

	_waitDiagramRenderingAndExport(){
		const container = document.getElementById("diagram-container");
		if(container){
			const imageExporter = new ImageExporter();
			imageExporter.exportAsImage(
				container.children[0],
				this.diagram.name
			);
			return;
		}
		const waitingFunction = this._waitDiagramRenderingAndExport.bind(this);
		setTimeout(waitingFunction,100);
	}


	@action
	_generateUseCasesFromDvcmModel(response){
		const generator = new UseCasesGenerator();
		this.diagram = generator.generate(response.model);
		this._navigateToDiagram();
	}
	@action
	_generateUseCasesFromDvcmFile(){
		this._storage.onLoad = this._generateUseCasesFromDvcmModel.bind(this);
		this._storage.load();
	}

	@action
	navigateToNewDiagram(){
		this._navigation = paths.NEW_DIAGRAM;
	}

	@action
	navigateToNewDvcm(){
		const dvcm = new DVCM();
    this.diagram = dvcm.model;
		this._navigateToDiagram();
	}

	@action
	navigateToNewUseCases(){
		const useCases = new UseCases();
    this.diagram = useCases.model;
		this._navigateToDiagram();
	}

	@action
	navigateToNewUeCases(){
		this._navigation = paths.NEW_USE_CASES;
	}

	@action
	navigateToGenerateUseCases(){
		this._generateUseCasesFromDvcmFile();
	}

	@action
	navigateToExport(){
		this._navigation = paths.EXPORT;
	}

};
