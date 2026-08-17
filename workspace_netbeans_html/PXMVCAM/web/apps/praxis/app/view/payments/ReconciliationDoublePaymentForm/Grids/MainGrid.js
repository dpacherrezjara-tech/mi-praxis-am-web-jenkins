Ext.define('Ext.Praxis.view.payments.ReconciliationDoublePaymentForm.Grids.MainGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-MainGrid',
    requires: [
        'Ext.Praxis.controller.payments.ReconciliationDoublePayment.MainGridController'
    ],
    controller: 'MainGridController',
    maxHeight: prototype.height,
    minHeight: 200,
    height: 'auto',
    width: prototype.width,
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
                sortable: false,
                xtype: 'actioncolumn',
                width: 40,
                text: 'Edit',
                align: 'center',
                hidden: false,
                locked: true,
                items: [
                    {
                        iconCls: 'prx-icon-edit',
                        tooltip: 'Edit',
                        handler: 'onEditClick'
                    }
                ]
            },
            {
                text: 'Processing<br>Date', dataIndex: 'prda', width: 80,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    value = '<b>' + value + '</b>';
                    return value;
                }
            },
            {
                text: 'Payment<br>Date', dataIndex: 'paydate', width: 80,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    value = '<b>' + value + '</b>';
                    return value;
                }
            },
            {text: 'Payment<br>Merchant ID', dataIndex: 'pmerchid', width: 80,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    var data = record.data;
                    metaData.style = "text-align:center;";
                    metaData.tdAttr = 'data-qtip="' + data.des_MERCHANT + '"';
                    return value;
                }
            },
            {
                text: 'Status',
                defaults: {
                    menuDisabled: true,
                    sortable: false,
                    align: 'center'
                },
                columns: [
                    {text: 'Settlement<br>vs Sales', dataIndex: 'stval', width: 85,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            //var data = record.data;
                            metaData.style = "text-align:center;background-color:#B2FAC6;";
                            const sts = ['1', '5', '6', '7'];
                            return sts.includes(value) ? 'Match' : 'Pending';
                        }
                    },
                    {text: 'Refund', dataIndex: 'strfnd', width: 85,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;background-color:#B2FAC6;";
                            value = (value === '1' ? 'Processed' : 'Pending');
                            return '<b>' + value + '</b>';
                        }
                    }
                ]
            },
            {text: 'Document<br>Type', dataIndex: 'transtype', width: 70,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    value = '<b>' + value + '</b>';
                    return value;
                }
            },
            {
                text: 'Transaction',
                defaults: {
                    menuDisabled: true,
                    sortable: false,
                    align: 'center'
                },
                columns: [
                    {text: 'Sales<br>Merchant ID', dataIndex: 'smerchid', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;background-color:#FCF6DC";
                            return value;
                        }
                    },
                    {text: 'Description', dataIndex: 'des_SMERCHANT', width: 200,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;background-color:#FCF6DC";
                            return value;
                        }
                    },
                    {text: 'Invoice <br> Refer. Number<br>PNR', dataIndex: 'invoirn', width: 120,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;background-color:#FCF6DC";
                            return value;
                        }
                    },
                    {text: 'PNR', dataIndex: 'spnr', width: 65,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;background-color:#FCF6DC";
                            return '<b>' + value + '</b>';
                        }
                    },
                    {text: 'Indust.Speci. <br> Ref.Nbr<br>TKT', dataIndex: 'ticket', width: 120,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;background-color:#FCF6DC";
                            return '<b>' + value + '</b>';
                        }
                    },
                    {text: 'Card<br>Account Number', dataIndex: 'scardn', width: 115,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;background-color:#FCF6DC";
                            return value;
                        }
                    },
                    {text: 'Approval<br>Code', dataIndex: 'sauthoc', width: 65,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;background-color:#FCF6DC";
                            return value;
                        }
                    },
                    {text: 'Sales<br>Date', dataIndex: 'sdate', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;background-color:#FCF6DC";
                            return value;
                        }
                    }
                ]
            },
            {
                text: 'Transaction <br> Amount', dataIndex: 'tgrosamoun', width: 80,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:right;background-color:#B2DAFA";
                    value = Ext.util.Format.number(value, '0,000.00');
                    return value;
                }
            },
            {
                text: 'Curr', dataIndex: 'pcurrency', width: 45,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;background-color:#B2DAFA";
                    return value;
                }
            },
            {
                text: 'Pay<br>Tickets', dataIndex: 'qtytkt', width: 60,
                listeners: {
                    click: 'onTktsDetail'
                },
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;text-decoration:underline;cursor:pointer;";
                    metaData.style += "font-weight:bolder;color:#057ECB;";
                    return value;
                }
            },
            {
                text: 'Refund Bank',
                defaults: {
                    menuDisabled: true,
                    sortable: false,
                    align: 'center'
                },
                columns: [
                    {text: 'Date', dataIndex: 'rfdate', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;background-color:#B2FAC6;";
                            return value;
                        }
                    },
                    {text: 'Operation', dataIndex: 'rfoperb', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;background-color:#B2FAC6;";
                            return value;
                        }
                    },
                    {text: 'Agent', dataIndex: 'rfaudit', width: 60,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;background-color:#B2FAC6;";
                            return value;
                        }
                    },
                    {text: 'Auth', dataIndex: 'rfautor', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;background-color:#B2FAC6;";
                            return value;
                        }
                    }
                ]
            },
            {
                text: 'Error',
                defaults: {
                    menuDisabled: true,
                    sortable: false,
                    align: 'center'
                },
                columns: [
                    {text: 'Code', dataIndex: 'cerror', width: 45},
                    {
                        text: 'Description', dataIndex: 'des_CERROR', width: 200,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center";
                            return value;
                        }
                    }
                ]
            },
            {
                text: 'Adjustment',
                defaults: {
                    menuDisabled: true,
                    sortable: false,
                    align: 'center'
                },
                columns: [
                    {text: 'Code', dataIndex: 'codadju', width: 45},
                    {
                        text: 'Description', dataIndex: 'desc_CODADJU', width: 150,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center";
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
            }
        ]
    },
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true
    }
});


