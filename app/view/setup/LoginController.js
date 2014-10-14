/**
 * This View Controller is associated with the Login view.
 */
Ext.define('peq.view.setup.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',
    
    loginText: 'Logging in...',

    id: "loginController",

    onAfterRender: function() {
        Ext.getBody().unmask();
    },

    onSpecialKey: function(field, e) {
        if (e.getKey() === e.ENTER) {
            this.doLogin();
        }
    },
    
    onLoginClick: function() {
        this.doLogin();
    },
    
    doLogin: function() {
        var form = this.lookupReference('form');
        
        if (form.isValid()) {
            Ext.getBody().mask(this.loginText);

            if (!this.setupManager) {
                this.setupManager = new peq.SetupManager({
                    session: this.getView().getSession()
                });
                this.setupManager.setScope(this);
            }

            this.setupManager.login({
                data: form.getValues(),
                scope: this,
                success: 'onLoginSuccess',
                failure: 'onLoginFailure'
            });
        }
    },
    
    onLoginFailure: function(response) {
        Ext.getBody().unmask();
        Ext.getCmp("loginErrorMsg").update(response.error);
        Ext.getCmp("loginErrorMsg").show();
    },

    onLoginSuccess: function(response) {
        setTimeout(function() {
            Ext.getBody().unmask();
        }, 2500);

        // Defined in Root.js controller
        this.fireViewEvent('login', this.getView(), this.setupManager);
    }
});
