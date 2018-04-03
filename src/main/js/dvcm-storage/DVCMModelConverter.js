import {ModelConverter} from "modeling-storage";
import {StartEvent,EndEvent,Event,Pool,DVCM,Activity,SequenceFlow,Transaction,DVCMModel,InTransaction} from "dvcm"


import StartEventConverter from "./component-converters/StartEventConverter.js";
import EndEventConverter from "./component-converters/EndEventConverter.js";

import EventConverter from "./component-converters/EventConverter.js";
import PoolConverter from "./component-converters/PoolConverter.js";
import DVCMConverter from "./component-converters/DVCMConverter.js";
import ActivityConverter from "./component-converters/ActivityConverter.js";
import TransactionConverter from "./component-converters/TransactionConverter.js";
import InTransactionConverter from "./component-converters/InTransactionConverter.js";
import SequenceFlowConverter from "./component-converters/SequenceFlowConverter.js";


export default class DVCMModelConverter extends ModelConverter {

  getClassId(){
    return "dvcm.DVCMModel";
  }

  createModelInstance(){
    return new DVCMModel();
  }

  addComponents(object,model){
    super.addComponents(...arguments);
    for(let transaction of object.transactions){
      const converter = this.getConverterByClassId(transaction.classId);
      const transactionModel = converter.convertToModel(transaction);
      model.addComponent(transactionModel);
      this.idMap.set(transaction.id,transactionModel.id);
    }
  }

  convertToObject(model){
    const object = super.convertToObject(...arguments);
    object.transactions = [];
    for(let transaction of model.transactions){
      const converter = this.getConverterByObject(transaction);
			object.transactions.push(converter.convertToObject(transaction));
		}
    return object;
  }

  registerClasses(){
    super.registerClasses();
    this.registerClass({
      classInstance : Transaction,
      converter : new TransactionConverter()
    });
    this.registerClass({
      classInstance : SequenceFlow,
      converter : new SequenceFlowConverter()
    });
    this.registerClass({
      classInstance : Activity,
      converter : new ActivityConverter()
    });
    this.registerClass({
      classInstance : DVCM,
      converter : new DVCMConverter()
    });
    this.registerClass({
      classInstance : Pool,
      converter : new PoolConverter()
    });
    this.registerClass({
      classInstance : Event,
      converter : new EventConverter()
    });
    this.registerClass({
      classInstance : EndEvent,
      converter : new EndEventConverter()
    });
    this.registerClass({
      classInstance : StartEvent,
      converter : new StartEventConverter()
    });
    this.registerClass({
      classInstance : InTransaction,
      converter : new InTransactionConverter()
    });
  }

};
