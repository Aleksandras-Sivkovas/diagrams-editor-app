import {UseCase} from "use-cases";

import {NodeConverter} from "modeling-storage";

export default class UseCaseConverter extends NodeConverter {

  getClassId(){
    return "use-cases.UseCase";
  }

  createModelInstance(){
    return new UseCase();
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
