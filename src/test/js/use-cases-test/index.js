import React from 'react';
import { render } from 'react-dom';

import {Actor,Association,System,UseCase,
    UseCases,UseCasesViewFactory,UseCasesView,
  Extension,Inclusion} from  "use-cases"

import {UseCasesStorage} from "use-cases-storage";
import {localStorage} from "modeling-storage-local";

import 'use-cases-test-style';

const useCases = new UseCases();
const viewFactory = new UseCasesViewFactory();

const system = new System("The system");
system.position.x = 300;
system.position.y = 100;
system.width = 500;
system.height = 500;
useCases.append(system);

const actor1 = new Actor("Department1");
actor1.position.x = 20;
actor1.position.y = 20;
useCases.append(actor1);

const actor2 = new Actor("Department2");
actor2.position.x = 20;
actor2.position.y = 300;
useCases.append(actor2);


const t1 = new UseCase("transaction1");
t1.position.x = 20;
t1.position.y = 20;
system.append(t1);

const t2 = new UseCase("transaction2");
t2.position.x = 20;
t2.position.y = 200;
system.append(t2);

const t1_extended = new UseCase("t1_extended");
t1_extended.position.x = 300;
t1_extended.position.y = 10;
system.append(t1_extended);

const t1_included = new UseCase("t1_included");
t1_included.position.x = 300;
t1_included.position.y = 120;
system.append(t1_included);


const association_actor1_to_t1 = new Association();
association_actor1_to_t1.source = actor1;
association_actor1_to_t1.target = t1;
useCases.model.addEdge(association_actor1_to_t1);

const association_actor1_to_t2 = new Association();
association_actor1_to_t2.source = actor1;
association_actor1_to_t2.target = t2;
useCases.model.addEdge(association_actor1_to_t2);

const association_actor2_to_t1 = new Association();
association_actor2_to_t1.source = actor2;
association_actor2_to_t1.target = t1;
useCases.model.addEdge(association_actor2_to_t1);

const extension_t1_to_t1_extended = new Extension();
extension_t1_to_t1_extended.source = t1;
extension_t1_to_t1_extended.target = t1_extended;
useCases.model.addEdge(extension_t1_to_t1_extended);

const inclusion_t1_to_t1_included = new Inclusion();
inclusion_t1_to_t1_included.source = t1;
inclusion_t1_to_t1_included.target = t1_included;
useCases.model.addEdge(inclusion_t1_to_t1_included);

const app =(
  <div>
    <UseCasesView component={useCases} viewFactory={viewFactory} class="diagram" />
  </div>
);
render(app,document.getElementById('app'));

@localStorage
class LocalStorage extends UseCasesStorage{

}
const storage = new LocalStorage();
window.model = useCases.model;
storage.onLoad = function(response){
  // console.log(response.response.responseText);
  const useCases = response.model.root;
  window.model = useCases.model;
  const app =(
    <div>
      <UseCasesView component={useCases} viewFactory={viewFactory} class="diagram" />
    </div>
  );
  render(app,document.getElementById('app'));
}
window.storage = storage;
