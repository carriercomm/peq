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

    tbarObject: {
        xtype: 'toolbar',
        dock: 'top',
        height: 35,
        listeners: {
            render: function (e) {
                var items = e.items;
                var me = this.up('window');
                
                items.insert(0, Ext.create('Ext.button.Button', {
                    id: 'mapviewer-prev',
                    glyph: 0xf104,
                    baseCls: '',
                    text: 'Previous',
                    hidden: true,
                    handler: function(e) {
                        me.page--;
                        Ext.get("map-object").set({"src": 'resources/maps/' + me.maps[me.page - 1]});
                        if (me.page > 1) {
                            Ext.getCmp('mapviewer-prev').show();
                        } else {
                            Ext.getCmp('mapviewer-prev').hide();
                        }

                        if (me.page != me.maps.length) {
                            Ext.getCmp('mapviewer-next').show();
                        } else {
                            Ext.getCmp('mapviewer-next').hide();
                        }
                    },
                    listeners: {
                        render: function(e) {
                            Ext.get(e.id + '-btnIconEl').setStyle({
                                color: "#000000",
                                cursor: "pointer",
                                fontSize: '26px',
                                fontWeight: 'bold'
                            });
                            Ext.get(e.id + '-btnInnerEl').setStyle({
                                color: "#000000",
                                cursor: "pointer",
                                opacity: 0.5,
                                fontWeight: 'bold'
                            });
                        }
                    }
                }));
                
                items.add(Ext.create('Ext.toolbar.Fill'));
                items.add(Ext.create('Ext.button.Button', {
                    id: 'mapviewer-next',
                    glyph: 0xf105,
                    baseCls: '',
                    text: 'Next',
                    iconAlign: 'right',
                    hidden: true,
                    handler: function(e) {
                        me.page++;
                        Ext.get("map-object").set({"src": 'resources/maps/' + me.maps[me.page - 1]});
                        if (me.page > 1) {
                            Ext.getCmp('mapviewer-prev').show();
                        } else {
                            Ext.getCmp('mapviewer-prev').hide();
                        }

                        if (me.page != me.maps.length) {
                            Ext.getCmp('mapviewer-next').show();
                        } else {
                            Ext.getCmp('mapviewer-next').hide();
                        }
                    },
                    listeners: {
                        render: function(e) {
                            Ext.get(e.id + '-btnIconEl').setStyle({
                                color: "#000000",
                                cursor: "pointer",
                                fontSize: '26px',
                                fontWeight: 'bold'
                            });
                            Ext.get(e.id + '-btnInnerEl').setStyle({
                                color: "#000000",
                                cursor: "pointer",
                                opacity: 0.5,
                                fontWeight: 'bold'
                            });
                        }
                    }
                }));
                

                if (me.page > 1) {
                    Ext.getCmp('mapviewer-prev').show();
                }

                if (me.page != me.maps.length) {
                    Ext.getCmp('mapviewer-next').show();
                }
            }
        }
    },

    items: [{
        xtype: 'panel',
        html: '<div style="text-align: center;"><img id="map-object" src="" /></div>'
    }],

    listeners: {
        afterrender: function(e) {
            Ext.get("map-object").set({"src": 'resources/maps/' + this.maps[0]});
            
            if (this.multiple) {
                e.addDocked(this.tbarObject);
            }

            // set updater interval to continually resize as the image loads
            this.updater = setInterval(function() {
                var newWidth, newHeight, currentWidth, currentHeight, browserWidth, browserHeight, ratio;
                
                if (typeof Ext.getCmp("map-viewer") != "undefined") {
                    currentWidth = Ext.get("map-object").getWidth();
                    currentHeight = Ext.get("map-object").getHeight();
                    newWidth =  currentWidth + 30;
                    newHeight = currentHeight + 100;
                    browserWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
                    browserHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

                    // resize image based on browser window dimensions
                    if (newWidth > browserWidth || newHeight > browserHeight) {
                        if (newWidth > browserWidth) {
                            Ext.get("map-object").setStyle('max-width', (browserWidth - 30) + 'px');
                            newWidth = browserWidth;
                            ratio = browserWidth / currentWidth;
                            newHeight = currentHeight * ratio;
                        } else {
                            Ext.get("map-object").setStyle('max-height', (browserHeight - 100) + 'px');
                            newHeight = browserHeight;
                            ratio = browserHeight / currentHeight;
                            newWidth = currentWidth * ratio;
                        }
                    }

                    Ext.getCmp("map-viewer").setWidth(newWidth).center();
                    Ext.getCmp("map-viewer").setHeight(newHeight).center();
                } else {
                    // window has been closed, cancel updater and reset tick count
                    this.updateTick = 0;
                    clearInterval(this.updater);
                }

                // after 10 ticks, cancel updater and reset tick count
                if (this.updateTick >= 10) {
                    this.updateTick = 0;
                    clearInterval(this.updater);
                }
                this.updateTick++;
            }, 100);
        }
    },
    buttons: [{
        text: 'View Original Size',
        listeners: {
            click: function() {
                
            }
        }
    }]
});