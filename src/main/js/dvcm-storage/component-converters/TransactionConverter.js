import {Transaction} from "dvcm";

import {ComponentConverter} from "modeling-storage";

export default class TransactionConverter extends ComponentConverter {

  getClassId(){
    return "dvcm.Transaction";
  }

  createModelInstance(){
    return new Transaction();
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
