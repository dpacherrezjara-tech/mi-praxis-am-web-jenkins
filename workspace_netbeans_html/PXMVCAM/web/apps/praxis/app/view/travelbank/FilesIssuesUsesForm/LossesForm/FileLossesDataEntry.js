Ext.define('Ext.Praxis.view.travelbank.FilesIssuesUsesForm.LossesForm.FileLossesDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.FileLossesDataEntryForm',
    controller: 'FileLossesDataEntryController',
    requires: [
        'Ext.Praxis.controller.travelbank.FilesIssuesUses.FileLossesDataEntryController'
    ],
    title: 'LOSSES - Data entry detail',
    header: true,
    height: 450,
    width: 520,
    border: false,
    resizable: false,
    layout: 'fit',
    modal: true,
    defaults: {
        border: false,
        bodyStyle: 'background: #FFFFFF;"'
    },
    items: [
        {
            xtype: 'form',
            id: prototype.id16 + '-formDataEntry',
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'fieldset',
                            layout: 'vbox',
                            margin: '2 2 2 2',
                            width: '100%',
                            border: true,
                            padding: 2,
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id16 + '-A4347IDLOS',
                                            fieldLabel: 'Transaction ID', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 125, fieldStyle: 'text-align:center;font-size:14px',
                                            readOnly: false,
                                            width: 245
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id16 + '-A4347TRNCU',
                                            fieldLabel: 'Transacction', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 120, fieldStyle: 'text-align:center;font-size:13px',
                                            readOnly: false,
                                            width: 190
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
                                            id: prototype.id16 + '-A4347NCTA',
                                            fieldLabel: 'Account Number', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 125, fieldStyle: 'font-size:13px',
                                            readOnly: false,
                                            width: 280
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
                                            id: prototype.id16 + '-A4347MDA',
                                            fieldLabel: 'Curr.', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 125, fieldStyle: 'font-size:13px',
                                            readOnly: false,
                                            width: 200
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
                                            id: prototype.id16 + '-A4347RFORI',
                                            fieldLabel: 'Void Refund Original Amount:', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 125, fieldStyle: 'text-align:right;font-size:13px',
                                            readOnly: false,
                                            width: 245
                                        }
//                                        {
//                                            xtype: 'textfield',
//                                            id: prototype.id16 + '-A4308MDA',
//                                            fieldLabel: 'Currency:', labelAlign: 'right', labelStyle: 'font-weight: bold;',
//                                            labelWidth: 80, fieldStyle: 'text-align:center;font-size:13px',
//                                            readOnly: false,
//                                            width: 150
//                                        }
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
                                            id: prototype.id16 + '-A4347DEDU',
                                            fieldLabel: 'Deduct Amount:', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 125, fieldStyle: 'text-align:right;font-size:13px',
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
                                            id: prototype.id16 + '-A4347VLOS',
                                            fieldLabel: 'Airline Loss:', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 125, fieldStyle: 'text-align:right;font-size:13px',
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
                                            id: prototype.id16 + '-ticket',
                                            fieldLabel: 'Ticket Number:', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 125, fieldStyle: 'text-align:left;font-size:13px',
                                            readOnly: false,
                                            width: 280
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id16 + '-A4347PNR',
                                            fieldLabel: 'PNR:', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 50, fieldStyle: 'text-align:center;font-size:13px',
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
                                            xtype: 'textfield',
                                            id: prototype.id16 + '-A4347PCONT',
                                            fieldLabel: 'Acc. Period', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 125,
                                            disabled: false,
                                            width: 200
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id16 + '-A4347FCONT',
                                            fieldLabel: 'Date', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 40, 
                                            disabled: false,
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
                                            xtype: 'textfield',
                                            id: prototype.id16 + '-A4347PRDA',
                                            fieldLabel: 'Transmission date', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 125, 
                                            disabled: false,
                                            width: 200
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id16 + '-A4347IDFIL',
                                            fieldLabel: 'Nbr. Identifier:', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 100, 
                                            disabled: false,
                                            width: 200
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
                                            id: prototype.id16 + '-A4347TYPE',
                                            fieldLabel: 'File type', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 125, 
                                            disabled: false,
                                            width: 200
                                        }                                        
                                    ]
                                },
                                {
                                    xtype: 'label',
                                    labelAlign: 'center',
                                    margin: 3,
                                    html: '<strong style="color:#AC4546;font-size:13px;">Audit data</strong>'
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id16 + '-A4347REGIS',
                                            fieldLabel: 'Created by', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 75, padding: 2,
                                            readOnly: false,
                                            width: 150
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id16 + '-A4347FREGI',
                                            fieldLabel: 'Date', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 40, padding: 2,
                                            readOnly: false,
                                            width: 110
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id16 + '-A4347HREGI',
                                            fieldLabel: 'Time', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 40, padding: 2,
                                            readOnly: false,
                                            width: 100
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
                                            id: prototype.id16 + '-A4347REVIS',
                                            fieldLabel: 'Modified by', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 75, padding: 2,
                                            readOnly: false,
                                            width: 150
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id16 + '-A4347FREVI',
                                            fieldLabel: 'Date', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 40, padding: 2,
                                            readOnly: false,
                                            width: 110
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id16 + '-A4347HREVI',
                                            fieldLabel: 'Time', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 40, padding: 2,
                                            readOnly: false,
                                            width: 100
                                        }
                                    ]
                                }
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
                    text: 'Save', disabled: true,
                    id: prototype.id16 + '-btn-save',
                    iconCls: 'prx-icon-save',
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update', disabled: true,
                    id: prototype.id16 + '-btn-update',
                    iconCls: 'prx-icon-update',
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Delete',
                    id: prototype.id16 + '-btn-delete',
                    iconCls: 'prx-icon-delete',
                    hidden: true,
                    listeners: {
                        click: 'onDeleteClick'
                    }
                },
                {
                    text: 'Close',
                    id: prototype.id16 + '-btn-cancel',
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

