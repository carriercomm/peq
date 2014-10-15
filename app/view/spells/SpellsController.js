Ext.define('peq.view.spells.SpellsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.spells',
    
    onAfterRender: function(e) {
        Util.attachResizeHandler(e, function() {
            e.setHeight(Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 36);
        });
    }
});
