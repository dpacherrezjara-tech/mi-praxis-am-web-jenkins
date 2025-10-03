Ext.define('Ext.Praxis.view.payments.SalesComplementForm.Grids.PlusgradeGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-PlusgradeGrid',
    requires:[
      'Ext.Praxis.controller.payments.SalesComplement.PlusgradeGridController'  
    ],
    controller: 'PlusgradeGridController',
    minHeight: 200,
    height: 'auto',
    width: 1700,
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        markDirty: false
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
//            {
//                text: 'RN', dataIndex: 'RN', width: 50
//            },
            {
                text: 'RN',
                locked: true,
                dataIndex: 'RN',
                xtype: 'rownumberer', // Columna de número de fila
                width: 40 // Ancho de la columna de número de fila (ajusta según tus necesidades)
            },
            {
                text: 'Plusgrade ID', dataIndex: 'PLUSGRAID', width: 85
            },
            {
                text: 'Merchant', dataIndex: 'MERCHID', width: 110
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
                        text: 'Date', dataIndex: 'PRDA', width: 90
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
                        text: 'Days', dataIndex: 'PASSED_DAYS', width: 55,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            if (value > 15) {
                                metaData.style = "color:#de2828";
                            }
                            return value;
                        },
                    }
                ]
            },
//            {
//                text: 'Plusgrade',
//                defaults: {
//                    menuDisabled: true,
//                    sortable: false,
//                    align: 'center'
//                },
//                columns: [
//                    {
//                        text: 'VS AMEX', dataIndex: 'DESCFAMEX', width: 80
//                    },
//                    {
//                        text: 'VS Sales', dataIndex: 'DESCSTVAL', width: 80
//                    },
//                ]
//            },
            {
                text: 'Plusgrade VS AMEX',
                defaults: {
                    menuDisabled: true,
                    sortable: false,
                    align: 'center'
                },
                columns: [
                    {
                        text: 'Status', dataIndex: 'DESCFAMEX', width: 80
                    },
                    {
                        text: 'Date', dataIndex: 'AMEXFECSELEC', width: 80
                    }
                ]
            },
            {
                text: 'Plusgrade VS Sales',
                defaults: {
                    menuDisabled: true,
                    sortable: false,
                    align: 'center'
                },
                columns: [
                    {
                        text: 'Status', dataIndex: 'DESCSTVAL', width: 80
                    },
                    {
                        text: 'Date', dataIndex: 'DESCVSSALES', width: 80
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
                        text: 'Country', dataIndex: 'COUNTRY', width: 70,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "background-color:#8ac6eb";
                            return value;
                        },
                    },
                    {
                        text: 'Date', dataIndex: 'SDATE', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "background-color:#8ac6eb";
                            return value;
                        },
                    }
                ]
            },
            {
                text: 'Credit Card',
                defaults: {
                    menuDisabled: true,
                    sortable: false,
                    align: 'center'
                },
                columns: [
                    {
                        text: 'Code', dataIndex: 'SCARCOD', width: 70,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "background-color:#8ac6eb";
                            return value;
                        },
                    },
                    {
                        text: 'Number', dataIndex: 'SCARDN', width: 120,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "background-color:#8ac6eb";
                            return value;
                        },
                    },
                    {
                        text: 'Auth.', dataIndex: 'SAUTHOC', width: 70,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "background-color:#8ac6eb";
                            return value;
                        },
                    },
                ]
            },
            {
                text: 'Qty<br>Pax', dataIndex: 'NBROFPAX', width: 40,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;background-color:#8ac6eb";

                    return Ext.util.Format.number(value, '0,000');
                },
            },
            {
                text: 'Currency',
                defaults: {
                    menuDisabled: true,
                    sortable: false,
                    align: 'center'
                },
                columns: [
                    {
                        text: 'Offer', dataIndex: 'CUROFFER', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "background-color:#8ac6eb";
                            return value;
                        },
                    },
                ]
            },
            {
                text: 'Total',
                defaults: {
                    menuDisabled: true,
                    sortable: false,
                    align: 'center'
                },
                columns: [
                    {
                        text: 'Amount', dataIndex: 'SVFOP', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#8ac6eb";
                            return Ext.util.Format.number(value, '0,000.00');
                        },
                    },
                ]
            },
            {
                text: 'Total <br> Amount Off', dataIndex: 'AMOUNTOFF', width: 80,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:right;background-color:#8ac6eb";
                    return Ext.util.Format.number(value, '0,000.00');
                },
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
                        text: 'Amount', dataIndex: 'SVFOPS', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;";
                            return Ext.util.Format.number(value, '0,000.00');
                        },
                    },
                    {
                        text: 'Difference', dataIndex: 'DIFF_AMOUNT', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            if (value != 0) {
                                metaData.style = "text-align:right;background-color:#f57373";
                            } else {
                                metaData.style = "text-align:right;";
                            }

                            return Ext.util.Format.number(value, '0,000.00');
                        },
                    },
                    {
                        text: 'Country', dataIndex: 'SCOUNTRY', width: 70
                    },
                    {
                        text: 'Date', dataIndex: 'SDATES', width: 90,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            return value;
                        },
                    }
                ]
            },
            {text: 'Qty<br>Tkts', dataIndex: 'QTYTKT', width: 40,
//                listeners: {
//                    click: 'onClickTktDetail'
//                },
//                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                    metaData.style = "text-align:center;text-decoration:underline;color:#057ECB;cursor:pointer";
//                    return value;
//                }
            },
            {
                text: 'Plusgrade',
                defaults: {
                    menuDisabled: true,
                    sortable: false,
                    align: 'center'
                },
                columns: [
                    {
                        text: 'VS Chargeback', dataIndex: 'DESCFAMEXCHG', width: 100
                    },
                ]
            },
            {
                text: 'PNR', dataIndex: 'PNR', width: 80, 
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    //metaData.style = "text-align:center;text-decoration:underline;color:#057ECB;cursor:pointer";
                    value = '<b>' + value + '</b>';
                    return value;
                }
            },
            {
                sortable: false,
                xtype: 'actioncolumn',
                width: 50,
                text: 'Copy',
                align: 'center',
                items: [
                    {
                        iconCls: 'prx-icon-image-log',
                        tooltip: 'copy SPNR',
                        handler: 'copySPNR'
                    }
                ]
            },
            {
                text: 'EMD',
                defaults: {
                    menuDisabled: true,
                    sortable: false,
                    align: 'center'
                },
                columns: [
                    {
                        text: 'Number', dataIndex: 'EMDNUMBER', width: 100,
                        listeners: {
                            click: 'onClickSearchTicket'
                        }, renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;text-decoration:underline;color:#057ECB;cursor:pointer";
                            value = '<b>' + value + '</b>';
                            return value;
                        }
                    },
                ]
            },
            {
                text: 'Accounting',
                id: prototype.id + '-plusAccounting',
                defaults: {
                    menuDisabled: true,
                    sortable: false,
                    align: 'center'
                },
                columns: [
                    {
                        text: 'ID Sales FLEX', dataIndex: 'IDCONFLE', width: 250
                    },
                    {
                        text: 'Date', dataIndex: 'FCONT', width: 100
                    },
                    {
                        text: 'ID', dataIndex: 'IDCON', width: 250
                    }
                ]
            },
            {
                text: 'Error',
                defaults: {
                    menuDisabled: true,
                    sortable: false,
                    align: 'center'
                },
                columns: [
                    {text: 'Code', dataIndex: 'CERROR', width: 70},
                    {
                        text: 'Description', dataIndex: 'DES_CERROR', width: 270,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:left";
                            return value;
                        }
                    }
                ]
            },
            {
                text: 'Add Pax',
                id: prototype.id + '-plusAddPax',
                defaults: {
                    menuDisabled: true,
                    sortable: false,
                    align: 'center'
                },
                columns: [
                    {
                        text: 'EMD Number', dataIndex: 'ADDPAXEMD', width: 280
                    },
                    {
                        text: 'Ticket Number', dataIndex: 'ADDPAXTKT', width: 280
                    },
                ]
            },
            {
                text: 'Token', dataIndex: 'PAYTOKEN', width: 150,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    value = '<b>' + value + '</b>';
                    metaData.style = "text-align:center;";
                    return value;
                }
            },
            {
                text: 'Updated',
                defaults: {
                    menuDisabled: true,
                    sortable: false,
                    align: 'center'
                },
                columns: [
                    { text: 'User', dataIndex: 'USUP', width: 80 },
                    { text: 'Date', dataIndex: 'FEUP', width: 80 }
                ]
            },
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
                    click: 'downloadExcelPlusgrade'
                }
            },
        ]
    },
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true
    }
});


