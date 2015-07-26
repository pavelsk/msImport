msImport.panel.Home = function (config) {
	config = config || {};
	Ext.apply(config, {
		baseCls: 'modx-formpanel',
		layout: 'anchor',
		/*
		 stateful: true,
		 stateId: 'msimport-panel-home',
		 stateEvents: ['tabchange'],
		 getState:function() {return {activeTab:this.items.indexOf(this.getActiveTab())};},
		 */
		hideMode: 'offsets',
		items: [{
			html: '<h2>' + _('msimport') + '</h2>',
			cls: '',
			style: {margin: '15px 0'}
		}, {
			xtype: 'modx-tabs',
			defaults: {border: false, autoHeight: true},
			border: true,
			hideMode: 'offsets',
			items: [{
				title: _('msimport_items'),
				layout: 'anchor',
				items: [{
					html: _('msimport_intro_msg'),
					cls: 'panel-desc',
				}, {
					xtype: 'msimport-grid-items',
					cls: 'main-wrapper',
				}]
			}]
		}]
	});
	msImport.panel.Home.superclass.constructor.call(this, config);
};
Ext.extend(msImport.panel.Home, MODx.Panel);
Ext.reg('msimport-panel-home', msImport.panel.Home);
