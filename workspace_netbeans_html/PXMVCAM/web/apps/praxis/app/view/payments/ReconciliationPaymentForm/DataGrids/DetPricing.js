Ext.define('Ext.Praxis.view.payments.ReconciliationPaymentForm.DataGrids.DetPricing', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-DataGridDetPricing',
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
            id: prototype.id + '-gridDetPricing',
            width: 1794,
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
                    {
                        text: 'Payment',
                        id: prototype.id + '-htDatePricing',
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            align: 'center'
                        },
                        columns: [
                            {
                                text: 'Date', dataIndex: 'DATE', width: 90,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    value = '<b>' + value + '</b>';
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
                            }
                        ]
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
                    {
                        text: 'Pricing',
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            align: 'center'
                        },
                        columns: [
                            {text: 'Sales<br>Merchant ID', dataIndex: 'SMERCHID', width: 90,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:center;background-color:#FCF6DC";
                                    return value;
                                }
                            },
                            {text: 'Invoice <br> Refer. Number<br>PNR', dataIndex: 'INVORNBR', width: 100,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:center;background-color:#FCF6DC";
                                    return value;
                                }
                            },
                            {text: 'Card <br> Account Number', dataIndex: 'SCARDN', width: 130,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:center;background-color:#FCF6DC";
                                    return value;
                                }
                            },
                            {text: 'Approval <br> Code', dataIndex: 'SAUTHOC', width: 80,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:center;background-color:#FCF6DC";
                                    return value;
                                }
                            },
                            {text: 'ID<br>Tran.', dataIndex: 'IDITEMT', width: 90,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:center;background-color:#FCF6DC";
                                    return value;
                                }
                            },
                            {text: 'Fee <br> Code', dataIndex: 'FEECODE', width: 60,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:center;background-color:#FCF6DC";
                                    return value;
                                }
                            },
                            {text: 'Transaction <br> Date', dataIndex: 'TRANSDATE', width: 90,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:center;background-color:#FCF6DC";
                                    return value;
                                }
                            }
                        ]
                    },
                    {
                        text: 'Transaction <br> Amount', dataIndex: 'TGROSAMOUN', width: 90,
                        listeners: {
//                                                    click: 'onGridDetBankS'
                        },
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2DAFA;";
                            if (record.data.DISCRATE === -16 || record.data.DISCRATE === 16) {
                                return '';
                            } else {
                                value = Ext.util.Format.number(value, '0,000.00');
                                return value;
                            }
                        },
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            var data = Ext.getCmp(prototype.id + '-gridDetPricing').getStore().getData().items[0].data;
                            metaData.style = 'text-align:right; margin-right:3px ';
                            return '<b>' + Ext.util.Format.number(data.totTGROSAMOUN, '0,000.00') + '<b>';
                        }
                    },
                    {
                        text: 'Discount',
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            align: 'center'
                        },
                        columns: [
                            {
                                text: 'Commission',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Rate', dataIndex: 'DISCRATE_IMPORT', width: 85,
                                        listeners: {
                                            //                                                    click: 'onGridDetBankS'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                            value = Ext.util.Format.number(value, '0,000.00 %');
                                            return value;
                                        },
                                    },
                                    {
                                        text: 'Amount', dataIndex: 'DISCAMOUN_IMPORT', width: 85,
                                        listeners: {
                                            //                                                    click: 'onGridDetBankS'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#B2DAFA;";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                            //                                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDetPricing').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totDISCAMOUN_IMPORT, '0,000.00') + '<b>';
                                        }
                                    }
                                ]
                            },
                            {
                                text: 'VAT',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Rate', dataIndex: 'DISCRATE_IVA', width: 85,
                                        listeners: {
                                            //                                                    click: 'onGridDetBankS'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                            value = Ext.util.Format.number(value, '0,000.00 %');
                                            return value;
                                        },
                                    },
                                    {
                                        text: 'Amount', dataIndex: 'DISCAMOUN_IVA', width: 85,
                                        listeners: {
                                            //                                                    click: 'onGridDetBankS'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#B2DAFA;";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                            //                                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDetPricing').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totDISCAMOUN_IVA, '0,000.00') + '<b>';
                                        }
                                    }
                                ]
                            },
                        ]
                    },
                    {
                        text: 'Transaction <br> Amount', dataIndex: 'TGROSAMOUC', width: 90,
                        listeners: {
                            //                                                    click: 'onGridDetBankS'
                        },
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2FAC6;";
                            if (record.data.DISCRATEBA === -16 || record.data.DISCRATEBA === 16) {
                                return '';
                            } else {
                                value = Ext.util.Format.number(value, '0,000.00');
                                return value;
                            }
//                                                            return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                        },
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            var data = Ext.getCmp(prototype.id + '-gridDetPricing').getStore().getData().items[0].data;
                            metaData.style = 'text-align:right; margin-right:3px ';
                            return '<b>' + Ext.util.Format.number(data.totTGROSAMOUC, '0,000.00') + '<b>';
                        }
                    },
                    {
                        text: 'Result Reconciliation Pricing',
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            align: 'center'
                        },
                        columns: [
                            {
                                text: 'Commission',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Rate', dataIndex: 'DISCRATEBA_IMPORT', width: 90,
                                        listeners: {
                                            //                                                    click: 'onGridDetBankS'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#B2FAC6";
                                            value = Ext.util.Format.number(value, '0,000.00 %');
                                            return value;
                                        },
                                    },
                                    {
                                        text: 'Amount', dataIndex: 'DISCAMOUNC_IMPORT', width: 90,
                                        listeners: {
                                            //                                                    click: 'onGridDetBankS'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#B2FAC6;";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                            //                                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDetPricing').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totDISCAMOUNC_IMPORT, '0,000.00') + '<b>';
                                        }
                                    }
                                ]
                            },
                            {
                                text: 'VAT',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Rate', dataIndex: 'DISCRATEBA_IVA', width: 90,
                                        listeners: {
                                            //                                                    click: 'onGridDetBankS'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#B2FAC6";
                                            value = Ext.util.Format.number(value, '0,000.00 %');
                                            return value;
                                        },
                                    },
                                    {
                                        text: 'Amount', dataIndex: 'DISCAMOUNC_IVA', width: 90,
                                        listeners: {
                                            //                                                    click: 'onGridDetBankS'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#B2FAC6;";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                            //                                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDetPricing').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totDISCAMOUNC_IVA, '0,000.00') + '<b>';
                                        }
                                    },
                                ]
                            },
                        ]
                    }


                ]
            }
        }
    ]
});

