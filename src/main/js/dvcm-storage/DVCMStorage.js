import DVCMModelConverter from "./DVCMModelConverter.js";
import {Storage} from "modeling-storage";

export default class DVCMStorage extends Storage{
  createConverter(){
    return new DVCMModelConverter();
  }
};
