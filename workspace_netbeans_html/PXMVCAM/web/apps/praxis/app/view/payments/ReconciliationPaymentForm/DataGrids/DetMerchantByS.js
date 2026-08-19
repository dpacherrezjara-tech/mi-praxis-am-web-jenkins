Ext.define('Ext.Praxis.view.payments.ReconciliationPaymentForm.DataGrids.DetMerchantByS', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-DataGridDetMerchantByS',
    bodyStyle: 'background-color: #E3EAEF;',
    border: true,
    height: 'auto',
    width: 1352,
    layout: {
        type: 'vbox',
        align: 'center'
    },
    items: [
        {
            xtype: 'grid',
            id: prototype.id + '-gridDetMerchantBys',
            width: 1352,
            columnLines: true,
            columns: {
                defaults: {
                    menuDisabled: true,
                    sortable: false,
                    align: 'center'
                },
                items: [
                    {text: 'Bank Settlement',
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            align: 'center'
                        },
                        columns: [
                            {text: 'Date', dataIndex: 'TDATE', width: 100},
                            {text: 'Merchant',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'Code', dataIndex: 'MERCHN', width: 90,
                                        listeners: {
                                            click: 'OnGridByMerchant'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            metaData.style = "text-align:center;color:#057ECB";
                                            metaData.tdAttr = 'data-qtip="' + data.MERCHN + '"';
                                            value = '<b>' + value + '<b>';
                                            return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                        },
                                    },
                                    {text: 'Description.', dataIndex: 'strDescMerchn', width: 130,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            metaData.style = "text-align:left;";
                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
                                            return value;
                                        }
                                    },
                                ]
                            },
                            {text: 'Curr.', dataIndex: 'SCURRENCY', width: 50},
                            {text: 'Amount',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Sale', dataIndex: 'AMOUNTS', width: 100,
                                        listeners: {
                                            click: 'OnGridByMerchant'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;color:#057ECB";
                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                            return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                        },
                                    }
                                    ,
                                    {
                                        text: 'Refund', dataIndex: 'AMOUNTR', width: 100,
                                        listeners: {
                                            click: 'OnGridByMerchant'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;color:#c22428";
                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                            return '<a href="#payments-reconciliation-payment-form" style="color:#F80000;text-decoration:none;">' + value + '</a>';
                                        }
                                    },
                                    {
                                        text: 'Net', dataIndex: 'DAMOUNT', width: 100,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                        }
                                    }
                                ]

                            },
                        ]
                    },
                    {text: 'Bank Statement',
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            align: 'center'
                        },
                        columns: [
                            {text: 'Payment',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'Date', dataIndex: 'BDATEP', width: 80},
                                ]
                            },
                            {text: 'Merchant',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'Code', dataIndex: 'MERCHNR', width: 80,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            metaData.style = "text-align:center;";
                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchnR + '"';
                                            return value;
                                        }
                                    }
                                ]

                            },
                            {text: 'Curr.', dataIndex: 'ACURRENCY', width: 50},
                            {text: 'Amount', dataIndex: 'dblAMOUNTR', width: 90,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;";
                                    value = Ext.util.Format.number(value, '0,000');
                                    return value;
                                }
                            },
                            {text: 'Description', dataIndex: 'strDescripcion', width: 120,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    var data = record.data;
                                    metaData.style = "text-align:left;";
                                    metaData.tdAttr = 'data-qtip="' + data.strDescripcion + '"';
                                    return value;
                                }
                            },
                        ]
                    },
                    {
                        text: 'Quantity',
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            align: 'center'
                        },
                        columns: [
                            {text: 'Trans', dataIndex: 'lngQTEF', width: 60,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;";
                                    value = Ext.util.Format.number(value, '0,000');
                                    return value;
                                }
                            },
                            {text: 'Tkts.', dataIndex: 'lngQTYDOC', width: 60,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;";
                                    value = Ext.util.Format.number(value, '0,000');
                                    return value;
                                }
                            },
                        ]
                    },
                    {text: 'Transaction', dataIndex: 'strDescTTRAN', width: 50,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            var data = record.data;
                            metaData.style = "text-align:center;";
                            metaData.tdAttr = 'data-qtip="' + data.strDescTTRAN + '"';
                            return value;
                        }
                    },
                    {
                        sortable: false,
                        xtype: 'actioncolumn',
                        width: 40,
                        text: 'Edit',
                        align: 'center',
                        items: [
                            {
                                iconCls: 'prx-icon-edit',
                                tooltip: 'Edit',
                                handler: 'onEditClick'
                            }
                        ]
                    }

                ]
            }
        },
        {
            xtype: 'panel',
            id: prototype.id + '-panelDataSummary7',
            width: 1352,
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
                {width: 470, id: prototype.id + '-lblTot_MS_AMOUNT', align: 'center'},
                {width: 100, id: prototype.id + '-totAMTRFND_F', align: 'center'},
                {width: 100, id: prototype.id + '-totDIFF_SVFOP_F', align: 'center'},
                {width: 300, id: prototype.id + '-lblTot_MS_AMOUNTR', align: 'center'},
                {width: 180, id: prototype.id + '-lblTot_MS_QTEF', align: 'center'},
                {width: 60, id: prototype.id + '-lblTot_MS_QTYDOC', align: 'center'},
                {width: 140},
            ]
        }
    ]
});