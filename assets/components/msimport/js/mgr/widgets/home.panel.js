msImport.panel.Home = function (config) {
	config = config || {};

    this.canChange = true;

	Ext.apply(config, {
		baseCls: 'modx-formpanel',
		layout: 'anchor',
		hideMode: 'offsets',
		items: [{
			html: '<h2>' + _('msimport') + '</h2>',
			cls: '',
			style: {margin: '15px 0'}
		}, {
			xtype: 'modx-tabs',
            id:'msimport-home-tabs',
			defaults: {border: false, autoHeight: true},
			border: true,
			hideMode: 'offsets',
            activeTab:0,
			items: [{
                xtype:'msimport-home-file-tab'
            },{
                xtype:'msimport-home-settings-tab'
            },{
                id:'msimport-home-progress-tab',
                title:'3. Запустите импорт',
                html: '<h2>' + _('hello') + '</h2>'
            }],
            listeners:{
                beforetabchange : { fn :this.beforeStepChange, scope:this},
                tabchange : { fn :this.afterStepChanged, scope:this}
            },
            bbar: [
                {
                    text: 'Предыдущий шаг',
                    handler: this.changeStep,
                    scope:this
                },
                {
                    text: 'Следующий шаг',
                    handler: this.checkStep,
                    scope:this
                }
            ]
		}]
	});
	msImport.panel.Home.superclass.constructor.call(this, config);
};
Ext.extend(msImport.panel.Home, MODx.Panel,{

    changeStep:function(next){
        var tabs = Ext.getCmp('msimport-home-tabs');
        var activeTab = tabs.getActiveTab();
        if (next==1){
            if(activeTab.nextSibling()){
                this.canChange = true;
                tabs.setActiveTab(activeTab.nextSibling());
            }
        }
        else{
            if(activeTab.previousSibling()){
                this.canChange = true;
                tabs.setActiveTab(activeTab.previousSibling());
            }
        }
    },

    checkStep : function(){

        var tabs = Ext.getCmp('msimport-home-tabs');
        var activeTab = tabs.getActiveTab();
        if(activeTab){
            var id = activeTab.getId();
            if(id=='msimport-home-file-tab'){

                var cmp = Ext.getCmp('msimport-home-file-tab');
                var f = cmp.getForm();
                f.submit({
                    waitMsg: 'Обработка данных...'
                    ,scope: this
                    ,failure: function(frm,a) {
                        if (this.fireEvent('failure',{f:frm,a:a})) {
                            MODx.form.Handler.errorExt(a.result,frm);
                        }
                        this.doLayout();
                    }
                    ,success: function(frm,a) {
                        this.changeStep(1);
                    }
                });

            }
            else if(id=='msimport-home-settings-tab'){

            }
            else if(id=='msimport-home-progress-tab'){

            }
        }

    },

    beforeStepChange : function(){

        if(this.canChange){
            this.canChange = false;
        }
        else{
            return false;
        }

    },

    afterStepChanged : function(){

        var tabs = Ext.getCmp('msimport-home-tabs');
        var bbar = tabs.getBottomToolbar();
        var activeTab = tabs.getActiveTab();
        bbar.items.each(function(item){
            item.enable();
        });
        if(!activeTab.nextSibling()){
            bbar.items.each(function(item){
                if(item.step=='next'){
                    item.disable();
                }
            });
        }
        if(!activeTab.previousSibling()){
            bbar.items.each(function(item){
                if(item.step=='prev'){
                    item.disable();
                }
            });
        }
    },

    afterFileSelected : function(data){
    }

});
Ext.reg('msimport-panel-home', msImport.panel.Home);


msImport.view.FileForm = function(config){

    config = config || {};

    Ext.applyIf(config, {
        title:'1. Загрузите файл',
        layout: 'form',
        xtype: 'form',
        id:'msimport-home-file-tab',
        url:msImport.config.connector_url,
        errorReader: MODx.util.JSONReader,
        baseParams:{
            action: 'mgr/import/file/file'
        },
        defaults: {
            msgTarget:  'under'
        },
        cls: 'main-wrapper',
        items:[{
            fieldLabel:'Путь до файла',
            xtype:'modx-panel-tv-image',
            tv:'source',
            listeners:{
                'select': {fn:this.afterFileSelected,scope:this}
            }
        },{
            fieldLabel:'Разделитель полей',
            xtype:'textfield',
            name:'delimeter',
            value:';'
        },{
            fieldLabel:'Первая строка содержит названия полей',
            xtype:'checkbox',
            name:'has_head',
            value:1
        }]
    });
    msImport.view.FileForm.superclass.constructor.call(this, config);

}
Ext.extend(msImport.view.FileForm, Ext.FormPanel, {


});
Ext.reg('msimport-home-file-tab', msImport.view.FileForm);


msImport.view.Settings = function(config){

    config = config || {};

    Ext.applyIf(config, {
        title:'2. Установите настройки импорта',
        layout: 'anchor',
        id:'msimport-home-settings-tab',
        cls: 'main-wrapper',
        items:[{
            xtype:'form',
            layout: 'form',
            labelWidth: 150,
            url:msImport.config.connector_url,
            errorReader: MODx.util.JSONReader,
            baseParams:{
                action: 'mgr/import/settings'
            },
            defaults: {
                msgTarget:  'under',
                width: 300
            },
            items:[{
                fieldLabel:'Поле,однозначно идентифицирующее товар(при обновлении)',
                xtype:'textfield',
                name:'delimeter',
                value:''
            },{
                layout: 'form',
                xtype:'modx-panel',
                defaults: {
                    msgTarget:  'under',
                    width: 300
                },
                id : 'msimport-home-settings-properties'
            }]
        },{
            layout: 'anchor',
            xtype:'modx-panel',
            id : 'msimport-home-settings-panel',
            items:[]
        }]
    });
    msImport.view.Settings.superclass.constructor.call(this, config);

    this.on('show',this.onShow,this);

}
Ext.extend(msImport.view.Settings, MODx.Panel, {

    onShow: function() {
        this.loadSettings();
        this.removeClass('x-hide-display');
    },

    loadSettings : function(){
        MODx.Ajax.request({
            url: msImport.config.connector_url,
            params: {
                action: 'mgr/import/settings/getstructure'
            },
            listeners: {
                success: {
                    fn: function (r) {

                        this.showPreview(r.data.columns,r.data.fields,r.data.data);
                        this.showProperties(r.data.columns);

                    }, scope: this
                }
            }
        });
    },

    showProperties : function(columns){
        Ext.getCmp('msimport-home-settings-properties').removeAll();

        for(i in columns){
            if(columns.hasOwnProperty(i)){
                var field = {
                    label:columns[i].header,
                    xtype:'msimport-combo-product-fields',
                    name:columns[i].dataIndex,
                    width:300
                };
                Ext.getCmp('msimport-home-settings-properties').add(field);
            }
        }

        Ext.getCmp('msimport-home-settings-properties').doLayout();
    },

    showPreview : function(columns,fields,data){

        var store = new Ext.data.ArrayStore({
            fields: fields
        });
        store.loadData(data);

        var grid = new Ext.grid.GridPanel({
            store: store,
            itemId:'msimport-home-settings-examples-grid',
            columns: columns,
            stripeRows: true,
            title: 'Превью импортируемых данных',
            // config options for stateful behavior
            stateful: true,
            stateId: 'grid',
            height: 300
        });

        Ext.getCmp('msimport-home-settings-panel').removeAll();
        Ext.getCmp('msimport-home-settings-panel').add(grid);
        Ext.getCmp('msimport-home-settings-panel').doLayout();
    }

});
Ext.reg('msimport-home-settings-tab', msImport.view.Settings);
