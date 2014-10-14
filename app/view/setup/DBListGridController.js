Ext.define('peq.view.setup.DBListGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dblistgrid',

    onAfterRender: function(e) {
        /*Util.attachResizeHandler(e, function() {
            e.setHeight(Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 292);
        });*/
        Ext.data.StoreManager.lookup('dbListStore').load({params: {tokens: Ext.state.Manager.get('tokens').join(",")}});
        /*this.lookupReference('pagingtoolbartop').setStore(this.getStore('clientHistory'));*/
    }/*,

    onPagingToolbarChange: function (thiso, page, eOpts) {
        if (typeof page != "undefined") {
            Ext.data.StoreManager.lookup('clientHistoryStore').getProxy().setExtraParam('page', page.currentPage);
        }
    }*/
});
