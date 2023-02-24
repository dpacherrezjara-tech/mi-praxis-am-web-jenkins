
Ext.define('Ext.Praxis.view.travelbank.FilesIssuesUsesForm.MergeForm.FileMergeDataEntryDetail', {
    extend: 'Ext.window.Window',
    alias: 'widget.FileMergeDataEntryDetailForm',
    controller: 'FileMergeDataEntryDetailController',
    requires: [
        'Ext.Praxis.controller.travelbank.FilesIssuesUses.FileMergeDataEntryDetailController',
        'Ext.Praxis.view.travelbank.FilesIssuesUsesForm.MergeForm.InfoDetail'
    ],
    title: 'MERGE - View detail',
    header: true,
    height: 600,
    width: 950,
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
            id: prototype.id19 + '-formDataEntry',
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            items: [
                                {
                                    xtype: 'fieldset',
                                    title: 'Merge information',
                                    layout: 'vbox',
                                    margin: '2 2 2 2',
                                    padding: 2,
                                    width: 900,
                                    border: true,
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'column',
                                            margin: '1 0 1 0',
                                            border: false,
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id19 + '-NCTA',
                                                    fieldLabel: 'Account Number:', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                                    labelWidth: 125,
                                                    readOnly: false,
                                                    width: 245
                                                },                                                
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id19 + '-VBAL',
                                                    fieldLabel: 'Balance:', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                                    labelWidth: 100, fieldStyle: 'text-align:right',
                                                    readOnly: false,
                                                    width: 220
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id19 + '-MDA',
                                                    fieldLabel: 'Curr.', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                                    labelWidth: 70, fieldStyle: 'text-align:center',
                                                    readOnly: false,
                                                    width: 150
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
                                                    xtype: 'datefield',
                                                    id: prototype.id19 + '-PRDA',
                                                    fieldLabel: 'Transmission date', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 125,
                                                    width: 245,
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
                                                    id: prototype.id19 + '-TRAN',
                                                    fieldLabel: 'Trx.', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                                    labelWidth: 100, fieldStyle: 'text-align:center',
                                                    readOnly: false,
                                                    width: 220
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
                                    width: 920, border: false,
                                    id: prototype.id19 + '-gridFileIssueDetail-Container',
                                    items: [
                                        {
                                            xtype: 'panel', width: '100%', border: false,
                                            layout: {
                                                type: 'hbox',
                                                pack: 'end'
                                            },
                                            items: [
                                                {
                                                    xtype: 'panel', border: false, hidden: false,
                                                    bodyStyle: 'background: transparent;',
                                                    margin: '0 0',
                                                    layout: {
                                                        type: 'hbox'
                                                    },
                                                    defaults: {
                                                        anchor: '100%',
                                                        padding: '0 0'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'combo',
                                                            id: prototype.id19 + '-cmbfiltroDataEntry',
                                                            hidden: true, //por ahora no hay filtros
                                                            fieldLabel: 'Filter by', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                                            store: new Ext.data.SimpleStore({
                                                                fields: ['code', 'name'],
                                                                data: [
                                                                    ["", "(Select)"],
                                                                    ["1", "Transaction ID"],
                                                                    ["2", "Document Number"],
                                                                    ["3", "Account Number"]
                                                                            // ["4", "Unique Service Credit ID"]
                                                                ]
                                                            }),
                                                            queryMode: 'local',
                                                            triggerAction: 'all',
                                                            autoSelect: false,
                                                            forceSelection: true,
                                                            caseSensitive: false,
                                                            editable: true,
                                                            typeAhead: true,
                                                            valueField: 'code', displayField: 'name', width: 300, height: 26,
                                                            value: "", enableKeyEvents: true,
                                                            padding: '4 0',
                                                            listeners: {
                                                                change: 'onMostrarFiltrosChangeDataEntry'
                                                            }
                                                        },
                                                        // <editor-fold defaultstate="collapsed" desc="box:Transaction ID ">
                                                        {
                                                            xtype: 'panel',
                                                            id: prototype.id19 + '-BoxUniqueServiceCreditID',
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
                                                                    id: prototype.id19 + '-A4283IDUSE-Filter',
                                                                    fieldLabel: 'Transaction ID', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 120,
                                                                    fieldStyle: 'text-align:center;font-weight: bold;font-size:13px;',
                                                                    enableKeyEvents: true,
                                                                    enforceMaxLength: true,
                                                                    maxLength: 10, width: 250, height: 26,
                                                                    maskRe: /[0-9]/,
                                                                    listeners: {
                                                                        keypress: 'onTextKeypress'
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        // </editor-fold>
                                                        // <editor-fold defaultstate="collapsed" desc="box:Document number">
                                                        {
                                                            xtype: 'panel',
                                                            id: prototype.id19 + '-BoxDocumentNumber',
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
                                                                    id: prototype.id19 + '-DocumentTKT-Filter',
                                                                    fieldLabel: 'Document number ', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 130,
                                                                    fieldStyle: 'text-align:center;font-weight: bold;font-size:13px;',
                                                                    enableKeyEvents: true,
                                                                    enforceMaxLength: true,
                                                                    maxLength: 9, width: 250, height: 26,
                                                                    maskRe: /[0-9]/,
                                                                    listeners: {
                                                                        keypress: 'onTextKeypress'
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        // </editor-fold>
                                                        // <editor-fold defaultstate="collapsed" desc="box:ID REFERENCE NBR">
                                                        {
                                                            xtype: 'panel',
                                                            id: prototype.id19 + '-BoxIdReferenceNbr',
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
                                                                    id: prototype.id19 + '-A4283NCTA-Filter',
                                                                    fieldLabel: 'Account Number', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 120,
                                                                    fieldStyle: 'text-align:center;font-weight: bold;font-size:13px;',
                                                                    enableKeyEvents: true,
                                                                    enforceMaxLength: true,
                                                                    maxLength: 10, width: 250, height: 26,
                                                                    maskRe: /[0-9]/,
                                                                    listeners: {
                                                                        keypress: 'onTextKeypress'
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        // </editor-fold>
                                                        // <editor-fold defaultstate="collapsed" desc="box:ID REFERENCE NBR">
                                                        {
                                                            xtype: 'panel',
                                                            id: prototype.id19 + '-BoxUniqueServiceCreditID',
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
                                                                    id: prototype.id19 + '-A4283IDISS-Filter',
                                                                    fieldLabel: 'Id Reference', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 120,
                                                                    fieldStyle: 'text-align:center;font-weight: bold;font-size:13px;',
                                                                    enableKeyEvents: true,
                                                                    enforceMaxLength: true,
                                                                    maxLength: 10, width: 250, height: 26,
                                                                    maskRe: /[0-9]/,
                                                                    listeners: {
                                                                        keypress: 'onTextKeypress'
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                        // </editor-fold>
                                                    ]
                                                },
                                                {xtype: 'tbspacer', width: '100px'},
                                                {
                                                    xtype: 'panel',
                                                    padding: 3,
                                                    layout: {
                                                        type: 'hbox'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'toolbar',
                                                            items: [
                                                                {
                                                                    xtype: 'button', hidden: true,
                                                                    id: prototype.id19 + '-btnSearch',
                                                                    iconCls: 'prx-icon-search',
                                                                    tooltip: 'Search',
                                                                    listeners: {
                                                                        click: 'btnSearchDetalleClick'
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'button', disabled: true,
                                                                    id: prototype.id19 + '-btnAdd',
                                                                    iconCls: 'prx-icon-add',
                                                                    text: 'Add',
                                                                    listeners: {
                                                                        click: 'btnAdd_click'
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: prototype.id19 + '-infoDetail'
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
                    id: prototype.id19 + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]

});