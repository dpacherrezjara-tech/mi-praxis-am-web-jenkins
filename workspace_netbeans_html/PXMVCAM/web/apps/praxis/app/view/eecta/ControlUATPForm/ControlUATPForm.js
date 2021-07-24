prototype.widthContenedor = 1200;
prototype.widthGrid = '100%';
prototype.id01 = 'Info01';
//prototype.id02 = 'AplPaymentBoletoEntry';
//prototype.id03 = 'AplPaymentBatch';

Ext.define('Ext.Praxis.view.eecta.ControlUATPForm.ControlUATPForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.ControlUATPForm',
    requires: [
        'Ext.Praxis.controller.eecta.ControlUATP.ControlUATPController',
        'Ext.Praxis.view.eecta.ControlUATPForm.Options',
        'Ext.Praxis.view.eecta.ControlUATPForm.Filters',
        'Ext.Praxis.view.eecta.ControlUATPForm.Info00',
        'Ext.Praxis.view.eecta.ControlUATPForm.Info01'
    ],
    controller: 'ControlUATPController',
    id: prototype.id + '-ContenedorMain',
    layout: {
        type: 'fit'
    },
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            id: prototype.id + '-xpanel',
            border: false,
            autoScroll: false,
            layout: 'fit',
            items: [
                {
                    id: prototype.id + '-form',
                    border: false,
                    bodyCls: 'colorFondo',
                    layout: 'fit',
                    defaults: {
                        border: false,
                        autoScroll: true
                    },
                    items: [
                        {
                            xtype: 'panel',
                            region: 'center',
                            layout: 'border',
                            items: [
                                {
                                    region: 'center',
                                    id: prototype.id + '-centerC',
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    border: true,
                                    autoScroll: true,
                                    defaults: {
                                        width: prototype.widthContenedor,
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: prototype.id + '-options'
                                        },
                                        {
                                            xtype: prototype.id + '-filters',
                                            id: prototype.id + '-contentFilter'
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-panel-contenedor-grid',
                                            height: 520,
                                            //border:true,
                                            layout: 'fit',
                                            items: [
                                                // <editor-fold defaultstate="collapsed" desc="setGridData">
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id + '-contenedor-grid',
                                                    align: 'center',
                                                    layout: 'hbox',
                                                    border: true,
                                                    bodyStyle: 'background: transparent',
                                                    items: [
                                                        {
                                                            xtype: 'fieldset',
                                                            border: true,
                                                            width: 220,
                                                            padding: '1 1 1 1',
                                                            items: [
                                                                {
                                                                    xtype: prototype.id + '-info00'
                                                                }
                                                            ]

                                                        },
                                                        {
                                                            xtype: 'fieldset',
                                                            border: true,
                                                            width: '99%',
                                                            padding: '1 1 1 1',
                                                            layout: 'vbox',
                                                            items: [
                                                                {
                                                                    // <editor-fold defaultstate="collapsed" desc="BoxFilter_grid01">
                                                                    xtype: 'panel',
                                                                    id: prototype.id + '-BoxFilter02',
                                                                    border: false,
                                                                    hidden: false,
                                                                    layout: 'hbox',
                                                                    bodyStyle: 'background: transparent;"',
                                                                    margin: '1 0',
                                                                    items: [                                                                        
                                                                        {
                                                                            xtype:'label',
                                                                            text:'Filtrar:',
                                                                            margin: '1 0 0 10'
                                                                        },
                                                                        {
                                                                            xtype: 'textfield',
                                                                            id: prototype.id + '-TKT-NUMBER',
                                                                            fieldLabel: 'Nº Ticket', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 80,
                                                                            fieldStyle: 'text-align:left;font-weight: bold;font-size:13px;',
                                                                            enableKeyEvents: true,
                                                                            width: 220,
                                                                            height: 24,
                                                                            listeners: {
                                                                                keypress: 'onTxtFilterKeypress'
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'combo',
                                                                            id: prototype.id + '-STSTKT',
                                                                            fieldLabel: 'Estado TKT', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 100,
                                                                            store: new Ext.data.SimpleStore({
                                                                                fields: ['code', 'name'],
                                                                                data: [
                                                                                    ["", "TODOS"],
                                                                                    ["2", "ERRORES"],
                                                                                    ["0", "OK"]                                                                                    
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
                                                                            width: 220,
                                                                            height: 24,
                                                                            value: "",
                                                                            enableKeyEvents: true,
                                                                            padding: '0 0',
                                                                            listeners: {
                                                                                //change: 'cmbfiltro_clickHandler'
                                                                            }
                                                                        }
                                                                    ]
                                                                    //</editor-fold> 
                                                                },
                                                                {
                                                                    xtype: prototype.id01 + '-info01'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                                // </editor-fold>                                                 
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});