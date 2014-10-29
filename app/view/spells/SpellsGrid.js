Ext.define('peq.view.spells.SpellsGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.spells-grid',

    controller: 'spellsgrid',
    viewModel: {
        type: 'spellsgrid'
    },

    id: 'spellsGrid-ID',

    viewConfig: {
        autoFit: true
    },
    listeners: {
        afterrender: 'onAfterRender',
        columnshow: 'onColumnShow',
        columnhide: 'onColumnHide'
    },
    bind: {
        store: '{spells}'
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
            store: '{spells}'
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
                    itemId: 'spellsGrid-search',
                    enableKeyEvents: true,
                    listeners: {
                        render: function(e) {
                            e.inputEl.set({title: "Searches the ID or Name field"})
                        },
                        specialKey: function(field, e) {
                            if (e.getKey() === e.ENTER) {
                                peq.app.getController('peq.view.spells.SpellsGridController').onSearchSpells();
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
                            peq.app.getController('peq.view.spells.SpellsGridController').onSearchSpells();
                        }
                    }
                }));
                items.add(Ext.create('Ext.toolbar.TextItem', {
                    text: ' or '
                }));
                items.add(Ext.create('Ext.button.Button', {
                    text: 'Add Filter',
                    handler: function() {
                        peq.app.getController('peq.view.spells.SpellsGridController').onAddFilter();
                    }
                }));
                items.add(Ext.create('Ext.toolbar.Fill'));
            }
        }
    }]
});