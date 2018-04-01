import {observable} from "mobx";
import Component from "./Component.js";

export default class Relation extends Component {

	@observable
	source = null;

	@observable
	target = null;

};
