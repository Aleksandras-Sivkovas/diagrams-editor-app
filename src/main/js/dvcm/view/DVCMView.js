
import React from 'react';
import {NodeView, select} from 'modeling';

@select
export default class DVCMView extends NodeView {

	getCss() {
		const css = super.getCss();
		css.borderWidth = '1px';
		return css;
	}
};
