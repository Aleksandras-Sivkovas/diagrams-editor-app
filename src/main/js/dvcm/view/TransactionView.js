import React from 'react';
import {observer} from "mobx-react";
import {ComponentView,select} from "modeling";
import TransactionBorderView from "./TransactionBorderView.js";

@select
@observer
export default class TransactionView extends ComponentView {

  getStyleClass(){
    return super.getStyleClass() + " transaction";
  }
  getContent() {
    const points = this.component.transactionBounds;
    if(points.length == 0){
      return [];
    }
    const children = [];
    let previous = points[points.length-1];
    for(let point of points){
      children.push(<TransactionBorderView
        component={this.component}
        key={this.component.id +"_"+ previous.x +";" +previous.y +
        "_" + point.x +";" +point.y}
        sourcePoint={previous}
        targetPoint={point}
        viewFactory={this.viewFactory}
        />
      );
      previous = point;
    }

    if(points.length > 1){
      const p1 = points[points.length-1];
      const p2 = points[0];
      const x = Math.min(p1.x,p2.x);
      const y = Math.min(p1.y,p2.y);
      const width = Math.max(p1.x,p2.x) - x;
      const css = {
        position: "absolute",
        top:y+"px",
        left:x+'px',
        width:width+"px",
        textAlign:'center'
      };
      children.push(
        <div style={css} key="transaction-name">
          {this.component.name}
        </div>
      );

    }
		return children;
	}
};
