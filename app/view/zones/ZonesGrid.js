Ext.define('peq.view.zones.ZonesGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.zones-grid',

    controller: 'zonesgrid',
    viewModel: {
        type: 'zonesgrid'
    },

    id: 'zonesGrid-ID',

    viewConfig: {
        autoFit: true
    },
    listeners: {
        afterrender: 'onAfterRender'
    },
    bind: {
        store: '{zones}'
    },
    selModel: 'row',
    columns: {
        defaults: {
            hidden: true
        },
        items: []
    },
    dockedItems: [{
        xtype: 'pagingtoolbar',
        dock: 'top',
        reference: 'pagingtoolbartop',
        bind: {
            store: '{zones}'
        },
        listeners: {
            render: function (e) {
                var items = e.items;
                items.insert(0, Ext.create('Ext.toolbar.Fill'));
                items.add(Ext.create('Ext.toolbar.Fill'));
                items.add(Ext.create('Ext.form.field.Text', {
                    width: 250,
                    fieldLabel: 'Search',
                    labelWidth: 50,
                    itemId: 'zonesGrid-search',
                    enableKeyEvents: true,
                    listeners: {
                        render: function(e) {
                            e.inputEl.set({title: "Searches the Shortname or Longname field"})
                        },
                        specialKey: function(field, e) {
                            if (e.getKey() === e.ENTER) {
                                peq.app.getController('peq.view.zones.ZonesGridController').onSearchZones();
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
                            peq.app.getController('peq.view.zones.ZonesGridController').onSearchZones();
                        }
                    }
                }));
                items.add(Ext.create('Ext.toolbar.Fill'));
            }
        }
    }]
});