Ext.define('peq.view.npcs.NpcsGridModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.npcsgrid',

    stores: {
        npcs: {
            storeId: 'npcsStore',
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
                    Ext.getCmp("npcsGrid-ID").mask("Loading Data...");
                    store.getProxy().setUrl(AppConfig.getApiEndpoint() + "/npc/search");
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
                        'level': {
                            text: 'Level',
                            order: 3
                        },
                        'race': {
                            text: 'Race',
                            renderer: 'renderRace',
                            order: 4
                        },
                        'class': {
                            text: 'Class',
                            renderer: 'renderClass',
                            order: 5
                        },
                        'bodytype': {
                            text: 'Body Type',
                            renderer: 'renderBodytype',
                            order: 6
                        },
                        'see_invis': {
                            renderer: 'renderBoolean'
                        },
                        'see_invis_undead': {
                            renderer: 'renderBoolean'
                        },
                        'see_hide': {
                            renderer: 'renderBoolean'
                        },
                        'see_hide_improved': {
                            text: 'See Improved Hide',
                            renderer: 'renderBoolean'
                        },
                        'qglobal': {
                            renderer: 'renderBoolean'
                        },
                        'findable': {
                            renderer: 'renderBoolean'
                        },
                        'trackable': {
                            renderer: 'renderBoolean'
                        },
                        'underwater': {
                            renderer: 'renderBoolean'
                        },
                        'private_corpse': {
                            renderer: 'renderBoolean'
                        },
                        'raid_target': {
                            renderer: 'renderBoolean'
                        },
                        'npcspecialattks': {
                            renderer: 'renderSpecialAttacks'
                        },
                        'faction_hits': {
                            unsortable: true
                        },
                        'npc_faction_id': {
                            text: 'Npc Faction'
                        }
                    };

                    visibleCols = ['id', 'name', 'level', 'race', 'class', 'bodytype'];

                    action = Util.grid.createActionColumn([{
                        text: "Edit",
                        handler: function (grid, rowIndex, colIndex) {
                            setTimeout(function() {
                                var row = Ext.getCmp("npcsGrid-ID").getSelectionModel().getSelection().shift().getData();
                                Ext.MessageBox.alert("Not implemented", "This is not yet implemented, sorry!");
                            }, 200);
                        }
                    }, {
                        text: "Copy",
                        handler: function (grid, rowIndex, colIndex) {
                            setTimeout(function() {
                                var row = Ext.getCmp("npcsGrid-ID").getSelectionModel().getSelection().shift().getData();
                                Ext.MessageBox.alert("Not implemented", "This is not yet implemented, sorry!");
                            }, 200);
                        }
                    }, {
                        text: "Delete",
                        handler: function (grid, rowIndex, colIndex) {
                            setTimeout(function() {
                                var row = Ext.getCmp("npcsGrid-ID").getSelectionModel().getSelection().shift().getData();
                                Ext.MessageBox.alert("Not implemented", "This is not yet implemented, sorry!");
                            }, 200);
                        }
                    }]);

                    newCols = [];

                    // loop over the first data record to get full list of all columns from api
                    if (typeof Ext.data.StoreManager.lookup('npcsStore').data.items[0] != "undefined") {
                        records = Ext.data.StoreManager.lookup('npcsStore').data.items[0].data;
                        Ext.Object.each(records, function (key, obj) {
                            var defaultProperties = {
                                text: Util.ucwords(key.split('_').join(' ')),
                                dataIndex: key,
                                flex: 1,
                                align: 'center',
                                hidden: true
                            };

                            // if defaults object exists for this key in "columns" object, override values
                            defaultProperties = Util.grid.applyOverrides(Ext.getCmp("npcsGrid-ID"), key, visibleCols, defaultProperties, columns[key]);
                            
                            // push column onto stack
                            newCols.push(defaultProperties);
                        });
                    }

                    // re-order column according to "order" specified in original "columns" object
                    newCols = Util.grid.reorderColumns(newCols);

                    // push action column onto stack last
                    newCols.push(action);

                    AppConfig.loadedGems = [];
                    Ext.getCmp("npcsGrid-ID").reconfigure(undefined, newCols);
                    Ext.getCmp("npcsGrid-ID").unmask();
                }
            }
        }
    }
});
