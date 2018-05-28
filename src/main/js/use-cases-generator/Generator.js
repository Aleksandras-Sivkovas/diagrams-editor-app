import {DVCMModel} from "dvcm";
import {UseCasesModel,UseCases,UseCase,Association,Inclusion,
    Extension,System,Actor} from "use-cases"
import UseCaseCreator from "./UseCaseCreator.js";
import UseCasesFromDvcmDataGenerator from "./UseCasesFromDvcmDataGenerator.js";

export default class UseCasesGenerator {

  generate(model){
    if(model instanceof DVCMModel){
      return this.generateFromDVCM(model);
    }
    return null;
  }

  generateFromDVCM(dvcm){
    const useCasesFromDvcmDataGenerator = new UseCasesFromDvcmDataGenerator();
    const dvcmData = useCasesFromDvcmDataGenerator.generateDVCMData(dvcm);
    // const dvcmData = this._generateDVCMData(dvcm);
    const useCaseCreator = new UseCaseCreator();
    return useCaseCreator.createUseCaseDiagramModel(
      dvcm.name,
      dvcmData.useCases,
      dvcmData.edges,
      dvcmData.actors
    );
  }

  _getAllNodesUseCasesSet(useCases){
    const set = new Set();
    const entries = Object.entries(useCases);
    for(let entry of entries){
      const collection = entry[1];
      for(let element of collection){
        set.add(element);
      }
    }
    return set;
  }
  generateByTransactionFromDVCM(dvcm){
    const useCasesFromDvcmDataGenerator = new UseCasesFromDvcmDataGenerator();
    const dvcmData = useCasesFromDvcmDataGenerator.generateDVCMData(dvcm);
    // const dvcmData = this._generateDVCMData(dvcm);
    const transactions = dvcm.transactions;
    const diagrams = [];

    const useCaseCreator = new UseCaseCreator();
    for(let transaction of transactions){
      const useCasesFilterFunction = function(useCase){
        const set = dvcmData.mappings.useCasesTransactionsMap.get(useCase);
        if(!set){
          return false;
        }
        return set.has(transaction);
      }
      const useCases = useCasesFromDvcmDataGenerator.createUseCasesObject();
      useCases.transactionuseCases = dvcmData.useCases.
            transactionuseCases.filter(useCasesFilterFunction);
      useCases.functionUseCases = dvcmData.useCases.
            functionUseCases.filter(useCasesFilterFunction);
      useCases.subfunctionUseCases = dvcmData.useCases.
            subfunctionUseCases.filter(useCasesFilterFunction);
      useCases.generalUseCases = dvcmData.useCases.
            generalUseCases.filter(useCasesFilterFunction);
      const allUseCases = this._getAllNodesUseCasesSet(useCases);
      const edges = dvcmData.edges.filter(edge=>{
        if(edge instanceof Association){
          return allUseCases.has(edge.target);
        }
        if(edge instanceof Inclusion){
          return allUseCases.has(edge.target);
        }
        if(edge instanceof Extension){
          return (allUseCases.has(edge.target) && allUseCases.has(edge.source));
        }
      });

      const actors = new Map();
      for(let entry of dvcmData.actors.entries()){
        const actor =  entry[1];
        if(
            edges.some(edge =>(
              edge.source == actor
            ))
        ){
          actors.set(entry[0],actor);
        }
      }
      diagrams.push(
        useCaseCreator.createUseCaseDiagramModel(
          dvcm.name+":" + transaction.name,
          useCases,
          edges,
          actors
        )
      );
    }


    const useCases = useCasesFromDvcmDataGenerator.createUseCasesObject();
    useCases.unusedUseCases = dvcmData.useCases.unusedUseCases;
    const edges = dvcmData.edges.filter(edge=>{
      if(edge instanceof Association){
        return useCases.unusedUseCases.includes(edge.target);
      }
      if(edge instanceof Inclusion){
        return useCases.unusedUseCases.includes(edge.target);
      }
      if(edge instanceof Extension){
        return (
          useCases.unusedUseCases.includes(edge.target) &&
          useCases.unusedUseCases.includes(edge.source)
        );
      }
    });

    const actors = new Map();
    for(let entry of dvcmData.actors.entries()){
      const actor =  entry[1];
      if(
          edges.some(edge =>(
            edge.source == actor
          ))
      ){
        actors.set(entry[0],actor);
      }
    }
    diagrams.push(
      useCaseCreator.createUseCaseDiagramModel(
        dvcm.name+":" + " not in transactions",
        useCases,
        edges,
        actors
      )
    );


  	return diagrams;
  }
};
