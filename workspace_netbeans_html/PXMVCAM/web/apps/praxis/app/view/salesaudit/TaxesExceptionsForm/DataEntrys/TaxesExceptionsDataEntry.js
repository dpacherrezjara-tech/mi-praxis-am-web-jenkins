prototype.idDE = prototype.id + '-TaxesExceptionsDataEntry';

Ext.define('Ext.Praxis.view.salesaudit.TaxesExceptionsForm.DataEntrys.TaxesExceptionsDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.TaxesExceptionsDataEntry',
    requires: [
        'Ext.Praxis.controller.salesaudit.TaxesExceptions.TaxesExceptionsDataEntryController'
    ],
    controller: 'TaxesExceptionsDataEntryController',
    title: 'Tax Exception - Form',
    header: true,
    width: 1350,
    resizable: false,
    layout: 'vbox',
    modal: true,
    border: false,
    bodyStyle: 'background: #ffffff;',
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'panel',
            layout: 'hbox',
            id: prototype.idDE + 'panelTicketFilter',
            width: '100%',
            defaults: {
                border: false
            },
            items: [
                {
                    xtype: 'combobox',
                    margin: '10 0 10 10',
                    labelStyle: 'font-weight:bold;',
                    fieldLabel: 'Search By',
                    id: prototype.id + '-cmbTktFilter',
                    store: Ext.create('Ext.data.SimpleStore', {
                        fields: ['code', 'name'],
                        data: [
                            ['T', 'Ticket Number'],
                            ['P', 'PNR']
                        ]
                    }),
                    labelWidth: 80,
                    width: 200,
                    fieldStyle: 'text-align:center;font-weight:bold;',
                    displayField: 'name',
                    valueField: 'code',
                    queryMode: 'local',
                    editable: false,
                    value: 'T',
                    listeners: {
                        change: 'onChangeFilter'
                    }
                },
                {
                    xtype: 'form',
                    width: '100%',
                    id: prototype.idDE + '-ticketFilters',
                    bodyPadding: 10,
                    layout: {
                        type: 'hbox',
                        pack: 'start'
                    },
                    items: [

                        {
                            xtype: 'textfield',
                            name: 'IN_CCUST',
                            hidden: true,
                            value: '139'
                        },
                        {
                            xtype: 'panel',
                            width: 130,
                            border: false,
                            id: prototype.id + '-tktFilter',
                            layout: 'hbox',
                            defaults: {
                                labelStyle: 'text-align:right;font-weight:bold;',
                                fieldStyle: 'text-align:center;background:#bddff4;',
                                allowBlank: false
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    name: 'IN_TICKET',
                                    width: 120,
                                    enforceMaxLength: true,
                                    maxLength: 13,
                                    maskRe: /^[0-9]$/,
                                    value: ''
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            width: 110,
                            border: false,
                            id: prototype.id + '-pnrFilter',
                            hidden: true,
                            layout: 'hbox',
                            defaults: {
                                labelStyle: 'text-align:right;font-weight:bold;',
                                fieldStyle: 'text-align:center;background:#bddff4;',
                                allowBlank: false
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    name: 'IN_SPNR',
                                    width: 100,
                                    enforceMaxLength: true,
                                    maxLength: 6,
                                    value: ''
                                }
                            ]
                        },
                        {
                            xtype: 'button',
                            margin: '0 5 0 10',
                            iconCls: 'prx-icon-add',
                            tooltip: 'Add Ticket',
                            listeners: {
                                click: 'onAddTicket'
                            }
                        },
                        {
                            xtype: 'button',
                            iconCls: 'prx-icon-clear',
                            tooltip: 'Clear',
                            margin: '0 5 0 5',
                            listeners: {
                                click: 'onClearFilter'
                            }
                        }
                    ]

                }
            ]
        },
        //<editor-fold defaultstate="collapsed" desc="Tab Tickets">
        {
            xtype: 'tabpanel',
            id: prototype.idDE + '-tabTickets',
            width: '100%',
            height: 'auto',
            border: false,
            margin: '0 1 0 1',
            bodyStyle: 'background: transparent',
            defaults: {
                height: 'auto',
                autoScroll: false,
                layout: 'fit'
            },
            items: [
                {
                    title: 'Pending Load',
                    itemId: 'P',
                    id: prototype.idDE + '-tabPending',
                    items: [
                        {
                            xtype: 'grid',
                            margin: '5 0 5 0',
                            minHeight: 100,
                            viewConfig: {
                                stripeRows: false,
                                enableTextSelection: true,
                                markDirty: true
                            },
                            border: true,
                            columnLines: true,
                            id: prototype.idDE + '-gridTickets',
                            width: '100%',
                            maxHeight: 300,
                            columns: {
                                defaults: {
                                    align: 'center',
                                    menuDisabled: true,
                                    sortable: true
                                },
                                items: [
                                    {
                                        text: 'Client', dataIndex: 'CCUST', width: 50,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-weight:bold;";
                                            return value;
                                        }
                                    },
                                    { text: 'Agent', dataIndex: 'CIATA', width: 100 },
                                    { text: 'Agent<br>Name', dataIndex: 'NIATA', width: 200 },
                                    { text: 'Sale<br>Country', dataIndex: 'PAISV', width: 60 },
                                    { text: 'Sale<br>Date', dataIndex: 'SDATE', width: 80 },
                                    { text: 'Trnx', dataIndex: 'TRNCU', width: 80 },
                                    { text: 'Doc.<br>Type', dataIndex: 'TDOC', width: 80 },
                                    {
                                        text: 'Ticket', dataIndex: 'TICKET', width: 140,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-weight:bold;";
                                            return value;
                                        }
                                    },
                                    { text: 'SEQ', dataIndex: 'SEQ', width: 50 },
                                    { text: 'PNR', dataIndex: 'SPNR', width: 80 },
                                    { text: 'Pax Name', dataIndex: 'PAXNAME', width: 250 },
                                    { text: 'Itinerary', dataIndex: 'RUTABOL', width: 200 },
                                    {
                                        sortable: false,
                                        xtype: 'actioncolumn',
                                        id: prototype.idDE + '-exceptTkt',
                                        width: 50,
                                        text: 'Edit',
                                        align: 'center',
                                        items: [
                                            {
                                                iconCls: 'prx-icon-edit',
                                                tooltip: 'Update',
                                                handler: 'onExceptTax'
                                            }
                                        ]
                                    },
                                    {
                                        sortable: false,
                                        xtype: 'actioncolumn',
                                        id: prototype.idDE + '-deleteTkt',
                                        width: 50,
                                        text: 'Dl.',
                                        align: 'center',
                                        items: [
                                            {
                                                iconCls: 'prx-icon-image-trash',
                                                tooltip: 'Delete',
                                                handler: 'onDeleteTicket'
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                    ]
                },
                {
                    title: 'Loaded',
                    itemId: 'L',
                    id: prototype.idDE + '-tabLoaded',
                    items: [
                        {
                            xtype: 'grid',
                            margin: '5 0 5 0',
                            minHeight: 100,
                            viewConfig: {
                                stripeRows: false,
                                enableTextSelection: true,
                                markDirty: true
                            },
                            border: true,
                            columnLines: true,
                            id: prototype.idDE + '-gridTicketsLoaded',
                            width: '100%',
                            maxHeight: 300,
                            columns: {
                                defaults: {
                                    align: 'center',
                                    menuDisabled: true,
                                    sortable: true
                                },
                                items: [
                                    {
                                        text: 'Client', dataIndex: 'CCUST', width: 50,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-weight:bold;";
                                            return value;
                                        }
                                    },
                                    { text: 'Agent', dataIndex: 'CIATA', width: 100 },
                                    { text: 'Agent<br>Name', dataIndex: 'NIATA', width: 200 },
                                    { text: 'Sale<br>Country', dataIndex: 'PAISV', width: 60 },
                                    { text: 'Sale<br>Date', dataIndex: 'SDATE', width: 80 },
                                    { text: 'Trnx', dataIndex: 'TRNCU', width: 80 },
                                    { text: 'Doc.<br>Type', dataIndex: 'TDOC', width: 80 },
                                    {
                                        text: 'Ticket', dataIndex: 'TICKET', width: 140,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-weight:bold;";
                                            return value;
                                        }
                                    },
                                    { text: 'SEQ', dataIndex: 'SEQ', width: 50 },
                                    { text: 'PNR', dataIndex: 'SPNR', width: 80 },
                                    { text: 'Pax Name', dataIndex: 'PAXNAME', width: 250 },
                                    { text: 'Itinerary', dataIndex: 'RUTABOL', width: 200 }
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        //</editor-fold>
        //<editor-fold defaultstate="collapsed" desc="Tab Form Add Tax">
        {
            xtype: 'form',
            width: '100%',
            hidden: true,
            id: prototype.idDE + '-taxFilters',
            bodyPadding: 10,
            layout: {
                type: 'hbox',
                pack: 'start'
            },
            defaults: {
                margin: '0 5 0 5',
                labelStyle: 'text-align:right;font-weight:bold;',
                fieldStyle: 'text-align:center;'
            },
            items: [
                {
                    xtype: 'textfield',
                    name: 'IN_CTAX',
                    fieldLabel: 'Tax Code',
                    width: 140,
                    enforceMaxLength: true,
                    maxLength: 3,
                    labelWidth: 80,
                    allowBlank: false,
                    listeners: {
                        change: 'onChangeTax'
                    }
                },
                {
                    xtype: 'textfield',
                    name: 'IN_TAXNAME',
                    id: prototype.idDE + '-taxName',
                    width: 200,
                    editable: false
                },
                {
                    xtype: 'textfield',
                    name: 'IN_COMMENT',
                    fieldLabel: 'Comment',
                    width: 500,
                    enforceMaxLength: true,
                    maxLength: 80,
                    labelWidth: 70,
                    fieldStyle: 'text-align:left;',
                    allowBlank: false,
                    enableKeyEvents: true,
                    listeners: {
                        click: 'onEnterKeyPressComment'
                    }
                },

                {
                    xtype: 'button',
                    margin: '0 5 0 10',
                    iconCls: 'prx-icon-add',
                    tooltip: 'Add Tax',
                    listeners: {
                        click: 'onAddTax'
                    }
                }
            ]

        },
        //</editor-fold>
        {
            xtype: 'panel',
            layout: {
                type: 'hbox',
                pack: 'center'
            },
            width: '100%',
            padding: '5 0 5 0',
            items: [
                {
                    xtype: 'grid',
                    margin: '5 0 5 0',
                    minHeight: 100,
                    viewConfig: {
                        stripeRows: false,
                        enableTextSelection: true,
                        markDirty: true
                    },
                    hidden: true,
                    columnLines: true,
                    id: prototype.idDE + '-gridTaxes',
                    width: 800,
                    maxHeight: 300,
                    columns: {
                        defaults: {
                            align: 'center',
                            menuDisabled: true,
                            sortable: true
                        },
                        items: [
                            { text: 'Tax<br>Code', dataIndex: 'CTAX', width: 60 },
                            { text: 'Ammount', dataIndex: 'AMOUNT', width: 100, id: prototype.idDE + '-gridTaxes-AMOUNT' },
                            { text: 'Comment', dataIndex: 'COMMENT', flex: 1 },
                            {
                                sortable: false,
                                xtype: 'actioncolumn',
                                width: 50,
                                text: 'Dl.',
                                align: 'center',
                                items: [
                                    {
                                        iconCls: 'prx-icon-image-trash',
                                        tooltip: 'Delete',
                                        handler: 'onDeleteTax'
                                    }
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        //<editor-fold defaultstate="collapsed" desc="Control Data">
        {
            xtype: 'fieldset',
            id: prototype.idDE + '-fsControlData',
            hidden: true,
            title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:10px;">Control Data</span>',
            layout: {
                type: 'vbox',
                pack: 'center'
            },
            border: true,
            margin: '5 5 5 5',
            width: '100%',
            style: {
                backgroundColor: '#EEF3F9' // Cambiar el color de fondo a gris claro (#f0f0f0)
            },
            items: [
                {
                    xtype: 'form',
                    id: prototype.idDE + '-formControlData',
                    layout: {
                        type: 'vbox',
                        pack: 'center'
                    },
                    width: '100%',
                    border: false,
                    bodyStyle: 'background: transparent',
                    defaults: {
                        xtype: 'panel',
                        layout: {
                            type: 'hbox',
                            pack: 'center'
                        },
                        width: '100%',
                        border: false,
                        bodyStyle: 'background: transparent',
                        defaults: {
                            xtype: 'textfield',
                            margin: '5 8 5 8',
                            labelStyle: 'text-align:left;font-weight: bolder;',
                            fieldStyle: 'text-align:center;',
                            editable: false
                        }
                    },
                    items: [
                        {
                            items: [
                                {
                                    labelWidth: 75,
                                    width: 175,
                                    fieldLabel: 'User Crt.',
                                    name: 'USCR'
                                },
                                {
                                    labelWidth: 75,
                                    width: 175,
                                    fieldLabel: 'Date Crt.',
                                    name: 'FECR'
                                },
                                {
                                    labelWidth: 75,
                                    width: 175,
                                    fieldLabel: 'Hour Crt.',
                                    name: 'HOCR'
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    labelWidth: 75,
                                    width: 175,
                                    fieldLabel: 'User Upd.',
                                    name: 'USUP'
                                },
                                {
                                    labelWidth: 75,
                                    width: 175,
                                    fieldLabel: 'Date Upd.',
                                    name: 'FEUP'
                                },
                                {
                                    labelWidth: 75,
                                    width: 175,
                                    fieldLabel: 'Hour Upd.',
                                    name: 'HOUP'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
        //</editor-fold>
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            border: false,
            margin: '7 5 7 5',
            padding: '3 0 3 0',
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults: {
                scale: 'medium'
            },
            items: [
                {
                    text: 'Update',
                    id: prototype.idDE + '-btn-update',
                    iconCls: 'prx-icon-reload',
                    hidden: true,
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Delete',
                    id: prototype.idDE + '-btn-delete',
                    iconCls: 'prx-icon-delete',
                    hidden: true,
                    listeners: {
                        click: 'onDeleteClick'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.idDE + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                },
                {
                    text: 'History Log',
                    id: prototype.idDE + '-btn-viewTaxesLog',
                    iconCls: 'prx-icon-detail',
                    hidden: true,
                    listeners: {
                        click: 'onViewTaxesLog'
                    }
                }
            ]
        }
    ]
});