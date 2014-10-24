Ext.define('peq.view.home.HomeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.home',
    
    onAfterRender: function(e) {
        Util.attachResizeHandler(e, function() {
            e.setHeight(Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 36);
        });
    },

    onAfterRenderContentPanel: function(e) {
        Util.attachResizeHandler(e, function() {
            e.setHeight(Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 42);
            e.setWidth(Math.max(document.documentElement.clientWidth, window.innerWidth || 0) - 150);
        });
    },

    onAfterRenderContent: function(e) {
        var html = '<div style="margin: 5px; margin-left: 10px; margin-right: 10px; margin-top: 10px; border-radius: 12px; background-color: #151515; color: #BDBDBD; border: 1px solid #000; opacity: 0.6;"><div style="padding-left: 15px; padding-right: 15px;"><h1 style="text-align: center;">About Project Everquest</h1><p>Project EQ is a team of database and quest developers with a common goal of creating a database as close to the live Everquest experience as possible. We have very high standards about what goes into our database, and who works on it, to provide the highest quality database available. We use only packet collected NPCs and spawn points (with exception of important and rare quest NPCs), and combine all avaliable community information to fill in the gaps that packet collecting leaves behind.</p><p>We are working from Classic everuqest and working through each expansion in turn. Building and tuning each expansion before moving on.</p><p>Currently, the PEQ team is divided into two primary teams. The database team is a very selective team of people, hand-picked by existing database team members. The second team is the quest team. There are very few requirements to be on the quest team beyond the ability to write quests.</p><p>Project EQ also runs an a dedicated EQEmulator server: [PEQ] The Grand Creation. </p></div></div>';
        html += '<div style="margin: 5px; margin-left: 10px; margin-right: 10px; margin-top: 10px; border-radius: 12px; background-color: #151515; color: #BDBDBD; border: 1px solid #000; opacity: 0.6;"><div style="padding-left: 15px; padding-right: 15px;"><h1 style="text-align: center;">About PEQ Database Editor</h1><p>Lets begin with who in the heck I am. My screenname in the EQEMU community is "sotonin". I was active a long long while back but I have been away for a very long time. I created the original PEQ Database Editor that is still being distributed to this day. It has been through a number of tweaks and overhauls but still looks exactly as it was when I created it (layout wise). I have decided to rewrite the whole project from scratch.</p><p>This new version was built using ExtJS 5.0 for the front end and it communicates with a PHP backend that I have on github as an open source project. You are free to install the PHP API onto your own server and manage the whole system yourself, or you can simply install the ExtJS app and leave the API endpoint the default value. What this will do is basically store your database token information (connection info to connect to your EQEMU database) in my database and the full API hosted on my server will manage things for you.</p><p>Security is a top concern of mine, so I have taken a number of precautions. When you create a database connection the password is encrypted prior to being inserted into the database so a plain text password is not stored anywhere. Before this app launches I will be installing a SSL certificate on the API server and will only accept secure traffic.</p></div></div>';
        html += '<div style="margin: 5px; margin-left: 10px; margin-right: 10px; margin-top: 10px; border-radius: 12px; background-color: #151515; color: #BDBDBD; border: 1px solid #000; opacity: 0.6;"><div style="padding-left: 15px; padding-right: 15px;"><h1 style="text-align: center;">PEQ Editor Commit Activity</h1><p id="git_commit_peq"></p></div></div>';
        html += '<div style="margin: 5px; margin-left: 10px; margin-right: 10px; margin-top: 10px; border-radius: 12px; background-color: #151515; color: #BDBDBD; border: 1px solid #000; opacity: 0.6;"><div style="padding-left: 15px; padding-right: 15px;"><h1 style="text-align: center;">PEQ API Commit Activity</h1><p id="git_commit_api"></p></div></div>';
        Ext.getCmp("Home-ContentPanelContainer").el.update(html);

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
        Ext.data.JsonP.request({
            url: 'https://api.github.com/repos/project-everquest/api/commits',
            callback: this.renderApiCommits,
            scope: this
        });
    },

    renderEditorCommits: function(success, response) {
        var commits = [], me = this;
        if (typeof response.data != "undefined") {
            Ext.Array.each(response.data, function(obj) {
                commits.push(me.formatCommit(obj.commit));
            });
        }
        Ext.get("git_commit_peq").update(commits.join('<br />'));
    },

    renderApiCommits: function(success, response) {
        var commits = [], me = this;
        if (typeof response.data != "undefined") {
            Ext.Array.each(response.data, function(obj) {
                commits.push(me.formatCommit(obj.commit));
            });
        }
        Ext.get("git_commit_api").update(commits.join('<br />'));
    },

    formatCommit: function(commit) {
        return "[" + commit.author.date + "] " + commit.author.name + " - " + commit.message;
    }
});
