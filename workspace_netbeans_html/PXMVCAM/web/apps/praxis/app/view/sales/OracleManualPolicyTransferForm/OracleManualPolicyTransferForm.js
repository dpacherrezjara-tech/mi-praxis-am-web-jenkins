prototype.id = 'OracleManualPolicyTransferForm';
prototype.url = CONTEXTPATH + '/OracleManualPolicyTransfer';
prototype.width = 1800;
prototype.idDE = prototype.id + '-PolicyLoadDataEntry';
prototype.idDD = prototype.id + '-PolicyLoadDrilldown';

Ext.define('Ext.Praxis.view.sales.OracleManualPolicyTransferForm.OracleManualPolicyTransferForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.OracleManualPolicyTransferForm',
    requires: [
        'Ext.Praxis.controller.sales.OracleManualPolicyTransfer.OracleManualPolicyTransferController',
        'Ext.Praxis.view.sales.OracleManualPolicyTransferForm.Options',
        'Ext.Praxis.view.sales.OracleManualPolicyTransferForm.Filters',
        'Ext.Praxis.view.sales.OracleManualPolicyTransferForm.Grids.MainGrid',
        'Ext.Praxis.view.sales.OracleManualPolicyTransferForm.DataEntrys.PolicyLoadDataEntry',
        'Ext.Praxis.view.sales.OracleManualPolicyTransferForm.DataEntrys.PolicyLoadDrilldown'
    ],
    controller: 'OracleManualPolicyTransferController',
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
