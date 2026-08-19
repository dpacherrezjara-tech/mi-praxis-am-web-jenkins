prototype.id = 'SalesReconciliationDiff';
prototype.url = CONTEXTPATH + '/SalesReconciliationDiff';
prototype.width = 1850;
prototype.height = 630;

Ext.define('Ext.Praxis.view.payments.SalesReconciliationDifferencesForm.SalesReconciliationDifferencesForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.SalesReconciliationDifferencesForm',
    requires: [
        'Ext.Praxis.controller.payments.SalesReconciliationDifferences.SalesReconciliationDifferencesController',
        'Ext.Praxis.view.payments.SalesReconciliationDifferencesForm.Grids.SummaryGrid',
        'Ext.Praxis.view.payments.SalesReconciliationDifferencesForm.Grids.SummaryMerchantGrid',
        'Ext.Praxis.view.payments.SalesReconciliationDifferencesForm.Filters',
        'Ext.Praxis.view.payments.SalesReconciliationDifferencesForm.Options',
        'Ext.Praxis.view.payments.SalesReconciliationDifferencesForm.DataEntrys.ProcessDataEntry'
    ],
    controller: 'SalesReconciliationDifferencesController',
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
                                            //xtype: prototype.id + '-filtersByTicket',
                                            id: prototype.id + '-contentFilter',
                                            xtype: 'panel',
                                            border: false,
                                            defaults: {
                                                width: prototype.width,
                                                align: 'center'
                                            },
                                            items: [
                                                {
                                                    xtype: prototype.id + '-filters',
                                                    id: prototype.id + '-filters'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-mainContent',
                                            height: prototype.height,
                                            bodyStyle: 'background-color: #E3EAF9;',
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




