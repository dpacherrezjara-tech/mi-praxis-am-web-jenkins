Ext.define('Ext.Praxis.view.screens.AbnormalValuesForm.tabs.ScrDBIataControl', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-ScrDBIataControl',
    requires: [
        'Ext.Praxis.controller.screens.AbnormalValues.tabs.ScrDBIataControlController'
    ],
    controller: 'ScrDBIataControlController',
    //layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        //border: false
    },
    items: [
        {
            region: 'center',
            id: prototype.id + '-boxPrincipalIataControl',
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
                    id: prototype.id + '-boxMainDataIataControl',
                    width: '100%',
//                    hidden: false,
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
                        // Filtros Select By
                        {
                            xtype: 'panel',
                            border: false,
                            margin: '10 0 10 0',
                            layout: {
                                type: 'hbox',
                                align: 'center'
                            },
                            bodyStyle: 'background-color: transparent;',
                            items: [
//                                {xtype: 'tbspacer', width: 50},
                                {
                                    xtype: 'combo',
                                    fieldLabel: 'Select By',
                                    id: prototype.id + '-cmbTipo_ControlTotal',
                                    queryMode: 'local',
                                    enableKeyEvents: true,
                                    editable: false,
                                    valueField: 'code',
                                    displayField: 'name',
                                    labelWidth: 60,
                                    width: 200,
                                    listeners: {
                                        select: 'btnSearch_click'
                                    }
                                },
                                {xtype: 'tbspacer', width: 700},
                                {
                                    xtype: 'label',
                                    html: 'Three Columns View',
                                    id: prototype.id + '-chkMonth_label',
                                    fieldStyle: 'text-align: center;',
                                    padding: '8px 7px 8px 0px'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    id: prototype.id + '-chkONE',
                                    margin: '0 5 0 5',
                                    labelStyle: 'color:#378BCC;font-weight:bold;',
                                    width: 140,
                                    boxLabel: '',
                                    inputValue: '1',
                                    listeners: {
                                        change: 'ChangechkONE'
                                    }
                                },
                            ]
                        },
                        // Filtros Country Agent
                        {
                            xtype: 'panel',
                            margin: '0 0 5 0',
                            border: false,
                            id: prototype.id + '-radioButton',
                            hidden: true,
                            layout: {
                                type: 'hbox',
                                pack: 'left'
                            },
                            bodyStyle: 'background-color: transparent;',
                            items: [
                                {
                                    xtype: 'radiogroup',
                                    id: prototype.id + '-rbgType',
                                    fieldLabel: '',
                                    horizontal: true,
                                    items: [
                                        {boxLabel: '<strong >Country</strong>', name: 'rbgType', inputValue: '1', width: 100, checked: true},
                                        {boxLabel: '<strong >Agent</strong>', name: 'rbgType', inputValue: '2', width: 100}
                                    ],
                                    listeners: {
                                        change: 'DD_BYAGENT_colHandler'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxMainDataIataValuesOutOfRange',
                            width: '100%',
                            hidden: false,
                            layout: {
                                type: 'hbox',
                                align: 'center',
                                pack: 'center'
                            },
                            defaults: {
                                bodyStyle: 'background: transparent;',
                                border: false,
                                align: 'center',
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-BoxAB_Pais_ONE',
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridMainDataByValues',
                                            padding: '5px 0px 0px 0px',
                                            width: 784,
                                            height: 528,
                                            columnLines: true,
                                            /*features: [{
                                             ftype: 'summary'
                                             }],*/
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {
                                                        text: 'Country', align: 'center', columns: [
                                                            {
                                                                text: 'Code', dataIndex: 'AIRLINE', align: 'center', width: 50,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-weight:bold;text-align:center;background:#d5f4d5;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Name', dataIndex: 'strCountryName', align: 'center', width: 120,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:left;";
                                                                    return value;
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: 'Src', dataIndex: 'FMETHOD', width: 60
                                                    },
                                                    {
                                                        text: 'Type', dataIndex: 'TDOC', width: 70
                                                    },
                                                    {
                                                        text: 'USD', columns: [
                                                            {
                                                                text: 'Sales', columns: [
                                                                    {
                                                                        text: 'Amount', dataIndex: 'Aud1', align: 'center', width: 100,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            return Ext.util.Format.number(value, '0,000.00');
                                                                        }
                                                                    },
                                                                    {
                                                                        text: 'Coupons', dataIndex: 'Rej1', align: 'center', width: 100,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Average', columns: [
                                                                    {
                                                                        text: '5 months', dataIndex: 'Avg1', align: 'center', width: 100,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            return Ext.util.Format.number(value, '0,000.00');
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Differences', dataIndex: 'Diff1', align: 'center', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                            {
                                                                text: 'Variation', dataIndex: 'Var1', align: 'center', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000%');
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
                                    id: prototype.id + '-BoxAB_Pais',
                                    hidden: true,
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-ADG_GridControlTotal_Abnormal_CS',
                                            padding: '5px 0px 0px 0px',
                                            width: 554,
                                            height: 546,
                                            columnLines: true,
                                            /*features: [{
                                             ftype: 'summary'
                                             }],*/
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {
                                                        text: 'Country', align: 'center',
                                                        columns: [
                                                            {
                                                                text: 'Code', dataIndex: 'AIRLINE', align: 'center', width: 50,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-weight:bold;text-align:center;background:#d5f4d5;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Name', dataIndex: 'strFlag', align: 'center', width: 120,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:left;";
                                                                    return value;
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Sales', id: prototype.id + '-titSales_AB',
                                                        columns: [
                                                            {
                                                                text: '', dataIndex: 'Aud1', align: 'center', width: 100, id: prototype.id + '-titFecha_AB_Country_S',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                }
                                                            },
                                                            {
                                                                text: 'Average', columns: [
                                                                    {
                                                                        text: '5 months', dataIndex: 'Avg1', align: 'center', width: 100,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            return Ext.util.Format.number(value, '0,000.00');
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Diff', dataIndex: 'Diff1', align: 'center', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                            {
                                                                text: 'Variation', dataIndex: 'Var1', align: 'center', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:#d5f4d5;";
                                                                    return Ext.util.Format.number(value, '0,000%');
                                                                }
                                                            }
                                                        ]
                                                    },
                                                ]
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-ADG_GridControlTotal_Abnormal_CR',
                                            padding: '5px 0px 0px 0px',
                                            width: 554,
                                            height: 546,
                                            columnLines: true,
                                            /*features: [{
                                             ftype: 'summary'
                                             }],*/
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {
                                                        text: 'Country', align: 'center',
                                                        columns: [
                                                            {
                                                                text: 'Code', dataIndex: 'AIRLINE', align: 'center', width: 50,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-weight:bold;text-align:center;background:#d5f4d5;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Name', dataIndex: 'strFlag', align: 'center', width: 120,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:left;";
                                                                    return value;
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Refund', id: prototype.id + '-titRefund_AB',
                                                        columns: [
                                                            {
                                                                text: '', dataIndex: 'Aud1', align: 'center', width: 100, id: prototype.id + '-titFecha_AB_Country_R',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                }
                                                            },
                                                            {
                                                                text: 'Average', columns: [
                                                                    {
                                                                        text: '5 months', dataIndex: 'Avg1', align: 'center', width: 100,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            return Ext.util.Format.number(value, '0,000.00');
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Diff', dataIndex: 'Diff1', align: 'center', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                            {
                                                                text: 'Variation', dataIndex: 'Var1', align: 'center', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:#d5f4d5;";
                                                                    return Ext.util.Format.number(value, '0,000%');
                                                                }
                                                            }
                                                        ]
                                                    },
                                                ]
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-ADG_GridControlTotal_Abnormal_CE',
                                            padding: '5px 0px 0px 0px',
                                            width: 554,
                                            height: 546,
                                            columnLines: true,
                                            /*features: [{
                                             ftype: 'summary'
                                             }],*/
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {
                                                        text: 'Country', align: 'center',
                                                        columns: [
                                                            {
                                                                text: 'Code', dataIndex: 'AIRLINE', align: 'center', width: 50,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-weight:bold;text-align:center;background:#d5f4d5;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Name', dataIndex: 'strFlag', align: 'center', width: 120,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:left;";
                                                                    return value;
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Exchange', id: prototype.id + '-titExchange_AB',
                                                        columns: [
                                                            {
                                                                text: '', dataIndex: 'Aud1', align: 'center', width: 100, id: prototype.id + '-titFecha_AB_Country_E',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                }
                                                            },
                                                            {
                                                                text: 'Average', columns: [
                                                                    {
                                                                        text: '5 months', dataIndex: 'Avg1', align: 'center', width: 100,
                                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.style = "text-align:right;";
                                                                            return Ext.util.Format.number(value, '0,000.00');
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'Diff', dataIndex: 'Diff1', align: 'center', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                            {
                                                                text: 'Variation', dataIndex: 'Var1', align: 'center', width: 80,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background:#d5f4d5;";
                                                                    return Ext.util.Format.number(value, '0,000%');
                                                                }
                                                            }
                                                        ]
                                                    },
                                                ]
                                            }
                                        }
                                    ]
                                },
                            ]
                        },
                        // Opcion Average Control
                        {
                            xtype: 'panel',
                            id: prototype.id + '-boxMainDataIataAverageControl',
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
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridTotal_AG',
                                            padding: '5px 0px 0px 0px',
                                            width: 954,
                                            height: 528,
                                            columnLines: true,
                                            /*features: [{
                                             ftype: 'summary'
                                             }],*/
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {
                                                        text: 'Agent', align: 'center', columns: [
                                                            {
                                                                text: 'Code', dataIndex: 'AIRLINE', align: 'center', width: 70,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-weight:bold;text-align:center;background:#d5f4d5;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Src', dataIndex: 'strFormatDate1', align: 'center', width: 40,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-weight:bold;text-align:center;background:#d5f4d5;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Name', dataIndex: 'strFlag', align: 'center', width: 300,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:left;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Type', dataIndex: 'COMENT1', align: 'center', width: 40,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-weight:bold;text-align:center;background:#d5f4d5;";
                                                                    return value;
                                                                }
                                                            },
                                                            {
                                                                text: 'Ctr', dataIndex: 'strFormatDate', align: 'center', width: 40,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "font-weight:bold;text-align:center;background:#d5f4d5;";
                                                                    return value;
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: '',
                                                        id: prototype.id + '-titFecha6_AG',
                                                        columns: [
                                                            {
                                                                text: 'Coupons', dataIndex: 'Rej6', align: 'center', width: 70,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                }
                                                            },
                                                            {
                                                                text: 'Amount', dataIndex: 'Aud6', align: 'center', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: 'Average', columns: [
                                                            {
                                                                text: '5 months', dataIndex: 'Rate2', align: 'center', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Differences', dataIndex: 'Diff1', align: 'center', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: 'Variation', dataIndex: 'Rate3', align: 'center', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000%');
                                                        }
                                                    },
                                                ]
                                            }
                                        },
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridTotal_AG_2',
                                            padding: '5px 0px 0px 0px',
                                            width: 784,
                                            height: 528,
                                            hidden: true,
                                            columnLines: true,
                                            /*features: [{
                                             ftype: 'summary'
                                             }],*/
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {
                                                        text: 'Agent', dataIndex: 'AIRLINE', align: 'center', width: 50,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "font-weight:bold;text-align:center;background:#d5f4d5;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: '',
                                                        id: prototype.id + '-titFecha6_AG_2',
                                                        columns: [
                                                            {
                                                                text: 'Coupons', dataIndex: 'Rej6', align: 'center', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                }
                                                            },
                                                            {
                                                                text: 'Amount', dataIndex: 'Aud6', align: 'center', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: 'Average', columns: [
                                                            {
                                                                text: '5 months', dataIndex: 'Rate2', align: 'center', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Differences', dataIndex: 'Diff1', align: 'center', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: 'Variation', dataIndex: 'Rate3', align: 'center', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000%');
                                                        }
                                                    },
                                                    {
                                                        text: '',
                                                        id: prototype.id + '-titFecha1_AG',
                                                        columns: [
                                                            {
                                                                text: 'Coupons', dataIndex: 'Rej1', align: 'center', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                }
                                                            },
                                                            {
                                                                text: 'Amount', dataIndex: 'Aud1', align: 'center', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: '',
                                                        id: prototype.id + '-titFecha2_AG',
                                                        columns: [
                                                            {
                                                                text: 'Coupons', dataIndex: 'Rej2', align: 'center', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                }
                                                            },
                                                            {
                                                                text: 'Amount', dataIndex: 'Aud2', align: 'center', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: '',
                                                        id: prototype.id + '-titFecha3_AG',
                                                        columns: [
                                                            {
                                                                text: 'Coupons', dataIndex: 'Rej3', align: 'center', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                }
                                                            },
                                                            {
                                                                text: 'Amount', dataIndex: 'Aud3', align: 'center', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: '',
                                                        id: prototype.id + '-titFecha4_AG',
                                                        columns: [
                                                            {
                                                                text: 'Coupons', dataIndex: 'Rej4', align: 'center', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                }
                                                            },
                                                            {
                                                                text: 'Amount', dataIndex: 'Aud4', align: 'center', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        text: '',
                                                        id: prototype.id + '-titFecha5_AG',
                                                        columns: [
                                                            {
                                                                text: 'Coupons', dataIndex: 'Rej5', align: 'center', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                }
                                                            },
                                                            {
                                                                text: 'Amount', dataIndex: 'Aud5', align: 'center', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
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