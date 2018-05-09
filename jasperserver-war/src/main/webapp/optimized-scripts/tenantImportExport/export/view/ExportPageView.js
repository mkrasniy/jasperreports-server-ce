define(["require","backbone","./ExportView","jrs.configs","tenantImportExport/export/enum/exportTypesEnum"],function(t){"use strict";var e=t("backbone"),i=t("./ExportView"),o=t("jrs.configs"),n=t("tenantImportExport/export/enum/exportTypesEnum");return e.View.extend({events:{"click #exportButton":"doExport"},initialize:function(){this.exportView=new i,this.exportView.render({type:o.isProVersion?n.SERVER_PRO:n.SERVER_CE,tenantId:o.isProVersion?"organizations":null}),this.$el.find(".body").append(this.exportView.el),this.listenTo(this.exportView.model,"validated",function(t){var e=this.$("#exportButton"),i=t?null:"disabled";e.attr("disabled",i)},this)},doExport:function(){this.exportView.doExport()}})});