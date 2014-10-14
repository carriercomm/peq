Ext.define('peq.view.characters.Charactetrs', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.characters-panel',

    controller: 'characters',

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
                text: 'Browse Characters',
                style: {
                    height: '30px'
                },
                pressed: true
            }]
        }]
    }, {
        xtype: 'panel',
        itemId: 'Characters-PanelContainer',
        width: '100%',
        region: 'center',
        items: []
    }]
});