

Ext.define('Ext.Praxis.view.payments.AccountingTransactionForm.Grids.SummaryGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-summaryGrid',
    requires: [
        'Ext.Praxis.controller.payments.AccountingTransaction.SummaryGridController',
        'Ext.Praxis.view.payments.AccountingTransactionForm.Grids.SummaryTree'
    ],
    controller: 'ATSummaryGridController',
    title: 'Accounting Summary',
    titleAlign: 'center',
    minHeight: 210,
    maxHeight: 610,
    width: 1200,
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
            //<editor-fold defaultstate="collapsed" desc="Summary Cols">
            {
                text: 'RN', dataIndex: 'rn', width: 40,hidden:true
            },
            {
                text: 'Processing<br>Date', dataIndex: 'fecha', width: 80,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;text-decoration:underline;color:#057ECB;cursor:pointer";
                    var date = Ext.Date.parse(value, 'Ym');

                    var monthNames = [
                        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                    ];

                    // Formatea la fecha según el formato deseado
                    var formattedDate = Ext.Date.format(date, 'Y-M', {
                        monthNames: monthNames
                    });
                    return formattedDate;
                },
                listeners:{
                    click:'onClickMonth'
                }
            },
            {
                text: 'Processor', dataIndex: 'proc_DESC', flex: 1
            },
            {
                text: 'Currency', dataIndex: 'scurrency', width: 80
            },
            {
                text: 'Accounting Trassaction', flex: 1,
                defaults: {
                    align: 'center',
                    menuDisabled: true,
                    sortable: true
                },
                columns: [
                    {
                        text: 'Accounted', dataIndex: 'accounted', width: 120,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#6FCA96";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {
                        text: 'Qty<br>Accounted', dataIndex: 'qty_ACCOUNTED', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#6FCA96";
                            return value;
                        }
                    },
                    {
                        text: 'Pending', dataIndex: 'pending', width: 120,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#D3DA66";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {
                        text: 'Qty<br>Pending', dataIndex: 'qty_PENDING', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#D3DA66";
                            return value;
                        }
                    },
                    {
                        text: 'Total', dataIndex: 'total', width: 120,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#6BA9CF";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {
                        text: 'Qty<br>Total', dataIndex: 'qty_TOTAL', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#6BA9CF";
                            return value;
                        }
                    },
                    { text: 'min_date', dataIndex: 'min_DATE', width: 80, hidden: true },
                    { text: 'max_date', dataIndex: 'max_DATE', width: 80, hidden: true }

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
    },
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true
    }
});