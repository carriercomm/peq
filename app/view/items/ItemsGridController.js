Ext.define('peq.view.items.ItemsGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.itemsgrid',

    onAfterRender: function(e) {
        Util.attachResizeHandler(e, function() {
            e.setHeight(Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 36);
        });
        this.lookupReference('pagingtoolbartop').setStore(this.getStore('items'));
        Ext.data.StoreManager.lookup('itemsStore').load({params: {token: Ext.state.Manager.get('token'), page: 1}});
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

    renderPercent: function (value) {
        return value + "%";
    },

    renderIcon: function (value) {
        return '<img src="resources/icons/item_' + value + '.png" width="40" height="40" />';
    },

    renderLucyLink: function (value) {
        return value + ' (<a href="http://lucy.allakhazam.com/item.html?id=' + value + '" target="_blank">Lucy</a>)';
    },

    renderBagType: function (value) {
        if (typeof StaticData.bagtypes[value] != "undefined") {
            return StaticData.bagtypes[value];
        } else {
            return StaticData.worldcontainers[value];
        }
    },

    renderBagSize: function (value) {
        switch (value) {
            case "0":
                return "Non-Bag";
            case "1":
                return "Small";
            case "2":
                return "Medium";
            case "3":
                return "Large";
            case "4":
                return "Giant";
            case "5":
                return "Giant - Assembly Kit";
        }
    },

    renderItemType: function (value, metaData, record) {
        value = parseInt(value);
        if (parseInt(value) == 0) {
            if (parseInt(record.data.damage) < 1) {
                return "Misc";
            } else {
                return StaticData.itemtypes[value];
            }
        } else {
            return StaticData.itemtypes[value];
        }
    },

    onSearchItems: function (e) {
        var search = Ext.ComponentQuery.query("#itemsGrid-search")[0].inputEl.getValue();
        Ext.data.StoreManager.lookup('itemsStore').getProxy().setExtraParam('query', search);
        Ext.getCmp("itemsGrid-ID").lookupReference('pagingtoolbartop').moveFirst();
        Ext.data.StoreManager.lookup('itemsStore').load({params: {page: 1}});
    }
});
