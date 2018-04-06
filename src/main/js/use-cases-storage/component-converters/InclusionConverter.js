import {Inclusion} from "use-cases";

import {EdgeConverter} from "modeling-storage";

export default class InclusionConverter extends EdgeConverter {

  getClassId(){
    return "use-cases.Inclusion";
  }

  createModelInstance(){
    return new Inclusion();
  }

};
