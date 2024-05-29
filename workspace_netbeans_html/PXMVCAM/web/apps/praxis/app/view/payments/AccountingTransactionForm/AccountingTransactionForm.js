prototype.id = 'AccountingTransactionForm';
prototype.url = CONTEXTPATH + '/AccountingTransaction';
prototype.width = 1800;

Ext.define('Ext.Praxis.view.payments.AccountingTransactionForm.AccountingTransactionForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.AccountingTransactionForm',
    requires: [
        'Ext.Praxis.controller.payments.AccountingTransaction.AccountingTransactionController',
        'Ext.Praxis.view.payments.AccountingTransactionForm.Options',
        'Ext.Praxis.view.payments.AccountingTransactionForm.Filters',
        'Ext.Praxis.view.payments.AccountingTransactionForm.Grids.SummaryGrid'
    ],
    controller: 'AccountingTransactionController',
    layout: {
        type: 'fit'
    },
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            id: prototype.id + '-xpanel',
            border: false,
            autoScroll: false,
            layout: 'fit',
            items: [
                {
                    id: prototype.id + '-form',
                    border: false,
                    bodyCls: 'colorFondo',
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'panel',
                            region: 'center',
                            width: prototype.width,
                            layout: 'border',
                            items: [
                                {
                                    region: 'center',
                                    id: prototype.id + '-centerC',
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    border: true,
                                    autoScroll: true,
                                    defaults: {
                                        width: prototype.width,
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: prototype.id + '-options'
                                        },
                                        {
                                            xtype: prototype.id + '-filters',
                                            id: prototype.id + '-contentFilter'
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-mainContent',
                                            height:630,
                                            layout: {
                                                type: 'vbox',
                                                align: 'center'
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});




