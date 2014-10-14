Ext.define('peq.view.setup.DBList', {
    extend: 'Ext.window.Window',
    
    requires: [
        'peq.view.setup.DBListController',
        'peq.view.setup.DBListGrid',
        'Ext.form.Panel',
        'Ext.button.Button',
        'Ext.form.field.Text'
    ],
    
    controller: 'dblist',

    bodyPadding: 10,
    title: 'Available Database Connections',
    closable: false,
    draggable: false,
    resizable: false,
    id: 'dblistWindow-ID',
    glyph: 0xf1c0,
    width: 600,
    height: 250,
    layout: 'fit',
    
    listeners: {
        afterrender: 'onAfterRender'
    },

    items: [{
        xtype: 'dblist-grid'
    }],

    buttons: [{
        text: 'Add New',
        listeners: {
            click: 'onAddClick'
        }
    }, {
        text: 'Select Database',
        listeners: {
            click: 'onSelectClick'
        }
    }]
});
