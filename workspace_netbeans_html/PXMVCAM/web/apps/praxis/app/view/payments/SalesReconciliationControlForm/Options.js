Ext.define('Ext.Praxis.view.payments.SalesReconciliationControlForm.Options', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-options',
    border: false,
    layout: {
        type: 'hbox',
        pack: 'end'
    },
    items: [
        {
            xtype: 'button',
            id: prototype.id + '-btnProduction',
            text: 'BPO Production',
            margin: '5 5 5 5',
            width: 120,
            tooltip: 'Show Production',
            hidden: true,
            listeners: {
                click: 'onClickProduction'
            }
        },
        {
            xtype: 'panel',
            border: true,
            items: [
                {
                    xtype: 'toolbar',
                    items: [
                        {
                            xtype: 'radiogroup',
                            id: prototype.id + '-viewOption',
                            //fieldLabel: 'Opciones',
                            columns: 3, // Puedes ajustar el número de columnas según tus necesidades
                            vertical: false, // Esto alinea los botones verticalmente,
                            defaults: {
                                margin: '0 5 0 5' // Margen entre los botones
                            },
                            items: [
                                {boxLabel: '<b style="color:#148D28;">Settlement</b>', name: 'opcion', inputValue: 'S', width: 90},
                                {boxLabel: '<b style="color:#148D28;">By Payment</b>', name: 'opcion', inputValue: 'P', checked: true, width: 100},
                                {boxLabel: '<b style="color:#148D28;">By Ticket</b>', name: 'opcion', inputValue: 'T', width: 80}
                            ],
                            listeners: {
                                change: 'onChangeModule'
                            }
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'panel',
            border: true,
            items: [
                {
                    xtype: 'toolbar',
                    items: [
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnSearch',
                            iconCls: 'prx-icon-search',
                            tooltip: 'Search',
                            listeners: {
                                click: 'onClickSearchBtn'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnConciliation',
                            iconCls: 'prx-icon-reload',
                            tooltip: 'Run Conciliation',
                            hidden: true,
                            listeners: {
                                click: 'onClickConciliationBtn'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnProcess',
                            iconCls: 'prx-icon-image-process',
                            tooltip: 'Process',
                            hidden: true,
                            listeners: {
                                click: 'onClickProcessBtn'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnBatchAdju',
                            iconCls: 'prx-icon-processing',
                            tooltip: 'Batch Adjustment',
                            hidden: true,
                            listeners: {
                                click: 'onClickBatchAdjuBtn'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnBatchLog',
                            iconCls: 'prx-icon-image-log',
                            tooltip: 'Batch Log',
                            hidden: true,
                            listeners: {
                                click: 'onClickBatchLogBtn'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnAddTicket',
                            iconCls: 'prx-icon-add',
                            tooltip: 'Add Ticket',
                            hidden: true,
                            listeners: {
                                click: 'onClickAddTicketBtn'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnFilter',
                            iconCls: 'prx-icon-filter',
                            tooltip: 'Display filter',
                            listeners: {
                                click: 'onClickFilterBtn'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnClear',
                            iconCls: 'prx-icon-clear',
                            tooltip: 'Clear Options',
                            listeners: {
                                click: 'onClickClearBtn'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnProcessMassive',
                            iconCls: 'prx-icon-image-process',
                            tooltip: 'Process Massive',
                            hidden: true,
                            listeners: {
                                click: 'onClickProcessMassiveBtn'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnAnalyzeReconciliationErrors',
                            iconCls: 'prx-icon-image-list-error',
                            tooltip: 'Analyze Reconciliation Errors',
                            listeners: {
                                click: 'onClickAnalyzeReconciliationErrors'
                            }
                        }
                    ]
                }
            ]
        }
    ]
});
