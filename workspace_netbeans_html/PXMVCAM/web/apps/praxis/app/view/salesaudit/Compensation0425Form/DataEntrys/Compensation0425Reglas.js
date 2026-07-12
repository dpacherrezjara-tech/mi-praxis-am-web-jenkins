prototype.idDE = prototype.id + '-Compensation0425Reglas';
Ext.define('Ext.Praxis.view.salesaudit.Compensation0425Form.DataEntrys.Compensation0425Reglas', {
    extend: 'Ext.window.Window',
    alias: 'widget.Compensation0425Reglas',
    requires: [
        'Ext.Praxis.controller.salesaudit.Compensation0425Form.Compensation0425ReglasController'
    ],
    controller: 'Compensation0425ReglasController',
    title: 'Rule maintenance',
    header: true,
    width: 930,
    height: 520,
    id: prototype.idDE + '-Compensation0425Reglas',
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
                                    xtype: 'fieldset',
                                    title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:10px;">Rule Data</span>',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    border: true,
                                    margin: '0 0 10 0',
                                    width: '100%',
                                    style: {
                                        backgroundColor: '#EEF3F9'
                                    },
                                    defaults: {
                                        xtype: 'panel',
                                        layout: {
                                            type: 'hbox'
                                        },
                                        border: false,
                                        bodyStyle: 'background: transparent',
                                        width: '100%'
                                    },
                                    items: [
                                        {
                                            defaults: {
                                                labelStyle: 'text-align:left;font-weight: bolder;',
                                                margin: '5 15 5 0'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.idDE + '-code',
                                                    fieldLabel: 'Code',
                                                    maskRe: /[A-Z,a-z,Ñ,ñ]/, readOnly: true,
                                                    fieldStyle: 'text-align:center;',
                                                    labelWidth: 45,
                                                    width: 100
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.idDE + '-currency',
                                                    fieldLabel: 'Currency',
                                                    maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                                    maxLength: 3,
                                                    enforceMaxLength: 3,
                                                    fieldStyle: 'text-align:center;',
                                                    labelWidth: 55,
                                                    width: 100
                                                },
                                                {
                                                    xtype: 'numberfield',
                                                    id: prototype.idDE + '-Amount',
                                                    fieldLabel: 'Amount',
                                                    value: 0,
                                                    decimalPrecision: 2,
                                                    allowExponential: false,
                                                    hideTrigger: true,
                                                    keyNavEnabled: false,
                                                    mouseWheelEnable: false,
                                                    fieldStyle: 'text-align:right;',
                                                    labelWidth: 55,
                                                    width: 150
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.idDE + '-Filter',
                                                    fieldLabel: 'Filter',
                                                    maxLength: 2,
                                                    enforceMaxLength: 2,
                                                    fieldStyle: 'text-align:center;',
                                                    labelWidth: 40,
                                                    width: 90,
                                                    margin: '5 0 5 0'
                                                }
                                            ]
                                        },
                                        {
                                            margin: '0 0 5 0',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.idDE + '-Rule1',
                                                    fieldLabel: 'Rule 1',
                                                    maxLength: 50,
                                                    enforceMaxLength: 50,
                                                    labelWidth: 45,
                                                    labelStyle: 'text-align:left;font-weight: bolder;',
                                                    flex: 1,
                                                    validator: function (value) {
                                                        if (!value) {
                                                            return true;
                                                        }
                                                        return (/[;|\\/:]/).test(value) ? 'Use comma (,) as separator' : true;
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            margin: '0 0 5 0',
                                            items: [
                                                {
                                                    xtype: 'textarea',
                                                    id: prototype.idDE + '-Rule2',
                                                    fieldLabel: 'Rule 2',
                                                    labelWidth: 45,
                                                    labelStyle: 'text-align:left;font-weight: bolder;',
                                                    flex: 1,
                                                    height: 70,
                                                    maxLength: 500,
                                                    enforceMaxLength: 500,
                                                    validator: function (value) {
                                                        if (!value) {
                                                            return true;
                                                        }
                                                        return (/[;|\\/:]/).test(value) ? 'Use comma (,) as separator' : true;
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: {
                                        type: 'hbox',
                                        pack: 'end'
                                    },
                                    border: false,
                                    width: '100%',
                                    margin: '0 0 5 0',
                                    items: [
                                        {
                                            xtype: 'button',
                                            id: prototype.idDE + '-btnclear',
                                            text: 'Clear',
                                            iconCls: 'prx-icon-clear',
                                            tooltip: 'Clear Data',
                                            listeners: {
                                                click: 'onClickClearOptionsBtn'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'button',
                                            id: prototype.idDE + '-btnupdate',
                                            text: 'Save',
                                            iconCls: 'prx-icon-reload',
                                            tooltip: 'Update Data',
                                            listeners: {
                                                click: 'onSaveClick'
                                            }
                                        }
                                    ]
                                },
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
                                    id: prototype.idDE + '-gridReglas',
                                    width: 890,
                                    height: 250,
                                    dockedItems: [
                                        {
                                            xtype: 'toolbar',
                                            dock: 'top',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.idDE + '-txtFilterDescrip',
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
                                            {text: 'Code', dataIndex: 'A4963CODI', width: 60, listeners: {click: 'metadata_detalle'}},
                                            {text: 'Cur.', dataIndex: 'A4963MDA', width: 60},
                                            {text: 'Amount', dataIndex: 'A4963NETOL', width: 120, renderer: 'onColumnAmountRenderer'},
                                            {text: 'Filter', dataIndex: 'A4963REGLA', width: 60},
                                            {text: 'Rule 1', dataIndex: 'A4963DESCC', width: 300},
                                            {text: 'Rule 2', dataIndex: 'A4961DESCR', width: 400},
                                            {text: 'User<br>Crt.', dataIndex: 'A4963REGIS', width: 100},
                                            {text: 'Date<br>Crt.', dataIndex: 'A4963FREGI', width: 80},
                                            {text: 'Hour <br> Crt.', dataIndex: 'A4963HREGI', width: 60}
                                        ]
                                    }
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