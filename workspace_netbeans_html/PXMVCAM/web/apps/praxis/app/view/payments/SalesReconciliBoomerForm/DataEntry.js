Ext.define('Ext.Praxis.view.payments.SalesReconciliBoomerForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntrySalesReconciliBoomerForm',
    requires: [
        'Ext.Praxis.controller.payments.SalesReconciliBoomer.DataEntrySalesReconciliBoomerController'
    ],
    controller: 'DataEntrySalesReconciliBoomerController',
    title: 'Sales Reconciliation by Boomer - Data Entry Form',
    header: true,
//    height: 575,
    width: 895,
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
                textDecoration: 'underline',
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent;"',
                    layout: 'vbox',
                    width: 930,
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '10 2 2 5',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Sales Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    padding: '3 0',
                                    width: 110
                                },
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:red;',
                                    padding: '3 0',
                                    width: 20
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtSDATE',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 8,
                                    //readOnly: true,
                                    width: 70
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    text: 'Ref. Number',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 80,
                                    padding: '3 0'
                                },
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:red;',
                                    padding: '3 0',
                                    width: 20
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtREFNBR',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 14,
                                    //readOnly: true,
                                    padding: '3 0',
                                    width: 100
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    text: 'Settlement Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    padding: '3 0',
                                    width: 110
                                },
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:red;',
                                    padding: '3 0',
                                    width: 20
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtDATSET',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 6,
                                    //readOnly: true,
                                    width: 70
                                },
                                {xtype: 'tbspacer', width: 30},
                                {
                                    xtype: 'label',
                                    text: 'Period',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    padding: '3 0',
                                    width: 60
                                },
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:red;',
                                    padding: '3 0',
                                    width: 20
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtWEEKMO',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 2,
                                    //readOnly: true,
                                    width: 70
                                },
                                {xtype: 'tbspacer', width: 20},
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '0 2 2 5',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Ticket Number',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 109,
                                    margin: '0 0 0 5',
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'CCIA(3)+FORMA(4)+SERIE(6)'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:red;',
                                    width: 20
                                },
                                {xtype: 'tbspacer', width: 3},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtTicket',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    //readOnly: true,
                                    maxLength: 13,
                                    width: 140

                                },
                                {xtype: 'tbspacer', width: 60},
                                {
                                    xtype: 'label',
                                    text: 'Document Type',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 120,
                                    padding: '3 0'
                                },
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:red;',
                                    width: 20
                                },
                                {
                                    xtype: 'combobox',
                                    id: prototype.id + '-de-cmbTDOC',
                                    queryMode: 'local',
                                    width: 90,
                                    fieldStyle: 'color:#074066;',
                                    queryMode: 'local',
                                            forceSelection: true,
                                    selectOnFocus: false,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: false,
                                    //disabled: true,
                                    typeAhead: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    enableKeyEvents: true,
                                    triggerAction: 'all'
                                },
                                {xtype: 'tbspacer', width: 160}
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF',
                            margin: '0 2 2 5',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Card Code',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 107,
                                    padding: '3 0'
                                },
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:red;',
                                    width: 20
                                },
                                {xtype: 'tbspacer', width: 3},
                                {
                                    xtype: 'combobox',
                                    id: prototype.id + '-de-cmbSCARCOD',
                                    fieldStyle: 'color:#074066;',
                                    queryMode: 'local',
                                    forceSelection: true,
                                    selectOnFocus: false,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: false,
                                    width: 300,
                                    //disabled: true,
                                    typeAhead: true,
                                    valueField: 'CODE',
                                    displayField: 'NAME',
                                    enableKeyEvents: true,
                                    triggerAction: 'all'
                                },
                                {xtype: 'tbspacer', width: 39},
                                {
                                    xtype: 'label',
                                    text: 'Card Number',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 120,
                                    padding: '3 0'
                                },
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:red;',
                                    padding: '3 0',
                                    width: 20
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtCard',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    maxLength: 16,
                                    maskRe: /[0-9, */]/,
                                    padding: '3 0',
                                    //readOnly: true,
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 40}
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '0 2 2 5',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},                                
                                {
                                    xtype: 'label',
                                    text: 'Authorization Code',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 120,
                                    padding: '3 0'
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtSAUTHOC',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    maxLength: 6,
                                    //readOnly: true,
                                    padding: '3 0',
                                    width: 150
                                },
                                {xtype: 'tbspacer', width: 84},
                                {
                                    xtype: 'label',
                                    text: 'PNR',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    padding: '3 0',
                                    width: 40
                                },
                                {xtype: 'tbspacer', width: 41},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtSPNR',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    maxLength: 6,
                                    //readOnly: true,
                                    width: 210
                                },
                                {xtype: 'tbspacer', width: 38}
                                
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '0 2 2 5',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Country',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 130,
                                    padding: '3 0'
                                },
//                                { xtype: 'tbspacer', width: 3 },
                                {
                                    xtype: 'combobox',
                                    id: prototype.id + '-de-cmbSCOUNTRY',
                                    fieldStyle: 'color:#074066;',
                                    queryMode: 'local',
                                    forceSelection: true,
                                    selectOnFocus: false,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: false,
                                    width: 300,
                                    //disabled: true,
                                    value: null,
                                    typeAhead: true,
                                    valueField: 'A006PAIS',
                                    displayField: 'A006NOMBRE',
                                    enableKeyEvents: true,
                                    triggerAction: 'all'
                                },
                                {xtype: 'tbspacer', width: 39},
                                {
                                    xtype: 'label',
                                    text: 'Status',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 70,
                                    padding: '3 0'
                                },
                                {xtype: 'tbspacer', width: 70},
                                {
                                    xtype: 'combobox',
                                    id: prototype.id + '-de-cmbSTVAL',
                                    fieldStyle: 'color:#074066;',
                                    queryMode: 'local',
                                    forceSelection: true,
                                    selectOnFocus: false,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: false,
                                    width: 210,
                                    //disabled: true,
                                    value: null,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    enableKeyEvents: true,
                                    triggerAction: 'all'
                                },
                                {xtype: 'tbspacer', width: 39}

                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '0 2 2 5',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Amount',
                                    style: 'font-weight:bold;color:#121E31;',
                                    width: 130,
                                    padding: '3 0'
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtSVFOP',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    maxLength: 15,
                                    padding: '3 0',
                                    //readOnly: false,
                                    maskRe: /[0-9]/,
                                    width: 125
                                },
                                {xtype: 'tbspacer', width: 40},
                                {
                                    xtype: 'label',
                                    text: 'Currency',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 80
                                },
                                {xtype: 'tbspacer', width: 5},
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
                                    id: prototype.id + '-de-txtSCURRENCY',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    maxLength: 3,
                                    padding: '3 0',
                                    //readOnly: true,
                                    width: 40
                                },
                                {xtype: 'tbspacer', width: 84},
                                {xtype: 'tbspacer', width: 291},
                                {xtype: 'tbspacer', width: 38}
                            ]
                        },
                    ]
                },
                // <editor-fold defaultstate="collapsed" desc="ControlData">
                {
                    xtype: 'label',
                    html: '<strong style="color:#121E31; text-decoration: underline; ">Control Information</strong>',
                    textDecoration: 'underline',
                    height: 70,
                    fontSize: '11',
                    style: 'font-weight:bold;color:#0B333C;',
                    width: 234,
                    margin: '8 2 50 10'

                },
                {
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '10 2 4 50',
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
                            margin: '5 0 10 50',
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
            margin: '3 0 20 0',
//            layout: {
//                pack: 'center'
//            },
            fieldStyle: 'text-align:left',
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
                },
                {xtype: 'tbspacer', width: 30},
                {
//                    text: 'View Previous Ticket',
                    id: prototype.id + '-btn-imgPrev',
                    icon: 'resources/img/botones/16x16/prev.png',
                    autoEl: {
                        tag: 'label',
                        'data-qtip': 'View Previous Ticket'
                    }
//                    listeners:{
//                        click: 'onCancelClick'
//                    }
                },
                {
//                    text: 'View Next Ticket',
                    id: prototype.id + '-btn-imgNext',
                    icon: 'resources/img/botones/16x16/next.png',
                    autoEl: {
                        tag: 'label',
                        'data-qtip': 'View Next Ticket'
                    }
//                    listeners:{
//                        click: 'onCancelClick'
//                    }
                }
            ]
        }
    ]
}
);