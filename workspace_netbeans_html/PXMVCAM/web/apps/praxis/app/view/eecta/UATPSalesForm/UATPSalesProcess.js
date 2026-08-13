/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.eecta.UATPSalesForm.UATPSalesProcess', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id + '-dataProcess',
    controller: prototype.id + '-dataProcessController',
    requires: [
        'Ext.Praxis.controller.eecta.UATPSales.UATPSalesProcessController'
    ],
    title: 'Process File',
    header: true,
    width: 300,
    height: 160,
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
            id: prototype.id + '-formProcess',
            border: true,
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'panel',
                    layout: {
                        type:'vbox',
                        align:'left'
                    },
                    margin: '1 0 1 0',
                    border: false,
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-A4264PRDA',
                            flex: 0,
                            fieldLabel: 'Processing Date', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 100,
                            width: 225, fieldStyle: 'font-weight: bold;font-size:13px;text-align:right',
                            margin: '5px 5px 5px 5px',
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            readOnly: true,
                            maxLength: 50,
                            listeners: {
                                keypress: function (obj, e) {
                                    if (e.getKey() === e.ENTER) {

                                    }
                                }
                            }

                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-A4264IDFIL',
                            margin: '5px 5px 5px 5px',
                            fieldLabel: 'Id File', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                            labelWidth: 100, fieldStyle: 'font-weight: bold;font-size:13px;text-align:right',
                            readOnly: true,
                            width: 225
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
                    text: 'Processing',
                    id: prototype.id + '-btn-Processing',
                    iconCls: 'prx-icon-check',
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
