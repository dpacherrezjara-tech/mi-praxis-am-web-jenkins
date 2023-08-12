Ext.define('Ext.Praxis.view.travelbank.FilesIssuesUsesForm.IssueForm.FormFileIssueDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.FormFileIssueDataEntryForm',
    controller: 'FormFileIssueDataEntryController',
    requires: [
        'Ext.Praxis.controller.travelbank.FilesIssuesUses.FormFileIssueDataEntryController',
        'Ext.Praxis.view.travelbank.FilesIssuesUsesForm.IssueForm.GridFileIssueDetail'
    ],
    title: 'ISSUES - View detail',
    header: true,
    height: 600,
    width: 950,
    border: false,
    resizable: false,
    layout: 'vbox',
    modal: true,
    defaults: {
        border: false,
        bodyStyle: 'background: #FFFFFF;'
    },
    items: [
        {
            xtype: 'form',
            id: prototype.id03 + '-formDataEntry',
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
                                            id: prototype.id03 + '-A4280PRDA',
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
                                            id: prototype.id03 + '-A4280MDA',
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
                                            id: prototype.id03 + '-A4280TIP',
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
                                            id: prototype.id03 + '-A4280TRX2',
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
                                            id: prototype.id03 + '-A4280TOT',
                                            fieldLabel: 'Total amount:', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 125, fieldStyle: 'text-align:right',
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
                                            id: prototype.id03 + '-A4280IDFIL',
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
                                            id: prototype.id03 + '-A4280TYPE',
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
                                            id: prototype.id03 + '-A4280STS2',
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
                                            id: prototype.id03 + '-A4280STS',
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
                                            id: prototype.id03 + '-A4280PCONT',
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
                                            id: prototype.id03 + '-A4280FCONT',
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
                                            id: prototype.id03 + '-A4280REGIS',
                                            fieldLabel: 'Created by', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 75, padding: 2,
                                            readOnly: false,
                                            width: 150
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id03 + '-A4280FREGI',
                                            fieldLabel: 'Date', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 40, padding: 2,
                                            readOnly: false,
                                            width: 110
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id03 + '-A4280HREGI',
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
                                            id: prototype.id03 + '-A4280REVIS',
                                            fieldLabel: 'Modified by', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 75, padding: 2,
                                            readOnly: false,
                                            width: 150
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id03 + '-A4280FREVI',
                                            fieldLabel: 'Date', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 40, padding: 2,
                                            readOnly: false,
                                            width: 110
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id03 + '-A4280HREVI',
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
            id: prototype.id03 + '-gridFileIssueDetail-Container',
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
//                                pack: 'start'
                            },
                            defaults: {
                                anchor: '100%',
                                padding: '0 0'
                            },
                            items: [
                                {
                                    xtype: 'combo',
                                    id: prototype.id03 + '-cmbfiltroDataEntry',
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
                                    id: prototype.id03 + '-BoxUniqueServiceCreditID',
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
                                            id: prototype.id03 + '-A4281IDISS-Filter',
                                            fieldLabel: 'Nbr Credit ID ', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 120,
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
                                    id: prototype.id03 + '-BoxDocumentNumber',
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
                                            id: prototype.id03 + '-DocumentTKT-Filter',
                                            fieldLabel: 'Document number ', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 130,
                                            fieldStyle: 'text-align:center;font-weight: bold;font-size:13px;',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength:13, width: 250, height: 26,
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
                                    id: prototype.id03 + '-BoxIdReferenceNbr',
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
                                            id: prototype.id03 + '-A4281IDISR-Filter',
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
//                                pack: 'end'
                            },
                            items: [
                                {
                                    xtype: 'toolbar',
                                    items: [
                                        {
                                            xtype: 'button',
                                            id: prototype.id03 + '-btnSearch',
                                            iconCls: 'prx-icon-search',
                                            tooltip: 'Search',
                                            listeners: {
                                                click: 'btnSearchDetalleClick'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            id: prototype.id03 + '-btnAdd',
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
                    xtype: prototype.id03 + '-gridFileIssueDetail'
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
                    id: prototype.id03 + '-btn-save',
                    iconCls: 'prx-icon-save',
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update', disabled: true,
                    id: prototype.id03 + '-btn-update',
                    iconCls: 'prx-icon-update',
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Delete',
                    id: prototype.id03 + '-btn-delete',
                    iconCls: 'prx-icon-delete',
                    hidden: true,
                    listeners: {
                        click: 'onDeleteClick'
                    }
                },
                {
                    text: 'Close',
                    id: prototype.id03 + '-btn-cancel',
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