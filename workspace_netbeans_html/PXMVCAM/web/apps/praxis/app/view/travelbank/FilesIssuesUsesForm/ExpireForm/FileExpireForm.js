
Ext.define('Ext.Praxis.view.travelbank.FilesIssuesUsesForm.ExpireForm.FileExpireForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id11 + '-fileExpireForm',
    controller: 'FormFileExpireController',
    requires: [
        'Ext.Praxis.controller.travelbank.FilesIssuesUses.FormFileExpireController',
        'Ext.Praxis.view.travelbank.FilesIssuesUsesForm.ExpireForm.Options',
        'Ext.Praxis.view.travelbank.FilesIssuesUsesForm.ExpireForm.Filters',
        'Ext.Praxis.view.travelbank.FilesIssuesUsesForm.ExpireForm.Info'
    ],
    border: false,
    layout: {
        type: 'vbox',
        layout: 'fit',
        padding: 1
    },
    defaults: {
        width: '100%'
    },
    items: [
        {
            xtype: 'panel',
            border: false,
            layout: {
                type: 'hbox',
                pack: 'end',
                padding: 1
            },
            items: [
               {
                    xtype: 'label',
                    labelAlign: 'center',
                    width: 150,
                    padding: '2px 5px 2px 3px',
                    html: '<strong style="color:#AC4546;font-size:14px;">*Expire</strong>'
                },
                {
                    xtype: prototype.id11 + '-options'
                }
            ]
        },
        {
            xtype: 'panel',
            border: false,
            layout: {
                padding: 1
            },
            items: [
                {
                    xtype: prototype.id11 + '-filters'
                }
            ]
        },
        {
            xtype: 'panel', id: prototype.id11 + '-gridMainContem',
            border: false, margin: '1 1 1 1',
            items: [
                {
                    xtype: prototype.id11 + '-info'
                }
            ]
        }
    ]
});
