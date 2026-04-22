//width: 1370,
prototype.idGridBP = prototype.id + '-byPaymentMonthSummaryGrid';
Ext.define('Ext.Praxis.view.payments.SalesReconciliationControlForm.Grids.ByPaymentMonthSummaryGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-byPaymentMonthSummaryGrid', // Alias para usar en el xtype
    requires: [
        'Ext.Praxis.controller.payments.SalesReconciliationControl.ByPaymentMonthSummaryGridController'
    ],
    controller: 'ByPaymentMonthSummaryGridController',
    title: 'By Payment Summary',
    titleAlign: 'center',
    height: 'auto',
    minHeight: 300,
    maxHeight: prototype.height,
    width: 1370,
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        markDirty: false,
        stickyHeader: true
    },
    scrollable: true,
    columnLines: true,
    features: [
        {
            ftype: 'summary' // Agrega la característica de resumen al grid
        }
    ],
    columns: {
        defaults: {
            menuDisabled: true,
            sortable: true,
            align: 'center'
        },
        items: [
            {
                text: 'Processing<br>Date',
                //id: prototype.idGrid + '-summaryTFECHA',
                flex: 1,
                renderer: function (value, metaData, record, rowIndex, colIndex) {
                    metaData.style = "text-align:center;font-weight:bold;color:#8B5199;";
                    if (record.data.PAYDATE) {
                        value = record.data.PAYDATE;
                    } else if (record.data.PRDA) {
                        value = record.data.PRDA;
                    } else {
                        value = record.data.FEUP;
                    }
                    return value;
                }
            },
            {
                text: 'Total General',
                //width: 400,
                defaults: {
                    menuDisabled: true,
                    sortable: true,
                    align: 'center',
                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                        metaData.style = "text-align:center;background-color:#d5f4d5;text-decoration:underline;cursor:pointer;";
                        metaData.style += "font-weight:bolder;color:#057ECB;";
                        return Ext.util.Format.number(value, '0,000');
                    }
                },
                columns: [
                    {
                        text: 'Total', dataIndex: 'TOTAL', align: 'center', width: 100,
                        listeners: {
                            click: 'onClickTotal'
                        },
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = "text-align:center;font-weight:bold;";
                            return Ext.util.Format.number(value, '0,000');
                        }
                    },
                    {
                        text: 'Match', dataIndex: 'TOTAL_MATCH', align: 'center', width: 100,
                        listeners: {
                            click: 'onClickDetail'
                        },
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = "text-align:center;font-weight:bold;";
                            return Ext.util.Format.number(value, '0,000');
                        }
                    },
                    {
                        text: 'Pending', dataIndex: 'TOTAL_PENDING', align: 'center', width: 100,
                        listeners: {
                            click: 'onClickDetail'
                        },
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = "text-align:center;font-weight:bold;";
                            return Ext.util.Format.number(value, '0,000');
                        }
                    },
                    {
                        text: '%', align: 'center', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;background-color:#d5f4d5;color:red;";
                            value = (record.data.TOTAL_PENDING / record.data.TOTAL) * 100;
                            return value.toFixed(2) + '%';
                        },
                        summaryType: 'customPercent',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = "text-align:center;font-weight:bold;";
                            let atributos = Object.keys(summaryData);
                            let total = atributos[1];
                            let pending = atributos[3];
                            let percent = (summaryData[pending] / summaryData[total]) * 100;
                            return percent.toFixed(2) + '%';

                        }
                    }
                ]
            },
            {
                text: 'Transaction No Complement', width: 200,
                defaults: {
                    menuDisabled: true,
                    sortable: true,
                    align: 'center',
                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                        metaData.style = "text-align:center;background-color:#BDE1FF;text-decoration:underline;cursor:pointer;font-weight:bolder;color:#057ECB;";
//                        return value;
                        return Ext.util.Format.number(value, '0,000');
                    },
                    summaryType: 'sum',
                    summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                        metaData.style = "text-align:center;font-weight:bold;";
//                        return value;
                        return Ext.util.Format.number(value, '0,000');
                    }
                },
                columns: [
                    {
                        text: 'Match', dataIndex: 'TOTAL_NC_MATCH', align: 'center', width: 100,
                        listeners: {
                            click: 'onClickDetail'
                        }
                    },
                    {
                        text: 'Pending', dataIndex: 'TOTAL_NC_PENDING', align: 'center', width: 100,
                        listeners: {
                            click: 'onClickDetail'
                        }
                    }
                ]
            },
            {
                text: 'Complements', width: 600,
                defaults: {
                    menuDisabled: true,
                    sortable: true,
                    align: 'center',
                    defaults: {
                        menuDisabled: true,
                        sortable: true,
                        align: 'center',
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;background-color:#FFFFCD;text-decoration:underline;cursor:pointer;font-weight:bolder;color:#057ECB;";
//                            return value;
                            return Ext.util.Format.number(value, '0,000');
                        },
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = "text-align:center;font-weight:bold;";
//                            return value;
                            return Ext.util.Format.number(value, '0,000');
                        }
                    }
                },
                columns: [
                    {
                        text: 'Plusgrade', width: 200,
                        columns: [
                            {
                                text: 'Match', dataIndex: 'TOTAL_PG_MATCH', align: 'center', width: 100,
                                listeners: {
                                    click: 'onClickDetail'
                                }

                            },
                            {
                                text: 'Pending', dataIndex: 'TOTAL_PG_PENDING', align: 'center', width: 100,
                                listeners: {
                                    click: 'onClickDetail'
                                }
                            }
                        ]
                    },
                    {
                        text: 'Ligas', width: 200,
                        columns: [
                            {
                                text: 'Match', dataIndex: 'TOTAL_LIG_MATCH', align: 'center', width: 100,
                                listeners: {
                                    click: 'onClickDetail'
                                }
                            },
                            {
                                text: 'Pending', dataIndex: 'TOTAL_LIG_PENDING', align: 'center', width: 100,
                                listeners: {
                                    click: 'onClickDetail'
                                }
                            }
                        ]
                    },
                    {
                        text: 'Tablets', width: 200,
                        columns: [
                            {
                                text: 'Match', dataIndex: 'TOTAL_TAB_MATCH', align: 'center', width: 100,
                                listeners: {
                                    click: 'onClickDetail'
                                }
                            },
                            {
                                text: 'Pending', dataIndex: 'TOTAL_TAB_PENDING', align: 'center', width: 100,
                                listeners: {
                                    click: 'onClickDetail'
                                }
                            }
                        ]
                    }
                ]
            },
            {
                text: 'Total<br>By Ticket', dataIndex: 'TOTAL_BY_TICKET', align: 'center', width: 100,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return Ext.util.Format.number(value, '0,000');
                    },
                summaryType: 'sum',
                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                    metaData.style = "text-align:center;font-weight:bold;";
                   return Ext.util.Format.number(value, '0,000');
                }
            }
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
                hidden: true,
                listeners: {
                    click: 'downloadExcel'
                }
            },
            {
                xtype: 'button',
                scale: 'small',
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