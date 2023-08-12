Ext.define('Ext.Praxis.view.payments.ReconciliationPaymentForm.DataGrids.DetSettlement', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-DataGridDetSettlement',
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
                        sortable: false,
                        xtype: 'actioncolumn',
                        width: 50,
                        text: 'Detail',
                        align: 'center',
                        items: [
                            {
                                iconCls: 'prx-icon-detail',
                                tooltip: 'Detail',
                                handler: 'onEditClickSettlement'
                            }
                        ]
                    },
                    {
                        text: 'Payment',
                        id: prototype.id + '-detSettDate',
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
                        text: 'Diff.',
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            align: 'center'
                        },
                        columns: [
                            {
                                text: 'Days', dataIndex: 'PASSED_DAYS', width: 60,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    if (value > 11) {
                                        metaData.style = "color:#de2828";
                                    }

                                    if (record.data.INSTANBR > 0 && value > 2) {
                                        metaData.style = "color:#de2828";
                                    }
                                    return value;
                                },
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
                            {text: 'Reconciliation<br>Settlement', dataIndex: 'desCERROIN', width: 80,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    if (record.data.CERROIN === '') {
                                        metaData.style = "text-align:center;background-color:#C6E5B1;";
                                    } else {
                                        metaData.style = "text-align:center;background-color:#fc8686;";
                                    }
                                    return value;
                                }
                            },
                            {text: 'Settlement<br>vs Sales', dataIndex: 'descSTVAL', width: 145,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    var data = record.data;
                                    metaData.style = "text-align:left;";
                                    metaData.tdAttr = 'data-qtip="' + data.descSTVAL + '"';
                                    return value;
                                }
                            },
                        ]
                    },
                    {
                        text: 'Zone', dataIndex: 'ZONA', width: 60,
                    },
                    {
                        text: 'Country', dataIndex: 'SCOUNTRY', width: 80,
                    },
                    {text: 'Qty<br>Tkts', dataIndex: 'QTYTKT', width: 40,
                        listeners: {
                            click: 'onTktsDetail'
                        },
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;";
                            if (value === 0) {
                                return value;
                            } else {
                                return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                            }
                        }
                    },
                    {text: 'Invoice<br>Refer. Number<br>PNR', dataIndex: 'INVOIRN', width: 100,
                        listeners: {
                            click: 'onViewPNR'
                        },
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            const {PROCTYPESQ, PWREF} = record.data;
                            if (PROCTYPESQ === 'BANORTE00') {
                                value = PWREF;
                            }
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
                    {
                        text: 'Document<br>Type', dataIndex: 'TRANSTYPE', width: 80,
                    },
                    {text: 'Indust.Speci. <br> Ref.Nbr', dataIndex: 'ISREFNBR', width: 120,
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
                    {text: 'Installment<br>Plan', dataIndex: 'NBRINSTA', width: 90},
                    {text: 'Installment<br>Number', dataIndex: 'INSTANBR', width: 90},
                    {
                        text: 'Sales<br>Amount', dataIndex: 'SVFOPS', width: 100,
                        listeners: {
//                                                    click: 'onGridDetBankS'
                        },
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        },
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            var data = Ext.getCmp(prototype.id + '-gridDetSettlement').getStore().getData().items[0].data;
                            metaData.style = 'text-align:right; margin-right:3px ';
                            return '<b>' + Ext.util.Format.number(data.SVFOPS_TOTAL, '0,000.00') + '<b>';
                        }
                    },
                    {
                        text: 'Transaction<br>Amount', dataIndex: 'TGROSAMPAY', width: 100,
                        listeners: {
//                                                    click: 'onGridDetBankS'
                        },
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2DAFA";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        },
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            var data = Ext.getCmp(prototype.id + '-gridDetSettlement').getStore().getData().items[0].data;
                            metaData.style = 'text-align:right; margin-right:3px ';
                            return '<b>' + Ext.util.Format.number(data.totTGROSAMPAY, '0,000.00') + '<b>';
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
                                text: 'Rate<br>Comm.', dataIndex: 'SFEERATE', width: 80,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                    value = Ext.util.Format.number(value, '0,000.00 %');
                                    return value;
                                },
                            },
                            {
                                text: 'Serv. Fee',
                                //dataIndex: 'SERVICFEEP', 
                                width: 90,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    const {TRANSTYPE, SERVICFEEP, ADJUSMENTP} = record.data;
                                    if (TRANSTYPE === 'ADJU') {
                                        value = ADJUSMENTP;
                                    } else {
                                        value = 0;
                                    }
                                    metaData.style = "text-align:right;background-color:#B2DAFA;";
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
                                },
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridDetSettlement').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right; margin-right:3px ';
                                    //var sfee = Ext.util.Format.number(data.totSERVICFEEP, '0,000.00');
                                    var adju = Ext.util.Format.number(data.totADJUSMENTP, '0,000.00');
                                    //var qtip = `Total Serv. Fee: ${sfee}<br> Total Adjusment: ${adju}`;
                                    //metaData.tdAttr = 'data-qtip="' + adju + '"';
                                    return '<b>' + adju + '<b>';
                                }
                            },
                            {
                                text: 'Accel.<br>Amount',
                                //dataIndex: 'ACCEAMOU', 
                                width: 90,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    const {TRANSTYPE, SERVICFEEP, ACCEAMOU} = record.data;
                                    if (TRANSTYPE !== 'ADJU' && TRANSTYPE !== 'CHBK') {
                                        value = SERVICFEEP;
                                    } else {
                                        value = 0;
                                    }
                                    metaData.style = "text-align:right;background-color:#B2DAFA;";
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
                                },
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridDetSettlement').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right; margin-right:3px ';
                                    return '<b>' + Ext.util.Format.number(data.totSERVICFEEP, '0,000.00') + '<b>';
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
                                    var data = Ext.getCmp(prototype.id + '-gridDetSettlement').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right; margin-right:3px ';
                                    return '<b>' + Ext.util.Format.number(data.ACCEAMOUC_TOTAL, '0,000.00') + '<b>';
                                }
                            },
                            {
                                text: 'VAT COMM<br>1 2', dataIndex: 'OVERCOM12P', width: 100,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;background-color:#B2DAFA;";
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
                                },
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridDetSettlement').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right; margin-right:3px';
                                    return '<b>' + Ext.util.Format.number(data.totOVERCOM12P, '0,000.00') + '<b>';
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
                                text: 'Discount<br>Amount', dataIndex: 'SFEEAMOU', width: 80,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
                                },
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridDetSettlement').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right; margin-right:3px ';
                                    return '<b>' + Ext.util.Format.number(data.totSFEEAMOU, '0,000.00') + '<b>';
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
                                text: 'Discount<br>Amount VAT', dataIndex: 'IVACOM12', width: 90,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
                                },
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridDetSettlement').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right; margin-right:3px ';
                                    return '<b>' + Ext.util.Format.number(data.totIVACOM12, '0,000.00') + '<b>';
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
                                    var data = Ext.getCmp(prototype.id + '-gridDetSettlement').getStore().getData().items[rowIndex].data;
                                    if (data.TGROSAMOUN >= data.TGROSAMOUC - 0.5 && data.TGROSAMOUN <= data.TGROSAMOUC + 0.5) {
                                        metaData.style = "text-align:right;background-color:#B2FAC6";
                                    } else {
                                        metaData.style = "text-align:right;background-color:#B2FAC6;color:#ff0000";
                                    }
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
                                },
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridDetSettlement').getStore().getData().items[0].data;
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
                                            var data = Ext.getCmp(prototype.id + '-gridDetSettlement').getStore().getData().items[rowIndex].data;
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
                                            var data = Ext.getCmp(prototype.id + '-gridDetSettlement').getStore().getData().items[rowIndex].data;
                                            if (data.ACCEAMOUC >= data.SFEEAMOUC - 0.5 && data.ACCEAMOUC <= data.SFEEAMOUC + 0.5) {
                                                metaData.style = "text-align:right;background-color:#B2FAC6";
                                            } else {
                                                metaData.style = "text-align:right;background-color:#B2FAC6;color:#ff0000";
                                            }
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDetSettlement').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.SFEEAMOUC_TOTAL, '0,000.00') + '<b>';
                                        }
                                    },
                                    {
                                        text: 'VAT COMM<br>1 2', dataIndex: 'VATCOMMSIC', width: 90,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = Ext.getCmp(prototype.id + '-gridDetSettlement').getStore().getData().items[rowIndex].data;
                                            if (data.OVERCOM12P >= data.VATCOMMSIC - 0.5 && data.OVERCOM12P <= data.VATCOMMSIC + 0.5) {
                                                metaData.style = "text-align:right;background-color:#B2FAC6";
                                            } else {
                                                metaData.style = "text-align:right;background-color:#B2FAC6;color:#ff0000";
                                            }
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDetSettlement').getStore().getData().items[0].data;
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
                                            var data = Ext.getCmp(prototype.id + '-gridDetSettlement').getStore().getData().items[rowIndex].data;
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
                                            var data = Ext.getCmp(prototype.id + '-gridDetSettlement').getStore().getData().items[rowIndex].data;
                                            if (data.DISCAMOUN >= data.DISCAMOUNC - 0.5 && data.DISCAMOUN <= data.DISCAMOUNC + 0.5) {
                                                metaData.style = "text-align:right;background-color:#B2FAC6";
                                            } else {
                                                metaData.style = "text-align:right;background-color:#B2FAC6;color:#ff0000";
                                            }
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDetSettlement').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.DISCAMOUNC_TOTAL, '0,000.00') + '<b>';
                                        }
                                    },
                                    {
                                        text: 'Discount<br>Rate VAT.', dataIndex: 'DISCRATEIC', width: 90,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = Ext.getCmp(prototype.id + '-gridDetSettlement').getStore().getData().items[rowIndex].data;
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
                                            var data = Ext.getCmp(prototype.id + '-gridDetSettlement').getStore().getData().items[rowIndex].data;
                                            if (data.DISCAMOUNI >= data.DISCAMOUIC - 0.5 && data.DISCAMOUNI <= data.DISCAMOUIC + 0.5) {
                                                metaData.style = "text-align:right;background-color:#B2FAC6";
                                            } else {
                                                metaData.style = "text-align:right;background-color:#B2FAC6;color:#ff0000";
                                            }
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDetSettlement').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.DISCAMOUIC_TOTAL, '0,000.00') + '<b>';
                                        }
                                    },
                                ]
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
                            {text: 'Number', dataIndex: 'CHGBNUM', width: 110},
                            {text: 'Reason Code', dataIndex: 'CODCHGBACK', width: 90},
                            {text: 'Description', dataIndex: 'CHAADJDES', width: 280,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:left;";
                                    metaData.tdAttr = 'data-qtip="' + record.data.CHAADJDES + '"';
                                    return value;
                                },
                            },
                            {text: 'Merch. Loc.', dataIndex: 'LMERCHID', width: 120,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:left;";
                                    return value;
                                },
                            },
                            {text: 'Seller ID', dataIndex: 'SELLERID', width: 70},
                            {
                                text: 'Amount', dataIndex: 'TGROSAMPAY_CB', width: 100,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;";
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
                                },
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridDetSettlement').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right; margin-right:3px ';
                                    return '<b>' + Ext.util.Format.number(data.totTGROSAMPAY_CB, '0,000.00') + '<b>';
                                }
                            },
                            {
                                text: 'Commission', dataIndex: 'SFEEAMOU_CB', width: 100,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;";
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
                                },
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridDetSettlement').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right; margin-right:3px ';
                                    return '<b>' + Ext.util.Format.number(data.totSFEEAMOU_CB, '0,000.00') + '<b>';
                                }
                            },
                            {
                                text: 'VAT', dataIndex: 'IVACOM12_CB', width: 100,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;";
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
                                },
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridDetSettlement').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right; margin-right:3px ';
                                    return '<b>' + Ext.util.Format.number(data.totIVACOM12_CB, '0,000.00') + '<b>';
                                }
                            },
                        ]
                    },
                    {
                        text: 'Net Amount<br>to Receive AM', dataIndex: 'NETOPAY', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        },
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            var data = Ext.getCmp(prototype.id + '-gridDetSettlement').getStore().getData().items[0].data;
                            metaData.style = 'text-align:right; margin-right:3px ';
                            return '<b>' + Ext.util.Format.number(data.totNETOPAY, '0,000.00') + '<b>';
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
                            var data = Ext.getCmp(prototype.id + '-gridDetSettlement').getStore().getData().items[0].data;
                            metaData.style = 'text-align:right; margin-right:3px ';
                            return '<b>' + Ext.util.Format.number(data.totDISCAMOSC, '0,000.00') + '<b>';
                        }
                    },
                    {
                        text: 'Rule', dataIndex: 'descFREGLA', width: 85,
                    },
                    {
                        text: 'Flag <br> Complement', dataIndex: 'descFCOMPL', width: 100,
                    },
                ]
            }
        }
    ]
});

