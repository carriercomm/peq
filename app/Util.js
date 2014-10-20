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
        applyOverrides: function(obj1, obj2) {
            Ext.Object.each(obj2, function (key, value) {
                obj1[key] = value;
                if (typeof obj1['width'] != "undefined") {
                    obj1['flex'] = undefined;
                }
            });
            return obj1;
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