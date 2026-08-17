/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.eecta.CargaRecibosForm.CargaRecibosRefManual', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id09 + '-dataEntry',
    controller: prototype.id09 + '-cargaRecibosRefManualController',
    requires: [
        'Ext.Praxis.controller.eecta.CargaRecibos.CargaRecibosRefManualController',
        'Ext.Praxis.view.eecta.CargaRecibosForm.InfoGridRecibosSel'
    ],
    title: 'Asignar cliente',
    header: true,
    width: 680,
    height: 400,
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
            id: prototype.id09 + '-DataEntry-center',
            border: true,
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'form',
                    id: prototype.id09 + '-form01',
                    layout: 'hbox',
                    width: '100%',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            width: '100%',
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
                                            id: prototype.id09 + '-A4097CDCLI-filt',
                                            fieldLabel: 'Buscar', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            emptyText: 'Código',
                                            fieldStyle: 'font-weight: bold;font-size:13px;text-align:center',
                                            labelWidth: 50,
                                            readOnly: false,
                                            width: 160,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 9,
                                            listeners: {
                                                keypress: 'OnEventbuscarCliente'
                                            }
                                        },
                                        {
                                            xtype: 'toolbar',
                                            margin: '1 0 1 5',
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
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 2 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id09 + '-A4097CDCLI',
                                            fieldLabel: 'Cliente', labelAlign: 'right', 
                                            labelStyle: 'font-weight: bold;',                                            
                                            fieldStyle: 'font-weight: bold;font-size:13px;text-align:center',
                                            labelWidth: 60,
                                            readOnly: true,
                                            width: 150
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id09 + '-A3953RSOCI',
                                            fieldLabel: '', labelAlign: 'right', 
                                            labelStyle: 'font-weight: bold;', 
                                            fieldStyle: 'font-weight: bold;font-size:13px;text-align:left',
                                            labelWidth: 10, padding: '0 0 0 2',
                                            readOnly: true,
                                            width: 300                                            
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
                    id: prototype.id09 + '-contenedor-info',
                    width: 660,
                    layout: 'fit',
                    items: [
                        {
                            xtype: prototype.id09 + '-infoGridRecibosSel'
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
                    text: 'Grabar',
                    id: prototype.id09 + '-btn-asignar-cliente',
                    icon: 'resources/img/botones/Save.png',
                    tooltip: 'Grabar',
                    listeners: {
                        click: 'onGrabaReferenciaManualClick'
                    }
                },
                {
                    text: 'Cerrar',
                    id: prototype.id09 + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});
