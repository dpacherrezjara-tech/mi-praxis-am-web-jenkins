Ext.define('Ext.Praxis.view.payments.InputsTamizForm.Grids.GridDataDetailProcessor', {
    extend: 'Ext.panel.Panel',
    height: 650,
    width: 1400,
    layout: 'fit',
    align: 'center',
    config: {
        tipoGrid: null,
        titleGrid: null,
        volverCallback: null
    },
    fechas: [],
    items: [],
    initComponent: function () {
        const me = this;
        let tipo = '';
        if (me.tipoGrid === '0') {
            tipo = 'Received';
        } else if (me.tipoGrid === '1') {
            tipo = 'Loaded';
        } else if (me.tipoGrid === '2') {
            tipo = 'Exonerated';
        } else if (me.tipoGrid === '3') {
            tipo = 'By Payment';
        } else {
            tipo = 'Unknown';
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
                            listeners: {
                                click: 'downloadProcessor'
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
                        {text: 'Seq', dataIndex: 'RN', width: 50},
                        {text: 'Grupo', dataIndex: 'A4305GRUPO', width: 100},
                        {text: 'Procesador', dataIndex: 'A4305PROCE', width: 160,
                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                return me.titleGrid.split(' ')[0];
                            }
                        },
                        {text: 'Fecha de Proceso', dataIndex: 'A4305PRDA', width: 120},
                        {text: 'Territorio', dataIndex: 'A4305TERRI', width: 100},
                        {text: 'Pais', dataIndex: 'A4305PAIS', width: 100},
                        {text: 'Merchant ID', dataIndex: 'A4305MERID', width: 150},
                        {text: 'Merchant<br>Liq Pago', dataIndex: 'A4305MERPG', width: 150},
                        {text: 'Merchant ID<br>Party', dataIndex: 'A4305MERPI', width: 150},
                        {text: 'Merchant Pago<br>Party', dataIndex: 'A4305MERPP', width: 150},
                        {text: 'Fecha de<br>Transaccion', dataIndex: 'A4305FECTR', width: 120},
                        {text: 'Num.<br>Tarjeta', dataIndex: 'A4305NUMTJ', width: 150},
                        {text: 'Num.<br>Autorizacion', dataIndex: 'A4305NUMAT', width: 100},
                        {text: 'Num. Cuotas', dataIndex: 'A4305NUMCU', width: 100},
                        {text: 'Total Cuotas', dataIndex: 'A4305TOTCU', width: 100},
                        {text: 'Plan de Pagos', dataIndex: 'A4305PLANP', width: 100,
                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                const opts = {
                                    'R': 'REGULAR',
                                    'C': 'CUOTAS',
                                    '': ''
                                };
                                return opts[value.trim()];
                            }
                        },
                        {text: 'Cia', dataIndex: 'A4305CIA', width: 50},
                        {text: 'Documento', width: 120,
                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                const doc = record.get('A4305FORMA') + record.get('A4305SERIE');
                                return doc;
                            }
                        },
                        {text: 'Dig. Chequeo', dataIndex: 'A4305DCHEQ', width: 100},
                        {text: 'PNR', dataIndex: 'A4305PNR', width: 90},
                        {text: 'Cod. Razon', dataIndex: 'A4305RFIC', width: 100},
                        {text: 'Subc. Razon', dataIndex: 'A4305RFIS', width: 100},
                        {text: 'Agente', dataIndex: 'A4305IATA', width: 120},
                        {text: 'Pais<br>Venta', dataIndex: 'A4305PSVTA', width: 100}
                    ]
                },
                bbar: Ext.create('Ext.toolbar.Paging', {
                    id: prototype.id + `-${tipo}-paggin01`,
                    displayInfo: true
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
                            listeners: {
                                click: 'downloadProcessor'
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
                        {text: 'RN', dataIndex: 'RN', width: 50},
                        {text: 'Procesador', dataIndex: 'PROCESADOR', width: 150,
                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                return me.titleGrid.split(' ')[0];
                            }
                        },
                        {text: 'Carrier', dataIndex: 'CXRRNUM', width: 70},
                        {text: 'Max Long', dataIndex: 'TAMMAXLONG', flex: 1},
                        {text: 'Fecha<br>Proceso', dataIndex: 'TRADM', width: 120}
                    ]
                },
                bbar: Ext.create('Ext.toolbar.Paging', {
                    id: prototype.id + `-${tipo}-paggin01`,
                    displayInfo: true
                })
            });
        } else if (me.tipoGrid === '2') {
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
                            listeners: {
                                click: 'downloadProcessor'
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
                        {text: 'Seq', dataIndex: 'RN', width: 50},
                        {text: 'Grupo', dataIndex: 'A4305GRUPO', width: 100},
                        {text: 'Procesador', dataIndex: 'A4305PROCE', width: 160,
                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                return me.titleGrid.split(' ')[0];
                            }
                        },
                        {text: 'Fecha de Proceso', dataIndex: 'A4305PRDA', width: 120},
                        {text: 'Territorio', dataIndex: 'A4305TERRI', width: 100},
                        {text: 'Pais', dataIndex: 'A4305PAIS', width: 100},
                        {text: 'Merchant ID', dataIndex: 'A4305MERID', width: 150},
                        {text: 'Merchant<br>Liq Pago', dataIndex: 'A4305MERPG', width: 150},
                        {text: 'Merchant ID<br>Party', dataIndex: 'A4305MERPI', width: 150},
                        {text: 'Merchant Pago<br>Party', dataIndex: 'A4305MERPP', width: 150},
                        {text: 'Fecha de<br>Transaccion', dataIndex: 'A4305FECTR', width: 120},
                        {text: 'Num.<br>Tarjeta', dataIndex: 'A4305NUMTJ', width: 150},
                        {text: 'Num.<br>Autorizacion', dataIndex: 'A4305NUMAT', width: 100},
                        {text: 'Num. Cuotas', dataIndex: 'A4305NUMCU', width: 100},
                        {text: 'Total Cuotas', dataIndex: 'A4305TOTCU', width: 100},
                        {text: 'Plan de Pagos', dataIndex: 'A4305PLANP', width: 100,
                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                const opts = {
                                    'R': 'REGULAR',
                                    'C': 'CUOTAS',
                                    '': ''
                                };
                                return opts[value.trim()];
                            }
                        },
                        {text: 'Cia', dataIndex: 'A4305CIA', width: 50},
                        {text: 'Documento', width: 120,
                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                const doc = record.get('A4305FORMA') + record.get('A4305SERIE');
                                return doc;
                            }
                        },
                        {text: 'Dig. Chequeo', dataIndex: 'A4305DCHEQ', width: 100},
                        {text: 'PNR', dataIndex: 'A4305PNR', width: 90},
                        {text: 'Cod. Razon', dataIndex: 'A4305RFIC', width: 100},
                        {text: 'Subc. Razon', dataIndex: 'A4305RFIS', width: 100},
                        {text: 'Agente', dataIndex: 'A4305IATA', width: 120},
                        {text: 'Pais<br>Venta', dataIndex: 'A4305PSVTA', width: 100}
                    ]
                },
                bbar: Ext.create('Ext.toolbar.Paging', {
                    id: prototype.id + `-${tipo}-paggin01`,
                    displayInfo: true
                })
            });
        } else if (me.tipoGrid === '3') {
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
                            listeners: {
                                click: 'downloadProcessor'
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
                        {text: 'Seq', dataIndex: 'RN', width: 50},
                        {text: 'Processing<br>Date', dataIndex: 'PRDA', width: 100},
                        {text: 'Payment<br>Date', dataIndex: 'PAYDATE', width: 100},
                        {text: 'Procesador', dataIndex: 'PROCESSOR_DESCRIPTION', width: 160},
                        {text: 'Pais', dataIndex: 'SCOUNTRY', width: 70},
                        {text: 'Payment<br>Merchant ID', dataIndex: 'PMERCHID', width: 150},
                        {text: 'Status<br>Settl. VS Sales', dataIndex: 'STVAL_DESCRIPTION', width: 150},
                        {text: 'Doc.<br>Type', dataIndex: 'TRANSTYPE', width: 70},
                        {text: 'Num.<br>Tarjeta', dataIndex: 'SCARDN', width: 150},
                        {text: 'Num.<br>Autorizacion', dataIndex: 'SAUTHOC', width: 100},
                        {text: 'PNR', dataIndex: 'SPNR', width: 90},
                        {text: 'ARN', dataIndex: 'ARN', width: 150},
                        {text: 'Ref. Number', dataIndex: 'AREFNBR', width: 150},
                        {text: 'Curr', dataIndex: 'SCURRENCY', width: 80},
                        {
                            text: 'Transaction<br>Amount',
                            dataIndex: 'TGROSAMOUN',
                            width: 140,
                            renderer: function(value) {
                                return Ext.util.Format.number(value, '0,000.00');
                            }
                        },
                        {
                            text: 'Sale<br>Amount',
                            dataIndex: 'SVFOPS',
                            width: 120,
                            renderer: function(value) {
                                return Ext.util.Format.number(value, '0,000.00');
                            }
                        },
                        {
                            text: 'Diff.<br>Amount',
                            dataIndex: 'DIFFERENCE',
                            width: 120,
                            renderer: function(value) {
                                return Ext.util.Format.number(value, '0,000.00');
                            }
                        },
                   
                        {text: 'Qty<br>Tkts', dataIndex: 'QTYTKT', width: 70},
                    ]
                },
                bbar: Ext.create('Ext.toolbar.Paging', {
                    id: prototype.id + `-${tipo}-paggin01`,
                    displayInfo: true
                })
            });
       
        }
        else {
            panel = Ext.create('Ext.panel.Panel', {
                id: prototype.id + `-msg-invalid-option`,
                height: 550,
                width: 1390,
                layout: {
                    type: 'vbox',
                    align: 'center',
                    pack: 'center'
                },
                items: [
                    {
                        xtype: 'component',
                        html: '<div style="font-size:1.5em;color:#b94a48;padding:40px;text-align:center;">Invalid option</div>'
                    }
                ]
            });
        }
   
        me.items = panel;
        me.callParent(arguments);
    }
});
