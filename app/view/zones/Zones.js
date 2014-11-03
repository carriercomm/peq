Ext.define('peq.view.zones.Zones', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.zones-panel',

    controller: 'zones',

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
                text: 'Browse Zones',
                style: {
                    height: '36px'
                },
                pressed: true
            }]
        }]
    }, {
        xtype: 'panel',
        itemId: 'Zones-PanelContainer',
        width: '100%',
        region: 'center',
        layout: 'fit',
        height: 5,
        listeners: {
            afterrender: 'onAfterRenderContentPanel'
        },
        items: []
    }]
});