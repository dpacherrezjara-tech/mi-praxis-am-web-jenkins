Ext.define('Ext.Praxis.view.payments.ErrorControlForm.DataEntrys.FormatDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.FormatDataEntry',
    requires: [
        'Ext.Praxis.controller.payments.ErrorControl.FormatDataEntryController'
    ],
    controller: 'FormatDataEntryController',
    title: 'Log Error - Data Entry Form',
    header: true,
    height: 360,
    width: 350,
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
            anchor: '100%',
            id: prototype.id + '-formatDataEntryForm',
            items: [
                {
                    xtype: 'fieldset',
                    title: 'Check Error - VN0002',
                    layout: {
                        type: 'vbox',
                        align: 'left'
                    },
                    id: prototype.id + '-panel-boxDataEntry',
                    border: true,
                    width: '100%',
                    style: {
                        backgroundColor: '#f0f0f0' // Cambiar el color de fondo a gris claro (#f0f0f0)
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: {
                                type: 'hbox',
                                align: 'left' // Alineación a la izquierda
                            },
                            margin: '5 0 5 0',
                            bodyStyle: 'background: transparent;',
                            border: false,
                            items: [
                                {
                                    xtype: 'textfield',
                                    name: 'CCARD1',
                                    fieldLabel: 'Credit Card',
                                    labelWidth: 70,
                                    width: 130,
                                    maskRe: /[0-9]/, // Solo se permiten números
                                    maxLength: 6, // Máximo de 5 caracteres permitidos
                                    enforceMaxLength: true,
                                    allowBlank: false,
                                    id: prototype.id + '-de-cardBin-1'
                                },
                                {
                                    xtype: 'label',
                                    text: '******',
                                    margin: '0 5 0 5'

                                },
                                {
                                    xtype: 'textfield',
                                    name: 'CCARD2',
                                    maskRe: /[0-9]/, // Solo se permiten números
                                    width: 40,
                                    maxLength: 4, // Máximo de 5 caracteres permitidos
                                    enforceMaxLength: true,
                                    allowBlank: false,
                                    id: prototype.id + '-de-cardBin-2'
                                }
                            ]
                        },
                        {
                            xtype: 'textfield',
                            name: 'AUTH',
                            fieldLabel: 'Authorization Code',
                            labelWidth: 110,
                            width: 170,
                            maskRe: /[0-9]/, // Solo se permiten números
                            maxLength: 6, // Máximo de 5 caracteres permitidos
                            enforceMaxLength: true,
                            allowBlank: false,
                            id: prototype.id + '-de-cardAuth'
                        }
                        ,
                        {
                            xtype: 'numberfield',
                            name: 'QTYPAX',
                            fieldLabel: 'Qty. Passengers',
                            labelWidth: 100,
                            width: 150,
                            //inputType: 'number',
                            minValue: 0
                        },
                        {
                            xtype: 'numberfield',
                            name: 'QTYTK',
                            fieldLabel: 'Qty. Tickets',
                            labelWidth: 90,
                            width: 140,
                            //inputType: 'number',
                            minValue: 0
                        },
                        {
                            xtype: 'textfield',
                            name: 'MDA',
                            fieldLabel: 'Currency',
                            labelWidth: 65,
                            maskRe: /[a-zA-Z\s]/,
                            width: 115,
                            maxLength: 3, // Máximo de 5 caracteres permitidos
                            minLength: 3,
                            enforceMaxLength: true,
                            allowBlank: false,
                            listeners: {
                                change: function (field, newValue, oldValue) {
                                    field.setValue(newValue.toUpperCase());
                                }
                            }
                        },
                        {
                            xtype: 'textfield',
                            name: 'TOTAMOUNT',
                            fieldLabel: 'Total Amount',
                            labelWidth: 80,
                            width: 180,
                            maskRe: /[0-9.-]/,
                            regex: /^\d+(\.\d{1,2})?$/,
                            regexText: 'Ingrese un número con un máximo de 2 decimales.'
                        },
                        {
                            xtype: 'textfield',
                            name: 'TOTAMOUNTO',
                            fieldLabel: 'Total Amount Off',
                            labelWidth: 100,
                            width: 200,
                            maskRe: /[0-9.-]/,
                            regex: /^\d+(\.\d{1,2})?$/,
                            regexText: 'Ingrese un número con un máximo de 2 decimales.'
                        },
                        {
                            xtype: 'fieldset',
                            title: 'User Information',
                            layout: {
                                type: 'hbox',
                                align: 'center'
                            },
                            border: true,
                            height: 50,
                            width: '100%',
                            margin: '5 0 5 0',
                            bodyStyle: 'background: transparent;',
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'User',
                                    name: 'USERU',
                                    labelWidth: 30,
                                    width: 120,
                                    editable: false
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Date Update',
                                    name: 'DATEU',
                                    labelWidth: 80,
                                    width: 150,
                                    margin: '0 5 0 5',
                                    editable: false
                                }
                            ]
                        }
                    ]
                }
            ]
        },
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            margin: '5 0 5 0',
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
                    id: prototype.id + '-btn-update',
                    iconCls: 'prx-icon-update',
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.id + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
}
);