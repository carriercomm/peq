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

    renderIcon: function (value, metaData, record, index) {
        if (parseInt(record.data.goodEffect) == 0) {
            if (!Ext.Array.contains(AppConfig.missingGems, 'gem_' + value + 'd')) {
                if (!Ext.Array.contains(AppConfig.loadedGems, 'gem_' + value + 'd')) {
                    AppConfig.loadedGems.push('gem_' + value + 'd');
                    Ext.Ajax.request({
                        url: 'resources/icons/gem_' + value + 'd.png',
                        success: function(response, opts) {},
                        failure: function(response, opts) {
                            if (!Ext.Array.contains(AppConfig.missingGems, 'gem_' + value + 'd')) {
                                AppConfig.missingGems.push('gem_' + value + 'd');
                            }
                        }
                    });
                }
            }
            return '<img class="gem_' + value + 'd" src="resources/icons/gem_' + value + 'd.png" width="26" height="26" />';
        } else if (parseInt(record.data.goodEffect) == 1 || parseInt(record.data.goodEffect) == 2) {
            if (!Ext.Array.contains(AppConfig.missingGems, 'gem_' + value + 'b')) {
                if (!Ext.Array.contains(AppConfig.loadedGems, 'gem_' + value + 'b')) {
                    AppConfig.loadedGems.push('gem_' + value + 'b');
                    Ext.Ajax.request({
                        url: 'resources/icons/gem_' + value + 'b.png',
                        success: function(response, opts) {},
                        failure: function(response, opts) {
                            if (!Ext.Array.contains(AppConfig.missingGems, 'gem_' + value + 'b')) {
                                AppConfig.missingGems.push('gem_' + value + 'b');
                            }
                        }
                    });
                }
            }
            return '<img class="gem_' + value + 'b" src="resources/icons/gem_' + value + 'b.png" width="26" height="26" />';
        }
    },

    renderLucyLink: function (value) {
        return value + ' (<a href="http://lucy.allakhazam.com/spell.html?id=' + value + '" target="_blank">Lucy</a>)';
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

    renderEnvironmentType: function (value) {
        switch (value) {
            case '0':
                return "Everywhere";
                break;
            case '12':
                return "Cities";
                break;
            case '24':
                return "Planes";
                break;
        }
    },

    renderTimeOfDay: function (value) {
        switch (value) {
            case '0':
                return "Anytime";
                break;
            case '1':
                return "Day";
                break;
            case '2':
                return "Night";
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
