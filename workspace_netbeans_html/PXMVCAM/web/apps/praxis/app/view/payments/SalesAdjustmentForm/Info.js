Ext.define('Ext.Praxis.view.payments.SalesAdjustmentForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    style: 'margin: 1px;',
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
                height: 700,
                align: 'center'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelMain',
                    bodyStyle: 'background-color: #E3EAEF;',
                    padding: '1',
                    margin: '1',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        // --------------------------   GRID MAIN DATA---------------------
                        //-----------------------------------------------------------------
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxAdjustment',
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
                                    id: prototype.id + '-gridAdjustment',
                                    width: 1750,
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
                                                text: 'Payment',
                                                id: prototype.id + '-htDateErrorTransaction',
                                                hidden: false,
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'DATE', width: 85,
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
                                                    {text: 'Merchant ID', dataIndex: 'MERCHID', width: 80,
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
                                            {text: 'Document<br>Type', dataIndex: 'descTDOC', width: 70,
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
                                                    {text: 'Description', dataIndex: 'DES_SMERCHANT', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;background-color:#FCF6DC";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Flag<br>Complement', dataIndex: 'descFCOMPL', width: 90, hidden: true,
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
                                                    {text: 'Invoice <br> Refer. Number<br>PNR', dataIndex: 'INVORNBR', width: 95,
                                                        listeners: {
                                                            click: 'onViewPNR'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;background-color:#FCF6DC";
                                                            return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    },
                                                    {text: 'PNR', dataIndex: 'SPNR', width: 65,
                                                        listeners: {
                                                            click: 'onViewPNRbySPNR'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    },
                                                    {text: 'Indust.Speci. <br> Ref.Nbr<br>TKT', dataIndex: 'ISREFNBR', width: 120,
                                                        listeners: {
                                                            click: 'viewTicket'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            value = '<b>' + value + '</b>';
                                                            metaData.style = "text-align:center;background-color:#FCF6DC";
                                                            return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
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
                                                    {text: 'Sales<br>Date', dataIndex: 'BSUMDATE', width: 80,
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
                                                text: 'Sub.Gros.<br>Amoun P.Cur', dataIndex: 'GROSAMOUN', width: 100, hidden: true,
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
                                                text: 'Transaction <br> Amount', dataIndex: 'TGROSAMOUN', width: 90,
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
                                                    return '<b>' + Ext.util.Format.number(data.TGROSAMOUN_TOTAL, '0,000.00') + '<b>';
                                                }
                                            },
                                            {text: 'MSI', hidden: true,
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
                                                            var data = Ext.getCmp(prototype.id + '-gridMainErrorTransaction').getStore().getData().items[0].data;
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
                                                            var data = Ext.getCmp(prototype.id + '-gridMainErrorTransaction').getStore().getData().items[0].data;
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
                                                            var data = Ext.getCmp(prototype.id + '-gridMainErrorTransaction').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.ACCEAMOUC_TOTAL, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Commission Base', hidden: true,
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
                                                            var data = Ext.getCmp(prototype.id + '-gridMainErrorTransaction').getStore().getData().items[0].data;
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
                                                            var data = Ext.getCmp(prototype.id + '-gridMainErrorTransaction').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.DISCAMOUNI_TOTAL, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Result Reconciliation Transaction', hidden: true,
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
                                                            var data = Ext.getCmp(prototype.id + '-gridMainErrorTransaction').getStore().getData().items[0].data;
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
                                                                    var data = Ext.getCmp(prototype.id + '-gridMainErrorTransaction').getStore().getData().items[0].data;
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
                                                                    var data = Ext.getCmp(prototype.id + '-gridMainErrorTransaction').getStore().getData().items[0].data;
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
                                                                    var data = Ext.getCmp(prototype.id + '-gridMainErrorTransaction').getStore().getData().items[0].data;
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
//                                                            return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
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
//                                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Flag <br> Complement', dataIndex: 'descFCOMPL', width: 100, hidden: true,
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
                                                        text: 'Description', dataIndex: 'DES_CERROR', width: 210,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Auth<br>RFND', dataIndex: '', width: 100,
                                            },
                                            {
                                                sortable: false,
                                                xtype: 'actioncolumn',
                                                width: 40,
                                                text: 'Edit',
                                                align: 'center',
                                                hidden:true,
                                                items: [
                                                    {
                                                        iconCls: 'prx-icon-edit',
                                                        tooltip: 'Edit',
                                                        handler: 'onEditClick'
                                                    }
                                                ]
                                            },
                                        ]
                                    }
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


