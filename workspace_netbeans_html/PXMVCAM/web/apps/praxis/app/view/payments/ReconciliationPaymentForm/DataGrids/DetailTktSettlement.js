Ext.define('Ext.Praxis.view.payments.ReconciliationPaymentForm.DataGrids.DetailTktSettlement', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-DataGridDetailTktSettlement',
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
            id: prototype.id + '-gridDetailTktSettlement',
            width: 1720,
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
                        id: prototype.id + '-detSettTktDate',
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            align: 'center'
                        },
                        columns: [
                            {
                                text: 'Date', dataIndex: 'DATE', width: 85,
                            }
                        ]
                    },
                    {
                        text: 'Sales',
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
                    {
                        text: 'Zone', dataIndex: 'ZONA', width: 60,
                    },
                    {
                        text: 'Country', dataIndex: 'SCOUNTRY', width: 80,
                    },
                    {
                        text: 'Status',
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            align: 'center'
                        },
                        columns: [
                            {text: 'Reconciliation<br>Settlement', dataIndex: 'desCERROR', width: 100,
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
                            {text: 'Settlement<br>vs Sales', dataIndex: 'descSTVAL', width: 90,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    var data = record.data;
                                    metaData.style = "text-align:center;";
                                    metaData.tdAttr = 'data-qtip="' + data.descSTVAL + '"';
                                    return value;
                                }
                            },
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
                                text: 'Type', dataIndex: 'RECTYPE', width: 100,
                            }
                        ]
                    },
                    {text: 'Invoice <br> Refer. Number<br>PNR', dataIndex: 'INVORNBR', width: 100,
                        listeners: {
                            click: 'onViewPNR'
                        },
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;";
//                                                            value = '<br>' + value + '<br>';
                            return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                        }
                    },
                    {text: 'PNR', dataIndex: 'SPNR', width: 80,
                        listeners: {
                            click: 'onViewPNRbySPNR'
                        },
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;";
//                                                            value = '<br>' + value + '<br>';
                            return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                        }
                    },
                    {text: 'Ticket', dataIndex: 'ISREFNBR', width: 120,
                        listeners: {
                            click: 'viewTicket'
                        },
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            value = '<b>' + value + '</b>';
                            return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                        }
                    },
                    {text: 'Card Number', dataIndex: 'SCARDN', width: 140},
                    {text: 'Auth.', dataIndex: 'SAUTHOC', width: 70},
                    /*{text: 'Installment <br> Plan', dataIndex: 'NBRINSTA', width: 90},
                     {text: 'Installment<br>Number', dataIndex: 'INSTANBR', width: 90},*/
                    {
                        text: 'Total <br> Amount', dataIndex: 'GROSAMOUN', width: 100, hidden: true,
                        listeners: {
//                                                    click: 'onGridDetBankS'
                        },
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2FAC6";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        },
                    },
                    {
                        text: 'Amount<br>Total Transact.', dataIndex: 'TGROSAMOUC', width: 100,
                        listeners: {
//                                                    click: 'onGridDetBankS'
                        },
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;";
                            value = Ext.util.Format.number(value, '0,000.00');
                            if (rowIndex > 0) {
                                return ''
                            } else {
                                return value;
                            }
                        },
                        /*summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                         var data = Ext.getCmp(prototype.id + '-gridDetailTktSettlement').getStore().getData().items[0].data;
                         metaData.style = 'text-align:right; margin-right:3px ';
                         return '<b>' + Ext.util.Format.number(data.TGROSAMOUC_TOTAL, '0,000.00') + '<b>';
                         }*/
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
                            var data = Ext.getCmp(prototype.id + '-gridDetailTktSettlement').getStore().getData().items[0].data;
                            metaData.style = 'text-align:right; margin-right:3px ';
                            return '<b>' + Ext.util.Format.number(data.totTGROSAMOUN, '0,000.00') + '<b>';
                        }
                    },
//                                            {
//                                                text: 'Adjustment', dataIndex: 'SADJUST', width: 100,
//                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                    metaData.style = "text-align:right;background-color:#B2DAFA";
//                                                    value = Ext.util.Format.number(value, '0,000.00');
//                                                    return value;
//                                                },
//                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridDetailTktSettlement').getStore().getData().items[0].data;
//                                                    metaData.style = 'text-align:right; margin-right:3px ';
//                                                    return '<b>' + Ext.util.Format.number(data.SADJUST_TOTAL, '0,000.00') + '<b>';
//                                                }
//                                            },
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
                                    var data = Ext.getCmp(prototype.id + '-gridDetailTktSettlement').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right; margin-right:3px ';
                                    return '<b>' + Ext.util.Format.number(data.totSFEEAMOU, '0,000.00') + '<b>';
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
                                    var data = Ext.getCmp(prototype.id + '-gridDetailTktSettlement').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right; margin-right:3px ';
                                    return '<b>' + Ext.util.Format.number(data.totACCEAMOU, '0,000.00') + '<b>';
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
                                    var data = Ext.getCmp(prototype.id + '-gridDetailTktSettlement').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right; margin-right:3px ';
                                    return '<b>' + Ext.util.Format.number(data.ACCEAMOUC_TOTAL, '0,000.00') + '<b>';
                                }
                            },
                            {
                                text: 'VAT COMM<br>1 2', dataIndex: 'IVACOM12', width: 100,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;background-color:#B2DAFA;";
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
                                },
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridDetailTktSettlement').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right; margin-right:3px';
                                    return '<b>' + Ext.util.Format.number(data.totIVACOM12, '0,000.00') + '<b>';
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
                                    var data = Ext.getCmp(prototype.id + '-gridDetailTktSettlement').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right; margin-right:3px ';
                                    return '<b>' + Ext.util.Format.number(data.totDISCAMOUN, '0,000.00') + '<b>';
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
                                    var data = Ext.getCmp(prototype.id + '-gridDetailTktSettlement').getStore().getData().items[0].data;
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
                                text: 'Transaction <br> Amount', dataIndex: 'TGROSAMOUC', width: 100, hidden: true,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    var data = Ext.getCmp(prototype.id + '-gridDetailTktSettlement').getStore().getData().items[rowIndex].data;
                                    if (data.TGROSAMOUN >= data.TGROSAMOUC - 0.5 && data.TGROSAMOUN <= data.TGROSAMOUC + 0.5) {
                                        metaData.style = "text-align:right;background-color:#B2FAC6;";
                                    } else {
                                        metaData.style = "text-align:right;background-color:#B2FAC6;color:#ff0000";
                                    }
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
                                },
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridDetailTktSettlement').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right; margin-right:3px ';
                                    return '<b>' + Ext.util.Format.number(data.TGROSAMOUC_TOTAL, '0,000.00') + '<b>';
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
                                            var data = Ext.getCmp(prototype.id + '-gridDetailTktSettlement').getStore().getData().items[rowIndex].data;
                                            if (Ext.util.Format.number(data.RATESFEE, '0,000.00') !== Ext.util.Format.number(data.RATESFEEC, '0,000.00')) {
                                                metaData.style = "text-align:right;background-color:#B2FAC6;color:#ff0000";
                                            } else {
                                                metaData.style = "text-align:right;background-color:#B2FAC6;";
                                            }
                                            value = Ext.util.Format.number(value, '0,000.00 %');
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Total<br>Comm.', dataIndex: 'SFEEAMOUC', width: 90,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = Ext.getCmp(prototype.id + '-gridDetailTktSettlement').getStore().getData().items[rowIndex].data;
                                            if (data.ACCEAMOUC >= data.SFEEAMOUC - 0.5 && data.ACCEAMOUC <= data.SFEEAMOUC + 0.5) {
                                                metaData.style = "text-align:right;background-color:#B2FAC6;";
                                            } else {
                                                metaData.style = "text-align:right;background-color:#B2FAC6;color:#ff0000";
                                            }
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDetailTktSettlement').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.SFEEAMOUC_TOTAL, '0,000.00') + '<b>';
                                        }
                                    },
                                    {
                                        text: 'VAT COMM<br>1 2', dataIndex: 'VATCOMMSIC', width: 90,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = Ext.getCmp(prototype.id + '-gridDetailTktSettlement').getStore().getData().items[rowIndex].data;
                                            if (data.IVACOM12 >= data.VATCOMMSIC - 0.5 && data.IVACOM12 <= data.VATCOMMSIC + 0.5) {
                                                metaData.style = "text-align:right;background-color:#B2FAC6;";
                                            } else {
                                                metaData.style = "text-align:right;background-color:#B2FAC6;color:#ff0000";
                                            }
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDetailTktSettlement').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.VATCOMMSIC_TOTAL, '0,000.00') + '<b>';
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
                                            var data = Ext.getCmp(prototype.id + '-gridDetailTktSettlement').getStore().getData().items[rowIndex].data;
                                            if (Ext.util.Format.number(data.DISCRATE, '0,000.00') !== Ext.util.Format.number(data.DISCRATEC, '0,000.00')) {
                                                metaData.style = "text-align:right;background-color:#B2FAC6;color:#ff0000";
                                            } else {
                                                metaData.style = "text-align:right;background-color:#B2FAC6;";
                                            }
                                            value = Ext.util.Format.number(value, '0,000.00 %');
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Discount<br>Amount Comm.', dataIndex: 'DISCAMOUNC', width: 90,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = Ext.getCmp(prototype.id + '-gridDetailTktSettlement').getStore().getData().items[rowIndex].data;
                                            if (data.DISCAMOUN >= data.DISCAMOUNC - 0.5 && data.DISCAMOUN <= data.DISCAMOUNC + 0.5) {
                                                metaData.style = "text-align:right;background-color:#B2FAC6;";
                                            } else {
                                                metaData.style = "text-align:right;background-color:#B2FAC6;color:#ff0000";
                                            }
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDetailTktSettlement').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.DISCAMOUNC_TOTAL, '0,000.00') + '<b>';
                                        }
                                    },
                                    {
                                        text: 'Discount<br>Rate VAT.', dataIndex: 'DISCRATEIC', width: 90,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = Ext.getCmp(prototype.id + '-gridDetailTktSettlement').getStore().getData().items[rowIndex].data;
                                            if (Ext.util.Format.number(data.DISCRATEI, '0,000.00') !== Ext.util.Format.number(data.DISCRATEIC, '0,000.00')) {
                                                metaData.style = "text-align:right;background-color:#B2FAC6;color:#ff0000";
                                            } else {
                                                metaData.style = "text-align:right;background-color:#B2FAC6;";
                                            }
                                            value = Ext.util.Format.number(value, '0,000.00 %');
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Discount<br>Amount VAT', dataIndex: 'DISCAMOUIC', width: 90,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = Ext.getCmp(prototype.id + '-gridDetailTktSettlement').getStore().getData().items[rowIndex].data;
                                            if (data.DISCAMOUNI >= data.DISCAMOUIC - 0.5 && data.DISCAMOUNI <= data.DISCAMOUIC + 0.5) {
                                                metaData.style = "text-align:right;background-color:#B2FAC6";
                                            } else {
                                                metaData.style = "text-align:right;background-color:#B2FAC6;color:#ff0000";
                                            }
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDetailTktSettlement').getStore().getData().items[0].data;
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
                                    var data = Ext.getCmp(prototype.id + '-gridDetailTktSettlement').getStore().getData().items[rowIndex].data;
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
                                    var data = Ext.getCmp(prototype.id + '-gridDetailTktSettlement').getStore().getData().items[rowIndex].data;
                                    metaData.style = "text-align:right;background-color:#B2FAC6;";
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
//                                                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                }
                            },
                        ]
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
                                text: 'Amount', dataIndex: 'GROSAMOUN_CB', width: 100,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;";
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
                                },
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridDetailTktSettlement').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right; margin-right:3px ';
                                    return '<b>' + Ext.util.Format.number(data.totGROSAMOUN_CB, '0,000.00') + '<b>';
                                }
                            },
                            {
                                text: 'Commission', dataIndex: 'DISCAMOUN_CB', width: 100,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;";
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
                                },
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridDetailTktSettlement').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right; margin-right:3px ';
                                    return '<b>' + Ext.util.Format.number(data.DISCAMOUN_CB_TOTAL, '0,000.00') + '<b>';
                                }
                            },
                            {
                                text: 'VAT', dataIndex: 'TAXAMOUN_CB', width: 100,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;";
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
                                },
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridDetailTktSettlement').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right; margin-right:3px ';
                                    return '<b>' + Ext.util.Format.number(data.totTAXAMOUN_CB, '0,000.00') + '<b>';
                                }
                            },
                        ]
                    },
                    {
                        text: 'Net Amount<br>to Receive AM', dataIndex: 'NETAMOUN', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        },
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            var data = Ext.getCmp(prototype.id + '-gridDetailTktSettlement').getStore().getData().items[0].data;
                            metaData.style = 'text-align:right; margin-right:3px ';
                            return '<b>' + Ext.util.Format.number(data.totNETAMOUN, '0,000.00') + '<b>';
                        }
                    },
                    {
                        text: 'Currency<br>Settlement', dataIndex: 'IN_PCURRENCY', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            //metaData.style = "text-align:center;background-color:#FCF6DC";
                            return value;
                        }
                    },
                    {
                        text: 'Calculated<br>Commission ', dataIndex: 'DISCAMOSC', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        },
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            var data = Ext.getCmp(prototype.id + '-gridDetailTktSettlement').getStore().getData().items[0].data;
                            metaData.style = 'text-align:right; margin-right:3px ';
                            return '<b>' + Ext.util.Format.number(data.totDISCAMOSC, '0,000.00') + '<b>';
                        }
                    },
                ]
            }
        }
    ]
});


