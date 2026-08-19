prototype.idDE0425 = prototype.id + '-Compensation0425DataEntry';

Ext.define('Ext.Praxis.view.salesaudit.Compensation0425Form.DataEntrys.Compensation0425DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.Compensation0425DataEntry',
    requires: [
        'Ext.Praxis.controller.salesaudit.Compensation0425Form.Compensation0425DataEntryController'
    ],
    controller: 'Compensation0425DataEntryController',
    title: 'Compensation 0425 - Form',
    header: true,
    width: 930,
    height: 600,
    id: prototype.idDE0425 + '-Compensation0425DataEntry',
    resizable: false,
    layout: 'fit',
    modal: true,
    border: false,
    bodyStyle: 'background: #ffffff;',
    items: [
        {
            xtype: 'form',
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    width: '100%',
                    defaults: {
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            border: false,
                            width: '100%',
                            items: [
                                {
                                    xtype: 'grid',
                                    margin: '5 0 5 0',
                                    minHeight: 100,
                                    viewConfig: {
                                        stripeRows: false,
                                        enableTextSelection: true,
                                        markDirty: true
                                    },
                                    border: true,
                                    columnLines: true,
                                    id: prototype.idDE0425 + '-gridBoletos',
                                    width: 920,
                                    height: 250,
                                    dockedItems: [
                                        {
                                            xtype: 'toolbar',
                                            dock: 'top',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.idDE0425 + '-txtFilterDescrip',
                                                    fieldLabel: 'Description',
                                                    labelWidth: 60,
                                                    labelAlign: 'left',
                                                    emptyText: 'Type to filter...',
                                                    width: 300,
                                                    listeners: {
                                                        change: {
                                                            fn: 'onFilterDescripChange',
                                                            buffer: 300
                                                        }
                                                    }
                                                },
                                                {xtype: 'tbfill'},
                                                {
                                                    xtype: 'button',
                                                    iconCls: 'prx-icon-excel',
                                                    scale: 'small',
                                                    tooltip: 'Export to Excel',
                                                    listeners: {
                                                        click: 'onExportBoletosExcel'
                                                    }
                                                }
                                            ]
                                        }
                                    ],
                                    columns: {
                                        defaults: {
                                            align: 'center',
                                            menuDisabled: true,
                                            sortable: true
                                        },
                                        items: [
                                            {
                                                text: 'Processing<br>Date', dataIndex: 'PRDA', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "font-weight:bold;";
                                                    return value;
                                                }
                                            },
                                            {text: 'PNR', dataIndex: 'PNR', width: 60},
                                            {text: 'Seq', dataIndex: 'CORREL', width: 50},
                                            {text: 'SRCODE', dataIndex: 'SRCODE', width: 60},
                                            {text: 'SRTYPE', dataIndex: 'SRTYPE', width: 80},
                                            {text: 'TYPE', dataIndex: 'TYPE', width: 80},
                                            {text: 'Description', dataIndex: 'DESCRIP', width: 500}
                                        ]
                                    }
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.idDE0425 + '-gridRazones',
                                    columnLines: true,
                                    autoScroll: true,
                                    selModel: 'cellmodel',
                                    plugins: {
                                        ptype: 'cellediting',
                                        clicksToEdit: 1
                                    },
                                    margin: '10 0 5 0',
                                    width: '100%',
                                    height: 150,
                                    dockedItems: [
                                        {
                                            xtype: 'toolbar',
                                            dock: 'top',
                                            items: [
                                                {
                                                    xtype: 'combobox',
                                                    name: 'IN_STATUDATA',
                                                    fieldLabel: 'Status',
                                                    id: prototype.idDE0425 + '-CmbEstatus',
                                                    store: Ext.create('Ext.data.SimpleStore', {
                                                        fields: ['code', 'name'],
                                                        data: [
                                                            ['SU', 'Suggested'],
                                                            ['AM', 'AM Consult'],
                                                            ['RM', 'Manual review'],
                                                            ['SR', 'No applicable rule'],
                                                            ['MA', 'Match'],
                                                            ['AC', 'Customer service'],
                                                            ['SA', 'Supervisor Authorization'],
                                                            ['RN', 'Without Reservation'],
                                                            ['AP', 'Approved'],
                                                            ['UC', 'Unregistered Client'],
                                                            ['US', 'Unregistered Sale'],
                                                            ['SC', 'Unregistered Email'],
                                                            ['IA', 'IATAs Consult']
                                                        ]
                                                    }),
                                                    width: 200,
                                                    labelWidth: 50,
                                                    displayField: 'name',
                                                    valueField: 'code',
                                                    queryMode: 'local',
                                                    editable: false
                                                },
                                                {
                                                    xtype: 'button',
                                                    text: 'Add Razon',
                                                    id: prototype.idDE0425 + '-CmbAddRazon',
                                                    iconCls: 'prx-icon-add',
                                                    listeners: {
                                                        click: 'onAddRazonClick'
                                                    }
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'numberfield',
                                                    id: prototype.idDE0425 + '-MontoDebit',
                                                    fieldLabel: 'Amount',
                                                    name: 'IN_AMOUNT',
                                                    value: 0,
                                                    decimalPrecision: 2,
                                                    allowExponential: false,
                                                    hideTrigger: true,
                                                    keyNavEnabled: false,
                                                    mouseWheelEnable: false,
                                                    fieldStyle: 'text-align:right;',
                                                    labelWidth: 50,
                                                    width: 150
                                                }
                                            ]
                                        }
                                    ],
                                    columns: {
                                        items: [
                                            {text: 'Code', dataIndex: 'A3404CODRZ', width: 50},
                                            {text: 'Description', dataIndex: 'A3404ERROR', width: 500, editor: 'textfield'},
                                            {
                                                xtype: 'actioncolumn',
                                                id: prototype.idDE0425 + '-colRazonRemove',
                                                width: 50,
                                                menuDisabled: true,
                                                sortable: false,
                                                items: [
                                                    {
                                                        iconCls: 'prx-icon-image-trash',
                                                        handler: 'OnChkRFNDRemove'
                                                    }
                                                ]
                                            }
                                        ],
                                        defaults: {
                                            sortable: false,
                                            menuDisabled: true,
                                            align: 'center'
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            id: prototype.idDE0425 + '-fsControlDatas',
                            title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:10px;">Control Data</span>',
                            layout: {
                                type: 'vbox',
                                pack: 'left'
                            },
                            border: true,
                            margin: '5 5 5 5',
                            width: '100%',
                            style: {
                                backgroundColor: '#EEF3F9' // Cambiar el color de fondo a gris claro (#f0f0f0)
                            },
                            items: [
                                {
                                    xtype: 'form',
                                    layout: {
                                        type: 'vbox',
                                        pack: 'left'
                                    },
                                    width: '100%',
                                    border: false,
                                    bodyStyle: 'background: transparent',
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
                                            editable: false
                                        }
                                    },
                                    items: [
                                        {
                                            items: [
                                                {
                                                    labelWidth: 75,
                                                    width: 175,
                                                    id: prototype.idDE0425 + '-fsControlUSCR',
                                                    fieldLabel: 'User Crt.',
                                                    name: 'USCR'
                                                },
                                                {
                                                    labelWidth: 75,
                                                    width: 175,
                                                    id: prototype.idDE0425 + '-fsControlFECR',
                                                    fieldLabel: 'Date Crt.',
                                                    name: 'FECR'
                                                },
                                                {
                                                    labelWidth: 75,
                                                    width: 175,
                                                    id: prototype.idDE0425 + '-fsControlHOCR',
                                                    fieldLabel: 'Hour Crt.',
                                                    name: 'HOCR'
                                                }
                                            ]
                                        },
                                        {
                                            items: [
                                                {
                                                    labelWidth: 75,
                                                    width: 175,
                                                    id: prototype.idDE0425 + '-fsControlUSUP',
                                                    fieldLabel: 'User Upd.',
                                                    name: 'USUP'
                                                },
                                                {
                                                    labelWidth: 75,
                                                    width: 175,
                                                    id: prototype.idDE0425 + '-fsControlFEUP',
                                                    fieldLabel: 'Date Upd.',
                                                    name: 'FEUP'
                                                },
                                                {
                                                    labelWidth: 75,
                                                    width: 175,
                                                    id: prototype.idDE0425 + '-fsControlHOUP',
                                                    fieldLabel: 'Hour Upd.',
                                                    name: 'HOUP'
                                                }
                                            ]
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
            ui: 'footer',
            border: false,
            margin: '7 5 7 5',
            padding: '3 0 3 0',
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
                    id: prototype.idDE0425 + '-btn-update',
                    iconCls: 'prx-icon-reload',
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'History Log',
                    id: prototype.idDE0425 + '-btn-viewCompensation0425FormLog',
                    iconCls: 'prx-icon-detail',
                    listeners: {
                        click: 'onViewCompensation0425FormLog'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.idDE0425 + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});