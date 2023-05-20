Ext.define('Ext.Praxis.view.travelbank.TransaccionErrorForm.TransaccionErrorDetalleForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.TransaccionErrorDetalleForm',
    controller: 'TransaccionErrorDetalleController',
    requires: [
        'Ext.Praxis.controller.travelbank.TransaccionError.TransaccionErrorDetalleController',
        'Ext.Praxis.view.travelbank.TransaccionErrorForm.InfoDetail'
    ],
    title: 'ERROR - View detail',
    header: true, 
    height: 600,
    width: 850,
    border: false,
    resizable: false,
    layout: 'fit',
    modal: true,
    defaults: {
        border: false,
        bodyStyle: 'background: #FFFFFF;'
    },
    items: [
        {
            xtype: 'form',
            id: prototype.id2 + '-formDataEntry',
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    width: '100%',
                    items: [
                        {
                            xtype: 'fieldset',
                            //height: 145,      
                            width: '100%',
                            layout: 'vbox',
                            margin: '3 3 3 3',
                            padding: '2 2 2 2',
                            border: true,
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            id: prototype.id2 + '-A4435PRDA',
                                            fieldLabel: 'Transmission date', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 125,
                                            width: 245, fieldStyle: 'text-align:center;font-size:14px',
                                            format: 'Ymd',
                                            minValue: new Date(1990, 00, 01),
                                            maskRe: /[0-9/]/,
                                            editable: true,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 10,
                                            listeners: {
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        //code here
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id2 + '-A4435SQDIA',
                                            fieldLabel: 'Seq.', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 50, fieldStyle: 'text-align:center;font-size:14px',
                                            readOnly: false,
                                            width: 90
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
                                            id: prototype.id2 + '-A4435CDERR',
                                            fieldLabel: 'Error:', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 125, fieldStyle: 'text-align:center;font-size:14px',
                                            readOnly: false,
                                            width: 245
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id2 + '-A4441DES',
                                            fieldLabel: ' ', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 2, labelSeparator: '', fieldStyle: 'text-align:left;font-size:14px',
                                            readOnly: false,
                                            width: 400
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                // <editor-fold defaultstate="collapsed" desc="Info grid">
                {
                    xtype: 'panel',
                    layout: 'vbox',
                    margin: '1 1 1 1',
                    width: '100%',
                    border: false,
                    items: [
//                        {
//                            xtype: 'panel', width: '100%', border: false,
//                            layout: {
//                                type: 'hbox',
//                                pack: 'end'
//                            },
//                            items: [
//                                {
//                                    xtype: 'panel', border: false, hidden: false,
//                                    bodyStyle: 'background: transparent;',
//                                    margin: '0 0',
//                                    layout: {
//                                        type: 'hbox'
//                                    },
//                                    defaults: {
//                                        anchor: '100%',
//                                        padding: '0 0'
//                                    },
//                                    items: [
//                                        {
//                                            xtype: 'combo',
//                                            id: prototype.id2 + '-cmbfiltroDataEntry',
//                                            fieldLabel: 'Filter by', labelAlign: 'right', labelStyle: 'font-weight: bold;',
//                                            store: new Ext.data.SimpleStore({
//                                                fields: ['code', 'name'],
//                                                data: [
//                                                    ["", "(Select)"],
//                                                    ["1", "Ticket Number"]
//                                                ]
//                                            }),
//                                            queryMode: 'local',
//                                            triggerAction: 'all',
//                                            autoSelect: false,
//                                            forceSelection: true,
//                                            caseSensitive: false,
//                                            editable: true,
//                                            typeAhead: true,
//                                            valueField: 'code', displayField: 'name', width: 300, height: 26,
//                                            value: "", enableKeyEvents: true,
//                                            padding: '4 0',
//                                            listeners: {
//                                                change: 'onMostrarFiltrosChangeDataEntry'
//                                            }
//                                        },
//                                        // <editor-fold defaultstate="collapsed" desc="box:UNIQUE SERVICE CREDIT ID">
//                                        {
//                                            xtype: 'panel',
//                                            id: prototype.id2 + '-BoxUniqueServiceCreditID',
//                                            border: false,
//                                            hidden: true,
//                                            layout: 'hbox',
//                                            bodyStyle: 'background: transparent;"',
//                                            margin: '3 0',
//                                            defaults: {
//                                                anchor: '100%',
//                                                padding: '4 0'
//                                            },
//                                            items: [
//                                                {
//                                                    xtype: 'textfield',
//                                                    id: prototype.id2 + '-A4308IDEXP-Filter',
//                                                    fieldLabel: 'Credit ID ', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 120,
//                                                    fieldStyle: 'text-align:center;font-weight: bold;font-size:13px;',
//                                                    enableKeyEvents: true,
//                                                    enforceMaxLength: true,
//                                                    maxLength: 10, width: 250, height: 26,
//                                                    maskRe: /[0-9]/,
//                                                    listeners: {
//                                                        keypress: 'onTextKeypress'
//                                                    }
//                                                }
//                                            ]
//                                        },
//                                        // </editor-fold>
//
//                                        // <editor-fold defaultstate="collapsed" desc="box:ID REFERENCE NBR">
//                                        {
//                                            xtype: 'panel',
//                                            id: prototype.id2 + '-BoxIdReferenceNbr',
//                                            border: false,
//                                            hidden: true,
//                                            layout: 'hbox',
//                                            bodyStyle: 'background: transparent;"',
//                                            margin: '3 0',
//                                            defaults: {
//                                                anchor: '100%',
//                                                padding: '4 0'
//                                            },
//                                            items: [
//                                                {
//                                                    xtype: 'textfield',
//                                                    id: prototype.id2 + '-A4308IDISS-Filter',
//                                                    fieldLabel: 'Id Reference', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 120,
//                                                    fieldStyle: 'text-align:center;font-weight: bold;font-size:13px;',
//                                                    enableKeyEvents: true,
//                                                    enforceMaxLength: true,
//                                                    maxLength: 10, width: 250, height: 26,
//                                                    maskRe: /[0-9]/,
//                                                    listeners: {
//                                                        keypress: 'onTextKeypress'
//                                                    }
//                                                }
//                                            ]
//                                        }
//                                        // </editor-fold>
//                                    ]
//                                },
//                                {xtype: 'tbspacer', width: '100px'},
//                                {
//                                    xtype: 'panel',
//                                    padding: 3,
//                                    layout: {
//                                        type: 'hbox'
//                                    },
//                                    items: [
//                                        {
//                                            xtype: 'toolbar',
//                                            items: [
//                                                {
//                                                    xtype: 'button',
//                                                    id: prototype.id2 + '-btnSearch',
//                                                    iconCls: 'prx-icon-search',
//                                                    tooltip: 'Search', text:'Search',
//                                                    listeners: {
//                                                        click: 'btnSearchDetalleClick'
//                                                    }
//                                                }
//                                            ]
//                                        }
//                                    ]
//                                },
//                                {xtype: 'tbspacer', width: '20px'}
//                            ]
//                        },
                        {
                           xtype: prototype.id2 + '-infoDetail'
                        }
                    ]
                }
                // </editor-fold>
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            border: true,
            ui: 'footer',
            margin: '5 5 10 10', // left/right/top/botton
            defaults: {
                scale: 'medium'
            },
            style: 'aling:center padding: 5px;',
            items: [
                {
                    text: 'Close',
                    id: prototype.id2 + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]

});