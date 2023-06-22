Ext.define('Ext.Praxis.view.payments.ReconciliationPaymentForm.DataGrids.DetTaxes', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-DataGridDetTaxes',
    bodyStyle: 'background-color: #E3EAEF;',
    border: true,
    height: 'auto',
    width: 1794,
    margin: '0 0 0 0 ',
    layout: {
        type: 'vbox',
        align: 'center'
    },
    items: [
        {
            xtype: 'grid',
            id: prototype.id + '-gridDetTaxes',
            width: 1484,
            columnLines: true,
            features: [{
                    ftype: 'summary'
                }],
            columns: {
                defaults: {
                    menuDisabled: true,
                    sortable: false,
                    align: 'center'
                },
                items: [
                    {text: 'Processing<br>Date', dataIndex: 'PRDA', width: 90,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;";
                            return value;
                        }
                    },
                    {text: 'Payment<br>Date', dataIndex: 'PAYDATE', width: 90,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;";
                            return value;
                        }
                    },
                    {text: 'Tax<br>Date', dataIndex: 'TAXPDATE', width: 90,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center";
                            return value;
                        }
                    },
                    {text: 'Status', dataIndex: 'desCERROR', width: 90,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            if (record.data.CERROR === '') {
                                metaData.style = "text-align:center;background-color:#C6E5B1;";
                            } else {
                                metaData.style = "text-align:center;background-color:#fc8686;";
                            }
                            return value;
                        }
                    },
                    {text: 'Zone', dataIndex: 'ZONA', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;";
                            return value;
                        }
                    },
                    {text: 'Country', dataIndex: 'SCOUNTRY', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;";
                            return value;
                        }
                    },
                    {text: 'Curr.', dataIndex: 'PCURRENCY', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;";
                            return value;
                        }
                    },
                    {text: 'Merchant ID', dataIndex: 'PMERCHID', width: 90,
                        listeners: {
//                                                            click: 'onGridDetPricing'
                        },
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            var data = record.data;
                            metaData.style = "text-align:center;";
                            metaData.tdAttr = 'data-qtip="' + data.DES_MERCHANT + '"';
//                                                                value = '<b>' + value + '</b>';
                            return value;
//                                                            return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                        }
                    },
//                                            {text: 'AX Number', dataIndex: 'AXPAYNBR', width: 90,
//                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                    metaData.style = "text-align:center;";
//                                                    return value;
//                                                }
//                                            },
                    {text: 'Tax Description', dataIndex: 'TAXDESCRI', width: 180,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:left";
                            return value;
                        }
                    },
                    {
                        text: 'Taxes',
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            align: 'center'
                        },
                        columns: [
                            {
                                text: 'Tax Base<br>Amount', dataIndex: 'TAXBAMOUN', width: 85,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;background-color:#B2DAFA;";
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
                                },
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridDetTaxes').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right; margin-right:3px ';
                                    return '<b>' + Ext.util.Format.number(data.TAXBAMOUN_TOTAL, '0,000.00') + '<b>';
                                }
                            },
                            {
                                text: 'Tax Rate', dataIndex: 'TAXRATE', width: 85,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;background-color:#B2DAFA;";
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
                                },
                            },
                            {
                                text: 'Tax Amount', dataIndex: 'TAXAMOUNT', width: 85,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;background-color:#B2DAFA;";
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
                                },
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridDetTaxes').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right; margin-right:3px ';
                                    return '<b>' + Ext.util.Format.number(data.TAXAMOUNT_TOTAL, '0,000.00') + '<b>';
                                }
                            },
                        ]
                    },
                    {
                        text: 'Result Reconciliation Taxes',
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            align: 'center'
                        },
                        columns: [
                            {
                                text: 'Tax Base<br>Amount', dataIndex: 'TAXBAMOUNC', width: 85,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;background-color:#B2FAC6;";
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
                                },
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridDetTaxes').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right; margin-right:3px ';
                                    return '<b>' + Ext.util.Format.number(data.TAXBAMOUNC_TOTAL, '0,000.00') + '<b>';
                                }
                            },
                            {
                                text: 'Tax Rate', dataIndex: 'TAXRATEC', width: 85,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;background-color:#B2FAC6;";
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
                                },
                            },
                            {
                                text: 'Tax Amount', dataIndex: 'TAXAMOUNTC', width: 85,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;background-color:#B2FAC6;";
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
                                },
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridDetTaxes').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right; margin-right:3px ';
                                    return '<b>' + Ext.util.Format.number(data.TAXAMOUNTC_TOTAL, '0,000.00') + '<b>';
                                }
                            },
                        ]
                    }


                ]
            }
        }
    ]
});

