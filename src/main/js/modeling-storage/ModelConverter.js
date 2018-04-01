import {Component,Edge,HierarchyRelation,Model,Node,
    Relation} from "modeling"

import ComponentConverter from "./component-converters/ComponentConverter.js";
import EdgeConverter from "./component-converters/EdgeConverter.js";
import NodeConverter from "./component-converters/NodeConverter.js";
import RelationConverter from "./component-converters/RelationConverter.js";
import Converter from "./Converter.js";

export default class ModelConverter extends Converter {

  getClassId(){
    return "modeling.Model";
  }

  createModelInstance(){
    return new Model();
  }

  convertToModel(object){
    const model = super.convertToModel(...arguments);
    model.name = object.name;
    const converter = this.getConverterByClassId(object.root.classId);
    const rootNode = converter.convertToModel(object.root);
    model.addAsRoot(rootNode);

    const idMap = this._setNodeTree(object.root,model.root,new Map);

    for(let relation of object.relations){
      const converter = this.getConverterByClassId(relation.classId);
      const fixedRelation = Object.assign(
        {},
        relation,
        {
          source: idMap.get(relation.source),
          target: idMap.get(relation.target)
        }
      );
      const relationModel = converter.convertToModel(relation,model);
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




  _setNodeTree(object,model,idMap){
    const children = object.children;
    for(let child of children){
      const converter = this.getConverterByClassId(child.classId);
      const childModel = converter.convertToModel(child);
      model.append(childModel);
      idMap.set(child.id,childModel.id);
      this._setNodeTree(child,childModel,idMap);
    }
    return idMap;
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
