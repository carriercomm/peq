Ext.define('peq.singleton.GridUtil', {
    singleton: true,
    alternateClassName: ['GridUtil'],
    
    constructor: function(config) {
        this.initConfig(config);
    },

    applyOverrides: function(grid, column, ignoreCols, defaultProperties, forceHidden, resetWidth) {
        var currentCols, visibleCols, columnOverrides;
        currentCols = grid.columnManager.columns;
        visibleCols = AppConfig.gridSettings[grid.id].visibleCols;
        columnOverrides = AppConfig.gridSettings[grid.id].columns[column];

        // if overrides object exists, apply settings to defaultProperties
        // if width is defined, set flex to undefined (storing previous value in flexTmp to swap back later)
        if (typeof columnOverrides != "undefined") {
            Ext.Object.each(columnOverrides, function (key, value) {
                defaultProperties[key] = value;
                if (typeof defaultProperties['width'] != "undefined") {
                    if (typeof defaultProperties['flex'] != "undefined") {
                        defaultProperties['flexTmp'] = defaultProperties['flex'];
                        defaultProperties['flex'] = undefined;
                    }
                }
            });
        }

        // set visible if its in the visibleCols object
        if (Ext.Array.contains(visibleCols, column)) {
            defaultProperties['hidden'] = false;
        }

        Ext.Array.each(currentCols, function(obj, order) {
            if (obj.config.dataIndex == column) {
                // if currently visible and not in the ignoreCols object make visible
                // else make hidden
                if (typeof ignoreCols != "undefined" && ignoreCols != null) {
                    if (!Ext.Array.contains(ignoreCols, column)) {
                        if (obj.hidden == false) {
                            defaultProperties['hidden'] = false;
                        } else {
                            defaultProperties['hidden'] = true;
                        }
                    }
                }
                
                // if in the forceHidden object, override hidden to value contained in object
                if (typeof forceHidden[column] != "undefined") {
                    defaultProperties['hidden'] = forceHidden[column];
                }

                defaultProperties['order'] = order;
                
                if (!resetWidth) {
                    if (typeof obj.cellWidth != "undefined") {
                        if (typeof defaultProperties['flex'] != "undefined") {
                            defaultProperties['flexTmp'] = defaultProperties['flex'];
                            defaultProperties['flex'] = undefined;
                        }
                        // set flex to the column width to preserve widths
                        defaultProperties['flex'] = obj.cellWidth;
                    }
                } else {
                    // we want to reset flex values from their original values
                    if (typeof columnOverrides == "undefined" || typeof columnOverrides['width'] == "undefined") {
                        defaultProperties['width'] = undefined;
                        if (typeof defaultProperties['flexTmp'] != "undefined") {
                            defaultProperties['flex'] = defaultProperties['flexTmp'];
                        }
                    }
                }
            }
        });

        return defaultProperties;
    },

    // This is called when hiding and showing columns to re-apply flex so the columns autosize
    resetColumns: function(grid, ignoreCols, forceHidden, resetWidth) {
        var currentCols, defaults, newCols = [];

        // user override timer so multiple resetColumn calls will be ignored
        if (typeof AppConfig.gridSettings[grid.id].overrideTimer == "undefined") {
            AppConfig.gridSettings[grid.id].overrideTimer = true;
            setTimeout(function () {
                AppConfig.gridSettings[grid.id].overrideTimer = undefined;
            }, 1000);

            forceHidden = (typeof forceHidden != "undefined") ? forceHidden : {};
            currentCols = grid.columnManager.columns;
            lastConfig = AppConfig.gridSettings[grid.id].columns;
            
            Ext.Array.each(currentCols, function(obj, order) {
               var defaultProperties = {
                    text: obj.config.text,
                    dataIndex: (typeof obj.config.dataIndex != "undefined") ? obj.config.dataIndex : undefined,
                    flex: 1,
                    align: 'center',
                    hidden: true
                };
                if (typeof defaultProperties.dataIndex != "undefined") {
                    defaultProperties = Util.grid.applyOverrides(grid, defaultProperties.dataIndex, ignoreCols, defaultProperties, forceHidden, resetWidth);
                    newCols.push(defaultProperties);
                }
            });

            newCols = Util.grid.reorderColumns(newCols);
            newCols.push(AppConfig.gridSettings[grid.id].action);

            Ext.getCmp(grid.id).headerCt.getMenu().hide();
            setTimeout(function() {
                Ext.getCmp(grid.id).reconfigure(undefined, newCols);
            }, 1);
        }
    },

    reorderColumns: function(currentCols) {
        var newCols = [];
        
        // add all columns that have an "order" specified
        Ext.Array.each(currentCols, function (value, key) {
            if (typeof value != "undefined" && typeof value.order != "undefined") {
                newCols[parseInt(value.order)] = value;
            }
        });

        // add the rest of the columns
        Ext.Array.each(currentCols, function (value, key) {
            if (typeof value != "undefined" && typeof value.order == "undefined") {
                newCols.push(value);
            }
        });
        return newCols;
    },

    createActionColumn: function(options) {
        return {
            text: "Action",
            renderer: function(value) {
                var id = Ext.id();
                setTimeout(function() {
                    var button = Ext.create('Ext.button.Button', {
                        glyph: 0xf013,
                        menu: options
                    });
                    if (Ext.get(id)) {
                        button.render(Ext.get(id));
                    }
                }, 1);
                return '<div id="' + id + '"></div>';
            },
            width: 70,
            align: 'center',
            hidden: false,
            sortable: false
        };
    },

    //
    //  Filter Related methods for the Grids
    //
    filter: {
        translateOperator: function(operator) {
            var operators = {
                "gt": ">",
                "gte": ">=",
                "lt": "<",
                "lte": "<=",
                "eq": "=",
                "neq": "!=",
                "lk": "LIKE",
                "nlk": "NOT LIKE"
            };
            return operators[operator];
        },

        // Create the dock that contains the controls that allow the user to add a new filter
        createAddFilterDock: function(store, controller, gridId) {
            return Ext.create("Ext.toolbar.Toolbar", {
                id: 'addFilterDock_' + gridId,
                dock: 'top', 
                style: {
                    backgroundColor: '#333',
                    //margin: '5px',
                    //borderRadius: '7px',
                    opacity: '0.9'
                },
                height: 45,
                items: [{
                    xtype: 'tbfill'
                }, {
                    xtype: 'combobox',
                    id: 'addFilterField_' + gridId,
                    displayField: 'label',
                    valueField: 'field',
                    typeAhead: true,
                    forceSelection: true,
                    queryMode: 'local',
                    listeners: {
                        afterrender: function(e) {
                            var data = [], records, defaultOverrides, ignoreCols = [];
                            records = store.data.items[0].data;
                            defaultOverrides = AppConfig.gridSettings[gridId].columns;
                            if (typeof controller.getIgnoreCols != "undefined") {
                                ignoreCols = controller.getIgnoreCols();
                            }
                            Ext.Object.each(records, function (key, obj) {
                                if (!Ext.Array.contains(ignoreCols, key)) {
                                    if (typeof defaultOverrides[key] != "undefined" && typeof defaultOverrides[key].text != "undefined") {
                                        data.push({'label': defaultOverrides[key].text, 'field': key});
                                    } else {
                                        data.push({'label': Util.ucwords(key.split('_').join(' ')), 'field': key});
                                    }
                                }
                            });
                            data.sort(function(a, b) {
                                if (a.label < b.label)
                                    return -1;
                                if (a.label > b.label)
                                    return 1;
                                return 0;
                            });
                            e.setStore(Ext.create('Ext.data.Store', {
                                fields: [
                                    {type: 'string', name: 'label'}, 
                                    {type: 'string', name: 'field'}
                                ],
                                data: data
                            }))
                        },
                        change: function (e, newValue, oldValue, opts) {
                            if (typeof controller.onFilterFieldChange != "undefined") {
                                controller.onFilterFieldChange(e, newValue, oldValue, opts);

                                // Auto Filter Operators combo for Common Types
                                var defaultOverrides, data = [];
                                defaultOverrides = AppConfig.gridSettings[gridId].columns;
                                
                                data = [
                                    {label: '>', field: 'gt'},
                                    {label: '>=', field: 'gte'},
                                    {label: '<', field: 'lt'},
                                    {label: '<=', field: 'lte'},
                                    {label: '=', field: 'eq'},
                                    {label: '!=', field: 'neq'},
                                    {label: 'LIKE', field: 'lk'},
                                    {label: 'NOT LIKE', field: 'nlk'}
                                ];

                                if (typeof defaultOverrides[newValue] != "undefined") {
                                    if (typeof defaultOverrides[newValue].renderer != "undefined") {
                                        switch(defaultOverrides[newValue].renderer) {
                                            case 'renderBoolean':
                                                data = [
                                                    {label: '=', field: 'eq'}, 
                                                    {label: '!=', field: 'neq'}
                                                ];
                                                break;
                                        }
                                    }
                                }
                                Ext.getCmp('addFilterOperator_' + gridId).setStore(Ext.create('Ext.data.Store', {
                                    fields: [
                                        {type: 'string', name: 'label'}, 
                                        {type: 'string', name: 'field'}
                                    ],
                                    data: data
                                }));
                            }
                        }
                    }
                }, {
                    xtype: 'combobox',
                    id: 'addFilterOperator_' + gridId,
                    width: 80,
                    displayField: 'label',
                    valueField: 'field',
                    editable: false,
                    forceSelection: true,
                    queryMode: 'local',
                    listeners: {
                        afterrender: function(e) {
                            e.setStore(Ext.create('Ext.data.Store', {
                                fields: [
                                    {type: 'string', name: 'label'}, 
                                    {type: 'string', name: 'field'}
                                ],
                                data: [
                                    {label: '>', field: 'gt'},
                                    {label: '>=', field: 'gte'},
                                    {label: '<', field: 'lt'},
                                    {label: '<=', field: 'lte'},
                                    {label: '=', field: 'eq'},
                                    {label: '!=', field: 'neq'},
                                    {label: 'LIKE', field: 'lk'},
                                    {label: 'NOT LIKE', field: 'nlk'}
                                ]
                            }))
                        }
                    }
                }, {
                    xtype: 'combobox',
                    id: 'addFilterValue_' + gridId,
                    value: '',
                    displayField: 'label',
                    valueField: 'field',
                    typeAhead: true,
                    hideTrigger: true,
                    queryMode: 'local'
                }, {
                    xtype: 'button',
                    text: 'Apply Filter',
                    handler: function(e) {
                        controller.onApplyFilterClick(e);
                    }
                }, {
                    xtype: 'button',
                    glyph: 0xf05e,
                    tooltip: 'Cancel',
                    listeners: {
                        render: function(e) {
                            Ext.get(e.id + '-btnIconEl').setStyle({
                                color: "red"
                            });
                        }
                    },
                    handler: function(e) {
                        Ext.getCmp("addFilterDock_" + gridId).hide();
                    }
                }, {
                    xtype: 'tbfill'
                }]
            });
        },

        // Shows the dock that contains the controls needed to add a new filter
        showAddFilterDock: function(store, controller, gridId) {
            if (typeof Ext.getCmp("addFilterDock_" + gridId) != "undefined") {
                Ext.getCmp("addFilterDock_" + gridId).show();
            } else {
                Ext.getCmp(gridId).addDocked([
                    Util.grid.filter.createAddFilterDock(store, controller, gridId)
                ], 0);
            }
        },

        // Show / create the filter bar dock that displays currently active filters
        showFilterBar: function(controller, gridId) {
            var items = [], defaultOverrides;

            defaultOverrides = AppConfig.gridSettings[gridId].columns;
            if (typeof Ext.getCmp("filterBarDock_" + gridId) != "undefined") {
                if (AppConfig.gridSettings[gridId].filters.length < 1) {
                    Ext.getCmp("filterBarDock_" + gridId).hide();
                } else {
                    Ext.getCmp("filterBarDock_" + gridId).removeAll();

                    items.push({xtype: 'tbfill'});
                    Ext.Object.each(AppConfig.gridSettings[gridId].filters, function(key, obj) {
                        if (typeof defaultOverrides[obj.field] != "undefined" && typeof defaultOverrides[obj.field].text != "undefined") {
                            items.push({
                                xtype: 'button',
                                glyph: 0xf057,
                                text: defaultOverrides[obj.field].text + ' ' + Util.grid.filter.translateOperator(obj.operator) + ' ' + obj.value,
                                dataKey: key,
                                style: {
                                    border: '1px solid #999',
                                    borderRadius: '15px'
                                },
                                handler: function(e) {
                                    controller.onRemoveFilterClick(e);
                                }
                            });
                        } else {
                            items.push({
                                xtype: 'button',
                                glyph: 0xf057,
                                text: obj.field + ' ' + Util.grid.filter.translateOperator(obj.operator) + ' ' + obj.value,
                                dataKey: key,
                                style: {
                                    border: '1px solid #999',
                                    borderRadius: '15px'
                                },
                                handler: function(e) {
                                    controller.onRemoveFilterClick(e);
                                }
                            });
                        }
                    });
                    items.push({xtype: 'tbfill'});

                    Ext.getCmp("filterBarDock_" + gridId).add(items);
                    Ext.getCmp("filterBarDock_" + gridId).show();
                }
            } else {
                items.push({xtype: 'tbfill'});
                Ext.Object.each(AppConfig.gridSettings[gridId].filters, function(key, obj) {
                    if (typeof defaultOverrides[obj.field] != "undefined" && typeof defaultOverrides[obj.field].text != "undefined") {
                        items.push({
                            xtype: 'button',
                            glyph: 0xf057,
                            text: defaultOverrides[obj.field].text + ' ' + Util.grid.filter.translateOperator(obj.operator) + ' ' + obj.value,
                            dataKey: key,
                            style: {
                                border: '1px solid #999',
                                borderRadius: '15px'
                            },
                            handler: function(e) {
                                controller.onRemoveFilterClick(e);
                            }
                        });
                    } else {
                        items.push({
                            xtype: 'button',
                            glyph: 0xf057,
                            text: obj.field + ' ' + Util.grid.filter.translateOperator(obj.operator) + ' ' + obj.value,
                            dataKey: key,
                            style: {
                                border: '1px solid #999',
                                borderRadius: '15px'
                            },
                            handler: function(e) {
                                controller.onRemoveFilterClick(e);
                            }
                        });
                    }
                });
                items.push({xtype: 'tbfill'});
                Ext.getCmp(gridId).addDocked([
                    Ext.create("Ext.toolbar.Toolbar", {
                        id: 'filterBarDock_' + gridId,
                        dock: 'top', 
                        style: {
                            backgroundColor: '#FFF',
                            //margin: '5px',
                            //borderRadius: '7px',
                            opacity: '0.9'
                            //marginBottom: '0px'
                        },
                        items: items
                    })
                ], 0);
            }
        },

        // This is executed when the user fills out the add filter form and clicks apply filter
        applyFilterClick: function(store, controller, gridId) {
            if (typeof AppConfig.gridSettings[gridId].filters == "undefined") {
                AppConfig.gridSettings[gridId].filters = [];
            }
            
            AppConfig.gridSettings[gridId].filters.push({
                field: Ext.getCmp("addFilterField_" + gridId).getValue(), 
                operator: Ext.getCmp("addFilterOperator_" + gridId).getValue(), 
                value: Ext.getCmp("addFilterValue_" + gridId).getValue()
            });
            
            Ext.getCmp("addFilterField_" + gridId).setValue("");
            Ext.getCmp("addFilterOperator_" + gridId).setValue("");
            Ext.getCmp("addFilterValue_" + gridId).setValue("");
            Ext.getCmp("addFilterDock_" + gridId).hide();
            
            store.getProxy().setExtraParam('filter', Ext.encode(AppConfig.gridSettings[gridId].filters));
            store.load();

            Util.grid.filter.showFilterBar(controller, gridId);
        },

        // This is executed when the user clicks on an active filter in the filter bar to removed it
        removeFilterClick: function (e, store, controller, gridId) {
            AppConfig.gridSettings[gridId].filters.splice(e.dataKey, 1);

            store.getProxy().setExtraParam('filter', Ext.encode(AppConfig.gridSettings[gridId].filters));
            store.load();

            Util.grid.filter.showFilterBar(controller, gridId);
        }
    }
});