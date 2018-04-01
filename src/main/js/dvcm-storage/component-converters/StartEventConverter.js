import {StartEvent} from "dvcm";

import EventConverter from "./EventConverter.js";

export default class StartEventConverter extends EventConverter {

  getClassId(){
    return "dvcm.StartEvent";
  }

  createModelInstance(){
    return new StartEvent();
  }

};
