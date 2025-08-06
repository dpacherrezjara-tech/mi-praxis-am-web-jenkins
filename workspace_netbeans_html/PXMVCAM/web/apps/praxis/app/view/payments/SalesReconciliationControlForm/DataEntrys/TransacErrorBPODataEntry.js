prototype.idDE = prototype.id + '-TransacErrorBPODataEntry';

Ext.define('Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.TransacErrorBPODataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.TransacErrorBPODataEntry',
    requires: [
        'Ext.Praxis.controller.payments.SalesReconciliationControl.TransacErrorBPODataEntryController',
        'Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.MSITrackingDataEntry',
        'Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.ChargebackTrackingDataEntry'
    ],
    controller: 'TransacErrorBPODataEntryController',
    title: 'Transaction Error - Form',
    header: true,
    width: 1205,
    maxHeight: 820,
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
            id: prototype.idDE + '-informationForm',
            layout: {
                type: 'vbox',
                pack: 'center'
            },
            border: false,
            width: '100%',
            scrollable: true, 
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
                //<editor-fold defaultstate="collapsed" desc="Chargeback Panel">
                {
                    xtype: 'panel',
                    layout: {
                        type: 'hbox',
                        pack: 'end'
                    },
                    margin: '3 10 -2 0',
                    defaults: {},
                    flex: 1,
                    id: prototype.idDE + '-specialPanel',
                    border: false,
                    hidden: true,
                    items: [
                        {
                            xtype: 'label',
                            width: 'auto',
                            id: prototype.idDE + '-specialTitle',
                            //margin: '0 4 0 0',
                            style: 'color:red;font-weight:bold;font-size:16px;'
                        }
                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="General Information">
                {
                    title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:13px;">General Information</span>',
                    items: [
                        {
                            items: [
                                {
                                    fieldLabel: 'Processing Date',
                                    name: 'prda',
                                    labelWidth: 120,
                                    width: 280
                                },
                                {
                                    fieldLabel: 'Processor',
                                    name: 'desc_PROC',
                                    labelWidth: 120,
                                    width: 280
                                },
                                {
                                    fieldLabel: 'P. Merchant ID',
                                    name: 'pmerchid',
                                    labelWidth: 120,
                                    width: 280
                                },
                                {
                                    fieldLabel: 'Sales Merchant ID',
                                    id: prototype.idDE + '-txtSMERCHID',
                                    name: 'smerchidf',
                                    labelWidth: 120,
                                    width: 280
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    fieldLabel: 'Adjustment ID',
                                    name: 'codchgback',
                                    labelWidth: 120,
                                    width: 280
                                },
                                {
                                    fieldLabel: 'ID Transaction',
                                    name: 'iditemt',
                                    labelWidth: 120,
                                    width: 280
                                },
                                {
                                    fieldLabel: 'ARN',
                                    name: 'arn',
                                    labelWidth: 120,
                                    width: 280
                                },
                                {
                                    fieldLabel: 'Invoice Ref.Nbr',
                                    name: 'invoirn',
                                    labelWidth: 120,
                                    width: 280
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    fieldLabel: 'Ref. Number',
                                    name: 'arefnbr',
                                    labelWidth: 120,
                                    width: 280
                                },
                                {
                                    fieldLabel: 'Country',
                                    name: 'scountry',
                                    labelWidth: 120,
                                    width: 280
                                },
                                {
                                    fieldLabel: 'MSI',
                                    name: 'instanbr', //nbrinsta
                                    labelWidth: 120,
                                    width: 190
                                },
                                {
                                    name: 'nbrinsta', //nbrinsta
                                    width: 80
                                },
                                {
                                    fieldLabel: 'Flag Compl.',
                                    name: 'fcompl',
                                    labelWidth: 120,
                                    width: 280,
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
                                }
                            ]
                        },
                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="Accounting Information">
                {
                    title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:13px;">Accounting Information</span>',
                    items: [
                        {
                            items: [
                                {
                                    fieldLabel: 'Status',
                                    name: 'stconl',
                                    labelWidth: 120,
                                    width: 280,
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
                                    fieldLabel: 'Date',
                                    name: 'fcontl',
                                    labelWidth: 120,
                                    width: 280
                                },
                                {
                                    fieldLabel: 'ID',
                                    labelWidth: 120,
                                    width: 470,
                                    name: 'idconl'
                                }
                            ]
                        }
                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="Error Information">
                {
                    title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:13px;">Error Information</span>',
                    items: [
                        {
                            items: [
                                {
                                    fieldLabel: 'History',
                                    name: 'cerrorhst',
                                    labelWidth: 120,
                                    width: 280
                                },
                                {
                                    fieldLabel: 'Adjustment',
                                    name: 'codadju',
                                    labelWidth: 120,
                                    width: 280
                                },
                                {
                                    fieldLabel: 'Description',
                                    name: 'desc_ADJU',
                                    labelWidth: 120,
                                    width: 360
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    fieldLabel: 'Flag Selection',
                                    name: 'fselec',
                                    labelWidth: 120,
                                    width: 280,
                                    listeners: {
                                        change: function (field, newValue) {
                                            const opts = {
                                                'L': 'Load',
                                                'D': 'Duplicated'
                                            };
                                            field.setRawValue(opts[newValue] || '');
                                        }
                                    },
                                    value: 'None'
                                },
                                {
                                    fieldLabel: 'Code',
                                    name: 'cerror',
                                    labelWidth: 120,
                                    width: 280
                                },
                                {
                                    fieldLabel: 'Description',
                                    name: 'desc_ERROR',
                                    labelWidth: 120,
                                    width: 360
                                }
                            ]
                        }
                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="Sale Information">
                {
                    title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:13px;">Sale Information</span>',
                    id: prototype.idDE + '-fsSaleInfo',
                    items: [
                        {
                            items: [
                                {
                                    fieldLabel: 'Sale Date',
                                    name: 'sdate',
                                    labelWidth: 120,
                                    width: 280,
                                    id: prototype.idDE + '-txtSDATE'
                                },
                                {
                                    fieldLabel: 'Payment Date',
                                    name: 'paydate',
                                    labelWidth: 120,
                                    width: 280
                                },
                                {
                                    fieldLabel: 'Card Type',
                                    name: 'payplatype',
                                    labelWidth: 120,
                                    width: 280,
                                    listeners: {
                                        change: function (field, newValue) {
                                            const opts = {
                                                'D': 'Debit',
                                                'C': 'Credit'
                                            };
                                            field.setRawValue(opts[newValue] || '');
                                        }
                                    }
                                },
                                {
                                    fieldLabel: 'Card Number',
                                    name: 'scardn',
                                    labelWidth: 120,
                                    width: 280
                                }

                            ]
                        },
                        {
                            items: [
                                {
                                    fieldLabel: 'Transac. Date',
                                    name: 'transdate',
                                    labelWidth: 120,
                                    width: 280
                                },
                                {
                                    fieldLabel: 'Ticket',
                                    name: 'ticket',
                                    labelWidth: 120,
                                    width: 280
                                },
                                {
                                    fieldLabel: 'PNR',
                                    name: 'spnr',
                                    labelWidth: 120,
                                    width: 280
                                },
                                {
                                    fieldLabel: 'Auth Code',
                                    name: 'sauthoc',
                                    labelWidth: 120,
                                    width: 280
                                }
                            ]
                        }
                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="Conciliation">
                {
                    title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:13px;">Conciliation</span>',
                    items: [
                        {
                            items: [
                                {
                                    fieldLabel: 'Status',
                                    name: 'stval',
                                    labelWidth: 120,
                                    width: 280,
                                    listeners: {
                                        change: function (field, newValue) {
                                            const opts = {
//                                                'A': 'Match OC/Camepa',
                                                'C': 'Match Complement',
//                                                'D': 'Match Balance',
                                                'E': 'Duplicate Payment',
                                                'M': 'Match Multi-Payment',
                                                '0': 'Stand By',
                                                '1': 'Match',
                                                '2': 'Sales Without Settl.',
                                                '3': 'Settl. Without Sales',
                                                '4': 'Match Partial',
                                                '5': 'Match Manual',
//                                                '6': 'Match Forced',
//                                                '7': 'Match Compensation',
                                                '8': 'Match Transactional',
                                                '9': 'Match Void'
                                            };
                                            field.setRawValue(opts[newValue] || '');
                                        }
                                    }

                                },
                                {
                                    fieldLabel: 'Currency',
                                    name: 'scurrency',
                                    labelWidth: 120,
                                    width: 280
                                },

                                {
                                    fieldLabel: 'Qty Tkts',
                                    name: 'qtytkt',
                                    labelWidth: 120,
                                    width: 280
                                },
                                {
                                    fieldLabel: 'Transac. Amount',
                                    name: 'tgrosamoun',
                                    labelWidth: 120,
                                    width: 280,
                                    fieldStyle: 'text-align:right;',
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
                                    width: 280,
                                    listeners: {
                                        change: function (field, newValue) {
                                            const opts = {
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
                                                'B': 'PNR+FE+ID+T+A'
//                                                '1': 'Ticket',
//                                                '2': 'PNR',
//                                                '3': 'C.Card',
//                                                '4': 'Desg. Manual',
//                                                '5': 'Desg. Transac.',
//                                                '6': 'Desg. Duplic.',
//                                                '7': 'Desg. Multip.'
                                            };
                                            field.setRawValue(opts[newValue] || '');
                                        }
                                    }
                                },
                                {
                                    fieldLabel: 'Doc. Type',
                                    name: 'transtype',
                                    labelWidth: 120,
                                    width: 280
                                },
                                {
                                    fieldLabel: 'Void',
                                    name: 'fvoid',
                                    labelWidth: 120,
                                    width: 280
                                },
                                {
                                    fieldLabel: 'Sale Amount',
                                    name: 'svfops',
                                    id: prototype.idDE + '-txtSVFOPS',
                                    labelWidth: 120,
                                    width: 280,
                                    fieldStyle: 'text-align:right;',
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
                                    fieldLabel: 'ADM',
                                    name: 'fadm',
                                    labelWidth: 120,
                                    width: 280
                                },
                                {
                                    fieldLabel: 'Reverse Policy',
                                    name: 'freversa',
                                    labelWidth: 120,
                                    width: 280
                                },
                                {
                                    fieldLabel: 'Reversa ADM',
                                    name: 'frevadm',
                                    labelWidth: 120,
                                    width: 280
                                },
                                {
                                    fieldLabel: 'Diff. Amount',
                                    name: 'difference',
                                    id: prototype.idDE + '-txtDifference',
                                    labelWidth: 120,
                                    fieldStyle: 'text-align:right;',
                                    width: 280,
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
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="Scanner Inputs">
                {
                    xtype: 'fieldset',
                    id: prototype.idDE + '-scannerInputs',
                    title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:12px;">Scanner</span>',
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    collapsible: true,
                    collapsed: true,
                    border: true,
                    width: '100%',
                    style: {
                        backgroundColor: '#efe5e5' // Cambiar el color de fondo a gris claro (#f0f0f0)
                    },
                    listeners: {
                        'expand': 'onCenterDataEntry',
                        'collapse': 'onCenterDataEntry'
                    },
                    items: [
                        {
                            xtype: 'form',
                            id: prototype.idDE + '-scannerForm',
                            layout: {
                                type: 'vbox',
                                pack: 'center'
                            },
                            width: '100%',
                            border: false,
                            bodyStyle: 'background: transparent',
                            defaults: {
                                xtype: 'panel',
                                width: '100%',
                                bodyStyle: 'background: transparent',
                                border: false,
                                layout: {
                                    type: 'hbox',
                                    pack: 'center'
                                },
                                defaults: {
                                    xtype: 'textfield',
                                    margin: '2 5 2 5',
                                    labelStyle: 'text-align:right;font-weight: bolder;',
                                    fieldStyle: 'text-align:center;'
                                }
                            },
                            items: [
                                {
                                    items: [
                                        {
                                            fieldLabel: 'Ticket',
                                            name: 'IN_TICKET',
                                            labelWidth: 60,
                                            width: 155,
                                            maskRe: /[0-9]/,
                                            maxLength: 13,
                                            enforceMaxLength: true,
                                            validator: function (value) {
                                                if (value.length < 13 && value.length !== 0) {
                                                    return 'Invalid Ticket Number';
                                                }
                                                return true;
                                            }
                                        },
                                        {
                                            fieldLabel: 'PNR',
                                            name: 'IN_SPNR',
                                            labelWidth: 40,
                                            width: 120,
                                            maxLength: 6,
                                            enforceMaxLength: true,
                                            maskRe: /[a-zA-Z0-9]/,
                                            validator: function (value) {
                                                if (value.length < 6 && value.length !== 0) {
                                                    return 'Invalid PNR';
                                                }
                                                return true;
                                            },
                                            listeners: {
                                                change: function (field, newValue, oldValue) {
                                                    field.setValue(newValue.toUpperCase());
                                                }
                                            }
                                        },
                                        {
                                            fieldLabel: 'Agent',
                                            name: 'IN_SAGENT',
                                            labelWidth: 50,
                                            width: 130,
                                            maskRe: /[0-9]/,
                                            maxLength: 10,
                                            enforceMaxLength: true
                                        },
                                        {
                                            xtype: 'datefield',
                                            fieldLabel: 'Sale Date',
                                            name: 'IN_SDATE',
                                            labelWidth: 65,
                                            width: 145,
                                            format: 'Ymd',
                                            editable: true,
                                            value: new Date()
                                        },
                                        {
                                            xtype: 'button',
                                            width: 25,
                                            iconCls: 'prx-icon-add',
                                            tooltip: 'Add',
                                            listeners: {
                                                click: 'onAddCreditCardClick'
                                            }

                                        },
                                        {
                                            xtype: 'checkbox',
                                            id: prototype.idDE + '-chkForceBlock',
                                            //tooltip: 'Force add Blocked',
                                            hidden: true,
                                            inputValue: true,
                                            listeners: {
                                                change: function (checkbox, newValue, oldValue, eOpts) {
                                                    if (!newValue) {
                                                        return;
                                                    }
                                                    // Mostrar una ventana de confirmación al hacer clic
                                                    Ext.Msg.confirm('Confirm', '¿Do you want to force scan?', function (buttonId) {
                                                        if (buttonId === 'yes') {
                                                            // Continuar con el cambio
                                                            checkbox.setValue(newValue);
                                                        } else {
                                                            // Cancelar el cambio
                                                            checkbox.setValue(oldValue);
                                                        }
                                                    });
                                                },
                                                render: function (checkbox) {
                                                    checkbox.getEl().set({
                                                        'data-qtip': 'Force add Blocked'
                                                    });
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            width: 25,
                                            iconCls: 'prx-icon-clear',
                                            tooltip: 'Clean',
                                            listeners: {
                                                click: 'onClearScannerInputs'
                                            }

                                        },
                                        {
                                            xtype: 'button',
                                            width: 25,
                                            iconCls: 'prx-icon-search',
                                            tooltip: 'Find Exact',
                                            listeners: {
                                                click: 'onFilterBPOGrid'
                                            }

                                        },
                                        //prx-icon-reload
                                        {
                                            xtype: 'button',
                                            width: 25,
                                            iconCls: 'prx-icon-reload',
                                            tooltip: 'Balance Reconciliation',
                                            listeners: {
                                                click: 'onChangeBalance'
                                            }

                                        }
                                    ]
                                },
                                {
                                    items: [
                                        {
                                            fieldLabel: 'C. Card',
                                            labelWidth: 55,
                                            name: 'creditcard',
                                            width: 125,
                                            maxLength: 6,
                                            enforceMaxLength: true,
                                            maskRe: /[0-9]/
                                        },
                                        {
                                            xtype: 'label',
                                            text: '*****(*)'
                                        },
                                        {
                                            width: 50,
                                            name: 'creditcard',
                                            maxLength: 4,
                                            enforceMaxLength: true,
                                            maskRe: /[0-9]/
                                        },
                                        {
                                            fieldLabel: 'Auth',
                                            name: 'IN_SAUTHOC',
                                            labelWidth: 45,
                                            width: 115,
                                            maxLength: 6,
                                            enforceMaxLength: true,
                                            maskRe: /[a-zA-Z0-9]/
                                        },

                                        {
                                            xtype: 'button',
                                            width: 110,
                                            text: 'Add Duplicated',
                                            iconCls: 'prx-icon-add',
                                            tooltip: 'Duplicated',
                                            listeners: {
                                                click: 'onAddDuplicated'
                                            }

                                        },
                                        {
                                            xtype: 'button',
                                            width: 110,
                                            text: 'MSI Tracking',
                                            iconCls: 'prx-icon-update',
                                            tooltip: 'Open MSI Tracking',
                                            listeners: {
                                                click: 'onClickMSITracking'
                                            }

                                        },
                                        {
                                            xtype: 'button',
                                            // No se ingresaran comentarios de BPO 
                                            hidden: true,
                                            width: 25,
                                            iconCls: 'prx-icon-bpo-comment',
                                            tooltip: 'Open BPO Comment',
                                            listeners: {
                                                click: 'onOpenComments'
                                            }

                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'form',
                            id: prototype.idDE + '-balanceScannerForm',
                            layout: {
                                type: 'vbox',
                                pack: 'center'
                            },
                            hidden: true,
                            width: '100%',
                            border: false,
                            bodyStyle: 'background: transparent',
                            defaults: {
                                xtype: 'panel',
                                width: '100%',
                                bodyStyle: 'background: transparent',
                                border: false,
                                layout: {
                                    type: 'hbox',
                                    pack: 'center'
                                },
                                defaults: {
                                    xtype: 'textfield',
                                    margin: '2 5 2 5',
                                    labelStyle: 'text-align:right;font-weight: bolder;',
                                    fieldStyle: 'text-align:center;'
                                }
                            },
                            items: [
                                {
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            fieldLabel: 'Status',
                                            id: prototype.idDE + '-balanceConcilType',
                                            name: 'IN_STVAL',
                                            store: Ext.create('Ext.data.SimpleStore', {
                                                fields: ['code', 'name'],
                                                data: [
                                                    ['M', 'Multi-Payment'],
                                                    ['5', 'Match Manual']  // --> ['C', 'Complement'] cambio de Match Complement a Match Manual
                                                ]
                                            }),
                                            labelWidth: 55,
                                            width: 180,
                                            displayField: 'name',
                                            valueField: 'code',
                                            queryMode: 'local',
                                            editable: false,
                                            value: 'M'
                                        },

                                        {
                                            xtype: 'datefield',
                                            fieldLabel: 'From',
                                            name: 'IN_FROM',
                                            labelWidth: 65,
                                            width: 145,
                                            format: 'Ymd',
                                            editable: true,
                                            value: new Date()
                                        },
                                        {
                                            xtype: 'datefield',
                                            fieldLabel: 'To',
                                            name: 'IN_TO',
                                            labelWidth: 65,
                                            width: 145,
                                            format: 'Ymd',
                                            editable: true,
                                            value: new Date()
                                        },
                                        {
                                            fieldLabel: 'Ticket',
                                            name: 'IN_TICKET',
                                            labelWidth: 60,
                                            width: 155,
                                            maskRe: /[0-9]/,
                                            maxLength: 13,
                                            enforceMaxLength: true,
                                            validator: function (value) {
                                                if (value.length < 13 && value.length !== 0) {
                                                    return 'Invalid Ticket Number';
                                                }
                                                return true;
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            width: 25,
                                            iconCls: 'prx-icon-add',
                                            tooltip: 'Add',
                                            listeners: {
                                                click: 'onAddBalanceClick'
                                            }

                                        },
                                        {
                                            xtype: 'button',
                                            width: 25,
                                            iconCls: 'prx-icon-reload',
                                            tooltip: 'Balance Reconciliation',
                                            listeners: {
                                                click: 'onChangeBalance'
                                            }

                                        }
                                    ]
                                },
                                {
                                    items: [
                                        {
                                            fieldLabel: 'C. Card',
                                            labelWidth: 55,
                                            name: 'IN_SCARDN1',
                                            width: 125,
                                            maxLength: 6,
                                            enforceMaxLength: true,
                                            maskRe: /[0-9]/
                                        },
                                        {
                                            xtype: 'label',
                                            text: '*****(*)'
                                        },
                                        {
                                            width: 50,
                                            name: 'IN_SCARDN2',
                                            maxLength: 4,
                                            enforceMaxLength: true,
                                            maskRe: /[0-9]/
                                        },
                                        {
                                            fieldLabel: 'Auth',
                                            name: 'IN_SAUTHOC',
                                            labelWidth: 45,
                                            width: 115,
                                            maxLength: 6,
                                            enforceMaxLength: true,
                                            maskRe: /[a-zA-Z0-9]/
                                        }
                                    ]
                                }
                            ]
                        }

                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="Comments">
                {
                    xtype: 'fieldset',
                    id: prototype.idDE + '-bpoComments',
                    title: 'Stand By Comment',
                    hidden: true,
                    layout: {
                        type: 'hbox',
                        align: 'left'
                    },
                    border: true,
                    width: '100%',
                    style: {
                        backgroundColor: '#efe5e5' // Cambiar el color de fondo a gris claro (#f0f0f0)
                    },
                    defaults: {
                        xtype: 'textfield',
                        margin: '3 5 3 5',
                        labelStyle: 'text-align:center;font-weight: bolder;'
                    },
                    items: [
                        {
                            id: prototype.idDE + '-bpocoment',
                            fieldLabel: 'BPO Comment',
                            maxLength: 100,
                            enforceMaxLength: true,
                            labelWidth: 100,
                            width: 450
                        },
                        {
                            xtype: 'checkbox',
                            boxLabel: 'Adjustment',
                            id: prototype.idDE + '-addStandByAdju',
                            checked: false,
                            listeners: {
                                change: 'onChangeStandyByAdju'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.idDE + '-addStandBy',
                            width: 25,
                            iconCls: 'prx-icon-image-update',
                            tooltip: 'Update Stand By',
                            hidden: true,
                            listeners: {
                                click: 'onChangeStandBy'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.idDE + '-revStandBy',
                            width: 25,
                            iconCls: 'prx-icon-update',
                            hidden: true,
                            tooltip: 'Reverse Stand By',
                            listeners: {
                                click: 'onReverseStandBy'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.idDE + '-hideStandBy',
                            width: 25,
                            iconCls: 'prx-icon-cancel-action',
                            tooltip: 'Cancel',
                            hidden: true,
                            listeners: {
                                click: 'onCancelStandBy'
                            }
                        }
                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="Adju Comment">
                {
                    xtype: 'fieldset',
                    id: prototype.idDE + '-bpoComments2',
                    title: 'Adjustment Comment',
                    hidden: true,
                    layout: {
                        type: 'hbox',
                        align: 'left'
                    },
                    border: true,
                    width: '98%',
                    style: {
                        backgroundColor: '#efe5e5' // Cambiar el color de fondo a gris claro (#f0f0f0)
                    },
                    defaults: {
                        xtype: 'textfield',
                        margin: '3 5 3 5',
                        labelStyle: 'text-align:center;font-weight: bolder;'
                    },
                    items: [
                        {
                            id: prototype.idDE + '-adjucoment',
                            fieldLabel: 'BPO Comment',
                            labelWidth: 100,
                            width: 450,
                            editable: false
                        }
                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="Auto Comments">
                {
                    xtype: 'fieldset',
                    id: prototype.idDE + '-CommentTransaction',
                    title: '<span style="font-weight: bold; text-decoration-line: underline; font-size:12px;">Comments</span>',
                    hidden: true,
                    layout: {
                        type: 'hbox',
                        align: 'left'
                    },
                    border: true,
                    width: '100%',
                    style: {
                        backgroundColor: '#efe5e5' // Cambiar el color de fondo a gris claro (#f0f0f0)
                    },
                    defaults: {
                        xtype: 'textfield',
                        margin: '3 5 3 5',
                        labelStyle: 'text-align:left;font-weight: bolder;'
                    },
                    items: [
                        {
                            id: prototype.idDE + '-InputCommentTransaction',
                            fieldLabel: 'Comment',
                            labelWidth: 120,
                            width: 1000,
                            editable: false
                        }
                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="Tabs Panel">
                {
                    xtype: 'panel',
                    width: '100%',
                    id: prototype.idDE + '-panelGrids1',
                    border: false,
                    defaults: {},
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'tabpanel',
                            id: prototype.idDE + '-tabMain',
                            width: '100%',
                            height: 'auto',
                            border: false,
                            margin: '0 1 0 1',
                            bodyStyle: 'background: transparent',
                            //layout: 'fit',
                            defaults: {
                                //margin: '0 5 0 5',
                                height: 'auto',
                                autoScroll: false,
                                layout: 'fit',
                                defaults: {
                                    width: '100%',
                                    minHeight: 100,
                                    maxHeight: 155,
                                    viewConfig: {
                                        stripeRows: true,
                                        enableTextSelection: true,
                                        markDirty: false
                                    },
                                    columnLines: true,
                                    autoScroll: true,
                                    height: 'auto'
                                }
                            },
                            items: [
                                //<editor-fold defaultstate="collapsed" desc="BPO Tab">
                                {
                                    title: 'Added BPO',
                                    itemId: 'A',
                                    id: prototype.idDE + '-tabBPO',
                                    items: [
                                        {
                                            xtype: 'grid',
                                            border: false,
                                            id: prototype.idDE + '-gridBPO',
                                            emptyText: 'No cards available',
                                            columns: {
                                                defaults: {
                                                    align: 'center',
                                                    menuDisabled: true,
                                                    sortable: true
                                                },
                                                items: [
                                                    {
                                                        text: 'Status', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return 'Pending';
                                                        }
                                                    },
                                                    {
                                                        text: 'Src', dataIndex: 'fuente', width: 45
                                                    },
                                                    {
                                                        text: 'Doc.<br>Type', dataIndex: 'trncu', width: 60
                                                    },
                                                    {
                                                        text: 'Credit Card',
                                                        defaults: {
                                                            align: 'center',
                                                            menuDisabled: true,
                                                            sortable: true
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Cod', dataIndex: 'scardcod', width: 50
                                                            },
                                                            {
                                                                text: 'Number', dataIndex: 'scardn', width: 130
                                                            },
                                                            {
                                                                text: 'Auth', dataIndex: 'sauthoc', width: 70
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Curr', dataIndex: 'scurrency', width: 50
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'svfops', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#c0f0af;font-weight:bold;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: 'Sales<br>Amount', dataIndex: 'tgrosamoun', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#c0f0af;font-weight:bold;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: 'Sales<br>Date', dataIndex: 'sdate', width: 80
                                                    },
                                                    {
                                                        text: 'PNR', dataIndex: 'spnr', width: 65
                                                    },
                                                    {
                                                        text: 'Ticket', width: 120,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#FCF6DC;font-weight:bold;";
                                                            const obj = record.data;
                                                            const ticket = obj.ccia + obj.forma + obj.serie;
                                                            return ticket;
                                                        }
                                                    },
                                                    {
                                                        text: 'Corrl', width: 50, dataIndex: 'corrl'
                                                    },
                                                    {
                                                        text: 'Void', width: 45, dataIndex: 'fvoid'
                                                    },
                                                    {
                                                        text: 'Agent', dataIndex: 'sagent', width: 75
                                                    },
                                                    {
                                                        sortable: false,
                                                        xtype: 'actioncolumn',
                                                        width: 45,
                                                        text: 'Uses',
                                                        align: 'center',
                                                        items: [
                                                            {
                                                                iconCls: 'prx-icon-search',
                                                                tooltip: 'Show Usages',
                                                                handler: 'onShowUsages'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        sortable: false,
                                                        xtype: 'actioncolumn',
                                                        width: 40,
                                                        text: 'Del.',
                                                        //id: prototype.id + '-gridColumnDelete',
                                                        align: 'center',
                                                        items: [
                                                            {
                                                                iconCls: 'prx-icon-image-trash',
                                                                tooltip: 'Delete',
                                                                handler: 'onDeleteRecordBPO'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        sortable: false,
                                                        xtype: 'actioncolumn',
                                                        width: 40,
                                                        text: 'Adj.',
                                                        //id: prototype.id + '-gridColumnAdj',
                                                        align: 'center',
                                                        items: [
                                                            {
                                                                iconCls: 'prx-icon-add',
                                                                tooltip: 'Create adjustment',
                                                                handler: 'onAddAdjustment'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        }
                                    ],
                                    bbar: {
                                        xtype: 'panel',
                                        border: false,
                                        width: '100%',
                                        layout: {
                                            type: 'hbox',
                                            pack: 'end'
                                        }, // Distribución horizontal
                                        defaults: {
                                            xtype: 'textfield',
                                            margin: '3 2 3 5',
                                            labelStyle: 'text-align:right;font-weight: bolder;',
                                            fieldStyle: 'text-align:right;',
                                            editable: false
                                        },
                                        items: [
                                            {
                                                id: prototype.idDE + '-totTickets',
                                                fieldLabel: 'Total Tickets',
                                                labelWidth: 100,
                                                submitValue: false,
                                                width: 150,
                                                value: '0',
                                                //reset:false
                                            },
                                            {
                                                id: prototype.idDE + '-totAmount',
                                                fieldLabel: 'Sum Amount',
                                                labelWidth: 100,
                                                submitValue: false,
                                                width: 180,
                                                value: '0.00',
                                                //reset:false
                                            },
                                            {
                                                xtype: 'button',
                                                width: 25,
                                                iconCls: 'prx-icon-reload',
                                                tooltip: 'Reload Grid',
                                                listeners: {
                                                    click: 'reloadGridBPO'
                                                }
                                            },
                                            {
                                                xtype: 'button',
                                                width: 25,
                                                iconCls: 'prx-icon-delete',
                                                tooltip: 'Clean Grid',
                                                listeners: {
                                                    click: 'cleanGridBPO'
                                                }
                                            }
                                        ]
                                    }

                                },
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="Blocked Tab">
                                {
                                    //id: prototype.id + '-tabFormat',
                                    title: 'Blocked',
                                    itemId: 'B',
                                    id: prototype.idDE + '-tabBlocked',
                                    items: [
                                        {
                                            xtype: 'grid',
                                            border: false,
                                            id: prototype.idDE + '-gridBlocked',
                                            emptyText: 'No cards available',
                                            columns: {
                                                defaults: {
                                                    align: 'center',
                                                    menuDisabled: true,
                                                    sortable: true
                                                },
                                                items: [
                                                    {
                                                        text: 'Status', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return 'Blocked';
                                                        }
                                                    },
                                                    {
                                                        text: 'Src', dataIndex: 'fuente', width: 45
                                                    },
                                                    {
                                                        text: 'Doc.<br>Type', dataIndex: 'trncu', width: 60
                                                    },
                                                    {
                                                        text: 'Credit Card',
                                                        defaults: {
                                                            align: 'center',
                                                            menuDisabled: true,
                                                            sortable: true
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Cod', dataIndex: 'scardcod', width: 50
                                                            },
                                                            {
                                                                text: 'Number', dataIndex: 'scardn', width: 130
                                                            },
                                                            {
                                                                text: 'Auth', dataIndex: 'sauthoc', width: 70
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: 'Curr', dataIndex: 'scurrency', width: 50
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'svfops', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#c0f0af;font-weight:bold;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: 'Sales<br>Amount', dataIndex: 'tgrosamoun', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#c0f0af;font-weight:bold;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: 'Sales<br>Date', dataIndex: 'sdate', width: 80
                                                    },
                                                    {
                                                        text: 'PNR', dataIndex: 'spnr', width: 65
                                                    },
                                                    {
                                                        text: 'Ticket', width: 120,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#FCF6DC;font-weight:bold;";
                                                            const obj = record.data;
                                                            const ticket = obj.ccia + obj.forma + obj.serie;
                                                            return ticket;
                                                        }
                                                    },
                                                    {
                                                        text: 'Qty<br>Uses', width: 50, dataIndex: 'duplicates'
                                                    },
                                                    {
                                                        text: 'Void', width: 45, dataIndex: 'fvoid'
                                                    },
                                                    {
                                                        text: 'Agent', dataIndex: 'sagent', width: 75
                                                    },
                                                    {
                                                        sortable: false,
                                                        xtype: 'actioncolumn',
                                                        width: 45,
                                                        text: 'Det.',
                                                        align: 'center',
                                                        items: [
                                                            {
                                                                iconCls: 'prx-icon-detail',
                                                                tooltip: 'Show Detail',
                                                                handler: 'onShowTransactionMatch'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        }
                                    ],
                                    bbar: {
                                        xtype: 'panel',
                                        border: false,
                                        width: '98%',
                                        layout: {
                                            type: 'hbox',
                                            pack: 'end'
                                        }, // Distribución horizontal
                                        defaults: {
                                            xtype: 'textfield',
                                            margin: '3 2 3 5',
                                            labelStyle: 'text-align:right;font-weight: bolder;',
                                            fieldStyle: 'text-align:right;',
                                            editable: false
                                        },
                                        items: [
                                            {
                                                id: prototype.idDE + '-totBTickets',
                                                fieldLabel: 'Total Tickets',
                                                labelWidth: 100,
                                                submitValue: false,
                                                width: 150,
                                                value: '0'
                                            },
                                            {
                                                id: prototype.idDE + '-totBAmount',
                                                fieldLabel: 'Sum Amount',
                                                labelWidth: 100,
                                                submitValue: false,
                                                width: 180,
                                                value: '0.00'
                                            },
                                            {
                                                xtype: 'button',
                                                width: 25,
                                                iconCls: 'prx-icon-reload',
                                                tooltip: 'Reload Grid',
                                                listeners: {
                                                    click: 'reloadGridBPO'
                                                }
                                            }
                                        ]
                                    }
                                },
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="Match Tab">
                                {
                                    title: 'Match',
                                    itemId: 'M',
                                    id: prototype.idDE + '-tabDesglose',
                                    items: [
                                        {
                                            xtype: 'grid',
                                            border: false,
                                            id: prototype.idDE + '-gridDesglose',
                                            maxHeight: 165,
                                            emptyText: 'No cards available',
                                            columns: {
                                                defaults: {
                                                    align: 'center',
                                                    menuDisabled: true,
                                                    sortable: true
                                                },
                                                items: [
                                                    {
                                                        text: 'Status', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return 'Concil.';
                                                        }
                                                    },
                                                    {
                                                        text: 'Src', dataIndex: 'fuente', width: 45,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            const opts = {
                                                                'S': 'ASR',
                                                                'B': 'BSP',
                                                                'M': 'Manual',
                                                                'A': 'ARC'
                                                            };
                                                            return opts[value] || '';
                                                        }
                                                    },
                                                    {
                                                        text: 'Doc.<br>Type', dataIndex: 'trncu', width: 60
                                                    },
                                                    {
                                                        text: 'Credit Card',
                                                        defaults: {
                                                            align: 'center',
                                                            menuDisabled: true,
                                                            sortable: true
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Cod', dataIndex: 'scarcod', width: 45
                                                            },
                                                            {
                                                                text: 'Number', dataIndex: 'scardn', width: 130
                                                            },
                                                            {
                                                                text: 'Auth', dataIndex: 'sauthoc', width: 55
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: 'Curr', dataIndex: 'scurrency', width: 50
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'svfops', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#c0f0af;font-weight:bold;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: 'Sales<br>Date', dataIndex: 'sdate', width: 80
                                                    },
                                                    {
                                                        text: 'PNR', dataIndex: 'spnr', width: 70
                                                    },
                                                    {
                                                        text: 'Ticket', width: 120,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#FCF6DC;font-weight:bold;";
                                                            const obj = record.data;
                                                            const ticket = obj.ccia + obj.forma + obj.serie;
                                                            return ticket;
                                                        }
                                                    },
                                                    {
                                                        text: 'Corrl', width: 45, dataIndex: 'corrl'
                                                    },
                                                    {
                                                        text: 'Void', width: 40, dataIndex: 'fvoid'
                                                    },
                                                    {
                                                        text: 'Agent', dataIndex: 'sagent', width: 80
                                                    }
                                                ]
                                            },
                                            bbar: {
                                                xtype: 'panel',
                                                border: false,
                                                width: '98%',
                                                layout: {
                                                    type: 'hbox',
                                                    pack: 'end'
                                                }, // Distribución horizontal
                                                defaults: {
                                                    xtype: 'textfield',
                                                    margin: '3 5 3 5',
                                                    labelStyle: 'text-align:right;font-weight: bolder;',
                                                    fieldStyle: 'text-align:right;',
                                                    editable: false
                                                },
                                                items: [
                                                    {
                                                        id: prototype.idDE + '-totDTickets',
                                                        fieldLabel: 'Total Tickets',
                                                        submitValue: false,
                                                        labelWidth: 100,
                                                        width: 150,
                                                        value: '0'
                                                    },
                                                    {
                                                        id: prototype.idDE + '-totDAmount',
                                                        fieldLabel: 'Sum Amount',
                                                        submitValue: false,
                                                        labelWidth: 100,
                                                        width: 180,
                                                        value: '0.00'
                                                    }
                                                ]
                                            }
                                        }
                                        ,
                                        {
                                            xtype: 'grid',
                                            border: false,
                                            hidden: true,
                                            maxHeight: 188,
                                            id: prototype.idDE + '-gridDesgloseCHBK',
                                            emptyText: 'No cards available',
                                            columns: {
                                                defaults: {
                                                    align: 'center',
                                                    menuDisabled: true,
                                                    sortable: true
                                                },
                                                items: [
                                                    {
                                                        text: 'Status', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            const {stval} = record.data;
                                                            const opts = {
                                                                '5': 'Chargeback',
                                                                '6': 'Reverse Chbk'
                                                            };
                                                            return opts[stval] || '';
                                                        }
                                                    },
                                                    {
                                                        text: 'Credit Card',
                                                        defaults: {
                                                            align: 'center',
                                                            menuDisabled: true,
                                                            sortable: true
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Cod', dataIndex: 'codebank', width: 45
                                                            },
                                                            {
                                                                text: 'Number', dataIndex: 'cardnbr', width: 130
                                                            },
                                                            {
                                                                text: 'Auth', dataIndex: 'authnbr', width: 55
                                                            },
                                                            {
                                                                text: 'Curr', dataIndex: 'mfop', width: 50
                                                            },
                                                            {
                                                                text: 'Amount', dataIndex: 'vfop', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#c0f0af;font-weight:bold;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                            {
                                                                text: 'Auth<br>Amount', dataIndex: 'autamount', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#c0f0af;font-weight:bold;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Doc.<br>Type', width: 65, dataIndex: 'tpdoc'
                                                    },
                                                    {
                                                        text: 'Ticket', width: 110,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#FCF6DC;font-weight:bold;";
                                                            const {ccia, forma, serie} = record.data;
                                                            const ticket = ccia + forma + serie;
                                                            return ticket;
                                                        }
                                                    },
                                                    {
                                                        text: 'PNR', width: 70, dataIndex: 'pnr'
                                                    },
                                                    {
                                                        text: 'Sale<br>Date', width: 80, dataIndex: 'sentdate'
                                                    },
                                                    {
                                                        text: 'Status<br>Reverse', width: 90, dataIndex: 'reversa',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            if (value === 'Y') {
                                                                value = 'Reversed';
                                                            } else {
                                                                value = 'Pending';
                                                            }
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Usages', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            const {usopxcp1, usopxcp2, usopxcp3, usopxcp4} = record.data;
                                                            const usages = usopxcp1 + usopxcp2 + usopxcp3 + usopxcp4;
                                                            return usages;
                                                        }
                                                    }
                                                ]
                                            },
                                            bbar: {
                                                xtype: 'panel',
                                                border: false,
                                                width: '98%',
                                                layout: {
                                                    type: 'hbox',
                                                    pack: 'end'
                                                }, // Distribución horizontal
                                                defaults: {
                                                    xtype: 'textfield',
                                                    margin: '3 5 3 5',
                                                    labelStyle: 'text-align:right;font-weight: bolder;',
                                                    fieldStyle: 'text-align:right;',
                                                    editable: false
                                                },
                                                items: [
                                                    {
                                                        id: prototype.idDE + '-totDCTickets',
                                                        fieldLabel: 'Total Tickets',
                                                        submitValue: false,
                                                        labelWidth: 100,
                                                        width: 150,
                                                        value: '0'
                                                    },
                                                    {
                                                        id: prototype.idDE + '-totDCAmount',
                                                        fieldLabel: 'Sum Amount',
                                                        submitValue: false,
                                                        labelWidth: 100,
                                                        width: 180,
                                                        value: '0.00'
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                }
                                //</editor-fold>
                            ]
                        },
                    ]
                },
                {
                    xtype: 'panel',
                    width: '100%',
                    id: prototype.idDE + '-panelGrids2',
                    border: false,
                    hidden: true,
                    defaults: {},
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'tabpanel',
                            id: prototype.idDE + '-tabMain2',
                            width: '100%',
                            height: 'auto',
                            border: false,
                            margin: '0 1 0 1',
                            bodyStyle: 'background: transparent',
                            //layout: 'fit',
                            defaults: {
                                //margin: '0 5 0 5',
                                height: 'auto',
                                autoScroll: false,
                                layout: 'fit',
                                defaults: {
                                    width: '100%',
                                    minHeight: 100,
                                    maxHeight: 155,
                                    viewConfig: {
                                        stripeRows: true,
                                        enableTextSelection: true,
                                        markDirty: false
                                    },
                                    columnLines: true,
                                    autoScroll: true,
                                    height: 'auto'
                                }
                            },
                            items: [
                                {
                                    title: 'Balances',
                                    itemId: 'B',
                                    id: prototype.idDE + '-tabBalances',
                                    items: [
                                        {
                                            xtype: 'grid',
                                            border: false,
                                            id: prototype.idDE + '-gridBalances',
                                            emptyText: 'No cards available',
                                            columns: {
                                                defaults: {
                                                    align: 'center',
                                                    menuDisabled: true,
                                                    sortable: true
                                                },
                                                items: [
                                                    {
                                                        text: 'Status', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return 'Pending';
                                                        }
                                                    },
                                                    {
                                                        text: 'Sales<br>Date', dataIndex: 'SDATE', width: 80
                                                    },
                                                    {
                                                        text: 'Trans.<br>Type', dataIndex: 'TRNCU', width: 70
                                                    },
                                                    {
                                                        text: 'Ticket', width: 120,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#FCF6DC;font-weight:bold;";
                                                            const obj = record.data;
                                                            const ticket = obj.CCIA + obj.FORMA + obj.SERIE;
                                                            return ticket;
                                                        }
                                                    },
                                                    {
                                                        text: 'Credit Card',
                                                        defaults: {
                                                            align: 'center',
                                                            menuDisabled: true,
                                                            sortable: true
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Cod', dataIndex: 'SCARDCOD', width: 50
                                                            },
                                                            {
                                                                text: 'Number', dataIndex: 'SCARDN', width: 130
                                                            },
                                                            {
                                                                text: 'Auth', dataIndex: 'SAUTHOC', width: 70
                                                            },
                                                            {
                                                                text: 'Corrl', width: 50, dataIndex: 'CORRL'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Curr', dataIndex: 'MONEDA', width: 50
                                                    },
                                                    {
                                                        text: 'Settl.<br>Amount', dataIndex: 'TGROSAMOUN', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#c0f0af;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: 'Sales<br>Amount', dataIndex: 'VFOPVTA', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#c0f0af;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: 'Balance<br>Amount', dataIndex: 'SALDO', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#c0f0af;font-weight:bold;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        sortable: false,
                                                        xtype: 'actioncolumn',
                                                        width: 40,
                                                        text: 'Del.',
                                                        //id: prototype.id + '-gridColumnDelete',
                                                        align: 'center',
                                                        items: [
                                                            {
                                                                iconCls: 'prx-icon-image-trash',
                                                                tooltip: 'Delete',
                                                                handler: 'onDeleteRecordBPO'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="Adjustment">
                {
                    xtype: 'panel',
                    id: prototype.idDE + '-panelAdjustments',
                    width: '98%',
                    border: false,
                    hidden: true,
                    margin: '0 5 0 5',
                    defaults: {},
                    items: [
                        {
                            xtype: 'grid',
                            border: true,
                            id: prototype.idDE + '-gridAdjustments',
                            viewConfig: {
                                stripeRows: true,
                                enableTextSelection: true,
                                markDirty: false
                            },
                            margin: '0 5 0 5',
                            columnLines: true,
                            autoScroll: true,
                            height: 50,
                            width: '100%',
                            hideHeaders: true,
                            style: {
                                background: '#E6EFD2' // Cambia el fondo del grid
                            },
                            //bodyStyle: 'background: transparent',
                            tbar: {
                                xtype: 'panel',
                                border: false,
                                width: '100%',
                                layout: {
                                    type: 'hbox',
                                    align: 'left'
                                },
                                margin: '2 5 2 5',
                                bodyStyle: 'background: transparent',
                                defaults: {
                                    margin: '0 5 0 5'
                                },
                                items: [
                                    {
                                        xtype: 'combo',
                                        id: prototype.idDE + '-codAdjustment',
                                        name: 'adjucode',
                                        valueField: 'code',
                                        displayField: 'name',
                                        value: '',
                                        queryMode: 'local',
                                        emptyText: 'Select',
                                        editable: false,
                                        width: 220,
                                        labelWidth: 80,
                                        fieldLabel: 'Adju. Type',
                                        store: Ext.create('Ext.data.SimpleStore', {
                                            fields: ['code', 'name'],
                                            data: [
                                                ['01', 'Dif. Liq. vs Sales'],
                                                ['03', 'ADM/Doble emisión TKT'],
                                                ['04', 'TKTs VOID']
                                            ]
                                        })
                                    },
                                    {
                                        xtype: 'textfield',
                                        name: 'adjucomment',
                                        id: prototype.idDE + '-observAdjustment',
                                        width: 450,
                                        labelWidth: 80,
                                        maxLength: 100,
                                        enforceMaxLength: true,
                                        fieldLabel: 'Observation'
                                    },
                                    {
                                        xtype: 'button',
                                        width: 25,
                                        iconCls: 'prx-icon-image-trash',
                                        tooltip: 'Delete Adjustment',
                                        listeners: {
                                            click: 'onDeleteAdjustment'
                                        }
                                    }
                                ]
                            },
                            plugins: {
                                // Agrega el plugin de edición para habilitar la edición en la columna
                                ptype: 'cellediting',
                                clicksToEdit: 2, // 1 clic para editar
                                listeners: {
                                    edit: function (editor, context) {
                                        context.grid.getView().refresh();
                                    }
                                }
                            },
                            model: null,
                            columns: {
                                defaults: {
                                    align: 'center',
                                    menuDisabled: true,
                                    sortable: false
                                },
                                items: [
                                    {text: 'Status', width: 80,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            value = 'Adjustment';
                                            return value;
                                        }
                                    },
                                    {text: 'Doc.<br>Type', dataIndex: 'trncu', width: 61,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Credit Card',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {text: 'Type', dataIndex: 'scardcod', width: 40,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";

                                                    return value;
                                                }
                                            },
                                            {text: 'Number', dataIndex: 'scardn', width: 115,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";

                                                    return value;
                                                }
                                            },
                                            {text: 'Approval', dataIndex: 'sauthoc', width: 65,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";

                                                    return value;
                                                }
                                            }
                                        ]
                                    },
                                    {text: 'Curr', dataIndex: 'scurrency', width: 45,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";

                                            return value;
                                        }
                                    },
                                    {header: 'Amount', dataIndex: 'svfops', width: 100,
                                        editor: {
                                            xtype: 'numberfield',
                                            allowBlank: false,
                                            hideTrigger: true, // Oculta las flechas para incrementar/decrementar
                                            keyNavEnabled: false, // Desactiva la navegación con teclado
                                            mouseWheelEnabled: false, // Desactiva la rueda del mouse para cambiar el valor
                                            //maskRe: /[0-9]/
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#F0FA8F";

                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                        }
                                    },
                                    {text: 'Sales<br>Date', dataIndex: 'sdate', width: 61,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {text: 'PNR', dataIndex: 'spnr', width: 62,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";

                                            return value;
                                        }
                                    },
                                    {text: 'Ticket', width: 112,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "background-color:#FCF6DC;font-weight:bold;";
                                            const obj = record.data;
                                            const ticket = obj.ccia + obj.forma + obj.serie;
                                            return ticket;
                                        }
                                    },
                                    {
                                        text: 'Corrl', dataIndex: 'corrl', width: 50
                                    },
                                    {
                                        text: 'FVoid', dataIndex: 'fvoid', width: 50
                                    },
                                    {text: 'Agent', dataIndex: 'sagent', width: 62,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";

                                            return value;
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="Control Data">
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
                },
                {
                    xtype: 'panel',
                    width: '100%',
                    layout: 'hbox',
                    align: 'middle',
                    margin: '10',
                    border: false,
                    defaults: {
                        xtype: 'textfield',
                        fieldStyle: 'text-align: center',
                        padding: '10',
                        hiddenLabel: true,
                        labelAlign: 'right',
                        hidden: true,
                        align: 'middle'
                    },
                    items: [
                        {
                            xtype: 'fieldset',
                            title: 'Proceed Option',
                            id: prototype.idDE + '-proceedRadioGroup',
                            hidden: true,
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            style: {
                                background: 'transparent'
                            },
                            items: [
                                {
                                    xtype: 'radiogroup',
                                    id: prototype.idDE + '-proceedRadioGroup-inner',
                                    columns: 2,
                                    margin: '0 10 0 0',
                                    items: [
                                        {
                                            boxLabel: 'Proceed',
                                            name: 'proceedStatus',
                                            inputValue: '1',
                                            width: 100,
                                        },
                                        {
                                            boxLabel: 'Reverse',
                                            name: 'proceedStatus',
                                            inputValue: '2',
                                            width: 130,
                                        }
                                    ],
                                    listeners: {
                                        change: 'changeProcces',
//                                       scope: this
                                    }

                                },
                                {
                                    xtype: 'button',
                                    text: 'Update',
                                    id: prototype.idDE + '-btn-update-status',
                                    iconCls: 'prx-icon-update',
                                    hidden: true,
                                    width: 80,
                                    height: 30,
                                    listeners: {
                                        click: 'onUpdateClickStatus'
                                    }
                                }
                            ]
                        }
                    ]
                }

                //</editor-fold>
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
            fieldStyle: 'text-align:center',
            defaults: {
                scale: 'medium'
            },
            items: [
                 {
                    text: 'Multi-payment',
                    id: prototype.idDE + '-btn-multi-pay',
                    iconCls: 'prx-icon-update',
                    hidden: true,
                    listeners: {
                        click: 'onClickMultipaymnentConciliation'
                    }
                },
                {
                    text: 'Update',
                    id: prototype.idDE + '-btn-update',
                    iconCls: 'prx-icon-update',
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Update',
                    id: prototype.idDE + '-btn-update-balance',
                    hidden: true,
                    iconCls: 'prx-icon-update',
                    listeners: {
                        click: 'onUpdateBalanceClick'
                    }
                },
                {
                    text: 'Reverse Match',
                    hidden: true,
                    id: prototype.idDE + '-reverseTrnx',
                    iconCls: 'prx-icon-delete',
                    listeners: {
                        click: 'onReverseTransaction'
                    }
                },
                {
                    text: 'Show MSI Tracking',
                    hidden: true,
                    id: prototype.idDE + '-MatchMSITracking',
                    iconCls: 'prx-icon-update',
                    listeners: {
                        click: 'onClickMSITracking'
                    }
                },
                {
                    text: 'Show Chargeback Tracking',
                    hidden: true,
                    id: prototype.idDE + '-ChargebackTracking',
                    iconCls: 'prx-icon-refresh',
                    listeners: {
                        click: 'onClickChbkTracking'
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