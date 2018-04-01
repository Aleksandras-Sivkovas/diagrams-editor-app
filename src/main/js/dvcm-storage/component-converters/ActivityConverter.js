import {Activity} from "dvcm";

import {NodeConverter} from "modeling-storage";

export default class ActivityConverter extends NodeConverter {

  getClassId(){
    return "dvcm.Activity";
  }

  createModelInstance(){
    return new Activity();
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
