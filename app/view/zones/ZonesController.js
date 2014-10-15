Ext.define('peq.view.zones.ZonesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.zones',
    
    onAfterRender: function(e) {
        Util.attachResizeHandler(e, function() {
            e.setHeight(Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 36);
        });
    }
});
