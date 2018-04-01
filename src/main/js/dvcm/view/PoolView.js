
import React from 'react';
import {observer} from "mobx-react";
import {ColumnView, select,resize} from 'modeling';
import DVCM from '../model/DVCM.js';

@resize
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
		if(this.component.parent.rootPoolsHeight){
			css.borderBottom = 'solid';
		}else{
			css.height = '100%';
		}
		return css;
	}

	getStyleClass(){
		return super.getStyleClass() + " pool";
	}

	getResizeProperties(){
		if(this.component.parent.rootPoolsHeight){
			return {right:true,bottom:true,rightBottom:true};
		}
		return {right:true};
	}
};
