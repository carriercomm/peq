/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.define('peq.Application', {
    extend: 'Ext.app.Application',
    name: 'peq',
    appProperty: 'app',

    requires: [
    	'peq.*',
        'Ext.History'
    ],

    controllers: [
    	'peq.controller.Root'
    ],

    stores: [
        // TODO: add global / shared stores here
    ],
    
    launch: function () {
        Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
        peq.app.tokens = Ext.state.Manager.get('tokens');
        peq.app.token = Ext.state.Manager.get('token');
        peq.app.authenticated = Ext.state.Manager.get('authenticated');
        peq.app.admin = Ext.state.Manager.get('admin');
        Ext.setGlyphFontFamily('FontAwesome');
        Ext.tip.QuickTipManager.init();

        Ext.getBody().mask('Loading...');
        Ext.app.route.Router.multipleToken = "/";
        var currentToken = Ext.History.getToken();
        if (currentToken) {
            Ext.state.Manager.set('lastPage', currentToken);
        }

        //Ext.getBody().setStyle('background-image', 'url(resources/money_background.jpg)');
        //Ext.getBody().setStyle('background-size', 'cover');
    }
});
