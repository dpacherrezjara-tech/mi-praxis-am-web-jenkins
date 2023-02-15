
Ext.define('Ext.Praxis.view.travelbank.FilesIssuesUsesForm.UsedForm.FileUsedForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id06 + '-fileUsedForm',
    controller: 'FormFileUsedController',
    requires: [
        'Ext.Praxis.controller.travelbank.FilesIssuesUses.FormFileUsedController',
        'Ext.Praxis.view.travelbank.FilesIssuesUsesForm.UsedForm.Options',
        'Ext.Praxis.view.travelbank.FilesIssuesUsesForm.UsedForm.Filters',
        'Ext.Praxis.view.travelbank.FilesIssuesUsesForm.UsedForm.Info'
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
                    xtype: prototype.id06 + '-options'
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
                    xtype: prototype.id06 + '-filters'
                }
            ]
        },
        {
            xtype: 'panel', id: prototype.id06 + '-gridMainContem',
            border: false, margin: '1 1 1 1',
            items: [
                {
                    xtype: prototype.id06 + '-info'
                }
            ]
        }
    ]
});
