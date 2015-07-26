msImport.window.CreateItem = function (config) {
	config = config || {};
	if (!config.id) {
		config.id = 'msimport-item-window-create';
	}
	Ext.applyIf(config, {
		title: _('msimport_item_create'),
		width: 550,
		autoHeight: true,
		url: msImport.config.connector_url,
		action: 'mgr/item/create',
		fields: this.getFields(config),
		keys: [{
			key: Ext.EventObject.ENTER, shift: true, fn: function () {
				this.submit()
			}, scope: this
		}]
	});
	msImport.window.CreateItem.superclass.constructor.call(this, config);
};
Ext.extend(msImport.window.CreateItem, MODx.Window, {

	getFields: function (config) {
		return [{
			xtype: 'textfield',
			fieldLabel: _('msimport_item_name'),
			name: 'name',
			id: config.id + '-name',
			anchor: '99%',
			allowBlank: false,
		}, {
			xtype: 'textarea',
			fieldLabel: _('msimport_item_description'),
			name: 'description',
			id: config.id + '-description',
			height: 150,
			anchor: '99%'
		}, {
			xtype: 'xcheckbox',
			boxLabel: _('msimport_item_active'),
			name: 'active',
			id: config.id + '-active',
			checked: true,
		}];
	}

});
Ext.reg('msimport-item-window-create', msImport.window.CreateItem);


msImport.window.UpdateItem = function (config) {
	config = config || {};
	if (!config.id) {
		config.id = 'msimport-item-window-update';
	}
	Ext.applyIf(config, {
		title: _('msimport_item_update'),
		width: 550,
		autoHeight: true,
		url: msImport.config.connector_url,
		action: 'mgr/item/update',
		fields: this.getFields(config),
		keys: [{
			key: Ext.EventObject.ENTER, shift: true, fn: function () {
				this.submit()
			}, scope: this
		}]
	});
	msImport.window.UpdateItem.superclass.constructor.call(this, config);
};
Ext.extend(msImport.window.UpdateItem, MODx.Window, {

	getFields: function (config) {
		return [{
			xtype: 'hidden',
			name: 'id',
			id: config.id + '-id',
		}, {
			xtype: 'textfield',
			fieldLabel: _('msimport_item_name'),
			name: 'name',
			id: config.id + '-name',
			anchor: '99%',
			allowBlank: false,
		}, {
			xtype: 'textarea',
			fieldLabel: _('msimport_item_description'),
			name: 'description',
			id: config.id + '-description',
			anchor: '99%',
			height: 150,
		}, {
			xtype: 'xcheckbox',
			boxLabel: _('msimport_item_active'),
			name: 'active',
			id: config.id + '-active',
		}];
	}

});
Ext.reg('msimport-item-window-update', msImport.window.UpdateItem);