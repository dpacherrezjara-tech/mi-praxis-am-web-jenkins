/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.eecta.CargaRecibosForm.CargaRecibosBatch', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id02 + '-dataEntry',
    controller: prototype.id02 + '-cargaRecibosBatchController',
    requires: [
        'Ext.Praxis.controller.eecta.CargaRecibos.CargaRecibosBatchController',
        'Ext.Praxis.view.eecta.CargaRecibosForm.InfoGridBatch'
    ],
    title: 'Cargar recibos',
    header: true,
    width: 870,
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
            id: prototype.id02 + '-DataEntry-center',
            border: true,
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'form',
                    id: prototype.id02 + '-form01',
                    layout: 'hbox',
                    width: '100%',
                    items: [
                        {
                            xtype: 'filefield',
                            padding: '10 2 2 2',
                            id: prototype.id02 + '-file',
                            name: 'excelfile',
                            labelAlign: 'right',
                            fieldLabel: '<strong style="font-weight:bold;color:#0B333C;">Input File</strong>',
                            allowBlank: false,
                            accept: '.xlsx, .xls, .txt',
                            labelWidth: 70,
                            width: 340,
                            //buttonText: 'Select logo...',
                            regex: /(.)+((\.xlsx)|(\.txt)(\w)?)$/i,
                            regexText: 'Only XLS,XLSX,TXT formats are accepted',
                            buttonConfig: {
                                text: 'Browse...',
                                width: 75,
                                glyph: 'xf3b6@Ionicons'
                            },
                            listeners: {
                                //change: 'onUploadChange'
                            }
                        },
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            ui: 'footer',
                            margin: '2 0 2 10',
                            layout: {
                                pack: 'center'
                            },
                            fieldStyle: 'text-align:center',
                            defaults: {
                                scale: 'medium'
                            },
                            items: [
                                {
                                    xtype: 'tbseparator'
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.id02 + '-btn-save',
                                    text: 'Procesar',
                                    icon: 'resources/img/botones/process.png',
                                    listeners: {
                                        click: 'onSaveClick'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            layout: 'hbox',
                            width: 380,
                            border: true,
                            title: 'Filtrar',                            
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id02 + '-A4096LOTE',
                                    emptyText: 'Nº Lote', 
                                    fieldStyle: 'text-align:center;font-weight: bold;font-size:12px;',
                                    enableKeyEvents: true, padding: '2 2 2 2',
                                    width: 95,
                                    listeners: {
                                        keypress: 'onTxtFilterKeypress03'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id02 + '-A4096TRXOR',
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
                                    id: prototype.id02 + '-A4096STREF',
                                    //emptyText: 'Estado Carga', //labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 125,
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", "TODOS"],
                                            ["1", "MATCH"],
                                            ["0", "UNMATCH"],
                                            ["2", "PROCESADO DB RECIBOS"],
                                            ["3", "PROCESADO DB RECIBOS"]
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
                                        {xtype: 'tbseparator'},
                                        {
                                            xtype: 'button',
                                            id: prototype.id02 + '-btn-excel',                                            
                                            icon: 'resources/img/botones/excel.png',
                                            hidden:true, //descarga pendiente
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
                    // <editor-fold defaultstate="collapsed" desc="grid">
                    xtype: 'panel',
                    id: prototype.id02 + '-contenedor-info',
                    width: 840,
                    layout: 'fit',
                    items: [
                        {
                            xtype: prototype.id02 + '-infoGridBatch'
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
//                    id: prototype.id02 + '-btn-save',
//                    text: 'Procesar',
//                    icon: 'resources/img/botones/process.png',
//                    listeners: {
//                        click: 'onSaveClick'
//                    }
//                },
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
