Ext.define('Ext.Praxis.view.payments.SalesReconciliationControlForm.FiltersByPayment', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filtersByPayment',
    requires: [
        'Ext.Praxis.view.widgets.MonthField'
    ],
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '2px 0px 1px 0px',
    layout: 'hbox',
    items: [
        {
            xtype: 'combobox',
            fieldLabel: 'Search By',
            padding: '10 5 10 10',
            id: prototype.id + '-cmbFiltersBP',
            store: Ext.create('Ext.data.SimpleStore', {
                fields: ['code', 'name'],
                data: [
                    ['S', 'Summary'],
                    ['F', 'Browser']
                ]
            }),
            labelWidth: 75,
            width: 180,
            displayField: 'name',
            valueField: 'code',
            queryMode: 'local',
            editable: false,
            value: 'S',
            listeners: {
                change: 'onChangeFiltersBP'
            }
        },
        {
            xtype: 'panel',
            border: false,
            bodyStyle: 'background: transparent',
            height: 'auto',
            margin: '0 0 0 0',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            items: [
                //<editor-fold defaultstate="collapsed" desc="Summary">
                {
                    xtype: 'form',
                    border: false,
                    id: prototype.id + '-formFiltersBP-1',
                    bodyStyle: 'background: transparent',
                    layout: 'vbox',
                    defaults: {
                        fieldStyle: 'text-align: center;',
                        padding: '5 1 5 1',
                        anchor: '100%',
                        hiddenLabel: false,
                        labelAlign: 'right',
                        hidden: false
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background: transparent',
                            defaults: {
                                fieldStyle: 'text-align: center;',
                                padding: '5 1 5 1',
                                anchor: '100%',
                                hiddenLabel: false,
                                labelAlign: 'right',
                                hidden: false
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Date',
                                    //id: prototype.id + '-cmbDate',
                                    name: 'IN_DATE',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['PRDA', 'Processing Date'],
                                            ['PAYDATE', 'Payment Date']
                                        ]
                                    }),
                                    labelWidth: 50,
                                    width: 180,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: 'PRDA'
                                },
                                {
                                    xtype: 'monthfield',
                                    fieldLabel: 'From',
                                    format: 'Ym',
                                    altFormats: 'm/Y',
                                    editable: false, // Deshabilita la edición del campo
                                    labelWidth: 50,
                                    width: 150,
                                    value: new Date(new Date().getFullYear(), 0, 1),
                                    listeners: {
                                        change: 'onChangeMonthBtn'
                                    },
                                    name: 'month'
                                },
                                {
                                    xtype: 'monthfield',
                                    fieldLabel: 'To',
                                    format: 'Ym',
                                    altFormats: 'm',
                                    editable: false, // Deshabilita la edición del campo
                                    lastDay: true,
                                    labelWidth: 30,
                                    width: 130,
                                    value: new Date(),
                                    listeners: {
                                        change: 'onChangeMonthBtn'
                                    },
                                    name: 'month'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbProctype',
                                    name: 'IN_PROCTYPE',
                                    labelWidth: 70,
                                    width: 250,
                                    valueField: 'a4451key3',
                                    displayField: 'a4451desc1',
                                    fieldLabel: 'Processor',
                                    queryMode: 'local',
                                    editable: false,
                                    allowBlank: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    labelAlign: 'right',
                                    typeAhead: true,
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    value: ''
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbPaisesBP',
                                    name: 'IN_SCOUNTRY',
                                    queryMode: 'local',
                                    allowBlank: true,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    fieldLabel: 'Country',
                                    labelWidth: 65,
                                    labelAlign: 'right',
                                    width: 230,
                                    typeAhead: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    value: ''
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Doc. Type',
                                    name: 'IN_TRANSTYPE',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['', 'All'],
                                            ['SALE', 'Sale'],
                                            ['RFND', 'Refund'],
                                            ['CHBK', 'Chargeback'],
                                            ['ADJU', 'Adjustment']
                                        ]
                                    }),
                                    labelWidth: 80,
                                    width: 180,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: ''
                                },
                                {
                                    xtype: 'checkbox',
                                    fieldLabel: 'Void',
                                    labelWidth: 50,
                                    width: 80,
                                    name: 'IN_FVOID',
                                    inputValue: 'V',
                                    uncheckedValue: '', // Establecer el valor cuando esté desmarcado como una cadena vacía
                                    listeners: {
                                        change: function (checkbox, newValue) {}
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Merchant',
                                    labelWidth: 70,
                                    width: 185,
                                    name: 'IN_SMERCHID',
                                    //allowBlank: false, // Puedes configurar esto para requerir un valor
                                    maxLength: 15, // Límite máximo de caracteres
                                    maskRe: /[0-9]/, // Expresión regular para permitir solo números
                                    enforceMaxLength: true // Aplicar la longitud máxima de caracteres
                                }
                            ]
                        }
                        ,
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background: transparent',
                            defaults: {
                                fieldStyle: 'text-align: center;',
                                padding: '5 1 5 1',
                                anchor: '100%',
                                hiddenLabel: false,
                                labelAlign: 'right',
                                hidden: false
                            },
                            items:[
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Status',
                                    name: 'IN_STVAL',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['', 'All'],
                                            ['0', 'Stand By'],
                                            ['1', 'Match'],
                                            ['2', 'Sales Without Settl.'],
                                            ['3', 'Settl. Without Sales'],
                                            ['4', 'Match Diff.'],
                                            ['5', 'Match Manual'],
                                            ['6', 'Forced Match'],
                                            ['7', 'Compensation Match'],
                                            ['8', 'Pending RFND']
                                        ]
                                    }),
                                    labelWidth: 55,
                                    width: 180,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: ''
                                },
                                {
                                    xtype: 'combobox',
                                    id: prototype.id + '-cmbCerrorSum',
                                    fieldLabel: 'Error Code',
                                    name: 'IN_CERROR',
                                    labelWidth: 80,
                                    width: 290,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: ''
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Adj. Code',
                                    id: prototype.id + '-cmbCodadjuSum',
                                    name: 'IN_CODADJU',
                                    labelWidth: 70,
                                    width: 230,
                                    displayField: 'a4451desc1',
                                    valueField: 'a4451key3',
                                    queryMode: 'local',
                                    editable: false,
                                    value: ''
                                }
                            ]
                        }
                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="Browser">
                {
                    xtype: 'form',
                    border: false,
                    id: prototype.id + '-formFiltersBP-2',
                    bodyStyle: 'background: transparent',
                    hidden: true,
                    layout: 'vbox',
                    defaults: {
                        fieldStyle: 'text-align: center;',
                        padding: '5 1 5 1',
                        anchor: '100%',
                        hiddenLabel: false,
                        labelAlign: 'right',
                        hidden: false
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background: transparent',
                            defaults: {
                                fieldStyle: 'text-align: center;',
                                padding: '5 1 5 1',
                                anchor: '100%',
                                hiddenLabel: false,
                                labelAlign: 'right',
                                hidden: false
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Date',
                                    name: 'IN_DATE',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['PRDA', 'Processing Date'],
                                            ['PAYDATE', 'Payment Date']
                                        ]
                                    }),
                                    labelWidth: 50,
                                    width: 180,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: 'PRDA'
                                },
                                {
                                    xtype: 'datefield',
                                    name: 'IN_DATEFROM',
                                    fieldLabel: 'From',
                                    format: 'Ymd',
                                    editable: false, // Deshabilita la edición del campo
                                    labelWidth: 50,
                                    width: 150,
                                    value: new Date(new Date().getFullYear(), 0, 1),
                                    validator: 'validaFecha',
                                    listeners: {
                                        change: 'onChangeFechaBtn'
                                    }
                                },
                                {
                                    xtype: 'datefield',
                                    name: 'IN_DATETO',
                                    fieldLabel: 'To',
                                    format: 'Ymd',
                                    altFormats: 'm',
                                    editable: false, // Deshabilita la edición del campo
                                    labelWidth: 30,
                                    width: 130,
                                    value: new Date(),
                                    validator: 'validaFecha',
                                    listeners: {
                                        change: 'onChangeFechaBtn'
                                    }
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbProctypef',
                                    name: 'IN_PROCTYPE',
                                    labelWidth: 70,
                                    width: 250,
                                    valueField: 'a4451key3',
                                    displayField: 'a4451desc1',
                                    fieldLabel: 'Processor',
                                    queryMode: 'local',
                                    editable: false,
                                    allowBlank: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    labelAlign: 'right',
                                    typeAhead: true,
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    value: ''
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbPaisesfBP',
                                    name: 'IN_SCOUNTRY',
                                    queryMode: 'local',
                                    allowBlank: true,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    fieldLabel: 'Country',
                                    labelWidth: 65,
                                    labelAlign: 'right',
                                    width: 230,
                                    typeAhead: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    value: ''
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Doc. Type',
                                    name: 'IN_TRANSTYPE',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['', 'All'],
                                            ['SALE', 'Sale'],
                                            ['RFND', 'Refund'],
                                            ['CHBK', 'Chargeback'],
                                            ['ADJU', 'Adjustment']
                                        ]
                                    }),
                                    labelWidth: 80,
                                    width: 180,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: ''
                                },
                                {
                                    xtype: 'checkbox',
                                    fieldLabel: 'Void',
                                    labelWidth: 40,
                                    width: 70,
                                    name: 'IN_FVOID',
                                    inputValue: 'V',
                                    uncheckedValue: '', // Establecer el valor cuando esté desmarcado como una cadena vacía
                                    listeners: {
                                        change: function (checkbox, newValue) {}
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Ref. Number',
                                    hidden: true,
                                    labelWidth: 80,
                                    width: 250,
                                    name: 'IN_AREFNBR',
                                    maxLength: 23, // Límite máximo de caracteres
                                    maskRe: /[0-9]/, // Expresión regular para permitir solo números
                                    enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Status',
                                    name: 'IN_STVAL',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['', 'All'],
                                            ['0', 'Stand By'],
                                            ['1', 'Match'],
                                            ['3', 'Settl. Without Sales'],
                                            ['4', 'Match Diff.'],
                                            ['5', 'Match Manual'],
                                            ['6', 'Forced Match'],
                                            ['7', 'Compensation Match'],
                                            ['8', 'Pending RFND']
                                        ]
                                    }),
                                    labelWidth: 55,
                                    width: 180,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: ''
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background: transparent',
                            defaults: {
                                fieldStyle: 'text-align: center;',
                                padding: '5 1 5 1',
                                anchor: '100%',
                                hiddenLabel: false,
                                labelAlign: 'right',
                                hidden: false
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Ticket',
                                    labelWidth: 60,
                                    width: 160,
                                    name: 'IN_TICKET',
                                    maxLength: 13, // Límite máximo de caracteres
                                    maskRe: /[0-9]/, // Expresión regular para permitir solo números
                                    enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'PNR',
                                    labelWidth: 40,
                                    width: 120,
                                    name: 'IN_SPNR',
                                    maxLength: 8, // Límite máximo de caracteres
                                    maskRe: /[a-zA-Z0-9]/, // Expresión regular para permitir solo números
                                    enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Card Number',
                                    labelWidth: 80,
                                    width: 150,
                                    name: 'creditcard',
                                    maxLength: 6, // Límite máximo de caracteres
                                    maskRe: /[0-9]/, // Expresión regular para permitir solo números
                                    enforceMaxLength: true // Aplicar la longitud máxima de caracteres
                                },
                                {
                                    xtype: 'label',
                                    text: '*****(*)'
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'creditcard',
                                    width: 50,
                                    maxLength: 4, // Límite máximo de caracteres
                                    maskRe: /[0-9]/, // Expresión regular para permitir solo números
                                    enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Auth',
                                    labelWidth: 40,
                                    width: 100,
                                    name: 'IN_SAUTHOC',
                                    maxLength: 6, // Límite máximo de caracteres
                                    maskRe: /[a-zA-Z0-9]/, // Expresión regular para permitir solo números
                                    enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'combobox',
                                    id: prototype.id + '-cmbCerror',
                                    fieldLabel: 'Error Code',
                                    name: 'IN_CERROR',
                                    labelWidth: 80,
                                    width: 290,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: ''
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Adj. Code',
                                    id: prototype.id + '-cmbCodadju',
                                    name: 'IN_CODADJU',
                                    labelWidth: 70,
                                    width: 230,
                                    displayField: 'a4451desc1',
                                    valueField: 'a4451key3',
                                    queryMode: 'local',
                                    editable: false,
                                    value: ''
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Merchant',
                                    labelWidth: 70,
                                    width: 185,
                                    name: 'IN_PMERCHID',
                                    //allowBlank: false, // Puedes configurar esto para requerir un valor
                                    maxLength: 15, // Límite máximo de caracteres
                                    maskRe: /[0-9]/, // Expresión regular para permitir solo números
                                    enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Amount',
                                    labelWidth: 60,
                                    width: 160,
                                    name: 'IN_AMOUNT',
                                    maxLength: 15,
                                    enforceMaxLength: true,
                                    maskRe: /[0-9\.]/, // Máscara para números y punto decimal
                                    regex: /^\d+(\.\d{1,2})?$/, // Validación para permitir hasta 2 decimales
                                    regexText: 'Invalid Amount', // Mensaje de error personalizado
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                }
                            ]
                        }
                    ]
                }
                //</editor-fold>
            ]
        }
    ]
});
