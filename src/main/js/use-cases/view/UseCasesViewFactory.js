import React from 'react';

import Actor from "../model/Actor.js";
import Association from "../model/Association.js";
import System from "../model/System.js";
import UseCase from "../model/UseCase.js";
import UseCases from "../model/UseCases.js";
import ActorView  from "./ActorView.js";
import AssociationView  from "./AssociationView.js";
import SystemView  from "./SystemView.js";
import UseCaseView  from "./UseCaseView.js";
import UseCasesView  from "./UseCasesView.js";



import {ViewFactory} from 'modeling'

export default class UseCasesViewFactory extends ViewFactory {

  getEdgeViewClass(edge){
    if(edge instanceof Association){
			return AssociationView;
		}
		return super.getEdgeViewClass();
	}

  getNodeViewClass(node){
    if(node instanceof UseCases){
      return UseCasesView;
    }
    if(node instanceof UseCase){
      return UseCaseView;
    }
    if(node instanceof System){
      return SystemView;
    }
    if(node instanceof Actor){
      return ActorView;
    }
    return super.getNodeViewClass(node);
  }

};
