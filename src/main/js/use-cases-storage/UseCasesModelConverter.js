import {ModelConverter} from "modeling-storage";
import {UseCasesModel,Actor,Association,System,UseCase
    ,UseCases} from "use-cases";

import ActorConverter from "./component-converters/ActorConverter.js";
import AssociationConverter from "./component-converters/AssociationConverter.js";
import SystemConverter from "./component-converters/SystemConverter.js";
import UseCaseConverter from "./component-converters/UseCaseConverter.js";
import UseCasesConverter from "./component-converters/UseCasesConverter.js";



export default class UseCasesModelConverter extends ModelConverter {

  getClassId(){
    return "use-cases.UseCasesModel";
  }

  createModelInstance(){
    return new UseCasesModel();
  }


  registerClasses(){
    super.registerClasses();
    this.registerClass({
      classInstance : Actor,
      converter : new ActorConverter()
    });
    this.registerClass({
      classInstance : Association,
      converter : new AssociationConverter()
    });
    this.registerClass({
      classInstance : System,
      converter : new SystemConverter()
    });
    this.registerClass({
      classInstance : UseCase,
      converter : new UseCaseConverter()
    });
    this.registerClass({
      classInstance : UseCases,
      converter : new UseCasesConverter()
    });
  }

};
