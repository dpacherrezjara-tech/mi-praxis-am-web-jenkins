prototype.idDE = prototype.id + 'DataEntrySettlBalances';

Ext.define('Ext.Praxis.view.payments.SettlBalancesCtrlForm.DataEntrys.DataEntrySettlBalances', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntrySettlBalances',

    requires: [
        'Ext.Praxis.controller.payments.SettlBalancesCtrl.DataEntrySettlBalancesCtrlController'
    ],

    controller: 'DataEntrySettlBalancesCtrlController',
    title: 'Settlement Balances',
    header: true,
    width: 1000,
    modal: true,
    resizable: false,
    layout: 'fit',

    items: [
        {
            xtype: 'form',
            id: prototype.idDE + '-informationForm',
            reference: 'informationForm',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            bodyPadding: 15,
            defaults: {
                xtype: 'fieldset',
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                margin: '10 0',
                style: {
                    backgroundColor: '#fafafa',
                    borderColor: '#d0d0d0'
                },
                defaults: {
                    xtype: 'container',
                    layout: 'hbox',
                    defaults: {
                        xtype: 'textfield',
                        flex: 1,
                        margin: '4',
                        labelWidth: 100,
                        labelAlign: 'right',
                        labelStyle: 'font-weight:bold;',
                        fieldStyle: 'text-align:center; background-color: #EEF3F9;',
                        editable: false,
//                        readOnly: true
                    }
                }
            },
            items: [
                // Ticket Information
                {
                    title: 'Ticket Information',
                    items: [
                        {
                            items: [
                                {fieldLabel: 'Ticket', name: 'TICKET', readOnly: true, labelWidth: 50},
                                {fieldLabel: 'Seq', name: 'SEQ', readOnly: true, },
                                {fieldLabel: 'CORRL', name: 'CORRL', readOnly: true},
                                {fieldLabel: 'Rolling', name: 'SEQROLL', readOnly: true},
                                {fieldLabel: 'Transaction', name: 'TRNCU', readOnly: true}
                            ]
                        }
                    ]
                },
                // Credit Card
                {
                    title: 'Credit Card',
                    items: [
                        {
                            items: [
                                {fieldLabel: 'Code', name: 'SCARDCOD', readOnly: true},
                                {fieldLabel: 'Number', name: 'SCARDN', readOnly: true},
                                {fieldLabel: 'Auth.', name: 'SAUTHOC', readOnly: true}
                            ]
                        }
                    ]
                },
                // Processing Info
                {
                    title: 'Processing Info',
                    items: [
                        {
                            items: [
                                {fieldLabel: 'Processing Date', name: 'SDATE', readOnly: true},
                                {fieldLabel: 'Ref. Number', name: 'AREFNBR', readOnly: true},
                                {fieldLabel: 'Processor', name: 'DESC_PRO', readOnly: true}
                            ]
                        },
                        {
                            items: [
                                {fieldLabel: 'Settl. Amount', name: 'TGROSAMOUN', readOnly: true},
                                {fieldLabel: 'Currency', name: 'MONEDA', readOnly: true},
                                {fieldLabel: 'Error Code', name: 'CERROR', readOnly: true}
                            ]
                        },
                        {
                            items: [
                                {fieldLabel: 'Balance Amount', name: 'SALDO', readOnly: true},
                                {fieldLabel: 'Status', name: 'DESC_STVAL', readOnly: true},
                                {fieldLabel: 'Diff. Type', name: 'DESC_AJUSTE', readOnly: true}
                            ]
                        }
                    ]
                },
                // Control Data
                {
                    title: 'Control Data',
                    items: [
                        {
                            items: [
                                {fieldLabel: 'User Created', name: 'USCR', readOnly: true},
                                {fieldLabel: 'Date Created', name: 'FECR', readOnly: true},
                                {fieldLabel: 'Hour Created', name: 'HOCR', readOnly: true}
                            ]
                        },
                        {
                            items: [
                                {fieldLabel: 'User Updated', name: 'USUP', readOnly: true},
                                {fieldLabel: 'Date Updated', name: 'FEUP', readOnly: true},
                                {fieldLabel: 'Hour Updated', name: 'HOUP', readOnly: true}
                            ]
                        }
                    ]
                },

                {
                    xtype: 'fieldset',
                    title: 'Proceed Option',
//                    xtype: 'container',
                    id: prototype.idDE + '-proceedRadioGroup',
                    layout: 'hbox',
//                    margin: '10 0 0 10',
                    style: {
//                        border: 'none',
                        background: 'transparent'
                    },
                    items: [
                        {
                            xtype: 'radiogroup',
                            labelWidth: 60,
                            columns: 2,
                            items: [
                                {
                                    xtype: 'radio',
                                    boxLabel: 'Proceed',
                                    name: 'proceedStatus',
                                    inputValue: '1',
                                    id: prototype.idDE + '-proceed'
                                },
                                {
                                    xtype: 'radio',
                                    boxLabel: 'Do Not Proceed',
                                    name: 'proceedStatus',
                                    inputValue: '2',
                                    id: prototype.idDE + '-doNotProceed'
                                }
                            ]
                        }
                    ]
                }







            ]
        }
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
                    text: 'Update',
                    id: prototype.idDE + '-btn-update',
                    iconCls: 'prx-icon-update',
                    hidden:true,
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.idDE + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                },
                {
                    text: 'Balance',
                    id: prototype.idDE + '-btn-balance',
//                    iconCls: 'prx-icon-detail';
                    iconCls: 'prx-icon-image-log',
                    listeners: {
                        click: 'onClickBalanceConciliation'
                    }
                }
            ]
        }
    ]
});
