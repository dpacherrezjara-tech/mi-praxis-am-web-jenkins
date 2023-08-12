Ext.define('Ext.Praxis.view.travelbank.FilesIssuesUsesForm.MergeForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id17 + '-filters',
    border: false,
    bodyStyle: 'background-color: #E3EAF9;',
    margin: '2 0 2 0 ',
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
                    id: prototype.id17 + '-boxSearchFilter',
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
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background-color: #E3EAF9;',
                            items: [
                                {
                                    xtype: 'panel',
                                    border: false,
                                    hidden: false,
                                    bodyStyle: 'background: transparent;"',
                                    margin: '3 0',
                                    defaults: {
                                        anchor: '100%',
                                        padding: '4 0'
                                    },
                                    items: [
                                        {
                                            xtype: 'combo',
                                            id: prototype.id17 + '-cmbfiltro',
                                            fieldLabel: 'Filter by', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            //labelWidth: 120,
                                            store: new Ext.data.SimpleStore({
                                                fields: ['code', 'name'],
                                                data: [
                                                    ["", "(Select)"],
                                                    ["1", "Merge From"],
                                                    ["2", "Merge To"],
                                                    ["3", "Trasmission Date"],
                                                    ["4", "Accounting Date"],
                                                    ["5", "Accounting Period"],
                                                    ["6", "Number Identifier"]
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
                                            width: 300,
                                            height: 26,
                                            value: "3",
                                            //listConfig: {maxHeight: 111},
                                            enableKeyEvents: true,
                                            padding: '4 0',
                                            listeners: {
                                                change: 'onMostrarFiltrosChange'
                                            }
                                        }
                                    ]
                                },
                                // <editor-fold defaultstate="collapsed" desc="Merge-from">
                                {
                                    xtype: 'panel',
                                    id: prototype.id17 + '-BoxMergefrom',
                                    border: false,
                                    hidden: true,
                                    layout: 'hbox',
                                    bodyStyle: 'background: transparent;"',
                                    margin: '3 0',
                                    defaults: {
                                        anchor: '100%',
                                        padding: '4 0'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id17 + '-NCTAF',
                                            fieldLabel: 'Cta. From ', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 120,
                                            fieldStyle: 'text-align:center;font-weight: bold;font-size:13px;',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 20,
                                            width: 280,
                                            height: 26,
                                            maskRe: /[0-9]/,
                                            value: '',
                                            //maskRe:/[1234567890\.]/, NUMERO CON DECIMAL
                                            listeners: {
                                                keypress: 'onTextKeypress'
                                            }
                                        }
                                    ]
                                },
                                // </editor-fold>
                                // <editor-fold defaultstate="collapsed" desc="Merge-to">
                                {
                                    xtype: 'panel',
                                    id: prototype.id17 + '-BoxMergeTo',
                                    border: false,
                                    hidden: true,
                                    layout: 'hbox',
                                    bodyStyle: 'background: transparent;"',
                                    margin: '3 0',
                                    defaults: {
                                        anchor: '100%',
                                        padding: '4 0'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id17 + '-NCTAT',
                                            fieldLabel: 'Cta. To ', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 120,
                                            fieldStyle: 'text-align:center;font-weight: bold;font-size:13px;',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 20,
                                            width: 280,
                                            height: 26,
                                            maskRe: /[0-9]/,
                                            value: '',
                                            //maskRe:/[1234567890\.]/, NUMERO CON DECIMAL
                                            listeners: {
                                                keypress: 'onTextKeypress'
                                            }
                                        }                                       
                                    ]
                                },
                                // </editor-fold>
                                // <editor-fold defaultstate="collapsed" desc="Number-Identifier">
                                {
                                    xtype: 'panel',
                                    id: prototype.id17 + '-BoxNumberIdentifier',
                                    border: false,
                                    hidden: true,
                                    layout: 'hbox',
                                    bodyStyle: 'background: transparent;"',
                                    margin: '3 0',
                                    defaults: {
                                        anchor: '100%',
                                        padding: '4 0'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id17 + '-IDFILE1',
                                            fieldLabel: 'Id number From ', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 120,
                                            fieldStyle: 'text-align:center;font-weight: bold;font-size:13px;',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 9,
                                            width: 215,
                                            height: 26,
                                            maskRe: /[0-9]/,
                                            value: '',
                                            //maskRe:/[1234567890\.]/, NUMERO CON DECIMAL
                                            listeners: {
                                                keypress: 'onTextKeypress'                                             
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id17 + '-IDFILE2',
                                            fieldLabel: 'To', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 30,
                                            fieldStyle: 'text-align:center;font-weight: bold;font-size:13px;',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 9,
                                            width: 130,
                                            height: 26,
                                            maskRe: /[0-9]/,
                                            value: '',
                                            //maskRe:/[1234567890\.]/, NUMERO CON DECIMAL
                                            listeners: {
                                                keypress: 'onTextKeypress'
                                            }
                                        }
                                    ]
                                },                                
                                // </editor-fold>                                
                                // <editor-fold defaultstate="collapsed" desc="Desde-Hasta">
                                {
                                    xtype: 'panel',
                                    id: prototype.id17 + '-BoxDesdeHasta',
                                    border: false,
                                    hidden: false,
                                    layout: 'hbox',
                                    bodyStyle: 'background: transparent;"',
                                    margin: '3 0',
                                    defaults: {
                                        anchor: '100%',
                                        padding: '4 0'
                                    },
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            id: prototype.id17 + '-fecha1',
                                            fieldLabel: 'Date from', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            //labelWidth: 125,
                                            width: 200,
                                            height: 26,
                                            format: 'Ymd',
                                            //formatText: '',
                                            //invalidText: 'Type the date in the format: YYYY/MM/DD',
                                            value:'20221001',
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
                                                        Ext.getCmp(prototype.id11 + '-fecha2').focus();
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.id17 + '-fecha2',
                                            fieldLabel: 'To', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 30,
                                            width: 130,
                                            height: 26,
                                            format: 'Ymd', value:new Date(),
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
});