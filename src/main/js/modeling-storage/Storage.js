import ModelConverter from "./ModelConverter.js"

export default class Storage {

  onLoad;
  onSave;
  converter;

  constructor(){
    this.converter = this.createConverter();
  }

  createConverter(){
    return new ModelConverter();
  }

  _convertStoreObjectToString(storeObject){
    return JSON.stringify(storeObject,null, '\t');
  }

  _convertModelToStoreObject(model){
    return this.converter.convertToObject(model);
  }

  saveToStore(fileString,name){
    console.warn("Abstract method");
  }

  _convertStoreObjectToModel(storeObject){
    return this.converter.convertToModel(storeObject);
  }

  loadModel(response){
    const storeObject = JSON.parse(response.responseText);
    const model = this._convertStoreObjectToModel(storeObject);
    if(this.onLoad){
      this.onLoad({model:model,response:response});
    }
  }

  store(model){
    const storeObject = this._convertModelToStoreObject(model);
    const fileContent = this._convertStoreObjectToString(storeObject);
    this.saveToStore(fileContent,storeObject.name);
  }

  load(){
    console.warn("Abstract method");
  }
};
