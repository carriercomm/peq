/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('peq.view.main.Main', {
    extend: 'Ext.container.Viewport',

    xtype: 'app-main',

    requires: [
        'peq.view.main.MainController',
        'peq.view.main.MainModel'
    ],
    
    controller: 'main',
    viewModel: {
        type: 'main'
    },

    layout: {
        type: 'border'
    },

    listeners: {
        afterrender: "onAfterRender"
    },

    id: 'MainPanel',

    items: [{
        xtype: 'panel',
        region: 'center',
        width: '100%',
        items: [{
            xtype: 'panel',
            //height: 225,
            height: 5,
            baseCls: Ext.baseCSSPrefix + 'tab-bar',
            style: {
                //backgroundImage: 'url(resources/eq_bg1.jpg)',
                backgroundPosition: '0% 52%',
                backgroundSize: 'cover',
                color: '#ffffff'
            }//,
            //html: '<div style="background-image: url(resources/logo.png); background-size: contain; color: #ffffff; height: 225px; width: 635px;"></div>'
        }, {
            xtype: 'panel',
            layout: 'fit',
            items: [{
                xtype: 'tabpanel',
                items: [{
                    glyph: 0xf015,
                    title: 'Home',
                    items: [{
                        xtype: 'home-panel'
                    }]
                }, {
                    glyph: 0xf0c0,
                    title: 'Characters',
                    items: [{
                        xtype: 'characters-panel'
                    }]
                }, {
                    glyph: 0xf1e2,
                    title: 'Items',
                    items: [{
                        xtype: 'items-panel'
                    }]
                }, {
                    glyph: 0xf0ac,
                    title: 'Zones',
                    items: [{
                        xtype: 'zones-panel'
                    }]
                }, {
                    glyph: 0xf0e7,
                    title: 'Spells',
                    items: [{
                        xtype: 'spells-panel'
                    }]
                }, {
                    glyph: 0xf183,
                    title: 'Npcs',
                    items: [{
                        xtype: 'npcs-panel'
                    }]
                }, {
                    glyph: 0xf155,
                    title: 'Merchants',
                    items: [{
                        xtype: 'merchants-panel'
                    }]
                }, {
                    glyph: 0xf1b3,
                    title: 'Spawns',
                    items: [{
                        xtype: 'spawns-panel'
                    }]
                }, {
                    glyph: 0xf024,
                    title: 'Factions',
                    items: [{
                        xtype: 'factions-panel'
                    }]
                }]
            }]
        }]
    }]
});
