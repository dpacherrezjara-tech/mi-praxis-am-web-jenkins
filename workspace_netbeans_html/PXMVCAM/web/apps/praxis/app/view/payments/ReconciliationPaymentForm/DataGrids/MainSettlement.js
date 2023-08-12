Ext.define('Ext.Praxis.view.payments.ReconciliationPaymentForm.DataGrids.MainSettlement', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-DataGridMainSettlement',
    bodyStyle: 'background-color: #E3EAEF;',
    border: true,
    height: 'auto',
    width: 1475,
    margin: '0 0 0 0 ',
    layout: {
        type: 'vbox',
        align: 'center'
    },
    items: [
        {
            xtype: 'grid',
            id: prototype.id + '-gridMainSettlement',
            width: 1475,
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
                        id: prototype.id + '-mSetDate',
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            align: 'center'
                        },
                        columns: [
                            {
                                text: 'Date', dataIndex: 'DATE', width: 100,
                                listeners: {
                                    click: 'onGridSettlement'
                                },
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    value = '<b>' + value + '</b>';
                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                }
                            }
                        ]
                    },
                    {
                        text: 'Zone', dataIndex: 'ZONA', width: 70,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            //metaData.style = "text-align:center;background-color:#FCF6DC";
                            return value;
                        }
                    },
                    {
                        text: 'Country', dataIndex: 'SCOUNTRY', width: 70,
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
                            /*{
                             text: 'Rate', dataIndex: 'DISCRATE_IMPORT', width: 90,
                             renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                             metaData.style = "text-align:right;background-color:#B2DAFA";
                             value = Ext.util.Format.number(value, '0,000.00 %');
                             return value;
                             }
                             },*/
                            {
                                text: 'Amount', dataIndex: 'SFEEAMOU', width: 90,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
                                }
                            },
                            /*{
                             text: 'VAT Rate', dataIndex: 'DISCRATE_IVA', width: 90,
                             renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                             metaData.style = "text-align:right;background-color:#B2DAFA";
                             value = Ext.util.Format.number(value, '0,000.00 %');
                             return value;
                             }
                             },*/
                            {
                                text: 'VAT', dataIndex: 'IVACOM12', width: 90,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
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
                        }
                    },
                    {
                        text: 'VAT COMM<br>1+2', dataIndex: 'OVERCOM12P', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2DAFA";
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
                                text: 'Amount', dataIndex: 'TGROSAMPAY_CB', width: 100,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
                                }
                            },
                            {
                                text: 'Commission', dataIndex: 'SFEEAMOU_CB', width: 100,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
                                }
                            },
                            {
                                text: 'VAT', dataIndex: 'IVACOM12_CB', width: 100,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
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
                        }
                    },
                ]
            }
        }
    ]
});

