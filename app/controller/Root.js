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

        if (Ext.state.Manager.get('token')) {
            //console.log(Ext.state.Manager.get('token'));
            //Ext.state.Manager.set('token', null);
        }

        if (Ext.state.Manager.get('tokens') == null) {
            Ext.state.Manager.set("tokens", []);
        }

        if (Ext.state.Manager.get('token') == null) {
            Ext.state.Manager.set('authenticated', null);
            Ext.state.Manager.set('admin', null);
            var tokens = Ext.state.Manager.get('tokens');
            if (tokens.length > 0) {
                this.initDBList(this);
            } else {
                this.initDBSetup(this);
            }
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
                            thisController.initLogin(thisController);
                        }
                    } else {
                        var tokens = Ext.state.Manager.get('tokens');
                        Ext.Array.remove(tokens, Ext.state.Manager.get('token'));
                        Ext.state.Manager.set('token', null);
                        Ext.state.Manager.set('authenticated', null);
                        Ext.state.Manager.set('admin', null);

                        if (tokens.length > 0) {
                            this.initDBList(thisController);
                        } else {
                            this.initDBSetup(thisController);
                        }
                    }
                }
            });
        }
    },

    initDBSetup: function(scope) {
        scope.config = new peq.view.setup.DBSetup({
            session: scope.session,
            autoShow: true,
            listeners: {
                'scope': scope,
                dbsetup: 'onDbsetup'
            }
        });
    },

    initDBList: function(scope) {
        scope.list = new peq.view.setup.DBList({
            session: scope.session,
            autoShow: true,
            listeners: {
                'scope': scope,
                dbselect: 'onDbselect'
            }
        });
    },

    initLogin: function(scope) {
        scope.login = new peq.view.setup.Login({
            session: scope.session,
            autoShow: true,
            listeners: {
                'scope': scope,
                login: 'onLogin'
            }
        });
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
     * @param setupController
     * @param setupManager
     */
    onDbsetup: function (setupController, setupManager) {
        var tokens = Ext.state.Manager.get('tokens');

        this.config.destroy();
        this.setupManager = setupManager;
        Ext.state.Manager.set('token', this.setupManager.token);
        tokens.push(this.setupManager.token);
        Ext.state.Manager.set('tokens', tokens);

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

    /**
     * Called when the dblist controller fires the "dbselect" event.
     *
     * @param setupController
     * @param setupManager
     */
    onDbselect: function () {
        this.list.destroy();

        // Token set, now proceed to peq login
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
        if (typeof Ext.getCmp("MainPanel") == "undefined") {
            this.viewport = new peq.view.main.Main({
                session: this.session
            });
        }
    },
    
    getSession: function() {
        return this.session;
    }
});
