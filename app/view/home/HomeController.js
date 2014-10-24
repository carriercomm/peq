Ext.define('peq.view.home.HomeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.home',
    
    onAfterRender: function(e) {
        Util.attachResizeHandler(e, function() {
            e.setHeight(Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 36);
        });
        this.fetchGitEditor();
        this.fetchGitApi();
    },

    onDBSetup: function(e) {
    	peq.app.getController('peq.controller.Root').initDBList(peq.app.getController('peq.controller.Root'));
    },

    fetchGitEditor: function() {
        Ext.data.JsonP.request({
            url: 'https://api.github.com/repos/project-everquest/peq/commits',
            callback: this.renderEditorCommits,
            scope: this
        });
    },

    fetchGitApi: function() {

    },

    renderEditorCommits: function(success, response) {
        var text = '';
        if (typeof response.data != "undefined") {
            Ext.Array.each(response.data, function(obj) {
                console.log(obj);
                text = text + " " + obj.commit.message;
            })
        }
        //Ext.get("#git_commit_peq")
    }
});
