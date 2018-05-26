
import {observer} from "mobx-react";
import React from 'react';
import {localeSettings} from './localeSettings.js';

const localizable = function(defaultLocale){
  const localizer = {
    defaultLocale : defaultLocale,
    localize: function(target){


      const defaultlocale = this.defaultLocale;
      const previousrender = target.prototype.render;
      target.prototype.render = function(){
        		const locale = localeSettings.locale;
        		if(!locale){
        			this.locale = defaultLocale;
        			return  previousrender.apply(this, arguments);
        		}
        		this.locale = {};

            for (let key in defaultLocale) {
              this.locale[key] =
        					((locale[key] === null) || (locale[key] === undefined)) ?
        					defaultLocale[key] :
        					locale[key];
            }
        return previousrender.apply(this, arguments);
      };
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
