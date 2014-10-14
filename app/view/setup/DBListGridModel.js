Ext.define('peq.view.setup.DBListGridModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.dblistgrid',
    
    stores: {
        dbList: {
            storeId: 'dbListStore',
            autoLoad: false,
            remoteSort: false,
            pageSize: 100,
            proxy: {
                type: 'jsonp',
                url: '',
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'totalCount'
                },
                pageParam: 'page',
                extraParams: { limit: 100 }
            },
            fields: [
                { name: 'token', type: 'string' },
                { name: 'server', type: 'string' },
                { name: 'username', type: 'string' },
                { name: 'database', type: 'string' }
            ],
            sorters: "field",
            listeners: {
                beforeload: function(store, operation, opts) {
                    Ext.getCmp("dbListGrid-ID").mask("Loading Data...");
                    store.getProxy().setUrl(AppConfig.getApiEndpoint() + "/auth/getTokenData");
                },
                load: function() {
                    var items, matched;
                    items = Ext.data.StoreManager.lookup('dbListStore').data.items;
                    matched = false;
                    Ext.Object.each(items, function (key, obj) {
                        if (Ext.state.Manager.get('token') == obj.data.token) {
                            matched = key;
                        }
                    });

                    setTimeout(function() {
                        if (matched !== false) {
                            Ext.getCmp('dbListGrid-ID').getSelectionModel().select(parseInt(matched));
                        } else {
                            Ext.getCmp('dbListGrid-ID').focus();
                        }
                    }, 200);
                    
                    Ext.getCmp("dbListGrid-ID").unmask();  
                }
            }
        }
    }
});
