import {DVCMModel,Activity,SequenceFlow,Transaction} from "dvcm";
import {UseCasesModel,UseCases,UseCase,Association,Inclusion,
    Extension,System,Actor} from "use-cases"

export default class UseCasesFromDvcmDataGenerator {

  generateDVCMData(dvcm){
    const sequenceFlows = dvcm.sequenceFlows;
    const transactions = dvcm.transactions;

    const useCases = this.createUseCasesObject();
    const edges = [];
    const actors = new Map();
    const mappings = {
      useCasesFunctionsmap: new Map(),
      useCasesTransactionsMap: new Map()
    }

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
      this._addUseCases(edges,useCases,actors,cycle,transaction,mappings);
    }

    // getFunctions
    const functions =  dvcm.activities.filter(activity => activity.isFunction);

    this._addGeneralUseCases(edges,useCases,functions,mappings);
    this._addUnusedCases(edges,useCases,functions,actors,mappings);

    return {
      useCases:useCases,
      edges:edges,
      actors:actors,
      mappings:mappings,
    }
  }
  createUseCasesObject(){
    return {
      transactionuseCases:[],
      functionUseCases:[],
      subfunctionUseCases:[],
      generalUseCases:[],
      unusedUseCases:[]
    };
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
  _addUseCases(edges,useCases,actors,cycle,transaction,mappings){
    const mainUseCase = new UseCase(transaction.name);
    useCases.transactionuseCases.push(mainUseCase);

    let useCaseTransactions = new Set();
    mappings.useCasesTransactionsMap.set(mainUseCase,useCaseTransactions);
    useCaseTransactions.add(transaction);

    const mainPrefix = transaction.name + ":";
    const fuMap = new Map();
  	for(let flow of cycle.cycledFlows){
      if(flow.target == cycle.process){
        continue;
      }
      const name = mainPrefix + flow.target.name;
  		const useCase = new UseCase(name);
      useCases.subfunctionUseCases.push(useCase);
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

      fuMap.set(flow.target,useCase);

      let functionUseCases = mappings.useCasesFunctionsmap.get(flow.target);
      if(!functionUseCases){
        functionUseCases = [];
        mappings.useCasesFunctionsmap.set(flow.target,functionUseCases);
      }
      functionUseCases.push(useCase);

      let useCaseTransactions = new Set();
      mappings.useCasesTransactionsMap.set(useCase,useCaseTransactions);
      useCaseTransactions.add(transaction);
  	}
    this._addProcessAsActor(edges,actors,cycle,mainUseCase,fuMap);

  }
  _addProcessAsActor(edges,actors,cycle,useCase,fuMap){
    const actorName = cycle.start.source.name;
    let actor = actors.get(actorName);
    if(!actor){
      actor = new Actor(actorName);
      actors.set(actorName,actor);
    }

    const nameMap = new Map();
    for(let end of cycle.ends){
      const fu = fuMap.get(end.source);
      let name = nameMap.get(fu);
      if(!name){
        name = "";
      }
      nameMap.set(fu,name + " " + end.name);
    }

    let fu = fuMap.get(cycle.start.target);
    let name = nameMap.get(fu);
    if(!name){
      name = "";
    }
    nameMap.set(fu,cycle.start.name + " " + name);

    for(fu of nameMap.keys()){
      const association = new Association();
      edges.push(association);
      association.source = actor;
      association.target = fu;
      association.name = nameMap.get(fu);
    }
  }
  _addCycledFlows = function(cycledFlows,currentPath,
      newFlow,process,sequenceFlows){
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
    const nextFlows = sequenceFlows.filter(flow => (
      flow.source == newFlow.target
    ));
    if(nextFlows.length == 0){
      return false;
    }
    cycledFlows.push(newFlow);
    currentPath.push(newFlow);
    let pathFound = false;
    for(let flow of nextFlows){
      if(this._addCycledFlows(cycledFlows,currentPath,flow,
          process,sequenceFlows)){
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
  _addGeneralUseCases(edges,useCases,functions,mappings){
    for(let f of functions){
  		const useCasesUsingThisFunction = mappings.useCasesFunctionsmap.get(f);
  		if(!useCasesUsingThisFunction || (useCasesUsingThisFunction.length < 2)){
  			continue;
  		}
  		const generalUseCase = new UseCase(f.name);
  		useCases.generalUseCases.push(generalUseCase);
  		for(let useCase of useCasesUsingThisFunction){
        const extend = new Extension();
        extend.source = useCase;
        extend.target = generalUseCase;
  			edges.push(extend);

        let useCaseTransactions = mappings.useCasesTransactionsMap.get(useCase);
        if(useCaseTransactions){
          let newUseCaseTransactions = mappings.useCasesTransactionsMap
              .get(generalUseCase);
          if(!newUseCaseTransactions){
            newUseCaseTransactions = new Set();
            mappings.useCasesTransactionsMap.set(generalUseCase,
                newUseCaseTransactions);
          }
          for(let transaction of useCaseTransactions){
            newUseCaseTransactions.add(transaction);
          }
        }
  		}
  	}
  }
  _addUnusedCases(edges,useCases,functions,actors,mappings){
    for(let f of functions){
      if(mappings.useCasesFunctionsmap.get(f)){
        continue;
      }
      const useCase = new UseCase(f.name + "Not in transaction");
      useCase.errors = true;
  		useCases.unusedUseCases.push(useCase);

      const actorName = f.parent.name;
      let actor = actors.get(actorName);
      if(!actor){
        actor = new Actor(actorName);
        actors.set(actorName,actor);
      }
      const association = new Association();
      edges.push(association);
      association.source = actor;
      association.target = useCase;
  	}
  }
};
