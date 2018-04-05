
import React from 'react';
import {observer} from "mobx-react";
import {ColumnView, select,resize} from 'modeling';
import DVCM from '../model/DVCM.js';

@resize({right:true})
@select
@observer
export default class PoolView extends ColumnView {

	getContent() {
		const _childrenDivStyle = {
			height:this.component.contentHeight +'px'
		};
		return [
			<div
					key="name-div"
					class="name-div"
			>
				{this.component.name}
			</div>,
			<div
					style={_childrenDivStyle}
					key="content-div"
					class="content-div"
			>
				{this.getChildrenViews()}
			</div>
		];
	}
	getCss() {
		const css = super.getCss();
		css.height = '100%';
		return css;
	}

	getStyleClass(){
		return super.getStyleClass() + " pool";
	}

};
