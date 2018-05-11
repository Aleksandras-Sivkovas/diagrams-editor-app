import React from 'react';
import {observer} from "mobx-react";
import TransactionLabel from "../model/TransactionLabel.js";
import {select,LabelView} from "modeling";
import TransactionBorderView from "./TransactionBorderView.js";

@select
@observer
export default class TransactionView extends React.Component{

  render() {
    const component = this.props.component;
    const points = component.transactionBounds;
    if(points.length == 0){
      return [];
    }
    const children = [];
    let previous = points[points.length-1];
    for(let point of points){
      children.push(<TransactionBorderView
        component={component}
        key={component.id +"_"+ previous.x +";" +previous.y +
        "_" + point.x +";" +point.y}
        p1={previous}
        p2={point}
        />
      );
      previous = point;
    }

    const functionsRectangle = component.functionsPoints;
    const label = new TransactionLabel(component);

    children.push(
      <LabelView class="transaction-name" key="transaction-name" component={label} >
        {component.name}
      </LabelView>
    );
		return children;
	}
};
