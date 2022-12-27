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
                                                {boxLabel: '<strong style="color:#3399FF" >Month</strong>', name: 'rb', inputValue: 'MO', width: 120, checked: true},
                                                {boxLabel: '<strong style="color:#3399FF" >On/Off</strong>', name: 'rb', inputValue: 'NF', width: 120}
                                            ],
                                            listeners: {
                                                change: 'chooseChart_clickHandler'
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
                                    width: 80,
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
                                        }
                                    ]
                                }
                            ]
                        }

                    ]
                },
                /*************************************************************************
                 * PANEL DE GRILLA Y GRAFICOS - Month 
                 */

                {
                    xtype: 'panel',
                    id: prototype.id + '-boxSal_TotalF1',
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
                            id: prototype.id + '-boxSal_TotalF2',
                            margin: '0 0 0 0',
                            border: false,
                            layout: {
                                type: 'vbox',
                                pack: 'center'
                            },
                            bodyStyle: 'background-color: transparent;',
                            items: [
                                // Grilla boxChartFlown %% 2 Grafic Vert
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-boxChartFlownB',
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
                                                    id: prototype.id + '-displayFOChartPB',
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
                                                        duration: 100
                                                    },
                                                    interactions: ['rotate', 'itemhighlight'],
//                                                    rotation: (-0.5 * Math.PI) - (25/180 * Math.PI),
//                                            legend: {
//                                                docked: 'bottom',
//                                                background: '#E3EAEF',
//                                            },
                                                    series: [{
                                                            type: 'pie3d',
                                                            angleField: 'VCPNB',
                                                            
//                                                            rotation:90,
                                                            colors: ['#0eeeee', '#0071c1', '#412e4e',
                                                                '#06f985', '#0aac52', '#93d250',
                                                                '#ffff00', '#ffc102', '#fe0000',
                                                                '#ff0167', '#9b66fe', '#6600cd'],
                                                            label: {
                                                                field: 'strValueB',
                                                                renderer: function (value, metaData, b, callout) {
                                                                    metaData.style = "font-size:12px;font-weight:bold;text-align:center;";
                                                                    var value0 = value.substr(0, 4);
                                                                    var value1 = value.substr(4, 15);
                                                                    var value2 = Ext.util.Format.number((value1 / 1000000), '0.0');
                                                                    if ((value2 / 100) > 1) {
//                                                                       console.log(value2 + ' es grande'); 
                                                                    } else {
                                                                        if (value2 < 40) {
//                                                                            console.log(value2 +  ' es chica no se muestra');
                                                                            value0 = '';
                                                                            value2 = '';
                                                                        } else {
//                                                                            console.log(value2 +  ' es chica');
                                                                        }
                                                                    }
                                                                    return value0 + value2 + 'M';
                                                                }
                                                            },
                                                            highlight: true,
                                                            tooltip: {
                                                                trackMouse: true,
                                                                height: 28,
                                                                renderer: function (toolTip, record, ctx) {
                                                                    var label = '';
                                                                    if (ctx.field === 'strFormatDate') {
                                                                        label = 'Total';
                                                                    } else {
                                                                        label = '';
                                                                    }
                                                                    toolTip.setHtml(record.get('TOOLTIP'));
                                                                    toolTip.setHtml(label + 'Total Amount: ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + ' USD' + '</b>');
                                                                }
                                                            }
                                                        }]
                                                },
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id + '-gridData_boxChartFlownB',
                                                    width: 550,
                                                    height: 373, //403
                                                    columnLines: true,
                                                    margin: "5 0 0 0",
                                                    border: false,
                                                    bodyStyle: 'background-color: #E3EAEF;',
//                                            features: [{
//                                                    ftype: 'summary'
//                                                }],
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
                                                                                }
                                                                            },
                                                                            {text: 'Value', dataIndex: 'VCPN_JB', width: 60,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "background:#deedfb;text-align:right";
                                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
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
                                                                                }
                                                                            },
                                                                            {text: 'Value', dataIndex: 'VCPN_YB', width: 90,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "background:#d5f4d5;text-align:right";
                                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                },
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
                                                                                }
                                                                            },
                                                                            {text: 'Value', dataIndex: 'VCPNB', width: 90,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "background:#fcf9ec;text-align:right";
                                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
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
                                    id: prototype.id + '-boxChartFlown',
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
                                                    id: prototype.id + '-displayFOChartP',
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
//                                            legend: {
//                                                docked: 'bottom',
//                                                background: '#E3EAEF',
//                                            },
                                                    series: [{
                                                            type: 'pie3d',
                                                            angleField: 'VCPN',
                                                            colors: ['#0eeeee', '#0071c1', '#412e4e',
                                                                '#06f985', '#0aac52', '#93d250',
                                                                '#ffff00', '#ffc102', '#fe0000',
                                                                '#ff0167', '#9b66fe', '#6600cd'],
                                                            label: {
                                                                field: 'strValue',
                                                                renderer: function (value, metaData, b, callout) {
                                                                    metaData.style = "font-size:12px;font-weight:bold;text-align:center;";
                                                                    var value0 = value.substr(0, 4);
                                                                    var value1 = value.substr(4, 15);
                                                                    var value2 = Ext.util.Format.number((value1 / 1000000), '0.0');
                                                                    if ((value2 / 100) > 1) {
//                                                                       console.log(value2 + ' es grande'); 
                                                                    } else {
                                                                        if (value2 < 40) {
//                                                                            console.log(value2 +  ' es chica no se muestra');
                                                                            value0 = '';
                                                                            value2 = '';
                                                                        } else {
//                                                                            console.log(value2 +  ' es chica');
                                                                        }

                                                                    }
                                                                    return value0 + value2 + 'M';
                                                                },

                                                            },
                                                            highlight: true,
                                                            tooltip: {
                                                                trackMouse: true,
                                                                height: 28,
                                                                renderer: function (toolTip, record, ctx) {
                                                                    var label = '';
                                                                    if (ctx.field === 'strFormatDate') {
                                                                        label = 'Total';
                                                                    } else {
                                                                        label = '';
                                                                    }
                                                                    toolTip.setHtml(record.get('TOOLTIP'));
                                                                    toolTip.setHtml(label + 'Total Amount: ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + ' USD' + '</b>');
                                                                }
                                                            }
                                                        }]
                                                },
                                                {
                                                    xtype: 'grid',
                                                    id: prototype.id + '-gridData_boxChartFlown',
                                                    width: 550,
                                                    height: 373, //403
                                                    columnLines: true,
                                                    margin: "5 0 0 0",
                                                    border: false,
                                                    bodyStyle: 'background-color: #E3EAEF;',
//                                            features: [{
//                                                    ftype: 'summary'
//                                                }],
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
                                                                                }
                                                                            },
                                                                            {text: 'Value', dataIndex: 'VCPN_J', width: 60,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "background:#deedfb;text-align:right";
                                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
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
                                                                                }
                                                                            },
                                                                            {text: 'Value', dataIndex: 'VCPN_Y', width: 90,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "background:#d5f4d5;text-align:right";
                                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                },
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
                                                                                }
                                                                            },
                                                                            {text: 'Value', dataIndex: 'VCPN', width: 90,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "background:#fcf9ec;text-align:right";
                                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
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
                                // Grafic - Hori-gami
                                {
                                    xtype: 'panel',
                                    border: false,
                                    margin: '5 0 5 90',
                                    hidden: true,
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    bodyStyle: 'background-color: transparent;',
                                    items: [
                                        {
                                            xtype: 'radiogroup',
                                            hidden: true,
                                            id: prototype.id + '-radiogroupType_Fo',
                                            width: 180,
                                            items: [
                                                {boxLabel: '<b style="color:#148D28;">Coupons</b>', inputValue: 'C', name: 'rbgType_Fo', checked: true},
                                                {boxLabel: '<b style="color:#148D28;">Amount</b>', inputValue: 'A', name: 'rbgType_Fo'},
                                            ],
                                            listeners: {
                                                change: 'rbChangeType_Fo'
                                            }
                                        },
                                        {
                                            xtype: 'cartesian',
                                            id: prototype.id + '-displayFOChartC',
                                            border: false,
                                            width: 1400,
                                            height: 350,
                                            background: '#E0F8F7',
                                            captions: {
                                                title: {
                                                    text: 'Flown by Cabin - Coupons',
                                                    alignTo: 'chart'
                                                }
                                            },
                                            animation: {
                                                duration: 200
                                            },
                                            interactions: ['itemhighlight'],
                                            legend: {
                                                text: 'Cabins',
//                                        docked: 'bottom',
                                                background: '#E3EAEF'
                                            },
                                            axes: [
                                                {
                                                    type: 'numeric3d',
                                                    position: 'left',
                                                    fields: ['QTYPAX_J', 'QTYPAX_Y', 'QTYPAX'],
                                                    minimum: 0,
                                                    grid: true,
                                                    title: '',
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
                                                },
                                                {
                                                    type: 'numeric3d',
                                                    position: 'left',
                                                    fields: 'strFormatDate',
                                                    minimum: 0,
                                                    grid: true,
                                                    title: '',
                                                    renderer: function (obj, value) {
                                                        if (value > 1) {
                                                            if ((value / 1000).toString().length > 3) {
                                                                return  ' ' + Ext.util.Format.number((value / 1000000), '') + 'M';
                                                            } else {
                                                                return  ' ' + Ext.util.Format.number((value / 1000), '') + 'K';
                                                            }
                                                        } else {
                                                            return '';
                                                        }
                                                    }
                                                },
                                                , {
                                                    type: 'category3d',
                                                    //position: 'bottom',
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
                                                    xField: 'strFormatDate',
                                                    yField: ['QTYPAX_J', 'QTYPAX_Y', 'QTYPAX'],
                                                    title: ['Business', 'Economy', 'Total'],
                                                    colors: ['#d6d9d4', '#209938', '#1c50c9'],
                                                    highlight: true,
                                                    style: {
                                                        inGroupGapWidth: -7,
                                                        minGapWidth: 2,
                                                        maxBarWidth: 1200
                                                    },
                                                    label: {
                                                        field: ['QTYPAX_J', 'QTYPAX_Y', 'QTYPAX'],
                                                        renderer: function (value, b, callout) {
                                                            callout.calloutVertical = false;
                                                            return ''
                                                        }
                                                    },
                                                    tooltip: {
                                                        trackMouse: true,
                                                        height: 28,
                                                        renderer: function (toolTip, record, ctx) {
                                                            var label = '';
                                                            if (ctx.field === 'QTYPAX_J') {
                                                                label = 'Business';
                                                            } else if (ctx.field === 'QTYPAX_Y') {
                                                                label = 'Economy';
                                                            } else if (ctx.field === 'QTYPAX') {
                                                                label = 'Total';
                                                            }
                                                            toolTip.setHtml(label + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
                                                        }
                                                    },
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'cartesian',
                                            id: prototype.id + '-displayFOChartA',
                                            border: false,
                                            width: 1400,
                                            hidden: true,
                                            height: 350,
                                            background: '#E0F8F7',
                                            captions: {
                                                title: {
                                                    text: 'Flown by Cabin - Amount USD',
                                                    alignTo: 'chart'
                                                }
                                            },
                                            animation: {
                                                duration: 200
                                            },
                                            interactions: ['itemhighlight'],
                                            legend: {
                                                text: 'Cabins',
//                                        docked: 'bottom',
                                                background: '#E3EAEF'
                                            },
                                            axes: [
                                                {
                                                    type: 'numeric3d',
                                                    position: 'left',
                                                    fields: ['VCPN_J', 'VCPN_Y', 'VCPN'],
                                                    minimum: 0,
                                                    grid: true,
                                                    title: '',
                                                    renderer: function (obj, value) {
                                                        if (value > 1) {
                                                            if ((value / 1000).toString().length > 3) {
                                                                return  ' ' + Ext.util.Format.number((value / 1000000), '') + 'M';
                                                            } else {
                                                                return  ' ' + Ext.util.Format.number((value / 1000), '') + 'K';
                                                            }
                                                        } else {
                                                            return '';
                                                        }
                                                    }
                                                },
                                                {
                                                    type: 'numeric3d',
                                                    position: 'left',
                                                    fields: 'strFormatDate',
                                                    minimum: 0,
                                                    grid: true,
                                                    title: '',
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
                                                },
                                                , {
                                                    type: 'category3d',
                                                    //position: 'bottom',
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
                                                    xField: 'strFormatDate',
                                                    yField: ['VCPN_J', 'VCPN_Y', 'VCPN'],
                                                    title: ['Business', 'Economy', 'Total'],
                                                    colors: ['#d6d9d4', '#209938', '#1c50c9'],
                                                    highlight: true,
                                                    style: {
                                                        inGroupGapWidth: -7,
                                                        minGapWidth: 2,
                                                        maxBarWidth: 1200
                                                    },
                                                    label: {
                                                        field: ['VCPN_J', 'VCPN_Y', 'VCPN'],
                                                        renderer: function (value, b, callout) {
                                                            callout.calloutVertical = false;
                                                            return ''
                                                        }
                                                    },
                                                    tooltip: {
                                                        trackMouse: true,
                                                        height: 28,
                                                        renderer: function (toolTip, record, ctx) {
                                                            var label = '';
                                                            if (ctx.field === 'VCPN_J') {
                                                                label = 'Business';
                                                            } else if (ctx.field === 'VCPN_Y') {
                                                                label = 'Economy';
                                                            } else if (ctx.field === 'VCPN') {
                                                                label = 'Total';
                                                            }
                                                            toolTip.setHtml(label + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
                                                        }
                                                    },
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxSal_TotalF22',
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
                                    id: prototype.id + '-displayFOChartP2',
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
//                                    legend: {
//                                        docked: 'bottom',
//                                        background: '#E0F8F7'
//                                    },
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
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxSal_TotalF1NF',
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
                            id: prototype.id + '-boxSal_TotalF2NF',
                            margin: '0 0 0 0',
                            border: false,
                            layout: {
                                type: 'vbox',
                                pack: 'center'
                            },
                            bodyStyle: 'background-color: transparent;',
                            items: [
                                // Grilla boxChartFlown %% 2 Grafic Vert
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-boxChartFlownBNF',
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
                                                    id: prototype.id + '-displayFOChartPBNF',
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
//                                            legend: {
//                                                docked: 'bottom',
//                                                background: '#E3EAEF',
//                                            },
                                                    series: [{
                                                            type: 'pie3d',
                                                            angleField: 'AngleBNF',
                                                            colors: ['#0071c1', '#93d250'],
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
                                                    id: prototype.id + '-gridData_boxChartFlownBNF',
                                                    width: 630,
                                                    height: 373, //403
                                                    columnLines: true,
                                                    margin: "5 0 0 0",
                                                    border: false,
                                                    bodyStyle: 'background-color: #E3EAEF;',
//                                            features: [{
//                                                    ftype: 'summary'
//                                                }],
                                                    columns: {
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        items: [
//                                                            {
//                                                                text: 'Flight',
//                                                                defaults: {
//                                                                    menuDisabled: true, sortable: false, align: 'center'
//                                                                },
//                                                                columns: [
//                                                                    {text: 'Date', dataIndex: 'strFormatDateB', width: 80,
//                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                            metaData.style = "text-align:center";
//                                                                            return value;
//                                                                        }
//                                                                    }
//                                                                ]
//                                                            },
                                                            {text: 'Date', dataIndex: 'strFormatDateB', width: 80,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:center";
                                                                            return value;
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
                                                                                }
                                                                            },
                                                                            {text: 'Value', dataIndex: 'VCPNOALB', width: 90,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "background:#deedfb;text-align:right";
                                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
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
                                                                                }
                                                                            },
                                                                            {text: 'Value', dataIndex: 'VCPNONB', width: 90,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "background:#d5f4d5;text-align:right";
                                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                },
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
                                                                                }
                                                                            },
                                                                            {text: 'Value', dataIndex: 'VCPNNFB', width: 90,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "background:#fcf9ec;text-align:right";
                                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
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
                                    id: prototype.id + '-boxChartFlownNF',
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
                                                    id: prototype.id + '-displayFOChartPNF',
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
//                                            legend: {
//                                                docked: 'bottom',
//                                                background: '#E3EAEF',
//                                            },
                                                    series: [{
                                                            type: 'pie3d',
                                                            angleField: 'AngleNF',
                                                            colors: ['#0071c1', '#93d250'],
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
                                                    id: prototype.id + '-gridData_boxChartFlownNF',
                                                    width: 630,
                                                    height: 373, //403
                                                    columnLines: true,
                                                    margin: "5 0 0 0",
                                                    border: false,
                                                    bodyStyle: 'background-color: #E3EAEF;',
//                                            features: [{
//                                                    ftype: 'summary'
//                                                }],
                                                    columns: {
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        items: [
//                                                            {
//                                                                text: 'Flight',
//                                                                defaults: {
//                                                                    menuDisabled: true, sortable: false, align: 'center'
//                                                                },
//                                                                columns: [
//                                                                    {text: 'Date', dataIndex: 'strFormatDate', width: 80,
//                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                                            metaData.style = "text-align:center";
//                                                                            return value;
//                                                                        }
//                                                                    }
//                                                                ]
//                                                            },
                                                            {text: 'Date', dataIndex: 'strFormatDate', width: 80,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:center";
                                                                            return value;
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
                                                                                }
                                                                            },
                                                                            {text: 'Value', dataIndex: 'VCPNOAL', width: 90,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "background:#deedfb;text-align:right";
                                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
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
                                                                                }
                                                                            },
                                                                            {text: 'Value', dataIndex: 'VCPNON', width: 90,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "background:#d5f4d5;text-align:right";
                                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                                },
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
                                                                                }
                                                                            },
                                                                            {text: 'Value', dataIndex: 'VCPNNF', width: 90,
                                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                                    metaData.style = "background:#fcf9ec;text-align:right";
                                                                                    return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
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
                                // Grafic - Hori-gami
                                {
                                    xtype: 'panel',
                                    border: false,
                                    margin: '5 0 5 90',
                                    hidden: true,
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    bodyStyle: 'background-color: transparent;',
                                    items: [
                                        {
                                            xtype: 'radiogroup',
                                            hidden: true,
                                            id: prototype.id + '-radiogroupType_FoNF',
                                            width: 180,
                                            items: [
                                                {boxLabel: '<b style="color:#148D28;">Coupons</b>', inputValue: 'C', name: 'rbgType_Fo', checked: true},
                                                {boxLabel: '<b style="color:#148D28;">Amount</b>', inputValue: 'A', name: 'rbgType_Fo'},
                                            ],
                                            listeners: {
                                                change: 'rbChangeType_Fo'
                                            }
                                        },
                                        {
                                            xtype: 'cartesian',
                                            id: prototype.id + '-displayFOChartCNF',
                                            border: false,
                                            width: 1400,
                                            height: 350,
                                            background: '#E0F8F7',
                                            captions: {
                                                title: {
                                                    text: 'Flown by Cabin - Coupons',
                                                    alignTo: 'chart'
                                                }
                                            },
                                            animation: {
                                                duration: 200
                                            },
                                            interactions: ['itemhighlight'],
                                            legend: {
                                                text: 'Cabins',
//                                        docked: 'bottom',
                                                background: '#E3EAEF'
                                            },
                                            axes: [
                                                {
                                                    type: 'numeric3d',
                                                    position: 'left',
                                                    fields: ['QTYPAX_J', 'QTYPAX_Y', 'QTYPAX'],
                                                    minimum: 0,
                                                    grid: true,
                                                    title: '',
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
                                                },
                                                {
                                                    type: 'numeric3d',
                                                    position: 'left',
                                                    fields: 'strFormatDate',
                                                    minimum: 0,
                                                    grid: true,
                                                    title: '',
                                                    renderer: function (obj, value) {
                                                        if (value > 1) {
                                                            if ((value / 1000).toString().length > 3) {
                                                                return  ' ' + Ext.util.Format.number((value / 1000000), '') + 'M';
                                                            } else {
                                                                return  ' ' + Ext.util.Format.number((value / 1000), '') + 'K';
                                                            }
                                                        } else {
                                                            return '';
                                                        }
                                                    }
                                                },
                                                , {
                                                    type: 'category3d',
                                                    //position: 'bottom',
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
                                                    xField: 'strFormatDate',
                                                    yField: ['QTYPAX_J', 'QTYPAX_Y', 'QTYPAX'],
                                                    title: ['Business', 'Economy', 'Total'],
                                                    colors: ['#d6d9d4', '#209938', '#1c50c9'],
                                                    highlight: true,
                                                    style: {
                                                        inGroupGapWidth: -7,
                                                        minGapWidth: 2,
                                                        maxBarWidth: 1200
                                                    },
                                                    label: {
                                                        field: ['QTYPAX_J', 'QTYPAX_Y', 'QTYPAX'],
                                                        renderer: function (value, b, callout) {
                                                            callout.calloutVertical = false;
                                                            return ''
                                                        }
                                                    },
                                                    tooltip: {
                                                        trackMouse: true,
                                                        height: 28,
                                                        renderer: function (toolTip, record, ctx) {
                                                            var label = '';
                                                            if (ctx.field === 'QTYPAX_J') {
                                                                label = 'Business';
                                                            } else if (ctx.field === 'QTYPAX_Y') {
                                                                label = 'Economy';
                                                            } else if (ctx.field === 'QTYPAX') {
                                                                label = 'Total';
                                                            }
                                                            toolTip.setHtml(label + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
                                                        }
                                                    },
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'cartesian',
                                            id: prototype.id + '-displayFOChartANF',
                                            border: false,
                                            width: 1400,
                                            hidden: true,
                                            height: 350,
                                            background: '#E0F8F7',
                                            captions: {
                                                title: {
                                                    text: 'Flown by Cabin - Amount USD',
                                                    alignTo: 'chart'
                                                }
                                            },
                                            animation: {
                                                duration: 200
                                            },
                                            interactions: ['itemhighlight'],
                                            legend: {
                                                text: 'Cabins',
//                                        docked: 'bottom',
                                                background: '#E3EAEF'
                                            },
                                            axes: [
                                                {
                                                    type: 'numeric3d',
                                                    position: 'left',
                                                    fields: ['VCPN_J', 'VCPN_Y', 'VCPN'],
                                                    minimum: 0,
                                                    grid: true,
                                                    title: '',
                                                    renderer: function (obj, value) {
                                                        if (value > 1) {
                                                            if ((value / 1000).toString().length > 3) {
                                                                return  ' ' + Ext.util.Format.number((value / 1000000), '') + 'M';
                                                            } else {
                                                                return  ' ' + Ext.util.Format.number((value / 1000), '') + 'K';
                                                            }
                                                        } else {
                                                            return '';
                                                        }
                                                    }
                                                },
                                                {
                                                    type: 'numeric3d',
                                                    position: 'left',
                                                    fields: 'strFormatDate',
                                                    minimum: 0,
                                                    grid: true,
                                                    title: '',
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
                                                },
                                                , {
                                                    type: 'category3d',
                                                    //position: 'bottom',
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
                                                    xField: 'strFormatDate',
                                                    yField: ['VCPN_J', 'VCPN_Y', 'VCPN'],
                                                    title: ['Business', 'Economy', 'Total'],
                                                    colors: ['#d6d9d4', '#209938', '#1c50c9'],
                                                    highlight: true,
                                                    style: {
                                                        inGroupGapWidth: -7,
                                                        minGapWidth: 2,
                                                        maxBarWidth: 1200
                                                    },
                                                    label: {
                                                        field: ['VCPN_J', 'VCPN_Y', 'VCPN'],
                                                        renderer: function (value, b, callout) {
                                                            callout.calloutVertical = false;
                                                            return ''
                                                        }
                                                    },
                                                    tooltip: {
                                                        trackMouse: true,
                                                        height: 28,
                                                        renderer: function (toolTip, record, ctx) {
                                                            var label = '';
                                                            if (ctx.field === 'VCPN_J') {
                                                                label = 'Business';
                                                            } else if (ctx.field === 'VCPN_Y') {
                                                                label = 'Economy';
                                                            } else if (ctx.field === 'VCPN') {
                                                                label = 'Total';
                                                            }
                                                            toolTip.setHtml(label + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
                                                        }
                                                    },
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxSal_TotalF22NF',
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
                                    id: prototype.id + '-displayFOChartP2NF',
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
//                                    legend: {
//                                        docked: 'bottom',
//                                        background: '#E0F8F7'
//                                    },
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
                }
            ]
        }
    ]
});