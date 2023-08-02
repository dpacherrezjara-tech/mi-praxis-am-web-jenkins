/* 
 * @Dvicente
 */

Ext.define('Ext.Praxis.view.payments.InputsTamizForm.GridDataDetailC', {
    extend: 'Ext.panel.Panel',
    height: 650,
    width: 1400,
    layout: 'fit',
    align: 'center',
    config: {
        searchParams: null,
        searchUrl: null,
        volverCallback: null
    },
    items: [],
    listeners: {
        afterrender: function (panel) {
            panel.getData();
        }
    },
    initComponent: function () {
        const  me = this;
        let tipo = me.searchParams.TIPO === 'R' ? 'Received' : 'Loaded';
        me.title = `${me.searchParams.TIPO}-${me.searchParams.FECHA_FROM}`;
        me.titleAlign = 'center';
        const opts = {
            'R': () => {
                return Ext.create('Ext.grid.Panel', {
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
                                listeners: {
                                    click: 'downloadComplement'
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
                            {text: 'RN', dataIndex: 'RN', width: 50},
                            {text: 'Processing<br>Date', dataIndex: 'PRDA', width: 120},
                            {text: 'Complement<br>Type', dataIndex: 'CMPLTYPE', flex: 1},
                            {text: 'ID File', dataIndex: 'IDFIL', width: 70},
                            {text: 'SQNR', dataIndex: 'SQNR', width: 70},
                            {text: 'Record<br>Type', dataIndex: 'RECTYPE', width: 70},
                            {text: 'Max Long', dataIndex: 'MAXLONG', flex: 1}
                        ]
                    },
                    bbar: {
                        xtype: 'pagingtoolbar',
                        id: prototype.id + `-${tipo}-paggin01`,
                        displayInfo: true // display additional information like "Displaying x of y items"
                    }
                });
            },
            'L': () => {
                return Ext.create('Ext.grid.Panel', {
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
                                listeners: {
                                    click: 'downloadComplement'
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
                        ]
                    },
                    bbar: {
                        xtype: 'pagingtoolbar',
                        id: prototype.id + `-${tipo}-paggin01`,
                        displayInfo: true // display additional information like "Displaying x of y items"
                    }
                });
            }
        };
        me.items = opts[me.searchParams.TIPO]();
        me.callParent(arguments);
    },
    getData: async function () {
        const me = this;
        let tipo = me.searchParams.TIPO === 'R' ? 'Received' : 'Loaded';
        let store = Ext.create('Ext.data.Store', {
            storeId: prototype.id + `-detailC-${tipo}-store`,
            loadMask: true,
            proxy: {
                type: 'ajax',
                enablePaging: true,
                url: me.searchUrl,
                extraParams: me.searchParams,
                timeout: 600000,
                reader: {
                    type: 'json',
                    rootProperty: 'lst',
                    totalProperty: 'total'
                }
            },
            autoLoad: true,
            pageSize: 20,
            listeners: {
                load: function (store, records, successful, operation) {
                    if (!successful) {
                        global.Msg({msg: 'Data not Found'});
                        //console.log(records);
                    } else {
                        //console.log(records);
                        if (records.length === 0)
                            global.Msg({
                                msg: 'Data not found'
                            });
                    }
                }
            }
        });
        me.configurarCols(Ext.getCmp(prototype.id + `-grid-${tipo}01`), store);
    },
    configurarCols: function (grid, store) {
        const me = this;
        if (me.searchParams.TIPO === 'R') {
            win.lblUser_toolTip("Estructura: A4449 | A4450");
            grid.bindStore(store);
            return;
        }
        let cols = [];
        if (me.searchParams.COMPLEMENTO === 'PLUSG00') {
            win.lblUser_toolTip("Estructura: 4453");
            cols = [
                {text: 'RN', dataIndex: 'RN', width: 100},
                {text: 'AMOUNTOFF', dataIndex: 'AMOUNTOFF', width: 100},
                {text: 'AMOUNTOTP', dataIndex: 'AMOUNTOTP', width: 100},
                {text: 'AMOUNTPAX', dataIndex: 'AMOUNTPAX', width: 100},
                {text: 'AREFNBR', dataIndex: 'AREFNBR', width: 100},
                {text: 'AUXDAT', dataIndex: 'AUXDAT', width: 100},
                {text: 'CCUST', dataIndex: 'CCUST', width: 100},
                {text: 'CERROR', dataIndex: 'CERROR', width: 100},
                {text: 'COUNTRY', dataIndex: 'COUNTRY', width: 100},
                {text: 'CUROFFER', dataIndex: 'CUROFFER', width: 100},
                {text: 'CURRPARTN', dataIndex: 'CURRPARTN', width: 100},
                {text: 'DATEUPUTC', dataIndex: 'DATEUPUTC', width: 100},
                {text: 'DEPDATE', dataIndex: 'DEPDATE', width: 100},
                {text: 'DEPTIME', dataIndex: 'DEPTIME', width: 100},
                {text: 'DEST', dataIndex: 'DEST', width: 100},
                {text: 'EMDNUMBER', dataIndex: 'EMDNUMBER', width: 100},
                {text: 'FARECLASS', dataIndex: 'FARECLASS', width: 100},
                {text: 'INSUPGRAD', dataIndex: 'INSUPGRAD', width: 100},
                {text: 'LIVEAOPEN', dataIndex: 'LIVEAOPEN', width: 100},
                {text: 'MERCHID', dataIndex: 'MERCHID', width: 100},
                {text: 'NEWTKTNBR', dataIndex: 'NEWTKTNBR', width: 100},
                {text: 'ORIBOOKCL', dataIndex: 'ORIBOOKCL', width: 100},
                {text: 'ORIG', dataIndex: 'ORIG', width: 100},
                {text: 'PAYTOKEN', dataIndex: 'PAYTOKEN', width: 100},
                {text: 'PAYTRANID', dataIndex: 'PAYTRANID', width: 100},
                {text: 'PLUSGRAID', dataIndex: 'PLUSGRAID', width: 100},
                {text: 'PNR', dataIndex: 'PNR', width: 100},
                {text: 'PRDA', dataIndex: 'PRDA', width: 100},
                {text: 'QTYTKT', dataIndex: 'QTYTKT', width: 100},
                {text: 'SAGENT', dataIndex: 'SAGENT', width: 100},
                {text: 'SCARCOD', dataIndex: 'SCARCOD', width: 100},
                {text: 'SCARDBIN', dataIndex: 'SCARDBIN', width: 100},
                {text: 'SDATE', dataIndex: 'SDATE', width: 100},
                {text: 'SDATES', dataIndex: 'SDATES', width: 100},
                {text: 'TRVFIRSNA', dataIndex: 'TRVFIRSNA', width: 100},
                {text: 'TRVLASTNA', dataIndex: 'TRVLASTNA', width: 100},
                {text: 'UPGRATYPE', dataIndex: 'UPGRATYPE', width: 100},
                {text: 'USERTICKE', dataIndex: 'USERTICKE', width: 100},
                {text: 'USERUPGRA', dataIndex: 'USERUPGRA', width: 100}
            ];
        } else {
            win.lblUser_toolTip("Estructura: A4454");
            cols = [
                {text: 'RN', dataIndex: 'RN', width: 100},
                {text: 'AREFNBR', dataIndex: 'AREFNBR', width: 100},
                {text: 'BANCOEMI', dataIndex: 'BANCOEMI', width: 100},
                {text: 'CCUST', dataIndex: 'CCUST', width: 100},
                {text: 'CERROR', dataIndex: 'CERROR', width: 100},
                {text: 'CHADJNBR', dataIndex: 'CHADJNBR', width: 100},
                {text: 'COUNTRY', dataIndex: 'COUNTRY', width: 100},
                {text: 'ESTATUS', dataIndex: 'ESTATUS', width: 100},
                {text: 'MERCHID', dataIndex: 'MERCHID', width: 100},
                {text: 'NAMECARD', dataIndex: 'NAMECARD', width: 100},
                {text: 'NAMECLIEN', dataIndex: 'NAMECLIEN', width: 100},
                {text: 'NAMEMERCH', dataIndex: 'NAMEMERCH', width: 100},
                {text: 'OPERATNBR', dataIndex: 'OPERATNBR', width: 100},
                {text: 'PNR', dataIndex: 'PNR', width: 100},
                {text: 'PRDA', dataIndex: 'PRDA', width: 100},
                {text: 'SAUTHOC', dataIndex: 'SAUTHOC', width: 100},
                {text: 'SCARDN', dataIndex: 'SCARDN', width: 100},
                {text: 'SDATE', dataIndex: 'SDATE', width: 100},
                {text: 'SUCURNAME', dataIndex: 'SUCURNAME', width: 100},
                {text: 'SVFOP', dataIndex: 'SVFOP', width: 100},
                {text: 'TICKET1', dataIndex: 'TICKET1', width: 100},
                {text: 'TICKET2', dataIndex: 'TICKET2', width: 100},
                {text: 'TICKET3', dataIndex: 'TICKET3', width: 100},
                {text: 'TICKET4', dataIndex: 'TICKET4', width: 100},
                {text: 'TICKET5', dataIndex: 'TICKET5', width: 100},
                {text: 'TICKET6', dataIndex: 'TICKET6', width: 100},
                {text: 'TICKET7', dataIndex: 'TICKET7', width: 100},
                {text: 'TICKET8', dataIndex: 'TICKET8', width: 100},
                {text: 'TICKET9', dataIndex: 'TICKET9', width: 100},
                {text: 'TICKET10', dataIndex: 'TICKET10', width: 100},
                {text: 'TIPOCARD', dataIndex: 'TIPOCARD', width: 100},
                {text: 'TIPOPAGO', dataIndex: 'TIPOPAGO', width: 100},
                {text: 'TIPOVENTA', dataIndex: 'TIPOVENTA', width: 100},
                {text: 'USERCOBRO', dataIndex: 'USERCOBRO', width: 100}
            ];
        }
        grid.reconfigure(store, cols);
    }
});

