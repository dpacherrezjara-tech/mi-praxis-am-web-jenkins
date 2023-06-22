Ext.define('Ext.Praxis.view.payments.ReconciliationPaymentForm.DataGrids.DetSubmission', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-DataGridDetSubmission',
    bodyStyle: 'background-color: #E3EAEF;',
    border: true,
    height: 'auto',
    width: 1800,
    margin: '0 0 0 0 ',
    layout: {
        type: 'vbox',
        align: 'center'
    },
    items: [
        {
            xtype: 'grid',
            id: prototype.id + '-gridDetSubmission',
            width: 1450,
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
                        id: prototype.id + '-htDateSunmission',
                        hidden: true,
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            align: 'center'
                        },
                        columns: [
                            {
                                text: 'Date', dataIndex: 'DATE', width: 90,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    if (record.data.desCERROR === 'Sub Total') {
                                        metaData.style = "background-color:#BAC9F4;";
                                    }
                                    value = '<b>' + value + '</b>';
                                    return value;
                                }
                            }
                        ]
                    },
                    //{text: 'Code', dataIndex: 'STYPECD', width: 55},
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
                                    click: 'onGridDetTransaction'
                                },
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    var data = record.data;
                                    if (data.desCERROR === 'Sub Total') {
                                        metaData.style = "text-align:center;background-color:#BAC9F4;";
                                    } else {
                                        metaData.style = "text-align:center;";
                                    }

                                    metaData.tdAttr = 'data-qtip="' + data.DES_MERCHANT + '"';
                                    if (data.desCERROR === 'Sub Total' || data.desCERROR === 'Adjustment') {
                                        return value;
                                    } else {
                                        value = '<b>' + value + '</b>';
                                        return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                    }
                                }
                            },
                            {text: 'Status', dataIndex: 'desCERROR', width: 75,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    if (record.data.desCERROR === 'Sub Total') {
                                        metaData.style = "background-color:#BAC9F4;";
                                    } else if (record.data.CERROR === '') {
                                        metaData.style = "text-align:center;background-color:#C6E5B1;";
                                    } else {
                                        metaData.style = "text-align:center;background-color:#fc8686;";
                                    }
                                    return value;
                                }
                            }
                        ]
                    },
                    {
                        text: 'Submission',
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            align: 'center'
                        },
                        columns: [
                            {text: 'Sales<br>Merchant ID', dataIndex: 'SMERCHID', width: 85,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    if (record.data.desCERROR === 'Sub Total') {
                                        metaData.style = "background-color:#BAC9F4;";
                                    } else {
                                        metaData.style = "text-align:center;background-color:#FCF6DC";
                                    }
                                    return value;
                                }
                            },
                            {text: 'ID <br> Sub.', dataIndex: 'IDITEMS', width: 60,
                                listeners: {
                                    click: 'onGridDetTransaction'
                                },
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    if (record.data.desCERROR === 'Sub Total') {
                                        metaData.style = "text-align:center;background-color:#BAC9F4;";
                                    } else {
                                        metaData.style = "text-align:center;background-color:#FCF6DC";
                                    }

                                    value = '<b>' + value + '</b>';
                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                }
                            },
                            {text: 'Submis<br>Date', dataIndex: 'BSUMDATE', width: 80,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    if (record.data.desCERROR === 'Sub Total') {
                                        metaData.style = "text-align:center;background-color:#BAC9F4;";
                                    } else {
                                        metaData.style = "text-align:center;background-color:#FCF6DC";
                                    }
                                    return value;
                                }
                            },
                            {text: 'AMEX <br> Process Date', dataIndex: 'AXPRODAT', width: 90,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    if (record.data.desCERROR === 'Sub Total') {
                                        metaData.style = "text-align:center;background-color:#BAC9F4;";
                                    } else {
                                        metaData.style = "text-align:center;background-color:#FCF6DC";
                                    }
                                    return value;
                                }
                            },
                            {text: 'Invoice Number', dataIndex: 'SIREFNBR', width: 120,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    if (record.data.desCERROR === 'Sub Total') {
                                        metaData.style = "text-align:center;background-color:#BAC9F4;";
                                    } else {
                                        metaData.style = "text-align:center;background-color:#FCF6DC";
                                    }
                                    return value;
                                }
                            },
                            {text: 'Curr', dataIndex: 'SCURRENCY', width: 60, hidden: true,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    if (record.data.desCERROR === 'Sub Total') {
                                        metaData.style = "text-align:center;background-color:#BAC9F4;";
                                    } else {
                                        metaData.style = "text-align:center;background-color:#FCF6DC";
                                    }
                                    return value;
                                }
                            }
                        ]
                    },
                    {
                        text: 'Submission',
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            align: 'center'
                        },
                        columns: [
                            {
                                text: 'GROSS', dataIndex: 'GROSAMOUN', width: 90,
                                listeners: {
//                                                    click: 'onGridDetBankS'
                                },
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    if (record.data.desCERROR === 'Sub Total') {
                                        metaData.style = "text-align:right;background-color:#BAC9F4;";
                                    } else {
                                        metaData.style = "text-align:right;background-color:#B2DAFA";
                                    }
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
                                },
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridDetSubmission').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right; margin-right:3px ';
                                    return '<b>' + Ext.util.Format.number(data.totGROSAMOUN, '0,000.00') + '<b>';
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
                                        text: 'Commission', dataIndex: 'DISCAMOUN', width: 90,
                                        listeners: {
                                            //                                                    click: 'onGridDetBankS'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            if (record.data.desCERROR === 'Sub Total') {
                                                metaData.style = "text-align:right;background-color:#BAC9F4;";
                                            } else {
                                                metaData.style = "text-align:right;background-color:#B2DAFA";
                                            }
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDetSubmission').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totDISCAMOUN, '0,000.00') + '<b>';
                                        }
                                    },
                                    {
                                        text: 'VAT <br> Commission', dataIndex: 'TAXAMOUN', width: 90,
                                        listeners: {
                                            //                                                    click: 'onGridDetBankS'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            if (record.data.desCERROR === 'Sub Total') {
                                                metaData.style = "text-align:right;background-color:#BAC9F4;";
                                            } else {
                                                metaData.style = "text-align:right;background-color:#B2DAFA";
                                            }
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDetSubmission').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totTAXAMOUN, '0,000.00') + '<b>';
                                        }
                                    },
                                ]
                            },
                            {
                                text: 'NET', dataIndex: 'NETAMOUN', width: 90,
                                listeners: {
//                                                    click: 'onGridDetBankS'
                                },
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    if (record.data.desCERROR === 'Sub Total') {
                                        metaData.style = "text-align:right;background-color:#BAC9F4;";
                                    } else {
                                        metaData.style = "text-align:right;background-color:#B2DAFA";
                                    }
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
//                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                },
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridDetSubmission').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right; margin-right:3px ';
                                    return '<b>' + Ext.util.Format.number(data.totNETAMOUN, '0,000.00') + '<b>';
                                }
                            },
                            {text: 'Transac.<br>Count', dataIndex: 'TRANCOUNT', width: 60,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    if (record.data.desCERROR === 'Sub Total') {
                                        metaData.style = "text-align:right;background-color:#BAC9F4;";
                                    } else {
                                        metaData.style = "text-align:right;background-color:#B2DAFA";
                                    }
                                    return value;
                                },
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridDetSubmission').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right; margin-right:3px ';
                                    return '<b>' + Ext.util.Format.number(data.totTRANCOUNT, '0,000') + '<b>';
                                }
                            },
                        ]
                    },
                    {
                        text: 'Result Reconciliation Submission vs Transaction/Pricing',
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            align: 'center'
                        },
                        columns: [
                            {
                                text: 'GROSS', dataIndex: 'GROSAMOUNC', width: 90,
                                listeners: {
                                    //                                                    click: 'onGridDetBankS'
                                },
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    if (record.data.desCERROR === 'Sub Total') {
                                        metaData.style = "text-align:right;background-color:#BAC9F4;";
                                    } else {
                                        metaData.style = "text-align:right;background-color:#B2FAC6";
                                    }

                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
//                                                            return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                },
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridDetSubmission').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right; margin-right:3px ';
                                    return '<b>' + Ext.util.Format.number(data.totGROSAMOUNC, '0,000.00') + '<b>';
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
                                        text: 'Commission', dataIndex: 'DISCAMOUNC', width: 90,
                                        listeners: {
                                            //                                                    click: 'onGridDetBankS'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            if (record.data.desCERROR === 'Sub Total') {
                                                metaData.style = "text-align:right;background-color:#BAC9F4;";
                                            } else {
                                                metaData.style = "text-align:right;background-color:#B2FAC6";
                                            }
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
//                                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDetSubmission').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totDISCAMOUNC, '0,000.00') + '<b>';
                                        }
                                    },
                                    {
                                        text: 'VAT <br> Commission', dataIndex: 'TAXAMOUNC', width: 90,
                                        listeners: {
                                            //                                                    click: 'onGridDetBankS'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            if (record.data.desCERROR === 'Sub Total') {
                                                metaData.style = "text-align:right;background-color:#BAC9F4;";
                                            } else {
                                                metaData.style = "text-align:right;background-color:#B2FAC6";
                                            }
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
//                                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDetSubmission').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totTAXAMOUNC, '0,000.00') + '<b>';
                                        }
                                    }
                                ]
                            },
                            {
                                text: 'NET', dataIndex: 'NETAMOUNC', width: 90,
                                listeners: {
                                    //                                                    click: 'onGridDetBankS'
                                },
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    if (record.data.desCERROR === 'Sub Total') {
                                        metaData.style = "text-align:right;background-color:#BAC9F4;";
                                    } else {
                                        metaData.style = "text-align:right;background-color:#B2FAC6";
                                    }
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
//                                                            return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                },
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridDetSubmission').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right; margin-right:3px ';
                                    return '<b>' + Ext.util.Format.number(data.totNETAMOUNC, '0,000.00') + '<b>';
                                }
                            },
                            {
                                text: 'Transac.<br>Count', dataIndex: 'TRANCOUNTC', width: 60,
                                listeners: {
                                    //                                                    click: 'onGridDetBankS'
                                },
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    if (record.data.desCERROR === 'Sub Total') {
                                        metaData.style = "text-align:right;background-color:#BAC9F4;";
                                    } else {
                                        metaData.style = "text-align:right;background-color:#B2FAC6";
                                    }
                                    value = Ext.util.Format.number(value, '0,000');
                                    return value;
//                                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                },
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridDetSubmission').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right; margin-right:3px ';
                                    return '<b>' + Ext.util.Format.number(data.totTRANCOUNTC, '0,000') + '<b>';
                                }
                            }
                        ]
                    },
                ]
            }
        }
    ]
});