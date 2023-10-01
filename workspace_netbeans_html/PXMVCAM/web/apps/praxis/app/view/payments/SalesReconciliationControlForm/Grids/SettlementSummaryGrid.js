Ext.define('Ext.Praxis.view.payments.SalesReconciliationControlForm.Grids.SettlementSummaryGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-SettlementSummaryGrid',
    requires: [
        'Ext.Praxis.controller.payments.SalesReconciliationControl.SettlementSummaryGridController'
    ],
    controller: 'SettlementSummaryGridController',
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
                text: 'Date',
                width: 80,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    const {prda, paydate} = record.data;
                    if (paydate) {
                        value = paydate;
                    } else {
                        value = prda;
                    }
                    metaData.style = "text-align:center;text-decoration:underline;cursor:pointer;";
                    metaData.style += "font-weight:bolder;color:#057ECB;";
                    return value;
                },
                listeners:{
                    click:'onClickDate'
                }
            },
            {
                text: 'Processor', dataIndex: 'desc_PROCTYPE', width: 90, flex: 1,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    //metaData.style = "text-align:center;background-color:#FCF6DC";
                    return value;
                }
            },
            {
                text: 'Country', dataIndex: 'scountry', width: 70,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    //metaData.style = "text-align:center;background-color:#FCF6DC";
                    return value;
                }
            },
            {
                text: 'Currency', dataIndex: 'pcurrency', width: 70,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    //metaData.style = "text-align:center;background-color:#FCF6DC";
                    return value;
                }
            },
            {
                text: 'GROSS<br>Amount', dataIndex: 'tgrosampay', width: 100,
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
                        text: 'Amount', dataIndex: 'sfeeamou', width: 90,
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
                        text: 'VAT', dataIndex: 'ivacom12', width: 90,
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
                    const {transtype, servicfeep, adjusmentp} = record.data;
                    if (transtype === 'ADJU') {
                        value = adjusmentp;
                    } else {
                        value = servicfeep;
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
                    const {transtype, servicfeep, acceamou} = record.data;
                    if (transtype !== 'ADJU' && transtype !== 'CHBK') {
                        value = servicfeep;
                    } else {
                        value = acceamou;
                    }
                    metaData.style = "text-align:right;background-color:#B2DAFA";
                    value = Ext.util.Format.number(value, '0,000.00');
                    return value;
                }
            },
            {
                text: 'VAT COMM<br>1+2', dataIndex: 'overcom12P', width: 100,
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
                        text: 'Amount', dataIndex: 'tgrosampay_CB', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2DAFA";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {
                        text: 'Commission', dataIndex: 'sfeeamou_CB', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2DAFA";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {
                        text: 'VAT', dataIndex: 'ivacom12_CB', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2DAFA";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                ]
            },
            {
                text: 'Net Amount<br>to Receive AM', dataIndex: 'netamoun', width: 100,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:right;background-color:#B2DAFA";
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
//            {
//                text: 'Reconciled<br>Net Amount', dataIndex: 'netamounc', width: 100,
//                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                    metaData.style = "text-align:right;background-color:#B2FAC6";
//                    value = Ext.util.Format.number(value, '0,000.00');
//                    return value;
//                }
//            }
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
            },
            {
                xtype: 'button',
                iconCls: 'prx-icon-excel',
                scale: 'small',
                tooltip: 'Export to Excel',
                listeners: {
                    click: 'downloadExcel'
                }
            }
        ]
    },
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true
    }
});


