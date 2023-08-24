prototype.id = 'ChargebackSabreStatusForm';
prototype.url = CONTEXTPATH + '/ChargebackSabreStatus';

Ext.define('Ext.Praxis.view.payments.ChargebackSabreStatusForm.ChargebackSabreStatusForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.ChargebackSabreStatusForm',
    requires: [
        'Ext.Praxis.controller.payments.ChargebackSabreStatus.ChargebackSabreStatusController',
        'Ext.Praxis.view.payments.ChargebackSabreStatusForm.Options',
        'Ext.Praxis.view.payments.ChargebackSabreStatusForm.Filters',
        'Ext.Praxis.view.payments.ChargebackSabreStatusForm.Grids.SabreGrid'
    ],
    controller: 'ChargebackSabreStatusController',
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
                            width: 1400,
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
                                        width: 1400,
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
                                            },
                                            items:[]
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




