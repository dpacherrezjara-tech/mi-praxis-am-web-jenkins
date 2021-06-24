/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.eecta.AplPaymentForm.AplPaymentBatch', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id03 + '-dataEntry',
    controller: prototype.id03 + '-aplPaymentBatchController',
    requires: [
        'Ext.Praxis.controller.eecta.AplPayment.AplPaymentBatchController',
        'Ext.Praxis.view.eecta.AplPaymentForm.InfoGridAplPaymentBatch'
    ],
    title: 'Aplicación Pago batch',
    header: true,
    width: 750,
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
            id: prototype.id03 + '-DataEntry-center',
            border: true,
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'form',
                    id: prototype.id03 + '-form01',
                    layout: 'hbox',
                    width: 500,
                    items: [
                        {
                            xtype: 'filefield',
                            padding: '10 2 2 2',
                            id: prototype.id03 + '-file',
                            name: 'excelfile',                            
                            labelAlign: 'right',
                            fieldLabel: '<strong style="font-weight:bold;color:#0B333C;">Input File</strong>',
                            allowBlank: false,
                            accept: '.xlsx, .xls, .txt',
                            labelWidth: 60,
                            width: 350,
                            //buttonText: 'Select logo...',
                            regex: /(.)+((\.xlsx)|(\.txt)(\w)?)$/i,
                            regexText: 'Only XLS,XLSX,TXT formats are accepted',
                            buttonConfig: {
                                text: 'Browse...',
                                width: 80,
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
                                { xtype: 'tbseparator' },
                                {
                                    xtype: 'button',
                                    id: prototype.id03 + '-btn-save',
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
                    // <editor-fold defaultstate="collapsed" desc="grid">
                    xtype: 'panel',
                    id: prototype.id03 + '-contenedor-info',
                    width: 740,
                    layout: 'fit',
                    items: [
                        {
                            xtype: prototype.id03 + '-infoGridAplPaymentBatch'
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
//                    text: 'Procesar',
//                    id: prototype.id03 + '-btn-save',
//                    iconCls: 'prx-icon-check',
//                    listeners: {
//                        click: 'onSaveClick'
//                    }
//                },
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
