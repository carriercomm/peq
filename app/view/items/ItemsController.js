Ext.define('peq.view.items.ItemsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.items',
    
    onAfterRender: function(e) {
        Util.attachResizeHandler(e, function() {
            e.setHeight(Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 36);
        });
    }
});
