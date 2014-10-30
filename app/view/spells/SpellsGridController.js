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

    onColumnShow: function(gridHeader, column, opts) {
        var forceHidden = {}, dataIndex = column.config.dataIndex;
        forceHidden[dataIndex] = false;
        
        Util.grid.resetColumns(Ext.getCmp("spellsGrid-ID"), null, forceHidden, true);
    },

    onColumnHide: function(gridHeader, column, opts) {
        var forceHidden = {}, dataIndex = column.config.dataIndex;
        forceHidden[dataIndex] = true;
        
        Util.grid.resetColumns(Ext.getCmp("spellsGrid-ID"), null, forceHidden, true);
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

    renderZoneType: function (value) {
        switch (value) {
            case '-1':
                return "None";
                break;
            case '0':
                return "Indoor";
                break;
            case '1':
                return "Outdoor";
                break;
            case '2':
                return "Dungeon";
                break;
            case '255':
                return "Any";
                break;
        }
    },

    renderCategory: function (value) {
        return StaticData.spellgroups[value];
    },

    renderSkill: function (value) {
        return StaticData.skilltypes[value];
    },

    renderTargetType: function (value) {
        return StaticData.spelltargets[value];
    },

    renderResistType: function (value) {
        return StaticData.spellresisttype[value];
    },

    renderBuffDurationFormula: function (value) {
        return StaticData.spellbuffformulas[value];
    },

    renderNpcCategory: function (value) {
        return StaticData.spellnpccategories[value];
    },

    onSearchSpells: function (e) {
        var search = Ext.ComponentQuery.query("#spellsGrid-search")[0].inputEl.getValue();
        Ext.data.StoreManager.lookup('spellsStore').getProxy().setExtraParam('query', search);
        Ext.getCmp("spellsGrid-ID").lookupReference('pagingtoolbartop').moveFirst();
        Ext.data.StoreManager.lookup('spellsStore').load({params: {page: 1}});
    },

    onApplyFilterClick: function (e) {
        Util.grid.filter.applyFilterClick(Ext.data.StoreManager.lookup("spellsStore"), peq.app.getController('peq.view.spells.SpellsGridController'), "spellsGrid-ID");
    },

    onRemoveFilterClick: function (e) {
        Util.grid.filter.removeFilterClick(e, Ext.data.StoreManager.lookup("spellsStore"), peq.app.getController('peq.view.spells.SpellsGridController'), "spellsGrid-ID");
    },

    onAddFilter: function (e) {
        Util.grid.filter.showAddFilterDock(Ext.data.StoreManager.lookup("spellsStore"), peq.app.getController('peq.view.spells.SpellsGridController'), "spellsGrid-ID");
    },
    
    showFilterBar: function() {
        Util.grid.filter.showFilterBar(peq.app.getController('peq.view.spells.SpellsGridController'), "spellsGrid-ID");
    },

    // This is executed anytime the value of the filter field combo changes (on add filter form)
    // Used primarily to then change the store of the value filter to accomodate special case selections (itemtype, etc)
    // In short, it allows you to make changing the field combo directly change the options available in the value combo
    // This method will be heavily different between the different modules
    onFilterFieldChange: function(e, newValue, oldValue, opts) {
        var defaultOverrides, data = [], gridId = "spellsGrid-ID";
        defaultOverrides = AppConfig.gridSettings[gridId].columns;
        
        Ext.getCmp('addFilterValue_' + gridId).forceSelection = false;
        if (typeof defaultOverrides[newValue] != "undefined") {
            if (typeof defaultOverrides[newValue].renderer != "undefined") {
                switch(defaultOverrides[newValue].renderer) {
                    case 'renderBoolean':
                        data = [
                            {label: 'Yes', field: '1'}, 
                            {label: 'No', field: '0'}
                        ];
                        Ext.getCmp('addFilterValue_' + gridId).forceSelection = true;
                        break;
                    case 'renderType':
                        data = [
                            {label: 'Detrimental', field: '0'},
                            {label: 'Beneficial', field: '1'},
                            {label: 'Beneficial [Group Only]', field: '2'}
                        ];
                        break;
                    case 'renderZoneType':
                        data = [
                            {label: 'None', field: '-1'},
                            {label: 'Indoor', field: '0'},
                            {label: 'Outdoor', field: '1'},
                            {label: 'Dungeon', field: '2'},
                            {label: 'Any', field: '255'}
                        ];
                        break;
                    case 'renderEnvironmentType':
                        data = [
                            {label: 'Everywhere', field: '0'},
                            {label: 'Cities', field: '12'},
                            {label: 'Planes', field: '24'}
                        ];
                        break;
                    case 'renderTimeOfDay':
                        data = [
                            {label: 'Anytime', field: '0'},
                            {label: 'Day', field: '1'},
                            {label: 'Night', field: '2'}
                        ];
                        break;
                    case 'renderCategory':
                        Ext.Object.each(StaticData.spellgroups, function(key, value) {
                            data.push({label: value, field: key});
                        });
                        break;
                    case 'renderSkill':
                        Ext.Object.each(StaticData.skilltypes, function(key, value) {
                            data.push({label: value, field: key});
                        });
                        break;
                    case 'renderTargetType':
                        Ext.Object.each(StaticData.spelltargets, function(key, value) {
                            data.push({label: value, field: key});
                        });
                        break;
                    case 'renderResistType':
                        Ext.Object.each(StaticData.spellresisttype, function(key, value) {
                            data.push({label: value, field: key});
                        });
                        break;
                    case 'renderBuffDurationFormula':
                        Ext.Object.each(StaticData.spellbuffformulas, function(key, value) {
                            data.push({label: value, field: key});
                        });
                        break;
                    case 'renderNpcCategory':
                        Ext.Object.each(StaticData.spellnpccategories, function(key, value) {
                            data.push({label: value, field: key});
                        });
                        break;
                }
            }
        }
        if (data.length < 1) {
            Ext.getCmp('addFilterValue_' + gridId).triggerEl.hide();
        } else {
            Ext.getCmp('addFilterValue_' + gridId).triggerEl.show();
        }
        Ext.getCmp('addFilterValue_' + gridId).setStore(Ext.create('Ext.data.Store', {
            fields: [
                {type: 'string', name: 'label'}, 
                {type: 'string', name: 'field'}
            ],
            data: data
        }));
    }
});
