import {SequenceFlow} from "dvcm";

import {EdgeConverter} from "modeling-storage";

export default class SequenceFlowConverter extends EdgeConverter {

  getClassId(){
    return "dvcm.SequenceFlow";
  }

  createModelInstance(){
    return new SequenceFlow();
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
