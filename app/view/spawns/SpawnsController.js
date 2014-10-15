Ext.define('peq.view.spawns.SpawnsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.spawns',
    
    onAfterRender: function(e) {
        Util.attachResizeHandler(e, function() {
            e.setHeight(Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 36);
        });
    }
});
