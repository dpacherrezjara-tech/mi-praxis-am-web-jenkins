Ext.define('Ext.Praxis.view.payments.AccountingTransactionForm.Grids.DetailGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-detailGrid',
    requires: [
        'Ext.Praxis.controller.payments.AccountingTransaction.DetailGridController',
        'Ext.Praxis.view.payments.AccountingTransactionForm.Grids.AccountingGrid',
        'Ext.Praxis.view.payments.AccountingTransactionForm.Grids.DetailTicketGrid'
    ],
    controller: 'ATDetailGridController',
    title: 'Detail',
    titleAlign: 'center',
    minHeight: 310,
    width: '100%',
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
            {
                text: 'RN',
                xtype: 'rownumberer',
                dataIndex: 'RN', width: 40
            },
            {text: '', width: 80,
                id: prototype.id + '-det-fechap',
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;";
                    return value;
                }
            },
            {text: 'Document<br>Type', dataIndex: 'TRANSTYPE', width: 70,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;";
                    return value.trimEnd();
                }
            },
            {text: 'Status', dataIndex: 'STVAL', width: 60,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;";
                    const sts = ['1', '5', '6', '7'];
                    return sts.includes(value) ? 'Match' : 'Pending';
                }
            },
            {
                text: 'Accounting',
                defaults: {
                    menuDisabled: true,
                    sortable: false,
                    align: 'center'
                },
                columns: [
                    {text: 'Flex ID', dataIndex: 'IDFLEX', width: 330,
                        id: prototype.id + '-colIDFlex',
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;background-color:#c0f0af;";
                            return value;
                        }
                    },
                    {text: 'PRAXIS ID', dataIndex: 'PRAXISID', width: 330,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;background-color:#c0f0af;text-decoration:underline;cursor:pointer;color:#057ECB";
                            return value;
                        },
                        listeners: {
                            click: 'onClickAccountingDetail'
                        }
                    },
                    {text: 'Date', dataIndex: 'FCONTL', width: 65,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;background-color:#c0f0af";
                            return value;
                        }
                    },
                    {text: 'Status', dataIndex: 'STCONL', width: 70,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;background-color:#c0f0af";
                            const opts = {
                                '': 'Pending',
                                '1': 'Accounted',
                                '2': 'Debug'
                            };
                            return opts[value.trim()] || '';
                        }
                    }
                ]
            },
            {
                text: 'Credit Card',
                defaults: {
                    menuDisabled: true,
                    align: 'center',
                    sortable: true
                },
                columns: [
                    {text: 'Number', dataIndex: 'SCARDN', width: 150,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;";
                            return value;
                        }
                    },
                    {text: 'Auth', dataIndex: 'SAUTHOC', width: 60,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;";
                            return value;
                        }
                    }
                ]
            },
            {text: '', width: 70,
                id: prototype.id + '-det-fechah',
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
            {text: 'Transaction<br>Amount ', dataIndex: 'TGROSAMOUN', width: 120,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:right;";
                    value = Ext.util.Format.number(value, '0,000.00');
                    return value;
                }
            },
            {text: 'PNR', dataIndex: 'SPNR', width: 70,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;";
                    return value;
                }
            },
            {text: 'Qty.<br>Tkts', dataIndex: 'QTYTKT', width: 50,
                listeners: {
                    click: 'onClickTickets'
                },
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-decoration:underline;cursor:pointer;color:#057ECB";
                    return value;
                }
            },
            {text: 'Ticket Nbr', dataIndex: 'TICKET', flex: 1,
                listeners: {
                    click: 'onClickTicketInfo'
                },
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    if (record.data.TICKET.trim() === '') {
                        metaData.style = "background-color:#FCF6DC;";
                    } else {
                        metaData.style = "background-color:#FCF6DC;font-weight:bold;color:#057ECB;text-decoration:underline;cursor:pointer";
                    }
                    return value;
                }
            },
            {text: 'corrl', dataIndex: 'CORRL', width: 20, hidden: true},
            {text: 'seq',   dataIndex: 'SEQ',   width: 20, hidden: true},
            {text: 'ccust', dataIndex: 'CCUST', width: 20, hidden: true}
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
    },
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true
    }
});


