/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.eecta.CatalogoContratosPreForm.CatalogoContratosPreEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id + '-dataEntry',
    controller: prototype.id + '-dataEntryController',
    requires: [
        'Ext.Praxis.controller.eecta.CatalogoContratosPre.CatalogoContratosPreEntryController',
        'Ext.Praxis.view.eecta.CatalogoContratosPreForm.InfoGridUatp'
                //'Ext.Praxis.view.eecta.CatalogoContratosPreForm.InfoGridIdentif',
                //'Ext.Praxis.view.eecta.CatalogoContratosPreForm.InfoGridCalendario'        
    ],
    title: 'Mantenimiento Contratos',
    header: true,
    width: 900,
    height: 600,
    border: false,
    resizable: false,
    layout: {
        type: 'border',
        align: 'center'
    },
    modal: true,
    items: [
        {
            region: 'center',
            xtype: 'form',
            id: prototype.id + '-DataEntry-center',
            border: false,
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    width: '100%',
                    margin: '2 2 2 2',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            width: 490,
                            margin: '1 1 1 1',
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-A4241IDANT',
                                            fieldLabel: 'Contract Id', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 120, fieldStyle: 'font-weight: bold;font-size:13px;text-align:center',
                                            readOnly: true, value: '0',
                                            width: 245
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-A4241CDCLI',
                                            fieldLabel: 'Customer code', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 120,
                                            width: 245, height: 28,
                                            fieldStyle: 'font-weight: bold;font-size:13px;text-align:center',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 9,
                                            listeners: {
                                                keypress: 'OnEventbuscarCliente'
                                            }
                                        },
                                        {
                                            xtype: 'toolbar',
                                            margin: '1 0 1 3',
                                            items: [
                                                {
                                                    xtype: 'button',
                                                    id: prototype.id09 + '-btnSearch',
                                                    iconCls: 'prx-icon-search',
                                                    tooltip: 'Buscar cliente',
                                                    listeners: {
                                                        click: 'onBuscarCliente'
                                                    }
                                                }]
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-A4241STSPG',
                                            hidden: true
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-A3953RSOCI',
                                            fieldLabel: 'Customer name', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 120,
                                            width: 450, fieldStyle: 'font-weight: bold;font-size:12px;text-align:left',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 150,
                                            disabled: true,
                                            listeners: {
                                                //change: 'onUpperValue',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id + '-A4241FEC').focus();
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            id: prototype.id + '-A4241FEC',
                                            fieldLabel: 'Date', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 120,
                                            width: 250, fieldStyle: 'font-weight: bold;font-size:12px;text-align:center',
                                            format: 'Ymd',
                                            invalidText: 'Ingrese fecha valida en formato Ymd',
                                            minValue: new Date(1990, 00, 01),
                                            maxValue: new Date(),
                                            maskRe: /[0-9/]/,
                                            editable: false,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 12,
                                            listeners: {
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id + '-A4241TOTAN').focus();
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Amount', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 120,
                                            id: prototype.id + '-A4241TOTAN',
                                            width: 230, fieldStyle: 'font-weight: bold;font-size:13px;text-align:right',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            value: '0.00',
                                            maskRe: /[1234567890\.]/,
                                            listeners: {
                                                focus: 'onFocusNumberfield',
                                                //focusleave: 'onfocusleaveNumberfield',
                                                focusleave: 'set_calcular_beneficio',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id + '-A4241PORBF').focus();
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-A4241PORBF',
                                            fieldLabel: '%', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 30,
                                            width: 80, fieldStyle: 'font-weight: bold;font-size:13px;text-align:right',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            value: '0.00',
                                            maskRe: /[1234567890\.]/,
                                            listeners: {
                                                focus: 'onFocusNumberfield',
                                                //focusleave: 'onfocusleaveNumberfield',
                                                focusleave: 'set_calcular_beneficio',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id + '-A4241MDA').focus();
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-A4241TOTBF',
                                            fieldLabel: 'Profit', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 60,
                                            width: 170, fieldStyle: 'font-weight: bold;font-size:13px;text-align:right',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            disabled: true,
                                            value: '0.00',
                                            maskRe: /[1234567890\.]/,
                                            listeners: {
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id + '-A4241MDA').focus();
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-A4241TOT',
                                            fieldLabel: 'Total', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 120,
                                            width: 230, fieldStyle: 'font-weight: bold;font-size:13px;text-align:right',
                                            value: '0.00', disabled: true,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maskRe: /[1234567890\.]/,
                                            listeners: {
                                                focus: 'onFocusNumberfield',
                                                focusleave: 'onfocusleaveNumberfield',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        //Ext.getCmp(prototype.id + '-A3959FECPG').focus();
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-A4241MDA',
                                            fieldLabel: 'Curr.', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 40,
                                            width: 100, fieldStyle: 'font-weight: bold;font-size:13px;text-align:center',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 3, value: 'MXN',
                                            listeners: {
                                                //change: 'onUpperValue',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id + '-A4241CONTR').focus();
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-A4241CONTR',
                                            fieldLabel: 'Contract', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 120,
                                            width: 400,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 200,
                                            listeners: {
                                                //change: 'onUpperValue',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id + '-A4241REF').focus();
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-A4241REF',
                                            fieldLabel: 'Reference', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 120,
                                            width: 400,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 50,
                                            listeners: {
                                                //change: 'onUpperValue',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id + '-A4241ORDN').focus();
                                                    }
                                                }
                                            }
                                        }
                                    ]

                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-A4241ORDN',
                                            fieldLabel: 'Consumer order', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 120,
                                            width: 270,
                                            store: new Ext.data.SimpleStore({
                                                fields: ['code', 'name'],
                                                data: [
                                                    ["01", "ANTICIPO-BENEFICIO"],
                                                    ["02", "BENEFICIO-ANTICIPO"]
                                                ]
                                            }),
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            autoSelect: false,
                                            forceSelection: true,
                                            caseSensitive: false,
                                            editable: true,
                                            typeAhead: true,
                                            valueField: 'code', displayField: 'name',
                                            value: "01",
                                            enableKeyEvents: true,
                                            listeners: {
                                                //focus: function(combo) {
                                                //    combo.expand();
                                                //},
                                                //keypress: 'onTextKeypress',
                                                //change: 'cmbfiltro_clickHandler'
                                            }//                                            
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            border: false,
                            margin: '3 3 3 3',
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    margin: '2 2 2 2',
                                    border: true,
                                    items: [
                                        {
                                            xtype: 'panel',
                                            border: false,
                                            layout: 'vbox',
                                            margin: '0 4 0 0',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    border: false,
                                                    height: 38
                                                },
                                                {
                                                    xtype: 'label',
                                                    width: 50, height: 25,
                                                    text: 'Prepaid:',
                                                    style: 'font-weight:bold;text-align:right;',
                                                    padding: '1px 1px 1px 1px'
                                                },
                                                {
                                                    xtype: 'label',
                                                    width: 50, height: 25,
                                                    text: 'Profit:',
                                                    style: 'font-weight:bold;text-align:right;',
                                                    padding: '1px 1px 1px 1px'
                                                },
                                                {
                                                    xtype: 'label',
                                                    width: 50,
                                                    text: 'Total:',
                                                    style: 'font-weight:bold;text-align:right;',
                                                    padding: '1px 1px 1px 1px'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            title: 'Total',
                                            //margin: '2 2 2 2',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-A4242TOTAN',
                                                    fieldLabel: '', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 5,
                                                    width: 100, fieldStyle: 'font-weight: bold;font-size:12px;text-align:right',
                                                    enableKeyEvents: true, padding: '1px 1px 0px 1px',
                                                    enforceMaxLength: true,
                                                    value: '0.00', disabled: true,
                                                    maskRe: /[1234567890\.]/,
                                                    listeners: {
                                                        focus: 'onFocusNumberfield',
                                                        focusleave: 'onfocusleaveNumberfield',
                                                        keypress: function (obj, e) {
                                                            if (e.getKey() === e.ENTER) {
                                                                // Ext.getCmp(prototype.id + '-A3953DIRE1').focus();
                                                            }
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-A4242TOTBF',
                                                    fieldLabel: '', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 5,
                                                    width: 100, fieldStyle: 'font-weight: bold;font-size:12px;text-align:right',
                                                    enableKeyEvents: true, padding: '1px 1px 0px 1px',
                                                    enforceMaxLength: true,
                                                    value: '0.00', disabled: true,
                                                    maskRe: /[1234567890\.]/,
                                                    listeners: {
                                                        focus: 'onFocusNumberfield',
                                                        //focusleave: 'onfocusleaveNumberfield',                                                        
                                                        keypress: function (obj, e) {
                                                            if (e.getKey() === e.ENTER) {
                                                                // Ext.getCmp(prototype.id + '-A3953DIRE1').focus();
                                                            }
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-A4242TOT',
                                                    fieldLabel: '', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 5,
                                                    width: 100, fieldStyle: 'font-weight: bold;font-size:12px;text-align:right',
                                                    enableKeyEvents: true, padding: '1px 1px 0px 1px',
                                                    enforceMaxLength: true,
                                                    value: '0.00', disabled: true,
                                                    maskRe: /[1234567890\.]/,
                                                    listeners: {
                                                        focus: 'onFocusNumberfield',
                                                        focusleave: 'onfocusleaveNumberfield',
                                                        keypress: function (obj, e) {
                                                            if (e.getKey() === e.ENTER) {
                                                                // Ext.getCmp(prototype.id + '-A3953DIRE1').focus();
                                                            }
                                                        }
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            title: 'Redeemed',
                                            //margin: '2 2 2 2',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-A4242VTAAN',
                                                    fieldLabel: '', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 5,
                                                    width: 100, fieldStyle: 'font-weight: bold;font-size:12px;text-align:right',
                                                    enableKeyEvents: true, padding: '1px 1px 0px 1px',
                                                    enforceMaxLength: true,
                                                    value: '0.00', disabled: true,
                                                    maskRe: /[1234567890\.]/,
                                                    listeners: {
                                                        focus: 'onFocusNumberfield',
                                                        focusleave: 'onfocusleaveNumberfield',
                                                        keypress: function (obj, e) {
                                                            if (e.getKey() === e.ENTER) {
                                                                // Ext.getCmp(prototype.id + '-A3953DIRE1').focus();
                                                            }
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-A4242VTABF',
                                                    fieldLabel: '', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 5,
                                                    width: 100, fieldStyle: 'font-weight: bold;font-size:12px;text-align:right',
                                                    enableKeyEvents: true, padding: '1px 1px 0px 1px',
                                                    enforceMaxLength: true, disabled: true,
                                                    value: '0.00',
                                                    maskRe: /[1234567890\.]/,
                                                    listeners: {
                                                        focus: 'onFocusNumberfield',
                                                        focusleave: 'onfocusleaveNumberfield',
                                                        keypress: function (obj, e) {
                                                            if (e.getKey() === e.ENTER) {
                                                                // Ext.getCmp(prototype.id + '-A3953DIRE1').focus();
                                                            }
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-A4242TOTAP',
                                                    fieldLabel: '', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 5,
                                                    width: 100, fieldStyle: 'font-weight: bold;font-size:12px;text-align:right',
                                                    enableKeyEvents: true, padding: '1px 1px 0px 1px',
                                                    enforceMaxLength: true, disabled: true,
                                                    value: '0.00',
                                                    maskRe: /[1234567890\.]/,
                                                    listeners: {
                                                        focus: 'onFocusNumberfield',
                                                        focusleave: 'onfocusleaveNumberfield',
                                                        keypress: function (obj, e) {
                                                            if (e.getKey() === e.ENTER) {
                                                                // Ext.getCmp(prototype.id + '-A3953DIRE1').focus();
                                                            }
                                                        }
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            title: 'Balance',
                                            //margin: '2 2 2 2',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-A4242SALAN',
                                                    fieldLabel: '', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 5,
                                                    width: 100, fieldStyle: 'font-weight:bold;font-size:12px;text-align:right;color:green',
                                                    enableKeyEvents: true, padding: '1px 1px 0px 1px',
                                                    enforceMaxLength: true,
                                                    value: '0.00', disabled: true,
                                                    maskRe: /[1234567890\.]/,
                                                    listeners: {
                                                        focus: 'onFocusNumberfield',
                                                        focusleave: 'onfocusleaveNumberfield',
                                                        keypress: function (obj, e) {
                                                            if (e.getKey() === e.ENTER) {
                                                                // Ext.getCmp(prototype.id + '-A3953DIRE1').focus();
                                                            }
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-A4242SALBF',
                                                    fieldLabel: '', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 5,
                                                    width: 100, fieldStyle: 'font-weight: bold;font-size:12px;text-align:right;color:green',
                                                    enableKeyEvents: true, padding: '1px 1px 0px 1px',
                                                    enforceMaxLength: true, disabled: true,
                                                    value: '0.00',
                                                    maskRe: /[1234567890\.]/,
                                                    listeners: {
                                                        focus: 'onFocusNumberfield',
                                                        focusleave: 'onfocusleaveNumberfield',
                                                        keypress: function (obj, e) {
                                                            if (e.getKey() === e.ENTER) {
                                                                // Ext.getCmp(prototype.id + '-A3953DIRE1').focus();
                                                            }
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-A4242SALDO',
                                                    fieldLabel: '', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 5,
                                                    width: 100, fieldStyle: 'font-weight: bold;font-size:12px;text-align:right;color:green',
                                                    enableKeyEvents: true, padding: '1px 1px 0px 1px',
                                                    enforceMaxLength: true, disabled: true,
                                                    value: '0.00',
                                                    maskRe: /[1234567890\.]/,
                                                    listeners: {
                                                        focus: 'onFocusNumberfield',
                                                        focusleave: 'onfocusleaveNumberfield',
                                                        keypress: function (obj, e) {
                                                            if (e.getKey() === e.ENTER) {
                                                                // Ext.getCmp(prototype.id + '-A3953DIRE1').focus();
                                                            }
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    layout: 'vbox',
                                    margin: '3 3 3 3',
                                    width: '100%',
                                    title: 'Control data',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'column',
                                            margin: '1 0 1 0',
                                            border: false,
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-A4241USRIN', labelWidth: 80,
                                                    fieldLabel: 'Create user', labelAlign: 'right', labelStyle: 'font-weight:bold;',
                                                    width: 140
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-A4241FECIN',
                                                    fieldLabel: 'Date', labelAlign: 'right', labelStyle: 'font-weight:bold;', labelWidth: 40,
                                                    width: 120
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-A4241HORIN',
                                                    fieldLabel: 'hr', labelAlign: 'right', labelStyle: 'font-weight:bold;', labelWidth: 13,
                                                    width: 70
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'column',
                                            margin: '1 0 1 0',
                                            border: false,
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-A4241USRAC', labelWidth: 80,
                                                    fieldLabel: 'Update user', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                                    width: 140
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-A4241FECAC',
                                                    fieldLabel: 'Date', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 40,
                                                    width: 120
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id + '-A4241HORAC',
                                                    fieldLabel: 'hr', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 13,
                                                    width: 70
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    margin: '3 3 3 3',
                    width: '100%',
                    items: [
                        {
                            xtype: 'fieldset',
                            layout: 'vbox',
                            margin: '1 0 1 0',
                            border: false,
                            title: 'Deposit information',
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            id: prototype.id + '-A4241FECDE',
                                            fieldLabel: 'Scheduled date from', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 130,
                                            width: 250, fieldStyle: 'font-weight: bold;font-size:12px;text-align:center',
                                            format: 'Ymd',
                                            invalidText: 'Ingrese fecha valida en formato Ymd',
                                            //minValue: new Date(1990, 00, 01),
                                            //maxValue: new Date(),
                                            maskRe: /[0-9/]/,
                                            editable: true,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 12,
                                            listeners: {
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id + '-A4241FECHA').focus();
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.id + '-A4241FECHA',
                                            fieldLabel: 'To', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 30,
                                            width: 150, fieldStyle: 'font-weight: bold;font-size:13px;text-align:center',
                                            format: 'Ymd',
                                            invalidText: 'Ingrese fecha valida en formato Ymd',
                                            //minValue: new Date(1990, 00, 01),
                                            //maxValue: new Date(),
                                            maskRe: /[0-9/]/,
                                            editable: true,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 12,
                                            listeners: {
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        //Ext.getCmp(prototype.id + '-A4241TOTAN').focus();
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-A4241NUMRC',
                                            fieldLabel: 'Payment receipt', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 130,
                                            width: 250,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 50,
                                            disabled: true,
                                            listeners: {
                                                //change: 'onUpperValue',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        //Ext.getCmp(prototype.id + '-A4241ORDN').focus();
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-A4241IDRCB',
                                            hidden: true,
                                            value: '0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-A4241FECRC',
                                            fieldLabel: 'Date receipt', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            //labelWidth: 70,
                                            width: 200,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 50,
                                            disabled: true,
                                            listeners: {
                                                //change: 'onUpperValue',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        //Ext.getCmp(prototype.id + '-A4241ORDN').focus();
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            layout: 'vbox',
                            margin: '1 0 1 0',
                            border: false,
                            title: 'Invoice information',
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-A4241UIDAN',
                                            fieldLabel: 'UUID Invoice', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            //labelWidth: 130,
                                            width: 400,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 50,
                                            readOnly: true,
                                            listeners: {
                                                //change: 'onUpperValue',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        //Ext.getCmp(prototype.id + '-A4241ORDN').focus();
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-A4241UIDBF',
                                            fieldLabel: 'UUID N.C', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            //labelWidth: 70,
                                            width: 400,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 50,
                                            readOnly: true,
                                            listeners: {
                                                //change: 'onUpperValue',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        //Ext.getCmp(prototype.id + '-A4241ORDN').focus();
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'toolbar',
                                            items: [
                                                {
                                                    xtype: 'button',
                                                    id: prototype.id + '-btn-facturar',
                                                    text: 'Facturar',
                                                    icon: 'resources/img/botones/file.png',
                                                    disabled: false,
                                                    listeners: {
                                                        click: 'onFacturarClick'
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    margin: '1 1 1 1',
                    width: '100%',
                    items: [
                        {
                            xtype: 'tabpanel',
                            id: prototype.id + '-panel-contenedor-grid-detalles',
                            width: 850,
                            layout: 'fit',
                            items: [
                                {
                                    xtype: 'panel',
                                    width: '100%',
                                    title: 'Tarjetas UATP',
                                    id: prototype.id + '-contenedor-grid-uatp',
                                    margin: '1 1 1 1',
                                    items: [
                                        {
                                            xtype: prototype.id + '-info-uatp'
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
            border: true,
            ui: 'footer',
            margin: '5 5 10 10', // left/right/top/botton
            defaults: {
                scale: 'medium'
            },
            style: 'aling:center padding: 5px;',
            items: [
                {
                    text: 'Save',
                    id: prototype.id + '-btn-save',
                    iconCls: 'prx-icon-save',
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update',
                    id: prototype.id + '-btn-update',
                    iconCls: 'prx-icon-update',
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Delete',
                    id: prototype.id + '-btn-delete',
                    iconCls: 'prx-icon-delete',
                    hidden: true,
                    listeners: {
                        click: 'onDeleteClick'
                    }
                },
                {
                    text: 'Close',
                    id: prototype.id + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                },
                {
                    xtype: 'label',
                    labelAlign: 'center',
                    width: 150,
                    padding: '2px 5px 2px 3px',
                    html: '<strong style="color:#AC4546;font-size:13px;">(*)Required Fields</strong>'

                }
            ]
        }
    ]
});
