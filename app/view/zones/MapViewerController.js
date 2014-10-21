Ext.define('peq.view.zones.MapViewerController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mapviewer',
    
    onAfterRender: function(e) {
        Ext.get("map-object").set({"src": 'resources/maps/' + this.maps[0]});

        // set updater interval to continually resize as the image loads
        this.updater = setInterval(function() {
            var newWidth, newHeight, currentWidth, currentHeight, browserWidth, browserHeight, ratio;
            
            if (typeof Ext.getCmp("map-viewer") != "undefined") {
                currentWidth = Ext.get("map-object").getWidth();
                currentHeight = Ext.get("map-object").getHeight();
                newWidth =  currentWidth + 30;
                newHeight = currentHeight + 100;
                browserWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
                browserHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

                // resize image based on browser window dimensions
                if (newWidth > browserWidth || newHeight > browserHeight) {
                    if (newWidth > browserWidth) {
                        Ext.get("map-object").setStyle('max-width', (browserWidth - 30) + 'px');
                        newWidth = browserWidth;
                        ratio = browserWidth / currentWidth;
                        newHeight = currentHeight * ratio;
                    } else {
                        Ext.get("map-object").setStyle('max-height', (browserHeight - 100) + 'px');
                        newHeight = browserHeight;
                        ratio = browserHeight / currentHeight;
                        newWidth = currentWidth * ratio;
                    }
                }

                Ext.getCmp("map-viewer").setWidth(newWidth).center();
                Ext.getCmp("map-viewer").setHeight(newHeight).center();
            } else {
                // window has been closed, cancel updater and reset tick count
                this.updateTick = 0;
                clearInterval(this.updater);
            }

            // after 10 ticks, cancel updater and reset tick count
            if (this.updateTick >= 10) {
                this.updateTick = 0;
                clearInterval(this.updater);
            }
            this.updateTick++;
        }, 100);
    }
});
