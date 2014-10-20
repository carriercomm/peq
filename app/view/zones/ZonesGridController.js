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

    renderName: function (value, metaData, record) {
        if (typeof StaticData.maps[record.data.short_name] != "undefined") {
            return '<a href="javascript:peq.app.getController(\'peq.view.zones.ZonesGridController\').showMap(\'' + record.data.short_name + '\');" style="color: #000;" data-qtip="View Map"><div class="fa fa-globe" style="cursor: zoom-in; margin-right: 5px;"></div></a><strong>' + value + '</strong>';
        } else {
            return '<strong>' + value + '</strong>';
        }
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
        var maps, mapWindow;
        
        maps = StaticData.maps[short_name];
        mapWindow = this.createMap(maps);
        
        mapWindow.show();
        //Ext.MessageBox.alert("Not implemented", "This is not yet implemented, sorry!");
    },

    createMap: function (maps) {
        var multiple = false;
        if (maps.length > 1) {
            multiple = true;
        }

        return new peq.view.zones.MapViewer({
            'maps': maps,
            'multiple': multiple,
            page: 1
        });
    }
});
