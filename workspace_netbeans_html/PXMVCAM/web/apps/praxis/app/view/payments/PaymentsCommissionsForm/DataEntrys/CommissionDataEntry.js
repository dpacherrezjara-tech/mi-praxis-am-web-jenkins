prototype.idDE = prototype.id + '-CommissionDataEntry';

Ext.define('Ext.Praxis.view.payments.PaymentsCommissionsForm.DataEntrys.CommissionDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.CommissionDataEntry',
    requires: [
        'Ext.Praxis.controller.payments.PaymentsCommissions.CommissionDataEntryController'
    ],
    controller: 'CommissionDataEntryController',
    title: 'Commission - Form',
    header: true,
    width: 650,
    resizable: false,
    layout: 'fit',
    modal: true,
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'form',
            id: prototype.idDE + 'mainForm',
            layout: {
                type: 'vbox',
                pack: 'center'
            },
            border: false,
            width: '100%',
            items: [
                {
                    xtype: 'fieldset',
                    title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:12px;">Commission Information</span>',
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
                    defaults: {
                        xtype: 'panel',
                        layout: {
                            type: 'hbox',
                            pack: 'left'
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
                                    xtype: 'combobox',
                                    fieldLabel: 'Type',
                                    name: 'codigo',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['COM', 'Base Comm.'],
                                            ['MSI', 'MSI Comm.'],
                                            ['BIN', 'Bank Comm.']
                                        ]
                                    }),
                                    labelWidth: 70,
                                    width: 200,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: 'COM',
                                    listeners: {
                                        change: 'onChangeType'
                                    }
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Card Type',
                                    name: 'tipotarj',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['C', 'Credit'],
                                            ['D', 'Debit']
                                        ]
                                    }),
                                    labelWidth: 80,
                                    width: 200,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: 'C'
                                },
                                {
                                    xtype: 'numberfield', // Tipo de campo es numberfield
                                    labelWidth: 80,
                                    width: 130,
                                    fieldLabel: 'Installments',
                                    value: 0,
                                    name: 'cuotas', // Nombre del campo
                                    minValue: 0, // Valor mínimo permitido
                                    maxValue: 24, // Valor máximo permitido
                                    step: 1 // Incremento/decremento al usar las flechas
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    xtype: 'combo',
                                    id: prototype.idDE + '-cmbProctypesq',
                                    name: 'proctypesq',
                                    labelWidth: 70,
                                    width: 250,
                                    valueField: 'a4451key2',
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
                                    id: prototype.idDE + '-cmbPaises',
                                    name: 'country',
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
                                    value: '',
                                    editable: true
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    xtype: 'datefield',
                                    name: 'fecfrom',
                                    fieldLabel: 'From',
                                    format: 'Ymd',
                                    labelWidth: 70,
                                    width: 170,
                                    value: new Date(),
                                    editable: true
                                },
                                {
                                    xtype: 'datefield',
                                    name: 'fecto',
                                    fieldLabel: 'To',
                                    format: 'Ymd',
                                    altFormats: 'm',
                                    labelWidth: 30,
                                    width: 130,
                                    value: '99991231',
                                    editable: true
                                },
                                {
                                    xtype: 'numberfield',
                                    fieldLabel: 'Commission',
                                    name: 'ratcnac',
                                    minValue: 0,
                                    maxValue: 100,
                                    labelWidth: 80,
                                    width: 140,
                                    allowDecimals: true,
                                    decimalPrecision: 2,
                                    step: 1,
                                    editable: true,
                                    value: 0,
                                    hideTrigger: true
                                },
                                {
                                    xtype: 'numberfield',
                                    labelWidth: 40,
                                    width: 100,
                                    fieldLabel: 'VAT',
                                    name: 'rateiva',
                                    minValue: 0,
                                    maxValue: 100,
                                    allowDecimals: true,
                                    decimalPrecision: 2,
                                    step: 1,
                                    editable: true,
                                    value: 0,
                                    hideTrigger: true
                                }
                            ]
                        },
                        {
                            id: prototype.idDE + '-bankInfo',
                            hidden:true,
                            items: [
                                {
                                    xtype: 'combo',
                                    id: prototype.idDE + '-cmbBanks',
                                    name: 'codebank',
                                    queryMode: 'local',
                                    allowBlank: true,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    fieldLabel: 'Bank',
                                    labelWidth: 70,
                                    labelAlign: 'right',
                                    width: 230,
                                    typeAhead: true,
                                    valueField: 'a4559CODE',
                                    displayField: 'a4559DESC',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    value: '',
                                    editable: true
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Brand',
                                    name: 'codecard',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['', 'None'],
                                            ['1', 'Visa'],
                                            ['2', 'MasterCard'],
                                            ['3', 'American Express']
                                        ]
                                    }),
                                    labelWidth: 60,
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
                            id: prototype.idDE + '-binInfo',
                            hidden:true,
                            items: [
                                {
                                    name: 'codebin',
                                    value: '',
                                    fieldLabel: 'BIN',
                                    labelWidth: 70,
                                    editable: true,
                                    width: 140,
                                    maxLength: 6, // Límite máximo de caracteres
                                    maskRe: /[0-9]/, // Expresión regular para permitir solo números
                                    enforceMaxLength: true // Aplicar la longitud máxima de caracteres
                                },
                                {
                                    name: 'descbin',
                                    value: '',
                                    fieldLabel: 'Description',
                                    editable: true,
                                    labelWidth: 100,
                                    width: 350,
                                    maxLength: 100, // Límite máximo de caracteres
                                    enforceMaxLength: true // Aplicar la longitud máxima de caracteres
                                }
                            ]
                        },
                        {
                            id: prototype.idDE + '-binAmtInfo',
                            hidden:true,
                            items:[
                                {
                                    xtype: 'numberfield',
                                    labelWidth: 100,
                                    width: 180,
                                    fieldLabel: 'Min. Amount',
                                    name: 'minamt',
                                    minValue: 0,
                                    allowDecimals: true,
                                    decimalPrecision: 2,
                                    step: 1,
                                    editable: true,
                                    value: 0,
                                    hideTrigger: true
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.idDE + '-cmbMonedas',
                                    name: 'curramt',
                                    queryMode: 'local',
                                    allowBlank: true,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    fieldLabel: 'Currency',
                                    labelWidth: 80,
                                    labelAlign: 'right',
                                    width: 150,
                                    typeAhead: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    value: '',
                                    editable: true
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
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
                                            name: 'uscr'
                                        },
                                        {
                                            labelWidth: 75,
                                            width: 175,
                                            fieldLabel: 'Date Crt.',
                                            name: 'fecr'
                                        },
                                        {
                                            labelWidth: 75,
                                            width: 175,
                                            fieldLabel: 'Hour Crt.',
                                            name: 'hocr'
                                        }
                                    ]
                                },
                                {
                                    items: [
                                        {
                                            labelWidth: 75,
                                            width: 175,
                                            fieldLabel: 'User Upd.',
                                            name: 'usup'
                                        },
                                        {
                                            labelWidth: 75,
                                            width: 175,
                                            fieldLabel: 'Date Upd.',
                                            name: 'feup'
                                        },
                                        {
                                            labelWidth: 75,
                                            width: 175,
                                            fieldLabel: 'Hour Upd.',
                                            name: 'houp'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            margin: '5 5 5 5',
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults: {
                scale: 'medium'
            },
            items: [
                {
                    text: 'Add',
                    id: prototype.idDE + '-btn-add',
                    hidden: true,
                    iconCls: 'prx-icon-add',
                    listeners: {
                        click: 'onAddClick'
                    }
                },
                {
                    text: 'Update',
                    id: prototype.idDE + '-btn-update',
                    hidden: true,
                    iconCls: 'prx-icon-update',
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.idDE + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});