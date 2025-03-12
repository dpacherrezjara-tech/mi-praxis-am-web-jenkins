

Ext.define('Ext.Praxis.view.payments.ErrorControlForm.ChargeGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-chargeGrid',
    config: {
        searchParams: null,
        searchUrl: null,
        url: CONTEXTPATH + '/ErrorControl'
    },
    listeners: {
        afterrender: function (view) {
            this.getData();
        }
    },
    //<editor-fold defaultstate="collapsed" desc="Items">
    title: 'Detail Log Errors',
    titleAlign: 'center',
    height: 625,
    width: 800,
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
            //<editor-fold defaultstate="collapsed" desc="Summary Cols">
            {
                text: 'RN', dataIndex: 'rn', width: 40
            },
            {
                text: 'File Description', dataIndex: 'a4451DESC1', flex:1
            },
            {
                text: 'Processing<br>Date', dataIndex: 'a4297fprda', width: 80
            },
            {
                text: 'Load<br>Date', dataIndex: 'a4297fregi', width: 80
            },
            {
                text: 'ID File', dataIndex: 'a4297idfil', width: 80
            },
            {
                text: 'Error Code', dataIndex: 'a4297cderr', width: 80
            },
            {
                text: 'Error<br>Description', dataIndex: 'a4480DES', flex:1
            }
                    //</editor-fold>
        ]
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
                //id: prototype.id + '-btnExcel',
                //text:'<strong>Excel</strong>',
                iconCls: 'prx-icon-excel',
                scale: 'small',
                tooltip: 'Export to Excel',
                listeners: {
                    click: function (obj) {
                        obj.up().up().downloadGrid();
                    }
                }
            },
            {
                text: '<strong style="color:white;">Back<strong>',
                id: prototype.id + '-detArch-btnBack',
                cls: 'x-btn-sent',
                width: 100,
                scale: 'small',
                overCls: 'x-btn-sent-over',
                listeners: {
                    click: function (btn) {
                        const panel = btn.up().up().up();
                        const views = panel.items.items;
                        views.at(-1).destroy();
                        views.at(-1).show();
                    }
                }
            }
        ]
    },
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true
    },
    //</editor-fold>
    getData: function () {
        const me = this;
        if (me.searchParams && me.searchUrl) {
            const grid = me;
            let store = Ext.create('Ext.data.Store', {
                storeId: prototype.id + `-detailArch-store`,
                loadMask: true,
                pageSize: 20,
                proxy: {
                    type: 'ajax',
                    enablePaging: true,
                    url: me.searchUrl,
                    extraParams: me.formatParams(me.searchParams),
                    timeout: 600000,
                    reader: {
                        type: 'json',
                        rootProperty: 'lst',
                        totalProperty: 'total'
                    }
                },
                autoLoad: true,
                listeners: {
                    load: function (store, records, successful, operation) {
                        if (!successful) {
                            global.Msg({msg: 'Data not Found'});
                        } else {
                            console.log(records);
                            if (records.length === 0) {
                                global.Msg({msg: 'Data not Found'});
                            }
                            //console.log(records);
                        }
                    }
                }
            });
            //console.log(this.formatParams(me.searchParams));
            grid.bindStore(store);
        }
    },
    formatParams: function (searchParams) {
        let params = {
            ...searchParams
        };
        return params;
    },
    downloadGrid:function(){
        const me = this;
        if(me.searchParams){
           let params = me.formatParams(me.searchParams);
           params.excel = true;
           console.log(params);
           global.getFile(`${me.url}/downloadErrorArchDetail?${new URLSearchParams(params)}`);
        }
    }
});