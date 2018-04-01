import {DVCM} from "dvcm";

import NodeConverter from "modeling-storage";

export default class DVCMConverter extends NodeConverter {

  getClassId(){
    return "dvcm.DVCM";
  }

  createModelInstance(){
    return new DVCM();
  }

  convertToModel(object){
    const model = super.convertToModel(...arguments);
    model.rootPoolsHeight = object.rootPoolsHeight;
    return model;
  }

  convertToObject(model){
    const object = super.convertToObject(...arguments);
    object.rootPoolsHeight = model.rootPoolsHeight;
    return object;
  }
};
