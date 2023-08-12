/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.eecta.RegistroVentaOALForm.RegistroVentaOALLoad', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id02 + '-dataEntry',
    controller: prototype.id02 + '-registroVentaOALLoadController',
    requires: [
        'Ext.Praxis.controller.eecta.RegistroVentaOAL.RegistroVentaOALLoadController'
       // 'Ext.Praxis.view.eecta.RegistroVentaOALForm.InfoGridBatch'
    ],
    title: 'Cargar VENTA',
    header: true,
    width: 500,
    height: 120,
    border: false,
    resizable: false,
    layout: {        
        align: 'center'
    },
    modal: true,
    items: [
        {            
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
                            margin: '2 0 2 7',
                            layout: {
                                pack: 'center'
                            },
                            fieldStyle: 'text-align:center',
                            defaults: {
                                scale: 'medium'
                            },
                            items: [
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
                        }
                    ]
                },
                {
//                    xtype: 'panel',
//                    width: '99%',
//                    border: true,
//                    paddin: '2 1 2 1',
//                    layout: {
//                        type: 'hbox'                        
//                    },
//                    items: [
//                        {
//                            xtype: 'textfield',
//                            id: prototype.id02 + '-A4096LOTE',
//                            //emptyText: 'Nº Lote',
//                            fieldLabel: 'Lote', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 40,
//                            fieldStyle: 'text-align:center;font-weight: bold;font-size:12px;',
//                            enableKeyEvents: true,
//                            padding: '10 2 2 2',
//                            width: 150,
//                            listeners: {
//                                keypress: 'onTxtFilterKeypress03'
//                            }
//                        },
//                        {
//                            xtype: 'textfield',
//                            id: prototype.id02 + '-A4096TRXOR',
//                            fieldLabel: 'Nº Recibo', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 70,
//                            //emptyText: 'Nº Recibo', //labelAlign: 'top', labelStyle: 'font-weight: bold;', labelWidth: 120,
//                            fieldStyle: 'text-align:center;font-weight: bold;font-size:12px;',
//                            //placeholder: 'xxx-xxxx-xxxxxx',
//                            //inputMask: '999-9999-999999',                                    
//                            enableKeyEvents: true, padding: '10 2 2 2',
//                            width: 180,
//                            listeners: {
//                                keypress: 'onTxtFilterKeypress03'
//                            }
//                        },
//                        {
//                            xtype: 'textfield',
//                            id: prototype.id02 + '-A4096CUENT',
//                            fieldLabel: 'Cuenta', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 50,
//                            //emptyText: 'Cuenta', //labelAlign: 'top', labelStyle: 'font-weight: bold;', labelWidth: 120,
//                            fieldStyle: 'text-align:center;font-weight: bold;font-size:12px;',
//                            //placeholder: 'xxx-xxxx-xxxxxx',
//                            //inputMask: '999-9999-999999',                                    
//                            enableKeyEvents: true, padding: '10 2 2 2',
//                            width: 150,
//                            listeners: {
//                                keypress: 'onTxtFilterKeypress03'
//                            }
//                        },
//                        {
//                            xtype: 'textfield',
//                            id: prototype.id02 + '-A4096MDATX',
//                            fieldLabel: 'Mda', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 50,
//                            //emptyText: 'Mda', //labelAlign: 'top', labelStyle: 'font-weight: bold;', labelWidth: 120,
//                            fieldStyle: 'text-align:center;font-weight: bold;font-size:12px;',
//                            //placeholder: 'xxx-xxxx-xxxxxx',
//                            //inputMask: '999-9999-999999',                                    
//                            enableKeyEvents: true, padding: '10 2 2 2',                            
//                            enforceMaxLength: true,
//                            maxLength: 3,
//                            width: 100,
//                            listeners: {
//                                keypress: 'onTxtFilterKeypress03'
//                            }
//                        },
//                        {
//                            xtype: 'combo',
//                            id: prototype.id02 + '-A4096STREF',
//                            fieldLabel: 'Estado', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 50,
//                            //emptyText: 'Estado Carga', //labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 125,
//                            store: new Ext.data.SimpleStore({
//                                fields: ['code', 'name'],
//                                data: [
//                                    ["", "TODOS"],
//                                    ["1", "MATCH"],
//                                    ["0", "UNMATCH"],
//                                    ["2", "PROCESADO DB RECIBOS"],
//                                    ["3", "RE-PROCESADO REF."]
//                                ]
//                            }),
//                            queryMode: 'local',
//                            triggerAction: 'all',
//                            autoSelect: false,
//                            forceSelection: true,
//                            caseSensitive: false,
//                            editable: true,
//                            typeAhead: true,
//                            valueField: 'code', displayField: 'name',
//                            width: 150,
//                            value: "",
//                            enableKeyEvents: true,
//                            padding: '10 2 2 2',
//                            listeners: {
//                                change: 'cmbfiltro_clickHandler03'
//                            }
//                        },
//                        {
//                            xtype: 'toolbar',
//                            //dock: 'bottom',
//                            //ui: 'footer',
//                            margin: '1 0 1 1',
////                            layout: {
////                                type: 'hbox',
////                                pack: 'end'
////                            },
//                            //fieldStyle: 'text-align:center',
////                            defaults: {
////                                scale: 'small'
////                            },
//                            items: [
//                                {
//                                    xtype: 'button',
//                                    id: prototype.id02 + '-btnSearch',
//                                    icon: 'resources/img/botones/search.png',
//                                    tooltip: 'Buscar',
//                                    listeners: {
//                                        click: 'search_det_loadbatch'
//                                    }
//                                },
//                                {
//                                    xtype: 'button',
//                                    id: prototype.id02 + '-btn-asignar-cliente',
//                                    icon: 'resources/img/botones/user.png',
//                                    text: 'Asignar Cliente',
//                                    listeners: {
//                                        click: 'onfrmReferenciaManualClick'
//                                    }
//                                },
//                                {
//                                    xtype: 'button',
//                                    id: prototype.id02 + '-btn-excel',
//                                    icon: 'resources/img/botones/excel.png',
//                                    hidden: true, //descarga pendiente
//                                    listeners: {
//                                        click: 'onExportXlsClick'
//                                    }
//                                }
//
//                            ]
//                        }
//                    ]
                },
                {
                    // <editor-fold defaultstate="collapsed" desc="grid">
//                    xtype: 'panel',
//                    id: prototype.id02 + '-contenedor-info',
//                    width: 940,
//                    layout: 'fit',
//                    items: [
//                        {
//                            xtype: prototype.id02 + '-infoGridBatch'
//                        }
//                    ]
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
                    text: 'Cerrar',
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
