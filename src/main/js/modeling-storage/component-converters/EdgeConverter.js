import {Edge} from "modeling";

import RelationConverter from "./RelationConverter.js";

export default class EdgeConverter extends RelationConverter {

  getClassId(){
    return "modeling.Edge";
  }

  createModelInstance(){
    return new Edge();
  }

  convertToModel(object){
    const model = super.convertToModel(...arguments);
    model.sourcePoint.x = object.sourcePoint.x;
    model.sourcePoint.y = object.sourcePoint.y;
    model.targetPoint.x = object.targetPoint.x;
    model.targetPoint.y = object.targetPoint.y;
    for(let bendPoint of object.bendPoints){
      model.addBendPoint(bendPoint.x,bendPoint.y);
    }
    return model;
  }

  convertToObject(model){
    const object = super.convertToObject(...arguments);
    object.sourcePoint = {
      x:model.sourcePoint.x,
      y:model.sourcePoint.y
    };
    object.targetPoint = {
      x:model.targetPoint.x,
      y:model.targetPoint.y
    };
    object.bendPoints = [];
    for(let bendPoint of model.bendPoints){
      object.bendPoints.push({
        x:bendPoint.x,
        y:bendPoint.y
      });
    }
    return object;
  }
};
