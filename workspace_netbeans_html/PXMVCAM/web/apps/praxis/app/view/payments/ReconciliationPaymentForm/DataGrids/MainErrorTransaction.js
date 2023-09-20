Ext.define('Ext.Praxis.view.payments.ReconciliationPaymentForm.DataGrids.MainErrorTransaction', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-DataGridMainErrorTransaction',
    bodyStyle: 'background-color: #E3EAEF;',
    border: true,
    height: 'auto',
    width: 1865,
    margin: '0 0 0 0 ',
    requires:[
        'Ext.Praxis.view.payments.ReconciliationPaymentForm.DataEntryTransacErrorBPO'
    ],
    layout: {
        type: 'vbox',
        align: 'center'
    },
    items: [
        {
            xtype: 'grid',
            id: prototype.id + '-gridMainErrorTransaction',
            width: 1865,
            columnLines: true,
            features: [{
                    ftype: 'summary',
                    dock: 'bottom'
                }],
            columns: {
                defaults: {
                    menuDisabled: true,
                    sortable: true,
                    align: 'center'
                },
                items: [
                    {
                        text: 'Processing',
                        id: prototype.id + '-htPreDateErrorTransactionMain1',
                        hidden: false,
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            align: 'center'
                        },
                        columns: [
                            {
                                text: 'Date', dataIndex: 'strFormatDate', width: 80,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    value = '<b>' + value + '</b>';
                                    return value;
                                }
                            }
                        ]
                    },
                    {
                        text: 'Processing',
                        id: prototype.id + '-htPreDateErrorTransactionMain2',
                        hidden: false,
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            align: 'center'
                        },
                        columns: [
                            {
                                text: 'Date', dataIndex: 'strFormatDate2', width: 80,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    value = '<b>' + value + '</b>';
                                    return value;
                                }
                            }
                        ]
                    },
                    {
                        text: 'Zone', dataIndex: 'ZONA', width: 50,
                    },
                    {
                        text: 'Country', dataIndex: 'SCOUNTRY', width: 60,
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
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    var data = record.data;
                                    metaData.style = "text-align:center;";
                                    metaData.tdAttr = 'data-qtip="' + data.DES_MERCHANT + '"';
                                    return value;
                                }
                            }
                        ]
                    },
                    {
                        text: 'Status',
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            align: 'center'
                        },
                        columns: [
                            {text: 'Settlement<br>vs Sales', dataIndex: 'descSTVAL', width: 85,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    var data = record.data;
                                    metaData.style = "text-align:center;background-color:#B2FAC6;";
                                    metaData.tdAttr = 'data-qtip="' + data.descSTVAL + '"';
                                    return value;
                                }
                            },
                        ]
                    },
                    {text: 'Document<br>Type', dataIndex: 'TRANSTYPE', width: 70,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            value = '<b>' + value + '</b>';
                            return value;
                        }
                    },
                    {text: 'Void', dataIndex: 'FVOID', width: 40,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            value = '<b>' + value + '</b>';
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
                            {text: 'Sales<br>Merchant ID', dataIndex: 'SMERCHID', width: 80,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:center;background-color:#FCF6DC";
                                    return value;
                                }
                            },
                            {text: 'Description', dataIndex: 'DES_SMERCHANT', width: 80,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:left;background-color:#FCF6DC";
                                    return value;
                                }
                            },
                            {text: 'ID<br>Tran.', dataIndex: 'IDITEMT', width: 60,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:center;background-color:#FCF6DC";
                                    return value;
                                }
                            },
                            {text: 'Invoice<br>Refer. Number<br>PNR', 
                                dataIndex: 'INVOIRN', 
                                width: 95,
                                listeners: {
                                    click: 'onViewPNR'
                                },
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    //const
                                    const {PROCTYPESQ,PWREF} = record.data;
                                    //console.log(PROCTYPESQ,PWREF);
                                    if(PROCTYPESQ === 'BANORTE00'){
                                        value = PWREF;
                                    }
                                    //console.log(record.data.PWREF);
                                    metaData.style = "text-align:left;background-color:#FCF6DC";
                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                }
                            },
                            {text: 'PNR', dataIndex: 'SPNR', width: 60,
                                listeners: {
                                    click: 'onViewPNRbySPNR'
                                },
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:center;background-color:#FCF6DC";
                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                }
                            },
                            {text: 'Indust.Speci. <br> Ref.Nbr<br>TKT', dataIndex: 'TICKET', width: 100,
                                listeners: {
                                    click: 'viewTicket'
                                },
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    value = '<b>' + value + '</b>';
                                    metaData.style = "text-align:center;background-color:#FCF6DC";
                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
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
                                    {text: 'Plan', dataIndex: 'NBRINSTA', width: 60,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;background-color:#FCF6DC";
                                            return value;
                                        }
                                    },
                                    {text: 'Number', dataIndex: 'INSTANBR', width: 60,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;background-color:#FCF6DC";
                                            return value;
                                        }
                                    }
                                ]
                            },
                            {text: 'Card<br>Account Number', dataIndex: 'SCARDN', width: 115,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:center;background-color:#FCF6DC";
                                    return value;
                                }
                            },
                            {text: 'Approval<br>Code', dataIndex: 'SAUTHOC', width: 65,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:center;background-color:#FCF6DC";
                                    return value;
                                }
                            },
                            {text: 'Sales<br>Date', dataIndex: 'SDATE', width: 65,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:center;background-color:#FCF6DC";
                                    return value;
                                }
                            },
                        ]
                    },
                    {text: 'Curr.', dataIndex: 'SCURRENCY', width: 50,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;background-color:#B2DAFA";
                            return value;
                        }
                    },
                    {
                        text: 'Transaction<br>Amount', dataIndex: 'TGROSAMPAY', width: 90,
                        listeners: {
//                                                    click: 'onGridDetBankS'
                        },
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2DAFA";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        },
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            var data = Ext.getCmp(prototype.id + '-gridMainErrorTransaction').getStore().getData().items[0].data;
                            metaData.style = 'text-align:right; margin-right:3px ';
                            return '<b>' + Ext.util.Format.number(data.totTGROSAMPAY, '0,000.00') + '<b>';
                        }
                    },
                    {text: 'Qty<br>Tkts', dataIndex: 'QTYTKT', width: 40,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;background-color:#B2DAFA";
                            return value;
                        }
                    },
                    {
                        text: 'Error',
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            align: 'center'
                        },
                        columns: [
                            {text: 'Code', dataIndex: 'CERROR', width: 45},
                            {
                                text: 'Description', dataIndex: 'DES_CERROR', width: 200,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:left";
                                    return value;
                                }
                            }
                        ]
                    },
                    {
                        sortable: false,
                        xtype: 'actioncolumn',
                        hidden:true,
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
                    },
                    {
                        sortable: false,
                        xtype: 'actioncolumn',
                        width: 60,
                        text: 'Edit',
                        align: 'center',
                        items: [
                            {
                                iconCls: 'prx-icon-detail',
                                tooltip: 'Detail',
                                handler: 'onEditClick2'
                            }
                        ]
                    },
                ]
            }
        }
    ]
});
