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
        const tipoId = tipo.replace(/\s+/g, '');
        const amountRenderer = function (value) {
            return Ext.util.Format.number(value || 0, '0,000.00');
        };
        const rateRenderer = function (value) {
            return Ext.util.Format.number(value || 0, '0,000.000000');
        };
        let panel = null;
        if (me.tipoGrid === '0') {
            panel = Ext.create('Ext.grid.Panel', {
                id: prototype.id + `-grid-${tipoId}01`,
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
                            id: prototype.id + '-det-btn-atras' + tipoId,
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
                    id: prototype.id + `-${tipoId}-paggin01`,
                    displayInfo: true
                })
            });
        } else if (me.tipoGrid === '1') {
            panel = Ext.create('Ext.grid.Panel', {
                id: prototype.id + `-grid-${tipoId}01`,
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
                            id: prototype.id + '-det-btn-atras' + tipoId,
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
                    id: prototype.id + `-${tipoId}-paggin01`,
                    displayInfo: true
                })
            });
        } else if (me.tipoGrid === '2') {
            panel = Ext.create('Ext.grid.Panel', {
                id: prototype.id + `-grid-${tipoId}01`,
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
                // Seleccion de las lineas que entran al proceso de generacion de By Payment
                selModel: {
                    selType: 'checkboxmodel',
                    mode: 'MULTI',
                    checkOnly: true,
                    showHeaderCheckbox: true,
                    listeners: {
                        // Las lineas ya migradas por SQP04972 (A4305APLIC = 'B') no vuelven a procesarse.
                        // El veto tambien aplica al check del header, que selecciona fila por fila.
                        beforeselect: function (model, record) {
                            return (record.get('A4305APLIC') || '').trim() !== 'B';
                        }
                    }
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
                            id: prototype.id + '-btnProcessByPayment',
                            iconCls: 'prx-icon-image-process',
                            text: '<strong style="color:white;">Process Exonerated<strong>',
                            cls: 'x-btn-sent',
                            overCls: 'x-btn-sent-over',
                            scale: 'small',
                            disabled: true,
                            tooltip: 'Select the lines to generate to By Payment',
                            listeners: {
                                click: 'processExoneratedToByPayment'
                            }
                        },
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
                            id: prototype.id + '-det-btn-atras' + tipoId,
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
                        {text: 'Status', dataIndex: 'A4305APLIC', width: 100,
                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                if ((value || '').trim() === 'B') {
                                    metaData.style = 'background-color:#C8F4B4;font-weight:bold;';
                                    return 'By Payment';
                                }
                                metaData.style = 'background-color:#FCF6DC;';
                                return 'Exonerated';
                            }
                        },
                        {
                            text: 'Detail',
                            xtype: 'actioncolumn',
                            width: 60,
                            sortable: false,
                            align: 'center',
                            items: [
                                {
                                    iconCls: 'prx-icon-detail',
                                    tooltip: 'View transaction detail on By Payment',
                                    // Solo las lineas ya migradas tienen liquidacion que mostrar
                                    isDisabled: function (view, rowIndex, colIndex, item, record) {
                                        return (record.get('A4305APLIC') || '').trim() !== 'B'
                                                || (record.get('A4305AREFN') || '').toString().trim() === '';
                                    },
                                    handler: 'onClickExoneratedDetail'
                                }
                            ]
                        },
                        {text: 'Ref. Number', dataIndex: 'A4305AREFN', width: 160},
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
                        {text: 'Pais<br>Venta', dataIndex: 'A4305PSVTA', width: 100},
                        {text: 'Type<br>Transaction', dataIndex: 'A4305TRXTP', width: 110},
                        {text: 'Sale<br>Currency', dataIndex: 'A4305MONED', width: 90},
                        {text: 'Transaction<br>Amount', dataIndex: 'A4305IMPOR', width: 130, align: 'right', renderer: amountRenderer},
                        {text: 'Comission<br>Rate', dataIndex: 'A4305RATEC', width: 110, align: 'right', renderer: rateRenderer},
                        {text: 'Comission<br>Amount', dataIndex: 'A4305COMIS', width: 130, align: 'right', renderer: amountRenderer},
                        {text: 'Comission<br>VAT', dataIndex: 'A4305IVACO', width: 130, align: 'right', renderer: amountRenderer},
                        {text: 'Net<br>Amount', dataIndex: 'A4305NETO', width: 130, align: 'right', renderer: amountRenderer},
                        {text: 'Payment<br>Currency', dataIndex: 'A4305MONPG', width: 90},
                        {text: 'Payment<br>Amount', dataIndex: 'A4305IMPPG', width: 130, align: 'right', renderer: amountRenderer},
                        {text: 'Comission<br>Payment', dataIndex: 'A4305COMPG', width: 130, align: 'right', renderer: amountRenderer},
                        {text: 'Comission VAT<br>Payment', dataIndex: 'A4305IVACP', width: 130, align: 'right', renderer: amountRenderer},
                        {text: 'Net<br>Payment', dataIndex: 'A4305NETOP', width: 130, align: 'right', renderer: amountRenderer},
                        {text: 'Service Fee<br>Rate', dataIndex: 'A4305RATEF', width: 110, align: 'right', renderer: rateRenderer},
                        {text: 'Service<br>Fee', dataIndex: 'A4305SFEE', width: 130, align: 'right', renderer: amountRenderer},
                        {text: 'Service Fee<br>Payment', dataIndex: 'A4305SFEPG', width: 130, align: 'right', renderer: amountRenderer},
                        {text: 'Adjustment', dataIndex: 'A4305ADJUS', width: 130, align: 'right', renderer: amountRenderer},
                        {text: 'Adjustment<br>Payment', dataIndex: 'A4305ADJPG', width: 130, align: 'right', renderer: amountRenderer},
                        {
                            text: 'Update',
                            defaults: {
                                menuDisabled: true,
                                sortable: true,
                                align: 'center'
                            },
                            columns: [
                                {text: 'User', dataIndex: 'A4305USUP', width: 110},
                                {text: 'Date', dataIndex: 'A4305FEUP', width: 100},
                                {text: 'Hour', dataIndex: 'A4305HOUP', width: 90}
                            ]
                        }
                    ]
                },
                bbar: Ext.create('Ext.toolbar.Paging', {
                    id: prototype.id + `-${tipoId}-paggin01`,
                    displayInfo: true
                })
            });
        } else if (me.tipoGrid === '3') {
            panel = Ext.create('Ext.grid.Panel', {
                id: prototype.id + `-grid-${tipoId}01`,
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
                            id: prototype.id + '-det-btn-atras' + tipoId,
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
                    id: prototype.id + `-${tipoId}-paggin01`,
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
