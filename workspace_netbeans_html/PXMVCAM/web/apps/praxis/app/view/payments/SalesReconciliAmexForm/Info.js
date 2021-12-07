valor = '0';
Ext.define('Ext.Praxis.view.payments.SalesReconciliAmexForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                width: 1800,
                height: 'auto',
                align: 'center'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelMain',
                    bodyStyle: 'background-color: #E3EAEF;',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridData',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 1690,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridData',
                                    width: 1690,
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
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "color:#057ECB;";
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
                                                    {text: 'Merchant ID', dataIndex: 'PMERCHID', width: 80,
                                                        listeners: {
                                                            click: 'onGridDetSubmission'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:center;";
                                                            metaData.tdAttr = 'data-qtip="' + data.DES_MERCHANT + '"';
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'AX Number', dataIndex: 'AXPAYNBR', width: 80},
                                            {text: 'Status', dataIndex: 'desCERROR', width: 80,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    if (record.data.CERROR === '00') {
                                                        metaData.style = "text-align:center;background-color:#C6E5B1;";
                                                    } else if (record.data.CERROR === '01') {
                                                        metaData.style = "text-align:center;background-color:#FF6F6F;";
                                                    } else {
                                                        metaData.style = "text-align:center;background-color:#C6E5B1;";
                                                    }
                                                    return value;
                                                }
                                            },
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
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
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
                                                                text: 'Discount', dataIndex: 'PDISCAMOU', width: 90,
                                                                listeners: {
                                                                    //                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                    //                                                        return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Serv. Fee', dataIndex: 'PSFEEAMOU', width: 90,
                                                                listeners: {
                                                                    //                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                    //                                                        return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Adjustment', dataIndex: 'PADJAMOUN', width: 100,
                                                                listeners: {
                                                                    click: 'onGridDetSubmission'
                                                                },
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                }
                                                            },
                                                            {
                                                                text: 'VAT', dataIndex: 'PTAXAMOU', width: 90,
                                                                listeners: {
                                                                    //                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                    //                                                        return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Opening Debit', dataIndex: 'ODBALAMOU', width: 100,
                                                                listeners: {
                                                                    //                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                    //                                                        return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'NET', dataIndex: 'PNETAMOU', width: 90,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                            //                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Result Conciliation Summary vs Submission',
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
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
//                                                            return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
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
                                                                text: 'Discount', dataIndex: 'DISCAMOUNC', width: 90,
                                                                listeners: {
                                                                    //                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
//                                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Serv. Fee', dataIndex: 'SFEEAMOUNC', width: 90,
                                                                listeners: {
                                                                    //                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
//                                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Adjustment', dataIndex: 'ADJAMOUNC', width: 90,
                                                                listeners: {
                                                                    //                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
//                                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                }
                                                            },
                                                            {
                                                                text: 'VAT', dataIndex: 'TAXAMOUNC', width: 90,
                                                                listeners: {
                                                                    //                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
//                                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Opening Debit', dataIndex: 'ODBALAMOUC', width: 100,
                                                                listeners: {
                                                                    //                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
//                                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'NET', dataIndex: 'NETAMOUNC', width: 90,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
//                                                            return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxDetSubmission',
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
                                    width: 1780,
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
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
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
                                                    {text: 'Merchant ID', dataIndex: 'MERCHID', width: 90,
                                                        listeners: {
                                                            click: 'onGridDetTransaction'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:center;";
                                                            metaData.tdAttr = 'data-qtip="' + data.DES_MERCHANT + '"';
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    },
                                                    {text: 'Status', dataIndex: 'desCERROR', width: 75,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            if (record.data.CERROR === '00') {
                                                                metaData.style = "text-align:center;background-color:#C6E5B1;";
                                                            } else if (record.data.CERROR === '01') {
                                                                metaData.style = "text-align:center;background-color:#FF6F6F;";
                                                            } else {
                                                                metaData.style = "text-align:center;background-color:#C6E5B1;";
                                                            }
                                                            return value;
                                                        }
                                                    }
//                                                    {text: 'AX <br> Number', dataIndex: 'AXPAYNBR', width: 100,
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "text-align:center;background-color:#B2DAFA";
//                                                            return value;
//                                                        }
//                                                    },
//                                                    {text: 'AMEX <br> Process Date', dataIndex: 'PAYDATE', width: 100,
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "text-align:center;background-color:#B2DAFA";
//                                                            return value;
//                                                        }
//                                                    },
//                                                    {text: 'Currency', dataIndex: 'PCURRENCY', width: 65,
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "text-align:center;background-color:#B2DAFA";
//                                                            return value;
//                                                        }
//                                                    }
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
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'ID <br> Sub.', dataIndex: 'IDITEMS', width: 60,
                                                        listeners: {
                                                            click: 'onGridDetTransaction'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    },
                                                    {text: 'Submis<br>Date', dataIndex: 'BSUMDATE', width: 80,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'AMEX <br> Process Date', dataIndex: 'AXPRODAT', width: 90,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Invoice Number', dataIndex: 'SIREFNBR', width: 120,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Curr', dataIndex: 'SCURRENCY', width: 60, hidden: true,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#FCF6DC";
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
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
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
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetSubmission').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDISCAMOUN, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'TAX <br> Commission', dataIndex: 'TAXAMOUN', width: 90,
                                                                listeners: {
                                                                    //                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
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
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
//                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetSubmission').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totNETAMOUN, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Transac.<br>Count', dataIndex: 'TRANCOUNT', width: 60,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            return value;
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetSubmission').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totTRANCOUNT, '0,000') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Result Conciliation Submission vs Transaction/Pricing',
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
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
//                                                            return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
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
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
//                                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetSubmission').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDISCAMOUNC, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'TAX <br> Commission', dataIndex: 'TAXAMOUNC', width: 90,
                                                                listeners: {
                                                                    //                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
//                                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
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
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
//                                                            return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
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
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
//                                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetSubmission').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totTRANCOUNTC, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Other Submission',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Sub Debit<br>GROSS', dataIndex: 'SDGROSSA', width: 90,
                                                        listeners: {
//                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetSubmission').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totSDGROSSA, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Sub Credit <br> GROSS', dataIndex: 'SCGROSSA', width: 75,
                                                        listeners: {
//                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
//                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetSubmission').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totSCGROSSA, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Installment <br> Number', dataIndex: 'INSTANBR', width: 85,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            return value;
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetSubmission').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totINSTANBR, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Orig. Settle<br>Date', dataIndex: 'OSETDATE', width: 80,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            return value;
                                                        }
                                                    },
                                                ]
                                            }


                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxDetTransaction',
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
                                    width: 1690,
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
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
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
                                                    {text: 'Merchant ID', dataIndex: 'MERCHID', width: 100,
                                                        listeners: {
                                                            click: 'onGridDetPricing'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:center;";
                                                            metaData.tdAttr = 'data-qtip="' + data.DES_MERCHANT + '"';
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Status', dataIndex: 'desCERROR', width: 90,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    if (record.data.CERROR === '00') {
                                                        metaData.style = "text-align:center;background-color:#C6E5B1;";
                                                    } else if (record.data.CERROR === '01') {
                                                        metaData.style = "text-align:center;background-color:#FF6F6F;";
                                                    } else {
                                                        metaData.style = "text-align:center;background-color:#C6E5B1;";
                                                    }
                                                    return value;
                                                }
                                            },
                                            //{text: 'Code', dataIndex: 'STYPECD', width: 55},
                                            {
                                                text: 'Transaction',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Merchant <br> Location ID', dataIndex: 'LMERCHID', width: 90,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'ID<br>Tran.', dataIndex: 'IDITEMT', width: 70,
                                                        listeners: {
                                                            click: 'onGridDetPricingByItemt'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    },
                                                    {text: 'Invoice <br> Refer. Number<br>PNR', dataIndex: 'INVORNBR', width: 120,
                                                        listeners: {
                                                            click: 'onViewPNR'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#FCF6DC";
//                                                            value = '<br>' + value + '<br>';
                                                            return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    },
                                                    {text: 'Seller ID', dataIndex: 'SELLERID', width: 80,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Card <br> Account Number', dataIndex: 'SCARDN', width: 140,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Approval<br>Code', dataIndex: 'SAUTHOC', width: 80,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Indust.Speci. <br> Ref.Nbr', dataIndex: 'ISREFNBR', width: 120,
                                                        listeners: {
                                                            click: 'viewTicket'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            value = '<b>' + value + '</b>';
                                                            metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    },
                                                    {text: 'Date', dataIndex: 'TRANSDATE', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'ID', dataIndex: 'TRANSID', width: 130,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Installment <br> Number', dataIndex: 'INSTANBR', width: 60,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Sub.Gros. <br> Amoun P.Cur', dataIndex: 'GROSAMOUN', width: 100,
                                                listeners: {
//                                                    click: 'onGridDetBankS'
                                                },
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
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
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDetTransaction').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.TGROSAMOUN_TOTAL, '0,000.00') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'Result Conciliation Transaction',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'GROSS', dataIndex: 'GROSAMOUNC', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'First Inst. <br> Amou.Conc', dataIndex: 'FINSAMOUC', width: 100,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
//                                                            return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Subseq.Ins. <br> Amou.Conc', dataIndex: 'SINSAMOUC', width: 100,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
//                                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    }
                                                ]
                                            }


                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxDetPricing',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 1690,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetPricing',
                                    width: 1394,
                                    columnLines: true,
                                    /*features: [{
                                     ftype: 'summary'
                                     }],*/
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
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
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
                                                    {text: 'Merchant ID', dataIndex: 'MERCHID', width: 90,
                                                        listeners: {
//                                                            click: 'onGridDetPricing'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:center;";
                                                            metaData.tdAttr = 'data-qtip="' + data.DES_MERCHANT + '"';
//                                                                value = '<b>' + value + '</b>';
                                                            return value;
//                                                            return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Status', dataIndex: 'desCERROR', width: 90,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    if (record.data.CERROR === '00') {
                                                        metaData.style = "text-align:center;background-color:#C6E5B1;";
                                                    } else if (record.data.CERROR === '01') {
                                                        metaData.style = "text-align:center;background-color:#FF6F6F;";
                                                    } else {
                                                        metaData.style = "text-align:center;background-color:#C6E5B1;";
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
                                                    {text: 'Invoice <br> Refer. Number<br>PNR', dataIndex: 'INVORNBR', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Card <br> Account Number', dataIndex: 'SCARDN', width: 130,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Approval <br> Code', dataIndex: 'SAUTHOC', width: 80,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'ID<br>Tran.', dataIndex: 'IDITEMT', width: 110,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'ID<br>Pric.', dataIndex: 'IDITEMP', width: 80,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Fee <br> Code', dataIndex: 'FEECODE', width: 60,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Transaction <br> Date', dataIndex: 'TRANSDATE', width: 90,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
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
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
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
                                                        text: 'Rate', dataIndex: 'DISCRATE', width: 90,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00 %');
                                                            return value;
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetPricing').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totDISCRATE, '0,000.00 %') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Commission <br> TAX Amount', dataIndex: 'DISCAMOUN', width: 90,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetPricing').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            metaData.tdAttr = 'data-qtip="' + 'Commission & TAX' + '"';
                                                            return '<b>' + Ext.util.Format.number(data.totDISCAMOUN, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Result Conciliation Pricing',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Transaction <br> Amount', dataIndex: 'TGROSAMOUC', width: 90,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
//                                                            return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetPricing').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totTGROSAMOUC, '0,000.00') + '<b>';
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
                                                                text: 'TAX Amount', dataIndex: 'DISCAMOUNC', width: 90,
                                                                listeners: {
                                                                    //                                                    click: 'onGridDetBankS'
                                                                },
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                    //                                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetPricing').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totDISCAMOUNC, '0,000.00') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }


                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxDetChargeback',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 1730,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetChargeback',
                                    width: 1730,
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
                                            /*
                                             {
                                             text: 'Payment',
                                             id: prototype.id + '-htDateChargeback',
                                             defaults: {
                                             menuDisabled: true,
                                             sortable: false,
                                             align: 'center'
                                             },
                                             columns: [
                                             {
                                             text: 'Date', dataIndex: 'DATE', width: 100,
                                             renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                             value = '<b>' + value + '</b>';
                                             return value;
                                             }
                                             }
                                             ]
                                             },
                                             */
                                            {text: 'Source', dataIndex: 'RECTYPE', width: 130,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;background-color:#B2DAFA";
                                                    return value;
                                                }
                                            },
                                            {text: 'Status', dataIndex: 'desCERROR', width: 100,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    if (record.data.CERROR === '00') {
                                                        metaData.style = "text-align:center;background-color:#C6E5B1;";
                                                    } else if (record.data.CERROR === '01') {
                                                        metaData.style = "text-align:center;background-color:#FF6F6F;";
                                                    } else {
                                                        metaData.style = "text-align:center;background-color:#C6E5B1;";
                                                    }
                                                    return value;
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
                                                    {text: 'Number', dataIndex: 'CHADJNBR', width: 150,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Invoice <br> Refer. Number<br>PNR', dataIndex: 'INVORNBR', width: 120, },
                                                    {text: 'Indust.Speci. <br> Ref.Nbr', dataIndex: 'ISREFNBR', width: 120,
                                                        listeners: {
                                                            click: 'viewTicket'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            value = '<b>' + value + '</b>';
                                                            metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    },
                                                    {text: 'Reason <br> Code', dataIndex: 'CHAADJCOD', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Description', dataIndex: 'CHAADJDES', width: 300,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:left;background-color:#FCF6DC";
                                                            metaData.tdAttr = 'data-qtip="' + data.CHAADJDES + '"';
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'GROSS', dataIndex: 'GROSAMOUN', width: 100,
                                                listeners: {
//                                                    click: 'onGridDetBankS'
                                                },
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDetChargeback').getStore().getData().items[0].data;
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
                                                        text: 'Commission', dataIndex: 'DISCAMOUN', width: 100,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetChargeback').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totDISCAMOUN, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Serv. Fee', dataIndex: 'SFEEAMOUN', width: 100,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetChargeback').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totSFEEAMOUN, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'VAT', dataIndex: 'TAXAMOUN', width: 100,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetChargeback').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totTAXAMOUN, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'NET', dataIndex: 'NETAMOUN', width: 100,
                                                listeners: {
//                                                    click: 'onGridDetBankS'
                                                },
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
//                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDetChargeback').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totNETAMOUN, '0,000.00') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'Result <br> Conciliation <br> Summary',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    /*
                                                     {
                                                     text: 'GROSS', dataIndex: 'GROSAMOUNC', width: 100,
                                                     listeners: {
                                                     //                                                    click: 'onGridDetBankS'
                                                     },
                                                     renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                     metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                     value = Ext.util.Format.number(value, '0,000.00');
                                                     return value;
                                                     //                                                            return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                     },
                                                     summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                     var data = Ext.getCmp(prototype.id + '-gridDetChargeback').getStore().getData().items[0].data;
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
                                                     text: 'Commission', dataIndex: 'DISCAMOUNC', width: 100,
                                                     listeners: {
                                                     //                                                    click: 'onGridDetBankS'
                                                     },
                                                     renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                     metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                     value = Ext.util.Format.number(value, '0,000.00');
                                                     return value;
                                                     //                                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                     },
                                                     summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                     var data = Ext.getCmp(prototype.id + '-gridDetChargeback').getStore().getData().items[0].data;
                                                     metaData.style = 'text-align:right; margin-right:3px ';
                                                     return '<b>' + Ext.util.Format.number(data.totDISCAMOUNC, '0,000.00') + '<b>';
                                                     }
                                                     },
                                                     {
                                                     text: 'TAX <br> Commission', dataIndex: 'TAXAMOUNC', width: 100,
                                                     listeners: {
                                                     //                                                    click: 'onGridDetBankS'
                                                     },
                                                     renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                     metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                     value = Ext.util.Format.number(value, '0,000.00');
                                                     return value;
                                                     //                                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                     },
                                                     summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                     var data = Ext.getCmp(prototype.id + '-gridDetChargeback').getStore().getData().items[0].data;
                                                     metaData.style = 'text-align:right; margin-right:3px ';
                                                     return '<b>' + Ext.util.Format.number(data.totTAXAMOUNC, '0,000.00') + '<b>';
                                                     }
                                                     }
                                                     ]
                                                     },
                                                     */
                                                    {
                                                        text: 'NET', dataIndex: 'NETAMOUNC', width: 100,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
//                                                            return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetChargeback').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totNETAMOUNC, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Serv. Fee', dataIndex: 'SFEEAMOUNC', width: 100,
                                                        listeners: {
                                                            //                                                    click: 'onGridDetBankS'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
//                                                            return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetChargeback').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totSFEEAMOUNC, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }


                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxSettlement',
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
                                    id: prototype.id + '-gridSettlement',
                                    width: 1700,
                                    height: 'auto',
                                    columnLines: true,
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
                                                        text: 'Date', dataIndex: 'PAYDATE', width: 100,
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
                                                        text: 'Id', dataIndex: 'MERCHID', width: 100,
                                                        listeners: {
                                                            click: 'onGridDetSettMerchant'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Currency', dataIndex: 'PCURRENCY', width: 70,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    //metaData.style = "text-align:center;background-color:#FCF6DC";
                                                    return value;
                                                }
                                            },
                                            {text: 'Status', dataIndex: 'desCERROR', width: 80,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    if (record.data.CERROR === '00') {
                                                        metaData.style = "text-align:center;background-color:#C6E5B1;";
                                                    } else if (record.data.CERROR === '01') {
                                                        metaData.style = "text-align:center;background-color:#FF6F6F;";
                                                    } else {
                                                        metaData.style = "text-align:center;background-color:#C6E5B1;";
                                                    }
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Transaction <br> Amount', dataIndex: 'TGROSAMOUN', width: 100,
                                                listeners: {
//                                                    click: 'onGridDetBankS'
                                                },
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#B2FAC6";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
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
                                                        text: 'Rate', dataIndex: 'DISCRATE_IMPORT', width: 90,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#FCF6DC";
                                                            value = Ext.util.Format.number(value, '0,000.00 %');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'DISCAMOUN_IMPORT', width: 90,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#FCF6DC";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'VAT Rate', dataIndex: 'DISCRATE_IVA', width: 90,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#f5edc9";
                                                            value = Ext.util.Format.number(value, '0,000.00 %');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'VAT', dataIndex: 'DISCAMOUN_IVA', width: 90,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#f5edc9";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Serv. Fee', dataIndex: 'SFEEAMOU', width: 100,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Acceleration <br> Amount', dataIndex: 'ACCEAMOU', width: 100,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'VAT COM<br>1+2', dataIndex: 'TAXAMOUN_AD', width: 100,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
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
                                                        text: 'Amount', dataIndex: 'GROSAMOUN', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Commission', dataIndex: 'DISCAMOUN', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'VAT', dataIndex: 'TAXAMOUN_CB', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Net Amount<br>to Receive AM', dataIndex: 'NETAMOUN', width: 100,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Currency<br>Settlement', dataIndex: 'PCURRENCY', width: 80,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    //metaData.style = "text-align:center;background-color:#FCF6DC";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Net Amount<br>to Receive', dataIndex: 'NETAMOUNC', width: 100,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxDetSettlement',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 1720,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetSettlement',
                                    width: 1720,
                                    height: 'auto',
                                    columnLines: true,
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
                                                        text: 'Date', dataIndex: 'PAYDATE', width: 85,
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Transaction',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'TRANSDATE', width: 85,
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Processing',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'AXPRODAT', width: 85,
                                                    }
                                                ]
                                            },
                                            {text: 'Status', dataIndex: 'desCERROR', width: 80,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    if (record.data.CERROR === '00') {
                                                        metaData.style = "text-align:center;background-color:#C6E5B1;";
                                                    } else if (record.data.CERROR === '01') {
                                                        metaData.style = "text-align:center;background-color:#FF6F6F;";
                                                    } else {
                                                        metaData.style = "text-align:center;background-color:#C6E5B1;";
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
                                                    {
                                                        text: 'Type', dataIndex: 'RECTYPE', width: 100,
                                                    }
                                                ]
                                            },
                                            {text: 'Invoice <br> Refer. Number<br>PNR', dataIndex: 'INVORNBR', width: 100,
                                                listeners: {
                                                    click: 'onViewPNR'
                                                },
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
//                                                            value = '<br>' + value + '<br>';
                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                }
                                            },
                                            {text: 'Indust.Speci. <br> Ref.Nbr', dataIndex: 'ISREFNBR', width: 120,
                                                listeners: {
                                                    click: 'viewTicket'
                                                },
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    value = '<b>' + value + '</b>';
                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                }
                                            },
                                            {text: 'Card Number', dataIndex: 'SCARDN', width: 140},
                                            {text: 'Auth.', dataIndex: 'SAUTHOC', width: 70},
                                            {text: 'Installment <br> Plan', dataIndex: 'NBRINSTA', width: 90},
                                            {text: 'Installment<br>Number', dataIndex: 'INSTANBR', width: 90},
                                            {
                                                text: 'Total <br> Amount', dataIndex: 'GROSAMOUN', width: 100,
                                                listeners: {
//                                                    click: 'onGridDetBankS'
                                                },
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#B2FAC6";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Amount <br> w/o Discount', dataIndex: 'TGROSAMOUN', width: 100,
                                                listeners: {
//                                                    click: 'onGridDetBankS'
                                                },
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
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
                                                        text: 'Rate', dataIndex: 'DISCRATE_IMPORT', width: 70,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#FCF6DC";
                                                            value = Ext.util.Format.number(value, '0,000.00 %');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'DISCAMOUN_IMPORT', width: 90,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#FCF6DC";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'VAT', dataIndex: 'DISCAMOUN_IVA', width: 90,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#f5edc9";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: '% Commission<br>MSI_1', dataIndex: 'RATESFEE', width: 100,                                                
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00 %');
                                                    return value;
                                                },
                                            },
                                            {
                                                text: 'Serv. Fee', dataIndex: 'SFEEAMOU', width: 100,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {
                                                text: '% Commission<br>MSI_2', dataIndex: 'RATEACCE', width: 100,                                                
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00 %');
                                                    return value;
                                                },
                                            },
                                            {
                                                text: 'Acceleration <br> Amount', dataIndex: 'ACCEAMOU', width: 100,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'VAT COM<br>1+2', dataIndex: 'TAXAMOUN_AD', width: 100,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'IVACOM12', dataIndex: 'IVACOM12', width: 100,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
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
                                                        text: 'Amount', dataIndex: 'GROSAMOUN', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Commission', dataIndex: 'DISCAMOUN', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'VAT', dataIndex: 'TAXAMOUN_CB', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Net Amount<br>to Receive AM', dataIndex: 'NETAMOUN', width: 100,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Currency<br>Settlement', dataIndex: 'IN_PCURRENCY', width: 80,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    //metaData.style = "text-align:center;background-color:#FCF6DC";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Calculated<br>Commission ', dataIndex: 'DISCAMOSC', width: 100,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxDetDay',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 1062,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetDay',
                                    width: 1062,
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
                                                id: prototype.id + '-htDetDay',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'SDATE', width: 100, //flex: 1
                                                        listeners: {
                                                            click: 'onGridDetMerchant'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Bank Statement Reconciliation',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Match',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Automatic', dataIndex: 'lngQMATCH', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Diff', dataIndex: 'lngQDIFF', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Total', dataIndex: 'lngQTOTSAL', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#d5f4d5";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Bank without Payment',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Sale', dataIndex: 'lngQPAS48', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                }
                                                            }
                                                            ,
                                                            {
                                                                text: 'Refund', dataIndex: 'QBANKRFND', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
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
                                                            {
                                                                text: 'without Bank', dataIndex: 'lngQPAID', width: 100, id: prototype.id + '-label_3',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Total', dataIndex: 'lngQTOTWS', width: 120,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#b5d0f9";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
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
                                                                text: 'Transactions', dataIndex: 'lngQTEF', width: 120,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                }
                                                            }
                                                            ,
                                                            {
                                                                text: 'Tickets', dataIndex: 'lngQTYDOC', width: 120,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelDataSummary3',
                                    width: 1062,
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
                                        {width: 200, id: prototype.id + '-lblTotD_QMATCH'},
                                        {width: 100, id: prototype.id + '-lngTotD_QDIFF'},
                                        {width: 100, id: prototype.id + '-lblTotD_QTOTSAL'},
                                        {width: 100, id: prototype.id + '-lblTotD_QPAS48'},
                                        {width: 100, id: prototype.id + '-totQBANKRFND2'},
                                        {width: 100, id: prototype.id + '-lblTotD_QPAID'},
                                        {width: 120, id: prototype.id + '-lblTotD_QTOTWS'},
                                        {width: 120, id: prototype.id + '-lblTotD_QTEF'},
                                        {width: 120, id: prototype.id + '-lblTotD_QTYDOC'}
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxDetMerchant',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 1212,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetMerchant',
                                    width: 1212,
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
                                            {text: 'Status', dataIndex: 'STVAL', width: 150,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdAttr = 'data-qtip="' + data.STVAL + '"';
                                                    return value;
                                                }
                                            },
                                            {text: 'Bank Settlement',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Date', dataIndex: 'DATEF', width: 100},
                                                    {text: 'Merchant', dataIndex: 'MERCHN', width: 120,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:center;";
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescMerchn + '"';
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Curr.', dataIndex: 'SCURRENCY', width: 50},
                                                    {text: 'Amount', dataIndex: 'dblAMOUNT', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
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
                                                    {text: 'Date', dataIndex: 'BDATEP', width: 100},
                                                    {text: 'Merchant', dataIndex: 'MERCHNR', width: 120},
                                                    {text: 'Curr.', dataIndex: 'ACURRENCY', width: 50},
                                                    {text: 'Amount', dataIndex: 'dblAMOUNTR', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    }

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
                                                    {text: 'Trans', dataIndex: 'lngQTEF', width: 80},
                                                    {text: 'Tkts.', dataIndex: 'lngQTYDOC', width: 80},
                                                ]
                                            },
                                            {text: 'Transaction', dataIndex: 'strDescTTRAN', width: 120,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
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
                                    id: prototype.id + '-panelDataSummary4',
                                    width: 1210,
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
                                        {width: 520, id: prototype.id + '-lblTotAMOUNT', align: 'center'},
                                        {width: 370, id: prototype.id + '-lblTotAMOUNTR', align: 'center'},
                                        {width: 80, id: prototype.id + '-lblTotM_QTEF', align: 'center'},
                                        {width: 80, id: prototype.id + '-lblTotM_QTYDOC', align: 'center'},
                                        {width: 160},
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxDetBankByS',
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
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
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
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
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
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
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
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
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
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
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
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
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
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Tickets', dataIndex: 'lngQTYDOC', width: 110,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
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
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxDetDayByS',
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
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Quantity', dataIndex: 'lngQACCB', width: 100,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return Ext.util.Format.number(value, '0,000');
                                                }
                                            },
                                            {
                                                text: 'Currency', dataIndex: 'SCURRENCY', width: 80,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
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
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Refund', dataIndex: 'AMOUNTR', width: 120,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Net', dataIndex: 'DAMOUNT', width: 120,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
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
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
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
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        }
                                                    }
                                                    ,
                                                    {
                                                        text: 'Tickets', dataIndex: 'lngQTYDOC', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
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
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxDetMerchantByS',
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
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var data = record.data;
                                                                    metaData.style = "text-align:center;color:#057ECB";
                                                                    metaData.tdAttr = 'data-qtip="' + data.MERCHN + '"';
                                                                    value = '<b>' + value + '<b>';
                                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                                },
                                                            },
                                                            {text: 'Description.', dataIndex: 'strDescMerchn', width: 130,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
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
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#057ECB";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                            }
                                                            ,
                                                            {
                                                                text: 'Refund', dataIndex: 'AMOUNTR', width: 100,
                                                                listeners: {
                                                                    click: 'OnGridByMerchant'
                                                                },
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;color:#c22428";
                                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#F80000;text-decoration:none;">' + value + '</a>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Net', dataIndex: 'DAMOUNT', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
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
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
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
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Description', dataIndex: 'strDescripcion', width: 120,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
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
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Tkts.', dataIndex: 'lngQTYDOC', width: 60,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        }
                                                    },
                                                ]
                                            },
                                            {text: 'Transaction', dataIndex: 'strDescTTRAN', width: 50,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
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
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxByMerchant',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 1134,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridByMerchant',
                                    width: 1134,
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
                                            {text: 'Country', dataIndex: 'SCOUNTRY', width: 70, },
                                            {text: 'Bank Code', dataIndex: 'CODEBANK', width: 70},
                                            {text: 'DATEF', dataIndex: 'DATEF', width: 80},
                                            {text: 'TIPOTAR', dataIndex: 'TIPOTAR', width: 80},
                                            {text: 'Card Code', dataIndex: 'SCARCOD', width: 80,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:center;";
                                                    metaData.tdAttr = 'data-qtip="' + data.strADescCard + '"';
                                                    return value;
                                                }
                                            },
                                            {text: 'Card Number', dataIndex: 'SCARDN', width: 140},
                                            {text: 'SAUTHOC', dataIndex: 'SAUTHOC', width: 80},
                                            {text: 'Doc Type', dataIndex: 'TDOC', width: 80},
                                            {text: 'Status', dataIndex: 'STVAL', width: 80},
                                            {text: 'Currency', dataIndex: 'SCURRENCY', width: 80},
                                            {text: 'Amount', dataIndex: 'SVFOP', width: 80,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                }
                                            },
                                            {text: 'Qty', dataIndex: 'QTYDOC', width: 50,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    return value;
                                                }
                                            },
                                            {text: 'Agent', dataIndex: 'SAGENT', width: 80},
                                            {text: 'Source', dataIndex: 'FTE', width: 80},
                                        ]
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelDataSummary8',
                                    width: 1134,
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
                                        {width: 920, id: prototype.id + '-totSVFOP', align: 'center'},
                                        {width: 50, id: prototype.id + '-totQTYDOC', align: 'center'},
                                        {width: 160},
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-pie',
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            border: true,
                            width: 1132,
                            hidden: true,
                            height: 25,
                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                            items: [
                                {
                                    xtype: 'panel',
                                    width: 1132,
                                    height: 25,
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    defaults: {
                                        xtype: 'label'
                                    },
                                    items: [
                                        {
                                            text: 'Page',
                                            width: 50
                                        },
                                        {
                                            id: prototype.id + '-lbl-currentPage',
                                            text: '1',
                                            width: 50
                                        },
                                        {
                                            text: 'Of',
                                            width: 50
                                        },
                                        {
                                            id: prototype.id + '-lbl-pageCount',
                                            text: '0',
                                            width: 50
                                        },
                                        {xtype: 'tbspacer', width: 100},
                                        {
                                            text: 'Total found',
                                            width: 80
                                        },
                                        {
                                            id: prototype.id + '-lbl-total',
                                            text: '0',
                                            width: 50
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    region: 'south',
                    layout: 'border',
                    height: 0,
                    defaults: {
                        style: 'margin: 1px;',
                        bodyStyle: 'background: transparent;',
                        border: false
                    }
                }
            ]
        }
    ]
}
);


