Ext.define('Ext.Praxis.view.payments.ReconciliationPaymentForm.DataGrids.DetDay', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-DataGridDetDay',
    bodyStyle: 'background-color: #E3EAEF;',
    border: true,
    height: 'auto',
    width: 1062,
    margin: '0 0 0 0 ',
    layout: {
        type: 'vbox',
        align: 'center'
    },
    items: [
        {
            xtype: 'grid',
            id: prototype.id + '-gridDetDay',
            width: 1062,
            columnLines: true,
//                                    features: [{
//                                        ftype: 'summary'
//                                    }],
            columns: {
                defaults: {
                    menuDisabled: true,
                    sortable: false,
                    align: 'center'
                },
                items: [
                    {
                        text: 'Payment',
                        id: prototype.id + '-htDetDay',
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            align: 'center'
                        },
                        columns: [
                            {
                                text: 'Date', dataIndex: 'SDATE', width: 100, //flex: 1
                                listeners: {
                                    click: 'onGridDetMerchant'
                                },
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "color:#057ECB;";
                                    value = '<b>' + value + '</b>';
                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                }
                            }
                        ]
                    },
                    {
                        text: 'Bank Statement Reconciliation',
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            align: 'center'
                        },
                        columns: [
                            {
                                text: 'Match',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Automatic', dataIndex: 'lngQMATCH', width: 100,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Diff', dataIndex: 'lngQDIFF', width: 100,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Total', dataIndex: 'lngQTOTSAL', width: 100,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#d5f4d5";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return value;
                                        }
                                    }
                                ]
                            },
                            {
                                text: 'Bank without Payment',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Sale', dataIndex: 'lngQPAS48', width: 100,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return value;
                                        }
                                    }
                                    ,
                                    {
                                        text: 'Refund', dataIndex: 'QBANKRFND', width: 100,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return value;
                                        }
                                    }
                                ]
                            },
                            {
                                text: 'Payment',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'without Bank', dataIndex: 'lngQPAID', width: 100, id: prototype.id + '-label_3',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return value;
                                        }
                                    }
                                ]
                            },
                            {
                                text: 'Total', dataIndex: 'lngQTOTWS', width: 120,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;background-color:#b5d0f9";
                                    return Ext.util.Format.number(value, '0,000');
                                }
                            },
                            {
                                text: 'Quantity of',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Transactions', dataIndex: 'lngQTEF', width: 120,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return value;
                                        }
                                    }
                                    ,
                                    {
                                        text: 'Tickets', dataIndex: 'lngQTYDOC', width: 120,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return value;
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        },
        {
            xtype: 'panel',
            id: prototype.id + '-panelDataSummary3',
            width: 1062,
            align: 'left',
            margin: '0 0 0 0 ',
            layout: {
                type: 'hbox',
                align: 'center'
            },
            defaults: {
                xtype: 'label',
                align: 'center',
                html: '' + '&nbsp',
                height: 25,
                padding: '5 5 5 0',
                style: 'background:#A0BFD3;color:#244066;text-align:right;font-weight:bold;border: 0.3px #4A6371 solid;font-size:10px'
            },
            items: [
                {width: 200, id: prototype.id + '-lblTotD_QMATCH'},
                {width: 100, id: prototype.id + '-lngTotD_QDIFF'},
                {width: 100, id: prototype.id + '-lblTotD_QTOTSAL'},
                {width: 100, id: prototype.id + '-lblTotD_QPAS48'},
                {width: 100, id: prototype.id + '-totQBANKRFND2'},
                {width: 100, id: prototype.id + '-lblTotD_QPAID'},
                {width: 120, id: prototype.id + '-lblTotD_QTOTWS'},
                {width: 120, id: prototype.id + '-lblTotD_QTEF'},
                {width: 120, id: prototype.id + '-lblTotD_QTYDOC'}
            ]
        }
    ]
});
