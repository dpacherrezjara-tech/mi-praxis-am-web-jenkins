prototype.idDE4 = prototype.id + '-CatalogMaintenanceDataEntry';

Ext.define('Ext.Praxis.view.salesaudit.ReservationBrowserForm.DataEntrys.CatalogMaintenanceDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.CatalogMaintenanceDataEntry',
    requires: [
        'Ext.Praxis.controller.salesaudit.ReservationBrowser.CatalogMaintenanceDataEntryController'
    ],
    controller: 'CatalogMaintenanceDataEntryController',
    title: 'Catalog Key Robot - Form',
    header: true,
    width: 520,
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
                    labelStyle: 'font-weight:bold;',
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
                            name: 'A4593KEY1',
                            fieldLabel: 'Key 1',
                            labelWidth: 80,
                            width: 150,
                            readOnly: true
                        },
                        {
                            name: 'A4593KEY2',
                            fieldLabel: 'Key 2',
                            labelWidth: 70,
                            width: 150,
                            readOnly: true
                        }
                    ]
                },
                {
                    items: [
                        {
                            name: 'A4593KEY3',
                            fieldLabel: 'User',
                            labelWidth: 80,
                            width: 150,
                            maxLength: 10,
                            allowBlank: false,
                            enforceMaxLength: true
                        },
                        {
                            name: 'A4593DESC1',
                            fieldLabel: 'Password',
                            labelWidth: 70,
                            width: 170,
                            maxLength: 10,
                            allowBlank: false,
                            enforceMaxLength: true
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Status',
                            name: 'A4593STS',
                            store: Ext.create('Ext.data.SimpleStore', {
                                fields: ['code', 'name'],
                                data: [
                                    ["1", "Active"],
                                    ["0", "Inactive"],
                                    ["2", "Blocked"]
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
                            name: 'A4593DESC2',
                            fieldLabel: 'Description',
                            labelWidth: 80,
                            width: 150,
                            maxLength: 10,
                            allowBlank: false,
                            enforceMaxLength: true
                        },
                        {
                            name: 'A4593COMEN',
                            fieldLabel: 'Comment',
                            labelWidth: 70,
                            width: 320,
                            maxLength: 100,
                            allowBlank: false,
                            enforceMaxLength: true
                        }

                    ]
                },
                {
                    xtype: 'fieldset',
                    title: '<strong style="color:#121E31; text-decoration: underline; ">Control Data</strong>',
                    style: {
                        backgroundColor: '#E6EEF1' // Cambiar el color de fondo a gris claro (#f0f0f0)
                    },
                    margin: '0 10 0 10',
                    width: '100%',
                    layout: {
                        type: 'vbox'
                    },
                    defaults: {
                        style: 'margin: 3px;',
                        border: false,
                        xtype: 'panel',
                        bodyStyle: 'background: transparent;"',
                        layout: {
                            type: 'hbox',
                            pack: 'center'
                        },
                        width: '100%',
                        defaults: {
                            xtype: 'textfield',
                            fieldStyle: 'text-align: center;',
                            labelStyle: 'font-weight:bold;',
                            padding: '3 1 3 1',
                            hiddenLabel: false,
                            labelAlign: 'right',
                            hidden: false
                        }
                    },
                    items: [
                        {
                            items: [
                                {
                                    name: 'A4593USCR',
                                    fieldLabel: 'Created User',
                                    labelWidth: 90,
                                    width: 190,
                                    readOnly: true
                                },
                                {
                                    name: 'A4593TSCR',
                                    fieldLabel: 'Crt. Date',
                                    labelWidth: 90,
                                    width: 230,
                                    readOnly: true
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    name: 'A4593USUP',
                                    fieldLabel: 'Update User',
                                    labelWidth: 90,
                                    width: 190,
                                    readOnly: true
                                },
                                {
                                    name: 'A4593TSUP',
                                    fieldLabel: 'Upd. Date',
                                    labelWidth: 90,
                                    width: 230,
                                    readOnly: true
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