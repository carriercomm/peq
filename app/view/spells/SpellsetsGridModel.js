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
                    var columns, visibleCols, defaultCols, newCols, action, records, resetWidth, gridId, storeId;
                    
                    gridId = "spellsetsGrid-ID";
                    storeId = "spellsetsStore";
                    resetWidth = false;
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
                            text: 'Attack Proc Spell',
                            align: 'left',
                            flex: 2,
                            order: 3,
                            sortable: false
                        },
                        'rangeProcSpell': {
                            text: 'Range Proc Spell',
                            align: 'left',
                            flex: 2,
                            order: 4,
                            sortable: false
                        },
                        'defensiveProcSpell': {
                            text: 'Defensive Proc Spell',
                            align: 'left',
                            flex: 2,
                            order: 5,
                            sortable: false
                        },
                        'spells': {
                            text: 'Spells',
                            align: 'left',
                            flex: 5,
                            renderer: 'renderSpells',
                            order: 6,
                            sortable: false
                        }
                    };

                    AppConfig.gridSettings[gridId].visibleCols = ['id', 'name', 'attackProcSpell', 'rangeProcSpell', 'defensiveProcSpell', 'spells'];

                    AppConfig.gridSettings[gridId].action = Util.grid.createActionColumn([{
                        text: "Edit",
                        handler: function (grid, rowIndex, colIndex) {
                            setTimeout(function() {
                                var row = Ext.getCmp(gridId).getSelectionModel().getSelection().shift().getData();
                                Ext.MessageBox.alert("Not implemented", "This is not yet implemented, sorry!");
                            }, 200);
                        }
                    }, {
                        text: "Copy",
                        handler: function (grid, rowIndex, colIndex) {
                            setTimeout(function() {
                                var row = Ext.getCmp(gridId).getSelectionModel().getSelection().shift().getData();
                                Ext.MessageBox.alert("Not implemented", "This is not yet implemented, sorry!");
                            }, 200);
                        }
                    }, {
                        text: "Delete",
                        handler: function (grid, rowIndex, colIndex) {
                            setTimeout(function() {
                                var row = Ext.getCmp(gridId).getSelectionModel().getSelection().shift().getData();
                                Ext.MessageBox.alert("Not implemented", "This is not yet implemented, sorry!");
                            }, 200);
                        }
                    }]);

                    newCols = [];
                    AppConfig.gridSettings[gridId].columns = columns;

                    // loop over the first data record to get full list of all columns from api
                    if (typeof Ext.data.StoreManager.lookup(storeId).data.items[0] != "undefined") {
                        if (typeof AppConfig.gridSettings[gridId].overrideTimer == "undefined") {
                            AppConfig.gridSettings[gridId].overrideTimer = true;
                            setTimeout(function () {
                                AppConfig.gridSettings[gridId].overrideTimer = undefined;
                            }, 1000);
                        } else {
                            resetWidth = true;
                        }

                        records = Ext.data.StoreManager.lookup(storeId).data.items[0].data;
                        Ext.Object.each(records, function (key, obj) {
                            var defaultProperties = {
                                text: Util.ucwords(key.split('_').join(' ')),
                                dataIndex: key,
                                flex: 1,
                                align: 'center',
                                hidden: true
                            };

                            // if defaults object exists for this key in "columns" object, override values
                            defaultProperties = Util.grid.applyOverrides(Ext.getCmp(gridId), key, [], defaultProperties, {}, resetWidth);
                            
                            // push column onto stack
                            newCols.push(defaultProperties);
                        });
                    }

                    // re-order column according to "order" specified in original "columns" object
                    newCols = Util.grid.reorderColumns(newCols);

                    // push action column onto stack last
                    newCols.push(AppConfig.gridSettings[gridId].action);

                    AppConfig.loadedGems = [];
                    Ext.getCmp(gridId).reconfigure(undefined, newCols);
                    Ext.getCmp(gridId).unmask();
                }
            }
        }
    }
});
