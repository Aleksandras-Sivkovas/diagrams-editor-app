import {Node} from "modeling";

import ComponentConverter from "./ComponentConverter.js";

export default class NodeConverter extends ComponentConverter {

  getClassId(){
    return "modeling.Node";
  }

  createModelInstance(){
    return new Node();
  }

  convertToModel(object){
    const model = super.convertToModel(...arguments);
    model.position.x = object.position.x;
    model.position.y = object.position.y;
    model.width = object.width;
    model.height = object.height;
    model.borderWidth = object.borderWidth;
    return model;
  }

  convertToObject(model){
    const object = super.convertToObject(...arguments);
    object.position = {
      x:model.position.x,
      y:model.position.y
    };
    object.width = model.width;
    object.height = model.height;
    object.borderWidth = model.borderWidth;
    return object;
  }


};
