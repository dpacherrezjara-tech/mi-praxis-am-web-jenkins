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
                text: 'RN', dataIndex: 'rn', width: 40, hidden: true
            },
            {text: 'Payment <br> Date', dataIndex: 'paydate', width: 80,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;";
                    return value;
                }
            },
            {text: 'Status', dataIndex: 'stval', width: 80,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;";
                    const sts = ['1','5','6','7'];
                    return sts.includes(value)?'Match':'Pending';
                }
            },
            {text: 'Ticket', dataIndex: 'tkt', flex:1,
                listeners: {
                    click: 'onClickTicketInfo'
                },
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    if(record.data.tkt.trim()===''){
                        metaData.style = "background-color:#FCF6DC;";
                    }else{
                        metaData.style = "background-color:#FCF6DC;font-weight:bold;color:#057ECB;text-decoration:underline;cursor:pointer";
                    }
                    return value;
                },
                summaryType: 'count', summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                    metaData.style = "text-align:left;font-weight:bold;";
                    return 'Total Tickets: ' + value;
                }
            },
            {text: 'Seq', dataIndex: 'seq', width: 40,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;";
                    return value;
                }
            },
            {
                text: 'Credit Card',
                defaults: {
                    menuDisabled: true,
                    sortable: false,
                    align: 'center'
                },
                columns: [
                    {text: 'Number', dataIndex: 'scardn', width: 130,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;";
                            return value;
                        }
                    },
                    {text: 'Auth.', dataIndex: 'sauthoc', width: 60,
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
                    {text: 'PNR', dataIndex: 'spnr', width: 60, autoSizeColumn: true,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;";
                            return value;
                        }
                    },
                    {text: 'Date', dataIndex: 'sdate', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;";
                            return value;
                        }
                    },
                    {text: 'Currency', dataIndex: 'scurrency', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;";
                            return value;
                        }
                    },
                    {
                        text: 'Total Sale<br>Amount', dataIndex: 'svfops_TOTAL', width: 100,
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
                    {text: 'Amount<br>Transaction', dataIndex: 'svfops', width: 100,
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
                    {text: 'Date', dataIndex: 'fcont', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;";
                            return value;
                        }
                    },
                    {text: 'Id', dataIndex: 'idcon', width: 310}
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
                    {text: 'Date', dataIndex: 'liq_FCON', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;";
                            return value;
                        }
                    },
                    {text: 'Id', dataIndex: 'liq_IDCON', width: 310,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;";
                            return value;
                        }
                    },
                    {text: 'Status', dataIndex: 'liq_STCON', width: 80, hidden: false,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;";
                            const opts = {
                              '':'Pending',
                              '1':'Accounted',
                              '2':'Debug'
                            };
                            return opts[value.trim()]||'';
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
                //id: prototype.id + '-btnExcel',
                //text:'<strong>Excel</strong>',
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


