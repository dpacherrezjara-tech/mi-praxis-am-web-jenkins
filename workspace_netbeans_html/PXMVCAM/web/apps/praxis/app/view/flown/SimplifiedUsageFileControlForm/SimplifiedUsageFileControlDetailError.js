/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */

Ext.define('Ext.Praxis.view.flown.SimplifiedUsageFileControlForm.SimplifiedUsageFileControlDetailError', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id01 + '-dataEntry',
    controller: 'SimplifiedUsageFileControlDetailErrorController', 
    requires: [
        'Ext.Praxis.controller.flown.SimplifiedUsageFileControl.SimplifiedUsageFileControlDetailErrorController',
        'Ext.Praxis.view.flown.SimplifiedUsageFileControlForm.InfoGridDetError'
    ],
    title: 'Detail errors',
    width: 600,
    height: 350,
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
                    layout: 'vbox',
                    border: false,
                    margin: '3 3 3 3',
                    items: [
                        
                        {
                            xtype: 'panel',
                            id: prototype.id01 + '-contenedor-grid',
                            layout: 'fit',
                            width: 700,
                            height: 400,
                            defaults: {
                                margin: '2 2 2 2',
                                border: false
                            },
                            items: [
                                {
                                    xtype: prototype.id01 + '-infoGridDetError'
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
            border: false,
            ui: 'footer',
            margin: '1 1 1 1', // left/right/top/botton
            defaults: {
                scale: 'medium'
            },
            style: 'aling:center padding: 5px;',
            items: [
                {
                    text: 'Cerrar',
                    id: prototype.id01 + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});

