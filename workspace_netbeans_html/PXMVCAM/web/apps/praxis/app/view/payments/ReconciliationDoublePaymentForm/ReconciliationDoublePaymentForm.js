
prototype.id = 'ReconciliationDoublePaymentForm';
prototype.url = CONTEXTPATH + '/ReconciliationDoublePayment';

Ext.define('Ext.Praxis.view.payments.ReconciliationDoublePaymentForm.ReconciliationDoublePaymentForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.ReconciliationDoublePaymentForm',
    requires: [
        'Ext.Praxis.view.payments.ReconciliationDoublePaymentForm.Options',
        'Ext.Praxis.view.payments.ReconciliationDoublePaymentForm.Filters',
        'Ext.Praxis.view.payments.ReconciliationDoublePaymentForm.Info',
        'Ext.Praxis.controller.payments.ReconciliationDoublePayment.ReconciliationDoublePaymentController'
    ],
    controller: 'ReconciliationDoublePaymentController',
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
//                    defaults: {
//                        border: false,
//                        autoScroll: true
//                    },
                    items: [
                        {
                            xtype: 'panel',
                            region: 'center',
                            width: 1800,
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
                                        width: 1800,
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: prototype.id + '-options'
                                        }
                                        ,
                                        {
                                            xtype: prototype.id + '-filters',
                                            id: prototype.id + '-contentFilter',
                                            hidden: false
                                        }
                                        ,
                                        {
                                            xtype: 'panel',
                                            height: 600,
                                            width: 1800,
                                            layout: 'fit',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id + '-centerC-panel01',
                                                    width: 1800,
                                                    layout: 'border',
                                                    align: 'center',
                                                    border: true,
                                                    defaults: {
                                                        border: false
                                                    },
                                                    bodyStyle: 'background-color: white;',
                                                    items: [
                                                        {
                                                            region: 'center',
                                                            xtype: prototype.id + '-info',
                                                            id: prototype.id + '-contentInfo'
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
                }
            ]
        }
    ]
});




