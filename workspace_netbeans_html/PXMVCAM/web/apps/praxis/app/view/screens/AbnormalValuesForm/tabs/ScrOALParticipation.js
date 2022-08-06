Ext.define('Ext.Praxis.view.screens.AbnormalValuesForm.tabs.ScrOALParticipation', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-ScrOALParticipation',
    requires: [
        'Ext.Praxis.controller.screens.AbnormalValues.tabs.ScrOALParticipationController'
    ],
    controller: 'ScrOALParticipationController',
//    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
//    bodyStyle: 'background: transparent;',
    defaults: {
        bodyStyle: 'background: transparent;'
//        border: false
    },
    items: [
        {
            region: 'center',
            id: prototype.id + '-boxPrincipalOAL',
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
                    xtype: 'panel',
                    id: prototype.id + '-boxMainDataOAL',
                    width: '100%',
//                    hidden: false,
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
                        // <editor-fold defaultstate="collapsed" desc="gridData">
                        {
                            xtype: 'panel',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridMainDataOAL',
                                    padding: '5px 0px 0px 0px',
                                    width: 1254,
//                                    height: 428,
                                    columnLines: true,
//                                    features: [{
//                                            ftype: 'summary'
//                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Online / Offline',
                                                columns: [
                                                    {
                                                        text: 'Sales<br>Date', dataIndex: 'strFormatDate', width: 80, align: 'center',
//                                                listeners: {
//                                                    click: 'clickgridDetWeek_colHandler',
//                                                },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#d5f4d5;";
                                                            //return '<a href="#" style="color:#057ECB;text-decoration:none;">' + value + '</a> font-weight:bold;';
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Total<br>Coupons', dataIndex: 'QCPNS0', width: 80, align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#b7d3f1;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }
                                                    },
                                                    {text: 'Total USD',
                                                        columns: [
                                                            {
                                                                text: 'ON', dataIndex: 'VALOR0', width: 80, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#b7d3f1;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                            {
                                                                text: '% USD', dataIndex: 'perVALOR0', width: 60, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#b7d3f1;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                            {
                                                                text: '% Milles', dataIndex: 'PERKMSON', width: 60, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#b7d3f1;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                            {
                                                                text: 'OFF', dataIndex: 'VALOROA', width: 100, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#b7d3f1;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                            {
                                                                text: '% USD', dataIndex: 'perVALOROA', width: 60, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#b7d3f1;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                            {
                                                                text: '% Milles', dataIndex: 'PERKMSOF', width: 60, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#b7d3f1;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                            {
                                                                text: 'Total', dataIndex: 'VALOR0ATOT', width: 100, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#b7d3f1;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                        ]
                                                    },
                                                ]
                                            },
                                            {text: 'Offline Only',
                                                columns: [
                                                    {text: '100% Offline',
                                                        columns: [
                                                            {
                                                                text: 'Total<br>Coupons', dataIndex: 'QCPNS2', width: 80, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#c4d3b6";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                }
                                                            },
                                                            {
                                                                text: 'Total USD', dataIndex: 'VALOR2', width: 100, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#c4d3b6";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                            {
                                                                text: 'Sales<br>Commission', dataIndex: 'VISC2', width: 100, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#c4d3b6";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {text: 'Codeshare',
                                                        columns: [
                                                            {
                                                                text: 'Total<br>Coupons', dataIndex: 'QCPNS3', width: 80, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#A9D87D";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                }
                                                            },
                                                            {
                                                                text: 'Total USD', dataIndex: 'VALOR3', width: 100, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#A9D87D";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                            {
                                                                text: 'Sales<br>Commission', dataIndex: 'VISC3', width: 100, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#A9D87D";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                            ]
                        },
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxWeek',
                    width: '100%',
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
                        // <editor-fold defaultstate="collapsed" desc="gridData">

                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDetWeek',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {xtype: 'label', id: prototype.id + '-titgridDetWeekS', text: '', style: "font-size:12px;font-weight:bold;width:60;padding:10px 0px 0px 10px;"},
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDetWeek',
                                    padding: '5px 0px 0px 0px',
                                    width: 788,
                                    height: 524,
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
                                                text: 'Sales Country', dataIndex: 'COUNTRYS', width: 110, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;background:#d5f4d5;";
                                                    return value;
                                                }
                                            },
                                            {text: 'Total',
                                                columns: [
                                                    {
                                                        text: 'Tickets', dataIndex: 'QTTKT', width: 110, align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000');
                                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridDetWeek').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totQTTKT, '0,000');
                                                        }
                                                    },
                                                    {
                                                        text: 'USD Net', dataIndex: 'VALORT', width: 110, align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            metaData.style = "text-align:right;";
                                                            var data = Ext.getCmp(prototype.id + '-gridDetWeek').getStore().getData().items[0].data;
                                                            return Ext.util.Format.number(data.totVALORT, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Sales',
                                                columns: [
                                                    {text: 'High Values', columns: [
                                                            {
                                                                text: 'Tickets', dataIndex: 'QTKTSH', width: 110, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetWeek').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.totQTKTSH, '0,000');
                                                                }
                                                            },
                                                            {
                                                                text: 'USD Differences', dataIndex: 'VALORH', width: 110, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetWeek').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.totVALORH, '0,000.00');
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {text: 'Low Values', columns: [
                                                            {
                                                                text: 'Tickets', dataIndex: 'QTKTSL', width: 110, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetWeek').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.totQTKTSL, '0,000');
                                                                }
                                                            },
                                                            {
                                                                text: 'USD Differences', dataIndex: 'VALORL', width: 110, align: 'center',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }, summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:right;";
                                                                    var data = Ext.getCmp(prototype.id + '-gridDetWeek').getStore().getData().items[0].data;
                                                                    return Ext.util.Format.number(data.totVALORL, '0,000.00');
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                        ]
                                    }
                                },
                            ]
                        },
                    ]


                },
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