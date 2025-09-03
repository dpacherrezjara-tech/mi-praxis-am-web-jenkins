Ext.define('Ext.Praxis.view.payments.SalesReconciliationControlForm.Grids.SettlementDetailGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-SettlementDetailGrid',
    requires: [
        'Ext.Praxis.controller.payments.SalesReconciliationControl.SettlementDetailGridController'
    ],
    controller: 'SettlementDetailGridController',
    maxHeight: prototype.height,
    minHeight: 200,
    height: 'auto',
    width: prototype.width,
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        markDirty: false,
        listeners: {
            refresh: function (dataview) {
                Ext.each(dataview.panel.columns, function (column) {
                    if (column.autoSizeColumn === true)
                        column.autoSize();
                });
            }
        }
    },
    columnLines: true,
    columns: {
        defaults: {
            align: 'center',
            menuDisabled: true,
            sortable: true
        },
        items: [
            //<editor-fold defaultstate="collapsed" desc="Detail Cols">
            {
                sortable: false,
                xtype: 'actioncolumn',
                width: 40,
                text: 'Det.',
                locked: true,
                align: 'center',
                items: [
                    {
                        iconCls: 'prx-icon-detail',
                        tooltip: 'Open Detail',
                        handler: 'onClickBPO'
                    }
                ]
            },
            {
                text: 'Proccessing<br>Date', width: 85, dataIndex: 'PRDA'
            },
            {
                text: 'Payment<br>Date', width: 85, dataIndex: 'PAYDATE'
            },
            {
                text: 'Sales Date', dataIndex: 'TRANSDATE', width: 85
            },
            {
                text: 'Settlement<br>vs Sales', dataIndex: 'STVAL', width: 145,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;background-color:#C6E5B1;";
                    const opts = {
//                        'A': 'Match OC/Camepa',
                        'C': 'Match Complement',
//                        'D': 'Match Balance',
                        'E': 'Duplicate Payment',
                        'M': 'Match Multi-Payment',
                        '0': 'Stand By',
                        '1': 'Match',
                        '2': 'Sales Without Settl.',
                        '3': 'Settl. Without Sales',
                        '4': 'Match Partial',
                        '5': 'Match Manual',
//                        '6': 'Match Forced',
//                        '7': 'Match Compensation',
                        '8': 'Match Transactional',
                        '9': 'Match Void'
                    };
                    return opts[value] || '';
                }
            },
            {
                text: 'Processor', dataIndex: 'DESC_PROCTYPE', width: 200
            },
            {
                text: 'Country', dataIndex: 'SCOUNTRY', width: 80
            },
            {text: 'Qty<br>Tkts', dataIndex: 'QTYTKT', width: 40,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;";
                    return value;
                }
            },
            {text: 'Invoice<br>Refer. Number<br>PNR', dataIndex: 'INVOIRN', width: 100,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    const {proctypesq, pwref} = record.data;
                    if (proctypesq === 'BANORTE00') {
                        value = pwref;
                    }
                    metaData.style = "text-align:center;";
                    return value;
                }
            },
            {text: 'PNR', dataIndex: 'SPNR', width: 80,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;";
                    return  value;
                }
            },
            {
                text: 'Document<br>Type', dataIndex: 'TRANSTYPE', width: 80
            },
            {text: 'Indust.Speci. <br> Ref.Nbr', dataIndex: 'ISREFNBR', width: 120,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    return value;
                }
            },
            {text: 'Card Number', dataIndex: 'SCARDN', width: 140},
            {text: 'Auth.', dataIndex: 'SAUTHOC', width: 70},
            {text: 'Installment<br>Plan', dataIndex: 'NBRINSTA', width: 90},
            {text: 'Installment<br>Number', dataIndex: 'INSTANBR', width: 90},
            {text: 'Currency', dataIndex: 'SCURRENCY', width: 90},
            {
                text: 'Sales<br>Amount', dataIndex: 'SVFOPS', width: 100,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:right;";
                    value = Ext.util.Format.number(value, '0,000.00');
                    return value;
                }
            },
            {
                text: 'Transaction<br>Amount', dataIndex: 'TGROSAMOUN', width: 100,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:right;background-color:#B2DAFA";
                    value = Ext.util.Format.number(value, '0,000.00');
                    return value;
                }
            },
            {
                text: 'MSI',
                defaults: {
                    menuDisabled: true,
                    sortable: false,
                    align: 'center'
                },
                columns: [
                    {
                        text: 'Rate<br>Comm.', dataIndex: 'SFEERATE', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2DAFA";
                            value = Ext.util.Format.number(value, '0,000.00 %');
                            return value;
                        }
                    },
                    {
                        text: 'Serv. Fee',
                        dataIndex: 'SERVICEFEE',
                        width: 90,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2DAFA;";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {
                        text: 'VAT COMM<br>1 2', dataIndex: 'OVERCOM12', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2DAFA;";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    }
                ]
            },
            {
                text: 'Commission Base',
                defaults: {
                    menuDisabled: true,
                    sortable: false,
                    align: 'center'
                },
                columns: [
                    {
                        text: 'Discount<br>Rate', dataIndex: 'DISCRATEI', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2DAFA";
                            value = Ext.util.Format.number(value, '0,000.00 %');
                            return value;
                        }
                    },
                    {
                        text: 'Discount<br>Amount', dataIndex: 'DISCAMOUN', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2DAFA";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {
                        text: 'Discount<br>Rate VAT', dataIndex: 'DISCRATEI', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2DAFA";
                            value = Ext.util.Format.number(value, '0,000.00 %');
                            return value;
                        }
                    },
                    {
                        text: 'Discount<br>Amount VAT', dataIndex: 'DISCAMOUNI', width: 90,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2DAFA";
                            const {TRANSTYPE, IVACOM12} = record.data;
                            if (TRANSTYPE.trim() !== 'CHBK') {
                                value = IVACOM12;
                            } else {
                                value = 0;
                            }
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    }
                ]
            },
            {
                text: 'Chargeback',
                defaults: {
                    menuDisabled: true,
                    sortable: false,
                    align: 'center'
                },
                columns: [
                    {text: 'Number', dataIndex: 'CHGBNUM', width: 110},
                    {text: 'Reason Code', dataIndex: 'CODCHGBACK', width: 90},
                    {
                        text: 'Amount', dataIndex: 'TGROSAMOUN', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;";
                            const {TRANSTYPE, TGROSAMOUN} = record.data;
                            if (TRANSTYPE.trim() === 'CHBK') {
                                value = TGROSAMOUN;
                            } else {
                                value = 0;
                            }
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {
                        text: 'Commission', dataIndex: 'DISCAMOUN', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;";
                            const {TRANSTYPE, DISCAMOUN} = record.data;
                            if (TRANSTYPE.trim() === 'CHBK') {
                                value = DISCAMOUN;
                            } else {
                                value = 0;
                            }
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {
                        text: 'VAT', dataIndex: 'DISCAMOUNI', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;";
                            const {TRANSTYPE, DISCAMOUNI} = record.data;
                            if (TRANSTYPE.trim() === 'CHBK') {
                                value = DISCAMOUNI;
                            } else {
                                value = 0;
                            }
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    }
                ]
            },
            {
                text: 'Adjustment',
                defaults: {
                    menuDisabled: true,
                    sortable: false,
                    align: 'center'
                },
                columns: [
                    {
                        text: 'Amount', dataIndex: 'ADJUSMENT', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {
                        text: 'Commission', dataIndex: 'DISCAMOUN', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;";
                            const {TRANSTYPE, DISCAMOUN} = record.data;
                            if (TRANSTYPE.trim() === 'ADJU') {
                                value = DISCAMOUN;
                            } else {
                                value = 0;
                            }
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {
                        text: 'VAT', dataIndex: 'DISCAMOUNI', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;";
                            const {TRANSTYPE, DISCAMOUNI} = record.data;
                            if (TRANSTYPE.trim() === 'ADJU') {
                                value = DISCAMOUNI;
                            } else {
                                value = 0;
                            }
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    }
                ]
            },
            {
                text: 'TAX', dataIndex: 'f_TAX', width: 100,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:right;";
                    value = Ext.util.Format.number(value, '0,000.00');
                    return value;
                }
            },
            {
                text: 'Net Amount', dataIndex: 'NETO', width: 100,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:right;";
                    value = Ext.util.Format.number(value, '0,000.00');
                    return value;
                }
            },
            {
                text: 'Net Amount<br>to Receive AM', dataIndex: 'NETOPAY', width: 100,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:right;background-color:#FCF6DC";
                    value = Ext.util.Format.number(value, '0,000.00');
                    return value;
                }
            },
            {
                text: 'Currency<br>Settlement', dataIndex: 'PCURRENCY', width: 80,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;background-color:#FCF6DC";
                    return value;
                }
            },
            {
                text: 'Rule', dataIndex: 'FREGLA', width: 85,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;";
                    const opts = {
//                        '1': 'Ticket',
//                        '2': 'PNR',
//                        '3': 'C.Card',
//                        '4': 'Desg. Manual',
//                        '5': 'Desg. Transac.'
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
                    return opts[value] || '';
                }
            },
            {
                text: 'Flag <br> Complement', dataIndex: 'FCOMPL', width: 100,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;";
                    const opts = {
                        '1': 'Plusgrade',
                        '2': 'Ligas',
                        '3': 'Tablet',
                        '4': 'BPO'
                    };
                    return opts[value] || '';
                }
            }
            //</editor-fold>
        ]
    },
    tbar: {
        layout: {
            pack: 'end'
        },
        defaults: {
            scale: 'medium'
        },
        items: [
            {
                xtype: 'button',
                iconCls: 'prx-icon-excel',
                scale: 'small',
                tooltip: 'Export to Excel',
                listeners: {
                    click: 'downloadExcel'
                }
            },
            {
                xtype: 'button',
                scale: 'small',
                hidden: true,
                iconCls: 'prx-icon-back',
                width: 25,
                tooltip: 'Back',
                listeners: {
                    click: function (btn) {
                        const panel = btn.up().up().up();
                        const views = panel.items.items;
                        views.at(-1).destroy();
                        views.at(-1).show();
                    }
                }
            }
        ]
    },
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true
    }
});


