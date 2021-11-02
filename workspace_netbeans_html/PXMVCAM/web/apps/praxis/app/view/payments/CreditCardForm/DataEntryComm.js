Ext.define('Ext.Praxis.view.payments.CreditCardForm.DataEntryComm', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryCommCreditCardForm',
    requires: [
        'Ext.Praxis.controller.payments.CreditCard.DataEntryCommCreditCardController'
    ],
    controller: 'DataEntryCommCreditCardController',
    title: 'Credit Card Commission - Data Entry Form',
    header: true,
    height: 510,
    width: 1000,
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
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent;"',
                    layout: 'vbox',
                    width: 1000,
                    defaults: {
                        anchor: '100%'
                    },
                    style: {
                        borderColor: 'black',
                        borderStyle: 'solid'
                    },
                    items: [
                        {
                            xtype: 'label',
                            text: 'Credit Card Information',
                            style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                            bodyStyle: 'background:#E5ECEF;',
                            fontSize: '11',
                            width: 234,
                            height: 20,
                            margin: '4 2 4 8'
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: true,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '0 2 0 8',
                            width: 1000,
                            defaults: {
                                anchor: '100%'
                            },
                            style: {
                                borderColor: 'black',
                                borderStyle: 'solid'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Code',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:#9C1717;',
                                    width: 25
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtCODE',
                                    fieldStyle: 'text-align:center',
                                    enableKeyEvents: false,
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: false,
                                    maxLength: 2,
                                    maskRe: /[a-zA-Z]/,
                                    readOnly: false,
                                    width: 50,
                                },
                                {xtype: 'tbspacer', width: 15},
                                {
                                    xtype: 'label',
                                    text: 'Name',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 110
                                },
                                {xtype: 'tbspacer', width: 32},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtNAMEC',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:center;',
                                    width: 280,
                                    editable: true,
                                    enforceMaxLength: true,
                                    maxLength: 40
                                },
                                {xtype: 'tbspacer', width: 15},
                                {
                                    xtype: 'label',
                                    text: 'Equivalent Code',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 40},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtCODEQUIV',
                                    fieldStyle: 'text-align:center',
                                    enableKeyEvents: false,
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: false,
                                    maxLength: 2,
                                    maskRe: /[a-zA-Z]/,
                                    readOnly: false,
                                    width: 60
                                }
                            ]
                        },
                        {xtype: 'tbspacer', width: 80, height: 10},
                        {
                            xtype: 'label',
                            text: 'Bank Information',
                            style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                            bodyStyle: 'background:#E5ECEF;',
                            fontSize: '11',
                            width: 234,
                            height: 20,
                            margin: '0 2 2 8'
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#efe5e5;',
                            margin: '0 2 2 20',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Code',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 66},
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:red;',
                                    width: 20,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Mandatory Field'
                                    }
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtCODEBANK',
                                    fieldStyle: 'text-align:center',
                                    enableKeyEvents: false,
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: false,
                                    maxLength: 2,
                                    maskRe: /[a-zA-Z]/,
                                    readOnly: false,
                                    width: 50,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 40},
                                {
                                    xtype: 'label',
                                    text: 'Name: ',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 100
                                },
                                {xtype: 'tbspacer', width: 24},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtNAMEBANK',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:center;',
                                    maxChars: '40',
                                    width: 290
                                },
                                {xtype: 'tbspacer', width: 40},
                                {
                                    xtype: 'label',
                                    text: 'Country',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 66},
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:red;',
                                    width: 20,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Mandatory Field'
                                    }
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtCOUNTRY',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    width: 50,
                                    readOnly: false,
                                    maxLength: 2,
                                    maskRe: /[a-zA-Z]/,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 123}
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#efe5e5;',
                            margin: '0 2 2 20',
                            defaults: {
                                anchor: '100%',
                                width: 1000
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Currency',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:red;',
                                    width: 20,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Mandatory Field'
                                    }
                                },
                                {xtype: 'tbspacer', width: 4},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtCURRENC',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:center;',
                                    width: 60,
                                    readOnly: false,
                                    enforceMaxLength: true,
                                    maxLength: 3,
                                    maskRe: /[a-zA-Z]/,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 40},
                                {
                                    xtype: 'label',
                                    text: 'Flag Not Bank',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 100,
                                },
                                {xtype: 'tbspacer', width: 24},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbFNOBANK',
                                    fieldStyle: 'text-align:left;',
                                    valueField: 'code',
                                    displayField: 'name',
                                    width: 290,
                                    editable: false
                                },
                                {xtype: 'tbspacer', width: 40},
                                {
                                    xtype: 'label',
                                    text: 'Status',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 50},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbFSTAT',
                                    fieldStyle: 'text-align:center;',
                                    valueField: 'code',
                                    displayField: 'name',
                                    width: 90,
                                    editable: false
                                },
                                {xtype: 'tbspacer', width: 353}
                            ]
                        },
                        {xtype: 'tbspacer', width: 6},
                        {
                            xtype: 'label',
                            text: 'Bank BSP Information',
                            style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                            bodyStyle: 'background:#E5ECEF;',
                            fontSize: '11',
                            width: 234,
                            margin: '15 2 4 8'
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#efe5e5;',
                            margin: '4 2 0 20',
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Code',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 90},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtCODE1',
                                    fieldStyle: 'text-align:center',
                                    enableKeyEvents: false,
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: false,
                                    maxLength: 2,
                                    maskRe: /[a-zA-Z]/,
                                    readOnly: false,
                                    width: 50,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 40},
                                {
                                    xtype: 'label',
                                    text: 'Name: ',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 100
                                },
                                {xtype: 'tbspacer', width: 24},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtNAME1',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:center;',
                                    maxChars: '40',
                                    width: 290
                                },
                                {xtype: 'tbspacer', width: 40},
                            ]
                        },
                        {xtype: 'tbspacer', width: 6},
                        {
                            xtype: 'label',
                            text: 'Comission Information',
                            style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                            bodyStyle: 'background:#E5ECEF;',
                            fontSize: '11',
                            width: 234,
                            margin: '15 2 4 8'

                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            width: 1000,
                            bodyStyle: 'background:#efe5e5;',
                            margin: '4 2 12 20',
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataCommInfo',
                                    //height: 510,
                                    width: 954,
                                    hidden: false,
                                    columnLines: true,
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'

                                        },
                                        items: [
                                            {text: 'Seq', dataIndex: '', width: 50},
                                            {text: 'Comission',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'Code', dataIndex: '', width: 50},
                                                    {text: 'Description', dataIndex: '', width: 240}
                                                ]
                                            },
                                            {text: 'Effective Date',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'From', dataIndex: '', width: 120},
                                                    {text: 'To', dataIndex: '', width: 120},
                                                ]
                                            },
                                            {text: 'Base', dataIndex: '', width: 80},
                                            {text: 'Rate', dataIndex: '', width: 80},
                                            {text: 'IVA',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Rate', dataIndex: '', width: 100,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            return value;
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Min',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Amt.', dataIndex: '', width: 80}
                                                ]
                                            },
                                            {text: 'Months', dataIndex: '', width: 80},
                                            /*{
                                                sortable: false,
                                                xtype: 'actioncolumn',
                                                width: 40,
                                                text: 'Edit',
                                                align: 'center',
                                                items: [
                                                    {
                                                        iconCls: 'prx-icon-edit',
                                                        tooltip: 'Edit',
                                                        handler: 'onEditClickDEComm'
                                                    }
                                                ]
                                            }*/
                                        ]
                                    }
                                },
                            ]
                        }
                    ]
                },
                // <editor-fold defaultstate="collapsed" desc="ControlData">
                {
                    xtype: 'label',
                    text: 'Control Data',
                    fontSize: '11',
                    style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                    width: 234,
                    margin: '8 2 4 8'
                },
                {
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '8 2 4 20',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Creator User ',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120,
                                    height: 20
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtUSCR',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'Creation Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtFECR',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'Creation Time',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtHOCR',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            border: false,
                            layout: 'hbox',
                            margin: '8 2 4 20',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'User Update',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtUSUP',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'Update Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtFEUP',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'label',
                                    text: 'Update Time',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtHOUP',
                                    readOnly: true,
                                    width: 80,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                }
                            ]
                        }
                    ]
                }
                // </editor-fold>
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
                    id: prototype.id + '-btn-save',
                    iconCls: 'prx-icon-save',
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update',
                    id: prototype.id + '-btn-update',
                    iconCls: 'prx-icon-update',
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Delete',
                    id: prototype.id + '-btn-delete',
                    iconCls: 'prx-icon-delete',
                    listeners: {
                        click: 'onDeleteClick'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.id + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
}
);