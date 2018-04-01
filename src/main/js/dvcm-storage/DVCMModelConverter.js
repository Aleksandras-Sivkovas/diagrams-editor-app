import {ModelConverter} from "modeling-storage";

import ComponentConverter from "./component-converters/ComponentConverter.js";
import EdgeConverter from "./component-converters/EdgeConverter.js";
import NodeConverter from "./component-converters/NodeConverter.js";
import RelationConverter from "./component-converters/RelationConverter.js";
import Converter from "./Converter.js";

export default class DVCMModelConverter extends ModelConverter {


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

};
