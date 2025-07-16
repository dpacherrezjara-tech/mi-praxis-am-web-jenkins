Ext.define('Ext.Praxis.view.payments.SalesReconciliationControlForm.FiltersSettlement', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filtersSettlement',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '2px 0px 1px 0px',
    layout: 'hbox',
    items: [
        //<editor-fold defaultstate="collapsed" desc="Browser">
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
                            fieldLabel: 'To',
                            format: 'Ymd',
                            altFormats: 'm',
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
                            valueField: 'code',
                            displayField: 'name',
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
        }
        //</editor-fold>
    ]
});
