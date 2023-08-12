Ext.define('Ext.Praxis.view.payments.ReconciliationPaymentForm.DataGrids.SummaryTransactionError', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-DataGridSummaryTransactionError',
    bodyStyle: 'background-color: #E3EAEF;',
    border: true,
    height: 'auto',
    width: 1170,
    margin: '0 0 0 0 ',
    layout: {
        type: 'vbox',
        align: 'center'
    },
    items: [
        {
            xtype: 'grid',
            id: prototype.id + '-gridSummaryTransactionError',
            width: 1170,
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
                        text: 'Processing',
                        id: prototype.id + '-htPreDateErrorTransaction',
                        hidden: false,
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            align: 'center'
                        },
                        columns: [
                            {
                                text: 'Date', dataIndex: 'strFormatDate', width: 90,
                                listeners: {
                                    click: 'setGridDataFiltroPDATE'
                                },
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'color:#057ECB;text-align:center;text-decoration:underline;font-weight:bold;';
                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;font-weight:bold;">' + value + '</a>';
                                }
                            }
                        ]
                    },
                    {
                        text: 'Total General',
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            align: 'center'
                        },
                        columns: [
                            {text: 'Match', dataIndex: 'TGM', width: 100,
                                listeners: {
                                    click: 'setGridDataFiltroTGM'
                                },
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'color:#057ECB;text-align:right;text-decoration:underline;font-weight:bold;background-color:#d5f4d5;';
                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;font-weight:bold;">' + Ext.util.Format.number(value, '0,000') + '</a>';
                                },
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    metaData.style = "text-align:right;";
                                    var data = Ext.getCmp(prototype.id + '-gridSummaryTransactionError').getStore().getData().items[0].data;
                                    return Ext.util.Format.number(data.TGM_TOTAL, '0,000');
                                }
                            },
                            {text: 'Pending', dataIndex: 'TGP', width: 100,
                                listeners: {
                                    click: 'setGridDataFiltroTGP'
                                },
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'color:#057ECB;text-align:right;text-decoration:underline;font-weight:bold;background-color:#d5f4d5;';
                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;font-weight:bold;">' + Ext.util.Format.number(value, '0,000') + '</a>';
                                },
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    metaData.style = "text-align:right;";
                                    var data = Ext.getCmp(prototype.id + '-gridSummaryTransactionError').getStore().getData().items[0].data;
                                    return Ext.util.Format.number(data.TGP_TOTAL, '0,000');
                                }
                            },
                            {text: '%', dataIndex: 'PENDING_PERCENTAGE', width: 75,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'text-align:right;background-color:#d5f4d5;';
                                    return Ext.util.Format.number(value, '0,000.00') + '%';
                                },
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    metaData.style = "text-align:right;";
                                    var data = Ext.getCmp(prototype.id + '-gridSummaryTransactionError').getStore().getData().items[0].data;
                                    return Ext.util.Format.number(data.PENDING_PERCENTAGE_TOTAL, '0,000.00') + '%';
                                }
                            }
                        ]
                    },
                    {
                        text: 'Transaction - No Complement',
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            align: 'center'
                        },
                        columns: [
                            {text: 'Match', dataIndex: 'TNCM', width: 100,
                                listeners: {
                                    click: 'setGridDataFiltroTNCM'
                                },
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'color:#057ECB;text-align:right;text-decoration:underline;font-weight:bold;background-color:#9CD2FF;';
                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;font-weight:bold;">' + Ext.util.Format.number(value, '0,000') + '</a>';
                                },
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    metaData.style = "text-align:right;";
                                    var data = Ext.getCmp(prototype.id + '-gridSummaryTransactionError').getStore().getData().items[0].data;
                                    return Ext.util.Format.number(data.TNCM_TOTAL, '0,000');
                                }
                            },
                            {text: 'Pending', dataIndex: 'TNCP', width: 100,
                                listeners: {
                                    click: 'setGridDataFiltroTNCP'
                                },
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'color:#057ECB;text-align:right;text-decoration:underline;font-weight:bold;background-color:#9CD2FF;';
                                    return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;font-weight:bold;">' + Ext.util.Format.number(value, '0,000') + '</a>';
                                },
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    metaData.style = "text-align:right;";
                                    var data = Ext.getCmp(prototype.id + '-gridSummaryTransactionError').getStore().getData().items[0].data;
                                    return Ext.util.Format.number(data.TNCP_TOTAL, '0,000');
                                }
                            }
                        ]
                    },
                    {
                        text: 'Complements',
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            align: 'center'
                        },
                        columns: [
                            {
                                text: 'Plusgrade',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'Match', dataIndex: 'CPLM', width: 100,
                                        listeners: {
                                            click: 'setGridDataFiltroCPLM'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'color:#057ECB;text-align:right;text-decoration:underline;font-weight:bold;background-color:#FFFFCD;';
                                            return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;font-weight:bold;">' + Ext.util.Format.number(value, '0,000') + '</a>';
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;";
                                            var data = Ext.getCmp(prototype.id + '-gridSummaryTransactionError').getStore().getData().items[0].data;
                                            return Ext.util.Format.number(data.CPLM_TOTAL, '0,000');
                                        }
                                    },
                                    {text: 'Pending', dataIndex: 'CPLP', width: 100,
                                        listeners: {
                                            click: 'setGridDataFiltroCPLP'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'color:#057ECB;text-align:right;text-decoration:underline;font-weight:bold;background-color:#FFFFCD;';
                                            return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;font-weight:bold;">' + Ext.util.Format.number(value, '0,000') + '</a>';
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;";
                                            var data = Ext.getCmp(prototype.id + '-gridSummaryTransactionError').getStore().getData().items[0].data;
                                            return Ext.util.Format.number(data.CPLP_TOTAL, '0,000');
                                        }
                                    }
                                ]
                            },
                            {
                                text: 'Tablet',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'Match', dataIndex: 'CTAM', width: 100,
                                        listeners: {
                                            click: 'setGridDataFiltroCTAM'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'color:#057ECB;text-align:right;text-decoration:underline;font-weight:bold;background-color:#FFFFCD;';
                                            return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;font-weight:bold;">' + Ext.util.Format.number(value, '0,000') + '</a>';
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;";
                                            var data = Ext.getCmp(prototype.id + '-gridSummaryTransactionError').getStore().getData().items[0].data;
                                            return Ext.util.Format.number(data.CTAM_TOTAL, '0,000');
                                        }
                                    },
                                    {text: 'Pending', dataIndex: 'CTAP', width: 100,
                                        listeners: {
                                            click: 'setGridDataFiltroCTAP'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'color:#057ECB;text-align:right;text-decoration:underline;font-weight:bold;background-color:#FFFFCD;';
                                            return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;font-weight:bold;">' + Ext.util.Format.number(value, '0,000') + '</a>';
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;";
                                            var data = Ext.getCmp(prototype.id + '-gridSummaryTransactionError').getStore().getData().items[0].data;
                                            return Ext.util.Format.number(data.CTAP_TOTAL, '0,000');
                                        }
                                    }
                                ]
                            },
                            {
                                text: 'Ligas',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'Match', dataIndex: 'CLIM', width: 100,
                                        listeners: {
                                            click: 'setGridDataFiltroCLIM'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'color:#057ECB;text-align:right;text-decoration:underline;font-weight:bold;background-color:#FFFFCD;';
                                            return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;font-weight:bold;">' + Ext.util.Format.number(value, '0,000') + '</a>';
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;";
                                            var data = Ext.getCmp(prototype.id + '-gridSummaryTransactionError').getStore().getData().items[0].data;
                                            return Ext.util.Format.number(data.CLIM_TOTAL, '0,000');
                                        }
                                    },
                                    {text: 'Pending', dataIndex: 'CLIP', width: 100,
                                        listeners: {
                                            click: 'setGridDataFiltroCLIP'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'color:#057ECB;text-align:right;text-decoration:underline;font-weight:bold;background-color:#FFFFCD;';
                                            return '<a href="#payments-reconciliation-payment-form" style="color:#057ECB;text-decoration:underline;font-weight:bold;">' + Ext.util.Format.number(value, '0,000') + '</a>';
                                        },
                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                            metaData.style = "text-align:right;";
                                            var data = Ext.getCmp(prototype.id + '-gridSummaryTransactionError').getStore().getData().items[0].data;
                                            return Ext.util.Format.number(data.CLIP_TOTAL, '0,000');
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
});

