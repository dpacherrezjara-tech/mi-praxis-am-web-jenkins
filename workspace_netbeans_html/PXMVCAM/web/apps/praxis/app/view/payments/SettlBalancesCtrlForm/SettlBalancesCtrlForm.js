// <editor-fold defaultstate="collapsed" desc="prototype">
prototype.id = 'SettlBalancesCtrlForm';
prototype.width = 1800;
// </editor-fold>

Ext.define('Ext.Praxis.view.payments.SettlBalancesCtrlForm.SettlBalancesCtrlForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.SettlBalancesCtrlForm',
    requires: [
        'Ext.Praxis.controller.payments.SettlBalancesCtrl.SettlBalancesCtrlController',
        'Ext.Praxis.view.payments.SettlBalancesCtrlForm.Options',
        'Ext.Praxis.view.payments.SettlBalancesCtrlForm.Filters',
        'Ext.Praxis.view.payments.SettlBalancesCtrlForm.Grids.SettlBalancesCtrlGrid', //cuando solo es una grilla se llama directamente
//        'Ext.Praxis.view.payments.SettlBalancesCtrlForm.DataEntrys.DataEntrySettlBalances'    //no necesita
//        'Ext.Praxis.view.payments.SettlBalancesCtrlForm.Grids.DataEntryBalanceConciliation',
    ],
    controller: 'SettlBalancesCtrlController',
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