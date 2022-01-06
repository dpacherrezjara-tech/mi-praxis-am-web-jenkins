Ext.define('Ext.Praxis.view.screens.Dashboard01Form.tabs.FlownAnalysis', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-FlownAnalysis',
    requires: [
        'Ext.Praxis.controller.screens.Dashboard01.tabs.FlownAnalysisController'
    ],
    controller: 'FlownAnalysisController',
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
            id: prototype.id + '-boxPrincipalFlownAnalysis',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                align: 'center'
            },
            items: [
                {
                    xtype: 'tabpanel',
                    id: prototype.id + '-boxMainDataFA',
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
                        {
                            xtype: 'panel',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridFAmonth',
                                    width: 1275,
                                    height: 400,
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
                                                text: 'Flight',
                                                //                                                id: prototype.id + '-adgTitFecha',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'strFormatDate', width: 100,
                                                        /*listeners: {
                                                         click: 'GridDDTMtotalperMonth_colHandler'
                                                         },*/
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;";
                                                            return value;
                                                            //value = '<b>' + value + '</b>';
                                                            //return '<a href="#screens-dashboard-01-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
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
                                                        text: 'Flights', dataIndex: 'QTYFlight', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
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
                                                        text: 'Pax', dataIndex: 'QTYPAX', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'USD', dataIndex: 'VCPN', width: 60,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return  value;
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
                                                                text: 'Pax', dataIndex: 'QTYPAX_J', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: 'USD', dataIndex: 'VCPN_J', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: '%', dataIndex: 'PerJ', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Avg', dataIndex: 'AVG_J', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                }
                                                            },
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
                                                                text: 'Pax', dataIndex: 'QTYPAX_Y', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: 'USD', dataIndex: 'VCPN_Y', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: '%', dataIndex: 'PerY', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Avg', dataIndex: 'AVG_Y', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                }
                                                            },
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
                                                                text: 'Reported', dataIndex: 'QTYVNR', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
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
                                                                text: 'Reported', dataIndex: 'QTYNRE', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return  value;
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: '%', dataIndex: 'Per2', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                ]
                                            },
                                            {text: '', dataIndex: 'strRuta' , width: 20,
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    if (value === '1') return '<img src="resources/img/botones/check.png">';
                                                    else return '<img src="resources/img/botones/restricted_folder_symbol_stop-16.png">';
                                                }
                                            },
                                            {
                                                text: '',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Comment', dataIndex: 'strDescripcion3', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
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
                                                        text: 'Pax', dataIndex: 'QBNPAX', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        }
                                                    },
                                                    {
                                                        text: 'USD', dataIndex: 'AMTBN', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
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