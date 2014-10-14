Ext.define('peq.view.items.Items', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.items-panel',

    controller: 'items',

    layout: 'anchor',

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
                    height: '30px'
                },
                pressed: true
            }, {
                text: 'Create New Item',
                style: {
                    height: '30px'
                }
            }]
        }]
    }, {
        xtype: 'panel',
        itemId: 'Items-PanelContainer',
        width: '100%',
        region: 'center',
        items: []
    }]
});