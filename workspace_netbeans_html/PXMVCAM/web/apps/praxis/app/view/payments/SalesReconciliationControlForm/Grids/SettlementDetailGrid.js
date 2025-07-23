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
                text: 'Proccessing<br>Date', width: 85, dataIndex: 'prda'
            },
            {
                text: 'Payment<br>Date', width: 85, dataIndex: 'paydate'
            },
            {
                text: 'Sales Date', dataIndex: 'transdate', width: 85
            },
            {
                text: 'Settlement<br>vs Sales', dataIndex: 'stval', width: 145,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;background-color:#C6E5B1;";
                    const opts = {
                        'A': 'Match OC/Camepa',
                        'C': 'Match Complement',
                        'D': 'Match Balance',
                        'E': 'Duplicate Payment',
                        'M': 'Match Multi-Payment',
                        '0': 'Stand By',
                        '1': 'Match',
                        '2': 'Sales Without Settl.',
                        '3': 'Settl. Without Sales',
                        '4': 'Match Partial',
                        '5': 'Match Manual',
//                        '6': 'Match Forced',
                        '7': 'Match CompenForcedsation',
                        '8': 'Match Transactional',
                        '9': 'Match Void'
                    };
                    return opts[value] || '';
                }
            },
            {
                text: 'Processor', dataIndex: 'desc_PROCTYPE', width: 200
            },
            {
                text: 'Country', dataIndex: 'scountry', width: 80
            },
            {text: 'Qty<br>Tkts', dataIndex: 'qtytkt', width: 40,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;";
                    return value;
                }
            },
            {text: 'Invoice<br>Refer. Number<br>PNR', dataIndex: 'invoirn', width: 100,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    const {proctypesq, pwref} = record.data;
                    if (proctypesq === 'BANORTE00') {
                        value = pwref;
                    }
                    metaData.style = "text-align:center;";
                    return value;
                }
            },
            {text: 'PNR', dataIndex: 'spnr', width: 80,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;";
                    return  value;
                }
            },
            {
                text: 'Document<br>Type', dataIndex: 'transtype', width: 80
            },
            {text: 'Indust.Speci. <br> Ref.Nbr', dataIndex: 'isrefnbr', width: 120,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    return value;
                }
            },
            {text: 'Card Number', dataIndex: 'scardn', width: 140},
            {text: 'Auth.', dataIndex: 'sauthoc', width: 70},
            {text: 'Installment<br>Plan', dataIndex: 'nbrinsta', width: 90},
            {text: 'Installment<br>Number', dataIndex: 'instanbr', width: 90},
            {text: 'Currency', dataIndex: 'scurrency', width: 90},
            {
                text: 'Sales<br>Amount', dataIndex: 'svfops', width: 100,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:right;";
                    value = Ext.util.Format.number(value, '0,000.00');
                    return value;
                }
            },
            {
                text: 'Transaction<br>Amount', dataIndex: 'tgrosamoun', width: 100,
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
                        text: 'Rate<br>Comm.', dataIndex: 'sfeerate', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2DAFA";
                            value = Ext.util.Format.number(value, '0,000.00 %');
                            return value;
                        }
                    },
                    {
                        text: 'Serv. Fee',
                        dataIndex: 'servicefee',
                        width: 90,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2DAFA;";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {
                        text: 'VAT COMM<br>1 2', dataIndex: 'overcom12', width: 100,
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
                        text: 'Discount<br>Rate', dataIndex: 'discrate', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2DAFA";
                            value = Ext.util.Format.number(value, '0,000.00 %');
                            return value;
                        }
                    },
                    {
                        text: 'Discount<br>Amount', dataIndex: 'discamoun', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2DAFA";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {
                        text: 'Discount<br>Rate VAT', dataIndex: 'discratei', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2DAFA";
                            value = Ext.util.Format.number(value, '0,000.00 %');
                            return value;
                        }
                    },
                    {
                        text: 'Discount<br>Amount VAT', dataIndex: 'discamouni', width: 90,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2DAFA";
                            const {transtype, ivacom12} = record.data;
                            if (transtype.trim() !== 'CHBK') {
                                value = ivacom12;
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
                    {text: 'Number', dataIndex: 'chgbnum', width: 110},
                    {text: 'Reason Code', dataIndex: 'codchgback', width: 90},
                    {
                        text: 'Amount', dataIndex: 'tgrosamoun', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;";
                            const {transtype, tgrosamoun} = record.data;
                            if (transtype.trim() === 'CHBK') {
                                value = tgrosamoun;
                            } else {
                                value = 0;
                            }
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {
                        text: 'Commission', dataIndex: 'discamoun', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;";
                            const {transtype, discamoun} = record.data;
                            if (transtype.trim() === 'CHBK') {
                                value = discamoun;
                            } else {
                                value = 0;
                            }
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {
                        text: 'VAT', dataIndex: 'discamouni', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;";
                            const {transtype, discamouni} = record.data;
                            if (transtype.trim() === 'CHBK') {
                                value = discamouni;
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
                        text: 'Amount', dataIndex: 'f_ADJUSMENT', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {
                        text: 'Commission', dataIndex: 'discamoun', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;";
                            const {transtype, discamoun} = record.data;
                            if (transtype.trim() === 'ADJU') {
                                value = discamoun;
                            } else {
                                value = 0;
                            }
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {
                        text: 'VAT', dataIndex: 'discamouni', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;";
                            const {transtype, discamouni} = record.data;
                            if (transtype.trim() === 'ADJU') {
                                value = discamouni;
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
                text: 'Net Amount', dataIndex: 'neto', width: 100,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:right;";
                    value = Ext.util.Format.number(value, '0,000.00');
                    return value;
                }
            },
            {
                text: 'Net Amount<br>to Receive AM', dataIndex: 'netopay', width: 100,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:right;background-color:#FCF6DC";
                    value = Ext.util.Format.number(value, '0,000.00');
                    return value;
                }
            },
            {
                text: 'Currency<br>Settlement', dataIndex: 'pcurrency', width: 80,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;background-color:#FCF6DC";
                    return value;
                }
            },
            {
                text: 'Rule', dataIndex: 'fregla', width: 85,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;";
                    const opts = {
                        '1': 'Ticket',
                        '2': 'PNR',
                        '3': 'C.Card',
                        '4': 'Desg. Manual',
                        '5': 'Desg. Transac.'
                    };
                    return opts[value] || '';
                }
            },
            {
                text: 'Flag <br> Complement', dataIndex: 'fcompl', width: 100,
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


