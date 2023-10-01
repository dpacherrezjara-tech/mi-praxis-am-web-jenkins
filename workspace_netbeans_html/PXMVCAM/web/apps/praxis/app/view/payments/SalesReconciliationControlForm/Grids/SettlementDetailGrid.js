Ext.define('Ext.Praxis.view.payments.SalesReconciliationControlForm.Grids.SettlementDetailGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-SettlementDetailGrid',
    requires: [
        'Ext.Praxis.controller.payments.SalesReconciliationControl.SettlementDetailGridController'
    ],
    controller: 'SettlementDetailGridController',
    maxHeight: prototype.height,
    minHeight: 200,
    height: 'auto',
    width: prototype.width,
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        markDirty: false,
        listeners: {
            refresh: function (dataview) {
                Ext.each(dataview.panel.columns, function (column) {
                    if (column.autoSizeColumn === true)
                        column.autoSize();
                });
            }
        }
    },
    columnLines: true,
    columns: {
        defaults: {
            align: 'center',
            menuDisabled: true,
            sortable: true
        },
        items: [
            //<editor-fold defaultstate="collapsed" desc="Detail Cols">
            {
                text: 'Proccessing<br>Date', width: 85, dataIndex: 'prda'
            },
            {
                text: 'Payment<br>Date', width: 85, dataIndex: 'paydate'
            },
            {
                text: 'Sales Date', dataIndex: 'transdate', width: 85
            },
            {
                text: 'Status',
                defaults: {
                    menuDisabled: true,
                    sortable: false,
                    align: 'center'
                },
                columns: [
                    {text: 'Reconciliation<br>Settlement', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;background-color:#C6E5B1;";
                            return 'Conciliate';
                        }
                    },
                    {text: 'Settlement<br>vs Sales', dataIndex: 'stval', width: 145,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            var data = record.data;
                            metaData.style = "text-align:left;";
                            //metaData.tdAttr = 'data-qtip="' + data.descSTVAL + '"';
                            return value;
                        }
                    }
                ]
            },
            {
                text: 'Processor', dataIndex: 'desc_PROCTYPE', width: 60
            },
            {
                text: 'Country', dataIndex: 'scountry', width: 80
            },
            {text: 'Qty<br>Tkts', dataIndex: 'qtytkt', width: 40,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;";
                    return value;
                }
            },
            {text: 'Invoice<br>Refer. Number<br>PNR', dataIndex: 'invoirn', width: 100,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    const {proctypesq, pwref} = record.data;
                    if (proctypesq === 'BANORTE00') {
                        value = pwref;
                    }
                    metaData.style = "text-align:center;";
                    return value;
                }
            },
            {text: 'PNR', dataIndex: 'spnr', width: 80,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;";
                    return  value;
                }
            },
            {
                text: 'Document<br>Type', dataIndex: 'transtype', width: 80
            },
            {text: 'Indust.Speci. <br> Ref.Nbr', dataIndex: 'isrefnbr', width: 120,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    return value;
                }
            },
            {text: 'Card Number', dataIndex: 'scardn', width: 140},
            {text: 'Auth.', dataIndex: 'sauthoc', width: 70},
            {text: 'Installment<br>Plan', dataIndex: 'nbrinsta', width: 90},
            {text: 'Installment<br>Number', dataIndex: 'instanbr', width: 90},
            {
                text: 'Sales<br>Amount', dataIndex: 'svfops', width: 100,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:right;";
                    value = Ext.util.Format.number(value, '0,000.00');
                    return value;
                }
            },
            {
                text: 'Transaction<br>Amount', dataIndex: 'tgrosampay', width: 100,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:right;background-color:#B2DAFA";
                    value = Ext.util.Format.number(value, '0,000.00');
                    return value;
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
                        text: 'Rate<br>Comm.', dataIndex: 'sfeerate', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2DAFA";
                            value = Ext.util.Format.number(value, '0,000.00 %');
                            return value;
                        }
                    },
                    {
                        text: 'Serv. Fee',
                        width: 90,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            const {transtype, servicfeep, adjusmentp} = record.data;
                            if (transtype === 'ADJU') {
                                value = adjusmentp;
                            } else {
                                value = 0;
                            }
                            metaData.style = "text-align:right;background-color:#B2DAFA;";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {
                        text: 'Accel.<br>Amount',
                        width: 90,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            const {transtype, servicfeep, acceamou} = record.data;
                            if (transtype !== 'ADJU' && transtype !== 'CHBK') {
                                value = servicfeep;
                            } else {
                                value = 0;
                            }
                            metaData.style = "text-align:right;background-color:#B2DAFA;";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {
                        text: 'Total<br>Comm.', dataIndex: 'acceamouc', width: 90,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2DAFA;";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {
                        text: 'VAT COMM<br>1 2', dataIndex: 'overcom12P', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2DAFA;";
                            const {transtype,overcom12P} = record.data;
                            if(transtype.trim()!=='CHBK'){
                                value = overcom12P;
                            }else{
                                value = 0;
                            }
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    }
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
                        text: 'Discount<br>Rate', dataIndex: 'discrate', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2DAFA";
                            value = Ext.util.Format.number(value, '0,000.00 %');
                            return value;
                        }
                    },
                    {
                        text: 'Discount<br>Amount', dataIndex: 'sfeeamou', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2DAFA";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {
                        text: 'Discount<br>Rate VAT', dataIndex: 'discratei', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2DAFA";
                            value = Ext.util.Format.number(value, '0,000.00 %');
                            return value;
                        }
                    },
                    {
                        text: 'Discount<br>Amount VAT', dataIndex: 'ivacom12', width: 90,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2DAFA";
                            const {transtype,ivacom12} = record.data;
                            if(transtype.trim()!=='CHBK'){
                                value = ivacom12;
                            }else{
                                value = 0;
                            }
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    }
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
                        text: 'Transaction <br> Amount', dataIndex: 'tgrosamouc', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            let data = record.data;
                            if (data.tgrosamoun >= data.tgrosamouc - 0.5 && data.tgrosamoun <= data.tgrosamouc + 0.5) {
                                metaData.style = "text-align:right;background-color:#B2FAC6";
                            } else {
                                metaData.style = "text-align:right;background-color:#B2FAC6;color:#ff0000";
                            }
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
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
                                text: 'Rate<br>Comm.', dataIndex: 'ratesfeec', width: 90,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    var data = record.data;
                                    if (Ext.util.Format.number(data.ratesfee, '0,000.00') !== Ext.util.Format.number(data.ratesfeec, '0,000.00')) {
                                        metaData.style = "text-align:right;background-color:#B2FAC6;color:#ff0000";
                                    } else {
                                        metaData.style = "text-align:right;background-color:#B2FAC6;";
                                    }
                                    value = Ext.util.Format.number(value, '0,000.00 %');
                                    return value;
                                }
                            },
                            {
                                text: 'Total<br>Comm.', dataIndex: 'sfeeamouc', width: 90,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    var data = record.data;
                                    if (data.acceamouc >= data.sfeeamouc - 0.5 && data.acceamouc <= data.sfeeamouc + 0.5) {
                                        metaData.style = "text-align:right;background-color:#B2FAC6";
                                    } else {
                                        metaData.style = "text-align:right;background-color:#B2FAC6;color:#ff0000";
                                    }
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
                                }
                            },
                            {
                                text: 'VAT COMM<br>1 2', dataIndex: 'vatcommsic', width: 90,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    var data = record.data;
                                    if (data.overcom12p >= data.vatcommsic - 0.5 && data.overcom12p <= data.vatcommsic + 0.5) {
                                        metaData.style = "text-align:right;background-color:#B2FAC6";
                                    } else {
                                        metaData.style = "text-align:right;background-color:#B2FAC6;color:#ff0000";
                                    }
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
                                }
                            }
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
                                text: 'Discount<br>Rate Comm.', dataIndex: 'discratec', width: 90,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    var data = record.data;
                                    if (Ext.util.Format.number(data.discrate, '0,000.00') !== Ext.util.Format.number(data.discratec, '0,000.00')) {
                                        metaData.style = "text-align:right;background-color:#B2FAC6;color:#ff0000";
                                    } else {
                                        metaData.style = "text-align:right;background-color:#B2FAC6;";
                                    }
                                    value = Ext.util.Format.number(value, '0,000.00 %');
                                    return value;
                                }
                            },
                            {
                                text: 'Discount<br>Amount Comm.', dataIndex: 'discamounc', width: 90,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    var data = record.data;
                                    if (data.discamoun >= data.discamounc - 0.5 && data.discamoun <= data.discamounc + 0.5) {
                                        metaData.style = "text-align:right;background-color:#B2FAC6";
                                    } else {
                                        metaData.style = "text-align:right;background-color:#B2FAC6;color:#ff0000";
                                    }
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
                                }
                            },
                            {
                                text: 'Discount<br>Rate VAT.', dataIndex: 'discrateic', width: 90,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    var data = record.data;
                                    if (Ext.util.Format.number(data.discratei, '0,000.00') !== Ext.util.Format.number(data.discrateic, '0,000.00')) {
                                        metaData.style = "text-align:right;background-color:#B2FAC6;color:#ff0000";
                                    } else {
                                        metaData.style = "text-align:right;background-color:#B2FAC6;";
                                    }
                                    value = Ext.util.Format.number(value, '0,000.00 %');
                                    return value;
                                }
                            },
                            {
                                text: 'Discount<br>Amount VAT', dataIndex: 'discamouic', width: 90,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    var data = record.data;
                                    if (data.DISCAMOUNI >= data.DISCAMOUIC - 0.5 && data.DISCAMOUNI <= data.DISCAMOUIC + 0.5) {
                                        metaData.style = "text-align:right;background-color:#B2FAC6";
                                    } else {
                                        metaData.style = "text-align:right;background-color:#B2FAC6;color:#ff0000";
                                    }
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
                                }
                            }
                        ]
                    }
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
                    {text: 'Number', dataIndex: 'chgbnum', width: 110},
                    {text: 'Reason Code', dataIndex: 'codchgback', width: 90},
//                    {text: 'Description', dataIndex: 'chaadjdes', width: 280,
//                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                            metaData.style = "text-align:left;";
//                            metaData.tdAttr = 'data-qtip="' + record.data.CHAADJDES + '"';
//                            return value;
//                        }
//                    },
                    {text: 'Merch. Loc.', dataIndex: 'lmerchid', width: 120,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:left;";
                            return value;
                        }
                    },
                    {text: 'Seller ID', dataIndex: 'sellerid', width: 70},
                    {
                        text: 'Amount', dataIndex: 'tgrosampay', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;";
                            const {transtype,tgrosampay} = record.data;
                            if(transtype.trim()==='CHBK'){
                                value = tgrosampay;
                            }else{
                                value = 0;
                            }
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {
                        text: 'Commission', dataIndex: 'sfeeamou', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;";
                            const {transtype,sfeeamou} = record.data;
                            if(transtype.trim()==='CHBK'){
                                value = sfeeamou;
                            }else{
                                value = 0;
                            }
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {
                        text: 'VAT', dataIndex: 'ivacom12', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;";
                            const {transtype,ivacom12} = record.data;
                            if(transtype.trim()==='CHBK'){
                                value = ivacom12;
                            }else{
                                value = 0;
                            }
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    }
                ]
            },
            {
                text: 'Net Amount<br>to Receive AM', dataIndex: 'netopay', width: 100,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:right;";
                    value = Ext.util.Format.number(value, '0,000.00');
                    return value;
                }
            },
            {
                text: 'Currency<br>Settlement', dataIndex: 'pcurrency', width: 80,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;background-color:#FCF6DC";
                    return value;
                }
            },
            {
                text: 'Calculated<br>Commission ', dataIndex: 'discamosc', width: 100,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:right;";
                    value = Ext.util.Format.number(value, '0,000.00');
                    return value;
                }
            },
            {
                text: 'Rule', dataIndex: 'fregla', width: 85
            },
            {
                text: 'Flag <br> Complement', dataIndex: 'fcompl', width: 100
            }
            //</editor-fold>
        ]
    },
    tbar: {
        layout: {
            pack: 'end'
        },
        defaults: {
            scale: 'medium'
        },
        items: [
            {
                xtype: 'button',
                iconCls: 'prx-icon-excel',
                scale: 'small',
                tooltip: 'Export to Excel',
                listeners: {
                    click: 'downloadExcel'
                }
            },
            {
                xtype: 'button',
                scale: 'small',
                hidden: true,
                iconCls: 'prx-icon-back',
                width: 25,
                tooltip: 'Back',
                listeners: {
                    click: function (btn) {
                        const panel = btn.up().up().up();
                        const views = panel.items.items;
                        views.at(-1).destroy();
                        views.at(-1).show();
                    }
                }
            }
        ]
    },
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true
    }
});


