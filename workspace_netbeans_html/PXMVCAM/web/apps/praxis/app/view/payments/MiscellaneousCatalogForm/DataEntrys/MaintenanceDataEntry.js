prototype.idDE = prototype.id + '-MaintenanceDataEntry';

Ext.define('Ext.Praxis.view.payments.MiscellaneousCatalogForm.DataEntrys.MaintenanceDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.MaintenanceDataEntry',
    requires: [
        'Ext.Praxis.controller.payments.MiscellaneousCatalog.MaintenanceDataEntryController'
    ],
    controller: 'MaintenanceDataEntryController',
    title: 'Miscellaneous Catalog - Form',
    header: true,
    width: 730,
    resizable: false,
    layout: 'fit',
    modal: true,
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'form',
            layout: 'vbox',
            id: prototype.idDE + '-mainForm',
            defaults: {
                style: 'margin: 3px;',
                border: false,
                xtype: 'panel',
                bodyStyle: 'background: transparent;"',
                layout: 'hbox',
                width: '100%',
                defaults: {
                    xtype: 'textfield',
                    fieldStyle: 'text-align: center;',
                    labelStyle: 'font-weight:bold;text-align:right;',
                    padding: '5 1 5 1',
                    hiddenLabel: false,
                    labelAlign: 'right',
                    hidden: false
                }
            },
            items: [
                {
                    items: [
                        {
                            name: 'a4451key1',
                            id: prototype.idDE + '-txtK1',
                            fieldLabel: 'Key 1',
                            labelWidth: 120,
                            width: 210,
                            readOnly: true,
                            maxLength: 2,
                            minLength: 2,
                            allowBlank: false,
                            enforceMaxLength: true
                        },
                        {
                            name: 'a4451key2',
                            id: prototype.idDE + '-txtK2',
                            fieldLabel: 'Key 2',
                            labelWidth: 60,
                            width: 150,
                            readOnly: true,
                            maxLength: 10,
                            allowBlank: false,
                            enforceMaxLength: true
                        },
                        {
                            name: 'a4451key3',
                            fieldLabel: 'Key 3',
                            labelWidth: 60,
                            width: 170,
                            maxLength: 15,
                            allowBlank: false,
                            enforceMaxLength: true
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Status',
                            name: 'a4451sts',
                            store: Ext.create('Ext.data.SimpleStore', {
                                fields: ['code', 'name'],
                                data: [
                                    ["1", "Enable"],
                                    ["0", "Disable"]
                                ]
                            }),
                            labelWidth: 60,
                            width: 160,
                            displayField: 'name',
                            valueField: 'code',
                            queryMode: 'local',
                            editable: false,
                            value: '0'
                        }
                    ]
                },
                {
                    items: [
                        {
                            name: 'a4451desc1',
                            fieldLabel: 'Description 1',
                            labelWidth: 120,
                            width: 330,
                            maxLength: 30,
                            allowBlank: false,
                            enforceMaxLength: true
                        },
                        {
                            name: 'a4451desc2',
                            fieldLabel: 'Description 2',
                            labelWidth: 120,
                            width: 330,
                            maxLength: 30,
                            enforceMaxLength: true
                        }
                    ]
                },
                {
                    items: [
                        {
                            name: 'a4451cant1',
                            fieldLabel: 'Cant 1',
                            labelWidth: 120,
                            width: 180,
                            maxLength: 6,
                            enforceMaxLength: true,
                            allowBlank:false,
                            value:'0',
                            maskRe: /[0-9]/
                        },
                        {
                            name: 'a4451cant2',
                            fieldLabel: 'Cant 2',
                            labelWidth: 60,
                            width: 120,
                            maxLength: 6,
                            allowBlank:false,
                            enforceMaxLength: true,
                            value:'0',
                            maskRe: /[0-9]/
                        },
                        {
                            name: 'a4451fech1',
                            fieldLabel: 'Fecha 1',
                            labelWidth: 70,
                            width: 150,
                            maxLength: 8,
                            enforceMaxLength: true
                        },
                        {
                            name: 'a4451fech2',
                            fieldLabel: 'Fecha 2',
                            labelWidth: 70,
                            width: 150,
                            maxLength: 8,
                            enforceMaxLength: true
                        }
                    ]
                },
                {
                    items: [
                        {
                            name: 'a4451comen',
                            fieldLabel: 'Comment',
                            labelWidth: 120,
                            width: 500,
                            maxLength: 60,
                            allowBlank: false,
                            enforceMaxLength: true
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
            margin: '10 0 10 0',
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults: {
                scale: 'medium'
            },
            items: [
                {
                    text: 'Save',
                    id: prototype.idDE + '-btn-save',
                    iconCls: 'prx-icon-save',
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
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.idDE + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});