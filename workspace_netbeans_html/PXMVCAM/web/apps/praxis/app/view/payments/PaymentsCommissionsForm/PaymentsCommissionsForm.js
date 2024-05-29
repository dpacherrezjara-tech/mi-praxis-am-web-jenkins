prototype.id = 'PaymentsCommissions';
prototype.url = CONTEXTPATH + '/PaymentsCommissions';
prototype.width = 1700;
prototype.height = 630;

Ext.define('Ext.Praxis.view.payments.PaymentsCommissionsForm.PaymentsCommissionsForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.PaymentsCommissionsForm',
    requires: [
        'Ext.Praxis.controller.payments.PaymentsCommissions.PaymentsCommissionsController',
        'Ext.Praxis.view.payments.PaymentsCommissionsForm.Grids.MainGrid',
        'Ext.Praxis.view.payments.PaymentsCommissionsForm.Filters',
        'Ext.Praxis.view.payments.PaymentsCommissionsForm.Options',
        'Ext.Praxis.view.payments.PaymentsCommissionsForm.DataEntrys.CommissionDataEntry'
    ],
    controller: 'PaymentsCommissionsController',
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




