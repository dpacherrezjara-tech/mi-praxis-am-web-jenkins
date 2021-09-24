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
        'Ext.Praxis.controller.eecta.CargaRecibos.CargaRecibosBatchController'
    ],
    title: 'Cargar recibos',
    header: true,
    width: 500,
    height: 150,
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
            margin: '1 1 1 1', // left/right/top/botton
            defaults: {
                scale: 'medium'
            },
            style: 'aling:center padding: 5px;',
            items: [
                {
                    xtype: 'button',
                    id: prototype.id02 + '-btn-save',
                    text: 'Procesar',
                    icon: 'resources/img/botones/process.png',
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
