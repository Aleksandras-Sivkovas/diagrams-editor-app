import {InTransaction} from "dvcm";

import {RelationConverter} from "modeling-storage";

export default class InTransactionConverter extends RelationConverter {

  getClassId(){
    return "dvcm.InTransaction";
  }

  createModelInstance(){
    return new InTransaction();
  }

};
