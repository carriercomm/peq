Ext.define('peq.view.npcs.NpcsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.npcs',
    
    onAfterRender: function(e) {
        Util.attachResizeHandler(e, function() {
            e.setHeight(Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 5);
        });
    }
});
