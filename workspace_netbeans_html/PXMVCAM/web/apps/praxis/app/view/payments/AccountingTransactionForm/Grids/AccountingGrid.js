Ext.define('Ext.Praxis.view.payments.AccountingTransactionForm.Grids.AccountingGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-accountingGrid',
    requires: [
        'Ext.Praxis.controller.payments.AccountingTransaction.AccountingGridController'
    ],
    controller: 'ATAccountingGridController',
    title: 'Accounting Detail',
    titleAlign: 'center',
    minHeight: 210,
    maxHeight: 630,
    width: '100%',
    layout: 'fit',
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
    features: [{
        ftype: 'summary',
        dock: 'bottom'
    }],
    columns: {
        defaults: {
            align: 'center',
            menuDisabled: true,
            sortable: true
        },
        items: [
            //<editor-fold defaultstate="collapsed" desc="Summary Cols">
            {
                text: 'RN', dataIndex: 'RN',
                xtype: 'rownumberer', width: 40
            },
            {
                text: 'Ticket',
                dataIndex: 'TICKET',
                width: 120,
                renderer: function (value, metaData, record) {
                    metaData.style = "text-align:center;";
                    return value;
                },
                summaryType: 'count', summaryRenderer: function (value) {
                    return 'Total: ' + value;
                }
            },
            {
                text: 'Mode',
                dataIndex: 'A4183MODO',
                width: 50,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;";
                    const opts = {
                        'S': 'SALE',
                        'M': 'MEMO',
                        'J': 'EXCH',
                        'I': 'TAXC',
                        'R': 'RFND',
                        'F': 'FLWN',
                        'C': 'EXPI',
                        'L': 'IPAY'
                    };
                    return opts[value.trim()] || value;
                }
            },
            {
                text: 'SRC', dataIndex: 'A4183FUENT', width: 45,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;";
                    return value;
                }
            },
            {
                text: 'Sub <br> SRC', dataIndex: 'A4183SUBFU', width: 45,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;";
                    return value;
                }
            },
            {
                text: 'FOP', dataIndex: 'A4183FP', width: 45,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;";
                    return value;
                }
            },
            {
                text: 'CPN', dataIndex: 'A4183CUPON', width: 50,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;";
                    return value;
                }
            },
            {
                text: 'SEQ', dataIndex: 'A4183SEQ', width: 60,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;";
                    return value;
                }
            },
            {
                text: 'Accounting Settlement',
                defaults: {
                    menuDisabled: true,
                    sortable: false,
                    align: 'center'
                },
                columns: [
                    {
                        text: 'Date', dataIndex: 'A4183FFILE', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;";
                            return value;
                        }
                    },
                    {
                        text: 'Period', dataIndex: 'A4183FCONT', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;";
                            return value;
                        }
                    }
                ]
            },
            {
                text: 'Account Number',
                dataIndex: 'ACCOUNT',
                width: 220,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;";
                    return value;
                }
            },
            {
                text: 'Local Amount',
                defaults: {
                    menuDisabled: true,
                    sortable: false,
                    align: 'center'
                },
                columns: [
                    {
                        text: 'Cur', dataIndex: 'A4183CUR', width: 70,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;";
                            return value;
                        }
                    },
                    {
                        text: 'Debit', dataIndex: 'A4183ACTIV', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;";
                            return Ext.util.Format.number(value, '0,000.00');
                        },
                        summaryType: 'sum', summaryRenderer: function (value) {
                            return Ext.util.Format.number(value, '0,000.00');
                        }
                    },
                    {
                        text: 'Credit', dataIndex: 'A4183PASIV', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;";
                            return Ext.util.Format.number(value, '0,000.00');
                        },
                        summaryType: 'sum', summaryRenderer: function (value) {
                            return Ext.util.Format.number(value, '0,000.00');
                        }
                    }
                ]
            },
            {
                text: 'Revenue Amount',
                hidden: true,
                defaults: {
                    menuDisabled: true,
                    sortable: false,
                    align: 'center'
                },
                columns: [
                    {
                        text: 'Debit', dataIndex: 'A4183ACTRV', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;";
                            return Ext.util.Format.number(value, '0,000.00');
                        },
                        summaryType: 'sum', summaryRenderer: function (value) {
                            return Ext.util.Format.number(value, '0,000.00');
                        }
                    },
                    {
                        text: 'Credit', dataIndex: 'A4183PASRV', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;";
                            return Ext.util.Format.number(value, '0,000.00');
                        },
                        summaryType: 'sum', summaryRenderer: function (value) {
                            return Ext.util.Format.number(value, '0,000.00');
                        }
                    }
                ]
            },
            {
                text: 'Concept', flex: 1,
                defaults: {
                    menuDisabled: true,
                    sortable: false,
                    align: 'center'
                },
                columns: [
                    { text: 'Code',        dataIndex: 'A4183ORIG', width: 60 },
                    { text: 'Description', dataIndex: 'A4183TITU', flex: 1 }
                ]
            },
            {
                text: 'Client',
                dataIndex: 'A4183CLIEN',
                width: 80,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;";
                    return value;
                }
            },
            {
                text: 'Provider', dataIndex: 'A4183PROV', width: 70,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;";
                    return value;
                }
            },
            {
                text: 'Praxis ID', dataIndex: 'A4183IDCON', width: 280, autoSizeColumn: true,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style += "text-align:center;";
                    return value;
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
                text: '<strong style="color:white;">Back<strong>',
                cls: 'x-btn-sent',
                width: 100,
                scale: 'small',
                overCls: 'x-btn-sent-over',
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
    }
});


