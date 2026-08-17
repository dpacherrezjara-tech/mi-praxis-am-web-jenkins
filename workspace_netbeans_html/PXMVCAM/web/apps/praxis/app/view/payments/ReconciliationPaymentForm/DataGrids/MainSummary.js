Ext.define('Ext.Praxis.view.payments.ReconciliationPaymentForm.DataGrids.MainSummary', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-DataGridMainSummary',
    border: false,
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
        //<editor-fold defaultstate="collapsed" desc="Summary">
        {
            xtype: 'grid',
            id: prototype.id + '-gridDataMainSummary',
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
                        id: prototype.id + '-msDate',
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            align: 'center'
                        },
                        columns: [
                            {
                                text: 'Date', dataIndex: 'DATE', width: 90,
                                listeners: {
                                    click: 'onGridDetSummary'
                                },
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    var data = record.data;
                                    metaData.style = "text-align:center;";
                                    value = '<b>' + value + '</b>';
                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                }
                            }
                        ]
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
                                text: 'GROSS', dataIndex: 'PGROSAMOU', width: 110,
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
                                    var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
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
                                        text: 'Commission', dataIndex: 'PDISCAMOU', width: 110,
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
                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totPDISCAMOU, '0,000.00') + '<b>';
                                        }
                                    },
                                    {
                                        text: 'Serv. Fee', dataIndex: 'SERVICFEEP', width: 110,
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
                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totSERVICFEEP, '0,000.00') + '<b>';
                                        }
                                    },
                                    {
                                        text: 'Adjustment', dataIndex: 'ADJUSMENTP', width: 110,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                            return value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totADJUSMENTP, '0,000.00') + '<b>';
                                        }
                                    },
                                    {
                                        text: 'VAT', dataIndex: 'PTAXAMOU', width: 110,
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
                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totPTAXAMOU, '0,000.00') + '<b>';
                                        }
                                    },
                                    {
                                        text: 'Op. Debit', dataIndex: 'ODBALAMOU', width: 110,
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
                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totODBALAMOU, '0,000.00') + '<b>';
                                        }
                                    }
                                ]
                            },
                            {
                                text: 'NET', dataIndex: 'PNETAMOU', width: 110,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
                                    //                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                },
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
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
                                text: 'GROSS', dataIndex: 'GROSAMOUNC', width: 110,
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
                                    var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
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
                                        text: 'Commission', dataIndex: 'DISCAMOUNC', width: 110,
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
                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totDISCAMOUNC, '0,000.00') + '<b>';
                                        }
                                    },
                                    {
                                        text: 'Serv. Fee', dataIndex: 'SFEEAMOUNC', width: 110,
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
                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totSFEEAMOUNC, '0,000.00') + '<b>';
                                        }
                                    },
                                    {
                                        text: 'Adjustment', dataIndex: 'ADJAMOUNC', width: 110,
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
                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totADJAMOUNC, '0,000.00') + '<b>';
                                        }
                                    },
                                    {
                                        text: 'VAT', dataIndex: 'TAXAMOUNC', width: 110,
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
                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totTAXAMOUNC, '0,000.00') + '<b>';
                                        }
                                    },
                                    {
                                        text: 'Op. Debit', dataIndex: 'ODBALAMOUC', width: 110,
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
                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totODBALAMOUC, '0,000.00') + '<b>';
                                        }
                                    }
                                ]
                            },
                            {
                                text: 'NET', dataIndex: 'NETAMOUNC', width: 110,
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
                                    var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
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
                                text: 'GROSS', dataIndex: 'DIFF_PGROSAMOU', width: 110,
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
                                    var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
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
                                        text: 'Commission', dataIndex: 'DIFF_PDISCAMOU', width: 110,
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
                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totDIFF_PDISCAMOU, '0,000.00') + '<b>';
                                        }
                                    },
                                    {
                                        text: 'Serv. Fee', dataIndex: 'DIFF_PSFEEAMOU', width: 110,
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
                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totDIFF_PSFEEAMOU, '0,000.00') + '<b>';
                                        }
                                    },
                                    {
                                        text: 'Adjustment', dataIndex: 'DIFF_PADJAMOUN', width: 110,
                                        listeners: {
                                            //
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            //if (record.data.DIFF_PADJAMOUN <= -1) {
                                            if (record.data.DIFF_PADJAMOUN === 0) {
                                                metaData.style = "text-align:right;background-color:#f7f7f5;";
                                            } else {
                                                metaData.style = "text-align:right;background-color:#fc8686;";
                                            }
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totDIFF_PADJAMOUN, '0,000.00') + '<b>';
                                        }
                                    },
                                    {
                                        text: 'VAT', dataIndex: 'DIFF_PTAXAMOU', width: 110,
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
                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totDIFF_PTAXAMOU, '0,000.00') + '<b>';
                                        }
                                    },
                                    {
                                        text: 'Op. Debit', dataIndex: 'DIFF_ODBALAMOU', width: 110,
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
                                            var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totDIFF_ODBALAMOU, '0,000.00') + '<b>';
                                        }
                                    }
                                ]
                            },
                            {
                                text: 'NET', dataIndex: 'DIFF_PNETAMOU', width: 110,
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
                                    var data = Ext.getCmp(prototype.id + '-gridDataMainSummary').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right; margin-right:3px ';
                                    return '<b>' + Ext.util.Format.number(data.totDIFF_PNETAMOU, '0,000.00') + '<b>';
                                }
                            },
                            {
                                text: '', dataIndex: '', width: 10
                            }
                        ]
                    }
                ]
            }
        }
        //</editor-fold>
    ]
});
