Ext.define('Ext.Praxis.view.payments.ReconciliationPaymentForm.DataGrids.DetBankByS', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-DataGridDetBankByS',
    bodyStyle: 'background-color: #E3EAEF;',
    border: true,
    height: 'auto',
    width: 1132,
    margin: '0 0 0 0 ',
    layout: {
        type: 'vbox',
        align: 'center'
    },
    items: [
        {
            xtype: 'grid',
            id: prototype.id + '-gridDetBankByS',
            width: 1132,
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
                        text: 'Bank',
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            align: 'center'
                        },
                        columns: [
                            {
                                text: 'Code', dataIndex: 'CBANK', width: 70,
                                listeners: {
                                    click: 'OnGridDetDayByS'
                                },
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "color:#057ECB;";
                                    value = '<b>' + value + '</b>';
                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                }
                            }
                            ,
                            {text: 'Description', dataIndex: 'strDescripcion', width: 130}
                        ]
                    },
                    {
                        text: 'Quantity', dataIndex: 'lngQACCB', width: 100, //flex: 1,
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            align: 'center'
                        },
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;";
                            value = Ext.util.Format.number(value, '0,000');
                            return value;
                        }
                    },
                    {
                        text: 'Currency', dataIndex: 'SCURRENCY', width: 90,
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            align: 'center'
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
                                text: 'Sales', dataIndex: 'AMOUNTS', width: 130,
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;";
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return  value;
                                }
                            },
                            {
                                text: 'Refund', dataIndex: 'AMOUNTR', width: 130,
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;";
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return  value;
                                }
                            },
                            {
                                text: 'Net', dataIndex: 'DAMOUNT', width: 130,
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
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
                                text: 'Amount', dataIndex: 'SVFOP', width: 130,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;background-color:#ECF6CE;";
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return  value;
                                }
                            },
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
                                text: 'Transactions', dataIndex: 'lngQTEF', width: 110,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;";
                                    value = Ext.util.Format.number(value, '0,000');
                                    return  value;
                                }
                            },
                            {
                                text: 'Tickets', dataIndex: 'lngQTYDOC', width: 110,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;";
                                    value = Ext.util.Format.number(value, '0,000');
                                    return  value;
                                }
                            }
                        ]
                    },
                ]
            }
        },
        {
            xtype: 'panel',
            id: prototype.id + '-panelDataSummary5',
            width: 1132,
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
                {width: 300, id: prototype.id + '-lblTot_BS_QACCB'},
                {width: 720, id: prototype.id + '-lblTot_BS_QTEF'},
                {width: 110, id: prototype.id + '-lblTot_BS_QTYDOC'},
            ]
        }
    ]
});

