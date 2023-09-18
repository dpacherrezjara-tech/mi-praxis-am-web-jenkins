prototype.id = 'SalesReconciliationControlForm';
prototype.url = CONTEXTPATH + '/SalesReconciliationBPO';
prototype.width = 1750;
prototype.height = 630;

Ext.define('Ext.Praxis.view.payments.SalesReconciliationControlForm.SalesReconciliationControlForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.SalesReconciliationControlForm',
    requires: [
        'Ext.Praxis.controller.payments.SalesReconciliationControl.SalesReconciliationControlController',
        'Ext.Praxis.view.payments.SalesReconciliationControlForm.Filters',
        'Ext.Praxis.view.payments.SalesReconciliationControlForm.Options',
        'Ext.Praxis.view.payments.SalesReconciliationControlForm.Grids.ByPaymentMonthSummaryGrid',
        'Ext.Praxis.view.payments.SalesReconciliationControlForm.Grids.ByPaymentDetailGrid',
        'Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.TransacErrorBPODataEntry'
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
                                            xtype: prototype.id + '-filters',
                                            id: prototype.id + '-contentFilter'
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




