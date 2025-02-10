prototype.idDE = prototype.id + '-MaintenanceDataEntry';

Ext.define('Ext.Praxis.view.invoice.BillableCodeCatalogForm.DataEntrys.MaintenanceDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.MaintenanceDataEntry',
    requires: [
        'Ext.Praxis.controller.invoice.BillableCodeCatalog.MaintenanceDataEntryController'
    ],
    controller: 'MaintenanceDataEntryController',
    title: 'Maintenance - Form',
    header: true,
    width: 720,
    resizable: false,
    layout: 'fit',
    modal: true,
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'panel',
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            items: [
                {
                    xtype: 'form',
                    id: prototype.idDE + '-mainForm',
                    layout: {
                        type: 'vbox',
                        pack: 'center'
                    },
                    border: false,
                    items: [
                        //<editor-fold defaultstate="collapsed" desc="Sale Information">
                        {
                            xtype: 'fieldset',
                            title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:12px;">Information</span>',
                            layout: {
                                type: 'vbox',
                                pack: 'center'
                            },
                            border: true,
                            margin: '5 5 5 5',
                            width: '100%',
                            style: {
                                backgroundColor: '#EEF3F9' // Cambiar el color de fondo a gris claro (#f0f0f0)
                            },
                            defaults: {
                                xtype: 'panel',
                                layout: {
                                    type: 'hbox',
                                    pack: 'left'
                                },
                                width: '100%',
                                border: false,
                                bodyStyle: 'background: transparent',
                                defaults: {
                                    xtype: 'textfield',
                                    margin: '5 8 5 8',
                                    labelStyle: 'text-align:left;font-weight: bolder;',
                                    fieldStyle: 'text-align:center;',
                                    editable: true
                                }
                            },
                            items: [
                                {
                                    items: [
                                        {
                                            name: 'IDCOD',
                                            hidden: true
                                        },
                                        {
                                            xtype: 'combobox',
                                            fieldLabel: 'Type',
                                            name: 'TIPO',
                                            store: Ext.create('Ext.data.SimpleStore', {
                                                fields: ['code', 'name'],
                                                data: [
                                                    ["CTA", "Cuenta Contable"],
                                                    ["FBAS", "Farebasis"],
                                                    ["IATA", "IATA"],
                                                    ["RFIS", "RFIS"],
                                                    ["FDES", "Fare Designator"]
                                                ]
                                            }),
                                            labelWidth: 100,
                                            width: 230,
                                            displayField: 'name',
                                            valueField: 'code',
                                            queryMode: 'local',
                                            editable: false,
                                            value: 'CTA'
                                        },
                                        {
                                            fieldLabel: 'Key',
                                            name: 'CLAVE',
                                            width: 160,
                                            labelWidth: 40
                                        },
                                        {
                                            xtype: 'combobox',
                                            fieldLabel: 'Billable Code',
                                            name: 'CFACT',
                                            store: Ext.create('Ext.data.SimpleStore', {
                                                fields: ['code', 'name'],
                                                data: [
                                                    ["0", "0-Facturable"],
                                                    ["1", "1-No Facturable"],
                                                    ["2", "2-Facturable Glob."],
                                                    ["3", "3-Facturable Auto."],
                                                    ["4", "4-Masivo"],
                                                    ["5", "5-Bulk"],
                                                    ["6", "6-PreCompra"]
                                                ]
                                            }),
                                            labelWidth: 90,
                                            width: 240,
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
                                            fieldLabel: 'Description',
                                            name: 'DESCRIP',
                                            width: 480,
                                            labelWidth: 100
                                        }
                                    ]
                                },
                                {
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            name: 'FDESDE',
                                            fieldLabel: 'Validity',
                                            format: 'Ymd',
                                            editable: true,
                                            labelWidth: 100,
                                            width: 200,
                                            value: '',
                                            id: prototype.idDE + '-txtFDESDE'
                                        },
                                        {
                                            xtype: 'datefield',
                                            name: 'FFIN',
                                            fieldLabel: 'To',
                                            format: 'Ymd',
                                            editable: true,
                                            labelWidth: 20,
                                            width: 120,
                                            value: '',
                                            id: prototype.idDE + '-txtFFIN'
                                        }
                                    ]
                                }
                            ]
                        },
                        //</editor-fold>
                        //<editor-fold defaultstate="collapsed" desc="Control Data">
                        {
                            xtype: 'fieldset',
                            title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:12px;">Control Data</span>',
                            layout: {
                                type: 'vbox',
                                pack: 'center'
                            },
                            border: true,
                            margin: '5 5 5 5',
                            width: '100%',
                            bodyStyle: 'background: transparent',
                            defaults: {
                                xtype: 'panel',
                                layout: {
                                    type: 'hbox',
                                    pack: 'center'
                                },
                                width: '100%',
                                border: false,
                                bodyStyle: 'background: transparent',
                                defaults: {
                                    xtype: 'textfield',
                                    margin: '5 8 5 8',
                                    labelStyle: 'text-align:right;font-weight: bolder;',
                                    fieldStyle: 'text-align:center;',
                                    editable: false
                                }
                            },
                            items: [
                                {
                                    items: [
                                        {
                                            fieldLabel: 'User Create',
                                            name: 'UCREATE',
                                            width: 220,
                                            labelWidth: 120
                                        },
                                        {
                                            fieldLabel: 'Date Create',
                                            name: 'FCREATE',
                                            width: 200,
                                            labelWidth: 120
                                        }
                                    ]
                                },
                                {
                                    items: [
                                        {
                                            fieldLabel: 'User Update',
                                            name: 'UREVIS',
                                            width: 220,
                                            labelWidth: 120
                                        },
                                        {
                                            fieldLabel: 'Date Update',
                                            name: 'FREVIS',
                                            width: 200,
                                            labelWidth: 120
                                        }
                                    ]
                                }
                            ]
                        }
                        //</editor-fold>
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
            border: false,
            margin: '5 0 5 0',
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