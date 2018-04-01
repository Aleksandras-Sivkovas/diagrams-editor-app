import {EndEvent} from "dvcm";

import EventConverter from "./EventConverter.js";

export default class EndEventConverter extends EventConverter {

  getClassId(){
    return "dvcm.EndEvent";
  }

  createModelInstance(){
    return new EndEvent();
  }

};
