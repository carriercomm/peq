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
                    var columns, visibleCols, defaultCols, newCols, action, records;
                    
                    columns = {
                        'new_icon': {
                            text: 'Icon',
                            width: 50,
                            sortable: false,
                            renderer: 'renderIcon',
                            order: 0
                        },
                        'id': {
                            text: 'ID',
                            align: 'left',
                            width: 80,
                            order: 1
                        },
                        'name': {
                            text: 'Name',
                            align: 'left',
                            flex: 3,
                            renderer: 'renderBold',
                            order: 2
                        },
                        'goodEffect': {
                            text: 'Type',
                            renderer: 'renderType',
                            order: 3
                        },
                        'mana': {
                            text: 'Mana',
                            order: 4
                        },
                        'range': {
                            text: 'Range',
                            order: 5
                        },
                        'cast_time': {
                            text: 'Cast Time',
                            order: 6
                        },
                        'recovery_time': {
                            text: 'Recovery Time',
                            order: 7
                        },
                        'recast_time': {
                            text: 'Recast Time',
                            order: 8
                        }
                    };

                    visibleCols = ['new_icon', 'id', 'name', 'goodEffect', 'mana', 'range', 'cast_time', 'recovery_time', 'recast_time'];

                    action = Util.grid.createActionColumn([{
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
                    }]);

                    newCols = [];

                    // loop over the first data record to get full list of all columns from api
                    if (typeof Ext.data.StoreManager.lookup('spellsStore').data.items[0] != "undefined") {
                        records = Ext.data.StoreManager.lookup('spellsStore').data.items[0].data;
                        Ext.Object.each(records, function (key, obj) {
                            var defaultProperties = {
                                text: Util.ucwords(key.split('_').join(' ')),
                                dataIndex: key,
                                flex: 1,
                                align: 'center',
                                hidden: true
                            };

                            // if defaults object exists for this key in "columns" object, override values
                            if (typeof columns[key] != "undefined") {
                                defaultProperties = Util.grid.applyOverrides(defaultProperties, columns[key]);
                                if (Ext.Array.contains(visibleCols, key)) {
                                    defaultProperties.hidden = false;
                                }
                            }
                            
                            // push column onto stack
                            newCols.push(defaultProperties);
                        });
                    }

                    // re-order column according to "order" specified in original "columns" object
                    newCols = Util.grid.reorderColumns(newCols);

                    // push action column onto stack last
                    newCols.push(action);

                    Ext.getCmp("spellsGrid-ID").reconfigure(undefined, newCols);
                    Ext.getCmp("spellsGrid-ID").unmask();  
                }
            }
        }
    }
});
