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
        {
            xtype: 'treepanel',
            id: prototype.id + '-treeSummary',
            width: 1200,
            minHeight: 250,
            maxHeight: 500,
            rootVisible: false,
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
                    {text: 'Amount<br>Rev (MXN)', dataIndex: 'A4700USMXN', width: 100},
                    {text: 'Local<br>Amount', dataIndex: 'A4700AMOUN', width: 100},
                    {text: 'Currency<br>Code', dataIndex: 'A4700MDA', width: 100},
                    {text: 'Ticket<br>Number', dataIndex: 'TICKETNBR', width: 100},
                    {text: 'Document<br>Type', dataIndex: 'A4700TIPOD', width: 100},
                    {text: 'Subcode<br>de Razon', dataIndex: 'A4700RFIS', width: 100},
                    {text: 'Form of<br>Payment', dataIndex: 'A4700FOP', width: 100},
                    {text: 'Card Code', dataIndex: 'A4700TARJ', width: 100},
                    {text: 'CIA CTA CONTABLE', dataIndex: 'A4700CIAF', width: 100},
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
                    {text: 'Payment<br>Amount', dataIndex: 'A4700IMPOR', width: 100},
                    {text: 'COM Amount', dataIndex: 'A4700COMM', width: 100},
                    {text: 'COM MSI', dataIndex: 'A4700COMSI', width: 100},
                    {text: 'COM VAT', dataIndex: 'A4700COVAT', width: 100},
                    {text: 'MSI VAT', dataIndex: 'A4700VTMSI', width: 100},
                    {text: 'OTROS', dataIndex: 'A4700OTROS', width: 100},
                    {text: 'Processor', dataIndex: 'A4700PROCE', width: 100},
                    {text: 'Status', dataIndex: 'A4700STVAL', width: 100},
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
        }
    ]
});