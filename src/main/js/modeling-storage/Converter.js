import {Column,Component,Edge,HierarchyRelation,Model,Node,Point,
    Relation,Row} from "modeling"

export default class Converter {

  _registeredClasses;
  _classTree;
  classId;


  constructor(){
      this._registeredClasses = new Map();
      this._classTree = [];
      if(this.registerClasses) this.registerClasses();
      if(this.getClassId) this.classId = this.getClassId();
  }

  convertToModel(){
    return this.createModelInstance();
  }

  convertToObject(){
    return {
        classId : this.classId
    };
  }

  createModelInstance(){
    return null;
  }
  getConverterByObject(object){
    return this._getLeaf(object).converter;
  }

  getConverterByClassId(classId){
    return this._registeredClasses.get(classId).converter;
  }

  _getLeaf(classObject){
    let leavesToSearch = this._classTree;
    let theLeaf = null;
    for(let i=0;i<leavesToSearch.length;){
      const leaf = leavesToSearch[i];
      if(!(classObject instanceof leaf.classInstance)){
        i++;
        continue;
      }
      theLeaf = leaf;
      i = 0;
      leavesToSearch = leaf.leaves;
    }
    return theLeaf;
  }

  _registerLeafInTree(newLeaf, parentLeaves){
    for(let i = 0;i<parentLeaves.length;i++){
      const leaf = parentLeaves[i];
      if(newLeaf.objectInstance instanceof leaf.classInstance){
        this._registerLeafInTree(newLeaf,leaf.leaves);
        return;
      }
      if(leaf.objectInstance instanceof newLeaf.classInstance){
        parentLeaves[i] = newLeaf;
        newLeaf.leaves.push(leaf); // No recursion because it's a new leaf
        return;
      }
    }
    parentLeaves.push(newLeaf);
  }

  registerClass(properties){
    if(this._registeredClasses.get(properties.converter.classId)){
      // TODO: to change to new or leave like this
      return;
    }

    properties.objectInstance = new properties.converter.createModelInstance();
    properties.leaves = [];

    this._registeredClasses.set(properties.converter.classId,properties);

    this._registerLeafInTree(properties,this._classTree);
  }

};
