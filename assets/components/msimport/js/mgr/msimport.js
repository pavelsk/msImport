var msImport = function (config) {
	config = config || {};
	msImport.superclass.constructor.call(this, config);
};
Ext.extend(msImport, Ext.Component, {
	page: {}, window: {}, grid: {}, tree: {}, panel: {}, combo: {}, config: {}, view: {}, utils: {}
});
Ext.reg('msimport', msImport);

msImport = new msImport();