Ext.define('Ext.Praxis.view.payments.InputsTamizForm.Grids.GridDataDetailProcessor', {
    extend: 'Ext.panel.Panel',
    height: 650,
    width: 1400,
    layout: 'fit',
    align: 'center',
    config: {
        tipoGrid: null,
        searchUrl: null,
        titleGrid: null,
        volverCallback: null
    },
    fechas: [],
    items: [],
    listeners: {
        afterrender: function (panel) {
            panel.getData();
        }
    },
    initComponent: function () {
        const me = this;
        //let tipo = me.tipoGrid === '0' ? 'Received' : 'Loaded';
        let tipo = '';
        if(me.tipoGrid === '0'){
            tipo = 'Received';
        }else if(me.tipoGrid === '1'){
            tipo = 'Loaded';
        }else{
            tipo = 'Exonerated';
        }
        me.title = `${tipo} Detail - ${me.titleGrid}`;
        let panel = null;
        if (me.tipoGrid === '0') {
            panel = Ext.create('Ext.grid.Panel', {
                id: prototype.id + `-grid-${tipo}01`,
                height: 550,
                width: 1390,
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
                            id: prototype.id + '-btnExcel',
                            iconCls: 'prx-icon-excel',
                            tooltip: 'Export to Excel',
                            listeners:{
                                click:'downloadProcessor'
                            }
                        },
                        {
                            text: '<strong style="color:white;">Back<strong>',
                            id: prototype.id + '-det-btn-atras' + tipo,
                            cls: 'x-btn-sent',
                            width: 100,
                            scale: 'small',
                            overCls: 'x-btn-sent-over',
                            listeners: {
                                click: function (btn) {
                                    me.volverCallback(me.id);
                                }
                            }
                        }
                    ]
                },
                columns: {
                    defaults: {
                        align: 'center',
                        menuDisabled: true,
                        sortable: true
                    },
                    items: [
                        {text: 'Seq', dataIndex: 'rn', width: 50},
                        {text: 'Grupo', dataIndex: 'a4305GRUPO', width: 100},
                        {text: 'Procesador', dataIndex: 'a4305PROCE', width: 160,
                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                return me.titleGrid.split(' ')[0];
                            }
                        },
                        {text: 'Fecha de Proceso', dataIndex: 'a4305PRDA', width: 120},
                        {text: 'Territorio', dataIndex: 'a4305TERRI', width: 100},
                        {text: 'Pais', dataIndex: 'a4305PAIS', width: 100},
                        {text: 'Merchant ID', dataIndex: 'a4305MERID', width: 150},
                        {text: 'Merchant<br>Liq Pago', dataIndex: 'a4305MERPG', width: 150},
                        {text: 'Merchant ID<br>Party', dataIndex: 'a4305MERPI', width: 150},
                        {text: 'Merchant Pago<br>Party', dataIndex: 'a4305MERPP', width: 150},
                        {text: 'Fecha de<br>Transaccion', dataIndex: 'a4305FECTR', width: 120},
                        {text: 'Num.<br>Tarjeta', dataIndex: 'a4305NUMTJ', width: 150},
                        {text: 'Num.<br>Autorizacion', dataIndex: 'a4305NUMAT', width: 100},
                        {text: 'Num. Cuotas', dataIndex: 'a4305NUMCU', width: 100},
                        {text: 'Total Cuotas', dataIndex: 'a4305TOTCU', width: 100},
                        {text: 'Plan de Pagos', dataIndex: 'a4305PLANP', width: 100,
                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                const opts = {
                                    'R': 'REGULAR',
                                    'C': 'CUOTAS',
                                    '': ''
                                };
                                return opts[value.trim()];
                            }
                        },
                        {text: 'Cia', dataIndex: 'a4305CIA', width: 50},
                        {text: 'Documento', width: 120,
                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                const doc = record.get('a4305FORMA') + record.get('a4305SERIE');
                                return doc;
                            }
                        },
                        {text: 'Dig. Chequeo', dataIndex: 'a4305DCHEQ', width: 100},
                        {text: 'PNR', dataIndex: 'a4305PNR', width: 90},
                        {text: 'Cod. Razon', dataIndex: 'a4305RFIC', width: 100},
                        {text: 'Subc. Razon', dataIndex: 'a4305RFIS', width: 100},
                        {text: 'Agente', dataIndex: 'a4305IATA', width: 120},
                        {text: 'Pais<br>Venta', dataIndex: 'a4305PSVTA', width: 100}
                    ]
                },
                bbar: Ext.create('Ext.toolbar.Paging', {
                    id: prototype.id + `-${tipo}-paggin01`,
                    displayInfo: true // display additional information like "Displaying x of y items"
                })
            });
        } else if (me.tipoGrid === '1') {
            panel = Ext.create('Ext.grid.Panel', {
                id: prototype.id + `-grid-${tipo}01`,
                height: 550,
                width: 1400,
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
                            id: prototype.id + '-btnExcel',
                            iconCls: 'prx-icon-excel',
                            tooltip: 'Export to Excel',
                            listeners:{
                                click:'downloadProcessor'
                            }
                        },
                        {
                            text: '<strong style="color:white;">Back<strong>',
                            id: prototype.id + '-det-btn-atras' + tipo,
                            cls: 'x-btn-sent',
                            width: 100,
                            scale: 'small',
                            overCls: 'x-btn-sent-over',
                            listeners: {
                                click: function (btn) {
                                    me.volverCallback(me.id);
                                }
                            }
                        }
                    ]
                },
                columnLines: true,
                columns: {
                    defaults: {
                        align: 'center',
                        menuDisabled: true,
                        sortable: true
                    },
                    items: [
                        {text: 'RN', dataIndex: 'rn', width: 50},
                        {text: 'Procesador', dataIndex: 'procesador', width: 150 , 
                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                return me.titleGrid.split(' ')[0];;
                            }
                        },
                        {text: 'Carrier', dataIndex: 'cxrrnum',width:70},
                        {text: 'Max Long', dataIndex: 'tammaxlong',flex:1},
                        {text: 'Fecha<br>Proceso', dataIndex: 'tradm', width: 120}
                        //{text: 'Seq', dataIndex: 'secuencia', width: 60},
                    ]
                },
                bbar: Ext.create('Ext.toolbar.Paging', {
                    id: prototype.id + `-${tipo}-paggin01`,
                    displayInfo: true // display additional information like "Displaying x of y items"
                })
            });
        } else {
            panel = Ext.create('Ext.grid.Panel', {
                id: prototype.id + `-grid-${tipo}01`,
                height: 550,
                width: 1390,
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
                            id: prototype.id + '-btnExcel',
                            iconCls: 'prx-icon-excel',
                            tooltip: 'Export to Excel',
                            listeners:{
                                click:'downloadProcessor'
                            }
                        },
                        {
                            text: '<strong style="color:white;">Back<strong>',
                            id: prototype.id + '-det-btn-atras' + tipo,
                            cls: 'x-btn-sent',
                            width: 100,
                            scale: 'small',
                            overCls: 'x-btn-sent-over',
                            listeners: {
                                click: function (btn) {
                                    me.volverCallback(me.id);
                                }
                            }
                        }
                    ]
                },
                columns: {
                    defaults: {
                        align: 'center',
                        menuDisabled: true,
                        sortable: true
                    },
                    items: [
                        {text: 'Seq', dataIndex: 'rn', width: 50},
                        {text: 'Grupo', dataIndex: 'a4305GRUPO', width: 100},
                        {text: 'Procesador', dataIndex: 'a4305PROCE', width: 160,
                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                return me.titleGrid.split(' ')[0];
                            }
                        },
                        {text: 'Fecha de Proceso', dataIndex: 'a4305PRDA', width: 120},
                        {text: 'Territorio', dataIndex: 'a4305TERRI', width: 100},
                        {text: 'Pais', dataIndex: 'a4305PAIS', width: 100},
                        {text: 'Merchant ID', dataIndex: 'a4305MERID', width: 150},
                        {text: 'Merchant<br>Liq Pago', dataIndex: 'a4305MERPG', width: 150},
                        {text: 'Merchant ID<br>Party', dataIndex: 'a4305MERPI', width: 150},
                        {text: 'Merchant Pago<br>Party', dataIndex: 'a4305MERPP', width: 150},
                        {text: 'Fecha de<br>Transaccion', dataIndex: 'a4305FECTR', width: 120},
                        {text: 'Num.<br>Tarjeta', dataIndex: 'a4305NUMTJ', width: 150},
                        {text: 'Num.<br>Autorizacion', dataIndex: 'a4305NUMAT', width: 100},
                        {text: 'Num. Cuotas', dataIndex: 'a4305NUMCU', width: 100},
                        {text: 'Total Cuotas', dataIndex: 'a4305TOTCU', width: 100},
                        {text: 'Plan de Pagos', dataIndex: 'a4305PLANP', width: 100,
                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                const opts = {
                                    'R': 'REGULAR',
                                    'C': 'CUOTAS',
                                    '': ''
                                };
                                return opts[value.trim()];
                            }
                        },
                        {text: 'Cia', dataIndex: 'a4305CIA', width: 50},
                        {text: 'Documento', width: 120,
                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                const doc = record.get('a4305FORMA') + record.get('a4305SERIE');
                                return doc;
                            }
                        },
                        {text: 'Dig. Chequeo', dataIndex: 'a4305DCHEQ', width: 100},
                        {text: 'PNR', dataIndex: 'a4305PNR', width: 90},
                        {text: 'Cod. Razon', dataIndex: 'a4305RFIC', width: 100},
                        {text: 'Subc. Razon', dataIndex: 'a4305RFIS', width: 100},
                        {text: 'Agente', dataIndex: 'a4305IATA', width: 120},
                        {text: 'Pais<br>Venta', dataIndex: 'a4305PSVTA', width: 100}
                    ]
                },
                bbar: Ext.create('Ext.toolbar.Paging', {
                    id: prototype.id + `-${tipo}-paggin01`,
                    displayInfo: true // display additional information like "Displaying x of y items"
                })
            });
        }

        me.items = panel;
        me.callParent(arguments);
    },
    getData: async function () {
        const me = this;
        let tipo = '';
        if(me.tipoGrid === '0'){
            tipo = 'Received';
        }else if(me.tipoGrid === '1'){
            tipo = 'Loaded';
        }else{
            tipo = 'Exonerated';
        }
        let data = '';
        if(me.tipoGrid === '0'){
            data = 'lstReceived';
        }else if(me.tipoGrid === '1'){
            data = 'lstLoaded';
        }else{
            data = 'lstExonerados';
        }
        //let data = me.tipoGrid === '0' ? 'lstReceived' : 'lstLoaded';
        if (me.tipoGrid === '0') {
            win.lblUser_toolTip("Estructura: A4305");
            let receivedStore = Ext.create('Ext.data.Store', {
                storeId: prototype.id + `-detail-${tipo}-store`,
                loadMask: true,
                proxy: {
                    type: 'ajax',
                    enablePaging: true,
                    url: me.searchUrl,
                    extraParams: me.searchParams,
                    timeout: 600000,
                    reader: {
                        type: 'json',
                        rootProperty: data,
                        totalProperty: 'total'
                    }
                },
                autoLoad: true,
                pageSize:20,
                listeners: {
                    load: function (store, records, successful, operation) {
                        if (!successful) {
                            global.Msg({msg: 'Data not Found'});
                            //console.log(records);
                        }
                    }
                }
            });
            Ext.getCmp(prototype.id + `-grid-${tipo}01`).bindStore(receivedStore);
            Ext.getCmp(prototype.id + `-${tipo}-paggin01`).bindStore(receivedStore);
        } else if (me.tipoGrid === '1'){
            win.lblUser_toolTip("Estructura: A4344");
            let loadedStore = Ext.create('Ext.data.Store', {
                storeId: prototype.id + `-detail-${tipo}-store`,
                loadMask: true,
                proxy: {
                    type: 'ajax',
                    enablePaging: true,
                    url: me.searchUrl,
                    extraParams: me.searchParams,
                    timeout: 600000,
                    reader: {
                        type: 'json',
                        rootProperty: data,
                        totalProperty: 'total'
                    }
                },
                autoLoad: true,
                pageSize:20,
                listeners: {
                    load: function (store, records, successful, operation) {
                        if (!successful) {
                            global.Msg({msg: 'Data not Found'});
                            //console.log(records);
                        }
                    }
                }
            });
            Ext.getCmp(prototype.id + `-grid-${tipo}01`).bindStore(loadedStore);
            Ext.getCmp(prototype.id + `-${tipo}-paggin01`).bindStore(loadedStore);
        } else {
            win.lblUser_toolTip("Estructura: A4305");
            let exoStore = Ext.create('Ext.data.Store', {
                storeId: prototype.id + `-detail-${tipo}-store`,
                loadMask: true,
                pageSize:20,
                proxy: {
                    type: 'ajax',
                    enablePaging: true,
                    url: me.searchUrl,
                    extraParams: me.searchParams,
                    timeout: 600000,
                    reader: {
                        type: 'json',
                        rootProperty: data,
                        totalProperty: 'total'
                    }
                },
                autoLoad: true,
                listeners: {
                    load: function (store, records, successful, operation) {
                        if (!successful) {
                            global.Msg({msg: 'Data not Found'});
                            console.log(records);
                        }
                    }
                }
            });
            Ext.getCmp(prototype.id + `-grid-${tipo}01`).bindStore(exoStore);
            Ext.getCmp(prototype.id + `-${tipo}-paggin01`).bindStore(exoStore);
        }

    }
});

