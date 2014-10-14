Ext.define('peq.view.characters.CharactersController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.characters',
    
    onAfterRender: function(e) {
        Util.attachResizeHandler(e, function() {
            e.setHeight(Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 5);
        });
    }
});
