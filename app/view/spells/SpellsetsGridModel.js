Ext.define('peq.view.spells.SpellsetsGridModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.spellsetsgrid',

    stores: {
        spellsets: {
            storeId: 'spellsetsStore',
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
                    Ext.getCmp("spellsetsGrid-ID").mask("Loading Data...");
                    store.getProxy().setUrl(AppConfig.getApiEndpoint() + "/spell/searchspellsets");
                    store.getProxy().setExtraParam('token', Ext.state.Manager.get('token'));
                },
                load: function() {
                    var columns, visibleCols, defaultCols, newCols, action, records;
                    
                    columns = {
                        'id': {
                            text: 'ID',
                            align: 'left',
                            width: 110,
                            order: 1
                        },
                        'name': {
                            text: 'Name',
                            align: 'left',
                            flex: 3,
                            renderer: 'renderBold',
                            order: 2
                        },
                        'attackProcSpell': {
                            text: 'Attack Proc',
                            align: 'left',
                            flex: 2,
                            order: 3
                        },
                        'rangeProcSpell': {
                            text: 'Range Proc',
                            align: 'left',
                            flex: 2,
                            order: 4
                        },
                        'defensiveProcSpell': {
                            text: 'Defensive Proc',
                            align: 'left',
                            flex: 2,
                            order: 5
                        },
                        'spells': {
                            text: 'Spells',
                            align: 'left',
                            flex: 5,
                            renderer: 'renderSpells',
                            order: 6
                        }
                    };

                    visibleCols = ['id', 'name', 'attackProcSpell', 'rangeProcSpell', 'defensiveProcSpell', 'spells'];

                    action = Util.grid.createActionColumn([{
                        text: "Edit",
                        handler: function (grid, rowIndex, colIndex) {
                            setTimeout(function() {
                                var row = Ext.getCmp("spellsetsGrid-ID").getSelectionModel().getSelection().shift().getData();
                                Ext.MessageBox.alert("Not implemented", "This is not yet implemented, sorry!");
                            }, 200);
                        }
                    }, {
                        text: "Copy",
                        handler: function (grid, rowIndex, colIndex) {
                            setTimeout(function() {
                                var row = Ext.getCmp("spellsetsGrid-ID").getSelectionModel().getSelection().shift().getData();
                                Ext.MessageBox.alert("Not implemented", "This is not yet implemented, sorry!");
                            }, 200);
                        }
                    }, {
                        text: "Delete",
                        handler: function (grid, rowIndex, colIndex) {
                            setTimeout(function() {
                                var row = Ext.getCmp("spellsetsGrid-ID").getSelectionModel().getSelection().shift().getData();
                                Ext.MessageBox.alert("Not implemented", "This is not yet implemented, sorry!");
                            }, 200);
                        }
                    }]);

                    newCols = [];

                    // loop over the first data record to get full list of all columns from api
                    if (typeof Ext.data.StoreManager.lookup('spellsetsStore').data.items[0] != "undefined") {
                        records = Ext.data.StoreManager.lookup('spellsetsStore').data.items[0].data;
                        Ext.Object.each(records, function (key, obj) {
                            var defaultProperties = {
                                text: Util.ucwords(key.split('_').join(' ')),
                                dataIndex: key,
                                flex: 1,
                                align: 'center',
                                hidden: true
                            };

                            // if defaults object exists for this key in "columns" object, override values
                            defaultProperties = Util.grid.applyOverrides(Ext.getCmp("spellsetsGrid-ID"), key, visibleCols, defaultProperties, columns[key]);
                            
                            // push column onto stack
                            newCols.push(defaultProperties);
                        });
                    }

                    // re-order column according to "order" specified in original "columns" object
                    newCols = Util.grid.reorderColumns(newCols);

                    // push action column onto stack last
                    newCols.push(action);

                    AppConfig.loadedGems = [];
                    Ext.getCmp("spellsetsGrid-ID").reconfigure(undefined, newCols);
                    Ext.getCmp("spellsetsGrid-ID").unmask();
                }
            }
        }
    }
});
