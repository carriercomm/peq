Ext.define('peq.view.merchants.MerchantsGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.merchantsgrid',

    onAfterRender: function(e) {
        Util.attachResizeHandler(e, function() {
            e.setHeight(Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 36);
        });
        this.lookupReference('pagingtoolbartop').setStore(this.getStore('merchants'));
        Ext.data.StoreManager.lookup('merchantsStore').load({params: {token: Ext.state.Manager.get('token'), page: 1}});
    },

    onColumnShow: function(gridHeader, column, opts) {
        var forceHidden = {}, dataIndex = column.config.dataIndex;
        forceHidden[dataIndex] = false;
        
        Util.grid.resetColumns(Ext.getCmp("merchantsGrid-ID"), null, forceHidden, true);
    },

    onColumnHide: function(gridHeader, column, opts) {
        var forceHidden = {}, dataIndex = column.config.dataIndex;
        forceHidden[dataIndex] = true;
        
        Util.grid.resetColumns(Ext.getCmp("merchantsGrid-ID"), null, forceHidden, true);
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

    renderZones: function (value, metaData, record) {
        var numZones = record.data.numZones;
        if (value == null) {
            return "None";
        } else {
            result = numZones + " Zone" + ((numZones > 1) ? "s" : "");
            if (value.indexOf(',') > -1) {
                value = value.split(',').join(", ");
                result = '<div style="cursor: pointer" data-qtip="' + value + '">' + result + '</div>';
            } else {
                return value;
            }
            
            return result;
        }
    },

    renderItems: function (value, metaData, record) {
        var numItems = record.data.numItems;
        if (value == null) {
            return "None";
        } else {
            result = numItems + " Item" + ((numItems > 1) ? "s" : "");
            if (value.indexOf(',') > -1) {
                value = value.split(',').join(", ");
                result = '<div style="cursor: pointer" data-qtip="' + value + '">' + result + '</div>';
            } else {
                return value;
            }
            
            return result;
        }
    },

    onSearchMerchants: function (e) {
        var search = Ext.ComponentQuery.query("#merchantsGrid-search")[0].inputEl.getValue();
        Ext.data.StoreManager.lookup('merchantsStore').getProxy().setExtraParam('query', search);
        Ext.getCmp("merchantsGrid-ID").lookupReference('pagingtoolbartop').moveFirst();
        Ext.data.StoreManager.lookup('merchantsStore').load({params: {page: 1}});
    },

    onApplyFilterClick: function (e) {
        Util.grid.filter.applyFilterClick(Ext.data.StoreManager.lookup("merchantsStore"), peq.app.getController('peq.view.merchants.MerchantsGridController'), "merchantsGrid-ID");
    },

    onRemoveFilterClick: function (e) {
        Util.grid.filter.removeFilterClick(e, Ext.data.StoreManager.lookup("merchantsStore"), peq.app.getController('peq.view.merchants.MerchantsGridController'), "merchantsGrid-ID");
    },

    onAddFilter: function (e) {
        Util.grid.filter.showAddFilterDock(Ext.data.StoreManager.lookup("merchantsStore"), peq.app.getController('peq.view.merchants.MerchantsGridController'), "merchantsGrid-ID");
    },
    
    showFilterBar: function() {
        Util.grid.filter.showFilterBar(peq.app.getController('peq.view.merchants.MerchantsGridController'), "merchantsGrid-ID");
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
        var defaultOverrides, data = [], gridId = "merchantsGrid-ID";
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