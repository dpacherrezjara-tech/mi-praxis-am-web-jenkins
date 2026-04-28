Ext.define('Ext.Praxis.view.payments.SalesReconciliationControlForm.Grids.SettlementMerchantGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-SettlementMerchantGrid',
    requires: [
        'Ext.Praxis.controller.payments.SalesReconciliationControl.SettlementMerchantGridController'
    ],
    controller: 'SettlementMerchantGridController',
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
    features: [
        {
            ftype: 'summary' // Agrega la característica de resumen al grid
        }
    ],
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
                    const {PRDA, PAYDATE} = record.data;
                    if (PAYDATE) {
                        value = PAYDATE;
                    } else {
                        value = PRDA;
                    }
                    return value;
                }
            },
            {
                text: 'Merchant ID', dataIndex: 'PMERCHID', width: 120,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;text-decoration:underline;cursor:pointer;";
                    metaData.style += "font-weight:bolder;color:#057ECB;";
                    return value;
                },
                listeners: {
                    click: 'onClickMerchant'
                }

            },
            {
                text: 'Processor', dataIndex: 'DESC_PROCTYPE', width: 200,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    //metaData.style = "text-align:center;background-color:#FCF6DC";
                    return value;
                }
            },
            {
                text: 'Country', dataIndex: 'SCOUNTRY', width: 65,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    //metaData.style = "text-align:center;background-color:#FCF6DC";
                    return value;
                }
            },
            {
                text: 'Qty<br>Transactions', dataIndex: 'QTYTRN', width: 85,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    return Ext.util.Format.number(value, '0,000');
                },
                summaryType: 'sum',
                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                    metaData.style = 'text-align:center;font-weight:bold;';
                    value = Ext.util.Format.number(value, '0,000');
                    return value;
                }
            },
            {
                text: 'Currency', dataIndex: 'SCURRENCY', width: 70,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    //metaData.style = "text-align:center;background-color:#FCF6DC";
                    return value;
                }
            },
            {
                text: 'Total<br>Amount', dataIndex: 'TGROSAMOUN', width: 100,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:right;background-color:#B2DAFA";
                    value = Ext.util.Format.number(value, '0,000.00');
                    return value;
                },
                summaryType: 'sum',
                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                    metaData.style = 'text-align:right;font-weight:bold;';
                    return Ext.util.Format.number(value, '0,000.00');
                }
            },
            {
                text: 'GROSS<br>Amount', dataIndex: 'TGROSAMOUN_WCA', width: 130,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:right;background-color:#B2DAFA";
                    return Ext.util.Format.number(value, '0,000.00');
                },
                summaryType: 'sum',
                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                    metaData.style = 'text-align:right;font-weight:bold;';
                    return Ext.util.Format.number(value, '0,000.00');
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
                    {
                        text: 'Amount', dataIndex: 'DISCAMOUN', width: 90,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2DAFA";
                            return Ext.util.Format.number(value, '0,000.00');
                        },
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = 'text-align:right;font-weight:bold;';
                            return Ext.util.Format.number(value, '0,000.00');
                        }
                    },
                    {
                        text: 'VAT', dataIndex: 'DISCAMOUNI', width: 90,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2DAFA";
                            return Ext.util.Format.number(value, '0,000.00');
                        },
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = 'text-align:right;font-weight:bold;';
                            return Ext.util.Format.number(value, '0,000.00');
                        }
                    }
                ]
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
                        text: 'Serv. Fee',
                        dataIndex: 'SERVICEFEE',
                        width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2DAFA";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        },
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = 'text-align:right;font-weight:bold;';
                            return Ext.util.Format.number(value, '0,000.00');
                        }
                    },
                    {
                        text: 'Serv. Fee<br>VAT', dataIndex: 'OVERCOM12', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2DAFA";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        },
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = 'text-align:right;font-weight:bold;';
                            return Ext.util.Format.number(value, '0,000.00');
                        }
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
                    {
                        text: 'Amount', dataIndex: 'TGROSAMOUN_CB', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2DAFA";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        },
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = 'text-align:right;font-weight:bold;';
                            return Ext.util.Format.number(value, '0,000.00');
                        }
                    },
                    {
                        text: 'Commission', dataIndex: 'DISCAMOUN_CB', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2DAFA";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        },
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = 'text-align:right;font-weight:bold;';
                            return Ext.util.Format.number(value, '0,000.00');
                        }
                    },
                    {
                        text: 'VAT', dataIndex: 'DISCAMOUNI_CB', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2DAFA";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        },
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = 'text-align:right;font-weight:bold;';
                            return Ext.util.Format.number(value, '0,000.00');
                        }
                    }
                ]
            },
            {
                text: 'Adjustment',
                defaults: {
                    menuDisabled: true,
                    sortable: false,
                    align: 'center'
                },
                columns: [
                    {
                        text: 'Amount', dataIndex: 'ADJUSTMENT', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2DAFA";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        },
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = 'text-align:right;font-weight:bold;';
                            return Ext.util.Format.number(value, '0,000.00');
                        }
                    },
                    {
                        text: 'Commission', dataIndex: 'DISCAMOUN_ADJ', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2DAFA";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        },
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = 'text-align:right;font-weight:bold;';
                            return Ext.util.Format.number(value, '0,000.00');
                        }
                    },
                    {
                        text: 'VAT', dataIndex: 'DISCAMOUNI_ADJ', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2DAFA";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        },
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = 'text-align:right;font-weight:bold;';
                            return Ext.util.Format.number(value, '0,000.00');
                        }
                    }
                ]
            },
            {
                text: 'TAX', dataIndex: 'TAX', width: 100,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:right;background-color:#B2DAFA";
                    value = Ext.util.Format.number(value, '0,000.00');
                    return value;
                },
                summaryType: 'sum',
                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                    metaData.style = 'text-align:right;font-weight:bold;';
                    return Ext.util.Format.number(value, '0,000.00');
                }
            },
            {
                text: 'Net Amount',
                dataIndex: 'NETAMOUN',
                width: 130,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:right;background-color:#B2DAFA";
                    value = Ext.util.Format.number(value, '0,000.00');
                    return value;
                },
                summaryType: 'sum',
                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                    metaData.style = 'text-align:right;font-weight:bold;';
                    return Ext.util.Format.number(value, '0,000.00');
                }
            },
            {
                text: 'Payment Information',
                defaults: {
                    menuDisabled: true,
                    sortable: false,
                    align: 'center'
                },
                columns: [
                    {
                        text: 'Currency', dataIndex: 'PCURRENCY', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;background-color:#FCF6DC";
                            return value;
                        }
                    },
                    {
                        text: 'Total<br>Amount', dataIndex: 'TGROSAMPAY', width: 130,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#FCF6DC";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        },
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = 'text-align:right;font-weight:bold;';
                            return Ext.util.Format.number(value, '0,000.00');
                        }
                    },
                    {
                        text: 'GROSS<br>Amount', dataIndex: 'TGROSAMPAY_WCA', width: 130,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#FCF6DC";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        },
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = 'text-align:right;font-weight:bold;';
                            return Ext.util.Format.number(value, '0,000.00');
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
                            {
                                text: 'Amount', dataIndex: 'SFEEAMOU', width: 90,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;background-color:#FCF6DC";
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
                                },
                                summaryType: 'sum',
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    metaData.style = 'text-align:right;font-weight:bold;';
                                    return Ext.util.Format.number(value, '0,000.00');
                                }
                            },
                            {
                                text: 'VAT', dataIndex: 'IVACOM12', width: 90,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;background-color:#FCF6DC";
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
                                },
                                summaryType: 'sum',
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    metaData.style = 'text-align:right;font-weight:bold;';
                                    return Ext.util.Format.number(value, '0,000.00');
                                }
                            }
                        ]
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
                                text: 'Serv. Fee',
                                dataIndex: 'SERVICFEEP',
                                width: 100,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;background-color:#FCF6DC";
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
                                },
                                summaryType: 'sum',
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    metaData.style = 'text-align:right;font-weight:bold;';
                                    return Ext.util.Format.number(value, '0,000.00');
                                }
                            },
                            {
                                text: 'Serv. Fee<br>VAT', dataIndex: 'OVERCOM12P', width: 100,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;background-color:#FCF6DC";
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return value;
                                },
                                summaryType: 'sum',
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    metaData.style = 'text-align:right;font-weight:bold;';
                                    return Ext.util.Format.number(value, '0,000.00');
                                }
                            }
                        ]
                    },
                    {
                        text: 'TAX', dataIndex: 'TAXP', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#FCF6DC";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        },
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = 'text-align:right;font-weight:bold;';
                            return Ext.util.Format.number(value, '0,000.00');
                        }
                    },
                    {
                        text: 'Net Amount<br>to Receive AM',
                        dataIndex: 'NETOPAY',
                        width: 130,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#FCF6DC";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        },
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                            metaData.style = 'text-align:right;font-weight:bold;';
                            return Ext.util.Format.number(value, '0,000.00');
                        }
                    }
                ]
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
                //hidden: true,
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
    }
});


