Ext.define('Ext.Praxis.view.payments.AccountingTransactionForm.Grids.DetailTicketGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-detailTicketGrid',
    requires: [
        'Ext.Praxis.controller.payments.AccountingTransaction.DetailTicketGridController'
    ],
    controller: 'ATDetailTicketGridController',
    title: 'Detail',
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
    features: [{
        ftype: 'summary',
        dock: 'bottom'
    }],
    columnLines: true,
    columns: {
        defaults: {
            align: 'center',
            menuDisabled: true,
            sortable: true
        },
        items: [
            //<editor-fold defaultstate="collapsed" desc="Detail Ticket Cols">
            {
                text: 'RN', dataIndex: 'RN', width: 40, hidden: true
            },
            {text: 'Payment <br> Date', dataIndex: 'PAYDATE', width: 80,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;";
                    return value;
                }
            },
            {text: 'Status', dataIndex: 'STVAL_DESCRIPTION', width: 80,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;";
                    return value;
                }
            },
            {text: 'Ticket', dataIndex: 'TKT', flex: 1,
                listeners: {
                    click: 'onClickTicketInfo'
                },
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    if (record.data.TKT.trim() === '') {
                        metaData.style = "background-color:#FCF6DC;";
                    } else {
                        metaData.style = "background-color:#FCF6DC;font-weight:bold;color:#057ECB;text-decoration:underline;cursor:pointer";
                    }
                    return value;
                },
                summaryType: 'count', summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                    metaData.style = "text-align:left;font-weight:bold;";
                    return 'Total Tickets: ' + value;
                }
            },
            {text: 'Seq', dataIndex: 'SEQ', width: 40,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;";
                    return value;
                }
            },
            {
                text: 'Credit Card',
                defaults: {
                    menuDisabled: true,
                    align: 'center',
                    sortable: true
                },
                columns: [
                    {text: 'Number', dataIndex: 'SCARDN', width: 130,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;";
                            return value;
                        }
                    },
                    {text: 'Auth.', dataIndex: 'SAUTHOC', width: 60,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;";
                            return value;
                        }
                    }
                ]
            },
            {
                text: 'Sales',
                defaults: {
                    menuDisabled: true,
                    sortable: false,
                    align: 'center'
                },
                columns: [
                    {text: 'PNR', dataIndex: 'SPNR', width: 60, autoSizeColumn: true,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;";
                            return value;
                        }
                    },
                    {text: 'Date', dataIndex: 'SDATE', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;";
                            return value;
                        }
                    },
                    {text: 'Currency', dataIndex: 'SCURRENCY', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;";
                            return value;
                        }
                    },
                    {
                        text: 'Total Sale<br>Amount', dataIndex: 'SVFOPS_TOTAL', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;";
                            value = Ext.util.Format.number(value, '0,000.00');
                            if (rowIndex > 0) {
                                return 0;
                            } else {
                                return value;
                            }
                        },
                        summaryType: 'max', summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = "text-align:right;font-weight:bold;";
                            metaData.tdAttr = 'data-qtip="Total Sale Amount: ' + value + '"';
                            return Ext.util.Format.number(value, '0,000.00');
                        }
                    },
                    {text: 'Amount<br>Transaction', dataIndex: 'SVFOPS', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        },
                        summaryType: 'sum', summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = "text-align:right;font-weight:bold;";
                            metaData.tdAttr = 'data-qtip="Total Transaction Amount: ' + value + '"';
                            return Ext.util.Format.number(value, '0,000.00');
                        }
                    }
                ]
            },
            {
                text: 'Accounting Sales',
                defaults: {
                    menuDisabled: true,
                    sortable: false,
                    align: 'center'
                },
                columns: [
                    {text: 'Date', dataIndex: 'FCONT', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;";
                            return value;
                        }
                    },
                    {text: 'Id', dataIndex: 'IDCON', width: 310}
                ]
            },
            {
                text: 'Accounting Settlement',
                defaults: {
                    menuDisabled: true,
                    sortable: false,
                    align: 'center'
                },
                columns: [
                    {text: 'Date', dataIndex: 'LIQ_FCON', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;";
                            return value;
                        }
                    },
                    {text: 'Id', dataIndex: 'LIQ_IDCON', width: 310,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;";
                            return value;
                        }
                    },
                    {text: 'Status', dataIndex: 'STCONL_DESCRIPTION', width: 80, hidden: false,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;";
                            return value;
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


