var dynamicTree={trees:{},nodes:{},treeNodeEdited:null,editaborted:!1,activeTreeId:null,Tree:function(e,t){this.id=e,t?(this.setRootNode(t.root),this.bShowRoot=!!t.bShowRoot,this.handleNodeOnDblclick=void 0!==t.handleNodeOnDblclick?t.handleNodeOnDblclick:!0,this.multiSelectEnabled=!!t.multiSelectEnabled,this.showAllNodesOnStartup=!!t.showAllNodesOnStartup,this.treeClassName=t.treeClassName?t.treeClassName:"",this.dragPattern=t.dragPattern,this.dragClasses=t.dragClasses,this.dropClasses=t.dropClasses,this.selectOnMousedown=t.selectOnMousedown,this.regionID=t.regionID,this.scroll=t.scroll,this.templateDomId=t.templateDomId?t.templateDomId:this.DEFAULT_TREE_TEMPLATE_ID):(this.templateDomId=this.DEFAULT_TREE_TEMPLATE_ID,this.handleNodeOnDblclick=!0),this.stateObject={},this.sortNodes=!0,this.sorters=[this.sortByOrder,this.sortByName],this.selectedNodes=[],this.TREE_NN_ITEMS_SELECTED="#{count} items selected",dynamicTree.trees[this.id]=this,this._createFromTemplate(),this.refreshStyle(),this._registerEvents(),this._registerCustomScroll()},getNextId:function(){var e=1;return function(){return e++}}(),getActiveTree:function(){return dynamicTree.trees[dynamicTree.activeTreeId]},getTreeNode:function(e){return dynamicTree.nodes[e]},getStorageVal:function(e){var t=JSON.parse(window.localStorage.getItem("dynamicTree"))||{};return t[e]||null},setStorageVal:function(e,t){var d=window.localStorage,s=JSON.parse(d.getItem("dynamicTree"))||{};s[e]=t;try{d.setItem("dynamicTree",JSON.stringify(s))}catch(r){window.console&&console.log(r)}},_templateHash:{}};dynamicTree.Tree.addVar("DEFAULT_TREE_TEMPLATE_ID","list_responsive_collapsible"),dynamicTree.Tree.addVar("HIDE_ROOT_CLASS_NAME","hideRoot"),dynamicTree.Tree.addMethod("getId",function(){return this.id}),dynamicTree.Tree.addMethod("_getElement",function(){return this._element||(this._element=$(this.id)),this._element}),dynamicTree.Tree.addMethod("_createFromTemplate",function(){this._getElement()&&(this._getElement().insert({after:this._getTemplateElement(this._getElement())}),this._getElement().remove(),this._element=null,this._getElement().update())}),dynamicTree.Tree.addMethod("_registerCustomScroll",function(){if(!this.scroll&&this._getElement()){var e=this._getElement().up(layoutModule.SWIPE_SCROLL_PATTERN);if(e){var t=layoutModule.scrolls.get(e.identify());t&&(this.scroll=t)}}}),dynamicTree.Tree.addMethod("setRootNode",function(e){this.rootNode=e,this.rootNode&&(this.rootNode.treeId=this.id)}),dynamicTree.Tree.addMethod("getRootNode",function(){return this.rootNode}),dynamicTree.Tree.addMethod("refreshStyle",function(){var e=this._getElement();e.templateClassName&&(e.className=e.templateClassName),this.treeClassName&&e.addClassName(this.treeClassName),this.bShowRoot?e.removeClassName(this.HIDE_ROOT_CLASS_NAME):e.addClassName(this.HIDE_ROOT_CLASS_NAME)}),dynamicTree.Tree.addMethod("resetSelected",function(){this._prevSelectedNodes=this.selectedNodes.clone(),this.selectedNodes=[]}),dynamicTree.Tree.addMethod("revertSelection",function(e){var t=this._prevSelectedNodes.clone();t=t.concat(this.selectedNodes),this.selectedNodes=this._prevSelectedNodes.clone();for(var d=0;d<t.length;d++)t[d].refreshStyle()}),dynamicTree.Tree.addMethod("getSelectedNode",function(){return 0===this.selectedNodes.length?null:this.selectedNodes[0]}),dynamicTree.Tree.addMethod("addNodeToSelected",function(e){this.selectedNodes.push(e),this._prevSelectedNodes=this.selectedNodes.clone()}),dynamicTree.Tree.addMethod("removeNodeFromSelected",function(e){for(var t=0;t<this.selectedNodes.length;t++)if(this.selectedNodes[t]==e)return this._prevSelectedNodes=this.selectedNodes.clone(),void this.selectedNodes.splice(t,1)}),dynamicTree.Tree.addMethod("isNodeSelected",function(e){var t=this.selectedNodes&&this.selectedNodes.length;if(t)for(var d=0;t>d;d++)if(this.selectedNodes[d]==e)return!0;return!1}),dynamicTree.Tree.addMethod("resortSubtree",function(e){if(e){e.resortChilds();for(var t=0;t<e.childs.length;t++)this.resortSubtree(e.childs[t])}}),dynamicTree.Tree.addMethod("resortTree",function(){this.sortNodes&&this.resortSubtree(this.rootNode)}),dynamicTree.Tree.addMethod("readStates",function(){var e=dynamicTree.getStorageVal("tree"+this.id);if(e)for(var t in e)this.stateObject[t]=e[t]}),dynamicTree.Tree.addMethod("getState",function(e){var t,d=this.stateObject;return d[e]?(t=d[e],(null===t||""===t)&&(t=dynamicTree.TreeNode.State.CLOSED),t):dynamicTree.TreeNode.State.CLOSED}),dynamicTree.Tree.addMethod("writeStates",function(e,t){var d={},s=this.stateObject;for(var r in s)d[r]=s[r];s[e]=t,null!=t&&(d[e]=t),dynamicTree.setStorageVal("tree"+this.id,d)}),dynamicTree.Tree.addMethod("resetStates",function(){this.stateObject={},dynamicTree.setStorageVal("tree"+this.id,"")}),dynamicTree.Tree.addMethod("comparer",function(e,t){var d,s;if(this.sorters&&this.sorters.length)for(d=0;d<this.sorters.length;d++)if(s=this.sorters[d](e,t),0!==s)return s;return 0}),dynamicTree.Tree.addMethod("renderTree",function(){this.readStates(),this.stopWaiting(),this.refreshStyle();var e=this._getElement();this.rootNode&&(this.writeStates(this.rootNode.id,dynamicTree.TreeNode.State.OPEN),this.rootNode.showNode(),this.rootNode.render(e),this.refreshScroll())}),dynamicTree.Tree.addMethod("refreshScroll",function(e){e?setTimeout(function(){this.scroll&&this.scroll.refresh()}.bind(this),e):this.scroll&&this.scroll.refresh()}),dynamicTree.Tree.addMethod("binarySearchOfNode",function(e,t){for(var d=0,s=e.length-1;s>=d;){var r=Math.round((d+s)/2),i=e[r];if(this.comparer(i,t)<0)d=r+1;else{if(!(this.comparer(i,t)>0))return r;s=r-1}}return-(d+1)}),dynamicTree.Tree.addMethod("_deselectAllNodes",function(e){if(this.selectedNodes.length>0){var t=this.selectedNodes.clone();this.resetSelected();for(var d=0;d<t.length;d++)t[d].refreshStyle();if(e){var s=dynamicTree.trees[this.id];s.fireUnSelectAllEvent(e)}}}),dynamicTree.Tree.addMethod("_selectOrEditNode",function(e,t,d,s,r,i){var o,l,n,a=t.isSelected()&&r,c=this.multiSelectEnabled&&t.isSelected()&&d&&!a,h=t.isSelected()&&dynamicTree.treeNodeEdited!==t&&!this.multiSelectEnabled&&!d&&!a,m=null!=dynamicTree.treeNodeEdited&&(N||c),T=this.multiSelectEnabled&&!t.isSelected()&&s&&isNotNullORUndefined(this._lastSelectedNode)&&this._lastSelectedNode.parent===t.parent,u=this.multiSelectEnabled&&t.isSelected()&&s&&isNotNullORUndefined(this._lastSelectedNode)&&this._lastSelectedNode.parent===t.parent,N=!this.multiSelectEnabled&&!t.isSelected()||this.multiSelectEnabled&&!d&&!t.isSelected(),f=!t.isSelected()||N&&this.selectedNodes.length>1;if(s&&this._lastSelectedNode||(this._lastSelectedNode=t),c&&t.deselect(e),N&&this._deselectAllNodes(e),h)return void t.edit(e);if(m&&dynamicTree.treeNodeEdited.doEndEdit(e),T||u){n=t.parent;var S=n.childs.indexOf(this._lastSelectedNode),_=n.childs.indexOf(t);o=Math.min(S,_),l=Math.max(S,_)}if(T)if(o>-1)for(var y=o;l>=y;y++)n.childs[y].select(e);else n.childs[l].select(e);else if(u){for(var y=0;o>y;y++)n.childs[y].deselect(e);for(var y=l+1;y<n.childs.length;y++)n.childs[y].deselect(e)}else f&&t.select(e,t.nofocus,i)}),dynamicTree.Tree.addMethod("_deselectOthers",function(e,t,d,s,r){var i=this.multiSelectEnabled&&this.selectedNodes.length>1&&t.isSelected()&&!(d||s||r);i&&this.selectedNodes.findAll(function(e){return e!=t}.bind(this)).invoke("deselect",e)}),dynamicTree.Tree.addMethod("_selectNextNode",function(e,t){function d(e){return e=e.parent,e?e.nextSibling?e.nextSibling:d(e):null}var s=e.isOpen()&&e.getFirstChild()||e.nextSibling||d(e);s&&e.deselect()&&s.select(t)}),dynamicTree.Tree.addMethod("_selectPreviousNode",function(e,t){function d(e){return!(e.isOpen()&&e.hasChilds())&&e||d(e.getLastChild())}var s=e.prevSibling&&d(e.prevSibling)||e.parent;s&&e.deselect()&&s.select(t)}),dynamicTree.Tree.addMethod("_selectInwards",function(e,t){var d=e.isOpen()&&e.getFirstChild();d?e.deselect()&&d.select(t):e.handleNode(t)}),dynamicTree.Tree.addMethod("_selectOutwards",function(e,t){if(!e.isHiddenRootNode()){var d=e.isOpen()?null:e.parent;d?e.deselect()&&d.select(t):e.handleNode(t)}}),dynamicTree.Tree.addMethod("sortByOrder",function(e,t){var d=e.orderNumber,s=t.orderNumber;return null==d&&null==s?0:null==d?1:null==s?-1:d-s}),dynamicTree.Tree.addMethod("sortByName",function(e,t){var d=e.name.toLowerCase(),s=t.name.toLowerCase();return d>s?1:s>d?-1:0}),dynamicTree.Tree.addVar("TREE_WAIT_TEMPLATE_DOM_ID","list_responsive_collapsible:loading"),dynamicTree.Tree.addMethod("wait",function(){$(this.id).update($(this.TREE_WAIT_TEMPLATE_DOM_ID).cloneNode(!0))}),dynamicTree.Tree.addMethod("stopWaiting",function(){$(this.id).update("")}),dynamicTree.Tree.addMethod("_getTemplateElement",function(e){var t=this.templateDomId,d=$(t).cloneNode(!0);return d.writeAttribute("id",this.getId()),d.templateId=t,d.templateClassName=d.className,cloneCustomAttributes(e,d),d});