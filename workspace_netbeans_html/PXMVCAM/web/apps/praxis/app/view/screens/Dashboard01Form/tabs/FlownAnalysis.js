Ext.define('Ext.Praxis.view.screens.Dashboard01Form.tabs.FlownAnalysis', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-FlownAnalysis',
    requires: [
        'Ext.Praxis.controller.screens.Dashboard01.tabs.FlownAnalysisController'
    ],
    controller: 'FlownAnalysisController',
    //layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            xtype: 'panel',
            width: '100%',
            id: prototype.id + '-filterMain',
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
                {
                    xtype: 'checkboxfield',
                    id: prototype.id + '-chkWP_FA',
                    width: 130,
                    boxLabel: 'WorkProgress',
                    inputValue: '1',
                    listeners: {
                        change: 'chkWP_FA_click'
                    }
                },
                {
                    xtype: 'button',
                    id: prototype.id + '-btnSwap_FA',
                    icon: 'resources/img/exchange.png',
                    tooltip: 'Swap',
                    listeners: {
                        click: 'btnSwap_FA_click'
                    }
                }
            ]
        },
        {
            xtype: 'panel',
            id: prototype.id + '-boxMainDataFA',
            width: '100%',
            hidden: false,
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
                    xtype: 'grid',
                    id: prototype.id + '-gridFAmonth',
                    width: 1482,
                    height: 365,
                    columnLines: true,
                    hidden: false,
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
                                text: 'Flight',
                                //                                                id: prototype.id + '-adgTitFecha',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Date', dataIndex: 'strFormatDate', width: 90,
                                        listeners: {
                                            click: 'viewDetFAFlight',
                                            args: ['9']
                                        },
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
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
                                        text: 'Flights', dataIndex: 'QTYFlight', width: 90,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#fcf9ec;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        },
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridFAmonth').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totQTYFlight, '0,000') + '<b>';
                                        }
                                    },
                                    {
                                        text: 'Pax', dataIndex: 'QTYPAX', width: 90,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#fcf9ec;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        },
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridFAmonth').getStore().getData().items[0].data;

                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totQTYPAX, '0,000') + '<b>';
                                        }
                                    },
                                    {
                                        text: 'USD', dataIndex: 'VCPN', width: 100,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#fcf9ec;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        },
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridFAmonth').getStore().getData().items[0].data;

                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totVCPN, '0,000') + '<b>';
                                        }
                                    }
                                ]
                            },
                            {
                                text: 'Cabin',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Business',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Pax', dataIndex: 'QTYPAX_J', width: 65,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#e8f9e8";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return  value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridFAmonth').getStore().getData().items[0].data;

                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totQTYPAX_J, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'USD', dataIndex: 'VCPN_J', width: 65,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#e8f9e8";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return  value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridFAmonth').getStore().getData().items[0].data;

                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totVCPN_J, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: '%', dataIndex: 'PerJ', width: 65,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#e8f9e8";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return  value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridFAmonth').getStore().getData().items[0].data;

                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totPer3, '0,000.00') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'Avg', dataIndex: 'AVG_J', width: 65,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#e8f9e8";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return  value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridFAmonth').getStore().getData().items[0].data;

                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totAVG_J, '0,000.00') + '<b>';
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Economy',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Pax', dataIndex: 'QTYPAX_Y', width: 95,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#deedfb";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return  value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridFAmonth').getStore().getData().items[0].data;

                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totQTYPAX_Y, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'USD', dataIndex: 'VCPN_Y', width: 95,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#deedfb";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return  value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridFAmonth').getStore().getData().items[0].data;

                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totVCPN_Y, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: '%', dataIndex: 'PerY', width: 75,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#deedfb";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return  value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridFAmonth').getStore().getData().items[0].data;

                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totPer4, '0,000.00') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'Avg', dataIndex: 'AVG_Y', width: 75,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#deedfb";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return  value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridFAmonth').getStore().getData().items[0].data;

                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totAVG_Y, '0,000.00') + '<b>';
                                                }
                                            }
                                        ]
                                    },
                                ]
                            },
                            {
                                text: 'Exceptions',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Not',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Reported', dataIndex: 'QTYVNR', width: 80,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return  value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridFAmonth').getStore().getData().items[0].data;

                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totQTYVNR, '0,000') + '<b>';
                                                }
                                            },
                                        ]
                                    },
                                    {
                                        text: 'Not',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Revenue', dataIndex: 'QTYNRE', width: 80,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return  value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridFAmonth').getStore().getData().items[0].data;

                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totQTYNRE, '0,000') + '<b>';
                                                }
                                            },
                                        ]
                                    },
                                    {
                                        text: '%', dataIndex: 'Per2', width: 80,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return  value;
                                        },
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridFAmonth').getStore().getData().items[0].data;

                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totPer2, '0,000.00') + '<b>';
                                        }
                                    }
                                ]
                            },
                            {text: '', dataIndex: 'strRuta', width: 20,
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    if (value === '1')
                                        return '<img src="resources/img/botones/check.png">';
                                    else
                                        return '<img src="resources/img/botones/restricted_folder_symbol_stop-16.png">';
                                }
                            },
                            {
                                text: 'Comment', dataIndex: 'strDescripcion3', width: 100,
                            },
                            {
                                text: 'BN Not Flown',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Pax', dataIndex: 'QBNPAX', width: 70,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        },
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridFAmonth').getStore().getData().items[0].data;

                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totQBNPAX, '0,000') + '<b>';
                                        }
                                    },
                                    {
                                        text: 'USD', dataIndex: 'AMTBN', width: 70,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return  value;
                                        },
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridFAmonth').getStore().getData().items[0].data;

                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totAMTBN, '0,000.00') + '<b>';
                                        }
                                    },
                                ]
                            },
                        ]
                    }
                },
                {
                    xtype: 'grid',
                    id: prototype.id + '-gridFAmonth2',
                    width: 967,
                    height: 400,
                    columnLines: true,
                    hidden: true,
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
                                text: 'Flight',
                                //                                                id: prototype.id + '-adgTitFecha',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Date', dataIndex: 'strFormatDate', width: 90,
                                        /*listeners: {
                                         click: 'GridDDTMtotalperMonth_colHandler'
                                         },*/
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "color:#057ECB;";
                                            value = '<b>' + value + '</b>';
                                            return '<a href="#screens-dashboard-01-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                        }
                                    }
                                ]
                            },
                            {text: 'Curr', dataIndex: 'strDescripcion4', width: 75},
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
                                        text: 'Pax', dataIndex: 'QTYPAX', width: 90,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#fcf9ec;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        },
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridFAmonth').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totQTYPAX, '0,000') + '<b>';
                                        }
                                    },
                                    {
                                        text: 'USD', dataIndex: 'VCPN', width: 100,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#fcf9ec;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        },
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridFAmonth').getStore().getData().items[0].data;

                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totVCPN, '0,000') + '<b>';
                                        }
                                    }
                                ]
                            },
                            {
                                text: 'Exceptions',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Not Reported',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'PAX', dataIndex: 'QTYVNR', width: 80,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "color:#057ECB;text-align:right;background-color:#d5f4d5;";
                                                    value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                    return '<a href="#screens-dashboard-01-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridFAmonth').getStore().getData().items[0].data;

                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totQTYVNR, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'USD', dataIndex: 'PerCAP', width: 80,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return  value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridFAmonth').getStore().getData().items[0].data;

                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totPerCAP, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: '%', dataIndex: 'Per1', width: 80,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return  value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridFAmonth').getStore().getData().items[0].data;

                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totPer1, '0,000.00') + '<b>';
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Not Revenue',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'PAX', dataIndex: 'QTYNRE', width: 80,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return  value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridFAmonth').getStore().getData().items[0].data;

                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totQTYNRE, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'USD', dataIndex: 'VCPNRE', width: 80,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return  value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridFAmonth').getStore().getData().items[0].data;

                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totVCPNRE, '0,000') + '<b>';
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: '%', dataIndex: 'Per2', width: 80,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return  value;
                                        },
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridFAmonth').getStore().getData().items[0].data;

                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totPer2, '0,000.00') + '<b>';
                                        }
                                    }
                                ]
                            },
                            {text: '', dataIndex: 'strRuta', width: 20,
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    if (value === '1')
                                        return '<img src="resources/img/botones/check.png">';
                                    else
                                        return '<img src="resources/img/botones/restricted_folder_symbol_stop-16.png">';
                                }
                            },
                            {
                                text: 'Comment', dataIndex: 'strDescripcion3', width: 100,
                            },
                        ]
                    }
                }
            ]
        },
        {
            xtype: 'panel',
            id: prototype.id + '-panelGridSearchWK',
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
                    xtype: 'grid',
                    id: prototype.id + '-gridSearchWK',
                    width: 1212,
                    height: 400,
                    columnLines: true,
                    hidden: false,
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
                                text: 'Flight',
                                //                                                id: prototype.id + '-adgTitFecha',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Date', dataIndex: 'strFormatDate', width: 90,
                                        /*listeners: {
                                         click: 'GridDDTMtotalperMonth_colHandler'
                                         },*/
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "color:#057ECB;";
                                            value = '<b>' + value + '</b>';
                                            return '<a href="#screens-dashboard-01-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                        }
                                    }
                                ]
                            },
                            {
                                text: 'Received',
                                //                                                id: prototype.id + '-adgTitFecha',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Coupons', dataIndex: 'QTYFlight', width: 90,
                                        /*listeners: {
                                         click: 'GridDDTMtotalperMonth_colHandler'
                                         },*/
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#deedfb;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        },
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridSearchWK').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totQTYFlight, '0,000') + '<b>';
                                        }
                                    }
                                ]
                            },
                            {
                                text: 'Valued',
                                //                                                id: prototype.id + '-adgTitFecha',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Qty', dataIndex: 'QTYPAX', width: 90,
                                        /*listeners: {
                                         click: 'GridDDTMtotalperMonth_colHandler'
                                         },*/
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#deedfb;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridSearchWK').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totQTYPAX, '0,000') + '<b>';
                                        }
                                    },
                                    {
                                        text: 'USD', dataIndex: 'VCPN', width: 90,
                                        /*listeners: {
                                         click: 'GridDDTMtotalperMonth_colHandler'
                                         },*/
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#deedfb;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridSearchWK').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totVCPN, '0,000') + '<b>';
                                        }
                                    },
                                ]
                            },
                            {
                                text: 'Accounted',
                                //                                                id: prototype.id + '-adgTitFecha',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Qty', dataIndex: 'QTYPAX_F', width: 90,
                                        /*listeners: {
                                         click: 'GridDDTMtotalperMonth_colHandler'
                                         },*/
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#9ccfbf;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridSearchWK').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totQTYPAX_F, '0,000') + '<b>';
                                        }
                                    },
                                    {
                                        text: 'USD', dataIndex: 'VCPN_F', width: 90,
                                        /*listeners: {
                                         click: 'GridDDTMtotalperMonth_colHandler'
                                         },*/
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#9ccfbf;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridSearchWK').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totVCPN_F, '0,000') + '<b>';
                                        }
                                    },
                                ]
                            },
                            {
                                text: 'Pending',
                                //                                                id: prototype.id + '-adgTitFecha',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Qty', dataIndex: 'QTYPAX_J', width: 90,
                                        /*listeners: {
                                         click: 'GridDDTMtotalperMonth_colHandler'
                                         },*/
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#deedfb;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridSearchWK').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totQTYPAX_J, '0,000') + '<b>';
                                        }
                                    },
                                    {
                                        text: 'USD', dataIndex: 'VCPN_J', width: 90,
                                        /*listeners: {
                                         click: 'GridDDTMtotalperMonth_colHandler'
                                         },*/
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#deedfb;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridSearchWK').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totVCPN_J, '0,000') + '<b>';
                                        }
                                    },
                                ]
                            },
                            {
                                text: 'Online',
                                //                                                id: prototype.id + '-adgTitFecha',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Qty', dataIndex: 'QCPNON', width: 90,
                                        /*listeners: {
                                         click: 'GridDDTMtotalperMonth_colHandler'
                                         },*/
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#04C5DA;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridSearchWK').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totQCPNON, '0,000') + '<b>';
                                        }
                                    },
                                    {
                                        text: 'USD', dataIndex: 'VCPNON', width: 90,
                                        /*listeners: {
                                         click: 'GridDDTMtotalperMonth_colHandler'
                                         },*/
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#04C5DA;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridSearchWK').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totVCPNON, '0,000') + '<b>';
                                        }
                                    },
                                ]
                            },
                            {
                                text: 'OAL',
                                //                                                id: prototype.id + '-adgTitFecha',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Qty', dataIndex: 'QCPNOAL', width: 90,
                                        /*listeners: {
                                         click: 'GridDDTMtotalperMonth_colHandler'
                                         },*/
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#4A9EF8;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridSearchWK').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totQCPNOAL, '0,000') + '<b>';
                                        }
                                    },
                                    {
                                        text: '%', dataIndex: 'Per1', width: 60,
                                        /*listeners: {
                                         click: 'GridDDTMtotalperMonth_colHandler'
                                         },*/
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#4A9EF8;";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return  value;
                                        }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridSearchWK').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totPer1, '0,000.00') + '<b>';
                                        }
                                    },
                                    {
                                        text: 'USD', dataIndex: 'VCPNOAL', width: 90,
                                        /*listeners: {
                                         click: 'GridDDTMtotalperMonth_colHandler'
                                         },*/
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#4A9EF8;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridSearchWK').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totVCPNOAL, '0,000') + '<b>';
                                        }
                                    },
                                    {
                                        text: '%', dataIndex: 'Per2', width: 60,
                                        /*listeners: {
                                         click: 'GridDDTMtotalperMonth_colHandler'
                                         },*/
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#4A9EF8;";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return  value;
                                        }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridSearchWK').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totPer2, '0,000.00') + '<b>';
                                        }
                                    },
                                ]
                            },
                        ]
                    }
                },  
                /*
                
                {
                    xtype: 'cartesian',
                    id: prototype.id + '-displayChart01',
                    width: '100%',
                    hidden: false,
                    border: false,
//                    height: 350,
                    background: '#E0F8F7',
                    captions: {
                        title: {
                            text: 'Total by Month\n\Tickets',
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
                            fields: ['QTYFlight', 'QTYPAX_F'],
                            grid: true,
                            title: '',
                            //title: 'Millions of USD',
                            renderer: function (obj, value) {
                                if (value > 1) {
                                    if ((value / 1000).toString().length > 3) {
                                        return  '$' + Ext.util.Format.number((value / 1000000), '0.0') + 'M';
                                    } else {
                                        return  '$' + Ext.util.Format.number((value / 1000), '0') + 'K';
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
                                text: 'State',
                                translationX: -30
                            }
                        }],
                    series: [{
                            type: 'bar3d',
                            stacked: false,
                            title: ['Received', 'Accounted'],
                            xField: 'strFormatDate',
                            yField: ['QTYFlight', 'QTYPAX_F'],
                            colors: ['#3333FF', '#ADFFAD'],
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
                                    if (ctx.field === 'QTYFlight') {
                                        label = 'Received';
                                    } else if (ctx.field === 'QTYPAX_F') {
                                        label = 'Accounted';
                                    }
                                    toolTip.setHtml(label + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + '</b>');
                                }
                            }
                        }]
                }
                
                */
                
            ]
        },
        
        // -------------------------------------
        {
            xtype: 'panel',
            id: prototype.id + '-boxFlownAnalysis',
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
                    xtype: 'grid',
                    id: prototype.id + '-gridFlownAnalysis',
                    width: 1290,
                    height: 553,
                    columnLines: true,
                    hidden: false,
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
                                text: 'Flight',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Number', dataIndex: 'NFLIGHT', width: 60,
                                        listeners: {
                                            click: 'viewDetail',
                                            args: ['FLIGHT']
                                        },
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "color:#057ECB;";
                                            value = '<b>' + value + '</b>';
                                            return '<a href="#screens-dashboard-01-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                        }
                                    }
                                ]
                            },
                            {
                                text: 'Qty',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Flight', dataIndex: 'QTYFlight', width: 60,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right";
                                            value = '<b>' + value + '</b>';
                                            return value;
                                        },
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridFlownAnalysis').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totQTYFlight, '0,000') + '<b>';
                                        }
                                    }
                                ]
                            },
                            {
                                text: 'Route',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'Flight', dataIndex: 'CDEPART', width: 70},
                                    {text: 'Flight', dataIndex: 'CDEPART', width: 70}
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
                                        text: 'Pax', dataIndex: 'QTYPAX', width: 90,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#fcf9ec;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        },
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridFlownAnalysis').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totQTYPAX, '0,000') + '<b>';
                                        }
                                    },
                                    {
                                        text: 'USD', dataIndex: 'VCPN', width: 100,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#fcf9ec;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        },
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridFlownAnalysis').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totVCPN, '0,000') + '<b>';
                                        }
                                    }
                                ]
                            },
                            {
                                text: 'Cabin',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Business',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Pax', dataIndex: 'QTYPAX_J', width: 65,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#e8f9e8";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return  value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridFlownAnalysis').getStore().getData().items[0].data;

                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totQTYPAX_J, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'USD', dataIndex: 'VCPN_J', width: 65,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#e8f9e8";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return  value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridFlownAnalysis').getStore().getData().items[0].data;

                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totVCPN_J, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'Avg', dataIndex: 'AVG_J', width: 65,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#e8f9e8";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return  value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridFlownAnalysis').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '';
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Economy',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Pax', dataIndex: 'QTYPAX_Y', width: 95,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#deedfb";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return  value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridFlownAnalysis').getStore().getData().items[0].data;

                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totQTYPAX_Y, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'USD', dataIndex: 'VCPN_Y', width: 95,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#deedfb";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return  value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridFlownAnalysis').getStore().getData().items[0].data;

                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totVCPN_Y, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'Avg', dataIndex: 'AVG_Y', width: 75,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#deedfb";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return  value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridFlownAnalysis').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '';
                                                }
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                text: 'Exceptions',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Not',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Reported', dataIndex: 'QTYVNR', width: 80,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return  value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridFlownAnalysis').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totQTYVNR, '0,000') + '<b>';
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Not Revenue',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Pax', dataIndex: 'QTYNRE', width: 80,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return  value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridFlownAnalysis').getStore().getData().items[0].data;

                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totQTYNRE, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'USD', dataIndex: 'VCPNRE', width: 80,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return  value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridFlownAnalysis').getStore().getData().items[0].data;

                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totVCPNRE, '0,000') + '<b>';
                                                }
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                text: 'BN Not Flown',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Pax', dataIndex: 'QBNPAX', width: 70,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#fcf9ec;";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        },
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridFlownAnalysis').getStore().getData().items[0].data;

                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totQBNPAX, '0,000') + '<b>';
                                        }
                                    },
                                    {
                                        text: 'USD', dataIndex: 'AMTBN', width: 70,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#fcf9ec;";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return  value;
                                        },
                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridFlownAnalysis').getStore().getData().items[0].data;

                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.totAMTBN, '0,000.00') + '<b>';
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