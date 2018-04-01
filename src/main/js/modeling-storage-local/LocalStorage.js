import {saveAs} from "file-saver";
import {Storage} from "modeling-storage";

const fileDialog = require('file-dialog');

export default class LocalStorage extends Storage{

  saveToStore(fileString,name){
    var blob = new Blob([fileString], {type : 'application/json'});
    saveAs(blob, name+'.json');
    if(this.onsave){
      setTimeout(this.onSave,500,{content:fileString}); // TODO: No callback workaround
    }
  }

  load(){
    const loadFunction = this.loadModel.bind(this);
    fileDialog({ multiple: false, accept: '.json' })
    .then(files => {
        if((!files) || (files.length < 1)){
          return;
        }
        const file = files[0];
        const reader = new FileReader();
        reader.onload = function() {
          const response = {};
          response.responseText = reader.result;
          loadFunction(response);
        }
        reader.readAsText(file,'application/json');
    });
  }
};
