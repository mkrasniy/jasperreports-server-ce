define(["require","jquery","common/util/classUtil"],function(e){var t=e("jquery"),i=e("common/util/classUtil");return i.extend({constructor:function(e){e=e||{},this.data=e.data||{}},getData:function(e){var i,a,n=e||{},r=new t.Deferred;return n.id&&(i=this.data[n.id].leaves.slice(n.offset,n.offset+e.limit),a=this.data[n.id].leaves.length),r.resolve(i||[],a||0),r}})});