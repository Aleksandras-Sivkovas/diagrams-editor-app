import {observable,computed} from "mobx";
import {Model} from 'modeling';

import Transaction from "./Transaction";
import InTransaction from "./InTransaction.js";
import SequenceFlow from "./SequenceFlow.js"
import Activity from "./Activity.js"

export default class DVCMModel extends Model {

	@computed
	get transactions(){
		return this.components.filter(component => (component instanceof Transaction));
	}

	@computed
	get activities(){
		return this.nodes.filter(component => (component instanceof Activity));
	}

	@computed
	get inTransactions(){
		return this.relations.filter(relation => (relation instanceof InTransaction));
	}

	@computed
	get sequenceFlows(){
		return this.edges.filter(edge => (edge instanceof SequenceFlow));
	}

};
