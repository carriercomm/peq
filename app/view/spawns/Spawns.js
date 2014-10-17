Ext.define('peq.view.spawns.Spawns', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.spawns-panel',

    controller: 'spawns',

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
                text: 'Browse Spawnpoints',
                style: {
                    height: '36px'
                },
                pressed: true
            }]
        }]
    }, {
        xtype: 'panel',
        itemId: 'Spawns-PanelContainer',
        width: '100%',
        region: 'center',
        items: []
    }]
});