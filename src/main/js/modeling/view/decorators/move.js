import utils from "./utils.js";
import Movehandler from "./Movehandler.js";
import EdgePointMoveHandler from "./EdgePointMoveHandler.js";
import Edge from "../../model/Edge.js";


const move = function(x,y){

  const createMover = function(target){
    const previousGetHandledEvents = target.prototype.getHandledEvents;
    target.prototype.getHandledEvents = function(){
      let decorator;
      if(this.component instanceof Edge){
        decorator = new EdgePointMoveHandler(this.component,true,true);
        decorator.point = this.point;
        decorator.targetNode = this.targetNode;
      }else{
        decorator = new Movehandler(this.component,true,true);
      }

      const current = {
  			onMouseDown : decorator.handleMouseDown.bind(decorator)
  		};
      const previous = previousGetHandledEvents.apply(this, arguments);
      return utils.combineActions(current,previous);
  	}
  }

  if(arguments.length == 0){
    return createMover;
  }
  if(typeof x === 'function'){
    createMover(...arguments);
    return;
  }

  if(x && y){
    return createMover;
  }

  if(x || y){
    return function(target){
      const previousGetHandledEvents = target.prototype.getHandledEvents;
      target.prototype.getHandledEvents = function(){
        let decorator;
        if(this.component instanceof Edge){
          decorator = new EdgePointMoveHandler(this.component,x,y);
          decorator.point = this.point;
          decorator.targetNode = this.targetNode;
        }else{
          decorator = new Movehandler(this.component,x,y);
        }

        const current = {
    			onMouseDown : decorator.handleMouseDown.bind(decorator)
    		};
        const previous = previousGetHandledEvents.apply(this, arguments);
        return utils.combineActions(current,previous);
    	}
    }
  }

  console.warn('wrong arguments', ...arguments);

}

export default move;
