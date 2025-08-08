Ext.define('Ext.Praxis.view.payments.SalesReconciliationControlForm.Grids.ByPaymentDetailGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-ByPaymentDetailGrid',
    requires: [
        'Ext.Praxis.controller.payments.SalesReconciliationControl.ByPaymentDetailGridController'
    ],
    controller: 'ByPaymentDetailGridController',
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
                text: 'RN',
                locked: true,
                xtype: 'rownumberer', // Columna de número de fila
                width: 40 // Ancho de la columna de número de fila (ajusta según tus necesidades)
            },
            {
                sortable: false,
                xtype: 'actioncolumn',
                width: 40,
                text: 'Edit',
                locked: true,
                align: 'center',
                items: [
                    {
                        iconCls: 'prx-icon-detail',
                        tooltip: 'Open Detail',
                        handler: 'onClickBPO'
                    }
                ]
            },
            {
                sortable: false,
                xtype: 'actioncolumn',
                width: 40,
                text: 'Log',
                locked: true,
                align: 'center',
                items: [
                    {
                        iconCls: 'prx-icon-image-log',
                        tooltip: 'Open Log',
                        handler: 'onClickLog'
                    }
                ]
            },
            {
                text: 'Ref. Number', dataIndex: 'arefnbr', width: 150,
                hidden: true,
                renderer: function (value, metaData, record, rowIndex, colIndex) {
                    metaData.style = "text-align:center;font-weight:bold;";
                    return value;
                }
            },
            {text: 'Processing<br>Date', dataIndex: 'prda', width: 75},
            {text: 'Payment<br>Date', dataIndex: 'paydate', width: 75},
            {text: 'Processor', dataIndex: 'desc_PROCTYPE', width: 160, autoSizeColumn: true},
            {text: 'Country', dataIndex: 'scountry', width: 60},
            //metaData.tdAttr = 'data-qtip="' + data.DES_MERCHANT + '"';
            {
                text: 'Payment<br>Merchant ID', dataIndex: 'pmerchid', width: 100, autoSizeColumn: true,
                renderer: function (value, metaData, record, rowIndex, colIndex) {
                    const info = record.data;
                    if (info.des_MERCHANT && info.des_MERCHANT !== '') {
                        metaData.tdAttr = 'data-qtip="' + info.des_MERCHANT + '"';
                    }
                    return value;
                }
            },
            {
                text: 'Status<br>Settl. VS Sales', dataIndex: 'stval', width: 150, autoSizeColumn: true,
                renderer: function (value, metaData, record, rowIndex, colIndex) {
                    metaData.style = "text-align:center;font-weight:bold;background-color:#8EDFB3;";
                    const opts = {
//                        'A': 'Match OC/Camepa',
                        'C': 'Match Complement',
//                        'D': 'Match Balance',
                        'E': 'Duplicate Payment',
                        'M': 'Match Multi-Payment',
                        '0': 'Stand By',
                        '1': 'Match',
                        '2': 'Sales Without Settl.',
                        '3': 'Settl. Without Sales',
                        '4': 'Match Partial',
                        '5': 'Match Manual',
//                        '6': 'Match Forced',
//                        '7': 'Match Compensation',
                        '8': 'Match Transactional',
                        '9': 'Match Void'
                    };
                    return opts[value] || '';
                }
            },
            {
                text: 'Doc.<br>Type', dataIndex: 'transtype', width: 60,
                renderer: function (value, metaData, record, rowIndex, colIndex) {
                    if (record.data.transtype === 'CHBK' || record.data.transtype === 'ADJU') {
                        metaData.style = "font-weight:bold;color:red;";
                        metaData.tdAttr = 'data-qtip="' + (record.data.transtype === 'CHBK' ? 'CHARGEBACK' : 'ADJUSTMENT') + '"';
                    }
                    return value;
                }
            },
            {text: 'Void', dataIndex: 'fvoid', width: 45},
            {
                text: 'Transaction',
                defaults: {
                    align: 'center',
                    menuDisabled: true,
                    sortable: true,
                    renderer: function (value, metaData, record, rowIndex, colIndex) {
                        metaData.style = "text-align:center;background-color:#F0D094;";
                        return value;
                    }
                },
                columns: [
                    {text: 'Sales<br> Merchant ID', dataIndex: 'smerchid', width: 90},
                    {text: 'Sales Merchant<br>Description', dataIndex: 'des_SMERCHANT', width: 200},
                    {text: 'Sale Date', dataIndex: 'sdate', width: 75},
                    {text: 'Card Number', dataIndex: 'scardn', width: 130},
                    {text: 'Auth.<br>Code', dataIndex: 'sauthoc', width: 65},
                    {
                        text: 'Installment',
                        defaults: {
                            align: 'center',
                            menuDisabled: true,
                            sortable: true,
                            renderer: function (value, metaData, record, rowIndex, colIndex) {
                                metaData.style = "text-align:center;background-color:#F0D094;";
                                return value;
                            }
                        },
                        columns: [
                            {text: 'Plan', dataIndex: 'nbrinsta', width: 50},
                            {text: 'Nbr', dataIndex: 'instanbr', width: 50}
                        ]
                    },
                    {
                        text: 'Ticket', dataIndex: 'ticket', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex) {
                            metaData.style = "text-align:center;background-color:#F0D094;font-weight:bold;";
                            return value;
                        }
                    },
                    {text: 'PNR', dataIndex: 'spnr', width: 60},
                    {
                        text: 'Invoice<br>Refer. Number<br>PNR', dataIndex: 'invoirn', width: 130
                    },
                    {
                        text: 'ARN', dataIndex: 'arn', width: 150
                    },
                    {
                        text: 'Ref. Number', dataIndex: 'arefnbr', width: 150
                    }

                ]
            },
            {
                text: 'Curr', dataIndex: 'scurrency', width: 50,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;background-color:#B2DAFA";
                    return value;
                }
            },
            {
                text: 'Transaction<br>Amount', dataIndex: 'tgrosamoun', width: 120,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:right;background-color:#B2DAFA";
                    value = Ext.util.Format.number(value, '0,000.00');
                    return value;
                }
            },
            {
                text: 'Sale<br>Amount', dataIndex: 'svfops', width: 120,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:right;background-color:#B2DAFA";
                    value = Ext.util.Format.number(value, '0,000.00');
                    return value;
                }
            },
            {
                text: 'Diff.<br>Amount', dataIndex: 'difference', width: 120,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:right;background-color:#B2DAFA";
                    value = Ext.util.Format.number(value, '0,000.00');
                    return value;
                }
            },
            {
                text: 'Qty<br>Tkts', dataIndex: 'qtytkt', width: 40,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;background-color:#B2DAFA";
                    return value;
                }
            },
            {
                text: 'Error',
                defaults: {
                    align: 'center',
                    menuDisabled: true,
                    sortable: true
                },
                columns: [
                    {text: 'Code', dataIndex: 'cerror', width: 50},
                    {text: 'Description', dataIndex: 'des_CERROR', width: 240}
                ]
            },
            {
                text: 'Adjustments',
                defaults: {
                    align: 'center',
                    menuDisabled: true,
                    sortable: true
                },
                columns: [
                    {text: 'Code', dataIndex: 'codadju', width: 50},
                    {text: 'Description', dataIndex: 'desc_CODADJU', width: 160}
                ]

            },
            {text: 'BPO Comment', dataIndex: 'bpocoment', width: 210},
            {text: 'User<br>Update', dataIndex: 'usup', width: 100},
            {text: 'Date<br>Update', dataIndex: 'feup', width: 80}
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
                id: prototype.id + '-groupCreditCard-1',
                hidden: true,
                iconCls: 'prx-icon-update',
                scale: 'small',
                tooltip: 'Group Credit Cards',
                listeners: {
                    click: 'groupByCreditCard'
                }
            },
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
                xtype: 'button',
                id: prototype.id + '-backButtonDetail-1',
                scale: 'small',
                iconCls: 'prx-icon-back',
                width: 25,
                tooltip: 'Back to Summary',
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


