Ext.define('Ext.Praxis.view.payments.SalesReconciliationControlForm.FiltersSettlement', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filtersSettlement',
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
            id: prototype.id + '-cmbFiltersST',
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
                change: 'onChangeFiltersST'
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
                    id: prototype.id + '-filtersSettlement-1',
                    bodyStyle: 'background: transparent',
                    layout: 'vbox',
                    defaults: {
                        fieldStyle: 'text-align: center;',
                        padding: '5 5 5 5',
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
//                                    name: 'month',
                                    fieldLabel: 'From',
                                    format: 'Ymd',
                                    editable: false, // Deshabilita la edición del campo
                                    labelWidth: 50,
                                    width: 150,
                                    value: new Date(anioActual, mesActual, 1),
                                    listeners: {
                                        change: 'onChangeDateSTBtn'
                                    },
                                    id: prototype.id + '-datefieldFromST'
                                },
                                {
                                    xtype: 'datefield',
                                    name: 'IN_DATETO',
//                                    name: 'month',
                                    fieldLabel: 'To',
                                    format: 'Ymd',
//                                    altFormats: 'm/Y',
                                    editable: false, // Deshabilita la edición del campo
                                    labelWidth: 30,
                                    width: 130,
                                    value: fechaActual,
                                    listeners: {
                                        change: 'onChangeDateSTBtn'
                                    },
                                    id: prototype.id + '-datefieldToST'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbProctypeSettl',
                                    name: 'IN_PROCTYPESQ',
                                    labelWidth: 70,
                                    width: 250,
                                    valueField: 'A4451KEY2',
                                    displayField: 'A4451DESC1',
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
                                    id: prototype.id + '-cmbPaisesSettl',
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
                                    valueField: 'CODE',
                                    displayField: 'NAME',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    value: ''
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbMonedabST',
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
                                    valueField: 'CODE',
                                    displayField: 'NAME',
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
                                    fieldLabel: 'Card Number',
                                    labelWidth: 100,
                                    width: 170,
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
                                    id: prototype.id + '-cmbStvalSTS',
                                    name: 'IN_STVAL',
//                                     store: Ext.create('Ext.data.SimpleStore', {
//                                         fields: ['code', 'name'],
//                                         data: [
//                                             ['', 'All'],
// //                                    ['A', 'Match OC/Camepa'],
//                                             ['C', 'Match Complement'],
// //                                    ['D', 'Match Balance'],
//                                             ['E', 'Duplicate Payment'],
//                                             ['M', 'Match Multi-Payment'],
//                                             ['0', 'Stand By'],
//                                             ['1', 'Match'],
//                                             ['3', 'Settl. Without Sales'],
//                                             ['4', 'Match Partial'],
//                                             ['5', 'Match Manual'],
// //                                    ['6', 'Match Forced'],
// //                                    ['7', 'Match  for Compensation'],
//                                             ['8', 'Match Transactional']
//                                         ]
//                                     }),
                                    labelWidth: 55,
                                    width: 250,
                                    displayField: 'NAME',
                                    valueField: 'CODE',
                                    queryMode: 'local',
                                    editable: false,
                                    value: ''
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'PNR',
                                    labelWidth: 40,
                                    width: 120,
                                    name: 'IN_PNR',
                                    maxLength: 8, // Límite máximo de caracteres
                                    maskRe: /[a-zA-Z0-9]/, // Expresión regular para permitir solo números
                                    enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Merchant',
                                    labelWidth: 70,
                                    width: 170,
                                    name: 'IN_PMERCHID',
                                    maxLength: 15, // Límite máximo de caracteres
                                    maskRe: /[0-9]/, // Expresión regular para permitir solo números
                                    enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
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
                    id: prototype.id + '-filtersSettlement-2',
                    bodyStyle: 'background: transparent',
                    layout: 'vbox',
                    defaults: {
                        fieldStyle: 'text-align: center;',
                        padding: '5 5 5 5',
                        anchor: '100%',
                        hiddenLabel: false,
                        labelAlign: 'right',
                        hidden: false
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'vbox',
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
                                            value: 'PRDA',
                                            id: prototype.id + '-dateST2'
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
                                                change: 'onChangeDateSTBtn'
                                            },
                                            id: prototype.id + '-datefieldFromST2'
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
                                                change: 'onChangeDateSTBtn'
                                            },
                                            id: prototype.id + '-datefieldToST2'
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbProctypeSettl2',
                                            name: 'IN_PROCTYPESQ',
                                            labelWidth: 70,
                                            width: 250,
                                            valueField: 'A4451KEY2',
                                            displayField: 'A4451DESC1',
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
                                            id: prototype.id + '-cmbPaisesSettl2',
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
                                            valueField: 'CODE',
                                            displayField: 'NAME',
                                            enableKeyEvents: true,
                                            triggerAction: 'all',
                                            value: ''
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbMonedabST2',
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
                                            valueField: 'CODE',
                                            displayField: 'NAME',
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
                                            value: '',
                                            id: prototype.id + '-docTypeST2'
                                        },
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
                                            fieldLabel: 'Card Number',
                                            labelWidth: 100,
                                            width: 170,
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
                                            id: prototype.id + '-cmbStvalSTD',
                                            name: 'IN_STVAL',
                                            // store: Ext.create('Ext.data.SimpleStore', {
                                            //     fields: ['code', 'name'],
                                            //     data: [
                                            //         ['', 'All'],
                                            //         ['C', 'Match Complement'],
                                            //         ['E', 'Duplicate Payment'],
                                            //         ['M', 'Match Multi-Payment'],
                                            //         ['0', 'Stand By'],
                                            //         ['1', 'Match'],
                                            //         ['3', 'Settl. Without Sales'],
                                            //         ['4', 'Match Partial'],
                                            //         ['5', 'Match Manual'],
                                            //         ['8', 'Match Transactional']
                                            //     ]
                                            // }),
                                            labelWidth: 55,
                                            width: 250,
                                            displayField: 'NAME',
                                            valueField: 'CODE',
                                            queryMode: 'local',
                                            editable: false,
                                            value: ''
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'PNR',
                                            labelWidth: 40,
                                            width: 120,
                                            name: 'IN_PNR',
                                            maxLength: 6, // Límite máximo de caracteres
                                            maskRe: /[a-zA-Z0-9]/, // Expresión regular para permitir solo números
                                            enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                                            listeners: {
                                                specialkey: 'onEnterKeyPress'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Merchant',
                                            labelWidth: 70,
                                            width: 200,
                                            name: 'IN_MERCHANT',
                                            maxLength: 20, // Límite máximo de caracteres
                                            maskRe: /[0-9]/, // Expresión regular para permitir solo números
                                            enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                                            listeners: {
                                                specialkey: 'onEnterKeyPress'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Ref. Number',
                                            labelWidth: 90,
                                            width: 220,
                                            name: 'IN_AREFNBR',
                                            maxLength: 23, // Límite máximo de caracteres
                                            maskRe: /[0-9]/, // Expresión regular para permitir solo números
                                            enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                                            listeners: {
                                                specialkey: 'onEnterKeyPress'
                                            }
                                        },
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
                                            fieldLabel: 'ARN',
                                            labelWidth: 40,
                                            width: 200,
                                            name: 'IN_ARN',
                                            maxLength: 25,
                                            maskRe: /[0-9]/,
                                            enforceMaxLength: true,
                                            listeners: {
                                                specialkey: 'onEnterKeyPress'
                                            }
                                        },
                                    ]
                                }

                            ]
                        }
                    ]
                }
                //</editor-fold>


            ]},
    ]
});
