import {Storage} from "modeling-storage";
import {localStorage} from "modeling-storage-local";
import DiagramsConverter from "./DiagramsConverter.js";

@localStorage
export default class DiagramsLocalStorage extends Storage{
  createConverter(){
    return new DiagramsConverter();
  }
};
