import utils from "./utils.js"
import SelectHandler from "./SelectHandler.js";

const select = function(target){
  const previousGetHandledEvents = target.prototype.getHandledEvents;
  target.prototype.getHandledEvents = function(){
    const decorator = new SelectHandler(this.component);
    const current = {
			onMouseDown : decorator.handleMouseDown.bind(decorator)
		};
    const previous = previousGetHandledEvents.apply(this, arguments);
    return utils.combineActions(current,previous);
	}
};
export default select;
