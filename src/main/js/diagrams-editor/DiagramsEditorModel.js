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

	_diagramIndex = 0;

	@observable
	diagrams = new Map();

	@observable
	currentDiagramindex;

	@computed
	get diagram(){
		return this.diagrams.get(this.currentDiagramindex);
	}

	set diagram(diagram){
		this.currentDiagramindex = this._getNextDiagramIndex();
		this.diagrams.set(this.currentDiagramindex,diagram);
	}

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
		this.isExportoToImage = true;
		this._navigateToDiagram();
	}

	executeDiagramMounted(){
		if(this.isExportoToImage){
			this.isExportoToImage = false;
			const container = document.getElementById("diagram-container");
			const imageExporter = new ImageExporter();
			imageExporter.exportAsImage(
				container.children[0],
				this.diagram.name
			);
			return;
		}
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
	_generateUseCasesFromDvcmModelByTransaction(response){
		const generator = new UseCasesGenerator();
		const diagrams = generator.generateByTransactionFromDVCM(response.model);
		for(let diagram of diagrams){
			this.currentDiagramindex = this._getNextDiagramIndex();
			this.diagrams.set(this.currentDiagramindex,diagram);
		}
		this._navigateToDiagram();
	}
	@action
	_generateUseCasesFromDvcmFileByTransaction(){
		this._storage.onLoad = this._generateUseCasesFromDvcmModelByTransaction.bind(this);
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
	navigateToGenerateUseCasesByTransaction(){
		this._generateUseCasesFromDvcmFileByTransaction();
	}

	@action
	navigateToExport(){
		this._navigation = paths.EXPORT;
	}

	@action
	navigateToWelcome(){
		this._navigation = null;
	}

	_getNextDiagramIndex(){
		return this._diagramIndex++;
	}

	@action
	removeDiagram(diagramId){
		this.diagrams.delete(diagramId);
    if(this.currentDiagramindex == diagramId){
			if(this.diagrams.size > 0){
				this.currentDiagramindex = this.diagrams.keys()[0];
			}else{
				this.navigateToWelcome();
			}
		}
	}
};
