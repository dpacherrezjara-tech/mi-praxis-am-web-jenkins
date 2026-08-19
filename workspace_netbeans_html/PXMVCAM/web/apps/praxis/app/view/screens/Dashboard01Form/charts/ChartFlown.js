Ext.define('Ext.Praxis.view.screens.Dashboard01Form.charts.ChartFlown', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-chartFlown',
    requires: [
        'Ext.Praxis.controller.screens.Dashboard01.charts.ChartFlownController'
    ],
    controller: 'ChartFlownController',
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
                align: 'center'
            },
            items: [
                /*************************************************************************
                 * PANEL DE FILTROS
                 * */
                {
                    xtype: 'panel',
                    margin: '20 0 5 0',
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    bodyStyle: 'background-color: transparent;',
                    border: true,
                    defaults: {
                        width: 1550,
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            border: true,
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    width: 950,
                                    bodyStyle: 'background-color: transparent; border: 0px solid #81BEF7',
                                    border: true,
                                    layout: 'column',
                                    defaults: {
                                        labelStyle: 'font-weight:bold;',
                                        fieldStyle: 'text-align: center;',
                                        padding: '8px 7px 8px 20px',
                                        anchor: '100%'
                                    },
                                    items: [
                                        {
                                            xtype: 'radiogroup',
                                            id: prototype.id + '-Box_Chart_Flown',
                                            fieldLabel: '',
                                            horizontal: true,
                                            items: [
                                                {boxLabel: '<strong style="color:#3399FF" >By Month</strong>', name: 'rb', inputValue: 'MO', width: 120, checked: true},
                                                {boxLabel: '<strong style="color:#3399FF" >On/Off</strong>', name: 'rb', inputValue: 'NF', width: 120},
                                                {boxLabel: '<strong style="color:#3399FF" >By Zone</strong>', name: 'rb', inputValue: 'ZN', width: 120},
                                                {boxLabel: '<strong style="color:#3399FF" >By Carrier</strong>', name: 'rb', inputValue: 'CA', width: 120}
                                            ],
                                            listeners: {
                                                change: 'chooseChart_clickHandler'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 180},
                                        {
                                            xtype: 'radiogroup',
                                            id: prototype.id + '-Box_Decide_ByCarrier',
                                            fieldLabel: '',
                                            hidden: true,
                                            horizontal: true,
                                            items: [
                                                {boxLabel: '<strong style="color:#3399FF" >Qty</strong>', name: 'rd', inputValue: 'QT', width: 60, checked: true},
                                                {boxLabel: '<strong style="color:#3399FF" >Amount</strong>', name: 'rd', inputValue: 'AT', width: 60},
                                            ],
                                            listeners: {
                                                change: 'chooseChart_ByCarrier'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    width: 420,
                                    bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                                    border: true,
                                    layout: 'column',
                                    defaults: {
                                        labelStyle: 'font-weight:bold;',
                                        fieldStyle: 'text-align: center;',
                                        padding: '4px 5px 4px 5px',
                                        anchor: '100%'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            html: '<b>Year:</b>',
                                            fieldStyle: 'text-align: center;'
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbFADateFromYear1',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            valueField: 'code',
                                            displayField: 'name',
                                            editable: false,
                                            width: 75,
                                            listConfig: {maxHeight: 111}
                                        },
                                        {xtype: 'tbspacer', width: 0},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbFADateFromMonth1',
                                            labelAlign: 'right',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            editable: false,
                                            valueField: 'code', displayField: 'name',
                                            width: 65,
                                            listeners: {
                                                change: 'cbxDateFromMonth_changeHandler_chart'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'label',
                                            id: prototype.id + '-txtOcultable',
                                            html: '<b>To</b>',
                                            fieldStyle: 'text-align: center;'
                                        },
                                        {xtype: 'tbspacer', width: 0},
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbFADateToMonth1',
                                            labelAlign: 'right',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            editable: false,
                                            valueField: 'code', displayField: 'name',
                                            width: 65,
//                                            listeners: {
//                                                change: 'cbxDateFromMonth_changeHandler_chart'
//                                            }
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                    ]
                                },
                                {
                                    xtype: 'toolbar',
                                    padding: '4px 7px 4px 20px',
                                    bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                                    width: 130,
                                    items: [
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btnSearch_chartFlown',
                                            iconCls: 'prx-icon-search',
                                            tooltip: 'Search',
                                            listeners: {
                                                click: 'onClickSearch'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btnBack_chartFlown',
                                            iconCls: 'prx-icon-back',
                                            tooltip: 'Back'
                                        },
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btnExcel_chartFlown',
                                            iconCls: 'prx-icon-excel',
                                            hidden: true,
                                            tooltip: 'Export to Excel',
                                            listeners: {
                                                click: 'btnExcel_click'
                                            }
                                        },
                                    ]
                                }
                            ]
                        }

                    ]
                },
                /*************************************************************************
                 ***************PANEL DE GRILLA Y GRAFICOS - Month************************ 
                 *************************************************************************/
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxFlownByMonth',
                    margin: '0 0 0 0',
                    hidden: false,
                    border: false,
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    bodyStyle: 'background-color: transparent;',
                    items: [
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxFlownPiesAndGrillMonth',
                            margin: '0 0 0 0',
                            border: false,
                            layout: {
                                type: 'vbox',
                                pack: 'center'
                            },
                            bodyStyle: 'background-color: transparent;',
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-boxChartFlownMonthBack',
                                    border: false,
                                    margin: '5 0 5 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
                                    bodyStyle: 'background-color: transparent;',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            margin: '5 0 5 0',
                                            border: false,
                                            layout: {
                                                type: 'hbox',
                                                pack: 'left'
                                            },
                                            bodyStyle: 'background-color: transparent;',
                                            items: [
                                                {
                                                    xtype: 'cartesian',
                                                    id: prototype.id + '-displayFlownMonthPieBack',
                                                    width: 550,
                                                    border: false,
                                                    height: 369,
                                                    margin: '5 10 0 0',
                                                    background: '#E0F8F7',
                                                    animation: {
                                                        duration: 200
                                                    },
                                                    interactions: ['itemhighlight'],
                                                    axes: [{
                                                            type: 'numeric3d',
                                                            position: 'left',
                                                            fields: ['VCPNB'],
                                                            grid: true,
                                                            title: '',
                                                            renderer: function (obj, value) {
                                                                if (value > 1) {
                                                                    return  '' + Ext.util.Format.number(value);
                                                                } else {
                                                                    return '0';
                                                                }
                                                            }
                                                        }, {
                                                            type: 'category3d',
                                                            position: 'bottom',
//                                                            fields: 'strFormatDate',
                                                            grid: true,
                                                            title: {
                                                                text: 'Total Value',
                                                                translationX: -30
                                                            }
                                                        }],
                                                    series: [{
                                                            type: 'bar3d',
                                                            stacked: false,
                                                            title: [''],
                                                            xField: 'strFormatDateB',
                                                            yField: ['VCPNB'],
                                                            colors: ['#22e6c9'],
                                                            highlight: true,
                                                            style: {
                                                                inGroupGapWidth: -7,
                                                                minGapWidth: 2,
                                                                maxBarWidth: 600
                                                            },
                                                            label: {
                                                                field: [' '],
//                                                            display: 'insideEnd',
                                                                display: 'outside',
                                                                calloutLine: {
                                                                    length: 10,
                                                                    width: 0,
//                                                                color: '#FFFFFF',
                                                                },
                                                                renderer: function (value, b, callout) {
                                                                    callout.calloutVertical = false;
                                                                    if (value === 100) {
                                                                        return Ext.util.Format.number(value, '0,000');
                                                                    } else {
                                                                        return Ext.util.Format.number(value, '0,000.00');
                                                                    }
                                                                }
                                                            },
                                                            tooltip: {
                                                                trackMouse: true,
                                                                height: 28,
                                                                renderer: function (toolTip, record, ctx) {
                                                                    var year = '';
                                                                    var month = record.get('strMonth');
                                                                    if (ctx.field === 'VCPN') {
                                                                        year = record.get('strYear');
                                                                    } else if (ctx.field === 'VCPNB') {
                                                                        year = record.get('strYearB');
                                                                    }
                                                                    toolTip.setHtml('Total ' + year + '-' + month + ' Amount: ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + ' USD' + '</b>');
                                                                }
                                                            }
                                                        }]
                                                },
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id + '-gridData_FlownMonthBack',
                                                    width: 550,
                                                    height: 373, //403
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
                                                            {
                                                                text: 'Flight',
                                                                defaults: {
                                                                    menuDisabled: true, sortable: false, align: 'center'
                                                                },
                                                                columns: [
                                                                    {text: 'Date', dataIndex: 'strFormatDateB', width: 90,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:center";
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridData_FlownMonthBack').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:center; margin-right:3px ';
                                                                            data = 'Total';
                                                                            return '<b>' + data + '</b>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Cabin',
                                                                defaults: {
                                                                    menuDisabled: true, sortable: false, align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Business',
                                                                        defaults: {
                                                                            menuDisabled: true, sortable: false, align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {text: 'Pax', dataIndex: 'QTYPAX_JB', width: 40,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "background:#deedfb;text-align:right";
                                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridData_FlownMonthBack').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totQTYPAX_JB, '0,000') + '<b>';
                                                                                }
                                                                            },
                                                                            {text: 'Value', dataIndex: 'VCPN_JB', width: 60,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "background:#deedfb;text-align:right";
                                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridData_FlownMonthBack').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totVCPN_JB, '0,000') + '<b>';
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Economy',
                                                                        defaults: {
                                                                            menuDisabled: true, sortable: false, align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {text: 'Pax', dataIndex: 'QTYPAX_YB', width: 90,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "background:#d5f4d5;text-align:right";
                                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridData_FlownMonthBack').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totQTYPAX_YB, '0,000') + '<b>';
                                                                                }
                                                                            },
                                                                            {text: 'Value', dataIndex: 'VCPN_YB', width: 90,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "background:#d5f4d5;text-align:right";
                                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridData_FlownMonthBack').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totVCPN_YB, '0,000') + '<b>';
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Total',
                                                                        defaults: {
                                                                            menuDisabled: true, sortable: false, align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {text: 'Pax', dataIndex: 'QTYPAXB', width: 90,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "background:#fcf9ec;text-align:right";
                                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridData_FlownMonthBack').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totQTYPAXB, '0,000') + '<b>';
                                                                                }
                                                                            },
                                                                            {text: 'Value', dataIndex: 'VCPNB', width: 90,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "background:#fcf9ec;text-align:right";
                                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridData_FlownMonthBack').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totVCPNB, '0,000') + '<b>';
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                }
                                            ]
                                        },
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-boxChartFlownMonthNow',
                                    border: false,
                                    margin: '0 0 5 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
                                    bodyStyle: 'background-color: transparent;',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            margin: '0 0 5 0',
                                            border: false,
                                            layout: {
                                                type: 'hbox',
                                                pack: 'left'
                                            },
                                            bodyStyle: 'background-color: transparent;',
                                            items: [
                                                {
                                                    xtype: 'cartesian',
                                                    id: prototype.id + '-displayFlownMonthPieNow',
                                                    width: 550,
                                                    border: false,
                                                    height: 369,
                                                    margin: '5 10 0 0',
                                                    background: '#E0F8F7',
                                                    animation: {
                                                        duration: 200
                                                    },
                                                    interactions: ['itemhighlight'],
                                                    axes: [{
                                                            type: 'numeric3d',
                                                            position: 'left',
                                                            fields: ['VCPN'],
                                                            grid: true,
                                                            title: '',
                                                            renderer: function (obj, value) {
                                                                if (value > 1) {
                                                                    return  '' + Ext.util.Format.number(value);
                                                                } else {
                                                                    return '0';
                                                                }
                                                            }
                                                        }, {
                                                            type: 'category3d',
                                                            position: 'bottom',
//                                                            fields: 'strFormatDate',
                                                            grid: true,
                                                            title: {
                                                                text: 'Total Value',
                                                                translationX: -30
                                                            }
                                                        }],
                                                    series: [{
                                                            type: 'bar3d',
                                                            stacked: false,
                                                            title: [''],
                                                            xField: 'strFormatDate',
                                                            yField: ['VCPN'],
                                                            colors: ['#22e6c9'],
                                                            highlight: true,
                                                            style: {
                                                                inGroupGapWidth: -7,
                                                                minGapWidth: 2,
                                                                maxBarWidth: 600
                                                            },
                                                            label: {
                                                                field: [' '],
//                                                            display: 'insideEnd',
                                                                display: 'outside',
                                                                calloutLine: {
                                                                    length: 10,
                                                                    width: 0,
//                                                                color: '#FFFFFF',
                                                                },
                                                                renderer: function (value, b, callout) {
                                                                    callout.calloutVertical = false;
                                                                    if (value === 100) {
                                                                        return Ext.util.Format.number(value, '0,000');
                                                                    } else {
                                                                        return Ext.util.Format.number(value, '0,000.00');
                                                                    }
                                                                }
                                                            },
                                                            tooltip: {
                                                                trackMouse: true,
                                                                height: 28,
                                                                renderer: function (toolTip, record, ctx) {
                                                                    var year = '';
                                                                    var month = record.get('strMonth');
                                                                    if (ctx.field === 'VCPN') {
                                                                        year = record.get('strYear');
                                                                    } else if (ctx.field === 'VCPNB') {
                                                                        year = record.get('strYearB');
                                                                    }
                                                                    toolTip.setHtml('Total ' + year + '-' + month + ' Amount: ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + ' USD' + '</b>');
                                                                }
                                                            }
                                                        }]
                                                },
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id + '-gridData_FlownMonthNow',
                                                    width: 550,
                                                    height: 373,
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
                                                            {
                                                                text: 'Flight',
                                                                defaults: {
                                                                    menuDisabled: true, sortable: false, align: 'center'
                                                                },
                                                                columns: [
                                                                    {text: 'Date', dataIndex: 'strFormatDate', width: 90,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:center";
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridData_FlownMonthNow').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:center; margin-right:3px ';
                                                                            data = 'Total';
                                                                            return '<b>' + data + '</b>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Cabin',
                                                                defaults: {
                                                                    menuDisabled: true, sortable: false, align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Business',
                                                                        defaults: {
                                                                            menuDisabled: true, sortable: false, align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {text: 'Pax', dataIndex: 'QTYPAX_J', width: 40,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "background:#deedfb;text-align:right";
                                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridData_FlownMonthNow').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totQTYPAX_J, '0,000') + '<b>';
                                                                                }
                                                                            },
                                                                            {text: 'Value', dataIndex: 'VCPN_J', width: 60,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "background:#deedfb;text-align:right";
                                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridData_FlownMonthNow').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totVCPN_J, '0,000') + '<b>';
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Economy',
                                                                        defaults: {
                                                                            menuDisabled: true, sortable: false, align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {text: 'Pax', dataIndex: 'QTYPAX_Y', width: 90,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "background:#d5f4d5;text-align:right";
                                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridData_FlownMonthNow').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totQTYPAX_Y, '0,000') + '<b>';
                                                                                }
                                                                            },
                                                                            {text: 'Value', dataIndex: 'VCPN_Y', width: 90,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "background:#d5f4d5;text-align:right";
                                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridData_FlownMonthNow').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totVCPN_Y, '0,000') + '<b>';
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Total',
                                                                        defaults: {
                                                                            menuDisabled: true, sortable: false, align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {text: 'Pax', dataIndex: 'QTYPAX', width: 90,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "background:#fcf9ec;text-align:right";
                                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridData_FlownMonthNow').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totQTYPAX, '0,000') + '<b>';
                                                                                }
                                                                            },
                                                                            {text: 'Value', dataIndex: 'VCPN', width: 90,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "background:#fcf9ec;text-align:right";
                                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridData_FlownMonthNow').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totVCPN, '0,000') + '<b>';
                                                                                }
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxFlownMonthBared',
                            margin: '0 0 0 0',
                            border: false,
                            layout: {
                                type: 'vbox',
                                pack: 'center'
                            },
                            bodyStyle: 'background-color: transparent;',
                            items: [
                                {
                                    xtype: 'cartesian',
                                    id: prototype.id + '-displayFlownMonthBared',
                                    margin: '15 0 0 10 ',
                                    flipXY: true,
                                    width: 420,
                                    height: 747,
                                    insetPadding: '20 20',
                                    background: '#E0F8F7',
                                    captions: {
                                        title: {
                                            text: '',
                                            alignTo: 'chart'
                                        }
                                    },
                                    animation: {
                                        duration: 200
                                    },
                                    interactions: ['itemhighlight'],
                                    axes: [
                                        {
                                            type: 'numeric3d',
                                            position: 'bottom',
                                            majorTickSteps: 5,
                                            fields: ['VCPN', 'VCPNB'],
                                            title: 'Amount',
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
                                            fields: 'strMonth',
                                            grid: true,
                                            label: {
                                                textAlign: 'left'
                                            },
                                        }],
                                    series: [{
                                            type: 'bar3d',
                                            stacked: false,
                                            title: ['current', 'last'],
                                            yField: ['VCPN', 'VCPNB'],
                                            colors: ['#209938', '#1c50c9'],
                                            xField: 'strMonth',
                                            highlight: true,
                                            style: {
                                                inGroupGapWidth: -7
                                            },
                                            highlight: {
                                                strokeStyle: 'rgba(0, 0, 0, .2)',
                                                lineWidth: 1
                                            },
                                            tooltip: {
                                                trackMouse: true,
                                                height: 28,
                                                renderer: function (toolTip, record, ctx) {
                                                    var year = '';
                                                    var month = record.get('strMonth');
                                                    if (ctx.field === 'VCPN') {
                                                        year = record.get('strYear');
                                                    } else if (ctx.field === 'VCPNB') {
                                                        year = record.get('strYearB');
                                                    }
                                                    toolTip.setHtml('Total ' + year + '-' + month + ' Amount: ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + ' USD' + '</b>');
                                                }
                                            }
                                        }]
                                },
                            ]
                        },
                    ]
                },
                /*************************************************************************
                 ***************PANEL DE GRILLA Y GRAFICOS - OnOff************************ 
                 *************************************************************************/
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxFlownOnOff',
                    margin: '0 0 0 0',
                    hidden: true,
                    border: false,
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    bodyStyle: 'background-color: transparent;',
                    items: [
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxFlownPiesAndGrillOnOff',
                            margin: '0 0 0 0',
                            border: false,
                            layout: {
                                type: 'vbox',
                                pack: 'center'
                            },
                            bodyStyle: 'background-color: transparent;',
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-boxChartFlownOnOffBack',
                                    border: false,
                                    margin: '5 0 5 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
                                    bodyStyle: 'background-color: transparent;',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            margin: '5 0 5 0',
                                            border: false,
                                            layout: {
                                                type: 'hbox',
                                                pack: 'left'
                                            },
                                            bodyStyle: 'background-color: transparent;',
                                            items: [
                                                {
                                                    xtype: 'polar',
                                                    id: prototype.id + '-displayFlownOnOffPieBack',
                                                    width: 555, //531
                                                    height: 355,
                                                    border: true,
                                                    margin: '5 10 0 0',
                                                    innerPadding: 50,
                                                    background: '#E0F8F7',
                                                    captions: {
                                                        title: {
                                                            text: '',
                                                            alignTo: 'chart'
                                                        }
                                                    },
                                                    animation: {
                                                        duration: 200
                                                    },
                                                    interactions: ['rotate', 'itemhighlight'],
                                                    series: [{
                                                            type: 'pie3d',
                                                            angleField: 'AngleBNF',
                                                            colors: ['#38c8ec', '#ffc102'],
                                                            label: {
                                                                field: 'AngleBNF',
                                                                renderer: function (value, metaData, b, callout) {
                                                                    value = Ext.util.Format.number(value, '0,000.00') + '%';
                                                                    return value;
                                                                },
                                                            },
                                                            highlight: true,
                                                            tooltip: {
                                                                trackMouse: true,
                                                                height: 28,
                                                                renderer: function (toolTip, record, ctx) {
                                                                    toolTip.setHtml('Total  Amount: ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + ' %' + '</b>');
                                                                }
                                                            }
                                                        }]
                                                },
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id + '-gridData_FlownOnOffBack',
                                                    width: 630,
                                                    height: 373, //403
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
                                                            {text: 'Date', dataIndex: 'strFormatDateB', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center";
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData_FlownOnOffBack').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:center; margin-right:3px ';
                                                                    data = 'Total';
                                                                    return '<b>' + data + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Total',
                                                                defaults: {
                                                                    menuDisabled: true, sortable: false, align: 'center'
                                                                },
                                                                columns: [
                                                                    {text: 'Flights', dataIndex: 'QFLIGHTB', width: 60,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:center";
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridData_FlownOnOffBack').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totQFLIGHTB, '0,000') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Stock',
                                                                defaults: {
                                                                    menuDisabled: true, sortable: false, align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Off',
                                                                        defaults: {
                                                                            menuDisabled: true, sortable: false, align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {text: 'Pax', dataIndex: 'QCPNOALB', width: 60,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "background:#deedfb;text-align:right";
                                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridData_FlownOnOffBack').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totQCPNOALB, '0,000') + '<b>';
                                                                                }
                                                                            },
                                                                            {text: 'Value', dataIndex: 'VCPNOALB', width: 90,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "background:#deedfb;text-align:right";
                                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridData_FlownOnOffBack').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totVCPNOALB, '0,000') + '<b>';
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'On',
                                                                        defaults: {
                                                                            menuDisabled: true, sortable: false, align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {text: 'Pax', dataIndex: 'QCPNONB', width: 80,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "background:#d5f4d5;text-align:right";
                                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridData_FlownOnOffBack').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totQCPNONB, '0,000') + '<b>';
                                                                                }
                                                                            },
                                                                            {text: 'Value', dataIndex: 'VCPNONB', width: 90,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "background:#d5f4d5;text-align:right";
                                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridData_FlownOnOffBack').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totVCPNONB, '0,000') + '<b>';
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Total',
                                                                        defaults: {
                                                                            menuDisabled: true, sortable: false, align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {text: 'Pax', dataIndex: 'QCPNNFB', width: 80,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "background:#fcf9ec;text-align:right";
                                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridData_FlownOnOffBack').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totQCPNNFB, '0,000') + '<b>';
                                                                                }
                                                                            },
                                                                            {text: 'Value', dataIndex: 'VCPNNFB', width: 90,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "background:#fcf9ec;text-align:right";
                                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridData_FlownOnOffBack').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totVCPNNFB, '0,000') + '<b>';
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                }
                                            ]
                                        },
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-boxChartFlownOnOffNow',
                                    border: false,
                                    margin: '0 0 5 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
                                    bodyStyle: 'background-color: transparent;',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            margin: '0 0 5 0',
                                            border: false,
                                            layout: {
                                                type: 'hbox',
                                                pack: 'left'
                                            },
                                            bodyStyle: 'background-color: transparent;',
                                            items: [
                                                {
                                                    xtype: 'polar',
                                                    id: prototype.id + '-displayFlownOnOffPieNow',
                                                    width: 555, //531
                                                    height: 355,
                                                    border: true,
                                                    margin: '5 10 0 0',
                                                    innerPadding: 50,
                                                    background: '#E0F8F7',
                                                    captions: {
                                                        title: {
                                                            text: '',
                                                            alignTo: 'chart'
                                                        }
                                                    },
                                                    animation: {
                                                        duration: 200
                                                    },
                                                    interactions: ['rotate', 'itemhighlight'],
                                                    series: [{
                                                            type: 'pie3d',
                                                            angleField: 'AngleNF',
                                                            colors: ['#38c8ec', '#ffc102'],
                                                            label: {
                                                                field: 'AngleNF',
                                                                renderer: function (value, metaData, b, callout) {
                                                                    value = Ext.util.Format.number(value, '0,000.00') + '%';
                                                                    return value;
                                                                },
                                                            },
                                                            highlight: true,
                                                            tooltip: {
                                                                trackMouse: true,
                                                                height: 28,
                                                                renderer: function (toolTip, record, ctx) {
                                                                    toolTip.setHtml('Total  Amount: ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + ' %' + '</b>');
                                                                }
                                                            }
                                                        }]
                                                },
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id + '-gridData_FlownOnOffNow',
                                                    width: 630,
                                                    height: 373, //403
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
                                                            {text: 'Date', dataIndex: 'strFormatDate', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center";
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData_FlownOnOffNow').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:center; margin-right:3px ';
                                                                    data = 'Total';
                                                                    return '<b>' + data + '</b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Total',
                                                                defaults: {
                                                                    menuDisabled: true, sortable: false, align: 'center'
                                                                },
                                                                columns: [
                                                                    {text: 'Flights', dataIndex: 'QFLIGHT', width: 60,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:center";
                                                                            return value;
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridData_FlownOnOffNow').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totQFLIGHT, '0,000') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Stock',
                                                                defaults: {
                                                                    menuDisabled: true, sortable: false, align: 'center'
                                                                },
                                                                columns: [
                                                                    {
                                                                        text: 'Off',
                                                                        defaults: {
                                                                            menuDisabled: true, sortable: false, align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {text: 'Pax', dataIndex: 'QCPNOAL', width: 60,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "background:#deedfb;text-align:right";
                                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridData_FlownOnOffNow').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totQCPNOAL, '0,000') + '<b>';
                                                                                }
                                                                            },
                                                                            {text: 'Value', dataIndex: 'VCPNOAL', width: 90,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "background:#deedfb;text-align:right";
                                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridData_FlownOnOffNow').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totVCPNOAL, '0,000') + '<b>';
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'On',
                                                                        defaults: {
                                                                            menuDisabled: true, sortable: false, align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {text: 'Pax', dataIndex: 'QCPNON', width: 80,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "background:#d5f4d5;text-align:right";
                                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridData_FlownOnOffNow').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totQCPNON, '0,000') + '<b>';
                                                                                }
                                                                            },
                                                                            {text: 'Value', dataIndex: 'VCPNON', width: 90,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "background:#d5f4d5;text-align:right";
                                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridData_FlownOnOffNow').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totVCPNON, '0,000') + '<b>';
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Total',
                                                                        defaults: {
                                                                            menuDisabled: true, sortable: false, align: 'center'
                                                                        },
                                                                        columns: [
                                                                            {text: 'Pax', dataIndex: 'QCPNNF', width: 80,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "background:#fcf9ec;text-align:right";
                                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridData_FlownOnOffNow').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totQCPNNF, '0,000') + '<b>';
                                                                                }
                                                                            },
                                                                            {text: 'Value', dataIndex: 'VCPNNF', width: 90,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "background:#fcf9ec;text-align:right";
                                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                },
                                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                                    var data = Ext.getCmp(prototype.id + '-gridData_FlownOnOffNow').getStore().getData().items[0].data;
                                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                                    return '<b>' + Ext.util.Format.number(data.totVCPNNF, '0,000') + '<b>';
                                                                                }
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                }
                                            ]
                                        },
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxFlownOnOffBared',
                            margin: '0 0 0 0',
                            border: false,
                            layout: {
                                type: 'vbox',
                                pack: 'center'
                            },
                            bodyStyle: 'background-color: transparent;',
                            items: [
                                {
                                    xtype: 'cartesian',
                                    id: prototype.id + '-displayFlownOnOffBared',
                                    margin: '15 0 0 10 ',
                                    flipXY: true,
                                    width: 420,
                                    height: 747,
                                    insetPadding: '20 20',
                                    background: '#E0F8F7',
                                    captions: {
                                        title: {
                                            text: '',
                                            alignTo: 'chart'
                                        }
                                    },
                                    animation: {
                                        duration: 200
                                    },
                                    interactions: ['itemhighlight'],
                                    axes: [
                                        {
                                            type: 'numeric3d',
                                            position: 'bottom',
                                            majorTickSteps: 5,
                                            fields: ['VCPN', 'VCPNB'],
                                            title: 'Amount',
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
                                            fields: 'strMonth',
                                            grid: true,
                                            label: {
                                                textAlign: 'left'
                                            },
                                        }],
                                    series: [{
                                            type: 'bar3d',
                                            stacked: false,
                                            title: ['current', 'last'],
                                            yField: ['VCPN', 'VCPNB'],
                                            colors: ['#209938', '#1c50c9'],
                                            xField: 'strMonth',
                                            highlight: true,
                                            style: {
                                                inGroupGapWidth: -7
                                            },
                                            highlight: {
                                                strokeStyle: 'rgba(0, 0, 0, .2)',
                                                lineWidth: 1
                                            },
                                            tooltip: {
                                                trackMouse: true,
                                                height: 28,
                                                renderer: function (toolTip, record, ctx) {
                                                    var year = '';
                                                    var month = record.get('strMonth');
                                                    if (ctx.field === 'VCPN') {
                                                        year = record.get('strYear');
                                                    } else if (ctx.field === 'VCPNB') {
                                                        year = record.get('strYearB');
                                                    }
                                                    toolTip.setHtml('Total ' + year + '-' + month + ' Amount: ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + ' USD' + '</b>');
                                                }
                                            }
                                        }]
                                },
                            ]
                        }
                    ]
                },
                /*************************************************************************
                 ***************PANEL DE GRILLA Y GRAFICOS - ByZone*********************** 
                 *************************************************************************/
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxFlownByZone',
                    margin: '0 0 0 0',
                    hidden: true,
                    border: false,
                    layout: {
                        type: 'vbox',
                        pack: 'center'
                    },
                    bodyStyle: 'background-color: transparent;',
                    items: [
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxFlownPiesAndGrillByZone',
                            margin: '0 0 0 0',
                            border: false,
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            bodyStyle: 'background-color: transparent;',
                            items: [
                                {
                                    xtype: 'polar',
                                    id: prototype.id + '-displayFlownByZonePieBack',
                                    width: 430,
                                    height: 282,
                                    border: true,
                                    margin: '5 5 0 0',
                                    innerPadding: 40,
                                    background: '#E0F8F7',
                                    captions: {
                                        title: {
                                            text: '',
                                            alignTo: 'chart'
                                        }
                                    },
                                    animation: {
                                        duration: 200
                                    },
                                    interactions: ['rotate', 'itemhighlight'],
                                    series: [{
                                            type: 'pie3d',
                                            angleField: 'QCPAXB',
                                            colors: ['#0eeeee', '#0071c1', '#412e4e',
                                                '#06f985', '#0aac52', '#93d250',
                                                '#ffff00', '#ffc102', '#fe0000',
                                                '#ff0167'],
                                            rotation: 75,
                                            label: {
                                                field: 'QCPAXB',
                                                renderer: function (value, metaData, b, callout) {
                                                    if (value < 25000) {
                                                        return 'K';
                                                    } else {
                                                        value = Ext.util.Format.number(value, '0,0' + 'K');
                                                        return value;
                                                    }
                                                },
                                            },
                                            highlight: true,
                                            tooltip: {
                                                trackMouse: true,
                                                height: 28,
                                                renderer: function (toolTip, record, ctx) {
                                                    var zona = record.get('strDescripcion');
                                                    toolTip.setHtml('Total Pax: ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + ' from ' + zona + '</b>');
                                                }
                                            }
                                        }]
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridData_FlownByZoneBack',
                                    width: 240,
//                                    height: 373,
                                    columnLines: true,
                                    margin: "5 5 0 0",
                                    border: false,
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Year - ',
                                                id: prototype.id + '-yearBack',
                                                defaults: {
                                                    menuDisabled: true, sortable: false, align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Flight', width: 80, dataIndex: 'QCFLOWB',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData_FlownByZoneBack').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCFLOW16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'PAX', width: 80, dataIndex: 'QCPAXB',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#8adb93';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData_FlownByZoneBack').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCPAX16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'AVG PAX', width: 80, dataIndex: 'AVGB',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData_FlownByZoneBack').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totAVG16avg, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridData_FlownByZones',
                                    width: 200,
//                                    height: 373,
                                    columnLines: true,
                                    margin: "5 0 0 0",
                                    border: false,
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: '.',
                                                defaults: {
                                                    menuDisabled: true, sortable: false, align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Market', width: 80, dataIndex: 'ZONA',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:center;';
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Description', width: 120, dataIndex: 'strDescripcion',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:left;';
                                                            return value;
                                                        },
                                                    },
                                                ]
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridData_FlownByZoneNow',
                                    width: 240,
//                                    height: 373,
                                    columnLines: true,
                                    margin: "5 0 0 5",
                                    border: false,
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Year - ',
                                                id: prototype.id + '-yearNow',
                                                defaults: {
                                                    menuDisabled: true, sortable: false, align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Flight', width: 80, dataIndex: 'QCFLOW',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData_FlownByZoneNow').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCFLOW16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'PAX', width: 80, dataIndex: 'QCPAX',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#8abbdb';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData_FlownByZoneNow').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQCPAX16, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'AVG PAX', width: 80, dataIndex: 'AVG',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData_FlownByZoneNow').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totAVG16avg, '0,000.00') + '<b>';
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'polar',
                                    id: prototype.id + '-displayFlownByZonePieNow',
                                    width: 430,
                                    height: 282,
                                    border: true,
                                    margin: '5 0 0 5',
                                    innerPadding: 40,
                                    background: '#E0F8F7',
                                    captions: {
                                        title: {
                                            text: '',
                                            alignTo: 'chart'
                                        }
                                    },
                                    animation: {
                                        duration: 200
                                    },
                                    interactions: ['rotate', 'itemhighlight'],
                                    series: [{
                                            type: 'pie3d',
                                            angleField: 'QCPAX',
                                            colors: ['#0eeeee', '#0071c1', '#412e4e',
                                                '#06f985', '#0aac52', '#93d250',
                                                '#ffff00', '#ffc102', '#fe0000',
                                                '#ff0167'],
                                            rotation: 75,
                                            label: {
                                                field: 'QCPAX',
                                                renderer: function (value, metaData, b, callout) {
                                                    if (value < 25000) {
                                                        return 'K';
                                                    } else {
                                                        value = Ext.util.Format.number(value, '0,0' + 'K');
                                                        return value;
                                                    }
                                                },
                                            },
                                            highlight: true,
                                            tooltip: {
                                                trackMouse: true,
                                                height: 28,
                                                renderer: function (toolTip, record, ctx) {
                                                    var zona = record.get('strDescripcion');
                                                    toolTip.setHtml('Total Pax: ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + ' from ' + zona + '</b>');
                                                }
                                            }
                                        }]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            bodyStyle: 'background-color: #E3EAEF;',
                            padding: '10 0 0 0',
                            border: false,
                            layout: {
                                type: 'hbox'
                            },
                            items: [
                                {
                                    xtype: 'cartesian',
                                    // title: '<div style="text-align:center;color:#6E6E73;font-size:14px">Passenger by Market</div>',
                                    id: prototype.id + '-displayFlownByZoneLine',
                                    width: 1560,
                                    border: false,
                                    height: 300,
                                    title: '',
                                    background: '#E3EAEF',
                                    interactions: ['itemhighlight'],
//                                    legend: {
//                                        docked: 'bottom',
//                                        background: '#E3EAEF'
//                                    },
                                    axes: [{
                                            type: 'numeric',
                                            position: 'left',
                                            grid: true
                                        }, {
                                            type: 'category',
                                            position: 'bottom',
                                            visibleRange: [0, 1]
                                        }],
                                    series: [
                                        {
                                            type: 'line',
                                            xField: 'ZONA',
                                            background: 'rgba(90,240,250, .1)',
                                            yField: 'QCPAX',
                                            title: '',
                                            grid: true,
                                            fill: true,
                                            highlight: true,
                                            tooltip: {
                                                trackMouse: true,
                                                height: 28,
                                                renderer: function (toolTip, record, ctx) {
                                                    toolTip.setHtml(record.get('strDescripcion') + ' : ' + Ext.util.Format.number(record.get('QCPAX'), '0,000.00'));
                                                }
                                            },
                                            style: {
                                                fill: "#1c50c9",
                                                stroke: "#1c50c9",
                                                fillOpacity: 0.1,
                                                miterLimit: 3,
                                                lineCap: 'miter',
                                                lineWidth: 2
                                            },
                                            marker: {
                                                type: 'path',
                                                path: ['M', -4, 0, 0, 4, 4, 0, 0, -4, 'Z'],
                                                stroke: '#1c50c9',
                                                lineWidth: 2,
                                                fill: 'white'
                                            }
                                        },
                                        {
                                            type: 'line',
                                            id: prototype.id + '-leyendLastG1',
                                            xField: 'ZONA',
                                            yField: 'QCPAXB',
                                            title: '',
                                            fill: true,
                                            highlight: true,
                                            tooltip: {
                                                trackMouse: true,
                                                height: 28,
                                                renderer: function (toolTip, record, ctx) {
                                                    toolTip.setHtml(record.get('strDescripcion') + ' : ' + Ext.util.Format.number(record.get('QCPAXB'), '0,000.00'));
                                                }
                                            },
                                            style: {
                                                smooth: true,
                                                fill: "#209938",
                                                stroke: "#209938",
                                                fillOpacity: 0.1,
                                                miterLimit: 3,
                                                lineCap: 'miter',
                                                lineWidth: 2
                                            },
                                            marker: {
                                                type: 'circle',
                                                radius: 4,
                                                lineWidth: 1,
                                                stroke: "#209938",
                                                fill: 'white'
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                /*************************************************************************
                 ***************PANEL DE GRILLA Y GRAFICOS - ByCarrier********************
                 *************************************************************************/
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxFlownByCarrier1',
                    margin: '0 0 0 0',
                    hidden: true,
                    border: false,
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    bodyStyle: 'background-color: transparent;',
                    items: [
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxFlownPiesAndGrillByCarrier1',
                            margin: '0 0 0 0',
                            border: false,
                            layout: {
                                type: 'vbox',
                                pack: 'center'
                            },
                            bodyStyle: 'background-color: transparent;',
                            items: [
                                //FLIGHT DATE
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-boxChartFlownByCarrierFLIGHT1',
                                    border: false,
                                    margin: '5 0 5 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
                                    bodyStyle: 'background-color: transparent;',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            margin: '5 0 5 0',
                                            border: false,
                                            layout: {
                                                type: 'hbox',
                                                pack: 'left'
                                            },
                                            bodyStyle: 'background-color: transparent;',
                                            items: [
                                                {
                                                    xtype: 'polar',
                                                    id: prototype.id + '-displayFlownByCarrierFLIGHT1',
                                                    width: 555, //531
                                                    height: 355,
                                                    border: true,
                                                    margin: '5 10 0 0',
                                                    innerPadding: 40,
                                                    background: '#E0F8F7',
                                                    captions: {
                                                        title: {
                                                            text: '',
                                                            alignTo: 'chart'
                                                        }
                                                    },
                                                    animation: {
                                                        duration: 100
                                                    },
                                                    interactions: ['rotate', 'itemhighlight'],
                                                    series: [{
                                                            type: 'pie3d',
                                                            angleField: 'AngleBNF',
                                                            colors: ['#38c8ec', '#72d0e8', '#ffc102', '#fcdd79'],
                                                            rotation: 75,
                                                            label: {
                                                                field: 'AngleBNF',
                                                                renderer: function (value, metaData, b, callout, d, e) {
                                                                    var data = '';
                                                                    if (d === 0) {
                                                                        value = Ext.util.Format.number(value, '0,000');
                                                                        data = 'ON-AM';
                                                                        return data;
                                                                    } else if (d === 1) {
                                                                        value = Ext.util.Format.number(value, '0,000');
                                                                        data = 'ON-5D';
                                                                        return data;
                                                                    } else if (d === 2) {
                                                                        value = Ext.util.Format.number(value, '0,000');
                                                                        data = 'OAL-AM';
                                                                        return data;
                                                                    } else if (d === 3) {
                                                                        value = Ext.util.Format.number(value, '0,000');
                                                                        data = 'OAL-5D';
                                                                        return data;
                                                                    }
                                                                },
                                                            },
                                                            highlight: true,
                                                            tooltip: {
                                                                trackMouse: true,
                                                                height: 28,
                                                                renderer: function (toolTip, record, ctx) {
                                                                    toolTip.setHtml('Total  Tickets: ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
                                                                }
                                                            }
                                                        }]
                                                },
                                                //GRILLA FLIGHT DATE
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id + '-gridData_FlownByCarrierFLIGHT1',
                                                    width: 580,
//                                                    height: 600,
                                                    columnLines: true,
                                                    margin: "5 5 0 0",
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

                                                            {text: 'Flight<br>Date', width: 80, dataIndex: 'strFormatDate',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:center;';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData_FlownByCarrierFLIGHT1').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:center; margin-right:3px ';
                                                                    return '<b>' + 'Total' + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Tickets AM',
                                                                defaults: {
                                                                    menuDisabled: true, sortable: false, align: 'center'
                                                                },
                                                                columns: [
                                                                    {text: 'AM', width: 100, dataIndex: 'AM',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = 'text-align:right;background:#d5f1f4;';
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridData_FlownByCarrierFLIGHT1').getStore().getData().items[0].data;
                                                                            console.log(data);
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totAM, '0,000') + '<b>';
                                                                        }
                                                                    },
                                                                    {text: '5D', width: 100, dataIndex: 'CINCOD',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = 'text-align:right;background:#d5f1f4;';
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridData_FlownByCarrierFLIGHT1').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totCINCOD, '0,000') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Tickets OAL',
                                                                defaults: {
                                                                    menuDisabled: true, sortable: false, align: 'center'
                                                                },
                                                                columns: [
                                                                    {text: 'AM', width: 100, dataIndex: 'AM_OTRO',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = 'text-align:right;background:#f4f4d5;';
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridData_FlownByCarrierFLIGHT1').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totAM_OTRO, '0,000') + '<b>';
                                                                        }
                                                                    },
                                                                    {text: '5D', width: 100, dataIndex: 'CINCOD_OTRO',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = 'text-align:right;background:#f4f4d5;';
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridData_FlownByCarrierFLIGHT1').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totCINCOD_OTRO, '0,000') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {text: 'Total', width: 100, dataIndex: 'TOTAL',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#deedfb;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData_FlownByCarrierFLIGHT1').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totTOTAL, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                },
                                            ]
                                        },
                                    ]
                                },
                                //POLIZA DATE
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-boxChartFlownByCarrierPOLIZA1',
                                    border: false,
                                    margin: '0 0 5 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
                                    bodyStyle: 'background-color: transparent;',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            margin: '0 0 5 0',
                                            border: false,
                                            layout: {
                                                type: 'hbox',
                                                pack: 'left'
                                            },
                                            bodyStyle: 'background-color: transparent;',
                                            items: [
                                                {
                                                    xtype: 'polar',
                                                    id: prototype.id + '-displayFlownByCarrierPOLIZA1',
                                                    width: 555, //531
                                                    height: 355,
                                                    border: true,
                                                    margin: '5 10 0 0',
                                                    innerPadding: 40,
                                                    background: '#E0F8F7',
                                                    rotation: 90,
                                                    captions: {
                                                        title: {
                                                            text: '',
                                                            alignTo: 'chart',
                                                        }
                                                        
                                                    },
                                                    animation: {
                                                        duration: 100,
                                                    },
                                                    interactions: ['rotate', 'itemhighlight'],
                                                    series: [{
                                                            type: 'pie3d',
                                                            angleField: 'AngleNF',
                                                            colors: ['#38c8ec', '#72d0e8', '#ffc102', '#fcdd79'],
                                                            rotation: 75,
                                                            label: {
                                                                field: 'AngleNF',
                                                                renderer: function (value, metaData, b, callout, d, e) {
                                                                    var data = '';
                                                                    if (d === 0) {
                                                                        value = Ext.util.Format.number(value, '0,000');
                                                                        data = 'ON-AM';
                                                                        return data;
                                                                    } else if (d === 1) {
                                                                        value = Ext.util.Format.number(value, '0,000');
                                                                        data = 'ON-5D';
                                                                        return data;
                                                                    } else if (d === 2) {
                                                                        value = Ext.util.Format.number(value, '0,000');
                                                                        data = 'OAL-AM';
                                                                        return data;
                                                                    } else if (d === 3) {
                                                                        value = Ext.util.Format.number(value, '0,000');
                                                                        data = 'OAL-5D';
                                                                        return data;
                                                                    }
                                                                },
                                                            },
                                                            highlight: true,
                                                            tooltip: {
                                                                trackMouse: true,
                                                                height: 28,
                                                                renderer: function (toolTip, record, ctx) {
                                                                    toolTip.setHtml('Total  Tickets: ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
                                                                }
                                                            }
                                                        }]
                                                },
                                                //GRILLA POLIZA DATE
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id + '-gridData_FlownByCarrierPOLIZA1',
                                                    width: 580,
//                                                    height: 600,
                                                    columnLines: true,
                                                    margin: "5 5 0 0",
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

                                                            {text: 'Poliza<br>Date', width: 80, dataIndex: 'strFormatDate0',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:center;';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData_FlownByCarrierPOLIZA1').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:center; margin-right:3px ';
                                                                    return '<b>' + 'Total' + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Tickets AM',
                                                                defaults: {
                                                                    menuDisabled: true, sortable: false, align: 'center'
                                                                },
                                                                columns: [
                                                                    {text: 'AM', width: 100, dataIndex: 'AM0',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = 'text-align:right;background:#d5f1f4;';
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridData_FlownByCarrierPOLIZA1').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totAM0, '0,000') + '<b>';
                                                                        }
                                                                    },
                                                                    {text: '5D', width: 100, dataIndex: 'CINCOD0',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = 'text-align:right;background:#d5f1f4;';
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridData_FlownByCarrierPOLIZA1').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totCINCOD0, '0,000') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Tickets OAL',
                                                                defaults: {
                                                                    menuDisabled: true, sortable: false, align: 'center'
                                                                },
                                                                columns: [
                                                                    {text: 'AM', width: 100, dataIndex: 'AM_OTRO0',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = 'text-align:right;background:#f4f4d5;';
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridData_FlownByCarrierPOLIZA1').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totAM_OTRO0, '0,000') + '<b>';
                                                                        }
                                                                    },
                                                                    {text: '5D', width: 100, dataIndex: 'CINCOD_OTRO0',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = 'text-align:right;background:#f4f4d5;';
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridData_FlownByCarrierPOLIZA1').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totCINCOD_OTRO0, '0,000') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {text: 'Total', width: 100, dataIndex: 'TOTAL0',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#d5f4d5;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData_FlownByCarrierPOLIZA1').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totTOTAL0, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                },
                                            ]
                                        },
                                    ]
                                }
                            ]
                        },
                        //GRAFICO DE BARRAS 1
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxFlownByCarrierBared1',
                            margin: '0 0 0 0',
                            border: false,
                            layout: {
                                type: 'vbox',
                                pack: 'center'
                            },
                            bodyStyle: 'background-color: transparent;',
                            items: [
                                {
                                    xtype: 'cartesian',
                                    id: prototype.id + '-displayFlownByCarrierBared1',
                                    margin: '15 0 0 10 ',
                                    flipXY: true,
                                    width: 420,
                                    height: 747,
                                    insetPadding: '20 20',
                                    background: '#E0F8F7',
                                    captions: {
                                        title: {
                                            text: '',
                                            alignTo: 'chart'
                                        }
                                    },
                                    animation: {
                                        duration: 200
                                    },
                                    interactions: ['itemhighlight'],
                                    axes: [
                                        {
                                            type: 'numeric3d',
                                            position: 'bottom',
                                            majorTickSteps: 5,
                                            fields: ['TOTAL0', 'TOTAL'],
                                            title: 'Tickets',
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
                                            fields: 'strFormatDate',
                                            grid: true,
                                            label: {
                                                textAlign: 'left'
                                            },
                                        }],
                                    series: [{
                                            type: 'bar3d',
                                            stacked: false,
                                            title: ['current', 'last'],
                                            yField: ['TOTAL0', 'TOTAL'],
                                            colors: ['#1c50c9', '#209938'],
//                                            
//                                            
//                                            
//                                            colors: ['#EC3838', '#ffc102'], //0eeeee 
//                                                                '#0eeeee', '#0071c1', '#412e4e',
//                                                                '#06f985', '#0aac52', '#93d250',
//                                                                '#ffff00', '#ffc102', '#fe0000',
//                                                                '#ff0167', '#9b66fe', '#6600cd'
                                            xField: 'strFormatDate',
                                            highlight: true,
                                            style: {
                                                inGroupGapWidth: -7
                                            },
                                            highlight: {
                                                strokeStyle: 'rgba(0, 0, 0, .2)',
                                                lineWidth: 1
                                            },
                                            tooltip: {
                                                trackMouse: true,
                                                height: 28,
                                                renderer: function (toolTip, record, ctx) {
                                                    var strFormatDate = record.get('strFormatDate');
                                                    if (ctx.field === 'TOTAL') {
//                                                        year = record.get('strYear');
                                                    } else if (ctx.field === 'TOTAL0') {
//                                                        year = record.get('strYearB');
                                                    }
                                                    toolTip.setHtml('Total ' + strFormatDate + ' Tickets: ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
                                                }
                                            }
                                        }]
                                },
                            ]
                        },
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxFlownByCarrier2',
                    margin: '0 0 0 0',
                    hidden: true,
                    border: false,
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    bodyStyle: 'background-color: transparent;',
                    items: [
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxFlownPiesAndGrillByCarrier2',
                            margin: '0 0 0 0',
                            border: false,
                            layout: {
                                type: 'vbox',
                                pack: 'center'
                            },
                            bodyStyle: 'background-color: transparent;',
                            items: [
                                //FLIGHT DATE
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-boxChartFlownByCarrierFLIGHT2',
                                    border: false,
                                    margin: '5 0 5 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
                                    bodyStyle: 'background-color: transparent;',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            margin: '5 0 5 0',
                                            border: false,
                                            layout: {
                                                type: 'hbox',
                                                pack: 'left'
                                            },
                                            bodyStyle: 'background-color: transparent;',
                                            items: [
                                                {
                                                    xtype: 'polar',
                                                    id: prototype.id + '-displayFlownByCarrierFLIGHT2',
                                                    width: 555, //531
                                                    height: 355,
                                                    border: true,
                                                    margin: '5 10 0 0',
                                                    innerPadding: 40,
                                                    background: '#E0F8F7',
                                                    rotation: 90,
                                                    captions: {
                                                        title: {
                                                            text: '',
                                                            alignTo: 'chart',
                                                        }
                                                        
                                                    },
                                                    animation: {
                                                        duration: 100,
                                                    },
                                                    interactions: ['rotate', 'itemhighlight'],
                                                    series: [{
                                                            type: 'pie3d',
                                                            angleField: 'AngleBNF',
                                                            colors: ['#38c8ec', '#72d0e8', '#ffc102', '#fcdd79'],
                                                            rotation: 75,
                                                            label: {
                                                                field: 'AngleBNF',
                                                                renderer: function (value, metaData, b, callout, d, e) {
                                                                    var data = '';
                                                                    if (d === 0) {
                                                                        value = Ext.util.Format.number(value, '0,000');
                                                                        data = 'ON-AM';
                                                                        return data;
                                                                    } else if (d === 1) {
                                                                        value = Ext.util.Format.number(value, '0,000');
                                                                        data = 'ON-5D';
                                                                        return data;
                                                                    } else if (d === 2) {
                                                                        value = Ext.util.Format.number(value, '0,000');
                                                                        data = 'OAL-AM';
                                                                        return data;
                                                                    } else if (d === 3) {
                                                                        value = Ext.util.Format.number(value, '0,000');
                                                                        data = 'OAL-5D';
                                                                        return data;
                                                                    }
                                                                },
                                                            },
                                                            highlight: true,
                                                            tooltip: {
                                                                trackMouse: true,
                                                                height: 28,
                                                                renderer: function (toolTip, record, ctx) {
                                                                    toolTip.setHtml('Total Amount USD: ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
                                                                }
                                                            }
                                                        }]
                                                },
                                                //GRILLA FLIGHT DATE
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id + '-gridData_FlownByCarrierFLIGHT2',
                                                    width: 580,
//                                                    height: 600,
                                                    columnLines: true,
                                                    margin: "5 5 0 0",
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

                                                            {text: 'Flight<br>Date', width: 80, dataIndex: 'strFormatDate',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:center;';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData_FlownByCarrierFLIGHT2').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:center; margin-right:3px ';
                                                                    return '<b>' + 'Total' + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Amount USD AM',
                                                                defaults: {
                                                                    menuDisabled: true, sortable: false, align: 'center'
                                                                },
                                                                columns: [
                                                                    {text: 'AM', width: 100, dataIndex: 'AMM',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = 'text-align:right;background:#d5f1f4;';
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridData_FlownByCarrierFLIGHT2').getStore().getData().items[0].data;
                                                                            console.log(data);
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totAMM, '0,000') + '<b>';
                                                                        }
                                                                    },
                                                                    {text: '5D', width: 100, dataIndex: 'CINCODM',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = 'text-align:right;background:#d5f1f4;';
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridData_FlownByCarrierFLIGHT2').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totCINCODM, '0,000') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Amount USD OAL',
                                                                defaults: {
                                                                    menuDisabled: true, sortable: false, align: 'center'
                                                                },
                                                                columns: [
                                                                    {text: 'AM', width: 100, dataIndex: 'AM_OTROM',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = 'text-align:right;background:#f4f4d5;';
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridData_FlownByCarrierFLIGHT2').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totAM_OTROM, '0,000') + '<b>';
                                                                        }
                                                                    },
                                                                    {text: '5D', width: 100, dataIndex: 'CINCOD_OTROM',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = 'text-align:right;background:#f4f4d5;';
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridData_FlownByCarrierFLIGHT2').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totCINCOD_OTROM, '0,000') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {text: 'Total', width: 100, dataIndex: 'TOTALM',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#deedfb;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData_FlownByCarrierFLIGHT2').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totTOTALM, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                },
                                            ]
                                        },
                                    ]
                                },
                                //POLIZA DATE
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-boxChartFlownByCarrierPOLIZA2',
                                    border: false,
                                    margin: '0 0 5 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
                                    bodyStyle: 'background-color: transparent;',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            margin: '0 0 5 0',
                                            border: false,
                                            layout: {
                                                type: 'hbox',
                                                pack: 'left'
                                            },
                                            bodyStyle: 'background-color: transparent;',
                                            items: [
                                                {
                                                    xtype: 'polar',
                                                    id: prototype.id + '-displayFlownByCarrierPOLIZA2',
                                                    width: 555, //531
                                                    height: 355,
                                                    border: true,
                                                    margin: '5 10 0 0',
                                                    innerPadding: 40,
                                                    background: '#E0F8F7',
                                                    rotation: 90,
                                                    captions: {
                                                        title: {
                                                            text: '',
                                                            alignTo: 'chart',
                                                        }
                                                        
                                                    },
                                                    animation: {
                                                        duration: 100,
                                                    },
                                                    interactions: ['rotate', 'itemhighlight'],
                                                    series: [{
                                                            type: 'pie3d',
                                                            angleField: 'AngleNF',
                                                            colors: ['#38c8ec', '#72d0e8', '#ffc102', '#fcdd79'],
                                                            rotation: 75,
                                                            label: {
                                                                field: 'AngleNF',
                                                                renderer: function (value, metaData, b, callout, d, e) {
                                                                    var data = '';
                                                                    if (d === 0) {
                                                                        value = Ext.util.Format.number(value, '0,000');
                                                                        data = 'ON-AM';
                                                                        return data;
                                                                    } else if (d === 1) {
                                                                        value = Ext.util.Format.number(value, '0,000');
                                                                        data = 'ON-5D';
                                                                        return data;
                                                                    } else if (d === 2) {
                                                                        value = Ext.util.Format.number(value, '0,000');
                                                                        data = 'OAL-AM';
                                                                        return data;
                                                                    } else if (d === 3) {
                                                                        value = Ext.util.Format.number(value, '0,000');
                                                                        data = 'OAL-5D';
                                                                        return data;
                                                                    }
                                                                },
                                                            },
                                                            highlight: true,
                                                            tooltip: {
                                                                trackMouse: true,
                                                                height: 28,
                                                                renderer: function (toolTip, record, ctx) {
                                                                    toolTip.setHtml('Total Amount USD: ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
                                                                }
                                                            }
                                                        }]
                                                },
                                                //GRILLA POLIZA DATE
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id + '-gridData_FlownByCarrierPOLIZA2',
                                                    width: 580,
//                                                    height: 600,
                                                    columnLines: true,
                                                    margin: "5 5 0 0",
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

                                                            {text: 'Poliza<br>Date', width: 80, dataIndex: 'strFormatDate0',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:center;';
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData_FlownByCarrierPOLIZA2').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:center; margin-right:3px ';
                                                                    return '<b>' + 'Total' + '<b>';
                                                                }
                                                            },
                                                            {
                                                                text: 'Amount USD AM',
                                                                defaults: {
                                                                    menuDisabled: true, sortable: false, align: 'center'
                                                                },
                                                                columns: [
                                                                    {text: 'AM', width: 100, dataIndex: 'AMM0',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = 'text-align:right;background:#d5f1f4;';
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridData_FlownByCarrierPOLIZA2').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totAMM0, '0,000') + '<b>';
                                                                        }
                                                                    },
                                                                    {text: '5D', width: 100, dataIndex: 'CINCODM0',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = 'text-align:right;background:#d5f1f4;';
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridData_FlownByCarrierPOLIZA2').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totCINCODM0, '0,000') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Amount USD OAL',
                                                                defaults: {
                                                                    menuDisabled: true, sortable: false, align: 'center'
                                                                },
                                                                columns: [
                                                                    {text: 'AM', width: 100, dataIndex: 'AM_OTROM0',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = 'text-align:right;background:#f4f4d5;';
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridData_FlownByCarrierPOLIZA2').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totAM_OTROM0, '0,000') + '<b>';
                                                                        }
                                                                    },
                                                                    {text: '5D', width: 100, dataIndex: 'CINCOD_OTROM0',
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = 'text-align:right;background:#f4f4d5;';
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        },
                                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                            var data = Ext.getCmp(prototype.id + '-gridData_FlownByCarrierPOLIZA2').getStore().getData().items[0].data;
                                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                                            return '<b>' + Ext.util.Format.number(data.totCINCOD_OTROM0, '0,000') + '<b>';
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {text: 'Total', width: 100, dataIndex: 'TOTALM0',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right;background:#d5f4d5;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData_FlownByCarrierPOLIZA2').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totTOTALM0, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    }
                                                },
                                            ]
                                        },
                                    ]
                                }
                            ]
                        },
                        //GRAFICO DE BARRAS 2
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxFlownByCarrierBared2',
                            margin: '0 0 0 0',
                            border: false,
                            layout: {
                                type: 'vbox',
                                pack: 'center'
                            },
                            bodyStyle: 'background-color: transparent;',
                            items: [
                                {
                                    xtype: 'cartesian',
                                    id: prototype.id + '-displayFlownByCarrierBared2',
                                    margin: '15 0 0 10 ',
                                    flipXY: true,
                                    width: 420,
                                    height: 747,
                                    insetPadding: '20 20',
                                    background: '#E0F8F7',
                                    captions: {
                                        title: {
                                            text: '',
                                            alignTo: 'chart'
                                        }
                                    },
                                    animation: {
                                        duration: 200
                                    },
                                    interactions: ['itemhighlight'],
                                    axes: [
                                        {
                                            type: 'numeric3d',
                                            position: 'bottom',
                                            majorTickSteps: 5,
                                            fields: ['TOTALM0', 'TOTALM'],
                                            title: 'Amount',
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
                                            fields: 'strFormatDate',
                                            grid: true,
                                            label: {
                                                textAlign: 'left'
                                            },
                                        }],
                                    series: [{
                                            type: 'bar3d',
                                            stacked: false,
                                            title: ['current', 'last'],
                                            yField: ['TOTALM0', 'TOTALM'],
                                            colors: ['#1c50c9', '#209938'],
//                                            
//                                            
//                                            
//                                            colors: ['#EC3838', '#ffc102'], //0eeeee 
//                                                                '#0eeeee', '#0071c1', '#412e4e',
//                                                                '#06f985', '#0aac52', '#93d250',
//                                                                '#ffff00', '#ffc102', '#fe0000',
//                                                                '#ff0167', '#9b66fe', '#6600cd'
                                            xField: 'strFormatDate',
                                            highlight: true,
                                            style: {
                                                inGroupGapWidth: -7
                                            },
                                            highlight: {
                                                strokeStyle: 'rgba(0, 0, 0, .2)',
                                                lineWidth: 1
                                            },
                                            tooltip: {
                                                trackMouse: true,
                                                height: 28,
                                                renderer: function (toolTip, record, ctx) {
                                                    var strFormatDate = record.get('strFormatDate');
                                                    if (ctx.field === 'TOTALM') {
//                                                        year = record.get('strYear');
                                                    } else if (ctx.field === 'TOTALM0') {
//                                                        year = record.get('strYearB');
                                                    }
                                                    toolTip.setHtml('Total ' + strFormatDate + ' Amount USD: ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
                                                }
                                            }
                                        }]
                                },
                            ]
                        }
                    ]
                },
            ]
        }
    ]
});