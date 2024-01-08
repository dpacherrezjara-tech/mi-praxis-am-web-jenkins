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
    height: 610,
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
            //<editor-fold defaultstate="collapsed" desc="Detail Cols">
            {
                text: 'RN', dataIndex: 'rn', width: 40, hidden: true
            },
            {text: '', width: 70,
                id: prototype.id + '-det-fechap',
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;";

                    return value;
                }
            },
            {text: 'Document<br>Type', dataIndex: 'transtype', width: 70,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;";
                    return value.trimEnd();
                }
            },
            {text: 'Status', dataIndex: 'stval', width: 60,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;";
                    const sts = ['1','5','6','7'];
                    return sts.includes(value)?'Match':'Pending';
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
                    {text: 'ID', dataIndex: 'idconl', width: 330,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;background-color:#c0f0af;text-decoration:underline;cursor:pointer;color:#057ECB";
                            return value;
                        },
                        listeners:{
                            click:'onClickAccountingDetail'
                        }
                    },
                    {text: 'Date', dataIndex: 'fcontl', width: 65,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;background-color:#c0f0af";
                            return value;
                        }
                    },
                    {text: 'Status', dataIndex: 'stconl', width: 70,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;background-color:#c0f0af";
                            const opts = {
                                '':'Pending',
                                '1': 'Accounted',
                                '2': 'Debug'
                            };
                            return opts[value.trim()]||'';
                        }
                    }
                ]
            },
            {
                text: 'Credit Card',
                defaults: {
                    menuDisabled: true,
                    sortable: false,
                    align: 'center'
                },
                columns: [
                    {text: 'Number', dataIndex: 'scardn', width: 120,
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
            {text: '', width: 70,
                id: prototype.id + '-det-fechah',
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;";
                    return value;
                }
            },
            {text: 'Currency', dataIndex: 'scurrency', width: 70,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;";
                    return value;
                }
            },
            {text: 'Sales<br>Amount', dataIndex: 'svfops', width: 80,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    var data = record.data;
                    if (data.SVFOPS === data.TGROSAMOUN) {
                        metaData.style = "text-align:right;";
                    } else {
                        metaData.style = "text-align:right;color:#cb0519";
                    }
                    value = Ext.util.Format.number(value, '0,000.00');
                    return value;
                }
            },
            {text: 'Transaction<br>Amount ', dataIndex: 'tgrosamoun', width: 80,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:right;";
                    value = Ext.util.Format.number(value, '0,000.00');
                    return value;
                }
            },
            {text: 'PNR', dataIndex: 'spnr', width: 70,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;";
                    return value;
                }
            },
            {text: 'Qty.<br>Tkts', dataIndex: 'qtytkt', width: 50,
                listeners: {
                    click: 'onClickTickets'
                },
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-decoration:underline;cursor:pointer;color:#057ECB";
                    return value;
                }
            },
            {text: 'Indust. Speci. Ref. Nbr.<br>TKT', dataIndex: 'ticket', width: 120,
                listeners: {
                    click: 'onClickTicketInfo'
                },
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    if(record.data.ticket.trim()===''){
                        metaData.style = "background-color:#FCF6DC;";
                    }else{
                        metaData.style = "background-color:#FCF6DC;font-weight:bold;color:#057ECB;text-decoration:underline;cursor:pointer";
                    }
                    //metaData.style = "text-align:center;background-color:#FCF6DC";
                    return value;
                }
            },
            {
                text: 'Error',
                defaults: {
                    menuDisabled: true,
                    sortable: false,
                    align: 'center'
                },
                columns: [
                    {text: 'Code', dataIndex: 'cerror', width: 60,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;";
                            return value;
                        }
                    },
                    {text: 'Description', dataIndex: 'desc_ERROR', width: 150,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;";
                            return value;
                        }
                    }
                ]
            },
            {text: 'Rule', dataIndex: 'fregla', width: 60,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;";
                    const opts = {
                        '1': 'Ticket',
                        '2': 'PNR',
                        '3': 'CCard',
                        '4': 'Manual',
                        '5': 'Transac.'
                    };
                    return opts[value] || '';
                }
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
                    click: function (obj) {
                        obj.up().up().downloadGrid();
                    }
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


