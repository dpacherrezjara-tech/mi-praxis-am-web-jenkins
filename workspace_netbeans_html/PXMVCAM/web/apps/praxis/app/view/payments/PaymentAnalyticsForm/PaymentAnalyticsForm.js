prototype.id = 'PaymentAnalyticsForm';
prototype.width = 1800;

Ext.define('Ext.Praxis.view.payments.PaymentAnalyticsForm.PaymentAnalyticsForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.PaymentAnalyticsForm',
    requires: [
        'Ext.Praxis.controller.payments.PaymentAnalytics.PaymentAnalyticsController',
        'Ext.Praxis.view.payments.PaymentAnalyticsForm.Options',
        'Ext.Praxis.view.payments.PaymentAnalyticsForm.Filters',
        'Ext.Praxis.view.payments.PaymentAnalyticsForm.Grids.AnalyticsSettlementGrid',
        'Ext.Praxis.view.payments.PaymentAnalyticsForm.Grids.AnalyticsAccountingGrid',
        'Ext.Praxis.controller.payments.PaymentAnalytics.AnalyticsSettlementGridController',
        'Ext.Praxis.controller.payments.PaymentAnalytics.AnalyticsAccountingGridController'
    ],
    controller: 'PaymentAnalyticsController',
    layout: {
        type: 'fit'
    },
    padding: '0 0 0 0',
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
                                            bodyStyle: 'background-color: #E3EAF9;',
                                            height: 630,
                                            layout: {
                                                type: 'vbox',
                                                align: 'center'
                                            },
                                            items: [
                                            ]
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
