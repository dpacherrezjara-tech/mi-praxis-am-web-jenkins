prototype.id = 'AccountingMasterProcessForm';
prototype.url = CONTEXTPATH + '/AccountingMasterProcess';
prototype.width = 1800;

Ext.define('Ext.Praxis.view.payments.AccountingMasterProcessForm.AccountingMasterProcessForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.AccountingMasterProcessForm',
    requires: [
        'Ext.Praxis.controller.payments.AccountingMasterProcess.AccountingMasterProcessController',
        'Ext.Praxis.view.payments.AccountingMasterProcessForm.Options',
        'Ext.Praxis.view.payments.AccountingMasterProcessForm.Filters',
        'Ext.Praxis.view.payments.AccountingMasterProcessForm.Grids.AccountingProcessGrid',
        'Ext.Praxis.view.payments.AccountingMasterProcessForm.DataEntrys.ConsistencyDataEntry',
        'Ext.Praxis.view.payments.AccountingMasterProcessForm.DataEntrys.AccountingExecuteDataEntry',
        'Ext.Praxis.view.payments.AccountingMasterProcessForm.DataEntrys.LogAccountingProcessDataEntry'
    ],
    controller: 'AccountingMasterProcessController',
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
                                            height: 630,
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
