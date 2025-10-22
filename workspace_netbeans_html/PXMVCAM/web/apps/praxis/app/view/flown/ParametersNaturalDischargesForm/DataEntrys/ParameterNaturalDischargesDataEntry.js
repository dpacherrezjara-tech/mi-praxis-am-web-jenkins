prototype.idPND = prototype.idPND + '-ParameterNaturalDischargesDataEntry';

Ext.define('Ext.Praxis.view.flown.ParametersNaturalDischargesForm.DataEntrys.ParameterNaturalDischargesDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.ParameterNaturalDischargesDataEntry',
    requires: [
        'Ext.Praxis.controller.flown.ParametersNaturalDischarges.ParameterNaturalDischargesDataEntryController'
    ],
    
    controller: 'ParameterNaturalDischargesDataEntryController',
    title: 'Parameter Natural - Form',
    header: true,
    width: 600,
    resizable: false,
    layout: 'vbox',
    modal: true,
    border: false,
    bodyStyle: 'background: #ffffff;',
    defaults: {
        border: false
    },
    items: [
        
        //<editor-fold defaultstate="collapsed" desc="Detail">
        {
            xtype: 'panel',
            layout: 'hbox',
            width: '100%',
            margin: '5',
            
            items: [
                {
                    xtype: 'form',
                    id: prototype.idPND + '-formDataDetail',
                    layout: 'vbox',
                    width: '100%',
                    margin: '2',
                    
                    items: [
                       {
                            xtype: 'panel',
                            layout: 'hbox',
                            margin: '5 0 3 0',
                            border: false,
                            items: [
                                {
                                    xtype: 'textfield',

                                    name: 'A4807CPARM',
                                    maxLength: 10,
                                    fieldLabel: 'Code parameter', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                    tooltip: 'This field is requerid',
                                    labelWidth: 125,
                                    width: 245,
                                    allowBlank: false,
                                    invalidText: 'Code Parameter is Requerid',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    listeners: {
                                        change: 'onUpperValue',
                                        keypress: function (obj, e) {
                                            if (e.getKey() === e.ENTER) {
                                                Ext.getCmp(prototype.idPND + '-A4807DESCR').focus();
                                            }
                                        },
                                        render: function (field) {
                                            Ext.tip.QuickTipManager.register({
                                                target: field.getEl(),
                                                text: 'This field is required'
                                            });
                                        }
                                    }
                                },
                                {
                                    xtype: 'label',
                                    labelAlign: 'left',
                                    width: 200,
                                    padding: '2px 5px 2px 3px',
                                    html: '<strong style="color:#AC4546;font-size:12px;">(*)</strong>'
                                }
                            ]
                        }, 
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            margin: '3 0 3 0',
                            border: false,
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.idPND + '-A4807DESCR',
                                    name: 'A4807DESCR',
                                    maxLength: 80,
                                    fieldLabel: 'Description', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 125,
                                    width: 475,
                                    allowBlank: false,
                                    invalidText: 'Description is Requerid',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    listeners: {
                                        change: 'onUpperValue',
                                        keypress: function (obj, e) {
                                            if (e.getKey() === e.ENTER) {
                                                Ext.getCmp(prototype.idPND + '-A4807APLIC').focus();
                                            }
                                        },
                                        render: function (field) {
                                            Ext.tip.QuickTipManager.register({
                                                target: field.getEl(),
                                                text: 'This field is required'
                                            });
                                        }
                                    }
                                },
                                {
                                    xtype: 'label',
                                    labelAlign: 'left',
                                    width: 40,
                                    padding: '2px 5px 2px 3px',
                                    html: '<strong style="color:#AC4546;font-size:12px;">(*)</strong>'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            margin: '3 0 3 0',
                            border: false,
                            items: [
                                {
                                    xtype: 'combo',
                                    id: prototype.idPND + '-A4807APLIC',
                                    name: 'A4807APLIC',
                                    fieldLabel: 'Apply', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 125,
                                    width: 225,
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["Y", "YES"],
                                            ["N", "NO"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    editable: false,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    value: "Y",
                                    enableKeyEvents: true
                                },
                                {
                                    xtype: 'label',
                                    labelAlign: 'left',
                                    width: 200,
                                    padding: '2px 5px 2px 3px',
                                    html: '<strong style="color:#AC4546;font-size:12px;">(*)</strong>'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            margin: '3 0 3 0',
                            border: false,
                            items: [
                                {
                                    xtype: 'numberfield',
                                    name: 'A4807ORDEN',
                                    fieldLabel: 'Order', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 125,
                                    width: 190,
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 4,
                                    allowDecimals: false,   // solo enteros
                                    allowNegative: false    // no negativos
                                },
                                {
                                    xtype: 'label',
                                    labelAlign: 'left',
                                    width: 150,
                                    hidden: true,
                                    padding: '2px 5px 2px 3px',
                                    html: '<strong style="color:#AC4546;font-size:12px;">(Order Parameter)</strong>'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '3 0 3 0',
                            border: false,
                            items: [
                                {
                                    xtype: 'combo',
                                    id: prototype.idPND + '-A4807TIPO1',
                                    name: 'A4807TIPO1',
                                    fieldLabel: 'Parametro 1', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 125,
                                    width: 250,
                                    padding: '0 5 0 0',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["X", "NOT APPLY"],
                                            ["S", "STRING"],
                                            ["D", "DATE"],
                                            ["N", "DECIMAL"],
                                            ["I", "INTEGER"],
                                            ["C", "CATALOG"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    editable: false,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    value: "X",
                                    enableKeyEvents: true,
                                    listeners: {
                                        //keypress: 'onTextKeypress',
                                        change: 'cmb_tipo1_clickHandler'
                                    }// 
                                },
                                //INPUT:STING
                                {
                                    xtype: 'textfield',
                                    id: prototype.idPND + '-A4807PARM1_S',
                                    name: 'A4807PARM1_S',
                                    fieldLabel: '', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 2,
                                    width: 300,
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 30,
                                    listeners: {
                                        change: 'onUpperValue',
                                        keypress: function (obj, e) {
                                            if (e.getKey() === e.ENTER) {
                                                Ext.getCmp(prototype.idPND + '-A4807PARM2').focus();
                                            }
                                        }
                                    }
                                },
                                //INPUT:DATE
                                {
                                    xtype: 'datefield',
                                    id: prototype.idPND + '-A4807PARM1_D',
                                    name: 'A4807PARM1_D',
                                    fieldLabel: '', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 2,
                                    width: 100,
                                    format: 'Ymd',
                                    invalidText: 'Date is invalid, date in format Ymd',
                                    minValue: new Date(1990, 00, 01),
                                    maskRe: /[0-9/]/,
                                    editable: true,
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 12,
                                    hidden: true,
                                    listeners: {
                                        keypress: function (obj, e) {
                                            if (e.getKey() === e.ENTER) {
                                                Ext.getCmp(prototype.idPND + '-A4807PARM2').focus();
                                            }
                                        }
                                    }
                                },
                                //INPUT:Numerico
                                {
                                    xtype: 'textfield',
                                    id: prototype.idPND + '-A4807PARM1_N',
                                    name: 'A4807PARM1_N',
                                    width: 99,
                                    labelWidth: 0,
                                    value: '0.00',
                                    hidden: true,
                                    fieldStyle: 'text-align:right',
                                    enableKeyEvents: true,
                                    maskRe: /[1234567890\.]/,
                                    listeners: {
                                        focus: 'onFocusNumberfield',
                                        //focusleave: '',
                                        keypress: function (obj, e) {
                                            if (e.getKey() === e.ENTER) {
                                                Ext.getCmp(prototype.idPND + '-A4807PARM2').focus();
                                            }
                                        }
                                    }
                                },
                                //INPUT:Integer
                                {
                                    xtype: 'numberfield',
                                    id: prototype.idPND + '-A4807PARM1_I',
                                    name: 'A4807PARM1_I',
                                    width: 80,
                                    labelWidth: 0,
                                    value: '0',
                                    fieldStyle: 'text-align:right',
                                    enableKeyEvents: true,
                                    decimalPrecision: 0,
                                    hidden: true,
                                    listeners: {
                                        focus: 'onFocusNumberfield',
                                        //focusleave: '',
                                        keypress: function (obj, e) {
                                            if (e.getKey() === e.ENTER) {
                                                Ext.getCmp(prototype.idPND + '-A4807PARM2').focus();
                                            }
                                        }
                                    }
                                }
                                
                            ]
                        },
                        
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '3 0 3 0',
                            border: false,
                            items: [
                                {
                                    xtype: 'combo',
                                    id: prototype.idPND + '-A4807TIPO2',
                                    name: "A4807TIPO2",
                                    fieldLabel: 'Parametro 2', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 125,
                                    width: 250,
                                    padding: '0 5 0 0',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["X", "NOT APPLY"],
                                            ["S", "STRING"],
                                            ["D", "DATE"],
                                            ["N", "DECIMAL"],
                                            ["I", "INTEGER"],
                                            ["C", "CATALOG"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    editable: false,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    value: "X",
                                    enableKeyEvents: true,
                                    listeners: {
                                        //keypress: 'onTextKeypress',
                                        change: 'cmb_tipo2_clickHandler'
                                    }// 
                                },
                                //INPUT:STING
                                {
                                    xtype: 'textfield',
                                    id: prototype.idPND + '-A4807PARM2_S',
                                    name: 'A4807PARM2_S',
                                    fieldLabel: '', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 2,
                                    width: 300,
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 30,
                                    listeners: {
                                        change: 'onUpperValue',
                                        keypress: function (obj, e) {
                                            if (e.getKey() === e.ENTER) {
                                                Ext.getCmp(prototype.idPND + '-A4807ARCHI').focus();
                                            }
                                        }
                                    }
                                },
                                //INPUT:DATE
                                {
                                    xtype: 'datefield',
                                    id: prototype.idPND + '-A4807PARM2_D',
                                    name: 'A4807PARM2_D',
                                    fieldLabel: '', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 2,
                                    width: 100,
                                    format: 'Ymd',
                                    invalidText: 'Date is invalid, date in format Ymd',
                                    minValue: new Date(1990, 00, 01),
                                    maskRe: /[0-9/]/,
                                    editable: true,
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 12,
                                    hidden: true,
                                    listeners: {
                                        keypress: function (obj, e) {
                                            if (e.getKey() === e.ENTER) {
                                                Ext.getCmp(prototype.idPND + '-A4807ARCHI').focus();
                                            }
                                        }
                                    }
                                },
                                //INPUT:Numerico
                                {
                                    xtype: 'textfield',
                                    id: prototype.idPND + '-A4807PARM2_N',
                                    name: 'A4807PARM2_N',
                                    width: 99,
                                    labelWidth: 0,
                                    value: '0.00',
                                    hidden: true,
                                    fieldStyle: 'text-align:right',
                                    enableKeyEvents: true,
                                    maskRe: /[1234567890\.]/,
                                    listeners: {
                                        focus: 'onFocusNumberfield',
                                        //focusleave: '',
                                        keypress: function (obj, e) {
                                            if (e.getKey() === e.ENTER) {
                                                Ext.getCmp(prototype.idPND + '-A4807ARCHI').focus();
                                            }
                                        }
                                    }
                                },
                                //INPUT:Integer
                                {
                                    xtype: 'numberfield',
                                    id: prototype.idPND + '-A4807PARM2_I',
                                    name: 'A4807PARM2_I',
                                    width: 80,
                                    labelWidth: 0,
                                    value: '0',
                                    fieldStyle: 'text-align:right',
                                    enableKeyEvents: true,
                                    decimalPrecision: 0,
                                    hidden: true,
                                    listeners: {
                                        focus: 'onFocusNumberfield',
                                        //focusleave: '',
                                        keypress: function (obj, e) {
                                            if (e.getKey() === e.ENTER) {
                                                Ext.getCmp(prototype.idPND + '-A4807ARCHI').focus();
                                            }
                                        }
                                    }
                                }
                            ]

                        },
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '3 0 3 0',
                            border: false,
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.idPND + '-A4807ARCHI',
                                    name: "A4807ARCHI",
                                    fieldLabel: 'Go To File', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 125,
                                    width: 300,
                                    padding: '0 6 0 0',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 10,
                                    listeners: {
                                        change: 'onUpperValue',
                                        keypress: function (obj, e) {
                                            if (e.getKey() === e.ENTER) {
                                                Ext.getCmp(prototype.idPND + '-A4807ESTAD').focus();
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '3 0 5 0',
                            border: false,
                            items: [
                                {
                                    xtype: 'combo',
                                    id: prototype.idPND + '-A4807ESTAD',
                                    name: "A4807ESTAD",
                                    fieldLabel: 'Estado', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 125,
                                    width: 225,
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["A", "ACTIVE"],
                                            ["D", "INACTIVE"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    editable: false,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    value: "A",
                                    enableKeyEvents: true
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        //</editor-fold>        
        //<editor-fold defaultstate="collapsed" desc="Control Data">
        {
            xtype: 'fieldset',
            id: prototype.idPND + '-fsControlData',
            title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:10px;">Control Data</span>',
            layout: {
                type: 'vbox',
                pack: 'center'
            },
            border: true,
            margin: '5 5 5 5',
            width: '100%',
            style: {
                backgroundColor: '#EEF3F9' // Cambiar el color de fondo a gris claro (#f0f0f0)
            },
            items: [
                {
                    xtype: 'form',
                    id: prototype.idPND + '-formControlData',
                    layout: {
                        type: 'vbox',
                        pack: 'center'
                    },
                    width: '100%',
                    margin: '0 0 5 0',
                    border: false,
                    bodyStyle: 'background: transparent',
                    defaults: {
                        xtype: 'panel',
                        layout: {
                            type: 'hbox',
                            pack: 'center'
                        },
                        width: '100%',
                        border: false,
                        bodyStyle: 'background: transparent',
                        defaults: {
                            xtype: 'textfield',
                            margin: '5 8 5 8',
                            labelStyle: 'text-align:left;font-weight: bolder;',
                            fieldStyle: 'text-align:center;',
                            editable: false
                        }
                    },
                    items: [
                        {
                            items: [
                                {
                                    labelWidth: 90,
                                    width: 175,
                                    fieldLabel: 'User Create',
                                    name: 'A4807USRIN'
                                },
                                {
                                    labelWidth: 90,
                                    width: 175,
                                    fieldLabel: 'Date Create',
                                    name: 'A4807FECIN'
                                },
                                {
                                    labelWidth: 90,
                                    width: 175,
                                    fieldLabel: 'Hour Create',
                                    name: 'A4807HORIN'
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    labelWidth: 90,
                                    width: 175,
                                    fieldLabel: 'User Update',
                                    name: 'A4807USRAC'
                                },
                                {
                                    labelWidth: 90,
                                    width: 175,
                                    fieldLabel: 'Date Update',
                                    name: 'A4807FECAC'
                                },
                                {
                                    labelWidth: 90,
                                    width: 175,
                                    fieldLabel: 'Hour Update',
                                    name: 'A4807HORAC'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
        //</editor-fold>
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            border: false,
            margin: '7 5 7 5',
            padding: '3 0 3 0',
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults: {
                scale: 'medium'
            },
            items: [
                {
                    text: 'Save',
                    id: prototype.idPND + '-btn-save',
                    tooltip: 'Save Paramater',
                    iconCls: 'prx-icon-save',
                    hidden: true,
                    listeners: {
                        click: 'onSyncClick'
                    }
                },
                {
                    text: 'Update',
                    id: prototype.idPND + '-btn-update',
                    tooltip: 'Update Paramater',
                    iconCls: 'prx-icon-reload',
                    hidden: true,
                    listeners: {
                        click: 'onSyncClick'
                    }
                },
//                {
//                    text: 'Delete',
//                    id: prototype.idPND + '-btn-delete',
//                    iconCls: 'prx-icon-delete',
//                    hidden: true,
//                    listeners: {
//                        click: 'onDeleteClick'
//                    }
//                },
                {
                    text: 'Cancel',
                    id: prototype.idPND + '-btn-cancel',
                    tooltip: 'Close Form',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});
