import {SequenceFlow} from "dvcm";

import {EdgeConverter} from "modeling-storage";

export default class SequenceFlowConverter extends EdgeConverter {

  getClassId(){
    return "modeling.SequenceFlow";
  }

  createModelInstance(){
    return new SequenceFlow();
  }

};
