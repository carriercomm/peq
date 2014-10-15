Ext.define('peq.view.items.ItemsGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.items-grid',

    controller: 'itemsgrid',
    viewModel: {
        type: 'itemsgrid'
    },

    id: 'itemsGrid-ID',

    viewConfig: {
        autoFit: true
    },
    listeners: {
        afterrender: 'onAfterRender'
    },
    bind: {
        store: '{items}'
    },
    selModel: 'row',
    columns: {
        defaults: {
            hidden: true
        },
        items: [{
            text: 'ID', dataIndex: 'id', flex: 1, hidden: false
        }, {
            text: 'Name', dataIndex: 'Name', flex: 1, hidden: false
        }/*, {
            renderer: function(value) {
                var id = Ext.id();
                setTimeout(function() {
                    var button = Ext.create('Ext.button.Button', {
                        glyph: 0xf1f8,
                        text: "Remove",
                        handler: function (grid, rowIndex, colIndex) {
                            setTimeout(function() {
                                var row = Ext.getCmp("dbListGrid-ID").getSelectionModel().getSelection().shift().getData();
                                var tokens = Ext.state.Manager.get('tokens');

                                Ext.MessageBox.confirm("Delete Database Connection", 'Are you sure you wish to remove this database connection?', function(selection) {
                                    if (selection == 'yes') {
                                        Ext.Array.remove(tokens, row.token);
                                        Ext.state.Manager.set('tokens', tokens);
                                        Ext.data.StoreManager.lookup('dbListStore').load({params: {tokens: Ext.state.Manager.get('tokens').join(",")}});
                                    }
                                });
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
        }*/]
    },
    dockedItems: [{
        xtype: 'pagingtoolbar',
        dock: 'top',
        reference: 'pagingtoolbartop',
        bind: {
            store: '{items}'
        },
        listeners: {
            change: 'onPagingToolbarChange',
            render: function (e) {
                var items = e.items;
                items.insert(0, Ext.create('Ext.toolbar.Fill'));
                items.add(Ext.create('Ext.toolbar.Fill'));
                items.add(Ext.create('Ext.form.field.Text', {
                    width: 250,
                    fieldLabel: 'Search',
                    labelWidth: 50,
                    itemId: 'userBrowseGrid-search',
                    enableKeyEvents: true,
                    listeners: {
                        render: function(e) {
                            e.inputEl.set({title: "Searches the Login and Name fields"})
                        },
                        specialKey: function(field, e) {
                            if (e.getKey() === e.ENTER) {
                                //extDM.app.getController('extDM.view.user.UserBrowseGridController').onSearchUsers();
                            }
                        }
                    }
                }));
                items.add(Ext.create('Ext.button.Button', {
                    glyph: 0xf002,
                    baseCls: '',
                    listeners: {
                        render: function(e) {
                            Ext.get(e.id + '-btnIconEl').setStyle({
                                color: "#000000",
                                cursor: "pointer"
                            });
                        },
                        click: function(e) {
                            //extDM.app.getController('extDM.view.user.UserBrowseGridController').onSearchUsers();
                        }
                    }
                }));
                items.add(Ext.create('Ext.toolbar.Fill'));
            }
        }
    }]
});