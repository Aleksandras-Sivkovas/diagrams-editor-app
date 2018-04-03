import {Relation} from "modeling";

import ComponentConverter from "./ComponentConverter.js";

export default class RelationConverter extends ComponentConverter {

  getClassId(){
    return "modeling.Relation";
  }

  createModelInstance(){
    return new Relation();
  }

  convertToModel(object,componentModel,idMap){
    const model = super.convertToModel(...arguments);
    const sourceId = idMap.get(object.source);
    const targetId = idMap.get(object.target);
    model.source = componentModel.getComponent(sourceId);
    model.target = componentModel.getComponent(targetId);
    return model;
  }

  convertToObject(model){
    const object = super.convertToObject(...arguments);
    object.source = model.source.id;
    object.target = model.target.id;
    return object;
  }
};
