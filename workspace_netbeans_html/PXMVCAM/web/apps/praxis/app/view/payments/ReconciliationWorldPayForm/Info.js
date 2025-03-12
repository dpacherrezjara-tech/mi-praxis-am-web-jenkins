Ext.define('Ext.Praxis.view.payments.ReconciliationWorldPayForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    style: 'margin: 1px;',
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
                width: 1900,
                height: 800,
                align: 'center'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelMain',
                    bodyStyle: 'background-color: #E3EAEF;',
                    padding: '1',
                    margin: '1',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        // --------------------------   GRID MAIN DATA---------------------
                        //-----------------------------------------------------------------
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridSummaryData',
                            bodyStyle: 'background-color: #E3EAEF;',
                            padding: '1',
                            border: true,
                            height: 560,
                            width: 1700,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataSummary',
                                    height: 520,
                                    width: 424,
                                    hidden: false,
                                    columnLines: true,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Processing',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Date', dataIndex: 'PRDA', width: 90,
                                                        listeners: {
                                                            click: 'OnGridMainData'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-reconciliation-world-pay-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {text: 'Currency', dataIndex: 'SETCURREN', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    //metaData.style = "background-color:#B2DAFA;";
                                                    return value;
                                                }
                                            },
                                            {text: 'Transaction',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Setllem. Amount', dataIndex: 'SETAMOUNT', width: 120,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Setllem. Amount C', dataIndex: 'SETAMOUNTC', width: 120,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                            return value;
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
                            id: prototype.id + '-panelGridData',
                            bodyStyle: 'background-color: #E3EAEF;',
                            padding: '1',
                            border: true,
                            height: 560,
                            width: 1700,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataAirport',
                                    height: 520,
                                    width: 1644,
                                    hidden: false,
                                    columnLines: true,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Processing',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Date', dataIndex: 'PRDA', width: 90,
                                                        listeners: {
                                                            click: 'OnGridHeaderDetByDate'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-reconciliation-world-pay-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {text: 'Total Transaction (312-00)',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Currency', dataIndex: 'SETCURREN', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#B2DAFA;";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Setllem. Accep', dataIndex: 'TOTSETAMOU', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Currency', dataIndex: 'SCURRENCY', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#B2DAFA;";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Tran. Accepted', dataIndex: 'TOTTRAAMOU', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Trans. Pendien', dataIndex: 'TOTPENAMOU', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Trans. Rejecti', dataIndex: 'TOTREJAMOU', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Reconciliation Transaction',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Currency', dataIndex: 'SETCURREN', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#B2FAC6;";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Setllem. Accep', dataIndex: 'TOTSETAMOC', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Currency', dataIndex: 'SCURRENCY', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "background-color:#B2FAC6;";
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Tran. Accepted', dataIndex: 'TOTTRAAMOC', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Trans. Pendien', dataIndex: 'TOTPENAMOC', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Trans. Rejecti', dataIndex: 'TOTREJAMOC', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            },
                                            {text: 'Differences',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Tran. Accepted', dataIndex: 'DIF_TOTTRAAMO', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Setllem. Accep', dataIndex: 'DIF_TOTSETAMO', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Trans. Pendien', dataIndex: 'DIF_TOTPENAMO', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Trans. Rejecti', dataIndex: 'DIF_TOTREJAMO', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridHeaderDetail',
                            bodyStyle: 'background-color: #E3EAEF;',
                            padding: '1',
                            border: true,
                            height: 560,
                            width: 1900,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridHeaderDetail',
                                    height: 520,
                                    width: 1850,
                                    hidden: false,
                                    columnLines: true,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Processing',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Date', dataIndex: 'PRDA', width: 90, },
                                                ]
                                            },
                                            {text: 'Part',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'ID', dataIndex: 'PARTEID', width: 100,
                                                        listeners: {
                                                            click: 'OnGridHeaderDetByParteID'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-reconciliation-world-pay-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {text: 'Merch',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'ID', dataIndex: 'MERCHID', width: 100, },
                                                ]
                                            },
                                            {text: 'Part',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'ID Settlement', dataIndex: 'PARTEIDSE', width: 100,
                                                        listeners: {
                                                            click: 'OnGridHeaderDetByParteIDSE'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "color:#057ECB;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#payments-reconciliation-world-pay-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {text: 'Country', dataIndex: 'SCOUNTRY', width: 60},
                                            {text: 'Total Transaction(312-00)',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Cur.', dataIndex: 'SETCURREN', width: 60},
                                                    {text: 'Setllem. Accep', dataIndex: 'TOTSETAMOU', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                            return value;
                                                        }},
                                                    {text: 'Cur.', dataIndex: 'SCURRENCY', width: 60},
                                                    {text: 'Tran. Accepted', dataIndex: 'TOTTRAAMOU', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                            return value;
                                                        }},
                                                    {text: 'Trans. Pendien', dataIndex: 'TOTPENAMOU', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                            return value;
                                                        }},
                                                    {text: 'Trans. Rejecti', dataIndex: 'TOTREJAMOU', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2DAFA;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                            return value;
                                                        }},
                                                ]
                                            },
                                            {text: 'Reconciliation Transaction',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Cur.', dataIndex: 'SETCURREN', width: 60},
                                                    {text: 'Setllem. Accep', dataIndex: 'TOTSETAMOC', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                            return value;
                                                        }},
                                                    {text: 'Cur.', dataIndex: 'SCURRENCY', width: 60},
                                                    {text: 'Tran. Accepted', dataIndex: 'TOTTRAAMOC', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                            return value;
                                                        }},
                                                    {text: 'Trans. Pendien', dataIndex: 'TOTPENAMOC', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                            return value;
                                                        }},
                                                    {text: 'Trans. Rejecti', dataIndex: 'TOTREJAMOC', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#B2FAC6;";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                            return value;
                                                        }}
                                                ]
                                            },
                                            {text: 'Differences',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Tran. Accepted', dataIndex: 'DIF_TOTTRAAMO', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Setllem. Accep', dataIndex: 'DIF_TOTSETAMO', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Trans. Pendien', dataIndex: 'DIF_TOTPENAMO', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Trans. Rejecti', dataIndex: 'DIF_TOTREJAMO', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                            return value;
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridHeaderDetailByParteID',
                            bodyStyle: 'background-color: #E3EAEF;',
                            padding: '1',
                            border: true,
                            height: 560,
                            width: 1580,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridHeaderDetailByParteID',
                                    height: 520,
                                    width: 1034,
                                    hidden: false,
                                    columnLines: true,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Country', dataIndex: 'SCOUNTRY', width: 90, },
                                            {text: 'Record',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Type', dataIndex: 'RECTYPE', width: 70, },
                                                ]
                                            },
                                            {text: 'Merchant',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'ID', dataIndex: 'MERCHID', width: 80},
                                                ]
                                            },
                                            {text: 'Ticket', dataIndex: 'TKTNUMBER', width: 120,
                                                listeners: {
                                                    click: 'showTicket'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "color:#057ECB;";
                                                    value = '<b>' + value + '</b>';
                                                    return '<a href="#payments-reconciliation-world-pay-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                }
                                            },
                                            {text: 'Transaction',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Type', dataIndex: 'TRATYPE', width: 80, },
                                                    {text: 'Cur.', dataIndex: 'SCURRENCY', width: 60, },
                                                    {text: 'Amount', dataIndex: 'SVFOP', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                            return value;
                                                        }
                                                    },
                                                ]
                                            },
                                            {text: 'Credit Card',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Nbr.', dataIndex: 'SCARDN', width: 120},
                                                    {text: 'Auth.', dataIndex: 'SAUTHOC', width: 80},
                                                ]
                                            },
                                            {text: 'Settlement',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Part ID', dataIndex: 'PARTEIDSE', width: 100, },
                                                    {text: 'Cur.', dataIndex: 'SETCURREN', width: 60, },
                                                    {text: 'Amount', dataIndex: 'SETAMOUNT', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                            return value;
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
                            id: prototype.id + '-panelGridHeaderDetailByParteIDSE',
                            bodyStyle: 'background-color: #E3EAEF;',
                            padding: '1',
                            border: true,
                            height: 560,
                            width: 1580,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridHeaderDetailByParteIDSE',
                                    height: 520,
                                    width: 704,
                                    hidden: false,
                                    columnLines: true,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Record',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Type', dataIndex: 'RECTYPE', width: 70, },
                                                ]
                                            },
                                            {text: 'Name ID', dataIndex: 'NAMEID', width: 320, },
                                            {text: 'Bill ID', dataIndex: 'BILLCODID, ', width: 80, },
                                            {text: 'Due Date', dataIndex: 'DUEDATE', width: 80, },
                                            {text: 'Settlement',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Cur.', dataIndex: 'SCURRENCY', width: 60, },
                                                    {text: 'Amount', dataIndex: 'SVFOP', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right";
                                                            value = '<b>' + Ext.util.Format.number(value, '0,000.00') + '</b>';
                                                            return value;
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
                {
                    xtype: 'panel',
                    id: prototype.id + '-pie',
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    border: true,
                    width: 1000,
                    height: 25,
                    bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                    items: [
                        {
                            xtype: 'panel',
                            width: 600,
                            height: 25,
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            defaults: {
                                xtype: 'label',
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
                        style: 'margin: 1px;',
                        bodyStyle: 'background: transparent;',
                        border: false
                    }
                }
            ]
        }
    ]
}
);


