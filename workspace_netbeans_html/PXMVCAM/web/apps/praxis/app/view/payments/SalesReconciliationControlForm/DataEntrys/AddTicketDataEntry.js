prototype.idTicket = prototype.id + '-AddTicketDataEntry';
Ext.define('Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.AddTicketDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.AddTicketDataEntry',
    requires: [
        'Ext.Praxis.controller.payments.SalesReconciliationControl.AddTicketDataEntryController'
    ],
    controller: 'AddTicketDataEntryController',
    title: 'Add Ticket - Form',
    header: true,
    width: 860,
    resizable: true,
    layout: 'fit',
    modal: true,
    border: false,
    defaults: {
        border: false
    },
    scrollable: true,
    items: [
        {
            xtype: 'form',
            id: prototype.idTicket + '-mainForm',
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            anchor: '100%',
            items: [
                //<editor-fold defaultstate="collapsed" desc="Ticket">
                {
                    xtype: 'panel',
                    width: '100%',
                    layout: 'hbox',
                    margin: '5 5 5 5',
                    border: true,
                    defaults: {
                        xtype: 'textfield',
                        fieldStyle: 'text-align: center;',
                        padding: '5 1 5 1',
                        hiddenLabel: false,
                        labelAlign: 'right',
                        hidden: false
                    },
                    items: [
                        {
                            name: 'IN_A4496CCUST',
                            hidden: true,
                            value: '139'
                        },
                        {
                            name: 'IN_A4496CIA',
                            fieldLabel: 'Cia',
                            labelWidth: 40,
                            width: 80,
                            maxLength: 3,
                            enforceMaxLength: true,
                            value: '139',
                            readOnly: true,
                            maskRe: /[0-9]/
                        },
                        {
                            name: 'IN_A4496FORMA',
                            fieldLabel: 'Forma',
                            id: prototype.idTicket + '-forma',
                            labelWidth: 50,
                            width: 100,
                            maxLength: 4,
                            minLength: 4,
                            allowBlank: false,
                            enforceMaxLength: true,
                            maskRe: /[0-9]/
                        },
                        {
                            name: 'IN_A4496SERIE',
                            fieldLabel: 'Serie',
                            id: prototype.idTicket + '-serie',
                            labelWidth: 40,
                            width: 100,
                            maxLength: 6,
                            minLength: 6,
                            allowBlank: false,
                            enforceMaxLength: true,
                            maskRe: /[0-9]/
                        },
                        {
                            xtype: 'button',
                            id: prototype.idTicket + '-btnSearch',
                            height: 25,
                            width: 25,
                            margin: '4 4 4 7',
                            iconCls: 'prx-icon-search',
                            tooltip: 'Search',
                            listeners: {
                                click: 'onClickSearchBtn'
                            }
                        },
                        {
                            width: 150,
                            readOnly: true,
                            id: prototype.idTicket + '-resultSearch'
                        },
                        {
                            xtype: 'button',
                            id: prototype.idTicket + '-btnCancel',
                            height: 25,
                            width: 25,
                            hidden: true,
                            margin: '4 4 4 7',
                            iconCls: 'prx-icon-cancel-action',
                            tooltip: 'Cancel',
                            listeners: {
                                click: 'onCancelBtn'
                            }
                        }
                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="Information">
                {
                    xtype: 'panel',
                    title: 'Ticket Information',
                    id: prototype.idTicket + '-ticketInfo',
                    hidden: true,
                    width: '100%',
                    layout: 'vbox',
                    margin: '5 5 5 5',
                    border: true,
                    defaults: {
                        xtype: 'panel',
                        width: '100%',
                        layout: 'hbox',
                        border: false,
                        defaults: {
                            xtype: 'textfield',
                            fieldStyle: 'text-align: center;',
                            padding: '5 1 5 1',
                            hiddenLabel: false,
                            labelAlign: 'right',
                            hidden: false
                        }
                    },
                    items: [
                        {
                            items: [
                                {
                                    fieldLabel: ' Sale Date',
                                    name: 'IN_A4496FECVT',
                                    labelWidth: 80,
                                    width: 170,
                                    editable: true,
                                    xtype: 'datefield',
                                    format: 'Ymd', // Formato de fecha deseado
                                    submitFormat: 'Ymd', // Formato de fecha para enviar al servidor
                                    allowBlank: false, // No permite fechas vacías
                                    maxLength: 8, // Máximo de 10 caracteres
                                    minLength: 8,
                                    enforceMaxLength: true
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Transaction',
                                    name: 'IN_A4496TRNCU',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['SALE', 'Sale'],
                                            ['RFND', 'Refund']
                                        ]
                                    }),
                                    labelWidth: 90,
                                    width: 210,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: 'SALE'
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Doc. Type',
                                    name: 'IN_A4496TIPOD',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['TKT', 'TKT'],
                                            ['EMD', 'EMD'],
                                            ['VOU', 'VOU'],
                                            ['EXB', 'EXB'],
                                            ['MD50', 'MD50'],
                                            ['CCR', 'CCR']
                                        ]
                                    }),
                                    labelWidth: 70,
                                    width: 140,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: 'TKT'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.idTicket + '-cmbPaises',
                                    name: 'IN_A4496PAIS',
                                    queryMode: 'local',
                                    allowBlank: true,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    fieldLabel: 'Country',
                                    labelWidth: 60,
                                    labelAlign: 'right',
                                    width: 220,
                                    typeAhead: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    value: 'MX'
                                },
                                {
                                    name: 'IN_A4496SEQ',
                                    fieldLabel: 'Seq',
                                    labelWidth: 30,
                                    width: 70,
                                    maxLength: 2,
                                    minLength: 2,
                                    allowBlank: false,
                                    enforceMaxLength: true,
                                    maskRe: /[0-9]/,
                                    value: '00'
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    name: 'IN_A4496AGENT',
                                    fieldLabel: 'Agent',
                                    labelWidth: 60,
                                    allowBlank: false,
                                    width: 130,
                                    maxLength: 8,
                                    minLength: 8,
                                    enforceMaxLength: true,
                                    maskRe: /[0-9]/
                                },
                                {
                                    fieldLabel: 'PNR',
                                    labelWidth: 40,
                                    width: 120,
                                    name: 'IN_A4496PNR',
                                    maxLength: 6, // Límite máximo de caracteres
                                    minLength: 6,
                                    allowBlank: false,
                                    maskRe: /[a-zA-Z0-9]/, // Expresión regular para permitir solo números
                                    enforceMaxLength: true
                                },
                                {
                                    fieldLabel: 'Agent Code',
                                    labelWidth: 80,
                                    width: 160,
                                    name: 'IN_A4496CODAG',
                                    maxLength: 8, // Límite máximo de caracteres
                                    maskRe: /[a-zA-Z0-9]/, // Expresión regular para permitir solo números
                                    enforceMaxLength: true
                                },

                                {
                                    xtype: 'checkbox',
                                    fieldLabel: 'Void',
                                    labelWidth: 40,
                                    width: 55,
                                    name: 'IN_A4496TKVOI',
                                    inputValue: 'V',
                                    uncheckedValue: '', // Establecer el valor cuando esté desmarcado como una cadena vacía
                                    listeners: {
                                        change: function (checkbox, newValue) {}
                                    }
                                },
                                {
                                    fieldLabel: 'Pax Name',
                                    labelWidth: 70,
                                    width: 300,
                                    name: 'IN_A4496PAX',
                                    maxLength: 45, // Límite máximo de caracteres
                                    allowBlank: false,
                                    maskRe: /^[a-zA-Z /]+$/,
                                    enforceMaxLength: true
                                }
                            ]
                        },
                        {
                            layout: {
                                type: 'hbox',
                                pack: 'end'
                            },
                            items: [
                                {
                                    xtype: 'combo',
                                    id: prototype.idTicket + '-cmbMoneda',
                                    name: 'IN_A4496MDA',
                                    queryMode: 'local',
                                    allowBlank: true,
                                    margin: '0 5 0 5',
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    fieldLabel: 'Currency',
                                    labelWidth: 70,
                                    labelAlign: 'right',
                                    width: 140,
                                    typeAhead: true,
                                    valueField: 'a006PAIS',
                                    displayField: 'a006PAIS',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    value: 'MXN'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Fare',
                                    fieldStyle: 'text-align: right;',
                                    labelWidth: 40,
                                    width: 140,
                                    name: 'IN_A4496TARIF',
                                    margin: '0 5 0 5',
                                    maxLength: 15,
                                    enforceMaxLength: true,
                                    maskRe: /[0-9\.\-]/, // Máscara para números y punto decimal
                                    regex: /^[-]?\d+(\.\d{1,2})?$/, // Validación para permitir hasta 2 decimales
                                    regexText: 'Invalid Amount'
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.idTicket + '-gridFops',
                                    columnLines: true,
                                    autoScroll: true,
                                    minHeight: 180,
                                    width: '100%',
                                    maxHeight: 200,
                                    margin: '5 5 5 5',
                                    store: [],
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
                                                iconCls: 'prx-icon-add',
                                                scale: 'small',
                                                tooltip: 'Add FOP',
                                                listeners: {
                                                    click: 'addFormOfPayment'
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
                                            {
                                                text: 'RN',
                                                xtype: 'rownumberer', // Columna de número de fila
                                                width: 40 // Ancho de la columna de número de fila (ajusta según tus necesidades)
                                            },
                                            {text: 'FOP Code', dataIndex: 'IN_A4501CFOP', width: 80},
                                            {text: 'FOP<br>Type', dataIndex: 'IN_A4501TFOP', width: 60, hidden: true},
                                            {text: 'Card<br>Type', dataIndex: 'IN_A4501TTARJ', width: 150,
                                                editor: {
                                                    xtype: 'combobox',
                                                    displayField: 'a4451desc1',
                                                    valueField: 'a4451key3',
                                                    queryMode: 'local',
                                                    editable: false,
                                                    value: 'AX'
                                                }
                                            },
                                            {text: 'Card<br>Number', dataIndex: 'IN_A4501NREF', flex: 1,
                                                editor: {
                                                    xtype: 'textfield',
                                                    allowBlank: false,
                                                    keyNavEnabled: false, // Desactiva la navegación con teclado
                                                    maskRe: /[0-9*Xx]/,
                                                    emptyText: 'Invalid Card Number',
                                                    maxLength: 19,
                                                    enforceMaxLength: true,
                                                    minLength: 10
                                                }
                                            },
                                            {text: 'Auth<br>Code', dataIndex: 'IN_A4501CAPL', width: 100,
                                                editor: {
                                                    xtype: 'textfield',
                                                    allowBlank: false,
                                                    keyNavEnabled: false, // Desactiva la navegación con teclado
                                                    maskRe: /[0-9a-zA-Z]/,
                                                    emptyText: 'Invalid Auth Code',
                                                    maxLength: 6,
                                                    enforceMaxLength: true,
                                                    minLength: 4
                                                }
                                            },
                                            {text: 'Amount', dataIndex: 'IN_A4501VFOP', width: 120,
                                                editor: {
                                                    xtype: 'numberfield',
                                                    allowBlank: false,
                                                    hideTrigger: true, // Oculta las flechas para incrementar/decrementar
                                                    keyNavEnabled: false, // Desactiva la navegación con teclado
                                                    mouseWheelEnabled: false // Desactiva la rueda del mouse para cambiar el valor
                                                            //maskRe: /[0-9]/
                                                }
                                            },
                                            {text: 'Currency', dataIndex: 'IN_A4501MFOP', width: 80},
                                            {
                                                sortable: false,
                                                xtype: 'actioncolumn',
                                                width: 40,
                                                text: 'Del.',
                                                align: 'center',
                                                items: [
                                                    {
                                                        iconCls: 'prx-icon-image-trash',
                                                        tooltip: 'Delete',
                                                        handler: 'onDeleteFOP'
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    plugins: {
                                        ptype: 'cellediting',
                                        clicksToEdit: 1, // 2 clics para editar la fila
                                        listeners: {
                                            edit: function (editor, context) {
                                                context.grid.getView().refresh();
                                            },
                                            beforeedit: 'onBeforeEdit'
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }
                //</editor-fold>
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            margin: '10 0 10 0',
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults: {
                scale: 'medium'
            },
            items: [
                {
                    text: 'Save',
                    id: prototype.idTicket + '-saveTicketBtn',
                    hidden: true,
                    iconCls: 'prx-icon-save',
                    listeners: {
                        click: 'onSaveTicket'
                    }
                },
                {
                    text: 'Cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});