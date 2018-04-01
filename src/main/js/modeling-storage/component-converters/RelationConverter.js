import {Relation} from "modeling";

import Converter from "../Converter.js";

export default class RelationConverter extends Converter {

  getClassId(){
    return "modeling.Relation";
  }

  createModelInstance(){
    return new Relation();
  }

  convertToModel(object,componentModel){
    const model = super.convertToModel(...arguments);
    model.source = componentModel.getComponent(object.source);
    model.target = componentModel.getComponent(object.target);
    return model;
  }

  convertToObject(model){
    const object = super.convertToObject(...arguments);
    object.source = model.source.id;
    object.target = model.target.id;
    return object;
  }
};
