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
                                                text: 'Country of Sale', dataIndex: 'COUNTRY_NAME', width: 200, id: prototype.id + '-lbl_Country',
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
                                                        text: 'Alliances', dataIndex: 'strDescription', width: 150,
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
                                {xtype: 'tbspacer', width: 100},
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
                                    width: 1378,
                                    height: 510,
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
                                                    value = Ext.util.Format.number(value, '0,000');
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
                                                    value = Ext.util.Format.number(value, '0,000');
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
                                                    value = Ext.util.Format.number(value, '0,000');
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
                                    width: 1378,
                                    height: 510,
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
                                                            console.log(data);
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
                                                            console.log(data);
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
                                                            console.log(data);
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
                                                            console.log(data);
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
                                                            console.log(data);
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
                                                            console.log(data);
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