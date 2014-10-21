Ext.define('peq.view.spells.SpellsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.spells',
    
    onAfterRender: function(e) {
        Util.attachResizeHandler(e, function() {
            e.setHeight(Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 42);
        });
    },

    onAfterRenderContentPanel: function(e) {
        Util.attachResizeHandler(e, function() {
            e.setHeight(Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 42);
            e.setWidth(Math.max(document.documentElement.clientWidth, window.innerWidth || 0) - 150);
        });
    },

    onSwitchSpells: function(e) {
        if (typeof Ext.getCmp("spellsGrid-ID") != "undefined") {
            Ext.getCmp("spellsGrid-ID").hide();
        }

        if (typeof Ext.getCmp("spellsGrid-ID") != "undefined") {
            Ext.getCmp("spellsGrid-ID").show();
        } else {
            Ext.getCmp("Spells-PanelContainer").add(Ext.create("peq.view.spells.SpellsGrid"));
        }
    },

    onSwitchSpellsets: function(e) {
        if (typeof Ext.getCmp("spellsGrid-ID") != "undefined") {
            Ext.getCmp("spellsGrid-ID").hide();
        }

        if (typeof Ext.getCmp("spellsetsGrid-ID") != "undefined") {
            Ext.getCmp("spellsetsGrid-ID").show();
        } else {
            Ext.getCmp("Spells-PanelContainer").add(Ext.create("peq.view.spells.SpellsetsGrid"));
        }
    }
});
