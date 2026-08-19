Ext.define('Ext.Praxis.view.travelbank.FilesIssuesUsesForm.ExpireForm.FileExpireDataEntryDetail', {
    extend: 'Ext.window.Window',
    alias: 'widget.FileExpireDataEntryDetailForm',
    controller: 'FileExpireDataEntryDetailController',
    requires: [
        'Ext.Praxis.controller.travelbank.FilesIssuesUses.FileExpireDataEntryDetailController'
    ],
    title: 'EXPIRE - Data entry detail',
    header: true,
    height: 450,
    width: 480,
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
            id: prototype.id14 + '-formDataEntry',
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
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id14 + '-A4308IDEXP',
                                            fieldLabel: 'U. Service Credit ID', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 125, fieldStyle: 'text-align:center;font-size:14px',
                                            readOnly: false,
                                            width: 245
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id14 + '-A4308TRNCU',
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
                                            id: prototype.id14 + '-A4308NCTA',
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
                                            id: prototype.id14 + '-A4308SERV',
                                            fieldLabel: 'Service Credit Code', labelAlign: 'right', labelStyle: 'font-weight: bold;',
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
                                            id: prototype.id14 + '-A4308VALOR',
                                            fieldLabel: 'Amount:', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 125, fieldStyle: 'text-align:right;font-size:13px',
                                            readOnly: false,
                                            width: 245
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id14 + '-A4308MDA',
                                            fieldLabel: 'Currency:', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 80, fieldStyle: 'text-align:center;font-size:13px',
                                            readOnly: false,
                                            width: 150
                                        }
                                    ]
                                },
//                                {
//                                    xtype: 'panel',
//                                    layout: 'column',
//                                    margin: '1 0 1 0',
//                                    border: false,
//                                    items: [
//                                        {
//                                            xtype: 'textfield',
//                                            id: prototype.id14 + '-A4308MOT',
//                                            fieldLabel: 'Reason:', labelAlign: 'right', labelStyle: 'font-weight: bold;',
//                                            labelWidth: 125, fieldStyle: 'text-align:left;font-size:13px',
//                                            readOnly: false,
//                                            width: 350
//                                        }
//                                    ]
//                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id14 + '-A4308TIPD',
                                            fieldLabel: 'Service Type:', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 125, fieldStyle: 'text-align:left;font-size:13px', 
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
                                            id: prototype.id14 + '-A4308FEMI',
                                            fieldLabel: 'Issue Date:', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 125, fieldStyle: 'text-align:center;font-size:13px',
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
                                            id: prototype.id14 + '-A4308FEXP',
                                            fieldLabel: 'Expiry Date:', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 125, fieldStyle: 'text-align:center;font-size:13px',
                                            readOnly: false,
                                            width: 220
                                        }
                                    ]
                                },
//                                {
//                                    xtype: 'panel',
//                                    layout: 'column',
//                                    margin: '1 0 1 0',
//                                    border: false,
//                                    items: [
//                                        {
//                                            xtype: 'textfield',
//                                            id: prototype.id14 + '-ticket-number',
//                                            fieldLabel: 'Ticket Number:', labelAlign: 'right', labelStyle: 'font-weight: bold;',
//                                            labelWidth: 125,  fieldStyle: 'text-align:left;font-size:13px',
//                                            readOnly: false,
//                                            width: 280
//                                        }
//                                    ]
//                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id14 + '-A4308IDISS',
                                            fieldLabel: 'ID Reference Nbr:', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 125,  fieldStyle: 'text-align:left;font-size:13px',
                                            readOnly: false,
                                            width: 280
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
                                            id: prototype.id14 + '-A4308REGIS',
                                            fieldLabel: 'Created by', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 75, padding: 2,
                                            readOnly: false,
                                            width: 150
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id14 + '-A4308FREGI',
                                            fieldLabel: 'Date', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 40, padding: 2,
                                            readOnly: false,
                                            width: 110
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id14 + '-A4308HREGI',
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
                                            id: prototype.id14 + '-A4308REVIS',
                                            fieldLabel: 'Modified by', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 75, padding: 2,
                                            readOnly: false,
                                            width: 150
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id14 + '-A4308FREVI',
                                            fieldLabel: 'Date', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 40, padding: 2,
                                            readOnly: false,
                                            width: 110
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id14 + '-A4308HREVI',
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
                    id: prototype.id14 + '-btn-save',
                    iconCls: 'prx-icon-save',
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update', disabled: true,
                    id: prototype.id14 + '-btn-update',
                    iconCls: 'prx-icon-update',
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Delete',
                    id: prototype.id14 + '-btn-delete',
                    iconCls: 'prx-icon-delete',
                    hidden: true,
                    listeners: {
                        click: 'onDeleteClick'
                    }
                },
                {
                    text: 'Close',
                    id: prototype.id14 + '-btn-cancel',
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

