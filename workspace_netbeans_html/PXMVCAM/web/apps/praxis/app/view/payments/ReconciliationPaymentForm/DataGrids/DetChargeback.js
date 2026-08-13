Ext.define('Ext.Praxis.view.payments.ReconciliationPaymentForm.DataGrids.DetChargeback', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-DataGridDetChargeback',
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
            height: 600,
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
                    {text: 'Source', dataIndex: 'RECTYPE', width: 130,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;background-color:#B2DAFA";
                            return value;
                        }
                    },
                    {text: 'Status', dataIndex: 'desCERROR', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            if (record.data.CERROR === '') {
                                metaData.style = "text-align:center;background-color:#C6E5B1;";
                            } else {
                                metaData.style = "text-align:center;background-color:#fc8686;";
                            }
                            return value;
                        }
                    },
                    {text: 'Number', dataIndex: 'CHADJNBR', width: 150,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;background-color:#FCF6DC";
                            return value;
                        }
                    },
                    {text: 'Invoice <br> Refer. Number<br>PNR', dataIndex: 'INVORNBR', width: 120, },
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
                    {text: 'Reason <br> Code', dataIndex: 'CHAADJCOD', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;background-color:#FCF6DC";
                            return value;
                        }
                    },
                    {text: 'Description', dataIndex: 'CHAADJDES', width: 300,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            var data = record.data;
                            metaData.style = "text-align:left;background-color:#FCF6DC";
                            metaData.tdAttr = 'data-qtip="' + data.CHAADJDES + '"';
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
                                text: 'GROSS', dataIndex: 'GROSAMOUN', width: 100,
                                listeners: {
//                                                    click: 'onGridDetBankS'
                                },
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
                                },
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
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
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
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
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
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
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#B2DAFA";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
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
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
//                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                },
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridDetChargeback').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right; margin-right:3px ';
                                    return '<b>' + Ext.util.Format.number(data.totNETAMOUN, '0,000.00') + '<b>';
                                }
                            },
                        ]
                    },
                    {
                        text: 'Result Reconciliation Chargeback',
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            align: 'center'
                        },
                        columns: [
                            {
                                text: 'GROSS', dataIndex: 'GROSAMOUNC', width: 100,
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
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#B2FAC6;";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                            //                                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDetChargeback').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totDISCAMOUNC, '0,000.00') + '<b>';
                                        }
                                    },
                                    {
                                        text: 'Serv. Fee', dataIndex: 'SFEEAMOUNC', width: 100,
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
                                            var data = Ext.getCmp(prototype.id + '-gridDetChargeback').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totSFEEAMOUNC, '0,000.00') + '<b>';
                                        }
                                    },
                                    {
                                        text: 'VAT', dataIndex: 'TAXAMOUNC', width: 100,
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
                                            var data = Ext.getCmp(prototype.id + '-gridDetChargeback').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totTAXAMOUNC, '0,000.00') + '<b>';
                                        }
                                    }
                                ]
                            },
                            {
                                text: 'NET', dataIndex: 'NETAMOUNC', width: 100,
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
                                    var data = Ext.getCmp(prototype.id + '-gridDetChargeback').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right; margin-right:3px ';
                                    return '<b>' + Ext.util.Format.number(data.totNETAMOUNC, '0,000.00') + '<b>';
                                }
                            },
                        ]
                    }


                ]
            }
        }
    ]
});

