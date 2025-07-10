Ext.define('Ext.Praxis.view.salesaudit.TaxesExceptionsForm.Grids.TaxesExceptionsGrids', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-TaxesExceptionsGrids',
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
            xtype: 'grid',
            border: false,
            width: '100%',
            minHeight: 250,
            id: prototype.id + '-gridExceptionTickets',
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
                    {
                        text: 'RN',
                        xtype: 'rownumberer', // Agrega la columna de números de fila
                        width: 40 // Ajusta el ancho de la columna si es necesario
                    },
                    {text: 'Client', dataIndex: 'CCUST', width: 50,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "font-weight:bold;";
                            return value;
                        }
                    },
                    {text: 'Agent', dataIndex: 'CIATA', width: 100},
                    {text: 'Agent<br>Name', dataIndex: 'NIATA', width: 250},
                    {text: 'Sale<br>Country', dataIndex: 'PAISV', width: 60},
                    {text: 'Sale<br>Date', dataIndex: 'SDATE', width: 80},
                    {text: 'Trnx', dataIndex: 'TRNCU', width: 80},
                    {text: 'Doc.<br>Type', dataIndex: 'TDOC', width: 80},
                    {text: 'Ticket', width: 140,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "font-weight:bold;";
                            const {CCIA,FORMA,SERIE}= record.data;
                            let ticket = CCIA + FORMA +SERIE;
                            return ticket;
                        }
                    },
                    {text: 'SEQ', dataIndex: 'SEQ', width: 50},
                    {text: 'TAX EXCEPTIONS', dataIndex: 'TAX_EXCEPTIONS', width: 120},
                    {text: 'PNR', dataIndex: 'SPNR', width: 80},
                    {text: 'Pax Name', dataIndex: 'PAXNAME', width: 200},
                    {text: 'Itinerary', dataIndex: 'RUTABOL', width: 140},
                    {text: 'Type<br>Load', dataIndex: 'TIPOING', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            const opts = {
                                'I':'Form',
                                'M':'Massive'
                            };
                            return opts[value];
                        }
                    },
                    {text: 'Status<br>Edit', dataIndex: 'STATUS', width: 80},
                    {text: 'User<br>Created', dataIndex: 'USCR', width: 100},
                    {text: 'Date<br>Created', dataIndex: 'FECR', width: 80},
                    {text: 'User<br>Updated', dataIndex: 'USUP', width: 100},
                    {text: 'Date<br>Updated', dataIndex: 'FEUP', width: 80},
                    {
                        text: 'Detail',
                        xtype: 'actioncolumn',
                        sortable: false,
                        width: 50,
                        align: 'center',
                        items: [
                            {
                                getClass: function (value, metadata, record) {
                                    return 'prx-icon-detail';
                                },
                                tooltip: 'Detail',
                                handler: 'loadTaxDetails'
                            }
                        ]
                    },
                    {
                        text: 'Log',
                        xtype: 'actioncolumn',
                        sortable: false,
                        width: 50,
                        align: 'center',
                        items: [
                            {
                                getClass: function (value, metadata, record) {
                                    return 'prx-icon-detail';
                                },
                                tooltip: 'History Log',
                                handler: 'loadHistoryLogDetails'
                            }
                        ]
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
                            click: 'downloadMainGrid'
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