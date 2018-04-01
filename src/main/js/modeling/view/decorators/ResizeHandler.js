import {action,computed} from "mobx";

export default class ResizeHandler {

  @computed
  get width(){
    return this._properties.right || this._properties.rightBottom;
  }

  @computed
  get height(){
    return this._properties.bottom || this._properties.rightBottom;
  }

  @computed
  get minWidth(){
    if(this._properties.minWidth){
      return this._properties.minWidth;
    }
    return 20;
  }

  @computed
  get minHeight(){
    if(this._properties.minHeight){
      return this._properties.minHeight;
    }
    return 20;
  }

  constructor(model,properties){
    this.model = model;
    this._properties = properties;
    this.mouseUpHandler = action(this.handleMouseUp.bind(this));
    this.mouseMoveHandler = action(this.handleMouseMove.bind(this));
  }

  previousMouseY = 0;
  previousMouseX = 0;
  grid = 10;

  handleMouseDown(e){
    if (e.button != 0) {
      return;
  	}
    this.previousMouseY = e.clientY;
    this.previousMouseX = e.clientX;
    document.addEventListener('mousemove', this.mouseMoveHandler);
    document.addEventListener('mouseup', this.mouseUpHandler);
    e.preventDefault();
    e.stopPropagation();
  }

  handleMouseUp(e) {
    document.removeEventListener('mousemove', this.mouseMoveHandler);
    document.removeEventListener('mouseup', this.mouseUpHandler);
    e.preventDefault();
    e.stopPropagation();
  }

  applyGrid(distance){
    return Math.round(distance / this.grid) * this.grid;
  }
  handleMouseMove(e){
    e.preventDefault();
    e.stopPropagation();

    const model = this.model;
    let deltaLeft = e.clientX - this.previousMouseX;
    let deltaTop = e.clientY - this.previousMouseY;

    deltaLeft = this.applyGrid(deltaLeft);
    deltaTop = this.applyGrid(deltaTop);

    let top = model.height + deltaTop;
    let left = model.width + deltaLeft;


    const previousHeight = model.height;
    const previousWidth = model.width;
  	if(this.height && (this.minHeight <= top)){
      model.height = top;
    }
    if(this.width && (this.minWidth <= left)){
      model.width = left;
    }

    if(previousHeight != model.height){
      this.previousMouseY = this.previousMouseY + deltaTop;
    }
    if(previousWidth != model.width){
      this.previousMouseX = this.previousMouseX + deltaLeft;
    }

  }
}
