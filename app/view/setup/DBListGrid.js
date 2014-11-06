Ext.define('peq.view.setup.DBListGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.dblist-grid',

    controller: 'dblistgrid',
    viewModel: {
        type: 'dblistgrid'
    },

    id: 'dbListGrid-ID',

    viewConfig: {
        autoFit: true
    },
    listeners: {
        afterrender: 'onAfterRender'
    },
    bind: {
        store: '{dbList}'
    },
    selModel: 'row',
    columns: {
        defaults: {
            hidden: true
        },
        items: [{
            text: 'Server', dataIndex: 'server', flex: 1, hidden: false
        }, {
            text: 'Username', dataIndex: 'username', flex: 1, hidden: false
        }, {
            text: 'Database', dataIndex: 'database', flex: 1, hidden: false
        }, {
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
                                        if (tokens.length < 1) {
                                            Ext.state.Manager.set('token', null);
                                            Ext.state.Manager.set('tokens', null);
                                            Ext.state.Manager.set('authenticated', null);
                                            Ext.state.Manager.set('admin', null);
                                            window.location.href = AppConfig.getAppUrl();
                                        } else {
                                            Ext.data.StoreManager.lookup('dbListStore').load({params: {tokens: Ext.state.Manager.get('tokens').join(",")}});
                                        }
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
        }]
    }
});