import {Association} from "use-cases";

import {EdgeConverter} from "modeling-storage";

export default class AssociationConverter extends EdgeConverter {

  getClassId(){
    return "use-cases.Association";
  }

  createModelInstance(){
    return new Association();
  }

  convertToModel(object){
    const model = super.convertToModel(...arguments);
    model.name = object.name;
    return model;
  }

  convertToObject(model){
    const object = super.convertToObject(...arguments);
    object.name = model.name;
    return object;
  }
  
};
