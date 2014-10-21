Ext.define('peq.view.zones.MapViewer', {
    extend: 'Ext.window.Window',
    alias: 'widget.mapviewer',

    controller: 'mapviewer',

    id: 'map-viewer',
    title: 'Map Viewer',
    bodyPadding: 10,
    modal: true,
    floating: true,
    closable: true,
    resizable: false,
    movable: false,
    width: '100%',
    height: '100%',
    updater: false,
    updateTick: 0,

    initComponent: function(config) {
        this.callParent(config);
    },

    items: [{
        xtype: 'panel',
        html: '<div style="text-align: center;"><img id="map-object" src="" /></div>'
    }],

    listeners: {
        afterrender: 'onAfterRender'
    },
    buttons: [{
        text: 'View Original Size',
        listeners: {
            click: function() {
                var me = this.up('window');
                window.open('resources/maps/' + me.maps[0], '_blank');
            }
        }
    }]
});