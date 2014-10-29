Ext.define('peq.singleton.Util', {
    singleton: true,
    alternateClassName: ['Util'],
    
    constructor: function(config) {
        this.initConfig(config);
    },

    // Skeleton for grid / filter methods, defined in utils/Grid.js
    grid: {
        applyOverrides: function(grid, column, ignoreCols, defaultProperties, forceHidden, resetWidth) {
            return GridUtil.applyOverrides(grid, column, ignoreCols, defaultProperties, forceHidden, resetWidth);
        },

        resetColumns: function(grid, ignoreCols, forceHidden, resetWidth) {
            GridUtil.resetColumns(grid, ignoreCols, forceHidden, resetWidth);
        },

        reorderColumns: function(currentCols) {
            return GridUtil.reorderColumns(currentCols);
        },

        createActionColumn: function(options) {
            return GridUtil.createActionColumn(options);
        },

        filter: {
            translateOperator: function(operator) {
                return GridUtil.filter.translateOperator(operator);
            },

            createAddFilterDock: function(store, controller, gridId) {
                return GridUtil.filter.createAddFilterDock(store, controller, gridId);
            },

            showAddFilterDock: function(store, controller, gridId) {
                GridUtil.filter.showAddFilterDock(store, controller, gridId);
            },

            showFilterBar: function(controller, gridId) {
                GridUtil.filter.showFilterBar(controller, gridId);
            },

            applyFilterClick: function(store, controller, gridId) {
                GridUtil.filter.applyFilterClick(store, controller, gridId);
            },

            removeFilterClick: function (e, store, controller, gridId) {
                GridUtil.filter.removeFilterClick(e, store, controller, gridId);
            }
        }
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
    }
});