Ext.define('peq.view.spells.SpellsGridModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.spellsgrid',
    
    stores: {
        spells: {
            storeId: 'spellsStore',
            autoLoad: false,
            remoteSort: true,
            pageSize: 50,
            proxy: {
                type: 'jsonp',
                url: '',
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'totalCount'
                },
                pageParam: 'page',
                extraParams: { limit: 50 }
            },
            fields: [],
            sorters: "name",
            listeners: {
                beforeload: function(store, operation, opts) {
                    Ext.getCmp("spellsGrid-ID").mask("Loading Data...");
                    store.getProxy().setUrl(AppConfig.getApiEndpoint() + "/spell/search");
                    store.getProxy().setExtraParam('token', Ext.state.Manager.get('token'));
                },
                load: function() {
                    var ignore, defaultCols, newCols, action, records;
                    
                    // columns to ignore when populating remaining columns (default columns)
                    ignore = ['new_icon', 'id', 'name', 'goodEffect', 'mana', 'range', 'cast_time', 'recovery_time', 'recast_time'];

                    defaultCols = [{
                        text: 'Icon', dataIndex: 'new_icon', width: 50, hidden: false, renderer: 'renderIcon', sortable: false
                    }, {
                        text: 'ID', dataIndex: 'id', width: 80, align: 'center', hidden: false
                    }, {
                        text: 'Name', dataIndex: 'name', flex: 3, hidden: false, renderer: 'renderBold'
                    }, {
                        text: 'Type', dataIndex: 'goodEffect', flex: 1, align: 'center', hidden: false, renderer: 'renderType'
                    }, {
                        text: 'Mana', dataIndex: 'mana', flex: 1, align: 'center', hidden: false
                    }, {
                        text: 'Range', dataIndex: 'range', flex: 1, align: 'center', hidden: false
                    }, {
                        text: 'Cast Time', dataIndex: 'cast_time', flex: 1, align: 'center', hidden: false
                    }, {
                        text: 'Recovery Time', dataIndex: 'recovery_time', flex: 1, align: 'center', hidden: false
                    }, {
                        text: 'Recast Time', dataIndex: 'recast_time', flex: 1, align: 'center', hidden: false
                    }];

                    newCols = defaultCols;

                    action = {
                        text: "Action",
                        renderer: function(value) {
                            var id = Ext.id();
                            setTimeout(function() {
                                var button = Ext.create('Ext.button.Button', {
                                    glyph: 0xf013,
                                    menu: [{
                                        text: "Edit",
                                        handler: function (grid, rowIndex, colIndex) {
                                            setTimeout(function() {
                                                var row = Ext.getCmp("spellsGrid-ID").getSelectionModel().getSelection().shift().getData();
                                                Ext.MessageBox.alert("Not implemented", "This is not yet implemented, sorry!");
                                            }, 200);
                                        }
                                    }, {
                                        text: "Copy",
                                        handler: function (grid, rowIndex, colIndex) {
                                            setTimeout(function() {
                                                var row = Ext.getCmp("spellsGrid-ID").getSelectionModel().getSelection().shift().getData();
                                                Ext.MessageBox.alert("Not implemented", "This is not yet implemented, sorry!");
                                            }, 200);
                                        }
                                    }, {
                                        text: "Delete",
                                        handler: function (grid, rowIndex, colIndex) {
                                            setTimeout(function() {
                                                var row = Ext.getCmp("spellsGrid-ID").getSelectionModel().getSelection().shift().getData();
                                                Ext.MessageBox.alert("Not implemented", "This is not yet implemented, sorry!");
                                            }, 200);
                                        }
                                    }]
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
                    if (typeof Ext.data.StoreManager.lookup('spellsStore').data.items[0] != "undefined") {
                        records = Ext.data.StoreManager.lookup('spellsStore').data.items[0].data;
                        Ext.Object.each(records, function (key, obj) {
                            if (!Ext.Array.contains(ignore, key)) {
                                // push column onto stack
                                newCols.push({
                                    text: Util.ucwords(key), dataIndex: key, flex: 1, hidden: true
                                });
                            }
                        });
                    }

                    // push action column onto stack last
                    newCols.push(action);

                    Ext.getCmp("spellsGrid-ID").reconfigure(undefined, newCols);
                    Ext.getCmp("spellsGrid-ID").unmask();  
                }
            }
        }
    }
});
