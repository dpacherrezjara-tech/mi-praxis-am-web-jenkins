Ext.define('Ext.Praxis.view.travelbank.FilesIssuesUsesForm.FormFileIssueDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.FormFileIssueDataEntryForm',
    controller: 'FormFileIssueDataEntryController',
    requires: [
        'Ext.Praxis.controller.travelbank.FilesIssuesUses.FormFileIssueDataEntryController',
        'Ext.Praxis.view.travelbank.FilesIssuesUsesForm.GridFileIssueDetail'
    ],
    title: 'ISSUES - View detail',
    header: true,
    height: 580,
    width: 950,
    border: false,
    resizable: false,
    layout: 'vbox',
    modal: true,
    defaults: {
        border: false,
        bodyStyle: 'background: #FFFFFF;"'
    },
    items: [
        {
            xtype: 'form',
            id: prototype.id + '-formDataEntry',
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
                            xtype: 'fieldset', height: 145,
                            title: 'HEADER DATA',
                            layout: 'vbox',
                            margin: '2 2 2 2',
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
                                            id: prototype.id + '-A4280PRDA',
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
                                            id: prototype.id + '-A4280MDA',
                                            fieldLabel: 'Currency', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 125,
                                            readOnly: false,
                                            width: 245
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
                                            id: prototype.id + '-A4280TIP',
                                            fieldLabel: 'Service type', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 125,
                                            readOnly: false,
                                            width: 245
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
                                            id: prototype.id + '-A4280XTRX2',
                                            fieldLabel: 'Transactions:', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 125,
                                            readOnly: false,
                                            width: 245
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
                                            id: prototype.id + '-A4280TOT',
                                            fieldLabel: 'Total amount:', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 125,
                                            readOnly: false,
                                            width: 245
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset', height: 145,
                            title: 'DELIVERY FILE',
                            layout: 'vbox',
                            margin: '2 2 2 2',
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
                                            id: prototype.id + '-A4280IDFILE',
                                            fieldLabel: 'Nbr. Identifier', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 125,
                                            readOnly: false,
                                            width: 245
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
                                            id: prototype.id + '-A4280TYPE',
                                            fieldLabel: 'File type', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 125,
                                            readOnly: false,
                                            width: 245
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
                                            id: prototype.id + '-A4280STS2',
                                            fieldLabel: 'Head Whitout Trx.', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 125,
                                            readOnly: false,
                                            width: 245
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
                                            id: prototype.id + '-A4280STS',
                                            fieldLabel: 'Final state', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 125,
                                            readOnly: false,
                                            width: 245
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset', height: 145,
                            title: 'ACCOUNTING DATA & AUDIT ',
                            layout: 'vbox',
                            margin: '2 2 2 2',
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
                                            id: prototype.id + '-A4280PCONT',
                                            fieldLabel: 'Period', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 125,
                                            readOnly: false,
                                            width: 245
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
                                            id: prototype.id + '-A4280FCONT',
                                            fieldLabel: 'Date', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 125,
                                            readOnly: false,
                                            width: 245
                                        }
                                    ]
                                },
                                {
                                    xtype: 'label',
                                    labelAlign: 'center',
                                    //padding: '2px 5px 2px 3px',
                                    html: '<strong style="color:#AC4546;font-size:13px;">Audit data</strong>'
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    //padding: 3,
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-A4280REGIS',
                                            fieldLabel: 'Created by', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 75, padding: 2,
                                            readOnly: false,
                                            width: 150
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-A4280FREGI',
                                            fieldLabel: 'Date', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 40, padding: 2,
                                            readOnly: false,
                                            width: 110
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-A4280HREGI',
                                            fieldLabel: 'Hr.', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 30, padding: 2,
                                            readOnly: false,
                                            width: 80
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    //padding: 3,
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-A4280REVIS',
                                            fieldLabel: 'Modified by', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 75, padding: 2,
                                            readOnly: false,
                                            width: 150
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-A4280FREVI',
                                            fieldLabel: 'Date', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 40, padding: 2,
                                            readOnly: false,
                                            width: 110
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-A4280HREVI',
                                            fieldLabel: 'Hr.', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 30, padding: 2,
                                            readOnly: false,
                                            width: 80
                                        }
                                    ]
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
            width: '100%', border: false,
            items: [
                {
                    xtype: 'panel', width: '100%', border: false,
                    items: [
                        {
                            xtype: 'panel', border: false, hidden: false,
                            bodyStyle: 'background: transparent;"',
                            margin: '0 0',
                            layout: 'hbox',
                            defaults: {
                                anchor: '100%',
                                padding: '0 0'
                            },
                            items: [
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbfiltroDataEntry',
                                    fieldLabel: 'Filter by', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", "(Select)"],
                                            ["1", "UNIQUE SERVICE CREDIT ID"],
                                            ["2", "DOCUMENT NUMBER"],
                                            ["3", "ID REFRENCE NUMBER"]
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
                                // <editor-fold defaultstate="collapsed" desc="box:UNIQUE SERVICE CREDIT ID">
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-BoxUniqueServiceCreditID',
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
                                            xtype: 'textfield',
                                            id: prototype.id + '-A4281IDISS-Filter',
                                            fieldLabel: 'Nbr Credit ID ', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 120,
                                            fieldStyle: 'text-align:center;font-weight: bold;font-size:13px;',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 9, width: 250, height: 26,
                                            maskRe: /[0-9]/,
                                            listeners: {
                                                keypress: 'onTxtFilterKeypress'
                                            }
                                        }
                                    ]
                                },
                                // </editor-fold>
                                // <editor-fold defaultstate="collapsed" desc="box:Document number">
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-BoxDocumentNumber',
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
                                            id: prototype.id + '-DocumentTKT-Filter',
                                            fieldLabel: 'Document number ', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 130,
                                            fieldStyle: 'text-align:center;font-weight: bold;font-size:13px;',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 9, width: 250, height: 26,
                                            maskRe: /[0-9]/,
                                            listeners: {
                                                keypress: 'onTxtFilterKeypress'
                                            }
                                        }
                                    ]
                                },
                                // </editor-fold>
                                // <editor-fold defaultstate="collapsed" desc="box:ID REFERENCE NBR">
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-BoxIdReferenceNbr',
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
                                            id: prototype.id + '-A4281IDISR-Filter',
                                            fieldLabel: 'Id Reference', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 120,
                                            fieldStyle: 'text-align:center;font-weight: bold;font-size:13px;',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 9, width: 250, height: 26,
                                            maskRe: /[0-9]/,
                                            listeners: {
                                                keypress: 'onTxtFilterKeypress'
                                            }
                                        }
                                    ]
                                }
                                // </editor-fold>
                            ]
                        }
                    ]
                },
                {
                    xtype: prototype.id + '-gridFileIssueDetail'
                }
            ]
        }
        // </editor-fold>
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
                    text: 'Save', disabled: true,
                    id: prototype.id + '-btn-save',
                    iconCls: 'prx-icon-save',
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update', disabled: true,
                    id: prototype.id + '-btn-update',
                    iconCls: 'prx-icon-update',
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Delete',
                    id: prototype.id + '-btn-delete',
                    iconCls: 'prx-icon-delete',
                    hidden: true,
                    listeners: {
                        click: 'onDeleteClick'
                    }
                },
                {
                    text: 'Close',
                    id: prototype.id + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                },
                {
                    xtype: 'label',
                    labelAlign: 'center',
                    width: 150,
                    padding: '2px 5px 2px 3px',
                    html: '<strong style="color:#AC4546;font-size:13px;">(*)Required Fields</strong>'
                }
            ]
        }
    ]

});