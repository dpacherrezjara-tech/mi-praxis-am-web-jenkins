Ext.define('Ext.Praxis.view.payments.ReconciliationPaymentForm.DataGrids.DetTransaction', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-DataGridDetTransaction',
    bodyStyle: 'background-color: #E3EAEF;',
    border: true,
    height: 'auto',
    width: 1700,
    margin: '0 0 0 0 ',
    layout: {
        type: 'vbox',
        align: 'center'
    },
    items: [
        {
            xtype: 'grid',
            id: prototype.id + '-gridDetTransaction',
            width: 1590,
            columnLines: true,
            features: [{
                    ftype: 'summary',
                    dock: 'bottom'
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
                        id: prototype.id + '-htDateTransaction',
                        hidden: true,
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            align: 'center'
                        },
                        columns: [
                            {
                                text: 'Date', dataIndex: 'DATE', width: 100,
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
                            {text: 'Merchant ID', dataIndex: 'PMERCHID', width: 100,
                                listeners: {
                                    click: 'onGridDetPricing'
                                },
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    var data = record.data;
                                    metaData.style = "text-align:center;";
                                    metaData.tdAttr = 'data-qtip="' + data.DES_MERCHANT + '"';
                                    value = '<b>' + value + '</b>';
                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                }
                            }
                        ]
                    },
                    {text: 'Status', dataIndex: 'desCERROIN', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            var data = record.data;
                            if (record.data.CERROIN === '') {
                                metaData.style = "text-align:center;background-color:#C6E5B1;";
                            } else {
                                metaData.style = "text-align:center;background-color:#fc8686;";
                            }
                            metaData.tdAttr = 'data-qtip="' + data.DES_CERROIN + '"';
                            return value;
                        }
                    },
                    {text: 'Type', dataIndex: 'TDOC', width: 60,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            if (record.data.TDOC === 'S') {
                                value = 'Sales';
                            } else if (record.data.TDOC === 'R') {
                                value = 'Refund';
                            }
                            return value;
                        }
                    },
                    {
                        text: 'Transaction',
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            align: 'center'
                        },
                        columns: [
                            /*{text: 'Merchant <br> Location ID', dataIndex: 'LMERCHID', width: 90,
                             renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                             metaData.style = "text-align:center;background-color:#FCF6DC";
                             return value;
                             }
                             },*/
                            {text: 'Sales<br>Merchant ID', dataIndex: 'SMERCHID', width: 90,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:center;background-color:#FCF6DC";
                                    return value;
                                }
                            },
                            {text: 'ID<br>Tran.', dataIndex: 'IDITEMT', width: 70,
                                listeners: {
                                    click: 'onGridDetPricingByItemt'
                                },
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:center;background-color:#FCF6DC";
                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                }
                            },
                            {text: 'Invoice <br> Refer. Number<br>PNR', dataIndex: 'INVORNBR', width: 120,
                                listeners: {
                                    click: 'onViewPNR'
                                },
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:center;background-color:#FCF6DC";
//                                                            value = '<br>' + value + '<br>';
                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;text-align:center">' + value + '</a>';
                                }
                            },
                            {text: 'Seller ID', dataIndex: 'SELLERID', width: 80,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:center;background-color:#FCF6DC";
                                    return value;
                                }
                            },
                            {
                                text: 'Installment',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'Plan', dataIndex: 'NBRINSTA', width: 70,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;background-color:#FCF6DC";
                                            return value;
                                        }
                                    },
                                    {text: 'Number', dataIndex: 'INSTANBR', width: 70,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;background-color:#FCF6DC";
                                            return value;
                                        }
                                    }
                                ]
                            },
                            {text: 'Card <br> Account Number', dataIndex: 'SCARDN', width: 140,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:center;background-color:#FCF6DC";
                                    return value;
                                }
                            },
                            {text: 'Approval<br>Code', dataIndex: 'SAUTHOC', width: 80,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:center;background-color:#FCF6DC";
                                    return value;
                                }
                            },
                            {text: 'Indust.Speci. <br> Ref.Nbr', dataIndex: 'ISREFNBR', width: 120,
                                listeners: {
                                    click: 'viewTicket'
                                },
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    value = '<b>' + value + '</b>';
                                    metaData.style = "text-align:center;background-color:#FCF6DC";
                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                }
                            },
                            {text: 'Date', dataIndex: 'TRANSDATE', width: 100,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:center;background-color:#FCF6DC";
                                    return value;
                                }
                            },
                            {text: 'ID', dataIndex: 'TRANSID', width: 130, hidden: true,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:center;background-color:#FCF6DC";
                                    return value;
                                }
                            },
                        ]
                    },
                    {
                        text: 'Sub.Gros. <br> Amoun P.Cur', dataIndex: 'GROSAMOUN', width: 100, hidden: true,
                        listeners: {
//                                                    click: 'onGridDetBankS'
                        },
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2DAFA";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {
                        text: 'Transaction <br> Amount', dataIndex: 'TGROSAMOUN', width: 100,
                        listeners: {
//                                                    click: 'onGridDetBankS'
                        },
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2DAFA";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        },
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            var data = Ext.getCmp(prototype.id + '-gridDetTransaction').getStore().getData().items[0].data;
                            metaData.style = 'text-align:right; margin-right:3px ';
                            return '<b>' + Ext.util.Format.number(data.TGROSAMOUN_TOTAL, '0,000.00') + '<b>';
                        }
                    },
                    {
                        text: 'MSI',
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            align: 'center'
                        },
                        columns: [
                            {
                                text: 'Rate<br>Comm.', dataIndex: 'RATESFEE', width: 80,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                    value = Ext.util.Format.number(value, '0,000.00 %');
                                    return value;
                                },
                            },
                            {
                                text: 'Serv. Fee', dataIndex: 'SFEEAMOU', width: 90,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;background-color:#B2DAFA;";
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
                                },
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridDetTransaction').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right; margin-right:3px ';
                                    return '<b>' + Ext.util.Format.number(data.SFEEAMOU_TOTAL, '0,000.00') + '<b>';
                                }
                            },
                            {
                                text: 'Accel.<br>Amount', dataIndex: 'ACCEAMOU', width: 90,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;background-color:#B2DAFA;";
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
                                },
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridDetTransaction').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right; margin-right:3px ';
                                    return '<b>' + Ext.util.Format.number(data.ACCEAMOU_TOTAL, '0,000.00') + '<b>';
                                }
                            },
                            {
                                text: 'Total<br>Comm.', dataIndex: 'ACCEAMOUC', width: 90,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;background-color:#B2DAFA;";
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
                                },
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridDetTransaction').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right; margin-right:3px ';
                                    return '<b>' + Ext.util.Format.number(data.ACCEAMOUC_TOTAL, '0,000.00') + '<b>';
                                }
                            },
                        ]
                    },
                    {
                        text: 'Commission Base',
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            align: 'center'
                        },
                        columns: [
                            {
                                text: 'Discount<br>Rate', dataIndex: 'DISCRATE', width: 80,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                    value = Ext.util.Format.number(value, '0,000.00 %');
                                    return value;
                                },
                            },
                            {
                                text: 'Discount<br>Amount', dataIndex: 'DISCAMOUN', width: 80,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
                                },
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridDetTransaction').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right; margin-right:3px ';
                                    return '<b>' + Ext.util.Format.number(data.DISCAMOUN_TOTAL, '0,000.00') + '<b>';
                                }
                            },
                            {
                                text: 'Discount<br>Rate VAT', dataIndex: 'DISCRATEI', width: 80,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                    value = Ext.util.Format.number(value, '0,000.00 %');
                                    return value;
                                },
                            },
                            {
                                text: 'Discount<br>Amount VAT', dataIndex: 'DISCAMOUNI', width: 90,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
                                },
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridDetTransaction').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right; margin-right:3px ';
                                    return '<b>' + Ext.util.Format.number(data.DISCAMOUNI_TOTAL, '0,000.00') + '<b>';
                                }
                            },
                        ]
                    },
                    {
                        text: 'Result Reconciliation Transaction',
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            align: 'center'
                        },
                        columns: [
                            {
                                text: 'Transaction <br> Amount', dataIndex: 'TGROSAMOUC', width: 100,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;background-color:#B2FAC6;";
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
                                },
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridDetTransaction').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right; margin-right:3px ';
                                    return '<b>' + Ext.util.Format.number(data.TGROSAMOUNC_TOTAL, '0,000.00') + '<b>';
                                }
                            },
                            {
                                text: 'MSI',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Rate<br>Comm.', dataIndex: 'RATESFEEC', width: 90,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#B2FAC6;";
                                            value = Ext.util.Format.number(value, '0,000.00 %');
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Total<br>Comm.', dataIndex: 'SFEEAMOUC', width: 90,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#B2FAC6;";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDetTransaction').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.SFEEAMOUC_TOTAL, '0,000.00') + '<b>';
                                        }
                                    },
                                ]
                            },
                            {
                                text: 'Commission Base',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Discount<br>Rate Comm.', dataIndex: 'DISCRATEC', width: 90,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#B2FAC6;";
                                            value = Ext.util.Format.number(value, '0,000.00 %');
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Discount<br>Amount Comm.', dataIndex: 'DISCAMOUNC', width: 90,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#B2FAC6;";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDetTransaction').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.DISCAMOUNC_TOTAL, '0,000.00') + '<b>';
                                        }
                                    },
                                    {
                                        text: 'Discount<br>Rate VAT.', dataIndex: 'DISCRATEIC', width: 90,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#B2FAC6;";
                                            value = Ext.util.Format.number(value, '0,000.00 %');
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Discount<br>Amount VAT', dataIndex: 'DISCAMOUIC', width: 90,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#B2FAC6;";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDetTransaction').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.DISCAMOUIC_TOTAL, '0,000.00') + '<b>';
                                        }
                                    },
                                ]
                            },
                            {
                                text: 'First Inst. <br> Amou.Conc', dataIndex: 'FINSAMOUC', width: 100, hidden: true,
                                listeners: {
                                    //                                                    click: 'onGridDetBankS'
                                },
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;background-color:#B2FAC6;";
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
//                                                            return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                }
                            },
                            {
                                text: 'Subseq.Ins. <br> Amou.Conc', dataIndex: 'SINSAMOUC', width: 100, hidden: true,
                                listeners: {
                                    //                                                    click: 'onGridDetBankS'
                                },
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;background-color:#B2FAC6;";
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
//                                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                }
                            },
                        ]
                    }


                ]
            }
        }
    ]
});


