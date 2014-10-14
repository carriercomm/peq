/**
 * This View Controller is associated with the Login view.
 */
Ext.define('peq.view.setup.DBListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dblist',
    
    loginText: 'Logging in...',

    id: "dblistController",

    onAfterRender: function() {
        Ext.getBody().unmask();
    },
    
    onSelectClick: function() {
        var row, items, matched;
        row = Ext.getCmp("dbListGrid-ID").getSelectionModel().getSelection().shift().getData();
        items = Ext.data.StoreManager.lookup('dbListStore').data.items;
        matched = false;

        if (Ext.state.Manager.get('token') == row.token) {
            Ext.state.Manager.set('token', row.token);
            peq.app.getController('peq.controller.Root').list.destroy();
        } else {
            Ext.state.Manager.set('token', row.token);
            this.fireViewEvent('dbselect', []);
        }
    },

    onAddClick: function() {
        peq.app.getController('peq.controller.Root').list.destroy();
        peq.app.getController('peq.controller.Root').initDBSetup(peq.app.getController('peq.controller.Root'));
    }
});
