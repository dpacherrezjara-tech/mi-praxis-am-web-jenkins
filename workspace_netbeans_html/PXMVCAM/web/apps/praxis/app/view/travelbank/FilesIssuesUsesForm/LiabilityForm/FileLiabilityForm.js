
Ext.define('Ext.Praxis.view.travelbank.FilesIssuesUsesForm.LiabilityForm.FileLiabilityForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id19 + '-fileLiabilityForm',
    controller: 'FormFileLiabilityController',
    requires: [
        'Ext.Praxis.controller.travelbank.FilesIssuesUses.FormFileLiabilityController',
        'Ext.Praxis.view.travelbank.FilesIssuesUsesForm.LiabilityForm.Options',
        'Ext.Praxis.view.travelbank.FilesIssuesUsesForm.LiabilityForm.Filters',
        'Ext.Praxis.view.travelbank.FilesIssuesUsesForm.LiabilityForm.Info'
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
                    html: '<strong style="color:#AC4546;font-size:14px;">*Liability</strong>'
                },
                {
                    xtype: prototype.id19 + '-options'
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
                    xtype: prototype.id19 + '-filters'
                }
            ]
        },
        {
            xtype: 'panel', id: prototype.id19 + '-gridMainContem',
            border: false, margin: '1 1 1 1',
            items: [
                {
                    xtype: prototype.id19 + '-info'
                }
            ]
        }
    ]
});
