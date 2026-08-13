prototype.idDE = prototype.id + '-BankMaintenanceDataEntry';

Ext.define('Ext.Praxis.view.payments.BankEmissorCatalogForm.DataEntrys.BankMaintenanceDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.BankMaintenanceDataEntry',
    requires: [
        'Ext.Praxis.controller.payments.BankEmissorCatalog.BankMaintenanceDataEntryController'
    ],
    controller: 'BankMaintenanceDataEntryController',
    title: 'Bank Emissor - Form',
    header: true,
    width: 600,
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
                            name: 'a4559CODE',
                            fieldLabel: 'Bank Code',
                            labelWidth: 120,
                            width: 220,
                            readOnly: true
                        },
                        {
                            xtype: 'combobox',
                            id: prototype.idDE + '-cmbPaises',
                            name: 'a4559PAIS',
                            queryMode: 'local',
                            allowBlank: true,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            fieldLabel: 'Country',
                            labelWidth: 65,
                            labelAlign: 'right',
                            width: 180,
                            typeAhead: true,
                            valueField: 'code',
                            displayField: 'name',
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            value: ''
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Region',
                            name: 'a4559REGI',
                            store: Ext.create('Ext.data.SimpleStore', {
                                fields: ['code', 'name'],
                                data: [
                                    ["", "None"],
                                    ["SA", "Sudamerica"],
                                    ["NA", "Norteamerica"],
                                    ["EU", "Europa"],
                                    ["AS", "Asia"],
                                    ["AF", "Africa"],
                                    ["OC", "Oceania"]
                                ]
                            }),
                            labelWidth: 60,
                            width: 160,
                            displayField: 'name',
                            valueField: 'code',
                            queryMode: 'local',
                            editable: false,
                            value: ''
                        }
                    ]
                },
                {
                    items: [
                        {
                            name: 'a4559DESC',
                            fieldLabel: 'Bank Name',
                            labelWidth: 120,
                            width: 380,
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
                                    name: 'a4559USCR',
                                    fieldLabel: 'Created User',
                                    labelWidth: 90,
                                    width: 190,
                                    readOnly: true
                                },
                                {
                                    name: 'a4559FECR',
                                    fieldLabel: 'Crt. Date',
                                    labelWidth: 90,
                                    width: 170,
                                    readOnly: true
                                },
                                {
                                    name: 'a4559HOCR',
                                    fieldLabel: 'Crt. Time',
                                    labelWidth: 90,
                                    width: 150,
                                    readOnly: true
                                }
                            ]
                        },
                        {
                            items: [
                                {
                                    name: 'a4559USUP',
                                    fieldLabel: 'Update User',
                                    labelWidth: 90,
                                    width: 190,
                                    readOnly: true
                                },
                                {
                                    name: 'a4559FEUP',
                                    fieldLabel: 'Upd. Date',
                                    labelWidth: 90,
                                    width: 170,
                                    readOnly: true
                                },
                                {
                                    name: 'a4559HOUP',
                                    fieldLabel: 'Upd. Time',
                                    labelWidth: 90,
                                    width: 150,
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