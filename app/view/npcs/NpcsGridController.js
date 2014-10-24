Ext.define('peq.view.npcs.NpcsGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.npcsgrid',

    onAfterRender: function(e) {
        Util.attachResizeHandler(e, function() {
            e.setHeight(Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 36);
        });
        this.lookupReference('pagingtoolbartop').setStore(this.getStore('npcs'));
        Ext.data.StoreManager.lookup('npcsStore').load({params: {token: Ext.state.Manager.get('token'), page: 1}});
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

    renderRace: function (value) {
        return StaticData.races[value];
    },

    renderClass: function (value) {
        return StaticData.classes[value];
    },

    renderBodytype: function (value) {
        return StaticData.bodytypes[value];
    },

    renderSpecialAttacks: function (value) {
        var attacks = value.split("");
        Ext.Object.each(attacks, function (key, obj) {
            attacks[key] = StaticData.specialattacks[obj];
        });
        return attacks.join(", ");
    },

    onSearchNpcs: function (e) {
        var search = Ext.ComponentQuery.query("#npcsGrid-search")[0].inputEl.getValue();
        Ext.data.StoreManager.lookup('npcsStore').getProxy().setExtraParam('query', search);
        Ext.getCmp("npcsGrid-ID").lookupReference('pagingtoolbartop').moveFirst();
        Ext.data.StoreManager.lookup('npcsStore').load({params: {page: 1}});
    }
});
