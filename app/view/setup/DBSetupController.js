/**
 * This View Controller is associated with the Login view.
 */
Ext.define('peq.view.setup.DBSetupController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dbsetup',
    
    loginText: 'Logging in...',

    id: "dbsetupController",

    onAfterRender: function() {
        Ext.getBody().unmask();
    },

    onSpecialKey: function(field, e) {
        if (e.getKey() === e.ENTER) {
            this.doSetup();
        }
    },
    
    onSubmitClick: function() {
        this.doSetup();
    },
    
    doSetup: function() {
        var form = this.lookupReference('form');
        
        if (form.isValid()) {
            Ext.getBody().mask(this.loginText);

            if (!this.loginManager) {
                this.setupManager = new peq.SetupManager({
                    session: this.getView().getSession()
                });
                this.setupManager.setScope(this);
            }

            this.setupManager.dbsetup({
                data: form.getValues(),
                scope: this,
                success: 'onDBSetupSuccess',
                failure: 'onDBSetupFailure'
            });
        }
    },
    
    onDBSetupFailure: function(response) {
        Ext.getBody().unmask();
        Ext.getCmp("dbsetupErrorMsg").update(response.error);
        Ext.getCmp("dbsetupErrorMsg").show();
    },

    onDBSetupSuccess: function(response) {
        setTimeout(function() {
            Ext.getBody().unmask();
        }, 2500);

        // Defined in Root.js controller
        this.fireViewEvent('dbsetup', this.getView(), this.setupManager);
    }
});
