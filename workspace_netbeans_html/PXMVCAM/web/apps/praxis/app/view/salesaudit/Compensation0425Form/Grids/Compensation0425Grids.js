Ext.define('Ext.Praxis.view.salesaudit.Compensation0425Form.Grids.Compensation0425Grids', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-Compensation0425Grids',
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
            minHeight: 150,
            maxHeight: 570,
            scrollable: true,
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
                    {text: 'Ticket', dataIndex: 'A4961TICKET', width: 140},
                    {text: 'SEQ', dataIndex: 'A4961SEQ', width: 50},
                    {text: 'Cur.', dataIndex: 'MDA', width: 40},
                    {text: 'Amount', dataIndex: 'A4961NETOR', width: 120, renderer: 'onColumnAmountRenderer'},
                    {text: 'Agent', dataIndex: 'A4961AGENT', width: 100},
                    {text: 'Agent<br>Name', dataIndex: 'NIATA', width: 250},
                    {text: 'Sale<br>Country', dataIndex: 'A4961PAIS', width: 60},
                    {text: 'Sale<br>Date', dataIndex: 'A4961FVENT', width: 80},
                    {text: 'Processing<br>Date', dataIndex: 'A4961FPROC', width: 80},
                    {text: 'Notices<br>Date', dataIndex: 'A4961FANOT', width: 80},
                    {text: 'Trnx', dataIndex: 'A4961TRNCU', width: 80},
                    {text: 'Doc.<br>Type', dataIndex: 'A4961TDOC', width: 80},
                    {text: 'PNR', dataIndex: 'A4961PNR', width: 80},
                    {text: 'Pax Name', dataIndex: 'A4961PAX', width: 200},
                    {text: 'Itinerary', dataIndex: 'A4961ITIN', width: 140},
                    {text: 'RFIC', dataIndex: 'A4961VRIC', width: 80},
                    {text: 'EPR', dataIndex: 'A4961EPR', width: 80},
                    {text: 'Associated <br>ticket', dataIndex: 'A4961TKCNX', width: 140},
                    {
                        text: 'Status', dataIndex: 'A4961FLADMDES', width: 110,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            const opts = {
                                'Suggested': {text: 'Suggested', bg: '#FFF9C4', color: '#F57F17'}, // amarillo
                                'UNREGISTERED CLIENT': {text: 'Unregistered Client', bg: '#FFE0B2', color: '#E65100'}, // naranja
                                'UNREGISTERED SALE': {text: 'Unregistered Sale', bg: '#FFCCBC', color: '#BF360C'}, // naranja-rojizo
                                'APPROVED': {text: 'Approved', bg: '#C8E6C9', color: '#1B5E20'}, // verde
                                'Match': {text: 'Match', bg: '#BBDEFB', color: '#0D47A1'}, // azul
                                'AM Consult': {text: 'AM Consult', bg: '#B2EBF2', color: '#006064'}, // teal
                                'Manual review': {text: 'Manual review', bg: '#E1BEE7', color: '#6A1B9A'}, // púrpura
                                'No applicable rule': {text: 'No applicable rule', bg: '#E0E0E0', color: '#424242'}  // gris
                            };
                            const status = opts[value];
                            if (status) {
                                metaData.style =
                                        `background-color: ${status.bg}; color: ${status.color};` +
                                        `font-weight: 600; font-size: 12px; padding: 4px 10px;` +
                                        `border-radius: 12px; display: inline-block; letter-spacing: .2px;` +
                                        `box-shadow: inset 0 0 0 1px rgba(0,0,0,0.04);`;
                                return status.text;
                            }
                            return value;
                        }
                    },
                    {
                        text: 'Search', dataIndex: 'A4961FLASADESC', width: 90,
                        renderer: function (value, metaData) {
                            const opts = {
                                'Command': {text: 'Command', bg: '#C5CAE9', color: '#1A237E'}, // índigo
                                'Sabre': {text: 'Sabre', bg: '#D7CCC8', color: '#4E342E'}, // marrón/café
                                'Not found': {text: 'Not found', bg: '#F8BBD0', color: '#880E4F'}, // rosa/magenta (negativo)
                                'Pending PNR search': {text: 'Pending PNR search', bg: '#CFD8DC', color: '#37474F'}  // azul-gris pizarra (espera)
                            };
                            const status = opts[value];
                            if (status) {
                                metaData.style =
                                        `background-color: ${status.bg}; color: ${status.color};` +
                                        `font-weight: 600; font-size: 11px; padding: 3px 8px;` +
                                        `border-radius: 12px; display: inline-block; letter-spacing: .2px;` +
                                        `box-shadow: inset 0 0 0 1px rgba(0,0,0,0.04); white-space: nowrap;`;
                                return status.text;
                            }
                            return value;
                        }
                    },
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
                                    return 'prx-icon-logfile';
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