
Ext.define('Ext.Praxis.view.payments.ReconciliationPaymentForm.DataGrids.DetSummary', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-DataGridDetSummary',
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
        //<editor-fold defaultstate="collapsed" desc="Det Summary">
        {
            xtype: 'grid',
            id: prototype.id + '-gridData',
            width: 1800,
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
                        text: 'Processing',
                        id: prototype.id + '-htDate',
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            align: 'center'
                        },
                        columns: [
                            {
                                text: 'Date', dataIndex: 'DATE', width: 90,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "color:#057ECB;";
                                    value = '<b>' + value + '</b>';
                                    return value;
                                }
                            }
                        ]
                    },
//                                            {
//                                                text: 'Payment',
//                                                defaults: {
//                                                    menuDisabled: true,
//                                                    sortable: false,
//                                                    align: 'center'
//                                                },
//                                                columns: [
//                                                    {text: 'Merchant ID', dataIndex: 'PMERCHID', width: 80,
//                                                        listeners: {
//                                                            click: 'onGridDetSubmission'
//                                                        },
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            var data = record.data;
//                                                            metaData.style = "text-align:center;";
//                                                            metaData.tdAttr = 'data-qtip="' + data.DES_MERCHANT + '"';
//                                                            value = '<b>' + value + '</b>';
//                                                            return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
//                                                        }
//                                                    }
//                                                ]
//                                            },
                    //{text: 'AX Number', dataIndex: 'AXPAYNBR', width: 80},
                    {text: 'Status', dataIndex: 'desCERROR', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            if (record.data.CERROR === '') {
                                metaData.style = "text-align:center;background-color:#C6E5B1;";
                            } else {
                                metaData.tdAttr = 'data-qtip="' + record.data.DES_CERROR + '"';
                                if (record.data.CERROR >= 80) {
                                    metaData.style = "text-align:center;background-color:#ffff6b;";
                                } else {
                                    metaData.style = "text-align:center;background-color:#fc8686;";
                                }
                            }
                            return value;
                        }
                    },
                    {text: 'Zone', dataIndex: 'ZONA', width: 50},
                    {text: 'Country', dataIndex: 'SCOUNTRY', width: 60},
                    {text: 'Curr', dataIndex: 'PCURRENCY', width: 50},
                    {
                        text: 'Summary',
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            align: 'center'
                        },
                        columns: [
                            {
                                text: 'GROSS', dataIndex: 'PGROSAMOU', width: 90,
                                listeners: {
                                    //                                                    click: 'onGridDetBankS'
                                },
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
                                    //                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                },
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right; margin-right:3px ';
                                    return '<b>' + Ext.util.Format.number(data.totPGROSAMOU, '0,000.00') + '<b>';
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
                                        text: 'Pay Rate', dataIndex: 'RATECOMBA', width: 70,
                                        listeners: {
                                            //                                                    click: 'onGridDetBankS'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                            value = Ext.util.Format.number(value, '0,000.00 %');
                                            return value;
                                            //                                                        return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                        }
                                    },
                                    {
                                        text: 'Sale Rate', dataIndex: 'RATECOMSM', width: 70,
                                        listeners: {
                                            //                                                    click: 'onGridDetBankS'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                            value = Ext.util.Format.number(value, '0,000.00 %');
                                            return value;
                                            //                                                        return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                        }
                                    },
                                    {
                                        text: 'Commission', dataIndex: 'PDISCAMOU', width: 90,
                                        listeners: {
                                            //                                                    click: 'onGridDetBankS'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                            //                                                        return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totPDISCAMOU, '0,000.00') + '<b>';
                                        }
                                    },
                                    {
                                        text: 'Serv. Fee', dataIndex: 'SERVICFEEP', width: 75,
                                        listeners: {
                                            //                                                    click: 'onGridDetBankS'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                            //                                                        return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totSERVICFEEP, '0,000.00') + '<b>';
                                        }
                                    },
//                                                            {
//                                                                text: 'Adjustment', dataIndex: 'PADJAMOUN', width: 85,
//                                                                listeners: {
//                                                                    click: 'onGridDetAdjustment'
//                                                                },
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = "text-align:right;background-color:#B2DAFA";
//                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
//                                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
//                                                                },
//                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                                    metaData.style = 'text-align:right; margin-right:3px ';
//                                                                    return '<b>' + Ext.util.Format.number(data.totPADJAMOUN, '0,000.00') + '<b>';
//                                                                }
//                                                            },
                                    {
                                        text: 'VAT Rate', dataIndex: 'RATEIVABA', width: 65,
                                        listeners: {
                                            //                                                    click: 'onGridDetBankS'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                            value = Ext.util.Format.number(value, '0,000.00 %');
                                            return value;
                                            //                                                        return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                        }
                                    },
                                    {
                                        text: 'VAT', dataIndex: 'PTAXAMOU', width: 75,
                                        listeners: {
                                            click: 'onGridDetTaxes'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            if (data.SCOUNTRY === 'AR') {
                                                return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                            } else {
                                                return value;
                                            }
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totPTAXAMOU, '0,000.00') + '<b>';
                                        },
                                    },
                                    {
                                        text: 'Op. Debit', dataIndex: 'ODBALAMOU', width: 75,
                                        listeners: {
                                            //                                                    click: 'onGridDetBankS'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                            //                                                        return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totODBALAMOU, '0,000.00') + '<b>';
                                        }
                                    }
                                ]
                            },
                            {
                                text: 'NET', dataIndex: 'PNETAMOU', width: 90,
                                listeners: {
                                    //                                                    click: 'onGridDetBankS'
                                },
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
                                    //                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                },
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right; margin-right:3px ';
                                    return '<b>' + Ext.util.Format.number(data.totPNETAMOU, '0,000.00') + '<b>';
                                }
                            }
                        ]
                    },
                    {
                        text: 'Result Reconciliation Summary vs Submission',
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
                                    metaData.style = "text-align:right;background-color:#B2FAC6;";
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
//                                                            return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                },
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
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
                                        text: 'Pay Rate', dataIndex: 'RATECOMBAC', width: 70,
                                        listeners: {
                                            //                                                    click: 'onGridDetBankS'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#B2FAC6";
                                            value = Ext.util.Format.number(value, '0,000.00 %');
                                            return value;
                                            //                                                        return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                        }
                                    },
                                    {
                                        text: 'Sale Rate', dataIndex: 'RATECOMSMC', width: 70,
                                        listeners: {
                                            //                                                    click: 'onGridDetBankS'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#B2FAC6";
                                            value = Ext.util.Format.number(value, '0,000.00 %');
                                            return value;
                                            //                                                        return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                        }
                                    },
                                    {
                                        text: 'Commission', dataIndex: 'DISCAMOUNC', width: 90,
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
                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totDISCAMOUNC, '0,000.00') + '<b>';
                                        }
                                    },
                                    {
                                        text: 'Serv. Fee', dataIndex: 'SFEEAMOUNC', width: 75,
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
                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totSFEEAMOUNC, '0,000.00') + '<b>';
                                        }
                                    },
//                                                            {
//                                                                text: 'Adjustment', dataIndex: 'ADJAMOUNC', width: 85,
//                                                                listeners: {
//                                                                    //                                                    click: 'onGridDetBankS'
//                                                                },
//                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                    metaData.style = "text-align:right;background-color:#B2FAC6;";
//                                                                    value = Ext.util.Format.number(value, '0,000.00');
//                                                                    return value;
////                                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
//                                                                },
//                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                                    metaData.style = 'text-align:right; margin-right:3px ';
//                                                                    return '<b>' + Ext.util.Format.number(data.totADJAMOUNC, '0,000.00') + '<b>';
//                                                                }
//                                                            },
                                    {
                                        text: 'VAT Rate', dataIndex: 'RATEIVABAC', width: 65,
                                        listeners: {
                                            //                                                    click: 'onGridDetBankS'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#B2FAC6";
                                            value = Ext.util.Format.number(value, '0,000.00 %');
                                            return value;
                                            //                                                        return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                        }
                                    },
                                    {
                                        text: 'VAT', dataIndex: 'TAXAMOUNC', width: 75,
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
                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totTAXAMOUNC, '0,000.00') + '<b>';
                                        }
                                    },
                                    {
                                        text: 'Op. Debit', dataIndex: 'ODBALAMOUC', width: 75,
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
                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totODBALAMOUC, '0,000.00') + '<b>';
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
                                    metaData.style = "text-align:right;background-color:#B2FAC6;";
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
//                                                            return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                },
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right; margin-right:3px ';
                                    return '<b>' + Ext.util.Format.number(data.totNETAMOUNC, '0,000.00') + '<b>';
                                }
                            }
                        ]
                    },
                    {
                        text: 'Differences',
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            align: 'center'
                        },
                        columns: [
                            {
                                text: 'GROSS', dataIndex: 'DIFF_PGROSAMOU', width: 90,
                                listeners: {
                                    //                                                    click: 'onGridDetBankS'
                                },
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    //if (record.data.DIFF_PGROSAMOU <= -1) {
                                    if (record.data.DIFF_PGROSAMOU === 0) {
                                        metaData.style = "text-align:right;background-color:#f7f7f5;";
                                    } else {
                                        metaData.style = "text-align:right;background-color:#fc8686;";
                                    }
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
                                    //                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                },
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right; margin-right:3px ';
                                    return '<b>' + Ext.util.Format.number(data.totDIFF_PGROSAMOU, '0,000.00') + '<b>';
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
                                        text: 'Commission', dataIndex: 'DIFF_PDISCAMOU', width: 90,
                                        listeners: {
                                            //                                                    click: 'onGridDetBankS'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            //if (record.data.DIFF_PDISCAMOU <= -1) {
                                            if (record.data.DIFF_PDISCAMOU === 0) {
                                                metaData.style = "text-align:right;background-color:#f7f7f5;";
                                            } else {
                                                metaData.style = "text-align:right;background-color:#fc8686;";
                                            }
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                            //                                                        return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totDIFF_PDISCAMOU, '0,000.00') + '<b>';
                                        }
                                    },
                                    {
                                        text: 'Serv. Fee', dataIndex: 'DIFF_PSFEEAMOU', width: 75,
                                        listeners: {
                                            //                                                    click: 'onGridDetBankS'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            //if (record.data.DIFF_PSFEEAMOU <= -1) {
                                            if (record.data.DIFF_PSFEEAMOU === 0) {
                                                metaData.style = "text-align:right;background-color:#f7f7f5;";
                                            } else {
                                                metaData.style = "text-align:right;background-color:#fc8686;";
                                            }
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                            //                                                        return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totDIFF_PSFEEAMOU, '0,000.00') + '<b>';
                                        }
                                    },
                                    {
                                        text: 'VAT', dataIndex: 'DIFF_PTAXAMOU', width: 75,
                                        listeners: {
                                            //                                                    click: 'onGridDetBankS'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            //if (record.data.DIFF_PTAXAMOU <= -1) {
                                            if (record.data.DIFF_PTAXAMOU === 0) {
                                                metaData.style = "text-align:right;background-color:#f7f7f5;";
                                            } else {
                                                metaData.style = "text-align:right;background-color:#fc8686;";
                                            }
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                            //                                                        return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totDIFF_PTAXAMOU, '0,000.00') + '<b>';
                                        }
                                    },
                                    {
                                        text: 'Op. Debit', dataIndex: 'DIFF_ODBALAMOU', width: 75,
                                        listeners: {
                                            //                                                    click: 'onGridDetBankS'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            //if (record.data.DIFF_ODBALAMOU <= -1) {
                                            if (record.data.DIFF_ODBALAMOU === 0) {
                                                metaData.style = "text-align:right;background-color:#f7f7f5;";
                                            } else {
                                                metaData.style = "text-align:right;background-color:#fc8686;";
                                            }
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                            //                                                        return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totDIFF_ODBALAMOU, '0,000.00') + '<b>';
                                        }
                                    }
                                ]
                            },
                            {
                                text: 'NET', dataIndex: 'DIFF_PNETAMOU', width: 90,
                                listeners: {
                                    //                                                    click: 'onGridDetBankS'
                                },
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    //if (record.data.DIFF_PNETAMOU <= -1) {
                                    if (record.data.DIFF_PNETAMOU === 0) {
                                        metaData.style = "text-align:right;background-color:#f7f7f5;";
                                    } else {
                                        metaData.style = "text-align:right;background-color:#fc8686;";
                                    }
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
                                    //                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                },
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right; margin-right:3px ';
                                    return '<b>' + Ext.util.Format.number(data.totDIFF_PNETAMOU, '0,000.00') + '<b>';
                                }
                            },
                            {
                                text: 'Download',
                                xtype: 'actioncolumn',
                                width: 75,
                                align: 'center',
                                items: [
                                    {
                                        icon: 'resources/img/botones/24x24/dollar.png',
                                        getClass: function (v, meta, rec) {
                                            /*if (rec.data.DIFF_PNETAMOU > -1) {
                                             metaData.css = 'x-hide-display';
                                             return v;
                                             } else {
                                             meta.tdAttr = 'data-qtip="Debit Memo"';
                                             return v;
                                             }*/
                                            meta.tdAttr = 'data-qtip="Debit Memo"';
                                            return v;
                                        },
                                        handler: 'onSendClick'
                                    }
                                ]
                            }
                        ]
                    },
                ]
            }
        }
        //</editor-fold>

    ]
});

