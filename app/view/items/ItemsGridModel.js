Ext.define('peq.view.items.ItemsGridModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.itemsgrid',
    
    stores: {
        items: {
            storeId: 'itemsStore',
            autoLoad: false,
            remoteSort: false,
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
            sorters: "field",
            listeners: {
                beforeload: function(store, operation, opts) {
                    Ext.getCmp("itemsGrid-ID").mask("Loading Data...");
                    store.getProxy().setUrl(AppConfig.getApiEndpoint() + "/item/search");
                    store.getProxy().setExtraParam('token', Ext.state.Manager.get('token'));
                },
                load: function() {
                    var ignore, defaultCols, newCols, action, records, container, container_found;
                    
                    // columns to ignore when populating remaining columns (default columns)
                    ignore = ['iconUrl', 'id', 'Name', 'typeName', 'container', 'magic', 'nodrop', 'norent', 'artifactFlag', 'ac', 'damage', 'delay', 'range'];
                    
                    // search for a container in the results, if found set flag
                    container_found = false;
                    records = Ext.data.StoreManager.lookup('itemsStore').data.items;
                    Ext.Object.each(records, function (key, obj) {
                        if (parseInt(obj.data.bagsize) > 0 && parseInt(obj.data.bagslots) > 0) {
                            container_found = true;
                            return;
                        }
                    });

                    defaultCols = [{
                        text: 'Icon', dataIndex: 'iconUrl', width: 65, hidden: false, renderer: 'renderIcon'
                    }, {
                        text: 'ID', dataIndex: 'id', width: 115, align: 'center', hidden: false, renderer: 'renderLucyLink'
                    }, {
                        text: 'Name', dataIndex: 'Name', flex: 3, hidden: false, renderer: 'renderBold'
                    }, {
                        text: 'Type', dataIndex: 'typeName', flex: 1, align: 'center', hidden: false
                    }];

                    // if container found in results show bag related columns by default
                    if (container_found) {
                        ignore.push('bagsize');
                        ignore.push('bagslots');
                        ignore.push('bagTypeName');
                        ignore.push('bagwr');
                        defaultCols.push({
                            text: 'Container', dataIndex: 'container', flex: 1, align: 'center', hidden: false, renderer: 'renderBoolean'
                        });
                        defaultCols.push({
                            text: 'Bag Type', dataIndex: 'bagTypeName', flex: 1, align: 'center', hidden: false
                        });
                        defaultCols.push({
                            text: 'Bag Size', dataIndex: 'bagsize', flex: 1, align: 'center', hidden: false, renderer: 'renderBagSize'
                        });
                        defaultCols.push({
                            text: 'Bag Slots', dataIndex: 'bagslots', flex: 1, align: 'center', hidden: false
                        });
                        defaultCols.push({
                            text: 'Bag WR', dataIndex: 'bagwr', flex: 1, align: 'center', hidden: false, renderer: 'renderPercent'
                        });
                    } else {
                        defaultCols.push({
                            text: 'Container', dataIndex: 'container', flex: 1, align: 'center', hidden: false, renderer: 'renderBoolean'
                        });
                    }

                    defaultCols.push({
                        text: 'Magic', dataIndex: 'magic', flex: 1, align: 'center', hidden: false, renderer: 'renderBoolean'
                    });
                    defaultCols.push({
                        text: 'No-Drop', dataIndex: 'nodrop', flex: 1, align: 'center', hidden: false, renderer: 'renderBoolean'
                    });
                    defaultCols.push({
                        text: 'No-Rent', dataIndex: 'norent', flex: 1, align: 'center', hidden: false, renderer: 'renderBoolean'
                    });
                    defaultCols.push({
                        text: 'Artifact', dataIndex: 'artifactflag', flex: 1, align: 'center', hidden: false, renderer: 'renderBoolean'
                    });
                    defaultCols.push({
                        text: 'Armor', dataIndex: 'ac', flex: 1, align: 'center', hidden: false
                    });
                    defaultCols.push({
                        text: 'Damage', dataIndex: 'damage', flex: 1, align: 'center', hidden: false
                    });
                    defaultCols.push({
                        text: 'Delay', dataIndex: 'delay', flex: 1, align: 'center', hidden: false
                    });
                    defaultCols.push({
                        text: 'Range', dataIndex: 'range', flex: 1, align: 'center', hidden: false
                    });

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
                                text: Util.ucwords(key), dataIndex: key, flex: 1, hidden: true
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
