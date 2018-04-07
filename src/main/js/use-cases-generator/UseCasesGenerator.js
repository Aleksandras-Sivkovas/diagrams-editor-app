import {DVCMModel,Activity,SequenceFlow,Transaction} from "dvcm";
import {UseCasesModel,UseCases,UseCase,Association,Inclusion,Extension,System,Actor} from "use-cases"

export default class UseCasesGenerator {

  generate(model){
    if(model instanceof DVCMModel){
      return this.generateFromDVCM(model);
    }
    return null;
  }

  generateFromDVCM(dvcm){
    const sequenceFlows = dvcm.sequenceFlows;
    const transactions = dvcm.transactions;

    const useCases = [];
    const edges = [];

    for(let transaction of transactions){
      const process = transaction.processes.length > 0 ?
          transaction.processes[0] : null;
      if(process == null){
        continue;
      }
  		const flowUsecases = this._getUseCasesForProcess(process,sequenceFlows);
  		this._addNewUsecases(edges,useCases,flowUsecases,transaction);
  	}

    // getFunctions
    const functions =  dvcm.activities.filter(activity => activity.isFunction);

  	this._addGeneralUseCases(edges,useCases,functions);
  	this._addUnusedCases(useCases,functions);


  	return this._createUseCaseDiagramModel(dvcm.name,useCases,edges);
  }

  _getUseCasesForProcess(process,sequenceFlows){
    const processFlows = sequenceFlows.filter(flow => (flow.source == process));
  	const cycledFlows = [];
  	for(let flow of processFlows){
  		this._addCycledFlows(cycledFlows,[], flow,process,sequenceFlows)
  	}
  	const processUsecases = [];
  	for(let flow of cycledFlows){
  		const useCase = this._createUseCase(flow);
  		processUsecases.push(useCase);
  	}
  	return processUsecases;
  }

  _createUseCaseFromFlow(flow){
    const useCase = new UseCase(flow.target.name);
    return {
      createdFromFlow:flow,
      useCase: useCase,
      usedBy: [flow.target.parent]
    }
  }

  _createUseCaseFromTransaction(transaction){
    const useCase = new UseCase(transaction.name);
    return {
      createdFromFlow:{},
      useCase: useCase,
      usedBy: []
    }
  }

  _createUseCaseFromActivity(activity){
    const useCase = new UseCase(activity.name);
    return {
      createdFromFlow:{},
      useCase: useCase,
      usedBy: [activity.parent]
    }
  }
  /**
   * @param component may be of type SequenceFlow, Transaction
   */
  _createUseCase(component){
    if(component instanceof SequenceFlow){
      return this._createUseCaseFromFlow(component);
    }
    if(component instanceof Transaction){
      return this._createUseCaseFromTransaction(component);
    }
    const useCase = new UseCase(component.name);
    return {
      createdFromFlow:{},
      useCase: useCase,
      usedBy: [component.parent]
    };
  }

  /** Creates Include edge between use cases.
   * @param mainUseCase including use case
   * @param useCase included use case
   */
  _createIncludeEdge(mainUseCase,useCase){
    const include = new Inclusion();
    include.source = mainUseCase.useCase;
    include.target = useCase.useCase;

    include.sourcePoint.y = Math.floor(mainUseCase.useCase.height/2);
    include.sourcePoint.x = 0;

    include.targetPoint.x = useCase.useCase.width;
    include.targetPoint.y = Math.floor(useCase.useCase.height/2);

    return include;
  }

  /** Creates extend edge between use cases.
   * @param generalUseCase extended use case
   * @param useCase extending use case
   */
  _createExtendEdge(generalUseCase,useCase){
    const extend = new Extension();
    extend.source = useCase.useCase;
    extend.target = generalUseCase.useCase;

    extend.sourcePoint.y = Math.floor(useCase.useCase.height/2);
    extend.sourcePoint.x = useCase.useCase.width;

    extend.targetPoint.x = 0;
    extend.targetPoint.y = Math.floor(generalUseCase.useCase.height/2);

    return extend;
  }

  /**
   * @param activity activity that is used by multiple transactions
   */
  _createGeneraluseCase(activity){
    return this._createUseCaseFromActivity(activity);
  }

  /**
   * @param activity activity that is not used by transactions
   */
  _createUnusedUsecase(activity){
    const useCase = this._createUseCaseFromActivity(activity);
    useCase.useCase.name += "Not in transaction";
    return useCase;
  }

  _addCycledFlows = function(cycledFlows,currentPath, newFlow,process,sequenceFlows){
  	if(newFlow.target == process){
  		return true;
  	}
  	if(!newFlow.target.isFunction){
  		return false;
  	}
  	if(currentPath.includes(newFlow)){
  		return false;
  	}
  	if(cycledFlows.includes(newFlow)){
  		return true; // We already found path this way
  	}
  	const nextFlows = sequenceFlows.filter(flow => (flow.source == newFlow.target));
  	if(nextFlows.length == 0){
  		return false;
  	}
  	cycledFlows.push(newFlow);
  	currentPath.push(newFlow);
  	let pathFound = false;
  	for(let flow of nextFlows){
  		if(this._addCycledFlows(cycledFlows,currentPath,flow,process,sequenceFlows)){
  			pathFound = true;
        break;
  		}
  	}
  	if(!pathFound){
      // Remove newFlow
  		cycledFlows.splice(cycledFlows.indexOf(newFlow),1);
  	}
    // Remove newFlow
    currentPath.splice(currentPath.indexOf(newFlow),1);
  	return pathFound;
  }

  _addNewUsecases(edges,useCases,newUseCases,transaction){
    if(newUseCases.length < 1){
  		return;
  	}
  	if(newUseCases.length == 1){
  		useCases.push(newUseCases[0]);
  		return;
  	}
  	const mainUseCase = this._createUseCase(transaction);
  	useCases.push(mainUseCase);
  	for(let useCase of newUseCases){
  		useCases.push(useCase);
  		const edge = this._createIncludeEdge(mainUseCase,useCase);
  		edges.push(edge);
  	}
  }

  _addGeneralUseCases(edges,useCases,functions){
    for(let f of functions){
  		const useCasesUsingThisFunction = useCases.filter(
        useCase => (useCase.createdFromFlow.target == f)
      );
  		if(useCasesUsingThisFunction.length < 2){
  			continue;
  		}
  		const generalUseCase = this._createGeneraluseCase(f);
  		useCases.push(generalUseCase);
  		for(let useCase of useCasesUsingThisFunction){
  			const edge = this._createExtendEdge(generalUseCase,useCase);
  			edges.push(edge);
  		}
  	}
  }

  _addUnusedCases(useCases,functions){
    for(let f of functions){
  		const useCasesUsingThisFunction = useCases.filter(
        useCase => (useCase.createdFromFlow.target == f)
      );
  		if(useCasesUsingThisFunction.length > 0){
  			continue;
  		}
  		const useCase = this._createUnusedUsecase(f);
  		useCases.push(useCase);
  	}
  }

  _getActorsMap(useCases){
    const actors = new Map();
    for(let useCase of useCases){
      for(let pool of useCase.usedBy){
        if(actors.get(pool)){
          continue;
        }
        const actor = new Actor(pool.name);
        actors.set(pool,actor);
      }
    }
    return actors;
  }

  _addActors(useCasesComponent,actors){
    let x = 10;
    let y = 10;
    for(let actor of actors){
      actor.position.x = x;
      actor.position.y = y;
      useCasesComponent.append(actor);
      y += 200;
    }
  }

  /** Checks if use case is not Extended or including use case.
   * @param useCase use case to check
   * @param edges extensions and inclusions of model
   */
  _isFirstLevelCase(useCase,edges){
    return (
      edges.filter(
        edge => (
          (
            (edge instanceof Inclusion) &&
            (edge.source == useCase)
          ) ||
          (
            (edge instanceof Extension) &&
            (edge.target == useCase)
          )
        )
      ).length == 0
    );
  }

  _createUseCaseDiagramModel(name,useCases,edges,dvcm){
    const useCasesComponent = new UseCases();
    const model = useCasesComponent.model;
    useCasesComponent.model.name = name;
    const system = new System(name);
    system.position.x = 200;
    system.position.y = 50;
    useCasesComponent.append(system);

    const actors = this._getActorsMap(useCases);
    this._addActors(useCasesComponent,actors.values());

    const x1 = 10;
    let y1 = 10;
    const x2 = 300;
    let y2 = 100;
    for(let useCase of useCases){
      if(this._isFirstLevelCase(useCase.useCase,edges)){
        useCase.useCase.position.x = x1;
        useCase.useCase.position.y = y1;
        y1 += 120;
      }else{
        useCase.useCase.position.x = x2;
        useCase.useCase.position.y = y2;
        y2 += 120;
      }
      system.append(useCase.useCase);
      for(let pool of useCase.usedBy){
        const actor = actors.get(pool);
        const association = new Association();

        association.sourcePoint.y = Math.floor(actor.height/2);
        association.sourcePoint.x = actor.width;

        association.targetPoint.y = Math.floor(useCase.useCase.height/2);

        association.source = actor;
        association.target = useCase.useCase;

        model.addEdge(association);
      }
    }
    system.height = Math.max(y1,y2);
    system.width = 500;

    useCasesComponent.height = system.height + 100;

    for(let edge of edges){
      model.addEdge(edge);
    }



    return model;
  }

};
