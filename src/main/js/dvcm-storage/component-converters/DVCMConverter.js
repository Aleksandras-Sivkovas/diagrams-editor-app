import {DVCM} from "dvcm";

import {NodeConverter} from "modeling-storage";

export default class DVCMConverter extends NodeConverter {

  getClassId(){
    return "dvcm.DVCM";
  }

  createModelInstance(){
    return new DVCM();
  }


};
