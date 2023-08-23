Ext.define('Ext.Praxis.view.screens.Dashboard01Form.tabs.SpaProfitability', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-SpaProfitability',
    requires: [
        'Ext.Praxis.controller.screens.Dashboard01.tabs.SpaProfitabilityController'
    ],
    controller: 'SpaProfitabilityController',
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
            id: prototype.id + '-boxMainDataSpaProfitability',
            height: 560,
            hidden: false,
            border: false,
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
                    id: prototype.id + '-gridDataSpaProfitability',
                    width: 1582,
                    height: 550,
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
                                text: '#', dataIndex: 'RN', width: 40,
                            },
                            {
                                text: 'Invoice',
                                //                                                id: prototype.id + '-adgTitFecha',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Date', dataIndex: 'strDATE', width: 90,
                                        listeners: {
                                            click: 'viewDetFAFlight',
                                            args: ['']
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center";
                                            return  value;
                                        }
                                    }
                                ]
                            },
                            {
                                text: 'Airline',
                                //                                                id: prototype.id + '-adgSalDate',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Code', dataIndex: 'AIRLINE', width: 60,
                                        listeners: {
                                            click: 'onAirlineCode'
//                                             click: 'viewDetFAFlight',
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;color:#057ECB;";
                                            value = '<b>' + value + '</b>';
                                            return '<a href="#screens-dashboard-01-form" style="color:#057ECB;">' + value + '</a>';
                                        },
                                    },
                                    {
                                        text: 'Name', dataIndex: 'strAirlineName', width: 150,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left";
                                            return  value;
                                        },
                                    },
                                ]
                            },
                            {
                                text: 'Total Documents',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Cpns', dataIndex: 'QCUPON', width: 60,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDataSpaProfitability').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.lnQCUPON, '0,000') + '<b>';
                                        }
                                    },
                                    {
                                        text: 'Spa Applied',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Yes', dataIndex: 'QSPA', width: 65,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    value = '<b>' + value + '</b>';
                                                    return '<a href="#screens-dashboard-01-form" style="color:#057ECB">' + value + '</a>';
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataSpaProfitability').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.lnQSPA, '0,000') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'No', dataIndex: 'QSPANA', width: 65,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    value = '<b>' + value + '</b>';
                                                    return '<a href="#screens-dashboard-01-form" style="color:#057ECB">' + value + '</a>';
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataSpaProfitability').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.lnQSPANA, '0,000') + '<b>';
                                                }
                                            },
                                        ]
                                    },
                                    {
                                        text: '%', dataIndex: 'perQSPA', width: 60,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return  value;
                                        },
                                    },
                                    {
                                        text: 'Audit', dataIndex: 'QAUDI', width: 70,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDataSpaProfitability').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.lnQAUDI, '0,000') + '<b>';
                                        }
                                    },
                                ]
                            },
                            {
                                text: 'Invoice',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Currency', dataIndex: 'CURRENP', width: 80,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center";
                                            return  value;
                                        },
                                    },
                                ]
                            },
                            {
                                text: 'Invoice',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Amount', dataIndex: 'NETI', width: 95,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDataSpaProfitability').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.dbNETI, '0,000') + '<b>';
                                        }
                                    },
                                ]
                            },
                            {
                                text: 'Reject',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Amount', dataIndex: 'NETO', width: 95,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDataSpaProfitability').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.dbNETO, '0,000') + '<b>';
                                        }
                                    },
                                ]
                            },
                            {
                                text: 'SPA', dataIndex: 'VALSPA', width: 95,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;background-color:#e8f9e8";
                                    value = Ext.util.Format.number(value, '0,000');
                                    return  value;
                                },
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridDataSpaProfitability').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right; margin-right:3px ';
                                    return '<b>' + Ext.util.Format.number(data.dbVALSPA, '0,000') + '<b>';
                                }
                            },
                            {
                                text: 'SRP', dataIndex: 'VALSRP', width: 95,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;background-color:#d5f4d5";
                                    value = Ext.util.Format.number(value, '0,000');
                                    return  value;
                                },
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridDataSpaProfitability').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right; margin-right:3px ';
                                    return '<b>' + Ext.util.Format.number(data.dbVALSRP, '0,000') + '<b>';
                                }
                            },
                            {
                                text: 'MPA', dataIndex: 'VALMPA', width: 95,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;background-color:#d5f4d5";
                                    value = Ext.util.Format.number(value, '0,000');
                                    return  value;
                                },
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridDataSpaProfitability').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right; margin-right:3px ';
                                    return '<b>' + Ext.util.Format.number(data.lnVALMPA, '0,000') + '<b>';
                                }
                            },
                            {
                                text: '% Effetivity SPA',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'SRP', dataIndex: 'dblEfecSRP', width: 95,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#deedfb";
                                            value = Ext.util.Format.number(value, '0,000.000');
                                            return  value;
                                        },
                                    },
                                    {
                                        text: 'MPA', dataIndex: 'dblEfecMPA', width: 95,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#deedfb";
                                            value = Ext.util.Format.number(value, '0,000.000');
                                            return  value;
                                        },
                                    }
                                ]
                            },
                            {text: 'Status', dataIndex: 'strImagen', width: 70,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:center;background-color:#d5f4d5;";
                                    if (value === 'assets/icons/16x16/lapiz_blanco.png') {
                                        return '';
                                    } else if (value === 'assets/icons/16x16/green.png') {
                                        return '<img src="resources/img/icon/16x16/circle_green.png">';
                                    } else if (value === 'assets/icons/16x16/red.png') {
                                        console.log(value);
                                        return '<img src="resources/img/icon/16x16/circle_red.png">';
                                    }

                                }
                            },
                        ]
                    }
                }
            ]
        },
        {
            xtype: 'panel',
            id: prototype.id + '-boxDetailSpaProfitability',
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
                    id: prototype.id + '-gridDataDetailSpaProfitability1',
                    width: 1382,
                    height: 392,
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
                                text: 'Description', dataIndex: 'RN', width: 120,
                            },
                            {
                                text: 'Total',
                                //                                                id: prototype.id + '-adgTitFecha',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Cpns', dataIndex: 'strDATE', width: 90,
//                                        listeners: {
//                                            click: 'viewDetFAFlight',
//                                            args: ['']
//                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left";
                                            return  value;
                                        }
                                    },
                                    {
                                        text: '%', dataIndex: 'strDATE', width: 90,
//                                        listeners: {
//                                            click: 'viewDetFAFlight',
//                                            args: ['']
//                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left";
                                            return  value;
                                        }
                                    }
                                ]
                            },
                            {
                                text: 'Currency', dataIndex: 'CURRENP', width: 80,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:center";
                                    return  value;
                                },
                            },
                            {
                                text: 'Amount',
                                //                                                id: prototype.id + '-adgSalDate',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Total', dataIndex: 'AIRLINE', width: 60,
                                        listeners: {
                                            change: 'onAirlineCode'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;color:#057ECB;";
                                            value = '<b>' + value + '</b>';
                                            return '<a href="#screens-dashboard-01-form" style="color:#057ECB;">' + value + '</a>';
                                        },
                                    },
                                    {
                                        text: '%', dataIndex: 'strAirlineName', width: 150,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left";
                                            return  value;
                                        },
                                    },
                                    {
                                        text: 'SPA', dataIndex: 'VALSPA', width: 95,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#e8f9e8";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        },
                                    },
                                    {
                                        text: 'SRP', dataIndex: 'VALSRP', width: 95,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#d5f4d5";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        },
                                    },
                                    {
                                        text: 'MPA', dataIndex: 'VALMPA', width: 95,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#d5f4d5";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        },
                                    },
                                    {text: 'Status', dataIndex: 'strImagen', width: 70,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;background-color:#d5f4d5;";
                                            if (value === 'assets/icons/16x16/lapiz_blanco.png') {
                                                return '';
                                            } else if (value === 'assets/icons/16x16/green.png') {
                                                return '<img src="resources/img/icon/16x16/circle_green.png">';
                                            } else if (value === 'assets/icons/16x16/red.png') {
                                                console.log(value);
                                                return '<img src="resources/img/icon/16x16/circle_red.png">';
                                            }

                                        }
                                    },
                                ]
                            },
                            {
                                text: '% Effectivity SPA',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'SRP', dataIndex: 'QCUPON', width: 60,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        },
                                    },
                                    {
                                        text: 'MPA', dataIndex: 'QCUPON', width: 60,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        },
                                    },
                                ]
                            },
                            {
                                text: 'USD Effectivity SPA',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'SRP', dataIndex: 'QCUPON', width: 60,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        },
                                    },
                                    {
                                        text: 'MPA', dataIndex: 'QCUPON', width: 60,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        },
                                    },
                                ]
                            },
                        ]
                    }
                },
                {
                    xtype: 'grid',
                    id: prototype.id + '-gridDataDetailSpaProfitability2',
                    width: 502,
                    height: 392,
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
                                text: 'Incomplete SPA',
                                //                                                id: prototype.id + '-adgTitFecha',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'TAG',
                                        //                                                id: prototype.id + '-adgSalDate',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'Reason for Rejection', dataIndex: 'AIRLINE', width: 120,
                                                listeners: {
                                                    change: 'onAirlineCode'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;color:#057ECB;";
                                                    value = '<b>' + value + '</b>';
                                                    return '<a href="#screens-dashboard-01-form" style="color:#057ECB;">' + value + '</a>';
                                                },
                                            },
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
                                                text: 'Cpns', dataIndex: 'AIRLINE', width: 60,
                                                listeners: {
                                                    change: 'onAirlineCode'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;color:#057ECB;";
                                                    value = '<b>' + value + '</b>';
                                                    return '<a href="#screens-dashboard-01-form" style="color:#057ECB;">' + value + '</a>';
                                                },
                                            },
                                            {
                                                text: '%', dataIndex: 'AIRLINE', width: 60,
                                                listeners: {
                                                    change: 'onAirlineCode'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;color:#057ECB;";
                                                    value = '<b>' + value + '</b>';
                                                    return '<a href="#screens-dashboard-01-form" style="color:#057ECB;">' + value + '</a>';
                                                },
                                            },
                                        ]
                                    },
                                    {
                                        text: 'Currency', dataIndex: 'strDATE', width: 90,
                                        listeners: {
                                            click: 'viewDetFAFlight',
                                            args: ['']
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left";
                                            return  value;
                                        }
                                    },
                                    {
                                        text: 'Amount',
                                        //                                                id: prototype.id + '-adgSalDate',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'SRP', dataIndex: 'AIRLINE', width: 60,
                                                listeners: {
                                                    change: 'onAirlineCode'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;color:#057ECB;";
                                                    value = '<b>' + value + '</b>';
                                                    return '<a href="#screens-dashboard-01-form" style="color:#057ECB;">' + value + '</a>';
                                                },
                                            },
                                            {
                                                text: 'MPA', dataIndex: 'AIRLINE', width: 60,
                                                listeners: {
                                                    change: 'onAirlineCode'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;color:#057ECB;";
                                                    value = '<b>' + value + '</b>';
                                                    return '<a href="#screens-dashboard-01-form" style="color:#057ECB;">' + value + '</a>';
                                                },
                                            },
                                        ]
                                    },
                                ]
                            },
                        ]
                    }
                }
            ]
        },
        {
            xtype: 'panel',
            id: prototype.id + '-boxApliedSpaProfitability',
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
                    id: prototype.id + '-gridDataApliedSpaProfitability',
                    width: 1582,
                    height: 392,
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
                                text: 'Description', dataIndex: 'RN', width: 40,
                            },
                            {
                                text: 'Total',
                                //                                                id: prototype.id + '-adgTitFecha',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Cpns', dataIndex: 'strDATE', width: 90,
//                                        listeners: {
//                                            click: 'viewDetFAFlight',
//                                            args: ['']
//                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left";
                                            return  value;
                                        }
                                    },
                                    {
                                        text: '%', dataIndex: 'strDATE', width: 90,
//                                        listeners: {
//                                            click: 'viewDetFAFlight',
//                                            args: ['']
//                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left";
                                            return  value;
                                        }
                                    }
                                ]
                            },
                            {
                                text: 'Currency', dataIndex: 'CURRENP', width: 80,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:center";
                                    return  value;
                                },
                            },
                            {
                                text: 'Amount',
                                //                                                id: prototype.id + '-adgSalDate',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Total', dataIndex: 'AIRLINE', width: 60,
                                        listeners: {
                                            change: 'onAirlineCode'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;color:#057ECB;";
                                            value = '<b>' + value + '</b>';
                                            return '<a href="#screens-dashboard-01-form" style="color:#057ECB;">' + value + '</a>';
                                        },
                                    },
                                    {
                                        text: '%', dataIndex: 'strAirlineName', width: 150,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left";
                                            return  value;
                                        },
                                    },
                                    {
                                        text: 'SPA', dataIndex: 'VALSPA', width: 95,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#e8f9e8";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        },
                                    },
                                    {
                                        text: 'SRP', dataIndex: 'VALSRP', width: 95,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#d5f4d5";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        },
                                    },
                                    {
                                        text: 'MPA', dataIndex: 'VALMPA', width: 95,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#d5f4d5";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        },
                                    },
                                    {text: 'Status', dataIndex: 'strImagen', width: 70,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;background-color:#d5f4d5;";
                                            if (value === 'assets/icons/16x16/lapiz_blanco.png') {
                                                return '';
                                            } else if (value === 'assets/icons/16x16/green.png') {
                                                return '<img src="resources/img/icon/16x16/circle_green.png">';
                                            } else if (value === 'assets/icons/16x16/red.png') {
                                                console.log(value);
                                                return '<img src="resources/img/icon/16x16/circle_red.png">';
                                            }

                                        }
                                    },
                                ]
                            },
                            {
                                text: '% Effectivity SPA',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'SRP', dataIndex: 'QCUPON', width: 60,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        },
                                    },
                                    {
                                        text: 'MPA', dataIndex: 'QCUPON', width: 60,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        },
                                    },
                                ]
                            },
                            {
                                text: 'USD Effectivity SPA',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'SRP', dataIndex: 'QCUPON', width: 60,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        },
                                    },
                                    {
                                        text: 'MPA', dataIndex: 'QCUPON', width: 60,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        },
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