import React from 'react';
import ResizeHandler from "./ResizeHandler.js";

class Resizer  {
  constructor(){
    this.properties = {
      right:false,
      bottom:false,
      rightBottom:true
    };
  }

  createResizer = function(target){
    const previousGetContent = target.prototype.getContent;
    if(target.prototype.getResizeProperties == undefined){
      const resizer = this;
      target.prototype.getResizeProperties = function(){
        return resizer.properties;
      }
    }
    // const resizer = this;
    target.prototype.getContent = function(){
      const previous = previousGetContent.apply(this, arguments);
      // TODO: check if array if no then push 1 component
      const children = [...previous];

      const properties = this.getResizeProperties();
      if(properties.right){
        const resizeHandler = new ResizeHandler(this.component,properties);
        children.push(
          <div
            class="resize-point-right"
            key="resize-point-right"
            onMouseDown={resizeHandler.handleMouseDown.bind(resizeHandler)}
          />
        );
      }

      if(properties.bottom){
        const resizeHandler = new ResizeHandler(this.component,properties);
        children.push(
          <div
            class="resize-point-bottom"
            key="resize-point-bottom"
            onMouseDown={resizeHandler.handleMouseDown.bind(resizeHandler)}
          />
        );
      }

      if(properties.rightBottom){
        const resizeHandler = new ResizeHandler(this.component,properties);
        children.push(
          <div
            class="resize-point-right-bottom"
            key="resize-point-right-bottom"
            onMouseDown={resizeHandler.handleMouseDown.bind(resizeHandler)}
          />
        );
      }
      return children;
    }
  }
}

const resize = function(properties){
  const resizer = new Resizer();
  const decoratorFunction = resizer.createResizer.bind(resizer);
  if(arguments.length == 0){
    return decoratorFunction;
  }
  if(typeof properties === 'function'){
    resizer.createResizer(...arguments);
    return;
  }
  resizer.properties = properties;
  return decoratorFunction;
}

export default resize;
