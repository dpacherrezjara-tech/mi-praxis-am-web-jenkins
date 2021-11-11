/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.eecta.CargaRecibosForm.CargaRecibosComplemento', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id07 + '-dataEntry',
    controller: prototype.id07 + '-cargaRecibosComplementoController',
    requires: [
        'Ext.Praxis.controller.eecta.CargaRecibos.CargaRecibosComplementoController',
        'Ext.Praxis.view.eecta.CargaRecibosForm.InfoGridCompl'
    ],
    title: 'Complemento de pago',
    header: true,
    width: 900,
    height: 500,
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
            id: prototype.id07 + '-DataEntry-center',
            border: true,
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'form',
                    id: prototype.id07 + '-form01',
                    layout: 'hbox',
                    width: '100%',
                    items: [
                        {
                            xtype: 'datefield',
                            id: prototype.id07 + '-A4107FPROC',
                            fieldLabel: 'Fecha', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 80,
                            width: 175,
                            height: 24,
                            format: 'Ymd',
                            minValue: new Date(200, 00, 01),
                            value: new Date(),
                            maskRe: /[0-9/]/,
                            editable: true,
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            maxLength: 10,
                            padding: '2 2 2 2',                                           
                            listeners: {
                                //change: 'onUpperValue',
                                keypress: function (obj, e) {
                                    if (e.getKey() === e.ENTER) {
                                        //Ext.getCmp(prototype.id + '-fecha2').focus();
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            ui: 'footer',
                            margin: '2 0 2 5',
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
                                    id: prototype.id07 + '-btn-save',
                                    text: 'Facturar',
                                    icon: 'resources/img/botones/process.png',
                                    listeners: {
                                        click: 'onSaveClick'
                                    }
                                },
                                {xtype: 'tbseparator'}
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            layout: 'hbox',
                            //width: 380,
                            border: true,
                            //title: 'Filtrar',
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id07 + '-A4107NLOTE',
                                    emptyText: 'Nº Envio', fieldLabel: 'Filtrar',
                                    fieldStyle: 'text-align:center;font-weight: bold;font-size:12px;',
                                    enableKeyEvents: true, padding: '2 2 2 2',
                                    width: 200,labelWidth: 60, labelAlign: 'right',
                                    listeners: {
                                        keypress: 'onTxtFilterKeypress03'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id07 + '-A4107NUMRC',
                                    emptyText: 'Nº Recibo', //labelAlign: 'top', labelStyle: 'font-weight: bold;', labelWidth: 120,
                                    fieldStyle: 'text-align:center;font-weight: bold;font-size:12px;',
                                    //placeholder: 'xxx-xxxx-xxxxxx',
                                    //inputMask: '999-9999-999999',                                    
                                    enableKeyEvents: true, padding: '2 2 2 2',
                                    width: 120,
                                    listeners: {
                                        keypress: 'onTxtFilterKeypress03'
                                    }
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id07 + '-A4107ESTAD',                                    
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", "TODOS"],
                                            ["0", "PENDIENTE"],
                                            ["1", "ENVIADO"],
                                            ["2", "PROCESADO"],
                                            ["3", "ERROR"]
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
                                    width: 80,
                                    value: "",
                                    enableKeyEvents: true,
                                    padding: '2 2 2 2',
                                    listeners: {
                                        change: 'cmbfiltro_clickHandler03'
                                    }
                                },
                                {
                                    xtype: 'toolbar',
                                    dock: 'bottom',
                                    ui: 'footer',
                                    margin: '1 0 1 1',
                                    layout: {
                                        pack: 'center'
                                    },
                                    fieldStyle: 'text-align:center',
                                    defaults: {
                                        scale: 'small'
                                    },
                                    items: [
                                        //{xtype: 'tbseparator'},
                                        {
                                            xtype: 'button',
                                            id: prototype.id07 + '-btn-excel',
                                            icon: 'resources/img/botones/excel.png',
                                            hidden: true, //descarga pendiente
                                            listeners: {
                                                click: 'onExportXlsClick'
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'form',
                    id: prototype.id07 + '-form02',
                    layout: 'hbox',
                    width: '100%',
                    items: [
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnBack',
                            iconCls: 'prx-icon-back',
                            tooltip: 'Regresar',
                            listeners: {
                                click: 'search_complemento'
                            }
                        }
                    ]  
                },
                {
                    // <editor-fold defaultstate="collapsed" desc="grid">
                    xtype: 'panel',
                    id: prototype.id07 + '-contenedor-info',
                    width: 900,
                    layout: 'fit',
                    items: [
                        {
                            xtype: prototype.id07 + '-infoGridCompl'
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
//                {
//                    xtype: 'button',
//                    id: prototype.id07 + '-btn-save',
//                    text: 'Procesar',
//                    icon: 'resources/img/botones/process.png',
//                    listeners: {
//                        click: 'onSaveClick'
//                    }
//                },
                {
                    text: 'Close',
                    id: prototype.id07 + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});
