import {Association} from "use-cases";

import {EdgeConverter} from "modeling-storage";

export default class AssociationConverter extends EdgeConverter {

  getClassId(){
    return "use-cases.Association";
  }

  createModelInstance(){
    return new Association();
  }

};
