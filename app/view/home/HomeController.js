Ext.define('peq.view.home.HomeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.home',
    
    onAfterRender: function(e) {
        Util.attachResizeHandler(e, function() {
            e.setHeight(Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 5);
        });
    }
});
