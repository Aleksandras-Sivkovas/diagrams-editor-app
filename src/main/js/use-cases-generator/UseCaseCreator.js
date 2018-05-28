import {UseCasesModel,UseCases,UseCase,Association,Inclusion,
    Extension,System,Actor} from "use-cases"

export default class UseCaseCreator {
  _addActors(useCasesComponent,actors,componentMap){
    let x = 10;
    let y = 10;
    for(let actor of actors){
      const created = new Actor(actor.name);
      componentMap.set(actor,created);
      created.position.x = x;
      created.position.y = y;
      useCasesComponent.append(created);
      y += actor.height + 20;
    }
  }

  _addToLevels(edges,useCases){


    let x = 10;
    const distance = 300;
    const levels = [];
    levels.push({
      cases: useCases.subfunctionUseCases.concat(useCases.unusedUseCases),
      x:x,
      y:10
    });
    if(useCases.transactionuseCases.length > 0){
      x += distance;
      levels.push({
        cases: useCases.transactionuseCases,
        x:x,
        y:100
      });
    }
    if(useCases.generalUseCases.length > 0){
      x += distance;
      levels.push({
        cases: useCases.generalUseCases,
        x:x,
        y:100
      });
    }
    return levels;

  }
  createUseCaseDiagramModel(name,useCases,edges,actors){

    const useCasesComponent = new UseCases();
    const model = useCasesComponent.model;
    useCasesComponent.model.name = name;
    const system = new System(name);
    system.position.x = 200;
    system.position.y = 50;
    useCasesComponent.append(system);

    // const actorsList = actors.values();

    const componentMap = new Map();

    this._addActors(useCasesComponent,actors.values(),componentMap);

    const levels = this._addToLevels(edges,useCases);
    let maxY = 0;
    for(let level of levels){
      for(let useCase of level.cases){
        const created = new UseCase(useCase.name);
        componentMap.set(useCase,created);
        created.position.x = level.x;
        created.position.y = level.y;
        level.y += useCase.height + 50;
        if(level.y > maxY){
          maxY = level.y;
        }
        system.append(created);
      }
    }

    for(let edge of edges){
      const created = new edge.constructor();
      created.source = componentMap.get(edge.source);
      created.target = componentMap.get(edge.target);
      created.name = edge.name;
      model.addEdge(created);
      const ends = this._getLeftRight(created);
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
