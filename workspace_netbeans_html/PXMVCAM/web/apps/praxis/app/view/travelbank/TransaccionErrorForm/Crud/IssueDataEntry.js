
//console.log('Ext.Praxis.view.travelbank.TransaccionErrorForm.Crud.IssueDataEntry');
//console.log('prototype.id3>>' + prototype.id3);

Ext.define('Ext.Praxis.view.travelbank.TransaccionErrorForm.Crud.IssueDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.IssueDataEntryForm',
    controller: 'IssueDataEntryController',
    requires: [
        'Ext.Praxis.controller.travelbank.TransaccionError.Crud.IssueDataEntryController'
    ],
    title: 'ISSUES: Data entry',
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
            id: prototype.id3 + '-formDataEntry',
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
                                            id: prototype.id3 + '-A4281IDISS',
                                            fieldLabel: 'Credit ID', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 125, fieldStyle: 'text-align:center;font-size:14px',
                                            readOnly: false,
                                            width: 245
                                        },
                                         {
                                            xtype: 'textfield',
                                            id: prototype.id3 + '-A4281SQISS',
                                            fieldLabel: 'Seq.', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 50, fieldStyle: 'text-align:center;font-size:14px',
                                            readOnly: false,
                                            width: 90
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
                                            id: prototype.id3 + '-A4281NCTA',
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
                                            id: prototype.id3 + '-A4281TRNCU',
                                            fieldLabel: 'Transacction', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 125, fieldStyle: 'text-align:center;font-size:13px',
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
                                            id: prototype.id3 + '-A4281SERV',
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
                                            id: prototype.id3 + '-A4281VALOR',
                                            fieldLabel: 'Amount:', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 125, fieldStyle: 'text-align:right;font-size:13px',
                                            readOnly: false,
                                            width: 245
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id3 + '-A4281MDA',
                                            fieldLabel: 'Currency:', labelAlign: 'right', labelStyle: 'font-weight: bold;',
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
                                            id: prototype.id3 + '-A4281MOT',
                                            fieldLabel: 'Reason:', labelAlign: 'right', labelStyle: 'font-weight: bold;',
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
                                            id: prototype.id3 + '-A4281TIPD',
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
                                            id: prototype.id3 + '-A4281FEMI',
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
                                            id: prototype.id3 + '-A4281FEXP',
                                            fieldLabel: 'Expiry Date:', labelAlign: 'right', labelStyle: 'font-weight: bold;',
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
                                            id: prototype.id3 + '-ticket-number',
                                            fieldLabel: 'Ticket Number:', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 125,  fieldStyle: 'text-align:left;font-size:13px',
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
                                            id: prototype.id3 + '-A4281IDISR',
                                            fieldLabel: 'Credit ID(REF.):', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 125,  fieldStyle: 'text-align:left;font-size:13px',                                            
                                            width: 280
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id3 + '-A4281SQISR',
                                            fieldLabel: 'Seq:', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 50,  fieldStyle: 'text-align:left;font-size:13px',                                            
                                            width: 100
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
                                            id: prototype.id3 + '-A4281REGIS',
                                            fieldLabel: 'Created by', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 75, padding: 2,
                                            readOnly: false,
                                            width: 150
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id3 + '-A4281FREGI',
                                            fieldLabel: 'Date', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 40, padding: 2,
                                            readOnly: false,
                                            width: 110
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id3 + '-A4281HREGI',
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
                                            id: prototype.id3 + '-A4281REVIS',
                                            fieldLabel: 'Modified by', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 75, padding: 2,
                                            readOnly: false,
                                            width: 150
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id3 + '-A4281FREVI',
                                            fieldLabel: 'Date', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 40, padding: 2,
                                            readOnly: false,
                                            width: 110
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id3 + '-A4281HREVI',
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
                    text: 'Save',                     
                    id: prototype.id3 + '-btn-save',
                    iconCls: 'prx-icon-save',
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
//                {
//                    text: 'Update', disabled: true,
//                    id: prototype.id3 + '-btn-update',
//                    iconCls: 'prx-icon-update',
//                    listeners: {
//                        click: 'onUpdateClick'
//                    }
//                },
//                {
//                    text: 'Delete',
//                    id: prototype.id3 + '-btn-delete',
//                    iconCls: 'prx-icon-delete',
//                    hidden: true,
//                    listeners: {
//                        click: 'onDeleteClick'
//                    }
//                },
                {
                    text: 'Close',
                    id: prototype.id3 + '-btn-cancel',
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

