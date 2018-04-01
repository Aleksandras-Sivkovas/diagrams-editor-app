import {Event} from "dvcm";

import {NodeConverter} from "modeling-storage";

export default class EventConverter extends NodeConverter {

  getClassId(){
    return "dvcm.Event";
  }

  createModelInstance(){
    return new Event();
  }

};
