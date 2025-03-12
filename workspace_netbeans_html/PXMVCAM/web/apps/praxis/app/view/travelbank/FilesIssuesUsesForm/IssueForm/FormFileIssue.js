
Ext.define('Ext.Praxis.view.travelbank.FilesIssuesUsesForm.IssueForm.FormFileIssue', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id02 + '-formFileIssue',
    controller: 'FormFileIssueController',
    requires: [
        'Ext.Praxis.controller.travelbank.FilesIssuesUses.FormFileIssueController',
        'Ext.Praxis.view.travelbank.FilesIssuesUsesForm.IssueForm.FormFileIssueOptions',
        'Ext.Praxis.view.travelbank.FilesIssuesUsesForm.IssueForm.FormFileIssueFilters',
        'Ext.Praxis.view.travelbank.FilesIssuesUsesForm.IssueForm.FormFileIssueInfo'
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
                    xtype: prototype.id02 + '-formFileIssueOptions'
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
                    xtype: prototype.id02 + '-formFileIssueFilters'
                }
            ]
        },
        {
            xtype: 'panel', id: prototype.id02 + '-gridMainContem',
            border: false, margin: '1 1 1 1',
            items: [
                {
                    xtype: prototype.id02 + '-formFileIssueInfo'
                }
            ]
        }
    ]
});
