Ext.define('peq.view.setup.DBSetup', {
    extend: 'Ext.window.Window',
    
    requires: [
        'peq.view.setup.DBSetupController',
        'Ext.form.Panel',
        'Ext.button.Button',
        'Ext.form.field.Text'
    ],
    
    controller: 'dbsetup',

    bodyPadding: 10,
    title: 'Database Configuration',
    closable: false,
    draggable: false,
    resizable: false,
    id: 'dbsetupWindow-ID',
    //cls: 'login',
    glyph: 0xf1c0,
    width: 600,
    height: 250,
    
    listeners: {
        afterrender: 'onAfterRender'
    },

    items: [{
        layout: 'column',
        items: [{
            columnWidth: 0.5,
            xtype: 'form',
            reference: 'form',
            bodyStyle: {
                backgroundColor: 'transparent'
            },
            items: [{
                xtype: 'textfield',
                name: 'server',
                fieldLabel: 'DB Server',
                allowBlank: false,
                enableKeyEvents: true,
                listeners: {
                    specialKey: 'onSpecialKey'
                }
            }, {
                xtype: 'textfield',
                name: 'username',
                fieldLabel: 'DB Username',
                allowBlank: false,
                enableKeyEvents: true,
                listeners: {
                    specialKey: 'onSpecialKey'
                }
            }, {
                xtype: 'textfield',
                name: 'password',
                inputType: 'password',
                fieldLabel: 'DB Password',
                allowBlank: false,
                enableKeyEvents: true,
                cls: 'password',
                listeners: {
                    specialKey: 'onSpecialKey'
                }
            }, {
                xtype: 'textfield',
                name: 'database',
                fieldLabel: 'DB Name',
                allowBlank: false,
                enableKeyEvents: true,
                listeners: {
                    specialKey: 'onSpecialKey'
                }
            }, {
                xtype: 'container',
                layout: 'column',
                style: {
                    width: '100%'
                },
                autoEl: {
                    align: 'center'
                }
            }, {
                id: 'dbsetupErrorMsg',
                xtype: 'container',
                hidden: true,
                style: {
                    padding: '5px',
                    marginTop: '10px',
                    //backgroundColor: 'red',
                    color: 'red',
                    fontWeight: 'bold'
                },
                autoEl: {
                    align: 'center'
                },
                html: 'Error Messages Go Here...'
            }]
        }, {
            columnWidth: 0.5,
            style: {
                paddingTop: '5px',
                paddingLeft: '15px',
                paddingRight: '15px'
            },
            html: '<i class="fa fa-exclamation-circle fa-5x" style="float: right; color: #666; margin-left: 10px; margin-right: 0px; margin-bottom: 5px;"></i><div style="color: #666; text-indent: 25px;">PEQ Database Editor requires database information before it can connect to your EQEMU database. The database information is stored in the db_tokens table. The information will only be transmitted once, then the app will be given a token.</div>'
        }]
    }],

    buttons: [{
        text: 'Add Connection',
        listeners: {
            click: 'onSubmitClick'
        }
    }]
});
