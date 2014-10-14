Ext.define('peq.view.setup.Login', {
    extend: 'Ext.window.Window',
    
    requires: [
        'peq.view.setup.LoginController',
        'Ext.form.Panel',
        'Ext.button.Button',
        'Ext.form.field.Text',
        'Ext.form.field.ComboBox'
    ],
    
    controller: 'login',

    bodyPadding: 10,
    title: 'Project Everquest Login',
    closable: false,
    draggable: false,
    resizable: false,
    id: 'loginWindow-ID',
    cls: 'login',
    glyph: 0xf023,
    width: 600,
    
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
                name: 'username',
                fieldLabel: 'Username',
                allowBlank: false,
                enableKeyEvents: true,
                listeners: {
                    specialKey: 'onSpecialKey'
                }
            }, {
                xtype: 'textfield',
                name: 'password',
                inputType: 'password',
                fieldLabel: 'Password',
                allowBlank: false,
                enableKeyEvents: true,
                cls: 'password',
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
                id: 'loginErrorMsg',
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
                paddingTop: '0px',
                paddingLeft: '15px',
                paddingRight: '15px'
            },
            html: '<i class="fa fa-exclamation-circle fa-4x" style="float: right; color: #666; margin-left: 10px; margin-right: 0px; margin-bottom: 5px;"></i><div style="color: #666; text-indent: 25px;">Please provide the login credentials to the PEQ Database Editor. The default admin account is "admin" and "password".</div>'
        }]
    }],

    buttons: [{
        text: 'Login',
        listeners: {
            click: 'onLoginClick'
        }
    }]
});
