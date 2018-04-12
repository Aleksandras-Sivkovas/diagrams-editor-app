import React from 'react';
import {observer} from "mobx-react";
import {localizable} from "localizable";


@localizable({
	welcome : "Diagrams Editor 0.0.0"
})
@observer
export default class Main extends React.Component{
	render() {
    this.model = this.props.model;
		return (
      <div>
      	{this.locale.welcome}
      </div>
		);
	}
};
