
prototype.id = 'SalesComplementForm';
prototype.url = CONTEXTPATH + '/SalesComplement';

Ext.define('Ext.Praxis.view.payments.SalesComplementForm.SalesComplementForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.SalesComplementForm',
    requires: [
        'Ext.Praxis.view.payments.SalesComplementForm.Options',
        'Ext.Praxis.view.payments.SalesComplementForm.Filters',
        'Ext.Praxis.view.payments.SalesComplementForm.GridData',
        'Ext.Praxis.view.payments.SalesComplementForm.GridDataTicket',
        'Ext.Praxis.controller.payments.SalesComplement.SalesComplementController',
        'Ext.Praxis.view.payments.SalesComplementForm.PnrDataEntry'
    ],
    controller: 'SalesComplementController',
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
            items:[
                {
                    id: prototype.id + '-form',
                    border: false,
                    bodyCls: 'colorFondo',
                    layout: 'fit',
                    items:[
                        {
                            xtype: 'panel',
                            region: 'center',
                            width: 980,
                            layout: 'border',
                            items:[
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
                                        width: 1850,
                                        align: 'center'
                                    },
                                    items:[
                                        {
                                            xtype: prototype.id + '-options'
                                        },
                                        {
                                            xtype: prototype.id + '-filters',
                                            id: prototype.id + '-contentFilter'
                                        },
                                        {
                                            xtype: 'panel',
                                            height: 610,
                                            width: 1850,
                                            layout: 'fit',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id + '-centerC-panel01',
                                                    width: 1850,
                                                    layout: 'border',
                                                    align: 'center',
                                                    border: true,
                                                    defaults: {
                                                        border: false
                                                    },
                                                    bodyStyle: 'background-color: white;',
                                                    items: []
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




