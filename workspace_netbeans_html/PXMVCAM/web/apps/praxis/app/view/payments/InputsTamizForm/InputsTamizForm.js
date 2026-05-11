
prototype.id = 'InputsTamizForm';
prototype.url = CONTEXTPATH + '/InputsTmz';

Ext.define('Ext.Praxis.view.payments.InputsTamizForm.InputsTamizForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.InputsTamizForm',
    requires: [
        'Ext.Praxis.view.payments.InputsTamizForm.Options',
        'Ext.Praxis.view.payments.InputsTamizForm.Filters',
        'Ext.Praxis.view.payments.InputsTamizForm.Info',
        'Ext.Praxis.view.payments.InputsTamizForm.CalendarTmz',
        'Ext.Praxis.view.payments.InputsTamizForm.Grids.GridDataSummary',
        'Ext.Praxis.view.payments.InputsTamizForm.Grids.GridDataDetailProcessor',
        'Ext.Praxis.view.payments.InputsTamizForm.Grids.GridDataDetailComplement',
        'Ext.Praxis.view.payments.InputsTamizForm.DataEntrys.DaysReceiptSettlementDataEntry',
        'Ext.Praxis.controller.payments.InputsTamiz.InputsTamizController'
    ],
    controller: 'InputsTamizController',
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
                            width: 1500,
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
                                            xtype: prototype.id + '-options',
                                        },
                                        {
                                            xtype: prototype.id + '-filters',
                                            id: prototype.id + '-contentFilter'
                                        },
                                        {
                                            xtype: 'panel',
                                            height: 650,
                                            width: 1400,
                                            layout: 'fit',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    region: 'center',
                                                    id: prototype.id + '-centerC-panel01',
                                                    width: 1400,
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




