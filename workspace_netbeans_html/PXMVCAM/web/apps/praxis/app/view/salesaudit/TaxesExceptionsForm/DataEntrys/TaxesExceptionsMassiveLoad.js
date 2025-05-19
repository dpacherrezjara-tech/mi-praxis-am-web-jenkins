prototype.idDE2 = prototype.id + '-TaxesExceptionsMassiveLoad';

Ext.define('Ext.Praxis.view.salesaudit.TaxesExceptionsForm.DataEntrys.TaxesExceptionsMassiveLoad', {
    extend: 'Ext.window.Window',
    alias: 'widget.TaxesExceptionsMassiveLoad',
    requires: [
        'Ext.Praxis.controller.salesaudit.TaxesExceptions.TaxesExceptionsMassiveLoadController'
    ],
    controller: 'TaxesExceptionsMassiveLoadController',
    title: 'Tax Exception Massive - Form',
    header: true,
    width: 600,
    resizable: false,
    layout: 'vbox',
    modal: true,
    border: false,
    bodyStyle: 'background: #ffffff;',
    defaults: {
        border: false
    },
    bodyPadding: 10,
    items: [
        {
            xtype: 'filefield',
            id: prototype.idDE2 + '-massiveExcelFile',
            name: 'excelFile',
            fieldLabel: 'Excel File',
            labelWidth: 100,
            msgTarget: 'side',
            allowBlank: false,
            width: '100%',
            buttonText: 'Select File',
            listeners: {
                change: 'onSelectField'
            }
        },
        {
            xtype: 'grid',
            margin: '5 0 5 0',
            minHeight: 100,
            hidden:true,
            viewConfig: {
                stripeRows: false,
                enableTextSelection: true,
                markDirty: true
            },
            border: true,
            columnLines: true,
            id: prototype.idDE2 + '-gridErrors',
            width: '100%',
            maxHeight: 300,
            columns: {
                defaults: {
                    align: 'center',
                    menuDisabled: true,
                    sortable: true
                },
                items: [
                    {text: 'Ticket', dataIndex: 'TICKET', width: 100},
                    {text: 'Error Comment', dataIndex: 'COMENTARIO', flex: 1}
                ]
            }
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
                    text: 'Update',
                    id: prototype.idDE2 + '-btn-update',
                    iconCls: 'prx-icon-reload',
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.idDE2 + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});