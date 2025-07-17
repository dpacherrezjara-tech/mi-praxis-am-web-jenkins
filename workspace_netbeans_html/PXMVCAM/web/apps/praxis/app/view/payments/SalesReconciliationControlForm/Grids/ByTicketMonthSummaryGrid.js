//width: 1370,
prototype.idGridBT = prototype.id + '-byTicketMonthSummaryGrid';
Ext.define('Ext.Praxis.view.payments.SalesReconciliationControlForm.Grids.ByTicketMonthSummaryGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-byTicketMonthSummaryGrid', // Alias para usar en el xtype
    requires: [
        'Ext.Praxis.controller.payments.SalesReconciliationControl.ByTicketMonthSummaryGridController'
    ],
    summaryIsMonth: true,
    searchLastParams: {} ,
    controller: 'ByTicketMonthSummaryGridController',
    title: 'By Ticket Summary',
    titleAlign: 'center',
    height: 'auto',
    minHeight: 300,
    maxHeight: prototype.height,
    width: 1700,
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
                text: 'Sale<br>Date',
                width: 80,
                renderer: function (value, metaData, record, rowIndex, colIndex, dataIndex) {
                    metaData.style = "text-align:center;font-weight:bold;color:#8B5199;";
                    
                    console.log("record.data", record.data);
                    
                    let fecha = "" ;
                    
                    if (record.data.a4496FPROC) {
                        fecha = record.data.a4496FPROC;
                    } else if (record.data.a4501PRDA) {
                        fecha = record.data.a4501PRDA;
                    } else if (record.data.a4501FECVT) {
                        fecha = record.data.a4501FECVT;
                    } else {
                        fecha = record.data.a4501FEUP;
                    }

                    return `<span style="cursor:pointer;text-decoration:underline;color:#057ECB;font-weight:bold;">${fecha}</span>`;
                },
                listeners: {
                    click : 'onClickDateSummaryCell'
                }
            },
            {
//                text: 'Total General',
                text: 'Total',
                //width: 400,
                defaults: {
                    menuDisabled: true,
                    sortable: true,
                    align: 'center',
                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                        metaData.style = "text-align:center;background-color:#d5f4d5;text-decoration:underline;cursor:pointer;";
                        metaData.style += "font-weight:bolder;color:#057ECB;";
                        return value;
                    }
                },
                columns: [
//                    {
//                        text: 'Total', dataIndex: 'total', align: 'center', width: 100,
//                        listeners: {
//                            click: 'onClickTotal'
//                        },
//                        summaryType: 'sum',
//                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                            metaData.style = "text-align:center;font-weight:bold;";
//                            return value;
//                        }
//                    },
//                    {
//                        text: 'Match', dataIndex: 'total_MATCH', align: 'center', width: 100,
//                        listeners: {
//                            click: 'onClickDetail'
//                        },
//                        summaryType: 'sum',
//                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                            metaData.style = "text-align:center;font-weight:bold;";
//                            return value;
//                        }
//                    },
//                    {
//                        text: 'Pending', dataIndex: 'total_PENDING', align: 'center', width: 100,
//                        listeners: {
//                            click: 'onClickDetail'
//                        },
//                        summaryType: 'sum',
//                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                            metaData.style = "text-align:center;font-weight:bold;";
//                            return value;
//                        }
//                    },
//                    {
//                        text: '%', align: 'center', width: 100,
//                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                            metaData.style = "text-align:center;background-color:#d5f4d5;color:red;";
//                            value = (record.data.total_PENDING / record.data.total) * 100;
//                            return value.toFixed(2) + '%';
//                        },
//                        summaryType: 'customPercent',
//                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                            metaData.style = "text-align:center;font-weight:bold;";
//                            let atributos = Object.keys(summaryData);
//                            let total = atributos[1];
//                            let pending = atributos[3];
//                            let percent = (summaryData[pending] / summaryData[total]) * 100;
//                            return percent.toFixed(2) + '%';
//                        }
//                    },
                    
                    {
                        text: 'AX', dataIndex: 'total_AX', align: 'center', width: 80,
                        statusSummary: '',
                        renderer: function (value, metaData, record) {
                            metaData.style = "text-align:center;background-color:#d5f4d5;text-decoration:underline;cursor:pointer;font-weight:bolder;color:#057ECB;";
                            return Ext.util.Format.number(value, '0,000');
                        },
                        listeners: {
                            click: 'onClickDetail'
                        },
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = "text-align:center;font-weight:bold;";
                            //return value;
                            return Ext.util.Format.number(value, '0,000');
                        }
                    },
                    {
                        text: 'VI/MC', dataIndex: 'total_VI_MC', align: 'center', width: 80,
                        statusSummary: '',
                        renderer: function (value, metaData, record) {
                            metaData.style = "text-align:center;background-color:#d5f4d5;text-decoration:underline;cursor:pointer;font-weight:bolder;color:#057ECB;";
                            return Ext.util.Format.number(value, '0,000');
                        },
                        listeners: {
                            click: 'onClickDetail'
                        },
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = "text-align:center;font-weight:bold;";
                            //return value;
                            return Ext.util.Format.number(value, '0,000');
                        }
                    },
                    {
                        text: 'DC', dataIndex: 'total_DC', align: 'center', width: 80,
                        statusSummary: '',
                        renderer: function (value, metaData, record) {
                            metaData.style = "text-align:center;background-color:#d5f4d5;text-decoration:underline;cursor:pointer;font-weight:bolder;color:#057ECB;";
                            return Ext.util.Format.number(value, '0,000');
                        },
                        listeners: {
                            click: 'onClickDetail'
                        },
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = "text-align:center;font-weight:bold;";
                            //return value;
                            return Ext.util.Format.number(value, '0,000');
                        }
                    },
                    {
                        text: 'TP', dataIndex: 'total_TP', align: 'center', width: 80,
                        statusSummary: '',
                        renderer: function (value, metaData, record) {
                            metaData.style = "text-align:center;background-color:#d5f4d5;text-decoration:underline;cursor:pointer;font-weight:bolder;color:#057ECB;";
                            return Ext.util.Format.number(value, '0,000');
                        },
                        listeners: {
                            click: 'onClickDetail'
                        },
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = "text-align:center;font-weight:bold;";
                            //return value;
                            return Ext.util.Format.number(value, '0,000');
                        }
                    },
                    {
                        text: 'BO', dataIndex: 'total_BO', align: 'center', width: 80,
                        statusSummary: '',
                        renderer: function (value, metaData, record) {
                            metaData.style = "text-align:center;background-color:#d5f4d5;text-decoration:underline;cursor:pointer;font-weight:bolder;color:#057ECB;";
                            return Ext.util.Format.number(value, '0,000');
                        },
                        listeners: {
                            click: 'onClickDetail'
                        },
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = "text-align:center;font-weight:bold;";
                            //return value;
                            return Ext.util.Format.number(value, '0,000');
                        }
                    },
                    {
                        text: 'OTHERS', dataIndex: 'total_OTHER', align: 'center', width: 80,
                        statusSummary: '',
                        renderer: function (value, metaData, record) {
                            metaData.style = "text-align:center;background-color:#d5f4d5;text-decoration:underline;cursor:pointer;font-weight:bolder;color:#057ECB;";
                            return Ext.util.Format.number(value, '0,000');
                        },
                        listeners: {
                            click: 'onClickDetail'
                        },
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = "text-align:center;font-weight:bold;";
                            //return value;
                            return Ext.util.Format.number(value, '0,000');
                        }
                    },
                    {
                        text: 'CA', dataIndex: 'total_CA', align: 'center', width: 80,
                        statusSummary: '',
                        renderer: function (value, metaData, record) {
                            metaData.style = "text-align:center;background-color:#d5f4d5;text-decoration:underline;cursor:pointer;font-weight:bolder;color:#057ECB;";
                            return Ext.util.Format.number(value, '0,000');
                        },
                        listeners: {
                            click: 'onClickDetail'
                        },
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = "text-align:center;font-weight:bold;";
                            //return value;
                            return Ext.util.Format.number(value, '0,000');
                        }
                    }
                    
                ]
            },
            
            {
                text: 'Match',
                //width: 400,
                defaults: {
                    menuDisabled: true,
                    sortable: true,
                    align: 'center',
                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                        metaData.style = "text-align:center;background-color:#d5f4d5;text-decoration:underline;cursor:pointer;";
                        metaData.style += "font-weight:bolder;color:#057ECB;";
                        //return value;
                            return Ext.util.Format.number(value, '0,000');
                    }
                },
                columns: [
                    {
                        text: 'AX', dataIndex: 'total_MATCH_AX', align: 'center', width: 80,
                        statusSummary: 'M',
                        renderer: function (value, metaData, record) {
                            metaData.style = "text-align:center;background-color:#d5f4d5;text-decoration:underline;cursor:pointer;font-weight:bolder;color:#057ECB;";
                            return Ext.util.Format.number(value, '0,000');
                        },
                        listeners: {
                            click: 'onClickDetail'
                        },
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = "text-align:center;font-weight:bold;";
                            //return value;
                            return Ext.util.Format.number(value, '0,000');
                        }
                    },
                    {
                        text: 'VI/MC', dataIndex: 'total_MATCH_VI_MC', align: 'center', width: 80,
                        statusSummary: 'M',
                        renderer: function (value, metaData, record) {
                            metaData.style = "text-align:center;background-color:#d5f4d5;text-decoration:underline;cursor:pointer;font-weight:bolder;color:#057ECB;";
                            return Ext.util.Format.number(value, '0,000');
                        },
                        listeners: {
                            click: 'onClickDetail'
                        },
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = "text-align:center;font-weight:bold;";
                            //return value;
                            return Ext.util.Format.number(value, '0,000');
                        }
                    },
                    {
                        text: 'DC', dataIndex: 'total_MATCH_DC', align: 'center', width: 80,
                        statusSummary: 'M',
                        renderer: function (value, metaData, record) {
                            metaData.style = "text-align:center;background-color:#d5f4d5;text-decoration:underline;cursor:pointer;font-weight:bolder;color:#057ECB;";
                            return Ext.util.Format.number(value, '0,000');
                        },
                        listeners: {
                            click: 'onClickDetail'
                        },
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = "text-align:center;font-weight:bold;";
                            //return value;
                            return Ext.util.Format.number(value, '0,000');
                        }
                    },
                    {
                        text: 'TP', dataIndex: 'total_MATCH_TP', align: 'center', width: 80,
                        statusSummary: 'M',
                        renderer: function (value, metaData, record) {
                            metaData.style = "text-align:center;background-color:#d5f4d5;text-decoration:underline;cursor:pointer;font-weight:bolder;color:#057ECB;";
                            return Ext.util.Format.number(value, '0,000');
                        },
                        listeners: {
                            click: 'onClickDetail'
                        },
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = "text-align:center;font-weight:bold;";
                            //return value;
                            return Ext.util.Format.number(value, '0,000');
                        }
                    },
                    {
                        text: 'BO', dataIndex: 'total_MATCH_BO', align: 'center', width: 80,
                        statusSummary: 'M',
                        renderer: function (value, metaData, record) {
                            metaData.style = "text-align:center;background-color:#d5f4d5;text-decoration:underline;cursor:pointer;font-weight:bolder;color:#057ECB;";
                            return Ext.util.Format.number(value, '0,000');
                        },
                        listeners: {
                            click: 'onClickDetail'
                        },
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = "text-align:center;font-weight:bold;";
                            //return value;
                            return Ext.util.Format.number(value, '0,000');
                        }
                    },
                    {
                        text: 'OTHERS', dataIndex: 'total_MATCH_OTHER', align: 'center', width: 80,
                        statusSummary: 'M',
                        renderer: function (value, metaData, record) {
                            metaData.style = "text-align:center;background-color:#d5f4d5;text-decoration:underline;cursor:pointer;font-weight:bolder;color:#057ECB;";
                            return Ext.util.Format.number(value, '0,000');
                        },
                        listeners: {
                            click: 'onClickDetail'
                        },
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = "text-align:center;font-weight:bold;";
                            //return value;
                            return Ext.util.Format.number(value, '0,000');
                        }
                    },
                    {
                        text: 'CA', dataIndex: 'total_MATCH_CA', align: 'center', width: 80,
                        statusSummary: 'M',
                        renderer: function (value, metaData, record) {
                            metaData.style = "text-align:center;background-color:#d5f4d5;text-decoration:underline;cursor:pointer;font-weight:bolder;color:#057ECB;";
                            return Ext.util.Format.number(value, '0,000');
                        },
                        listeners: {
                            click: 'onClickDetail'
                        },
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = "text-align:center;font-weight:bold;";
                            //return value;
                            return Ext.util.Format.number(value, '0,000');
                        }
                    }
                ]
            },
            
            {
                text: 'Pending',
                //width: 400,
                defaults: {
                    menuDisabled: true,
                    sortable: true,
                    align: 'center',
                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                        metaData.style = "text-align:center;background-color:#d5f4d5;text-decoration:underline;cursor:pointer;";
                        metaData.style += "font-weight:bolder;color:#057ECB;";
                        //return value;
                            return Ext.util.Format.number(value, '0,000');
                    }
                },
                columns: [
                    {
                        text: 'AX', dataIndex: 'total_PENDING_AX', align: 'center', width: 80,
                        statusSummary: 'P',
                        renderer: function (value, metaData, record) {
                            metaData.style = "text-align:center;background-color:#d5f4d5;text-decoration:underline;cursor:pointer;font-weight:bolder;color:#057ECB;";
                            return Ext.util.Format.number(value, '0,000');
                        },
                        listeners: {
                            click: 'onClickDetail'
                        },
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = "text-align:center;font-weight:bold;";
                            //return value;
                            return Ext.util.Format.number(value, '0,000');
                        }
                    },
                    {
                        text: 'VI/MC', dataIndex: 'total_PENDING_VI_MC', align: 'center', width: 80,
                        statusSummary: 'P',
                        renderer: function (value, metaData, record) {
                            metaData.style = "text-align:center;background-color:#d5f4d5;text-decoration:underline;cursor:pointer;font-weight:bolder;color:#057ECB;";
                            return Ext.util.Format.number(value, '0,000');
                        },
                        listeners: {
                            click: 'onClickDetail'
                        },
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = "text-align:center;font-weight:bold;";
                            //return value;
                            return Ext.util.Format.number(value, '0,000');
                        }
                    },
                    {
                        text: 'DC', dataIndex: 'total_PENDING_DC', align: 'center', width: 80,
                        statusSummary: 'P',
                        renderer: function (value, metaData, record) {
                            metaData.style = "text-align:center;background-color:#d5f4d5;text-decoration:underline;cursor:pointer;font-weight:bolder;color:#057ECB;";
                            return Ext.util.Format.number(value, '0,000');
                        },
                        listeners: {
                            click: 'onClickDetail'
                        },
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = "text-align:center;font-weight:bold;";
                            //return value;
                            return Ext.util.Format.number(value, '0,000');
                        }
                    },
                    {
                        text: 'TP', dataIndex: 'total_PENDING_TP', align: 'center', width: 80,
                        statusSummary: 'P',
                        renderer: function (value, metaData, record) {
                            metaData.style = "text-align:center;background-color:#d5f4d5;text-decoration:underline;cursor:pointer;font-weight:bolder;color:#057ECB;";
                            return Ext.util.Format.number(value, '0,000');
                        },
                        listeners: {
                            click: 'onClickDetail'
                        },
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = "text-align:center;font-weight:bold;";
                            //return value;
                            return Ext.util.Format.number(value, '0,000');
                        }
                    },
                    {
                        text: 'BO', dataIndex: 'total_PENDING_BO', align: 'center', width: 80,
                        statusSummary: 'P',
                        renderer: function (value, metaData, record) {
                            metaData.style = "text-align:center;background-color:#d5f4d5;text-decoration:underline;cursor:pointer;font-weight:bolder;color:#057ECB;";
                            return Ext.util.Format.number(value, '0,000');
                        },
                        listeners: {
                            click: 'onClickDetail'
                        },
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = "text-align:center;font-weight:bold;";
                            //return value;
                            return Ext.util.Format.number(value, '0,000');
                        }
                    },
                    {
                        text: 'OTHERS', dataIndex: 'total_PENDING_OTHER', align: 'center', width: 80,
                        statusSummary: 'P',
                        renderer: function (value, metaData, record) {
                            metaData.style = "text-align:center;background-color:#d5f4d5;text-decoration:underline;cursor:pointer;font-weight:bolder;color:#057ECB;";
                            return Ext.util.Format.number(value, '0,000');
                        },
                        listeners: {
                            click: 'onClickDetail'
                        },
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = "text-align:center;font-weight:bold;";
                            //return value;
                            return Ext.util.Format.number(value, '0,000');
                        }
                    },
                    {
                        text: 'CA', dataIndex: 'total_PENDING_CA', align: 'center', width: 80,
                        statusSummary: 'P',
                        renderer: function (value, metaData, record) {
                            metaData.style = "text-align:center;background-color:#d5f4d5;text-decoration:underline;cursor:pointer;font-weight:bolder;color:#057ECB;";
                            return Ext.util.Format.number(value, '0,000');
                        },
                        listeners: {
                            click: 'onClickDetail'
                        },
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = "text-align:center;font-weight:bold;";
                            //return value;
                            return Ext.util.Format.number(value, '0,000');
                        }
                    }
                ]
            },
            {
                text: 'Total<br>By Payment', dataIndex: 'total_BY_PAYMENT', align: 'center', width: 100,
//                listeners: {
//                    click: 'onClickDetail'
//                },
                summaryType: 'sum',
                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                    metaData.style = "text-align:center;font-weight:bold;";
                    //return value;
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
                hidden: true,
                tooltip: 'Export to Excel',
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