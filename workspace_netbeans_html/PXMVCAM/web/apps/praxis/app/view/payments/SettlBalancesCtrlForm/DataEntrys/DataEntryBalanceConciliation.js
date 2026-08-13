
prototype.idDE2 = prototype.id + 'DataEntryBalanceConciliation';

Ext.define('Ext.Praxis.view.payments.SettlBalancesCtrlForm.DataEntrys.DataEntryBalanceConciliation', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id + '-DataEntryBalanceConciliation',
    requires: [
        'Ext.Praxis.controller.payments.SettlBalancesCtrl.DataEntryBalanceConciliationController'
    ],
    controller: 'DataEntryBalanceConciliationController',

    title: 'Balance Conciliation',
    header: true,
    width: 1000,
    height: 600,
    modal: true,
    resizable: false,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [

        {
            xtype: 'form',
            id: prototype.idDE2 + 'BalanceConciliationForm',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
//            margin: '10 0 10 0',
            bodyStyle: {
                backgroundColor: '#e0e0e0',
//                fieldStyle: 'background-color: transparent; border: none; box-shadow: none;'
            },
            bodyPadding: 15,
            defaults: {
                xtype: 'textfield',
                readOnly: true,
                formStyle: 'background-color: transparent; border: none; box-shadow: none;',
                fieldStyle: 'border: none; box-shadow: none;text-align: center'
            },
            items: [
                {
                    xtype: 'textfield',
                    name: 'TDOC',
                    fieldLabel: 'Type Document',
                    labelWidth: 90,
                    width: 130,
                    readOnly: true,
                },
                {
                    xtype: 'textfield',
                    name: 'SALDO',
                    fieldLabel: 'Balance Amount',
                    labelWidth: 95,
                    width: 180,
                    margin: '0 0 0 20',
                    readOnly: true,
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Credit Card Number',
                    name: 'SCARDN',
                    labelWidth: 115,
                    width: 250,
                    margin: '0 0 0 20',
                    readOnly: true,
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Credit Card Auth',
                    name: 'SAUTHOC',
                    labelWidth: 100,
                    width: 180,
                    margin: '0 0 0 20',
                    readOnly: true,
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Diff. Type',
                    name: 'DESC_AJUSTE',
                    labelWidth: 60,
                    width: 110,
                    margin: '0 0 0 20',
                    readOnly: true,
                }
            ]
        },
        {
            xtype: 'form',
//            id: prototype.idDE2 + 'BalanceConciliationDataEntry',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            flex: 1,
//            id: prototype.idDE2 + 'BalanceConciliationGrid',

            items: [
                {
                    xtype: 'grid',
//                    reference: 'balanceConciliationGrid',
                    id: prototype.idDE2 + '-BalanceConciliationGrid',
                    flex: 1,
                    margin: '0 5 0 0',
                    selModel: {
                        selType: 'checkboxmodel',
                        mode: 'SINGLE', // Solo una fila a la vez
                        checkOnly: true // Selecciona  usando el checkbox
                    },
                    columns: [
                        {text: 'Ticket', dataIndex: 'TICKET', width: 140},
                        {
                            text: 'Credit Card',
                            columns: [
                                {text: 'Code', dataIndex: 'SCARDCOD',
                                    width: 90,
                                    flex: 1
                                },
                                {text: 'Number', dataIndex: 'SCARDN', width: 190},
                                {text: 'Auth.', dataIndex: 'SAUTHOC', width: 90}
                            ]
                        },
                        {text: 'Processing Date', dataIndex: 'SDATE', width: 140},
                        {text: 'Moneda', dataIndex: 'MONEDA', width: 100},
                        {text: 'Balance Amount', dataIndex: 'SALDO',
//                            width: 120,
                            flex: 1,
                            renderer: function (value, metaData, record) {
                                return Ext.util.Format.number(value, '0,000');
                            }
                        }
                    ],

                    bbar: {
                        xtype: 'pagingtoolbar',
                        displayInfo: true
                    },
                    listeners: {
                        selectionchange: function (selModel, selected) {
                            var updateBtn = Ext.getCmp(prototype.idDE2 + '-btn-update');
//                            if (selected.length > 0) {
//                                updateBtn.setDisabled(false);
//                            } else {
//                                updateBtn.setDisabled(true);
//                            }
                        }
                    }
                },
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    ui: 'footer',
                    margin: '7 0 7 0',
                    layout: {
                        pack: 'center'
                    },
                    defaults: {
                        scale: 'medium'
                    },
                    items: [
                        {
                            text: 'Process',
                            id: prototype.idDE2 + '-btn-update',
                            reference: 'btnUpdateDataEntryBalanceConciliation',
                            iconCls: 'prx-icon-image-process',
                            disabled: true,
                            listeners: {
                                click: 'onUpdateClick'
                            }
                        },
                        {
                            text: 'Cancel',
                            id: prototype.idDE2 + '-btn-cancel',
                            iconCls: 'prx-icon-cancel',
                            listeners: {
                                click: 'onCancelClick'
                            }
                        },
                    ]
                }
            ]
        }
    ]
});
