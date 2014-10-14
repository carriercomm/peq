Ext.define('peq.view.spells.Spells', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.spells-panel',

    controller: 'spells',

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
                text: 'Browse Spells',
                style: {
                    height: '30px'
                },
                pressed: true
            }, {
                text: 'Browse Spell Sets',
                style: {
                    height: '30px'
                }
            }]
        }, {
            xtype: 'button',
            text: 'Actions',
            style: {
                height: '30px',
                width: '100%'
            },
            menu: [{
                text: 'Generate spells_us.txt'
            }]
        }]
    }, {
        xtype: 'panel',
        itemId: 'Spells-PanelContainer',
        width: '100%',
        region: 'center',
        items: []
    }]
});