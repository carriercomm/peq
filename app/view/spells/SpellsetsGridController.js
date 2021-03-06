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

    onColumnShow: function(gridHeader, column, opts) {
        var forceHidden = {}, dataIndex = column.config.dataIndex;
        forceHidden[dataIndex] = false;
        
        Util.grid.resetColumns(Ext.getCmp("spellsetsGrid-ID"), null, forceHidden, true);
    },

    onColumnHide: function(gridHeader, column, opts) {
        var forceHidden = {}, dataIndex = column.config.dataIndex;
        forceHidden[dataIndex] = true;
        
        Util.grid.resetColumns(Ext.getCmp("spellsetsGrid-ID"), null, forceHidden, true);
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
    },

    onApplyFilterClick: function (e) {
        Util.grid.filter.applyFilterClick(Ext.data.StoreManager.lookup("spellsetsStore"), peq.app.getController('peq.view.spells.SpellsetsGridController'), "spellsetsGrid-ID");
    },

    onRemoveFilterClick: function (e) {
        Util.grid.filter.removeFilterClick(e, Ext.data.StoreManager.lookup("spellsetsStore"), peq.app.getController('peq.view.spells.SpellsetsGridController'), "spellsetsGrid-ID");
    },

    onAddFilter: function (e) {
        Util.grid.filter.showAddFilterDock(Ext.data.StoreManager.lookup("spellsetsStore"), peq.app.getController('peq.view.spells.SpellsetsGridController'), "spellsetsGrid-ID");
    },
    
    showFilterBar: function() {
        Util.grid.filter.showFilterBar(peq.app.getController('peq.view.spells.SpellsetsGridController'), "spellsetsGrid-ID");
    },

    // Put any "fake" derived columns here so they are not displayed in the field picker (they would break if you tried to use them)
    getIgnoreCols: function() {
        return ['attackProcSpell', 'rangeProcSpell', 'defensiveProcSpell', 'spells'];
    }
});
