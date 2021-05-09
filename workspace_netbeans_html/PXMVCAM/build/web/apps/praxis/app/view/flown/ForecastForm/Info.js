valor = '0';
Ext.define('Ext.Praxis.view.flown.ForecastForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                width: 1620,
                height: 'auto',
                align: 'center'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelMain',
                    bodyStyle: 'background-color: #E3EAEF;',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridData',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            width: 784,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataMain',
                                    width: 784,
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
                                            {
                                                text: 'Period',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Contab.', dataIndex: 'FCONT', width: 100
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Date',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Flight', dataIndex: 'DFLIGHT', width: 100
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'PAX',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'ML', dataIndex: 'QTYPAX', width: 90,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQTYPAX, '0,000') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Amount',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Revenue USD', dataIndex: 'VCPNUSD', width: 120,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totVCPNUSD, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Average',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Revenue USD', dataIndex: 'VPROUSD', width: 120,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totVPROUSD, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Amount',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Revenue MXN', dataIndex: 'VCPNMXN', width: 120,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totVCPNMXN, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Average',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Revenue MXN', dataIndex: 'VPROMXN', width: 120,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totVPROMXN, '0,000.00') + '<b>';
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
                            id: prototype.id + '-panelGridDataItinerary',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            width: 884,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataItinerary',
                                    height: 600,
                                    width: 884,
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
                                                text: 'Flight',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Date', dataIndex: 'DFLIGHT', width: 100}
                                                ]
                                            },
                                            {
                                                text: 'ASI', dataIndex: 'ASI', width: 70,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataItinerary').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totASI, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'CAM', dataIndex: 'CAM', width: 70,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataItinerary').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totCAM, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'CAN', dataIndex: 'CAN', width: 70,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataItinerary').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totCAN, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'CAR', dataIndex: 'CAR', width: 70,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataItinerary').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totCAR, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'EUR', dataIndex: 'EUR', width: 70,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataItinerary').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totEUR, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'FRO', dataIndex: 'FRO', width: 70,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataItinerary').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totFRO, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'LOC', dataIndex: 'LOC', width: 70,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataItinerary').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totLOC, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'PLA', dataIndex: 'PLA', width: 70,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataItinerary').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totPLA, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'SUD', dataIndex: 'SUD', width: 70,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataItinerary').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totSUD, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'USA', dataIndex: 'USA', width: 70,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataItinerary').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totUSA, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'TOTAL', dataIndex: 'totZonas', width: 70,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return value;
                                                },
                                            },
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataForecast',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            width: 889,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataForecast',
                                    width: 889,
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
                                            /*{
                                             text: 'Date',
                                             defaults: {
                                             menuDisabled: true,
                                             sortable: false,
                                             align: 'center'
                                             },
                                             columns: [
                                             {
                                             text: 'Cont', dataIndex: 'FCONT', width: 100
                                             }
                                             ]
                                             },*/
                                            {text: '', dataIndex: 'strImagen1', width: 20,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return '<img src=' + '"' + record.data.strImagen1 + '"' + '>';
                                                }
                                            },
                                            {
                                                text: 'Date',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Flight', dataIndex: 'DFLIGHT', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'PAX',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'ML', dataIndex: 'QTYPAX', width: 90,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataForecast').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQTYPAX, '0,000') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Amount',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Revenue USD', dataIndex: 'VCPNUSD', width: 120,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataForecast').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totVCPNUSD, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Average',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Revenue USD', dataIndex: 'VPROUSD', width: 120,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataForecast').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totVPROUSD, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Amount',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Revenue MXN', dataIndex: 'VCPNMXN', width: 120,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataForecast').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totVCPNMXN, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Average',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Revenue MXN', dataIndex: 'VPROMXN', width: 120,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataForecast').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totVPROMXN, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Seq',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Week Day', dataIndex: 'DWEEK', width: 70, },
                                                ]
                                            },
                                            {text: '', dataIndex: 'strImagen2', width: 20,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return '<img src=' + '"' + record.data.strImagen2 + '"' + '>';
                                                }
                                            },
                                            {
                                                text: '%Var vs',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Average Fare', dataIndex: 'AVRG_VCPMXN_PORCENTAJE', width: 95,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background:";
                                                            //value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }},
                                                ]
                                            },
                                        ]
                                    }
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataForecastPercentage',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            width: 984,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                /*{
                                 xtype: 'panel',
                                 width: 150,
                                 height: 50,
                                 border: false,
                                 margin: '5 0 5 0',
                                 layout: {
                                 type: 'vbox',
                                 pack: 'center'
                                 },
                                 bodyStyle: 'background-color: transparent;',
                                 items: [
                                 {
                                 xtype: 'radiogroup',
                                 id: prototype.id + '-radiogroupForecast',
                                 fieldLabel: '',
                                 height: 50,
                                 columns: 1,
                                 vertical: true,
                                 items: [
                                 {boxLabel: '<b style="color:#148D28;">Forecast Percentage</b>', inputValue: 'FP', name: 'rbgTypeForecast', width: 150},
                                 {boxLabel: '<b style="color:#148D28;">Forecast Zones</b>', inputValue: 'FZ', name: 'rbgTypeForecast', width: 150},
                                 ],
                                 listeners: {
                                 change: 'onChangeRadioForecast'
                                 }
                                 }
                                 ]
                                 },*/
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataForecastPercentage',
                                    height: 600,
                                    width: 984,
                                    columnLines: true,
                                    /*features: [{
                                     ftype: 'summary',
                                     dock: 'bottom'
                                     }],*/
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Day',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Week', dataIndex: 'DWEEK', width: 100}
                                                ]
                                            },
                                            {
                                                text: 'Flight',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Date', dataIndex: 'DFLIGHT', width: 100}
                                                ]
                                            },
                                            {
                                                text: 'ASI', dataIndex: 'percentageASI', width: 70,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00 %');
                                                    return value;
                                                },
                                                /*summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                 var data = Ext.getCmp(prototype.id + '-gridDataItinerary').getStore().getData().items[0].data;
                                                 metaData.style = 'text-align:right; margin-right:3px ';
                                                 return '<b>' + Ext.util.Format.number(data.totASI, '0,000') + '<b>';
                                                 }*/
                                            },
                                            {
                                                text: 'CAM', dataIndex: 'percentageCAM', width: 70,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00 %');
                                                    return value;
                                                },
                                                /*summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                 var data = Ext.getCmp(prototype.id + '-gridDataItinerary').getStore().getData().items[0].data;
                                                 metaData.style = 'text-align:right; margin-right:3px ';
                                                 return '<b>' + Ext.util.Format.number(data.totCAM, '0,000') + '<b>';
                                                 }*/
                                            },
                                            {
                                                text: 'CAN', dataIndex: 'percentageCAN', width: 70,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00 %');
                                                    return value;
                                                },
                                                /*summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                 var data = Ext.getCmp(prototype.id + '-gridDataItinerary').getStore().getData().items[0].data;
                                                 metaData.style = 'text-align:right; margin-right:3px ';
                                                 return '<b>' + Ext.util.Format.number(data.totCAN, '0,000') + '<b>';
                                                 }*/
                                            },
                                            {
                                                text: 'CAR', dataIndex: 'percentageCAR', width: 70,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00 %');
                                                    return value;
                                                },
                                                /*summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                 var data = Ext.getCmp(prototype.id + '-gridDataItinerary').getStore().getData().items[0].data;
                                                 metaData.style = 'text-align:right; margin-right:3px ';
                                                 return '<b>' + Ext.util.Format.number(data.totCAR, '0,000') + '<b>';
                                                 }*/
                                            },
                                            {
                                                text: 'EUR', dataIndex: 'percentageEUR', width: 70,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00 %');
                                                    return value;
                                                },
                                                /*summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                 var data = Ext.getCmp(prototype.id + '-gridDataItinerary').getStore().getData().items[0].data;
                                                 metaData.style = 'text-align:right; margin-right:3px ';
                                                 return '<b>' + Ext.util.Format.number(data.totEUR, '0,000') + '<b>';
                                                 }*/
                                            },
                                            {
                                                text: 'FRO', dataIndex: 'percentageFRO', width: 70,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00 %');
                                                    return value;
                                                },
                                                /*summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                 var data = Ext.getCmp(prototype.id + '-gridDataItinerary').getStore().getData().items[0].data;
                                                 metaData.style = 'text-align:right; margin-right:3px ';
                                                 return '<b>' + Ext.util.Format.number(data.totFRO, '0,000') + '<b>';
                                                 }*/
                                            },
                                            {
                                                text: 'LOC', dataIndex: 'percentageLOC', width: 70,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00 %');
                                                    return value;
                                                },
                                                /*summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                 var data = Ext.getCmp(prototype.id + '-gridDataItinerary').getStore().getData().items[0].data;
                                                 metaData.style = 'text-align:right; margin-right:3px ';
                                                 return '<b>' + Ext.util.Format.number(data.totLOC, '0,000') + '<b>';
                                                 }*/
                                            },
                                            {
                                                text: 'PLA', dataIndex: 'percentagePLA', width: 70,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00 %');
                                                    return value;
                                                },
                                                /*summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                 var data = Ext.getCmp(prototype.id + '-gridDataItinerary').getStore().getData().items[0].data;
                                                 metaData.style = 'text-align:right; margin-right:3px ';
                                                 return '<b>' + Ext.util.Format.number(data.totPLA, '0,000') + '<b>';
                                                 }*/
                                            },
                                            {
                                                text: 'SUD', dataIndex: 'percentageSUD', width: 70,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00 %');
                                                    return value;
                                                },
                                                /*summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                 var data = Ext.getCmp(prototype.id + '-gridDataItinerary').getStore().getData().items[0].data;
                                                 metaData.style = 'text-align:right; margin-right:3px ';
                                                 return '<b>' + Ext.util.Format.number(data.totSUD, '0,000') + '<b>';
                                                 }*/
                                            },
                                            {
                                                text: 'USA', dataIndex: 'percentageUSA', width: 70,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00 %');
                                                    return value;
                                                },
                                                /*summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                 var data = Ext.getCmp(prototype.id + '-gridDataItinerary').getStore().getData().items[0].data;
                                                 metaData.style = 'text-align:right; margin-right:3px ';
                                                 return '<b>' + Ext.util.Format.number(data.totUSA, '0,000') + '<b>';
                                                 }*/
                                            },
                                            {
                                                text: 'TOTAL', dataIndex: 'totalRegistros', width: 70,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00 %');
                                                    return value;
                                                },
                                            },
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataForecastZones',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            width: 1094,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataForecastZones',
                                    width: 1094,
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
                                            {text: '', dataIndex: '', width: 20,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return '<img src=' + '"' + record.data.strImagen1 + '"' + '>';
                                                }
                                            },
                                            {
                                                text: 'Seq',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Week Day', dataIndex: 'DWEEK', width: 70}
                                                ]
                                            },
                                            {
                                                text: 'Flight',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Date', dataIndex: 'DFLIGHT', width: 80}
                                                ]
                                            },
                                            //ASI
                                            {
                                                text: 'ASI',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'PAX', dataIndex: 'PAXASI', width: 60,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTPAXASI, '0,000') + '<b>';
                                                        }},
                                                    {text: 'AVG USD', dataIndex: 'VPROUSDASI', width: 80,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTVPROUSDASI, '0,000.00') + '<b>';
                                                        }},
                                                    {text: 'AMOUNT USD', dataIndex: 'VCPNUSDASI', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTVCPNUSDASI, '0,000.00') + '<b>';
                                                        }},
                                                    {text: 'AMOUNT MXN', dataIndex: 'VCPNMXNASI', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTVCPNMXNASI, '0,000.00') + '<b>';
                                                        }},
                                                ]
                                            },
                                            {text: '', dataIndex: '', width: 20,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return '<img src=' + '"' + record.data.strImagen_ASI + '"' + '>';
                                                }
                                            },
                                            {
                                                text: '%Var vs',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Average Fare', dataIndex: 'AVRG_VCPNMXN_ASI', width: 95,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000.00 %');
                                                            return value;
                                                        }}
                                                ]
                                            },
                                            //CAM
                                            {
                                                text: 'CAM',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'PAX', dataIndex: 'PAXCAM', width: 60,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTPAXCAM, '0,000') + '<b>';
                                                        }},
                                                    {text: 'AVG USD', dataIndex: 'VPROUSDCAM', width: 80,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTVPROUSDCAM, '0,000.00') + '<b>';
                                                        }},
                                                    {text: 'AMOUNT USD', dataIndex: 'VCPNUSDCAM', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTVCPNUSDCAM, '0,000.00') + '<b>';
                                                        }},
                                                    {text: 'AMOUNT MXN', dataIndex: 'VCPNMXNCAM', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTVCPNMXNCAM, '0,000.00') + '<b>';
                                                        }},
                                                ]
                                            },
                                            {text: '', dataIndex: '', width: 20,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return '<img src=' + '"' + record.data.strImagen_CAM + '"' + '>';
                                                }
                                            },
                                            {
                                                text: '%Var vs',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Average Fare', dataIndex: 'AVRG_VCPNMXN_CAM', width: 95,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000.00 %');
                                                            return value;
                                                        }}
                                                ]
                                            },
                                            //CAN
                                            {
                                                text: 'CAN',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'PAX', dataIndex: 'PAXCAN', width: 60,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTPAXCAN, '0,000') + '<b>';
                                                        }},
                                                    {text: 'AVG USD', dataIndex: 'VPROUSDCAN', width: 80,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTVPROUSDCAN, '0,000.00') + '<b>';
                                                        }},
                                                    {text: 'AMOUNT USD', dataIndex: 'VCPNUSDCAN', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTVCPNUSDCAN, '0,000.00') + '<b>';
                                                        }},
                                                    {text: 'AMOUNT MXN', dataIndex: 'VCPNMXNCAN', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTVCPNMXNCAN, '0,000.00') + '<b>';
                                                        }},
                                                ]
                                            },
                                            {text: '', dataIndex: '', width: 20,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return '<img src=' + '"' + record.data.strImagen_CAN + '"' + '>';
                                                }
                                            },
                                            {
                                                text: '%Var vs',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Average Fare', dataIndex: 'AVRG_VCPNMXN_CAN', width: 95,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000.00 %');
                                                            return value;
                                                        }}
                                                ]
                                            },
                                            //CAR
                                            {
                                                text: 'CAR',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'PAX', dataIndex: 'PAXCAR', width: 60,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTPAXCAR, '0,000') + '<b>';
                                                        }},
                                                    {text: 'AVG USD', dataIndex: 'VPROUSDCAR', width: 80,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTVPROUSDCAR, '0,000.00') + '<b>';
                                                        }},
                                                    {text: 'AMOUNT USD', dataIndex: 'VCPNUSDCAR', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTVCPNUSDCAR, '0,000.00') + '<b>';
                                                        }},
                                                    {text: 'AMOUNT MXN', dataIndex: 'VCPNMXNCAR', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTVCPNMXNCAR, '0,000.00') + '<b>';
                                                        }},
                                                ]
                                            },
                                            {text: '', dataIndex: '', width: 20,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return '<img src=' + '"' + record.data.strImagen_CAR + '"' + '>';
                                                }
                                            },
                                            {
                                                text: '%Var vs',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Average Fare', dataIndex: 'AVRG_VCPNMXN_CAR', width: 95,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000.00 %');
                                                            return value;
                                                        }}
                                                ]
                                            },
                                            //EUR
                                            {
                                                text: 'EUR',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'PAX', dataIndex: 'PAXEUR', width: 60,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTPAXEUR, '0,000') + '<b>';
                                                        }},
                                                    {text: 'AVG USD', dataIndex: 'VPROUSDEUR', width: 80,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTVPROUSDEUR, '0,000.00') + '<b>';
                                                        }},
                                                    {text: 'AMOUNT USD', dataIndex: 'VCPNUSDEUR', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTVCPNUSDEUR, '0,000.00') + '<b>';
                                                        }},
                                                    {text: 'AMOUNT MXN', dataIndex: 'VCPNMXNEUR', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTVCPNMXNEUR, '0,000.00') + '<b>';
                                                        }},
                                                ]
                                            },
                                            {text: '', dataIndex: '', width: 20,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return '<img src=' + '"' + record.data.strImagen_EUR + '"' + '>';
                                                }
                                            },
                                            {
                                                text: '%Var vs',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Average Fare', dataIndex: 'AVRG_VCPNMXN_EUR', width: 95,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000.00 %');
                                                            return value;
                                                        }}
                                                ]
                                            },
                                            //FRO
                                            {
                                                text: 'FRO',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'PAX', dataIndex: 'PAXFRO', width: 60,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTPAXFRO, '0,000') + '<b>';
                                                        }},
                                                    {text: 'AVG USD', dataIndex: 'VPROUSDFRO', width: 80,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTVPROUSDFRO, '0,000.00') + '<b>';
                                                        }},
                                                    {text: 'AMOUNT USD', dataIndex: 'VCPNUSDFRO', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTVCPNUSDFRO, '0,000.00') + '<b>';
                                                        }},
                                                    {text: 'AMOUNT MXN', dataIndex: 'VCPNMXNFRO', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTVCPNMXNFRO, '0,000.00') + '<b>';
                                                        }},
                                                ]
                                            },
                                            {text: '', dataIndex: '', width: 20,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return '<img src=' + '"' + record.data.strImagen_FRO + '"' + '>';
                                                }
                                            },
                                            {
                                                text: '%Var vs',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Average Fare', dataIndex: 'AVRG_VCPNMXN_FRO', width: 95,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000.00 %');
                                                            return value;
                                                        }}
                                                ]
                                            },
                                            //LOC
                                            {
                                                text: 'LOC',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'PAX', dataIndex: 'PAXLOC', width: 60,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTPAXLOC, '0,000') + '<b>';
                                                        }},
                                                    {text: 'AVG USD', dataIndex: 'VPROUSDLOC', width: 80,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTVPROUSDLOC, '0,000.00') + '<b>';
                                                        }},
                                                    {text: 'AMOUNT USD', dataIndex: 'VCPNUSDLOC', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTVCPNUSDLOC, '0,000.00') + '<b>';
                                                        }},
                                                    {text: 'AMOUNT MXN', dataIndex: 'VCPNMXNLOC', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTVCPNMXNLOC, '0,000.00') + '<b>';
                                                        }},
                                                ]
                                            },
                                            {text: '', dataIndex: '', width: 20,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return '<img src=' + '"' + record.data.strImagen_LOC + '"' + '>';
                                                }
                                            },
                                            {
                                                text: '%Var vs',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Average Fare', dataIndex: 'AVRG_VCPNMXN_LOC', width: 95,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000.00 %');
                                                            return value;
                                                        }}
                                                ]
                                            },
                                            //PLA
                                            {
                                                text: 'PLA',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'PAX', dataIndex: 'PAXPLA', width: 60,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTPAXPLA, '0,000') + '<b>';
                                                        }},
                                                    {text: 'AVG USD', dataIndex: 'VPROUSDPLA', width: 80,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTVPROUSDPLA, '0,000.00') + '<b>';
                                                        }},
                                                    {text: 'AMOUNT USD', dataIndex: 'VCPNUSDPLA', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTVCPNUSDPLA, '0,000.00') + '<b>';
                                                        }},
                                                    {text: 'AMOUNT MXN', dataIndex: 'VCPNMXNPLA', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTVCPNMXNPLA, '0,000.00') + '<b>';
                                                        }},
                                                ]
                                            },
                                            {text: '', dataIndex: '', width: 20,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return '<img src=' + '"' + record.data.strImagen_PLA + '"' + '>';
                                                }
                                            },
                                            {
                                                text: '%Var vs',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Average Fare', dataIndex: 'AVRG_VCPNMXN_PLA', width: 95,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000.00 %');
                                                            return value;
                                                        }}
                                                ]
                                            },
                                            //SUD
                                            {
                                                text: 'SUD',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'PAX', dataIndex: 'PAXSUD', width: 60,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTPAXSUD, '0,000') + '<b>';
                                                        }},
                                                    {text: 'AVG USD', dataIndex: 'VPROUSDSUD', width: 80,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTVPROUSDSUD, '0,000.00') + '<b>';
                                                        }},
                                                    {text: 'AMOUNT USD', dataIndex: 'VCPNUSDSUD', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTVCPNUSDSUD, '0,000.00') + '<b>';
                                                        }},
                                                    {text: 'AMOUNT MXN', dataIndex: 'VCPNMXNSUD', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTVCPNMXNSUD, '0,000.00') + '<b>';
                                                        }},
                                                ]
                                            },
                                            {text: '', dataIndex: '', width: 20,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return '<img src=' + '"' + record.data.strImagen_SUD + '"' + '>';
                                                }
                                            },
                                            {
                                                text: '%Var vs',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Average Fare', dataIndex: 'AVRG_VCPNMXN_SUD', width: 95,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        }}
                                                ]
                                            },
                                            //USA
                                            {
                                                text: 'USA',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'PAX', dataIndex: 'PAXUSA', width: 60,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTPAXUSA, '0,000') + '<b>';
                                                        }},
                                                    {text: 'AVG USD', dataIndex: 'VPROUSDUSA', width: 80,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTVPROUSDUSA, '0,000.00') + '<b>';
                                                        }},
                                                    {text: 'AMOUNT USD', dataIndex: 'VCPNUSDUSA', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTVCPNUSDUSA, '0,000.00') + '<b>';
                                                        }},
                                                    {text: 'AMOUNT MXN', dataIndex: 'VCPNMXNUSA', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }, summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataForecastZones').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOTVCPNMXNUSA, '0,000.00') + '<b>';
                                                        }},
                                                ]
                                            },
                                            {text: '', dataIndex: '', width: 20,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return '<img src=' + '"' + record.data.strImagen_USA + '"' + '>';
                                                }
                                            },
                                            {
                                                text: '%Var vs',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Average Fare', dataIndex: 'AVRG_VCPNMXN_USA', width: 95,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background:";
                                                            value = Ext.util.Format.number(value, '0,000.00 %');
                                                            return value;
                                                        }}
                                                ]
                                            },
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataAmountByZones',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            width: 859,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'hbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'cartesian',
                                    id: prototype.id + '-displaySAChart01',
                                    width: 641,
                                    border: false,
                                    height: 340,
                                    background: '#E0F8F7',
                                    captions: {
                                        title: {
                                            text: 'Revenue by Region',
                                            alignTo: 'chart'
                                        }
                                    },
                                    animation: {
                                        duration: 200
                                    },
                                    interactions: ['itemhighlight'],
                                    axes: [{
                                            type: 'numeric3d',
                                            position: 'left',
                                            fields: ['VCPNMXN'],
                                            grid: true,
                                            title: 'Millions of PESOS',
                                            renderer: function(obj, value) {
                                                /*if (value > 1) {
                                                 if ((value / 1000).toString().length > 3) {
                                                 return ' ' + Ext.util.Format.number((value / 1000000), '0.0') + 'M';
                                                 } else {
                                                 return ' ' + Ext.util.Format.number((value / 1000), '0') + 'K';
                                                 }
                                                 } else {
                                                 return '';
                                                 }*/
                                                return ' ' + Ext.util.Format.number((value), '0.00') + 'M';
                                            }
                                        }, {
                                            type: 'category3d',
                                            position: 'bottom',
                                            grid: true,
                                            title: {
                                                translationX: -30
                                            }
                                        }],
                                    series: [{
                                            type: 'bar3d',
                                            stacked: false,
                                            xField: 'ZONA',
                                            yField: ['VCPNMXN'],
                                            colors: ['#CC0000', '#DBA901', '#70DB70', '#FF9966'],
                                            highlight: true,
                                            style: {
                                                inGroupGapWidth: -7,
                                                minGapWidth: 2,
                                                maxBarWidth: 1200
                                            },
                                            tooltip: {
                                                trackMouse: true,
                                                height: 28,
                                                renderer: function(toolTip, record, ctx) {
                                                    toolTip.setHtml(record.get('ZONA') + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + '</b>');
                                                }
                                            },
                                            renderer: 'onColumnRender'
                                        },
                                        /*{
                                            type: 'line',
                                            //stacked: false,
                                            xField: 'ZONA',
                                            yField: ['VCPNMXN'],
                                            style: {
                                                'stroke-width': 4
                                            },
                                            markerConfig: {
                                                radius: 4
                                            },
                                            highlight: {
                                                fill: '#000',
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
                                                renderer: function(toolTip, record, ctx) {
                                                    toolTip.setHtml(record.get('ZONA') + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + '</b>');
                                                }
                                            },
                                            renderer: 'onColumnRender'
                                        }*/
                                    ]
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataAmountByZones',
                                    //height: 600,
                                    width: 189,
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
                                                text: 'Region', dataIndex: 'ZONA', width: 80,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    //value = Ext.util.Format.number(value, '0,000');
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'AMOUNT MXN', dataIndex: 'VCPNMXN', width: 95,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataAmountByZones').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totVCPNMXN, '0,000.00') + '<b>';
                                                }
                                            },
                                        ]
                                    }
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxDetTran',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 530,
                            width: 1590,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetTran',
                                    width: 1589,
                                    height: 485,
                                    columnLines: true,
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
                                            {text: '', dataIndex: 'RN', width: 50},
                                            {text: 'Description', dataIndex: 'strDescripcion', width: 100,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    (data.strDescripcion === 'Difference') ? metaData.style = "text-align:center;font-weight: bold;color:#008000"
                                                            : metaData.style = "text-align:center;font-weight: normal;color:#244066";
                                                    metaData.tdAttr = 'data-qtip="' + data.DATEF + '"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Merchant',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Number', dataIndex: 'MERCHN', width: 100,
                                                        listeners: {
                                                            click: 'onGridDetCard'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#flown-bank-reconci-commis-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Bank',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Code', dataIndex: 'CODEBANK', width: 50,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            (data.strDescripcion === 'Difference') ? metaData.style = "text-align:center;font-weight: bold;color:#008000"
                                                                    : metaData.style = "text-align:center;font-weight: normal;color:#244066";
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescBank + '"';
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Currency', dataIndex: 'SCURRENCY', width: 50,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    (record.data.strDescripcion === 'Difference') ? metaData.style = "text-align:center;font-weight: bold;color:#008000"
                                                            : metaData.style = "text-align:center;font-weight: normal;color:#244066";
                                                    return value;
                                                }
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
                                                        text: 'Tran.', dataIndex: 'QTYTRAN', width: 75, //flex: 1
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            (record.data.strDescripcion === 'Difference') ? metaData.style = "text-align:right;font-weight: bold;color:#008000;background-color:#d5f4d5"
                                                                    : metaData.style = "text-align:right;font-weight: normal;color:#244066;background-color:#d5f4d5";
                                                            return value;
                                                        }
//                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridDetTran').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right; margin-right:3px ';
//                                                            return '<b>' + Ext.util.Format.number(data.totQTYTRAN, '0,000') + '<b>';
//                                                        }
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
                                                        text: 'Amount', dataIndex: 'SVFOP', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            (record.data.strDescripcion === 'Difference') ? metaData.style = "text-align:right;font-weight: bold;color:#008000;background-color:#d5f4d5"
                                                                    : metaData.style = "text-align:right;font-weight: normal;color:#244066;background-color:#d5f4d5";
                                                            return value;
                                                        }
//                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridDetTran').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right; margin-right:3px ';
//                                                            return '<b>' + Ext.util.Format.number(data.totSVFOP, '0,000') + '<b>';
//                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'National Credit Amount',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Base', dataIndex: 'MONBTCRE1', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            (record.data.strDescripcion === 'Difference') ? metaData.style = "text-align:right;font-weight: bold;color:#008000;background-color:#ddebf7"
                                                                    : metaData.style = "text-align:right;font-weight: normal;color:#244066;background-color:#ddebf7";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        }
//                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridDetTran').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right; margin-right:3px ';
//                                                            return '<b>' + Ext.util.Format.number(data.totMONBTCRE1, '0,000') + '<b>';
//                                                        }
                                                    },
                                                    {
                                                        text: 'Rate', dataIndex: 'RATCNAC1', width: 50,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            (record.data.strDescripcion === 'Difference') ? metaData.style = "text-align:right;font-weight: bold;color:#008000;background-color:#ddebf7"
                                                                    : metaData.style = "text-align:right;font-weight: normal;color:#244066;background-color:#ddebf7";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Commission', dataIndex: 'COMITCRE1', width: 100, //flex: 1
                                                        listeners: {
                                                            click: 'onGridDetCard'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:right;background-color:#ddebf7";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                            return '<a href="#flown-bank-reconci-commis-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
//                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridDetTran').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right; margin-right:3px ';
//                                                            return '<b>' + Ext.util.Format.number(data.totCOMITCRE1, '0,000.00') + '<b>';
//                                                        }
                                                    },
                                                    {
                                                        text: 'IVA', dataIndex: 'IVACRE1', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            (record.data.strDescripcion === 'Difference') ? metaData.style = "text-align:right;font-weight: bold;color:#008000;background-color:#ddebf7"
                                                                    : metaData.style = "text-align:right;font-weight: normal;color:#244066;background-color:#ddebf7";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
//                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridDetTran').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right; margin-right:3px ';
//                                                            return '<b>' + Ext.util.Format.number(data.totIVACRE1, '0,000.00') + '<b>';
//                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'National Debit Amount',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Base', dataIndex: 'MONBTDEB1', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            (record.data.strDescripcion === 'Difference') ? metaData.style = "text-align:right;font-weight: bold;color:#008000;"
                                                                    : metaData.style = "text-align:right;font-weight: normal;color:#244066;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        }
//                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridDetTran').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right; margin-right:3px ';
//                                                            return '<b>' + Ext.util.Format.number(data.totMONBTDEB1, '0,000') + '<b>';
//                                                        }
                                                    },
                                                    {
                                                        text: 'Rate', dataIndex: 'RATDNAC1', width: 50,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            (record.data.strDescripcion === 'Difference') ? metaData.style = "text-align:right;font-weight: bold;color:#008000;"
                                                                    : metaData.style = "text-align:right;font-weight: normal;color:#244066;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Commission', dataIndex: 'COMITDEB1', width: 100, //flex: 1
                                                        listeners: {
                                                            click: 'onGridDetCard'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:right;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                            return '<a href="#flown-bank-reconci-commis-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
//                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridDetTran').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right; margin-right:3px ';
//                                                            return '<b>' + Ext.util.Format.number(data.totCOMITDEB1, '0,000.00') + '<b>';
//                                                        }
                                                    },
                                                    {
                                                        text: 'IVA', dataIndex: 'IVADEB1', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            (record.data.strDescripcion === 'Difference') ? metaData.style = "text-align:right;font-weight: bold;color:#008000;"
                                                                    : metaData.style = "text-align:right;font-weight: normal;color:#244066;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
//                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridDetTran').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right; margin-right:3px ';
//                                                            return '<b>' + Ext.util.Format.number(data.totIVADEB1, '0,000.00') + '<b>';
//                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Foreign Card Amount',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Base', dataIndex: 'MONBTEXT1', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            (record.data.strDescripcion === 'Difference') ? metaData.style = "text-align:right;font-weight: bold;color:#008000;background-color:#ddebf7"
                                                                    : metaData.style = "text-align:right;font-weight: normal;color:#244066;background-color:#ddebf7";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        }
//                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridDetTran').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right; margin-right:3px ';
//                                                            return '<b>' + Ext.util.Format.number(data.totMONBTEXT1, '0,000') + '<b>';
//                                                        }
                                                    },
                                                    {
                                                        text: 'Rate', dataIndex: 'RATCEXT1', width: 50,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            (record.data.strDescripcion === 'Difference') ? metaData.style = "text-align:right;font-weight: bold;color:#008000;background-color:#ddebf7"
                                                                    : metaData.style = "text-align:right;font-weight: normal;color:#244066;background-color:#ddebf7";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Commission', dataIndex: 'COMITEXT1', width: 100, //flex: 1
                                                        listeners: {
                                                            click: 'onGridDetCard'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:right;background-color:#ddebf7";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                            return '<a href="#flown-bank-reconci-commis-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
//                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridDetTran').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right; margin-right:3px ';
//                                                            return '<b>' + Ext.util.Format.number(data.totCOMITEXT1, '0,000.00') + '<b>';
//                                                        }
                                                    },
                                                    {
                                                        text: 'IVA', dataIndex: 'IVAEXT1', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            (record.data.strDescripcion === 'Difference') ? metaData.style = "text-align:right;font-weight: bold;color:#008000;background-color:#ddebf7"
                                                                    : metaData.style = "text-align:right;font-weight: normal;color:#244066;background-color:#ddebf7";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
//                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridDetTran').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right; margin-right:3px ';
//                                                            return '<b>' + Ext.util.Format.number(data.totIVAEXT1, '0,000.00') + '<b>';
//                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelDataSummary3',
                                    width: 1589,
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
                                        {width: 50},
                                        {width: 100},
                                        {width: 200},
                                        {width: 75, id: prototype.id + '-lblTotT_QTYTRAN'},
                                        {width: 100, id: prototype.id + '-lblTotT_SVFOP'},
                                        {width: 100, id: prototype.id + '-lblTotT_MONBTCRE1'},
                                        {width: 50, id: prototype.id + '-lblTotT_RATCNAC1'},
                                        {width: 100, id: prototype.id + '-lblTotT_COMITCRE1'},
                                        {width: 100, id: prototype.id + '-lblTotT_IVACRE1'},
                                        {width: 100, id: prototype.id + '-lblTotT_MONBTDEB1'},
                                        {width: 50, id: prototype.id + '-lblTotT_RATDNAC1'},
                                        {width: 100, id: prototype.id + '-lblTotT_COMITDEB1'},
                                        {width: 100, id: prototype.id + '-lblTotT_IVADEB1'},
                                        {width: 100, id: prototype.id + '-lblTotT_MONBTEXT1'},
                                        {width: 50, id: prototype.id + '-lblTotT_RATCEXT1'},
                                        {width: 100, id: prototype.id + '-lblTotT_COMITEXT1'},
                                        {width: 100, id: prototype.id + '-lblTotT_IVAEXT1'}
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxDetCard',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 1463,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetCard',
                                    width: 1463,
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
                                            {
                                                text: 'Type',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Doc', dataIndex: 'TDOC', width: 50,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strTOPER + '"';
                                                            return value;
                                                        }
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
                                                        text: 'Src', dataIndex: 'FTE', width: 50,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescFTE + '"';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Code', dataIndex: 'SCARCOD', width: 50,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescCard + '"';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Number', dataIndex: 'SCARDN', width: 110
                                                    },
                                                    {
                                                        text: 'Type', dataIndex: 'strDescripcion', width: 100
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Author.',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Code', dataIndex: 'SAUTHOC', width: 75
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Curr.', dataIndex: 'SCURRENCY', width: 50
                                            },
                                            {
                                                text: 'Amount', dataIndex: 'SVFOP', width: 100,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDetCard').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totSVFOP, '0,000.00') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'Commision',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Rate', dataIndex: 'RATECOM', width: 50,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount', dataIndex: 'COMISION', width: 75,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetCard').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totCOMISION, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Settlement',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'TDATE', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#c8c3d5;";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Liquidation',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'DATEF', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#c8c3d5;";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Payment',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'BDATEP', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#d5f4d5;";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Bank',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Deposit', dataIndex: 'strBankDeposit', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#d5f4d5;";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Status', dataIndex: 'BSTVAL', width: 100,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "background-color:#d5f4d5;";
                                                    metaData.tdAttr = 'data-qtip="' + data.BSTVAL + '"';
                                                    return value;
                                                }
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
                                                        text: 'Status', dataIndex: 'FLAGC', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.FLAGC + '"';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Agent', dataIndex: 'SAGENT', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.tdAttr = 'data-qtip="' + data.strDescripcion + '"';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Tkts', dataIndex: 'lngQTYDOC', width: 50,
                                                        listeners: {
                                                            click: 'onGridDetTkt'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;text-align:right;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                            return '<a href="#flown-bank-reconci-commis-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDetCard').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQTYDOC, '0,000') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }


                                        ]
                                    }
                                },
//                                {
//                                    xtype: 'panel',
//                                    id: prototype.id + '-panelDataSummary4',
//                                    width: 1463,
//                                    align: 'left',
//                                    margin: '0 0 0 0 ',
//                                    layout: {
//                                        type: 'hbox',
//                                        align: 'center'
//                                    },
//                                    defaults: {
//                                        xtype: 'label',
//                                        align: 'center',
//                                        html: '' + '&nbsp',
//                                        height: 25,
//                                        padding: '5 5 5 0',
//                                        style: 'background:#A0BFD3;color:#244066;text-align:right;font-weight:bold;border: 0.3px #4A6371 solid;font-size:10px'
//                                    },
//                                    items: [
//                                        {width: 585, id: prototype.id + '-lblTotAMOUNT4_1', align: 'center'},
//                                        {width: 50},
//                                        {width: 75, id: prototype.id + '-lblTotM_QTEF4_2', align: 'center'},
//                                        {width: 750, id: prototype.id + '-lblTotM_QTYDOC4_3', align: 'center'}
//                                    ]
//                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxDetTicket',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            height: 'auto',
                            width: 1268,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetTicket',
                                    width: 1268,
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
                                            {
                                                text: 'Ticket',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Number', dataIndex: 'strTicket', width: 120, //flex: 1
                                                        listeners: {
                                                            click: 'gridData_VIEWTKT_clickHandler'
                                                        },
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;background-color:#d5f4d5;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#flown-bank-reconci-commis-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Status', dataIndex: 'STVAL', width: 100,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:left;";
                                                    metaData.tdAttr = 'data-qtip="' + data.STVAL + '"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Agent', dataIndex: 'AAGENT', width: 100,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.strDescripcion + '"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Currency', dataIndex: 'ACURRENCY', width: 75
                                            },
                                            {
                                                text: 'Amount', dataIndex: 'AVFOP', width: 100,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDetTicket').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totSVFOP, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'Card Number', dataIndex: 'ACARDN', width: 120,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.ACARDN + '"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'PNR', dataIndex: 'APNR', width: 100,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.tdAttr = 'data-qtip="' + data.APNR + '"';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Authorization',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Code', dataIndex: 'AAUTHOC', width: 100
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Bank Information',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Acceptance Date', dataIndex: 'BDATEL', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#c8c3d5;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Status', dataIndex: 'BSTVAL', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#c8c3d5;";
                                                            return value;
                                                        }
                                                    }
                                                ]
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
                                                        text: 'Date', dataIndex: 'BDATEP', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#c8c3d5;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Status', dataIndex: 'BSTVALP', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#c8c3d5;";
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Days', dataIndex: 'lngDays', width: 50,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    (data.lngDays > 4) ? metaData.style = "color:#c22428"
                                                            : metaData.style = "color:#2BC224";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    return  '<b>' + value + '</b>';
                                                }
                                            }

                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-pie',
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            border: true,
                            width: 1132,
                            hidden: true,
                            height: 25,
                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                            items: [
                                {
                                    xtype: 'panel',
                                    width: 1132,
                                    height: 25,
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    defaults: {
                                        xtype: 'label'
                                    },
                                    items: [
                                        {
                                            text: 'Page',
                                            width: 50
                                        },
                                        {
                                            id: prototype.id + '-lbl-currentPage',
                                            text: '1',
                                            width: 50
                                        },
                                        {
                                            text: 'Of',
                                            width: 50
                                        },
                                        {
                                            id: prototype.id + '-lbl-pageCount',
                                            text: '0',
                                            width: 50
                                        },
                                        {xtype: 'tbspacer', width: 100},
                                        {
                                            text: 'Total found',
                                            width: 80
                                        },
                                        {
                                            id: prototype.id + '-lbl-total',
                                            text: '0',
                                            width: 50
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    region: 'south',
                    layout: 'border',
                    height: 0,
                    defaults: {
                        style: 'margin: 1px;',
                        bodyStyle: 'background: transparent;',
                        border: false
                    }
                }
            ]
        }
    ]
}
);


