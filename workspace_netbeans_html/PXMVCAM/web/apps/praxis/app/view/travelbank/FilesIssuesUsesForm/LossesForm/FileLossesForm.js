
Ext.define('Ext.Praxis.view.travelbank.FilesIssuesUsesForm.LossesForm.FileLossesForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id15 + '-fileLossesForm',
    controller: 'FormFileLossesController',
    requires: [
        'Ext.Praxis.controller.travelbank.FilesIssuesUses.FormFileLossesController',
        'Ext.Praxis.view.travelbank.FilesIssuesUsesForm.LossesForm.Options',
        'Ext.Praxis.view.travelbank.FilesIssuesUsesForm.LossesForm.Filters',
        'Ext.Praxis.view.travelbank.FilesIssuesUsesForm.LossesForm.Info'
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
                    html: '<strong style="color:#AC4546;font-size:14px;">*Losses</strong>'
                },
                {
                    xtype: prototype.id15 + '-options'
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
                    xtype: prototype.id15 + '-filters'
                }
            ]
        },
        {
            xtype: 'panel', id: prototype.id15 + '-gridMainContem',
            border: false, margin: '1 1 1 1',
            items: [
                {
                    xtype: prototype.id15 + '-info'
                }
            ]
        }
    ]
});
