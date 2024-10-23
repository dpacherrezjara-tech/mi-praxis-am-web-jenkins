/* 
 * @Dvicente
 */

Ext.define('Ext.Praxis.view.payments.InputsTamizForm.GridData', {
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
    listeners: {
        afterrender: function (panel) {
            panel.getData();
        }
    },
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
                            {text: 'Seq', dataIndex: 'rn', width: 50},
                            {text: 'Processing',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    border: true
                                },
                                columns: [
                                    {text: 'Date', width: 100, flex: 1, dataIndex: 'prda'}
                                ]
                            },
                            {text: 'Load<br>Date', dataIndex: 'fregis', width: 100},
                            {text: 'Source', dataIndex: 'nombreproc', flex: 1},
                            {text: 'Total Records',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'Received', dataIndex: 'received', width: 70,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'background:#A7ECC9;color:#256892;text-align:center;font-weight: bold;cursor:pointer;text-decoration: underline;';
                                            return value;
                                        },
                                        listeners: {
                                            click: 'onClickReceived'
                                        }
                                    },
                                    {text: 'Loaded', dataIndex: 'loaded', width: 70, align: 'center',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'background:#A7ECC9;color:#256892;text-align:center;font-weight: bold;cursor:pointer;text-decoration: underline;';
                                            return value;
                                        },
                                        listeners: {
                                            click: 'onClickLoaded'
                                        }
                                    },
                                    {text: 'Exonerated', width: 90, align: 'center',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'background:#A7ECC9;color:#256892;text-align:center;font-weight: bold;cursor:pointer;text-decoration: underline;';
                                            let loaded = record.get('loaded') || 0;
                                            let received = record.get('received') || 0;
                                            return (received - loaded);
                                        },
                                        listeners: {
                                            click: 'onClickExonerados'
                                        }
                                    },
                                    {text: 'Differences', width: 90, align: 'center',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'background:#A7ECC9;color:red;text-align:center;font-weight: bold;';
                                            let loaded = record.get('loaded') || 0;
                                            let received = record.get('received') || 0;
                                            let exonerados = (received - loaded);
                                            let resta = (received - loaded) - exonerados;
                                            return resta;
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
                            {text: 'Seq', dataIndex: 'rn', width: 50},
                            {text: 'Processing<br>Date', dataIndex: 'prda', width: 90},
                            {text: 'Complement', dataIndex: 'nombreproc', flex: 1},
                            {text: 'Received', dataIndex: 'received', width: 80,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'background:#A7ECC9;color:#256892;text-align:center;font-weight: bold;cursor:pointer;text-decoration: underline;';
                                    return value;
                                },
                                listeners: {
                                    click: 'onClickReceivedC'
                                }
                            },
                            {text: 'Loaded', dataIndex: 'loaded', width: 80,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'background:#A7ECC9;color:#256892;text-align:center;font-weight: bold;cursor:pointer;text-decoration: underline;';
                                    return value;
                                },
                                listeners: {
                                    click: 'onClickLoadedC'
                                }
                            },
                            {text: 'Difference', width: 80,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'background:#A7ECC9;color:red;text-align:center;font-weight: bold;';
                                    let loaded = record.get('loaded') || 0;
                                    let received = record.get('received') || 0;
                                    let resta = (received - loaded);
                                    return resta;
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
    getData: async function () {
        const me = this;
        me.mask('Loading Data...');
        const data = await fetch(`${me.searchUrl}?${new URLSearchParams(me.searchParams)}`)
                .then(async res => {
                    if (res.ok) {
                        const data = res.json();
                        return data;
                    }
                    return [];
                });
        if (data.length === 0) {
            global.Msg({msg: 'Data not found'});
            me.unmask();
            return;
        }
        let summaryStore = Ext.create('Ext.data.Store', {
            storeId: prototype.id + '-summary-data',
            pageSize: 20,
            proxy: {
                type: 'memory',
                enablePaging: true
            },
            autoLoad: true,
            autoSync: true,
            data: data
        });
        Ext.getCmp(prototype.id + '-grid-summary01').setStore(summaryStore);
        Ext.getCmp(prototype.id + '-summary-paggin01').setStore(summaryStore);
        me.unmask();
    }
});

