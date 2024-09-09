/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.eecta.ControlUATPPreForm.ControlUATPPreProcesarForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id02 + '-dataEntry',
    controller: prototype.id02 + '-controlUATPPreProcesarController',
    requires: [
        'Ext.Praxis.controller.eecta.ControlUATPPre.ControlUATPPreProcesarController'
    ],
    title: 'PROCESAMIENTO',
    header: true,
    width: 500,
    height: 300,
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
            id: prototype.id02 + '-DataEntry-center',
            border: false,
            layout: {
                type: 'vbox'
            },
            items: [

                {
                    xtype: 'panel',
                    id: prototype.id02 + '-form01',
                    layout: 'vbox',
                    width: '100%',
                    margin: '5 0 0 0',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '1 1 1 1',
                            width: 500,
                            items: [
                                {
                                    xtype: 'radiofield',
                                    id: prototype.id02 + '-op01',
                                    name: prototype.id02 + '-op',
                                    boxLabel: 'VENTAS PRECOMPRA',
                                    margin: '2 2 2 10',
                                    checked: true
                                },
                                {
                                    xtype: 'datefield',
                                    id: prototype.id02 + '-FECHA1',
                                    fieldLabel: 'Seleccionar fecha', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 150,
                                    width: 260, fieldStyle: 'font-weight: bold;font-size:13px;text-align:center',
                                    format: 'Ymd',
                                    invalidText: 'Ingrese fecha valida en formato Ymd',
                                    minValue: new Date(1990, 00, 01),
                                    maxValue: new Date(),
                                    value: new Date(),
                                    maskRe: /[0-9/]/,
                                    editable: true,
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 12,
                                    listeners: {
                                        keypress: function (obj, e) {
                                            if (e.getKey() === e.ENTER) {
                                                //Ext.getCmp(prototype.id02 + '-FECHA2').focus();
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '5 1 1 10',
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    id: prototype.id02 + '-01-CARGA',
                                    checked: true,
                                    padding: '0px 0px 0px 10px',
                                    boxLabel: 'Cargar Ventas'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '5 1 1 10',
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    id: prototype.id02 + '-02-REPORTE',
                                    checked: true,
                                    padding: '0px 0px 0px 10px',
                                    boxLabel: 'Generar Reporte'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '5 1 1 10',
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    id: prototype.id02 + '-03-APLICACION',
                                    checked: true,
                                    padding: '0px 0px 0px 10px',
                                    boxLabel: 'Procesar Aplicación'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '5 1 1 10',
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    id: prototype.id02 + '-04-FACTURACION',
                                    checked: true,
                                    padding: '0px 0px 0px 10px',
                                    boxLabel: 'Enviar a Facturación'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id02 + '-form03',
                    layout: 'hbox',
                    width: '100%',
                    margin: '10 0 0 0',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '5 1 1 1',
                            width: 150,
                            items: [
                                {
                                    xtype: 'radiofield',
                                    id: prototype.id02 + '-op03',
                                    name: prototype.id02 + '-op',
                                    boxLabel: 'ESTADO DE CUENTA',
                                    margin: '2 2 2 10'
                                }]

                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '5 1 1 1',
                            items: [
                                {
                                    xtype: 'datefield',
                                    id: prototype.id02 + '-FECHEJE02',
                                    fieldLabel: 'Fecha emisión', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 120,
                                    width: 230, fieldStyle: 'font-weight: bold;font-size:13px;text-align:center',
                                    format: 'Ymd',
                                    invalidText: 'Ingrese fecha valida en formato Ymd',
                                    minValue: new Date(1990, 00, 01),
                                    maxValue: new Date(),
                                    value: new Date(),
                                    maskRe: /[0-9/]/,
                                    editable: true,
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 12,
                                    listeners: {
                                        keypress: function (obj, e) {
                                            if (e.getKey() === e.ENTER) {
                                                //Ext.getCmp(prototype.id + '-FECHA2').focus();
                                            }
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'label',
                    padding: '0 2 2 5',
                    html: '<font color="green"><h3 id="ControlUATPPreProcesarForm_Msg">Iniciar..</h3></font>'
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
            margin: '1 1 1 1', // left/right/top/botton
            defaults: {
                scale: 'medium'
            },
            style: 'aling:center padding: 5px;',
            items: [
                {
                    text: 'Ejecutar',
                    id: prototype.id02 + '-btn-save',
                    iconCls: 'prx-icon-processing',
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Close',
                    id: prototype.id02 + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});
