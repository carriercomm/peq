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
                    var ignore, defaultCols, newCols, action, records;
                    
                    // columns to ignore when populating remaining columns (default columns)
                    ignore = ['id', 'long_name', 'short_name', 'min_level', 'min_status', 'walkspeed', 'zone_exp_multiplier', 'castoutdoor', 'cancombat', 'canbind', 'canlevitate', 'suspendbuffs'];

                    defaultCols = [{
                        text: 'ID', dataIndex: 'id', width: 115, align: 'center', hidden: false
                    }, {
                        text: 'Name', dataIndex: 'long_name', flex: 3, hidden: false, renderer: 'renderBold'
                    }, {
                        text: 'Short Name', dataIndex: 'short_name', flex: 1, align: 'center', hidden: false
                    }, {
                        text: 'Min Level', dataIndex: 'min_level', flex: 1, align: 'center', hidden: false
                    }, {
                        text: 'Min Status', dataIndex: 'min_status', flex: 1, align: 'center', hidden: false
                    }, {
                        text: 'Walk Speed', dataIndex: 'walkspeed', flex: 1, align: 'center', hidden: false
                    }, {
                        text: 'Exp Bonus', dataIndex: 'zone_exp_multiplier', flex: 1, align: 'center', hidden: false
                    }, {
                        text: 'Outdoor', dataIndex: 'castoutdoor', flex: 1, align: 'center', hidden: false, renderer: "renderBoolean"
                    }, {
                        text: 'Combat Allowed', dataIndex: 'cancombat', flex: 1, align: 'center', hidden: false, renderer: "renderBoolean"
                    }, {
                        text: 'Can Bind', dataIndex: 'canbind', flex: 1, align: 'center', hidden: false, renderer: "renderBoolean"
                    }, {
                        text: 'Can Levitate', dataIndex: 'canlevitate', flex: 1, align: 'center', hidden: false, renderer: "renderBoolean"
                    }, {
                        text: 'Suspend Buffs', dataIndex: 'suspendbuffs', flex: 1, align: 'center', hidden: false, renderer: "renderBoolean"
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
                    if (typeof Ext.data.StoreManager.lookup('zonesStore').data.items[0] != "undefined") {
                        records = Ext.data.StoreManager.lookup('zonesStore').data.items[0].data;
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

                    Ext.getCmp("zonesGrid-ID").reconfigure(undefined, newCols);
                    Ext.getCmp("zonesGrid-ID").unmask();  
                }
            }
        }
    }
});
