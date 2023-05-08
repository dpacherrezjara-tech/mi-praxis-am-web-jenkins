/* 
 * @Dvicente
 */

Ext.define('Ext.Praxis.view.payments.InputsTamizForm.GridData', {
    extend: 'Ext.panel.Panel',
    height: 650,
    width: 1400,
    layout: 'fit',
    align: 'center',
    config: {
        procesador: null,
        searchParams: null,
        searchUrl: null,
        clickCallback: null
    },
    //padding: '10 10 10 10',
    fechas: [],
    items: [],
    initComponent: function () {
        let me = this;
        me.title = me.procesador ? `Detail TMZ: ${me.procesador}` : 'Detail TMZ';
        let detailStore = Ext.create('Ext.data.Store', {
            storeId: prototype.id + '-detail-store',
            loadMask: true,
            proxy: {
                type: 'ajax',
                enablePaging: true,
                url: me.searchUrl,
                extraParams: me.searchParams,
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            },
            autoLoad: true,
            listeners: {
                load: function (store, records, successful, operation) {
                    if (successful) {
                        let rec = records[0].data.page;
                        Ext.getCmp(prototype.id + '-lbl-det-currentPage').setText(rec.PAGNUM);
                        Ext.getCmp(prototype.id + '-lbl-det-pageCount').setText(rec.TOTPAG);
                        Ext.getCmp(prototype.id + '-lbl-det-total').setText(rec.TOTROW);
                        //Ext.getCmp().setText();
                    } else {
                        global.Msg({msg: 'Data not Found'});
                    }
                }
            }
        });

        let panel = Ext.create('Ext.grid.Panel', {
            store: detailStore,
            height: 580,
            width: 1400,
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
                    {text: 'Seq', dataIndex: 'RN', width: 50},
                    {text: 'Processing',
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center',
                            border: true
                        },
                        columns: [
                            {text: 'Date', width: 100, flex: 1, dataIndex: 'strFormatDate',
                                listeners: {
                                    click: 'searchDelivery_clickHandler'
                                },
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'color:#057ECB;text-align:center;text-decoration:none;font-weight:bold;';
                                    return '<a href="#payments-inputs-form" style="color:#057ECB;text-decoration:none;font-weight:bold;">' + value + '</a>';
                                }
                            },
                            {text: 'Time', dataIndex: 'strDescripcion1', width: 70}
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
                            {text: 'Creator', dataIndex: 'USCR', width: 100},
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
                            {text: 'Date', dataIndex: 'strFormatDate3', width: 100},
                        ]
                    },
                    {text: 'Source', dataIndex: 'FUENTE', width: 100},
                    {text: 'Total Records',
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center'
                        },
                        columns: [
                            {text: 'Received', dataIndex: 'IN_TIPOFECHA', width: 70},
                            {text: 'Read', dataIndex: 'QRECOR', width: 70, align: 'center'},
                            {text: 'Loaded', dataIndex: 'QRECORG', width: 70, align: 'center'},
                            {text: 'Error', width: 70, flex: 1, dataIndex: 'QRECERR',
                                listeners: {
                                    click: 'searchDelivery_clickHandler'
                                },
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = 'color:#057ECB;text-align:center;text-decoration:none;font-weight:bold;';
                                    return '<a href="#payments-inputs-form" style="color:#057ECB;text-decoration:none;font-weight:bold;">' + value + '</a>';
                                }
                            }
                        ]
                    },
                    {
                        text: 'Details / error Message', dataIndex: 'MENSA', width: 380,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            var data = record.data;
                            metaData.style = "text-align:left;";
                            metaData.tdAttr = 'data-qtip="' + data.MENSA + '"';
                            return value;
                        }
                    }
                ]
            }
        });
        me.items = panel;
        me.callParent(arguments);
    }

});

