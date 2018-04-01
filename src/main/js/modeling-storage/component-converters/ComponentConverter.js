import {Component} from "modeling";

import Converter from "../Converter.js";

export default class ComponentConverter extends Converter {

  getClassId(){
    return "modeling.Component";
  }

  createModelInstance(){
    return new Component();
  }

  convertToModel(object){
    const model = super.convertToModel(...arguments);
    model.id = object.id;
    return model;
  }

  convertToObject(model){
    const object = super.convertToObject(...arguments);
    object.id = model.id;
    return object;
  }
};
