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
    width: '100%',
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
                text: 'RN', dataIndex: 'rn', width: 40, hidden: true
            },
            {text: 'Ticket',
                width: 120,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;";
                    value = record.data.a4183cia + record.data.a4183forma + record.data.a4183serie;
                    return value;
                },
                summaryType: 'count', summaryRenderer: function (value) {
                    return 'Total: ' + value;
                }
            },
            {text: 'Mode',
                dataIndex: 'a4183modo',
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
            {text: 'SRC', dataIndex: 'a4183fuent', width: 45,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;";
                    return value;
                }
            },
            {text: 'Sub <br> SRC', dataIndex: 'a4183subfu', width: 45,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;";
                    return value;
                }
            },
            {text: 'FOP', dataIndex: 'a4183fp', width: 45,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;";
                    return value;
                }
            },
            {text: 'CPN', dataIndex: 'a4183cupon', width: 50,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;";
                    return value;
                }
            },
            {text: 'SEQ', dataIndex: 'a4183seq', width: 60,
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
                    {text: 'Date', dataIndex: 'a4183fpro', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;";
                            return value;
                        }
                    },
                    {text: 'Period', dataIndex: 'a4183fcont', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;";
                            return value;
                        }
                    }
                ]
            },
            {text: 'Account Number', dataIndex: 'a4183cuent', width: 240,
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
                    {text: 'Cur', dataIndex: 'a4183cur', width: 70,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;";
                            return value;
                        }
                    },
                    {text: 'Debit', dataIndex: 'a4183activ', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;";
                            return Ext.util.Format.number(value, '0,000.00');
                        },
                        summaryType: 'sum', summaryRenderer: function (value) {
                            return Ext.util.Format.number(value, '0,000.00');
                        }
                    },
                    {text: 'Credit', dataIndex: 'a4183pasiv', width: 80,
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
                    {text: 'Debit', dataIndex: 'a4183actrv', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;";
                            return Ext.util.Format.number(value, '0,000.00');
                        },
                        summaryType: 'sum', summaryRenderer: function (value) {
                            return Ext.util.Format.number(value, '0,000.00');
                        }
                    },
                    {text: 'Credit', dataIndex: 'a4183pasrv', width: 80,
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
            {text: 'Concept', dataIndex: 'a4183titu', flex: 1,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:left;";
                    return value;
                }
            },
            {text: 'Client', dataIndex: 'a4183cope', width: 70,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;";
                    return value;
                }
            },
            {text: 'Provider', dataIndex: 'a4183prov', width: 70,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;";
                    return value;
                }
            },
            {text: 'Jornal <br> Entry', dataIndex: 'a4183idcon', width: 250, autoSizeColumn: true,
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


