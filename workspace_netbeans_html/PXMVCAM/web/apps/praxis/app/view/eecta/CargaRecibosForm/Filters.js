Ext.define('Ext.Praxis.view.eecta.CargaRecibosForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: false,
    bodyStyle: 'background-color: #E3EAF9;',
    margin: '1 0 1 0 ',
    layout: 'column',
    items: [
        {
            xtype: 'form',
            width: prototype.widthContenedor,
            border: false,
            bodyStyle: 'background: transparent',
            layout: 'vbox',
            defaults: {
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxSearchFilter',
                    width: '100%',
                    layout: 'vbox',
                    border: false,
                    bodyStyle: 'background: transparent',
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            width: '100%',
                            layout: 'vbox',
                            border: true,
                            bodyStyle: 'background-color: #E3EAF9;',
                            defaults: {
                                defaults: {
                                    anchor: '100%'
                                }
                            },
                            items: [
                                // <editor-fold defaultstate="collapsed" desc="BoxFilter01">                                
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-BoxFilter01',
                                    border: false,
                                    hidden: false,
                                    layout: 'hbox',
                                    bodyStyle: 'background: transparent;"',
                                    margin: '1 0',
                                    defaults: {
                                        anchor: '100%',
                                        padding: '1 0'
                                    },
                                    items: [
                                        
                                        {
                                            xtype: 'datefield',
                                            id: prototype.id + '-fecha1',
                                            fieldLabel: 'Fecha desde', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 90,
                                            width: 190,
                                            height: 24,
                                            format: 'Ymd',
                                            minValue: new Date(1990, 00, 01),
                                            maskRe: /[0-9/]/,
                                            editable: true,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 10,
                                            //padding:'2 2 2 2 ',                                            
                                            listeners: {
                                                //change: 'onUpperValue',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id + '-fecha2').focus();
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.id + '-fecha2',
                                            fieldLabel: 'Hasta', labelAlign: 'left', labelStyle: 'font-weight: bold;', labelWidth: 38,
                                            width: 128,
                                            height: 24,
                                            format: 'Ymd',
                                            minValue: new Date(1990, 00, 01),
                                            maskRe: /[0-9/]/,
                                            editable: true,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 10,
                                            padding: '2 0 0 10 ',
                                            listeners: {
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {

                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-TRXOR',
                                            fieldLabel: 'Trx. Origen', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 110,
                                            fieldStyle: 'text-align:left;font-weight: bold;font-size:13px;',
                                            enableKeyEvents: true,
                                            width: 280,
                                            height: 24,
                                            listeners: {
                                                keypress: 'onTxtFilterKeypress'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-LOTE',
                                            fieldLabel: 'Lote', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 70,
                                            fieldStyle: 'text-align:center;font-weight: bold;font-size:13px;',
                                            enableKeyEvents: true,
                                            width: 200,
                                            value:'',
                                            enforceMaxLength: true,
                                            maxLength: 10,
                                            height: 24,
                                            listeners: {
                                                keypress: 'onTxtFilterKeypress'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-ESTAD',
                                            fieldLabel: 'Estado', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 100,
                                            store: new Ext.data.SimpleStore({
                                                fields: ['code', 'name'],
                                                data: [
                                                    ["", "TODOS"],
                                                    ["N/I", "NI"],
                                                    ["N/A", "NA"]
                                                ]
                                            }),
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            autoSelect: false,
                                            forceSelection: true,
                                            caseSensitive: false,
                                            editable: true,
                                            typeAhead: true,
                                            valueField: 'code', displayField: 'name',
                                            width: 200,
                                            height: 24,
                                            value: "",
//                                            listConfig: {
//                                                maxHeight: 111
//                                            },
                                            enableKeyEvents: true,
                                            padding: '0 0',
                                            listeners: {
                                                //change: 'cmbfiltro_clickHandler'
                                            }
                                        },
                                        {
                                            xtype: 'toolbar',
                                            dock: 'bottom',
                                            ui: 'footer',
                                            margin: '2 0 2 15',
                                            layout: {
                                                pack: 'center'
                                            },
                                            fieldStyle: 'text-align:center',
                                            defaults: {
                                                scale: 'small'
                                            },
                                            items: [
                                                {
                                                    xtype: 'button',
                                                    id: prototype.id + '-btn-apl-batch',
                                                    text: 'Cargar recibos',
                                                    icon: 'resources/img/icon/single_format.png',                                                    
                                                    listeners: {
                                                        click: 'btnCargaRecibosBatch'
                                                    }
                                                }
                                            ]
                                        }                                        
                                    ]
                                }
                                // </editor-fold>
                                // <editor-fold defaultstate="collapsed" desc="BoxFilter02">
                                
                                // </editor-fold>                                
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});