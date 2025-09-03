prototype.idDE = prototype.id + '-RefundInfoDataEntry';

Ext.define('Ext.Praxis.view.payments.ReconciliationDoublePaymentForm.DataEntrys.RefundInfoDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.RefundInfoDataEntry',
    requires: [
        'Ext.Praxis.controller.payments.ReconciliationDoublePayment.RefundInfoDataEntryController'
    ],
    controller: 'RefundInfoDataEntryController',
    title: 'Refund Bank - Form',
    header: true,
    width: 1060,
    resizable: false,
    layout: 'fit',
    modal: true,
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'form',
            id: prototype.idDE + '-mainForm',
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
                margin: '5 5 5 5',
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
                        margin: '5 8 5 8',
                        labelStyle: 'text-align:left;font-weight: bolder;',
                        fieldStyle: 'text-align:center;',
                        editable: false
                    }
                }
            },
            items: [
                {
                    title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:13px;">General Information</span>',
                    items: [
                        {
                            items: [
                                {
                                    fieldLabel: 'Processing Date',
                                    name: 'prda',
                                    labelWidth: 120,
                                    width: 230
                                },
                                {
                                    fieldLabel: 'P. Merchant ID',
                                    name: 'pmerchid',
                                    labelWidth: 120,
                                    width: 230
                                },
                                {
                                    fieldLabel: 'S. Merchant ID',
                                    name: 'smerchid',
                                    labelWidth: 120,
                                    width: 230
                                },
                                {
                                    fieldLabel: 'Inst. Plan',
                                    name: 'nbrinsta',
                                    labelWidth: 70,
                                    width: 120
                                },
                                {
                                    fieldLabel: 'Inst. Nbr',
                                    name: 'instanbr',
                                    labelWidth: 70,
                                    width: 120
                                }
                            ]
                        }
                    ]
                },
                {
                    title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:13px;">Accounting Information</span>',
                    items: [
                        {
                            items: [
                                {
                                    fieldLabel: 'Status',
                                    name: 'stconl',
                                    labelWidth: 120,
                                    width: 230,
                                    listeners: {
                                        change: function (field, newValue) {
                                            const opts = {
                                                '1': 'Accounted',
                                                '2': 'Debug'
                                            };
                                            field.setRawValue(opts[newValue] || 'Pending');
                                        }
                                    },
                                    value: 'Pending'
                                },
                                {
                                    fieldLabel: 'Acc. Date',
                                    name: 'fcontl',
                                    labelWidth: 120,
                                    width: 230
                                },
                                {
                                    fieldLabel: 'ID',
                                    name: 'idconl',
                                    labelWidth: 120,
                                    width: 480,
                                    fieldStyle: 'text-align:left;'
                                }
                            ]
                        }
                    ]
                },
                {
                    title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:13px;">Conciliate</span>',
                    items: [
                        {
                            items: [
                                {
                                    fieldLabel: 'Status',
                                    name: 'stval',
                                    labelWidth: 120,
                                    width: 230,
                                    listeners: {
                                        change: function (field, newValue) {
                                            const opts = {
                                                '0': 'Stand By',
                                                '1': 'Match',
                                                '2': 'Sales Without Sett.',
                                                '3': 'Settl. Without Sales',
                                                '4': 'Match Diff.',
                                                '5': 'Match Manual',
//                                                '6': 'Forced Match',
//                                                '7': 'Compensation Match',
                                                '8': 'Pending RFND'
                                            };
                                            field.setRawValue(opts[newValue] || '');
                                        }
                                    }
                                },
                                {
                                    fieldLabel: 'Currency',
                                    name: 'pcurrency',
                                    labelWidth: 120,
                                    width: 230
                                },
                                {
                                    fieldLabel: 'Qty Tkts',
                                    name: 'qtytkt',
                                    labelWidth: 120,
                                    width: 230
                                },
                                {
                                    fieldLabel: 'Transact. Amount',
                                    name: 'tgrosamoun',
                                    labelWidth: 120,
                                    width: 230,
                                    listeners: {
                                        change: function (field, newValue) {
                                            field.setRawValue(Ext.util.Format.number(newValue, '0,000.00'));
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    fieldLabel: 'Rule',
                                    name: 'fregla',
                                    labelWidth: 120,
                                    width: 230,
                                    listeners: {
                                        change: function (field, newValue) {
                                            const opts = {
//                                                '1': 'Ticket',
//                                                '2': 'PNR',
//                                                '3': 'C.Card',
//                                                '4': 'Desg. Manual',
//                                                '5': 'Desg. Transac.'
                                                '0': 'TKT+PNR+IATA+FE+I+T+A',
                                                '1': 'TKT+IATA+FE+I+T+A',
                                                '2': 'TKT+PNR+FE+I+T+A',
                                                '3': 'TKT+FE+I+T+A',
                                                '4': 'PNR+IATA+FE+I+T+A',
                                                '5': 'IATA+FE+I+T+A',
                                                '6': 'PNR+FE+I+T+A',
                                                '7': 'FE+I+T+A',
                                                '8': 'TKT+PNR+FE+I+T',
                                                '9': 'TKT+PNR+FE+ID+T+A',
                                                'A': 'PNR+FE+I+T',
                                                'B': 'PNR+FE+ID+T+A',
                                                'C': 'TKT+FE+I+T',
                                                'D': 'FE+I+T',
                                            };
                                            field.setRawValue(opts[newValue] || '');
                                        }
                                    }
                                },
                                {
                                    fieldLabel: 'Doc. Type',
                                    name: 'transtype',
                                    labelWidth: 120,
                                    width: 230
                                },
                                {
                                    fieldLabel: 'Flag Compl.',
                                    name: 'fcompl',
                                    labelWidth: 120,
                                    width: 230,
                                    listeners: {
                                        change: function (field, newValue) {
                                            const opts = {
                                                '1': 'Plusgrade',
                                                '2': 'Ligas',
                                                '3': 'Tablet',
                                                '4': 'BPO'
                                            };
                                            field.setRawValue(opts[newValue] || '');
                                        }
                                    }
                                },
                                {
                                    fieldLabel: 'Concil. Amount',
                                    name: 'svfops',
                                    labelWidth: 120,
                                    width: 230,
                                    listeners: {
                                        change: function (field, newValue) {
                                            field.setRawValue(Ext.util.Format.number(newValue, '0,000.00'));
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:13px;">Transaction Information</span>',
                    items: [
                        {
                            items: [
                                {
                                    fieldLabel: 'Date',
                                    name: 'sdate',
                                    labelWidth: 120,
                                    width: 230
                                },
                                {
                                    fieldLabel: 'Payment Date',
                                    name: 'paydate',
                                    labelWidth: 120,
                                    width: 230
                                },
                                {
                                    fieldLabel: 'Diff. Days',
                                    value: '0',
                                    labelWidth: 120,
                                    width: 230
                                },
                                {
                                    fieldLabel: 'Card Number',
                                    name: 'scardn',
                                    labelWidth: 120,
                                    width: 260
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    fieldLabel: 'Transac. Date',
                                    name: 'transdate',
                                    labelWidth: 120,
                                    width: 230
                                },
                                {
                                    fieldLabel: 'Ticket',
                                    name: 'ticket',
                                    labelWidth: 120,
                                    width: 230
                                },
                                {
                                    fieldLabel: 'PNR',
                                    name: 'spnr',
                                    labelWidth: 120,
                                    width: 230
                                },
                                {
                                    fieldLabel: 'Auth. Code',
                                    name: 'sauthoc',
                                    labelWidth: 120,
                                    width: 230
                                }
                            ]
                        }
                    ]
                },
                {
                    title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:13px;">BPO Information</span>',
                    items: [
                        {
                            items: [
                                {
                                    fieldLabel: 'Adjustment Code',
                                    labelWidth: 120,
                                    width: 230,
                                    name: 'codadju'
                                },
                                {
                                    fieldLabel: 'Description',
                                    labelWidth: 120,
                                    width: 230,
                                    name: 'desc_ADJU'
                                },
                                {
                                    fieldLabel: 'Comment',
                                    name: 'adjucoment',
                                    labelWidth: 120,
                                    width: 480,
                                    fieldStyle: 'text-align:left;'
                                }
                            ]
                        }
                    ]
                },
                {
                    title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:13px;">Refund Bank Information</span>',
                    items: [
                        {
                            items: [
                                {
                                    fieldLabel: 'Status',
                                    name: 'strfnd',
                                    labelWidth: 120,
                                    width: 230,
                                    listeners: {
                                        change: function (field, newValue) {
                                            const opts = {
                                                '1': 'Processed'
                                            };
                                            field.setRawValue(opts[newValue] || 'Pending');
                                        }
                                    },
                                    value: 'Pending'
                                },
                                {
                                    fieldLabel: 'Date',
                                    name: 'rfdate',
                                    labelWidth: 120,
                                    width: 230,
                                    editable: true,
                                    xtype: 'datefield',
                                    format: 'Ymd', // Formato de fecha deseado
                                    submitFormat: 'Ymd', // Formato de fecha para enviar al servidor
                                    allowBlank: false, // No permite fechas vacías
                                    maxLength: 8, // Máximo de 10 caracteres
                                    minLength: 8,
                                    enforceMaxLength: true
                                },
                                {
                                    fieldLabel: 'Authorization',
                                    name: 'rfautor',
                                    labelWidth: 120,
                                    width: 230,
                                    editable: true,
                                    allowBlank: false, // No permite valores vacíos
                                    maxLength: 8, // Máximo de 10 caracteres
                                    minLength: 8,
                                    enforceMaxLength: true
                                },
                                {
                                    fieldLabel: 'Operation',
                                    name: 'rfoperb',
                                    labelWidth: 120,
                                    width: 230,
                                    editable: true,
                                    allowBlank: false, // No permite valores vacíos
                                    maxLength: 10, // Máximo de 10 caracteres
                                    minLength: 10,
                                    enforceMaxLength: true
                                }
                            ]
                        }
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
                                    name: 'uscr'
                                },
                                {
                                    labelWidth: 75,
                                    width: 175,
                                    fieldLabel: 'Date Crt.',
                                    name: 'fecr'
                                },
                                {
                                    labelWidth: 75,
                                    width: 175,
                                    fieldLabel: 'Hour Crt.',
                                    name: 'hocr'
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    labelWidth: 75,
                                    width: 175,
                                    fieldLabel: 'User Upd.',
                                    name: 'usup'
                                },
                                {
                                    labelWidth: 75,
                                    width: 175,
                                    fieldLabel: 'Date Upd.',
                                    name: 'feup'
                                },
                                {
                                    labelWidth: 75,
                                    width: 175,
                                    fieldLabel: 'Hour Upd.',
                                    name: 'houp'
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
            margin: '5 5 5 5',
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults: {
                scale: 'medium'
            },
            items: [
                {
                    text: 'Update',
                    id: prototype.idDE + '-btn-update',
                    iconCls: 'prx-icon-update',
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
                }
            ]
        }
    ]
});