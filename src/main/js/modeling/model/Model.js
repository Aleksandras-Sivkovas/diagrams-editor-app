import {observable,computed,action} from "mobx";
import HierarchyRelation from "./HierarchyRelation.js";
import Node from "./Node.js";
import Edge from "./Edge.js";
import Relation from "./Relation.js";

export default class Model {

	_nextId = 1;

	@observable
	name;

	@observable
	selected;

  @observable
  _componentMap = new Map();


	@computed
	get nodes(){
    return this.getNodes();
  }

  set nodes(nodes){
		for(let node of this.nodes){
			node.remove();
		}
		if(!nodes) return;
		for(let node of nodes){
			this._addNodePart(node);
		}
  }

	@computed
	get relations(){
    return this.getRelations();
  }

	@computed
	get components(){
    return this._componentMap.values();
  }

  set components(components){
    this._componentMap.clear();
    if(!components){
      return;
    }
    for (let component of components) {
      component.id = this.generateId();
      this._componentMap.set(component.id,component);
    }
  }

	root = null;

	constructor(){
	}
	addAsRoot(node){
		for(let relation of this.relations){
			if(relation.source.id == 0){
				relation.source = node;
			}
			if(relation.target.id == 0){
				relation.target = node;
			}
		}
		this.root = node;
		node.id = 0;
		node.model = this;
	}


  generateId() {
    return this._nextId++;
	}

	getDescendants(node){
		const descendants = [];
		const children = this.getChildren(node);
		for(let child of children){
			descendants.push(child,...this.getDescendants(child));
		}
		return descendants;
	}

	_validateParent(parent){
		if(!parent){
			return this.root;
		}
		if(!(parent instanceof Node)){
			return null;
		}
		const contains = this.getDescendants(this.root).filter(node => (node.id == parent.id));
		if((parent == this.root) || (contains.length > 0)){
			return parent;
		}
		return null;
	}

	moveNode(node,parent){
		// TODO: implement
		console.warn("node moving not implemented yet");
	}

	_addNodePart(node){
		const id = this.generateId();
		node.id = id;
		node.model = this;
		this._componentMap.set(id,node);
	}

  @action
  _addNodeTree(node,parent) {
		if(!node || !(node instanceof Node)){
			console.warn("Not a node");
			return;
		}
		parent = this._validateParent(parent,node);
		if(parent == null){
			console.warn("Invalid parent");
			return;
		}
		const previousModel = node.model;

    this._addNodePart(node);
    const hierarchy = new HierarchyRelation();
    hierarchy.source = parent;
    hierarchy.target = node;
    const id = this.generateId();
    hierarchy.id = id;
    hierarchy.model = this;
    this._componentMap.set(id,hierarchy);

		const children = previousModel.getChildren(node);
		for(let child of children){
			this._addNodeTree(child,node);
		}
	}

	@action
	addNode(node,parent){
		if(node.model == this){
			this.moveNode(node,parent);
			return;
		}
		const previousModel = node.model;
		this._addNodeTree(node,parent);
		const relations = previousModel.relations.filter(relation => !(relation instanceof HierarchyRelation));
		for(let relation of relations){
			// If relation components exist in this model
			if(
					(this.getComponent(relation.source.id) == relation.source) &&
					(this.getComponent(relation.target.id) == relation.target)
			){
				this._componentMap.set(relation.id,relation);
			}
		}
	}

	@action
	addComponent(component){
		let id = this.generateId();
    component.id = id;
    component.model = this;
    this._componentMap.set(id,component);
	}

	@action
	addRelation(relation){
		this.addComponent(relation);
	}
  @action
  addEdge(edge) {
    this.addRelation(edge);
	}

  _removeEdge(edge){
    this._componentMap.delete(edge.id);
  }
  _removeHierarchy(hierarchy){
    this._componentMap.delete(hierarchy.id);
  }

  _removeRelation(relation){
    if(relation instanceof Edge){
      this._removeEdge(relation);
      return;
    }
    if(relation instanceof HierarchyRelation){
      this._removeHierarchy(relation);
      return;
    }
    this._componentMap.delete(relation.id);
  }
  _removeNode(node){
    const children = this.getChildren(node);
    for (let child of children) {
      this._removeNode(child);
    }
    const relations = this.relations.filter(relation => (
        (relation.source == node) ||
        (relation.target == node)
    ));
    for (let relation of relations) {
      this._removeRelation(relation);
    }
    this._componentMap.delete(node.id);
  }
  removeComponent(component) {
    if(component instanceof Relation){
      this._removeRelation(component);
      return;
    }
    if(component instanceof Node){
      this._removeNode(component);
      return;
    }
    this._componentMap.delete(component.id);
	}

  getChildren(node){
		const hierarchyRelations = this.getHierarchyRelations().filter(relation => (relation.source == node));
    const children = [];
    for (let relation of hierarchyRelations) {
      children.push(relation.target);
    }
    return children;
  }

  getNodes() {
    return this.components.filter(component => (component instanceof Node));
	}

	getEdges() {
    return this.components.filter(component => (component instanceof Edge));
	}

  getRelations(){
    return this.components.filter(component => (component instanceof Relation));
  }
	getHierarchyRelations() {
    return this.components.filter(component => (component instanceof HierarchyRelation));
	}

	getComponent(id){
		return this._componentMap.get(id);
	}

	getParent(node){
		if(node == this.root){
			return null;
		}
		const parentRelation = this.getHierarchyRelations().filter(relation => (relation.target == node))[0];
		return parentRelation.source;
	}
	getParents(node){
		const parents = [];
		if(node == this.root){
			return parents;
		}
		for(let current = node.parent;current != this.root;current = current.parent){
			parents.push(current);
		}
		return parents;
	}
};
