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

    const functionsRectangle = this.component.functionsPoints;
    if(functionsRectangle.length == 4){
      const p1 = points[1];
      const p2 = points[2];
      const x = p1.x;
      const width = p2.y - p1.y;
      const y = Math.floor(width/2) + p1.y;
      const css = {
        position: "absolute",
        top:y+"px",
        left:x+'px',
        paddingLeft:'10px',
        textAlign:'center',
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
