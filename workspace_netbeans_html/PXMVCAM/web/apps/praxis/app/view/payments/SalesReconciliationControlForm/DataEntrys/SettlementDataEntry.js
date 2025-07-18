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
    width: 1050,
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
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="Merchant">
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
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="Sale Information">
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
                                },
                                {
                                    fieldLabel: 'Invoice Ref. Number',
                                    name: 'invoirn',
                                    id: prototype.idDE3 + '-txtInvoirn',
                                    labelWidth: 130,
                                    width: 230,
                                    value: 'None'
                                }
                            ]
                        }
                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="Chargeback/Adjustment Information">
                {
                    title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:13px;">Chargeback/Adjustment Information</span>',
                    hidden: true,
                    id: prototype.idDE3 + '-panelChbk',
                    items: [
                        {
                            items: [
                                {
                                    fieldLabel: 'Type',
                                    id: prototype.idDE3 + '-typeChbk',
                                    labelWidth: 120,
                                    fieldStyle: 'color:red;font-weight:bold;text-align:center;',
                                    width: 230
                                },
                                {
                                    fieldLabel: 'Number',
                                    name: 'chgbnum',
                                    labelWidth: 80,
                                    width: 260
                                },
                                {
                                    fieldLabel: 'Reason Code',
                                    name: 'codchgback',
                                    labelWidth: 120,
                                    width: 300
                                }
                            ]
                        }
                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="Credit Card Information">
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
                                            field.setRawValue(opts[newValue] || 'None');
                                        }
                                    },
                                    value: 'None'
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
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="Amounts/Commissions">
                {
                    title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:13px;">Amounts/Commissions</span>',
                    items: [
                        {
                            items: [
                                {
                                    fieldLabel: 'Trans. Amount',
                                    name: 'f_TGROSAMOUN',
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
                                    labelWidth: 120,
                                    width: 230
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
                                },
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
                                    name: 'servicefee',
                                    labelWidth: 120,
                                    width: 230
                                },
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
                                    name: 'discamoun',
                                    labelWidth: 120,
                                    width: 230
                                }
                            ]
                        },
                        {
                            items: [

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
                                    fieldLabel: 'Comm. VAT',
                                    name: 'discamouni',
                                    labelWidth: 120,
                                    width: 230
                                },
                                {
                                    fieldLabel: 'MSI VAT',
                                    name: 'overcom12',
                                    labelWidth: 120,
                                    width: 230
                                },
                                {
                                    fieldLabel: 'TAX',
                                    name: 'f_TAX',
                                    labelWidth: 120,
                                    width: 230
                                }
                            ]
                        },
                        {
//                            layout: {
//                                type: 'hbox',
//                                pack: 'center'
//                            },
                            items: [
                                {
                                    fieldLabel: 'Payment Amount',
                                    name: 'f_TGROSAMPAY',
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
                                    labelWidth: 120,
                                    width: 230
                                },
                                {
                                    fieldLabel: 'Exch. Rate',
                                    name: 'exchrate',
                                    labelWidth: 120,
                                    width: 230
                                },
                                {
                                    fieldLabel: 'NET Amount',
                                    name: 'netopay',
                                    labelWidth: 120,
                                    fieldStyle: 'background-color:#8AE884;font-weight:bold;text-align:center;',
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
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="Conciliation Status">
                {
                    title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:13px;">Conciliation Status</span>',
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
                                                'A': 'Match OC/Camepa',
                                                'C': 'Match Complement',
                                                'D': 'Match Balance',
                                                'E': 'Match Duplicate Pay.',
                                                'M': 'Match Multi-Payment',
                                                '0': 'Stand By',
                                                '1': 'Match',
                                                '2': 'Sales Without Settl.',
                                                '3': 'Settl. Without Sales',
                                                '4': 'Match Partial',
                                                '5': 'Match Manual',
                                                '6': 'Match Forced',
                                                '7': 'Match Compensation',
                                                '8': 'Match Transactional',
                                                '9': 'Match Void'
                                            };
                                            field.setRawValue(opts[newValue] || '');
                                        }
                                    }
                                },
                                {
                                    fieldLabel: 'Rule',
                                    name: 'fregla',
                                    labelWidth: 50,
                                    width: 160,
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
                                    fieldLabel: 'Flag Compl.',
                                    name: 'fcompl',
                                    labelWidth: 90,
                                    width: 190,
                                    listeners: {
                                        change: function (field, newValue) {
                                            const opts = {
                                                '1': 'Plusgrade',
                                                '2': 'Ligas',
                                                '3': 'Tablet',
                                                '4': 'BPO'
                                            };
                                            field.setRawValue(opts[newValue] || 'None');
                                        }
                                    },
                                    value: 'None'
                                },
                                {
                                    fieldLabel: 'Adjustment',
                                    name: 'codadju',
                                    labelWidth: 80,
                                    width: 120
                                },
                                {
                                    fieldLabel: 'Description',
                                    name: 'desc_ADJU',
                                    labelWidth: 85,
                                    width: 200
                                }
                            ]
                        }
                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="Desglose">
                {
                    xtype: 'panel',
                    id: prototype.idDE3 + '-panelDesglose',
                    layout: {
                        type: 'vbox',
                        pack: 'center'
                    },
                    border: false,
                    margin: '5 5 5 5',
                    width: '100%',
                    title: 'Tickets',
                    defaults: {},
                    items: [
                        //<editor-fold defaultstate="collapsed" desc="SALE/RFND">
                        {
                            xtype: 'grid',
                            border: false,
                            id: prototype.idDE3 + '-gridDesglose',
                            viewConfig: {
                                stripeRows: true,
                                enableTextSelection: true,
                                markDirty: false
                            },
                            columnLines: true,
                            autoScroll: true,
                            minHeight: 100,
                            height: 'auto',
                            maxHeight: 150,
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
                                                text: 'Auth', dataIndex: 'sauthoc', width: 60
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
                                    },
                                    {
                                        text: 'Commissions',
                                        defaults: {
                                            align: 'center',
                                            menuDisabled: true,
                                            sortable: true
                                        },
                                        columns: [
                                            {
                                                text: 'Amount', dataIndex: 'discamounc', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#A2C2E2;font-weight:bold;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'VAT', dataIndex: 'discamouni', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#A2C2E2;font-weight:bold;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'MSI',
                                        defaults: {
                                            align: 'center',
                                            menuDisabled: true,
                                            sortable: true
                                        },
                                        columns: [
                                            {
                                                text: 'Amount', dataIndex: 'acceamou', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#A2A7E2;font-weight:bold;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'VAT', dataIndex: 'ivacom12', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#A2A7E2;font-weight:bold;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        },
                        //</editor-fold>
                        //<editor-fold defaultstate="collapsed" desc="CHBK">
                        {
                            xtype: 'grid',
                            border: false,
                            hidden: true,
                            id: prototype.idDE3 + '-gridDesgloseCHBK',
                            viewConfig: {
                                stripeRows: true,
                                enableTextSelection: true,
                                markDirty: false
                            },
                            columnLines: true,
                            autoScroll: true,
                            minHeight: 100,
                            //height: 'auto',
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
                                                text: 'Cod', dataIndex: 'scarcod', width: 45
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
                            }
                        }
                        //</editor-fold>
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
            border: false,
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
                    text: 'Cancel',
                    id: prototype.idDE3 + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});