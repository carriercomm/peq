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
            Ext.getCmp('loginWindow-ID').mask(this.loginText);

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
        if (response) {
            Ext.getCmp("loginErrorMsg").update(response.error);
        } else {
            Ext.state.Manager.set('token', null);
            Ext.getCmp("loginErrorMsg").update('There was a problem communicating with the EQEMU database, please verify the supplied credentials. Token has been reset for next attempt. Please reload the page.');
        }
        Ext.getCmp("loginWindow-ID").unmask();
        Ext.getCmp("loginErrorMsg").show();
    },

    onLoginSuccess: function(response) {
        // Defined in Root.js controller
        this.fireViewEvent('login', this.getView(), this.setupManager);
    }
});
