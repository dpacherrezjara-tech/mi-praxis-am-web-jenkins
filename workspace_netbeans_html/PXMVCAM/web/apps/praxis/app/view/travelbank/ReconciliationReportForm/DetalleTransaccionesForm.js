Ext.define('Ext.Praxis.view.travelbank.ReconciliationReportForm.DetalleTransaccionesForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.DetalleTransaccionesForm',
    controller: 'DetalleTransaccionesController',
    requires: [
        'Ext.Praxis.controller.travelbank.ReconciliationReport.DetalleTransaccionesController',
        'Ext.Praxis.view.travelbank.ReconciliationReportForm.InfoTransaction'
    ],
    title: 'Transaction details',
    header: true,
    width: 945,
    height: 650,
    border: false,
    resizable: false,
    layout: 'fit',
    modal: true,
    defaults: {
        border: false,
        bodyStyle: 'background: #FFFFFF;"'
    },
    items: [
        {
            xtype: 'form',
            id: prototype.id2 + '-formDataEntry',
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'fieldset',
                            layout: 'vbox',
                            margin: '2 2 2 2',
                            border: true,
                            padding: 2,
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id2 + '-NCTA',
                                            fieldLabel: 'Account Number', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 125, fieldStyle: 'text-align:center;font-size:12px',
                                            readOnly: true,
                                            width: 280
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id2 + '-CRDID',
                                            fieldLabel: 'Credit ID', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 100, fieldStyle: 'text-align:center;font-size:14px;font-weight:bold;',
                                            readOnly: true,
                                            width: 245
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id2 + '-MDA',
                                            fieldLabel: 'Currency:', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 80, fieldStyle: 'text-align:center;font-size:12px',
                                            readOnly: true,
                                            width: 135
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id2 + '-SERV',
                                            fieldLabel: 'Service Code', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 125, fieldStyle: 'text-align:center;font-size:12px',
                                            readOnly: true,
                                            width: 280
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id2 + '-FEMIS',
                                            fieldLabel: 'Issue Date:', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 100, fieldStyle: 'text-align:center;font-size:12px',
                                            readOnly: true,
                                            width: 190
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id2 + '-EXPDT',
                                            fieldLabel: 'Expire Date:', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 100, fieldStyle: 'text-align:center;font-size:12px',
                                            readOnly: true,
                                            width: 190
                                        },
                                        {
                                            xtype: 'panel',
                                            width: '100%',
                                            margin: '2 2 2 2',
                                            border: false,
                                            padding: 2,
                                            layout: {
                                                type: 'vbox',
                                                pack: 'end'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id2 + '-AORIG',
                                                    fieldLabel: 'Original Amount:', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                                    labelWidth: 125, fieldStyle: 'text-align:right;font-size:14px;',
                                                    readOnly: true,
                                                    width: 245
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id2 + '-AUSAD',
                                                    fieldLabel: 'Usage Amount:', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                                    labelWidth: 125, fieldStyle: 'text-align:right;font-size:14px;color:red',
                                                    readOnly: true,
                                                    width: 245
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id2 + '-ABALR',
                                                    fieldLabel: 'Balance Remaining:', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                                    labelWidth: 125, fieldStyle: 'text-align:right;font-size:14px;color:green;font-weight:bold;',
                                                    readOnly: true,
                                                    width: 245
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'column',
                            margin: '1 0 1 0',
                            padding: 4,
                            border: false,
                            items: [
                                {
                                    region: 'center',
                                    id: prototype.id2 + '-contentInfo',
                                    xtype: prototype.id2 + '-infoTransaction'
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
            border: false,
            ui: 'footer',
            margin: '5 5 5 5', // left/right/top/botton
            defaults: {
                scale: 'medium'
            },
            style: 'aling:center padding: 5px;',
            items: [
                {
                    text: 'Close',
                    id: prototype.id2 + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});

