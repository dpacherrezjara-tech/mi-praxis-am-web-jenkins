prototype.idDE3 = prototype.id + '-SettlementDataEntry';

Ext.define('Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.SettlementDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.SettlementDataEntry',
    requires: [
        'Ext.Praxis.controller.payments.SalesReconciliationControl.SettlementDataEntryController'
    ],
    controller: 'SettlementDataEntryController',
    title: 'Settlement - Form',
    header: true,
    width: 1075,
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
            id: prototype.idDE3 + '-mainForm',
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
                                    fieldLabel: 'Payment Date',
                                    name: 'paydate',
                                    labelWidth: 100,
                                    width: 180
                                },
                                {
                                    fieldLabel: 'Processor',
                                    name: 'desc_PROC',
                                    labelWidth: 80,
                                    width: 240
                                },
                                {
                                    fieldLabel: 'Country',
                                    name: 'scountry',
                                    labelWidth: 60,
                                    width: 110
                                },
                                {
                                    fieldLabel: 'Trans. Type',
                                    name: 'transtype',
                                    labelWidth: 85,
                                    width: 155
                                }
                            ]
                        }
                    ]
                },
                {
                    title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:13px;">Merchant</span>',
                    items: [
                        {
                            items: [
                                {
                                    fieldLabel: 'Sale Merchant',
                                    name: 'smerchid',
                                    labelWidth: 120,
                                    width: 230
                                },
                                {
                                    name: 'desc_PMERCHID',
                                    width: 230
                                },
                                {
                                    fieldLabel: 'Payment Merchant',
                                    name: 'pmerchid',
                                    labelWidth: 120,
                                    width: 230
                                },
                                {
                                    name: 'desc_SMERCHID',
                                    width: 230
                                }
                            ]
                        }
                    ]
                },
                {
                    title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:13px;">Sale Information</span>',
                    items: [
                        {
                            items: [
                                {
                                    fieldLabel: 'Sale Date',
                                    name: 'sdate',
                                    labelWidth: 120,
                                    width: 230
                                },
                                {
                                    fieldLabel: 'Ticket',
                                    name: 'ticket',
                                    labelWidth: 60,
                                    width: 180
                                },
                                {
                                    fieldLabel: 'PNR',
                                    name: 'spnr',
                                    labelWidth: 40,
                                    width: 130
                                },
                                {
                                    fieldLabel: 'Qty. Tkts',
                                    name: 'qtytkt',
                                    labelWidth: 80,
                                    width: 150
                                }
                            ]
                        }
                    ]
                },
                {
                    title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:13px;">Credit Card Information</span>',
                    items: [
                        {
                            items: [
                                {
                                    fieldLabel: 'Card Type',
                                    name: 'payplatype',
                                    labelWidth: 120,
                                    width: 230,
                                    listeners: {
                                        change: function (field, newValue) {
                                            const opts = {
                                                'D': 'Debit',
                                                'C': 'Credit'
                                            };
                                            field.setRawValue(opts[newValue] || 'No Info');
                                        }
                                    }
                                },
                                {
                                    fieldLabel: 'Inst. Plan',
                                    name: 'nbrinsta',
                                    labelWidth: 80,
                                    width: 150
                                },
                                {
                                    fieldLabel: 'Inst. Number',
                                    name: 'instanbr',
                                    labelWidth: 90,
                                    width: 160
                                },
                                {
                                    fieldLabel: 'Card Number',
                                    name: 'scardn',
                                    labelWidth: 90,
                                    width: 220
                                },
                                {
                                    fieldLabel: 'Auth Code',
                                    name: 'sauthoc',
                                    labelWidth: 70,
                                    width: 150
                                }

                            ]
                        }
                    ]
                },
                {
                    title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:13px;">Amounts/Commissions</span>',
                    items: [
                        {
                            items: [
                                {
                                    fieldLabel: 'Trans. Amount',
                                    name: 'tgrosamoun',
                                    labelWidth: 120,
                                    width: 230,
                                    listeners: {
                                        change: function (field, newValue) {
                                            field.setRawValue(Ext.util.Format.number(newValue, '0,000.00'));
                                        }
                                    }

                                },
                                {
                                    fieldLabel: 'Currency',
                                    name: 'scurrency',
                                    labelWidth: 70,
                                    width: 140
                                },

                                {
                                    fieldLabel: 'Payment Amount',
                                    name: 'tgrosampay',
                                    labelWidth: 120,
                                    width: 230,
                                    listeners: {
                                        change: function (field, newValue) {
                                            field.setRawValue(Ext.util.Format.number(newValue, '0,000.00'));
                                        }
                                    }

                                },
                                {
                                    fieldLabel: 'P. Currency',
                                    name: 'pcurrency',
                                    labelWidth: 80,
                                    width: 150
                                },
                                {
                                    fieldLabel: 'NET Amount',
                                    name: 'netopay',
                                    labelWidth: 90,
                                    fieldStyle: 'background-color:#8AE884;font-weight:bold;text-align:center;',
                                    width: 200,
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
                                    fieldLabel: 'MSI Rate',
                                    name: 'sfeerate',
                                    labelWidth: 120,
                                    width: 230,
                                    listeners: {
                                        change: function (field, newValue) {
                                            field.setRawValue(newValue + '%');
                                        }
                                    }
                                },
                                {
                                    fieldLabel: 'MSI Fee',
                                    name: 'servicfeep',
                                    labelWidth: 120,
                                    width: 230
                                },
                                {
                                    fieldLabel: 'MSI Comm',
                                    name: 'acceamouc',
                                    labelWidth: 120,
                                    width: 230
                                },
                                {
                                    fieldLabel: 'MSI VAT',
                                    name: 'overcom12p',
                                    labelWidth: 130,
                                    width: 230
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    fieldLabel: 'Comm. Rate',
                                    name: 'discrate',
                                    labelWidth: 120,
                                    width: 230,
                                    listeners: {
                                        change: function (field, newValue) {
                                            field.setRawValue(newValue + '%');
                                        }
                                    }
                                },
                                {
                                    fieldLabel: 'Comm. Amount',
                                    name: 'sfeeamou',
                                    labelWidth: 120,
                                    width: 230
                                },
                                {
                                    fieldLabel: 'VAT Rate',
                                    name: 'discratei',
                                    labelWidth: 120,
                                    width: 230,
                                    listeners: {
                                        change: function (field, newValue) {
                                            field.setRawValue(newValue + '%');
                                        }
                                    }
                                },
                                {
                                    fieldLabel: 'Comm. VAT Amount',
                                    name: 'ivacom12',
                                    labelWidth: 130,
                                    width: 230
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});