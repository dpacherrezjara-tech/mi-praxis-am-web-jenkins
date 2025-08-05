/* 
 * @Dvicente
 */

Ext.define('Ext.Praxis.view.payments.SalesComplementForm.GridData', {
    extend: 'Ext.panel.Panel',
    height: 605,
    width: 1800,
    layout: 'fit',
    config: {
        searchParams: null,
        searchUrl: null,
        gridType: null
    },
    items: [],
    listeners: {
        afterrender: function () {
            this.getDataStore(this.gridType);
        }
    },
    margin: '0 10 0 20',
    initComponent: function () {
        const me = this;
        me.titleAlign = 'center';
        const opts = {
            'P': () => {
                //<editor-fold defaultstate="collapsed" desc="plusgrade grid">
                me.title = 'Plusgrade';
                let panelPlusgrade = Ext.create('Ext.grid.Panel', {
                    id: prototype.id + '-grid-plusgrade-01',
                    height: 605,
                    width: 1800,
                    features: [
                        {
                            dock: 'bottom',
                            ftype: 'summary',
                        }
                    ],
                    viewConfig: {
                        stripeRows: true,
                        enableTextSelection: true,
                        markDirty: false,
                    },
                    columnLines: true,
                    columns: {
                        defaults: {
                            align: 'center',
                            menuDisabled: true,
                            sortable: true,
                        },
                        items: [
                            //<editor-fold defaultstate="collapsed" desc="columnas plusgrade">
                            {
                                text: 'Plusgrade ID', dataIndex: 'plusgraid', width: 85
                            },
                            {
                                text: 'Merchant', dataIndex: 'merchid', width: 90
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
                                        text: 'Date', dataIndex: 'prda', width: 90
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
                                        text: 'Days', dataIndex: 'passed_DAYS', width: 55,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            if (value > 15) {
                                                metaData.style = "color:#de2828";
                                            }
                                            return value;
                                        },
                                    }
                                ]
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
                                        text: 'VS AMEX', dataIndex: 'descFAMEX', width: 80
                                    },
                                    {
                                        text: 'VS Sales', dataIndex: 'descSTVAL', width: 80
                                    },
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
                                        text: 'Country', dataIndex: 'country', width: 70,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "background-color:#8ac6eb";
                                            return value;
                                        },
                                    },
                                    {
                                        text: 'Date', dataIndex: 'sdate', width: 80,
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
                                        text: 'Code', dataIndex: 'scarcod', width: 70,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "background-color:#8ac6eb";
                                            return value;
                                        },
                                    },
                                    {
                                        text: 'Number', dataIndex: 'scardn', width: 120,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "background-color:#8ac6eb";
                                            return value;
                                        },
                                    },
                                    {
                                        text: 'Auth.', dataIndex: 'sauthoc', width: 70,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "background-color:#8ac6eb";
                                            return value;
                                        },
                                    },
                                ]
                            },
                            {
                                text: 'Qty<br>Pax', dataIndex: 'nbrofpax', width: 40,
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
                                        text: 'Offer', dataIndex: 'curoffer', width: 80,
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
                                        text: 'Amount', dataIndex: 'svfop', width: 80,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#8ac6eb";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        },
                                    },
                                ]
                            },
                            {
                                text: 'Total <br> Amount Off', dataIndex: 'amountoff', width: 80,
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
                                        text: 'Amount', dataIndex: 'svfops', width: 80,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        },
                                    },
                                    {
                                        text: 'Difference', dataIndex: 'diff_AMOUNT', width: 80,
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
                                        text: 'Country', dataIndex: 'scountry', width: 70
                                    },
                                    {
                                        text: 'Date', dataIndex: 'sdates', width: 90,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            return value;
                                        },
                                    }
                                ]
                            },
                            {text: 'Qty<br>Tkts', dataIndex: 'qtytkt', width: 40,
                                listeners: {
                                    click: 'onClickTktDetail'
                                },
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:center;text-decoration:underline;color:#057ECB;cursor:pointer";
                                    return value;
                                }
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
                                        text: 'VS Chargeback', dataIndex: 'descFAMEXCHG', width: 100
                                    },
                                ]
                            },
                            {
                                text: 'PNR', dataIndex: 'pnr', width: 80,
                                listeners: {
                                    click: 'onViewPNR'
                                }, renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:center;text-decoration:underline;color:#057ECB;cursor:pointer";
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
                                        text: 'Number', dataIndex: 'emdnumber', width: 100,
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
                                        text: 'ID Sales FLEX', dataIndex: 'idconfle', width: 250
                                    },
                                    {
                                        text: 'Date', dataIndex: 'fcont', width: 100
                                    },
                                    {
                                        text: 'ID', dataIndex: 'idcon', width: 250
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
                                    {text: 'Code', dataIndex: 'cerror', width: 70},
                                    {
                                        text: 'Description', dataIndex: 'des_CERROR', width: 270,
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
                                        text: 'EMD Number', dataIndex: 'addpaxemd', width: 280
                                    },
                                    {
                                        text: 'Ticket Number', dataIndex: 'addpaxtkt', width: 280
                                    },
                                ]
                            },
                            {
                                text: 'Token', dataIndex: 'paytoken', width: 140,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    value = '<b>' + value + '</b>';
                                    metaData.style = "text-align:center;";
                                    return value;
                                }
                            },
                                    //</editor-fold>
                        ]
                    },
                    bbar: Ext.create('Ext.toolbar.Paging', {
                        id: prototype.id + `-plusgrade-paggin01`,
                        displayInfo: true, // display additional information like "Displaying x of y items"
                    })
                });
                //</editor-fold>
                me.items = panelPlusgrade;
            },
            'L': () => {
                //<editor-fold defaultstate="collapsed" desc="ligas grid">
                me.title = 'Ligas de Pago';
                let panelLigas = Ext.create('Ext.grid.Panel', {
                    id: prototype.id + '-grid-ligas-01',
                    height: 580,
                    width: 1800,
                    features: [
                        {
                            dock: 'bottom',
                            ftype: 'summary',
                        }
                    ],
                    viewConfig: {
                        stripeRows: true,
                        enableTextSelection: true,
                        markDirty: false,
                    },
                    columnLines: true,
                    columns: {
                        defaults: {
                            align: 'center',
                            menuDisabled: true,
                            sortable: true,
                        },
                        items: [
                            //<editor-fold defaultstate="collapsed" desc="ligas columnas">
                            {
                                text: 'Operation',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Number', dataIndex: 'operatnbr', width: 100
                                    },
                                ]
                            },
                            {
                                text: 'Merchant', dataIndex: 'merchid', width: 90
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
                                        text: 'Date', dataIndex: 'prda', width: 100
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
                                        text: 'Days', dataIndex: 'passed_DAYS', width: 60,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            if (value > 15) {
                                                metaData.style = "color:#de2828";
                                            }
                                            return value;
                                        },
                                    }
                                ]
                            },
                            {
                                text: 'Ligas',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'VS AMEX', dataIndex: 'descFAMEX', width: 80
                                    },
                                    {
                                        text: 'VS Sales', dataIndex: 'descSTVAL', width: 80, hidden: true
                                    },
                                ]
                            },
                            {
                                text: 'Sales',
                                id: prototype.id + '-adgTitFechaTablet',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Date', dataIndex: 'sdate', width: 90
                                    },
                                    {
                                        text: 'Time', dataIndex: 'stime', width: 90
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
                                        text: 'Name', dataIndex: 'namecard', width: 90
                                    },
                                    {
                                        text: 'Number', dataIndex: 'scardn', width: 100
                                    },
                                    {
                                        text: 'Auth.', dataIndex: 'sauthoc', width: 100
                                    }
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
                                        text: 'Amount', dataIndex: 'svfop', width: 80,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        },
                                    },
                                ]
                            },
                            {
                                text: 'Issuing',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Bank', dataIndex: 'bancoemi', width: 140
                                    },
                                ]
                            },
                            {
                                text: 'PNR', dataIndex: 'pnr', width: 80,
                                listeners: {
                                    click: 'onViewPNR'
                                }, renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:center;text-decoration:underline;color:#057ECB;cursor:pointer";
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
                                text: 'Accounting',
                                id: prototype.id + '-LigaAccounting',
                                hidden: true,
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Date', dataIndex: 'fcont', width: 100
                                    },
                                    {
                                        text: 'ID', dataIndex: 'idcon', width: 100
                                    },
                                ]
                            },
                            {
                                text: 'Tickets',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: '1', dataIndex: 'ticket1', width: 100
                                    },
                                    {
                                        text: '2', dataIndex: 'ticket2', width: 100
                                    },
                                    {
                                        text: '3', dataIndex: 'ticket3', width: 100
                                    },
                                    {
                                        text: '4', dataIndex: 'ticket4', width: 100
                                    },
                                    {
                                        text: '5', dataIndex: 'ticket5', width: 100
                                    },
                                    {
                                        text: '6', dataIndex: 'ticket6', width: 100
                                    },
                                    {
                                        text: '7', dataIndex: 'ticket7', width: 100
                                    },
                                    {
                                        text: '8', dataIndex: 'ticket8', width: 100
                                    },
                                    {
                                        text: '9', dataIndex: 'ticket9', width: 100
                                    },
                                    {
                                        text: '10', dataIndex: 'ticket10', width: 100
                                    },
                                ]
                            },
                                    //</editor-fold>
                        ]
                    },
                    bbar: Ext.create('Ext.toolbar.Paging', {
                        id: prototype.id + `-ligas-paggin01`,
                        displayInfo: true, // display additional information like "Displaying x of y items"
                    })
                });
                //</editor-fold>
                me.items = panelLigas;
            },
            'T': () => {
                //<editor-fold defaultstate="collapsed" desc="tablet grid">
                me.title = 'Tablets';
                let panelTablet = Ext.create('Ext.grid.Panel', {
                    id: prototype.id + '-grid-tablet-01',
                    height: 580,
                    width: 1800,
                    features: [
                        {
                            dock: 'bottom',
                            ftype: 'summary',
                        }
                    ],
                    viewConfig: {
                        stripeRows: true,
                        enableTextSelection: true,
                        markDirty: false,
                    },
                    columnLines: true,
                    columns: {
                        defaults: {
                            align: 'center',
                            menuDisabled: true,
                            sortable: true,
                        },
                        items: [
                            //<editor-fold defaultstate="collapsed" desc="tablet columnas">
                            {
                                text: 'Operation',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Number', dataIndex: 'operatnbr', width: 100
                                    },
                                ]
                            },
                            {
                                text: 'Merchant', dataIndex: 'merchid', width: 90
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
                                        text: 'Date', dataIndex: 'prda', width: 100
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
                                        text: 'Days', dataIndex: 'passed_DAYS', width: 60,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            if (value > 15) {
                                                metaData.style = "color:#de2828";
                                            }
                                            return value;
                                        },
                                    }
                                ]
                            },
                            {
                                text: 'Tablet',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'VS AMEX', dataIndex: 'descFAMEX', width: 80
                                    },
                                    {
                                        text: 'VS Sales', dataIndex: 'descSTVAL', width: 80, hidden: true
                                    },
                                ]
                            },
                            {
                                text: 'Sales',
                                id: prototype.id + '-adgTitFechaLiga',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Date', dataIndex: 'sdate', width: 90
                                    },
                                    {
                                        text: 'Time', dataIndex: 'stime', width: 90
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
                                        text: 'Name', dataIndex: 'namecard', width: 90
                                    },
                                    {
                                        text: 'Number', dataIndex: 'scardn', width: 100
                                    },
                                    {
                                        text: 'Auth.', dataIndex: 'sauthoc', width: 100
                                    }
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
                                        text: 'Amount', dataIndex: 'svfop', width: 80,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        },
                                    },
                                ]
                            },
                            {
                                text: 'Issuing',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Bank', dataIndex: 'bancoemi', width: 140
                                    },
                                ]
                            },
                            {
                                text: 'PNR', dataIndex: 'pnr', width: 80,
                                listeners: {
                                    click: 'onViewPNR'
                                }, renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:center;text-decoration:underline;color:#057ECB;cursor:pointer";
                                    value = '<b>' + value + '</b>';
                                    return value;
                                }
                            },
                            {
                                text: 'Accounting',
                                id: prototype.id + '-TabletAccounting',
                                hidden: true,
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Date', dataIndex: 'fcont', width: 100
                                    },
                                    {
                                        text: 'ID', dataIndex: 'idcon', width: 100
                                    },
                                ]
                            },
                            {
                                text: 'Tickets',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: '1', dataIndex: 'ticket1', width: 100
                                    },
                                    {
                                        text: '2', dataIndex: 'ticket2', width: 100
                                    },
                                    {
                                        text: '3', dataIndex: 'ticket3', width: 100
                                    },
                                    {
                                        text: '4', dataIndex: 'ticket4', width: 100
                                    },
                                    {
                                        text: '5', dataIndex: 'ticket5', width: 100
                                    },
                                    {
                                        text: '6', dataIndex: 'ticket6', width: 100
                                    },
                                    {
                                        text: '7', dataIndex: 'ticket7', width: 100
                                    },
                                    {
                                        text: '8', dataIndex: 'ticket8', width: 100
                                    },
                                    {
                                        text: '9', dataIndex: 'ticket9', width: 100
                                    },
                                    {
                                        text: '10', dataIndex: 'ticket10', width: 100
                                    },
                                ]
                            },
                                    //</editor-fold>
                        ]
                    },
                    bbar: Ext.create('Ext.toolbar.Paging', {
                        id: prototype.id + `-tablet-paggin01`,
                        displayInfo: true, // display additional information like "Displaying x of y items"
                    })
                });
                //</editor-fold>
                me.items = panelTablet;
            }
        };
        opts[me.gridType]();
        //me.items = opts[me.gridType]();
        me.callParent(arguments);
    },
    getDataStore: function (gridType) {
        const me = this;
        me.mask('Loading Data...');
        const storeOpts = {
            'P': () => {
                win.lblUser_toolTip("Estructura: A4453");
                //<editor-fold defaultstate="collapsed" desc="plusgrade store">
                let plusgradeStore = Ext.create('Ext.data.Store', {
                    storeId: prototype.id + `-plusgrade-store`,
                    loadMask: true,
                    pageSize: 20,
                    proxy: {
                        type: 'ajax',
                        enablePaging: true,
                        url: me.searchUrl,
                        extraParams: me.searchParams,
                        timeout: 600000,
                        reader: {
                            type: 'json',
                            rootProperty: 'result',
                            totalProperty: 'total'
                        }
                    },
                    autoLoad: true,
                    listeners: {
                        load: function (store, records, successful, operation) {
                            if (!successful) {
                                global.Msg({msg: 'Data not Found'});
                            } else {
                                if (records.length === 0) {
                                    global.Msg({msg: 'Data not Found'});
                                }
                            }
                        }
                    }
                });
                //</editor-fold>
                return {
                    id: prototype.id + '-grid-plusgrade-01',
                    store: plusgradeStore,
                    paggin: prototype.id + `-plusgrade-paggin01`
                };
            },
            'L': () => {
                win.lblUser_toolTip("Estructura: A4454");
                //<editor-fold defaultstate="collapsed" desc="ligas store">
                let ligasStore = Ext.create('Ext.data.Store', {
                    storeId: prototype.id + `-ligas-store`,
                    loadMask: true,
                    pageSize: 20,
                    proxy: {
                        type: 'ajax',
                        enablePaging: true,
                        url: me.searchUrl,
                        extraParams: me.searchParams,
                        timeout: 600000,
                        reader: {
                            type: 'json',
                            rootProperty: 'result',
                            totalProperty: 'total'
                        }
                    },
                    autoLoad: true,
                    listeners: {
                        load: function (store, records, successful, operation) {
                            if (!successful) {
                                global.Msg({msg: 'Data not Found'});
                                //console.log(records);
                            } else {
                                if (records.length === 0) {
                                    global.Msg({msg: 'Data not Found'});
                                }
                            }
                        }
                    }
                });
                //</editor-fold>
                return {
                    id: prototype.id + '-grid-ligas-01',
                    store: ligasStore,
                    paggin: prototype.id + `-ligas-paggin01`
                };
            },
            'T': () => {
                win.lblUser_toolTip("Estructura: A4454");
                //<editor-fold defaultstate="collapsed" desc="tablet store">
                let tabletStore = Ext.create('Ext.data.Store', {
                    storeId: prototype.id + `-tablet-store`,
                    loadMask: true,
                    pageSize: 20,
                    proxy: {
                        type: 'ajax',
                        enablePaging: true,
                        url: me.searchUrl,
                        extraParams: me.searchParams,
                        timeout: 600000,
                        reader: {
                            type: 'json',
                            rootProperty: 'result',
                            totalProperty: 'total'
                        }
                    },
                    autoLoad: true,
                    listeners: {
                        load: function (store, records, successful, operation) {
                            if (!successful) {
                                global.Msg({msg: 'Data not Found'});
                                //console.log(records);
                            } else {
                                if (records.length === 0) {
                                    global.Msg({msg: 'Data not Found'});
                                }
                            }
                        }
                    }
                });
                //</editor-fold>
                return {
                    id: prototype.id + '-grid-tablet-01',
                    store: tabletStore,
                    paggin: prototype.id + `-tablet-paggin01`
                };
            },
            'M': () => {
                win.lblUser_toolTip("Estructura: A4775");
                //<editor-fold defaultstate="collapsed" desc="tablet store">
                let tabletStore = Ext.create('Ext.data.Store', {
                    storeId: prototype.id + `-MIT-store`,
                    loadMask: true,
                    pageSize: 20,
                    proxy: {
                        type: 'ajax',
                        enablePaging: true,
                        url: me.searchUrl,
                        extraParams: me.searchParams,
                        timeout: 600000,
                        reader: {
                            type: 'json',
                            rootProperty: 'result',
                            totalProperty: 'total'
                        }
                    },
                    autoLoad: true,
                    listeners: {
                        load: function (store, records, successful, operation) {
                            if (!successful) {
                                global.Msg({msg: 'Data not Found'});
                                //console.log(records);
                            } else {
                                if (records.length === 0) {
                                    global.Msg({msg: 'Data not Found'});
                                }
                            }
                        }
                    }
                });
                //</editor-fold>
                return {
                    id: prototype.id + '-grid-tablet-01',
                    store: tabletStore,
                    paggin: prototype.id + `-MIT-paggin01`
                };
            },
        };
        let selectedGrid = storeOpts[gridType]();
        //console.log(selectedGrid);
        Ext.getCmp(selectedGrid.id).setStore(selectedGrid.store);
        Ext.getCmp(selectedGrid.paggin).setStore(selectedGrid.store);
        me.unmask();
    }
});

