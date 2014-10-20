Ext.define('peq.view.items.ItemsGridModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.itemsgrid',
    
    stores: {
        items: {
            storeId: 'itemsStore',
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
            sorters: "Name",
            listeners: {
                beforeload: function(store, operation, opts) {
                    Ext.getCmp("itemsGrid-ID").mask("Loading Data...");
                    store.getProxy().setUrl(AppConfig.getApiEndpoint() + "/item/search");
                    store.getProxy().setExtraParam('token', Ext.state.Manager.get('token'));
                },
                load: function() {
                    var columns, visibleCols, defaultCols, newCols, action, records, container_found;
                    
                    // search for a container in the results, if found set flag
                    container_found = false;
                    records = Ext.data.StoreManager.lookup('itemsStore').data.items;
                    Ext.Object.each(records, function (key, obj) {
                        if (parseInt(obj.data.bagsize) > 0 && parseInt(obj.data.bagslots) > 0) {
                            container_found = true;
                            return;
                        }
                    });

                    columns = {
                        'icon': {
                            text: 'Icon',
                            width: 65,
                            sortable: false,
                            renderer: 'renderIcon',
                            order: 0
                        },
                        'id': {
                            text: 'ID',
                            align: 'left',
                            width: 110,
                            renderer: 'renderLucyLink',
                            order: 1
                        },
                        'Name': {
                            text: 'Name',
                            align: 'left',
                            flex: 3,
                            renderer: 'renderBold',
                            order: 2
                        },
                        'itemtype': {
                            text: 'Type',
                            renderer: 'renderItemType',
                            order: 3
                        },
                        'reqlevel': {
                            text: 'Req Level',
                            order: 4
                        },
                        'magic': {
                            text: 'Magic',
                            renderer: 'renderBoolean',
                            order: (container_found) ? 9 : 5
                        },
                        'nodrop': {
                            text: 'No-Drop',
                            renderer: 'renderBoolean',
                            order: (container_found) ? 10 : 6
                        },
                        'norent': {
                            text: 'No-Rent',
                            renderer: 'renderBoolean',
                            order: (container_found) ? 11 : 7
                        },
                        'artifact': {
                            text: 'Artifact',
                            renderer: 'renderBoolean',
                            order: (container_found) ? 12 : 8
                        },
                        'ac': {
                            text: 'Armor',
                            order: (container_found) ? 13 : 9
                        },
                        'damage': {
                            text: 'Damage',
                            order: (container_found) ? 14 : 10
                        },
                        'delay': {
                            text: 'Delay',
                            order: (container_found) ? 15 : 11
                        },
                        'range': {
                            text: 'Range',
                            order: (container_found) ? 16 : 12
                        },
                        'ldonsold': {
                            renderer: 'renderBoolean'
                        },
                        'tradeskills': {
                            renderer: 'renderBoolean'
                        },
                        'attuneable': {
                            renderer: 'renderBoolean'
                        },
                        'nopet': {
                            renderer: 'renderBoolean'
                        },
                        'potionbelt': {
                            renderer: 'renderBoolean'
                        },
                        'stackable': {
                            renderer: 'renderBoolean'
                        },
                        'expendablearrow': {
                            renderer: 'renderBoolean'
                        }
                    };

                    // if container found in results show bag related columns by default
                    if (container_found) {
                        visibleCols = ['icon', 'id', 'Name', 'itemtype', 'bagtype', 'bagsize', 'bagslots', 'bagwr', 'magic', 'nodrop', 'norent', 'artifactFlag', 'ac', 'damage', 'delay', 'range'];

                        columns['bagtype'] = {
                            text: 'Bag Type',
                            renderer: 'renderBagType',
                            order: 5
                        };

                        columns['bagsize'] = {
                            text: 'Bag Size',
                            renderer: 'renderBagSize',
                            order: 6
                        };

                        columns['bagslots'] = {
                            text: 'Bag Slots',
                            order: 7
                        };
                        
                        columns['bagwr'] = {
                            text: 'Bag WR',
                            renderer: 'renderPercent',
                            order: 8
                        };
                    } else {
                        visibleCols = ['icon', 'id', 'Name', 'itemtype', 'magic', 'nodrop', 'norent', 'artifactFlag', 'ac', 'damage', 'delay', 'range'];
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
                        text: "Delete",
                        handler: function (grid, rowIndex, colIndex) {
                            setTimeout(function() {
                                var row = Ext.getCmp("zonesGrid-ID").getSelectionModel().getSelection().shift().getData();
                                Ext.MessageBox.alert("Not implemented", "This is not yet implemented, sorry!");
                            }, 200);
                        }
                    }]);

                    newCols = [];

                    // loop over the first data record to get full list of all columns from api
                    if (typeof Ext.data.StoreManager.lookup('itemsStore').data.items[0] != "undefined") {
                        records = Ext.data.StoreManager.lookup('itemsStore').data.items[0].data;
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

                    Ext.getCmp("itemsGrid-ID").reconfigure(undefined, newCols);
                    Ext.getCmp("itemsGrid-ID").unmask();
                }
            }
        }
    }
});