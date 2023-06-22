Ext.define('Ext.Praxis.view.payments.ReconciliationPaymentForm.DataGrids.DetDayByS', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-DataGridDetDayByS',
    bodyStyle: 'background-color: #E3EAEF;',
    border: true,
    height: 'auto',
    width: 962,
    layout: {
        type: 'vbox',
        align: 'center'
    },
    items: [
        {
            xtype: 'grid',
            id: prototype.id + '-gridDetDayBys',
            width: 962,
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
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            align: 'center'
                        },
                        columns: [
                            {
                                text: 'Date', dataIndex: 'SDATE', width: 100,
                                listeners: {
                                    click: 'OnGridDetMerchantByS'
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
                        text: 'Quantity', dataIndex: 'lngQACCB', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;";
                            return Ext.util.Format.number(value, '0,000');
                        }
                    },
                    {
                        text: 'Currency', dataIndex: 'SCURRENCY', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;";
                            return value;
                        }
                    },
                    {
                        text: 'Bank Amount',
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            align: 'center'
                        },
                        columns: [
                            {
                                text: 'Sale', dataIndex: 'AMOUNTS', width: 120,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;";
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
                                }
                            },
                            {
                                text: 'Refund', dataIndex: 'AMOUNTR', width: 120,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;";
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
                                }
                            },
                            {
                                text: 'Net', dataIndex: 'DAMOUNT', width: 120,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    (record.data.DAMOUNT !== record.data.SVFOP) ? metaData.style = "text-align:right;color:#c22428" : metaData.style = "text-align:right;color:#244066";
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return  value;
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
                                text: 'Amount', dataIndex: 'SVFOP', width: 120, //flex: 1
                                listeners: {
                                    click: 'onGridDetMerchant'
                                },
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;";
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
                                },
                            }
                        ]
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
                                text: 'Transactions', dataIndex: 'lngQTEF', width: 100,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;";
                                    value = Ext.util.Format.number(value, '0,000');
                                    return value;
                                }
                            }
                            ,
                            {
                                text: 'Tickets', dataIndex: 'lngQTYDOC', width: 100,
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
        },
        {
            xtype: 'panel',
            id: prototype.id + '-panelDataSummary6',
            width: 962,
            align: 'left',
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
                {width: 200, id: prototype.id + '-lblTot_DS_QACCB'},
                {width: 660, id: prototype.id + '-lblTot_DS_QTEF'},
                {width: 100, id: prototype.id + '-lblTot_DS_QTYDOC'},
            ]
        }
    ]
});