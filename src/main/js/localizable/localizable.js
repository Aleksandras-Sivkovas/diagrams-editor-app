
const localizable = function(defaultLocale){
  const localizer = {
    defaultLocale : defaultLocale,
    localize: function(target){
      const defaultlocale = this.defaultLocale;
      const previousrender = target.prototype.render;
      target.prototype.render = function(){
        if(this.locale){
    			return previousrender.apply(this, arguments);
    		}
    		const locale = this.props.locale;
    		if(!locale){
    			this.locale = defaultLocale;
    			return  previousrender.apply(this, arguments);
    		}
    		this.locale = {};
    		for(let key of defaultLocale){
    			this.locale[key] =
    					((locale[key] === null) || (locale[key] === undefined)) ?
    					defaultLocale[key] :
    					locale[key];
    		}
        return previousrender.apply(this, arguments);
      }
    }
  };
  const decoratorFunction = localizer.localize.bind(localizer);

  if(arguments.length == 0){
    return decoratorFunction;
  }
  if(typeof properties === 'function'){
    decoratorFunction(...arguments);
    return;
  }
  return decoratorFunction;
}
export default localizable;
