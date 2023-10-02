Ext.define('Ext.Praxis.view.payments.SalesReconciliationControlForm.Grids.SummaryDetailGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-SummaryDetailGrid',
    requires: [
        'Ext.Praxis.controller.payments.SalesReconciliationControl.SummaryDetailGridController'
    ],
    controller: 'SummaryDetailGridController',
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
    features: [
        {
            ftype: 'summary' // Agrega la característica de resumen al grid
        }
    ],
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
                text: 'Processing<br>Date',
                dataIndex: 'prda',
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "font-weight:bolder;color:#057ECB;";
                    return value;
                }
            },
            {text: 'Processor', dataIndex: 'desc_PROCTYPE', flex: 1},
            {
                text: 'Payment<br>Merchant ID',
                width: 130,
                dataIndex: 'pmerchid',
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "font-weight:bolder;background-color:#d5f4d5;";
                    return value;
                }
            },
            {
                text: 'Sale<br>Merchant ID',
                dataIndex: 'smerchid',
                width: 130,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "font-weight:bolder;background-color:#d5f4d5;";
                    return value;
                }
            },
            {
                text: 'Qty<br>Transactions',
                dataIndex: 'qtytran',
                width: 100,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    return value;
                },
                summaryType: 'sum',
                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                    metaData.style = "text-align:center;";
                    return '<b>' + value + '<b>';
                }
            },
            {text: 'Curr', dataIndex: 'pcurrency', width: 50},
            {
                text: 'Summary',
                defaults: {
                    menuDisabled: true,
                    sortable: false,
                    align: 'center'
                },
                columns: [
                    {
                        text: 'GROSS', dataIndex: 'tgrosamoun', width: 110,
                        listeners: {
                            //                                                    click: 'onGridDetBankS'
                        },
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2DAFA";
                            value = Ext.util.Format.number(value || 0, '0,000.00');
                            return value;
                        },
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = "text-align:right;";
                            return '<b>' + Ext.util.Format.number(value || 0, '0,000.00') + '<b>';
                        }
                    },
                    {
                        text: 'Discount',
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            align: 'center'
                        },
                        columns: [
                            {
                                text: 'Commission', dataIndex: 'sfeeamou', width: 110,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
                                },
                                summaryType: 'sum',
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    metaData.style = "text-align:right;";
                                    return '<b>' + Ext.util.Format.number(value || 0, '0,000.00') + '<b>';
                                }
                            },
                            {
                                text: 'Serv. Fee', dataIndex: 'servicfeep', width: 110,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
                                },
                                summaryType: 'sum',
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    metaData.style = "text-align:right;";
                                    return '<b>' + Ext.util.Format.number(value || 0, '0,000.00') + '<b>';
                                }
                            },
                            {
                                text: 'Adjustment', dataIndex: 'adjusmentp', width: 110,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                    return value;
                                },
                                summaryType: 'sum',
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    metaData.style = "text-align:right;";
                                    return '<b>' + Ext.util.Format.number(value || 0, '0,000.00') + '<b>';
                                }
                            },
                            {
                                text: 'VAT', dataIndex: 'ivacom12', width: 110,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
                                },
                                summaryType: 'sum',
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    metaData.style = "text-align:right;";
                                    return '<b>' + Ext.util.Format.number(value || 0, '0,000.00') + '<b>';
                                }
                            },
                            {
                                text: 'Op. Debit', dataIndex: 'odbalamou', width: 110,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                    value = Ext.util.Format.number(value || 0, '0,000.00');
                                    return value;
                                },
                                summaryType: 'sum',
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    metaData.style = "text-align:right;";
                                    return '<b>' + Ext.util.Format.number(value || 0, '0,000.00') + '<b>';
                                }
                            }
                        ]
                    },
                    {
                        text: 'NET', dataIndex: 'netopay', width: 110,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2DAFA";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        },
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = "text-align:right;";
                            return '<b>' + Ext.util.Format.number(value || 0, '0,000.00') + '<b>';
                        }
                    }
                ]
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
    }
});


