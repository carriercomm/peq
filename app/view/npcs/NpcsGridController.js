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

    onColumnShow: function(gridHeader, column, opts) {
        var forceHidden = {}, dataIndex = column.config.dataIndex;
        forceHidden[dataIndex] = false;
        
        Util.grid.resetColumns(Ext.getCmp("npcsGrid-ID"), null, forceHidden, true);
    },

    onColumnHide: function(gridHeader, column, opts) {
        var forceHidden = {}, dataIndex = column.config.dataIndex;
        forceHidden[dataIndex] = true;
        
        Util.grid.resetColumns(Ext.getCmp("npcsGrid-ID"), null, forceHidden, true);
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
    },

    onApplyFilterClick: function (e) {
        Util.grid.filter.applyFilterClick(Ext.data.StoreManager.lookup("npcsStore"), peq.app.getController('peq.view.npcs.NpcsGridController'), "npcsGrid-ID");
    },

    onRemoveFilterClick: function (e) {
        Util.grid.filter.removeFilterClick(e, Ext.data.StoreManager.lookup("npcsStore"), peq.app.getController('peq.view.npcs.NpcsGridController'), "npcsGrid-ID");
    },

    onAddFilter: function (e) {
        Util.grid.filter.showAddFilterDock(Ext.data.StoreManager.lookup("npcsStore"), peq.app.getController('peq.view.npcs.NpcsGridController'), "npcsGrid-ID");
    },
    
    showFilterBar: function() {
        Util.grid.filter.showFilterBar(peq.app.getController('peq.view.npcs.NpcsGridController'), "npcsGrid-ID");
    },

    // Put any "fake" derived columns here so they are not displayed in the field picker (they would break if you tried to use them)
    getIgnoreCols: function() {
        return ['npcspecialattks'];
    },

    // This is executed anytime the value of the filter field combo changes (on add filter form)
    // Used primarily to then change the store of the value filter to accomodate special case selections (itemtype, etc)
    // In short, it allows you to make changing the field combo directly change the options available in the value combo
    // This method will be heavily different between the different modules
    onFilterFieldChange: function(e, newValue, oldValue, opts) {
        var defaultOverrides, data = [], gridId = "npcsGrid-ID";
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
                    case 'renderBodyType':
                        Ext.Object.each(StaticData.bodytypes, function(key, value) {
                            data.push({label: value, field: key});
                        });
                        break;
                    case 'renderRace':
                        Ext.Object.each(StaticData.races, function(key, value) {
                            data.push({label: value, field: key});
                        });
                        break;
                    case 'renderClass':
                        Ext.Object.each(StaticData.classes, function(key, value) {
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
