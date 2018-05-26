import {observable} from "mobx";

class LocaleSettings {
  @observable
  locale = null;
  localize(key,defaultValue){
    if(!this.locale){
      return defaultValue;
    }
    const value = this.locale[key];
    if((value != undefined) && (value != null)){
      return value;
    }
    return defaultValue;
  }
}
const localeSettings = new LocaleSettings();
export {localeSettings};
