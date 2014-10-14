/**
 * This global controller manages the login view and ensures that view is created when
 * the application is launched. Once login is complete we then create the main view.
 */
Ext.define('peq.controller.Root', {
    extend: 'Ext.app.Controller',
    
    requires: [
        'peq.view.setup.Login',
        'peq.view.setup.DBSetup',
        'peq.view.main.Main',
        'peq.SetupManager',
        'Ext.state.CookieProvider',
        'Ext.data.JsonP'
    ],
    
    loadingText: 'Loading...',

    onLaunch: function () {
        var thisController = this;
        this.session = new Ext.data.Session({
            autoDestroy: false
        });

        //UserSession.setUserId(peq.app.userid);

        if (Ext.state.Manager.get('token')) {
            console.log(Ext.state.Manager.get('token'));
            //Ext.state.Manager.set('token', null);
        }

        if (Ext.state.Manager.get('token') == null) {
            this.config = new peq.view.setup.DBSetup({
                session: this.session,
                autoShow: true,
                listeners: {
                    scope: this,
                    dbsetup: 'onDbsetup'
                }
            });
        } else {
            Ext.data.JsonP.request({
                url: AppConfig.getApiEndpoint() + '/auth/verifytoken',
                params: {
                    "token": Ext.state.Manager.get('token')
                },
                callback: function(success, response) {
                    if (success && response.success) {
                        if (Ext.state.Manager.get('authenticated')) {
                            thisController.showUI();
                        } else {
                            thisController.login = new peq.view.setup.Login({
                                session: thisController.session,
                                autoShow: true,
                                listeners: {
                                    scope: thisController,
                                    login: 'onLogin'
                                }
                            });
                        }
                    } else {
                        Ext.state.Manager.set('token', null);
                        Ext.state.Manager.set('authenticated', null);
                        Ext.state.Manager.set('admin', null);

                        thisController.config = new peq.view.setup.DBSetup({
                            session: thisController.session,
                            autoShow: true,
                            listeners: {
                                scope: thisController,
                                dbsetup: 'onDbsetup'
                            }
                        });
                    }
                }
            });
        }
    },

    /**
     * Called when the login controller fires the "login" event.
     *
     * @param loginController
     * @param loginManager
     */
    onLogin: function (setupController, setupManager) {
        this.login.destroy();
        this.setupManager = setupManager;
        
        Ext.state.Manager.set('authenticated', true);
        Ext.state.Manager.set('admin', this.setupManager.admin);
        this.showUI();
    },

    /**
     * Called when the dbsetup controller fires the "dbsetup" event.
     *
     * @param controller
     * @param loginManager
     */
    onDbsetup: function (setupController, setupManager) {
        this.config.destroy();
        this.setupManager = setupManager;
        Ext.state.Manager.set('token', this.setupManager.token);

        // No token, proceed to login
        this.login = new peq.view.setup.Login({
            session: this.session,
            autoShow: true,
            listeners: {
                scope: this,
                login: 'onLogin'
            }
        });
    },
    
    showUI: function() {
        this.viewport = new peq.view.main.Main({
            session: this.session
        });
    },
    
    getSession: function() {
        return this.session;
    }
});
