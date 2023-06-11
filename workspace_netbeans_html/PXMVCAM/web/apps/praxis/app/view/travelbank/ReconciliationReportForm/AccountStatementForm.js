Ext.define('Ext.Praxis.view.travelbank.ReconciliationReportForm.AccountStatementForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.AccountStatementForm',
    controller: 'AccountStatementController',
    requires: [
        'Ext.Praxis.controller.travelbank.ReconciliationReport.AccountStatementController',
        'Ext.Praxis.view.travelbank.ReconciliationReportForm.InfoEstadoCuenta'
    ],
    title: 'Account statatement detail',
    header: true,
    width: 1020,
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
            id: prototype.id3 + '-formDataEntry',
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
                            width: '100%',
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id3 + '-NCTA',
                                            fieldLabel: 'Account Number', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 125, fieldStyle: 'text-align:center;font-size:12px',
                                            readOnly: true,
                                            width: 280
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id3 + '-MDA',
                                            fieldLabel: 'Currency:', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 90, fieldStyle: 'text-align:center;font-size:12px',
                                            readOnly: true,
                                            width: 145
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
                                            xtype: 'panel',
                                            width: '100%',
                                            //margin: '2 2 2 2',
                                            border: false,
                                            //padding: 2,
                                            layout: {
                                                type: 'hbox'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id3 + '-SALDO',
                                                    fieldLabel: 'Balance:', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                                    labelWidth: 125, fieldStyle: 'text-align:right;font-size:14px;color:green;font-weight:bold;',
                                                    readOnly: true,
                                                    width: 245
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id3 + '-SALRV',
                                                    fieldLabel: 'Balance Revenue:', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                                    labelWidth: 125, fieldStyle: 'text-align:right;font-size:14px;color:green;font-weight:bold;',
                                                    readOnly: true,
                                                    width: 245
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: prototype.id3 + '-SALPE',
                                                    fieldLabel: 'Balance Pesos:', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                                    labelWidth: 125, fieldStyle: 'text-align:right;font-size:14px;color:green;font-weight:bold;',
                                                    readOnly: true,
                                                    width: 245
                                                },
                                                {
                                                    xtype: 'panel',
                                                    //padding: '2px',
                                                    width: 200,
                                                    border: false,
                                                    layout: {
                                                        type: 'hbox',
                                                        pack: 'end'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'button',
                                                            id: prototype.id3 + '-btnExcel',
                                                            iconCls: 'prx-icon-excel',
                                                            tooltip: 'Export to Excel',   
                                                            text:'Download',
                                                            listeners: {
                                                                //click: 'btnExcel_click'
                                                            }
                                                        }
                                                    ]
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
                            border: false,
                            padding: 4,
                            items: [
                                {
                                    region: 'center',
                                    id: prototype.id3 + '-contentInfo',
                                    xtype: prototype.id3 + '-infoEstadoCuenta'
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
                    id: prototype.id3 + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});

