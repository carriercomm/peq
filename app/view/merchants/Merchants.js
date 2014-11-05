Ext.define('peq.view.merchants.Merchants', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.merchants-panel',

    controller: 'merchants',

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
                text: 'Browse Merchants',
                style: {
                    height: '36px'
                },
                pressed: true
            }]
        }]
    }, {
        xtype: 'panel',
        itemId: 'Merchants-PanelContainer',
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