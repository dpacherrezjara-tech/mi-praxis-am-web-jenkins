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
                                                listeners: {
                                                    click: 'onSPAApliedYes'
                                                },
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
                                                listeners: {
                                                    click: 'onSPAApliedNot'
                                                },
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
                    width: 1175,
                    height: 'auto',
                    columnLines: true,
                    hidden: false,
                    margin: "5 0 0 0",
                    features: [{
                            ftype: 'summary',
//                            dock: 'bottom'
                        }],
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            align: 'center'
                        },
                        items: [
                            {
                                text: 'Description', dataIndex: 'TAGDESC', width: 120,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:left";
                                    return  value;
                                },
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridDataDetailSpaProfitability1').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:center; margin-right:3px ';
                                    value = 'TOTAL';
                                    return value;
                                }
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
                                        text: 'Cpns', dataIndex: 'QCPN', width: 90,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailSpaProfitability1').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.lngTotQCPN, '0,000') + '<b>';
                                        }
                                    },
                                    {
                                        text: '%', dataIndex: 'dblPorc', width: 90,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return  value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailSpaProfitability1').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(100, '0,000.00') + '<b>';
                                        }
                                    }
                                ]
                            },
                            {
                                text: 'Currency', dataIndex: 'CURRENC', width: 80,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:center;background-color:#d5f4d5";
                                    return  value;
                                },
                            },
                            {
                                text: 'Amount',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Total', dataIndex: 'VALSRP', width: 100,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return  value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailSpaProfitability1').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.dblTotVALMPA, '0,000.00') + '<b>';
                                        }
                                    },
                                    {
                                        text: '%', dataIndex: 'dblPorcSPA', width: 60,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return  value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailSpaProfitability1').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(100, '0,000.00') + '<b>';
                                        }
                                    },
                                    {
                                        text: 'SPA', dataIndex: 'VALSPA', width: 95,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#d5f4d5";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return  value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailSpaProfitability1').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(0, '0,000.00') + '<b>';
                                        }
                                    },
                                    {
                                        text: 'SRP', dataIndex: 'VALSRP', width: 95,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#d5f4d5";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return  value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailSpaProfitability1').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.dblTotVALSRP, '0,000.00') + '<b>';
                                        }
                                    },
                                    {
                                        text: 'MPA', dataIndex: 'VALMPA', width: 95,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#d5f4d5";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return  value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDataDetailSpaProfitability1').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.dblTotVALMPA, '0,000.00') + '<b>';
                                        }
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
                                        text: 'SRP', dataIndex: 'QCUPON', width: 70,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return  value;
                                        },
                                    },
                                    {
                                        text: 'MPA', dataIndex: 'QCUPON', width: 70,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right";
                                            value = Ext.util.Format.number(value, '0,000.00');
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
                                        text: 'SRP', dataIndex: 'QCUPON', width: 70,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return  value;
                                        },
                                    },
                                    {
                                        text: 'MPA', dataIndex: 'QCUPON', width: 70,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right";
                                            value = Ext.util.Format.number(value, '0,000.00');
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
                    width: 540,
                    height: 'auto',
                    columnLines: true,
                    hidden: false,
                    margin: "20 0 0 0",
                    features: [{
                            ftype: 'summary',
//                            dock: 'bottom'
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
                                                text: 'Reason for Rejection', dataIndex: 'TAGDESC', width: 140,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;color:#057ECB;";
                                                    value = '<b>' + value + '</b>';
                                                    return '<a style="color:#057ECB;">' + value + '</a>';
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetailSpaProfitability2').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:center; margin-right:3px ';
                                                    value = 'TOTAL';
                                                    return value;
                                                }
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
                                                text: 'Cpns', dataIndex: 'QCPN', width: 80,
                                                listeners: {
                                                    click: 'onTotalCoupons'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right";
                                                    value = Ext.util.Format.number(value, '0,000');
                                                    value = '<b>' + value + '</b>';
                                                    return '<a href="#screens-dashboard-01-form" style="color:#057ECB">' + value + '</a>';
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetailSpaProfitability2').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.lngTotQCPN, '0,000.00') + '<b>';
                                                }
                                            },
                                            {
                                                text: '%', dataIndex: 'dblPorc', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return  value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetailSpaProfitability2').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(100, '0,000.00') + '<b>';
                                                }
                                            },
                                        ]
                                    },
                                    {
                                        text: 'Currency', dataIndex: 'CURRENC', width: 90,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;background-color:#d5f4d5";
                                            return  value;
                                        }
                                    },
                                    {
                                        text: 'Amount',
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        columns: [
                                            {
                                                text: 'SRP', dataIndex: 'VALSRP', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return  value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetailSpaProfitability2').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.dblTotVALSRP, '0,000.00') + '<b>';
                                                }
                                            },
                                            {
                                                text: 'MPA', dataIndex: 'VALMPA', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return  value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetailSpaProfitability2').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.dblTotVALMPA, '0,000.00') + '<b>';
                                                }
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
            id: prototype.id + '-boxApliedSpaProfitabilityS',
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
                    id: prototype.id + '-gridDataApliedSpaProfitabilityS',
                    width: 852,
                    height: 'auto',
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
                                text: 'Int.Seq',
                                //                                                id: prototype.id + '-adgTitFecha',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Number', dataIndex: 'NROPRT', width: 90,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center";
                                            return '<a href="#screens-dashboard-01-form" style="color:#057ECB;">' + value + '</a>';
                                        }
                                    }
                                ]
                            },
                            {
                                text: 'Ticket', dataIndex: 'IN_TKT', width: 120,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:center";
                                    return  value;
                                },
                            },
                            {
                                text: 'Sector', dataIndex: 'strFDWORK', width: 80,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:center";
                                    return  value;
                                },
                            },
                            {
                                text: 'RM', dataIndex: 'strASIGNED', width: 80,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:center";
                                    return  value;
                                },
                            },
                            {
                                text: 'Currency', dataIndex: 'CURRENP', width: 80,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:center";
                                    return  value;
                                },
                            },
                            {
                                text: 'SPA', dataIndex: 'VALSPA', width: 80,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;background-color:#";
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return  value;
                                },
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridDataApliedSpaProfitabilityS').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right; margin-right:3px ';
                                    return '<b>' + Ext.util.Format.number(data.dbVALSPA, '0,000.00') + '<b>';
                                }
                            },
                            {
                                text: 'SRP', dataIndex: 'VALSRP', width: 80,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;background-color:#";
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return  value;
                                },
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridDataApliedSpaProfitabilityS').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right; margin-right:3px ';
                                    return '<b>' + Ext.util.Format.number(data.dbVALSRP, '0,000.00') + '<b>';
                                }
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
                                        text: 'Net', dataIndex: 'NETI', width: 80,
                                        listeners: {
                                            change: 'onAirlineCode'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return  value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDataApliedSpaProfitabilityS').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.dbNETI, '0,000.00') + '<b>';
                                        }
                                    },
                                ]
                            },
                            {
                                text: 'Accept',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Net', dataIndex: 'NETM', width: 80,
                                        listeners: {
                                            change: 'onAirlineCode'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return  value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDataApliedSpaProfitabilityS').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.lnQAUDI, '0,000.00') + '<b>';
                                        }
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
                                        text: 'Net', dataIndex: 'NETO', width: 80,
                                        listeners: {
                                            change: 'onAirlineCode'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return  value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDataApliedSpaProfitabilityS').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.dbNETO, '0,000.00') + '<b>';
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
            id: prototype.id + '-boxApliedSpaProfitabilityN',
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
                    id: prototype.id + '-gridDataApliedSpaProfitabilityN',
                    width: 852,
                    height: 'auto',
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
                                text: 'Int.Seq',
                                //                                                id: prototype.id + '-adgTitFecha',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Number', dataIndex: 'NROPRT', width: 90,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center";
                                            return '<a href="#screens-dashboard-01-form" style="color:#057ECB;">' + value + '</a>';
                                        }
                                    }
                                ]
                            },
                            {
                                text: 'Ticket', dataIndex: 'IN_TKT', width: 120,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:center";
                                    return  value;
                                },
                            },
                            {
                                text: 'Sector', dataIndex: 'strFDWORK', width: 80,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:center";
                                    return  value;
                                },
                            },
                            {
                                text: 'RM', dataIndex: 'strASIGNED', width: 80,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:center";
                                    return  value;
                                },
                            },
                            {
                                text: 'Currency', dataIndex: 'CURRENP', width: 80,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:center";
                                    return  value;
                                },
                            },
                            {
                                text: 'SPA', dataIndex: 'VALSPA', width: 80,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;background-color:#";
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return  value;
                                },
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridDataApliedSpaProfitabilityN').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right; margin-right:3px ';
                                    return '<b>' + Ext.util.Format.number(data.dbVALSPA, '0,000.00') + '<b>';
                                }
                            },
                            {
                                text: 'SRP', dataIndex: 'VALSRP', width: 80,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;background-color:#";
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return  value;
                                },
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    var data = Ext.getCmp(prototype.id + '-gridDataApliedSpaProfitabilityN').getStore().getData().items[0].data;
                                    metaData.style = 'text-align:right; margin-right:3px ';
                                    return '<b>' + Ext.util.Format.number(data.dbVALSRP, '0,000.00') + '<b>';
                                }
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
                                        text: 'Net', dataIndex: 'NETI', width: 80,
                                        listeners: {
                                            change: 'onAirlineCode'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return  value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDataApliedSpaProfitabilityN').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.dbNETI, '0,000.00') + '<b>';
                                        }
                                    },
                                ]
                            },
                            {
                                text: 'Accept',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Net', dataIndex: 'NETM', width: 80,
                                        listeners: {
                                            change: 'onAirlineCode'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return  value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDataApliedSpaProfitabilityN').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.lnQAUDI, '0,000.00') + '<b>';
                                        }
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
                                        text: 'Net', dataIndex: 'NETO', width: 80,
                                        listeners: {
                                            change: 'onAirlineCode'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return  value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridDataApliedSpaProfitabilityN').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.dbNETO, '0,000.00') + '<b>';
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
            id: prototype.id + '-boxTotalCoupons',
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
                    id: prototype.id + '-gridTotalCoupons',
                    width: 1202,
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
                                text: 'Prorate',
                                //                                                id: prototype.id + '-adgTitFecha',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Number', dataIndex: 'NROPRT', width: 90,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center";
                                            return  value;
                                        },
                                    }
                                ]
                            },
                            {
                                text: 'Ticket', dataIndex: 'strTICKET', width: 120,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:center";
                                    return  value;
                                },
                            },
                            {
                                text: 'Sector', dataIndex: 'RUTA', width: 80,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:center";
                                    return  value;
                                },
                            },
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
                                        text: 'Date', dataIndex: 'FECVTA', width: 90,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center";
                                            return  value;
                                        },
                                    }
                                ]
                            },
                            {
                                text: 'Fare',
                                //                                                id: prototype.id + '-adgTitFecha',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Basis', dataIndex: 'FBASIS', width: 90,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center";
                                            return  value;
                                        },
                                    }
                                ]
                            },
                            {
                                text: 'Agreement',
                                //                                                id: prototype.id + '-adgTitFecha',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Code', dataIndex: 'CODAC', width: 60,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center";
                                            return  value;
                                        },
                                    },
                                    {
                                        text: 'Ind', dataIndex: 'strINDAC', width: 60,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center";
                                            return  value;
                                        },
                                    },
                                    {
                                        text: 'Version', dataIndex: 'VRSAC', width: 60,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center";
                                            return  value;
                                        },
                                    }
                                ]
                            },
                            {
                                text: 'Fare',
                                //                                                id: prototype.id + '-adgTitFecha',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Cur', dataIndex: 'CURRENF', width: 90,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center";
                                            return  value;
                                        },
                                    },
                                    {
                                        text: 'Amt', dataIndex: 'FARE', width: 90,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return  value;
                                        },
                                    },
                                ]
                            },
                            {
                                text: 'SPA not Applied',
                                //                                                id: prototype.id + '-adgTitFecha',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Cur', dataIndex: 'CURRENC', width: 90,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center";
                                            return  value;
                                        },
                                    },
                                    {
                                        text: 'Amt', dataIndex: 'VALOR', width: 90,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return  value;
                                        },
                                    },
                                    {
                                        text: 'SRP', dataIndex: 'VALSRP', width: 90,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right";
                                            value = Ext.util.Format.number(value, '0,000.00');
                                            return  value;
                                        },
                                    },
                                    {
                                        text: 'MPA', dataIndex: 'VALMPA', width: 90,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right";
                                            value = Ext.util.Format.number(value, '0,000.00');
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