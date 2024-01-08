//width: 1370,
prototype.idGridBT = prototype.id + '-byTicketMonthSummaryGrid';
Ext.define('Ext.Praxis.view.payments.SalesReconciliationControlForm.Grids.ByTicketMonthSummaryGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-byTicketMonthSummaryGrid', // Alias para usar en el xtype
    requires: [
        'Ext.Praxis.controller.payments.SalesReconciliationControl.ByTicketMonthSummaryGridController'
    ],
    controller: 'ByTicketMonthSummaryGridController',
    title: 'By Ticket Summary',
    titleAlign: 'center',
    height: 'auto',
    minHeight: 300,
    maxHeight: prototype.height,
    width: 870,
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
                flex: 1,
                renderer: function (value, metaData, record, rowIndex, colIndex) {
                    metaData.style = "text-align:center;font-weight:bold;color:#8B5199;";
                    if (record.data.a4496FPROC) {
                        value = record.data.a4496FPROC;
                    } else {
                        value = record.data.a4496FECVT;
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
                        return value;
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
                            return value;
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
                            return value;
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
                            return value;
                        }
                    },
                    {
                        text: '%', align: 'center', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;background-color:#d5f4d5;color:red;";
                            value = (record.data.total_PENDING / record.data.total) * 100;
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