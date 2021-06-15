/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.view.eecta.EmisionEdoCtaForm.ConsultaSaldosDetForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id02 + '-ConsultaSaldosDetForm',
    controller: prototype.id02 + '-consultaSaldosDetController',
    requires: [
        'Ext.Praxis.controller.eecta.EmisionEdoCta.ConsultaSaldosDetController',
        'Ext.Praxis.view.eecta.EmisionEdoCtaForm.InfoGridSaldosAntDet',
        'Ext.Praxis.view.eecta.EmisionEdoCtaForm.InfoGridSaldosDet'
    ],
    title: 'Detalle de Saldos',
    header: true,
    width: 800,
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
            id: prototype.id02 + '-DataEntry-center',
            border: false,
            margin: '2 0 2 0 ',
            defaults: {
                border: false,
                autoScroll: true
            },
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    width: '100%',
                    height: 80,
                    margin: '2 0 2 0 ',
                    items: [
//                        {
//                            xtype: 'textfield',
//                            id: prototype.id02 + '-CDCLI',
//                            fieldLabel: 'Código Cliente', labelAlign: 'right', labelStyle: 'font-weight: bold;',
//                            labelWidth: 100,fieldStyle: 'font-weight: bold;font-size:13px;text-align:center',
//                            padding: '12 0', value:'000001411',
//                            readOnly: false,
//                            width: 190, height: 27,
//                            enableKeyEvents: true,
//                            enforceMaxLength: true,
//                            maxLength: 9,
//                            listeners: {                                
//                                keypress: function (obj, e) {
//                                    if (e.getKey() === e.ENTER) {
//                                        
//                                    }
//                                }
//                            }
//                        },
//                        {
//                            xtype: 'datefield',
//                            id: prototype.id02 + '-FPERI',
//                            fieldLabel: 'Al Periodo', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 85,
//                            width: 160, padding: '12 0',
//                            format: 'Ym', value: new Date(),
//                            //minValue: new Date(1990, 00, 01),
//                            //maxValue: new Date()-1,
//                            readOnly:true,
//                            maskRe: /[0-9/]/,
//                            editable: true,
//                            enableKeyEvents: true,
//                            enforceMaxLength: true,
//                            maxLength: 10,
//                            listeners: {
//                                //change: 'onUpperValue',
//                                keypress: function (obj, e) {
//                                    if (e.getKey() === e.ENTER) {
//                                        //Ext.getCmp(prototype.id+'-txtA1757NFACT').focus();
//                                    }
//                                }
//                            }
//                        },
//                        {
//                            xtype: 'toolbar',
//                            dock: 'bottom',
//                            ui: 'footer',
//                            margin: '0 0 0 0',
//                            layout: {
//                                pack: 'center'
//                            },
//                            fieldStyle: 'text-align:center',
//                            defaults: {
//                                scale: 'medium'
//                            },
//                            items: [
//                                {
//                                    xtype: 'button',
//                                    id: prototype.id02 + '-btn-consulta-eecc',
//                                    text: 'Buscar',
//                                    icon: 'resources/img/botones/search.png',
//                                    listeners: {
//                                         click: 'onbtn_consultaEECCClick01'
//                                    }
//                                }
//                            ]
//                        },
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            border: false,
                            width: '100%',
                            height: 75,
                            margin: '2 2 2 2 ',
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    width: '100%',
                                    margin: '1 1 1 1 ',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id02 + '-A3953CDCLI',
                                            fieldLabel: 'Cliente', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 80, //margin: '0 0 0 5 ',                                          
                                            readOnly: true,
                                            width: 170
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id02 + '-A3953RSOCI',
                                            labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            padding: '0 0 0 2',
                                            readOnly: true, labelWidth: 10,
                                            width: 300 //, padding: '0 0 0 2'
                                        }

                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'vbox',
                                    border: false,
                                    width: '100%',
                                    margin: '1 1 1 1 ',
                                    items: [
                                        {
                                            xtype: 'textareafield',
                                            height: 40, fieldLabel: 'Dirección', labelStyle: 'font-weight: bold;',
                                            border: false, readOnly: true, labelAlign: 'right',
                                            id: prototype.id02 + '-A3953DIRE1',
                                            padding: '1 1 1 1', width: 400, labelWidth: 80, maxRows: 3
                                        }
//                                        {
//                                            xtype: 'textfield',
//                                            id: prototype.id02 + '-A3953COLON', labelWidth: 80,width: 200,
//                                            fieldLabel: 'Colonia', labelAlign: 'right', labelStyle: 'font-weight: bold;',
//                                            margin: '0 0 0 5 '
//                                        },
//                                        {
//                                            xtype: 'textfield',
//                                            id: prototype.id02 + '-A3953DELEG', labelWidth: 80,width: 200,
//                                            fieldLabel: 'Delegación', labelAlign: 'right', labelStyle: 'font-weight: bold;',                                            
//                                            margin: '0 0 0 5 '
//                                        }
                                    ]
                                }
                            ]
                        }

                    ]
                },
                {
                    xtype: 'label',
                    text: 'ANTIGUEDAD DE SALDOS',
                    style: 'font-weight:bold;',
                    margin: '1 1 1 5 '
                },
                {
                    xtype: 'panel',
                    height: 80,
                    border: false,
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="setGridData">
                        {
                            xtype: 'panel',
                            id: prototype.id02 + '-contenedor-grid',
                            align: 'center',
                            border: true,
                            bodyStyle: 'background: transparent',
                            defaults: {
                                border: true
                            },
                            items: [
                                {
                                    xtype: prototype.id02 + '-info-ant'
                                }
                            ]
                        }
                        // </editor-fold>                                                 
                    ]
                },
                {
                    xtype: 'label',
                    text: 'DETALLE DE SALDOS',
                    style: 'font-weight:bold;',
                    margin: '1 1 1 5 '
                },
                {
                    xtype: 'panel',
                    height: 280,
                    width: 799,
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="setGridData">
                        {
                            xtype: 'panel',
                            id: prototype.id02 + '-contenedor-grid-det',
                            align: 'center',
                            border: false,
                            width: 799,
                            bodyStyle: 'background: transparent',
                            defaults: {
                                border: true
                            },
                            items: [
                                {
                                    xtype: prototype.id02 + '-info-det'
                                }
                            ]
                        }
                        // </editor-fold>                                                 
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    width: '100%',
                    margin: '2 0 2 0 ',
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.id02 + '-A3981TOT',
                            fieldLabel: 'GRAN TOTAL:', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                            labelWidth: 110, fieldStyle: 'font-weight: bold;font-size:13px;text-align:right',
                            padding: '6 0', value: '0.00', readOnly: true, width: 220, height: 27
                        },
                        {
                            xtype: 'label',
                            id: prototype.id02 + '-A3981TOTLT',
                            style: 'font-weight:bold;color:#112664;font-size:11px',
                            padding: '8 0',
                            margin: '1 1 1 5 '
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
                    text: 'Export Excel',
                    id: prototype.id02 + '-btn-excel',
                    iconCls: 'prx-icon-excel',
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Close',
                    id: prototype.id02 + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick02'
                    }
                }
            ]
        }
    ]
});
