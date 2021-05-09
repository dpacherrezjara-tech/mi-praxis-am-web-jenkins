/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.discharges.ParametersNoShowForm.CatPrestacionesEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id02 + '-dataEntry',
    controller: prototype.id02 + '-dataEntryController',
    requires: [
        'Ext.Praxis.controller.discharges.ParametersNoShow.CatPrestacionesEntryController',
        'Ext.Praxis.view.discharges.ParametersNoShowForm.InfoGridPrestaciones'
    ],
    title: 'Catalogo Pseudo City Code',
    header: true,
    width: 400,
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
                    layout: 'vbox',
                    border: false,
                    margin: '3 3 3 3',
                    items: [                       
                        {
                            xtype: 'panel',
                            id: prototype.id02 + '-grid-excel01',
                            layout: 'fit',
                            width: 390,
                            height: 245,
                            items: [
                                {
                                    xtype: prototype.id02 + '-infoGrid'
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
            margin: '5 5 7 7', // left/right/top/botton
            defaults: {
                scale: 'medium'
            },
            style: 'aling:center padding: 5px;',
            items: [
                {
                    text: 'Close',
                    id: prototype.id02 + '-btn',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick01'
                    }
                }
            ]
        }
    ]
});




