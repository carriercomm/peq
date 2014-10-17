Ext.define('peq.view.zones.ZonesGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.zonesgrid',

    onAfterRender: function(e) {
        Util.attachResizeHandler(e, function() {
            e.setHeight(Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 36);
        });
        this.lookupReference('pagingtoolbartop').setStore(this.getStore('zones'));
        Ext.data.StoreManager.lookup('zonesStore').load({params: {token: Ext.state.Manager.get('token'), page: 1}});
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

    onSearchZones: function (e) {
        var search = Ext.ComponentQuery.query("#zonesGrid-search")[0].inputEl.getValue();
        Ext.data.StoreManager.lookup('zonesStore').getProxy().setExtraParam('query', search);
        Ext.getCmp("zonesGrid-ID").lookupReference('pagingtoolbartop').moveFirst();
        Ext.data.StoreManager.lookup('zonesStore').load({params: {page: 1}});
    }
});
