Ext.define('peq.view.items.ItemsGridModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.itemsgrid',
    
    stores: {
        items: {
            storeId: 'itemsStore',
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
                { name: 'id', type: 'string' },
                { name: 'Name', type: 'string' },
                { name: 'typeName', type: 'string' },
                { name: 'magic', type: 'string' },
                { name: 'nodrop', type: 'string' },
                { name: 'norent', type: 'string' },
                { name: 'artifactflag', type: 'string' },
                { name: 'ac', type: 'string' },
                { name: 'damage', type: 'string' },
                { name: 'delay', type: 'string' },
                { name: 'range', type: 'string' }
            ],
            sorters: "field",
            listeners: {
                beforeload: function(store, operation, opts) {
                    Ext.getCmp("itemsGrid-ID").mask("Loading Data...");
                    store.getProxy().setUrl(AppConfig.getApiEndpoint() + "/item/search");
                    store.getProxy().setExtraParam('page', store.lastOptions.page);
                },
                load: function() {
                    var ignore, defaultCols, newCols, action, records;
                    
                    // columns to ignore when populating remaining columns (default columns)
                    ignore = ['id', 'Name', 'typeName', 'magic', 'nodrop', 'norent', 'artifactFlag', 'ac', 'damage', 'delay', 'range'];
                    
                    defaultCols = [{
                        text: 'ID', dataIndex: 'id', flex: 1, hidden: false
                    }, {
                        text: 'Name', dataIndex: 'Name', flex: 2, hidden: false
                    }, {
                        text: 'Type', dataIndex: 'typeName', flex: 2, hidden: false
                    }, {
                        text: 'Magic', dataIndex: 'magic', flex: 1, hidden: false, renderer: 'rendererBoolean'
                    }, {
                        text: 'No-Drop', dataIndex: 'nodrop', flex: 1, hidden: false, renderer: 'rendererBoolean'
                    }, {
                        text: 'No-Rent', dataIndex: 'norent', flex: 1, hidden: false, renderer: 'rendererBoolean'
                    }, {
                        text: 'Artifact', dataIndex: 'artifactflag', flex: 1, hidden: false, renderer: 'rendererBoolean'
                    }, {
                        text: 'Armor', dataIndex: 'ac', flex: 1, hidden: false
                    }, {
                        text: 'Damage', dataIndex: 'damage', flex: 1, hidden: false
                    }, {
                        text: 'Delay', dataIndex: 'delay', flex: 1, hidden: false
                    }, {
                        text: 'Range', dataIndex: 'range', flex: 1, hidden: false
                    }];

                    newCols = defaultCols;

                    action = {
                        text: "Action",
                        renderer: function(value) {
                            var id = Ext.id();
                            setTimeout(function() {
                                var button = Ext.create('Ext.button.Button', {
                                    glyph: 0xf044,
                                    text: "Edit",
                                    handler: function (grid, rowIndex, colIndex) {
                                        setTimeout(function() {
                                            var row = Ext.getCmp("itemsGrid-ID").getSelectionModel().getSelection().shift().getData();
                                            Ext.MessageBox.alert("Not implemented", "This is not yet implemented, sorry!");
                                        }, 200);
                                    }
                                });
                                if (Ext.get(id)) {
                                    button.render(Ext.get(id));
                                }
                            }, 1);
                            return '<div id="' + id + '"></div>';
                        },
                        flex: 1,
                        align: 'center',
                        hidden: false,
                        sortable: false
                    };

                    // loop over the first data record to get full list of all columns from api
                    records = Ext.data.StoreManager.lookup('itemsStore').data.items[0].data;
                    Ext.Object.each(records, function (key, obj) {
                        if (!Ext.Array.contains(ignore, key)) {
                            // push column onto stack
                            newCols.push({
                                text: key, dataIndex: key, flex: 1, hidden: true
                            });
                        }
                    });

                    // push action column onto stack last
                    newCols.push(action);

                    Ext.getCmp("itemsGrid-ID").reconfigure(undefined, newCols);
                    Ext.getCmp("itemsGrid-ID").unmask();  
                }
            }
        }
    }
});
