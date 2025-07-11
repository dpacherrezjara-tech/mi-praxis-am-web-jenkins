prototype.idDE = prototype.id + 'DataEntrySettlBalances';

Ext.define('Ext.Praxis.view.payments.SettlBalancesCtrlForm.DataEntrys.DataEntrySettlBalances', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntrySettlBalances',
    requires: [
        'Ext.Praxis.controller.payments.SettlBalancesCtrl.DataEntrySettlBalancesCtrlController'
    ],
    controller: 'DataEntrySettlBalancesCtrlController',
    title: 'Form',
    header: true,
//    height: 390,
    width: 1200,
    border: false,
    resizable: false,
    layout: 'fit',
    modal: true,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'form',
            id: prototype.idDE + '-informationForm',
            layout: {
                type: 'vbox',
                pack: 'center'
            },
            border: false,
            width: '100%',
            defaults: {
                xtype: 'fieldset',
                layout: {
                    type: 'vbox',
                    pack: 'center'
                },
                border: true,
                margin: '2 2 2 2',
                width: '100%',
                style: {
                    backgroundColor: '#efe5e5' // Cambiar el color de fondo a gris claro (#f0f0f0)
                },
                defaults: {
                    xtype: 'panel',
                    layout: {
                        type: 'hbox',
                        pack: 'left'
                    },
                    width: '100%',
                    border: false,
                    bodyStyle: 'background: transparent',
                    defaults: {
                        xtype: 'textfield',
                        margin: '2 5 2 5',
                        labelStyle: 'text-align:left;font-weight: bolder;',
                        fieldStyle: 'text-align:center;',
                        editable: false
                    }
                }
            },
            items: [
                {
                    items: [
                        {
                            items: [
                                {
                                    fieldLabel: 'Ticket',
                                    name: 'TICKET',
                                    labelWidth: 60,
                                    width: 200
                                },
                                {
                                    fieldLabel: 'Seq',
                                    name: 'SEQ',
                                    labelWidth: 120,
                                    width: 240
                                },
                                {
                                    fieldLabel: 'CORRL',
                                    name: 'pmerchid',
                                    labelWidth: 120,
                                    width: 240
                                },
                                {
                                    fieldLabel: 'Rolling',
                                    id: prototype.idDE + '-txtSMERCHID',
                                    name: 'SEQROLL',
                                    labelWidth: 120,
                                    width: 240
                                },
                                  {
                                    fieldLabel: 'Transaction',
                                    id: prototype.idDE + '-txtSMERCHID',
                                    name: 'TRNCU',
                                    labelWidth: 120,
                                    width: 240
                                }
                            ]
                        },
                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="Control Data">
                {
                    xtype: 'fieldset',
                    title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:10px;">Credit Card</span>',
                    layout: {
                        type: 'vbox',
                        pack: 'center'
                    },
                    border: true,
                    margin: '5 5 5 5',
                    width: '100%',
                    style: {
                        backgroundColor: '#EEF3F9' // Cambiar el color de fondo a gris claro (#f0f0f0)
                    },
                    defaults: {
                        xtype: 'panel',
                        layout: {
                            type: 'hbox',
                            pack: 'center'
                        },
                        width: '100%',
                        border: false,
                        bodyStyle: 'background: transparent',
                        defaults: {
                            xtype: 'textfield',
                            margin: '5 8 5 8',
                            labelStyle: 'text-align:left;font-weight: bolder;',
                            fieldStyle: 'text-align:center;',
                            editable: false
                        }
                    },
                    items: [
                        {
                            items: [
                                {
                                    labelWidth: 75,
                                    width: 175,
                                    fieldLabel: 'Code',
                                    name: 'SCARDCOD'
                                },
                                {
                                    labelWidth: 75,
                                    width: 175,
                                    fieldLabel: 'Number.',
                                    name: 'SCARDN'
                                },
                                {
                                    labelWidth: 75,
                                    width: 175,
                                    fieldLabel: 'Auth..',
                                    name: 'SAUTHOC'
                                }
                            ]
                        },
                    ]
                },
                //</editor-fold>
                 {
                    items: [
                        {
                            items: [
                                {
                                    fieldLabel: 'Proccesing Date',
                                    name: 'SDATE',
                                    labelWidth: 100,
                                    width: 200
                                },
                                {
                                    fieldLabel: 'Ref. Number',
                                    name: 'AREFNBR',
                                    labelWidth: 120,
                                    width: 240
                                },
                                {
                                    fieldLabel: 'Processor',
                                    name: 'DESC_PRO',
                                    labelWidth: 120,
                                    width: 240
                                },
                                 
                            ]
                        },
                         {
                            items: [
                                {
                                    fieldLabel: 'Settl. Amount',
                                    name: 'TGROSAMOUN',
                                    labelWidth: 100,
                                    width: 200
                                },
                                {
                                    fieldLabel: 'Moneda',
                                    name: 'MONEDA',
                                    labelWidth: 120,
                                    width: 240
                                },
                                {
                                    fieldLabel: 'Error Code',
                                    name: 'CERROR',
                                    labelWidth: 120,
                                    width: 240
                                },
                                
                            ]
                        },
                          {
                            items: [
                                {
                                    fieldLabel: 'Balance Amount',
                                    name: 'SALDO',
                                    labelWidth: 100,
                                    width: 200
                                },
                                {
                                    fieldLabel: 'Status',
                                    name: 'DESC_STVAL',
                                    labelWidth: 120,
                                    width: 240
                                },
                                {
                                    fieldLabel: 'Diff. Type',
                                    name: 'DESC_AJUSTE',
                                    labelWidth: 120,
                                    width: 240
                                },
                                
                            ]
                        },
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:10px;">Control Data</span>',
                    layout: {
                        type: 'vbox',
                        pack: 'center'
                    },
                    border: true,
                    margin: '5 5 5 5',
                    width: '100%',
                    style: {
                        backgroundColor: '#EEF3F9' // Cambiar el color de fondo a gris claro (#f0f0f0)
                    },
                    defaults: {
                        xtype: 'panel',
                        layout: {
                            type: 'hbox',
                            pack: 'center'
                        },
                        width: '100%',
                        border: false,
                        bodyStyle: 'background: transparent',
                        defaults: {
                            xtype: 'textfield',
                            margin: '5 8 5 8',
                            labelStyle: 'text-align:left;font-weight: bolder;',
                            fieldStyle: 'text-align:center;',
                            editable: false
                        }
                    },
                    items: [
                        {
                            items: [
                                {
                                    labelWidth: 75,
                                    width: 175,
                                    fieldLabel: 'User Crt.',
                                    name: 'USCR'
                                },
                                {
                                    labelWidth: 75,
                                    width: 175,
                                    fieldLabel: 'Date Crt.',
                                    name: 'FECR'
                                },
                                {
                                    labelWidth: 75,
                                    width: 175,
                                    fieldLabel: 'Hour Crt.',
                                    name: 'HOCR'
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    labelWidth: 75,
                                    width: 175,
                                    fieldLabel: 'User Upd.',
                                    name: 'USUP'
                                },
                                {
                                    labelWidth: 75,
                                    width: 175,
                                    fieldLabel: 'Date Upd.',
                                    name: 'FEUP'
                                },
                                {
                                    labelWidth: 75,
                                    width: 175,
                                    fieldLabel: 'Hour Upd.',
                                    name: 'HOUP'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});