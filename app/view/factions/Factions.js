Ext.define('peq.view.factions.Factions', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.factions-panel',

    controller: 'factions',

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
                text: 'Browse Factions',
                style: {
                    height: '30px'
                },
                pressed: true
            }, {
                text: 'Browse Player Factions',
                style: {
                    height: '30px'
                }
            }, {
                text: 'Create New Faction',
                style: {
                    height: '30px'
                }
            }]
        }]
    }, {
        xtype: 'panel',
        itemId: 'Factions-PanelContainer',
        width: '100%',
        region: 'center',
        items: []
    }]
});