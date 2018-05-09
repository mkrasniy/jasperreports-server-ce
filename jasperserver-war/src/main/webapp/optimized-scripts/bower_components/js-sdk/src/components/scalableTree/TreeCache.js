define(["require","underscore","./util/getLevelPrefixRegExp","./factory/getParentIdFactory","./factory/getLevelNestingFactory","./factory/collectParentIdsFactory","./factory/coerceIdsToCommonLevelFactory"],function(e){function t(e,t,i){var s=this.getLevelNesting(e);n.each(t,function(t){var n,a=t.id,l=a,o=e,r=this.getLevelNesting(a);s>r?(n=this.coerceIdsToCommonLevel(e,a),o=n.firstId,l=n.secondId):(n=this.coerceIdsToCommonLevel(a,e),l=n.firstId,o=n.secondId),i(t,l,o)},this)}var n=e("underscore"),i=e("./util/getLevelPrefixRegExp"),s=e("./factory/getParentIdFactory"),a=e("./factory/getLevelNestingFactory"),l=e("./factory/collectParentIdsFactory"),o=e("./factory/coerceIdsToCommonLevelFactory"),r="/",d=function(e){this.initialize(e)};return n.extend(d.prototype,{initialize:function(e){e=e||{},this.getParentId=s.create(e.escapeCharacter,r),this.getLevelNesting=a.create(e.escapeCharacter,r),this.collectParentIds=l.create(e.escapeCharacter,r),this.coerceIdsToCommonLevel=o.create(e.escapeCharacter,r),this.clear(),this.viewState=e.viewState},clear:function(){this._GLOBAL_INDEXEX_CACHE={"/":0},this._TOTALS_CACHE={},this._TOTALS_ON_LEVEL_CACHE={},this._INDEXES_CACHE={"/":0},this._ITEMS_CACHE={}},isNode:function(e){var t=this.getItem(e);return t&&t.node},getItem:function(e){return this._ITEMS_CACHE[e]},addItemToCache:function(e,t){this._ITEMS_CACHE[e]=t},removeItemFromCache:function(e){delete this._ITEMS_CACHE[e]},getLevelIndex:function(e){return this._INDEXES_CACHE[e]},setLevelIndex:function(e,t){this._INDEXES_CACHE[e]=t},getTotalsByLevelId:function(e){return this._TOTALS_CACHE[e]||0},getTotals:function(){return n.reduce(this.viewState.getExpandedLevels(),function(e,t){return e+this.getTotalsByLevelId(t.id)},0,this)},setTotals:function(e,t){this._TOTALS_CACHE[e]=t},getTotalsOnLevel:function(e){return this._TOTALS_ON_LEVEL_CACHE[e]||0},setTotalsOnLevel:function(e,t){this._TOTALS_ON_LEVEL_CACHE[e]=t},getGlobalIndex:function(e){return this._GLOBAL_INDEXEX_CACHE[e]},setGlobalIndex:function(e,t){this._GLOBAL_INDEXEX_CACHE[e]=t},getSummaryTotals:function(e){return this.getTotalsByLevelId(e)+this.getTotalsOnLevel(e)},incrementTotalsOnExpandedLevels:function(e,t){this._updateTotalsOnExpandedLevels(e,t)},decrementTotalsOnExpandedLevels:function(e,t){this._updateTotalsOnExpandedLevels(e,-1*t)},incrementExpandedLevelsGlobalIndexes:function(e,t){this._updateExpandedLevelsGlobalIndexes(e,t)},decrementExpandedLevelsGlobalIndexes:function(e,t){this._updateExpandedLevelsGlobalIndexes(e,-1*t)},calculateGlobalIndex:function(e){var t=this.getLevelIndex(e),i=this.getGlobalIndex(e),s=this.getGlobalIndex(this.getParentId(e));if(!n.isUndefined(i))return i;var a=this._calculateTotalAboveLevel(e);return a+t+s},getLevelsBelowToggled:function(e,n){var i=this,s=[],a={};return t.call(this,e,n,function(e,t,n){var l=i.getLevelIndex(t),o=i.getLevelIndex(n);l>o&&(!a[e.id]&&s.push(e.id),a[e.id]=!0)}),s},getLevelsAboveToggled:function(e,n){var i=this,s={},a="/"!==e?["/"]:[];return t.call(this,e,n,function(t,n,l){var o=i.getLevelIndex(n),r=i.getLevelIndex(l);r>o?(!s[t.id]&&a.push(t.id),s[t.id]=!0):n===l&&"/"!==n&&"/"!==l&&n!==e&&(!s[t.id]&&a.push(t.id),s[t.id]=!0)}),a},getExpandedLevelsWithinGivenLevel:function(e){var t=this.getGlobalIndex(e),s=[];return n.isUndefined(t)||n.each(this.viewState.getExpandedLevels(),function(n){var a=this.getGlobalIndex(n.id);a>t&&n.id!==e&&this.getLevelNesting(n.id)>this.getLevelNesting(e)&&n.id.match(i(e))&&s.push(n)},this),s},_updateExpandedLevelsGlobalIndexes:function(e,t){var i=this.getLevelsBelowToggled(e,this.viewState.getToggledLevels());n.each(i,function(e){var n=this.getGlobalIndex(e),i=n?n+t:t;this.setGlobalIndex(e,i)},this)},_updateTotalsOnExpandedLevels:function(e,t){var i=this.collectParentIds(e);n.each(i,function(e){var n=this.getTotalsOnLevel(e),i=n?n+t:t;this.setTotalsOnLevel(e,i)},this)},_calculateTotalAboveLevel:function(e){var t,i=this.collectParentIds(e),s=1===i.length,a=function(e){return"/"!==e};return s?(t=this.getLevelsAboveToggled(e,this.viewState.getExpandedLevels()),a=function(e){return-1===n.indexOf(i,e)}):t=this.getLevelsAboveToggled(e,this.getExpandedLevelsWithinGivenLevel(this.getParentId(e))),n.reduce(t,function(e,t){if(a(t)){var n=this.getTotalsByLevelId(t)||0;return e+n}return e},1,this)}}),d});