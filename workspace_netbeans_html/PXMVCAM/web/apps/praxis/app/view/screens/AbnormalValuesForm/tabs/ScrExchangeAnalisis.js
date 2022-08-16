Ext.define('Ext.Praxis.view.screens.AbnormalValuesForm.tabs.ScrExchangeAnalisis', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-ScrExchangeAnalisis',
    requires: [
        'Ext.Praxis.controller.screens.AbnormalValues.tabs.ScrExchangeAnalisisController'
    ],
    controller: 'ScrExchangeAnalisisController',
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
            id: prototype.id + '-boxPrincipalScrExchangeAnalisis',
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
                    id: prototype.id + '-boxMainDataScrExchangeAnalisis',
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
                        // <editor-fold defaultstate="collapsed" desc="gridDataScrExchangeAnalisis">

                        {
                            xtype: 'panel',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    padding: '20 0 0 0',
                                    id: prototype.id + '-gridDataScrExchangeAnalisis',
                                    //height: 450,
                                    width: 652,
                                    columnLines: true,
                                    //                    resizable: false,
                                    features: [
                                        {
//                                        dock: 'bottom',
                                            ftype: 'summary'
                                        }
                                    ],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            resizable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Sales',
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'strFormatDate', width: 90, align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "font-weight:bold;text-align:center;background:#d5f4d5;";
                                                            return '<a href="#" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Totals',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'tickets', width: 70, dataIndex: 'QTKTS', id: prototype.id + '-titFechaS_ABCC1',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background:#9ccfbf;";
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataScrExchangeAnalisis').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totfalta1, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Amount',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'USD', width: 70, dataIndex: 'AMOUNT', id: prototype.id + '-titFechaS_ABCC1',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;background:#9ccfbf;";
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataScrExchangeAnalisis').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return '<b>' + Ext.util.Format.number(data.totfalta1, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'ADM', width: 90, dataIndex: 'VALADM',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = 'text-align:right; margin-right:0px;background:#9ccfbf;';
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataScrExchangeAnalisis').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right';
                                                                    return '<b>' + Ext.util.Format.number(data.totfalta5, '0,000') + '<b>';
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Diff', dataIndex: 'Diff1', align: 'center', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataScrExchangeAnalisis').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totfalta3, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {
                                                        text: 'Variation', dataIndex: 'Var1', align: 'center', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            (data.Var1 > 0) ? metaData.style = "text-align:right;background:#d5f4d5;font-weight: bold;color:#0000e6"
                                                                    : metaData.style = "text-align:right;background:#d5f4d5;font-weight: normal;color:#323232";
                                                            return Ext.util.Format.number(value, '0,000%');
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Chargeback',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Qty Cards', width: 70, dataIndex: 'QCCARDSC',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background:#9ccfbf;";
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataScrExchangeAnalisis').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totfalta4, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Amount', width: 90, dataIndex: 'AMOUNTSC',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right; margin-right:0px;background:#9ccfbf;';
                                                            return Ext.util.Format.number(value, '0,000');
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataScrExchangeAnalisis').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right';
                                                            return '<b>' + Ext.util.Format.number(data.totfalta5, '0,000') + '<b>';
                                                        }
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