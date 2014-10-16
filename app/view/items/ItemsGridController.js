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
    },

    renderBold: function (value) {
        return "<strong>" + value + "</strong>";
    },

    renderBoolean: function (value) {
        if (parseInt(value)) {
            return "Yes";
        } else {
            return "No";
        }
    },

    renderIcon: function (value) {
        return '<img src="' + value + '" width="40" height="40" />';
    },

    renderLucyLink: function (value) {
        return value + ' (<a href="http://lucy.allakhazam.com/item.html?id=' + value + '" target="_blank">Lucy</a>)';
    },

    onSearchItems: function (e) {
        var search = Ext.ComponentQuery.query("#itemsGrid-search")[0].inputEl.getValue();
        Ext.data.StoreManager.lookup('itemsStore').load({params: {token: Ext.state.Manager.get('token'), page: 1, query: search}});
    }
});
