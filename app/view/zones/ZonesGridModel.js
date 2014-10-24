Ext.define('peq.view.zones.ZonesGridModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.zonesgrid',
    
    stores: {
        zones: {
            storeId: 'zonesStore',
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
            sorters: "long_name",
            listeners: {
                beforeload: function(store, operation, opts) {
                    Ext.getCmp("zonesGrid-ID").mask("Loading Data...");
                    store.getProxy().setUrl(AppConfig.getApiEndpoint() + "/zone/search");
                    store.getProxy().setExtraParam('token', Ext.state.Manager.get('token'));
                },
                load: function() {
                    var columns, visibleCols, defaultCols, newCols, action, records;
                    
                    columns = {
                        'zoneidnumber': {
                            text: 'ID',
                            align: 'left',
                            width: 80,
                            order: 0
                        },
                        'long_name': {
                            text: 'Name',
                            align: 'left',
                            flex: 3,
                            renderer: 'renderName',
                            order: 1
                        },
                        'short_name': {
                            text: 'Short Name',
                            width: 120,
                            order: 2
                        },
                        'min_level': {
                            text: 'Min Level',
                            order: 3
                        },
                        'min_status': {
                            text: 'Min Status',
                            order: 4
                        },
                        'ztype': {
                            text: 'Type',
                            renderer: 'renderZType',
                            order: 5
                        },
                        'safe_x': {
                            text: 'Safe X',
                            order: 6
                        },
                        'safe_y': {
                            text: 'Safe Y',
                            order: 7
                        },
                        'safe_z': {
                            text: 'Safe Z',
                            order: 8
                        },
                        'walkspeed': {
                            text: 'Walk Speed',
                            order: 9
                        },
                        'zone_exp_multiplier': {
                            text: 'Exp Bonus',
                            order: 10
                        },
                        'castoutdoor': {
                            text: 'Caast Outdoor Spells',
                            renderer: 'renderBoolean',
                            order: 11
                        },
                        'cancombat': {
                            text: 'Combat Allowed',
                            renderer: 'renderBoolean',
                            order: 12
                        },
                        'canbind': {
                            text: 'Can Bind',
                            renderer: 'renderBoolean',
                            order: 13
                        },
                        'canlevitate': {
                            text: 'Can Levitate',
                            renderer: 'renderBoolean',
                            order: 14
                        },
                        'suspendbuffs': {
                            text: 'Suspend Buffs',
                            renderer: 'renderBoolean',
                            order: 15
                        }
                    };

                    if (AppConfig.isSmallerScreen()) {
                        visibleCols = ['zoneidnumber', 'long_name', 'short_name', 'min_level', 'min_status', 'ztype', 'safe_x', 'safe_y', 'safe_z', 'walkspeed', 'zone_exp_multiplier'];
                    } else {
                        visibleCols = ['zoneidnumber', 'long_name', 'short_name', 'min_level', 'min_status', 'ztype', 'safe_x', 'safe_y', 'safe_z', 'walkspeed', 'zone_exp_multiplier', 'castoutdoor', 'cancombat', 'canbind', 'canlevitate', 'suspendbuffs'];
                    }

                    action = Util.grid.createActionColumn([{
                        text: "Edit",
                        handler: function (grid, rowIndex, colIndex) {
                            setTimeout(function() {
                                var row = Ext.getCmp("zonesGrid-ID").getSelectionModel().getSelection().shift().getData();
                                Ext.MessageBox.alert("Not implemented", "This is not yet implemented, sorry!");
                            }, 200);
                        }
                    }, {
                        text: "Copy",
                        handler: function (grid, rowIndex, colIndex) {
                            setTimeout(function() {
                                var row = Ext.getCmp("zonesGrid-ID").getSelectionModel().getSelection().shift().getData();
                                Ext.MessageBox.alert("Not implemented", "This is not yet implemented, sorry!");
                            }, 200);
                        }
                    }, {
                        text: "Zone Connections",
                        handler: function (grid, rowIndex, colIndex) {
                            setTimeout(function() {
                                var row = Ext.getCmp("zonesGrid-ID").getSelectionModel().getSelection().shift().getData();
                                Ext.MessageBox.alert("Not implemented", "This is not yet implemented, sorry!");
                            }, 200);
                        }
                    }, {
                        text: "Graveyards",
                        handler: function (grid, rowIndex, colIndex) {
                            setTimeout(function() {
                                var row = Ext.getCmp("zonesGrid-ID").getSelectionModel().getSelection().shift().getData();
                                Ext.MessageBox.alert("Not implemented", "This is not yet implemented, sorry!");
                            }, 200);
                        }
                    }, {
                        text: "Blocked Spells",
                        handler: function (grid, rowIndex, colIndex) {
                            setTimeout(function() {
                                var row = Ext.getCmp("zonesGrid-ID").getSelectionModel().getSelection().shift().getData();
                                Ext.MessageBox.alert("Not implemented", "This is not yet implemented, sorry!");
                            }, 200);
                        }
                    }]);

                    newCols = [];

                    // loop over the first data record to get full list of all columns from api
                    if (typeof Ext.data.StoreManager.lookup('zonesStore').data.items[0] != "undefined") {
                        records = Ext.data.StoreManager.lookup('zonesStore').data.items[0].data;
                        Ext.Object.each(records, function (key, obj) {
                            var defaultProperties = {
                                text: Util.ucwords(key.split('_').join(' ')),
                                dataIndex: key,
                                flex: 1,
                                align: 'center',
                                hidden: true
                            };

                            // if defaults object exists for this key in "columns" object, override values
                            defaultProperties = Util.grid.applyOverrides(Ext.getCmp("zonesGrid-ID"), key, visibleCols, defaultProperties, columns[key]);
                            
                            // push column onto stack
                            newCols.push(defaultProperties);
                        });
                    }

                    // re-order column according to "order" specified in original "columns" object
                    newCols = Util.grid.reorderColumns(newCols);

                    // push action column onto stack last
                    newCols.push(action);

                    Ext.getCmp("zonesGrid-ID").reconfigure(undefined, newCols);
                    Ext.getCmp("zonesGrid-ID").unmask();
                }
            }
        }
    }
});
