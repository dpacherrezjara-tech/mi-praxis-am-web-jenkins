Ext.define('Ext.Praxis.view.invoice.ArithmeticValidationForm.Grids.MainGrid', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-MainGrid',
    border: false,
    layout: {
        type: 'hbox',
        pack: 'start'
    },
    height: prototype.height,
    width: prototype.width,
    defaults: {
        margin: '9 9 9 9',
        bodyStyle: 'background: transparent;'
    },
    items: [
        //<editor-fold defaultstate="collapsed" desc="Ticket on Error">
        {
            xtype: 'grid',
            title: 'Tickets on Error',
            titleAlign: 'center',
            id: prototype.id + '-ticketsGrid',
            width: 600,
            minHeight: 200,
            viewConfig: {
                stripeRows: true,
                enableTextSelection: true,
                markDirty: false
            },
            bbar: {
                xtype: 'pagingtoolbar',
                displayInfo: true
            },
            columnLines: true,
            columns: {
                defaults: {
                    align: 'center',
                    menuDisabled: true,
                    sortable: true
                },
                items: [
                    //<editor-fold defaultstate="collapsed" desc="Detail Cols">
                    {
                        text: 'Processing<br>Date',
                        width: 80,
                        dataIndex: 'A1946FPROC'
                    },
                    {
                        text: 'Ticket Number', flex: 1,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;text-decoration:underline;cursor:pointer;";
                            metaData.style += "font-weight:bolder;color:#057ECB;";
                            const {A1946CIA, A1946FORMA, A1946SERIE} = record.data;
                            return A1946CIA + A1946FORMA + A1946SERIE;
                        },
                        listeners: {
                            click: 'onClickTicket'
                        }
                    },
                    {
                        text: 'Doc. Type', dataIndex: 'A1946TIPO', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            const opts = {
                                'F': "Invoice",
                                'NC': "Credit Note"
                            };
                            return opts[value.trim()];
                        }
                    },
                    {
                        text: 'Trans.<br>Type', dataIndex: 'A1946TRNCU', width: 80
                    },
                    {
                        text: 'Trans.<br>Code', dataIndex: 'A1946TRNCO', width: 80
                    },
                    {
                        text: 'Type<br>Error', dataIndex: 'A1946TIPER', width: 80
                    }
                    //</editor-fold>
                ]
            }
        },
        //</editor-fold>
        //<editor-fold defaultstate="collapsed" desc="Information Panel">
        {
            xtype: 'panel',
            id: prototype.id + '-panelInfo',
            layout: {
                type: 'vbox',
                pack: 'center'
            },
            defaults: {
                margin: '5 5 5 5',
                bodyStyle: 'background: transparent;'
            },
            width: 1000,
            border: false,
            items: [
                //<editor-fold defaultstate="collapsed" desc="Grid Total">
                {
                    xtype: 'grid',
                    title: 'Total',
                    titleAlign: 'center',
                    id: prototype.id + '-ticketTotals',
                    store: [],
                    width: 1000,
                    minHeight: 100,
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
                            //<editor-fold defaultstate="collapsed" desc="Detail Cols">
                            {
                                text: 'Ticket Number', width: 120,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    const {A1924CIA, A1924FORMA, A1924SERIE} = record.data;
                                    return A1924CIA + A1924FORMA + A1924SERIE;
                                }
                            },
                            {
                                text: 'SEQ', dataIndex: 'A1924SEQ', width: 50
                            },
                            {
                                text: 'Doc. Type', dataIndex: 'A1924TIPO', width: 80,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    const opts = {
                                        'F': "Invoice",
                                        'NC': "Credit Note"
                                    };
                                    return opts[value.trim()];
                                }
                            },
                            {
                                text: 'Concept', dataIndex: 'A1924AGRUP', width: 200, hidden: true
                            },
                            {
                                text: 'Account', dataIndex: 'A1924CUENT', width: 100, hidden: true
                            },
                            {
                                text: 'Sub-Account', dataIndex: 'A1924SUBCU', width: 100, hidden: true
                            },
                            {
                                text: 'Record<br>Type', dataIndex: 'A1924TREGI', width: 80
                            },
                            {
                                text: 'Total Loc', dataIndex: 'A1924TOTLO', width: 80
                            },
                            {
                                text: 'Total Rev', dataIndex: 'A1924TOTRV', width: 80
                            },
                            {
                                text: 'IVA Loc', dataIndex: 'A1924IVALO', width: 80
                            },
                            {
                                text: 'IVA Rev', dataIndex: 'A1924IVARV', width: 80
                            },
                            {
                                text: '% IVA', dataIndex: 'A1924IVA', width: 80,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    return value + '%';
                                }
                            },
                            {
                                text: 'Updated',
                                defaults: {
                                    align: 'center',
                                    menuDisabled: true,
                                    sortable: true
                                },
                                columns: [
                                    {
                                        text: 'User', dataIndex: 'A1924REVIS', width: 100
                                    },
                                    {
                                        text: 'Date', dataIndex: 'A1924FREVI', width: 100
                                    },
                                    {
                                        text: 'Hour', dataIndex: 'A1924HREVI', width: 60
                                    }
                                ]
                            }
                            //</editor-fold>
                        ]
                    }
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="Grid Detalle">
                {
                    xtype: 'grid',
                    title: 'Details',
                    titleAlign: 'center',
                    id: prototype.id + '-ticketDetails',
                    store: [],
                    width: 1000,
                    minHeight: 100,
                    maxHeight: 440,
                    viewConfig: {
                        stripeRows: true,
                        enableTextSelection: true,
                        markDirty: false
                    },
                    features: [
                        {
                            ftype: 'summary' // Agrega la característica de resumen al grid
                        }
                    ],
                    selType: 'rowmodel',
                    plugins: {
                        ptype: 'rowediting',
                        clicksToEdit: 1 // 1 clic para editar
                    },
                    columnLines: true,
                    columns: {
                        defaults: {
                            align: 'center',
                            menuDisabled: true,
                            sortable: true
                        },
                        items: [
                            //<editor-fold defaultstate="collapsed" desc="Detail Cols">
                            {
                                text: 'Ticket Number', width: 120,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    const {A1924CIA, A1924FORMA, A1924SERIE} = record.data;
                                    return A1924CIA + A1924FORMA + A1924SERIE;
                                }
                            },
                            {
                                text: 'SEQ', dataIndex: 'A1924SEQ', width: 50
                            },
                            {
                                text: 'Concept', dataIndex: 'A1924AGRUP', flex: 1
                            },
                            {
                                text: 'Account', dataIndex: 'A1924CUENT', width: 100
                            },
                            {
                                text: 'Sub-Account', dataIndex: 'A1924SUBCU', width: 100
                            },
                            {
                                text: 'Record<br>Type', dataIndex: 'A1924TREGI', width: 80
                            },
                            {
                                text: 'Total Loc', dataIndex: 'A1924TOTLO', width: 80,
                                editor: {
                                    xtype: 'numberfield',
                                    allowBlank: false,
                                    hideTrigger: true, // Oculta las flechas para incrementar/decrementar
                                    keyNavEnabled: false, // Desactiva la navegación con teclado
                                    mouseWheelEnabled: false // Desactiva la rueda del mouse para cambiar el valor
                                },
                                summaryType: 'sum',
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    metaData.style = 'text-align:center; margin-right:3px ';
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return '<b>' + value + '<b>';
                                }
                            },
                            {
                                text: 'Total Rev', dataIndex: 'A1924TOTRV', width: 80,
                                editor: {
                                    xtype: 'numberfield',
                                    allowBlank: false,
                                    hideTrigger: true, // Oculta las flechas para incrementar/decrementar
                                    keyNavEnabled: false, // Desactiva la navegación con teclado
                                    mouseWheelEnabled: false // Desactiva la rueda del mouse para cambiar el valor
                                },
                                summaryType: 'sum',
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    metaData.style = 'text-align:center; margin-right:3px ';
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return '<b>' + value + '<b>';
                                }
                            },
                            {
                                text: 'IVA Loc', dataIndex: 'A1924IVALO', width: 80,
                                editor: {
                                    xtype: 'numberfield',
                                    allowBlank: false,
                                    hideTrigger: true, // Oculta las flechas para incrementar/decrementar
                                    keyNavEnabled: false, // Desactiva la navegación con teclado
                                    mouseWheelEnabled: false // Desactiva la rueda del mouse para cambiar el valor
                                },
                                summaryType: 'sum',
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    metaData.style = 'text-align:center; margin-right:3px ';
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return '<b>' + value + '<b>';
                                }
                            },
                            {
                                text: 'IVA Rev', dataIndex: 'A1924IVARV', width: 80,
                                editor: {
                                    xtype: 'numberfield',
                                    allowBlank: false,
                                    hideTrigger: true, // Oculta las flechas para incrementar/decrementar
                                    keyNavEnabled: false, // Desactiva la navegación con teclado
                                    mouseWheelEnabled: false // Desactiva la rueda del mouse para cambiar el valor
                                },
                                summaryType: 'sum',
                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                    metaData.style = 'text-align:center; margin-right:3px ';
                                    value = Ext.util.Format.number(value, '0,000.00');
                                    return '<b>' + value + '<b>';
                                }
                            },
                            {
                                text: '% IVA', dataIndex: 'A1924IVA', width: 80,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    return value + '%';
                                }
                            }
                            //</editor-fold>
                        ]
                    }
                },
                //</editor-fold>
                {
                    xtype: 'panel',
                    layout: {
                        type: 'hbox',
                        pack: 'end'
                    },
                    width: 990,
                    height: 60,
                    border: false,
                    items: [
                        {
                            xtype: 'panel',
                            border: false,
                            layout: {
                                type: 'hbox',
                                pack: 'start'
                            },
                            bodyStyle: 'background: transparent;',
                            flex: 1,
                            defaults: {
                                margin: '0 5 0 5',
                                padding: '3 5 3 5',
                                width: 300,
                                verticalAlign: 'middle'
                            },
                            items: [
                                {
                                    id: prototype.id + '-calculationError',
                                    hidden: true,
                                    style: 'font-weight:bold;background: #F3AA31;font-style: italic;',
                                    xtype: 'label',
                                    html: 'Calculation contains errors' +
                                            '<img style="margin-left:5px;" src="resources/img/botones/warning.png"/>'
                                },
                                {
                                    id: prototype.id + '-calculationMatch',
                                    hidden: true,
                                    style: 'font-weight:bold;font-style: italic;',
                                    xtype: 'label',
                                    html: 'Calculation matches' +
                                            '<img style="margin-left:5px;" src="resources/img/botones/imgclock_complete.png"/>'
                                }
                            ]
                        },
                        {
                            xtype: 'button',
                            text: 'Save',
                            width: 100,
                            disabled: true,
                            id: prototype.id + '-btn-save',
                            iconCls: 'prx-icon-image-update',
                            listeners: {
                                click: 'onSaveClick'
                            }
                        }
                    ]
                }
            ]
        }
        //</editor-fold>

    ]

});


