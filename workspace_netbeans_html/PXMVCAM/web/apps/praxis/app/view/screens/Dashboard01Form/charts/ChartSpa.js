Ext.define('Ext.Praxis.view.screens.Dashboard01Form.charts.ChartSpa', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-chartSpa',
    requires: [
        'Ext.Praxis.controller.screens.Dashboard01.charts.ChartSpaController'
    ],
    controller: 'ChartSpaController',
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
                                            id: prototype.id + '-cmbSPAFromYear',
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
                                            id: prototype.id + '-cmbSPAFromMonth',
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
//                                        {xtype: 'tbspacer', width: 4},
//                                        {
//                                            xtype: 'label',
//                                            id: prototype.id + '-txtOcultable',
//                                            html: '<b>To</b>',
//                                            fieldStyle: 'text-align: center;'
//                                        },
//                                        {xtype: 'tbspacer', width: 0},
//                                        {
//                                            xtype: 'combo',
//                                            id: prototype.id + '-cmbSPAToMonth',
//                                            labelAlign: 'right',
//                                            queryMode: 'local',
//                                            triggerAction: 'all',
//                                            editable: false,
//                                            valueField: 'code', displayField: 'name',
//                                            width: 65,
////                                            listeners: {
////                                                change: 'cbxDateFromMonth_changeHandler_chart'
////                                            }
//                                        },
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
                                            id: prototype.id + '-btnSearch_chartSPA',
                                            iconCls: 'prx-icon-search',
                                            tooltip: 'Search',
                                            listeners: {
                                                click: 'onClickSearch'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btnBack_chartSPA',
                                            iconCls: 'prx-icon-back',
                                            tooltip: 'Back',
                                            listeners: {
                                                click: 'btnDisplay_click'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btnExcel_chartSPA',
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
                    id: prototype.id + '-boxSPAB',
                    margin: '0 0 0 0',
                    hidden: false,
                    border: false,
                    height: 700, //403
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    bodyStyle: 'background-color: transparent;',
                    items: [
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridData_SPA',
                            width: 570,
                            height: 603, //403
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
                                        text: 'Cpns', dataIndex: 'QCUPON', width: 60,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridData_SPA').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.lnQCUPON, '0,000') + '<b>';
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
                                            var data = Ext.getCmp(prototype.id + '-gridData_SPA').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.lnVALMPA, '0,000') + '<b>';
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
                                            var data = Ext.getCmp(prototype.id + '-gridData_SPA').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.dbVALSRP, '0,000') + '<b>';
                                        }
                                    },
                                    {
                                        text: 'SPA', dataIndex: 'VALSPA', width: 95,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#e8f9e8";
                                            value = Ext.util.Format.number(value, '0,000');
                                            return  value;
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            var data = Ext.getCmp(prototype.id + '-gridData_SPA').getStore().getData().items[0].data;
                                            metaData.style = 'text-align:right; margin-right:3px ';
                                            return '<b>' + Ext.util.Format.number(data.dbVALSPA, '0,000') + '<b>';
                                        }
                                    },
                                ]
                            }
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxSPAGraphic',
                            margin: '5 0 0 0',
                            background: '#e0eff8',
                            border: true,
//                            width: 570,
                            height: 603,
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            bodyStyle: 'background-color: transparent;',
                            items: [
                                {
                                    xtype: 'cartesian',
                                    id: prototype.id + '-displaySPA',
                                    margin: '15 0 0 10 ',
                                    flipXY: true,
                                    width: 570,
                                    height: 603,
                                    insetPadding: '20 20',
                                    background: '#e0eff8',
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
                                            fields: ['QCUPON'],
                                            title: 'Coupons',
                                            grid: {
                                                odd: {
                                                    fillStyle: 'rgba(245, 245, 245, 1.0)'
                                                },
                                                even: {
                                                    fillStyle: 'rgba(255, 255, 255, 1.0)'
                                                }
                                            },
                                            renderer: function (obj, value) {
//                                                if (value > 1) {
//                                                    return ' ' + Ext.util.Format.number((value / 1000000), '0,000') + 'M ';
//                                                } else {
                                                value = Ext.util.Format.number(value, '0,000');
                                                return value;
//                                                }
                                            }
                                        }, {
                                            type: 'category3d',
                                            position: 'left',
                                            fields: 'strAirlineName',
                                            grid: true,
                                            label: {
                                                textAlign: 'left'
                                            },
                                        }],
                                    series: [{
                                            type: 'bar3d',
                                            stacked: false,
                                            title: ['current'],
                                            yField: ['QCUPON'],
                                            colors: ['#209938'],
                                            xField: 'strAirlineName',
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
//                                                    var year = '';
//                                                    var month = record.get('strMonth');
//                                                    if (ctx.field === 'VCPN') {
//                                                        year = record.get('strYear');
//                                                    } else if (ctx.field === 'VCPNB') {
//                                                        year = record.get('strYearB');
//                                                    }
                                                    toolTip.setHtml('Total coupons : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + ' ' + '</b>');
                                                }
                                            }
                                        }]
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-boxSPAGraphicDet',
                                    margin: '0 0 0 0',
                                    background: '#e0eff8',
                                    border: false,
                                    layout: {
                                        type: 'vbox',
                                        pack: 'center'
                                    },
                                    bodyStyle: 'background-color: transparent;',
                                    items: [
                                        {
                                            xtype: 'label',
                                            html: '<strong style="color:#3399FF;">Top</strong>',
                                            id: prototype.id + '-lblSelecas',
                                            align: 'center',
                                            fieldStyle: 'text-align: center;',
                                            width: 60,   
                                            padding: '15px 0px 0px 15px',
                                            hidden: false
                                        },
                                        {
                                            xtype: 'radiogroup',
                                            id: prototype.id + '-Box_Chart_SPA',
                                            margin: '15 0 0 10',
                                            fieldLabel: '',
                                            height: 603,
                                            layout: 'vbox',
                                            items: [
                                                {boxLabel: '<strong style="color:#3399FF" >20 -</strong>', name: 'rb', inputValue: 'VE', width: 50, height: 50},
                                                {boxLabel: '<strong style="color:#3399FF" >15 -</strong>', name: 'rb', inputValue: 'QU', width: 50, height: 50},
                                                {boxLabel: '<strong style="color:#3399FF" >10 -</strong>', name: 'rb', inputValue: 'DI', width: 50, height: 50, checked: true},
                                                {boxLabel: '<strong style="color:#3399FF" >5  -</strong>', name: 'rb', inputValue: 'CI', width: 50, height: 50}
                                            ],
                                            listeners: {
                                                change: 'chooseRange_clickHandler'
                                            }
                                        },
                                    ]
                                },
                            ]
                        },
                    ]
                },
            ]
        }
    ]
});