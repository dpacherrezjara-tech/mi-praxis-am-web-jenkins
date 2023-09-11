Ext.define('Ext.Praxis.view.payments.SalesReconciliationControlForm.Grids.ByPaymentDetailGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-ByPaymentDetailGrid',
    requires: [
        'Ext.Praxis.controller.payments.SalesReconciliationControl.ByPaymentDetailGridController'
    ],
    controller: 'ByPaymentDetailGridController',
    height: prototype.height,
    width: prototype.width,
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
                text: 'Ref. Number', dataIndex: 'arefnbr', width: 150,
                renderer: function (value, metaData, record, rowIndex, colIndex) {
                    metaData.style = "text-align:center;font-weight:bold;";
                    return value;
                }
            },
            {text: 'Processing<br>Date', dataIndex: 'prda', width: 100},
            {text: 'Payment<br>Date', dataIndex: 'paydate', width: 100},
            {text: 'Processor', dataIndex: 'desc_PROCTYPE', width: 160},
            {text: 'Country', dataIndex: 'scountry', width: 80},
            {text: 'Payment<br>Merchant ID', dataIndex: 'pmerchid', width: 100},
            {
                text: 'Status<br>Settl. VS Sales', dataIndex: 'stval', width: 150,
                renderer: function (value, metaData, record, rowIndex, colIndex) {
                    metaData.style = "text-align:center;font-weight:bold;background-color:#8EDFB3;";
                    const opts = {
                        '0': 'Stand By',
                        '1': 'Match',
                        '2': 'Sales Without Settl.',
                        '3': 'Settl. Without Sales',
                        '4': 'Match Diff.',
                        '5': 'Manual Match',
                        '6': 'Forced Match',
                        '7': 'Compensation Match',
                        '8': 'Pending RFND'
                    };
                    return opts[value] || '';
                }
            },
            {text: 'Doc. Type', dataIndex: 'transtype', width: 80},
            {text: 'Void', dataIndex: 'fvoid', width: 50},
            {
                text: 'Transaction', width: 1100,
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
                    {text: 'Sales<br> Merchant ID', dataIndex: 'smerchid', width: 100},
                    {text: 'Sales Merchant<br>Description', dataIndex: 'des_SMERCHANT', width: 200},
                    {
                        text: 'Invoice<br>Refer. Number<br>PNR', dataIndex: 'invoirn', width: 130
                    },
                    {text: 'PNR', dataIndex: 'spnr', width: 80},
                    {
                        text: 'Ticket', dataIndex: 'ticket', width: 110,
                        renderer: function (value, metaData, record, rowIndex, colIndex) {
                            metaData.style = "text-align:center;background-color:#F0D094;font-weight:bold;";
                            return value;
                        }
                    },
                    {
                        text: 'Installment', width: 120,
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
                            {text: 'Plan', dataIndex: 'nbrinsta', width: 60},
                            {text: 'Number', dataIndex: 'instanbr', width: 60}
                        ]
                    },
                    {text: 'Card Number', dataIndex: 'scardn', flex: 1},
                    {text: 'Auth. Code', dataIndex: 'sauthoc', width: 100},
                    {text: 'Sale Date', dataIndex: 'sdate', width: 100}
                ]
            },
            {
                text: 'Currency', dataIndex: 'scurrency', width: 80,
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
                text: 'Qty<br>Tkts', dataIndex: 'qtytkt', width: 70,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;background-color:#B2DAFA";
                    return value;
                }
            },
            {
                text: 'Error', width: 300,
                defaults: {
                    align: 'center',
                    menuDisabled: true,
                    sortable: true
                },
                columns: [
                    {text: 'Code', dataIndex: 'cerror', width: 60},
                    {text: 'Description', dataIndex: 'des_CERROR', width: 240}
                ]
            },
            {
                text: 'Adjustments', width: 220,
                defaults: {
                    align: 'center',
                    menuDisabled: true,
                    sortable: true
                },
                columns: [
                    {text: 'Code', dataIndex: 'codadju', width: 60},
                    {text: 'Description', dataIndex: 'desc_CODADJU', width: 160}
                ]

            },
            {
                sortable: false,
                xtype: 'actioncolumn',
                width: 40,
                text: 'Edit',
                align: 'center',
                items: [
                    {
                        iconCls: 'prx-icon-detail',
                        tooltip: 'Open Detail',
                        handler: 'onClickBPO'
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


