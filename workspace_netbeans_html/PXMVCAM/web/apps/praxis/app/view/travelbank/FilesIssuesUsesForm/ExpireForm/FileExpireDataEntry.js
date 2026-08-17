Ext.define('Ext.Praxis.view.travelbank.FilesIssuesUsesForm.ExpireForm.FileExpireDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.FileExpireDataEntryForm',
    controller: 'FileExpireDataEntryController',
    requires: [
        'Ext.Praxis.controller.travelbank.FilesIssuesUses.FileExpireDataEntryController',
        'Ext.Praxis.view.travelbank.FilesIssuesUsesForm.ExpireForm.InfoDetail'
    ],
    title: 'EXPIRE - View detail',
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
            id: prototype.id12 + '-formDataEntry',
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
                                            id: prototype.id12 + '-A4307PRDA',
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
                                            id: prototype.id12 + '-A4307MDA',
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
                                            id: prototype.id12 + '-A4307TIP',
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
                                            id: prototype.id12 + '-A4307TRX2',
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
                                            id: prototype.id12 + '-A4307TOT',
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
                                            id: prototype.id12 + '-A4307IDFIL',
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
                                            id: prototype.id12 + '-A4307TYPE',
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
                                            id: prototype.id12 + '-A4307STS2',
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
                                            id: prototype.id12 + '-A4307STS',
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
                                            id: prototype.id12 + '-A4307PCONT',
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
                                            id: prototype.id12 + '-A4307FCONT',
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
                                            id: prototype.id12 + '-A4307REGIS',
                                            fieldLabel: 'Created by', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 75, padding: 2,
                                            readOnly: false,
                                            width: 150
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id12 + '-A4307FREGI',
                                            fieldLabel: 'Date', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 40, padding: 2,
                                            readOnly: false,
                                            width: 110
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id12 + '-A4307HREGI',
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
                                            id: prototype.id12 + '-A4307REVIS',
                                            fieldLabel: 'Modified by', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 75, padding: 2,
                                            readOnly: false,
                                            width: 150
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id12 + '-A4307FREVI',
                                            fieldLabel: 'Date', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 40, padding: 2,
                                            readOnly: false,
                                            width: 110
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id12 + '-A4307HREVI',
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
            id: prototype.id12 + '-gridFileIssueDetail-Container',
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
                                    id: prototype.id12 + '-cmbfiltroDataEntry',
                                    fieldLabel: 'Filter by', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", "(ALL)"],
                                            ["1", "UNIQUE SERVICE CREDIT ID"],                                            
                                            ["2", "ID REFRENCE NUMBER"]
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
                                    id: prototype.id12 + '-BoxUniqueServiceCreditID',
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
                                            id: prototype.id12 + '-A4308IDEXP-Filter',
                                            fieldLabel: 'Credit ID ', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 120,
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
                                    id: prototype.id12 + '-BoxIdReferenceNbr',
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
                                            id: prototype.id12 + '-A4308IDISS-Filter',
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
                                            id: prototype.id12 + '-btnSearch',
                                            iconCls: 'prx-icon-search',
                                            tooltip: 'Search',
                                            listeners: {
                                                click: 'btnSearchDetalleClick'
                                            }
                                        },
                                        {
                                            xtype: 'button', disabled:true,
                                            id: prototype.id12 + '-btnAdd',
                                            iconCls: 'prx-icon-add',
                                            text: 'Add',
                                            listeners: {
                                                click: 'btnAdd_click'
                                            }
                                        }
                                    ]
                                }
                            ]
                        },{xtype: 'tbspacer', width: '20px'}
                    ]
                },
                {
                    xtype: prototype.id12 + '-infoDetail'
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
                    id: prototype.id12 + '-btn-save',
                    iconCls: 'prx-icon-save',
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update', disabled: true,
                    id: prototype.id12 + '-btn-update',
                    iconCls: 'prx-icon-update',
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Delete',
                    id: prototype.id12 + '-btn-delete',
                    iconCls: 'prx-icon-delete',
                    hidden: true,
                    listeners: {
                        click: 'onDeleteClick'
                    }
                },
                {
                    text: 'Close',
                    id: prototype.id12 + '-btn-cancel',
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