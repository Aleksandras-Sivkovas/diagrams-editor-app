import {Pool} from "dvcm";

import {NodeConverter} from "modeling-storage";

export default class PoolConverter extends NodeConverter {

  getClassId(){
    return "dvcm.Pool";
  }

  createModelInstance(){
    return new Pool();
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
