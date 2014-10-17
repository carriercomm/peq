Ext.define('peq.view.spells.SpellsGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.spellsgrid',

    onAfterRender: function(e) {
        Util.attachResizeHandler(e, function() {
            e.setHeight(Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 36);
        });
        this.lookupReference('pagingtoolbartop').setStore(this.getStore('spells'));
        Ext.data.StoreManager.lookup('spellsStore').load({params: {token: Ext.state.Manager.get('token'), page: 1}});
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

    renderIcon: function (value, metaData, record) {
        if (parseInt(record.data.goodEffect) == 0) {
            return '<img src="resources/icons/gem_' + value + 'd.png" width="26" height="26" />';
        } else if (parseInt(record.data.goodEffect) == 1 || parseInt(record.data.goodEffect) == 2) {
            return '<img src="resources/icons/gem_' + value + 'b.png" width="26" height="26" />';
        }
    },

    renderType: function (value) {
        switch (value) {
            case '0':
                return "Detrimental";
                break;
            case '1':
                return "Beneficial";
                break;
            case '2':
                return "Beneficial [Group Only]"
                break;
        }
    },

    onSearchSpells: function (e) {
        var search = Ext.ComponentQuery.query("#spellsGrid-search")[0].inputEl.getValue();
        Ext.data.StoreManager.lookup('spellsStore').getProxy().setExtraParam('query', search);
        Ext.getCmp("spellsGrid-ID").lookupReference('pagingtoolbartop').moveFirst();
        Ext.data.StoreManager.lookup('spellsStore').load({params: {page: 1}});
    }
});
