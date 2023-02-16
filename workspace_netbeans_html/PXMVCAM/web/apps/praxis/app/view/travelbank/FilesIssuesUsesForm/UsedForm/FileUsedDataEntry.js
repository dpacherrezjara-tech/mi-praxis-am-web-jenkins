Ext.define('Ext.Praxis.view.travelbank.FilesIssuesUsesForm.UsedForm.FileUsedDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.FileUsedDataEntryForm',
    controller: 'FileUsedDataEntryController',
    requires: [
        'Ext.Praxis.controller.travelbank.FilesIssuesUses.FileUsedDataEntryController',
        'Ext.Praxis.view.travelbank.FilesIssuesUsesForm.UsedForm.InfoDetail'
    ],
    title: 'USED FILE',
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
            id: prototype.id07 + '-formDataEntry',
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
                                            id: prototype.id07 + '-A4282PRDA',
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
                                            id: prototype.id07 + '-A4282MDA',
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
                                            id: prototype.id07 + '-A4282TIP',
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
                                            id: prototype.id07 + '-A4282TRX2',
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
                                            id: prototype.id07 + '-A4282TOT',
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
                                            id: prototype.id07 + '-A4282IDFIL',
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
                                            id: prototype.id07 + '-A4282TYPE',
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
                                            id: prototype.id07 + '-A4282STS2',
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
                                            id: prototype.id07 + '-A4282STS',
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
                                            id: prototype.id07 + '-A4282PCONT',
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
                                            id: prototype.id07 + '-A4282FCONT',
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
                                            id: prototype.id07 + '-A4282REGIS',
                                            fieldLabel: 'Created by', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 75, padding: 2,
                                            readOnly: false,
                                            width: 150
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id07 + '-A4282FREGI',
                                            fieldLabel: 'Date', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 40, padding: 2,
                                            readOnly: false,
                                            width: 110
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id07 + '-A4282HREGI',
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
                                            id: prototype.id07 + '-A4282REVIS',
                                            fieldLabel: 'Modified by', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 75, padding: 2,
                                            readOnly: false,
                                            width: 150
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id07 + '-A4282FREVI',
                                            fieldLabel: 'Date', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 40, padding: 2,
                                            readOnly: false,
                                            width: 110
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id07 + '-A4282HREVI',
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
            id: prototype.id07 + '-gridFileIssueDetail-Container',
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
                                    id: prototype.id07 + '-cmbfiltroDataEntry',
                                    fieldLabel: 'Filter by', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", "(Select)"],
                                            ["1", "Transaction ID"],
                                            ["2", "Ticket Number"],
                                            ["3", "Account Number"],
                                            ["4", "Unique Service Credit ID"]
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
                                    id: prototype.id07 + '-BoxTransactionID',
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
                                            id: prototype.id07 + '-A4283IDUSE-Filter',
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
                                    id: prototype.id07 + '-BoxDocumentNumber',
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
                                            id: prototype.id07 + '-DocumentTKT-Filter',
                                            fieldLabel: 'Document number ', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 130,
                                            fieldStyle: 'text-align:center;font-weight: bold;font-size:13px;',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 13, width: 250, height: 26,
                                            maskRe: /[0-9]/,
                                            listeners: {
                                                keypress: 'onTextKeypress'
                                            }
                                        }
                                    ]
                                },
                                // </editor-fold>
                                // <editor-fold defaultstate="collapsed" desc="box:Account Number">
                                {
                                    xtype: 'panel',
                                    id: prototype.id07 + '-BoxAccountNumber',
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
                                            id: prototype.id07 + '-A4283NCTA-Filter',
                                            fieldLabel: 'Account Number', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 120,
                                            fieldStyle: 'text-align:center;font-weight: bold;font-size:13px;',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 20, width: 250, height: 26,
                                            maskRe: /[0-9]/,
                                            listeners: {
                                                keypress: 'onTextKeypress'
                                            }
                                        }
                                    ]
                                },
                                // </editor-fold>
                                // <editor-fold defaultstate="collapsed" desc="box:Unique Service Credit ID">
                                {
                                    xtype: 'panel',
                                    id: prototype.id07 + '-BoxUniqueServiceCreditID',
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
                                            id: prototype.id07 + '-A4283IDISS-Filter',
                                            fieldLabel: 'Uniq. Service Credit ID', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 120,
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
                                            id: prototype.id07 + '-btnSearch',
                                            iconCls: 'prx-icon-search',
                                            tooltip: 'Search',
                                            listeners: {
                                                click: 'btnSearchDetalleClick'
                                            }
                                        },
                                        {
                                            xtype: 'button', hidden:true,
                                            id: prototype.id07 + '-btnAdd',
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
                    xtype: prototype.id07 + '-infoDetail'
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
                    id: prototype.id07 + '-btn-save',
                    iconCls: 'prx-icon-save',
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update', disabled: true,
                    id: prototype.id07 + '-btn-update',
                    iconCls: 'prx-icon-update',
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Delete',
                    id: prototype.id07 + '-btn-delete',
                    iconCls: 'prx-icon-delete',
                    hidden: true,
                    listeners: {
                        click: 'onDeleteClick'
                    }
                },
                {
                    text: 'Close',
                    id: prototype.id07 + '-btn-cancel',
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