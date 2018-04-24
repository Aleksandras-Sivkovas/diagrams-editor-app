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
    const actors = new Map();
    const useCasesFunctionsmap = new Map();

    for(let transaction of transactions){
      if(transaction.processes.length < 1){
        continue;
      }
      const process = transaction.processes[0];
      const transactionSequenceFlows = this.
          _getTransactionSequenceFlows(transaction,sequenceFlows);
  		const cycle = this.
          _getCycleForProcess(process,transactionSequenceFlows);
      if(!cycle){
        continue;
      }
  		this._addUseCases(edges,useCases,actors,cycle,transaction,useCasesFunctionsmap);
  	}

    // getFunctions
    const functions =  dvcm.activities.filter(activity => activity.isFunction);

  	this._addGeneralUseCases(edges,useCases,functions,useCasesFunctionsmap);
  	// this._addUnusedCases(useCases,functions);

  	return this._createUseCaseDiagramModel(dvcm.name,useCases,edges,actors);
  }

  _getTransactionSequenceFlows(transaction,sequenceFlows){
    const activities = transaction.activities;
    return sequenceFlows.filter(flow => (
      (activities.includes(flow.source)) && (activities.includes(flow.target))
    ));
  }

  _getCycleForProcess(process,sequenceFlows){
    const processFlows = sequenceFlows.filter(flow => (flow.source == process));
    if(processFlows.length == 0){
      return null;
    }
    const processFlow = processFlows[0];
  	const cycledFlows = [];
  	this._addCycledFlows(cycledFlows,[],processFlow,process,sequenceFlows);
    const starts = cycledFlows.filter(flow => (flow.source == process));
    if(starts.length == 0){
      return null;
    }
    const ends = cycledFlows.filter(flow => (flow.target == process));
    if(ends.length == 0){
      return null;
    }
    return {
      start:  starts[0],
      ends:   ends,
      cycledFlows:  cycledFlows,
      process: process
    };
  }
  _addUseCases(edges,useCases,actors,cycle,transaction,useCasesFunctionsmap){
    const mainUseCase = new UseCase(transaction.name);
    useCases.push(mainUseCase);
    this._addProcessAsActor(edges,useCases,actors,cycle,mainUseCase);
    const mainPrefix = transaction.name + ":";
  	for(let flow of cycle.cycledFlows){
      if(flow.target == cycle.process){
        continue;
      }
      const name = mainPrefix + flow.target.name;
  		const useCase = new UseCase(name);
      useCases.push(useCase);
      const include = new Inclusion();
      include.source = mainUseCase;
      include.target = useCase;
  		edges.push(include);

      const actorName = flow.target.parent.name;
      let actor = actors.get(actorName);
      if(!actor){
        actor = new Actor(actorName);
        actors.set(actorName,actor);
      }

      const association = new Association();
      edges.push(association);
      association.source = actor;
      association.target = useCase;
      let associationName = flow.name;
      association.name = associationName;

      let functionUseCases = useCasesFunctionsmap.get(flow.target);
      if(!functionUseCases){
        functionUseCases = [];
        useCasesFunctionsmap.set(flow.target,functionUseCases);
      }
      functionUseCases.push(useCase);
  	}
  }
  _addProcessAsActor(edges,useCases,actors,cycle,useCase){
    const actorName = cycle.start.source.name;
    let actor = actors.get(actorName);
    if(!actor){
      actor = new Actor(actorName);
      actors.set(actorName,actor);
    }

    const association = new Association();
    edges.push(association);
    association.source = actor;
    association.target = useCase;
    let associationName = cycle.start.name;
    for(let end of cycle.ends){
      associationName += " " + end.name;
    }
    association.name = associationName;
    // TODO: move view things somewhere else
    // association.sourcePoint.y = Math.floor(actor.height/2);
    // association.sourcePoint.x = actor.width;
    // association.targetPoint.y = Math.floor(useCase.height/2);
  }
  _addCycledFlows = function(cycledFlows,currentPath, newFlow,process,sequenceFlows){
    if(currentPath.includes(newFlow)){
      return false;
    }
    if(cycledFlows.includes(newFlow)){
      return true; // We already found path this way
    }
    if(newFlow.target == process){
      cycledFlows.push(newFlow);
      return true;
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
        // No brake because we need to recursivelly add all paths
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


  /**
   * @param activity activity that is not used by transactions
   */
  _createUnusedUsecase(activity){
    const useCase = this._createUseCaseFromActivity(activity);
    useCase.name += "Not in transaction";
    return useCase;
  }

  _addGeneralUseCases(edges,useCases,functions,useCasesFunctionsmap){
    for(let f of functions){
  		const useCasesUsingThisFunction = useCasesFunctionsmap.get(f);
  		if(!useCasesUsingThisFunction || (useCasesUsingThisFunction.length < 2)){
  			continue;
  		}
  		const generalUseCase = new UseCase(f.name);
  		useCases.push(generalUseCase);
  		for(let useCase of useCasesUsingThisFunction){
        const extend = new Extension();
        extend.source = useCase;
        extend.target = generalUseCase;
  			edges.push(extend);
  		}
  	}
  }

  _addUnusedCases(useCases,functions){
    const createdFromFunction = function(useCase) {
      return (useCase.createdFromFlow.target == this);
    }
    for(let f of functions){
      if(useCases.some(createdFromFunction,f)){
        continue;
      }
  		const useCase = this._createUnusedUsecase(f);
  		useCases.push(useCase);
  	}
  }

  _addActors(useCasesComponent,actors){
    let x = 10;
    let y = 10;
    for(let actor of actors){
      actor.position.x = x;
      actor.position.y = y;
      useCasesComponent.append(actor);
      y += actor.height + 20;
    }
  }

  _addToLevels(edges,useCases){
    const added = new Set();

    const extended = [];
    const extensions = edges.filter(edge => (edge instanceof Extension));
    for(let extension of extensions){
      const useCase = extension.target;
      if(added.has(useCase)){
        continue;
      }
      added.add(useCase);
      extended.push(useCase);
    }

    const included = [];
    const inclusions = edges.filter(edge => (edge instanceof Inclusion));
    for(let inclusion of inclusions){
      const useCase = inclusion.source;
      if(added.has(useCase)){
        continue;
      }
      added.add(useCase);
      included.push(useCase);
    }

    const left = [];
    for(let useCase of useCases){
      if(added.has(useCase)){
        continue;
      }
      added.add(useCase);
      left.push(useCase);
    }



    let x = 10;
    const distance = 300;
    const levels = [];
    levels.push({
      cases: left,
      x:x,
      y:10
    });
    if(included.length > 0){
      x += distance;
      levels.push({
        cases: included,
        x:x,
        y:100
      });
    }
    if(extended.length > 0){
      x += distance;
      levels.push({
        cases: extended,
        x:x,
        y:100
      });
    }
    return levels;

  }
  _createUseCaseDiagramModel(name,useCases,edges,actors){
    const useCasesComponent = new UseCases();
    const model = useCasesComponent.model;
    useCasesComponent.model.name = name;
    const system = new System(name);
    system.position.x = 200;
    system.position.y = 50;
    useCasesComponent.append(system);

    // const actorsList = actors.values();
    this._addActors(useCasesComponent,actors.values());

    const levels = this._addToLevels(edges,useCases);
    let maxY = 0;
    for(let level of levels){
      for(let useCase of level.cases){
        useCase.position.x = level.x;
        useCase.position.y = level.y;
        level.y += useCase.height + 50;
        if(level.y > maxY){
          maxY = level.y;
        }
        system.append(useCase);
      }
    }

    for(let edge of edges){
      model.addEdge(edge);
      const ends = this._getLeftRight(edge);
      ends.leftPoint.y = Math.floor(ends.left.height/2);
      ends.leftPoint.x = ends.left.width;

      ends.rightPoint.x = 0;
      ends.rightPoint.y = Math.floor(ends.right.height/2);
    }

    system.height = maxY+120;
    system.width = levels[levels.length - 1].x + 300;

    useCasesComponent.height = system.height + 400;
    useCasesComponent.width = system.width + 400;


    return model;
  }

  _getLeftRight(edge){
    const el1 = edge.source;
    const el2 = edge.target;
    if(el1.positionInRoot.x < el2.positionInRoot.x){
      // console.log(el1.positionInRoot.x +" < " + el2.positionInRoot.x);
      return {
        left:el1,
        leftPoint: edge.sourcePoint,
        right:el2,
        rightPoint:edge.targetPoint
      }
    }
    // console.log(el1.positionInRoot.x +" >= " + el2.positionInRoot.x);
    return {
      left:el2,
      leftPoint: edge.targetPoint,
      right:el1,
      rightPoint:edge.sourcePoint
    }
  }

};
