prototype.idEX = prototype.id + '-AccountingExecuteDataEntry';

Ext.define('Ext.Praxis.view.payments.AccountingMasterProcessForm.DataEntrys.AccountingExecuteDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.AccountingExecuteDataEntry',
    requires: [
        'Ext.Praxis.controller.payments.AccountingMasterProcess.AccountingExecuteController'
    ],
    controller: 'AccountingExecuteController',
    title: 'Execute Accounting Process',
    header: true,
    width: 550,
    height: 150,
    // maxHeight: 150,
    resizable: false,
    scrollable: true,
    layout: 'fit',
    modal: true,
    border: false,
    bodyStyle: 'background-color: white !important;',
    listeners: {
        afterrender: 'afterRender'
    },

    tbar: {
        
        items: [
            {
                xtype: 'form',
                id: prototype.idEX + '-filtersForm',
                layout: {
                    type: 'hbox',
                    pack: 'start'
                },
                border: false,
                bodyStyle: 'background: transparent',
                padding: '5 5 0 5',
                defaults: {
                    margin: '2 5 5 5',
                    labelStyle: 'text-align:right;font-weight: bolder;',
                    fieldStyle: 'text-align:center;',
                },
                items: [
                    {
                        xtype: 'hiddenfield',
                        name: 'IN_CCUST',
                        value: '139',
                        hidden: true,
                    },
                    {
                        xtype: 'datefield',
                        fieldLabel: 'Processing Date',
                        name: 'IN_DATE',
                        id: prototype.idEX + '-filterDate',
                        format: 'Ymd',
                        labelWidth: 110,
                        width: 200,
                        editable: false
                    },
                    {
                        xtype: 'combobox',
                        fieldLabel: 'Module Processor',
                        name: 'IN_MODULE',
                        id: prototype.idEX + '-filterAccountingModule',
                        labelWidth: 120,
                        width: 300,
                        displayField: 'DESCRIPTION',
                        valueField: 'CODE',
                        queryMode: 'local',
                        editable: false,
                        value: 'PPAYMENT'
                    }
                ]
            }
        ],
    },
    
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            margin: '7 0 7 0',
            layout: {
                pack: 'center'
            },
            defaults: {
                scale: 'medium',
                margin: '0 5 0 5'
            },
            items: [
                {
                    text: 'Execute',
                    iconCls: 'prx-icon-image-process',
                    tooltip: 'Execute Accounting Process',
                    listeners: {
                        click: 'onClickExecute'
                    }
                },
                {
                    text: 'Cancel',
                    iconCls: 'prx-icon-cancel',
                    tooltip: 'Cancel',
                    listeners: {
                        click: 'onClickCancel'
                    }
                }
            ]
        }
    ]
});
