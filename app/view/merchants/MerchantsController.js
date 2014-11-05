Ext.define('peq.view.merchants.MerchantsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.merchants',
    
    onAfterRender: function(e) {
        Util.attachResizeHandler(e, function() {
            e.setHeight(Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 42);
        });
    },

    onAfterRenderContentPanel: function(e) {
        Util.attachResizeHandler(e, function() {
            e.setHeight(Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 42);
            e.setWidth(Math.max(document.documentElement.clientWidth, window.innerWidth || 0) - 150);
        });

        var panelContainer = Ext.ComponentQuery.query("#Merchants-PanelContainer")[0];
        if (typeof Ext.getCmp('merchantsGrid-ID') == "undefined") {
            panelContainer.add(Ext.create('peq.view.merchants.MerchantsGrid'));
        }
    }
});
