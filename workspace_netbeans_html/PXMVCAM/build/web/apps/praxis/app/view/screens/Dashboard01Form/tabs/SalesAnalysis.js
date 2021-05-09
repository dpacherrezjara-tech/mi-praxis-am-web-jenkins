Ext.define('Ext.Praxis.view.screens.Dashboard01Form.tabs.SalesAnalysis', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-SalesAnalysis',
    requires: [
        'Ext.Praxis.controller.screens.Dashboard01.tabs.SalesAnalysisController'
    ],
    controller: 'SalesAnalysisController',
//    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
//    bodyStyle: 'background: transparent;',
    defaults: {
        bodyStyle: 'background: transparent;'
//        border: false
    },
    items: [
        {
            region: 'center',
            id: prototype.id + '-boxPrincipalSales',
            height: 680,
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                align: 'center'
            },
//            items: [
//                {
//                    xtype: 'panel',
//                    id: prototype.id + '-panelMain',
//                    bodyStyle: 'background-color: #E3EAEF;',
//                    layout: {
//                        type: 'vbox',
//                        align: 'center'
//                    },
                    items: [
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxMainData',
                            width: '100%',
                            hidden: false,
                            layout: {
                                type: 'hbox',
                                align: 'center',
                                pack: 'center'
                            },
                            defaults: {
                                bodyStyle: 'background: transparent;',
                                border: false,
                                align: 'center',
                                margin: "0 15 0 0"  // (top, right, bottom, left)
                            },
                            items: [
                                // <editor-fold defaultstate="collapsed" desc="gridData">
                                {
                                    xtype: 'panel',
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridData',
                                            width: 1412,
                                            columnLines: true,
                                             margin: "5 0 0 0",
        //                                    features: [{
        //                                        ftype: 'summary'
        //                                    }],
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {
                                                        text: 'Sales',
        //                                                id: prototype.id + '-adgTitFecha',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Date', dataIndex: 'strFormatDate', width: 100,
                                                                listeners: {
                                                                    click: 'GridDDTMtotalperMonth_colHandler'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;";
                                                                    value = '<b>' + value + '</b>';
                                                                    return '<a href="#screens-dashboard-01-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Total',
        //                                                id: prototype.id + '-adgSalDate',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Cpns', dataIndex: 'CUPONS', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                },
        //                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
        //                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore();
        //                                                            console.log(data);
        //                                                            metaData.style = 'text-align:right; margin-right:3px ';
        //                                                            return '<b>' + Ext.util.Format.number(data.lngTotQMATCH, '0,000') + '<b>';
        //                                                        }
                                                            },
                                                            {
                                                                text: 'USD', dataIndex: 'AMOUNT', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: 'AVG', dataIndex: 'TARIFA', width: 60,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return  value;
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'ON LINE',
        //                                                id: prototype.id + '-adgSalDate',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Cpns', dataIndex: 'CUPONS_ON', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: '%', dataIndex: 'CUPONS_ON_PERCENT', width: 50,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: 'USD', dataIndex: 'AMOUNT_ON', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: '%', dataIndex: 'AMOUNT_ON_PERCENT', width: 50,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: 'AVG', dataIndex: 'AMOUNT_ON_AVG_RATE', width: 60,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return  value;
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'OFF LINE',
        //                                                id: prototype.id + '-adgSalDate',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Cpns', dataIndex: 'CUPONS_OFF', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: '%', dataIndex: 'CUPONS_OFF_PERCENT', width: 50,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: 'USD', dataIndex: 'AMOUNT_OFF', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: '%', dataIndex: 'AMOUNT_OFF_PERCENT', width: 50,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: 'AVG', dataIndex: 'AMOUNT_OFF_AVG_RATE', width: 60,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return  value;
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'NON REVENUE',
        //                                                id: prototype.id + '-adgSalDate',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Cpns', dataIndex: 'QCPNS0', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#b6d8ee;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: 'USD', dataIndex: 'AMOUNT0', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#b6d8ee;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: '', dataIndex: 'FLAG', width: 20,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            if (value === '1')
                                                                return '<img src="resources/img/botones/check.png">';
                                                            else
                                                                return '<img src="resources/img/botones/restricted_folder_symbol_stop-16.png">';
                                                        }
                                                    },
                                                    {
                                                        text: '  ',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Comment', dataIndex: 'COMENTARIO', width: 110}
                                                        ]
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-summaryMain',
                                            width: 1412,
                                            align: 'left',
                                            margin: '0 0 0 0 ',
                                            layout: {
                                                type: 'hbox',
                                                align: 'center'
                                            },
                                            defaults: {
                                                xtype: 'label',
                                                align: 'center',
                                                html: '' + '&nbsp',
                                                height: 25,
                                                padding: '5 5 5 0',
                                                style: 'background:#A0BFD3;color:#244066;text-align:right;font-weight:bold;border: 0.3px #4A6371 solid;font-size:10px'
                                            },
                                            items: [
                                                {width: 100},
                                                {width: 100, id: prototype.id + '-lblTotalCpns'},
                                                {width: 100, id: prototype.id + '-lblTotalAmount'},
                                                {width: 60, id: prototype.id + '-totAVG'},
                                                {width: 100, id: prototype.id + '-lblTotalCpnON'},
                                                {width: 50, id: prototype.id + '-lblTotalCpnONPerc'},
                                                {width: 100, id: prototype.id + '-lblTotalAmountON'},
                                                {width: 50, id: prototype.id + '-lblTotalAmountONPerc'},
                                                {width: 60, id: prototype.id + '-lblTotalAvgON'},
                                                {width: 100, id: prototype.id + '-lblTotalCpnOFF'},
                                                {width: 50, id: prototype.id + '-lblTotalCpnOFFPerc'},
                                                {width: 100, id: prototype.id + '-lblTotalAmountOFF'},
                                                {width: 50, id: prototype.id + '-lblTotalAmountOFFPerc'},
                                                {width: 60, id: prototype.id + '-lblTotalAvgOFF'},
                                                {width: 100, id: prototype.id + '-lblTotalQCPNSNR'},
                                                {width: 100, id: prototype.id + '-lblTotalAMOUNTNR'},
                                                {width: 20},
                                                {width: 110}
                                            ]
                                        }
                                    ]
                                }

                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-BoxDDTMCountryofSale',
                            width: '100%',
                            hidden: true,
                            layout: {
                                type: 'hbox',
                                align: 'center',
                                pack: 'center'
                            },
                            defaults: {
                                bodyStyle: 'background: transparent;',
                                border: false,
                                align: 'center',
                                margin: "0 15 0 0"  // (top, right, bottom, left)
                            },
                            items: [
                                // <editor-fold defaultstate="collapsed" desc="gridData">
                                {
                                    xtype: 'panel',
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridCountryofSale',
                                            width: 804,
                                            height: 510,
                                            columnLines: true,
                                             margin: "5 0 0 0",
        //                                    features: [{
        //                                        ftype: 'summary'
        //                                    }],
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {
                                                        text: 'Nbr.', dataIndex: 'RN', width: 50,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "color:#057ECB;";
                                                            return '<b>' + value + '</b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Country of Sale',dataIndex: 'COUNTRY_NAME', width: 200, id: prototype.id + '-lbl_Country',
                                                        listeners: {
                                                            click: 'GridDDTMDetailbyAgent_colHandler'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:left";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#screens-dashboard-01-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Coupons', dataIndex: 'CUPONS', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return '<b>' + value + '</b>';
                                                        },
//                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore();
//                                                            console.log(data);
//                                                            metaData.style = 'text-align:right; margin-right:3px ';
//                                                            return '<b>' + Ext.util.Format.number(data.lngTotQMATCH, '0,000') + '<b>';
//                                                        }
                                                    },
                                                    {
                                                        text: '%', dataIndex: 'CUPONS_PERCENT', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return '<b>' + value + '</b>';
                                                        },
//                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore();
//                                                            console.log(data);
//                                                            metaData.style = 'text-align:right; margin-right:3px ';
//                                                            return '<b>' + Ext.util.Format.number(data.lngTotQMATCH, '0,000') + '<b>';
//                                                        }
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'AMOUNT', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return '<b>' + value + '</b>';
                                                        },
//                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore();
//                                                            console.log(data);
//                                                            metaData.style = 'text-align:right; margin-right:3px ';
//                                                            return '<b>' + Ext.util.Format.number(data.lngTotQMATCH, '0,000') + '<b>';
//                                                        }
                                                    },
                                                    {
                                                        text: '%', dataIndex: 'AMOUNT_PERCENT', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return '<b>' + value + '</b>';
                                                        },
//                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore();
//                                                            console.log(data);
//                                                            metaData.style = 'text-align:right; margin-right:3px ';
//                                                            return '<b>' + Ext.util.Format.number(data.lngTotQMATCH, '0,000') + '<b>';
//                                                        }
                                                    },
                                                    {
                                                        text: 'Avg', dataIndex: 'TARIFA', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return '<b>' + value + '</b>';
                                                        },
//                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore();
//                                                            console.log(data);
//                                                            metaData.style = 'text-align:right; margin-right:3px ';
//                                                            return '<b>' + Ext.util.Format.number(data.lngTotQMATCH, '0,000') + '<b>';
//                                                        }
                                                    },
                                                    {
                                                        text: 'NON REVENUE',
        //                                                id: prototype.id + '-adgSalDate',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Cpns', dataIndex: 'QCPNS0', width: 70,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#b6d8ee;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                },
        //                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
        //                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore();
        //                                                            console.log(data);
        //                                                            metaData.style = 'text-align:right; margin-right:3px ';
        //                                                            return '<b>' + Ext.util.Format.number(data.lngTotQMATCH, '0,000') + '<b>';
        //                                                        }
                                                            },
                                                            {
                                                                text: 'USD', dataIndex: 'AMOUNT0', width: 70,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#b6d8ee;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-summaryCountryofSale',
                                            width: 804,
                                            align: 'left',
                                            margin: '0 0 0 0 ',
                                            layout: {
                                                type: 'hbox',
                                                align: 'center'
                                            },
                                            defaults: {
                                                xtype: 'label',
                                                align: 'center',
                                                html: '' + '&nbsp',
                                                height: 25,
                                                padding: '5 5 5 0',
                                                style: 'background:#A0BFD3;color:#244066;text-align:right;font-weight:bold;border: 0.3px #4A6371 solid;font-size:10px'
                                            },
                                            items: [
                                                {width: 250},
                                                {width: 100, id: prototype.id + '-lblCUPON'},
                                                {width: 60, text: '100%'},
                                                {width: 100, id: prototype.id + '-lblAMOUNT'},
                                                {width: 60, text: '100%'},
                                                {width: 80, id: prototype.id + '-lblTARIFA'},
                                                {width: 70, id: prototype.id + '-lblTotalDC_QCPNSNR'},
                                                {width: 70, id: prototype.id + '-lblTotalDC_AMOUNTNR'}
                                            ]
                                        }
                                    ]
                                }

                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-BoxDDTMDetailbyAgent',
                            width: '100%',
                            hidden: true,
                            layout: {
                                type: 'hbox',
                                align: 'center',
                                pack: 'center'
                            },
                            defaults: {
                                bodyStyle: 'background: transparent;',
                                border: false,
                                align: 'center',
                                margin: "0 15 0 0"  // (top, right, bottom, left)
                            },
                            items: [
                                // <editor-fold defaultstate="collapsed" desc="gridData">
                                {
                                    xtype: 'panel',
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridDetailbyAgent',
                                            width: 904,
//                                            height: 510,
                                            columnLines: true,
                                             margin: "5 0 0 0",
        //                                    features: [{
        //                                        ftype: 'summary'
        //                                    }],
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {
                                                        text: 'Nbr.', dataIndex: 'RN', width: 50,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "color:#057ECB;";
                                                            return '<b>' + value + '</b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Agent', dataIndex: 'VENDOR', width: 100,
//                                                        listeners: {
//                                                            click: 'OnViewDetailbyCoupon'
//                                                        },
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "color:#057ECB;text-align:center";
//                                                            value = '<b>' + value + '</b>';
//                                                            return '<a href="#screens-dashboard-01-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
//                                                        }
                                                    },
                                                    {
                                                        text: 'Agent Name',dataIndex: 'strDescription', width: 200,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:left";
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescription + '"';
                                                            value = '<b>' + value + '</b>';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Coupons', dataIndex: 'CUPONS', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return '<b>' + value + '</b>';
                                                        },
//                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore();
//                                                            console.log(data);
//                                                            metaData.style = 'text-align:right; margin-right:3px ';
//                                                            return '<b>' + Ext.util.Format.number(data.lngTotQMATCH, '0,000') + '<b>';
//                                                        }
                                                    },
                                                    {
                                                        text: '%', dataIndex: 'CUPONS_PERCENT', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return '<b>' + value + '</b>';
                                                        },
//                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore();
//                                                            console.log(data);
//                                                            metaData.style = 'text-align:right; margin-right:3px ';
//                                                            return '<b>' + Ext.util.Format.number(data.lngTotQMATCH, '0,000') + '<b>';
//                                                        }
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'AMOUNT', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return '<b>' + value + '</b>';
                                                        },
//                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore();
//                                                            console.log(data);
//                                                            metaData.style = 'text-align:right; margin-right:3px ';
//                                                            return '<b>' + Ext.util.Format.number(data.lngTotQMATCH, '0,000') + '<b>';
//                                                        }
                                                    },
                                                    {
                                                        text: '%', dataIndex: 'AMOUNT_PERCENT', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return '<b>' + value + '</b>';
                                                        },
//                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore();
//                                                            console.log(data);
//                                                            metaData.style = 'text-align:right; margin-right:3px ';
//                                                            return '<b>' + Ext.util.Format.number(data.lngTotQMATCH, '0,000') + '<b>';
//                                                        }
                                                    },
                                                    {
                                                        text: 'Avg', dataIndex: 'TARIFA', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return '<b>' + value + '</b>';
                                                        },
//                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore();
//                                                            console.log(data);
//                                                            metaData.style = 'text-align:right; margin-right:3px ';
//                                                            return '<b>' + Ext.util.Format.number(data.lngTotQMATCH, '0,000') + '<b>';
//                                                        }
                                                    },
                                                    {
                                                        text: 'NON REVENUE',
        //                                                id: prototype.id + '-adgSalDate',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Cpns', dataIndex: 'QCPNS0', width: 70,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#b6d8ee;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                },
        //                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
        //                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore();
        //                                                            console.log(data);
        //                                                            metaData.style = 'text-align:right; margin-right:3px ';
        //                                                            return '<b>' + Ext.util.Format.number(data.lngTotQMATCH, '0,000') + '<b>';
        //                                                        }
                                                            },
                                                            {
                                                                text: 'USD', dataIndex: 'AMOUNT0', width: 70,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#b6d8ee;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-summaryDetailbyAgent',
                                            width: 904,
                                            align: 'left',
                                            margin: '0 0 0 0 ',
                                            layout: {
                                                type: 'hbox',
                                                align: 'center'
                                            },
                                            defaults: {
                                                xtype: 'label',
                                                align: 'center',
                                                html: '' + '&nbsp',
                                                height: 25,
                                                padding: '5 5 5 0',
                                                style: 'background:#A0BFD3;color:#244066;text-align:right;font-weight:bold;border: 0.3px #4A6371 solid;font-size:10px'
                                            },
                                            items: [
                                                {width: 350},
                                                {width: 100, id: prototype.id + '-lblCUPON_Ag'},
                                                {width: 60, text: '100%'},
                                                {width: 100, id: prototype.id + '-lblAMOUNT_Ag'},
                                                {width: 60, text: '100%'},
                                                {width: 80, id: prototype.id + '-lblTARIFA_Ag'},
                                                {width: 70, id: prototype.id + '-lblTotalDA_QCPNSNR'},
                                                {width: 70, id: prototype.id + '-lblTotalDA_AMOUNTNR'}
                                            ]
                                        }
                                    ]
                                }

                            ]
                        },
//                      --------------------  add BoxDDTMDetailbyAgentSL   -----------------------------
                        {
                            xtype: 'panel',
                            id: prototype.id + '-BoxCountryOfSale',
                            width: '100%',
                            hidden: true,
                            layout: {
                                type: 'hbox',
                                align: 'center',
                                pack: 'center'
                            },
                            defaults: {
                                bodyStyle: 'background: transparent;',
                                border: false,
                                align: 'center',
                                margin: "0 15 0 0"  // (top, right, bottom, left)
                            },
                            items: [
                                // <editor-fold defaultstate="collapsed" desc="gridData">
                                {
                                    xtype: 'panel',
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridCountryOfSale',
                                            width: 1384,
                                            height: 510,
                                            columnLines: true,
                                            margin: "5 0 0 0",
        //                                    features: [{
        //                                        ftype: 'summary'
        //                                    }],
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {
                                                        text: 'Nbr.', dataIndex: 'RN', width: 50,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "color:#057ECB;";
                                                            return '<b>' + value + '</b>';
                                                        }
                                                    },
                                                    {
                                                        text: '',
        //                                                id: prototype.id + '-adgSalDate',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Country',dataIndex: 'COUNTRY_NAME', width: 200,
                                                                listeners: {
                                                                    click: 'GridDDTMtotalperMonth_colHandler'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:left";
                                                                    value = '<b>' + value + '</b>';
                                                                    return '<a href="#screens-dashboard-01-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Cpns', dataIndex: 'CUPONS', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                },
        //                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
        //                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore();
        //                                                            console.log(data);
        //                                                            metaData.style = 'text-align:right; margin-right:3px ';
        //                                                            return '<b>' + Ext.util.Format.number(data.lngTotQMATCH, '0,000') + '<b>';
        //                                                        }
                                                            },
                                                            {
                                                                text: '%', dataIndex: 'CUPONS_AVG', width: 50,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: 'USD', dataIndex: 'AMOUNT', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: '%', dataIndex: 'AMOUNT_AVG_RATE', width: 50,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return  value;
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'ON LINE',
        //                                                id: prototype.id + '-adgSalDate',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Cpns', dataIndex: 'CUPONS_ON', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: 'USD', dataIndex: 'AMOUNT_ON', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: '%', dataIndex: 'AMOUNT_ON_AVG', width: 50,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: 'AVG', dataIndex: 'AMOUNT_ON_AVG_RATE', width: 60,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return  value;
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'OFF LINE',
        //                                                id: prototype.id + '-adgSalDate',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Cpns', dataIndex: 'CUPONS_OFF', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: 'USD', dataIndex: 'AMOUNT_OFF', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: '%', dataIndex: 'AMOUNT_OFF_AVG', width: 50,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: 'AVG', dataIndex: 'AMOUNT_OFF_AVG_RATE', width: 60,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return  value;
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'NON REVENUE',
        //                                                id: prototype.id + '-adgSalDate',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Cpns', dataIndex: 'QCPNS0', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#b6d8ee;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: 'USD', dataIndex: 'AMOUNT0', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#b6d8ee;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-summaryCountryOfSale',
                                            width: 1384,
                                            align: 'left',
                                            margin: '0 0 0 0 ',
                                            layout: {
                                                type: 'hbox',
                                                align: 'center'
                                            },
                                            defaults: {
                                                xtype: 'label',
                                                align: 'center',
                                                html: '' + '&nbsp',
                                                height: 25,
                                                padding: '5 5 5 0',
                                                style: 'background:#A0BFD3;color:#244066;text-align:right;font-weight:bold;border: 0.3px #4A6371 solid;font-size:10px'
                                            },
                                            items: [
                                                {width: 250},
                                                {width: 100, id: prototype.id + '-tot1_CUPONS'},
                                                {width: 50, text: '100%'},
                                                {width: 100, id: prototype.id + '-tot1_AMOUNT'},
                                                {width: 50, text: '100%'},
                                                {width: 100, id: prototype.id + '-tot1_CUPONS_ON'},
                                                {width: 100, id: prototype.id + '-tot1_AMOUNT_ON'},
                                                {width: 50, id: prototype.id + '-tot1_AMOUNT_ON_AVG'},
                                                {width: 60, id: prototype.id + '-tot1_AMOUNT_ON_AVG_RATE'},
                                                {width: 100, id: prototype.id + '-tot1_CUPONS_OFF'},
                                                {width: 100, id: prototype.id + '-tot1_AMOUNT_OFF'},
                                                {width: 50, id: prototype.id + '-tot1_AMOUNT_OFF_AVG'},
                                                {width: 60, id: prototype.id + '-tot1_AMOUNT_OFF_AVG_RATE'},
                                                {width: 100, id: prototype.id + '-lblTotalC_QCPNSNR'},
                                                {width: 100, id: prototype.id + '-lblTotalC_AMOUNTNR'}
                                            ]
                                        }
                                    ]
                                }

                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-BoxCityOfSale',
                            width: '100%',
                            hidden: true,
                            layout: {
                                type: 'hbox',
                                align: 'center',
                                pack: 'center'
                            },
                            defaults: {
                                bodyStyle: 'background: transparent;',
                                border: false,
                                align: 'center',
                                margin: "0 15 0 0"  // (top, right, bottom, left)
                            },
                            items: [
                                // <editor-fold defaultstate="collapsed" desc="gridData">
                                {
                                    xtype: 'panel',
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridCityOfSale',
                                            width: 1469,
                                            height: 510,
                                            columnLines: true,
                                            margin: "5 0 0 0",
        //                                    features: [{
        //                                        ftype: 'summary'
        //                                    }],
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {
                                                        text: 'Nbr.', dataIndex: 'RN', width: 45,
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
////                                                            metaData.style = "color:#057ECB;";
//                                                            return '<b>' + value + '</b>';
//                                                        }
                                                    },
                                                    {
                                                        text: 'Country', dataIndex: 'COUNTRYO', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "color:#057ECB;";
                                                            return '<b>' + value + '</b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'City',
        //                                                id: prototype.id + '-adgSalDate',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Code',dataIndex: 'COUNTRY', width: 60,
                                                                listeners: {
                                                                    click: 'GridDDTMDetailbyAgent_colHandler'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:center";
                                                                    value = '<b>' + value + '</b>';
                                                                    return '<a href="#screens-dashboard-01-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Description',dataIndex: 'COUNTRY_NAME', width: 160,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:left";
                                                                    value = '<b>' + value + '</b>';
                                                                    return value;
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Cpns', dataIndex: 'CUPONS', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
//                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore();
//                                                            console.log(data);
//                                                            metaData.style = 'text-align:right; margin-right:3px ';
//                                                            return '<b>' + Ext.util.Format.number(data.lngTotQMATCH, '0,000') + '<b>';
//                                                        }
                                                    },
                                                    {
                                                        text: '%', dataIndex: 'CUPONS_AVG', width: 50,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'USD', dataIndex: 'AMOUNT', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: '%', dataIndex: 'AMOUNT_AVG_RATE', width: 50,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'ON LINE',
        //                                                id: prototype.id + '-adgSalDate',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Cpns', dataIndex: 'CUPONS_ON', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: '%', dataIndex: 'CUPONS_ON_AVG', width: 50,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: 'USD', dataIndex: 'AMOUNT_ON', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: '%', dataIndex: 'AMOUNT_ON_AVG', width: 50,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: 'AVG', dataIndex: 'AMOUNT_ON_AVG_RATE', width: 60,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return  value;
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'OFF LINE',
        //                                                id: prototype.id + '-adgSalDate',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Cpns', dataIndex: 'CUPONS_OFF', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: '%', dataIndex: 'CUPONS_OFF_AVG', width: 50,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: 'USD', dataIndex: 'AMOUNT_OFF', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: '%', dataIndex: 'AMOUNT_OFF_AVG', width: 50,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: 'AVG', dataIndex: 'AMOUNT_OFF_AVG_RATE', width: 60,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return  value;
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'NON REVENUE',
        //                                                id: prototype.id + '-adgSalDate',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Cpns', dataIndex: 'QCPNS0', width: 70,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#b6d8ee;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: 'USD', dataIndex: 'AMOUNT0', width: 70,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#b6d8ee;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-summaryCityOfSale',
                                            width: 1467,
                                            align: 'left',
                                            margin: '0 0 0 0 ',
                                            layout: {
                                                type: 'hbox',
                                                align: 'center'
                                            },
                                            defaults: {
                                                xtype: 'label',
                                                align: 'center',
                                                html: '' + '&nbsp',
                                                height: 25,
                                                padding: '5 5 5 0',
                                                style: 'background:#A0BFD3;color:#244066;text-align:right;font-weight:bold;border: 0.3px #4A6371 solid;font-size:10px'
                                            },
                                            items: [
                                                {width: 325},
                                                {width: 90, id: prototype.id + '-lblCiSTotalCPN'},
                                                {width: 50, text: '100%'},
                                                {width: 100, id: prototype.id + '-lblCiSTotalUSD'},
                                                {width: 50, text: '100%'},
                                                {width: 90, id: prototype.id + '-lblCiSTotalCPNOn'},
                                                {width: 50, id: prototype.id + '-lblCiSTotalCPNPercOn'},
                                                {width: 100, id: prototype.id + '-lblCiSTotalUSDOn'},
                                                {width: 50, id: prototype.id + '-lblCiSTotalUSDPercOn'},
                                                {width: 60, id: prototype.id + '-lblCiSTotalAVGOn'},
                                                {width: 90, id: prototype.id + '-lblCiSTotalCPNOff'},
                                                {width: 50, id: prototype.id + '-lblCiSTotalCPNPercOff'},
                                                {width: 100, id: prototype.id + '-lblCiSTotalUSDOff'},
                                                {width: 50, id: prototype.id + '-lblCiSTotalUSDPercOff'},
                                                {width: 60, id: prototype.id + '-lblCiSTotalAVGOff'},
                                                {width: 70, id: prototype.id + '-lblTotalY_QCPNSNR'},
                                                {width: 70, id: prototype.id + '-lblTotalY_AMOUNTNR'},
                                            ]
                                        }
                                    ]
                                }

                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-BoxAlliances',
                            width: '100%',
                            hidden: true,
                            layout: {
                                type: 'hbox',
                                align: 'center',
                                pack: 'center'
                            },
                            defaults: {
                                bodyStyle: 'background: transparent;',
                                border: false,
                                align: 'center',
                                margin: "0 15 0 0"  // (top, right, bottom, left)
                            },
                            items: [
                                // <editor-fold defaultstate="collapsed" desc="gridData">
                                {
                                    xtype: 'panel',
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridAlliances',
                                            width: 804,
                                            height: 210,
                                            columnLines: true,
                                             margin: "5 0 0 0",
        //                                    features: [{
        //                                        ftype: 'summary'
        //                                    }],
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {
                                                        text: 'Display by Alliances',
        //                                                id: prototype.id + '-adgSalDate',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Alliances',dataIndex: 'strDescription', width: 150,
                                                                listeners: {
                                                                    click: 'detailAlliances_colHandler'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "color:#057ECB;text-align:left";
                                                                    value = '<b>' + value + '</b>';
                                                                    return '<a href="#screens-dashboard-01-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Coupons', dataIndex: 'CUPONS', width: 120,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                },
        //                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
        //                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore();
        //                                                            console.log(data);
        //                                                            metaData.style = 'text-align:right; margin-right:3px ';
        //                                                            return '<b>' + Ext.util.Format.number(data.lngTotQMATCH, '0,000') + '<b>';
        //                                                        }
                                                            },
                                                            {
                                                                text: '%', dataIndex: 'Perc1', width: 60,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                },
        //                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
        //                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore();
        //                                                            console.log(data);
        //                                                            metaData.style = 'text-align:right; margin-right:3px ';
        //                                                            return '<b>' + Ext.util.Format.number(data.lngTotQMATCH, '0,000') + '<b>';
        //                                                        }
                                                            },
                                                            {
                                                                text: 'Amount', dataIndex: 'AMOUNT', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                },
        //                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
        //                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore();
        //                                                            console.log(data);
        //                                                            metaData.style = 'text-align:right; margin-right:3px ';
        //                                                            return '<b>' + Ext.util.Format.number(data.lngTotQMATCH, '0,000') + '<b>';
        //                                                        }
                                                            },
                                                            {
                                                                text: '%', dataIndex: 'Perc2', width: 60,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                },
        //                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
        //                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore();
        //                                                            console.log(data);
        //                                                            metaData.style = 'text-align:right; margin-right:3px ';
        //                                                            return '<b>' + Ext.util.Format.number(data.lngTotQMATCH, '0,000') + '<b>';
        //                                                        }
                                                            },
                                                            {
                                                                text: 'Avg', dataIndex: 'AVG', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return '<b>' + value + '</b>';
                                                                },
        //                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
        //                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore();
        //                                                            console.log(data);
        //                                                            metaData.style = 'text-align:right; margin-right:3px ';
        //                                                            return '<b>' + Ext.util.Format.number(data.lngTotQMATCH, '0,000') + '<b>';
        //                                                        }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: '% General<br>Amount', dataIndex: 'Perc3', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return '<b>' + value + '</b>';
                                                        },
//                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore();
//                                                            console.log(data);
//                                                            metaData.style = 'text-align:right; margin-right:3px ';
//                                                            return '<b>' + Ext.util.Format.number(data.lngTotQMATCH, '0,000') + '<b>';
//                                                        }
                                                    },
                                                    {
                                                        text: 'NON REVENUE',
        //                                                id: prototype.id + '-adgSalDate',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Cpns', dataIndex: 'QCPNS0', width: 70,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#b6d8ee;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                },
        //                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
        //                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore();
        //                                                            console.log(data);
        //                                                            metaData.style = 'text-align:right; margin-right:3px ';
        //                                                            return '<b>' + Ext.util.Format.number(data.lngTotQMATCH, '0,000') + '<b>';
        //                                                        }
                                                            },
                                                            {
                                                                text: 'USD', dataIndex: 'AMOUNT0', width: 70,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#b6d8ee;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return '<b>' + value + '</b>';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-summaryAlliances',
                                            width: 804,
                                            align: 'left',
                                            margin: '0 0 0 0 ',
                                            layout: {
                                                type: 'hbox',
                                                align: 'center'
                                            },
                                            defaults: {
                                                xtype: 'label',
                                                align: 'center',
                                                html: '' + '&nbsp',
                                                height: 25,
                                                padding: '5 5 5 0',
                                                style: 'background:#A0BFD3;color:#244066;text-align:right;font-weight:bold;border: 0.3px #4A6371 solid;font-size:10px'
                                            },
                                            items: [
                                                {width: 150},
                                                {width: 120, id: prototype.id + '-lblTotalAlCPN'},
                                                {width: 60, text: '100%'},
                                                {width: 100, id: prototype.id + '-lblTotalAlAmount'},
                                                {width: 60, text: '100%'},
                                                {width: 80, id: prototype.id + '-lblTotalAlAVG'},
                                                {width: 80, id: prototype.id + '-lblTotalPerGral'},
                                                {width: 70, id: prototype.id + '-lblTotalAL_QCPNSNR'},
                                                {width: 70, id: prototype.id + '-lblTotalAL_AMOUNTNR'}
                                            ]
                                        }
                                    ]
                                }

                            ]
                        },
//                        {
//                            xtype: 'panel',
//                            id: prototype.id + '-pie',
//                            layout: {
//                                type: 'hbox',
//                                pack: 'center'
//                            },
//                            border: true,
//                            width: 1132,
//                            hidden: true,
//                            height: 25,
//                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
//                            items: [
//                                {
//                                    xtype: 'panel',
//                                    width: 1132,
//                                    height: 25,
//                                    layout: {
//                                        type: 'hbox',
//                                        pack: 'center'
//                                    },
//                                    defaults: {
//                                        xtype: 'label'
//                                    },
//                                    items: [
//                                        {
//                                            text: 'Page',
//                                            width: 50
//                                        },
//                                        {
//                                            id: prototype.id + '-lbl-currentPage',
//                                            text: '1',
//                                            width: 50
//                                        },
//                                        {
//                                            text: 'Of',
//                                            width: 50
//                                        },
//                                        {
//                                            id: prototype.id + '-lbl-pageCount',
//                                            text: '0',
//                                            width: 50
//                                        },
//                                        {xtype: 'tbspacer', width: 100},
//                                        {
//                                            text: 'Total found',
//                                            width: 80
//                                        },
//                                        {
//                                            id: prototype.id + '-lbl-total',
//                                            text: '0',
//                                            width: 50
//                                        }
//                                    ]
//                                }
//                            ]
//                        }
                    ]
//                }
//            ]
        },
        {
            region: 'south',
            layout: 'border',
            height: 0,
            defaults: {
                style: 'margin: 2px;',
                bodyStyle: 'background: transparent;',
                border: false
            },
            items: [
            ]
        }
    ]
});