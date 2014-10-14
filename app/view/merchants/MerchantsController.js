Ext.define('peq.view.merchants.MerchantsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.merchants',
    
    onAfterRender: function(e) {
        Util.attachResizeHandler(e, function() {
            e.setHeight(Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 5);
        });
    }
});
