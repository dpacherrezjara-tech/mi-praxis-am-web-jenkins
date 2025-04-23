Ext.define('Ext.Praxis.view.payments.AccountStatementSummForm.Grids.AccountStatementSummGrids', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-AccountStatementSummGrids',
    layout: {
        type: 'vbox',
        align: 'center'
    },
    padding: '0 0 0 0',
    border: false,
    bodyStyle: 'background-color: #E3EAF9;',
    width: '100%',
    defaults: {
        border: false
    },
    items: [
        //<editor-fold defaultstate="collapsed" desc="Tree Summary">
        {
            xtype: 'treepanel',
            id: prototype.id + '-treeSummary',
            width: 1200,
            minHeight: 250,
            maxHeight: 500,
            rootVisible: false,
            hidden:true,
            viewConfig: {
                stripeRows: true,
                enableTextSelection: true,
                markDirty: false
            },
            columnLines: true,
            autoScroll: true,
            columns: {
                defaults: {
                    align: 'center',
                    menuDisabled: true,
                    sortable: true
                },
                items: [
                    {xtype: 'treecolumn', text: 'Index', dataIndex: 'INDEX', flex: 1,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            if (record.data.COLOR === 'H') {
                                metaData.style = "color:#226fec;text-align:center;font-weight:bold;";
                            } else {
                                metaData.style = "color:#29b8af;text-align:center;font-weight:bold;";
                            }
                            return value;
                        }
                    },
                    {text: 'Group', dataIndex: 'GRUPO', width: 100},
                    {text: 'Country', dataIndex: 'PAIS', width: 100},
                    {text: 'Source', dataIndex: 'FUENT', width: 100},
                    {text: 'Sub Source', dataIndex: 'SFUEN', width: 100},
                    {text: 'Qty', dataIndex: 'CONTEO', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            if (record.data.COLOR === 'D') {
                                metaData.style = "text-align:center;background-color:#e3e57b;text-decoration:underline;cursor:pointer;font-weight:bolder;color:#2f9ef0;";
                            }else{
                                metaData.style = "text-align:center;background-color:#7be57f;text-decoration:underline;cursor:pointer;font-weight:bolder;color:#2f9ef0;";
                            }
                            return value;
                        },
                        listeners: {
                            click: 'loadQty'
                        }
                    },
                    {text: 'Match', dataIndex: 'CONCIL', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            if (record.data.COLOR === 'D') {
                                metaData.style = "text-align:center;background-color:#e3e57b;text-decoration:underline;cursor:pointer;font-weight:bolder;color:#2f9ef0;";
                            }else{
                                metaData.style = "text-align:center;background-color:#7be57f;text-decoration:underline;cursor:pointer;font-weight:bolder;color:#2f9ef0;";
                            }
                            return value;
                        },
                        listeners: {
                            click: 'loadConcil'
                        }
                    },
                    {text: 'Pending', dataIndex: 'PENDING', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            if (record.data.COLOR === 'D') {
                                metaData.style = "text-align:center;background-color:#e3e57b;text-decoration:underline;cursor:pointer;font-weight:bolder;color:#f71a1a;";
                            }else{
                                metaData.style = "text-align:center;background-color:#7be57f;text-decoration:underline;cursor:pointer;font-weight:bolder;color:#f71a1a;";
                            }
                            return value;
                        },
                        listeners: {
                            click: 'loadPending'
                        }
                    }
                ]
            }
        },
        //</editor-fold>
        //<editor-fold defaultstate="collapsed" desc="Detail Summary">
        {
            xtype: 'grid',
            border: false,
            width: '100%',
            minHeight: 250,
            hidden: true,
            id: prototype.id + '-detailSummary',
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
                    {text: 'Fecha<br>Transaccion', dataIndex: 'A4700FECVT', width: 100},
                    {text: 'Fecha<br>Carga', dataIndex: 'A4700FPROC', width: 100},
                    {text: 'Accounting<br>Session Date', dataIndex: 'A4700FFILE', width: 100},
                    {text: 'PRAXIS ID', dataIndex: 'A4700IDCON', width: 350},
                    {text: 'Sale Location<br>Country', dataIndex: 'A4700PAIS', width: 100},
                    {text: 'SOURCE', dataIndex: 'A4700FUENT', width: 100},
                    {text: 'SUBSOURCE', dataIndex: 'A4700SFUEN', width: 100},
                    {text: 'IATA Code', dataIndex: 'A4700IATA', width: 100},
                    {text: 'City Name', dataIndex: 'A4700NIATA', width: 300},
                    {text: 'Transaction<br>Type', dataIndex: 'A4700TRNCU', width: 100},
                    {text: 'Local<br>Amount', dataIndex: 'A4700AMOUN', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {text: 'Currency<br>Code', dataIndex: 'A4700MDA', width: 100},
                    {text: 'Ticket<br>Number', dataIndex: 'TICKETNBR', width: 100},
                    {text: 'Document<br>Type', dataIndex: 'A4700TIPOD', width: 100},
                    {text: 'Subcode<br>de Razon', dataIndex: 'A4700RFIS', width: 100},
                    {text: 'Form of<br>Payment', dataIndex: 'A4700FOP', width: 100},
                    {text: 'Card Code', dataIndex: 'A4700TARJ', width: 100},
                    {text: 'CIA CTA<br>CONTABLE', dataIndex: 'A4700CIAF', width: 100},
                    {text: 'Unidad', dataIndex: 'A4700UNID', width: 100},
                    {text: 'Centro<br>de Costo', dataIndex: 'A4700CECO', width: 100},
                    {text: 'Ubicación', dataIndex: 'A4700UBICA', width: 100},
                    {text: 'Cuenta', dataIndex: 'A4700CUENT', width: 100},
                    {text: 'Subcuenta', dataIndex: 'A4700SUBCU', width: 100},
                    {text: 'Equipo', dataIndex: 'A4700EQUI', width: 100},
                    {text: 'Intercia', dataIndex: 'A4700ICIA', width: 100},
                    {text: 'Cliente', dataIndex: 'A4700CLIEN', width: 100},
                    {text: 'Dirección', dataIndex: 'A4700DIREC', width: 100},
                    {text: 'Título Contable', dataIndex: 'A4700TITU', width: 250},
                    {text: 'Nro Tarjeta', dataIndex: 'A4700SCARD', width: 180},
                    {text: 'Auth', dataIndex: 'A4700AUTH', width: 100},
                    {text: 'Agente', dataIndex: 'A4700AGENT', width: 100},
                    {text: 'NRO PNR', dataIndex: 'A4700PNR', width: 100},
                    {text: 'FOP<br>Agrupación', dataIndex: 'A4700FOPAG', width: 100},
                    {text: 'Payment<br>Merchan', dataIndex: 'A4700PMERC', width: 130},
                    {text: 'Payment<br>Sale', dataIndex: 'A4700SMERC', width: 130},
                    {text: 'Payment<br>Date', dataIndex: 'A4700FECPG', width: 100},
                    {text: 'Payment<br>Amount', dataIndex: 'A4700IMPOR', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {text: 'COM Amount', dataIndex: 'A4700COMM', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {text: 'COM MSI', dataIndex: 'A4700COMSI', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {text: 'COM VAT', dataIndex: 'A4700COVAT', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {text: 'MSI VAT', dataIndex: 'A4700VTMSI', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {text: 'OTROS', dataIndex: 'A4700OTROS', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {text: 'Processor', dataIndex: 'DESC_PRO', width: 160,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;background-color:#7ac970;font-weight:bolder;";
                            return value;
                        }
                    },
                    {text: 'Status', dataIndex: 'A4700STVAL', width: 120,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;background-color:#7ac970;font-weight:bolder;";
                            let opts = {
                              '0':'Stand By',
                              '1':'Match',
                              '5':'Manual Match',
                              '6':'Forced Match',
                              '7':'Compensation Match'
                            };
                            return opts[value]|| '';
                        }
                    },
                    {text: 'Memo', dataIndex: 'A4700STADM', width: 100},
                    {text: 'PRIDCON', dataIndex: 'A4700IDCMP', width: 350}
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
                        iconCls: 'prx-icon-excel',
                        scale: 'small',
                        tooltip: 'Export to Excel',
                        listeners: {
                            click: 'downloadSummaryDetail'
                        }
                    },
                    {
                        xtype: 'button',
                        scale: 'small',
                        id: prototype.id + '-detail-back',
                        iconCls: 'prx-icon-back',
                        width: 25,
                        tooltip: 'Back',
                        listeners: {
                            click: 'backDetailSummary'
                        }
                    }
                ]
            },
            bbar: {
                xtype: 'pagingtoolbar',
                displayInfo: true
            }
        },
        //</editor-fold>
        //<editor-fold defaultstate="collapsed" desc="Client Summary">
        {
            xtype: 'treepanel',
            id: prototype.id + '-treeClient',
            width: 1200,
            minHeight: 250,
            maxHeight: 500,
            rootVisible: false,
            hidden:true,
            viewConfig: {
                stripeRows: true,
                enableTextSelection: true,
                markDirty: false
            },
            columnLines: true,
            autoScroll: true,
            columns: {
                defaults: {
                    align: 'center',
                    menuDisabled: true,
                    sortable: true
                },
                items: [
                    {xtype: 'treecolumn', text: 'Index', dataIndex: 'INDEX', flex: 1,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            if (record.data.COLOR === 'H') {
                                metaData.style = "color:#226fec;text-align:center;font-weight:bold;";
                            } else {
                                metaData.style = "color:#29b8af;text-align:center;font-weight:bold;";
                            }
                            return value;
                        }
                    },
                    {text: 'Total', dataIndex: 'TOTAL', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            if (record.data.COLOR === 'D') {
                                metaData.style = "text-align:center;background-color:#e3e57b;text-decoration:underline;cursor:pointer;font-weight:bolder;color:#2f9ef0;";
                            }else{
                                metaData.style = "text-align:center;background-color:#7be57f;text-decoration:underline;cursor:pointer;font-weight:bolder;color:#2f9ef0;";
                            }
                            return value;
                        },
                        listeners: {
                            click: 'loadTotalClien'
                        }
                    },
                    {text: 'Amount', dataIndex: 'MONTO', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    
                    {text: 'Match', dataIndex: 'TMATCH', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            if (record.data.COLOR === 'D') {
                                metaData.style = "text-align:center;background-color:#e3e57b;text-decoration:underline;cursor:pointer;font-weight:bolder;color:#2f9ef0;";
                            }else{
                                metaData.style = "text-align:center;background-color:#7be57f;text-decoration:underline;cursor:pointer;font-weight:bolder;color:#2f9ef0;";
                            }
                            return value;
                        },
                        listeners: {
                            click: 'loadConcilClien'
                        }
                    },
                    {text: 'Amount<br>Match', dataIndex: 'VMATCH', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {text: 'Pending', dataIndex: 'TPEND', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            if (record.data.COLOR === 'D') {
                                metaData.style = "text-align:center;background-color:#e3e57b;text-decoration:underline;cursor:pointer;font-weight:bolder;color:#f71a1a;";
                            }else{
                                metaData.style = "text-align:center;background-color:#7be57f;text-decoration:underline;cursor:pointer;font-weight:bolder;color:#f71a1a;";
                            }
                            return value;
                        },
                        listeners: {
                            click: 'loadPendingClien'
                        }
                    },
                    {text: 'Amount<br>Pending', dataIndex: 'VPEND', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    }
                ]
            }
        },
        //</editor-fold>
        //<editor-fold defaultstate="collapsed" desc="Age Summary">
        {
            xtype: 'grid',
            border: false,
            width: 1100,
            minHeight: 250,
            hidden: true,
            id: prototype.id + '-ageSummary',
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
                    {text: 'Fecha<br>Transaccion', dataIndex: 'A4700FECVT', width: 100},
                    {text: 'Cliente', dataIndex: 'A4700CLIEN', width: 100},
                    {text: 'Titulo Contable', dataIndex: 'A4700TITU', flex: 1},
                    {text: 'Monto', dataIndex: 'A4700AMOUN', width: 120,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {text: 'Moneda', dataIndex: 'A4700MDA', width: 100},
                    {text: '01 a 30 dias', dataIndex: '1D', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;background-color:#ade57b;text-decoration:underline;cursor:pointer;font-weight:bolder;color:red;";
                            return value;
                        },
                        listeners:{
                            click:'load1D'
                        }
                    },
                    {text: '31 a 60 dias', dataIndex: '2D', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;background-color:#e5e27b;text-decoration:underline;cursor:pointer;font-weight:bolder;color:red;";
                            return value;
                        },
                        listeners:{
                            click:'load2D'
                        }
                    },
                    {text: '61 a 90 dias', dataIndex: '3D', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;background-color:#e5b87b;text-decoration:underline;cursor:pointer;font-weight:bolder;color:red;";
                            return value;
                        },
                        listeners:{
                            click:'load3D'
                        }
                    },
                    {text: '+91 dias', dataIndex: '4D', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;background-color:#ff4c4c;text-decoration:underline;cursor:pointer;font-weight:bolder;color:#ffffff;";
                            return value;
                        },
                        listeners:{
                            click:'load4D'
                        }
                    }
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
                        iconCls: 'prx-icon-excel',
                        scale: 'small',
                        tooltip: 'Export to Excel',
                        listeners: {
                            click: 'downloadaDetail'
                        }
                    }
                ]
            },
            bbar: {
                xtype: 'pagingtoolbar',
                displayInfo: true
            }
        }
        //</editor-fold>

    ]
});