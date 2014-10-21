Ext.define('peq.view.spells.SpellsetsGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.spellsetsgrid',

    onAfterRender: function(e) {
        Util.attachResizeHandler(e, function() {
            e.setHeight(Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 36);
        });
        this.lookupReference('pagingtoolbartop').setStore(this.getStore('spellsets'));
        Ext.data.StoreManager.lookup('spellsetsStore').load({params: {token: Ext.state.Manager.get('token'), page: 1}});
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

    renderSpells: function (value) {
        if (value.length < 1) {
            return "None";
        } else {
            return value;
        }
    },

    onSearchSpellsets: function (e) {
        var search = Ext.ComponentQuery.query("#spellsetsGrid-search")[0].inputEl.getValue();
        Ext.data.StoreManager.lookup('spellsetsStore').getProxy().setExtraParam('query', search);
        Ext.getCmp("spellsetsGrid-ID").lookupReference('pagingtoolbartop').moveFirst();
        Ext.data.StoreManager.lookup('spellsetsStore').load({params: {page: 1}});
    }
});
