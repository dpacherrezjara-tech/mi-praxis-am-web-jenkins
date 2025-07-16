Ext.define('Ext.Praxis.view.payments.SalesReconciliationControlForm.FiltersByTicket', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filtersByTicket',
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
            margin: '30 10 10 10',
            labelStyle: 'text-align: left;font-weight:bold',
            id: prototype.id + '-cmbFiltersBT',
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
                change: 'onChangeFiltersBT'
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
                    id: prototype.id + '-formFiltersBT-1',
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
                                            ['FECVT', 'Sale Date'],
                                            ['PRDA', 'Processing Date'],
                                            ['FEUP', 'Update Date']
                                        ]
                                    }),
                                    labelWidth: 50,
                                    width: 180,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: 'FECVT'
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
                                        change: 'onChangeMonthBTBtn'
                                    },
                                    name: 'month',
                                    id: prototype.id + '-monthfieldFromBT'
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
                                        change: 'onChangeMonthBTBtn'
                                    },
                                    name: 'month',
                                    id: prototype.id + '-monthfieldToBT'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbPaisesBT',
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
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbMonedabBT',
                                    name: 'IN_SCURRENCY',
                                    queryMode: 'local',
                                    allowBlank: true,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    fieldLabel: 'Currency',
                                    labelWidth: 70,
                                    labelAlign: 'right',
                                    width: 140,
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
                                    name: 'IN_TRNCU',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['', 'All'],
                                            ['SALE', 'Sale'],
                                            ['RFND', 'Refund']
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
                                    xtype: 'combobox',
                                    fieldLabel: 'Status',
                                    name: 'IN_STVAL',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['', 'All'],
                                            ['0', 'Stand By'],
                                            ['1', 'Match'],
                                            ['2', 'Sales W/O Settl.'],
                                            ['4', 'Match Parcial'],
                                            ['5', 'Match Manual'],
                                            ['6', 'Match Forzado'],
                                            ['7', 'Match Compensation'],
                                            ['8', 'Match Transaccional'],
                                            ['9', 'Match Void'],
                                            ['A', 'Match OC/Camepa'],
                                            ['M', 'Match Multi-Payment'],
                                            ['C', 'Match Complement']
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
                            items: [
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Source',
                                    name: 'IN_FUENT',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['', 'All'],
                                            ['ASR', 'ASR'],
                                            ['BSP', 'BSP'],
                                            ['ARC', 'ARC'],
                                            ['MAN', 'Manual']
                                        ]
                                    }),
                                    labelWidth: 60,
                                    width: 150,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: ''
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Channel',
                                    name: 'IN_SFUEN',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['', 'All'],
                                            ['CCT', 'CCT'],
                                            ['FRA', 'FRA'],
                                            ['ATO', 'ATO'],
                                            ['CTO', 'CTO'],
                                            ['WEB', 'WEB'],
                                            ['GSA', 'GSA']
                                        ]
                                    }),
                                    labelWidth: 60,
                                    width: 150,
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
                                    fieldLabel: 'IATA',
                                    labelWidth: 50,
                                    width: 140,
                                    name: 'IN_SAGENT',
                                    maxLength: 8, // Límite máximo de caracteres
                                    maskRe: /[0-9]/, // Expresión regular para permitir solo números
                                    enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Card Type',
                                    name: 'IN_TCARD',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['', 'All'],
                                            ['2', 'Master Card'],
                                            ['1', 'Visa'],
                                            ['3', 'American Express'],
                                            ['5', 'Dinners Club'],
                                            ['6', 'UATP'],
                                            ['4', 'Boomers']
                                        ]
                                    }),
                                    labelWidth: 65,
                                    width: 190,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    listeners: {
                                        change: 'onChangeCreditCardBTSum'
                                    },
                                    value: ''
                                },
                                {
                                    xtype: 'combobox',
                                    id: prototype.id + '-cmbCreditCardBTSum',
                                    fieldLabel: 'Card Code',
                                    name: 'IN_CCARD',
                                    labelWidth: 65,
                                    width: 210,
                                    hidden: true,
                                    displayField: 'a4451desc1',
                                    valueField: 'a4451key3',
                                    queryMode: 'local',
                                    editable: false,
                                    value: ''
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'IN_TFOP',
                                    labelWidth: 40,
                                    width: 100,
                                    hidden: true,
                                    name: 'IN_TFOP',
                                    value: ''
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'IN_GCARD',
                                    labelWidth: 40,
                                    width: 100,
                                    hidden: true,
                                    name: 'IN_GCARD',
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
                    id: prototype.id + '-formFiltersBT-2',
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
                                            ['FECVT', 'Sale Date'],
                                            ['PRDA', 'Processing Date'],
                                            ['FEUP', 'Update Date']
                                        ]
                                    }),
                                    labelWidth: 50,
                                    width: 180,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: 'FECVT'
                                },
                                {
                                    xtype: 'datefield',
                                    name: 'IN_DATEFROM',
                                    fieldLabel: 'From',
                                    format: 'Ymd',
                                    editable: false, // Deshabilita la edición del campo
                                    labelWidth: 50,
                                    width: 150,
                                    value: new Date(anioActual, mesActual, 1),
                                    validator: 'validaFecha',
                                    listeners: {
                                        change: 'onChangeDateBTBtn'
                                    },
                                    id: prototype.id + '-datefieldFromBT'
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
                                    value: fechaActual,
                                    validator: 'validaFecha',
                                    listeners: {
                                        change: 'onChangeDateBTBtn'
                                    },
                                    id: prototype.id + '-datefieldToBT'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbPaisesfBT',
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
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbMonedaBT',
                                    name: 'IN_SCURRENCY',
                                    queryMode: 'local',
                                    allowBlank: true,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    fieldLabel: 'Currency',
                                    labelWidth: 70,
                                    labelAlign: 'right',
                                    width: 140,
                                    typeAhead: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    value: ''
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Document',
                                    name: 'IN_TRNCU',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['', 'All'],
                                            ['SALE', 'Sale'],
                                            ['RFND', 'Refund']
                                        ]
                                    }),
                                    labelWidth: 70,
                                    width: 160,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: ''
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Source',
                                    name: 'IN_FUENT',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['', 'All'],
                                            ['ASR', 'ASR'],
                                            ['BSP', 'BSP'],
                                            ['ARC', 'ARC'],
                                            ['MAN', 'Manual']
                                        ]
                                    }),
                                    labelWidth: 60,
                                    width: 130,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: ''
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Channel',
                                    name: 'IN_SFUEN',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['', 'All'],
                                            ['CCT', 'CCT'],
                                            ['FRA', 'FRA'],
                                            ['ATO', 'ATO'],
                                            ['CTO', 'CTO'],
                                            ['WEB', 'WEB'],
                                            ['GSA', 'GSA']
                                        ]
                                    }),
                                    labelWidth: 60,
                                    width: 130,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: ''
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Doc. Type',
                                    name: 'IN_TIPOD',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['', 'All'],
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
                                    value: ''
                                },
                                {
                                    xtype: 'checkbox',
                                    fieldLabel: 'Void',
                                    labelWidth: 40,
                                    width: 55,
                                    name: 'IN_FVOID',
                                    inputValue: 'V',
                                    uncheckedValue: '', // Establecer el valor cuando esté desmarcado como una cadena vacía
                                    listeners: {
                                        change: function (checkbox, newValue) {}
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'IATA',
                                    labelWidth: 50,
                                    width: 140,
                                    name: 'IN_SAGENT',
                                    maxLength: 8, // Límite máximo de caracteres
                                    maskRe: /[0-9]/, // Expresión regular para permitir solo números
                                    enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
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
                                    fieldLabel: 'Status',
                                    name: 'IN_STVAL',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['', 'All'],
                                            ['0', 'Stand By'],
                                            ['1', 'Match'],
                                            ['2', 'Sales W/O Settl.'],
                                            ['4', 'Match Parcial'],
                                            ['5', 'Match Manual'],
                                            ['6', 'Match Forzado'],
                                            ['7', 'Match Compensation'],
                                            ['8', 'Match Transaccional'],
                                            ['9', 'Match Void'],
                                            ['A', 'Match OC/Camepa'],
                                            ['M', 'Match Multi-Payment'],
                                            ['C', 'Match Complement']
                                            
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
                                    fieldLabel: 'Card Type',
                                    name: 'IN_TCARD',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['', 'All'],
                                            ['2', 'Master Card'],
                                            ['1', 'Visa'],
                                            ['3', 'American Express'],
                                            ['5', 'Dinners Club'],
                                            ['6', 'UATP'],
                                            ['4', 'Boomers']
                                        ]
                                    }),
                                    labelWidth: 65,
                                    width: 190,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    listeners: {
                                        change: 'onChangeCreditCardBT'
                                    },
                                    value: ''
                                },
                                {
                                    xtype: 'combobox',
                                    id: prototype.id + '-cmbCreditCardBT',
                                    fieldLabel: 'Card Code',
                                    name: 'IN_CCARD',
                                    labelWidth: 65,
                                    width: 210,
                                    hidden: true,
                                    displayField: 'a4451desc1',
                                    valueField: 'a4451key3',
                                    queryMode: 'local',
                                    editable: false,
                                    value: ''
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Amount',
                                    labelWidth: 60,
                                    width: 150,
                                    name: 'IN_AMOUNT',
                                    maxLength: 15,
                                    enforceMaxLength: true,
                                    maskRe:  /[0-9\.\-]/, // Máscara para números y punto decimal
                                    regex: /^[-]?\d+(\.\d{1,2})?$/, // Validación para permitir hasta 2 decimales
                                    regexText: 'Invalid Amount', // Mensaje de error personalizado
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Pax Name',
                                    labelWidth: 60,
                                    width: 250,
                                    name: 'IN_PAX',
                                    maskRe: /[A-Za-z%]/, // Expresión regular para permitir solo letras
                                    maxLength: 100,
                                    enforceMaxLength: true,
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
