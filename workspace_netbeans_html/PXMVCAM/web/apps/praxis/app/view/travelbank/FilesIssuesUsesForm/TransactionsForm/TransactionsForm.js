
Ext.define('Ext.Praxis.view.travelbank.FilesIssuesUsesForm.TransactionsForm.TransactionsForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id22 + '-transactionsForm',
    controller: 'FormTransactionsController',
    requires: [
        'Ext.Praxis.controller.travelbank.FilesIssuesUses.FormTransactionsController',
        'Ext.Praxis.view.travelbank.FilesIssuesUsesForm.TransactionsForm.Options',
        'Ext.Praxis.view.travelbank.FilesIssuesUsesForm.TransactionsForm.Filters',
        'Ext.Praxis.view.travelbank.FilesIssuesUsesForm.TransactionsForm.Info'
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
                    html: '<strong style="color:#AC4546;font-size:14px;">*Consulta transaction ID</strong>'
                },
                {
                    xtype: prototype.id22 + '-options'
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
                    xtype: prototype.id22 + '-filters'
                }
            ]
        },
        {
            xtype: 'panel', id: prototype.id22 + '-gridMainContem',
            border: false, margin: '1 1 1 1',
            items: [
                {
                    xtype: prototype.id22 + '-info'
                }
            ]
        }
    ]
});
