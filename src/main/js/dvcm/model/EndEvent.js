import {observable, computed} from "mobx";
import Event from './Event.js';

export default class EndEvent extends Event {
  getBorderWidth(){
		return super.getBorderWidth() + 2;
	}
};
