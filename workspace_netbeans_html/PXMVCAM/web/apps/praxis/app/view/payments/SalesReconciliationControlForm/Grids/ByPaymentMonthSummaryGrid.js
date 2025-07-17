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
                    if (record.data.paydate) {
                        value = record.data.paydate;
                    } else if (record.data.prda) {
                        value = record.data.prda;
                    } else {
                        value = record.data.feup;
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
//                        return value;
                        return Ext.util.Format.number(value, '0,000');
                    }
                },
                columns: [
                    {
                        text: 'Total', dataIndex: 'total', align: 'center', width: 100,
                        listeners: {
                            click: 'onClickTotal'
                        },
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = "text-align:center;font-weight:bold;";
//                            return value;
                            return Ext.util.Format.number(value, '0,000');
                        }
                    },
                    {
                        text: 'Match', dataIndex: 'total_MATCH', align: 'center', width: 100,
                        listeners: {
                            click: 'onClickDetail'
                        },
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = "text-align:center;font-weight:bold;";
//                            return value;
                            return Ext.util.Format.number(value, '0,000');
                        }
                    },
                    {
                        text: 'Pending', dataIndex: 'total_PENDING', align: 'center', width: 100,
                        listeners: {
                            click: 'onClickDetail'
                        },
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = "text-align:center;font-weight:bold;";
//                            return value;
                            return Ext.util.Format.number(value, '0,000');
                        }
                    },
                    {
                        text: '%', align: 'center', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;background-color:#d5f4d5;color:red;";
                            value = (record.data.total_PENDING / record.data.total) * 100;
//                            return value.toFixed(2) + '%';
                            const value1 = value.toFixed(2) + '%';
                            return Ext.util.Format.number(value1, '0,000');
                        },
                        summaryType: 'customPercent',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = "text-align:center;font-weight:bold;";
                            let atributos = Object.keys(summaryData);
                            let total = atributos[1];
                            let pending = atributos[3];
                            let percent = (summaryData[pending] / summaryData[total]) * 100;
//                            return percent.toFixed(2) + '%';
                            const value1 = percent.toFixed(2) + '%';
                            return Ext.util.Format.number(value1, '0,000');

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
                        text: 'Match', dataIndex: 'total_NC_MATCH', align: 'center', width: 100,
                        listeners: {
                            click: 'onClickDetail'
                        }
                    },
                    {
                        text: 'Pending', dataIndex: 'total_NC_PENDING', align: 'center', width: 100,
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
                                text: 'Match', dataIndex: 'total_PG_MATCH', align: 'center', width: 100,
                                listeners: {
                                    click: 'onClickDetail'
                                }

                            },
                            {
                                text: 'Pending', dataIndex: 'total_PG_PENDING', align: 'center', width: 100,
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
                                text: 'Match', dataIndex: 'total_LIG_MATCH', align: 'center', width: 100,
                                listeners: {
                                    click: 'onClickDetail'
                                }
                            },
                            {
                                text: 'Pending', dataIndex: 'total_LIG_PENDING', align: 'center', width: 100,
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
                                text: 'Match', dataIndex: 'total_TAB_MATCH', align: 'center', width: 100,
                                listeners: {
                                    click: 'onClickDetail'
                                }
                            },
                            {
                                text: 'Pending', dataIndex: 'total_TAB_PENDING', align: 'center', width: 100,
                                listeners: {
                                    click: 'onClickDetail'
                                }
                            }
                        ]
                    }
                ]
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