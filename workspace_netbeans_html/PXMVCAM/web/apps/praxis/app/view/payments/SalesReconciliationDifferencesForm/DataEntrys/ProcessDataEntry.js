Ext.define('Ext.Praxis.view.payments.SalesReconciliationDifferencesForm.DataEntrys.ProcessDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.TransactionProcessDataEntry',
    requires: [
        'Ext.Praxis.controller.payments.SalesReconciliationDifferences.ProcessDataEntryController'
    ],
    controller: 'ProcessDataEntryController',
    title: 'Process - Form',
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
            xtype: 'panel',
            layout: {
                type: 'hbox',
                pack: 'center'
            },
            border: true,
            items: [
                {
                    xtype: 'datefield',
                    id: prototype.id + '-processBatch',
                    fieldLabel: 'Select Date',
                    margin: '5 5 5 5',
                    format: 'Ymd',
                    editable: false, // Deshabilita la edición del campo
                    labelWidth: 100,
                    width: 200,
                    value: new Date()
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