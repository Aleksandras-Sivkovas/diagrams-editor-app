const utils = {
  combineActions(current,previous){
    if(previous == null){
      return current;
    }
    for (const name of Object.keys(current)) {
      const previousFunction = previous[name];
      if(!previousFunction){
        continue;
      }
      const currentFunction = current[name];
      current[name] = function(){
        previousFunction.apply(null, arguments);
        currentFunction.apply(null, arguments);
      }
    }
    return current;
  }
}
export default utils;
