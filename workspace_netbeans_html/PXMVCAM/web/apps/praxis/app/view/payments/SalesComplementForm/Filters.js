Ext.define('Ext.Praxis.view.payments.SalesComplementForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '2px 0px 1px 0px',
    layout: 'hbox',
    items: [
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
                //<editor-fold defaultstate="collapsed" desc="Plusgrade">
                {
                    xtype: 'form',
                    border: false,
                    id: prototype.id + '-formFilters-1',
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
                                    xtype: 'textfield',
                                    name: 'IN_CCUST',
                                    value: '139',
                                    hidden: true
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Date',
                                    //id: prototype.id + '-cmbDate',
                                    name: 'IN_DATE',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['PRDA', 'Processing Date'],
                                            ['SDATE', 'Sale Date'],
                                            ['FECSELEC', 'Match Date Sales'],
                                            ['AMEXFECSELEC', 'Match Date Amex'],
                                            ['FCONT', 'Accounting Date']
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
                                    value: new Date(),
                                    listeners: {
                                        change: 'onChangeDateComplement'
                                    },
                                    id: prototype.id + '-datefieldFromPlusgrade'
                                },
                                {
                                    xtype: 'datefield',
                                    name: 'IN_DATETO',
                                    fieldLabel: 'From',
                                    format: 'Ymd',
                                    editable: false, // Deshabilita la edición del campo
                                    labelWidth: 50,
                                    width: 150,
                                    value: new Date(),
                                    listeners: {
                                        change: 'onChangeDateComplement'
                                    },
                                    id: prototype.id + '-datefieldToPlusgrade'
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Complements VS Amex',
                                    name: 'IN_FAMEX',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['X', 'All'],
                                            ['1', 'Match'],
                                            ['', 'Pending']
                                        ]
                                    }),
                                    labelWidth: 150,
                                    width: 280,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: 'X'
                                },
                                {
                                    xtype: 'combobox',
                                    id: prototype.id + '-cmbStvalPG',
                                    fieldLabel: 'Complements vs Sales',
                                    name: 'IN_STVAL',
                                    queryMode: 'local',
                                    // store: Ext.create('Ext.data.SimpleStore', {
                                    //     fields: ['code', 'name'],
                                    //     data: [
                                    //         ['X', 'All'],
                                    //         ['', 'Pending'],
                                    //         ['0', 'Stand By'],
                                    //         ['1', 'Match'],
                                    //         ['3', 'Settl. Without Sales'],
                                    //         ['4', 'Match Partial'],
                                    //         ['6', 'Match Forced'],
                                    //         ['E', 'Duplicate'],
                                    //         ['5', 'Match Manual'],
                                    //         ['I', 'Record Invalid']
                                    //     ]
                                    // }),
                                    labelWidth: 160,
                                    width: 280,
                                    editable: false,
                                    valueField: 'STVAL',
                                    displayField: 'DESCRIPTION',
                                    enableKeyEvents: true,
                                    // triggerAction: 'all',
                                    // value: 'X'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbPaisesPG',
                                    name: 'IN_COUNTRY',
                                    queryMode: 'local',
                                    allowBlank: true,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    fieldLabel: 'Country',
                                    labelWidth: 65,
                                    labelAlign: 'right',
                                    width: 220,
                                    typeAhead: true,
                                    editable: true,
                                    valueField: 'CODE',
                                    displayField: 'NAME',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
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
                                            ['1', 'Visa'],
                                            ['2', 'Master Card'],
                                            ['3', 'American Express']
                                        ]
                                    }),
                                    labelWidth: 80,
                                    width: 210,
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
                                    labelWidth: 50,
                                    width: 150,
                                    name: 'IN_TKT',
                                    //allowBlank: false, // Puedes configurar esto para requerir un valor
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
                                    labelWidth: 50,
                                    width: 120,
                                    name: 'IN_PNR',
                                    //allowBlank: false, // Puedes configurar esto para requerir un valor
                                    maxLength: 6, // Límite máximo de caracteres
                                    enforceMaxLength: true,
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Plusgrade ID',
                                    labelWidth: 90,
                                    width: 170,
                                    name: 'IN_PLUSGRAID',
                                    maxLength: 8,
                                    maskRe: /[0-9]/,
                                    enforceMaxLength: true,
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Ref. Number',
                                    labelWidth: 80,
                                    width: 220,
                                    name: 'IN_AREFNBR',
                                    maxLength: 23,
                                    maskRe: /[0-9]/,
                                    enforceMaxLength: true,
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Merchant',
                                    labelWidth: 70,
                                    width: 180,
                                    name: 'IN_MERCHID',
                                    //allowBlank: false, // Puedes configurar esto para requerir un valor
                                    maxLength: 10, // Límite máximo de caracteres
                                    enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Card Number',
                                    labelWidth: 100,
                                    width: 160,
                                    name: 'IN_SCARDN1',
                                    //allowBlank: false, // Puedes configurar esto para requerir un valor
                                    maxLength: 6, // Límite máximo de caracteres
                                    enforceMaxLength: true // Aplicar la longitud máxima de caracteres
                                },
                                {
                                    xtype: 'label',
                                    text: '*****(*)'
                                },
                                {
                                    xtype: 'textfield',
                                    width: 80,
                                    name: 'IN_SCARDN2',
                                    //allowBlank: false, // Puedes configurar esto para requerir un valor
                                    maxLength: 4, // Límite máximo de caracteres
                                    enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Auth',
                                    labelWidth: 50,
                                    width: 120,
                                    name: 'IN_SAUTHOC',
                                    //allowBlank: false, // Puedes configurar esto para requerir un valor
                                    maxLength: 8, // Límite máximo de caracteres
                                    enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'combobox',
                                    id: prototype.id + '-cmbCerrorPG',
                                    fieldLabel: 'Error Code',
                                    name: 'IN_CERROR',
                                    labelWidth: 70,
                                    width: 270,
                                    editable: false,
                                    valueField: 'CODE',
                                    displayField: 'DESCRIPTION',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    value: ''
                                }
                            ]
                        }
                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="MIT">
                {
                    xtype: 'form',
                    border: false,
                    id: prototype.id + '-formFilters-2',
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
                                    name: 'IN_PRDA',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['PRDA', 'Processing Date'],
//                                            ['PAYDATE', 'Payment Date'],
//                                            ['FEUP', 'Update Date']
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
                                    name: 'IN_PRDA_FROM',
                                    fieldLabel: 'From',
                                    format: 'Ymd',
                                    editable: false, // Deshabilita la edición del campo
                                    labelWidth: 50,
                                    width: 150,
                                    value: new Date(),
                                    validator: 'validaFecha',
                                    listeners: {
                                        change: 'onChangeDateComplement'
                                    },
                                    id: prototype.id + '-datefieldFromMIT'
                                },
                                {
                                    xtype: 'datefield',
                                    name: 'IN_PRDA_TO',
                                    fieldLabel: 'To',
                                    format: 'Ymd',
                                    altFormats: 'm',
                                    editable: false, // Deshabilita la edición del campo
                                    labelWidth: 30,
                                    width: 130,
                                    value: new Date(),
                                    validator: 'validaFecha',
                                    listeners: {
                                        change: 'onChangeDateComplement'
                                    },
                                    id: prototype.id + '-datefieldToMIT'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'PNR',
                                    labelWidth: 40,
                                    width: 120,
                                    name: 'IN_PNR',
                                    maxLength: 6, // Límite máximo de caracteres
                                    maskRe: /[a-zA-Z0-9]/,
                                    enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Card Number',
                                    labelWidth: 90,
                                    width: 150,
                                    name: 'IN_NUMTJ_1',
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
                                    name: 'IN_NUMTJ_2',
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
                                    name: 'IN_NUMAT',
                                    maxLength: 6, // Límite máximo de caracteres
                                    maskRe: /[a-zA-Z0-9]/, // Expresión regular para permitir solo números
                                    enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Amount',
                                    labelWidth: 60,
                                    width: 150,
                                    name: 'IN_AMOUNT',
                                    maxLength: 15,
                                    enforceMaxLength: true,
                                    maskRe: /[0-9\.\-]/, // Máscara para números y punto decimal
                                    regex: /^[-]?\d+(\.\d{1,2})?$/, // Validación para permitir hasta 2 decimales
                                    regexText: 'Invalid Amount', // Mensaje de error personalizado
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Type Transaction',
                                    name: 'IN_TYPE_TRANSACTION',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['', 'All'],
                                            ['VENTA', 'Sale'],
                                            ['CANCELACION', 'Cancelation'],
                                            ['DEVOLUCION', 'Refund']
                                        ]
                                    }),
                                    labelWidth: 100,
                                    width: 250,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: ''
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Status',
                                    name: 'IN_STATUS',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['', 'All'],
                                            ['Aprobada', 'Aprobada'],
                                            ['Rechazada', 'Rechazada']
                                        ]
                                    }),
                                    labelWidth: 50,
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
                                padding: '1 1 5 1',
                                anchor: '100%',
                                hiddenLabel: false,
                                labelAlign: 'right',
                                hidden: false
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Operation Number',
                                    labelWidth: 130,
                                    width: 230,
                                    name: 'IN_NROOP',
                                    maxLength: 10,
                                    maskRe: /[a-zA-Z0-9]/,
                                    enforceMaxLength: true,
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                }
                            ]
                        }

                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="DE UNA">
                {
                    xtype: 'form',
                    border: false,
                    id: prototype.id + '-formFilters-3',
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
                                    xtype: 'datefield',
                                    name: 'IN_PRDA_FROM',
                                    fieldLabel: 'From',
                                    format: 'Ymd',
                                    editable: false, // Deshabilita la edición del campo
                                    labelWidth: 50,
                                    width: 150,
                                    value: new Date(),
                                    validator: 'validaFecha',
                                    listeners: {
                                        change: 'onChangeDateComplement'
                                    },
                                    id: prototype.id + '-datefieldFromDEUNA'
                                },
                                {
                                    xtype: 'datefield',
                                    name: 'IN_PRDA_TO',
                                    fieldLabel: 'To',
                                    format: 'Ymd',
                                    editable: false, // Deshabilita la edición del campo
                                    labelWidth: 50,
                                    width: 150,
                                    value: new Date(),
                                    validator: 'validaFecha',
                                    listeners: {
                                        change: 'onChangeDateComplement'
                                    },
                                    id: prototype.id + '-datefieldToDEUNA'
                                },

                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Card Number',
                                    labelWidth: 90,
                                    width: 150,
                                    name: 'IN_CARDN1',
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
                                    name: 'IN_CARDN2',
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
                                    name: 'IN_AUTH',
                                    maxLength: 6,
                                    maskRe: /[a-zA-Z0-9]/,
                                    enforceMaxLength: true,
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Ticket',
                                    labelWidth: 40,
                                    width: 120,
                                    name: 'IN_TICKET',
                                    maxLength: 13, // Límite máximo de caracteres
                                    maskRe: /[0-9]/,
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
                                    name: 'IN_PNR',
                                    maxLength: 6, // Límite máximo de caracteres
                                    maskRe: /[a-zA-Z0-9]/,
                                    enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Status',
                                    name: 'IN_STATUS',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['', 'All'],
                                            ['pending', 'Pending'],
                                            ['refunding', 'Refunding'],
                                            ['refunded', 'Refunded'],
                                            ['voided', 'Voided'],
                                            ['captured', 'Captured']
                                        ]
                                    }),
                                    labelWidth: 50,
                                    width: 180,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: ''
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Amount',
                                    labelWidth: 80,
                                    width: 200,
                                    name: 'IN_TOTAL',
                                    maxLength: 20,
                                    maskRe: /[0-9.]/,
                                    enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                }

                            ],
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background: transparent',
                            defaults: {
                                fieldStyle: 'text-align: center;',
                                padding: '5 1 5 17',
                                anchor: '100%',
                                hiddenLabel: false,
                                labelAlign: 'right',
                                hidden: false
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'DEUNA Processor', // INSUMO
                                    name: 'IN_PROCINSUMO',
                                    id: prototype.id + '-cmbProcessorInsumo',
                                    // store: Ext.create('Ext.data.SimpleStore', {
                                    //     fields: ['CODE', 'DESCRIPTION'],
                                    //     data: [
                                    //         ['', 'All'],
                                    //         ['aplazo', 'Aplazo'],
                                    //         ['bbva', 'Bbva'],
                                    //         ['kueski', 'Kueski'],
                                    //         ['mercadopago', 'Mercado Pago'],
                                    //         ['mercadopago_wallet', 'Mercadopago Wallet'],
                                    //         ['paypal_wallet', 'Paypal Wallet'],
                                    //         ['worldpay', 'Worldpay'],
                                    //     ]
                                    // }),
                                    labelWidth: 100,
                                    width: 250,
                                    displayField: 'DESCRIPTION',
                                    valueField: 'CODE',
                                    queryMode: 'local',
                                    editable: false,
                                    value: ''
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Match Processor', //MATCH
                                    name: 'IN_PROCMATCH',
                                    id: prototype.id + '-cmbProcessorMatch',
                                    // store: Ext.create('Ext.data.SimpleStore', {
                                    //     fields: ['A4451KEY2', 'A4451DESC1'],
                                    //     data: []
                                    // }),
                                    labelWidth: 110,
                                    width: 280,
                                    displayField: 'A4451DESC1',
                                    valueField: 'A4451KEY2',
                                    queryMode: 'local',
                                    editable: false,
                                    value: ''
                                }
                            ]
                        }

                    ]
                },
                        //</editor-fold>
            ]
        }
    ]
});
