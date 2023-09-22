prototype.idDE = prototype.id + '-TransacErrorBPODataEntry';

Ext.define('Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.TransacErrorBPODataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.TransacErrorBPODataEntry',
    requires: [
        'Ext.Praxis.controller.payments.SalesReconciliationControl.TransacErrorBPODataEntryController',
        'Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.MSITrackingDataEntry'
    ],
    controller: 'TransacErrorBPODataEntryController',
    title: 'Transaction Error - Form',
    header: true,
    height: 850,
    width: 1320,
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
            width: 1300,
            height: 820,
            border: true,
            autoScroll: true,
            id: prototype.idDE + '-mainForm',
            layout: {
                type: 'auto',
                pack: 'center'
            },
            bodyPadding: 10,
            items: [
                //<editor-fold defaultstate="collapsed" desc="General Information">
                {
                    xtype: 'fieldset',
                    title: 'General Information',
                    layout: {
                        type: 'vbox',
                        align: 'left'
                    },
                    border: true,
                    width: '98%',
                    style: {
                        backgroundColor: '#f0f0f0' // Cambiar el color de fondo a gris claro (#f0f0f0)
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: {
                                type: 'hbox',
                                align: 'center'
                            },
                            width: '100%',
                            border: false,
                            defaults: {
                                xtype: 'textfield',
                                margin: '3 5 3 5',
                                labelStyle: 'text-align:center;font-weight: bolder;',
                                fieldStyle: 'text-align:center;',
                                editable: false
                            },
                            items: [
                                {

                                    name: 'arefnbr',
                                    fieldLabel: 'Ref. Number',
                                    labelWidth: 100,
                                    width: 270
                                },
                                {
                                    name: 'prda',
                                    fieldLabel: 'Processing Date',
                                    labelWidth: 120,
                                    width: 200
                                },
                                {
                                    name: 'desc_PROC',
                                    fieldLabel: 'Processor',
                                    labelWidth: 70,
                                    width: 250
                                },
                                {
                                    name: 'scountry',
                                    fieldLabel: 'Country',
                                    labelWidth: 60,
                                    width: 120
                                },
                                {
                                    name: 'invoirn',
                                    fieldLabel: 'Invoice Ref. Nbr',
                                    labelWidth: 110,
                                    width: 270
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: {
                                type: 'hbox',
                                align: 'center'
                            },
                            width: '100%',
                            border: false,
                            defaults: {
                                xtype: 'textfield',
                                margin: '3 5 3 5',
                                labelStyle: 'text-align:center;font-weight: bolder;',
                                fieldStyle: 'text-align:center;',
                                editable: false
                            },
                            items: [
                                {
                                    name: 'pmerchid',
                                    fieldLabel: 'P. Merchant ID',
                                    labelWidth: 100,
                                    width: 200
                                },
                                {
                                    name: 'desc_PMERCHID',
                                    width: 200
                                },
                                {
                                    name: 'smerchid',
                                    fieldLabel: 'Sales Merchant ID',
                                    labelWidth: 120,
                                    width: 220
                                },
                                {
                                    name: 'desc_SMERCHID',
                                    width: 200
                                },
                                {
                                    name: 'fcompl',
                                    fieldLabel: 'Flag Complement',
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
                                }
                            ]
                        }
                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="Accounting Information">
                {
                    xtype: 'fieldset',
                    title: 'Accounting Information',
                    layout: {
                        type: 'vbox',
                        align: 'left'
                    },
                    border: true,
                    width: '98%',
                    style: {
                        backgroundColor: '#f0f0f0' // Cambiar el color de fondo a gris claro (#f0f0f0)
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: {
                                type: 'hbox',
                                align: 'center'
                            },
                            width: '100%',
                            border: false,
                            defaults: {
                                xtype: 'textfield',
                                margin: '3 5 3 5',
                                labelStyle: 'text-align:center;font-weight: bolder;',
                                fieldStyle: 'text-align:center;',
                                editable: false
                            },
                            items: [
                                {
                                    name: 'stconl',
                                    fieldLabel: 'Status',
                                    labelWidth: 80,
                                    width: 150,
                                    listeners: {
                                        change: function (field, newValue) {
                                            const opts = {
                                                '1': 'Accounted',
                                                '2': 'Debug'
                                            };
                                            field.setRawValue(opts[newValue] || 'Pending');
                                        }
                                    }
                                },
                                {
                                    name: 'fcontl',
                                    fieldLabel: 'Accounting Date',
                                    labelWidth: 100,
                                    width: 180
                                },
                                {
                                    name: 'idconl',
                                    fieldLabel: 'ID',
                                    labelWidth: 30,
                                    width: 400
                                }
                            ]
                        }
                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="Error Information">
                {
                    xtype: 'fieldset',
                    title: 'Error Information',
                    layout: {
                        type: 'vbox',
                        align: 'left'
                    },
                    border: true,
                    width: '98%',
                    style: {
                        backgroundColor: '#f0f0f0' // Cambiar el color de fondo a gris claro (#f0f0f0)
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: {
                                type: 'hbox',
                                align: 'center'
                            },
                            width: '100%',
                            border: false,
                            defaults: {
                                xtype: 'textfield',
                                margin: '3 5 3 5',
                                labelStyle: 'text-align:center;font-weight: bolder;',
                                fieldStyle: 'text-align:center;',
                                editable: false
                            },
                            items: [
                                {
                                    name: 'cerrorhst',
                                    fieldLabel: 'History',
                                    labelWidth: 110,
                                    width: 200
                                },
                                {
                                    name: 'codadju',
                                    fieldLabel: 'Adjustment',
                                    labelWidth: 100,
                                    width: 210
                                },
                                {
                                    name: 'desc_ADJU',
                                    fieldLabel: 'Description',
                                    labelWidth: 100,
                                    width: 380
                                },
                                {
                                    name: 'adjucoment',
                                    fieldLabel: 'BPO Comment',
                                    labelWidth: 110,
                                    fieldStyle: 'text-align:left;',
                                    padding:'5 0 5 0',
                                    width: 400
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: {
                                type: 'hbox',
                                align: 'center'
                            },
                            width: '100%',
                            border: false,
                            defaults: {
                                xtype: 'textfield',
                                margin: '3 5 3 5',
                                labelStyle: 'text-align:center;font-weight: bolder;',
                                fieldStyle: 'text-align:center;',
                                editable: false
                            },
                            items: [
                                {
                                    name: 'fselec',
                                    fieldLabel: 'Flag Selection',
                                    labelWidth: 110,
                                    width: 200,
                                    listeners: {
                                        change: function (field, newValue) {
                                            const opts = {
                                                'L': 'Load',
                                                'D': 'Duplicated'
                                            };
                                            field.setRawValue(opts[newValue] || '');
                                        }
                                    }
                                },
                                {
                                    name: 'cerror',
                                    fieldLabel: 'Sett. vs Sales',
                                    labelWidth: 100,
                                    width: 210
                                },
                                {
                                    name: 'desc_ERROR',
                                    fieldLabel: 'Description',
                                    labelWidth: 100,
                                    width: 380
                                }
                            ]
                        }
                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="Sales Information">
                {
                    xtype: 'fieldset',
                    title: 'Sales Information',
                    layout: {
                        type: 'vbox',
                        align: 'left'
                    },
                    border: true,
                    width: '98%',
                    style: {
                        backgroundColor: '#f0f0f0' // Cambiar el color de fondo a gris claro (#f0f0f0)
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: {
                                type: 'hbox',
                                align: 'center'
                            },
                            width: '100%',
                            border: false,
                            defaults: {
                                xtype: 'textfield',
                                margin: '3 5 3 5',
                                labelStyle: 'text-align:center;font-weight: bolder;',
                                fieldStyle: 'text-align:center;',
                                editable: false
                            },
                            items: [
                                {
                                    name: 'sdate',
                                    fieldLabel: 'Sales Date',
                                    labelWidth: 70,
                                    width: 150
                                },
                                {
                                    name: 'paydate',
                                    fieldLabel: 'Payment Date',
                                    labelWidth: 90,
                                    width: 170
                                },
                                {
                                    name: 'passed_DAYS',
                                    fieldLabel: 'Diff Days',
                                    labelWidth: 60,
                                    width: 120
                                },
                                {
                                    name: 'transdate',
                                    fieldLabel: 'Transaction Date',
                                    labelWidth: 120,
                                    width: 200
                                },
                                {
                                    name: 'fvoid',
                                    fieldLabel: 'Flag Void',
                                    labelWidth: 60,
                                    width: 120
                                },
                                {
                                    name: 'transtype',
                                    fieldLabel: 'Transaction Type',
                                    labelWidth: 120,
                                    width: 220
                                },
                                {
                                    name: 'scurrency',
                                    fieldLabel: 'Currency',
                                    labelWidth: 60,
                                    width: 120
                                }
                            ]
                        }
                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="Conciliacion">
                {
                    xtype: 'panel',
                    width: '98%',
                    border: false,
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    bodyStyle: 'background: transparent;',
                    defaults: {
                        xtype: 'fieldset',
                        layout: {
                            type: 'vbox',
                            align: 'left'
                        },
                        margin: '0 2 0 2',
                        border: true,
                        style: {
                            backgroundColor: '#f0f0f0' // Cambiar el color de fondo a gris claro (#f0f0f0)
                        },
                        defaults: {
                            xtype: 'textfield',
                            margin: '3 2 3 2',
                            labelStyle: 'text-align:left;font-weight: bolder;',
                            fieldStyle: 'text-align:center;',
                            editable: false
                        }
                    },
                    items: [
                        //<editor-fold defaultstate="collapsed" desc="BPO Status">
                        {
                            title: 'BPO Status',
                            width: '24%',
                            //flex: 2,
                            items: [
                                {
                                    xtype: 'panel',
                                    width: '100%',
                                    border: false,
                                    bodyStyle: 'background: transparent;',
                                    layout: {
                                        type: 'hbox',
                                        align: 'left'
                                    },
                                    defaults: {
                                        xtype: 'textfield',
                                        //margin: '3 2 3 2',
                                        labelStyle: 'text-align:left;font-weight: bolder;',
                                        fieldStyle: 'text-align:center;',
                                        editable: false
                                    },
                                    items: [
                                        {
                                            name: 'stval',
                                            fieldLabel: 'Status',
                                            labelWidth: 100,
                                            width: 230,
                                            listeners: {
                                                change: function (field, newValue) {
                                                    const opts = {
                                                        '0': 'Stand By',
                                                        '1': 'Match',
                                                        '2': 'Sales Without Sett.',
                                                        '3': 'Settl. Without Sales',
                                                        '4': 'Match Diff.',
                                                        '5': 'Manual Match',
                                                        '6': 'Forced Match',
                                                        '7': 'Compensation Match',
                                                        '8': 'Pending RFND'
                                                    };
                                                    field.setRawValue(opts[newValue] || '');
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            width: 25,
                                            margin: '0 5 0 5',
                                            hidden: true,
                                            id: prototype.idDE + '-reverseTrnx',
                                            iconCls: 'prx-icon-image-log',
                                            tooltip: 'Reverse',
                                            listeners: {
                                                click: 'onReverseTransaction'
                                            }
                                        }
                                    ]
                                },
                                {
                                    name: 'fregla',
                                    fieldLabel: 'Rule',
                                    labelWidth: 100,
                                    width: 180,
                                    listeners: {
                                        change: function (field, newValue) {
                                            const opts = {
                                                '1': 'Ticket',
                                                '2': 'PNR',
                                                '3': 'C.Card',
                                                '4': 'Desg. Manual',
                                                '5': 'Desg. Transac.'
                                            };
                                            field.setRawValue(opts[newValue] || '');
                                        }
                                    }
                                },
                                {
                                    name: 'freversa',
                                    fieldLabel: 'Reverse Policy',
                                    labelWidth: 100,
                                    width: 200
                                }
                            ]
                        },
                        //</editor-fold>
                        //<editor-fold defaultstate="collapsed" desc="MSI">
                        {
                            title: 'MSI',
                            width: '20%',
                            //flex: 2,
                            items: [
                                {
                                    name: 'nbrinsta',
                                    fieldLabel: 'Inst. Plan',
                                    labelWidth: 100,
                                    width: 180
                                },
                                {
                                    name: 'instanbr',
                                    fieldLabel: 'Inst. Number',
                                    labelWidth: 100,
                                    width: 180
                                },
                                {
                                    name: 'payplatype',
                                    fieldLabel: 'Payment Plan',
                                    labelWidth: 100,
                                    width: 180
                                },
                                {
                                    xtype: 'panel',
                                    width: '100%',
                                    border: false,
                                    bodyStyle: 'background: transparent;',
                                    layout: {
                                        type: 'hbox',
                                        pack: 'end'
                                    },
                                    items: [
                                        {
                                            xtype: 'button',
                                            width: 25,
                                            iconCls: 'prx-icon-update',
                                            tooltip: 'MSI Tracking',
                                            listeners: {
                                                click: 'onClickMSITracking'
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        //</editor-fold>        
                        //<editor-fold defaultstate="collapsed" desc="Conciliation Information">
                        {
                            title: 'Conciliation Information',
                            width: '28%',
                            //flex: 2,
                            items: [
                                {
                                    name: 'scardn',
                                    fieldLabel: 'CC. Number',
                                    labelWidth: 120,
                                    width: 280
                                },
                                {
                                    name: 'sauthoc',
                                    fieldLabel: 'Auth. Number',
                                    labelWidth: 120,
                                    width: 190
                                },
                                {
                                    name: 'qtytkt',
                                    fieldLabel: 'Qty. Tickets',
                                    labelWidth: 120,
                                    width: 160
                                },
                                {
                                    name: 'ticket',
                                    fieldLabel: 'Ref. Ticket',
                                    labelWidth: 120,
                                    width: 250,
                                    editable: false

                                },
                                {
                                    name: 'spnr',
                                    fieldLabel: 'Ref. PNR',
                                    labelWidth: 120,
                                    width: 190,
                                    editable: false
                                }
                            ]
                        },
                        //</editor-fold>
                        //<editor-fold defaultstate="collapsed" desc="Amounts Information">
                        {
                            title: 'Amounts Information',
                            width: 'auto',
                            layout: {
                                type: 'vbox',
                                align: 'right'
                            },
                            //flex: 2,
                            defaults: {
                                xtype: 'textfield',
                                margin: '3 2 3 2',
                                labelStyle: 'text-align:left;font-weight: bolder;',
                                fieldStyle: 'text-align:right;background-color:#c0f0af;',
                                editable: false
                            },
                            items: [
                                {
                                    name: 'tgrosamoun',
                                    id: prototype.idDE + '-amtTransac',
                                    fieldLabel: 'Transaction',
                                    labelWidth: 100,
                                    width: 190,
                                    listeners: {
                                        change: function (field, newValue) {
                                            field.setRawValue(Ext.util.Format.number(newValue, '0,000.00'));
                                        }
                                    }
                                },
                                {
                                    name: 'svfops',
                                    fieldLabel: 'Sales',
                                    labelWidth: 100,
                                    width: 190,
                                    listeners: {
                                        change: function (field, newValue) {
                                            field.setRawValue(Ext.util.Format.number(newValue, '0,000.00'));
                                        }
                                    }
                                },
                                {
                                    id: prototype.idDE + '-amtDifference',
                                    fieldLabel: 'Difference',
                                    submitValue: false,
                                    labelWidth: 100,
                                    width: 190,
                                    value: '0.00'
                                }
                            ]
                        }
                        //</editor-fold>
                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="Scanner">
                {
                    xtype: 'panel',
                    width: '98%',
                    border: false,
                    id: prototype.idDE + '-scannerPanel',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        //<editor-fold defaultstate="collapsed" desc="Scanner Inputs">
                        {
                            xtype: 'fieldset',
                            id: prototype.idDE + '-scannerInputs',
                            title: 'Scanner',
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            border: true,
                            width: '98%',
                            style: {
                                backgroundColor: '#EFE3D2' // Cambiar el color de fondo a gris claro (#f0f0f0)
                            },
                            items: [
                                {
                                    xtype: 'form',
                                    id: prototype.idDE + '-scannerForm',
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    width: '100%',
                                    border: false,
                                    bodyStyle: 'background: transparent',
                                    defaults: {
                                        xtype: 'textfield',
                                        margin: '2 5 2 5',
                                        labelStyle: 'text-align:right;font-weight: bolder;',
                                        fieldStyle: 'text-align:center;'
                                    },
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
                                            editable: false,
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
                                            width: 25,
                                            iconCls: 'prx-icon-bpo-comment',
                                            tooltip: 'Open BPO Comment',
                                            listeners: {
                                                click: 'onOpenComments'
                                            }

                                        }
                                    ]
                                },
                            ]
                        },
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
                            width: '98%',
                            style: {
                                backgroundColor: '#EFE3D2' // Cambiar el color de fondo a gris claro (#f0f0f0)
                            },
                            defaults: {
                                xtype: 'textfield',
                                margin: '3 5 3 5',
                                labelStyle: 'text-align:center;font-weight: bolder;'
                            },
                            items: [
                                {
                                    name: 'bpocoment',
                                    fieldLabel: 'BPO Comment',
                                    labelWidth: 100,
                                    width: 450
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
                        {
                            xtype: 'tabpanel',
                            id: prototype.idDE + '-tabMain',
                            width: '98%',
                            height: 'auto',
                            //maxHeight: 220,
                            border: false,
                            //disabled:true,
                            margin: '5 1 5 1',
                            autoScroll: true,
                            bodyStyle: 'background: transparent',
                            listeners: {
                                tabchange: 'onChangeTab'
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
                                            viewConfig: {
                                                stripeRows: true,
                                                enableTextSelection: true,
                                                markDirty: false
                                            },
                                            columnLines: true,
                                            autoScroll: true,
                                            minHeight: 100,
                                            height: 'auto',
                                            maxHeight: 160,
                                            width: '100%',
                                            emptyText: 'No cards available',
                                            columns: {
                                                defaults: {
                                                    align: 'center',
                                                    menuDisabled: true,
                                                    sortable: true
                                                },
                                                items: [
                                                    {
                                                        text: 'Status', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return 'Pending';
                                                        }
                                                    },
                                                    {
                                                        text: 'Source', dataIndex: 'fuente', width: 60,
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
                                                        text: 'Doc.<br>Type', dataIndex: 'trncu', width: 80
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
                                                        text: 'PNR', dataIndex: 'spnr', width: 80
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
                                                        text: 'Void', width: 50, dataIndex: 'fvoid'
                                                    },
                                                    {
                                                        text: 'Agent', dataIndex: 'sagent', width: 80
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
                                            viewConfig: {
                                                stripeRows: true,
                                                enableTextSelection: true,
                                                markDirty: false
                                            },
                                            columnLines: true,
                                            autoScroll: true,
                                            minHeight: 100,
                                            height: 'auto',
                                            maxHeight: 160,
                                            width: '100%',
                                            emptyText: 'No cards available',
                                            columns: {
                                                defaults: {
                                                    align: 'center',
                                                    menuDisabled: true,
                                                    sortable: true
                                                },
                                                items: [
                                                    {
                                                        text: 'Status', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return 'Blocked';
                                                        }
                                                    },
                                                    {
                                                        text: 'Source', dataIndex: 'fuente', width: 60,
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
                                                        text: 'Doc.<br>Type', dataIndex: 'trncu', width: 80
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
                                                        text: 'PNR', dataIndex: 'spnr', width: 80
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
                                                        text: 'Void', width: 50, dataIndex: 'fvoid'
                                                    },
                                                    {
                                                        text: 'Agent', dataIndex: 'sagent', width: 80
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
                                    //hidden: true,
                                    id: prototype.idDE + '-tabDesglose',
                                    items: [
                                        {
                                            xtype: 'grid',
                                            border: false,
                                            id: prototype.idDE + '-gridDesglose',
                                            viewConfig: {
                                                stripeRows: true,
                                                enableTextSelection: true,
                                                markDirty: false
                                            },
                                            columnLines: true,
                                            autoScroll: true,
                                            minHeight: 100,
                                            width: '100%',
                                            columns: {
                                                defaults: {
                                                    align: 'center',
                                                    menuDisabled: true,
                                                    sortable: true
                                                },
                                                items: [
                                                    {
                                                        text: 'Status', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return 'Concil.';
                                                        }
                                                    },
                                                    {
                                                        text: 'Source', dataIndex: 'fuente', width: 60,
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
                                                        text: 'Doc.<br>Type', dataIndex: 'trncu', width: 80
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
                                                                text: 'Cod', dataIndex: 'scarcod', width: 50
                                                            },
                                                            {
                                                                text: 'Number', dataIndex: 'scardn', width: 150
                                                            },
                                                            {
                                                                text: 'Auth', dataIndex: 'sauthoc', width: 80
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
                                                        text: 'PNR', dataIndex: 'spnr', width: 80
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
                                                        text: 'Void', width: 50, dataIndex: 'fvoid'
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
                                    ]
                                }
                                //</editor-fold>
                            ]
                        }
                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="Adjustment BPO">
                {
                    xtype: 'panel',
                    id: prototype.idDE + '-panelAdjustments',
                    width: '98%',
                    border: false,
                    hidden: true,
                    margin: '0 5 0 5',
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
                                        valueField: 'a4451key3',
                                        displayField: 'a4451desc1',
                                        value: '',
                                        queryMode: 'local',
                                        emptyText: 'Select',
                                        editable: false,
                                        width: 220,
                                        labelWidth: 80,
                                        fieldLabel: 'Adju. Type'
                                    },
                                    {
                                        xtype: 'textfield',
                                        name: 'adjucomment',
                                        id: prototype.idDE + '-observAdjustment',
                                        width: 450,
                                        labelWidth: 80,
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
                //<editor-fold defaultstate="collapsed" desc="User Info">
                {
                    xtype: 'fieldset',
                    title: 'User Information',
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    border: true,
                    width: '98%',
                    margin: '5 0 5 0',
                    style: {
                        backgroundColor: '#f0f0f0' // Cambiar el color de fondo a gris claro (#f0f0f0)
                    },
                    defaults: {
                        xtype: 'textfield',
                        margin: '3 5 3 5',
                        labelStyle: 'text-align:center;font-weight: bolder;',
                        fieldStyle: 'text-align:center;',
                        editable: false
                    },
                    items: [
                        {
                            name: 'usup',
                            fieldLabel: 'User Update',
                            labelWidth: 120,
                            width: 210
                        },
                        {
                            name: 'feup',
                            fieldLabel: 'Date Update',
                            labelWidth: 120,
                            width: 210
                        },
                        {
                            name: 'houp',
                            fieldLabel: 'Hour Update',
                            labelWidth: 120,
                            width: 210
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
            margin: '10 0 10 0',
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