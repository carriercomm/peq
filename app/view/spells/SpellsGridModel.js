Ext.define('peq.view.spells.SpellsGridModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.spellsgrid',

    stores: {
        spells: {
            storeId: 'spellsStore',
            autoLoad: false,
            remoteSort: true,
            pageSize: 50,
            proxy: {
                type: 'jsonp',
                url: '',
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'totalCount'
                },
                pageParam: 'page',
                extraParams: { limit: 50 }
            },
            fields: [],
            sorters: "name",
            listeners: {
                beforeload: function(store, operation, opts) {
                    Ext.getCmp("spellsGrid-ID").mask("Loading Data...");
                    store.getProxy().setUrl(AppConfig.getApiEndpoint() + "/spell/search");
                    store.getProxy().setExtraParam('token', Ext.state.Manager.get('token'));
                },
                load: function() {
                    var columns, visibleCols, defaultCols, newCols, action, records, resetWidth, gridId, storeId;
                    
                    gridId = "spellsGrid-ID";
                    storeId = "spellsStore";
                    resetWidth = false;
                    columns = {
                        'new_icon': {
                            text: 'Icon',
                            width: 50,
                            sortable: false,
                            renderer: 'renderIcon',
                            order: 0
                        },
                        'id': {
                            text: 'ID',
                            align: 'left',
                            width: 110,
                            renderer: 'renderLucyLink',
                            order: 1
                        },
                        'name': {
                            text: 'Name',
                            align: 'left',
                            flex: 3,
                            renderer: 'renderBold',
                            order: 2
                        },
                        'goodEffect': {
                            text: 'Type',
                            renderer: 'renderType',
                            order: 3
                        },
                        'mana': {
                            text: 'Mana',
                            order: 4
                        },
                        'range': {
                            text: 'Range',
                            order: 5
                        },
                        'cast_time': {
                            text: 'Cast Time',
                            order: 6
                        },
                        'recovery_time': {
                            text: 'Recovery Time',
                            order: 7
                        },
                        'recast_time': {
                            text: 'Recast Time',
                            order: 8
                        },
                        'EnvironmentType': {
                            renderer: 'renderEnvironmentType'
                        },
                        'TimeOfDay': {
                            renderer: 'renderTimeOfDay'
                        },
                        'uninterruptable': {
                            renderer: 'renderBoolean'
                        },
                        'deleteable': {
                            renderer: 'renderBoolean'
                        },
                        'short_buff_box': {
                            renderer: 'renderBoolean'
                        },
                        'can_mgb': {
                            renderer: 'renderBoolean'
                        },
                        'nodispell': {
                            renderer: 'renderBoolean'
                        },
                        'spell_category': {
                            renderer: 'renderCategory'
                        },
                        'skill': {
                            renderer: 'renderSkill'
                        },
                        'targettype': {
                            renderer: 'renderTargetType'
                        },
                        'zonetype': {
                            renderer: 'renderZoneType'
                        },
                        'resisttype': {
                            renderer: 'renderResistType'
                        },
                        'buffdurationformula': {
                            renderer: 'renderBuffDurationFormula'
                        },
                        'npc_category': {
                            renderer: 'renderNpcCategory'
                        }
                    };

                    AppConfig.gridSettings[gridId].visibleCols = ['new_icon', 'id', 'name', 'goodEffect', 'mana', 'range', 'cast_time', 'recovery_time', 'recast_time'];

                    AppConfig.gridSettings[gridId].action = Util.grid.createActionColumn([{
                        text: "Edit",
                        handler: function (grid, rowIndex, colIndex) {
                            setTimeout(function() {
                                var row = Ext.getCmp(gridId).getSelectionModel().getSelection().shift().getData();
                                Ext.MessageBox.alert("Not implemented", "This is not yet implemented, sorry!");
                            }, 200);
                        }
                    }, {
                        text: "Copy",
                        handler: function (grid, rowIndex, colIndex) {
                            setTimeout(function() {
                                var row = Ext.getCmp(gridId).getSelectionModel().getSelection().shift().getData();
                                Ext.MessageBox.alert("Not implemented", "This is not yet implemented, sorry!");
                            }, 200);
                        }
                    }, {
                        text: "Delete",
                        handler: function (grid, rowIndex, colIndex) {
                            setTimeout(function() {
                                var row = Ext.getCmp(gridId).getSelectionModel().getSelection().shift().getData();
                                Ext.MessageBox.alert("Not implemented", "This is not yet implemented, sorry!");
                            }, 200);
                        }
                    }]);

                    newCols = [];
                    AppConfig.gridSettings[gridId].columns = columns;

                    // loop over the first data record to get full list of all columns from api
                    if (typeof Ext.data.StoreManager.lookup(storeId).data.items[0] != "undefined") {
                        if (typeof AppConfig.gridSettings[gridId].overrideTimer == "undefined") {
                            AppConfig.gridSettings[gridId].overrideTimer = true;
                            setTimeout(function () {
                                AppConfig.gridSettings[gridId].overrideTimer = undefined;
                            }, 1000);
                        } else {
                            resetWidth = true;
                        }

                        records = Ext.data.StoreManager.lookup(storeId).data.items[0].data;
                        Ext.Object.each(records, function (key, obj) {
                            var defaultProperties = {
                                text: Util.ucwords(key.split('_').join(' ')),
                                dataIndex: key,
                                flex: 1,
                                align: 'center',
                                hidden: true
                            };

                            // if defaults object exists for this key in "columns" object, override values
                            defaultProperties = Util.grid.applyOverrides(Ext.getCmp(gridId), key, [], defaultProperties, {}, resetWidth);
                            
                            // push column onto stack
                            newCols.push(defaultProperties);
                        });
                    }

                    // re-order column according to "order" specified in original "columns" object
                    newCols = Util.grid.reorderColumns(newCols);

                    // push action column onto stack last
                    newCols.push(AppConfig.gridSettings[gridId].action);

                    AppConfig.loadedGems = [];
                    Ext.getCmp(gridId).reconfigure(undefined, newCols);
                    Ext.getCmp(gridId).unmask();

                    // find any results with missing icon image file and perform delayed update with unknown icons.
                    setTimeout(function() {
                        Ext.Array.each(AppConfig.missingGems, function(gem) {
                            var dom = Ext.dom.Query.select('.' + gem);
                            Ext.Object.each(dom, function(key, el) {
                                var src, type;
                                el = Ext.get(el);
                                src = el.getAttribute('src');
                                src = src.split('.')[0];
                                type = src.substr(src.length - 1);

                                el.set({src: 'resources/icons/gem_unknown' + type + '.png'});
                            });
                        });
                    }, 500);
                }
            }
        }
    }
});
