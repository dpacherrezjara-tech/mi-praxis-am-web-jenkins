/* 
 * @Dvicente
 */
Ext.define('Ext.Praxis.view.payments.SalesComplementForm.GridDataTicket', {
    extend: 'Ext.panel.Panel',
    height: 605,
    width: 1800,
    layout: 'fit',
    config: {
        searchParams: null,
        searchUrl: null,
        backButton: null
    },
    items: [],
    listeners: {
        afterrender: function () {
            this.getDataStore(this.gridType);
        }
    },
    //margin: '0 10 0 20',
    initComponent: function () {
        const me = this;
        me.title = 'Plusgrade by Ticket';
        me.titleAlign = 'center';
        me.items = {
            xtype: 'panel',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            region: 'center',
            border: false,
            width: 1500,
            height: 605,
            items: [
                {
                    xtype: 'grid',
                    id: prototype.id + '-grid-tickets-01',
                    height: 580,
                    width: 1365,
                    features: [
                        {
                            dock: 'bottom',
                            ftype: 'summary',
                        }
                    ],
                    tbar: {
                        layout: {
                            pack: 'end'
                        },
                        defaults: {
                            scale: 'medium'
                        },
                        items: [
                            {
                                text: '<strong style="color:white;">Atras<strong>',
                                id: prototype.id + '-det-btnBack-ticket',
                                cls: 'x-btn-sent',
                                width: 100,
                                scale: 'small',
                                overCls: 'x-btn-sent-over',
                                listeners: {
                                    click: function (btn) {
                                        if (me.backButton) {
                                            me.backButton();
                                        }
                                    }
                                }
                            }
                        ]
                    },
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
                            {
                                text: 'Plusgrade ID', dataIndex: 'operatnbr', width: 100
                            },
                            {
                                text: 'PNR', dataIndex: 'spnr', width: 80
                            },
                            {
                                text: 'Sales',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Date', dataIndex: 'sdate', width: 80
                                    },
                                    {
                                        text: 'Type', dataIndex: 'tventa', width: 80
                                    },
                                ]
                            },
                            {
                                text: 'Ticket', dataIndex: 'tkt', flex: 1,
                                listeners: {
                                    click: 'onClickSearchTicket'
                                }, 
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:center;text-decoration:underline;color:#057ECB;cursor:pointer";
                                    value = '<b>' + value + '</b>';
                                    return value;
                                }
                            },
                            {
                                text: 'Country', dataIndex: 'scountry', width: 80
                            },
                            {
                                text: 'Cod Trans',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Used', dataIndex: 'trncu', width: 80
                                    },
                                ]
                            },
                            {
                                text: 'Document',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Type', dataIndex: 'tdoc', width: 80
                                    },
                                ]
                            },
                            {
                                text: 'Agent', dataIndex: 'sagent', width: 80
                            },
                            {
                                text: 'Credit Card',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Code', dataIndex: 'scarcod', width: 80
                                    },
                                    {
                                        text: 'Number', dataIndex: 'scardn', width: 120
                                    },
                                    {
                                        text: 'Auth', dataIndex: 'sauthoc', width: 80
                                    },
                                ]
                            },
                            {
                                text: 'Cur.', dataIndex: 'scurrency', width: 60
                            },
                            {
                                text: 'Amount', dataIndex: 'svfop', width: 80,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;";
                                    return Ext.util.Format.number(value, '0,000.00');
                                },
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                        var data = Ext.getCmp(prototype.id + '-gridDataPGTkt').getStore().getData().items[0].data;
//                                        metaData.style = 'text-align:right; margin-right:3px ';
//                                        return '<b>' + Ext.util.Format.number(data.SVFOP_TOT, '0,000.00') + '<b>';
                                }
                            },
                            {
                                text: 'Reason',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Code', dataIndex: 'RFIC', width: 80
                                    },
                                ]
                            },
                            {
                                text: 'Reason',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Sub Code', dataIndex: 'RFIS1', width: 80
                                    },
                                ]
                            },
                        ]
                    },
                    bbar: Ext.create('Ext.toolbar.Paging', {
                        id: prototype.id + `-tickets-paggin01`,
                        displayInfo: true, // display additional information like "Displaying x of y items"
                    })
                }
            ]
        };
        //me.items = opts[me.gridType]();
        me.callParent(arguments);
    },
    getDataStore: function () {
        const me = this;
        me.mask('Loading Data...');
        let ticketStore = Ext.create('Ext.data.Store', {
            storeId: prototype.id + `-tickets-store`,
            loadMask: true,
            proxy: {
                type: 'ajax',
                enablePaging: true,
                url: me.searchUrl,
                extraParams: me.searchParams,
                timeout: 600000,
                reader: {
                    type: 'json',
                    rootProperty: 'result',
                    totalProperty: 'total'
                }
            },
            autoLoad: true,
            listeners: {
                load: function (store, records, successful, operation) {
                    if (!successful) {
                        global.Msg({msg: 'Data not Found'});
                    }else{
                        if (records.length===0) {
                            global.Msg({msg: 'Data not Found'});
                            let btn = Ext.getCmp(prototype.id + '-det-btnBack-ticket');
                            btn.fireEvent('click',btn);
                        }
                    }
                }
            }
        });
        Ext.getCmp(prototype.id + '-grid-tickets-01').setStore(ticketStore);
        Ext.getCmp(prototype.id + `-tickets-paggin01`).setStore(ticketStore);
        me.unmask();
    }
});

