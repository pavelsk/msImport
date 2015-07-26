msImport.page.Home = function (config) {
	config = config || {};
	Ext.applyIf(config, {
		components: [{
			xtype: 'msimport-panel-home', renderTo: 'msimport-panel-home-div'
		}]
	});
	msImport.page.Home.superclass.constructor.call(this, config);
};
Ext.extend(msImport.page.Home, MODx.Component);
Ext.reg('msimport-page-home', msImport.page.Home);