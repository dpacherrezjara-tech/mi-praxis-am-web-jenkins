Ext.define('Ext.Praxis.view.flown.EmdsSabreForm.Grids.SummaryGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-SummaryGrid',
    requires: [
        'Ext.Praxis.controller.flown.EmdsSabre.SummaryGridController'
    ],
    controller: 'SummaryGridController',
    maxHeight: prototype.height,
    minHeight: 200,
    height: 'auto',
    width: 1300,
    features: [
        {
            ftype: 'summary' // Agrega la característica de resumen al grid
        }
    ],
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        markDirty: false
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
            {text: 'Processing<br>Date', dataIndex: 'FPROC', flex: 1},
            {text: 'Total<br>EMDs', dataIndex: 'TOTEMD', width: 100,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "font-weight:bold";
                    return value;
                },
                summaryType: 'sum',
                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                    metaData.style = "text-align:center;font-weight:bold;";
                    return value;
//                            return Ext.util.Format.number(value, '0,000');
                }
            },
            {text: 'Curr.', dataIndex: 'RMDA', width: 60},
            {text: 'Fare Rev.', dataIndex: 'TARIF', width: 120,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:right";
                    value = Ext.util.Format.number(value, '0,000.00');
                    return value;
                },
                summaryType: 'sum',
                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                    metaData.style = "text-align:right;font-weight:bold;";
//                    return value;
                    return Ext.util.Format.number(value, '0,000.00');
                }
            },
            {
                text: 'Used',
                defaults: {
                    align: 'center',
                    menuDisabled: true,
                    sortable: true,
                    renderer: function (value, metaData, record, rowIndex, colIndex) {
                        metaData.style = "text-align:center;background-color:#91fc63;";
                        return value;
                    }
                },
                columns: [
                    {text: 'Total', dataIndex: 'USED', width: 90,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;background-color:#91fc63;text-decoration:underline;cursor:pointer;font-weight:bolder;color:#3f77cd;";
                            return value;
                        },
                        listeners: {
                            click: 'loadUsed'
                        },
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = "text-align:center;font-weight:bold;";
                            return value;
//                            return Ext.util.Format.number(value, '0,000');
                        }
                    },
                    {text: 'Fare', dataIndex: 'UTARIF', width: 120,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#91fc63";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        },
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = "text-align:right;font-weight:bold;";
//                            return value;
                            return Ext.util.Format.number(value, '0,000.00');
                        }
                    }
                ]
            },
            {
                text: 'No Used',
                defaults: {
                    align: 'center',
                    menuDisabled: true,
                    sortable: true,
                    renderer: function (value, metaData, record, rowIndex, colIndex) {
                        metaData.style = "text-align:center;background-color:#F0D094;";
                        return value;
                    }
                },
                columns: [
                    {text: 'Total', dataIndex: 'PENDIENTE', width: 90,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;background-color:#F0D094;text-decoration:underline;cursor:pointer;font-weight:bolder;color:#3f77cd;";
                            return value;
                        },
                        listeners: {
                            click: 'loadNotUsed'
                        },
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = "text-align:center;font-weight:bold;";
                            return value;
//                            return Ext.util.Format.number(value, '0,000');
                        }
                    },
                    {text: 'Fare', dataIndex: 'PTARIF', width: 120,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#F0D094";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        },
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = "text-align:right;font-weight:bold;";
//                            return value;
                            return Ext.util.Format.number(value, '0,000.00');
                        }
                    },
//                    {text: 'Status<br>Changed', dataIndex: 'CSTS', width: 90,
//                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                            metaData.style = "text-align:center;background-color:#F0D094;text-decoration:underline;cursor:pointer;font-weight:bolder;color:#3f77cd;";
//                            return value;
//                        },
//                        listeners:{
//                            click: 'loadStatusChanged'
//                                }
//                            },
                    {text: 'Status Changed', align: 'center', headerAlign: 'center',
                        columns: [
                            {
                                text: 'Total',
                                dataIndex: 'CSTS',
                                width: 90,
                                align: 'center',
                                renderer: function (value, metaData) {
                                    metaData.style = "text-align:center;background-color:#F0D094;text-decoration:underline;cursor:pointer;font-weight:bolder;color:#3f77cd;";
                                    return value;
                                },
                                summaryType: 'sum',
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    metaData.style = "text-align:center;font-weight:bold;";
                                    return value;
                                },
                                listeners: {
                                    click: 'loadStatusChanged'
                                }
                            },
                            {
                                text: 'Used',
                                dataIndex: 'STATUSED',
                                width: 90,
                                align: 'center',
                                renderer: function (value, metaData) {
                                    metaData.style = "text-align:center;background-color:#F0D094;text-decoration:underline;cursor:pointer;font-weight:bolder;color:#3f77cd;";
                                    return value;
                                },
                                summaryType: 'sum',
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    metaData.style = "text-align:center;font-weight:bold;";
                                    return value;
                                },
                                 listeners: {
                                    click: 'loadNotUsedUsed'
                                }
                            },
                            {
                                text: 'Diff Used',
                                dataIndex: 'STATOTHER',
                                width: 90,
                                align: 'center',
                                renderer: function (value, metaData) {
                                    metaData.style = "text-align:center;background-color:#F0D094;text-decoration:underline;cursor:pointer;font-weight:bolder;color:#3f77cd;";
                                    return value;
                                },
                                summaryType: 'sum',
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    metaData.style = "text-align:center;font-weight:bold;";
                                    return value;
                                },
                                 listeners: {
                                    click: 'loadNotUsedDiffUsed'
                                }
                            },
                            {
                                text: 'OK',
                                dataIndex: 'STATOK',
                                width: 90,
                                align: 'center',
                                renderer: function (value, metaData) {
                                    metaData.style = "text-align:center;background-color:#F0D094;text-decoration:underline;cursor:pointer;font-weight:bolder;color:#3f77cd;";
                                    return value;
                                },
                                summaryType: 'sum',
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    metaData.style = "text-align:center;font-weight:bold;";
                                    return value;
                                },
                                 listeners: {
                                    click: 'loadNotUsedOk'
                                }
                            }
                        ]
                    },

                    {text: 'Fare<br>St. Chg', dataIndex: 'CSTTARIF', width: 120,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#F0D094";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        },
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = "text-align:right;font-weight:bold;";
//                            return value;
                            return Ext.util.Format.number(value, '0,000.00');
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
            }
        ]
    }
});


