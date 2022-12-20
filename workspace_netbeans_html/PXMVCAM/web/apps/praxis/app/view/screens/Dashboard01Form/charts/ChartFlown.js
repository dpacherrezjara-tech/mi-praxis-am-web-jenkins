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
//                                            bodyStyle: 'background-color: transparent;',
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
                                    width: 1060,
                                    bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
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
                                            ],
//                                            listeners: {
//                                                change: 'chooseChart_clickHandler'
//                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'toolbar',
                                    padding: '4px 7px 4px 20px',
                                    width: 80,
                                    items: [
//                                        {
//                                            xtype: 'button',
//                                            id: prototype.id + '-btnSearch_chartFlown',
//                                            iconCls: 'prx-icon-search',
//                                            tooltip: 'Search',
//                                            listeners: {
//                                                click: 'onClickSearch'
//                                            }
//                                        },
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
                    id: prototype.id + '-boxSal_TotalF',
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
                            id: prototype.id + '-boxChartFlown',
                            border: false,
                            margin: '5 0 5 400',
                            layout: {
                                type: 'vbox',
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
                                        pack: 'center'
                                    },
                                    bodyStyle: 'background-color: transparent;',
                                    items: [
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridData_boxChartFlown',
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
                                                                    {text: 'Pax', dataIndex: 'QTYPAX_J', width: 90,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "background:#deedfb;text-align:right";
                                                                            return '<b>' + Ext.util.Format.number(value, '0,000') + '</b>';
                                                                        }
                                                                    },
                                                                    {text: 'Value', dataIndex: 'VCPN_J', width: 90,
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
                                }
                            ]
                        },
                        // Grafic - Hori-gami
                        {
                            xtype: 'panel',
//                            id: prototype.id + '-boxChart1_2',
                            border: false,
                            margin: '5 0 5 20',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            bodyStyle: 'background-color: transparent;',
                            items: [
                                {
                                    xtype: 'radiogroup',
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
                                            text: 'Sales per Cabin - Coupons',
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
                                            fields: ['QTYPAX_J', 'QTYPAX_Y'],
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
                                            position: 'right',
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
                                            yField: ['QTYPAX_J', 'QTYPAX_Y'],
                                            title: ['Business', 'Economy'],
                                            colors: ['#d6d9d4', '#209938'],
                                            highlight: true,
                                            style: {
                                                inGroupGapWidth: -7,
                                                minGapWidth: 2,
                                                maxBarWidth: 1200
                                            },
                                            label: {
                                                field: ['QTYPAX_J', 'QTYPAX_Y'],
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
                                                    }
                                                    toolTip.setHtml(label + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
                                                }
                                            },
                                        },
                                        {
                                            type: 'line',
                                            stacked: true,
                                            xField: 'strFormatDate',
                                            yField: 'QTYPAX',
                                            colors: ['#1c50c9'],
                                            title: ['Total Pax'],
                                            style: {
                                                fill: '#fff',
                                                stroke: '#1c50c9',
                                                lineWidth: 2
                                            },
                                            marker: {
                                                radius: 4,
                                                lineWidth: 2
                                            },
                                            label: {
                                                field: 'QTYPAX',
//                                                display: 'over',
                                                renderer: function (value, b, callout) {
//                                                    callout.calloutVertical = false;
                                                    return ''
                                                }
                                            },
                                            markerConfig: {
                                                radius: 20
                                            },
                                            highlight: {
                                                fill: '#1c50c9',
                                                radius: 8,
                                                'stroke-width': 2,
                                                stroke: '#fff'
                                            },
                                            tooltip: {
                                                trackMouse: true,
                                                style: 'background: #FFF',
                                                height: 28,
                                                showDelay: 0,
                                                dismissDelay: 0,
                                                hideDelay: 0,
                                                renderer: function (toolTip, record, ctx) {
                                                    toolTip.setHtml('Total Pax : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
                                                }
                                            }
                                        }
                                        
                                    ]
                                },
                                {
                                    xtype: 'cartesian',
                                    id: prototype.id + '-displayFOChartA',
                                    border: false,
                                    width: 1300,
                                    height: 350,
                                    hidden: true,
                                    background: '#E0F8F7',
                                    captions: {
                                        title: {
                                            text: 'Sales per Cabin - Amount USD',
                                            alignTo: 'chart'
                                        }
                                    },
                                    animation: {
                                        duration: 200
                                    },
                                    interactions: ['itemhighlight'],
                                    legend: {
                                        text:'Cabins',
                                        docked: 'bottom',
                                        background: '#E3EAEF'
                                    },
                                    axes: [
                                        {
                                            type: 'numeric3d',
                                            position: 'left',
                                            fields: ['VCPN_J', 'VCPN_Y'],
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
                                            position: 'right',
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
                                            xField: 'strFormatDate',
                                            yField: ['VCPN_J', 'VCPN_Y'],
                                            title: ['Business', 'Economy'],
                                            colors: ['#d6d9d4', '#209938'],
                                            highlight: true,
                                            style: {
                                                inGroupGapWidth: -7,
                                                minGapWidth: 2,
                                                maxBarWidth: 1200
                                            },
                                            label: {
                                                field: ['VCPN_J', 'VCPN_Y'],
                                                renderer: function (value, b, callout) {
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
                                                    }
                                                    toolTip.setHtml(label + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
                                                }
                                            }
                                        },
                                        {
                                            type: 'line',
                                            stacked: true,
                                            xField: 'strFormatDate',
                                            yField: 'VCPN',
                                            colors: ['#1c50c9'],
                                            title: ['Total Value'],
                                            style: {
                                                fill: '#fff',
                                                stroke: '#1c50c9',
                                                lineWidth: 2
                                            },
                                            marker: {
                                                radius: 4,
                                                lineWidth: 2
                                            },
                                            label: {
                                                field: 'VCPN',
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
                                                fill: '#1c50c9',
                                                radius: 8,
                                                'stroke-width': 2,
                                                stroke: '#fff'
                                            },
                                            tooltip: {
                                                trackMouse: true,
                                                style: 'background: #FFF',
                                                height: 28,
                                                showDelay: 0,
                                                dismissDelay: 0,
                                                hideDelay: 0,
                                                renderer: function (toolTip, record, ctx) {
                                                    toolTip.setHtml('Total Value : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
                                                }
                                            },
                                            //renderer: 'onColumnRender'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});