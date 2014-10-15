Ext.define('peq.view.items.ItemsGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.itemsgrid',

    onAfterRender: function(e) {
        Util.attachResizeHandler(e, function() {
            e.setHeight(Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 36);
        });
        Ext.data.StoreManager.lookup('itemsStore').load({params: {token: Ext.state.Manager.get('token'), page: 1}});
        this.lookupReference('pagingtoolbartop').setStore(this.getStore('items'));
    },

    onPagingToolbarChange: function (thiso, page, eOpts) {
        if (typeof page != "undefined") {
            Ext.data.StoreManager.lookup('itemsStore').getProxy().setExtraParam('page', page.currentPage);
        }
    }
});
