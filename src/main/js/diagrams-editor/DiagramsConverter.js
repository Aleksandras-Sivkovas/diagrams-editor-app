import {ModelConverter} from "modeling-storage";
import {UseCasesModelConverter} from "use-cases-storage";
import {DVCMModelConverter} from "dvcm-storage";
import {UseCasesModel} from "use-cases";
import {DVCMModel} from "dvcm"

export default class DiagramsConverter extends ModelConverter {

  convertToModel(object){
    const converter = this.getConverterByClassId(object.classId);
    const model = converter.convertToModel(object);
    return model;
  }

  convertToObject(model){
    const converter = this.getConverterByObject(model);
    const object = converter.convertToObject(model);
    return object;
  }
  registerClasses(){
    super.registerClasses();
    this.registerClass({
      classInstance : DVCMModel,
      converter : new DVCMModelConverter()
    });
    this.registerClass({
      classInstance : UseCasesModel,
      converter : new UseCasesModelConverter()
    });
  }

};
