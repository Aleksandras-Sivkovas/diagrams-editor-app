import {Column,Component,Edge,HierarchyRelation,Model,Node,Point,
    Relation,Row} from "modeling"

import Converter from "./Converter.js"

export default class ModelConverter extends Converter {

  constructor(){
      this.classId = "modeling.Model";
  }

  convertToModel(object,model){
    if(!model){
      const model = new Model();
    }
    model.name = object.name;

    const converter = this.getConverterByClassId(object.root.classId);
    model.addAsRoot(converter.convertToModel(object.root));

    const model = super.convertToModel(object,model);
    const idMap = new Map();
    for(let node of object.nodes){
      const converter = this.getConverterByClassId(node.classId);
			const nodeModel = converter.convertToModel(node);
      model.addNode(nodeModel);
      idMap.set(node.id,nodeModel.id);
		}
    return model;
  }

  convertToObject(model,object){
    const object = super.convertToObject(model);

    object.name = model.name;

    const converter = this.getConverterByObject(model.root);
    object.root = converter.convertToObject(model.root);

    object.nodes = [];
    object.relations = [];

    for(let node of model.nodes){
      const converter = this.getConverterByObject(node);
			object.nodes.push(converter.convertToObject(node));
		}
    for(let relation of model.relations){
      const converter = this.getConverterByObject(relation);
			object.relations.push(converter.convertToObject(relation));
		}
    return object;
  }

  registerClasses(){

  }

};
