/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.view.salesaudit.RfndarcUserMaintenanceForm.DataEntryARCUserMaintenance', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryARCUserMaintenance',

    controller: 'DataEntryARCUserMaintenanceController',

    requires: [
        'Ext.Praxis.controller.salesaudit.RfndarcUserMaintenanceForm.DataEntryARCUserMaintenanceController',
    ],
    id: prototype.idDataEntryARCUserMain + '-win',

    title: '',
    header: true,
    height: 250,
    width: 500,
    border: false,
    resizable: false,
    layout: 'fit',
    modal: true,

    defaults: {
        border: false
    },

    items: [
        {
            xtype: 'form',
            id: prototype.idDataEntryARCUserMain + '-form',
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
                            xtype: 'textfield',
                            id: prototype.idDataEntryARCUserMain + '-txtuser',
                            fieldLabel: 'Auditor',
                            afterLabelTextTpl: '<b style="color: #BF6868;"> (*)</b>',
                            enforceMaxLength: true,
                            maxLength: 10,
                            labelWidth: 70,
                            flex: 1
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idDataEntryARCUserMain + '-txtpais',
                            fieldLabel: 'Country',
                            afterLabelTextTpl: '<b style="color: #BF6868;"> (*)</b>',
                            enforceMaxLength: true,
                            maxLength: 2,
                            labelWidth: 85,
                            labelAlign: 'right',
                            width: 120
                        },
                        {
                            xtype: 'combo',
                            id: prototype.idDataEntryARCUserMain + '-CmbStatus',
                            fieldLabel: 'Status',
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: '[SELECTED]',
                            labelWidth: 50,
                            labelAlign: 'right',
                            width: 200,
                            queryMode: 'local'
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'textarea',
                            id: prototype.idDataEntryARCUserMain + '-txtA2665DESCR',
                            fieldLabel: 'Description',
                            enforceMaxLength: true,
                            maxLength: 50,
                            labelWidth: 70,
                            grow: true,
                            flex: 1,
                            height: 35
                        }
                    ]
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: '<b style="color: #BF6868;">(*) Required Fields</b>',
                    labelWidth: 200,
                    labelSeparator: ''
                },
                {
                    xtype: 'fieldset',
                    title: 'Control data',
                    border: true,
                    defaults: {
                        border: false,
                        margin: 3
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.idDataEntryARCUserMain + '-txtA4359REGIS',
                                    fieldLabel: 'User Created',
                                    labelWidth: 90,
                                    readOnly: true,
                                    flex: 1
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idDataEntryARCUserMain + '-txtA4359FREGI',
                                    fieldLabel: 'Date',
                                    labelWidth: 40,
                                    width: 120,
                                    readOnly: true,
                                    labelAlign: 'right'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idDataEntryARCUserMain + '-txtA4359HREGI',
                                    fieldLabel: 'Time',
                                    labelWidth: 40,
                                    width: 120,
                                    readOnly: true,
                                    labelAlign: 'right'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.idDataEntryARCUserMain + '-txtA4359REVIS',
                                    fieldLabel: 'User Modified',
                                    labelWidth: 90,
                                    readOnly: true,
                                    flex: 1
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idDataEntryARCUserMain + '-txtA4359FREVI',
                                    fieldLabel: 'Date',
                                    labelWidth: 40,
                                    width: 120,
                                    readOnly: true,
                                    labelAlign: 'right'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.idDataEntryARCUserMain + '-txtA4359HREVI',
                                    fieldLabel: 'Time',
                                    labelWidth: 40,
                                    width: 120,
                                    readOnly: true,
                                    labelAlign: 'right'
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
            defaults: {
                scale: 'medium'
            },
            layout: {
                type: 'hbox',
                pack: 'center'
            },
            style: 'background-color: #E3EAF9; padding: 5px;',
            items: [
                {
                    text: 'Save',
                    id: prototype.idDataEntryARCUserMain + '-btn-save',
                    iconCls: 'prx-icon-save',
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update',
                    id: prototype.idDataEntryARCUserMain + '-btn-update',
                    iconCls: 'prx-icon-update',
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Delete',
                    id: prototype.idDataEntryARCUserMain + '-btn-delete',
                    iconCls: 'prx-icon-delete',
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.idDataEntryARCUserMain + '-btn-close',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCloseClick'
                    }
                }
            ]
        }
    ]

});