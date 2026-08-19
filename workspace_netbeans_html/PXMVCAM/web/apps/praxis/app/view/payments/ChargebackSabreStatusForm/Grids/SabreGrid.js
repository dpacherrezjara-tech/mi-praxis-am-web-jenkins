Ext.define('Ext.Praxis.view.payments.ChargebackSabreStatusForm.Grids.SabreGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-sabreGrid',
    requires: [
        'Ext.Praxis.controller.payments.ChargebackSabreStatus.SabreGridController',
        'Ext.Praxis.view.payments.ChargebackSabreStatusForm.DataEntrys.PNRDataEntry'
    ],
    controller: 'SabreGridController',
    //title: 'Chargeback',
    //titleAlign: 'center',
    height: 'auto',
    minHeight:300,
    width: prototype.width,
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
            //<editor-fold defaultstate="collapsed" desc="Sabre Cols">

            {text: 'Date', dataIndex: 'sfecha', width: 70},

            {
                text: 'Sales<br>Date', dataIndex: 'saledate', width: 70
            },
            {
                text: 'IATA', dataIndex: 'agente', width: 70
            },
            {
                text: 'PNR', dataIndex: 'pnr', width: 65,
                listeners: {
                    click: 'searchPNR'
                },
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;text-decoration:underline;cursor:pointer;color:#057ECB";
                    return value;
                }
            },
            {
                text: 'Merchant', dataIndex: 'merchn', width: 80
            },
            {
                text: 'Status', dataIndex: 'stval', width: 130,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    //var data = record.data;
                    const opts = {
                        '1': 'Stand By',
                        '2': 'Sent Office',
                        '3': 'Link Document',
                        '4': 'Sent Bank',
                        '5': 'Chargeback',
                        '6': 'Reverse Chargeback'
                    };
                    //metaData.style = "text-align:center;background:" + data.COLOR;
                    return opts[value] || value;
                }
            },
            {
                text: 'Chargeback <br> Number', dataIndex: 'folio', width: 120
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
                        text: 'Code', dataIndex: 'scarcod', width: 45,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            var data = record.data;
                            metaData.style = "text-align:center;background:" + data.COLOR;
                            return value;
                        }
                    },
                    {
                        text: 'Number', dataIndex: 'cardnbr', width: 125,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            var data = record.data;
                            metaData.style = "text-align:center;background:" + data.COLOR;
                            return value;
                        }
                    },
                    {
                        text: 'Auth', dataIndex: 'authnbr', width: 60,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            var data = record.data;
                            metaData.style = "text-align:center;background:" + data.COLOR;
                            return value;
                        }
                    },
                    {
                        text: 'Curr', dataIndex: 'mfop', width: 50,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            var data = record.data;
                            metaData.style = "text-align:center;background:" + data.COLOR;
                            return value;
                        }
                    },
                    {
                        text: 'Chargeback<br>Amount', dataIndex: 'autamount', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            var data = record.data;
                            metaData.style = "text-align:right;background:" + data.COLOR;
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {
                        text: 'Ticket<br>Amount', dataIndex: 'vfop', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            var data = record.data;
                            metaData.style = "text-align:right;background:" + data.COLOR;
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    }
                ]
            },
            {
                text: 'Ticket', dataIndex: 'ticket', width: 110,
                listeners: {
                    click: 'onViewTicket'
                },
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "background-color:#FCF6DC;text-align:center;text-decoration:underline;cursor:pointer;color:#057ECB";
                    return value;
                }
            },
            {
                text: 'Indicator<br>Cpns Sales', dataIndex: 'indcpn', width: 80
            },
            {
                text: 'Used Praxis',
                columns: [
                    {
                        text: 'First',
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            align: 'center',
                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                metaData.style = "background-color:#d5f4d5;font-weight:bolder;";
                                return value;
                            }
                        },
                        columns: [
                            {
                                text: 'C1', dataIndex: 'usopxcp1', width: 35
                            },
                            {
                                text: 'C2', dataIndex: 'usopxcp2', width: 35
                            },
                            {
                                text: 'C3', dataIndex: 'usopxcp3', width: 35
                            },
                            {
                                text: 'C4', dataIndex: 'usopxcp4', width: 35
                            }
                        ]
                    },
                    {
                        text: 'Last',
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            align: 'center',
                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                metaData.style = "background-color:#d5f4d5;font-weight:bolder;";
                                return value;
                            }
                        },
                        columns: [
                            {
                                text: 'C1', dataIndex: 'usopxcp1', width: 35
                            },
                            {
                                text: 'C2', dataIndex: 'usopxcp2', width: 35
                            },
                            {
                                text: 'C3', dataIndex: 'usopxcp3', width: 35
                            },
                            {
                                text: 'C4', dataIndex: 'usopxcp4', width: 35
                            }
                        ]
                    }
                ]
            },
            {
                text: 'Used Sabre',
                defaults: {
                    menuDisabled: true,
                    sortable: false,
                    align: 'center'
                },
                columns: [
                    {
                        text: 'First',
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            align: 'center'
                        },
                        columns: [
                            {
                                text: 'C1', dataIndex: 'usosbcp1', width: 60,
                                renderer: 'renderUsosFirst'
                            },
                            {
                                text: 'C2', dataIndex: 'usosbcp2', width: 60,
                                renderer: 'renderUsosFirst'
                            },
                            {
                                text: 'C3', dataIndex: 'usosbcp3', width: 60,
                                renderer: 'renderUsosFirst'
                            },
                            {
                                text: 'C4', dataIndex: 'usosbcp4', width: 60,
                                renderer: 'renderUsosFirst'
                            },
                            {
                                text: 'Date', dataIndex: 'datsabf', width: 80,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    //metaData.style = "text-align:center;background-color:#b2e1ff;";
                                    return value;
                                }
                            }
                        ]
                    },
                    {
                        text: 'Date<br>Application', dataIndex: 'dataplica', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;background-color:#b2e1ff;";
                            return value;
                        }
                    },
                    {
                        text: 'Last',
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            align: 'center',
                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                metaData.style = "background-color:#b2e1ff;font-weight:bolder;";
                                return value;
                            }
                        },
                        columns: [
                            {
                                text: 'C1', dataIndex: 'usosbulcp1', width: 60,
                                renderer: 'renderUsosLast'
                            },
                            {
                                text: 'C2', dataIndex: 'usosbulcp2', width: 60,
                                renderer: 'renderUsosLast'
                            },
                            {
                                text: 'C3', dataIndex: 'usosbulcp3', width: 60,
                                renderer: 'renderUsosLast'
                            },
                            {
                                text: 'C4', dataIndex: 'usosbulcp4', width: 60,
                                renderer: 'renderUsosLast'
                            },
                            {
                                text: 'Date', dataIndex: 'datsabl', width: 80,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    //metaData.style = "text-align:center;background-color:#b2e1ff;";
                                    return value;
                                }
                            }
                        ]
                    }
                ]
            },
            {
                text: 'Used Sabre Post 20 Days',
                defaults: {
                    menuDisabled: true,
                    sortable: false,
                    align: 'center'
                },
                columns: [
                    {
                        text: 'Uses',
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            align: 'center'
                        },
                        columns: [
                            {
                                text: 'C1', dataIndex: 'stusucp1', width: 60,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "background-color:#FEF9B2;font-weight:bolder;";
                                    return value;
                                }
                            },
                            {
                                text: 'C2', dataIndex: 'stusucp2', width: 60,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "background-color:#FEF9B2;font-weight:bolder;";
                                    return value;
                                }
                            },
                            {
                                text: 'C3', dataIndex: 'stusucp3', width: 60,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "background-color:#FEF9B2;font-weight:bolder;";
                                    return value;
                                }
                            },
                            {
                                text: 'C4', dataIndex: 'stusucp4', width: 60,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "background-color:#FEF9B2;font-weight:bolder;";
                                    return value;
                                }
                            },
                            {
                                text: 'Praxis ST.', dataIndex: 'statuspx', width: 80,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "background-color:#FEF9B2;font-weight:bolder;";
                                    return value;
                                }
                            },
                            {
                                text: 'Sabre ST.', dataIndex: 'statsbre', width: 100,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "background-color:#FEF9B2;font-weight:bolder;";
                                    let option = record.data.statsbre;
                                    const opts = {
                                        'R': () => {
                                            metaData.style = "background-color:#FF5555;font-weight:bolder;";
                                        }
                                    };
                                    if (opts[option])
                                        opts[option]();
                                    return value;
                                }
                            },
                            {
                                text: 'Sabre<br>ST. 20 Days', dataIndex: 'statsbr1', width: 100,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "background-color:#FEF9B2;font-weight:bolder;";
                                    let option = record.data.statsbr1;
                                    const opts = {
                                        'R': () => {
                                            metaData.style = "background-color:#FF5555;font-weight:bolder;";
                                        }
                                    };
                                    if (opts[option])
                                        opts[option]();
                                    return value;
                                }
                            }
                        ]
                    }
                ]
            },
            {
                text: 'Flag<br>Exchange', dataIndex: 'fselecx', width: 70,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;background-color:#CFDE1B;";
                    const opts = {
                        '0': 'No Exchange',
                        '2': 'Exchange'
                    };
                    return opts[value] || 'Pending';
                }
            },
            {
                text: 'Accounting',
                defaults: {
                    menuDisabled: true,
                    sortable: false,
                    align: 'center'
                },
                columns: [
                    {
                        text: 'ID', dataIndex: 'idcon', width: 80
                    },
                    {
                        text: 'Date', dataIndex: 'fcont', width: 80
                    },
                ]
            },
            {
                text: 'Rule',
                defaults: {
                    menuDisabled: true,
                    sortable: false,
                    align: 'center'
                },
                columns: [
                    {
                        text: 'Policy', dataIndex: 'crule', width: 80
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


