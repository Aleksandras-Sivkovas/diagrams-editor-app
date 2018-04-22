import {observable, computed} from "mobx";
import {Edge} from 'modeling';

export default class SequenceFlow extends Edge {
  @observable
  name;
};
