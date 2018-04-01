import {ModelConverter} from "modeling-storage";
import {StartEvent,EndEvent,Event,Pool,DVCM,Activity,SequenceFlow} from "dvcm"


import StartEventConverter from "./component-converters/StartEventConverter.js";
import EndEventConverter from "./component-converters/EndEventConverter.js";

import EventConverter from "./component-converters/EventConverter.js";
import PoolConverter from "./component-converters/PoolConverter.js";
import DVCMConverter from "./component-converters/DVCMConverter.js";
import ActivityConverter from "./component-converters/ActivityConverter.js";

import SequenceFlowConverter from "./component-converters/SequenceFlowConverter.js";

export default class DVCMModelConverter extends ModelConverter {


  registerClasses(){
    super.registerClasses();
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
  }

};
