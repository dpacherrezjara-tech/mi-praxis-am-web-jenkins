Ext.define('Ext.Praxis.view.travelbank.FilesIssuesUsesForm.UsedForm.FileUsedDataEntryDetailN2', {
    extend: 'Ext.window.Window',
    alias: 'widget.FileUsedDataEntryDetailN2Form',
    controller: 'FileUsedDataEntryDetailN2Controller',
    requires: [
        'Ext.Praxis.controller.travelbank.FilesIssuesUses.FileUsedDataEntryDetailN2Controller'
    ],
    title: 'USED - Data entry detail',
    header: true,
    height: 450,
    width: 550,
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
            id: prototype.id10 + '-formDataEntry',
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
                            border: true,
                            padding: 2,
                            items: [

                                {
                                    xtype: 'fieldset',
                                    layout: 'vbox',
                                    margin: '2 2 2 2',
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
                                                    id: prototype.id10 + '-A4283IDUSE',
                                                    fieldLabel: 'ID Transaction:', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                                    labelWidth: 125, fieldStyle: 'text-align:center;font-size:13px',
                                                    readOnly: false, disabled: true,
                                                    width: 220
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id10 + '-A4283NCTA',
                                                    fieldLabel: 'Account Number:', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                                    labelWidth: 125, fieldStyle: 'text-align:center;font-size:13px',
                                                    readOnly: false, disabled: true,
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
                                                    id: prototype.id10 + '-A4283PRDA',
                                                    fieldLabel: 'Transmission date:', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                                    labelWidth: 125, fieldStyle: 'text-align:center;font-size:13px',
                                                    readOnly: false, disabled: true,
                                                    width: 220
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id10 + '-A4283REF',
                                                    fieldLabel: 'Ref.:', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                                    labelWidth: 125, fieldStyle: 'text-align:left;font-size:13px',
                                                    readOnly: false, disabled: true,
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
                                                    id: prototype.id10 + '-ticket-number',
                                                    fieldLabel: 'Ticket Number:', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                                    labelWidth: 125, fieldStyle: 'text-align:left;font-size:13px',
                                                    readOnly: false, disabled: true,
                                                    width: 280
                                                }
                                            ]
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
                                            id: prototype.id10 + '-A4283IDISS',
                                            fieldLabel: 'Unique Service Credit ID', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 150, fieldStyle: 'text-align:center;font-size:14px',
                                            readOnly: false, disabled: true,
                                            width: 245
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id10 + '-A4283SQISS',
                                            fieldLabel: 'Seq.', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 80, fieldStyle: 'text-align:center;font-size:13px',
                                            readOnly: false,
                                            width: 120
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
                                            id: prototype.id10 + '-A4283TRNCU',
                                            fieldLabel: 'Transaction', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 150, fieldStyle: 'font-size:13px',
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
                                            id: prototype.id10 + '-A4283VALO1',
                                            fieldLabel: 'Use value:', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 150, fieldStyle: 'text-align:right;font-size:13px',
                                            readOnly: false,
                                            width: 270
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id10 + '-A4283MDA1',
                                            fieldLabel: 'Curr.:', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 80, fieldStyle: 'text-align:center;font-size:13px',
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
                                            id: prototype.id10 + '-A4283SERV',
                                            fieldLabel: 'Service:', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 150, fieldStyle: 'text-align:left;font-size:13px',
                                            readOnly: false,
                                            width: 350
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
                                            id: prototype.id10 + '-A4283TIPD',
                                            fieldLabel: 'Service Type:', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 150, fieldStyle: 'text-align:left;font-size:13px',
                                            readOnly: false,
                                            width: 350
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
                                            id: prototype.id10 + '-A4283FEMI',
                                            fieldLabel: 'Date:', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 150, fieldStyle: 'text-align:left;font-size:13px',
                                            readOnly: false,
                                            width: 270
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
                                            id: prototype.id10 + '-A4283REF1',
                                            fieldLabel: 'Reference.:', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 150, fieldStyle: 'text-align:left;font-size:13px',
                                            readOnly: false,
                                            width: 350
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
                                            id: prototype.id10 + '-A4283REGIS',
                                            fieldLabel: 'Created by', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 75, padding: 2,
                                            readOnly: false,
                                            width: 150
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id10 + '-A4283FREGI',
                                            fieldLabel: 'Date', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 40, padding: 2,
                                            readOnly: false,
                                            width: 110
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id10 + '-A4283HREGI',
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
                                            id: prototype.id10 + '-A4283REVIS',
                                            fieldLabel: 'Modified by', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 75, padding: 2,
                                            readOnly: false,
                                            width: 150
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id10 + '-A4283FREVI',
                                            fieldLabel: 'Date', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 40, padding: 2,
                                            readOnly: false,
                                            width: 110
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id10 + '-A4283HREVI',
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
                    id: prototype.id10 + '-btn-save',
                    iconCls: 'prx-icon-save',
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update', disabled: true,
                    id: prototype.id10 + '-btn-update',
                    iconCls: 'prx-icon-update',
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Delete',
                    id: prototype.id10 + '-btn-delete',
                    iconCls: 'prx-icon-delete',
                    hidden: true,
                    listeners: {
                        click: 'onDeleteClick'
                    }
                },
                {
                    text: 'Close',
                    id: prototype.id10 + '-btn-cancel',
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

