Ext.define('peq.view.items.ItemsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.items',
    
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

        var panelContainer = Ext.ComponentQuery.query("#Items-PanelContainer")[0];
        if (typeof Ext.getCmp('itemsGrid-ID') == "undefined") {
            panelContainer.add(Ext.create('peq.view.items.ItemsGrid'));
        }
    }
});
