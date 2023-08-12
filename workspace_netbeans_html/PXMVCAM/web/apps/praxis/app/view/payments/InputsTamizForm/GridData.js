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
        clickCallback: null
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

        let panel = Ext.create('Ext.grid.Panel', {
            id: prototype.id + '-grid-summary01',
            height: 550,
            width: 900,
            features: [
                {
                    dock: 'bottom',
                    ftype: 'summary',
                }
            ],
            viewConfig: {
                stripeRows: true,
                enableTextSelection: true,
                markDirty: false,
            },
            columnLines: true,
            columns: {
                defaults: {
                    align: 'center',
                    menuDisabled: true,
                    sortable: true,
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
                    {text: 'User',
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center',
                            border: true
                        },
                        columns: [
                            {text: 'Creator', dataIndex: 'regis', width: 100},
                        ]
                    },
                    {text: 'Generation',
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center',
                            border: true
                        },
                        columns: [
                            {text: 'Date', dataIndex: 'fregis', width: 100},
                        ]
                    },
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
                            {text: 'Exonerados', dataIndex: 'exonerados', width: 90, align: 'center',
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'background:#A7ECC9;color:#256892;text-align:center;font-weight: bold;';
                                    return value || 0;
                                }
                            },
                            {text: 'Differences', width: 90, align: 'center',
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'background:#A7ECC9;color:red;text-align:center;font-weight: bold;';
                                    let loaded = record.get('loaded')||0;
                                    let received = record.get('received')||0;
                                    let exonerados = record.get('exonerados')||0;
                                    let resta = (received - loaded) - exonerados;
                                    return resta;
                                }
                            },
                        ]
                    }
                ]
            },
            bbar: Ext.create('Ext.toolbar.Paging', {
                id: prototype.id + '-summary-paggin01',
                displayInfo: true, // display additional information like "Displaying x of y items"
            })
        });
        me.items = panel;
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

