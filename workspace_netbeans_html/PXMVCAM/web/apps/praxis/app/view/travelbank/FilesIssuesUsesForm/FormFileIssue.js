
Ext.define('Ext.Praxis.view.travelbank.FilesIssuesUsesForm.FormFileIssue', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-formFileIssue',
    controller: 'FormFileIssueController',
    requires: [
        'Ext.Praxis.controller.travelbank.FilesIssuesUses.FormFileIssueController',
        'Ext.Praxis.view.travelbank.FilesIssuesUsesForm.FormFileIssueOptions',
        'Ext.Praxis.view.travelbank.FilesIssuesUsesForm.FormFileIssueFilters',
        'Ext.Praxis.view.travelbank.FilesIssuesUsesForm.FormFileIssueInfo'
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
                    xtype: prototype.id + '-formFileIssueOptions'
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
                    xtype: prototype.id + '-formFileIssueFilters'
                }
            ]
        },
        {
            xtype: 'panel', id: prototype.id + '-gridMainContem',
            border: false, margin: '1 1 1 1',
            items: [
                {
                    xtype: prototype.id + '-formFileIssueInfo'
                }
            ]
        }
    ]
});
