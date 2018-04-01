
import React from 'react';
import {observer} from "mobx-react";
import ComponentView from "./ComponentView.js";

@observer
export default class NodeView extends ComponentView {

	getCss() {
		const css = super.getCss();
		css.width = this.component.width+"px";
		css.height = this.component.height+"px";
		css.top = this.component.position.y+"px";
		css.left = this.component.position.x+"px";
		css.borderWidth = this.component.borderWidth+"px";
		return css;
	}
};
