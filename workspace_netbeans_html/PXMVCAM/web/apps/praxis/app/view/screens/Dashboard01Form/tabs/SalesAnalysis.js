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
            height: 700,
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
                                    width: 1302,
                                    columnLines: true,
                                    margin: "5 0 0 0",
                                    //                                    features: [{
                                    //                                        ftype: 'summary'
                                    //                                    }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center',
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
                                                        text: 'Cpns', dataIndex: 'CUPONS', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        },
                                                        //                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                        //                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore();
                                                        //                                                            
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
                                                        text: 'AVG', dataIndex: 'TARIFA', width: 70,
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
                                                        text: 'Cpns', dataIndex: 'CUPONS_ON', width: 80,
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
                                                        text: 'Cpns', dataIndex: 'CUPONS_OFF', width: 80,
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
                                                        text: 'Cpns', dataIndex: 'QCPNS0', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#b6d8ee;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'USD', dataIndex: 'AMOUNT0', width: 90,
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
                                                    {text: 'Comment', dataIndex: 'COMENTARIO', width: 80}
                                                ]
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-summaryMain',
                                    width: 1302,
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
                                        style: 'background:#A0BFD3;text-align:right;border: 0.3px #4A6371 solid;font-size:12px'
                                    },
                                    items: [
                                        {width: 100},
                                        {width: 80, id: prototype.id + '-lblTotalCpns'},
                                        {width: 100, id: prototype.id + '-lblTotalAmount'},
                                        {width: 70, id: prototype.id + '-totAVG'},
                                        {width: 80, id: prototype.id + '-lblTotalCpnON'},
                                        {width: 50, id: prototype.id + '-lblTotalCpnONPerc'},
                                        {width: 100, id: prototype.id + '-lblTotalAmountON'},
                                        {width: 50, id: prototype.id + '-lblTotalAmountONPerc'},
                                        {width: 60, id: prototype.id + '-lblTotalAvgON'},
                                        {width: 80, id: prototype.id + '-lblTotalCpnOFF'},
                                        {width: 50, id: prototype.id + '-lblTotalCpnOFFPerc'},
                                        {width: 100, id: prototype.id + '-lblTotalAmountOFF'},
                                        {width: 50, id: prototype.id + '-lblTotalAmountOFFPerc'},
                                        {width: 60, id: prototype.id + '-lblTotalAvgOFF'},
                                        {width: 80, id: prototype.id + '-lblTotalQCPNSNR'},
                                        {width: 90, id: prototype.id + '-lblTotalAMOUNTNR'},
                                        {width: 20},
                                        {width: 80}
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
                                                text: 'Country of Sales', dataIndex: 'COUNTRY_NAME', width: 200, id: prototype.id + '-lbl_Country',
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
//                                                            
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
//                                                            
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
//                                                            
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
//                                                            
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
//                                                            
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
                                                        //                                                            
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
                                        style: 'background:#A0BFD3;color:#244066;text-align:right;border: 0.3px #4A6371 solid;font-size:12px'
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
                                                text: 'Agent Name', dataIndex: 'strDescription', width: 200,
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
//                                                            
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
//                                                            
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
//                                                            
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
//                                                            
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
//                                                            
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
                                                        //                                                            
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
                                        style: 'background:#A0BFD3;color:#244066;text-align:right;border: 0.3px #4A6371 solid;font-size:12px'
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
                                                        text: 'Country', dataIndex: 'COUNTRY_NAME', width: 200,
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
                                                        //                                                            
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
                                        style: 'background:#A0BFD3;color:#244066;text-align:right;border: 0.3px #4A6371 solid;font-size:12px'
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
                                                        text: 'Code', dataIndex: 'COUNTRY', width: 60,
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
                                                        text: 'Description', dataIndex: 'COUNTRY_NAME', width: 160,
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
//                                                            
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
                                        style: 'background:#A0BFD3;color:#244066;text-align:right;border: 0.3px #4A6371 solid;font-size:12px'
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
                                    width: 572,
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
                                                        text: 'Alliances', dataIndex: 'strDescription', width: 150,
                                                        listeners: {
                                                            click: 'click_detailAlliances_colHandler'
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
                                                        //                                                            
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
                                                        //                                                            
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
                                                        //                                                            
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
                                                        //                                                            
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
                                                        //                                                            
                                                        //                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                        //                                                            return '<b>' + Ext.util.Format.number(data.lngTotQMATCH, '0,000') + '<b>';
                                                        //                                                        }
                                                    }
                                                ]
                                            },
//                                            {
//                                                text: '% General<br>Amount', dataIndex: 'Perc3', width: 80,
//                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                    metaData.style = "text-align:right;";
//                                                    value = Ext.util.Format.number(value, '0,000.00');
//                                                    return '<b>' + value + '</b>';
//                                                },
////                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
////                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore();
////                                                            
////                                                            metaData.style = 'text-align:right; margin-right:3px ';
////                                                            return '<b>' + Ext.util.Format.number(data.lngTotQMATCH, '0,000') + '<b>';
////                                                        }
//                                            },
                                            {
                                                text: 'NON REVENUE',
                                                hidden: true,
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
                                                        //                                                            
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
                                    width: 572,
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
                                        style: 'background:#A0BFD3;color:#244066;text-align:right;border: 0.3px #4A6371 solid;font-size:12px'
                                    },
                                    items: [
                                        {width: 150},
                                        {width: 120, id: prototype.id + '-lblTotalAlCPN'},
                                        {width: 60, text: '100%'},
                                        {width: 100, id: prototype.id + '-lblTotalAlAmount'},
                                        {width: 60, text: '100%'},
                                        {width: 80, id: prototype.id + '-lblTotalAlAVG'},
//                                        {width: 80, id: prototype.id + '-lblTotalPerGral'},
//                                        {width: 70, id: prototype.id + '-lblTotalAL_QCPNSNR'},
//                                        {width: 70, id: prototype.id + '-lblTotalAL_AMOUNTNR'}
                                    ]
                                }
                            ]
                        }

                    ]
                },
//                      -------------------- Total per Channel ----------------------------------------
                {
                    xtype: 'panel',
                    id: prototype.id + '-BoxChannels',
                    width: '100%',
                    hidden: true,
                    layout: {
                        type: 'vbox',
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
                                    id: prototype.id + '-ADG_GridChannels',
                                    width: 1378,
                                    height: 510,
                                    columnLines: true,
                                    margin: "5 0 0 0",
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
                                                text: 'Display By Channel',
                                                //                                                id: prototype.id + '-adgSalDate',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Source', dataIndex: 'strDescription', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            return value;
                                                        },
                                                    },
                                                    {
                                                        text: 'Coupons', dataIndex: 'CUPONS', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-ADG_GridChannels').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTAL_CUPONS, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: '%', dataIndex: 'CUPONS_PERCENT', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var value = '100%';
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + value + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'USD', dataIndex: 'AMOUNT', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-ADG_GridChannels').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTAL_AMOUNT, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: '%', dataIndex: 'AMOUNT_PERCENT', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var value = '100%';
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + value + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Avg', dataIndex: 'TARIFA', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'ON LINE',
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
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-ADG_GridChannels').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_CUPONS_ON, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'USD', dataIndex: 'AMOUNT_ON', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-ADG_GridChannels').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_AMOUNT_ON, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Avg', dataIndex: 'AMOUNT_ON_AVG_RATE', width: 70,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: 'OFF LINE',
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
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-ADG_GridChannels').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_CUPONS_OFF, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'USD', dataIndex: 'AMOUNT_OFF', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-ADG_GridChannels').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_AMOUNT_OFF, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Avg', dataIndex: 'AMOUNT_OFF_AVG_RATE', width: 70,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: 'Miles', dataIndex: 'KM', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-ADG_GridChannels').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totKM, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Rev / Mile', dataIndex: 'RevMil', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.0000');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-ADG_GridChannels').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTAL_AVG, '0,000.0000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'NON REVENUE',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Cpns', dataIndex: 'QCPNS0', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#b6d8ee;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-ADG_GridChannels').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_QCPNS0, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'USD', dataIndex: 'AMOUNT0', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#b6d8ee;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-ADG_GridChannels').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_AMOUNT0, '0,000') + '<b>';
                                                                }
                                                            },
                                                        ]
                                                    },
                                                ]
                                            }
                                        ]
                                    }
                                },
                            ]
                        }

                    ]
                },
//                      -------------------- CITY PAIR ----------------------------------------
                {
                    xtype: 'panel',
                    id: prototype.id + '-BoxCityPair',
                    width: '100%',
                    hidden: true,
                    layout: {
                        type: 'vbox',
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
                        {xtype: 'tbspacer', height: 2.5},
                        {
                            xtype: 'panel',
                            layout: {
                                type: 'hbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Pairs:',
                                    id: prototype.id + '-txtPairs',
                                    allowBlank: true,
                                    maskRe: /[a-zA-Z]/,
                                    enforceMaxLength: true,
                                    maxLength: 6,
                                    labelWidth: 75,
                                    width: 150,
                                    enableKeyEvents: true,
                                    listeners: {
                                        afterrender: function (c) {
                                            Ext.create('Ext.tip.ToolTip', {
                                                target: c.getEl(),
                                                html: 'Enter City Pair From/To (FFFTTT)'
                                            });
                                        },
                                        change: 'onUpperValue',
                                        keypress: 'BuscarPair_keyDownHandler'
                                    }
                                },
                                {xtype: 'tbspacer', width: 5},
                                {
                                    xtype: 'label',
                                    labelWidth: 60,
                                    text: '(Enter)',
                                    labelAlign: 'right',
                                    style: 'font-weight:bold;',
                                },
                                {xtype: 'tbspacer', width: 40},
                                {
                                    xtype: 'radiogroup',
                                    id: prototype.id + '-radiogroupType_cp1',
                                    width: 360,
                                    border: 1,
                                    style: {
                                        borderColor: 'black',
                                        borderStyle: 'solid'
                                    },
                                    items: [
                                        {boxLabel: '<b style="color:#148D28;">All</b>', inputValue: '', name: 'rbgType_cp1', checked: true},
                                        {boxLabel: '<b style="color:#148D28;">Domestic</b>', inputValue: 'D', name: 'rbgType_cp1'},
                                        {boxLabel: '<b style="color:#148D28;">International</b>', inputValue: 'I', name: 'rbgType_cp1'},
                                    ],
                                    listeners: {
                                        change: 'rbChangeType_cp'
                                    }
                                },
                                {xtype: 'tbspacer', width: 80},
                                {
                                    xtype: 'radiogroup',
                                    id: prototype.id + '-radiogroupType_cp2',
                                    width: 240,
                                    border: 1,
                                    style: {
                                        borderColor: 'black',
                                        borderStyle: 'solid'
                                    },
                                    items: [
                                        {boxLabel: '<b style="color:#148D28;">ALL</b>', inputValue: '', name: 'rbgType_cp2', checked: true},
                                        {boxLabel: '<b style="color:#148D28;">ON</b>', inputValue: 'ON', name: 'rbgType_cp2'},
                                        {boxLabel: '<b style="color:#148D28;">OFF</b>', inputValue: 'OFF', name: 'rbgType_cp2'},
                                    ],
                                    listeners: {
                                        change: 'rbChangeType_cp'
                                    }
                                },
                            ]
                        },
                        {xtype: 'tbspacer', height: 2.5},
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
                                    id: prototype.id + '-ADG_GridDDCPCityPair',
                                    width: 1333,
                                    height: 531,
                                    columnLines: true,
                                    margin: "5 0 0 0",
                                    features: [{
                                            ftype: 'summary',
                                            dock: 'bottom'
                                        }],
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
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                },
                                            },
                                            {
                                                text: 'Pairs', dataIndex: 'strDescription', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                },
                                            },
                                            {
                                                text: 'From', dataIndex: 'strDescription4', width: 150,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    return value;
                                                },
                                            },
                                            {
                                                text: 'To', dataIndex: 'strDescription5', width: 150,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    return value;
                                                },
                                            },
                                            {
                                                text: 'Country', dataIndex: 'strDescription1', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                },
                                            },
                                            {
                                                text: 'Cpns', dataIndex: 'CUPONS', width: 90,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-ADG_GridDDCPCityPair').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_CUPONS, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: '%', dataIndex: 'CUPONS_AVG', width: 90,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = '100%';
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + data + '<b>';
                                                }
                                            },
                                            {
                                                text: 'USD', dataIndex: 'AMOUNT', width: 90,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-ADG_GridDDCPCityPair').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_AMOUNT, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: '%', dataIndex: 'AMOUNT_AVG_RATE', width: 90,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = '100%';
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + data + '<b>';
                                                }
                                            },
                                            {
                                                text: 'Avg USD', dataIndex: 'TARIFA', width: 90,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-ADG_GridDDCPCityPair').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totAVG, '0,000.00') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'Miles', dataIndex: 'PMP', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return value;
                                                },
                                            },
                                            {
                                                text: 'Rev / Mile', dataIndex: 'RevMil', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.0000');
                                                    return value;
                                                },
                                            },
                                            {
                                                text: 'NON REVENUE',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Cpns', dataIndex: 'QCPNS0', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#b6d8ee;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-ADG_GridDDCPCityPair').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTAL_QCPNS0, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'USD', dataIndex: 'AMOUNT0', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#b6d8ee;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-ADG_GridDDCPCityPair').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTAL_AMOUNT0, '0,000') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                        ]
                                    }
                                },
                            ]
                        }

                    ]
                },
//                      -------------------- SALES BY AGENT ----------------------------------------
                {
                    xtype: 'panel',
                    id: prototype.id + '-BoxSalesAgent',
                    width: '100%',
                    hidden: true,
                    layout: {
                        type: 'vbox',
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
                        {xtype: 'tbspacer', height: 2.5},
                        {
                            xtype: 'panel',
                            layout: {
                                type: 'hbox',
                                align: 'right'
                            },
                            items: [
                                {
                                    xtype: 'radiogroup',
                                    id: prototype.id + '-radiogroupType_sa1',
                                    width: 360,
                                    border: 1,
                                    style: {
                                        borderColor: 'black',
                                        borderStyle: 'solid'
                                    },
                                    items: [
                                        {boxLabel: '<b style="color:#148D28;">All</b>', inputValue: '', name: 'rbgType_sa1', checked: true},
                                        {boxLabel: '<b style="color:#148D28;">ARC</b>', inputValue: 'ARC', name: 'rbgType_sa1'},
                                        {boxLabel: '<b style="color:#148D28;">BSP</b>', inputValue: 'BSP', name: 'rbgType_sa1'},
                                        {boxLabel: '<b style="color:#148D28;">AM</b>', inputValue: 'AM', name: 'rbgType_sa1'},
                                    ],
                                    listeners: {
                                        change: 'rbChangeType_sa'
                                    }
                                },
                            ]
                        },
                        {xtype: 'tbspacer', height: 2.5},
                        {
                            xtype: 'panel',
                            layout: {
                                type: 'hbox',
                                align: 'right'
                            },
                            items: [
                                {
                                    xtype: 'radiogroup',
                                    id: prototype.id + '-radiogroupType_sa2',
                                    width: 150,
                                    border: 1,
                                    style: {
                                        borderColor: 'black',
                                        borderStyle: 'solid'
                                    },
                                    items: [
                                        {boxLabel: '<b style="color:#148D28;">ALL</b>', inputValue: '', name: 'rbgType_sa2', checked: true},
                                        {boxLabel: '<b style="color:#148D28;">ON</b>', inputValue: 'ON', name: 'rbgType_sa2'},
                                        {boxLabel: '<b style="color:#148D28;">OFF</b>', inputValue: 'OFF', name: 'rbgType_sa2'},
                                    ],
                                    listeners: {
                                        change: 'rbChangeType_sa'
                                    }
                                },
                            ]
                        },
                        {xtype: 'tbspacer', height: 2.5},
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
                                    id: prototype.id + '-ADG_GridSalesAgent',
                                    width: 1262,
//                                    height: 532,
                                    height: 'auto',
                                    columnLines: true,
                                    margin: "5 0 0 0",
                                    features: [{
                                            ftype: 'summary',
                                            dock: 'bottom'
                                        }],
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
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                },
                                            },
                                            {
                                                text: 'Agent', dataIndex: 'VENDOR', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                },
                                            },
                                            {
                                                text: 'Sales Agent', dataIndex: 'strDescription1', width: 150,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    return value;
                                                },
                                            },
                                            {
                                                text: 'Channel', dataIndex: 'strDescription2', width: 150,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                },
                                            },
                                            {
                                                text: 'Sub Type', dataIndex: 'CLASS', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                },
                                            },
                                            {
                                                text: 'Country', dataIndex: 'COUNTRY_NAME', width: 90,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    return value;
                                                },
                                            },
                                            {
                                                text: 'Cpns', dataIndex: 'CUPONS', width: 90,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-ADG_GridSalesAgent').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_CUPONS, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: '%', dataIndex: 'CUPONS_PERCENT', width: 90,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = '100%';
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + data + '<b>';
                                                }
                                            },
                                            {
                                                text: 'USD', dataIndex: 'AMOUNT', width: 90,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-ADG_GridSalesAgent').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_AMOUNT, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: '%', dataIndex: 'AMOUNT_PERCENT', width: 90,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = '100%';
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + data + '<b>';
                                                }
                                            },
                                            {
                                                text: 'Avg', dataIndex: 'TARIFA', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-ADG_GridSalesAgent').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_AVG, '0,000.00') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'NON REVENUE',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Cpns', dataIndex: 'QCPNS0', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#b6d8ee;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-ADG_GridSalesAgent').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTAL_QCPNS0, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'USD', dataIndex: 'AMOUNT0', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#b6d8ee;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-ADG_GridSalesAgent').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTAL_AMOUNT0, '0,000') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                        ]
                                    }
                                },
                            ]
                        }

                    ]
                },
//                      -------------------- TOTALS BY CABIN ----------------------------------------
                {
                    xtype: 'panel',
                    id: prototype.id + '-BoxCabin',
                    width: '100%',
                    hidden: true,
                    layout: {
                        type: 'vbox',
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
                        {xtype: 'tbspacer', height: 2.5},
                        {
                            xtype: 'panel',
                            layout: {
                                type: 'hbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'checkbox',
                                    id: prototype.id + '-chkCabin',
                                    boxLabel: 'City Pair',
                                    listeners: {
                                        change: 'chooseCAB_clickHandler'
                                    }
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'radiogroup',
                                    id: prototype.id + '-radiogroupType_ca',
                                    width: 150,
                                    border: 1,
                                    style: {
                                        borderColor: 'black',
                                        borderStyle: 'solid'
                                    },
                                    items: [
                                        {boxLabel: '<b style="color:#148D28;">ALL</b>', inputValue: '', name: 'rbgType_ca', checked: true},
                                        {boxLabel: '<b style="color:#148D28;">ON</b>', inputValue: 'ON', name: 'rbgType_ca'},
                                        {boxLabel: '<b style="color:#148D28;">OFF</b>', inputValue: 'OFF', name: 'rbgType_ca'},
                                    ],
                                    listeners: {
                                        change: 'rbChangeType_ca'
                                    }
                                },
                            ]
                        },
                        {xtype: 'tbspacer', height: 2.5},
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
                                    id: prototype.id + '-ADG_GridCabin',
                                    width: 1040,
                                    height: 570,
                                    columnLines: true,
                                    margin: "5 0 0 0",
                                    features: [{
                                            ftype: 'summary',
                                            dock: 'bottom'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Display by cabin',
                                                //                                                id: prototype.id + '-adgSalDate',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Sales Date', dataIndex: 'strFormatDate', width: 100,
                                                        id: prototype.id + '-titCabin',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        },
                                                    },
                                                    {
                                                        text: 'Cpns', dataIndex: 'CUPONS', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        },
                                                    },
                                                    {
                                                        text: 'USD', dataIndex: 'AMOUNT', width: 110,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-ADG_GridCabin').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTAL_AMOUNT, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'OFF LINE',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Cpns', dataIndex: 'CUPON_F', width: 80,
                                                                listeners: {
                                                                    click: 'click_detailCabin_colHandler'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    metaData.style = "font-weight:bold;text-align:right;";
                                                                    return '<a href="#" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-ADG_GridCabin').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTCUPON_F, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'USD', dataIndex: 'AMOUNT_F', width: 110,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-ADG_GridCabin').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTAMOUNT_F, '0,000') + '<b>';
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: 'B(Business)',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Cpns', dataIndex: 'CUPON_J', width: 80,
                                                                listeners: {
                                                                    click: 'click_detailCabin_colHandler'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    metaData.style = "font-weight:bold;text-align:right;";
                                                                    return '<a href="#" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-ADG_GridCabin').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTCUPON_J, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'USD', dataIndex: 'AMOUNT_J', width: 110,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-ADG_GridCabin').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTAMOUNT_J, '0,000') + '<b>';
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: 'Y(Economy/Coach)',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Cpns', dataIndex: 'CUPON_Y', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    metaData.style = "font-weight:bold;text-align:right;";
                                                                    return '<a href="#" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                                },
                                                                listeners: {
                                                                    click: 'click_detailCabin_colHandler'
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-ADG_GridCabin').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTCUPON_Y, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'USD', dataIndex: 'AMOUNT_Y', width: 110,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-ADG_GridCabin').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTAMOUNT_Y, '0,000') + '<b>';
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: 'NON REVENUE',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {
                                                                text: 'Cpns', dataIndex: 'QCPNS0', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#b6d8ee;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-ADG_GridCabin').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_QCPNS0, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'USD', dataIndex: 'AMOUNT0', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#b6d8ee;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-ADG_GridCabin').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_AMOUNT0, '0,000') + '<b>';
                                                                }
                                                            },
                                                        ]
                                                    },
                                                ]
                                            },
                                        ]
                                    }
                                },
                            ]
                        }

                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-BoxDetCabin',
                    width: '100%',
                    hidden: true,
                    layout: {
                        type: 'vbox',
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
                        {
                            xtype: 'panel',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-ADG_GridDetCabin',
                                    width: 720,
                                    height: 350,
                                    columnLines: true,
                                    margin: "5 0 0 0",
                                    features: [{
                                            ftype: 'summary',
                                            dock: 'bottom'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Class', dataIndex: 'strDescription', width: 65,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                },
                                            },
                                            {
                                                text: 'Description', dataIndex: 'strDescription1', width: 150,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    return value;
                                                },
                                            },
                                            {
                                                text: 'Coupons', dataIndex: 'CUPONS', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-ADG_GridDetCabin').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_CUPONS, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: '%', dataIndex: 'Perc1', width: 60,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + '100%' + '<b>';
                                                }
                                            },
                                            {
                                                text: 'USD', dataIndex: 'AMOUNT', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-ADG_GridDetCabin').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_AMOUNT, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: '%', dataIndex: 'Perc2', width: 60,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + '100%' + '<b>';
                                                }
                                            },
                                            {
                                                text: 'AVG', dataIndex: 'TARIFA', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-ADG_GridDetCabin').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totAVG, '0,000.00') + '<b>';
                                                }
                                            },
                                            {text: 'Revenue by',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Miles', dataIndex: 'REVXMI', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.000');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-ADG_GridDetCabin').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTAL_REVXMI, '0,000.000') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                        ]
                                    }
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelChartDetCabin',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            //hidden: true,
                            width: '100%',
                            //height: 'auto',
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'cartesian',
                                    id: prototype.id + '-displayDetCabinChart01',
                                    border: false,
                                    width: '100%',
                                    height: 290,
                                    background: '#E0F8F7',
                                    captions: {
                                        title: {
                                            text: 'Total per Coupons',
                                            alignTo: 'chart'
                                        }
                                    },
                                    animation: {
                                        duration: 200
                                    },
                                    interactions: ['itemhighlight'],
                                    /*legend: {
                                     docked: 'bottom',
                                     background: '#E3EAEF'
                                     },*/
                                    axes: [
                                        {
                                            type: 'numeric3d',
                                            position: 'left',
                                            fields: ['CUPONS'],
                                            grid: true,
                                            title: '',
                                            renderer: function (obj, value) {
                                                value = value / 1000;
                                                return ' ' + Ext.util.Format.number((value), '0') + 'k';
                                            }
                                        },
                                        {
                                            type: 'numeric3d',
                                            position: 'right',
                                            fields: ['TARIFA'],
                                            grid: false,
                                            title: '',
                                            renderer: function (obj, value) {
                                                return ' ' + Ext.util.Format.number((value), '0');
                                            }
                                        }
                                        , {
                                            type: 'category3d',
                                            position: 'bottom',
                                            grid: true,
                                            title: {
                                                translationX: -30
                                            }
                                        },
                                    ],
                                    series: [
                                        {
                                            type: 'bar3d',
                                            stacked: false,
                                            xField: 'strDescription',
                                            yField: 'CUPONS',
                                            colors: ['#99CCFF'],
                                            highlight: true,
                                            style: {
                                                inGroupGapWidth: -7,
                                                minGapWidth: 2,
                                                maxBarWidth: 1200
                                            },
                                            label: {
                                                field: 'CUPONS',
//                                                            display: 'insideEnd',
                                                display: 'outside',
                                                calloutLine: {
                                                    length: 10,
                                                    width: 0,
//                                                                color: '#FFFFFF',
                                                },
                                                renderer: function (value, b, callout) {
                                                    callout.calloutVertical = false;
                                                    //return Ext.util.Format.number(value, '0')
                                                    return ''
                                                }
                                            },
                                            tooltip: {
                                                trackMouse: true,
                                                height: 28,
                                                renderer: function (toolTip, record, ctx) {
                                                    toolTip.setHtml('Coupons : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0') + '</b>');
                                                }
                                            },
                                            renderer: 'onColumnRender'
                                        },
                                        {
                                            type: 'line',
                                            stacked: true,
                                            xField: 'strDescription',
                                            yField: 'TARIFA',
                                            style: {
                                                fill: '#fffcad',
                                                stroke: '#d4d396',
                                                lineWidth: 2
                                            },
                                            marker: {
                                                radius: 4,
                                                lineWidth: 2
                                            },
                                            label: {
                                                field: 'TARIFA',
                                                display: 'over',
                                                renderer: function (value, b, callout) {
                                                    callout.calloutVertical = false;
                                                    //return Ext.util.Format.number(value, '0')
                                                    return ''
                                                }
                                            },
                                            markerConfig: {
                                                radius: 4
                                            },
                                            highlight: {
                                                fill: '#fffcad',
                                                radius: 5,
                                                'stroke-width': 2,
                                                stroke: '#fff'
                                            },
                                            tooltip: {
                                                trackMouse: true,
                                                style: 'background: #FFF',
                                                height: 20,
                                                showDelay: 0,
                                                dismissDelay: 0,
                                                hideDelay: 0,
                                                renderer: function (toolTip, record, ctx) {
                                                    toolTip.setHtml('AVG : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0') + '</b>');
                                                }
                                            },
                                            renderer: 'onColumnRender'
                                        }
                                    ]
                                },
                            ]
                        },
                    ]
                },
// ========================================================= Fare Type =============================================
                {
                    xtype: 'panel',
                    id: prototype.id + '-BoxFare',
                    bodyStyle: 'background-color: #E3EAEF;',
                    hidden: true,
                    border: true,
//                            height: 'auto',
                    width: '100%',
                    margin: '0 0 0 0 ',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
//                            height: 'auto',
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'hbox',
                                align: 'left'
                            },
                            items: [
                                {
                                    xtype: 'radiogroup',
                                    id: prototype.id + '-radiogroupType_ft',
                                    width: 300,
                                    /*border: 1,
                                     style: {
                                     borderColor: 'black',
                                     borderStyle: 'solid'
                                     },*/
                                    items: [
                                        {boxLabel: '<b style="color:#148D28;">Source</b>', inputValue: 'S', name: 'rbgType_ft', checked: true},
                                        {boxLabel: '<b style="color:#148D28;">Cabin</b>', inputValue: 'C', name: 'rbgType_ft'},
                                        {boxLabel: '<b style="color:#148D28;">Zone</b>', inputValue: 'Z', name: 'rbgType_ft'},
                                    ],
                                    listeners: {
                                        change: 'rbChangeType_ft'
                                    }
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: false,
//                            height: 'auto',
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'hbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-BoxFareSource',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    hidden: true,
                                    border: false,
                                    margin: '0 0 0 0 ',
                                    layout: {
                                        type: 'hbox',
                                        //align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-ADG_GridFareSource',
                                            padding: '5px 0px 0px 0px',
                                            width: 985,
                                            //height: 338,
                                            columnLines: true,
                                            features: [
                                                {
                                                    ftype: 'summary',
                                                    dock: 'bottom'
                                                }
                                            ],
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {text: 'Fare',
                                                        columns: [
                                                            {
                                                                text: 'Type', dataIndex: 'strDescription', width: 90, align: 'center',
                                                                listeners: {
                                                                    click: 'click_detFareType_colHandler'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-weight:bold;text-align:left;";
                                                                    return '<a href="#" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'Total',
                                                        columns: [
                                                            {text: 'Coupons', dataIndex: 'CUPONS', width: 80, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-ADG_GridFareSource').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_CUPONS, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: '%', dataIndex: 'CUPONS_PERCENT', width: 80, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-ADG_GridFareSource').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>100%<b>';
                                                                }
                                                            },
                                                            {text: 'Amount', dataIndex: 'AMOUNT', width: 80, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-ADG_GridFareSource').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_AMOUNT, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: '%', dataIndex: 'AMOUNT_PERCENT', width: 80, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-ADG_GridFareSource').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>100%<b>';
                                                                }
                                                            },
                                                            {text: 'AVG', dataIndex: 'AVG', width: 80, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-ADG_GridFareSource').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totAVG, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {text: 'ASR',
                                                        columns: [
                                                            {text: 'Coupons', dataIndex: 'CUPONS_ASR', width: 80, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#70DB70;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-ADG_GridFareSource').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totCUPONS_ASR, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'Amount', dataIndex: 'AMOUNT_ASR', width: 80, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#70DB70;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-ADG_GridFareSource').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totAMOUNT_ASR, '0,000') + '<b>';
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {text: 'BSP',
                                                        columns: [
                                                            {text: 'Coupons', dataIndex: 'CUPONS_BSP', width: 80, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#ccffff;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-ADG_GridFareSource').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totCUPONS_BSP, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'Amount', dataIndex: 'AMOUNT_BSP', width: 80, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#ccffff;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-ADG_GridFareSource').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totAMOUNT_BSP, '0,000') + '<b>';
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {text: 'ARC',
                                                        columns: [
                                                            {text: 'Coupons', dataIndex: 'CUPONS_ARC', width: 80, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#FFCC66;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-ADG_GridFareSource').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totCUPONS_ARC, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'Amount', dataIndex: 'AMOUNT_ARC', width: 80, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#FFCC66;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-ADG_GridFareSource').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totAMOUNT_ARC, '0,000') + '<b>';
                                                                }
                                                            },
                                                        ]
                                                    },
                                                ]
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'polar',
                                            //                                                    title: '<div style="text-align:center;color:#6E6E73;font-size:10px">Total Documents</div>',
                                            id: prototype.id + '-ChartFareType',
                                            width: 450,
                                            height: 300,
                                            border: false,
//                                                margin: '0 0 0 5',
                                            innerPadding: 30,
                                            background: '#99CCFF',
                                            captions: {
                                                title: {
                                                    text: 'Fare Type - Amount',
                                                    //                                                            fieldStyle: 'font-size:5px',
                                                    alignTo: 'chart'
                                                }
                                            },
                                            animation: {
                                                duration: 200
                                            },
                                            interactions: ['rotate', 'itemhighlight'],
                                            //                                                    legend: {
                                            //                                                        docked: 'bottom',
                                            //               00                                         background: '#E3EAEF'
                                            //                                                    },
                                            series: [{
                                                    type: 'pie3d',
                                                    angleField: 'AMOUNT_PERCENT',
                                                    colors: ['#EC3838', '#FFBF00', '#A5DF00', '#F7BE81', '#01A9DB'],
                                                    label: {
                                                        field: 'strDescription'
                                                    },
                                                    highlight: true,
                                                    tooltip: {
                                                        trackMouse: true,
                                                        height: 28,
                                                        renderer: function (toolTip, record, ctx) {
                                                            var label = '';
                                                            //                                                                    if (ctx.field === 'QMATCH') {
                                                            //                                                                        label = 'Match';
                                                            toolTip.setHtml(record.get('strDescription') + ' , ' + '<b>' + Ext.util.Format.number(record.get('AMOUNT_PERCENT'), '0,000.00') + '%' + '</b>');
                                                        }
                                                    }
                                                }]

                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-BoxFareCabin',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    hidden: true,
                                    border: true,
                                    margin: '0 0 0 0 ',
                                    layout: {
                                        type: 'hbox',
                                        //align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-ADG_GridFareCabin',
                                            padding: '5px 0px 0px 0px',
                                            width: 985,
                                            //height: 338,
                                            columnLines: true,
                                            features: [
                                                {
                                                    ftype: 'summary',
                                                    dock: 'bottom'
                                                }
                                            ],
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {text: 'Fare',
                                                        columns: [
                                                            {
                                                                text: 'Type', dataIndex: 'strDescription', width: 90, align: 'center',
                                                                listeners: {
                                                                    click: 'click_detFareType_colHandler'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-weight:bold;text-align:left;";
                                                                    return '<a href="#" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'Total',
                                                        columns: [
                                                            {text: 'Coupons', dataIndex: 'CUPONS', width: 80, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-ADG_GridFareCabin').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_CUPONS, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: '%', dataIndex: 'CUPONS_PERCENT', width: 80, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>100%<b>';
                                                                }
                                                            },
                                                            {text: 'Amount', dataIndex: 'AMOUNT', width: 80, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-ADG_GridFareCabin').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_AMOUNT, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: '%', dataIndex: 'AMOUNT_PERCENT', width: 80, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>100%<b>';
                                                                }
                                                            },
                                                            {text: 'AVG', dataIndex: 'AVG', width: 80, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-ADG_GridFareCabin').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totAVG, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {text: 'First OAL',
                                                        columns: [
                                                            {text: 'Coupons', dataIndex: 'CUPON_F', width: 80, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#70DB70;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-ADG_GridFareCabin').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTCUPON_F, '0,000') + '<b>';
                                                                }

                                                            },
                                                            {text: 'Amount', dataIndex: 'AMOUNT_F', width: 80, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#70DB70;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-ADG_GridFareCabin').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTAMOUNT_F, '0,000') + '<b>';
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {text: 'Business',
                                                        columns: [
                                                            {text: 'Coupons', dataIndex: 'CUPON_J', width: 80, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#ccffff;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-ADG_GridFareCabin').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTCUPON_J, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'Amount', dataIndex: 'AMOUNT_J', width: 80, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#ccffff;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-ADG_GridFareCabin').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTAMOUNT_J, '0,000') + '<b>';
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {text: 'Economy',
                                                        columns: [
                                                            {text: 'Coupons', dataIndex: 'CUPON_Y', width: 80, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#FFCC66;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-ADG_GridFareCabin').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTCUPON_Y, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'Amount', dataIndex: 'AMOUNT_Y', width: 80, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#FFCC66;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-ADG_GridFareCabin').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTAMOUNT_Y, '0,000') + '<b>';
                                                                }
                                                            },
                                                        ]
                                                    },
                                                ]
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'polar',
                                            //                                                    title: '<div style="text-align:center;color:#6E6E73;font-size:10px">Total Documents</div>',
                                            id: prototype.id + '-ChartFareTypeCabin',
                                            width: 450,
                                            height: 300,
                                            border: false,
//                                                margin: '0 0 0 5',
                                            innerPadding: 30,
                                            background: '#99CCFF',
                                            captions: {
                                                title: {
                                                    text: 'Fare Type - Amount',
                                                    //                                                            fieldStyle: 'font-size:5px',
                                                    alignTo: 'chart'
                                                }
                                            },
                                            animation: {
                                                duration: 200
                                            },
                                            interactions: ['rotate', 'itemhighlight'],
                                            //                                                    legend: {
                                            //                                                        docked: 'bottom',
                                            //               00                                         background: '#E3EAEF'
                                            //                                                    },
                                            series: [{
                                                    type: 'pie3d',
                                                    angleField: 'AMOUNT_PERCENT',
                                                    colors: ['#EC3838', '#FFBF00', '#A5DF00', '#F7BE81', '#01A9DB'],
                                                    label: {
                                                        field: 'strDescription'
                                                    },
                                                    highlight: true,
                                                    tooltip: {
                                                        trackMouse: true,
                                                        height: 28,
                                                        renderer: function (toolTip, record, ctx) {
                                                            var label = '';
                                                            //                                                                    if (ctx.field === 'QMATCH') {
                                                            //                                                                        label = 'Match';
                                                            toolTip.setHtml(record.get('strDescription') + ' , ' + '<b>' + Ext.util.Format.number(record.get('AMOUNT_PERCENT'), '0,000.00') + '%' + '</b>');
                                                        }
                                                    }
                                                }]

                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-BoxFareZona',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    hidden: true,
                                    border: true,
                                    margin: '0 0 0 0 ',
                                    layout: {
                                        type: 'hbox',
                                        //align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-ADG_GridFareZona',
                                            padding: '5px 0px 0px 0px',
                                            width: 985,
                                            //height: 338,
                                            columnLines: true,
                                            features: [
                                                {
                                                    ftype: 'summary',
                                                    dock: 'bottom'
                                                }
                                            ],
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {
                                                        text: 'Zone', dataIndex: 'ZONA', width: 90,
                                                        listeners: {
                                                            click: 'click_detFareType_colHandler'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "font-weight:bold;text-align:center;";
                                                            return '<a href="#" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                        }
                                                    },
                                                    {text: 'Total',
                                                        columns: [
                                                            {text: 'Coupons', dataIndex: 'CUPONS', width: 80, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-ADG_GridFareZona').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_CUPONS, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: '%', dataIndex: 'CUPONS_PERCENT', width: 80, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>100%<b>';
                                                                }
                                                            },
                                                            {text: 'Amount', dataIndex: 'AMOUNT', width: 80, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-ADG_GridFareZona').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_AMOUNT, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: '%', dataIndex: 'AMOUNT_PERCENT', width: 80, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>100%<b>';
                                                                }
                                                            },
                                                            {text: 'AVG', dataIndex: 'AVG', width: 80, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-ADG_GridFareZona').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totAVG, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {text: 'First OAL',
                                                        columns: [
                                                            {text: 'Coupons', dataIndex: 'CUPON_F', width: 80, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#70DB70;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-ADG_GridFareZona').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTCUPON_F, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'Amount', dataIndex: 'AMOUNT_F', width: 80, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#70DB70;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-ADG_GridFareZona').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTAMOUNT_F, '0,000') + '<b>';
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {text: 'Business',
                                                        columns: [
                                                            {text: 'Coupons', dataIndex: 'CUPON_J', width: 80, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#ccffff;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-ADG_GridFareZona').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTCUPON_J, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'Amount', dataIndex: 'AMOUNT_J', width: 80, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#ccffff;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-ADG_GridFareZona').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTAMOUNT_J, '0,000') + '<b>';
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {text: 'Economy',
                                                        columns: [
                                                            {text: 'Coupons', dataIndex: 'CUPON_Y', width: 80, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#FFCC66;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-ADG_GridFareZona').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTCUPON_Y, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'Amount', dataIndex: 'AMOUNT_Y', width: 80, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#FFCC66;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-ADG_GridFareZona').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.TOTAMOUNT_Y, '0,000') + '<b>';
                                                                }
                                                            },
                                                        ]
                                                    },
                                                ]
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 30},
                                        {
                                            xtype: 'polar',
                                            //                                                    title: '<div style="text-align:center;color:#6E6E73;font-size:10px">Total Documents</div>',
                                            id: prototype.id + '-ChartFareTypeZona',
                                            width: 450,
                                            height: 350,
                                            border: false,
//                                                margin: '0 0 0 5',
                                            innerPadding: 60,
                                            background: '#99CCFF',
                                            captions: {
                                                title: {
                                                    text: 'Fare Type - Amount',
                                                    //                                                            fieldStyle: 'font-size:5px',
                                                    alignTo: 'chart'
                                                }
                                            },
                                            animation: {
                                                duration: 200
                                            },
                                            interactions: ['rotate', 'itemhighlight'],
                                            //                                                    legend: {
                                            //                                                        docked: 'bottom',
                                            //               00                                         background: '#E3EAEF'
                                            //                                                    },
                                            series: [{
                                                    type: 'pie3d',
                                                    angleField: 'AMOUNT_PERCENT',
                                                    colors: ['#EC3838', '#FFBF00', '#A5DF00', '#F7BE81', '#01A9DB'],
                                                    label: {
                                                        field: 'ZONA'
                                                    },
                                                    highlight: true,
                                                    tooltip: {
                                                        trackMouse: true,
                                                        height: 28,
                                                        renderer: function (toolTip, record, ctx) {
                                                            var label = '';
                                                            //                                                                    if (ctx.field === 'QMATCH') {
                                                            //                                                                        label = 'Match';
                                                            toolTip.setHtml(record.get('ZONA') + ' , ' + '<b>' + Ext.util.Format.number(record.get('AMOUNT_PERCENT'), '0,000.00') + '%' + '</b>');
                                                        }
                                                    }
                                                }]

                                        }
                                    ]
                                },
                            ]
                        },
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-BoxDetFare',
                    width: '100%',
                    hidden: true,
                    layout: {
                        type: 'vbox',
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
                        {xtype: 'label', id: prototype.id + '-titDetFare', text: '', style: "font-size:14px;font-weight:bold;width:60;padding:10px 0px 0px 10px;"},
                        {
                            xtype: 'panel',
                            layout: {
                                type: 'hbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetFare',
                                    padding: '5px 0px 0px 0px',
                                    width: 545,
                                    height: 600,
                                    columnLines: true,
                                    features: [{
                                            ftype: 'summary',
                                            dock: 'bottom'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Origin', dataIndex: 'CITYO', width: 80, align: 'center'},
                                            {text: 'Destination', dataIndex: 'CITYD', width: 80, align: 'center'},
                                            {
                                                text: 'Coupons', dataIndex: 'CUPONS', width: 90, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right";
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                    return value;
                                                }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDetFare').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_CUPONS, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: '%', dataIndex: 'CUPONS_PERCENT', width: 60, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right";
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '100%';
                                                }
                                            },
                                            {
                                                text: 'Amount', dataIndex: 'AMOUNT', width: 100, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right";
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                    return value;
                                                }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDetFare').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_AMOUNT, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: '%', dataIndex: 'AMOUNT_PERCENT', width: 60, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right";
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '100%';
                                                }
                                            },
                                            {
                                                text: 'Avg', dataIndex: 'AVG', width: 60, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right";
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                    return value;
                                                }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDetFare').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totAVG, '0,000.00') + '<b>';
                                                }
                                            }
                                        ]
                                    }
                                },
                                {xtype: 'tbspacer', width: 15},
                                {
                                    xtype: 'panel',
                                    width: 600,
                                    height: 600,
                                    bodyStyle: 'background-color: #99CCFF;',
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
//                                    border: 0.5,
                                    style: {
                                        borderColor: 'black',
                                        borderStyle: 'solid'
                                    },
                                    items: [
                                        {
                                            xtype: 'cartesian',
                                            id: prototype.id + '-displaySAChart38',
                                            margin: '0 10 0 0 ',
                                            flipXY: true,
                                            width: 550,
                                            height: 600,
                                            insetPadding: '20 10',
                                            background: '#99CCFF',
                                            captions: {
                                                title: {
                                                    text: 'Routes',
                                                    alignTo: 'chart'
                                                }
                                            },
                                            animation: {
                                                duration: 200
                                            },
                                            interactions: ['itemhighlight'],
                                            legend: {
                                                docked: 'bottom',
                                                background: '#E3EAEF'

                                            },
                                            axes: [
                                                {
                                                    type: 'numeric3d',
                                                    position: 'bottom',
                                                    majorTickSteps: 5,
                                                    fields: ['AMOUNT'],
                                                    title: 'Amount ',
                                                    grid: {
                                                        odd: {
                                                            fillStyle: 'rgba(245, 245, 245, 1.0)'
                                                        },
                                                        even: {
                                                            fillStyle: 'rgba(255, 255, 255, 1.0)'
                                                        }
                                                    },
                                                    renderer: function (obj, value) {
                                                        if (value > 1) {
                                                            return  ' ' + Ext.util.Format.number((value / 1000000), '0') + 'M';
                                                        } else {
                                                            return '';
                                                        }
                                                    }
                                                }, {
                                                    type: 'category3d',
                                                    position: 'left',
                                                    fields: 'strDescription',
                                                    grid: true,
                                                    label: {
                                                        textAlign: 'left'
                                                    },
                                                }],
                                            series: [{
                                                    type: 'bar3d',
                                                    stacked: false,
                                                    title: ['Amount'],
                                                    yField: ['AMOUNT'],
                                                    xField: 'strDescription',
                                                    //highlight: true,
                                                    style: {
                                                        inGroupGapWidth: -7
                                                    },
                                                    highlight: {
                                                        strokeStyle: 'rgba(0, 0, 0, .2)',
                                                        lineWidth: 1
                                                    },
                                                    tooltip: {
                                                        trackMouse: true,
                                                        //height: 28,
                                                        renderer: function (toolTip, record, ctx) {
                                                            //var label = record.get('strFormatDate') + ' ';
                                                            var label = ' ';
                                                            //                                            if (ctx.field === 'GROSS') {
//                                                                label += ' Net. : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>';
                                                            label += ' Net. : ' + '<b>' + Ext.util.Format.number(record.get('AMOUNT'), '0,000') + '</b>';
                                                            //                                            } else if (ctx.field === 'VALOR') {
                                                            //                                                label += ' Invoice : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>';
                                                            //                                            }
                                                            toolTip.setHtml(label);
                                                        }
                                                    }
                                                }]
                                        },
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background-color: #99CCFF;',
                                            layout: {
                                                type: 'vbox',
                                                align: 'center'
                                            },
                                            items: [
                                                {xtype: 'label', text: 'Top', style: "font-size:12px;font-weight:bold;"},
                                                {xtype: 'tbspacer', height: 5},
                                                {
                                                    xtype: 'slider',
                                                    fieldLabel: 'Top',
                                                    width: 15,
                                                    hideLabel: true,
                                                    value: 20,
                                                    height: 400,
                                                    vertical: true,
                                                    minValue: 5,
                                                    maxValue: 20,
                                                    tipText: function (thumb) {
                                                        return Ext.String.format('First {0} Routes  ', thumb.value);
                                                    },
                                                    listeners: {
                                                        change: 'onChangeTopFareType'
                                                    }

                                                }
                                            ]
                                        }


                                    ]
                                }

                            ]
                        }
                    ]


                },
// ========================================================= ALLIANCES =============================================
                {
                    xtype: 'panel',
                    id: prototype.id + '-BoxDetAlliances',
                    bodyStyle: 'background-color: #E3EAEF;',
                    hidden: true,
                    border: true,
//                            height: 'auto',
                    width: 851,
                    margin: '0 0 0 0 ',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        {xtype: 'label', id: prototype.id + '-titDetAlliances', text: '', style: "font-size:14px;font-weight:bold;width:60;padding:10px 0px 0px 10px;"},
                        {
                            xtype: 'grid',
                            id: prototype.id + '-GridDetAlliances',
                            width: '100%',
                            height: 350,
                            columnLines: true,
                            features: [{
                                    ftype: 'summary',
                                    dock: 'bottom'
                                }],
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                items: [
                                    {text: 'Carrier',
                                        columns: [
                                            {text: 'Code', dataIndex: 'CARRIER', width: 60, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "font-weight:bold;text-align:center;";
                                                    return  value;
                                                }
                                            },
                                            {
                                                text: 'Description', dataIndex: 'strDescription', width: 250, align: 'center',
                                                listeners: {
                                                    click: 'click_detailPaisAlliances_colHandler'
//                                                        args: ['MIN']
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "font-weight:bold;text-align:left;";
                                                    return '<a href="#" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Coupons', dataIndex: 'CUPONS', width: 150, align: 'center',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right";
                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                            //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                            return value;
                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-GridDetAlliances').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.CUPONS_OFF, '0,000') + '<b>';
                                        }
                                    },
                                    {
                                        text: '%', dataIndex: 'Perc1', width: 75, align: 'center',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right";
                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                            return value;
                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '100%';
                                        }
                                    },
                                    {
                                        text: 'Amount', dataIndex: 'AMOUNT', width: 150, align: 'center',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right";
                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                            //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                            return value;
                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-GridDetAlliances').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.AMOUNT_OFF, '0,000') + '<b>';
                                        }
                                    },
                                    {
                                        text: '%', dataIndex: 'Perc2', width: 75, align: 'center',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right";
                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                            //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                            return value;
                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '100%';
                                        }
                                    },
                                    {
                                        text: 'Avg', dataIndex: 'AVG', width: 75, align: 'center',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right";
                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                            //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                            return value;
                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-GridDetAlliances').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totAVG, '0,000') + '<b>';
                                        }
                                    },
                                    {text: 'NON REVENUE',
                                        hidden: true,
                                        columns: [
                                            {
                                                text: 'Cpns', dataIndex: 'QCPNS0', width: 80, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#b6d8ee;";
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                    //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                    return value;
                                                }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-GridDetAlliances').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_QCPNS0, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'USD', dataIndex: 'AMOUNT0', width: 90, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#b6d8ee;";
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                    //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                    return value;
                                                }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-GridDetAlliances').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_AMOUNT0, '0,000') + '<b>';
                                                }
                                            }
                                        ]
                                    }

                                ]
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-BoxDetPaisAlliances',
                    bodyStyle: 'background-color: #E3EAEF;',
                    hidden: true,
                    border: true,
//                            height: 'auto',
                    width: 746,
                    margin: '0 0 0 0 ',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        {xtype: 'label', id: prototype.id + '-titDetPaisAlliances', text: '', style: "font-size:14px;font-weight:bold;width:60;padding:10px 0px 0px 10px;"},
                        {
                            xtype: 'grid',
                            id: prototype.id + '-GridDetPaisAlliances',
                            width: '100%',
                            height: 350,
                            columnLines: true,
                            features: [{
                                    ftype: 'summary',
                                    dock: 'bottom'
                                }],
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
                                            metaData.style = "text-align:center;";
                                            return value;
                                        },
                                    },
                                    {
                                        text: 'Country of Sales', dataIndex: 'COUNTRY_NAME', width: 250, align: 'center',
                                        listeners: {
                                            click: 'click_detailAgenteAlliances_colHandler'
//                                                        args: ['MIN']
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-weight:bold;text-align:left;";
                                            return '<a href="#" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                        }
                                    },
                                    {
                                        text: 'Coupons', dataIndex: 'CUPONS', width: 110, align: 'center',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right";
                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                            //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                            return value;
                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-GridDetPaisAlliances').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.TOTAL_CUPONS, '0,000') + '<b>';
                                        }
                                    },
                                    {
                                        text: '%', dataIndex: 'CUPONS_PERCENT', width: 70, align: 'center',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right";
                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                            return value;
                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '100%';
                                        }
                                    },
                                    {
                                        text: 'Amount', dataIndex: 'AMOUNT', width: 110, align: 'center',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right";
                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                            //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                            return value;
                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-GridDetPaisAlliances').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.TOTAL_AMOUNT, '0,000') + '<b>';
                                        }
                                    },
                                    {
                                        text: '%', dataIndex: 'AMOUNT_PERCENT', width: 70, align: 'center',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right";
                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                            //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                            return value;
                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '100%';
                                        }
                                    },
                                    {
                                        text: 'Avg', dataIndex: 'TARIFA', width: 70, align: 'center',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right";
                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                            //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                            return value;
                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-GridDetPaisAlliances').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.TOTAL_AVG, '0,000.00') + '<b>';
                                        }
                                    },
                                    {text: 'NON REVENUE',
                                        hidden: true,
                                        columns: [
                                            {
                                                text: 'Cpns', dataIndex: 'QCPNS0', width: 80, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#b6d8ee;";
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                    //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                    return value;
                                                }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-GridDetPaisAlliances').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_QCPNS0, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'USD', dataIndex: 'AMOUNT0', width: 90, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#b6d8ee;";
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                    //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                    return value;
                                                }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-GridDetPaisAlliances').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_AMOUNT0, '0,000') + '<b>';
                                                }
                                            }
                                        ]
                                    }

                                ]
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-BoxDetAgenteAlliances',
                    bodyStyle: 'background-color: #E3EAEF;',
                    hidden: true,
                    border: true,
//                            height: 'auto',
                    width: 801,
                    margin: '0 0 0 0 ',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        {xtype: 'label', id: prototype.id + '-titDetAgenteAlliances', text: '', style: "font-size:14px;font-weight:bold;width:60;padding:10px 0px 0px 10px;"},
                        {
                            xtype: 'grid',
                            id: prototype.id + '-GridDetAgenteAlliances',
                            width: '100%',
                            height: 350,
                            columnLines: true,
                            features: [{
                                    ftype: 'summary',
                                    dock: 'bottom'
                                }],
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
                                            metaData.style = "text-align:center;";
                                            return value;
                                        },
                                    },
                                    {text: 'Agent', dataIndex: 'VENDOR', width: 75, align: 'center'},
                                    {text: 'Agent Name', dataIndex: 'strDescription', width: 250, align: 'left'},
                                    {
                                        text: 'Coupons', dataIndex: 'CUPONS', width: 90, align: 'center',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right";
                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                            //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                            return value;
                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-GridDetAgenteAlliances').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.TOTAL_CUPONS, '0,000') + '<b>';
                                        }
                                    },
                                    {
                                        text: '%', dataIndex: 'CUPONS_PERCENT', width: 70, align: 'center',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right";
                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                            return value;
                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '100%';
                                        }
                                    },
                                    {
                                        text: 'Amount', dataIndex: 'AMOUNT', width: 110, align: 'center',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right";
                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                            //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                            return value;
                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-GridDetAgenteAlliances').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.TOTAL_AMOUNT, '0,000') + '<b>';
                                        }
                                    },
                                    {
                                        text: '%', dataIndex: 'AMOUNT_PERCENT', width: 70, align: 'center',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right";
                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                            //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                            return value;
                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '100%';
                                        }
                                    },
                                    {
                                        text: 'Avg', dataIndex: 'TARIFA', width: 70, align: 'center',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right";
                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                            //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                            return value;
                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-GridDetAgenteAlliances').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.TOTAL_AVG, '0,000.00') + '<b>';
                                        }
                                    },
                                    {text: 'NON REVENUE',
                                        hidden: true,
                                        columns: [
                                            {
                                                text: 'Cpns', dataIndex: 'QCPNS0', width: 80, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#b6d8ee;";
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                    //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                    return value;
                                                }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-GridDetAgenteAlliances').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_QCPNS0, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'USD', dataIndex: 'AMOUNT0', width: 90, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#b6d8ee;";
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                    //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                    return value;
                                                }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-GridDetAgenteAlliances').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_AMOUNT0, '0,000') + '<b>';
                                                }
                                            }
                                        ]
                                    }

                                ]
                            }
                        }
                    ]
                },
//                      -------------------- Routing Type ----------------------------------------                
                {
                    xtype: 'panel',
                    id: prototype.id + '-BoxRouting',
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
                                type: 'hbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-ADG_GridRouting',
                                    padding: '5px 0px 0px 0px',
                                    width: 525,
                                    height: 338,
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
                                            {text: 'Routing',
                                                columns: [
                                                    {
                                                        text: 'Type', dataIndex: 'strDescription', width: 90, align: 'center',
                                                        listeners: {
                                                            click: 'click_detRouting_colHandler'
//                                                        args: ['MIN']
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "font-weight:bold;text-align:left;";
                                                            return '<a href="#" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Trip',
                                                columns: [
                                                    {text: 'Type', dataIndex: 'strDescription1', width: 50, align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "font-weight:bold;text-align:center;";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Coupons', dataIndex: 'CUPONS', width: 90, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right";
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                    //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                    return value;
                                                }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-ADG_GridRouting').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_CUPONS, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: '%', dataIndex: 'CUPONS_PERCENT', width: 60, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right";
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                    return value;
                                                }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '100%';
                                                }
                                            },
                                            {
                                                text: 'Amount', dataIndex: 'AMOUNT', width: 100, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right";
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                    //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                    return value;
                                                }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-ADG_GridRouting').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_AMOUNT, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: '%', dataIndex: 'AMOUNT_PERCENT', width: 60, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right";
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                    //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                    return value;
                                                }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '100%';
                                                }
                                            },
                                            {
                                                text: 'Avg', dataIndex: 'AVG', width: 60, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right";
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                    //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                    return value;
                                                }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-ADG_GridRouting').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totAVG, '0,000.00') + '<b>';
                                                }
                                            }



                                        ]
                                    }
                                },
                                {xtype: 'tbspacer', width: 15},
                                {
                                    xtype: 'panel',
                                    width: 500,
                                    height: 338,
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
//                                    border: 0.5,
                                    style: {
                                        borderColor: 'black',
                                        borderStyle: 'solid'
                                    },
                                    items: [
                                        {
                                            xtype: 'polar',
                                            //                                                    title: '<div style="text-align:center;color:#6E6E73;font-size:10px">Total Documents</div>',
                                            id: prototype.id + '-ChtSalesAnalysis35_PC',
                                            width: '100%',
                                            border: true,
//                                                margin: '0 0 0 5',
                                            innerPadding: 60,
                                            height: '100%',
                                            background: '#99CCFF',
                                            captions: {
                                                title: {
                                                    text: 'Routing Type - Amount',
                                                    //                                                            fieldStyle: 'font-size:5px',
                                                    alignTo: 'chart'
                                                }
                                            },
                                            animation: {
                                                duration: 200
                                            },
                                            interactions: ['rotate', 'itemhighlight'],
                                            //                                                    legend: {
                                            //                                                        docked: 'bottom',
                                            //               00                                         background: '#E3EAEF'
                                            //                                                    },
                                            series: [{
                                                    type: 'pie3d',
                                                    angleField: 'AMOUNT_PERCENT',
                                                    colors: ['#EC3838', '#FFBF00', '#A5DF00', '#F7BE81', '#01A9DB'],
                                                    label: {
                                                        field: 'strDescription'
                                                    },
                                                    highlight: true,
                                                    tooltip: {
                                                        trackMouse: true,
                                                        height: 28,
                                                        renderer: function (toolTip, record, ctx) {
                                                            var label = '';
                                                            //                                                                    if (ctx.field === 'QMATCH') {
                                                            //                                                                        label = 'Match';
                                                            toolTip.setHtml(record.get('strDescription') + ' , ' + '<b>' + Ext.util.Format.number(record.get('AMOUNT_PERCENT'), '0,000.00') + '%' + '</b>');
                                                        }
                                                    }
                                                }]

                                        }
                                    ]
                                }

                            ]
                        }
                    ]


                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-BoxDetRouting',
                    width: '100%',
                    hidden: true,
                    layout: {
                        type: 'vbox',
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
                        {xtype: 'label', id: prototype.id + '-titDetRouting', text: '', style: "font-size:14px;font-weight:bold;width:60;padding:10px 0px 0px 10px;"},
                        {
                            xtype: 'panel',
                            layout: {
                                type: 'hbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetRouting',
                                    padding: '5px 0px 0px 0px',
                                    width: 770,
                                    height: 600,
                                    columnLines: true,
                                    features: [{
                                            ftype: 'summary',
                                            dock: 'bottom'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Origin', dataIndex: 'CITYO', width: 80, align: 'center'},
                                            {text: 'Destination', dataIndex: 'CITYD', width: 80, align: 'center'},
                                            {text: 'Routing', dataIndex: 'strDescription', width: 150, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left";
                                                    return value;
                                                }
                                            },
                                            {text: 'Trip',
                                                columns: [
                                                    {text: 'Type', dataIndex: 'strDescription1', width: 65, align: 'center'}
                                                ]
                                            },
                                            {
                                                text: 'Coupons', dataIndex: 'CUPONS', width: 90, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right";
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                    //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                    return value;
                                                }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDetRouting').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_CUPONS, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: '%', dataIndex: 'CUPONS_PERCENT', width: 60, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right";
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                    return value;
                                                }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '100%';
                                                }
                                            },
                                            {
                                                text: 'Amount', dataIndex: 'AMOUNT', width: 100, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right";
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                    //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                    return value;
                                                }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDetRouting').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_AMOUNT, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: '%', dataIndex: 'AMOUNT_PERCENT', width: 60, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right";
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                    //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                    return value;
                                                }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '100%';
                                                }
                                            },
                                            {
                                                text: 'Avg', dataIndex: 'AVG', width: 60, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right";
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                    //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                    return value;
                                                }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDetRouting').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totAVG, '0,000.00') + '<b>';
                                                }
                                            }



                                        ]
                                    }
                                },
                                {xtype: 'tbspacer', width: 15},
                                {
                                    xtype: 'panel',
                                    width: 600,
                                    height: 600,
                                    bodyStyle: 'background-color: #99CCFF;',
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
//                                    border: 0.5,
                                    style: {
                                        borderColor: 'black',
                                        borderStyle: 'solid'
                                    },
                                    items: [
                                        {
                                            xtype: 'cartesian',
                                            id: prototype.id + '-ChtSalesAnalysis36MSBC',
                                            margin: '0 10 0 0 ',
                                            flipXY: true,
                                            width: 550,
                                            height: 600,
                                            insetPadding: '20 10',
                                            background: '#99CCFF',
                                            captions: {
                                                title: {
                                                    text: 'Routes',
                                                    alignTo: 'chart'
                                                }
                                            },
                                            animation: {
                                                duration: 200
                                            },
                                            interactions: ['itemhighlight'],
                                            legend: {
                                                docked: 'bottom',
                                                background: '#E3EAEF'

                                            },
                                            axes: [
                                                {
                                                    type: 'numeric3d',
                                                    position: 'bottom',
                                                    majorTickSteps: 5,
                                                    fields: ['AMOUNT'],
                                                    title: 'Amount ',
                                                    grid: {
                                                        odd: {
                                                            fillStyle: 'rgba(245, 245, 245, 1.0)'
                                                        },
                                                        even: {
                                                            fillStyle: 'rgba(255, 255, 255, 1.0)'
                                                        }
                                                    },
                                                    renderer: function (obj, value) {
                                                        if (value > 1) {
                                                            return ' ' + Ext.util.Format.number((value / 1000000), '0,000') + 'M ';
                                                        } else {
                                                            return '';
                                                        }
                                                    }
                                                }, {
                                                    type: 'category3d',
                                                    position: 'left',
                                                    fields: 'strDescription',
                                                    grid: true,
                                                    label: {
                                                        textAlign: 'left'
                                                    },
                                                }],
                                            series: [{
                                                    type: 'bar3d',
                                                    stacked: false,
                                                    title: ['Amount'],
                                                    yField: ['AMOUNT'],
                                                    xField: 'strDescription',
                                                    //highlight: true,
                                                    style: {
                                                        inGroupGapWidth: -7
                                                    },
                                                    highlight: {
                                                        strokeStyle: 'rgba(0, 0, 0, .2)',
                                                        lineWidth: 1
                                                    },
                                                    tooltip: {
                                                        trackMouse: true,
                                                        //height: 28,
                                                        renderer: function (toolTip, record, ctx) {
                                                            //var label = record.get('strFormatDate') + ' ';
                                                            var label = ' ';
                                                            //                                            if (ctx.field === 'GROSS') {
//                                                                label += ' Net. : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>';
                                                            label += ' Net. : ' + '<b>' + Ext.util.Format.number(record.get('AMOUNT'), '0,000') + '</b>';
                                                            //                                            } else if (ctx.field === 'VALOR') {
                                                            //                                                label += ' Invoice : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>';
                                                            //                                            }
                                                            toolTip.setHtml(label);
                                                        }
                                                    }
                                                }]
                                        },
                                        {
                                            xtype: 'panel',
//                                                background: '#99CCFF',
                                            bodyStyle: 'background-color: #99CCFF;',
                                            layout: {
                                                type: 'vbox',
                                                align: 'center'
                                            },
                                            items: [
                                                {xtype: 'label', text: 'Top', style: "font-size:12px;font-weight:bold;"},
                                                {xtype: 'tbspacer', height: 5},
                                                {
                                                    xtype: 'slider',
                                                    fieldLabel: 'Top',
                                                    width: 15,
                                                    hideLabel: true,
                                                    value: 20,
                                                    height: 400,
                                                    vertical: true,
                                                    minValue: 5,
                                                    maxValue: 20,
                                                    tipText: function (thumb) {
                                                        return Ext.String.format('First {0} Routes  ', thumb.value);
                                                    },
                                                    listeners: {
                                                        change: 'onChangeTopRoute'
                                                    }

                                                }
                                            ]
                                        }


                                    ]
                                }

                            ]
                        }
                    ]


                },
//                      -------------------- GDS ----------------------------------------                
                {
                    xtype: 'panel',
                    id: prototype.id + '-BoxGDS',
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
                                type: 'hbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridGDS',
                                    padding: '5px 0px 0px 0px',
                                    width: 895,
                                    height: 368,
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
                                            {text: 'GDS',
                                                columns: [
                                                    {
                                                        text: 'Code', dataIndex: 'GDS', width: 70, align: 'center',
                                                        listeners: {
                                                            click: 'click_detailGDS_colHandler'
//                                                        args: ['MIN']
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "font-weight:bold;text-align:center;background:#d5f4d5;";
                                                            return '<a href="#" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                        }
                                                    },
                                                    {text: 'Description', dataIndex: 'strDescription', width: 220, align: 'left',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "font-weight:bold;text-align:left;";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Tickets',
                                                columns: [
                                                    {
                                                        text: 'Coupons', dataIndex: 'TKT', width: 100, align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right; ";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridGDS').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totTKT, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: '%', dataIndex: 'Perc3', width: 75, align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right; ";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            return '100%';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Coupons',
                                                columns: [
                                                    {
                                                        text: 'Qty', dataIndex: 'CUPONS', width: 100, align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right; ";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridGDS').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.TOTAL_CUPONS, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: '%', dataIndex: 'Perc1', width: 75, align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right; ";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            return '100%';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Amount',
                                                columns: [
                                                    {
                                                        text: 'USD', dataIndex: 'AMOUNT', width: 100, align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right; ";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridGDS').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.TOTAL_AMOUNT, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: '%', dataIndex: 'Perc2', width: 75, align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right; ";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            return '100%';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Avg', dataIndex: 'AVG', width: 75,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right; ";
                                                    return Ext.util.Format.number(value, '0,000.000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = "text-align:right;";
                                                    var data = Ext.getCmp(prototype.id + '-gridGDS').getStore().getData().items[0].data;
                                                    return Ext.util.Format.number(data.totAVG2, '0,000.00');
                                                }
                                            }


                                        ]
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    width: 500,
                                    height: 368,
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
//                                    border: 0.5,
                                    style: {
                                        borderColor: 'black',
                                        borderStyle: 'solid'
                                    },
                                    items: [
                                        {
                                            xtype: 'polar',
                                            //                                                    title: '<div style="text-align:center;color:#6E6E73;font-size:10px">Total Documents</div>',
                                            id: prototype.id + '-ChtSalesAnalysis41_PC',
                                            width: '100%',
                                            border: true,
//                                                margin: '0 0 0 5',
                                            innerPadding: 60,
                                            height: '100%',
                                            background: '#99CCFF',
                                            captions: {
                                                title: {
                                                    text: 'GDS - Amount',
                                                    //                                                            fieldStyle: 'font-size:5px',
                                                    alignTo: 'chart'
                                                }
                                            },
                                            animation: {
                                                duration: 200
                                            },
                                            interactions: ['rotate', 'itemhighlight'],
                                            //                                                    legend: {
                                            //                                                        docked: 'bottom',
                                            //                                                        background: '#E3EAEF'
                                            //                                                    },
                                            series: [{
                                                    type: 'pie3d',
                                                    angleField: 'Perc2',
                                                    colors: ['#EC3838', '#FFBF00', '#A5DF00', '#F7BE81', '#01A9DB'],
                                                    label: {
                                                        field: 'strDescription'
                                                    },
                                                    highlight: true,
                                                    tooltip: {
                                                        trackMouse: true,
                                                        height: 28,
                                                        renderer: function (toolTip, record, ctx) {
                                                            var label = '';
                                                            //                                                                    if (ctx.field === 'QMATCH') {
                                                            //                                                                        label = 'Match';
                                                            //                                                                    } else if (ctx.field === 'QLIQUI') {
                                                            //                                                                        label = 'Settlement';
                                                            //                                                                    } else if (ctx.field === 'QBANK') {
                                                            //                                                                        label = 'Bank';
                                                            //                                                                    } else if (ctx.field === 'QDIFF') {
                                                            //                                                                        label = 'Diff';
                                                            //                                                                    }
                                                            //                                                                    toolTip.setHtml(record.get('TOOLTIP'));
//                                                            toolTip.setHtml(record.get('strDescription') + ' , ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + '%' + '</b>');
                                                            toolTip.setHtml(record.get('strDescription') + ' , ' + '<b>' + Ext.util.Format.number(record.get('Perc2'), '0,000.00') + '%' + '</b>');
                                                        }
                                                    }
                                                }]

                                        }
                                    ]
                                }

                            ]
                        }
                    ]


                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-BoxDetGDS',
                    bodyStyle: 'background-color: #E3EAEF;',
                    hidden: true,
                    border: true,
//                            height: 'auto',
                    width: 985,
                    margin: '0 0 0 0 ',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        {xtype: 'label', id: prototype.id + '-lblTitDetGDS', text: 'GDS', style: "font-size:14px;font-weight:bold;width:60;padding:10px 0px 0px 10px;"},
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDetailGDS',
                            width: 935,
                            height: 500,
                            columnLines: true,
                            features: [{
                                    ftype: 'summary',
                                    dock: 'bottom'
                                }],
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                items: [
                                    {text: 'Sales',
                                        columns: [
                                            {text: 'Source', dataIndex: 'FTE', width: 70, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "font-weight:bold;text-align:center;";
                                                    return value;
                                                }
                                            }
                                        ]
                                    },
                                    {text: 'Country',
                                        columns: [
                                            {
                                                text: 'Code', dataIndex: 'COUNTRY', width: 70, align: 'center',
                                                listeners: {
                                                    click: 'click_detailGDSAgte_colHandler'
//                                                        args: ['MIN']
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "font-weight:bold;text-align:center;background:#d5f4d5;";
                                                    return '<a href="#" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                }
                                            },
                                            {text: 'Description', dataIndex: 'strDescription1', width: 200, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "font-bold:bold;text-align:left;";
                                                    return  value;
                                                }
                                            }
                                        ]
                                    },
                                    {text: 'Tickets',
                                        columns: [
                                            {
                                                text: 'Qty', dataIndex: 'TKT', width: 100, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right";
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                    //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                    return value;
                                                }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDetailGDS').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totTKT, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: '%', dataIndex: 'Perc3', width: 70, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right";
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                    //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                    return value;
                                                }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '100%';
                                                }
                                            }
                                        ]
                                    },
                                    {text: 'Coupons',
                                        columns: [
                                            {
                                                text: 'Qty', dataIndex: 'CUPONS', width: 100, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right";
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                    //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                    return value;
                                                }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDetailGDS').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_CUPONS, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: '%', dataIndex: 'Perc1', width: 70, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right";
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                    //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                    return value;
                                                }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '100%';
                                                }
                                            }
                                        ]
                                    },
                                    {text: 'Amount',
                                        columns: [
                                            {
                                                text: 'Qty', dataIndex: 'AMOUNT', width: 100, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right";
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                    //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                    return value;
                                                }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDetailGDS').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_AMOUNT, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: '%', dataIndex: 'Perc1', width: 70, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right";
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                    //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                    return value;
                                                }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '100%';
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Avg', dataIndex: 'AVG', width: 70,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right";
                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                            //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                            return value;
                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDetailGDS').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totAVG2, '0,000.00') + '<b>';
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-BoxDetGDSAgte',
                    bodyStyle: 'background-color: #E3EAEF;',
                    hidden: true,
                    border: true,
                    //                            height: 'auto',
                    width: 985,
                    margin: '0 0 0 0 ',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        {xtype: 'label', id: prototype.id + '-lblTitDetGDSAgte', text: 'GDS', style: "font-size:14px;font-weight:bold;width:60;padding:10px 0px 0px 10px;"},
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDetailGDSAgte',
                            width: 675,
                            height: 417,
                            columnLines: true,
                            features: [{
                                    ftype: 'summary',
                                    dock: 'bottom'
                                }],
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                items: [
                                    {text: 'Sales',
                                        columns: [
                                            {text: 'Agent', dataIndex: 'VENDOR', width: 90, align: 'center',
                                                listeners: {
                                                    click: 'click_detailGDSTkt_colHandler'
                                                            //                                                        args: ['MIN']
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "font-weight:bold;text-align:center;background:#d5f4d5;";
                                                    return '<a href="#" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                }
                                            }
                                        ]
                                    },
                                    {text: 'Tickets',
                                        columns: [
                                            {
                                                text: 'Qty', dataIndex: 'TKT', width: 100, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right";
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                    //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                    return value;
                                                }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDetailGDS').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totTKT, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: '%', dataIndex: 'Perc3', width: 70, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right";
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                    //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                    return value;
                                                }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '100%';
                                                }
                                            }
                                        ]
                                    },
                                    {text: 'Coupons',
                                        columns: [
                                            {
                                                text: 'Qty', dataIndex: 'CUPONS', width: 100, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right";
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                    //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                    return value;
                                                }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDetailGDS').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_CUPONS, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: '%', dataIndex: 'Perc1', width: 70, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right";
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                    //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                    return value;
                                                }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '100%';
                                                }
                                            }
                                        ]
                                    },
                                    {text: 'Amount',
                                        columns: [
                                            {
                                                text: 'Qty', dataIndex: 'AMOUNT', width: 100, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right";
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '<b>';
                                                    //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                    return value;
                                                }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDetailGDS').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_AMOUNT, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: '%', dataIndex: 'Perc1', width: 70, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right";
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                                    //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                    return value;
                                                }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '100%';
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Avg', dataIndex: 'AVG', width: 70,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right";
                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                            //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                            return value;
                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDetailGDS').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totAVG2, '0,000.00') + '<b>';
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-BoxDetGDSTkt',
                    bodyStyle: 'background-color: #E3EAEF;',
                    hidden: true,
                    border: true,
                    //                            height: 'auto',
                    width: 1200,
                    margin: '0 0 0 0 ',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        {xtype: 'label', id: prototype.id + '-lblTitDetGDSTkt', text: '', style: "font-size:14px;font-weight:bold;width:60;padding:10px 0px 0px 10px;"},
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDetailGDSTkt',
                            width: 1195,
                            height: 417,
                            columnLines: true,
                            features: [{
                                    ftype: 'summary',
                                    dock: 'bottom'
                                }],
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                items: [
                                    {text: 'Nbr.', dataIndex: 'RN', width: 45, align: 'center'},
                                    {text: 'Ticket Number', dataIndex: 'TICKET', width: 130, align: 'center',
                                        listeners: {
                                            click: 'viewMasterTkt'
//                                                        args: ['MIN']
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-weight:bold;text-align:center;background:#d5f4d5;";
                                            return '<a href="#" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                        }
                                    },
                                    {text: 'PNR', dataIndex: 'PNR', width: 90, align: 'center'},
                                    {text: 'Sales Date', dataIndex: 'strFormatDate', width: 80, align: 'center'},
                                    {text: 'PNR', dataIndex: 'PNR', width: 45, align: 'center'},
                                    {text: 'Flight',
                                        columns: [
                                            {text: 'Number', dataIndex: 'A720NVLO', width: 80, align: 'center'},
                                            {text: 'Date', dataIndex: 'A720FVLO', width: 90, align: 'center'}
                                        ]
                                    },
                                    {text: 'Fare Base', dataIndex: 'A720FBORI', width: 100, align: 'center'},
                                    {text: 'Book', dataIndex: 'A720BOOKI', width: 50, align: 'center'},
                                    {text: 'Class', dataIndex: 'A720CLASE', width: 50, align: 'center'},
                                    {text: 'Carrier', dataIndex: 'A720CARRA', width: 60, align: 'center'},
                                    {text: 'CurrencyL', dataIndex: 'A720MDAFA', width: 70, align: 'center'},
                                    {text: 'Fare', dataIndex: 'A720FARE', width: 70, align: 'center',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right";
                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                            //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                            return value;
                                        }
                                    },
                                    {text: 'Sector', dataIndex: 'strDescripcion4', width: 90, align: 'center'},
                                    {text: 'Currency', dataIndex: 'A720MDAPAG', width: 70, align: 'center'},
                                    {text: 'Value', dataIndex: 'A720VALOR', width: 70, align: 'center',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right";
                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '<b>';
                                            //                                                    return '<a href="#payments-boomer-reconciliation-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                            return value;
                                        }
                                    }
//                                            {text: 'T', dataIndex: 'CANAV', width: 1, align: 'center'},
                                ]
                            }
                        }
                    ]
                },
//              ------------------------ COMPARE ------------------------------
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxCompare',
                    width: '100%',
                    height: 680,
                    hidden: true,
                    layout: {
                        type: 'vbox',
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
                                type: 'hbox',
//                                        align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-GridtotalMonth_1',
                                    width: 403,
                                    height: 'auto',
                                    columnLines: true,
                                    margin: "5 0 0 0",
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
                                                text: ' &nbsp ',
                                                id: prototype.id + '-lbl1',
                                                defaults: {
                                                    menuDisabled: true, sortable: false, align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Sales Date', dataIndex: 'strFormatDate', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center";
                                                            return '<b>' + value + '<b>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-GridtotalMonth_1').getStore().getData().items[0].data;

                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totISCI_LY, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Cpns', dataIndex: 'CUPONS', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#d5f4d5;text-align:right";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-GridtotalMonth_1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTAL_CUPONS, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'USD', dataIndex: 'AMOUNT', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#d5f4d5;text-align:right";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-GridtotalMonth_1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTAL_AMOUNT, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'AVG', dataIndex: 'AVG', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#d5f4d5;text-align:right";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-GridtotalMonth_1').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totAVG, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-GridtotalMonth_2',
                                    width: 402,
//                                            height: 348,
                                    height: 'auto',
                                    columnLines: true,
                                    margin: "5 0 0 0",
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
                                                text: ' &nbsp ',
                                                id: prototype.id + '-lbl2',
                                                defaults: {
                                                    menuDisabled: true, sortable: false, align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Sales Date', dataIndex: 'strFormatDate', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center";
                                                            return '<b>' + value + '<b>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-GridtotalMonth_2').getStore().getData().items[0].data;

                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totISCI_LY, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Cpns', dataIndex: 'CUPONS', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#d5f4d5;text-align:right";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-GridtotalMonth_2').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTAL_CUPONS, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'USD', dataIndex: 'AMOUNT', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#d5f4d5;text-align:right";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-GridtotalMonth_2').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTAL_AMOUNT, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'AVG', dataIndex: 'AVG', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#d5f4d5;text-align:right";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-GridtotalMonth_2').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totAVG, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-GridtotalMonth_3',
                                    width: 403,
                                    height: 'auto',
                                    columnLines: true,
                                    margin: "5 0 0 0",
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
                                                text: ' &nbsp ',
                                                id: prototype.id + '-lbl3',
                                                defaults: {
                                                    menuDisabled: true, sortable: false, align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Sales Date', dataIndex: 'strFormatDate', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center";
                                                            return '<b>' + value + '<b>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-GridtotalMonth_3').getStore().getData().items[0].data;

                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totISCI_LY, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Cpns', dataIndex: 'CUPONS', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#d5f4d5;text-align:right";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-GridtotalMonth_3').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTAL_CUPONS, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'USD', dataIndex: 'AMOUNT', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#d5f4d5;text-align:right";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-GridtotalMonth_3').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTAL_AMOUNT, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'AVG', dataIndex: 'AVG', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#d5f4d5;text-align:right";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-GridtotalMonth_3').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totAVG, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                }

                            ]
                        },
                        {
                            xtype: 'panel',
                            bodyStyle: 'background-color: #E3EAEF;',
                            padding: '5 0 0 5',
                            border: true,
                            layout: {
                                type: 'vbox'
                            },
                            items: [
                                {
                                    xtype: 'cartesian',
                                    // title: '<div style="text-align:center;color:#6E6E73;font-size:14px">Passenger by Market</div>',
                                    id: prototype.id + '-displaySAChart42',
                                    width: 1450,
                                    border: false,
                                    height: 290,
                                    background: '#E0F8F7',
                                    captions: {
                                        title: {
                                            text: 'Amount (USD)',
                                            alignTo: 'chart'
                                        }
                                    },
                                    animation: {
                                        duration: 200
                                    },
                                    interactions: ['itemhighlight'],
                                    legend: {
                                        docked: 'bottom',
                                        background: '#E3EAEF'
                                    },
                                    axes: [{
                                            type: 'numeric3d',
                                            position: 'left',
                                            fields: ['year1_amount', 'year2_amount', 'year3_amount'],
                                            grid: true,
                                            title: '',
                                            //title: 'Millions of USD',
                                            renderer: function (obj, value) {
                                                if (value > 1) {
                                                    if ((value / 1000).toString().length > 3) {
                                                        return  ' ' + Ext.util.Format.number((value / 1000000), '0.0') + 'M';
                                                    } else {
                                                        return  ' ' + Ext.util.Format.number((value / 1000), '0') + 'K';
                                                    }
                                                } else {
                                                    return '';
                                                }
                                            }
                                        }, {
                                            type: 'category3d',
                                            position: 'bottom',
//                                                            fields: 'strFormatDate',
                                            grid: true,
                                            title: {
                                                text: 'Years',
                                                translationX: -30
                                            }
                                        }],
                                    series: [{
                                            type: 'bar3d',
                                            stacked: false,
                                            title: ['2021', '2020', '2019'],
//                                                title: 'year1', 'year2', 'year3',
                                            xField: 'month',
                                            yField: ['year1_amount', 'year2_amount', 'year3_amount'],
                                            colors: ['#4091ba', '#ffff99', '#3dcc7e'],
                                            highlight: true,
                                            style: {
                                                inGroupGapWidth: -7,
                                                minGapWidth: 2,
                                                maxBarWidth: 1200
                                            },
                                            tooltip: {
                                                trackMouse: true,
                                                height: 28,
                                                renderer: function (toolTip, record, ctx) {
                                                    var label = '';
                                                    if (ctx.field === 'year1_amount') {
                                                        label = '2021';
                                                    } else if (ctx.field === 'year2_amount') {
                                                        label = '2020';
                                                    } else if (ctx.field === 'year3_amount') {
                                                        label = '2019';
                                                    }
                                                    toolTip.setHtml(label + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
                                                }
                                            },
                                            renderer: function (sprite, config, rendererData, index, a, b, c) {

//                                                    setTitle

//                                                    console.log(sprite);
//                                                    console.log(config);
//                                                    console.log(rendererData);
//                                                    console.log(index);
//                                                    console.log(a);
//                                                    console.log(b);
//                                                    console.log(c);
                                            }
                                        }]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxCompareday',
                    width: '100%',
                    hidden: true,
                    layout: {
                        type: 'vbox',
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
                                type: 'hbox',
//                                        align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-GridtotalMonth_1day',
                                    width: 414,
                                    height: 400,
                                    columnLines: true,
                                    bodyStyle: 'background:#E3EAEF',
                                    margin: "5 0 0 0",
                                    features: [{
                                            ftype: 'summary',
//                                                    dock: 'bottom'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: ' &nbsp ',
                                                id: prototype.id + '-lbl1d',
                                                defaults: {
                                                    menuDisabled: true, sortable: false, align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Sales Date', dataIndex: 'strFormatDate', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center";
                                                            return '<b>' + value + '<b>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-GridtotalMonth_1day').getStore().getData().items[0].data;

                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totISCI_LY, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Cpns', dataIndex: 'CUPONS', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#d5f4d5;text-align:right";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-GridtotalMonth_1day').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTAL_CUPONS, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'USD', dataIndex: 'AMOUNT', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#d5f4d5;text-align:right";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-GridtotalMonth_1day').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTAL_AMOUNT, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'AVG', dataIndex: 'AVG', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#d5f4d5;text-align:right";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-GridtotalMonth_1day').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totAVG, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-GridtotalMonth_2day',
                                    width: 414,
                                    height: 400,
                                    bodyStyle: 'background:#E3EAEF',
                                    columnLines: true,
                                    margin: "5 0 0 0",
                                    features: [{
                                            ftype: 'summary',
//                                                    dock: 'bottom'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: ' &nbsp ',
                                                id: prototype.id + '-lbl2d',
                                                defaults: {
                                                    menuDisabled: true, sortable: false, align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Sales Date', dataIndex: 'strFormatDate', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center";
                                                            return '<b>' + value + '<b>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-GridtotalMonth_2day').getStore().getData().items[0].data;

                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totISCI_LY, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Cpns', dataIndex: 'CUPONS', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#d5f4d5;text-align:right";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-GridtotalMonth_2day').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTAL_CUPONS, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'USD', dataIndex: 'AMOUNT', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#d5f4d5;text-align:right";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-GridtotalMonth_2day').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTAL_AMOUNT, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'AVG', dataIndex: 'AVG', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#d5f4d5;text-align:right";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-GridtotalMonth_2day').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totAVG, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-GridtotalMonth_3day',
                                    width: 414,
                                    height: 400,
                                    bodyStyle: 'background:#E3EAEF',
                                    columnLines: true,
                                    margin: "5 0 0 0",
                                    features: [{
                                            ftype: 'summary',
//                                                    dock: 'bottom'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: ' &nbsp ',
                                                id: prototype.id + '-lbl3d',
                                                defaults: {
                                                    menuDisabled: true, sortable: false, align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Sales Date', dataIndex: 'strFormatDate', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center";
                                                            return '<b>' + value + '<b>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-GridtotalMonth_3day').getStore().getData().items[0].data;

                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totISCI_LY, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Cpns', dataIndex: 'CUPONS', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#d5f4d5;text-align:right";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-GridtotalMonth_3day').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTAL_CUPONS, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'USD', dataIndex: 'AMOUNT', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#d5f4d5;text-align:right";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-GridtotalMonth_3day').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTAL_AMOUNT, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'AVG', dataIndex: 'AVG', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#d5f4d5;text-align:right";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-GridtotalMonth_3day').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totAVG, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-GridtotalMonth_4day',
                                    width: 114,
                                    height: 400,
                                    bodyStyle: 'background:#E3EAEF',
                                    columnLines: true,
                                    margin: "10 0 0 0",
                                    features: [{
                                            ftype: 'summary',
//                                                    dock: 'bottom'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: ' &nbsp ',
                                                id: prototype.id + '-lbl4d',
                                                defaults: {
                                                    menuDisabled: true, sortable: false, align: 'center'
                                                },
                                                columns: [
                                                    {text: 'AVG', dataIndex: 'AVG', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#d5f4d5;text-align:right";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-GridtotalMonth_4day').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totAVG, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                }

                            ]
                        },
                        {
                            xtype: 'panel',
                            bodyStyle: 'background-color: #E3EAEF;',
                            padding: '5 0 0 5',
                            hidden: true,
                            border: true,
                            layout: {
                                type: 'vbox'
                            },
                            items: [
                                {
                                    xtype: 'cartesian',
                                    // title: '<div style="text-align:center;color:#6E6E73;font-size:14px">Passenger by Market</div>',
                                    id: prototype.id + '-displaySAChart42_day',
                                    width: 1450,
                                    border: false,
                                    height: 400,
                                    background: '#E0F8F7',
                                    captions: {
                                        title: {
                                            text: 'Amount (USD)',
                                            alignTo: 'chart'
                                        }
                                    },
                                    animation: {
                                        duration: 200
                                    },
                                    interactions: ['itemhighlight'],
                                    legend: {
                                        docked: 'bottom',
                                        background: '#E3EAEF'
                                    },
                                    axes: [{
                                            type: 'numeric3d',
                                            position: 'left',
                                            fields: ['year1_amount', 'year2_amount', 'year3_amount'],
                                            grid: true,
                                            title: '',
                                            //title: 'Millions of USD',
                                            renderer: function (obj, value) {
                                                if (value > 1) {
                                                    if ((value / 1000).toString().length > 3) {
                                                        return  ' ' + Ext.util.Format.number((value / 1000000), '0.0') + 'M';
                                                    } else {
                                                        return  ' ' + Ext.util.Format.number((value / 1000), '0') + 'K';
                                                    }
                                                } else {
                                                    return '';
                                                }
                                            }
                                        }, {
                                            type: 'category3d',
                                            position: 'bottom',
//                                                            fields: 'strFormatDate',
                                            grid: true,
                                            title: {
                                                text: 'Years',
                                                translationX: -30
                                            }
                                        }],
                                    series: [{
                                            type: 'bar3d',
                                            stacked: false,
                                            title: ['2021', '2020', '2019'],
                                            xField: 'month',
                                            yField: ['year1_amount', 'year2_amount', 'year3_amount'],
                                            colors: ['#4091ba', '#ffff99', '#3dcc7e'],
                                            highlight: true,
                                            style: {
                                                inGroupGapWidth: -7,
                                                minGapWidth: 2,
                                                maxBarWidth: 1200
                                            },
                                            tooltip: {
                                                trackMouse: true,
                                                height: 28,
                                                renderer: function (toolTip, record, ctx) {
                                                    var label = '';
                                                    if (ctx.field === 'year1_amount') {
                                                        label = '2021';
                                                    } else if (ctx.field === 'year2_amount') {
                                                        label = '2020';
                                                    } else if (ctx.field === 'year3_amount') {
                                                        label = '2019';
                                                    }
                                                    toolTip.setHtml(label + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
                                                }
                                            }
                                        }]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxSalesByTransaction',
                    width: '100%',
//                    height: 750,
                    hidden: true,
                    layout: {
                        type: 'vbox',
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
//                                        align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-GridSalesByTransaction',
                                    width: 1174,
                                    height: 'auto',
                                    columnLines: true,
                                    bodyStyle: 'background:#E3EAEF',
                                    margin: "10 0 0 0",
                                    features: [{
                                            ftype: 'summary',
//                                                    dock: 'bottom'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Sales',
                                                defaults: {
                                                    menuDisabled: true, sortable: false, align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Date', dataIndex: 'strFormatDate', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center";
                                                            return '<b>' + value + '<b>';
                                                        },
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Total SALES',
                                                defaults: {
                                                    menuDisabled: true, sortable: false, align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Tickets', dataIndex: 'SALETKT', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#d5f4d5;text-align:right";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-GridSalesByTransaction').getStore().getData().items[0].data;

                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTAL_SALETKT, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'USD', dataIndex: 'SALEUSD', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#d5f4d5;text-align:right";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-GridSalesByTransaction').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTAL_SALEUSD, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: '%', dataIndex: 'AMOUNT_SALES_PERCENT', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#d5f4d5;text-align:right";
                                                            return Ext.util.Format.number(value, '0,000.00') + '%';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-GridSalesByTransaction').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + '100%' + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Total EXCH',
                                                defaults: {
                                                    menuDisabled: true, sortable: false, align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Tickets', dataIndex: 'EXCHTKT', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#d5f0f4;text-align:right";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-GridSalesByTransaction').getStore().getData().items[0].data;

                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTAL_EXCHTKT, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'USD', dataIndex: 'EXCHUSD', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#d5f0f4;text-align:right";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-GridSalesByTransaction').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTAL_EXCHUSD, '0,000') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Total RFND',
                                                defaults: {
                                                    menuDisabled: true, sortable: false, align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Tickets', dataIndex: 'RFNDTKT', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#f4d5d5;text-align:right";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-GridSalesByTransaction').getStore().getData().items[0].data;

                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTAL_RFNDTKT, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'USD', dataIndex: 'RFNDUSD', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#f4d5d5;text-align:right";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-GridSalesByTransaction').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTAL_RFNDUSD, '0,000') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Total ADM',
                                                defaults: {
                                                    menuDisabled: true, sortable: false, align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Tickets', dataIndex: 'AADMTKT', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#f1f4d5;text-align:right";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-GridSalesByTransaction').getStore().getData().items[0].data;

                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTAL_AADMTKT, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'USD', dataIndex: 'AADMUSD', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#f1f4d5;text-align:right";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-GridSalesByTransaction').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTAL_AADMUSD, '0,000') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Total ACM',
                                                defaults: {
                                                    menuDisabled: true, sortable: false, align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Tickets', dataIndex: 'AACMTKT', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#e0d5f4;text-align:right";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-GridSalesByTransaction').getStore().getData().items[0].data;

                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTAL_AACMTKT, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'USD', dataIndex: 'AACMUSD', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#e0d5f4;text-align:right";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-GridSalesByTransaction').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTAL_AACMUSD, '0,000') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                        ]
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    width: 1174,
                                    bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                                    border: false,
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'polar',
                                            id: prototype.id + '-donaTransactionTickets',
                                            width: 400,
                                            height: 310,
                                            margin: '15 0 0 0',
                                            border: true,
                                            innerPadding: 20,
                                            background: '#E3EAEF',
                                            captions: {
                                                title: {
                                                    text: 'Tickets',
                                                    alignTo: 'chart'
                                                },
                                            },
                                            animation: {
                                                duration: 200
                                            },
                                            interactions: ['rotate', 'itemhighlight'],
                                            series: [{
                                                    type: 'pie',
                                                    angleField: 'TKT',
                                                    colors: ['#8ade8a', '#8aadde', '#de8a8a'],
                                                    donut: 40,
                                                    label: {
                                                        field: 'strDescriptionTKT',
                                                        renderer: function (value, b, callout) {
//                                                            callout.calloutWidth = 0;
//                                                            var texto = '';
//                                                            texto = '' + value.substring(value.indexOf(':') + 1);
//                                                            return texto;
                                                        }
                                                    },
                                                    highlight: true,
//                                                    tooltip: {
//                                                        trackMouse: true,
//                                                        height: 28,
//                                                        renderer: function (toolTip, record, ctx) {
//                                                            toolTip.setHtml('<b> Tickets ' + record.get('strDescription') + ' : ' + Ext.util.Format.number(record.get(ctx.field), '0,000') + ' QTY</b>');
//                                                        },
//                                                    },
                                                }]
                                        },
                                        {
                                            xtype: 'polar',
                                            id: prototype.id + '-donaTransactionAmount',
                                            width: 400,
                                            height: 310,
//                                            margin: '15 0 0 0',
                                            margin: '15 0 0 374',
                                            border: true,
                                            innerPadding: 20,
                                            background: '#E3EAEF',
                                            captions: {
                                                title: {
                                                    text: 'Amounts',
                                                    alignTo: 'chart'
                                                },
                                            },
                                            animation: {
                                                duration: 200
                                            },
                                            interactions: ['rotate', 'itemhighlight'],
                                            series: [{
                                                    type: 'pie',
                                                    angleField: 'USD',
                                                    colors: ['#8ade8a', '#8aadde', '#de8a8a'],
                                                    donut: 40,
                                                    label: {
                                                        field: 'strDescriptionUSD',
                                                        renderer: function (value, b, callout) {
//                                                            callout.calloutWidth = 0;
//                                                            var texto = '';
//                                                            texto = '' + value.substring(value.indexOf(':') + 1);
//                                                            return texto;
                                                        }
                                                    },
                                                    highlight: true,
//                                                    tooltip: {
//                                                        trackMouse: true,
//                                                        height: 28,
//                                                        renderer: function (toolTip, record, ctx) {
//                                                            toolTip.setHtml('<b> Amount ' + record.get('strDescription') + ' : ' + Ext.util.Format.number(record.get(ctx.field), '0,000') + ' USD</b>');
//                                                        },
//                                                    },
                                                }]
                                        },
                                    ]
                                },
                            ]
                        },
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxTNURE',
                    width: '100%',
//                    height: 750,
                    hidden: true,
                    layout: {
                        type: 'vbox',
                        align: 'center',
                        pack: 'center'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: false,
                        align: 'center',
                        margin: "10 15 0 0"  // (top, right, bottom, left)
                    },
                    items: [
                        //grid data 
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridTNURE',
                            columnLines: true,
                            autoScroll: true,
                            width: 1480,
//                            width: '100%',
                            //height: 480,
                            height: 400,
                            features: [{
                                    ftype: 'summary',
//                                                    dock: 'bottom'
                                }],
                            columns: {
                                items: [
                                    {text: 'Sales<br>Date', dataIndex: 'strFormatDate', width: 65, align: 'center',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center";
                                            return value;
                                        },
                                    },
                                    {text: 'Curr', dataIndex: 'CURR', width: 50, align: 'center',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center";
                                            return value;
                                        },
                                    },
                                    {
                                        text: 'Sales',
                                        defaults: {
                                            menuDisabled: true, sortable: false, align: 'center'
                                        },
                                        columns: [
                                            {text: 'Coupons', dataIndex: 'QCPNS', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background:#d5f0f4;text-align:right";
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridTNURE').getStore().getData().items[0].data;

                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_QCPNS, '0,000') + '<b>';
                                                }
                                            },
                                            {text: 'Amount', dataIndex: 'AMTS', width: 90,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background:#d5f0f4;text-align:right";
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridTNURE').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_AMTS, '0,000') + '<b>';
                                                }
                                            },
                                        ]
                                    },
                                    {
                                        text: 'Flown',
                                        defaults: {
                                            menuDisabled: true, sortable: false, align: 'center'
                                        },
                                        columns: [
                                            {text: 'Coupons', dataIndex: 'QCPNV', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background:#d5f4d5;text-align:right";
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridTNURE').getStore().getData().items[0].data;

                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_QCPNV, '0,000') + '<b>';
                                                }
                                            },
                                            {text: 'Amount', dataIndex: 'AMTV', width: 90,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background:#d5f4d5;text-align:right";
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridTNURE').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_AMTV, '0,000') + '<b>';
                                                }
                                            },
                                        ]
                                    },
                                    {
                                        text: 'Refund',
                                        defaults: {
                                            menuDisabled: true, sortable: false, align: 'center'
                                        },
                                        columns: [
                                            {text: 'Coupons', dataIndex: 'QCPNR', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background:#f4d5d5;text-align:right";
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridTNURE').getStore().getData().items[0].data;

                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_QCPNR, '0,000') + '<b>';
                                                }
                                            },
                                            {text: 'Amount', dataIndex: 'AMTR', width: 90,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background:#f4d5d5;text-align:right";
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridTNURE').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_AMTR, '0,000') + '<b>';
                                                }
                                            },
                                        ]
                                    },
                                    {
                                        text: 'Exchange',
                                        defaults: {
                                            menuDisabled: true, sortable: false, align: 'center'
                                        },
                                        columns: [
                                            {text: 'Coupons', dataIndex: 'QCPNE', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background:#f1f4d5;text-align:right";
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridTNURE').getStore().getData().items[0].data;

                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_QCPNE, '0,000') + '<b>';
                                                }
                                            },
                                            {text: 'Amount', dataIndex: 'AMTE', width: 90,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background:#f1f4d5;text-align:right";
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridTNURE').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_AMTE, '0,000') + '<b>';
                                                }
                                            },
                                        ]
                                    },
                                    {
                                        text: 'Interline x Pagar',
                                        defaults: {
                                            menuDisabled: true, sortable: false, align: 'center'
                                        },
                                        columns: [
                                            {text: 'Coupons', dataIndex: 'QCPNI', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right";
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridTNURE').getStore().getData().items[0].data;

                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_QCPNI, '0,000') + '<b>';
                                                }
                                            },
                                            {text: 'Amount', dataIndex: 'AMTI', width: 90,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right";
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridTNURE').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_AMTI, '0,000') + '<b>';
                                                }
                                            },
                                        ]
                                    },
                                    {
                                        text: 'Expired',
                                        defaults: {
                                            menuDisabled: true, sortable: false, align: 'center'
                                        },
                                        columns: [
                                            {text: 'Coupons', dataIndex: 'QCPNC', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right";
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridTNURE').getStore().getData().items[0].data;

                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_QCPNC, '0,000') + '<b>';
                                                }
                                            },
                                            {text: 'Amount', dataIndex: 'AMTC', width: 90,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right";
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridTNURE').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_AMTC, '0,000') + '<b>';
                                                }
                                            },
                                        ]
                                    },
                                    {
                                        text: 'EMD',
                                        defaults: {
                                            menuDisabled: true, sortable: false, align: 'center'
                                        },
                                        columns: [
                                            {text: 'Coupons', dataIndex: 'QCPNM', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background:#e0d5f4;text-align:right";
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridTNURE').getStore().getData().items[0].data;

                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_QCPNM, '0,000') + '<b>';
                                                }
                                            },
                                            {text: 'Amount', dataIndex: 'AMTM', width: 90,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background:#e0d5f4;text-align:right";
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridTNURE').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_AMTM, '0,000') + '<b>';
                                                }
                                            },
                                        ]
                                    },
                                    {
                                        text: 'Pending',
                                        defaults: {
                                            menuDisabled: true, sortable: false, align: 'center'
                                        },
                                        columns: [
                                            {text: 'Coupons', dataIndex: 'QCPNP', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right";
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridTNURE').getStore().getData().items[0].data;

                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_QCPNP, '0,000') + '<b>';
                                                }
                                            },
                                            {text: 'Amount', dataIndex: 'AMTP', width: 90,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right";
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridTNURE').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.TOTAL_AMTP, '0,000') + '<b>';
                                                }
                                            },
                                        ]
                                    },
                                ]
                            },
                            viewConfig: {
                                stripeRows: true,
                                enableTextSelection: true
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxFORE',
                    width: '100%',
//                    height: 750,
                    hidden: true,
                    layout: {
                        type: 'vbox',
                        align: 'center',
                        pack: 'center'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: false,
                        align: 'center',
                        margin: "0 0 0 0"  // (top, right, bottom, left)
                    },
                    items: [
                        //grid data 
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridFORE',
                            columnLines: true,
                            autoScroll: true,
                            width: 1248,
                            margin: "15 15 0 0",
//                            width: '100%',
                            height: 416,
                            features: [{
                                    ftype: 'summary',
//                                                    dock: 'bottom'
                                }],
                            columns: {
                                items: [
                                    {
                                        text: 'First Month',
                                        id: prototype.id + '-month1',
                                        defaults: {
                                            menuDisabled: true, sortable: false, align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Sales',
                                                id: prototype.id + '-sales1',
                                                defaults: {
                                                    menuDisabled: true, sortable: false, align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Flight<br>Date', dataIndex: 'DFLIGHT1', width: 70, align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center";
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridFORE').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:center; margin-right:3px ';
//                                                            return '<b>' + Ext.util.Format.number(data.TOT_QTYFLY1, '0,000') + '<b>';
                                                            return '<b>' + 'Total' + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Coupons',
                                                id: prototype.id + '-cpn1',
                                                defaults: {
                                                    menuDisabled: true, sortable: false, align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Coupons', dataIndex: 'QTYFLY1', width: 87,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#;text-align:right";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridFORE').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_CPN1, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: '%', dataIndex: 'QTYS1_PERCENT', width: 55,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#;text-align:right";
                                                            return Ext.util.Format.number(value, '0,000.00') + '%';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridFORE').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';

                                                            return '<b>' + Ext.util.Format.number(data.TOT_QTYS1_PERCENT, '0,000') + '%' + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Amount',
                                                id: prototype.id + '-amo1',
                                                defaults: {
                                                    menuDisabled: true, sortable: false, align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Amount', dataIndex: 'FLYAMO1', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#;text-align:right";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridFORE').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_AMT1, '0,000') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                        ]
                                    },
                                    {
                                        text: 'Second Month',
                                        id: prototype.id + '-month2',
                                        defaults: {
                                            menuDisabled: true, sortable: false, align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Sales',
                                                id: prototype.id + '-sales2',
                                                defaults: {
                                                    menuDisabled: true, sortable: false, align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Flight<br>Date', dataIndex: 'DFLIGHT2', width: 70, align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#bbe4fc;text-align:center";
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridFORE').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:center; margin-right:3px ';
//                                                            return '<b>' + Ext.util.Format.number(data.TOT_QTYFLY1, '0,000') + '<b>';
                                                            return '<b>' + 'Total' + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Coupons',
                                                id: prototype.id + '-cpn2',
                                                defaults: {
                                                    menuDisabled: true, sortable: false, align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Coupons', dataIndex: 'QTYFLY2', width: 87,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#bbe4fc;text-align:right";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridFORE').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_CPN2, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: '%', dataIndex: 'QTYS2_PERCENT', width: 55,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#bbe4fc;text-align:right";
                                                            return Ext.util.Format.number(value, '0,000.00') + '%';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridFORE').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';

                                                            return '<b>' + Ext.util.Format.number(data.TOT_QTYS2_PERCENT, '0,000') + '%' + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Amount',
                                                id: prototype.id + '-amo2',
                                                defaults: {
                                                    menuDisabled: true, sortable: false, align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Amount', dataIndex: 'FLYAMO2', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#bbe4fc;text-align:right";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridFORE').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_AMT2, '0,000') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                        ]
                                    },
                                    {
                                        text: 'Third Month',
                                        id: prototype.id + '-month3',
                                        defaults: {
                                            menuDisabled: true, sortable: false, align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Sales',
                                                id: prototype.id + '-sales3',
                                                defaults: {
                                                    menuDisabled: true, sortable: false, align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Flight<br>Date', dataIndex: 'DFLIGHT3', width: 70, align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center";
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridFORE').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:center; margin-right:3px ';
//                                                            return '<b>' + Ext.util.Format.number(data.TOT_QTYFLY1, '0,000') + '<b>';
                                                            return '<b>' + 'Total' + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Coupons',
                                                id: prototype.id + '-cpn3',
                                                defaults: {
                                                    menuDisabled: true, sortable: false, align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Coupons', dataIndex: 'QTYFLY3', width: 87,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#;text-align:right";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridFORE').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';

                                                            return '<b>' + Ext.util.Format.number(data.TOT_CPN3, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: '%', dataIndex: 'QTYS3_PERCENT', width: 55,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#;text-align:right";
                                                            return Ext.util.Format.number(value, '0,000.00') + '%';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridFORE').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';

                                                            return '<b>' + Ext.util.Format.number(data.TOT_QTYS3_PERCENT, '0,000') + '%' + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Amount',
                                                id: prototype.id + '-amo3',
                                                defaults: {
                                                    menuDisabled: true, sortable: false, align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Amount', dataIndex: 'FLYAMO3', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#;text-align:right";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridFORE').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_AMT3, '0,000') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                        ]
                                    },
                                    {
                                        text: 'Fourth Month',
                                        id: prototype.id + '-month4',
                                        defaults: {
                                            menuDisabled: true, sortable: false, align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Sales',
                                                id: prototype.id + '-sales4',
                                                defaults: {
                                                    menuDisabled: true, sortable: false, align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Flight<br>Date', dataIndex: 'DFLIGHT4', width: 70, align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#bbe4fc;text-align:center";
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridFORE').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:center; margin-right:3px ';
//                                                            return '<b>' + Ext.util.Format.number(data.TOT_QTYFLY1, '0,000') + '<b>';
                                                            return '<b>' + 'Total' + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Coupons',
                                                id: prototype.id + '-cpn4',
                                                defaults: {
                                                    menuDisabled: true, sortable: false, align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Coupons', dataIndex: 'QTYFLY4', width: 87,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#bbe4fc;text-align:right";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridFORE').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_CPN4, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: '%', dataIndex: 'QTYS4_PERCENT', width: 55,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#bbe4fc;text-align:right";
                                                            return Ext.util.Format.number(value, '0,000.00') + '%';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridFORE').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';

                                                            return '<b>' + Ext.util.Format.number(data.TOT_QTYS4_PERCENT, '0,000') + '%' + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Amount',
                                                id: prototype.id + '-amo4',
                                                defaults: {
                                                    menuDisabled: true, sortable: false, align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Amount', dataIndex: 'FLYAMO4', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#bbe4fc;text-align:right";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridFORE').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_AMT4, '0,000') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                        ]
                                    },
//                                    
//                                    {
//                                        text: 'Fifth Month',
//                                        id: prototype.id + '-month5',
//                                        defaults: {
//                                            menuDisabled: true, sortable: false, align: 'center'
//                                        },
//                                        columns: [
//                                            {
//                                                text: 'Sales',
//                                                id: prototype.id + '-sales5',
//                                                defaults: {
//                                                    menuDisabled: true, sortable: false, align: 'center'
//                                                },
//                                                columns: [
//                                                    {text: 'Flight<br>Date', dataIndex: 'DFLIGHT5', width: 70, align: 'center',
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "text-align:center";
//                                                            return value;
//                                                        },
//                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridFORE').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:center; margin-right:3px ';
////                                                            return '<b>' + Ext.util.Format.number(data.TOT_QTYFLY1, '0,000') + '<b>';
//                                                            return '<b>' + 'Total' + '<b>';
//                                                        }
//                                                    },
//                                                ]
//                                            },
//                                            {
//                                                text: 'Coupons',
//                                                id: prototype.id + '-cpn5',
//                                                defaults: {
//                                                    menuDisabled: true, sortable: false, align: 'center'
//                                                },
//                                                columns: [
//                                                    {text: 'Coupons', dataIndex: 'QTYFLY5', width: 87,
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "background:#;text-align:right";
//                                                            return Ext.util.Format.number(value, '0,000');
//                                                        },
//                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridFORE').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right; margin-right:3px ';
//                                                            return '<b>' + Ext.util.Format.number(data.TOT_CPN5, '0,000') + '<b>';
//                                                        }
//                                                    },
//                                                    {text: '%', dataIndex: 'QTYS5_PERCENT', width: 55,
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "background:#;text-align:right";
//                                                            return Ext.util.Format.number(value, '0,000.00') + '%';
//                                                        },
//                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridFORE').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right; margin-right:3px ';
//
//                                                            return '<b>' + Ext.util.Format.number(data.TOT_QTYS5_PERCENT, '0,000') + '%' + '<b>';
//                                                        }
//                                                    },
//                                                ]
//                                            },
//                                            {
//                                                text: 'Amount',
//                                                id: prototype.id + '-amo5',
//                                                defaults: {
//                                                    menuDisabled: true, sortable: false, align: 'center'
//                                                },
//                                                columns: [
//                                                    {text: 'Amount', dataIndex: 'FLYAMO5', width: 100,
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "background:#;text-align:right";
//                                                            return Ext.util.Format.number(value, '0,000');
//                                                        },
//                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridFORE').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right; margin-right:3px ';
//                                                            return '<b>' + Ext.util.Format.number(data.TOT_AMT5, '0,000') + '<b>';
//                                                        }
//                                                    },
//                                                ]
//                                            },
//                                        ]
//                                    },
//                                    {
//                                        text: 'Sixth Month',
//                                        id: prototype.id + '-month6',
//                                        defaults: {
//                                            menuDisabled: true, sortable: false, align: 'center'
//                                        },
//                                        columns: [
//                                            {
//                                                text: 'Sales',
//                                                id: prototype.id + '-sales6',
//                                                defaults: {
//                                                    menuDisabled: true, sortable: false, align: 'center'
//                                                },
//                                                columns: [
//                                                    {text: 'Flight<br>Date', dataIndex: 'DFLIGHT6', width: 70, align: 'center',
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "background:#bbe4fc;text-align:center";
//                                                            return value;
//                                                        },
//                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridFORE').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:center; margin-right:3px ';
////                                                            return '<b>' + Ext.util.Format.number(data.TOT_QTYFLY1, '0,000') + '<b>';
//                                                            return '<b>' + 'Total' + '<b>';
//                                                        }
//                                                    },
//                                                ]
//                                            },
//                                            {
//                                                text: 'Coupons',
//                                                id: prototype.id + '-cpn6',
//                                                defaults: {
//                                                    menuDisabled: true, sortable: false, align: 'center'
//                                                },
//                                                columns: [
//                                                    {text: 'Coupons', dataIndex: 'QTYFLY6', width: 87,
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "background:#bbe4fc;text-align:right";
//                                                            return Ext.util.Format.number(value, '0,000');
//                                                        },
//                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridFORE').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right; margin-right:3px ';
//                                                            return '<b>' + Ext.util.Format.number(data.TOT_CPN6, '0,000') + '<b>';
//                                                        }
//                                                    },
//                                                    {text: '%', dataIndex: 'QTYS6_PERCENT', width: 55,
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "background:#bbe4fc;text-align:right";
//                                                            return Ext.util.Format.number(value, '0,000.00') + '%';
//                                                        },
//                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridFORE').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right; margin-right:3px ';
//
//                                                            return '<b>' + Ext.util.Format.number(data.TOT_QTYS6_PERCENT, '0,000') + '%' + '<b>';
//                                                        }
//                                                    },
//                                                ]
//                                            },
//                                            {
//                                                text: 'Amount',
//                                                id: prototype.id + '-amo6',
//                                                defaults: {
//                                                    menuDisabled: true, sortable: false, align: 'center'
//                                                },
//                                                columns: [
//                                                    {text: 'Amount', dataIndex: 'FLYAMO6', width: 100,
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "background:#bbe4fc;text-align:right";
//                                                            return Ext.util.Format.number(value, '0,000');
//                                                        },
//                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridFORE').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right; margin-right:3px ';
//                                                            return '<b>' + Ext.util.Format.number(data.TOT_AMT6, '0,000') + '<b>';
//                                                        }
//                                                    },
//                                                ]
//                                            },
//                                        ]
//                                    },
//                                    {
//                                        text: 'Seventh Month',
//                                        id: prototype.id + '-month7',
//                                        defaults: {
//                                            menuDisabled: true, sortable: false, align: 'center'
//                                        },
//                                        columns: [
//                                            {
//                                                text: 'Sales',
//                                                id: prototype.id + '-sales7',
//                                                defaults: {
//                                                    menuDisabled: true, sortable: false, align: 'center'
//                                                },
//                                                columns: [
//                                                    {text: 'Flight<br>Date', dataIndex: 'DFLIGHT7', width: 70, align: 'center',
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "text-align:center";
//                                                            return value;
//                                                        },
//                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridFORE').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:center; margin-right:3px ';
////                                                            return '<b>' + Ext.util.Format.number(data.TOT_QTYFLY1, '0,000') + '<b>';
//                                                            return '<b>' + 'Total' + '<b>';
//                                                        }
//                                                    },
//                                                ]
//                                            },
//                                            {
//                                                text: 'Coupons',
//                                                id: prototype.id + '-cpn7',
//                                                defaults: {
//                                                    menuDisabled: true, sortable: false, align: 'center'
//                                                },
//                                                columns: [
//                                                    {text: 'Coupons', dataIndex: 'QTYFLY7', width: 87,
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "background:#;text-align:right";
//                                                            return Ext.util.Format.number(value, '0,000');
//                                                        },
//                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridFORE').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right; margin-right:3px ';
//                                                            return '<b>' + Ext.util.Format.number(data.TOT_CPN7, '0,000') + '<b>';
//                                                        }
//                                                    },
//                                                    {text: '%', dataIndex: 'QTYS7_PERCENT', width: 55,
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "background:#;text-align:right";
//                                                            return Ext.util.Format.number(value, '0,000.00') + '%';
//                                                        },
//                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridFORE').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right; margin-right:3px ';
//
//                                                            return '<b>' + Ext.util.Format.number(data.TOT_QTYS7_PERCENT, '0,000') + '%' + '<b>';
//                                                        }
//                                                    },
//                                                ]
//                                            },
//                                            {
//                                                text: 'Amount',
//                                                id: prototype.id + '-amo7',
//                                                defaults: {
//                                                    menuDisabled: true, sortable: false, align: 'center'
//                                                },
//                                                columns: [
//                                                    {text: 'Amount', dataIndex: 'FLYAMO7', width: 100,
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "background:#;text-align:right";
//                                                            return Ext.util.Format.number(value, '0,000');
//                                                        },
//                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridFORE').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right; margin-right:3px ';
//                                                            return '<b>' + Ext.util.Format.number(data.TOT_AMT7, '0,000') + '<b>';
//                                                        }
//                                                    },
//                                                ]
//                                            },
//                                        ]
//                                    },
//                                    {
//                                        text: 'Eighth Month',
//                                        id: prototype.id + '-month8',
//                                        defaults: {
//                                            menuDisabled: true, sortable: false, align: 'center'
//                                        },
//                                        columns: [
//                                            {
//                                                text: 'Sales',
//                                                id: prototype.id + '-sales8',
//                                                defaults: {
//                                                    menuDisabled: true, sortable: false, align: 'center'
//                                                },
//                                                columns: [
//                                                    {text: 'Flight<br>Date', dataIndex: 'DFLIGHT8', width: 70, align: 'center',
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "background:#bbe4fc;text-align:center";
//                                                            return value;
//                                                        },
//                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridFORE').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:center; margin-right:3px ';
////                                                            return '<b>' + Ext.util.Format.number(data.TOT_QTYFLY1, '0,000') + '<b>';
//                                                            return '<b>' + 'Total' + '<b>';
//                                                        }
//                                                    },
//                                                ]
//                                            },
//                                            {
//                                                text: 'Coupons',
//                                                id: prototype.id + '-cpn8',
//                                                defaults: {
//                                                    menuDisabled: true, sortable: false, align: 'center'
//                                                },
//                                                columns: [
//                                                    {text: 'Coupons', dataIndex: 'QTYFLY8', width: 87,
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "background:#bbe4fc;text-align:right";
//                                                            return Ext.util.Format.number(value, '0,000');
//                                                        },
//                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridFORE').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right; margin-right:3px ';
//                                                            return '<b>' + Ext.util.Format.number(data.TOT_CPN8, '0,000') + '<b>';
//                                                        }
//                                                    },
//                                                    {text: '%', dataIndex: 'QTYS8_PERCENT', width: 55,
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "background:#bbe4fc;text-align:right";
//                                                            return Ext.util.Format.number(value, '0,000.00') + '%';
//                                                        },
//                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridFORE').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right; margin-right:3px ';
//
//                                                            return '<b>' + Ext.util.Format.number(data.TOT_QTYS8_PERCENT, '0,000') + '%' + '<b>';
//                                                        }
//                                                    },
//                                                ]
//                                            },
//                                            {
//                                                text: 'Amount',
//                                                id: prototype.id + '-amo8',
//                                                defaults: {
//                                                    menuDisabled: true, sortable: false, align: 'center'
//                                                },
//                                                columns: [
//                                                    {text: 'Amount', dataIndex: 'FLYAMO8', width: 100,
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "background:#bbe4fc;text-align:right";
//                                                            return Ext.util.Format.number(value, '0,000');
//                                                        },
//                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridFORE').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right; margin-right:3px ';
//                                                            return '<b>' + Ext.util.Format.number(data.TOT_AMT8, '0,000') + '<b>';
//                                                        }
//                                                    },
//                                                ]
//                                            },
//                                        ]
//                                    },
//                                    {
//                                        text: 'Nineth Month',
//                                        id: prototype.id + '-month9',
//                                        defaults: {
//                                            menuDisabled: true, sortable: false, align: 'center'
//                                        },
//                                        columns: [
//                                            {
//                                                text: 'Sales',
//                                                id: prototype.id + '-sales9',
//                                                defaults: {
//                                                    menuDisabled: true, sortable: false, align: 'center'
//                                                },
//                                                columns: [
//                                                    {text: 'Flight<br>Date', dataIndex: 'DFLIGHT9', width: 70, align: 'center',
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "text-align:center";
//                                                            return value;
//                                                        },
//                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridFORE').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:center; margin-right:3px ';
////                                                            return '<b>' + Ext.util.Format.number(data.TOT_QTYFLY1, '0,000') + '<b>';
//                                                            return '<b>' + 'Total' + '<b>';
//                                                        }
//                                                    },
//                                                ]
//                                            },
//                                            {
//                                                text: 'Coupons',
//                                                id: prototype.id + '-cpn9',
//                                                defaults: {
//                                                    menuDisabled: true, sortable: false, align: 'center'
//                                                },
//                                                columns: [
//                                                    {text: 'Coupons', dataIndex: 'QTYFLY9', width: 87,
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "background:#;text-align:right";
//                                                            return Ext.util.Format.number(value, '0,000');
//                                                        },
//                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridFORE').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right; margin-right:3px ';
//                                                            return '<b>' + Ext.util.Format.number(data.TOT_CPN9, '0,000') + '<b>';
//                                                        }
//                                                    },
//                                                    {text: '%', dataIndex: 'QTYS9_PERCENT', width: 55,
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "background:#;text-align:right";
//                                                            return Ext.util.Format.number(value, '0,000.00') + '%';
//                                                        },
//                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridFORE').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right; margin-right:3px ';
//
//                                                            return '<b>' + Ext.util.Format.number(data.TOT_QTYS9_PERCENT, '0,000') + '%' + '<b>';
//                                                        }
//                                                    },
//                                                ]
//                                            },
//                                            {
//                                                text: 'Amount',
//                                                id: prototype.id + '-amo9',
//                                                defaults: {
//                                                    menuDisabled: true, sortable: false, align: 'center'
//                                                },
//                                                columns: [
//                                                    {text: 'Amount', dataIndex: 'FLYAMO9', width: 100,
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "background:#;text-align:right";
//                                                            return Ext.util.Format.number(value, '0,000');
//                                                        },
//                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridFORE').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right; margin-right:3px ';
//                                                            return '<b>' + Ext.util.Format.number(data.TOT_AMT9, '0,000') + '<b>';
//                                                        }
//                                                    },
//                                                ]
//                                            },
//                                        ]
//                                    },
//                                    {
//                                        text: 'Tenth Month',
//                                        id: prototype.id + '-month10',
//                                        defaults: {
//                                            menuDisabled: true, sortable: false, align: 'center'
//                                        },
//                                        columns: [
//                                            {
//                                                text: 'Sales',
//                                                id: prototype.id + '-sales10',
//                                                defaults: {
//                                                    menuDisabled: true, sortable: false, align: 'center'
//                                                },
//                                                columns: [
//                                                    {text: 'Flight<br>Date', dataIndex: 'DFLIGHT10', width: 70, align: 'center',
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "background:#bbe4fc;text-align:center";
//                                                            return value;
//                                                        },
//                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridFORE').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:center; margin-right:3px ';
////                                                            return '<b>' + Ext.util.Format.number(data.TOT_QTYFLY1, '0,000') + '<b>';
//                                                            return '<b>' + 'Total' + '<b>';
//                                                        }
//                                                    },
//                                                ]
//                                            },
//                                            {
//                                                text: 'Coupons',
//                                                id: prototype.id + '-cpn10',
//                                                defaults: {
//                                                    menuDisabled: true, sortable: false, align: 'center'
//                                                },
//                                                columns: [
//                                                    {text: 'Coupons', dataIndex: 'QTYFLY10', width: 87,
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "background:#bbe4fc;text-align:right";
//                                                            return Ext.util.Format.number(value, '0,000');
//                                                        },
//                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridFORE').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right; margin-right:3px ';
//                                                            return '<b>' + Ext.util.Format.number(data.TOT_CPN10, '0,000') + '<b>';
//                                                        }
//                                                    },
//                                                    {text: '%', dataIndex: 'QTYS10_PERCENT', width: 55,
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "background:#bbe4fc;text-align:right";
//                                                            return Ext.util.Format.number(value, '0,000.00') + '%';
//                                                        },
//                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridFORE').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right; margin-right:3px ';
//
//                                                            return '<b>' + Ext.util.Format.number(data.TOT_QTYS10_PERCENT, '0,000') + '%' + '<b>';
//                                                        }
//                                                    },
//                                                ]
//                                            },
//                                            {
//                                                text: 'Amount',
//                                                id: prototype.id + '-amo10',
//                                                defaults: {
//                                                    menuDisabled: true, sortable: false, align: 'center'
//                                                },
//                                                columns: [
//                                                    {text: 'Amount', dataIndex: 'FLYAMO10', width: 100,
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "background:#bbe4fc;text-align:right";
//                                                            return Ext.util.Format.number(value, '0,000');
//                                                        },
//                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridFORE').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right; margin-right:3px ';
//                                                            return '<b>' + Ext.util.Format.number(data.TOT_AMT10, '0,000') + '<b>';
//                                                        }
//                                                    },
//                                                ]
//                                            },
//                                        ]
//                                    },
//                                    {
//                                        text: 'Eleventh Month',
//                                        id: prototype.id + '-month11',
//                                        defaults: {
//                                            menuDisabled: true, sortable: false, align: 'center'
//                                        },
//                                        columns: [
//                                            {
//                                                text: 'Sales',
//                                                id: prototype.id + '-sales11',
//                                                defaults: {
//                                                    menuDisabled: true, sortable: false, align: 'center'
//                                                },
//                                                columns: [
//                                                    {text: 'Flight<br>Date', dataIndex: 'DFLIGHT11', width: 70, align: 'center',
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "text-align:center";
//                                                            return value;
//                                                        },
//                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridFORE').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:center; margin-right:3px ';
////                                                            return '<b>' + Ext.util.Format.number(data.TOT_QTYFLY1, '0,000') + '<b>';
//                                                            return '<b>' + 'Total' + '<b>';
//                                                        }
//                                                    },
//                                                ]
//                                            },
//                                            {
//                                                text: 'Coupons',
//                                                id: prototype.id + '-cpn11',
//                                                defaults: {
//                                                    menuDisabled: true, sortable: false, align: 'center'
//                                                },
//                                                columns: [
//                                                    {text: 'Coupons', dataIndex: 'QTYFLY11', width: 87,
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "background:#;text-align:right";
//                                                            return Ext.util.Format.number(value, '0,000');
//                                                        },
//                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridFORE').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right; margin-right:3px ';
//                                                            return '<b>' + Ext.util.Format.number(data.TOT_CPN11, '0,000') + '<b>';
//                                                        }
//                                                    },
//                                                    {text: '%', dataIndex: 'QTYS11_PERCENT', width: 55,
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "background:#;text-align:right";
//                                                            return Ext.util.Format.number(value, '0,000.00') + '%';
//                                                        },
//                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridFORE').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right; margin-right:3px ';
//
//                                                            return '<b>' + Ext.util.Format.number(data.TOT_QTYS11_PERCENT, '0,000') + '%' + '<b>';
//                                                        }
//                                                    },
//                                                ]
//                                            },
//                                            {
//                                                text: 'Amount',
//                                                id: prototype.id + '-amo11',
//                                                defaults: {
//                                                    menuDisabled: true, sortable: false, align: 'center'
//                                                },
//                                                columns: [
//                                                    {text: 'Amount', dataIndex: 'FLYAMO11', width: 100,
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "background:#;text-align:right";
//                                                            return Ext.util.Format.number(value, '0,000');
//                                                        },
//                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridFORE').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right; margin-right:3px ';
//                                                            return '<b>' + Ext.util.Format.number(data.TOT_AMT11, '0,000') + '<b>';
//                                                        }
//                                                    },
//                                                ]
//                                            },
//                                        ]
//                                    },
//                                    {
//                                        text: 'Twelfth Month',
//                                        id: prototype.id + '-month12',
//                                        defaults: {
//                                            menuDisabled: true, sortable: false, align: 'center'
//                                        },
//                                        columns: [
//                                            {
//                                                text: 'Sales',
//                                                id: prototype.id + '-sales12',
//                                                defaults: {
//                                                    menuDisabled: true, sortable: false, align: 'center'
//                                                },
//                                                columns: [
//                                                    {text: 'Flight<br>Date', dataIndex: 'DFLIGHT12', width: 70, align: 'center',
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "background:#bbe4fc;text-align:center";
//                                                            return value;
//                                                        },
//                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridFORE').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:center; margin-right:3px ';
////                                                            return '<b>' + Ext.util.Format.number(data.TOT_QTYFLY1, '0,000') + '<b>';
//                                                            return '<b>' + 'Total' + '<b>';
//                                                        }
//                                                    },
//                                                ]
//                                            },
//                                            {
//                                                text: 'Coupons',
//                                                id: prototype.id + '-cpn12',
//                                                defaults: {
//                                                    menuDisabled: true, sortable: false, align: 'center'
//                                                },
//                                                columns: [
//                                                    {text: 'Coupons', dataIndex: 'QTYFLY12', width: 87,
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "background:#bbe4fc;text-align:right";
//                                                            return Ext.util.Format.number(value, '0,000');
//                                                        },
//                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridFORE').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right; margin-right:3px ';
//                                                            return '<b>' + Ext.util.Format.number(data.TOT_CPN12, '0,000') + '<b>';
//                                                        }
//                                                    },
//                                                    {text: '%', dataIndex: 'QTYS12_PERCENT', width: 55,
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "background:#bbe4fc;text-align:right";
//                                                            return Ext.util.Format.number(value, '0,000.00') + '%';
//                                                        },
//                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridFORE').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right; margin-right:3px ';
//
//                                                            return '<b>' + Ext.util.Format.number(data.TOT_QTYS12_PERCENT, '0,000') + '%' + '<b>';
//                                                        }
//                                                    },
//                                                ]
//                                            },
//                                            {
//                                                text: 'Amount',
//                                                id: prototype.id + '-amo12',
//                                                defaults: {
//                                                    menuDisabled: true, sortable: false, align: 'center'
//                                                },
//                                                columns: [
//                                                    {text: 'Amount', dataIndex: 'FLYAMO12', width: 100,
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "background:#bbe4fc;text-align:right";
//                                                            return Ext.util.Format.number(value, '0,000');
//                                                        },
//                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridFORE').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right; margin-right:3px ';
//                                                            return '<b>' + Ext.util.Format.number(data.TOT_AMT12, '0,000') + '<b>';
//                                                        }
//                                                    },
//                                                ]
//                                            },
//                                        ]
//                                    },
                                ]
                            },
                            viewConfig: {
                                stripeRows: true,
                                enableTextSelection: true
                            }
                        },
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridFORE2',
                            columnLines: true,
                            autoScroll: true,
                            width: 1248,
                            margin: "5 0 0 0",
//                            width: '100%',
                            height: 60,
//                            features: [{
//                                    ftype: 'summary',
////                                    dock: 'bottom'
//                                }],
                            columns: {
                                items: [
                                    {text: 'Used', dataIndex: 'USED1', width: 70, align: 'center',
                                        id: prototype.id + '-Used1',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center";
                                            return value;
                                        },
                                    },
                                    {text: 'Coupons', dataIndex: 'CPNS1', width: 87, align: 'center',
                                        id: prototype.id + '-Coupons1',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "background:#;text-align:right";
                                            return Ext.util.Format.number(value, '0,000');
                                        },
                                    },
                                    {text: '%', dataIndex: 'QTYS1_PERCENT', width: 55, align: 'center',
                                        id: prototype.id + '-Por1',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "background:#;text-align:right";
                                            return Ext.util.Format.number(value, '0,000.00') + '%';
                                        },
                                    },
                                    {text: 'Amount', dataIndex: 'AMON1', width: 100,
                                        id: prototype.id + '-Amount1',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "background:#;text-align:right";
                                            return Ext.util.Format.number(value, '0,000');
                                        },
                                    },
                                    {text: 'Used', dataIndex: 'USED2', width: 70, align: 'center',
                                        id: prototype.id + '-Used2',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "background:#bbe4fc;text-align:center";
                                            return value;
                                        },
                                    },
                                    {text: 'Coupons', dataIndex: 'CPNS2', width: 87, align: 'center',
                                        id: prototype.id + '-Coupons2',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "background:#bbe4fc;text-align:right";
                                            return Ext.util.Format.number(value, '0,000');
                                        },
                                    },
                                    {text: '%', dataIndex: 'QTYS2_PERCENT', width: 55, align: 'center',
                                        id: prototype.id + '-Por2',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "background:#bbe4fc;text-align:right";
                                            return Ext.util.Format.number(value, '0,000.00') + '%';
                                        },
                                    },
                                    {text: 'Amount', dataIndex: 'AMON2', width: 100,
                                        id: prototype.id + '-Amount2',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "background:#bbe4fc;text-align:right";
                                            return Ext.util.Format.number(value, '0,000');
                                        },
                                    },
                                    {text: 'Used', dataIndex: 'USED3', width: 70, align: 'center',
                                        id: prototype.id + '-Used3',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center";
                                            return value;
                                        },
                                    },
                                    {text: 'Coupons', dataIndex: 'CPNS3', width: 87, align: 'center',
                                        id: prototype.id + '-Coupons3',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "background:#;text-align:right";
                                            return Ext.util.Format.number(value, '0,000');
                                        },
                                    },
                                    {text: '%', dataIndex: 'QTYS3_PERCENT', width: 55, align: 'center',
                                        id: prototype.id + '-Por3',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "background:#;text-align:right";
                                            return Ext.util.Format.number(value, '0,000.00') + '%';
                                        },
                                    },
                                    {text: 'Amount', dataIndex: 'AMON3', width: 100,
                                        id: prototype.id + '-Amount3',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "background:#;text-align:right";
                                            return Ext.util.Format.number(value, '0,000');
                                        },
                                    },
                                    {text: 'Used', dataIndex: 'USED4', width: 70, align: 'center',
                                        id: prototype.id + '-Used4',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "background:#bbe4fc;text-align:center";
                                            return value;
                                        },
                                    },
                                    {text: 'Coupons', dataIndex: 'CPNS4', width: 87, align: 'center',
                                        id: prototype.id + '-Coupons4',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "background:#bbe4fc;text-align:right";
                                            return Ext.util.Format.number(value, '0,000');
                                        },
                                    },
                                    {text: '%', dataIndex: 'QTYS4_PERCENT', width: 55, align: 'center',
                                        id: prototype.id + '-Por4',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "background:#bbe4fc;text-align:right";
                                            return Ext.util.Format.number(value, '0,000.00') + '%';
                                        },
                                    },
                                    {text: 'Amount', dataIndex: 'AMON4', width: 100,
                                        id: prototype.id + '-Amount4',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "background:#bbe4fc;text-align:right";
                                            return Ext.util.Format.number(value, '0,000');
                                        },
                                    },
//                                    {text: 'Used', dataIndex: 'USED5', width: 70, align: 'center',
//                                        id: prototype.id + '-Used5',
//                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                            metaData.style = "text-align:center";
//                                            return value;
//                                        },
//                                    },
//                                    {text: 'Coupons', dataIndex: 'CPNS5', width: 87, align: 'center',
//                                        id: prototype.id + '-Coupons5',
//                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                            metaData.style = "background:#;text-align:right";
//                                            return Ext.util.Format.number(value, '0,000');
//                                        },
//                                    },
//                                    {text: '%', dataIndex: 'QTYS5_PERCENT', width: 55, align: 'center',
//                                        id: prototype.id + '-Por5',
//                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                            metaData.style = "background:#;text-align:right";
//                                            return Ext.util.Format.number(value, '0,000.00') + '%';
//                                        },
//                                    },
//                                    {text: 'Amount', dataIndex: 'AMON5', width: 100,
//                                        id: prototype.id + '-Amount5',
//                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                            metaData.style = "background:#;text-align:right";
//                                            return Ext.util.Format.number(value, '0,000');
//                                        },
//                                    },
//                                    {text: 'Used', dataIndex: 'USED6', width: 70, align: 'center',
//                                        id: prototype.id + '-Used6',
//                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                            metaData.style = "background:#bbe4fc;text-align:center";
//                                            return value;
//                                        },
//                                    },
//                                    {text: 'Coupons', dataIndex: 'CPNS6', width: 87, align: 'center',
//                                        id: prototype.id + '-Coupons6',
//                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                            metaData.style = "background:#bbe4fc;text-align:right";
//                                            return Ext.util.Format.number(value, '0,000');
//                                        },
//                                    },
//                                    {text: '%', dataIndex: 'QTYS6_PERCENT', width: 55, align: 'center',
//                                        id: prototype.id + '-Por6',
//                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                            metaData.style = "background:#bbe4fc;text-align:right";
//                                            return Ext.util.Format.number(value, '0,000.00') + '%';
//                                        },
//                                    },
//                                    {text: 'Amount', dataIndex: 'AMON6', width: 100,
//                                        id: prototype.id + '-Amount6',
//                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                            metaData.style = "background:#bbe4fc;text-align:right";
//                                            return Ext.util.Format.number(value, '0,000');
//                                        },
//                                    },
//                                    {text: 'Used', dataIndex: 'USED7', width: 70, align: 'center',
//                                        id: prototype.id + '-Used7',
//                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                            metaData.style = "text-align:center";
//                                            return value;
//                                        },
//                                    },
//                                    {text: 'Coupons', dataIndex: 'CPNS7', width: 87, align: 'center',
//                                        id: prototype.id + '-Coupons7',
//                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                            metaData.style = "background:#;text-align:right";
//                                            return Ext.util.Format.number(value, '0,000');
//                                        },
//                                    },
//                                    {text: '%', dataIndex: 'QTYS7_PERCENT', width: 55, align: 'center',
//                                        id: prototype.id + '-Por7',
//                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                            metaData.style = "background:#;text-align:right";
//                                            return Ext.util.Format.number(value, '0,000.00') + '%';
//                                        },
//                                    },
//                                    {text: 'Amount', dataIndex: 'AMON7', width: 100,
//                                        id: prototype.id + '-Amount7',
//                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                            metaData.style = "background:#;text-align:right";
//                                            return Ext.util.Format.number(value, '0,000');
//                                        },
//                                    },
//                                    {text: 'Used', dataIndex: 'USED8', width: 70, align: 'center',
//                                        id: prototype.id + '-Used8',
//                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                            metaData.style = "background:#bbe4fc;text-align:center";
//                                            return value;
//                                        },
//                                    },
//                                    {text: 'Coupons', dataIndex: 'CPNS8', width: 87, align: 'center',
//                                        id: prototype.id + '-Coupons8',
//                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                            metaData.style = "background:#bbe4fc;text-align:right";
//                                            return Ext.util.Format.number(value, '0,000');
//                                        },
//                                    },
//                                    {text: '%', dataIndex: 'QTYS8_PERCENT', width: 55, align: 'center',
//                                        id: prototype.id + '-Por8',
//                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                            metaData.style = "background:#bbe4fc;text-align:right";
//                                            return Ext.util.Format.number(value, '0,000.00') + '%';
//                                        },
//                                    },
//                                    {text: 'Amount', dataIndex: 'AMON8', width: 100,
//                                        id: prototype.id + '-Amount8',
//                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                            metaData.style = "background:#bbe4fc;text-align:right";
//                                            return Ext.util.Format.number(value, '0,000');
//                                        },
//                                    },
//                                    {text: 'Used', dataIndex: 'USED9', width: 70, align: 'center',
//                                        id: prototype.id + '-Used9',
//                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                            metaData.style = "text-align:center";
//                                            return value;
//                                        },
//                                    },
//                                    {text: 'Coupons', dataIndex: 'CPNS9', width: 87, align: 'center',
//                                        id: prototype.id + '-Coupons9',
//                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                            metaData.style = "background:#;text-align:right";
//                                            return Ext.util.Format.number(value, '0,000');
//                                        },
//                                    },
//                                    {text: '%', dataIndex: 'QTYS9_PERCENT', width: 55, align: 'center',
//                                        id: prototype.id + '-Por9',
//                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                            metaData.style = "background:#;text-align:right";
//                                            return Ext.util.Format.number(value, '0,000.00') + '%';
//                                        },
//                                    },
//                                    {text: 'Amount', dataIndex: 'AMON9', width: 100,
//                                        id: prototype.id + '-Amount9',
//                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                            metaData.style = "background:#;text-align:right";
//                                            return Ext.util.Format.number(value, '0,000');
//                                        },
//                                    },
//                                    {text: 'Used', dataIndex: 'USED10', width: 70, align: 'center',
//                                        id: prototype.id + '-Used10',
//                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                            metaData.style = "background:#bbe4fc;text-align:center";
//                                            return value;
//                                        },
//                                    },
//                                    {text: 'Coupons', dataIndex: 'CPNS10', width: 87, align: 'center',
//                                        id: prototype.id + '-Coupons10',
//                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                            metaData.style = "background:#bbe4fc;text-align:right";
//                                            return Ext.util.Format.number(value, '0,000');
//                                        },
//                                    },
//                                    {text: '%', dataIndex: 'QTYS10_PERCENT', width: 55, align: 'center',
//                                        id: prototype.id + '-Por10',
//                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                            metaData.style = "background:#bbe4fc;text-align:right";
//                                            return Ext.util.Format.number(value, '0,000.00') + '%';
//                                        },
//                                    },
//                                    {text: 'Amount', dataIndex: 'AMON10', width: 100,
//                                        id: prototype.id + '-Amount10',
//                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                            metaData.style = "background:#bbe4fc;text-align:right";
//                                            return Ext.util.Format.number(value, '0,000');
//                                        },
//                                    },
//                                    {text: 'Used', dataIndex: 'USED11', width: 70, align: 'center',
//                                        id: prototype.id + '-Used11',
//                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                            metaData.style = "text-align:center";
//                                            return value;
//                                        },
//                                    },
//                                    {text: 'Coupons', dataIndex: 'CPNS11', width: 87, align: 'center',
//                                        id: prototype.id + '-Coupons11',
//                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                            metaData.style = "background:#;text-align:right";
//                                            return Ext.util.Format.number(value, '0,000');
//                                        },
//                                    },
//                                    {text: '%', dataIndex: 'QTYS11_PERCENT', width: 55, align: 'center',
//                                        id: prototype.id + '-Por11',
//                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                            metaData.style = "background:#;text-align:right";
//                                            return Ext.util.Format.number(value, '0,000.00') + '%';
//                                        },
//                                    },
//                                    {text: 'Amount', dataIndex: 'AMON11', width: 100,
//                                        id: prototype.id + '-Amount11',
//                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                            metaData.style = "background:#;text-align:right";
//                                            return Ext.util.Format.number(value, '0,000');
//                                        },
//                                    },
//                                    {text: 'Used', dataIndex: 'USED12', width: 70, align: 'center',
//                                        id: prototype.id + '-Used12',
//                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                            metaData.style = "background:#bbe4fc;text-align:center";
//                                            return value;
//                                        },
//                                    },
//                                    {text: 'Coupons', dataIndex: 'CPNS12', width: 87, align: 'center',
//                                        id: prototype.id + '-Coupons12',
//                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                            metaData.style = "background:#bbe4fc;text-align:right";
//                                            return Ext.util.Format.number(value, '0,000');
//                                        },
//                                    },
//                                    {text: '%', dataIndex: 'QTYS12_PERCENT', width: 55, align: 'center',
//                                        id: prototype.id + '-Por12',
//                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                            metaData.style = "background:#bbe4fc;text-align:right";
//                                            return Ext.util.Format.number(value, '0,000.00') + '%';
//                                        },
//                                    },
//                                    {text: 'Amount', dataIndex: 'AMON12', width: 100,
//                                        id: prototype.id + '-Amount12',
//                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                            metaData.style = "background:#bbe4fc;text-align:right";
//                                            return Ext.util.Format.number(value, '0,000');
//                                        },
//                                    },
                                ]
                            },
                            viewConfig: {
                                stripeRows: true,
                                enableTextSelection: true
                            }
                        },
//                                    ]
//                                },
//                            ]
//                        },
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxSal_Fore',
                    margin: '0 0 0 0',
                    hidden: true,
                    width: 1500,
                    border: false,
                    layout: {
                        type: 'vbox',
                        pack: 'center'
                    },
                    bodyStyle: 'background-color: transparent;',
                    items: [
                        {
                            xtype: 'panel',
                            hidden: false,
                            margin: '10 0 0 10',
                            border: false,
                            width: 200,
//                                    height: 350,
                            layout: {
                                type: 'vbox',
                                aling: 'center'
                            },
                            bodyStyle: 'background-color: transparent;',
                            items: [
                                {
                                    xtype: 'radiogroup',
                                    id: prototype.id + '-BoxForeOptions',
                                    fieldLabel: '',
                                    horizontal: true,
                                    items: [
                                        {boxLabel: '<strong style="color:#3399FF" >Total</strong>', name: 'rb', inputValue: 'rbc1', width: 120},
                                        {boxLabel: '<strong style="color:#3399FF" >Zones</strong>', name: 'rb', inputValue: 'rbc2', width: 120},

                                        {xtype: 'tbspacer', width: 50},
                                    ],
                                    listeners: {
                                        change: 'chooseFore_clickHandler'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: {
                                type: 'hbox',
                                align: 'center'
                            },
                            border: false,
                            bodyStyle: 'background-color: transparent;',
                            items: [
                                {
                                    xtype: 'panel',
                                    hidden: false,
                                    margin: '10 0 0 0',
                                    border: false,
                                    width: 200,
                                    height: 350,
                                    layout: {
                                        type: 'vbox',
                                        aling: 'center'
                                    },
                                    bodyStyle: 'background-color: transparent;',
                                    items: [
                                    ]
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataFore',
                                    width: 500,
                                    height: 350,
                                    columnLines: true,
                                    margin: "5 0 0 0",
                                    border: false,
                                    bodyStyle: 'background-color: #E3EAEF;',
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
                                            {text: 'Sales<br>Date', dataIndex: 'DSALES', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "";
                                                    value = '<b>' + value + '</b>';
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataFore').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:center; margin-right:3px ';
                                                    return '<b>' + 'TOTAL' + '<b>';
                                                }
                                            },
                                            {
                                                text: 'Sales',
                                                defaults: {
                                                    menuDisabled: true, sortable: false, align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Coupons', dataIndex: 'QTYSALE', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#;text-align:right";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataFore').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_QTYSALE, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Amount USD', dataIndex: 'AMOSALE', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#;text-align:right";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataFore').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_AMOSALE, '0,000') + '<b>';
                                                        }
                                                    },
//                                                    {text: '%', dataIndex: 'QTYS1_PERCENT', width: 55,
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "background:#;text-align:right";
//                                                            return Ext.util.Format.number(value, '0,000.00') + '%';
//                                                        },
//                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridFORE').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right; margin-right:3px ';
//                                                            
//                                                            return '<b>' + Ext.util.Format.number(data.TOT_QTYS1_PERCENT, '0,000') + '%' + '<b>';
//                                                        }
//                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Used Flown',
                                                defaults: {
                                                    menuDisabled: true, sortable: false, align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Coupons', dataIndex: 'QTYFLOWN', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#;text-align:right";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataFore').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_QTYFLOWN, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Amount USD', dataIndex: 'AMOFLOWN', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#;text-align:right";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataFore').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_AMOFLOWN, '0,000') + '<b>';
                                                        }
                                                    },
                                                ]
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'polar',
                                    id: prototype.id + '-displayPolarFore',
                                    width: 500,
                                    border: true,
                                    margin: '0 0 0 20',
                                    innerPadding: 80,
                                    height: 350,
                                    background: '#E0F8F7',
                                    captions: {
                                        title: {
//                                                    text: 'Total Coupons',
                                            alignTo: 'chart'
                                        }
                                    },
                                    animation: {
                                        duration: 200
                                    },
                                    interactions: ['rotate', 'itemhighlight'],
//                                            legend: {
//                                                docked: 'bottom',
//                                                background: '#E3EAEF',
//                                            },
                                    series: [{
                                            type: 'pie3d',
                                            angleField: 'QTY',
                                            colors: ['#00b5fc', '#3acc00', '#fcbd00'],
                                            stacked: false,
                                            title: ['Sales', 'Flown', 'Pending'],
//                                            donut: 20,
                                            label: {
                                                field: 'strDescriptionQTY',
                                                calloutLine: false,
                                                renderer: function (value, b, callout) {
                                                    callout.calloutWidth = 1;
                                                    return value;
                                                }
                                            },
                                            highlight: true,
                                            tooltip: {
                                                trackMouse: true,
                                                height: 28,
                                                renderer: function (toolTip, record, ctx) {
                                                    var label = '';
                                                    label = record.get('strDescription');
                                                    if (label === 'Sales') {
                                                        label = 'Sales';
                                                    } else if (label === 'Flown') {
                                                        label = 'Flown';
                                                    } else if (label === 'Pending') {
                                                        label = 'Pending';
                                                    }
                                                    toolTip.setHtml('Total ' + label + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
                                                }
                                            }
                                        }]
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            hidden: false,
                            margin: '10 0 0 50',
                            border: false,
                            layout: {
                                type: 'vbox',
                                aling: 'center'
                            },
                            bodyStyle: 'background-color: transparent;',
                            items: [
                                {
                                    xtype: 'cartesian',
                                    id: prototype.id + '-displayForeGraph',
                                    width: 1400,
                                    border: false,
                                    height: 290,
                                    background: '#E0F8F7',
                                    captions: {
                                        title: {
                                            text: 'Total Coupons',
                                            alignTo: 'chart'
                                        }
                                    },
                                    animation: {
                                        duration: 200
                                    },
                                    interactions: ['itemhighlight'],
                                    legend: {
                                        docked: 'bottom',
                                        background: '#E3EAEF'
                                    },
                                    axes: [{
                                            type: 'numeric3d',
                                            position: 'left',
                                            fields: ['QTYSALE', 'QTYFLOWN'],
                                            grid: true,
                                            title: '',
                                            renderer: function (obj, value) {
                                                if (value > 1) {
                                                    if ((value / 1000).toString().length > 3) {
                                                        return  ' ' + Ext.util.Format.number((value / 1000000), '0') + 'M';
                                                    } else {
                                                        return  ' ' + Ext.util.Format.number((value / 1000), '0') + 'K';
                                                    }
                                                } else {
                                                    return '';
                                                }
                                            }
                                        }, {
                                            type: 'category3d',
                                            position: 'bottom',
//                                                            fields: 'strFormatDate',
                                            grid: true,
                                            title: {
//                                                text: 'Month',
                                                translationX: -30
                                            }
                                        }],
                                    series: [{
                                            type: 'bar3d',
                                            stacked: false,
                                            title: ['Sales', 'Flown'],
                                            xField: 'DSALES',
                                            yField: ['QTYSALE', 'QTYFLOWN'],
                                            colors: ['#00b5fc', '#3acc00'],
                                            highlight: true,
                                            style: {
                                                inGroupGapWidth: -7,
                                                minGapWidth: 2,
                                                maxBarWidth: 1200
                                            },
                                            tooltip: {
                                                trackMouse: true,
                                                height: 28,
                                                renderer: function (toolTip, record, ctx) {
                                                    var label = '';
                                                    if (ctx.field === 'QTYSALE') {
                                                        label = 'sales';
                                                    } else if (ctx.field === 'QTYFLOWN') {
                                                        label = 'flown';
                                                    }
                                                    toolTip.setHtml('Qty ' + label + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
                                                }
                                            }
                                        }]
                                }
                            ]
                        }
                    ]
                },
//                {
//                    xtype: 'panel',
//                    id: prototype.id + '-boxTNUVS',
//                    width: '100%',
////                    height: 750,
//                    hidden: true,
//                    layout: {
//                        type: 'vbox',
//                        align: 'center',
//                        pack: 'center'
//                    },
//                    defaults: {
//                        bodyStyle: 'background: transparent;',
//                        border: false,
//                        align: 'center',
//                        margin: "0 15 0 0"  // (top, right, bottom, left)
//                    },
//                    items: [
//                        //grid data 
//                        {
//                            xtype: 'grid',
//                            id: prototype.id + '-gridTNUVS',
//                            width: 1460,
//                            height: 'auto',
//                            columnLines: true,
//                            bodyStyle: 'background:#E3EAEF',
//                            margin: "10 0 0 0",
//                            features: [{
//                                    ftype: 'summary',
////                                                    dock: 'bottom'
//                                }],
//                            columns: {
//                                defaults: {
//                                    menuDisabled: true,
//                                    sortable: false,
//                                    align: 'center'
//                                },
//                                items: [
//                                    {
//                                        text: '',
//                                        dataIndex: 'MES2',
//                                        width: 40,
////                                                        locked: true,
//                                        align: 'center'
//                                    },
//                                    {
//                                        text: 'Sales',
//                                        dataIndex: 'SALE',
//                                        width: 110,
////                                                        locked: true,
//                                        align: 'right',
//                                        renderer: function (value, metaData, record, rowIndex, colIndex) {
//                                            return Ext.util.Format.number(value, '0,000');
//                                        },
//                                        summaryType: function (records, values) {
//                                            var i = 0, total = 0, record;
//                                            for (; i < records.length; ++i) {
//                                                record = records[i];
//                                                if (record.get('MES2') !== '%')
//                                                    total += record.get('SALE');
//                                            }
//                                            return  Ext.util.Format.number(total, '0,000');
//                                        }
//                                    },
//                                    {
//                                        text: 'Last',
//                                        dataIndex: 'LAST',
//                                        width: 60,
//                                        align: 'right',
//                                        renderer: function (value, metaData, record, rowIndex, colIndex) {
//                                            return Ext.util.Format.number(value, '0,000');
//                                        },
//                                        summaryType: function (records, values) {
//                                            var i = 0, total = 0, record;
//                                            for (; i < records.length; ++i) {
//                                                record = records[i];
//                                                if (record.get('MES2') !== '%')
//                                                    total += record.get('LAST');
//                                            }
//                                            return  Ext.util.Format.number(total, '0,000');
//                                        }
//                                    },
//                                    {
//                                        text: 'Months',
//                                        columns: [
//                                            {
//                                                text: 'January',
//                                                dataIndex: 'ENE',
//                                                width: 90,
//                                                align: 'right',
//                                                renderer: function (value, metaData, record, rowIndex, colIndex) {
//                                                    if (record.data.MES === '01')
//                                                        metaData.style = "background-color:#FBD705;";
//                                                    return Ext.util.Format.number(value, '0,000');
//                                                },
//                                                summaryType: function (records, values) {
//                                                    var i = 0, total = 0, record;
//                                                    for (; i < records.length; ++i) {
//                                                        record = records[i];
//                                                        if (record.get('MES2') !== '%')
//                                                            total += record.get('ENE');
//                                                    }
//                                                    return  Ext.util.Format.number(total, '0,000');
//                                                }
//                                            },
//                                            {
//                                                text: 'February',
//                                                dataIndex: 'FEB',
//                                                width: 90,
//                                                align: 'right',
//                                                renderer: function (value, metaData, record, rowIndex, colIndex) {
//                                                    if (record.data.MES === '02')
//                                                        metaData.style = "background-color:#FBD705;";
//                                                    else if (record.data.MES <= '02')
//                                                        metaData.style = "background-color:#99FFCC;";  //metaData.tdCls = 'background-column';
//                                                    return Ext.util.Format.number(value, '0,000');
//                                                    //return '<span style="font-size:9px;">' + Ext.util.Format.number(value, '0,000') + '</span> ';
//                                                },
//                                                summaryType: function (records, values) {
//                                                    var i = 0, total = 0, record;
//                                                    for (; i < records.length; ++i) {
//                                                        record = records[i];
//                                                        if (record.get('MES2') !== '%')
//                                                            total += record.get('FEB');
//                                                    }
//                                                    return  Ext.util.Format.number(total, '0,000');
//                                                }
//                                            },
//                                            {
//                                                text: 'March',
//                                                dataIndex: 'MAR',
//                                                width: 90,
//                                                align: 'right',
//                                                renderer: function (value, metaData, record, rowIndex, colIndex) {
//                                                    if (record.data.MES === '03')
//                                                        metaData.style = "background-color:#FBD705;";
//                                                    else if (record.data.MES <= '03')
//                                                        metaData.style = "background-color:#99FFCC;";  //metaData.tdCls = 'background-column';
//                                                    return Ext.util.Format.number(value, '0,000');
//                                                    //return '<span style="font-size:9px;">' + Ext.util.Format.number(value, '0,000') + '</span> ';
//
//                                                },
//                                                summaryType: function (records, values) {
//                                                    var i = 0, total = 0, record;
//                                                    for (; i < records.length; ++i) {
//                                                        record = records[i];
//                                                        if (record.get('MES2') !== '%')
//                                                            total += record.get('MAR');
//                                                    }
//                                                    return  Ext.util.Format.number(total, '0,000');
//                                                }
//                                            },
//                                            {
//                                                text: 'April',
//                                                dataIndex: 'ABR',
//                                                width: 90,
//                                                align: 'right',
//                                                renderer: function (value, metaData, record, rowIndex, colIndex) {
//                                                    if (record.data.MES === '04')
//                                                        metaData.style = "background-color:#FBD705;";
//                                                    else if (record.data.MES <= '04')
//                                                        metaData.style = "background-color:#99FFCC;";  //metaData.tdCls = 'background-column';
//                                                    return Ext.util.Format.number(value, '0,000');
//                                                    //return '<span style="font-size:9px;">' + Ext.util.Format.number(value, '0,000') + '</span> ';
//                                                },
//                                                summaryType: function (records, values) {
//                                                    var i = 0, total = 0, record;
//                                                    for (; i < records.length; ++i) {
//                                                        record = records[i];
//                                                        if (record.get('MES2') !== '%')
//                                                            total += record.get('ABR');
//                                                    }
//                                                    return  Ext.util.Format.number(total, '0,000');
//                                                }
//                                            },
//                                            {
//                                                text: 'May',
//                                                dataIndex: 'MAY',
//                                                width: 90,
//                                                align: 'right',
//                                                renderer: function (value, metaData, record, rowIndex, colIndex) {
//                                                    if (record.data.MES === '05')
//                                                        metaData.style = "background-color:#FBD705;";
//                                                    else if (record.data.MES <= '05')
//                                                        metaData.style = "background-color:#99FFCC;";  //metaData.tdCls = 'background-column';
//                                                    return Ext.util.Format.number(value, '0,000');
//                                                    //return '<span style="font-size:9px;">' + Ext.util.Format.number(value, '0,000') + '</span> ';
//                                                },
//                                                summaryType: function (records, values) {
//                                                    var i = 0, total = 0, record;
//                                                    for (; i < records.length; ++i) {
//                                                        record = records[i];
//                                                        if (record.get('MES2') !== '%')
//                                                            total += record.get('MAY');
//                                                    }
//                                                    return  Ext.util.Format.number(total, '0,000');
//                                                }
//                                            }, {
//                                                text: 'June',
//                                                dataIndex: 'JUN',
//                                                width: 90,
//                                                align: 'right',
//                                                renderer: function (value, metaData, record, rowIndex, colIndex) {
//                                                    if (record.data.MES === '06')
//                                                        metaData.style = "background-color:#FBD705;";
//                                                    else if (record.data.MES <= '06')
//                                                        metaData.style = "background-color:#99FFCC;"; //metaData.tdCls = 'background-column';
//                                                    return Ext.util.Format.number(value, '0,000');
//                                                    //return '<span style="font-size:9px;">' + Ext.util.Format.number(value, '0,000') + '</span> ';
//                                                },
//                                                summaryType: function (records, values) {
//                                                    var i = 0, total = 0, record;
//                                                    for (; i < records.length; ++i) {
//                                                        record = records[i];
//                                                        if (record.get('MES2') !== '%')
//                                                            total += record.get('JUN');
//                                                    }
//                                                    return  Ext.util.Format.number(total, '0,000');
//                                                }
//                                            }, {
//                                                text: 'July',
//                                                dataIndex: 'JUL',
//                                                width: 90,
//                                                align: 'right',
//                                                renderer: function (value, metaData, record, rowIndex, colIndex) {
//                                                    if (record.data.MES === '07')
//                                                        metaData.style = "background-color:#FBD705;";
//                                                    else if (record.data.MES <= '07')
//                                                        metaData.style = "background-color:#99FFCC;"; //metaData.tdCls = 'background-column';
//                                                    return Ext.util.Format.number(value, '0,000');
//                                                    //return '<span style="font-size:9px;">' + Ext.util.Format.number(value, '0,000') + '</span> ';
//                                                },
//                                                summaryType: function (records, values) {
//                                                    var i = 0, total = 0, record;
//                                                    for (; i < records.length; ++i) {
//                                                        record = records[i];
//                                                        if (record.get('MES2') !== '%')
//                                                            total += record.get('JUL');
//                                                    }
//                                                    return  Ext.util.Format.number(total, '0,000');
//                                                }
//                                            }, {
//                                                text: 'August',
//                                                dataIndex: 'AGO',
//                                                width: 90,
//                                                align: 'right',
//                                                renderer: function (value, metaData, record, rowIndex, colIndex) {
//                                                    if (record.data.MES === '08')
//                                                        metaData.style = "background-color:#FBD705;";
//                                                    else if (record.data.MES <= '08')
//                                                        metaData.style = "background-color:#99FFCC;"; //metaData.tdCls = 'background-column';
//                                                    return Ext.util.Format.number(value, '0,000');
//                                                    //return '<span style="font-size:9px;">' + Ext.util.Format.number(value, '0,000') + '</span> ';
//                                                },
//                                                summaryType: function (records, values) {
//                                                    var i = 0, total = 0, record;
//                                                    for (; i < records.length; ++i) {
//                                                        record = records[i];
//                                                        if (record.get('MES2') !== '%')
//                                                            total += record.get('AGO');
//                                                    }
//                                                    return  Ext.util.Format.number(total, '0,000');
//                                                }
//                                            }, {
//                                                text: 'September',
//                                                dataIndex: 'SET',
//                                                width: 90,
//                                                align: 'right',
//                                                renderer: function (value, metaData, record, rowIndex, colIndex) {
//                                                    if (record.data.MES === '09')
//                                                        metaData.style = "background-color:#FBD705;";
//                                                    else if (record.data.MES <= '09')
//                                                        metaData.style = "background-color:#99FFCC;"; //metaData.tdCls = 'background-column';
//                                                    return Ext.util.Format.number(value, '0,000');
//                                                    //return '<span style="font-size:9px;">' + Ext.util.Format.number(value, '0,000') + '</span> ';
//                                                },
//                                                summaryType: function (records, values) {
//                                                    var i = 0, total = 0, record;
//                                                    for (; i < records.length; ++i) {
//                                                        record = records[i];
//                                                        if (record.get('MES2') !== '%')
//                                                            total += record.get('SET');
//                                                    }
//                                                    return  Ext.util.Format.number(total, '0,000');
//                                                }
//                                            }, {
//                                                text: 'October',
//                                                dataIndex: 'OCT',
//                                                width: 90,
//                                                align: 'right',
//                                                renderer: function (value, metaData, record, rowIndex, colIndex) {
//                                                    if (record.data.MES === '10')
//                                                        metaData.style = "background-color:#FBD705;";
//                                                    else if (record.data.MES <= '10')
//                                                        metaData.style = "background-color:#99FFCC;"; //metaData.tdCls = 'background-column';
//                                                    return Ext.util.Format.number(value, '0,000');
//                                                    //return '<span style="font-size:9px;">' + Ext.util.Format.number(value, '0,000') + '</span> ';
//                                                },
//                                                summaryType: function (records, values) {
//                                                    var i = 0, total = 0, record;
//                                                    for (; i < records.length; ++i) {
//                                                        record = records[i];
//                                                        if (record.get('MES2') !== '%')
//                                                            total += record.get('OCT');
//                                                    }
//                                                    return  Ext.util.Format.number(total, '0,000');
//                                                }
//                                            }, {
//                                                text: 'November',
//                                                dataIndex: 'NOV',
//                                                width: 90,
//                                                align: 'right',
//                                                renderer: function (value, metaData, record, rowIndex, colIndex) {
//                                                    if (record.data.MES === '11')
//                                                        metaData.style = "background-color:#FBD705;";
//                                                    else if (record.data.MES <= '11')
//                                                        metaData.style = "background-color:#99FFCC;"; //metaData.tdCls = 'background-column';
//                                                    return Ext.util.Format.number(value, '0,000');
//                                                    //return '<span style="font-size:9px;">' + Ext.util.Format.number(value, '0,000') + '</span> ';
//                                                },
//                                                summaryType: function (records, values) {
//                                                    var i = 0, total = 0, record;
//                                                    for (; i < records.length; ++i) {
//                                                        record = records[i];
//                                                        if (record.get('MES2') !== '%')
//                                                            total += record.get('NOV');
//                                                    }
//                                                    return  Ext.util.Format.number(total, '0,000');
//                                                }
//                                            }, {
//                                                text: 'December',
//                                                dataIndex: 'DIC',
//                                                width: 90,
//                                                align: 'right',
//                                                renderer: function (value, metaData, record, rowIndex, colIndex) {
//                                                    if (record.data.MES === '12')
//                                                        metaData.style = "background-color:#FBD705;";
//                                                    else if (record.data.MES <= '12')
//                                                        metaData.style = "background-color:#99FFCC;"; //metaData.tdCls = 'background-column';
//                                                    return Ext.util.Format.number(value, '0,000');
//                                                    //return '<span style="font-size:9px;">' + Ext.util.Format.number(value, '0,000') + '</span> ';
//                                                },
//                                                summaryType: function (records, values) {
//                                                    var i = 0, total = 0, record;
//                                                    for (; i < records.length; ++i) {
//                                                        record = records[i];
//                                                        if (record.get('MES2') !== '%')
//                                                            total += record.get('DIC');
//                                                    }
//                                                    return  Ext.util.Format.number(total, '0,000');
//                                                }
//                                            }]
//                                    },
//                                    {
//                                        text: 'After',
//                                        dataIndex: 'POST',
//                                        width: 90,
//                                        align: 'right',
//                                        renderer: function (value, metaData, record, rowIndex, colIndex) {
//                                            return Ext.util.Format.number(value, '0,000');
//                                            //return '<span style="font-size:9px;">' + Ext.util.Format.number(value, '0,000') + '</span> ';
//                                        },
//                                        summaryType: function (records, values) {
//                                            var i = 0, total = 0, record;
//                                            for (; i < records.length; ++i) {
//                                                record = records[i];
//                                                if (record.get('MES2') !== '%')
//                                                    total += record.get('POST');
//                                            }
//                                            return  Ext.util.Format.number(total, '0,000');
//                                        }
//                                    },
//                                    {
//                                        text: 'Balance',
//                                        dataIndex: 'SALDO',
//                                        width: 80,
//                                        align: 'right',
//                                        renderer: function (value, metaData, record, rowIndex, colIndex) {
//                                            return Ext.util.Format.number(value, '0,000');
//                                            //return '<span style="font-size:9px;">' + Ext.util.Format.number(value, '0,000') + '</span> ';
//                                        },
//                                        summaryType: function (records, values) {
//                                            var i = 0, total = 0, record;
//                                            for (; i < records.length; ++i) {
//                                                record = records[i];
//                                                if (record.get('MES2') !== '%')
//                                                    total += record.get('SALDO');
//                                            }
//                                            return  Ext.util.Format.number(total, '0,000');
//                                        }
//                                    }
//                                ]
//                            }
//                        },
//                    ]
//                },
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