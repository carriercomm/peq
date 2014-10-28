Ext.define('peq.singleton.Util', {
    singleton: true,
    alternateClassName: ['Util'],
    
    constructor: function(config) {
        this.initConfig(config);
    },

    //
    //  IE safe console.log
    //
    log: function(message) {
        if (typeof console !== "undefined") {
            console.log(message);
        }
    },

    //
    //  Attach all of the various resize handlers
    //
    attachResizeHandler: function(component, callback) {
        if (window.addEventListener) {
            window.addEventListener("resize", function(event){
                callback();
            });
        } else if (window.attachEvent) {
            window.attachEvent("onresize", function(event){
                callback();
            });
        }
        component.on("resize", function(e) {
            callback();
        });
    },

    //
    //  Take any string and uppercase the first letter of each word in it
    //
    ucwords: function(value) {
        var words = value.split(/\s/);

        for (i = 0; i < words.length; i++) {
            words[i] = Ext.util.Format.capitalize(words[i]);
        }

        return words.join(' ');
    },

    //
    //  Creates a standard tooltip with a 500ms delayed auto hide if you mouseout
    //
    createTooltip: function(target, html) {
        var tt = Ext.create('Ext.tip.ToolTip', {
            target: target,
            autoHide: false,
            anchor: 'left',
            trackMouse: true,
            html: html
        });

        tt.on('show', function() {
            var timeout;
            Ext.get(target).on('mouseout', function(){
                timeout = setTimeout(function(){
                    tt.hide();
                }, 100);
            });

            Ext.get(target).on('mouseover', function(){
                clearTimeout(timeout);
            });
        });
        return tt;
    },

    //
    //  Splits a dataset into manageable chunks and passes them through a method with a slight delay
    //
    loadBalance: function(data, forks, controller, cmethod, callback) {
        var queue, position = 1;

        queue = {};

        if (data != null) {
            Ext.Object.each(data, function (key, value) {
                if (typeof queue[position] == "undefined") {
                    queue[position] = {};
                }
                queue[position][key] = value;
                if (position == forks) {
                    position = 1;
                } else {
                    position++;
                }
            });
        }

        Ext.Object.each(queue, function (key, value) {
            setTimeout(function() {
                if (key == forks) {
                    cb = callback;
                } else {
                    cb = null;
                }
                controller[cmethod](controller, value, cb);
            }, 100 * key);
        });
    },

    grid: {
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
                    if (!Ext.Array.contains(ignoreCols, column)) {
                        if (obj.hidden == false) {
                            defaultProperties['hidden'] = false;
                        } else {
                            defaultProperties['hidden'] = true;
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
                if (typeof value.order != "undefined") {
                    newCols[parseInt(value.order)] = value;
                }
            });

            // add the rest of the columns
            Ext.Array.each(currentCols, function (value, key) {
                if (typeof value.order == "undefined") {
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
        }
    }
});