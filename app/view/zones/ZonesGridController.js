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

    onColumnShow: function(gridHeader, column, opts) {
        var forceHidden = {}, dataIndex = column.config.dataIndex;
        forceHidden[dataIndex] = false;
        
        Util.grid.resetColumns(Ext.getCmp("zonesGrid-ID"), null, forceHidden, true);
    },

    onColumnHide: function(gridHeader, column, opts) {
        var forceHidden = {}, dataIndex = column.config.dataIndex;
        forceHidden[dataIndex] = true;
        
        Util.grid.resetColumns(Ext.getCmp("zonesGrid-ID"), null, forceHidden, true);
    },

    renderName: function (value, metaData, record) {
        //if (typeof StaticData.maps[record.data.short_name] != "undefined") {
            return '<a href="javascript:peq.app.getController(\'peq.view.zones.ZonesGridController\').showMap(\'' + record.data.short_name + '\');" style="color: #000;" data-qtip="View Map"><div class="fa fa-globe" style="cursor: zoom-in; margin-right: 5px;"></div></a><strong>' + value + '</strong>';
        //} else {
        //    return '<strong>' + value + '</strong>';
        //}
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

    renderZType: function (value) {
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

    onSearchZones: function (e) {
        var search = Ext.ComponentQuery.query("#zonesGrid-search")[0].inputEl.getValue();
        Ext.data.StoreManager.lookup('zonesStore').getProxy().setExtraParam('query', search);
        Ext.getCmp("zonesGrid-ID").lookupReference('pagingtoolbartop').moveFirst();
        Ext.data.StoreManager.lookup('zonesStore').load({params: {page: 1}});
    },

    showMap: function (short_name) {
        var mapWindow;
        mapWindow = this.createMap(short_name);
        mapWindow.show();
    },

    createMap: function (short_name) {
        var viewer = new peq.view.zones.MapViewer({
            'maps': ['maps_' + short_name + '.map.png']
        });
        Ext.Ajax.request({
            url: 'resources/maps/maps_' + short_name + '.map.png',
            success: function(response, opts) {

            },
            failure: function(response, opts) {
                viewer.destroy();
                Ext.MessageBox.alert("No Map Found", "No map found for this zone, sorry!");
            }
        });
        return viewer;
    },

    onApplyFilterClick: function (e) {
        Util.grid.filter.applyFilterClick(Ext.data.StoreManager.lookup("zonesStore"), peq.app.getController('peq.view.zones.ZonesGridController'), "zonesGrid-ID");
    },

    onRemoveFilterClick: function (e) {
        Util.grid.filter.removeFilterClick(e, Ext.data.StoreManager.lookup("zonesStore"), peq.app.getController('peq.view.zones.ZonesGridController'), "zonesGrid-ID");
    },

    onAddFilter: function (e) {
        Util.grid.filter.showAddFilterDock(Ext.data.StoreManager.lookup("zonesStore"), peq.app.getController('peq.view.zones.ZonesGridController'), "zonesGrid-ID");
    },
    
    showFilterBar: function() {
        Util.grid.filter.showFilterBar(peq.app.getController('peq.view.zones.ZonesGridController'), "zonesGrid-ID");
    }
});
