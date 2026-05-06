prototype.id = 'SalesReconciliationControlForm';
prototype.url = CONTEXTPATH + '/SalesReconciliationBPO';
prototype.width = 1850;
prototype.height = 630;
fechaActual = new Date(),mesActual = fechaActual.getMonth(),anioActual = fechaActual.getFullYear();

Ext.define('Ext.Praxis.view.payments.SalesReconciliationControlForm.SalesReconciliationControlForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.SalesReconciliationControlForm',
    requires: [
        'Ext.Praxis.controller.payments.SalesReconciliationControl.SalesReconciliationControlController',
        'Ext.Praxis.view.payments.SalesReconciliationControlForm.FiltersByPayment',
        'Ext.Praxis.view.payments.SalesReconciliationControlForm.FiltersByTicket',
        'Ext.Praxis.view.payments.SalesReconciliationControlForm.FiltersSettlement',
        'Ext.Praxis.view.payments.SalesReconciliationControlForm.Options',
        'Ext.Praxis.view.payments.SalesReconciliationControlForm.Grids.ByPaymentMonthSummaryGrid',
        'Ext.Praxis.view.payments.SalesReconciliationControlForm.Grids.ByTicketMonthSummaryGrid',
        'Ext.Praxis.view.payments.SalesReconciliationControlForm.Grids.ByPaymentDetailGrid',
        'Ext.Praxis.view.payments.SalesReconciliationControlForm.Grids.ByTicketDetailGrid',
        'Ext.Praxis.view.payments.SalesReconciliationControlForm.Grids.SettlementSummaryGrid',
        'Ext.Praxis.view.payments.SalesReconciliationControlForm.Grids.SettlementMerchantGrid',
        'Ext.Praxis.view.payments.SalesReconciliationControlForm.Grids.SettlementDetailGrid',
        'Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.TransacErrorBPODataEntry',
        'Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.CouponsUsagesDataEntry',
        'Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.BPOProductionDataEntry',
        'Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.CreditCardFilterDataEntry',
        'Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.AddTicketDataEntry',
        'Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.AnalyzeReconciliationErrorsDataEntry'
    ],
    controller: 'SalesReconciliationControlController',
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
                                            id: prototype.id + '-contentFilter',
                                            xtype: 'panel',
                                            border: false,
                                            defaults: {
                                                width: prototype.width,
                                                align: 'center'
                                            },
                                            items: [
                                                {
                                                    xtype: prototype.id + '-filtersByPayment',
                                                    id: prototype.id + '-filtersByPayment-1'
                                                },
                                                {
                                                    xtype: prototype.id + '-filtersByTicket',
                                                    id: prototype.id + '-filtersByTicket-1',
                                                    hidden: true
                                                },
                                                {
                                                    xtype: prototype.id + '-filtersSettlement',
                                                    id: prototype.id + '-filtersSettl-1',
                                                    hidden: true
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
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-mainContent2',
                                            hidden: true,
                                            height: prototype.height,
                                            bodyStyle: 'background-color: #E3EAF9;',
                                            layout: {
                                                type: 'vbox',
                                                align: 'center'
                                            }
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-mainContentSettl',
                                            hidden: true,
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




