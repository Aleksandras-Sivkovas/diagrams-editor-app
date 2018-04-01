import React from 'react';
import {observer} from "mobx-react";

import {NodeView} from "modeling";

@observer
export default class TestComponent extends NodeView{
  getContent(model){
    return [this.constructor.name+this.component.id,...this.getChildrenViews()];
  }
}
