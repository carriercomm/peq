Ext.define('peq.view.factions.FactionsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.factions',
    
    onAfterRender: function(e) {
        Util.attachResizeHandler(e, function() {
            e.setHeight(Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 36);
        });
    }
});
