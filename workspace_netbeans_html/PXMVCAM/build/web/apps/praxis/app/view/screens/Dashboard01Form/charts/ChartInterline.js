Ext.define('Ext.Praxis.view.screens.Dashboard01Form.charts.ChartInterline', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-chartInterline',
    requires: [
        'Ext.Praxis.controller.screens.Dashboard01.charts.ChartInterlineController'
    ],
    controller: 'ChartInterlineController',

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
                /**
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
                                    width: 400,
                                    bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                                    border: true,
                                    layout: 'column',
                                    defaults: {
                                        labelStyle: 'font-weight:bold;',
                                        fieldStyle: 'text-align: center;',
                                        padding: '4px 7px 4px 10px',
                                        anchor: '100%'
                                    },
                                    items: [
                                        {
                                            xtype: 'radiogroup',
                                            id: prototype.id + '-rbChart_IA',
                                            fieldLabel: '',
                                            horizontal: true,
                                            items: [
//                                                {boxLabel: '<strong >Month</strong>', name: 'rb', inputValue: 'rbc1_IA', width: 120, checked: true},[
                                                {boxLabel: '<strong >Month</strong>', name: 'rb', inputValue: 'rbc1_IA', width: 120},
                                                {boxLabel: '<strong >Airline</strong>', name: 'rb', inputValue: 'rbc2_IA', width: 120},
                                                {boxLabel: '<strong >Workp</strong>', name: 'rb', inputValue: 'rbc3_IA', width: 120}
                                            ],
                                            listeners: {
                                                change: 'onChangeRadio'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    width: 760,
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
                                            id: prototype.id + '-cmbDateYear_IA_Chart',
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
                                            id: prototype.id + '-cmbDateMonthFrom_IA_Chart',
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
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbDateMonthTo_IA_Chart',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            editable: false,
                                            valueField: 'code', displayField: 'name',
                                            width: 75,
                                            typeAhead: true,
                                            listConfig: {maxHeight: 111}
                                        },
                                        {xtype: 'tbspacer', width: 4},
                                        {
                                            xtype: 'label',
                                            html: '<b>Billing Airline:</b>',
                                            fieldStyle: 'text-align: center;'
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbAirline_INT2',
                                            labelAlign: 'right',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            editable: true,
                                            enableKeyEvents: true,
                                            caseSensitive: false,
                                            valueField: 'A005KEY', displayField: 'A005KEY2',
                                            width: 280,
                                            listeners: {
                                            }
                                        },
                                    ]
                                },
                                {
                                    xtype: 'toolbar',
                                    padding: '4px 7px 4px 10px',
                                    width: 80,
                                    items: [
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btnSearch_chartInter',
                                            iconCls: 'prx-icon-search',
                                            tooltip: 'Search',
                                            listeners: {
                                                click: 'onClickSearch'
                                            }

                                        },

                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btnBack_chartInter',
                                            iconCls: 'prx-icon-back',
                                            tooltip: 'Back'

                                        }
                                    ]
                                }
                            ]
                        }

                    ]
                },
                /**
                 * PANEL DE GRILLA Y GRAFICOS - MONTH
                 * */
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxInt_Month',
                    margin: '0 0 0 0',
                    border: false,
                    layout: {
                        type: 'vbox',
                        pack: 'center'
                    },
                    bodyStyle: 'background-color: transparent;',
                    items: [
                        // By MONTH
                        {
                            xtype: 'panel',
                            border: false,
                            margin: '5 0 5 0',
                            layout: {
                                type: 'hbox',
                                align: 'center'
                            },
                            bodyStyle: 'background-color: transparent;',
                            items: [
                                {xtype: 'tbspacer', width: 700},
                                {
                                    xtype: 'checkboxfield',
                                    id: prototype.id + '-chkMonth',
                                    margin: '0 5 0 5',
                                    labelStyle: 'color:#378BCC;font-weight:bold;',
                                    width: 100,
                                    boxLabel: 'Total',
                                    inputValue: '1',
                                    listeners: {
                                        change: 'onChangeCKTotal'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-byMonth_01',
                            border: false,
                            margin: '5 0 5 0',
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
                                            id: prototype.id + '-gridData_INT',
                                            width: 703,
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
                                                    {text: 'Billing <br> Date', dataIndex: 'strDescripcion', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "";
                                                            value = '<b>' + value + '</b>';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: ' Outgoing Prime ',
                                                        defaults: {
                                                            menuDisabled: true, sortable: false, align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Coupons', dataIndex: 'QTY', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "background:#99CCFF;text-align:right";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData_INT').getStore().getData().items[0].data;

                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQTY, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'Curr', dataIndex: 'strDescripcion5', width: 50,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "background:#99CCFF;text-align:center";
                                                                    return value;
                                                                }
                                                            },
                                                            {text: 'Gross', dataIndex: 'A050ACEPTA', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "background:#99CCFF;text-align:right";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData_INT').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totA050ACEPTA, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'Isc', dataIndex: 'A050COMISI', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "background:#99CCFF;text-align:right";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData_INT').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totA050COMISI, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'Tax', dataIndex: 'A050TUA', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "background:#99CCFF;text-align:right";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData_INT').getStore().getData().items[0].data;

                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totA050TUA, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'Net', dataIndex: 'A050NETO', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "background:#E1FFE1;text-align:right";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData_INT').getStore().getData().items[0].data;

                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totA050TUA, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: '%', dataIndex: 'Perc1', width: 50,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "background:#E1FFE1;text-align:right";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                }

                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background-color: #E3EAF9;',
                                            padding: '5 0 0 20',
                                            width: 800,
                                            height: 400,
                                            border: false,
                                            layout: {
                                                type: 'vbox'
                                            },
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
                                                            xtype: 'radiogroup',
                                                            id: prototype.id + '-rbChart1_IA',
                                                            fieldLabel: '',
                                                            horizontal: true,
                                                            items: [
                                                                {boxLabel: '<strong >Coupons</strong>', name: 'rb2', inputValue: 'rbcC_IA', width: 100, checked: true},
                                                                {boxLabel: '<strong >Amount</strong>', name: 'rb2', inputValue: 'rbcG_IA', width: 100}
                                                            ],
                                                            listeners: {
                                                                change: 'onChangeChart_IA_01'
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'cartesian',
                                                    id: prototype.id + '-ChtSalesAnalysis_IA_01_C',
                                                    width: 780,
                                                    height: 380,
                                                    background: '#E3EAF9',
                                                    captions: {
                                                        title: {text: 'Coupons by Month - Prime', alignTo: 'chart'}
                                                    },
                                                    animation: {duration: 200},
                                                    interactions: ['itemhighlight'],
                                                    axes: [
                                                        {
                                                            type: 'numeric3d',
                                                            position: 'left',
                                                            yField: ['QTY'],
                                                            grid: true,
                                                            title: '',
                                                            renderer: function (obj, value) {
                                                                if (value > 1) {
                                                                    return  Ext.util.Format.number((value / 1000), '0.0') + 'K';
                                                                } else {
                                                                    return '';
                                                                }
                                                            }
                                                        },
                                                        {
                                                            type: 'category3d',
                                                            position: 'bottom',
                                                            fields: 'strDescripcion',
                                                            grid: true,
//                                                            title: {
//                                                                text: 'Date',
//                                                                translationX: -30
//                                                            }
                                                            label: {
                                                                rotate: {
                                                                    degrees: -45
                                                                }
                                                            }
                                                        }
                                                    ],
                                                    series: [{
                                                            type: 'bar3d',
                                                            stacked: false,
                                                            title: [''],
                                                            colors: ['#38A0F0', ],
                                                            xField: 'strDescripcion',
                                                            yField: ['QTY'],
                                                            highlight: true,
                                                            style: {
                                                                inGroupGapWidth: -7
                                                            },
                                                            tooltip: {
                                                                trackMouse: true,
                                                                height: 28,
                                                                renderer: function (toolTip, record, ctx) {

                                                                    toolTip.setHtml(record.get('strDescripcion') + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + '</b>');
                                                                }
                                                            },
                                                            renderer: 'onColumnRender'
                                                        }

                                                    ]
                                                },
                                                {
                                                    xtype: 'cartesian',
                                                    hidden: true,
                                                    id: prototype.id + '-ChtSalesAnalysis_IA_01_A',
                                                    width: 780,
                                                    height: 380,
                                                    background: '#E3EAF9',
                                                    captions: {
                                                        title: {text: 'Amount by Month - Prime', alignTo: 'chart'}
                                                    },
                                                    animation: {duration: 200},
                                                    interactions: ['itemhighlight'],
                                                    axes: [{
                                                            type: 'numeric3d',
                                                            position: 'left',
                                                            yField: ['A050NETO'],
                                                            grid: true,
                                                            title: '',
                                                            renderer: function (obj, value) {
                                                                if (value > 1) {
                                                                    return  Ext.util.Format.number((value / 1000), '0.0') + 'K';
                                                                } else {
                                                                    return '';
                                                                }
                                                            }
                                                        }, {
                                                            type: 'category3d',
                                                            position: 'bottom',
                                                            fields: 'strDescripcion',
                                                            grid: true,
//                                                            title: {
//                                                                text: '',
//                                                                translationX: -30
//                                                            }
                                                            label: {
                                                                rotate: {
                                                                    degrees: -45
                                                                }
                                                            }
                                                        }],
                                                    series: [{
                                                            type: 'bar3d',
                                                            stacked: false,
                                                            title: [''],
                                                            colors: ['#38A0F0', ],
                                                            xField: 'strDescripcion',
                                                            yField: ['A050NETO'],
                                                            highlight: true,
                                                            style: {
                                                                inGroupGapWidth: -7
                                                            },
                                                            tooltip: {
                                                                trackMouse: true,
                                                                height: 28,
                                                                renderer: function (toolTip, record, ctx) {

                                                                    toolTip.setHtml(record.get('strDescripcion') + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + '</b>');
                                                                }
                                                            },
                                                            renderer: 'onColumnRender'
                                                        }]
                                                }
                                            ]
                                        },
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    margin: '5 0 5 0',
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    bodyStyle: 'background-color: transparent;',
                                    items: [
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridData_INT2',
                                            width: 703,
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
                                                    {text: 'Billing <br> Date', dataIndex: 'strDescripcion', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "";
                                                            value = '<b>' + value + '</b>';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: ' Outgoing Reject ',
                                                        defaults: {
                                                            menuDisabled: true, sortable: false, align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Documents', dataIndex: 'QTY2', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "background:#FFCCCC;text-align:right";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData_INT2').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totQTY2, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'Curr', dataIndex: 'strDescripcion5', width: 50,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "background:#FFCCCC;text-align:center";
                                                                    return value;
                                                                }
                                                            },
                                                            {text: 'Gross', dataIndex: 'A050ACEPTA2', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "background:#FFCCCC;text-align:right";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData_INT2').getStore().getData().items[0].data;

                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totA050ACEPTA2, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'Isc', dataIndex: 'A050COMISI2', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "background:#FFCCCC;text-align:right";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData_INT2').getStore().getData().items[0].data;

                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totA050COMISI2, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'Tax', dataIndex: 'A050TUA2', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "background:#FFCCCC;text-align:right";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData_INT2').getStore().getData().items[0].data;

                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totA050TUA2, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'Net', dataIndex: 'A050NETO2', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "background:#E1FFE1;text-align:right";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridData_INT2').getStore().getData().items[0].data;

                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totA050TUA2, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: '%', dataIndex: 'Perc2', width: 50,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "background:#E1FFE1;text-align:right";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                }

                                                            },
                                                        ]
                                                    },
                                                ]
                                            }
                                        },
                                        {
                                            xtype: 'panel',
                                            bodyStyle: 'background-color: #E3EAF9;',
                                            padding: '5 0 0 20',
                                            width: 800,
                                            height: 400,
                                            border: false,
                                            layout: {
                                                type: 'vbox'
                                            },
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
                                                            xtype: 'radiogroup',
                                                            id: prototype.id + '-rbChart2_IA',
                                                            fieldLabel: '',
                                                            horizontal: true,
                                                            items: [
                                                                {boxLabel: '<strong >Documents</strong>', name: 'rb3', inputValue: 'rbcD_IA2', width: 100, checked: true},
                                                                {boxLabel: '<strong >Amount</strong>', name: 'rb3', inputValue: 'rbcA_IA2', width: 100}
                                                            ],
                                                            listeners: {
                                                                change: 'onChangeChart_IA_02'
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'cartesian',
                                                    id: prototype.id + '-ChtSalesAnalysis_IA_02_D',
                                                    width: 800,
                                                    height: 400,
                                                    background: '#E3EAF9',
                                                    captions: {
                                                        title: {
                                                            text: 'Documents by Month - Reject',
                                                            alignTo: 'chart'
                                                        }
                                                    },
                                                    animation: {
                                                        duration: 200
                                                    },
                                                    interactions: ['itemhighlight'],
//                                            legend: {
//                                                background: '#E3EAF9',
//                                                //type: 'dom',
//                                                docked: 'bottom'
//                                            },
                                                    axes: [{
                                                            type: 'numeric3d',
                                                            position: 'left',
                                                            yField: ['QTY2'],
                                                            grid: true,
                                                            title: '',

                                                            renderer: function (obj, value) {
                                                                if (value > 1) {
                                                                    return  Ext.util.Format.number((value / 1000), '0.0') + 'K';
                                                                } else {
                                                                    return '';
                                                                }
                                                            }
                                                        }, {
                                                            type: 'category3d',
                                                            position: 'bottom',
                                                            fields: 'strDescripcion',
                                                            grid: true,
//                                                            title: {
//                                                                text: 'Date',
//                                                                translationX: -30
//                                                            }
                                                            label: {
                                                                rotate: {
                                                                    degrees: -45
                                                                }
                                                            }
                                                        }],
                                                    series: [{
                                                            type: 'bar3d',
                                                            stacked: false,
                                                            title: ['Amount'],
                                                            colors: ['#A3F36B', ],
                                                            xField: 'strDescripcion',
                                                            yField: ['QTY2'],
                                                            highlight: true,
                                                            style: {
                                                                inGroupGapWidth: -7
                                                            },
                                                            tooltip: {
                                                                trackMouse: true,
                                                                height: 28,
                                                                renderer: function (toolTip, record, ctx) {
                                                                    var label = '';
                                                                    if (ctx.field === 'QTY2') {
                                                                        label = 'Amount';
                                                                    }
                                                                    toolTip.setHtml(label + ' -  ' + record.get('strDescripcion') + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + '</b>');
                                                                }
                                                            },
                                                            renderer: 'onColumnRender'
                                                        }]
                                                },
                                                {
                                                    xtype: 'cartesian',
                                                    id: prototype.id + '-ChtSalesAnalysis_IA_02_A',
                                                    width: 800,
                                                    height: 400,
                                                    background: '#E3EAF9',
                                                    captions: {
                                                        title: {
                                                            text: 'Amount by Month - Reject',
                                                            alignTo: 'chart'
                                                        }
                                                    },
                                                    animation: {
                                                        duration: 200
                                                    },
                                                    interactions: ['itemhighlight'],
//                                            legend: {
//                                                background: '#E3EAF9',
//                                                //type: 'dom',
//                                                docked: 'bottom'
//                                            },
                                                    axes: [{
                                                            type: 'numeric3d',
                                                            position: 'left',
                                                            yField: ['A050NETO2'],
                                                            grid: true,
                                                            title: '',

                                                            renderer: function (obj, value) {
                                                                if (value > 1) {
                                                                    return  Ext.util.Format.number((value / 1000), '0.0') + 'K';
                                                                } else {
                                                                    return '';
                                                                }
                                                            }
                                                        }, {
                                                            type: 'category3d',
                                                            position: 'bottom',
                                                            fields: 'strDescripcion',
                                                            grid: true,
//                                                            title: {
//                                                                text: 'Date',
//                                                                translationX: -30
//                                                            }
                                                            label: {
                                                                rotate: {
                                                                    degrees: -45
                                                                }
                                                            }
                                                        }],
                                                    series: [{
                                                            type: 'bar3d',
                                                            stacked: false,
                                                            title: ['Amount'],
                                                            colors: ['#A3F36B', ],
                                                            xField: 'strDescripcion',
                                                            yField: ['A050NETO2'],
                                                            highlight: true,
                                                            style: {
                                                                inGroupGapWidth: -7
                                                            },
                                                            tooltip: {
                                                                trackMouse: true,
                                                                height: 28,
                                                                renderer: function (toolTip, record, ctx) {
                                                                    var label = '';
                                                                    if (ctx.field === 'A050NETO2') {
                                                                        label = 'Amount';
                                                                    }
                                                                    toolTip.setHtml(label + ' -  ' + record.get('strDescripcion') + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + '</b>');
                                                                }
                                                            },
                                                            renderer: 'onColumnRender'
                                                        }]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        // By MONTH - TOTAL
                        {
                            xtype: 'panel',
                            id: prototype.id + '-byMonth_02',
                            hidden: true,
                            margin: '5 0 5 0',
                            border: false,
                            layout: {
                                type: 'vbox',
                                aling: 'center'
                            },
                            bodyStyle: 'background-color: transparent;',
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridData_INT_TOT',
                                    width: 703,
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
                                            {text: 'Billing <br> Date', dataIndex: 'strDescripcion', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "";
                                                    value = '<b>' + value + '</b>';
                                                    return value;
                                                }
                                            },
                                            {text: 'Curr', dataIndex: 'strDescripcion5', width: 50,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background:#99CCFF;text-align:center";
                                                    return value;
                                                }
                                            },
                                            {
                                                text: ' Outgoing  ',
                                                defaults: {
                                                    menuDisabled: true, sortable: false, align: 'center'
                                                },
                                                columns: [

                                                    {text: 'Gross', dataIndex: 'ACEPTA', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#99CCFF;text-align:right";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData_INT_TOT').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totGros_T, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Isc', dataIndex: 'COMISI', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#99CCFF;text-align:right";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData_INT_TOT').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totIsc_T, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Tax', dataIndex: 'TUA', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#99CCFF;text-align:right";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData_INT_TOT').getStore().getData().items[0].data;

                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totTua_T, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Net', dataIndex: 'NETO', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#E1FFE1;text-align:right";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData_INT_TOT').getStore().getData().items[0].data;

                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totNet_T, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: '%', dataIndex: 'Perc3', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background:#E1FFE1;text-align:right";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }

                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background-color: #E3EAF9;',
                                    padding: '5 0 0 20',
                                    width: 700,
                                    height: 400,
                                    border: false,
                                    layout: {
                                        type: 'vbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'cartesian',
                                            id: prototype.id + '-ChtSalesAnalysis_IA_03',
                                            width: 680,
                                            height: 380,
                                            background: '#E3EAF9',
                                            captions: {
                                                title: {text: 'Amount by Month - Reject', alignTo: 'chart'}
                                            },
                                            animation: {duration: 200},
                                            interactions: ['itemhighlight'],
                                            axes: [{
                                                    type: 'numeric3d',
                                                    position: 'left',
                                                    yField: ['ACEPTA'],
                                                    grid: true,
                                                    title: '',
                                                    renderer: function (obj, value) {
                                                        if (value > 1) {
                                                            return  Ext.util.Format.number((value / 1000), '0.0') + 'K';
                                                        } else {
                                                            return '';
                                                        }
                                                    }
                                                }, {
                                                    type: 'category3d',
                                                    position: 'bottom',
                                                    fields: 'strDescripcion',
                                                    grid: true,
//                                                    title: {
//                                                        text: 'Date',
//                                                        translationX: -30
//                                                    }                                                            
                                                    label: {
                                                        rotate: {
                                                            degrees: -45
                                                        }
                                                    }

                                                }],
                                            series: [{
                                                    type: 'bar3d',
                                                    stacked: false,
                                                    title: [''],
                                                    colors: ['#38A0F0', ],
                                                    xField: 'strDescripcion',
                                                    yField: ['ACEPTA'],
                                                    highlight: true,
                                                    style: {
                                                        inGroupGapWidth: -7
                                                    },
                                                    tooltip: {
                                                        trackMouse: true,
                                                        height: 28,
                                                        renderer: function (toolTip, record, ctx) {

                                                            toolTip.setHtml(record.get('strDescripcion') + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000.00') + '</b>');
                                                        }
                                                    },
                                                    renderer: 'onColumnRender'
                                                }]
                                        },
                                    ]
                                }
                            ]
                        }
                    ]
                }
                ,
                /**
                 * PANEL DE GRILLA Y GRAFICOS - AIRLINE
                 * */
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxInt_Airline',
                    margin: '0 0 0 0',
                    hidden: true,
                    border: false,
                    scrollable: true,
                    height: 650,
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    bodyStyle: 'background-color: transparent;',
                    items: [
                        {
                            xtype: 'panel',
                            width: 80,
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
                                    id: prototype.id + '-rbcP',
                                    fieldLabel: '',
                                    height: 50,
                                    columns: 1,
                                    vertical: true,
                                    items: [
                                        {boxLabel: '<strong >Prime</strong>', name: 'rb01', inputValue: 'Prime', width: 100, checked: true},
                                        {boxLabel: '<strong >Reject</strong>', name: 'rb01', inputValue: 'Reject', width: 100}

                                    ],
                                    listeners: {
                                        change: 'onChangeRadioAirline'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridDataAIR_P_INT',
                            width: 800,
                            columnLines: true,
                            scrollable: true,
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
                                    {text: 'Airline', dataIndex: 'strDescripcion1', width: 300,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left";
                                            value = '<b>' + value + '</b>';
                                            return value;
                                        }
                                    },
                                    {
                                        text: ' Outgoing Reject ',
                                        defaults: {
                                            menuDisabled: true, sortable: false, align: 'center'
                                        },
                                        columns: [
                                            {text: 'Curr', dataIndex: 'strDescripcion5', width: 50,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background:#99CCFF;text-align:center";
                                                    return value;
                                                }
                                            },
                                            {text: 'Gross', dataIndex: 'A050ACEPTA', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background:#99CCFF;text-align:right";
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataAIR_P_INT').getStore().getData().items[0].data;

                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totA050ACEPTA, '0,000') + '<b>';
                                                }
                                            },
                                            {text: 'Isc', dataIndex: 'A050COMISI', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background:#99CCFF;text-align:right";
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataAIR_P_INT').getStore().getData().items[0].data;

                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totA050COMISI, '0,000') + '<b>';
                                                }
                                            },
                                            {text: 'Tax', dataIndex: 'A050TUA', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background:#99CCFF;text-align:right";
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataAIR_P_INT').getStore().getData().items[0].data;

                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totA050TUA, '0,000') + '<b>';
                                                }
                                            },
                                            {text: 'Net', dataIndex: 'A050NETO', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background:#E1FFE1;text-align:right";
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataAIR_P_INT').getStore().getData().items[0].data;

                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totA050NETO, '0,000') + '<b>';
                                                }
                                            },
                                            {text: '%', dataIndex: 'Perc1', width: 50,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "background:#E1FFE1;text-align:right";
                                                    return Ext.util.Format.number(value, '0,000');
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataAIR_P_INT').getStore().getData().items[0].data;

                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>100%<b>';
                                                }

                                            }
                                        ]
                                    },
                                ]
                            }
                        },
                        {
                            xtype: 'cartesian',
                            id: prototype.id + '-ChtSalesAnalysis_IA_04',
                            margin: '0 10 0 0 ',
                            flipXY: true,
                            width: 600,
                            height: 500,
                            insetPadding: '20 10',
                            background: '#E3EAF9',
                            captions: {
                                title: {
                                    text: 'Amount by Airline',
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
                            axes: [
                                {
                                    type: 'numeric3d',
                                    position: 'bottom',
                                    majorTickSteps: 5,
                                    fields: ['A050ACEPTA'],
                                    title: 'Amount ',
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
                                            return ' ' + (value / 1000000) + 'M ';
                                        } else {
                                            return '';
                                        }
                                    }
                                }, {
                                    type: 'category3d',
                                    position: 'left',
                                    fields: 'strDescripcion1',
                                    grid: true,
                                    label: {
                                        textAlign: 'left'
                                    },

                                }],
                            series: [{
                                    type: 'bar3d',
                                    stacked: false,
                                    title: ['Net'],
                                    yField: ['A050ACEPTA'],
                                    xField: 'strDescripcion1',
                                    //highlight: true,
                                    style: {
                                        inGroupGapWidth: -7
                                    },
                                    highlight: {
                                        strokeStyle: 'rgba(0, 0, 0, .2)',
                                        lineWidth: 1
                                    },
                                    tooltip: {
                                        trackMouse: true,
                                        //height: 28,
                                        renderer: function (toolTip, record, ctx) {
                                            //var label = record.get('strFormatDate') + ' ';
                                            var label = ' ';
//                                            if (ctx.field === 'GROSS') {
                                            label += ' Net. : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>';
//                                            } else if (ctx.field === 'VALOR') {
//                                                label += ' Invoice : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>';
//                                            }
                                            toolTip.setHtml(label);
                                        }
                                    }
                                }]
                        },
                        {
                            xtype: 'slider',
                            fieldLabel: 'Top',
                            width: 40,
                            hideLabel: true,
                            value: 10,
                            height: 400,
                            vertical: true,
                            minValue: 5,
                            maxValue: 20,
                            tipText: function (thumb) {
                                return Ext.String.format('First {0} Airline', thumb.value);
                            },
                            listeners:{
                                change:'onChangeTopAirline'
                            }

                        },
                    ]
                },
            ]
        },
    ]
});