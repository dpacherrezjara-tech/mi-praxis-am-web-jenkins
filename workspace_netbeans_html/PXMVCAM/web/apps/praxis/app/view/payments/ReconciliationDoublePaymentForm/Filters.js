Ext.define('Ext.Praxis.view.payments.ReconciliationDoublePaymentForm.Filters', {
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
                //<editor-fold defaultstate="collapsed" desc="Browser">
                {
                    xtype: 'form',
                    border: false,
                    id: prototype.id + '-formFilters',
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
                                    fieldLabel: 'Search By',
                                    name: 'IN_DATE',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['PRDA', 'Processing Date'],
                                            ['PAYDATE', 'Payment Date']
                                        ]
                                    }),
                                    labelWidth: 80,
                                    width: 210,
                                    labelStyle: 'font-weight: bold;',
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: 'PAYDATE'
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
                                        change: 'onChangeDateBtn'
                                    },
                                    id: prototype.id + '-datefieldFrom'
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
                                        change: 'onChangeDateBtn'
                                    },
                                    id: prototype.id + '-datefieldTo'
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Type:',
                                    name: 'IN_TGRID',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['DP', 'Double Payment'],
                                            ['V', 'Void']
                                            
                                        ]
                                    }),
                                    labelWidth: 60,
                                    width: 200,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: 'DP'
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
                                    id: prototype.id + '-cmbPaises',
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
                                    id: prototype.id + '-cmbMoneda',
                                    name: 'IN_PCURRENCY',
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
                                    name: 'IN_TKT',
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
                                    xtype: 'textfield',
                                    fieldLabel: 'Merchant',
                                    labelWidth: 70,
                                    width: 185,
                                    name: 'IN_SMERCHID',
                                    //allowBlank: false, // Puedes configurar esto para requerir un valor
                                    maxLength: 15, // Límite máximo de caracteres
                                    maskRe: /[0-9]/, // Expresión regular para permitir solo números
                                    enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Refund Bank',
                                    name: 'IN_STRFND',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['', 'All'],
                                            ['1', 'Processed'],
                                            ['2', 'Pending']
                                            
                                        ]
                                    }),
                                    labelWidth: 80,
                                    width: 180,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: ''
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
