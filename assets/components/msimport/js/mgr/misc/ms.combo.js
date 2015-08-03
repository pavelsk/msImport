Ext.namespace('msImport.combo');

msImport.combo.ProductFields = function(config) {
    config = config || {};

    Ext.applyIf(config,{
        name: config.name
        ,fieldLabel: config.label
        ,hiddenName: config.name
        ,displayField: 'title'
        ,valueField: 'name'
        ,anchor: '99%'
        ,fields: ['name','title']
        ,pageSize: 20
        ,url: msImport.config.connector_url
        ,typeAhead: true
        ,editable: true
        ,allowBlank: true
        ,emptyText: _('no')
        ,baseParams: {
            action: 'mgr/import/settings/getproductfields'
            ,combo: 1
        }
    });
    msImport.combo.ProductFields.superclass.constructor.call(this,config);
};
Ext.extend(msImport.combo.ProductFields,MODx.combo.ComboBox);
Ext.reg('msimport-combo-product-fields',msImport.combo.ProductFields);