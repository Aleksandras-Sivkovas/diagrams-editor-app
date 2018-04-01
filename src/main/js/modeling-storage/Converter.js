import {Column,Component,Edge,HierarchyRelation,Model,Node,Point,
    Relation,Row} from "modeling"

export default class Converter {

  _registeredClasses;
  _classTree;
  classId;

  convertToModel(object,model){
  }

  convertToObject(model,object){
    if(!object){
      object = {};
    }
    object.classId = this.classId;
    return object;
  }

  constructor(){
      this._registeredClasses = new Map();
      this._classTree = [];
      this.registerClasses();
  }

  getConverterByObject(object){
    return this.getLeaf(object).converter;
  }

  getConverterByClassId(classId){
    return _registeredClasses.get(classId).converter;
  }

  getClassInstance(id){
    return this._registeredClasses.get(id).classInstance;
  }

  getLeaf(classObject){
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

  getClassId(classObject){
    const leaf = this.getLeaf(classObject);
    if(!leaf) return null;
    return leaf.classId;
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
    properties.objectInstance = new properties.classInstance();
    properties.leaves = [];
    this._registeredClasses.set(properties.classId,properties);
    this._registerLeafInTree(properties,this._classTree);
  }

  registerClasses(){

  }

};
