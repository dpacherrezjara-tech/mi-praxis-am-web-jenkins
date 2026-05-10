Ext.define('Ext.Praxis.view.payments.InputsTamizForm.Grids.GridDataDetailComplement', {
    extend: 'Ext.panel.Panel',
    height: 650,
    width: 1400,
    layout: 'fit',
    align: 'center',
    config: {
        searchParams: null,
        volverCallback: null
    },
    items: [],
    initComponent: function () {
        const  me = this;
        let tipo = me.searchParams.TIPO === 'R' ? 'Received' : 'Loaded';
        me.title = `${tipo} Detail - ${me.titleGrid}`;
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
                            {text: 'Complement<br>Type', dataIndex: 'CMPLTYPE', width: 140},
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
    configurarCols: function (grid, store) {
        const me = this;
        if (me.searchParams.TIPO === 'R') { 
            grid.bindStore(store);
            return;
        }
        let cols = [];
        if (me.searchParams.COMPLEMENTO === 'PLUSG00') {
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
        } 
        if (me.searchParams.COMPLEMENTO === 'LIGTAB00') {
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
        if (me.searchParams.COMPLEMENTO === 'MIT00') {
            win.lblUser_toolTip("Estructura: A4775");
            cols = [
                {text: 'RN', dataIndex: 'RN', width: 40, xtype: 'rownumberer'},
                {text: 'Processor',        dataIndex: 'A4775PROCE', width: 85},
                {text: 'Processing<br>Date', dataIndex: 'A4775PRDA', width: 90},
                {text: 'Merchant',         dataIndex: 'A4775MERID', width: 85},
                {text: 'Iata',             dataIndex: 'A4775MERPG', width: 85},
                {
                    text: 'Transaction',
                    defaults: {menuDisabled: true, sortable: false, align: 'center'},
                    columns: [
                        {text: 'Date', dataIndex: 'A4775FECTR', width: 80},
                        {text: 'Time', dataIndex: 'A4775HORTR', width: 80}
                    ]
                },
                {
                    text: 'Credit Card',
                    defaults: {menuDisabled: true, sortable: true, align: 'center'},
                    columns: [
                        {text: 'Number',       dataIndex: 'A4775NUMTJ', width: 120},
                        {text: 'Auth.',        dataIndex: 'A4775NUMAT', width: 80},
                        {text: 'Type',         dataIndex: 'A4775PRICD', width: 100},
                        {text: 'Payment Type', dataIndex: 'A4775PLANP', width: 100},
                        {text: 'Issuer',       dataIndex: 'A4775EMISO', width: 100}
                    ]
                },
                {text: 'PNR',              dataIndex: 'A4775PNR',   width: 90},
                {text: 'Currency',         dataIndex: 'A4775MONED', width: 85},
                {text: 'Amount',           dataIndex: 'A4775IMPOR', width: 85,
                    renderer: function (value) {
                        return Ext.util.Format.number(value, '0,000.00');
                    }
                },
                {text: 'Type<br>Transaction',  dataIndex: 'A4775TRXTP', width: 100},
                {text: 'Issuing Bank',         dataIndex: 'A4775BANCO', width: 250},
                {text: 'Number<br>Operation',  dataIndex: 'A4775NROOP', width: 100},
                {text: 'Status',               dataIndex: 'A4775STATU', width: 100},
                {text: 'Status<br>Transaction',dataIndex: 'A4775STVAL', width: 100},
                {text: 'User',                 dataIndex: 'A4775USUAR', width: 100},
                {text: 'User<br>Transaction',  dataIndex: 'A4775USUAT', width: 100}
            ];
        }
        if (me.searchParams.COMPLEMENTO === 'DEUNA00') {
            win.lblUser_toolTip("Estructura: A4791");
            cols = [
                {text: 'RN', dataIndex: 'RN', xtype: 'rownumberer', width: 40},
                {text: 'Order ID',              dataIndex: 'A4791ORDER', width: 170},
                {text: 'Processing<br>Date',    dataIndex: 'A4791PRDA',  width: 80},
                {text: 'Ticket',                dataIndex: 'A4791TKT',   width: 100},
                {text: 'PNR',                   dataIndex: 'A4791PNR',   width: 80},
                {text: 'Transaction<br>Id',     dataIndex: 'A4791TRANS', width: 150},
                {
                    text: 'Credit Card',
                    defaults: {menuDisabled: true, sortable: true, align: 'center'},
                    columns: [
                        {text: 'Number',      dataIndex: 'SCARDN',     width: 120},
                        {text: 'Auth.',       dataIndex: 'A4791AUTH',  width: 80},
                        {text: 'Issue.',      dataIndex: 'A4791ISSBK', width: 70},
                        {text: 'Method<br>Type', dataIndex: 'A4791MTYPE', width: 70},
                        {text: 'Card Brand',  dataIndex: 'A4791CARDB', width: 80}
                    ]
                },
                {text: 'Currency', dataIndex: 'A4791CURRE', width: 80,
                    renderer: function (value, metaData) {
                        metaData.style = 'text-align:center;background-color:#B2DAFA';
                        return value;
                    }
                },
                {text: 'Total',                  dataIndex: 'A4791TOTAL', width: 100,
                    renderer: function (value, metaData) {
                        metaData.style = 'text-align:center;background-color:#B2DAFA';
                        return Ext.util.Format.number(value, '0,000.00');
                    }
                },
                {text: 'Sub Total',              dataIndex: 'A4791SUBTO', width: 100,
                    renderer: function (value, metaData) {
                        metaData.style = 'text-align:center;background-color:#B2DAFA';
                        return Ext.util.Format.number(value, '0,000.00');
                    }
                },
                {text: 'Ship Amount<br>Total',   dataIndex: 'A4791SHIPT', width: 100,
                    renderer: function (value, metaData) {
                        metaData.style = 'text-align:center;background-color:#B2DAFA';
                        return Ext.util.Format.number(value, '0,000.00');
                    }
                },
                {text: 'Discount<br>Amount<br>Total', dataIndex: 'A4791DISCO', width: 100,
                    renderer: function (value, metaData) {
                        metaData.style = 'text-align:center;background-color:#B2DAFA';
                        return Ext.util.Format.number(value, '0,000.00');
                    }
                },
                {text: 'Tax Amount<br>Total',    dataIndex: 'A4791TAX',   width: 100,
                    renderer: function (value, metaData) {
                        metaData.style = 'text-align:center;background-color:#B2DAFA';
                        return Ext.util.Format.number(value, '0,000.00');
                    }
                },
                {text: 'Total Amount<br>With Taxes', dataIndex: 'A4791TOTWT', width: 100,
                    renderer: function (value, metaData) {
                        metaData.style = 'text-align:center;background-color:#B2DAFA';
                        return Ext.util.Format.number(value, '0,000.00');
                    }
                },
                {text: 'Total Order<br>Amount',  dataIndex: 'A4791TORDE', width: 100,
                    renderer: function (value, metaData) {
                        metaData.style = 'text-align:center;background-color:#B2DAFA';
                        return Ext.util.Format.number(value, '0,000.00');
                    }
                },
                {text: 'Status<br>Complement',   dataIndex: 'A4791STATU', width: 100},
                {text: 'DEUNA<br>Processor',     dataIndex: 'A4791PROCE', width: 100},
                {
                    text: 'Reconciliation',
                    defaults: {menuDisabled: true, sortable: false, align: 'center'},
                    columns: [
                        {text: 'Status',              dataIndex: 'STVAL_DESCRIPTION',  width: 80},
                        {text: 'Processor',           dataIndex: 'PROSQ_DESCRIPTION',  width: 100},
                        {text: 'Processing<br>Date',  dataIndex: 'A4791PRDAL',         width: 90},
                        {text: 'Ref. Number',         dataIndex: 'A4791AREFN',         width: 150}
                    ]
                },
                {
                    text: 'Merchant',
                    defaults: {menuDisabled: true, sortable: false, align: 'center'},
                    columns: [
                        {text: 'Id',      dataIndex: 'A4791MERID', width: 150},
                        {text: 'Country', dataIndex: 'A4791MERPS', width: 70}
                    ]
                },
                {text: 'Interest Rate',          dataIndex: 'A4791RATE',  width: 100},
                {text: 'MSI',                    dataIndex: 'A4791MSI',   width: 100},
                {text: 'Installments',           dataIndex: 'A4791INSTA', width: 100},
                {text: 'Installments<br>Amount', dataIndex: 'A4791INSTM', width: 100,
                    renderer: function (value, metaData) {
                        metaData.style = 'text-align:center;background-color:#B2DAFA';
                        return Ext.util.Format.number(value, '0,000.00');
                    }
                },
                {text: 'Date Create', dataIndex: 'A4791FECPG', width: 140},
                {
                    text: 'Updated',
                    defaults: {menuDisabled: true, sortable: false, align: 'center'},
                    columns: [
                        {text: 'User', dataIndex: 'A4791REVIS', width: 80},
                        {text: 'Date', dataIndex: 'A4791FREVI', width: 80}
                    ]
                }
            ];
        }

        grid.reconfigure(store, cols);
    }
});

