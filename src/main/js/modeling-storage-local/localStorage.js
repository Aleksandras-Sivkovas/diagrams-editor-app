import {saveAs} from "file-saver";
const fileDialog = require('file-dialog');

const localStorage = function(target){

  target.prototype.saveToStore = function(fileString,name){
    var blob = new Blob([fileString], {type : 'application/json'});
    saveAs(blob, name+'.json');
    if(this.onsave){
      setTimeout(this.onSave,500,{content:fileString}); // TODO: No callback workaround
    }
  }

  target.prototype.load = function(){
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
export default localStorage;
