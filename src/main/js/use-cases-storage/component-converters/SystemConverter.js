import {System} from "use-cases";

import {NodeConverter} from "modeling-storage";

export default class SystemConverter extends NodeConverter {

  getClassId(){
    return "use-cases.System";
  }

  createModelInstance(){
    return new System();
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
