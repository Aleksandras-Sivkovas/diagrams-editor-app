import {Storage} from "modeling-storage";
import UseCasesModelConverter from "./UseCasesModelConverter.js";

export default class UseCasesStorage extends Storage{
  createConverter(){
    return new UseCasesModelConverter();
  }
};
