import React from 'react';
import { render } from 'react-dom';

import {DVCMView,DVCM,DVCMViewFactory,Activity,Pool,SequenceFlow, StartEvent,
  EndEvent,Transaction} from "dvcm";

import {DVCMStorage} from "dvcm-storage";
import {localStorage} from "modeling-storage-local";

import 'dvcm-test-style';

const dvcm = new DVCM();
dvcm.processesPool.width = 150;
dvcm.functionsPool.width = 600;
const viewFactory = new DVCMViewFactory();

const d1 = new Pool("Department1");
d1.width = 200;
const d2 = new Pool("Department2");
d2.width = 200;
const d3 = new Pool("Department3");
d3.width = 200;
dvcm.functionsPool.append(d1);
dvcm.functionsPool.append(d2);
dvcm.functionsPool.append(d3);

const start = new StartEvent();
start.position.x = 50;
start.position.y = 20;
dvcm.processesPool.append(start);

const end = new EndEvent();
end.position.x = 50;
end.position.y = 300;
dvcm.processesPool.append(end);

const p1 = new Activity('P1.');
p1.position.x = 50;
p1.position.y = 120;
dvcm.processesPool.append(p1);

const f1 = new Activity('F1.');
f1.position.x = 20;
f1.position.y = 20;
d2.append(f1);

const f1_1 = new Activity('F1.1.');
f1_1.position.x = 20;
f1_1.position.y = 20;
d1.append(f1_1);

const f1_2 = new Activity('F1.2.');
f1_2.position.x = 20;
f1_2.position.y = 20;
d3.append(f1_2);


const flow_start_to_p1 = new SequenceFlow();
flow_start_to_p1.source = start;
flow_start_to_p1.target = p1;
dvcm.model.addEdge(flow_start_to_p1);

const flow_p1_to_f1_1 = new SequenceFlow();
flow_p1_to_f1_1.source = p1;
flow_p1_to_f1_1.target = f1_1;
dvcm.model.addEdge(flow_p1_to_f1_1);

const flow_p1_to_end = new SequenceFlow();
flow_p1_to_end.source = p1;
flow_p1_to_end.target = end;
dvcm.model.addEdge(flow_p1_to_end);

const flow_f1_1_to_f1 = new SequenceFlow();
flow_f1_1_to_f1.source = f1_1;
flow_f1_1_to_f1.target = f1;
dvcm.model.addEdge(flow_f1_1_to_f1);

const flow_f1_to_f1_2 = new SequenceFlow();
flow_f1_to_f1_2.source = f1;
flow_f1_to_f1_2.target = f1_2;
dvcm.model.addEdge(flow_f1_to_f1_2);

const flow_f1_2_to_p1 = new SequenceFlow();
flow_f1_2_to_p1.source = f1_2;
flow_f1_2_to_p1.target = p1;
dvcm.model.addEdge(flow_f1_2_to_p1);

const transaction = new Transaction();
dvcm.model.addComponent(transaction);
transaction.addActivity(p1);
transaction.addActivity(f1);
transaction.addActivity(f1_1);
transaction.addActivity(f1_2);


const app =(
  <div>
    <DVCMView component={dvcm} viewFactory={viewFactory} class="diagram" />
  </div>
);
render(app,document.getElementById('app'));

@localStorage
class LocalStorage extends DVCMStorage{

}
const storage = new LocalStorage();
window.model = dvcm.model;
storage.onLoad = function(response){
  // console.log(response.response.responseText);
  const dvcm = response.model.root;
  window.model = dvcm.model;
  const app =(
    <div>
      <DVCMView component={dvcm} viewFactory={viewFactory} class="diagram" />
    </div>
  );
  render(app,document.getElementById('app'));
}
window.storage = storage;
