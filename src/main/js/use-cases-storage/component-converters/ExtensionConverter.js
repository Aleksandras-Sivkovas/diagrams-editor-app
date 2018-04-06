import {Extension} from "use-cases";

import {EdgeConverter} from "modeling-storage";

export default class ExtensionConverter extends EdgeConverter {

  getClassId(){
    return "use-cases.Extension";
  }

  createModelInstance(){
    return new Extension();
  }

};
