import {Component,Edge,HierarchyRelation,Model,Node,
    Relation} from "modeling"

import ComponentConverter from "./component-converters/ComponentConverter.js";
import EdgeConverter from "./component-converters/EdgeConverter.js";
import NodeConverter from "./component-converters/NodeConverter.js";
import RelationConverter from "./component-converters/RelationConverter.js";
import Converter from "./Converter.js";

export default class ModelConverter extends Converter {

  idMap;
  getClassId(){
    return "modeling.Model";
  }

  createModelInstance(){
    return new Model();
  }

  addComponents(object,model){
    model.name = object.name;
    const converter = this.getConverterByClassId(object.root.classId);
    const rootNode = converter.convertToModel(object.root);
    model.addAsRoot(rootNode);

    this.idMap = new Map();
    this._setNodeTree(object.root,model.root);
  }

  convertToModel(object){
    const model = super.convertToModel(...arguments);

    this.addComponents(object,model);

    for(let relation of object.relations){
      const converter = this.getConverterByClassId(relation.classId);
      const relationModel = converter.convertToModel(relation,model,this.idMap);
      model.addRelation(relationModel);
    }

    return model;
  }

  convertToObject(model){
    const object = super.convertToObject(...arguments);

    object.name = model.name;

    const converter = this.getConverterByObject(model.root);
    object.root = converter.convertToObject(model.root);
    this._getNodeTree(model.root,object.root);

    object.relations = [];

    for(let relation of model.relations){
      if(relation instanceof HierarchyRelation){
        continue; // Added in node tree
      }
      const converter = this.getConverterByObject(relation);
			object.relations.push(converter.convertToObject(relation));
		}
    return object;
  }

  registerClasses(){
    this.registerClass({
      classInstance : Component,
      converter : new ComponentConverter()
    });
    this.registerClass({
      classInstance : Edge,
      converter : new EdgeConverter()
    });
    this.registerClass({
      classInstance : Node,
      converter : new NodeConverter()
    });
    this.registerClass({
      classInstance : Relation,
      converter : new RelationConverter()
    });
  }




  _setNodeTree(object,model){
    const children = object.children;
    for(let child of children){
      const converter = this.getConverterByClassId(child.classId);
      const childModel = converter.convertToModel(child);
      model.append(childModel);
      this.idMap.set(child.id,childModel.id);
      this._setNodeTree(child,childModel);
    }
  }
  _getNodeTree(model,object){
    object.children = [];
    const children = model.children;
    for(let child of children){
      const converter = this.getConverterByObject(child);
      const childObject = converter.convertToObject(child);
      object.children.push(childObject);
      this._getNodeTree(child,childObject);
    }
  }
};
