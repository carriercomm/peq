/**
 * This class manages the setup process.
 */
Ext.define('peq.SetupManager', {
    requires: [
        'Ext.data.JsonP',
        'Ext.Ajax'
    ],

    setupControllerScope: this,
    token: null,
    admin: null,

    dbsetup: function(options) {
        Ext.data.JsonP.request({
            url: AppConfig.getApiEndpoint() + '/auth/getToken',
            params: {
                "server": options.data.server,
                "username": options.data.username,
                "password": options.data.password,
                "database": options.data.database
            },
            callback: this.onDBSetupReturn,
            scope: this
        });
    },

    login: function(options) {
        Ext.data.JsonP.request({
            url: AppConfig.getApiEndpoint() + '/auth/login',
            params: {
                "token": Ext.state.Manager.get('token'),
                "user": options.data.username,
                "password": options.data.password
            },
            callback: this.onLoginReturn,
            scope: this
        });
    },

    onDBSetupReturn: function(success, response) {
        if (success && response.success) {
            this.setToken(response.data.token);
            Ext.callback('onDBSetupSuccess', this.setupControllerScope, [response]);
            return;
        }

        Ext.callback('onDBSetupFailure', this.setupControllerScope, [response]);
    },
    
    onLoginReturn: function(success, response) {        
        if (success && response.success) {
            this.setAdmin(response.data.admin);
            Ext.callback('onLoginSuccess', this.setupControllerScope, [response]);
            return;
        }

        Ext.callback('onLoginFailure', this.setupControllerScope, [response]);
    },

    setScope: function(scope) {
        this.setupControllerScope = scope;
    },

    setToken: function(token) {
        this.token = token;
    },

    setAdmin: function(admin) {
        this.admin = admin;
    }
});
