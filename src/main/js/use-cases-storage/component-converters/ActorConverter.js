import {Actor} from "use-cases";

import {NodeConverter} from "modeling-storage";

export default class ActorConverter extends NodeConverter {

  getClassId(){
    return "use-cases.Actor";
  }

  createModelInstance(){
    return new Actor();
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
