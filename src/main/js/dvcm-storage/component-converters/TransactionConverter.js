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
    if(object.labelPosition){
      model.labelPosition = {
        x:object.labelPosition.x,
        y:object.labelPosition.y
      };
    }
    return model;
  }

  convertToObject(model){
    const object = super.convertToObject(...arguments);
    object.name = model.name;
    object.labelPosition = {
      x:model.labelPosition.x,
      y:model.labelPosition.y
    };
    return object;
  }

};
