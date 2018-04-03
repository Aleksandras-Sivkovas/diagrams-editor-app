import {observable,computed} from "mobx";
import {Model} from 'modeling';

import Transaction from "./Transaction";
import InTransaction from "./InTransaction";

export default class DVCMModel extends Model {

	@computed
	get transactions(){
		return this.components.filter(component => (component instanceof Transaction));
	}

	@computed
	get inTransactions(){
		return this.relations.filter(component => (component instanceof InTransaction));
	}
};
