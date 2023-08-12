Ext.define('Ext.Praxis.view.payments.ReconciliationPaymentForm.DataGrids.Settlement', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-DataGridSettlement',
    bodyStyle: 'background-color: #E3EAEF;',
    border: true,
    height: 'auto',
    width: 1750,
    margin: '0 0 0 0 ',
    layout: {
        type: 'vbox',
        align: 'center'
    },
    items: [
        {
            xtype: 'grid',
            id: prototype.id + '-gridSettlement',
            width: 1750,
            height: 'auto',
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
                        id: prototype.id + '-settDate',
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            align: 'center'
                        },
                        columns: [
                            {
                                text: 'Date', dataIndex: 'DATE', width: 100,
                            }
                        ]
                    },
                    {
                        text: 'Merchant',
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            align: 'center'
                        },
                        columns: [
                            {
                                text: 'Id', dataIndex: 'PMERCHID', width: 90,
                                listeners: {
                                    click: 'onGridDetSettMerchant'
                                },
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    value = '<b>' + value + '</b>';
                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                }
                            },
                        ]
                    },
                    {text: 'Status', dataIndex: 'desCERROR', width: 75,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            if (record.data.CERROR === '') {
                                metaData.style = "text-align:center;background-color:#C6E5B1;";
                            } else {
                                metaData.tdAttr = 'data-qtip="' + record.data.DES_CERROR + '"';
                                metaData.style = "text-align:center;background-color:#fc8686;";
                            }
                            return value;
                        }
                    },
                    {
                        text: 'Zone', dataIndex: 'ZONA', width: 60,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            //metaData.style = "text-align:center;background-color:#FCF6DC";
                            return value;
                        }
                    },
                    {
                        text: 'Country', dataIndex: 'SCOUNTRY', width: 65,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            //metaData.style = "text-align:center;background-color:#FCF6DC";
                            return value;
                        }
                    },
                    {
                        text: 'Currency', dataIndex: 'PCURRENCY', width: 70,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            //metaData.style = "text-align:center;background-color:#FCF6DC";
                            return value;
                        }
                    },
                    {
                        text: 'GROSS<br>Amount', dataIndex: 'TGROSAMPAY', width: 100,
                        listeners: {
//                                                    click: 'onGridDetBankS'
                        },
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2DAFA";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        },
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            var data = Ext.getCmp(prototype.id + '-gridSettlement').getStore().getData().items[0].data;
                            metaData.style = 'text-align:right; margin-right:3px ';
                            return '<b>' + Ext.util.Format.number(data.totTGROSAMPAY, '0,000.00') + '<b>';
                        }
                    },
                    {
                        text: 'Commission',
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            align: 'center'
                        },
                        columns: [
                            {
                                text: 'Pay Rate', dataIndex: 'DISCRATE_IMPORT', width: 70,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                    value = Ext.util.Format.number(value, '0,000.00 %');
                                    return value;
                                }
                            },
                            {
                                text: 'Sale Rate', dataIndex: 'DISCRATE', width: 70,
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
                                text: 'Amount', dataIndex: 'SFEEAMOU', width: 90,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
                                },
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridSettlement').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right; margin-right:3px ';
                                    return '<b>' + Ext.util.Format.number(data.totSFEEAMOU, '0,000.00') + '<b>';
                                }
                            },
                            {
                                text: 'VAT Rate', dataIndex: 'DISCRATEI', width: 90,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                    value = Ext.util.Format.number(value, '0,000.00 %');
                                    return value;
                                }
                            },
                            {
                                text: 'VAT', dataIndex: 'IVACOM12', width: 90,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
                                },
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridSettlement').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right; margin-right:3px ';
                                    return '<b>' + Ext.util.Format.number(data.totIVACOM12, '0,000.00') + '<b>';
                                }
                            },
                        ]
                    },
                    {
                        text: 'Serv. Fee',
                        //dataIndex: 'SERVICFEEP', 
                        width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            const {TRANSTYPE, SERVICFEEP, ADJUSMENTP} = record.data;
                            if (TRANSTYPE === 'ADJU') {
                                value = ADJUSMENTP;
                            } else {
                                value = SERVICFEEP;
                            }
                            metaData.style = "text-align:right;background-color:#B2DAFA";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        },
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            var data = Ext.getCmp(prototype.id + '-gridSettlement').getStore().getData().items[0].data;
                            metaData.style = 'text-align:right; margin-right:3px ';
                            metaData.tdAttr = 'data-qtip="Total Adjusment: ' + data.totADJUSMENTP + '"';
                            return '<b>' + Ext.util.Format.number(data.totSERVICFEEP, '0,000.00') + '<b>';
                        }
                    },
                    {
                        text: 'Acceleration <br> Amount',
                        //dataIndex: 'ACCEAMOU', 
                        width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            const {TRANSTYPE, SERVICFEEP, ACCEAMOU} = record.data;
                            if (TRANSTYPE !== 'ADJU' && TRANSTYPE !== 'CHBK') {
                                value = SERVICFEEP;
                            } else {
                                value = ACCEAMOU;
                            }
                            metaData.style = "text-align:right;background-color:#B2DAFA";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        },
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            var data = Ext.getCmp(prototype.id + '-gridSettlement').getStore().getData().items[0].data;
                            metaData.style = 'text-align:right; margin-right:3px ';
                            return '<b>' + Ext.util.Format.number(data.totACCEAMOU, '0,000.00') + '<b>';
                        }
                    },
                    {
                        text: 'VAT COMM<br>1+2', dataIndex: 'OVERCOM12P', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2DAFA";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        },
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            var data = Ext.getCmp(prototype.id + '-gridSettlement').getStore().getData().items[0].data;
                            metaData.style = 'text-align:right; margin-right:3px ';
                            return '<b>' + Ext.util.Format.number(data.totOVERCOM12P, '0,000.00') + '<b>';
                        }
                    },
                    {
                        text: 'Chargeback',
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            align: 'center'
                        },
                        columns: [
                            {
                                text: 'Amount', dataIndex: 'TGROSAMPAY_CB', width: 100,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
                                },
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridSettlement').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right; margin-right:3px ';
                                    return '<b>' + Ext.util.Format.number(data.totTGROSAMPAY_CB, '0,000.00') + '<b>';
                                }
                            },
                            {
                                text: 'Commission', dataIndex: 'SFEEAMOU_CB', width: 100,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
                                },
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridSettlement').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right; margin-right:3px ';
                                    return '<b>' + Ext.util.Format.number(data.totSFEEAMOU_CB, '0,000.00') + '<b>';
                                }
                            },
                            {
                                text: 'VAT', dataIndex: 'IVACOM12_CB', width: 100,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
                                },
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridSettlement').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right; margin-right:3px ';
                                    return '<b>' + Ext.util.Format.number(data.totIVACOM12_CB, '0,000.00') + '<b>';
                                }
                            },
                        ]
                    },
                    {
                        text: 'Net Amount<br>to Receive AM', dataIndex: 'NETAMOUN', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2DAFA";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        },
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            var data = Ext.getCmp(prototype.id + '-gridSettlement').getStore().getData().items[0].data;
                            metaData.style = 'text-align:right; margin-right:3px ';
                            return '<b>' + Ext.util.Format.number(data.totNETAMOUN, '0,000.00') + '<b>';
                        }
                    },
                    {
                        text: 'Currency<br>Settlement', dataIndex: 'PCURRENCY', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            //metaData.style = "text-align:center;background-color:#FCF6DC";
                            return value;
                        }
                    },
                    {
                        text: 'Reconciled<br>Net Amount', dataIndex: 'NETAMOUNC', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2FAC6";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        },
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            var data = Ext.getCmp(prototype.id + '-gridSettlement').getStore().getData().items[0].data;
                            metaData.style = 'text-align:right; margin-right:3px ';
                            return '<b>' + Ext.util.Format.number(data.totNETAMOUNC, '0,000.00') + '<b>';
                        }
                    },
                ]
            }
        }
    ]
});

