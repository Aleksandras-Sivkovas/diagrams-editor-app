import {Column,Component,Edge,HierarchyRelation,Model,Node,Point,
    Relation,Row} from "modeling"

import Converter from "./Converter.js"

TODO: delete this file
export default class ModelingConverter extends Converter{




  setupObjectComponent(model,object){
    object.id = model.id;
  }

  setupModelComponent(object,model){
    model.id = object.id;
  }

  setupObjectEdge(model,object){
    object.sourcePoint =
        this.addPropertiesToStoreObjectFromComponent(model.sourcePoint);
    object.targetPoint =
        this.addPropertiesToStoreObjectFromComponent(model.targetPoint);

    object.bendPoints = [];
    for(let point of model.bendPoints){
      object.bendPoints.push(
        this.addPropertiesToStoreObjectFromComponent(point)
      );
    }
  }

  setupModelEdge(object,model){
    model.sourcePoint =
        this.addPropertiesToModel(object.sourcePoint);
    model.targetPoint =
        this.addPropertiesToModel(object.targetPoint);

    for(let point of object.bendPoints){
      model.bendPoints.push(
        this.addPropertiesToModel(point)
      );
    }
  }


  setupObjectComponent(model,object){
    object.id = model.id;
  }

  setupModelComponent(object,model){
    model.id = object.id;
  }

  registerClasses(){
    this.registerClass({
      classInstance : Column,
      classId : "modeling.Column",
    });
    this.registerClass({
      classInstance : Component,
      classId : "modeling.Component",
      objectCreator : this.setupObjectComponent,
      modelCreator : this.setupModelComponent
    });
    this.registerClass({
      classInstance : Edge,
      classId : "modeling.Edge",
      objectCreator : this.setupObjectEdge.bind(this),
      modelCreator : this.setupModelEdge.bind(this)
    });
    this.registerClass({
      classInstance : HierarchyRelation,
      classId : "modeling.HierarchyRelation",
      objectCreator : this.setupObjectColumn,
      modelCreator : this.setupModelColumn
    });
    this.registerClass({
      classInstance : Model,
      classId : "modeling.Model",
      objectCreator : this.setupObjectColumn,
      modelCreator : this.setupModelColumn
    });
    this.registerClass({
      classInstance : Node,
      classId : "modeling.Node",
      objectCreator : this.setupObjectColumn,
      modelCreator : this.setupModelColumn
    });
    this.registerClass({
      classInstance : Point,
      classId : "modeling.Point",
      objectCreator : this.setupObjectColumn,
      modelCreator : this.setupModelColumn
    });
    this.registerClass({
      classInstance : Relation,
      classId : "modeling.Relation",
      objectCreator : this.setupObjectColumn,
      modelCreator : this.setupModelColumn
    });
    this.registerClass({
      classInstance : Row,
      classId : "modeling.Row",
      objectCreator : this.setupObjectColumn,
      modelCreator : this.setupModelColumn
    });


  }

};
