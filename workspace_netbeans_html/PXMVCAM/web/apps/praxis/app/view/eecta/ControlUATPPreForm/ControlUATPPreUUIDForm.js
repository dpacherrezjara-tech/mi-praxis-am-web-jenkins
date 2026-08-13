/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.eecta.ControlUATPPreForm.ControlUATPPreUUIDForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id03 + '-dataEntry',
    controller: prototype.id03 + '-controlUATPPreUUIDController',
    requires: [
        'Ext.Praxis.controller.eecta.ControlUATPPre.ControlUATPPreUUIDController',
        //'Ext.Praxis.view.eecta.ControlUATPForm.Info02'
        'Ext.Praxis.view.eecta.ControlUATPPreForm.Info04'
    ],
    title: 'Facturación de boletos',
    header: true,
    width: 1050,
    height: 550,
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
            id: prototype.id03 + '-DataEntry-center',
            border: false,
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id03 + '-form01',
                    layout: 'hbox',
                    width: '100%',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '1 1 1 1',
                            items: [
                                {
                                    xtype: 'datefield',
                                    id: prototype.id03 + '-FECHA1',
                                    fieldLabel: 'Del', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 40,
                                    width: 150, fieldStyle: 'font-weight: bold;font-size:13px;text-align:center',
                                    format: 'Ymd', margin: '5 0 0 0',
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
                                                Ext.getCmp(prototype.id03 + '-FECHA2').focus();
                                            }
                                        }
                                    }
                                },
                                {
                                    xtype: 'datefield',
                                    id: prototype.id03 + '-FECHA2',
                                    fieldLabel: 'Al', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 40,
                                    width: 150, fieldStyle: 'font-weight: bold;font-size:13px;text-align:center',
                                    format: 'Ymd', margin: '5 0 0 0',
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
                                                //Ext.getCmp(prototype.id + '-btn-save').focus();
                                            }
                                        }
                                    }
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id03 + '-STSUUID', margin: '5 0 0 0',
                                    fieldLabel: 'Estado', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 60,
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", "TODOS"],
                                            ["0", "PENDIENTE"],
                                            ["1", "ENVIADO"],
                                            ["2", "PROCESADO"],
                                            ["3", "ERROR"],
                                            ["4", "DIFERENCIAS"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    forceSelection: true, caseSensitive: false,
                                    editable: true, typeAhead: true,
                                    valueField: 'code', displayField: 'name', width: 180,
                                    value: "",
                                    enableKeyEvents: true,
                                    padding: '0 0',
                                    listeners: {
                                        change: 'cmbfiltroSTSUUID_clickHandler'
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    border: false,
                                    hidden: false,
                                    layout: 'hbox',
                                    bodyStyle: 'background: transparent;"',
                                    margin: '1 0 0 20',
                                    defaults: {
                                        anchor: '100%',
                                        padding: '1 0'
                                    },
                                    items: [
                                        {
                                            xtype: 'toolbar',
                                            dock: 'bottom',
                                            ui: 'footer',
                                            margin: '2 0 2 7',
                                            layout: {
                                                pack: 'center'
                                            },
                                            fieldStyle: 'text-align:center',
                                            defaults: {
                                                scale: 'small'
                                            },
                                            items: [
                                                {
                                                    xtype: 'button',
                                                    id: prototype.id03 + '-btn-search',
                                                    text: 'Consultar',
                                                    icon: 'resources/img/botones/search.png',
                                                    listeners: {
                                                        click: 'Onsearch'
                                                    }
                                                },
                                                {
                                                    xtype: 'button',
                                                    id: prototype.id03 + '-btn-set-facturacion',
                                                    text: 'Timbrar',
                                                    hidden: true,
                                                    icon: 'resources/img/botones/process.png',
                                                    listeners: {
                                                        click: 'onSaveFacturacionClick'
                                                    }
                                                },
                                                {
                                                    xtype: 'button',
                                                    id: prototype.id03 + '-btn-get-UUID',
                                                    text: 'Datos FE',
                                                    hidden: true,
                                                    icon: 'resources/img/botones/download.png',
                                                    listeners: {
                                                        click: 'onSaveClick'
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
                    id: prototype.id03 + '-form02',
                    layout: 'hbox',
                    width: '100%',
                    margin: '5 5 5 5',
                    hidden: true,
                    items: [
                        {
                            xtype: 'panel',
                            border: false,
                            hidden: false,
                            layout: 'hbox',
                            bodyStyle: 'background: transparent;"',
                            margin: '1 0 0 20',
                            defaults: {
                                anchor: '100%',
                                padding: '1 0'
                            },
                            items: [
                                {
                                    xtype: 'toolbar',
                                    dock: 'bottom',
                                    ui: 'footer',
                                    margin: '2 0 2 7',
                                    layout: {
                                        pack: 'center'
                                    },
                                    fieldStyle: 'text-align:center',
                                    defaults: {
                                        scale: 'small'
                                    },
                                    items: [
                                        {
                                            xtype: 'button',
                                            id: prototype.id03 + '-btn-back',
                                            text: 'Volver',
                                            iconCls: 'prx-icon-back',
                                            listeners: {
                                                click: 'Onsearch'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            id: prototype.id03 + '-btn-file',
                                            text: 'Enviar facturas',
                                            iconCls: 'prx-icon-process-send',
                                            listeners: {
                                                click: 'OnEnviarForm'
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    // <editor-fold defaultstate="collapsed" desc="setGridData">                        
                    xtype: 'panel',
                    id: prototype.id03 + '-panel-contenedor-grid',
                    layout: 'fit',
                    items: [
                        {
                            xtype: prototype.id05 + '-info04'
                        }
                    ]
                            // </editor-fold>                                                 
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
                    text: 'Close',
                    id: prototype.id + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});
