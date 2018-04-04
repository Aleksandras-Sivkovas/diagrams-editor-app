import {UseCases} from "use-cases";

import {NodeConverter} from "modeling-storage";

export default class UseCasesConverter extends NodeConverter {

  getClassId(){
    return "use-cases.UseCases";
  }

  createModelInstance(){
    return new UseCases();
  }

};
