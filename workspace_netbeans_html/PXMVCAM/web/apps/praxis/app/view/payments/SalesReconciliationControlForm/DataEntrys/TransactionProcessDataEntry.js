Ext.define('Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.TransactionProcessDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.TransactionProcessDataEntry',
    requires: [
        'Ext.Praxis.controller.payments.SalesReconciliationControl.TransactionProcessDataEntryController'
    ],
    controller: 'TransactionProcessDataEntryController',
    title: 'Transaction Process - Form',
    header: true,
    width: 440,
    resizable: false,
    layout: 'fit',
    modal: true,
    border: false,
    dataFilters: [],
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'panel',
            width: '100%',
            layout: {
                type: 'hbox',
                align: 'center',
                
            },defaults: {
                margin: '5 5 5 5'
            },
            border: false,
            items: [
                {
                    xtype: 'container',
                    layout: {
                        type: 'vbox',
                        align: 'center',
                        pack: 'start'
                    },
                    defaults: {
                        margin: '5 5 5 5'
                    },
                    items: [
                        {
                            xtype: 'datefield',
                            id: prototype.id + '-processTransactionBatchFrom',
                            fieldLabel: 'From',
                            format: 'Ymd',
                            editable: false,
                            labelWidth: 50,
                            width: 150,
                            value: new Date(),
                            listeners: {
                                change: 'onChangeDateProcessTransaction'
                            }
                        },
                        {
                            xtype: 'datefield',
                            id: prototype.id + '-processTransactionBatchTo',
                            fieldLabel: 'To',
                            format: 'Ymd',
                            editable: false,
                            labelWidth: 50,
                            width: 150,
                            value: new Date(),
                            listeners: {
                                change: 'onChangeDateProcessTransaction'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'vbox',
                        align: 'center',
                        pack: 'start'
                    },
                    defaults: {
                        margin: '5 5 5 5'
                    },
                    items: [
                        {
                            xtype: 'combo',
                            id: prototype.id + '-ProcessReglas',
                            labelWidth: 70,
                            width: 230,
                            valueField: 'CODE',
                            displayField: 'NAME',
                            fieldLabel: 'Rule Priority',
                            queryMode: 'local',
                            editable: false,
                            allowBlank: true,
                            caseSensitive: false,
                            autoSelect: true,
                            labelAlign: 'right',
                            typeAhead: true,
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            forceSelection: true,
                            listeners: {
                                render: function(combo) {
                                    // Inicializamos QuickTipManager y registramos un tooltip base
                                    Ext.tip.QuickTipManager.init();
                                    Ext.tip.QuickTipManager.register({
                                        target: combo.getId(),
                                        text: 'Seleccione una regla para ver detalle'
                                    });
                                },
                                select: function(combo, record) {
                                    let comentario = record.get('COMMENT') || 'Sin descripción';

                                    // Actualizamos el tooltip dinámicamente
                                    Ext.tip.QuickTipManager.unregister(combo.getId());
                                    Ext.tip.QuickTipManager.register({
                                        target: combo.getId(),
                                        text: comentario
                                    });
                                }
                            }
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-ProcessProcessor',
                            labelWidth: 70,
                            width: 230,
                            valueField: 'A4451KEY2',
                            displayField: 'A4451DESC1',
                            fieldLabel: 'Processor',
                            queryMode: 'local',
                            editable: false,
                            allowBlank: true,
                            caseSensitive: false,
                            autoSelect: true,
                            labelAlign: 'right',
                            typeAhead: true,
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            forceSelection: true
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
                    text: 'Process',
                    iconCls: 'prx-icon-image-process',
                    listeners: {
                        click: 'onProcessClick'
                    }
                },
                {
                    text: 'Cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});