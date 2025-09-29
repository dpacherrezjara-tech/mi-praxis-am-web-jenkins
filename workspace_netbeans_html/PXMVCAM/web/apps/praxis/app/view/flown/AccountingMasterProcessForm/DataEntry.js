/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
prototype.idDE=prototype.id + '-DataEntryAccountingMPFlown';
Ext.define('Ext.Praxis.view.flown.AccountingMasterProcessForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id + '-dataEntry',
    controller: prototype.id + '-dataEntryController',
    requires: [
           'Ext.Praxis.controller.flown.AccountingMasterProcess.DataEntryAccountingMasterProcessController'
    ],
    title: 'ACCOUNTING MASTER PROCESS - Data Entry',
    header: true,
    width: 700,
    height: 250,
    border: false,
    resizable: false,
    layout: {
        type: 'border',
        align: 'center'
    },
    modal: true,
    items: [
        {
            region: 'center',
            xtype: 'form',
            id: prototype.idDE + '-DataEntry-center',
            border: false,
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'vbox',
                    width: 650,
                    margin: '10 20 1 20',
                    border: false,
                    bodyStyle: 'background: #E5ECEF',
                    items: [
                        {
                            layout: 'hbox',
                            width: 650,
                            margin: '1 0 1 0',
                            border: false,
                            bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'label',
                                    labelAlign: 'left',
                                    html: '<b>Module</b>',
                                    width: 100,
                                    padding: '3px 5px 0px 10px'
                                },
                                {
                                    xtype: 'label',
                                    labelAlign: 'center',
                                    padding: '3px 5px 0px 10px',
                                    html: '<strong style="color:#AC4546;font-size:13px;">(*)</strong>',
                                    width: 30
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.idDE + '-de-cbxModulo',
                                    padding: '1 5 0 10',
                                    fieldLabel: '',
                                    queryMode: 'local',
                                    editable: false,
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    labelWidth: 0,
                                    width: 150,
                                    anchor: '100%'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    id: prototype.idDE + '-de-chkConsistencia',
                                    margin: '1 0 0 20',
                                    width: 160,
                                    boxLabel: 'Apply Consistency',
                                    inputValue: '1'
                                }
                            ]
                        }
                        ,
                        {
                            layout: 'hbox',
                            width: 650,
                            margin: '1 0 5 0',
                            border: false,
                            bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'label',
                                    labelAlign: 'left',
                                    html: '<b>Process Date</b>',
                                    width: 100,
                                    padding: '3px 5px 0px 10px'
                                },
                                {
                                    xtype: 'label',
                                    labelAlign: 'center',
                                    padding: '3px 5px 0px 10px',
                                    html: '<strong style="color:#AC4546;font-size:13px;">(*)</strong>',
                                    width: 30
                                },
                                {
                                    xtype: 'datefield',
                                    format: 'Y/m/d',
                                    fieldLabel: '',
                                    anchor: '100%',
                                    id: prototype.idDE + '-de-txtProcessDate',
                                    fieldStyle: 'text-align:center',
                                    margin: '1 0 0 10',
                                    maskRe: /[0-9/]/,
                                    width: 100,
                                    labelWidth: 0
                                }
                            ]
                        }
                    ]
                }
                ,
                {
                    xtype: 'fieldset',
                    id: prototype.idDE + '-ControlData',
                    title: 'Control Data',
                    width: 650,
                    margin: '1 20 0 20',
                    defaults: {
                        border: false
                    },
                    border: true,
                    hidden: false,
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            margin: '5 0 10 0',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.idDE + '-USCR',
                                    fieldLabel: '<strong style="color:#000;">Creator User</strong>',
                                    labelWidth: 100,
                                    margin: '0 10 0 0',
                                    readOnly: true,
                                    width: 200
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idDE + '-FECR',
                                    fieldLabel: '<strong style="color:#000;">Creation Date</strong>',
                                    labelWidth: 100,
                                    margin: '0 10 0 0',
                                    readOnly: true,
                                    width: 200
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idDE + '-HOCR',
                                    fieldLabel: '<strong style="color:#000;">Creation Time</strong>',
                                    labelWidth: 100,
                                    margin: '0 10 0 0',
                                    readOnly: true,
                                    width: 200
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            margin: '5 0 10 0',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.idDE + '-USUP',
                                    fieldLabel: '<strong style="color:#000;">User Update</strong>',
                                    labelWidth: 100,
                                    readOnly: true,
                                    margin: '0 10 0 0',
                                    width: 200
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idDE + '-FEUP',
                                    fieldLabel: '<strong style="color:#000;">Update Date</strong>',
                                    labelWidth: 100,
                                    readOnly: true,
                                    margin: '0 10 0 0',
                                    width: 200
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idDE + '-HOUP',
                                    fieldLabel: '<strong style="color:#000;">Update Time</strong>',
                                    labelWidth: 100,
                                    readOnly: true,
                                    margin: '0 10 0 0',
                                    width: 200
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
            ui: 'footer',
            margin: '5 100 10 50',
            defaults: {
                scale: 'medium'
            },
            style: 'aling:center padding: 5px;',
            items: [
                {
                    text: 'Save',
                    id: prototype.idDE + '-btn-save',
                    iconCls: 'prx-icon-save',
                    //hidden: true,
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update',
                    id: prototype.idDE + '-btn-update',
                    iconCls: 'prx-icon-update',
                    hidden: true,
                    listeners: {
                       // click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Delete',
                    id: prototype.idDE + '-btn-delete',
                    iconCls: 'prx-icon-delete',
                    hidden: true,
                    listeners: {
                       click: 'onDeleteClick'
                    }
                },
                {
                    text: 'Logs',
                    id: prototype.idDE + '-btn-log',
                    iconCls: 'prx-icon-image-log',
                    listeners: {
                       click: 'onLogsClick'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.idDE + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                },
                {
                    xtype: 'label',
                    labelAlign: 'center',
                    padding: '1px 5px 0px 10px',
                    html: '<strong style="color:red;font-size:11px;">(*)Required Fields</strong>'

                }
                
            ]
        }
    ]
});