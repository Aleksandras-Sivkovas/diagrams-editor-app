import React from 'react';
const dashedLine = function(target){
  const previousGetContent = target.prototype.getContent;
  const previousGetStyleClass = target.prototype.getStyleClass;
  target.prototype._getDashes = function(){
		const dashes = [];
		const x1 = this.p1.x;
    const x2 = this.p2.x;
    const y1 = this.p1.y;
    const y2 = this.p2.y;

    // length of line
    const length = Math.ceil(Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2)));

		const dashCount = Math.floor(length/18);
		for(let i = 0;i < dashCount;i++){
			dashes.push(
				<div class="dash" key={"dash_"+i}>
				</div>
			);
		}
		return dashes;
	}
	target.prototype.getContent = function(model){
    const children = [previousGetContent.apply(this, arguments)];
		children.push(
			<div class="dash-container" key="dash-container">
				{this._getDashes()}
			</div>
		);
		return children;
  }

  target.prototype.getStyleClass = function(){
    return previousGetStyleClass.apply(this, arguments) + " dashed-line";
  }
};

export default dashedLine;
