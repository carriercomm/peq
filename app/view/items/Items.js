Ext.define('peq.view.items.Items', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.items-panel',

    controller: 'items',

    layout: 'hbox',

    listeners: {
        afterrender: 'onAfterRender'
    },

    items: [{
        xtype: 'panel',
        width: 150,
        listeners: {
            afterrender: 'onAfterRender'
        },
        bodyStyle: {
            backgroundColor: '#240B3B'
        },
        items: [{
            xtype: 'segmentedbutton',
            vertical: true,
            style: {
                width: '100%'
            },
            items: [{
                text: 'Browse Items',
                style: {
                    height: '36px'
                },
                pressed: true
            }]
        }, {
            xtype: 'button',
            text: 'Actions',
            style: {
                height: '36px',
                width: '100%'
            },
            menu: [{
                text: 'Create New Item'
            }]
        }]
    }, {
        xtype: 'panel',
        itemId: 'Items-PanelContainer',
        width: '100%',
        region: 'center',
        layout: 'fit',
        height: 5,
        listeners: {
            afterrender: 'onAfterRenderContentPanel'
        },
        items: [{
            xtype: 'items-grid'
        }]
    }]
});