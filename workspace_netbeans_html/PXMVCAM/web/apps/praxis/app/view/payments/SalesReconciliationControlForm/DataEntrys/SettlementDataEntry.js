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
                                    name: 'PRDA',
                                    labelWidth: 120,
                                    width: 230
                                },
                                {
                                    fieldLabel: 'Payment Date',
                                    name: 'PAYDATE',
                                    labelWidth: 100,
                                    width: 180
                                },
                                {
                                    fieldLabel: 'Processor',
                                    name: 'DESC_PROC',
                                    labelWidth: 80,
                                    width: 240
                                },
                                {
                                    fieldLabel: 'Country',
                                    name: 'SCOUNTRY',
                                    labelWidth: 60,
                                    width: 110
                                },
                                {
                                    fieldLabel: 'Trans. Type',
                                    name: 'TRANSTYPE',
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
                                    name: 'SMERCHID',
                                    labelWidth: 120,
                                    width: 230
                                },
                                {
                                    name: 'DESC_PMERCHID',
                                    width: 230
                                },
                                {
                                    fieldLabel: 'Payment Merchant',
                                    name: 'PMERCHID',
                                    labelWidth: 120,
                                    width: 230
                                },
                                {
                                    name: 'DESC_SMERCHID',
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
                                    name: 'SDATE',
                                    labelWidth: 120,
                                    width: 230
                                },
                                {
                                    fieldLabel: 'Ticket',
                                    name: 'TICKET',
                                    labelWidth: 60,
                                    width: 180
                                },
                                {
                                    fieldLabel: 'PNR',
                                    name: 'SPNR',
                                    labelWidth: 40,
                                    width: 130
                                },
                                {
                                    fieldLabel: 'Qty. Tkts',
                                    name: 'QTYTKT',
                                    labelWidth: 80,
                                    width: 150
                                },
                                {
                                    fieldLabel: 'Invoice Ref. Number',
                                    name: 'INVOIRN',
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
                                    name: 'CHGBNUM',
                                    labelWidth: 80,
                                    width: 260
                                },
                                {
                                    fieldLabel: 'Reason Code',
                                    name: 'CODCHGBACK',
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
                                    name: 'PAYPLATYPE',
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
                                    name: 'NBRINSTA',
                                    labelWidth: 80,
                                    width: 150
                                },
                                {
                                    fieldLabel: 'Inst. Number',
                                    name: 'INSTANBR',
                                    labelWidth: 90,
                                    width: 160
                                },
                                {
                                    fieldLabel: 'Card Number',
                                    name: 'SCARDN',
                                    labelWidth: 90,
                                    width: 220
                                },
                                {
                                    fieldLabel: 'Auth Code',
                                    name: 'SAUTHOC',
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
                                    name: 'F_TGROSAMOUN',
                                    readOnly: true,
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
                                    name: 'SCURRENCY',
                                    readOnly: true,
                                    labelWidth: 120,
                                    width: 230
                                },
                                {
                                    fieldLabel: 'Concil. Amount',
                                    name: 'SVFOPS',
                                    readOnly: true,
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
                                    name: 'SFEERATE',
                                    readOnly: true,
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
                                    name: 'SERVICEFEE',
                                    readOnly: true,
                                    labelWidth: 120,
                                    width: 230
                                },
                                {
                                    fieldLabel: 'Comm. Rate',
                                    name: 'DISCRATE',
                                    readOnly: true,
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
                                    name: 'DISCAMOUN',
                                    readOnly: true,
                                    labelWidth: 120,
                                    width: 230
                                }
                            ]
                        },
                        {
                            items: [

                                {
                                    fieldLabel: 'VAT Rate',
                                    name: 'DISCRATEI',
                                    readOnly: true,
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
                                    name: 'DISCAMOUNI',
                                    readOnly: true,
                                    labelWidth: 120,
                                    width: 230
                                },
                                {
                                    fieldLabel: 'MSI VAT',
                                    name: 'OVERCOM12',
                                    readOnly: true,
                                    labelWidth: 120,
                                    width: 230
                                },
                                {
                                    fieldLabel: 'TAX',
                                    name: 'F_TAX',
                                    readOnly: true,
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
                                    name: 'F_TGROSAMPAY',
                                    readOnly: true,
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
                                    name: 'PCURRENCY',
                                    readOnly: true,
                                    labelWidth: 120,
                                    width: 230
                                },
                                {
                                    fieldLabel: 'Exch. Rate',
                                    name: 'EXCHRATE',
                                    readOnly: true,
                                    labelWidth: 120,
                                    width: 230
                                },
                                {
                                    fieldLabel: 'NET Amount',
                                    name: 'NETOPAY',
                                    readOnly: true,
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
                                    name: 'STVAL',
                                    readOnly: true,
                                    labelWidth: 120,
                                    width: 230,
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
                                    fieldLabel: 'Rule',
                                    name: 'FREGLA',
                                    readOnly: true,
                                    labelWidth: 50,
                                    width: 160,
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
                                                'E': 'FE+I+PNR'
                                            };
                                            field.setRawValue(opts[newValue] || '');
                                        }
                                    }
                                },
                                {
                                    fieldLabel: 'Flag Compl.',
                                    name: 'FCOMPL',
                                    readOnly: true,
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
                                    name: 'CODADJU',
                                    readOnly: true,
                                    labelWidth: 80,
                                    width: 120
                                },
                                {
                                    fieldLabel: 'Description',
                                    name: 'DESC_ADJU',
                                    readOnly: true,
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
                                        text: 'Src', dataIndex: 'FUENTE', width: 45,
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
                                        text: 'Doc.<br>Type', dataIndex: 'TRNCU', width: 60
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
                                                text: 'Cod', dataIndex: 'SCARCOD', width: 45
                                            },
                                            {
                                                text: 'Number', dataIndex: 'SCARDN', width: 130
                                            },
                                            {
                                                text: 'Auth', dataIndex: 'SAUTHOC', width: 60
                                            },
                                        ]
                                    },
                                    {
                                        text: 'Curr', dataIndex: 'SCURRENCY', width: 50
                                    },
                                    {
                                        text: 'Amount', dataIndex: 'SVFOPS', width: 100,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#c0f0af;font-weight:bold;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Sales<br>Date', dataIndex: 'SDATE', width: 80
                                    },
                                    {
                                        text: 'PNR', dataIndex: 'SPNR', width: 70
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
                                        text: 'Corrl', width: 45, dataIndex: 'CORRL'
                                    },
                                    {
                                        text: 'Void', width: 40, dataIndex: 'FVOID'
                                    },
                                    {
                                        text: 'Agent', dataIndex: 'SAGENT', width: 80
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
                                                text: 'Amount', dataIndex: 'DISCAMOUNC', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#A2C2E2;font-weight:bold;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'VAT', dataIndex: 'DISCAMOUNI', width: 100,
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
                                                text: 'Amount', dataIndex: 'ACCEAMOU', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#A2A7E2;font-weight:bold;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'VAT', dataIndex: 'IVACOM12', width: 100,
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
                                            const {STVAL} = record.data;
                                            const opts = {
                                                '5': 'Chargeback',
                                                '6': 'Reverse Chbk'
                                            };
                                            return opts[STVAL] || '';
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
                                                text: 'Cod', dataIndex: 'SCARCOD', width: 45
                                            },
                                            {
                                                text: 'Number', dataIndex: 'CARDNBR', width: 130
                                            },
                                            {
                                                text: 'Auth', dataIndex: 'AUTHNBR', width: 55
                                            },
                                            {
                                                text: 'Curr', dataIndex: 'MFOP', width: 50
                                            },
                                            {
                                                text: 'Amount', dataIndex: 'VFOP', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#c0f0af;font-weight:bold;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'Auth<br>Amount', dataIndex: 'AUTAMOUNT', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#c0f0af;font-weight:bold;";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Doc.<br>Type', width: 65, dataIndex: 'TPDOC'
                                    },
                                    {
                                        text: 'Ticket', width: 110,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "background-color:#FCF6DC;font-weight:bold;";
                                            const {CCIA, FORMA, SERIE} = record.data;
                                            const ticket = CCIA + FORMA + SERIE;
                                            return ticket;
                                        }
                                    },
                                    {
                                        text: 'PNR', width: 70, dataIndex: 'PNR'
                                    },
                                    {
                                        text: 'Sale<br>Date', width: 80, dataIndex: 'SENTDATE'
                                    },
                                    {
                                        text: 'Status<br>Reverse', width: 90, dataIndex: 'REVERSA',
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
                                            const {USOPXCP1, USOPXCP2, USOPXCP3, USOPXCP4} = record.data;
                                            const usages = USOPXCP1 + USOPXCP2 + USOPXCP3 + USOPXCP4;
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