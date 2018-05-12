import {saveAs} from "file-saver";
import html2canvas from 'html2canvas';

export default class ImageExporter{
  exportAsImage(html,fileName){
    const saveFunction = this.saveFile.bind(this);
    html2canvas(html,{
      logging:false,
      scale:2
    }).then(function(canvas) {
      canvas.toBlob(function(blob){
        saveFunction(blob,fileName);
      });
    });
  }

  saveFile(blob,fileName){
    const ending = ".png";
    if(!fileName.endsWith(ending)){
      fileName += ending;
    }
    saveAs(blob, fileName);
  }
}
