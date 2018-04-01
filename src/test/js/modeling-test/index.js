import React from 'react';
import { render } from 'react-dom';
import {Edge,Column,Row} from "modeling";
import {Storage} from "modeling-storage";
import {localStorage} from "modeling-storage-local";

import MovableNode from './model/MovableNode.js';
import TestViewFactory from './view/TestViewFactory.js';
import TestComponent from './view/TestComponent.js';


import 'modeling-test-style';

const node = new MovableNode();
const model = node.model;

const child1 = new MovableNode();
child1.width = 300;
child1.height = 200;
child1.position.x = 100;
child1.position.y = 500;


const child1_1 = new MovableNode();
child1_1.width = 50;
child1_1.height = 50;
child1_1.position.x = 20;
child1_1.position.y = 20;
child1.append(child1_1);

const child1_2 = new MovableNode();
child1_2.width = 50;
child1_2.height = 50;
child1_2.position.x = 90;
child1_2.position.y = 90;
child1.append(child1_2);

node.append(child1);

const child2 = new MovableNode();
child2.width = 300;
child2.height = 200;
child2.position.x = 300;
child2.position.y = 100;
node.append(child2);


const edge1to2 = new Edge();
edge1to2.source = child1;
edge1to2.target = child2;
edge1to2.addBendPoint(101,101);
node.model.addEdge(edge1to2);

const edge1_2to2 = new Edge();
edge1_2to2.source = child1_2;
edge1_2to2.target = child2;
node.model.addEdge(edge1_2to2);



const columns = new MovableNode();
columns.width = 300;
columns.height = 200;
columns.position.x = 500;
columns.position.y = 500;
node.append(columns);

const c1 = new Column();
c1.width = 100;
columns.append(c1);

const r1 = new Row();
r1.height = 100;
columns.append(r1);


window.model = model;

const viewFactory = new TestViewFactory();
const app =(
  <div>
    <TestComponent component={node} viewFactory={viewFactory} class="diagram" />
  </div>
);
render(app,document.getElementById('app'));

@localStorage
class LocalStorage extends Storage{

}
const storage = new LocalStorage();

storage.onLoad = function(response){
  // console.log(response.response.responseText);
  const node = response.model.root;
  const app =(
    <div>
      <TestComponent component={node} viewFactory={viewFactory} class="diagram" />
    </div>
  );
  render(app,document.getElementById('app'));
}
window.storage = storage;
