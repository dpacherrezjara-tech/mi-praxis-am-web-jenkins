/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.eecta.CargaRecibosForm.CargaRecibosRef', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id04 + '-dataEntry',
    controller: prototype.id04 + '-cargaRecibosRefController',
    requires: [
        'Ext.Praxis.controller.eecta.CargaRecibos.CargaRecibosRefController'
    ],
    title: 'Procesar referencia - Cliente',
    header: true,
    width: 400,
    height: 140,
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
            id: prototype.id04 + '-DataEntry-center',
            border: false,
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    width: '100%',
                    items: [
                        {
                            xtype: 'textfield',
                            padding: '10 5 10 10',
                            id: prototype.id04 + '-A4096LOTE',
                            labelAlign: 'right',
                            fieldLabel: '<strong style="font-weight:bold;color:#0B333C;">Número Lote</strong>',
                            allowBlank: false, labelWidth: 80, width: 200, height: 28,
                            fieldStyle: 'text-align:center;font-weight: bold;font-size:13px;'
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
                    id: prototype.id04 + '-btn-save',
                    text: 'Procesar',
                    icon: 'resources/img/botones/process.png',
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
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
