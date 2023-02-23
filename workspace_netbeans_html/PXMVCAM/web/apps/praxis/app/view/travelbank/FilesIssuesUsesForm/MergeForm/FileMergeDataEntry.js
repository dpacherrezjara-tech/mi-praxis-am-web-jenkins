
Ext.define('Ext.Praxis.view.travelbank.FilesIssuesUsesForm.MergeForm.FileMergeDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.FileMergeDataEntryForm',
    controller: 'FileMergeDataEntryController',
    requires: [
        'Ext.Praxis.controller.travelbank.FilesIssuesUses.FileMergeDataEntryController'
    ],
    title: 'MERGE Data entry',
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
            id: prototype.id18 + '-formDataEntry',
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
                                            id: prototype.id18 + '-A4356NCTAF',
                                            fieldLabel: 'Merge from', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 125, fieldStyle: 'text-align:center;font-size:14px',
                                            readOnly: false,
                                            width: 280
                                        },
                                        {
                                            xtype: 'button', margin: '0 0 0 3',
                                            text: 'Detail',
                                            id: prototype.id18 + '-btn-detail-from',
                                            iconCls: 'prx-icon-detail',
                                            listeners: {
                                                click: 'onDetailMergeFromClick'
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
                                            id: prototype.id18 + '-A4356NCTAT',
                                            fieldLabel: 'Merge to', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 125, fieldStyle: 'text-align:center;font-size:14px',
                                            readOnly: false,
                                            width: 280
                                        },
                                        {
                                            xtype: 'button',margin: '0 0 0 3',  
                                            text: 'Detail',
                                            id: prototype.id18 + '-btn-detail-to',
                                            iconCls: 'prx-icon-detail',
                                            listeners: {
                                                click: 'onDetailMergeToClick'
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
                                            id: prototype.id18 + '-A4356MDA',
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
                                            id: prototype.id18 + '-A4356VBALF',
                                            fieldLabel: 'Merge from Balance:', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 125, fieldStyle: 'text-align:right;font-size:13px',
                                            readOnly: false,
                                            width: 245
                                        }
//                                        {
//                                            xtype: 'textfield',
//                                            id: prototype.id18 + '-A4308MDA',
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
                                            id: prototype.id18 + '-A4356VBALT',
                                            fieldLabel: 'Merge to Balance:', labelAlign: 'right', labelStyle: 'font-weight: bold;',
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
                                            id: prototype.id18 + '-A4356STSM',
                                            fieldLabel: 'Status:', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 125, fieldStyle: 'text-align:left;font-size:13px',
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
                                            id: prototype.id18 + '-A4356FCRE',
                                            fieldLabel: 'Creation Date:', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 125, fieldStyle: 'text-align:left;font-size:13px',
                                            readOnly: false,
                                            width: 220
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id18 + '-A4356TYPE',
                                            fieldLabel: 'File type:', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 125, fieldStyle: 'text-align:left;font-size:13px',
                                            readOnly: false,
                                            width: 220
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
                                            id: prototype.id18 + '-A4356PRDA',
                                            fieldLabel: 'Transmission date:', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 125, fieldStyle: 'text-align:left;font-size:13px',
                                            readOnly: false,
                                            width: 220
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id18 + '-A4356IDFIL',
                                            fieldLabel: 'Nbr Identifier:', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 125, fieldStyle: 'text-align:left;font-size:13px',
                                            readOnly: false,
                                            width: 220
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
                                            id: prototype.id18 + '-A4356PCONT',
                                            fieldLabel: 'Account period:', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 125, fieldStyle: 'text-align:left;font-size:13px',
                                            readOnly: false,
                                            width: 220
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id18 + '-A4356FCONT',
                                            fieldLabel: 'Account date:', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 125, fieldStyle: 'text-align:left;font-size:13px',
                                            readOnly: false,
                                            width: 220
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
                                            id: prototype.id18 + '-A4356REGIS',
                                            fieldLabel: 'Created by', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 80, padding: 2,
                                            readOnly: false,
                                            width: 150
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id18 + '-A4356FREGI',
                                            fieldLabel: 'Date', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 40, padding: 2,
                                            readOnly: false,
                                            width: 110
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id18 + '-A4356HREGI',
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
                                            id: prototype.id18 + '-A4356REVIS',
                                            fieldLabel: 'Modified by', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 80, padding: 2,
                                            readOnly: false,
                                            width: 150
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id18 + '-A4356FREVI',
                                            fieldLabel: 'Date', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 40, padding: 2,
                                            readOnly: false,
                                            width: 110
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id18 + '-A4356HREVI',
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
                    id: prototype.id18 + '-btn-save',
                    iconCls: 'prx-icon-save',
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update', disabled: true,
                    id: prototype.id18 + '-btn-update',
                    iconCls: 'prx-icon-update',
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Delete',
                    id: prototype.id18 + '-btn-delete',
                    iconCls: 'prx-icon-delete',
                    hidden: true,
                    listeners: {
                        click: 'onDeleteClick'
                    }
                },
                {
                    text: 'Close',
                    id: prototype.id18 + '-btn-cancel',
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


