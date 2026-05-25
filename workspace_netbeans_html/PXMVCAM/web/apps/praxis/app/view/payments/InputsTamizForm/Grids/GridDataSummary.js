Ext.define('Ext.Praxis.view.payments.InputsTamizForm.Grids.GridDataSummary', {
    extend: 'Ext.panel.Panel',
    height: 650,
    width: 900,
    layout: 'fit',
    align: 'center',
    config: {
        searchParams: null,
        searchUrl: null,
        clickCallback: null,
        gridtype: null
    },
    //padding: '10 10 10 10',
    fechas: [],
    items: [],
    initComponent: function () {
        const me = this;
        me.title = 'Summary Detail TMZ';
        me.titleAlign = 'center';
        const opts = {
            'P': () => {
                return Ext.create('Ext.grid.Panel', {
                    id: prototype.id + '-grid-summary01',
                    height: 550,
                    width: 900,
                    features: [
                        {
                            dock: 'bottom',
                            ftype: 'summary'
                        }
                    ],
                    viewConfig: {
                        stripeRows: true,
                        enableTextSelection: true,
                        markDirty: false
                    },
                    columnLines: true,
                    //<editor-fold defaultstate="collapsed" desc="Processors">
                    columns: {
                        defaults: {
                            align: 'center',
                            menuDisabled: true,
                            sortable: true
                        },
                        items: [
                            {text: 'Seq', dataIndex: 'RN', width: 50},
                            {text: 'Processing<br>Date', dataIndex: 'PRDA', width: 100},
                            {text: 'Load<br>Date', dataIndex: 'FREGIS', width: 100},
                            {text: 'Source', dataIndex: 'NOMBREPROC', flex: 1},
                            {text: 'Total Records',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'Received', dataIndex: 'RECEIVED', width: 70,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'background:#A7ECC9;color:#256892;text-align:center;font-weight: bold;cursor:pointer;text-decoration: underline;';
                                            let meStyle = 'background:#A7ECC9;color:#256892;text-align:center;font-weight: bold;';
                                            if (value > 0) {
                                                meStyle += 'cursor:pointer;text-decoration: underline;';
                                            }
                                            metaData.style = meStyle;
                                            return value;
                                        },
                                        listeners: {
                                            click: 'onClickReceivedProcessor'
                                        }
                                    },
                                    {text: 'Loaded', dataIndex: 'LOADED', width: 70, align: 'center',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            let meStyle = 'background:#A7ECC9;color:#256892;text-align:center;font-weight: bold;';
                                            if (value > 0) {
                                                meStyle += 'cursor:pointer;text-decoration: underline;';
                                            }
                                            metaData.style = meStyle;
                                            return value;
                                        },
                                        listeners: {
                                            click: 'onClickLoadedProcessor'
                                        }
                                    },
                                    {text: 'Exonerated', dataIndex: 'EXONERATED', width: 90, align: 'center',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            let meStyle = 'background:#A7ECC9;color:#256892;text-align:center;font-weight: bold;';
                                            if (value > 0) {
                                                meStyle += 'cursor:pointer;text-decoration: underline;';
                                            }
                                            metaData.style = meStyle;
                                            return value;
                                        },
                                        listeners: {
                                            click: 'onClickExoneradosProcessor'
                                        }
                                    },
                                    {
                                        text: 'By Payment', 
                                        dataIndex: 'BY_PAYMENT', 
                                        width: 90, 
                                        align: 'center',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            let meStyle = 'background:#A7ECC9;color:#256892;text-align:center;font-weight: bold;';
                                            if (value > 0) {
                                                meStyle += 'cursor:pointer;text-decoration: underline;';
                                            }
                                            metaData.style = meStyle;
                                            return value || 0;
                                        },
                                        listeners: {
                                            click: 'onClickByPaymentProcessor'                          
                                        }
                                    },
                               
                                    {
                                        text: 'Loaded vs<br>By Payment', 
                                        dataIndex: 'LOADED_VS_BY_PAYMENT', 
                                        width: 90, 
                                        align: 'center',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            let style = 'background:#A7ECC9;text-align:center;font-weight: bold;';
                                            if (value > 0) {
                                                style += 'color:red;';
                                            } else {
                                                style += 'color:#256892;';
                                            }
                                            metaData.style = style;
                                            return value;
                                        }
                                    }
                                ]

                            }
                        ]
                    },
                    //</editor-fold>
                    bbar: {
                        xtype: 'pagingtoolbar',
                        id: prototype.id + '-summary-paggin01',
                        displayInfo: true // display additional information like "Displaying x of y items"
                    },
                    tbar: {
                        layout: {
                            pack: 'end'
                        },
                        defaults: {
                            scale: 'medium'
                        },
                        items: [
                            {
                                xtype: 'button',
                                iconCls: 'prx-icon-excel',
                                tooltip: 'Export to Excel',
                                listeners: {
                                    click: 'downloadDetailSummaryInfo'
                                }
                            }
                        ]
                    }
                });
            },
            'C': () => {
                return Ext.create('Ext.grid.Panel', {
                    id: prototype.id + '-grid-summary01',
                    height: 550,
                    width: 900,
                    features: [
                        {
                            dock: 'bottom',
                            ftype: 'summary'
                        }
                    ],
                    viewConfig: {
                        stripeRows: true,
                        enableTextSelection: true,
                        markDirty: false
                    },
                    columnLines: true,
                    columns: {
                        defaults: {
                            align: 'center',
                            menuDisabled: true,
                            sortable: true
                        },
                        items: [
                            {text: 'Seq', dataIndex: 'RN', width: 50},
                            {text: 'Processing<br>Date', dataIndex: 'PRDA', width: 90},
                            {text: 'Complement', dataIndex: 'NOMBREPROC', flex: 1},
                            {text: 'Received', dataIndex: 'RECEIVED', width: 80,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'background:#A7ECC9;color:#256892;text-align:center;font-weight: bold;cursor:pointer;text-decoration: underline;';
                                    return value;
                                },
                                listeners: {
                                    click: 'onClickReceivedComplement'
                                }
                            },
                            {text: 'Loaded', dataIndex: 'LOADED', width: 80,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'background:#A7ECC9;color:#256892;text-align:center;font-weight: bold;cursor:pointer;text-decoration: underline;';
                                    return value;
                                },
                                listeners: {
                                    click: 'onClickLoadedComplement'
                                }
                            },
                            {text: 'Difference', dataIndex: 'DIFFERENCE', width: 80,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'background:#A7ECC9;color:red;text-align:center;font-weight: bold;';
                                    return value;
                                }}
                        ]
                    },
                    bbar: {
                        xtype: 'pagingtoolbar',
                        id: prototype.id + '-summary-paggin01',
                        displayInfo: true // display additional information like "Displaying x of y items"
                    },
                    tbar: {
                        layout: {
                            pack: 'end'
                        },
                        defaults: {
                            scale: 'medium'
                        },
                        items: [
                            {
                                xtype: 'button',
                                iconCls: 'prx-icon-excel',
                                tooltip: 'Export to Excel',
                                listeners: {
                                    click: 'downloadDetailSummaryInfo'
                                }
                            }
                        ]
                    }
                });
            }
        };

        //let panel = ;
        me.items = opts[me.gridtype]();
        me.callParent(arguments);
    },
});
