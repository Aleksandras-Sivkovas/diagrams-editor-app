import React from 'react';

import EndEventView from "./EndEventView.js";
import StartEventView from "./StartEventView.js";
import EventView from "./EventView.js";
import DVCMView from './DVCMView.js';
import PoolView from './PoolView.js';
import ActivityView from './ActivityView.js';
import SequenceFlowView from './SequenceFlowView.js';

import EndEvent from "../model/EndEvent.js";
import StartEvent from "../model/StartEvent.js";
import Event from "../model/Event.js";
import DVCM from '../model/DVCM.js';
import Pool from '../model/Pool.js';
import Activity from '../model/Activity.js';
import SequenceFlow from '../model/SequenceFlow.js';


import {ViewFactory} from 'modeling'

export default class DVCMViewFactory extends ViewFactory {

  getEdgeViewClass(edge){
    if(edge instanceof SequenceFlow){
			return SequenceFlowView;
		}
		return super.getEdgeViewClass();
	}

  getNodeViewClass(node){
    if(node instanceof Activity){
      return ActivityView;
    }
    if(node instanceof DVCM){
      return DVCMView;
    }
    if(node instanceof Pool){
      return PoolView;
    }
    if(node instanceof Event){
      if(node instanceof StartEvent){
        return StartEventView;
      }
      if(node instanceof EndEvent){
        return EndEventView;
      }
      return EventView;
    }
    return super.getNodeViewClass(node);
  }

};
