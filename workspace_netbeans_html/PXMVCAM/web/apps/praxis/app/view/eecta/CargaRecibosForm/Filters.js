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
                                            fieldLabel: 'Del', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 40,
                                            width: 130,
                                            height: 24,
                                            format: 'Ymd',
                                            minValue: new Date(200, 00, 01),
                                            value:new Date(2021, 00, 01),
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
                                            fieldLabel: 'Al', labelAlign: 'left', labelStyle: 'font-weight: bold;', labelWidth: 20,
                                            width: 110,
                                            height: 24,
                                            format: 'Ymd',
                                            minValue: new Date(2000, 00, 01),
                                            value:new Date(),
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
                                            fieldLabel: 'Recibo', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 90,
                                            fieldStyle: 'text-align:left;font-weight: bold;font-size:13px;',
                                            enableKeyEvents: true,
                                            width: 200,
                                            height: 24,
                                            listeners: {
                                                keypress: 'onTxtFilterKeypress'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-IDRCB',
                                            fieldLabel: 'Id Carga', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 60,
                                            fieldStyle: 'text-align:center;font-weight: bold;font-size:13px;',
                                            enableKeyEvents: true,
                                            width: 150,
                                            value: '',
                                            enforceMaxLength: true,
                                            maxLength: 10,
                                            height: 24,
                                            listeners: {
                                                keypress: 'onTxtFilterKeypress'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-CDCLI',
                                            fieldLabel: 'Cliente', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 60,
                                            fieldStyle: 'text-align:center;font-weight: bold;font-size:13px;',
                                            enableKeyEvents: true,
                                            width: 150, emptyText:'Id',
                                            value: '',
                                            enforceMaxLength: true,
                                            maxLength: 9,
                                            height: 24,
                                            listeners: {
                                                keypress: 'onTxtFilterKeypress'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-VPARM',
                                            fieldLabel: '', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 5,
                                            fieldStyle: 'text-align:center;font-weight: bold;font-size:13px;',
                                            enableKeyEvents: true,
                                            width: 170, emptyText:'Nombre',
                                            value: '', padding: '1 1 1 2',
                                            enforceMaxLength: true,
                                            maxLength: 60,
                                            height: 24,
                                            listeners: {
                                                keypress: 'onTxtFilterKeypress'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-ESTAD',
                                            fieldLabel: 'Estado', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 70,
                                            store: new Ext.data.SimpleStore({
                                                fields: ['code', 'name'],
                                                data: [
                                                    ["", "TODOS"],
                                                    ["P", "PENDIENTE"],
                                                    ["T", "APL. TOTAL"],
                                                    ["X", "PARCIAL"],
                                                    ["A", "ANULADO"]
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
                                            width: 160,
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