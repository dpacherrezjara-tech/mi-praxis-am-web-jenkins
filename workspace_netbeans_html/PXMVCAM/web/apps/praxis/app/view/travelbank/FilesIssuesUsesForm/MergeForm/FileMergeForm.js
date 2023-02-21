
Ext.define('Ext.Praxis.view.travelbank.FilesIssuesUsesForm.MergeForm.FileMergeForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id17 + '-fileMergeForm',
    controller: 'FormFileMergeController',
    requires: [
        'Ext.Praxis.controller.travelbank.FilesIssuesUses.FormFileMergeController',
        'Ext.Praxis.view.travelbank.FilesIssuesUsesForm.MergeForm.Options',
        'Ext.Praxis.view.travelbank.FilesIssuesUsesForm.MergeForm.Filters',
        'Ext.Praxis.view.travelbank.FilesIssuesUsesForm.MergeForm.Info'
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
                    html: '<strong style="color:#AC4546;font-size:14px;">*Merge</strong>'
                },
                {
                    xtype: prototype.id17 + '-options'
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
                    xtype: prototype.id17 + '-filters'
                }
            ]
        },
        {
            xtype: 'panel', id: prototype.id17 + '-gridMainContem',
            border: false, margin: '1 1 1 1',
            items: [
                {
                    xtype: prototype.id17 + '-info'
                }
            ]
        }
    ]
});
