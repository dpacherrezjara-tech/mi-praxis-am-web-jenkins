/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.eecta.CatalogoClienteForm.CatalogoClienteRef', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id03 + '-dataEntry',
    controller: prototype.id03 + '-dataEntryRefController',
    requires: [
        'Ext.Praxis.controller.eecta.CatalogoCliente.CatalogoClienteRefController',
        'Ext.Praxis.view.eecta.CatalogoClienteForm.InfoGridRef'
    ],
    title: 'Catalogo Referencias',
    header: true,
    width: 820,
    height: 500,
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
            border: false,
            layout: {
                type: 'hbox'
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'vbox',
                    margin: '1 1 1 1',
                    width: 370,
                    items: [
                        {
                            // <editor-fold defaultstate="collapsed" desc="filter01"> 
                            xtype: 'fieldset', title: 'Filtrar',
                            id: prototype.id03 + '-BoxFilter01',
                            border: true,
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
                                    xtype: 'textfield',
                                    id: prototype.id03 + '-CDCLI',
                                    fieldLabel: '', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 0,
                                    emptyText: 'Código', margin: '1 1 5 1',
                                    fieldStyle: 'text-align:left;font-weight: bold;font-size:13px;',
                                    enableKeyEvents: true,
                                    width: 100,
                                    height: 24,
                                    listeners: {
                                        keypress: 'onTxtFilterKeypress'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id03 + '-RSOCI',
                                    fieldLabel: '', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 0,
                                    emptyText: 'Nombres', margin: '1 0 1 1',
                                    fieldStyle: 'text-align:center;font-weight: bold;font-size:13px;',
                                    enableKeyEvents: true,
                                    width: 200,
                                    value: '',
                                    enforceMaxLength: true,
                                    maxLength: 10,
                                    height: 24,
                                    listeners: {
                                        keypress: 'onTxtFilterKeypress'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.id03 + '-btn-consultar',
                                    margin: '1 0 0 7',
                                    icon: 'resources/img/icon/search.png',
                                    listeners: {
                                        click: 'search_ref'
                                    }
                                }
                            ]
                                    // </editor-fold>
                        },
                        {
                            xtype: 'panel',
                            width: '100%',
                            border: false,
                            id: prototype.id03 + '-contenedor-grid-ref',
                            items: [
                                {
                                    xtype: prototype.id03 + '-info-ref'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'vbox',
                    width: 430,
                    margin: '2 2 2 2',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'vbox',
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
                                            id: prototype.id03 + '-A4097CDCLI',
                                            fieldLabel: 'Código Cliente', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 100,
                                            readOnly: true,
                                            width: 180,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 9,
                                            listeners: {
                                                keypress: 'event_buscarCliente'
                                            }
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
                                            xtype: 'textarea',
                                            id: prototype.id03 + '-A3953RSOCI',
                                            fieldLabel: 'Nombres', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 100,
                                            width: 400, readOnly: true,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 150,
                                            listeners: {
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        //Ext.getCmp(prototype.id + '-A3953NCOME').focus();
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            layout: 'vbox',
                            title: 'Parametros de coincidencia',
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
                                            id: prototype.id03 + '-A4097SEQ',
                                            fieldLabel: 'Nº', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 100,
                                            width: 160, readOnly: true
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'combo',
                                            id: prototype.id03 + '-A4097REF4',
                                            fieldLabel: 'Coincidencia', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 100,
                                            width: 290, readOnly: true,
                                            store: new Ext.data.SimpleStore({
                                                fields: ['code', 'name'],
                                                data: [
                                                    ["R", "Finaliza con los caracteres"],
                                                    ["L", "Empieza por los caracteres"],
                                                    ["*", "Contiene los caracteres"]
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
                                            value: "*",
                                            enableKeyEvents: true,
                                            listeners: {
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id + '-A4097REF3').focus();
                                                    }
                                                }
                                                //keypress: 'onTextKeypress',
                                                //change: 'cmbfiltro_clickHandler'
                                            }//   
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id03 + '-A4097REF3',
                                            fieldLabel: 'Cantidad', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 60,
                                            readOnly: true,
                                            width: 100,
                                            enableKeyEvents: true,
                                            listeners: {
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id + '-A4097REF2').focus();
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id03 + '-A4097REF1',
                                            fieldLabel: 'Ref1', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 100, readOnly: true,
                                            width: 380,
                                            enableKeyEvents: true,
                                            listeners: {
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id + '-A4097REF2').focus();
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id03 + '-A4097REF2',
                                            fieldLabel: 'Ref2', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 100,
                                            width: 380, readOnly: true,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 150,
                                            listeners: {
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {

                                                    }
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'combo',
                                            id: prototype.id03 + '-A4097STAT',
                                            fieldLabel: 'Estado', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 100,
                                            width: 290, readOnly: true,
                                            store: new Ext.data.SimpleStore({
                                                fields: ['code', 'name'],
                                                data: [
                                                    ["1", "Activo"],
                                                    ["0", "Inactivo"]
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
                                            value: "1",
                                            enableKeyEvents: true,
                                            listeners: {
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        //Ext.getCmp(prototype.id + '-A4097REF3').focus();
                                                    }
                                                }
                                                //keypress: 'onTextKeypress',
                                                //change: 'cmbfiltro_clickHandler'
                                            }//   
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            width: '100%',
                            margin: '1 1 1 1',
                            defaults: {
                                border: false
                            },
                            border: true,
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    margin: '1 0 2 0',
                                    defaults: {
                                        labelAlign: 'left'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id03 + '-A4097REGIS', labelAlign: 'right',
                                            fieldLabel: '<strong style="color:#000;">Creado por</strong>',
                                            labelWidth: 78, value: '',
                                            //labelTextAlign: 'right',
                                            //margin: '0 10 0 0',
                                            readOnly: true,
                                            width: 180
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id03 + '-A4097FREGI', labelAlign: 'right',
                                            fieldLabel: '<strong style="color:#000;">Fecha</strong>',
                                            labelWidth: 40, value: '',
                                            labelTextAlign: 'center',
                                            //margin: '0 10 0 0',
                                            readOnly: true,
                                            width: 110
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id03 + '-A4097HREGI', labelAlign: 'right',
                                            fieldLabel: '<strong style="color:#000;"> Hora</strong>',
                                            labelWidth: 35, value: '',
                                            labelTextAlign: 'center',
                                            //margin: '0 10 0 0',
                                            readOnly: true,
                                            width: 90
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    margin: '1 0 2 0',
                                    defaults: {
                                        labelAlign: 'left'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id03 + '-A4097REVIS', labelAlign: 'right',
                                            fieldLabel: '<strong style="color:#000;">Actualizado</strong>',
                                            labelWidth: 78,
                                            labelTextAlign: 'right',
                                            readOnly: true,
                                            //margin: '0 10 0 0',
                                            width: 180
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id03 + '-A4097FREVI', labelAlign: 'right',
                                            fieldLabel: '<strong style="color:#000;">Fecha</strong>',
                                            labelWidth: 40,
                                            labelTextAlign: 'center',
                                            readOnly: true,
                                            //margin: '0 10 0 0',
                                            width: 110
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id03 + '-A4097HREVI', labelAlign: 'right',
                                            fieldLabel: '<strong style="color:#000;">Hora</strong>',
                                            labelWidth: 35,
                                            labelTextAlign: 'center',
                                            readOnly: true,
                                            //margin: '0 10 0 0',
                                            width: 90
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            border: true,
                            ui: 'footer',
                            margin: '5 5 7 7', // left/right/top/botton
                            defaults: {
                                scale: 'medium'
                            },
                            style: 'aling:center padding: 5px;',
                            items: [
                                {
                                    text: 'New',
                                    id: prototype.id03 + '-btn-new',
                                    iconCls: 'prx-icon-add',
                                    listeners: {
                                        click: 'onNewClick_id03'
                                    }
                                },
                                {
                                    text: 'Save',
                                    id: prototype.id03 + '-btn-save',
                                    iconCls: 'prx-icon-save',
                                    listeners: {
                                        click: 'onSaveClick_id03'
                                    }
                                },
                                {
                                    text: 'Edit',
                                    id: prototype.id03 + '-btn-edit',
                                    iconCls: 'prx-icon-edit',
                                    listeners: {
                                        click: 'onEditClick_id03'
                                    }
                                },
                                {
                                    text: 'Update',
                                    id: prototype.id03 + '-btn-update',
                                    iconCls: 'prx-icon-update',
                                    listeners: {
                                        click: 'onUpdateClick_id03'
                                    }
                                },                                
                                {
                                    text: 'Cancelar',
                                    id: prototype.id03 + '-btn-cancel',
                                    iconCls: 'prx-icon-cancel',
                                    listeners: {
                                        click: 'onCancelClick_id03'
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});
