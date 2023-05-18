/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//console.log('view');

Ext.define('Ext.Praxis.view.eecta.CargaRecibosForm.CargaRecibosDetRecForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id06 + '-CargaRecibosDetRecForm',
    controller: prototype.id06 + '-cargaRecibosDetRecController',
    requires: [
        'Ext.Praxis.controller.eecta.CargaRecibos.CargaRecibosDetRecController',
        'Ext.Praxis.view.eecta.CargaRecibosForm.InfoGrid'
    ],
    title: 'Detalle de recibos',
    header: true,
    width: 910,
    height: 600,
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
            id: prototype.id06 + '-DataEntry',
            border: true,
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    margin: '1 0 1 0',
                    border: false,
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.id06 + '-A4102IDRCB',
                            fieldLabel: 'Id Carga', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 125,
                            width: 225,fieldStyle: 'font-weight: bold;font-size:13px;text-align:center',
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            readOnly: true,
                            maxLength: 50,
                            listeners: {
                                //change: 'onUpperValue',
                                keypress: function (obj, e) {
                                    if (e.getKey() === e.ENTER) {
                                        //Ext.getCmp(prototype.id06 + '-A3953CIUDA').focus();
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id06 + '-A4102CDCLI',
                            fieldLabel: 'Cliente', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                            labelWidth: 70,fieldStyle: 'font-weight: bold;font-size:13px;text-align:center',
                            readOnly: true,
                            width: 160
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id06 + '-A3953RSOCI',
                            fieldLabel: '', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 10,
                            width: 350,fieldStyle: 'font-weight: bold;font-size:13px;text-align:left',
                            readOnly: true,
                            //enableKeyEvents: true,
                            //enforceMaxLength: true,
                            padding: '0 0 0 2',
                            //maxLength: 150,
                            listeners: {
                                //change: 'onUpperValue',
                                keypress: function (obj, e) {
                                    if (e.getKey() === e.ENTER) {
                                        //Ext.getCmp(prototype.id06 + '-A3953NCOME').focus();
                                    }
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    margin: '1 0 1 0',
                    border: false,
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.id06 + '-A4102FECRC',
                            fieldLabel: 'Fecha', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 125,                            
                            width: 205,fieldStyle: 'font-weight: bold;font-size:13px;text-align:center',
                            readOnly: true
                        },
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '1 0 1 0',
                            border: false,
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id06 + '-A4102QTYRC',
                                    fieldLabel: 'Cant.', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 50,
                                    width: 120, fieldStyle: 'font-weight: bold;font-size:13px;text-align:right',
                                    value: '0',
                                    readOnly:true
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id06 + '-A4102TOTRC',
                                    fieldLabel: 'Total', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 50,
                                    width: 150, fieldStyle: 'font-weight: bold;font-size:13px;text-align:right',
                                    value: '0.00',
                                    readOnly:true
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id06 + '-A4102MDARC',
                                    padding:'0 0 0 2',
                                    fieldLabel: '', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 2,
                                    width: 40, fieldStyle: 'font-weight: bold;font-size:13px;text-align:center',                                   
                                    readOnly: true
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id06 + '-A4102TOTAP',
                                    fieldLabel: 'Aplicado', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 60,
                                    width: 150, fieldStyle: 'font-weight: bold;font-size:13px;text-align:right',
                                    value: '0.00',
                                    readOnly:true
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id06 + '-A4102SALDO',
                                    fieldLabel: 'Saldo', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 50,
                                    width: 150, fieldStyle: 'font-weight: bold;font-size:13px;text-align:right',
                                    value: '0.00',
                                    readOnly:true
                                }
                            ]
                        }
                    ]
                },                
                {
                    // <editor-fold defaultstate="collapsed" desc="grid-det">
                    xtype: 'panel',
                    id: prototype.id06 + '-contenedor-det',
                    width: 900,
                    layout: 'fit',
                    items: [{
                            xtype: prototype.id06 + '-info'
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
                    id: prototype.id06 + '-btn-save',
                    iconCls: 'prx-icon-check',
                    hidden: true,
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update',
                    id: prototype.id06 + '-btn-update',
                    iconCls: 'prx-icon-update',
                    hidden: true,
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Delete',
                    id: prototype.id06 + '-btn-delete',
                    iconCls: 'prx-icon-delete',
                    hidden: true,
                    listeners: {
                        click: 'onDeleteClick'
                    }
                },
                {
                    text: 'Close',
                    id: prototype.id06 + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                },
                {
                    xtype: 'label',
                    labelAlign: 'center',
                    width: 150,
                    hidden: true,
                    padding: '2px 5px 2px 3px',
                    html: '<strong style="color:#AC4546;font-size:13px;">(*)Required Fields</strong>'

                }
            ]
        }
    ]
});
