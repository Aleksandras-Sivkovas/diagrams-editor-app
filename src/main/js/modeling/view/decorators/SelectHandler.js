
export default class SelectHandler {
  constructor(model){
    this.model = model;
  }
	handleMouseDown(e){
    if (e.button != 0) {
	    return;
		}
    this.model.select();
    e.preventDefault();
    e.stopPropagation();
	}
}
