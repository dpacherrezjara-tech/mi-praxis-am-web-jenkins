prototype.idDE = prototype.id + '-MerchantMaintenanceDataEntry';

Ext.define('Ext.Praxis.view.payments.MerchantNumberForm.DataEntrys.MerchantMaintenanceDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.MerchantMaintenanceDataEntry',
    requires: [
        'Ext.Praxis.controller.payments.MerchantNumber.MerchantMaintenanceDataEntryController'
    ],
    controller: 'MerchantMaintenanceDataEntryController',
    title: 'Merchant Number - Form',
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
                            name: 'MERCHN',
                            id: prototype.idDE + '-txtMerchant',
                            fieldLabel: 'Merchant Nbr',
                            labelWidth: 120,
                            width: 240,
                            maxLength: 15,
                            minLength: 5,
                            allowBlank: false,
                            enforceMaxLength: true,
                            maskRe: /[0-9]/
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Channel',
                            name: 'CANAL',
                            store: Ext.create('Ext.data.SimpleStore', {
                                fields: ['code', 'name'],
                                data: [
                                    ['', 'None'],
                                    ['CCT', 'CCT'],
                                    ['FRA', 'FRA'],
                                    ['ATO', 'ATO'],
                                    ['CTO', 'CTO'],
                                    ['WEB', 'WEB'],
                                    ['GSA', 'GSA'],
                                    ['AGY', 'AGY'],
                                    ['ARC', 'ARC'],
                                    ['BSP', 'BSP'],
                                    ['OF', 'OF']
                                ]
                            }),
                            labelWidth: 60,
                            width: 130,
                            displayField: 'name',
                            valueField: 'code',
                            queryMode: 'local',
                            editable: false,
                            value: ''
                        },
                        {
                            xtype: 'combobox',
                            id: prototype.idDE + '-cmbPaises',
                            name: 'SCOUNTRY',
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
                            valueField: 'CODE',
                            displayField: 'NAME',
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            value: ''
                        }
                    ]
                },
                {
                    items: [
                        {
                            name: 'DESCR',
                            fieldLabel: 'Merchant Name',
                            labelWidth: 120,
                            width: 500,
                            maxLength: 40,
                            allowBlank: false,
                            enforceMaxLength: true
                        }
                    ]
                },
                {
                    items: [
                        {
                            name: 'RSOCIAL',
                            fieldLabel: 'Social Reason',
                            labelWidth: 120,
                            width: 500,
                            maxLength: 40,
                            allowBlank: false,
                            enforceMaxLength: true
                        }
                    ]
                },
                {
                    items: [
                        {
                            name: 'MERCHP',
                            fieldLabel: 'Merchant Payment',
                            labelWidth: 120,
                            width: 240,
                            maxLength: 17,
                            allowBlank: false,
                            enforceMaxLength: true,
                            maskRe: /[0-9]/
                        }
                    ]
                },
                {
                    items: [
                        {
                            xtype: 'combo',
                            name: 'UNIOPE',
                            id: prototype.idDE + '-cmbUNIOPE',
                            queryMode: 'local',
                            fieldLabel: 'Op. Unit',
                            labelWidth: 120,
                            width: 250,
                            fieldStyle: 'color:#074066;',
                            forceSelection: true,
                            selectOnFocus: false,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: false,
                            disabled: false,
                            valueField: 'code',
                            displayField: 'name',
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            store: Ext.create('Ext.data.SimpleStore', {
                                fields: ['code', 'name'],
                                data: [
                                    ['', 'None'],
                                    ['1', 'Aerovias MX'],
                                    ['2', 'Aeromexico Cargo'],
                                    ['3', 'PLM']
                                ]
                            }),
                            value: '',
                            listeners: {
                                change: 'onChangeStatusCmb'
                            }
                        },
                        {
                            xtype: 'combo',
                            name: 'STATUS',
                            id: prototype.idDE + '-cmbStatus',
                            queryMode: 'local',
                            fieldLabel: 'Status',
                            labelWidth: 60,
                            width: 140,
                            fieldStyle: 'color:#074066;',
                            forceSelection: true,
                            selectOnFocus: false,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: false,
                            readOnly: true,
                            valueField: 'code',
                            displayField: 'name',
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            store: Ext.create('Ext.data.SimpleStore', {
                                fields: ['code', 'name'],
                                data: [
                                    ['0', 'Disabled'],
                                    ['1', 'Enabled']
                                ]
                            }),
                            value: '0'
                        }
                    ]
                },
                {
                    items: [
                        {
                            xtype: 'combobox',
                            name: 'CODAGRUPA',
                            id: prototype.idDE + '-de-cmbCODAGRUP',
                            store: Ext.create('Ext.data.SimpleStore', {
                                fields: ['code', 'name'],
                                data: [
                                    ['', 'None'],
                                    ['PR', 'PROCESO'],
                                    ['IN', 'INDIVIDUAL'],
                                    ['GR', 'GRUPO']
                                ]
                            }),
                            fieldLabel: 'Accounting Group',
                            labelWidth: 120,
                            width: 230,
                            displayField: 'name',
                            valueField: 'code',
                            queryMode: 'local',
                            editable: false,
                            value: '',
                            listeners: {
                                change: 'onChangeCodAgrup'
                            }
                        },
                        {
                            xtype: 'combobox',
                            name: 'NBRAGRUPA',
                            id: prototype.idDE + '-cmbNBRAGRUP',
                            hidden: true,
                            store: Ext.create('Ext.data.SimpleStore', {
                                fields: ['code', 'name'],
                                data: [
                                    ['1', 'Grupo 1'],
                                    ['2', 'Grupo 2'],
                                    ['3', 'Grupo 3'],
                                    ['4', 'Grupo 4'],
                                    ['5', 'Grupo 5'],
                                    ['6', 'Grupo 6'],
                                    ['7', 'Grupo 7'],
                                    ['8', 'Grupo 8'],
                                    ['9', 'Grupo 9']
                                ]
                            }),
                            width: 100,
                            displayField: 'name',
                            valueField: 'code',
                            queryMode: 'local',
                            editable: false,
                            value: '1'
                        },
                        {
                            xtype: 'datefield',
                            name: 'FECHAINI',
                            fieldLabel: 'Validity',
                            labelStyle: 'color:#0B333C;',
                            format: 'Ymd',
                            editable: true,
                            labelWidth: 50,
                            width: 130,
                            value: new Date(),
                            id: prototype.idDE + '-FECHAINI'
                        },
                        {
                            xtype: 'datefield',
                            name: 'FECHAFIN',
                            fieldLabel: 'To',
                            format: 'Ymd',
                            editable: true,
                            labelWidth: 20,
                            width: 100,
                            value: '',
                            id: prototype.idDE + '-FECHAFIN'
                        }
                    ]
                },
                {
                    items: [
                        {
                            name: 'CIATA',
                            fieldLabel: 'IATA',
                            labelWidth: 120,
                            width: 220,
                            readOnly: true
                        },
                        {
                            name: 'NIATA',
                            width: 250,
                            readOnly: true
                        }
                    ]
                },
                //<editor-fold defaultstate="collapsed" desc="IATA">
                {
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    items: [
                        {
                            xtype: 'grid',
                            id: prototype.idDE + '-gridIATA',
                            width: '90%',
                            minHeight: 130,
                            maxHeight: 150,
                            columnLines: true,
                            store: Ext.create('Ext.data.Store', {
                                data: []
                            }),
                            padding: '1',
                            margin: '1',
                            defaults: {
                                align: 'center',
                                menuDisabled: true,
                                sortable: true
                            },
                            viewConfig: {
                                stripeRows: true,
                                enableTextSelection: true,
                                markDirty: false
                            },
                            tbar: {
                                items: [
                                    {
                                        xtype: 'panel',
                                        layout: {
                                            type: 'hbox',
                                            pack: 'end'
                                        },
                                        width: '100%',
                                        defaults: {
                                            xtype: 'textfield',
                                            fieldStyle: 'text-align: center;',
                                            padding: '5 1 5 1',
                                            hiddenLabel: false,
                                            labelAlign: 'right',
                                            hidden: false
                                        },
                                        items: [
                                            {
                                                id: prototype.idDE + '-codeIataAdd',
                                                fieldLabel: 'Iata Code',
                                                labelWidth: 80,
                                                width: 180,
                                                maxLength: 8,
                                                enforceMaxLength: true
                                            },
                                            {
                                                xtype: 'button',
                                                id: prototype.idDE + '-btnAddIata',
                                                iconCls: 'prx-icon-add',
                                                margin: '2 2 2 2',
                                                width: 25,
                                                height: 25,
                                                tooltip: 'Add',
                                                listeners: {
                                                    click: 'onAddCodeIata'
                                                }
                                            }
                                        ]
                                    }
                                ]
                            },
                            //<editor-fold defaultstate="collapsed" desc="Columnas IATAs">
                            columns: [
                                {
                                    header: 'IATA',
                                    dataIndex: 'CIATA',
                                    align: 'center',
                                    width: 100
                                },
                                {
                                    header: 'Name',
                                    dataIndex: 'NIATA',
                                    align: 'center',
                                    flex: 1,
                                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                        var data = record.data;
                                        metaData.style = "text-align:left;";
                                        metaData.tdAttr = 'data-qtip="' + data.NIATA + '"';
                                        return value;
                                    }
                                },
                                {
                                    header: 'Country',
                                    dataIndex: 'SCOUNTRY',
                                    align: 'center',
                                    width: 80
                                },
                                {
                                    header: 'Channel',
                                    dataIndex: 'CANAL',
                                    align: 'center',
                                    width: 80
                                },
                                {
                                    sortable: false,
                                    xtype: 'actioncolumn',
                                    width: 45,
                                    align: 'center',
                                    items: [
                                        {
                                            iconCls: 'prx-icon-image-trash',
                                            tooltip: 'Remove',
                                            handler: 'onDeleteIata'
                                        }
                                    ]
                                }
                            ]
                                    //</editor-fold>
                        }
                    ]
                },
                //</editor-fold>
                {
                    xtype: 'fieldset',
                    title: '<strong style="color:#121E31; text-decoration: underline; ">Commission Policy Information</strong>',
                    style: {
                        backgroundColor: '#efe5e5'
                    },
                    margin: '0 10 0 10',
                    width: '100%',
                    items: [
                        {
                            name: 'CODCLIT1',
                            fieldLabel: 'Client Code 1',
                            labelWidth: 120,
                            width: 190,
                            maxLength: 5,
                            enforceMaxLength: true,
                            maskRe: /[0-9]/
                        },
                        {
                            name: 'DIRCLIT1',
                            fieldLabel: 'Client Address 1',
                            labelWidth: 120,
                            width: 220,
                            maxLength: 8,
                            enforceMaxLength: true,
                            maskRe: /[0-9]/
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: '<strong style="color:#121E31; text-decoration: underline; ">Chargeback Policy Information</strong>',
                    style: {
                        backgroundColor: '#efe5e5'
                    },
                    margin: '0 10 0 10',
                    width: '100%',
                    items: [
                        {
                            name: 'CODCLIT2',
                            fieldLabel: 'Client Code 2',
                            labelWidth: 120,
                            width: 190,
                            maxLength: 5,
                            enforceMaxLength: true,
                            maskRe: /[0-9]/
                        },
                        {
                            name: 'DIRCLIT2',
                            fieldLabel: 'Client Address 2',
                            labelWidth: 120,
                            width: 220,
                            maxLength: 8,
                            enforceMaxLength: true,
                            maskRe: /[0-9]/
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: '<strong style="color:#121E31; text-decoration: underline; ">Control Data</strong>',
                    style: {
                        backgroundColor: '#E6EEF1'
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
                                    name: 'USCR',
                                    fieldLabel: 'Created User',
                                    labelWidth: 90,
                                    width: 190,
                                    readOnly: true
                                },
                                {
                                    name: 'FECR',
                                    fieldLabel: 'Crt. Date',
                                    labelWidth: 90,
                                    width: 170,
                                    readOnly: true
                                },
                                {
                                    name: 'HOCR',
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
                                    name: 'USUP',
                                    fieldLabel: 'Update User',
                                    labelWidth: 90,
                                    width: 190,
                                    readOnly: true
                                },
                                {
                                    name: 'FEUP',
                                    fieldLabel: 'Upd. Date',
                                    labelWidth: 90,
                                    width: 170,
                                    readOnly: true
                                },
                                {
                                    name: 'HOUP',
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
