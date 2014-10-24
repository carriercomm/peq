Ext.define('peq.view.home.Home', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.home-panel',

    controller: 'home',

    layout: 'hbox',

    listeners: {
        afterrender: 'onAfterRender'
    },

    items: [{
        xtype: 'panel',
        width: 150,
        listeners: {
            afterrender: 'onAfterRender'
        },
        bodyStyle: {
            backgroundColor: '#240B3B'
        },
        items: [{
            xtype: 'button',
            text: 'Settings',
            style: {
                height: '36px',
                width: '100%'
            },
            menu: [{
                text: 'Manage Editor Accounts'
            }, {
                text: 'Reset Password'
            }, {
                text: 'DB Connections',
                handler: 'onDBSetup'
            }]
        }]
    }, {
        xtype: 'panel',
        id: 'Home-PanelContainer',
        width: '100%',
        region: 'center',
        layout: 'fit',
        height: 5,
        listeners: {
            afterrender: 'onAfterRenderContentPanel'
        },
        items: [{
            xtype: 'panel',
            id: 'Home-ContentPanelContainer',
            style: {
                overflow: 'auto'
            },
            listeners: {
                afterrender: 'onAfterRenderContent'
            }
        }]
        /*items: [{
            xtype: 'panel',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                style: {
                    backgroundColor: '#999'
                },
                listeners: {
                    render: function (e) {
                        var items = e.items;
                        items.insert(0, Ext.create('Ext.button.Button', {
                            text: 'Save',
                            handler: 'onSaveClick'
                        }));
                        items.add(Ext.create('Ext.button.Button', {
                            text: 'Reset',
                            handler: 'onResetClick'
                        }));
                    }
                }
            }],
            items: [{
                xtype: 'container',
                html: '<div style="margin: 5px; margin-left: 10px; margin-right: 10px; margin-top: 10px; border-radius: 12px; background-color: #151515; color: #BDBDBD; border: 1px solid #000; opacity: 0.6;"><div style="padding-left: 15px; padding-right: 15px;"><h1 style="text-align: center;">About Project Everquest</h1><p>Project EQ is a team of database and quest developers with a common goal of creating a database as close to the live Everquest experience as possible. We have very high standards about what goes into our database, and who works on it, to provide the highest quality database available. We use only packet collected NPCs and spawn points (with exception of important and rare quest NPCs), and combine all avaliable community information to fill in the gaps that packet collecting leaves behind.</p><p>We are working from Classic everuqest and working through each expansion in turn. Building and tuning each expansion before moving on.</p><p>Currently, the PEQ team is divided into two primary teams. The database team is a very selective team of people, hand-picked by existing database team members. The second team is the quest team. There are very few requirements to be on the quest team beyond the ability to write quests.</p><p>Project EQ also runs an a dedicated EQEmulator server: [PEQ] The Grand Creation. </p></div></div>'
            }, {
                xtype: 'container',
                html: '<div style="margin: 5px; margin-left: 10px; margin-right: 10px; margin-top: 10px; border-radius: 12px; background-color: #151515; color: #BDBDBD; border: 1px solid #000; opacity: 0.6;"><div style="padding-left: 15px; padding-right: 15px;"><h1 style="text-align: center;">About PEQ Database Editor</h1><p>Lets begin with who in the heck I am. My screenname in the EQEMU community is "sotonin". I was active a long long while back but I have been away for a very long time. I created the original PEQ Database Editor that is still being distributed to this day. It has been through a number of tweaks and overhauls but still looks exactly as it was when I created it (layout wise). I have decided to rewrite the whole project from scratch.</p><p>This new version was built using ExtJS 5.0 for the front end and it communicates with a PHP backend that I have on github as an open source project. You are free to install the PHP API onto your own server and manage the whole system yourself, or you can simply install the ExtJS app and leave the API endpoint the default value. What this will do is basically store your database token information (connection info to connect to your EQEMU database) in my database and the full API hosted on my server will manage things for you.</p><p>Security is a top concern of mine, so I have taken a number of precautions. When you create a database connection the password is encrypted prior to being inserted into the database so a plain text password is not stored anywhere. Before this app launches I will be installing a SSL certificate on the API server and will only accept secure traffic.</p></div></div>'
            }, {
                xtype: 'container',
                html: '<div style="margin: 5px; margin-left: 10px; margin-right: 10px; margin-top: 10px; border-radius: 12px; background-color: #151515; color: #BDBDBD; border: 1px solid #000; opacity: 0.6;"><div style="padding-left: 15px; padding-right: 15px;"><h1 style="text-align: center;">PEQ Editor Commit Activity</h1><p id="git_commit_peq"></p></div></div>'
            }, {
                xtype: 'container',
                html: '<div style="margin: 5px; margin-left: 10px; margin-right: 10px; margin-top: 10px; border-radius: 12px; background-color: #151515; color: #BDBDBD; border: 1px solid #000; opacity: 0.6;"><div style="padding-left: 15px; padding-right: 15px;"><h1 style="text-align: center;">PEQ API Commit Activity</h1><p id="git_commit_api"></p></div></div>'
            }]
        }]*/
    }]
});