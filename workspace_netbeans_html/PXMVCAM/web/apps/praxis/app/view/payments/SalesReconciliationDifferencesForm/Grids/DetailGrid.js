Ext.define('Ext.Praxis.view.payments.SalesReconciliationDifferencesForm.Grids.DetailGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-DetailGrid',
    requires: [
        'Ext.Praxis.controller.payments.SalesReconciliationDifferences.DetailGridController'
    ],
    controller: 'DetailGridController',
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
                dataIndex: 'prda'
            },
            {text: 'Processor', dataIndex: 'desc_PROCTYPE', width: 180},
            {
                text: 'Payment<br>Merchant ID', dataIndex: 'pmerchid', width: 100
            },
            {text: 'Country', dataIndex: 'scountry', width: 80},
            {text: 'Doc.<br>Type', dataIndex: 'transtype', width: 80},
            {
                text: 'Transaction',
                defaults: {
                    menuDisabled: true,
                    sortable: false,
                    align: 'center'
                },
                columns: [
                    {text: 'Sale<br>Merchant ID', dataIndex: 'smerchid', width: 100},
                    {text: 'Description', dataIndex: 'desc_SMERCHID', width: 200},
                    {text: 'Sale<br>Date', dataIndex: 'sdate', width: 80},
                    {text: 'Card Number', dataIndex: 'scardn', width: 130},
                    {text: 'Auth Code', dataIndex: 'sauthoc', width: 110},
                    {text: 'Installments', dataIndex: 'instanbr'}
                ]
            },
            {
                text: 'Curr', dataIndex: 'scurrency', width: 50,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;";
                    return value;
                }
            },
            {
                text: 'GROSS', dataIndex: 'tgrosamoun', width: 110,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:right;font-weight:bolder;";
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
                text: 'Commissions Received',
                defaults: {
                    menuDisabled: true,
                    sortable: false,
                    align: 'center',
                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                        metaData.style = "text-align:right;background-color:#9BF6B2";
                        value = Ext.util.Format.number(value, '0,000.00');
                        return value;
                    }
                },
                columns: [
                    {
                        text: 'Commission', dataIndex: 'sfeeamou', width: 110,
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = "text-align:right;";
                            return '<b>' + Ext.util.Format.number(value || 0, '0,000.00') + '<b>';
                        }
                    },
                    {
                        text: 'VAT<br>Commission', dataIndex: 'ivacom12', width: 110,
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = "text-align:right;";
                            return '<b>' + Ext.util.Format.number(value || 0, '0,000.00') + '<b>';
                        }
                    },
                    {
                        text: 'Serv. Fee', dataIndex: 'servicefee', width: 110,
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = "text-align:right;";
                            return '<b>' + Ext.util.Format.number(value || 0, '0,000.00') + '<b>';
                        }
                    },
                    {
                        text: 'VAT<br>Serv. Fee', dataIndex: 'overcom12', width: 110,
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = "text-align:right;";
                            return '<b>' + Ext.util.Format.number(value || 0, '0,000.00') + '<b>';
                        }
                    }
                ]
            },
            {
                text: 'Commissions PRAXIS',
                defaults: {
                    menuDisabled: true,
                    sortable: false,
                    align: 'center',
                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                        metaData.style = "text-align:right;background-color:#B2DAFA";
                        value = Ext.util.Format.number(value, '0,000.00');
                        return value;
                    }
                },
                columns: [
                    {
                        text: 'Commission', dataIndex: 'sfeeamouc', width: 110,
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = "text-align:right;";
                            return '<b>' + Ext.util.Format.number(value || 0, '0,000.00') + '<b>';
                        }
                    },
                    {
                        text: 'VAT<br>Commission', dataIndex: 'ivacom12C', width: 110,
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = "text-align:right;";
                            return '<b>' + Ext.util.Format.number(value || 0, '0,000.00') + '<b>';
                        }
                    },
                    {
                        text: 'Serv. Fee', dataIndex: 'servicefec', width: 110,
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = "text-align:right;";
                            return '<b>' + Ext.util.Format.number(value || 0, '0,000.00') + '<b>';
                        }
                    },
                    {
                        text: 'VAT<br>Serv. Fee', dataIndex: 'overcom12C', width: 110,
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = "text-align:right;";
                            return '<b>' + Ext.util.Format.number(value || 0, '0,000.00') + '<b>';
                        }
                    }
                ]
            },
            {
                text: 'Comissions Differences',
                defaults: {
                    menuDisabled: true,
                    sortable: false,
                    align: 'center',
                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                        metaData.style = "text-align:right;background-color:#FFC1B3";
                        value = value.toFixed(2);
                        if (value > 0 || value < 0) {
                            metaData.style = "text-align:right;background-color:#FF6E4D;font-weight:bolder;";
                            console.log(value);
                        }
                        value = Ext.util.Format.number(value, '0,000.00');
                        return value;
                    }
                },
                columns: [
                    {
                        text: 'Commission', dataIndex: 'sfeeamoud', width: 110,

                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = "text-align:right;";
                            return '<b>' + Ext.util.Format.number(value || 0, '0,000.00') + '<b>';
                        }
                    },
                    {
                        text: 'VAT<br>Commission', dataIndex: 'ivacom12D', width: 110,
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = "text-align:right;";
                            return '<b>' + Ext.util.Format.number(value || 0, '0,000.00') + '<b>';
                        }
                    },
                    {
                        text: 'Serv. Fee', dataIndex: 'servicefed', width: 110,
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = "text-align:right;";
                            return '<b>' + Ext.util.Format.number(value || 0, '0,000.00') + '<b>';
                        }
                    },
                    {
                        text: 'VAT<br>Serv. Fee', dataIndex: 'overcom12D', width: 110,
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = "text-align:right;";
                            return '<b>' + Ext.util.Format.number(value || 0, '0,000.00') + '<b>';
                        }
                    },
                    {
                        text: 'Status', dataIndex: 'status', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;background-color:#FFC1B3";
                            const opts = {
                                'Y': 'Difference',
                                'N': 'Match'
                            };
                            if (value === 'Y') {
                                metaData.style = "text-align:center;background-color:#FF6E4D;font-weight:bolder;";
                            }
                            return opts[value]||'';
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
    },
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true
    }
});


